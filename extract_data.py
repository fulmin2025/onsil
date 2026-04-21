import re
import csv
import json

def extract():
    with open('search.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract RAW_JSON
    raw_match = re.search(r'const RAW_JSON = (\{.*?\});', content, re.DOTALL)
    if not raw_match:
        print("RAW_JSON not found")
        return
    raw_json = json.loads(raw_match.group(1))
    
    # Extract REAL_DATA
    # REAL_DATA is an object: const REAL_DATA = { ... }
    # Prices might have arrays, so we need careful regex or a smarter parser
    # But for a quick extraction, we can look for "Name": { ... "address": "..." }
    real_data_match = re.search(r'const REAL_DATA = (\{.*?\n\s*\});', content, re.DOTALL)
    # If standard regex fails because of brackets, we'll try a simpler approach
    
    # Extract PHONE_DATA
    phone_match = re.search(r'const PHONE_DATA = (\{.*?\});', content, re.DOTALL)
    phone_data = {}
    if phone_match:
        # Simple transform to dict
        phone_str = phone_match.group(1).replace('\n', '').replace(' ', '')
        phone_items = re.findall(r'\"(.*?)\":\"(.*?)\"', phone_str)
        phone_data = dict(phone_items)

    # For REAL_DATA, let's extract address and prices separately since it's hard to parse with JSON.loads directly if it has JS vars
    real_data = {}
    # Find all "Funeral Name": { pricingType: ..., address: "...", ... }
    # Pattern: "Name": { ... address: "Address" ... }
    entries = re.findall(r'\"(.*?)\":\s*\{\s*\"pricingType\":.*?\"address\":\s*\"(.*?)\"', content, re.DOTALL)
    for name, addr in entries:
        real_data[name] = addr

    # Find prices - very basic extraction of first price found
    prices = {}
    # Look for the block after address
    price_blocks = re.findall(r'\"(.*?)\":\s*\{.*?\"prices\":\s*\[(.*?)\],', content, re.DOTALL)
    for name, price_block in price_blocks:
        price_match = re.search(r'\"price\":\s*\"(.*?)\"', price_block)
        if price_match:
            prices[name] = price_match.group(1)

    with open('장례식장_정보_목록_전체.csv', 'w', encoding='utf-8-sig', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
        
        for item in raw_json['business']:
            name = item['name']
            addr = real_data.get(name, "상세 문의")
            phone = phone_data.get(name, "1551-5052")
            price = prices.get(name, "상담 문의")
            writer.writerow([name, addr, phone, price])

extract()
