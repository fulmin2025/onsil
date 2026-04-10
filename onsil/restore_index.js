const fs = require('fs');
const { execSync } = require('child_process');

const targetFile = 'index.html';
const stableCommit = '236dc3d';
const GIT_PATH = '"C:\\Program Files\\Git\\cmd\\git.exe"';

console.log(`Restoring ${targetFile} from ${stableCommit}...`);

try {
    // Git에서 바이너리로 소스를 직접 읽어옵니다 (쉘 인코딩 방지)
    const buffer = execSync(`${GIT_PATH} show ${stableCommit}:${targetFile}`);
    
    // index.html 정밀 복원
    // UTF-8로 변환하여 저장 (BOM 없이)
    fs.writeFileSync(targetFile, buffer);
    
    console.log(`Successfully restored ${targetFile} to UTF-8 from ${stableCommit}`);
} catch (err) {
    console.error(`Error processing ${targetFile}:`, err.message);
}
