const fs = require('fs');
let content = fs.readFileSync('search.html', 'utf8');

// Search for the specific garbage comment
const garbageStart = content.indexOf('// "추가" 과금 및 0원 등은 기본가(최저가) 산출에서 제외');
if (garbageStart !== -1) {
    console.log("Garbage found at", garbageStart);
    
    // We need to find the boundary
    // The garbage is between the two parsePrice endings.
    const beforeGarbage = content.lastIndexOf('return 99999999;', garbageStart);
    const endOfFirstFunc = content.indexOf('}', beforeGarbage) + 1;
    
    const afterGarbage = content.indexOf('function getExtendedDetails', garbageStart);
    
    const newContent = content.substring(0, endOfFirstFunc) + '\n\n        ' + content.substring(afterGarbage);
    
    fs.writeFileSync('search.html', newContent, 'utf8');
    console.log("Successfully cleaned up the code.");
} else {
    console.log("Could not find garbage comment.");
}
