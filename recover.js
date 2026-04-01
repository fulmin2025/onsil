const fs = require('fs');
const path = require('path');

const historyDir = 'c:\\Users\\Administrator\\AppData\\Roaming\\Antigravity\\User\\History';
const testDir = 'c:\\Users\\Administrator\\.gemini\\test';

const targetFiles = [
    'admin_reservations.html', 'community.html', 'contact.html', 'guide.html',
    'index.html', 'login.html', 'manifest.json', 'memory.html', 'preview_detail.html',
    'reservation.html', 'search.html', 'signup.html', 'terms.html',
    'onsil/community.html', 'onsil/contact.html', 'onsil/guide.html',
    'onsil/index.html', 'onsil/search.html', 'onsil/terms.html'
];

function findLatestValidBackup(targetRelativePath) {
    const searchUrl = 'file:///c%3A/Users/Administrator/.gemini/test/' + targetRelativePath.replace(/\\/g, '/');
    let bestBackup = null;
    let bestTime = 0;

    const folders = fs.readdirSync(historyDir);
    for (const folder of folders) {
        const entriesPath = path.join(historyDir, folder, 'entries.json');
        if (fs.existsSync(entriesPath)) {
            try {
                const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                if (data.resource.toLowerCase() === searchUrl.toLowerCase()) {
                    for (const entry of data.entries) {
                        const fileVersionPath = path.join(historyDir, folder, entry.id);
                        if (fs.existsSync(fileVersionPath)) {
                            const content = fs.readFileSync(fileVersionPath, 'utf8');
                            // Check if it's the corrupted version by looking for "?" where Korean should be, or just check it doesn't contain "온실(Onsil)"
                            // The corruption has "?댁슜" or "?λ"
                            if (!content.includes('?댁슜') && !content.includes('?λ') && content.includes('On-sil') && !content.includes('온실(Onsil)')) {
                                if (entry.timestamp > bestTime) {
                                    bestTime = entry.timestamp;
                                    bestBackup = { path: fileVersionPath, content: content };
                                }
                            }
                        }
                    }
                }
            } catch(e) {}
        }
    }
    return bestBackup;
}

let recoveredCount = 0;
let failedFiles = [];

for (const relPath of targetFiles) {
    const backup = findLatestValidBackup(relPath);
    if (backup) {
        // We found it! Let's do the proper string replacement natively in Node.js (UTF-8 safe)
        const newContent = backup.content.replace(/On-sil/g, '온실(Onsil)');
        const fullPath = path.join(testDir, relPath);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Recovered and updated: ' + relPath);
        recoveredCount++;
    } else {
        console.log('NO VALID BACKUP FOUND FOR: ' + relPath);
        failedFiles.push(relPath);
    }
}
console.log('Total recovered: ' + recoveredCount);
console.log('Failed: ' + failedFiles.join(', '));
