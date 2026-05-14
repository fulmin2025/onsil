const fs = require('fs');
let content = fs.readFileSync('search.html', 'utf8');

// Identify the broken range
const startMarker = 'return 99999999;\n        }\n                                // "추가" 과금';
const endMarker = 'return 99999999;\n        }\n\n        function getExtendedDetails(item) {';

if (content.includes('return 99999999;\n        }\n                                // "추가" 과금')) {
    console.log("Broken pattern found. Fixing...");
    
    // We want to keep one "return 99999999;\n        }" and one "\n\n        function getExtendedDetails(item) {"
    // The part to remove is from the first "}" (line 4185) end to the second "}" (line 4197) end.
    
    const firstEndIdx = content.indexOf('return 99999999;\n        }') + 'return 99999999;\n        }'.length;
    const nextFuncIdx = content.indexOf('function getExtendedDetails(item) {');
    
    const newContent = content.substring(0, firstEndIdx) + '\n\n        ' + content.substring(nextFuncIdx);
    
    fs.writeFileSync('search.html', newContent, 'utf8');
    console.log("Fixed search.html syntax.");
} else {
    console.log("Pattern not found. Checking alternative...");
    // If exact string doesn't match due to whitespace, let's try a more robust approach
}
