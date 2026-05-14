const fs = require('fs');

let detailHtml = fs.readFileSync('detail.html', 'utf8');

detailHtml = detailHtml.replace(
    '<script src="js/auth.js"></script>',
    '<script src="js/data.js"></script>\n    <script src="js/auth.js"></script>'
);

const renderTarget = 'function renderDetail(data) {';
const renderReplacement = `function renderDetail(data) {
            // Merge with REAL_DATA if available
            if (typeof REAL_DATA !== 'undefined' && data.name) {
                let realInfo = REAL_DATA[data.name];
                if (!realInfo) {
                    const foundKey = Object.keys(REAL_DATA).find(k => data.name.includes(k) || k.includes(data.name));
                    if (foundKey) realInfo = REAL_DATA[foundKey];
                }
                
                if (realInfo) {
                    if (!data.prices || data.prices.length === 0) data.prices = realInfo.prices || (typeof STANDARD_PRICES !== 'undefined' ? STANDARD_PRICES : []);
                    if (!data.image_url && realInfo.imageUrl) data.image_url = realInfo.imageUrl;
                    if (!data.address && realInfo.address) data.address = realInfo.address;
                }
            }`;

detailHtml = detailHtml.replace(renderTarget, renderReplacement);

fs.writeFileSync('detail.html', detailHtml, 'utf8');
console.log("Updated detail.html successfully.");
