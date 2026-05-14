const fs = require('fs');
const searchHtml = fs.readFileSync('search.html', 'utf8');

const scriptMatch = searchHtml.match(/<script[^>]*>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    fs.writeFileSync('scratch/search_script.js', scriptMatch[1]);
}
