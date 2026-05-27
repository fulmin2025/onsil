const fs = require('fs');
const path = require('path');

// 사용자가 업로드한 이미지 경로
const srcPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\018cb23c-377e-45f3-b085-ca0379e7b06d\\media__1779844128638.jpg';
const destPath = path.join(__dirname, 'images', 'onsil_three_services.png');

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('✅ 업로드된 감성 이미지로 복사 및 교체 완료:', destPath);
} else {
    console.log('❌ 업로드된 이미지를 찾을 수 없습니다.');
}
