import re
import csv

def extract():
    try:
        with open('search.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract names from RAW_JSON
        # They look like: "name": "Name"
        # We want the ones inside the business array
        business_start = content.find('const RAW_JSON =')
        business_end = content.find('// --- Core Application Logic ---')
        business_content = content[business_start:business_end]
        
        names = re.findall(r'\"name\":\s*\"(.*?)\"', business_content)
        # Filter out duplicates if any, but maintain order
        seen = set()
        unique_names = []
        for n in names:
            if n not in seen:
                unique_names.append(n)
                seen.add(n)

        # Extract REAL_DATA section
        real_start = content.find('const REAL_DATA = {')
        real_end = content.find('const PHONE_DATA = {')
        real_content = content[real_start:real_end]

        # Extract PHONE_DATA section
        phone_start = content.find('const PHONE_DATA = {')
        phone_end = content.find('function parsePrice')
        phone_content = content[phone_start:phone_end]

        results = []
        for name in unique_names:
            # Find address
            # "Name": { ... "address": "Address" }
            addr_match = re.search(fr'\"{re.escape(name)}\":\s*\{{[^}}]*?\"address\":\s*\"(.*?)\"', real_content, re.DOTALL)
            address = addr_match.group(1) if addr_match else "상세 문의"
            
            # Find phone
            phone_match = re.search(fr'\"{re.escape(name)}\":\s*\"(.*?)\"', phone_content)
            phone = phone_match.group(1) if phone_match else "1551-5052"
            
            # Find price
            price_match = re.search(fr'\"{re.escape(name)}\":\s*\{{[^}}]*?\"price\":\s*\"(.*?)\"', real_content, re.DOTALL)
            price = price_match.group(1) if price_match else "200,000원 ~"
            
            # Special case for constants
            if price == "200,000원 ~":
                if 'FOUR_PAWS_PRICES' in (re.search(fr'\"{re.escape(name)}\":\s*\{{(.*?)\n\s*\}', real_content, re.DOTALL).group(1) if re.search(fr'\"{re.escape(name)}\":\s*\{{(.*?)\n\s*\}', real_content, re.DOTALL) else ""):
                    price = "250,000원 (기본)"

            results.append([name, address, phone, price])

        # Write Files
        with open('장례식장_정보_전체목록.csv', 'w', encoding='utf-8-sig', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['장례식장 명칭', '주소', '대표 전화', '기본 비용 (최저가 기준)'])
            writer.writerows(results)

        with open('장례식장_정보_전체목록.md', 'w', encoding='utf-8') as f:
            f.write(f"# 🏛️ 전국 장례식장 전체 정보 목록 (총 {len(results)}곳)\n\n")
            f.write("| 장례식장 명칭 | 주소 | 대표 전화 | 기본 비용 (최저가 기준) |\n")
            f.write("| :--- | :--- | :--- | :--- |\n")
            for row in results:
                f.write(f"| **{row[0]}** | {row[1]} | {row[2]} | {row[3]} |\n")
        
        print(f"DONE: {len(results)} items")
    except Exception as e:
        print(f"ERROR: {str(e)}")

extract()
