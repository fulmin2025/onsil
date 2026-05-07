const fs = require('fs');
const txt = fs.readFileSync('search.html', 'utf8');
const idx = txt.indexOf('"스타펫": {');
console.log(txt.substring(idx, idx + 500));
