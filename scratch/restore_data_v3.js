const { execSync } = require('child_process');
const fs = require('fs');

const commit = '7dffac3';
const file = 'search.html';

try {
    const content = execSync(`git show ${commit}:${file}`, { encoding: 'utf8' });
    
    const startMarker = 'const REAL_DATA = {';
    const endMarker = '        };';
    
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker, startIdx);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const realData = content.substring(startIdx, endIdx + endMarker.length);
        
        // Also need the price constants
        const constantsStartIdx = content.indexOf('const FOUR_PAWS_PRICES = [');
        const constantsEndIdx = startIdx; // REAL_DATA starts after constants
        
        if (constantsStartIdx !== -1) {
            const constants = content.substring(constantsStartIdx, constantsEndIdx);
            
            // Need PHONE_DATA too
            const phoneStartIdx = content.indexOf('const PHONE_DATA = {', endIdx);
            const phoneEndIdx = content.indexOf('};', phoneStartIdx);
            let phoneData = '';
            if (phoneStartIdx !== -1 && phoneEndIdx !== -1) {
                phoneData = content.substring(phoneStartIdx, phoneEndIdx + 2);
            }
            
            const finalJs = constants + '\n' + realData + '\n' + phoneData;
            fs.writeFileSync('js/data.js', finalJs, 'utf8');
            console.log("Successfully restored js/data.js from commit " + commit);
        } else {
            console.error("Constants not found");
        }
    } else {
        console.error("REAL_DATA not found");
    }
} catch (e) {
    console.error("Error:", e);
}
