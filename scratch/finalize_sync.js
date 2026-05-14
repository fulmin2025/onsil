const fs = require('fs');

const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));
const searchHtml = fs.readFileSync('search.html', 'utf8');

const startMarker = 'const REAL_DATA = {';
const endMarker = '};';
const startIdx = searchHtml.indexOf(startMarker);
const endIdx = searchHtml.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error("REAL_DATA marker not found");
    process.exit(1);
}

// Extract the content of REAL_DATA
const realDataContent = searchHtml.substring(startIdx + startMarker.length, endIdx);

// Function to safely get numerical price from items
function getMinPrice(prices) {
    if (!prices || !Array.isArray(prices)) return 99999999;
    let min = 99999999;
    prices.forEach(cat => {
        if (cat.items) {
            cat.items.forEach(p => {
                if (typeof p.price !== 'string') return;
                const match = p.price.match(/(\d{1,3}(?:,\d{3})+|\d+)/);
                if (match) {
                    let val = parseInt(match[1].replace(/,/g, ''));
                    if (val < 10000 && p.price.includes('만')) val *= 10000;
                    if (val > 0 && val < min && !p.name.includes('추가') && !p.name.includes('초과')) {
                        min = val;
                    }
                }
            });
        }
    });
    return min;
}

// We will use a Map to keep track of companies and their data
const companies = new Map();

// 1. Process existing REAL_DATA (manually parse keys to handle duplicates)
// This is tricky because of nested braces. We'll use a brace-counting approach.
let pos = 0;
while (pos < realDataContent.length) {
    const nextKeyMatch = realDataContent.substring(pos).match(/"([^"]+)"\s*:/);
    if (!nextKeyMatch) break;

    const key = nextKeyMatch[1];
    const keyStart = pos + nextKeyMatch.index;
    const valueStart = keyStart + nextKeyMatch[0].length;

    // Find the end of the object value by counting braces
    let braceLevel = 0;
    let valueEnd = valueStart;
    let foundStart = false;
    for (let i = valueStart; i < realDataContent.length; i++) {
        if (realDataContent[i] === '{') {
            braceLevel++;
            foundStart = true;
        } else if (realDataContent[i] === '}') {
            braceLevel--;
        }
        if (foundStart && braceLevel === 0) {
            valueEnd = i + 1;
            break;
        }
    }

    const valueStr = realDataContent.substring(valueStart, valueEnd).trim();
    
    // Determine if this entry has valid prices
    // We'll prioritize entries with actual numerical prices over "별도 문의"
    const hasNumericalPrice = /(\d{1,3}(?:,\d{3})+|\d+)/.test(valueStr);

    if (!companies.has(key) || hasNumericalPrice) {
        companies.set(key, valueStr);
    }

    pos = valueEnd + 1;
}

console.log(`Extracted ${companies.size} unique companies from search.html`);

// 2. Overwrite with manual_data.json where available
for (const [name, data] of Object.entries(manualData)) {
    // Generate string for this entry
    const dataStr = JSON.stringify(data, null, 16).replace(/\n/g, '\n            ');
    companies.set(name, dataStr);
}

console.log(`Merged with manual_data.json. Total: ${companies.size} companies.`);

// 3. Construct the NEW REAL_DATA string
let newRealData = 'const REAL_DATA = {\n';
const sortedKeys = Array.from(companies.keys()).sort();
sortedKeys.forEach((name, idx) => {
    const value = companies.get(name);
    newRealData += `            "${name}": ${value}${idx === sortedKeys.length - 1 ? '' : ','}\n`;
});
newRealData += '        };';

// 4. Replace in search.html
const finalHtml = searchHtml.substring(0, startIdx) + newRealData + searchHtml.substring(endIdx + 2);

fs.writeFileSync('search.html', finalHtml, 'utf8');
console.log("Successfully synced REAL_DATA and removed duplicates.");
