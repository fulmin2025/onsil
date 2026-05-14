const fs = require('fs');

const searchHtml = fs.readFileSync('search.html', 'utf8');

// Extract the entire script block containing constants and REAL_DATA
// We'll use a safer approach: extract the code between "const FOUR_PAWS_PRICES =" and "const PHONE_DATA ="
const startMarker = 'const FOUR_PAWS_PRICES =';
const endMarker = 'const PHONE_DATA =';

const startIdx = searchHtml.indexOf(startMarker);
const endIdx = searchHtml.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.log("Markers not found");
    process.exit(1);
}

let code = searchHtml.substring(startIdx, endIdx);

// Also need parsePrice function
const parsePriceCode = `
function parsePrice(item) {
    if (!item || !item.prices) return 99999999;
    if (Array.isArray(item.prices)) {
        if (item.prices.length > 0) {
            let min = 99999999;
            const targetCategory = item.prices.find(cat => cat.category && (cat.category.includes('화장') || cat.category.includes('장례'))) || item.prices[0];
            if (targetCategory && targetCategory.items) {
                targetCategory.items.forEach(p => {
                    if (typeof p.price !== 'string') return;
                    const numMatch = p.price.match(/(\\d{1,3}(?:,\\d{3})+|\\d+)/);
                    if (numMatch) {
                        let val = parseInt(numMatch[1].replace(/,/g, ''));
                        if (val < 10000 && p.price.includes('만')) {
                            val = val * 10000;
                        }
                        if (!isNaN(val) && val > 0 && val < min && !p.name.includes('추가') && !p.name.includes('초과') && !p.name.includes('가산')) {
                            min = val;
                        }
                    }
                });
                return min;
            }
        }
    }
    return 99999999;
}
`;

// Evaluate the code in a sandbox (primitive eval)
try {
    // We need to define standard prices etc.
    const sandbox = {};
    eval(code + "\n" + parsePriceCode + "\n\nsandbox.REAL_DATA = REAL_DATA; sandbox.parsePrice = parsePrice;");
    
    const results = [];
    for (const [name, data] of Object.entries(sandbox.REAL_DATA)) {
        const minPrice = sandbox.parsePrice(data);
        results.push({ name, minPrice });
    }
    
    const missingPrices = results.filter(r => r.minPrice >= 99999999);
    console.log("Companies with no numerical price found (showing '상담 문의'):");
    missingPrices.forEach(r => console.log(`- ${r.name}`));
    
} catch (e) {
    console.log("Error evaluating code:", e.message);
}
