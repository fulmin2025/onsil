const fs = require('fs');

const content = fs.readFileSync('search.html', 'utf8');

// Use regex to extract script tags
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scripts = [];
while ((match = scriptRegex.exec(content)) !== null) {
    if (match[1].trim()) {
        scripts.push(match[1]);
    }
}

// Write the scripts to a file so we can inspect or run it safely
fs.writeFileSync('scratch/search_extracted.js', scripts.join('\n\n// ---- SCRIPT BOUNDARY ---- \n\n'), 'utf8');
console.log('Scripts extracted to scratch/search_extracted.js');
