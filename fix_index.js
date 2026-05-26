/**
 * 복원된 index.html에 바우처 배너를 올바른 위치(헤더 닫는 태그 뒤)에 삽입
 */
const fs = require('fs');
const path = require('path');

// 1. 깨끗한 원본 파일로 index.html 복원
const cleanFile = path.join(__dirname, 'index_restored_clean.html');
const targetFile = path.join(__dirname, 'index.html');

if (!fs.existsSync(cleanFile)) {
    console.log('❌ 복원 파일이 없습니다.');
    process.exit(1);
}

let content = fs.readFileSync(cleanFile, 'utf8');
console.log('✅ 원본 파일 읽기 완료. 줄 수:', content.split('\n').length);
console.log('Hero 섹션 존재:', content.includes('Hero Section') || content.includes('min-h-[90vh]'));

// 2. 바우처 배너 HTML (헤더 다음에 올바르게 삽입될 버전)
const bannerHtml = `
    <!-- 🌿 온실 추모 지원 바우처 배너 -->
    <div id="voucher-banner" style="background:linear-gradient(135deg,#1a1a2e 0%,#2c2c4a 40%,#1e3a3a 100%);overflow:hidden;position:relative;">
        <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
            <div style="position:absolute;top:-40%;left:-10%;width:300px;height:300px;background:radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 70%);border-radius:50%;"></div>
            <div style="position:absolute;bottom:-40%;right:-5%;width:250px;height:250px;background:radial-gradient(circle,rgba(135,160,139,0.15) 0%,transparent 70%);border-radius:50%;"></div>
        </div>
        <div style="position:relative;z-index:1;max-width:640px;margin:0 auto;padding:18px 44px 14px 20px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.35);border-radius:100px;padding:3px 12px;margin-bottom:10px;">
                <span style="width:6px;height:6px;border-radius:50%;background:#d4af37;display:inline-block;animation:pulse-gold 2s infinite;flex-shrink:0;"></span>
                <span style="font-size:11px;font-weight:700;color:#d4c27a;letter-spacing:0.5px;white-space:nowrap;">온실 추모 지원 프로그램</span>
            </div>
            <p style="font-size:15px;font-weight:700;color:#f5f0e8;line-height:1.5;margin:0 0 4px;letter-spacing:-0.3px;font-family:'Nanum Myeongjo',serif;">
                사랑하는 아이에게 줄 수 있는 마지막 배려, <em style="font-style:normal;color:#e8d48b;">'장례'</em>.
            </p>
            <p style="font-size:12px;color:rgba(245,240,232,0.7);line-height:1.6;margin:0 0 10px;letter-spacing:-0.2px;">
                준비된 바우처와 함께 가장 깊은 애도의 시간을 마주하세요.
            </p>
            <div style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(212,175,55,0.2) 0%,rgba(212,175,55,0.08) 100%);border:1.5px solid rgba(212,175,55,0.45);border-radius:10px;padding:8px 14px;margin-bottom:12px;">
                <span style="font-size:16px;flex-shrink:0;">🎫</span>
                <span style="font-size:12.5px;font-weight:800;color:#e8d48b;letter-spacing:-0.3px;line-height:1.4;text-align:left;">
                    마음 편한 이별을 위한 <span style="font-size:14px;color:#f4e57a;">총 10만 원</span> 추모 지원 바우처 증정
                </span>
            </div>
            <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                <a href="search.html" style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#d4af37 0%,#b8972c 100%);color:#1a1a0f;font-size:13px;font-weight:800;padding:8px 16px;border-radius:9px;text-decoration:none;box-shadow:0 4px 14px rgba(212,175,55,0.4);letter-spacing:-0.2px;">
                    <i class="fas fa-gift" style="font-size:11px;"></i> 바우처 받기
                </a>
                <a href="tel:1551-5052" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:rgba(245,240,232,0.9);font-size:13px;font-weight:600;padding:8px 16px;border-radius:9px;text-decoration:none;letter-spacing:-0.2px;">
                    <i class="fas fa-phone-alt" style="font-size:11px;"></i> 1551-5052
                </a>
            </div>
        </div>
        <button onclick="document.getElementById('voucher-banner').style.display='none';" style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(245,240,232,0.5);font-size:14px;padding:6px;line-height:1;" aria-label="배너 닫기">✕</button>
        <div style="height:2px;background:linear-gradient(90deg,transparent 0%,rgba(212,175,55,0.6) 30%,rgba(212,175,55,0.6) 70%,transparent 100%);"></div>
    </div>
    <style>
        @keyframes pulse-gold { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.55;transform:scale(0.8)} }
    </style>

`;

// 3. 헤더 닫는 태그 "</header>" 바로 뒤에 배너 삽입
const headerCloseTag = '</header>';
if (content.includes(headerCloseTag)) {
    content = content.replace(headerCloseTag, headerCloseTag + bannerHtml);
    console.log('✅ 배너 삽입 위치: </header> 직후');
} else {
    console.log('❌ </header> 태그를 찾지 못했습니다!');
    process.exit(1);
}

// 4. 저장
fs.writeFileSync(targetFile, content, 'utf8');
console.log('✅ index.html 저장 완료!');
console.log('최종 줄 수:', content.split('\n').length);

// 5. 검증
const final = fs.readFileSync(targetFile, 'utf8');
console.log('\n=== 최종 검증 ===');
console.log('voucher-banner 존재:', final.includes('voucher-banner'));
console.log('Hero Section 존재:', final.includes('Hero Section') || final.includes('min-h-[90vh]'));
console.log('헤더 존재:', final.includes('main-header'));
console.log('Mobile Nav 존재:', final.includes('mobile-nav'));
