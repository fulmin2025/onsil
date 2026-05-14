const fs = require('fs');
let content = fs.readFileSync('search.html', 'utf8');

// The garbage block looks like this:
const garbagePattern = /\}\s*\/\/ "추가" 과금 및 0원 등은 기본가\(최저가\) 산출에서 제외[\s\S]*?return 99999999;\s*\}\s*\n\n\s*function getExtendedDetails/;

const match = content.match(garbagePattern);
if (match) {
    console.log("Garbage found. Replacing...");
    // We want to keep the first "}" and the "\n\n        function getExtendedDetails"
    const fixed = content.replace(garbagePattern, '}\n\n        function getExtendedDetails');
    fs.writeFileSync('search.html', fixed, 'utf8');
    console.log("Cleaned up search.html.");
} else {
    console.log("Garbage pattern not matched. Trying alternative...");
    // Fallback: search for the specific lines
    const startIdx = content.indexOf('// "추가" 과금 및 0원 등은 기본가(최저가) 산출에서 제외');
    if (startIdx !== -1) {
        const endOfFunc = content.indexOf('function getExtendedDetails', startIdx);
        // Find the last "}" before the garbage start
        const lastValidBrace = content.lastIndexOf('}', startIdx);
        
        const newContent = content.substring(0, lastValidBrace + 1) + '\n\n        ' + content.substring(endOfFunc);
        fs.writeFileSync('search.html', newContent, 'utf8');
        console.log("Cleaned up using index method.");
    }
}
