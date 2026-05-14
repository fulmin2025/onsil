const fs = require('fs');

const searchHtml = fs.readFileSync('search.html', 'utf8');
const startIdx = searchHtml.indexOf('const REAL_DATA = {');
const endIdx = searchHtml.indexOf('};', startIdx);
const realDataStr = searchHtml.substring(startIdx, endIdx + 2);

const keys = [];
const keyRegex = /"([^"]+)"\s*:/g;
let match;
while ((match = keyRegex.exec(realDataStr)) !== null) {
    keys.push(match[1]);
}

const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
console.log("Duplicate keys in REAL_DATA:", duplicates);
