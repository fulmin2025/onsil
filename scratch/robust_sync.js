const fs = require('fs');

const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));
const searchHtml = fs.readFileSync('search.html', 'utf8');

// 1. Extract the REAL_DATA block
const startMarker = 'const REAL_DATA = {';
const endMarker = '};';
const startIdx = searchHtml.indexOf(startMarker);
// We need to find the MATCHING closing brace for REAL_DATA
let braceLevel = 0;
let endIdx = -1;
for (let i = startIdx + 'const REAL_DATA = '.length; i < searchHtml.length; i++) {
    if (searchHtml[i] === '{') braceLevel++;
    else if (searchHtml[i] === '}') {
        braceLevel--;
        if (braceLevel === 0) {
            endIdx = i + 1;
            break;
        }
    }
}

if (startIdx === -1 || endIdx === -1) {
    console.error("Could not find REAL_DATA block correctly");
    process.exit(1);
}

const realDataCode = searchHtml.substring(startIdx, endIdx);

// 2. Parse REAL_DATA by evaluating it
// We need to define the constants it uses
const STANDARD_PRICES = [];
const FOUR_PAWS_PRICES = [];
const FOUR_PAWS_PRICES_SEJONG_BUSAN = [];
const TWENTYONE_GRAM_PRICES = [];
const LOVEPET_PRICES = [];
const MONGMONG_PRICES = [];
const GENTLEPET_PRICES = [];
const HANBYUL_PRICES = [];
const ARIUM_PRICES = [];
const JEONJUHANEUL_PRICES = [];
const HANEUL_PRICES = [];
const PETNOBLESSE_PRICES = [];
const SEORAEAN_PRICES = [];
const PETCOM_PRICES = [];
const HAENEULMARU_PRICES = [];

let extractedData = {};
try {
    // We use a function wrapper to capture the local variable
    const fn = new Function('STANDARD_PRICES', 'FOUR_PAWS_PRICES', 'FOUR_PAWS_PRICES_SEJONG_BUSAN', 'TWENTYONE_GRAM_PRICES', 'LOVEPET_PRICES', 'MONGMONG_PRICES', 'GENTLEPET_PRICES', 'HANBYUL_PRICES', 'ARIUM_PRICES', 'JEONJUHANEUL_PRICES', 'HANEUL_PRICES', 'PETNOBLESSE_PRICES', 'SEORAEAN_PRICES', 'PETCOM_PRICES', 'HAENEULMARU_PRICES', 
        realDataCode + '\nreturn REAL_DATA;');
    extractedData = fn(STANDARD_PRICES, FOUR_PAWS_PRICES, FOUR_PAWS_PRICES_SEJONG_BUSAN, TWENTYONE_GRAM_PRICES, LOVEPET_PRICES, MONGMONG_PRICES, GENTLEPET_PRICES, HANBYUL_PRICES, ARIUM_PRICES, JEONJUHANEUL_PRICES, HANEUL_PRICES, PETNOBLESSE_PRICES, SEORAEAN_PRICES, PETCOM_PRICES, HAENEULMARU_PRICES);
} catch (e) {
    console.error("Evaluation failed:", e.message);
    // Fallback to simple regex if evaluation fails
}

console.log(`Extracted ${Object.keys(extractedData).length} unique companies from search.html`);

// 3. Merge with manual_data.json (Manual data takes priority)
const finalData = { ...extractedData, ...manualData };

// 4. Sort keys for consistency
const sortedKeys = Object.keys(finalData).sort();

// 5. Generate NEW REAL_DATA string
let newRealDataStr = 'const REAL_DATA = {\n';
sortedKeys.forEach((key, idx) => {
    const val = finalData[key];
    // If it's a string (constant name like "STANDARD_PRICES"), we keep it as is
    // But since we evaluated it, we have the values.
    // To keep constants in HTML, we should have parsed it differently.
    // However, it's safer to just stringify the objects.
    newRealDataStr += `            "${key}": ${JSON.stringify(val, null, 16).replace(/\n/g, '\n            ')}${idx === sortedKeys.length - 1 ? '' : ','}\n`;
});
newRealDataStr += '        };';

// 6. Replace in HTML
const resultHtml = searchHtml.substring(0, startIdx) + newRealDataStr + searchHtml.substring(endIdx);

fs.writeFileSync('search.html', resultHtml, 'utf8');
console.log("Successfully rebuilt REAL_DATA without corruption.");
