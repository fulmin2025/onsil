const fs = require('fs');

const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));

function parsePrice(item) {
    if (!item || !item.prices) return 99999999;
    if (Array.isArray(item.prices)) {
        if (item.prices.length > 0) {
            let min = 99999999;
            const targetCategory = item.prices.find(cat => cat.category && (cat.category.includes('화장') || cat.category.includes('장례'))) || item.prices[0];
            if (targetCategory && targetCategory.items) {
                targetCategory.items.forEach(p => {
                    if (typeof p.price !== 'string') return;
                    const numMatch = p.price.match(/(\d{1,3}(?:,\d{3})+|\d+)/);
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

const manualPrices = {};
for (const [name, data] of Object.entries(manualData)) {
    manualPrices[name] = parsePrice(data);
}

console.log("Manual Data Prices:");
for (const [name, price] of Object.entries(manualPrices)) {
    if (price < 99999999) {
        console.log(`- ${name}: ${price.toLocaleString()}원`);
    } else {
        console.log(`- ${name}: 상담 문의`);
    }
}
