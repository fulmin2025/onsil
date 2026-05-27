const fs = require('fs');
const path = require('path');

// 이미지 복사
const srcPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\018cb23c-377e-45f3-b085-ca0379e7b06d\\onsil_three_services_1779843840759.png';
const destDir = path.join(__dirname, 'images');
const destPath = path.join(destDir, 'onsil_three_services.png');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('✅ 이미지 복사 성공:', destPath);
} else {
    console.log('❌ 원본 이미지를 찾을 수 없습니다.');
}
