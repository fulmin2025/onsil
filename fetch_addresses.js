const fs = require('fs');
const https = require('https');

// Extract RAW_JSON from search.html
const htmlContent = fs.readFileSync('search.html', 'utf8');
const jsonMatch = htmlContent.match(/const RAW_JSON = ({[\s\S]*?});/);

if (!jsonMatch) {
    console.error('Could not find RAW_JSON in search.html');
    process.exit(1);
}

const rawJson = eval('(' + jsonMatch[1] + ')');
const items = rawJson.business;

async function fetchAddress(enName) {
    return new Promise((resolve) => {
        const url = `https://www.petnight.co.kr/pet-funeral/${enName}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                // Look for address in the HTML
                // Pattern might be standard address format or inside specific tags
                // Let's try to find "주소" or common address patterns

                // Common patterns in meta tags or specific classes
                // <meta property="og:address" content="..."> ?? (Unlikely standard)
                // Look for "address" class or similar

                // Simple regex for road name addresses which usually end in '...로 (number)' or '...길 (number)'
                // Or just look for specific known markup if we knew it.
                // Since we don't know the exact markup, let's grab the whole text and try to find a pattern.
                // Or looking for text after "주소 :"

                const addressMatch = data.match(/주소\s*[:]\s*([^<>\n]+)/) || data.match(/class="[^"]*address[^"]*">([^<]+)</);

                if (addressMatch) {
                    resolve(addressMatch[1].trim());
                } else {
                    // Fallback: try to find common address suffixes
                    const fallbackMatch = data.match(/[가-힣]+[시도]\s+[가-힣]+[시군구]\s+[가-힣0-9\s]+(로|길)\s+\d+(?:-\d+)?/);
                    resolve(fallbackMatch ? fallbackMatch[0] : null);
                }
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${enName}: ${err.message}`);
            resolve(null);
        });
    });
}

async function run() {
    const results = {};
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    console.log(`Found ${items.length} items. Starting fetch...`);

    for (const item of items) {
        process.stdout.write(`Fetching ${item.name} (${item.enName})... `);
        const address = await fetchAddress(item.enName);
        if (address) {
            console.log(`Found: ${address}`);
            results[item.name] = { address: address };
        } else {
            console.log('Not found');
        }
        await delay(100); // Be nice to the server
    }

    fs.writeFileSync('extracted_addresses.json', JSON.stringify(results, null, 2));
    console.log('Done. Saved to extracted_addresses.json');
}

run();
