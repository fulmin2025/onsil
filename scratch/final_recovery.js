const fs = require('fs');

// Read source files
const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));
const searchHtml = fs.readFileSync('search.html', 'utf8');

// 1. Collect all unique companies and their data
// Priority: manualData > existing searchHtml data
const finalData = {};

// We define standard price constants for string templates
const STANDARD_PRICES = `[
                    {
                        "category": "기본 화장 비용 (체중별)",
                        "items": [
                            { "name": "5kg 미만", "price": "200,000원", "desc": "영정사진, 추모실, 개별화장, 기본유골함 포함" },
                            { "name": "5kg ~ 15kg 미만", "price": "250,000원", "desc": "체중별 차등 요금 적용" },
                            { "name": "15kg 이상 대형견", "price": "350,000원~", "desc": "상세 비용 상담 문의" }
                        ]
                    }
                ]`;

// --- Extraction Step ---
const startMarker = 'const REAL_DATA = {';
const endMarker = '};';
const startIdx = searchHtml.indexOf(startMarker);
const endIdx = searchHtml.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error("REAL_DATA block not found");
    process.exit(1);
}

const realDataContent = searchHtml.substring(startIdx + startMarker.length, endIdx);

// Simplified parser for top-level keys
let pos = 0;
while (pos < realDataContent.length) {
    const nextKeyMatch = realDataContent.substring(pos).match(/"([^"]+)"\s*:/);
    if (!nextKeyMatch) break;

    const key = nextKeyMatch[1];
    const keyStart = pos + nextKeyMatch.index;
    const valueStart = keyStart + nextKeyMatch[0].length;

    let braceLevel = 0;
    let valueEnd = valueStart;
    let foundBrace = false;
    for (let i = valueStart; i < realDataContent.length; i++) {
        if (realDataContent[i] === '{') { braceLevel++; foundBrace = true; }
        else if (realDataContent[i] === '}') { braceLevel--; }
        if (foundBrace && braceLevel === 0) { valueEnd = i + 1; break; }
    }
    
    // If no braces found (like "prices": STANDARD_PRICES), find next comma or end
    if (!foundBrace) {
        const nextComma = realDataContent.indexOf(',', valueStart);
        valueEnd = nextComma === -1 ? realDataContent.length : nextComma;
    }

    const valueStr = realDataContent.substring(valueStart, valueEnd).trim();
    
    // Priority: Keep if it has numerical prices or is the first time we see it
    const hasNumericalPrice = /(\d{1,3}(?:,\d{3})+|\d+)/.test(valueStr);
    if (!finalData[key] || hasNumericalPrice) {
        finalData[key] = valueStr;
    }
    pos = valueEnd + 1;
}

// 2. Overwrite with manual_data.json
for (const [name, data] of Object.entries(manualData)) {
    // Generate clean JSON string for the value
    // Note: manual_data has full objects, so we stringify them
    finalData[name] = JSON.stringify(data, null, 24).replace(/\n/g, '\n' + ' '.repeat(24));
}

// 3. Construct NEW REAL_DATA string
let newRealData = 'const REAL_DATA = {\n';
const sortedKeys = Object.keys(finalData).sort();
sortedKeys.forEach((key, i) => {
    newRealData += `            "${key}": ${finalData[key]}${i === sortedKeys.length - 1 ? '' : ','}\n`;
});
newRealData += '        };';

// 4. Construct NEW parsePrice function
const newParsePrice = `        function parsePrice(item) {
            if (!item || !item.prices) return 99999999;

            if (Array.isArray(item.prices)) {
                if (item.prices.length > 0) {
                    let min = 99999999;
                    
                    // 장례/화장 관련 카테고리 우선 검색
                    let targetCategories = item.prices.filter(cat => cat.category && (cat.category.includes('화장') || cat.category.includes('장례') || cat.category.includes('패키지')));
                    
                    // 만약 관련 카테고리가 없으면 전체 카테고리 검색
                    let searchPool = targetCategories.length > 0 ? targetCategories : item.prices;

                    searchPool.forEach(cat => {
                        if (cat.items) {
                            cat.items.forEach(p => {
                                if (!p.price) return;
                                const numMatch = p.price.match(/(\\d{1,3}(?:,\\d{3})+|\\d+)/);
                                if (numMatch) {
                                    let val = parseInt(numMatch[1].replace(/,/g, ''));
                                    if (val < 10000 && p.price.includes('만')) val *= 10000;
                                    
                                    // 0원이나 터무니없이 높은 값, 추가금 항목 등 제외
                                    if (!isNaN(val) && val > 50000 && val < min && !p.name.includes('추가') && !p.name.includes('초과') && !p.name.includes('가산')) {
                                        min = val;
                                    }
                                }
                            });
                        }
                    });
                    return min;
                }
            }
            return 99999999;
        }`;

// 5. Apply changes to HTML
let resultHtml = searchHtml.substring(0, startIdx) + newRealData + searchHtml.substring(endIdx + 2);

// Replace parsePrice as well
const parseStartMarker = 'function parsePrice(item) {';
const parseEndMarker = '        }';
const pStartIdx = resultHtml.indexOf(parseStartMarker);
// Find matching end brace for parsePrice (it's at line 2301)
const pEndIdx = resultHtml.indexOf(parseEndMarker, pStartIdx + parseStartMarker.length);

if (pStartIdx !== -1 && pEndIdx !== -1) {
    resultHtml = resultHtml.substring(0, pStartIdx) + newParsePrice + resultHtml.substring(pEndIdx + parseEndMarker.length);
}

fs.writeFileSync('search.html', resultHtml, 'utf8');
console.log("Recovery Complete: Synced REAL_DATA, Improved parsePrice.");
