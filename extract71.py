import re
import json
import csv

def run_extraction():
    print("--- 장례식장 데이터 71개 전수 추출 시작 ---")
    try:
        # 1. 파일 읽기
        with open('search.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 2. RAW_JSON 데이터 추출
        raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
        if not raw_match:
            print("ERROR: RAW_JSON을 찾을 수 없습니다.")
            return
            
        raw_json = json.loads(raw_match.group(1))
        business_list = raw_json['business']
        total_items = len(business_list)
        print(f"RAW_JSON에서 {total_items}개의 항목을 발견했습니다.")

        # 3. REAL_DATA 및 PHONE_DATA 영역 텍스트 추출
        real_start = content.find('const REAL_DATA = {')
        phone_start = content.find('const PHONE_DATA = {')
        phone_end = content.find('// --- Data Enrichment Helper ---')
        
        real_text = content[real_start:phone_start]
        phone_text = content[phone_start:phone_end]

        # 4. 통합 데이터 매핑
        final_list = []
        for item in business_list:
            name = item['name']
            
            # 주소 추출
            addr_match = re.search(rf'\"{re.escape(name)}\":\s*\{{[^}}]*?\"address\":\s*\"(.*?)\"', real_text, re.DOTALL)
            address = addr_match.group(1) if addr_match else "상세 문의"
            
            # 전화번호 추출
            phone_match = re.search(rf'\"{re.escape(name)}\":\s*\"(.*?)\"', phone_text)
            phone = phone_match.group(1) if phone_match else "1551-5052"
            
            # 가격 추출
            price_match = re.search(rf'\"{re.escape(name)}\":\s*\{{[^}}]*?\"price\":\s*\"(.*?)\"', real_text, re.DOTALL)
            price = price_match.group(1) if price_match else "상담 문의"
            
            # 가격 상수 보완
            if price == "상담 문의":
                block_match = re.search(rf'\"{re.escape(name)}\":\s*\{{(.*?)\n\s*\}}', real_text, re.DOTALL)
                if block_match:
                    block = block_match.group(1)
                    if 'FOUR_PAWS_PRICES' in block: price = "250,000원 (기본)"
                    elif 'TWENTYONE_GRAM_PRICES' in block: price = "350,000원 (베이직)"
                    elif 'STANDARD_PRICES' in block: price = "200,000원 ~"
                    elif 'LOVEPET_PRICES' in block: price = "200,000원 (일반)"
                    elif 'MONGMONG_PRICES' in block: price = "250,000원 (기본)"
                    elif 'ARIUM_PRICES' in block: price = "250,000원 (기본)"

            final_list.append([name, address, phone, price])

        # 5. CSV 저장
        with open('전체_장례식장_목록.csv', 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
            writer.writerows(final_list)
        print(f"CSV 저장 완료: 전체_장례식장_목록.csv ({len(final_list)}행)")

        # 6. MD 저장
        with open('전체_장례식장_목록.md', 'w', encoding='utf-8') as f:
            f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(final_list)}곳)\n\n")
            f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
            f.write("| :--- | :--- | :--- | :--- |\n")
            for row in final_list:
                f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
            f.write("\n\n--- \n*참고: 상세 비용은 반려동물의 무게 및 옵션에 따라 변동될 수 있습니다.*")
        print(f"Markdown 저장 완료: 전체_장례식장_목록.md")

    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    run_extraction()
