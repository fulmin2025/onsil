const fs = require('fs');
const path = require('path');

function findRecentFiles(dir, minutes = 15) {
    let results = [];
    const now = Date.now();

    function traverse(currentDir) {
        let files;
        try {
            files = fs.readdirSync(currentDir);
        } catch (e) {
            return;
        }

        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            let stat;
            try {
                stat = fs.statSync(fullPath);
            } catch (e) {
                continue;
            }

            if (stat.isDirectory()) {
                if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('ios/App')) {
                    traverse(fullPath);
                }
            } else {
                const diffMin = (now - stat.mtimeMs) / (1000 * 60);
                if (diffMin <= minutes) {
                    results.push({
                        path: fullPath,
                        mtime: stat.mtime,
                        size: stat.size
                    });
                }
            }
        }
    }

    traverse(dir);
    return results;
}

// 1. C:\Users\Administrator\.gemini 내의 최근 파일 검색
console.log('--- .gemini 폴더 내 최근 15분 수정 파일 검색 ---');
const geminiFiles = findRecentFiles('C:\\Users\\Administrator\\.gemini', 15);
geminiFiles.sort((a, b) => b.mtime - a.mtime);
geminiFiles.forEach(f => {
    console.log(`[FILE] ${f.path} (${(f.size/1024).toFixed(1)} KB) - ${f.mtime}`);
});
