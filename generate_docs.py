import re
import json
import csv

def run():
    with open('search.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # RAW_JSON.business extraction
    raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
    business_list = json.loads(raw_match.group(1))['business']

    # REAL_DATA extraction
    real_match = re.search(r'const REAL_DATA = (\{.*?\});', content, re.DOTALL)
    # REAL_DATA is not strict JSON because it uses variables. 
    # We'll use regex to grab the blocks.
    real_blocks = re.findall(r'\"(.*?)\":\s*\{(.*?)\n\s*\}', real_match.group(1), re.DOTALL)
    real_data = {}
    for name, block in real_blocks:
        addr_match = re.search(r'\"address\":\s*\"(.*?)\"', block)
        addr = addr_match.group(1) if addr_match else "상세 문의"
        real_data[name] = addr

    # PHONE_DATA extraction
    phone_match = re.search(r'const PHONE_DATA = \{(.*?)\};', content, re.DOTALL)
    phone_items = re.findall(r'\"(.*?)\":\s*\"(.*?)\"', phone_match.group(1))
    phones = dict(phone_items)

    # Price logic - simple version
    # "lowest" price extraction from REAL_DATA string if possible
    prices = {}
    for name, block in real_blocks:
        price_match = re.search(r'\"price\":\s*\"(.*?)\"', block)
        if price_match:
            prices[name] = price_match.group(1)
        else:
            # Check for constant pattern
            if 'FOUR_PAWS_PRICES' in block: prices[name] = "250,000원 (기본)"
            elif 'STANDARD_PRICES' in block: prices[name] = "200,000원 ~"
            elif 'TWENTYONE_GRAM_PRICES' in block: prices[name] = "350,000원 (베이직)"
            else: prices[name] = "상담 문의"

    results = []
    for item in business_list:
        name = item['name']
        addr = real_data.get(name, "상세 문의")
        phone = phones.get(name, "1551-5052")
        price = prices.get(name, "200,000원 ~")
        results.append([name, addr, phone, price])

    # Write CSV
    with open('장례식장_전체_목록.csv', 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
        writer.writerows(results)

    # Write MD
    with open('장례식장_전체_목록.md', 'w', encoding='utf-8') as f:
        f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(results)}곳)\n\n")
        f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for row in results:
            f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
        f.write("\n\n--- \n*참고: 상세 비용은 반려동물의 무게 및 옵션에 따라 달라질 수 있습니다.*")

run()
