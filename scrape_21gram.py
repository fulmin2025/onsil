import urllib.request
from bs4 import BeautifulSoup
import json

url = "https://21gram.co.kr/pricing"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read()
        soup = BeautifulSoup(html, 'html.parser')
        
        images = []
        for img in soup.find_all('img'):
            src = img.get('src')
            alt = img.get('alt', '')
            if src:
                images.append({"src": src, "alt": alt})
        
        print(json.dumps(images, ensure_ascii=False, indent=2))
except Exception as e:
    print(f"Error: {e}")
