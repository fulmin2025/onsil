const fs = require('fs');

let searchHtml = fs.readFileSync('search.html', 'utf8');

const targetStr = `const image = item.image_url || (realData && realData.imageUrl) ? (item.image_url || realData.imageUrl) : defaultImage;`;
const replacementStr = `const image = item.imageUrl || item.image_url || (realData && realData.imageUrl) ? (item.imageUrl || item.image_url || realData.imageUrl) : defaultImage;`;

if (searchHtml.includes(targetStr)) {
    searchHtml = searchHtml.replace(targetStr, replacementStr);
    fs.writeFileSync('search.html', searchHtml, 'utf8');
    console.log('Fixed image url fallback in search.html list items.');
} else {
    console.log('Target string not found in search.html');
}
