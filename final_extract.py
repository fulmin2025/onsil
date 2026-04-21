import re
import json
import csv

def extract():
    with open('search.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. RAW_JSON.business
    raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
    if not raw_match:
        print("RAW_JSON not found")
        return
    raw_json = json.loads(raw_match.group(1))
    business_list = raw_json['business']

    # 2. REAL_DATA
    real_match = re.search(r'const REAL_DATA = (\{.*?\});', content, re.DOTALL)
    real_str = real_match.group(1) if real_match else ""
    
    # 3. PHONE_DATA
    phone_match = re.search(r'const PHONE_DATA = (\{.*?\});', content, re.DOTALL)
    phone_items = re.findall(r'\"(.*?)\":\s*\"(.*?)\"', phone_match.group(1)) if phone_match else []
    phones = dict(phone_items)

    # Helper to get address from REAL_DATA string
    def get_address(name):
        # Look for "name": { ... "address": "..." }
        pattern = fr'\"{re.escape(name)}\":\s*\{{.*?\"address\":\s*\"(.*?)\"'
        match = re.search(pattern, real_str, re.DOTALL)
        return match.group(1) if match else "상세 문의"

    # Helper to get price
    def get_price(name):
        pattern = fr'\"{re.escape(name)}\":\s*\{{.*?\"price\":\s*\"(.*?)\"'
        match = re.search(pattern, real_str, re.DOTALL)
        if match: return match.group(1)
        
        # Check constants
        block_pattern = fr'\"{re.escape(name)}\":\s*\{{(.*?)\}}'
        block_match = re.search(block_pattern, real_str, re.DOTALL)
        if block_match:
            block = block_match.group(1)
            if 'FOUR_PAWS_PRICES' in block: return "250,000원 (기본)"
            if 'STANDARD_PRICES' in block: return "200,000원 ~"
            if 'TWENTYONE_GRAM_PRICES' in block: return "350,000원 (베이직)"
        return "200,000원 ~"

    results = []
    for item in business_list:
        name = item['name']
        address = get_address(name)
        phone = phones.get(name, "1551-5052")
        price = get_price(name)
        results.append([name, address, phone, price])

    # Save to CSV
    with open('장례식장_정보_전체목록.csv', 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
        writer.writerows(results)

    # Save to MD
    with open('장례식장_정보_전체목록.md', 'w', encoding='utf-8') as f:
        f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(results)}곳)\n\n")
        f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for row in results:
            f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
        f.write("\n\n--- \n*참고: 상세 비용은 반려동물의 무게 및 옵션에 따라 달라질 수 있습니다.*")

    print(f"Extraction Complete: {len(results)} items saved.")

if __name__ == "__main__":
    extract()
