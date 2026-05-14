const { execSync } = require('child_process');
const fs = require('fs');

const commit = '7dffac3';
const file = 'search.html';

try {
    const content = execSync(`git show ${commit}:${file}`, { encoding: 'utf8' });
    
    // Find everything between const FOUR_PAWS_PRICES and the end of PHONE_DATA
    const startMarker = 'const FOUR_PAWS_PRICES = [';
    const endMarker = 'const PHONE_DATA = {';
    
    const startIdx = content.indexOf(startMarker);
    const midIdx = content.indexOf(endMarker, startIdx);
    const endIdx = content.indexOf('};', midIdx);
    
    if (startIdx !== -1 && midIdx !== -1 && endIdx !== -1) {
        const finalJs = content.substring(startIdx, endIdx + 2);
        fs.writeFileSync('js/data.js', finalJs, 'utf8');
        console.log("Successfully restored js/data.js from commit " + commit);
    } else {
        console.error("Markers not found", { startIdx, midIdx, endIdx });
    }
} catch (e) {
    console.error("Error:", e);
}
