const fs = require('fs');
const path = require('path');

function copyFolderSync(from, to) {
    if (!fs.existsSync(from)) return;
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        const stat = fs.lstatSync(fromPath);
        if (stat.isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else if (stat.isDirectory()) {
            copyFolderSync(fromPath, toPath);
        }
    });
}

function syncAllFiles() {
    console.log("--- onsil/ 폴더 생성 및 동기화 시작 (Node.js) ---");
    const onsilDir = path.join(__dirname, 'onsil');
    
    if (!fs.existsSync(onsilDir)) {
        fs.mkdirSync(onsilDir, { recursive: true });
        console.log("onsil/ 디렉토리를 생성했습니다.");
    }
    
    // 1. 루트 파일 복사
    const files = fs.readdirSync(__dirname);
    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isFile()) {
            if (file.endsWith('.html') || ['manifest.json', 'sw.js', 'robots.txt', 'sitemap.xml'].includes(file)) {
                fs.copyFileSync(filePath, path.join(onsilDir, file));
                console.log(`성공: ${file} -> onsil/${file}`);
            }
        }
    });
    
    // 2. 폴더 복사
    const dirs = ['js', 'images', 'components', 'icons', 'lib', 'resources'];
    dirs.forEach(d => {
        const srcDir = path.join(__dirname, d);
        const destDir = path.join(onsilDir, d);
        if (fs.existsSync(srcDir)) {
            if (fs.existsSync(destDir)) {
                fs.rmSync(destDir, { recursive: true, force: true });
            }
            copyFolderSync(srcDir, destDir);
            console.log(`폴더 복사 성공: ${d}/ -> onsil/${d}/`);
        }
    });
    
    console.log("--- 동기화 완료 ---");
}

syncAllFiles();
