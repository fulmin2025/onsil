const { execSync } = require('child_process');
const fs = require('fs');

const files = ['terms.html', 'privacy.html', 'onsil/terms.html', 'onsil/privacy.html'];
const commit = '3e51b3f'; // Use the commit that restored encoding previously

files.forEach(file => {
    try {
        console.log(`Restoring ${file} from ${commit}...`);
        const buffer = execSync(`git show ${commit}:${file}`);
        // Read as UTF-8 (git show output should be UTF-8 if the file is UTF-8 in that commit)
        const content = buffer.toString('utf8');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Successfully restored ${file}`);
    } catch (err) {
        console.error(`Error restoring ${file}: ${err.message}`);
    }
});
