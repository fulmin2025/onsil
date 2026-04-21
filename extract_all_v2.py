import re
import csv
import json

def extract_all():
    with open('search.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Extract RAW_JSON.business
    raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
    if not raw_match:
        print("RAW_JSON not found")
        return
    raw_json = json.loads(raw_match.group(1))
    business_list = raw_json['business']

    # 2. Extract REAL_DATA block
    real_data_block_match = re.search(r'const REAL_DATA = \{(.*?)\};', content, re.DOTALL)
    real_data_block = real_data_block_match.group(1) if real_data_block_match else ""
    
    # Map from name to address
    real_info_map = {}
    entries = re.findall(r'\"(.*?)\":\s*\{\s*.*?\"address\":\s*\"(.*?)\"', real_data_block, re.DOTALL)
    for name, addr in entries:
        real_info_map[name] = {"address": addr, "prices": "상담 문의"}

    # Find price constant mentions
    price_const_mentions = re.findall(r'\"(.*?)\":\s*\{.*?\"prices\":\s*([A-Z_]+)', real_data_block, re.DOTALL)
    price_const_map = dict(price_const_mentions)

    # 3. Extract PHONE_DATA
    phone_match = re.search(r'const PHONE_DATA = \{(.*?)\};', content, re.DOTALL)
    phone_data = {}
    if phone_match:
        phone_block = phone_match.group(1).replace('\n', '')
        phone_items = re.findall(r'\"(.*?)\":\s*\"(.*?)\"', phone_block)
        phone_data = dict(phone_items)

    # 4. Price Constants
    PRICE_SUMMARIES = {
        "STANDARD_PRICES": "200,000원 ~",
        "FOUR_PAWS_PRICES": "250,000원 (기본)",
        "FOUR_PAWS_PRICES_SEJONG_BUSAN": "200,000원 (기본)",
        "TWENTYONE_GRAM_PRICES": "350,000원 (베이직)",
        "LOVEPET_PRICES": "200,000원 (일반)",
        "MONGMONG_PRICES": "150,000원 (소동물) / 250,000원 (기본)",
        "ARIUM_PRICES": "180,000원 (소동물) / 250,000원 (기본)",
        "GENTLEPET_PRICES": "150,000원 ~",
        "HANEUL_PRICES": "200,000원 (기본)",
        "HAENEULMARU_PRICES": "상담 문의",
        "JEONJUHANEUL_PRICES": "100,000원 (1kg 미만) / 170,000원 (기본)",
        "PETNOBLESSE_PRICES": "250,000원 (기본)",
        "SEORAEAN_PRICES": "별도 문의 (화장비)",
        "PETCOM_PRICES": "220,000원 (기본)",
        "HANBYUL_PRICES": "200,000원 (소동물) / 250,000원 (기본)"
    }

    # Extract specific price strings
    raw_price_array_pattern = r'\"(.*?)\":\s*\{.*?\"prices\":\s*\[\s*\{\s*\"category\":.*?\"price\":\s*\"(.*?)\"', content, re.DOTALL)
    raw_array_prices = re.findall(raw_price_array_pattern, real_data_block)
    for name, price in raw_array_prices:
        if name in real_info_map:
            real_info_map[name]["prices"] = price

    # 5. Build results
    results = []
    for item in business_list:
        name = item['name']
        entry = real_info_map.get(name, {})
        address = entry.get("address", "상세 문의")
        
        price = entry.get("prices", "상담 문의")
        if name in price_const_map:
            const_name = price_const_map[name]
            price = PRICE_SUMMARIES.get(const_name, "상담 문의")
        elif price == "상담 문의":
            price = PRICE_SUMMARIES["STANDARD_PRICES"]

        phone = phone_data.get(name, "1551-5052")
        results.append([name, address, phone, price])

    # Write CSV
    with open('장례식장_정보_전체목록.csv', 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
        writer.writerows(results)

    # Write Markdown
    with open('장례식장_정보_전체목록.md', 'w', encoding='utf-8') as f:
        f.write("# 🏛️ 전국 장례식장 전체 정보 목록 (총 %d곳)\n\n" % len(results))
        f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for row in results:
            f.write("| **%s** | %s | %s | %s |\n" % tuple(row))
        f.write("\n\n--- \n*참고: 상세 비용은 반려동물의 무게 및 옵션에 따라 달라질 수 있습니다.*")

    print(f"Success: Generated files with {len(results)} entries.")

if __name__ == "__main__":
    extract_all()
