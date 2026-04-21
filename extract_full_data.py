import re
import json
import csv

def run_extraction():
    try:
        # 1. 파일 읽기
        with open('search.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 2. RAW_JSON 데이터 섹션 추출
        raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
        if not raw_match:
            print("ERROR: RAW_JSON 섹션을 찾을 수 없습니다.")
            return
            
        business_list = json.loads(raw_match.group(1))['business']
        print(f"INFO: RAW_JSON에서 {len(business_list)}개의 비즈니스 항목을 찾았습니다.")

        # 3. REAL_DATA 및 PHONE_DATA 섹션 추출 (텍스트 기반)
        real_start = content.find('const REAL_DATA = {')
        real_end = content.find('const PHONE_DATA = {')
        real_text = content[real_start:real_end]

        phone_start = content.find('const PHONE_DATA = {')
        phone_end = content.find('// --- Data Enrichment Helper ---')
        phone_text = content[phone_start:phone_end]

        # 4. 데이터 매핑 및 통합
        results = []
        for item in business_list:
            name = item['name']
            
            # 주소 추출
            # "이름": { ... "address": "주소" }
            addr_pattern = rf'\"{re.escape(name)}\":\s*\{{[^}}]*?\"address\":\s*\"(.*?)\"'
            addr_match = re.search(addr_pattern, real_text, re.DOTALL)
            address = addr_match.group(1) if addr_match else "상세 문의"

            # 전화번호 추출
            # "이름": "전화번호"
            phone_pattern = rf'\"{re.escape(name)}\":\s*\"(.*?)\"'
            phone_match = re.search(phone_pattern, phone_text)
            phone = phone_match.group(1) if phone_match else "1551-5052"

            # 가격 추출
            # "이름": { ... "price": "가격" }
            price_pattern = rf'\"{re.escape(name)}\":\s*\{{[^}}]*?\"price\":\s*\"(.*?)\"'
            price_match = re.search(price_pattern, real_text, re.DOTALL)
            price = price_match.group(1) if price_match else "상담 문의"
            
            # 가격 상수 확인 (상담 문의인 경우 기본 요금제 확인)
            if price == "상담 문의":
                block_pattern = rf'\"{re.escape(name)}\":\s*\{{(.*?)\n\s*\}}'
                block_match = re.search(block_pattern, real_text, re.DOTALL)
                if block_match:
                    block = block_match.group(1)
                    if 'FOUR_PAWS_PRICES' in block: price = "250,000원 (기본)"
                    elif 'TWENTYONE_GRAM_PRICES' in block: price = "350,000원 (베이직)"
                    elif 'LOVEPET_PRICES' in block: price = "200,000원 (일반)"
                    elif 'MONGMONG_PRICES' in block: price = "250,000원 (기본)"
                    elif 'ARIUM_PRICES' in block: price = "250,000원 (기본)"
                    elif 'STANDARD_PRICES' in block: price = "200,000원 ~"

            results.append([name, address, phone, price])

        # 5. CSV 파일 저장
        csv_path = '장례식장_전체_정보_목록.csv'
        with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
            writer.writerows(results)
        print(f"SUCCESS: {csv_path} 생성 완료 ({len(results)}행)")

        # 6. Markdown 파일 저장
        md_path = '장례식장_전체_정보_목록.md'
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(results)}곳)\n\n")
            f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
            f.write("| :--- | :--- | :--- | :--- |\n")
            for row in results:
                f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
            f.write("\n\n--- \n*참고: 상세 비용은 반려동물의 무게 및 추가 옵션 선택에 따라 변동될 수 있습니다.*")
        print(f"SUCCESS: {md_path} 생성 완료")

    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    run_extraction()
