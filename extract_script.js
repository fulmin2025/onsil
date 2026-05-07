const fs = require('fs');
const html = fs.readFileSync('search.html', 'utf8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let i = 1;
while ((match = scriptRegex.exec(html)) !== null) {
    fs.writeFileSync(`test_script_${i}.js`, match[1], 'utf8');
    i++;
}
