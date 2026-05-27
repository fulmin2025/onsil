const fs = require('fs');
const path = require('path');

// 새로 생성된 따뜻한 분위기 이미지 경로
const srcPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\018cb23c-377e-45f3-b085-ca0379e7b06d\\onsil_warm_services_1779844063651.png';
const destPath = path.join(__dirname, 'images', 'onsil_three_services.png');

if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log('✅ 따뜻한 감성 이미지 덮어쓰기 완료:', destPath);
} else {
    console.log('❌ 원본 이미지를 찾을 수 없습니다.');
}
