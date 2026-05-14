const { execSync } = require('child_process');
const fs = require('fs');

const commits = ['236dc3d', '7dffac3', '18e7651'];
const imageMap = {};

commits.forEach(commit => {
    try {
        const content = execSync(`git show ${commit}:search.html`, { encoding: 'utf8' });
        const startMarker = 'const REAL_DATA = {';
        const endMarker = '        };';
        const startIdx = content.indexOf(startMarker);
        const endIdx = content.indexOf(endMarker, startIdx);
        
        if (startIdx !== -1 && endIdx !== -1) {
            const dataStr = content.substring(startIdx + startMarker.length, endIdx);
            // This is a rough way to extract keys and imageUrls
            const regex = /"([^"]+)"\s*:\s*\{[\s\S]*?"imageUrl"\s*:\s*"([^"]+)"/g;
            let match;
            while ((match = regex.exec(dataStr)) !== null) {
                if (!imageMap[match[1]]) {
                    imageMap[match[1]] = match[2];
                }
            }
        }
    } catch (e) {}
});

console.log("Extracted " + Object.keys(imageMap).length + " image mappings.");

// Now apply these to current js/data.js
let dataJs = fs.readFileSync('js/data.js', 'utf8');
for (const [name, url] of Object.entries(imageMap)) {
    // Look for the entry and add imageUrl if missing
    // We'll use a regex to find the object for this name
    const entryRegex = new RegExp(`"${name}"\\s*:\\s*\\{([^}]*)\\}`, 'g');
    dataJs = dataJs.replace(entryRegex, (match, p1) => {
        if (!p1.includes('imageUrl')) {
            return `"${name}": {${p1}, "imageUrl": "${url}"}`;
        }
        return match;
    });
}

fs.writeFileSync('js/data.js', dataJs, 'utf8');
console.log("Updated js/data.js with missing images.");
