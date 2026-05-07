const jwt = require('jsonwebtoken');
const fs = require('fs');

// 사용 방법: node make_apple_key.js TEAM_ID KEY_ID AuthKey_파일이름.p8

const args = process.argv.slice(2);
if (args.length < 3) {
    console.log(`사용법: node make_apple_key.js <팀ID> <키ID> <p8파일경로>`);
    console.log(`예시: node make_apple_key.js A1B2C3D4E5 XYZ1234567 AuthKey_XYZ1234567.p8`);
    process.exit(1);
}

const teamId = args[0];
const keyId = args[1];
const p8Path = args[2];
const clientId = 'kr.co.theonsil.signin'; // 위에서 만드신 Identifier

try {
    const privateKey = fs.readFileSync(p8Path, 'utf8');
    const token = jwt.sign({}, privateKey, {
        algorithm: 'ES256',
        expiresIn: '180d',
        audience: 'https://appleid.apple.com',
        issuer: teamId,
        subject: clientId,
        keyid: keyId,
    });
    console.log('\n========================================================');
    console.log('✅ 성공! 아래의 긴 영문/숫자 텍스트가 [Secret Key] 입니다.');
    console.log('이 텍스트를 복사해서 Supabase의 Secret Key 칸에 붙여넣으세요.');
    console.log('========================================================\n');
    console.log(token);
    console.log('\n========================================================\n');
} catch (error) {
    console.error('오류 발생:', error.message);
    console.log('p8 파일의 경로가 정확한지 확인해 주세요.');
}
