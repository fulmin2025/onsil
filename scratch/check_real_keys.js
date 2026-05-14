const fs = require('fs');

const searchHtml = fs.readFileSync('search.html', 'utf8');
const startIdx = searchHtml.indexOf('const REAL_DATA = {');
const endIdx = searchHtml.indexOf('};', startIdx);
const realDataStr = searchHtml.substring(startIdx, endIdx + 2);

const keys = [];
const keyRegex = /"([^"]+)"\s*:/g;
let match;
while ((match = keyRegex.exec(realDataStr)) !== null) {
    // Only pick top-level keys (very primitive filter)
    const lineBefore = realDataStr.substring(0, match.index);
    const braceCount = (lineBefore.match(/{/g) || []).length - (lineBefore.match(/}/g) || []).length;
    if (braceCount === 1) {
        keys.push(match[1]);
    }
}

console.log("Top-level keys in REAL_DATA:");
keys.forEach(k => console.log(`- ${k}`));
