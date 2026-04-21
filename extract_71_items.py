import re
import csv
import json

def extract_all():
    print("--- 71개 장례식장 데이터 전수 추출 시작 ---")
    
    try:
        with open('search.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. RAW_JSON (71개 기본 목록)
        raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
        if not raw_match:
            print("오류: RAW_JSON 섹션을 찾을 수 없습니다.")
            return
            
        raw_json = json.loads(raw_match.group(1))
        business_list = raw_json['business']
        print(f"RAW_JSON에서 {len(business_list)}개의 항목을 발견했습니다.")

        # 2. REAL_DATA 및 PHONE_DATA 영역 추출
        real_start = content.find('const REAL_DATA = {')
        phone_start = content.find('const PHONE_DATA = {')
        phone_end = content.find('function parsePrice')
        
        real_text = content[real_start:phone_start]
        phone_text = content[phone_start:phone_end]

        # 3. 통합 매핑
        final_data = []
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
            
            # 가격 상수(FOUR_PAWS_PRICES 등) 보완
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

            final_data.append([name, address, phone, price])

        # 4. CSV 및 MD 파일 저장
        csv_path = '장례식장_정보_전체목록.csv'
        with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
            writer.writerows(final_data)

        md_path = '장례식장_정보_전체목록.md'
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(final_data)}곳)\n\n")
            f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
            f.write("| :--- | :--- | :--- | :--- |\n")
            for row in final_data:
                f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
        
        print(f"성공: {len(final_data)}개의 데이터를 {csv_path}와 {md_path}에 저장했습니다.")

    except Exception as e:
        print(f"오류 발생: {str(e)}")

if __name__ == "__main__":
    extract_all()
