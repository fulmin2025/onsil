const fs = require('fs');
const path = require('path');

const historyDir = 'c:\\Users\\Administrator\\AppData\\Roaming\\Code\\User\\History';
const testDir = 'c:\\Users\\Administrator\\.gemini\\test';
const targetPath = 'search.html';
const searchUrl = 'file:///c%3A/Users/Administrator/.gemini/test/search.html';

let bestBackup = null;
let bestTime = 0;

if (fs.existsSync(historyDir)) {
    const folders = fs.readdirSync(historyDir);
    for (const folder of folders) {
        const entriesPath = path.join(historyDir, folder, 'entries.json');
        if (fs.existsSync(entriesPath)) {
            try {
                const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                if (data.resource.toLowerCase() === searchUrl.toLowerCase() || data.resource.toLowerCase().includes('search.html')) {
                    for (const entry of data.entries) {
                        const fileVersionPath = path.join(historyDir, folder, entry.id);
                        if (fs.existsSync(fileVersionPath)) {
                            const content = fs.readFileSync(fileVersionPath, 'utf8');
                            // corrupted file has ? all over Korean text. Check for valid Korean text.
                            // e.g. "장례식장" should exist, and it shouldn't be full of ??.
                            if (content.includes('장례식장') && !content.includes('')) {
                                if (entry.timestamp > bestTime) {
                                    bestTime = entry.timestamp;
                                    bestBackup = { path: fileVersionPath, content: content, timestamp: entry.timestamp };
                                }
                            }
                        }
                    }
                }
            } catch (e) { }
        }
    }
}

if (bestBackup) {
    console.log('Found valid backup from: ' + new Date(bestBackup.timestamp).toLocaleString());
    const fullPath = path.join(testDir, targetPath);
    fs.writeFileSync(fullPath, bestBackup.content, 'utf8');
    console.log('Successfully recovered search.html!');
} else {
    console.log('No valid backup found.');
}
