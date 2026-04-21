import re
import csv
import json

def run():
    print("Starting extraction...")
    with open('search.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. RAW_JSON 데이터 추출
    raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
    if not raw_match:
        print("ERROR: RAW_JSON not found")
        return
    
    raw_obj = json.loads(raw_match.group(1))
    business_list = raw_obj['business']
    print(f"Found {len(business_list)} business entries in RAW_JSON.")

    # 2. REAL_DATA 및 PHONE_DATA 영역 추출
    real_start = content.find('const REAL_DATA = {')
    phone_start = content.find('const PHONE_DATA = {')
    phone_end = content.find('function parsePrice')
    
    real_content = content[real_start:phone_start]
    phone_content = content[phone_start:phone_end]

    results = []
    for item in business_list:
        name = item['name']
        
        # 주소 매칭
        addr_match = re.search(fr'\"{re.escape(name)}\":\s*\{{[^}}]*?\"address\":\s*\"(.*?)\"', real_content, re.DOTALL)
        address = addr_match.group(1) if addr_match else "상세 문의"
        
        # 전화번호 매칭
        phone_match = re.search(fr'\"{re.escape(name)}\":\s*\"(.*?)\"', phone_content)
        phone = phone_match.group(1) if phone_match else "1551-5052"

        # 가격 매칭
        price_match = re.search(fr'\"{re.escape(name)}\":\s*\{{[^}}]*?\"price\":\s*\"(.*?)\"', real_content, re.DOTALL)
        price = price_match.group(1) if price_match else "상담 문의"
        
        # 가격 상수 변환 logic
        if price == "상담 문의":
            block_match = re.search(fr'\"{re.escape(name)}\":\s*\{{(.*?)\n\s*\}}', real_content, re.DOTALL)
            if block_match:
                block = block_match.group(1)
                if 'FOUR_PAWS_PRICES' in block: price = "250,000원 (기본)"
                elif 'TWENTYONE_GRAM_PRICES' in block: price = "350,000원 (베이직)"
                elif 'STANDARD_PRICES' in block: price = "200,000원 ~"
                elif 'LOVEPET_PRICES' in block: price = "200,000원 (일반)"
                elif 'MONGMONG_PRICES' in block: price = "250,000원 (기본)"
                elif 'ARIUM_PRICES' in block: price = "250,000원 (기본)"

        results.append({
            "name": name,
            "address": address,
            "phone": phone,
            "price": price
        })

    # 3. CSV 저장
    csv_file = '장례식장_전체_정보_목록.csv'
    with open(csv_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
        for r in results:
            writer.writerow([r['name'], r['address'], r['phone'], r['price']])
    
    # 4. Markdown 저장
    md_file = '장례식장_전체_정보_목록.md'
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(results)}곳)\n\n")
        f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for r in results:
            f.write(f"| **{r['name']}** | {r['address']} | {r['phone']} | {r['price']} |\n")
        f.write("\n\n--- \n*참고: 정보는 시스템 데이터를 기준으로 추출되었습니다.*")

    print(f"Extraction complete! Saved {len(results)} items to {csv_file} and {md_file}")

if __name__ == "__main__":
    run()
