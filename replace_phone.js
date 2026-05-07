const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const oldPhone = '1551-5052';
const newPhone = '1551-5052';

walkDir('.', (filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.json')) {
        if (filePath.includes('node_modules') || filePath.includes('.git')) return;
        
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(oldPhone)) {
            console.log(`Replacing in ${filePath}`);
            let newContent = content.split(oldPhone).join(newPhone);
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    }
});
