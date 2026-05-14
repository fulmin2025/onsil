const fs = require('fs');

const content = fs.readFileSync('search.html', 'utf8');

// The exact string to remove
const targetString = `                                // "추가" 과금 및 0원 등은 기본가(최저가) 산출에서 제외\r
                                if (!isNaN(val) && val > 0 && val < min && !p.name.includes('추가') && !p.name.includes('초과') && !p.name.includes('가산')) {\r
                                    min = val;\r
                                }\r
                            }\r
                        });\r
                        return min;\r
                    }\r
                }\r
            }\r
            return 99999999;\r
        }`;

if (content.includes(targetString)) {
    const newContent = content.replace(targetString, '');
    fs.writeFileSync('search.html', newContent, 'utf8');
    console.log("Successfully removed the dangling syntax error block.");
} else {
    // try with only \n just in case
    const targetStringLF = targetString.replace(/\r/g, '');
    if (content.includes(targetStringLF)) {
        const newContent = content.replace(targetStringLF, '');
        fs.writeFileSync('search.html', newContent, 'utf8');
        console.log("Successfully removed the dangling syntax error block (LF).");
    } else {
        console.log("Target string not found!");
    }
}
