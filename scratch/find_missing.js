const fs = require('fs');

const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));
const searchHtml = fs.readFileSync('search.html', 'utf8');

// Find the start of REAL_DATA
const startIdx = searchHtml.indexOf('const REAL_DATA = {');
if (startIdx === -1) {
    console.log("REAL_DATA not found");
    process.exit(1);
}

// Extract the object block (primitive but might work if it ends with };)
let endIdx = searchHtml.indexOf('};', startIdx);
const realDataStr = searchHtml.substring(startIdx, endIdx + 2);

const missing = [];
for (const name of Object.keys(manualData)) {
    // Check if the name appears as a key at the start of a line or after a comma/brace
    const regex = new RegExp(`["']${name}["']\\s*:`);
    if (!regex.test(realDataStr)) {
        missing.push(name);
    }
}

console.log("Missing companies in REAL_DATA:", missing);

// Also check for prices: [] or empty prices
const emptyPrices = [];
for (const name of Object.keys(manualData)) {
    const entryMatch = realDataStr.match(new RegExp(`["']${name}["']\\s*:\\s*({[\\s\\S]*?})\\s*(?:,|})`));
    if (entryMatch) {
        const content = entryMatch[1];
        if (content.includes('"prices": []') || content.includes('"prices":[]')) {
            emptyPrices.push(name);
        }
    }
}
console.log("Companies with empty prices in REAL_DATA:", emptyPrices);
