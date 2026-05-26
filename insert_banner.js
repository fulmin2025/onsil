/**
 * index.html에 바우처 배너를 <body> 태그 직후에 삽입하는 스크립트
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const bannerHtml = `
    <!-- 🌿 바우처 배너 (온실 추모 지원) -->
    <div id="voucher-banner" style="position:fixed;top:64px;left:0;right:0;z-index:49;background:linear-gradient(135deg,#1a1a2e 0%,#2c2c4a 40%,#1e3a3a 100%);overflow:hidden;">
        <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
            <div style="position:absolute;top:-20%;left:-10%;width:300px;height:300px;background:radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 70%);border-radius:50%;"></div>
            <div style="position:absolute;bottom:-30%;right:-5%;width:250px;height:250px;background:radial-gradient(circle,rgba(135,160,139,0.15) 0%,transparent 70%);border-radius:50%;"></div>
        </div>
        <div style="position:relative;z-index:1;max-width:640px;margin:0 auto;padding:18px 20px 14px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.35);border-radius:100px;padding:3px 12px;margin-bottom:10px;">
                <span style="width:6px;height:6px;border-radius:50%;background:#d4af37;display:inline-block;animation:pulse-gold 2s infinite;flex-shrink:0;"></span>
                <span style="font-size:11px;font-weight:700;color:#d4c27a;letter-spacing:0.5px;white-space:nowrap;">온실 추모 지원 프로그램</span>
            </div>
            <p style="font-size:16px;font-weight:700;color:#f5f0e8;line-height:1.5;margin:0 0 5px;letter-spacing:-0.3px;font-family:'Nanum Myeongjo',serif;">
                사랑하는 아이에게 줄 수 있는 마지막 배려, <em style="font-style:normal;color:#e8d48b;">'장례'</em>.
            </p>
            <p style="font-size:12.5px;color:rgba(245,240,232,0.7);line-height:1.6;margin:0 0 12px;letter-spacing:-0.2px;">
                준비된 바우처와 함께 가장 깊은 애도의 시간을 마주하세요.
            </p>
            <div style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(212,175,55,0.2) 0%,rgba(212,175,55,0.08) 100%);border:1.5px solid rgba(212,175,55,0.45);border-radius:10px;padding:9px 16px;margin-bottom:14px;">
                <span style="font-size:18px;flex-shrink:0;">🎫</span>
                <span style="font-size:13px;font-weight:800;color:#e8d48b;letter-spacing:-0.3px;line-height:1.4;text-align:left;">
                    마음 편한 이별을 위한&nbsp;
                    <span style="font-size:15px;color:#f4e57a;">총 10만 원</span> 추모 지원 바우처 증정
                </span>
            </div>
            <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
                <a href="search.html" style="display:inline-flex;align-items:center;gap:6px;background:linear-gradient(135deg,#d4af37 0%,#b8972c 100%);color:#1a1a0f;font-size:13px;font-weight:800;padding:9px 18px;border-radius:9px;text-decoration:none;box-shadow:0 4px 14px rgba(212,175,55,0.4);letter-spacing:-0.2px;">
                    <i class="fas fa-gift" style="font-size:11px;"></i> 바우처 받기
                </a>
                <a href="tel:1551-5052" style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);color:rgba(245,240,232,0.9);font-size:13px;font-weight:600;padding:9px 18px;border-radius:9px;text-decoration:none;letter-spacing:-0.2px;">
                    <i class="fas fa-phone-alt" style="font-size:11px;"></i> 1551-5052
                </a>
            </div>
        </div>
        <button onclick="document.getElementById('voucher-banner').style.display='none';document.body.style.paddingTop='0';" style="position:absolute;top:8px;right:12px;background:none;border:none;cursor:pointer;color:rgba(245,240,232,0.45);font-size:15px;padding:4px;line-height:1;" aria-label="배너 닫기">✕</button>
        <div style="height:2px;background:linear-gradient(90deg,transparent 0%,rgba(212,175,55,0.6) 30%,rgba(212,175,55,0.6) 70%,transparent 100%);"></div>
    </div>
    <style>
        @keyframes pulse-gold { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.55;transform:scale(0.8)} }
        #voucher-banner + section, #voucher-banner ~ section:first-of-type { margin-top: var(--banner-h, 200px); }
    </style>
    <script>
        (function() {
            function adjustBanner() {
                var banner = document.getElementById('voucher-banner');
                if (!banner || banner.style.display === 'none') return;
                var h = banner.offsetHeight;
                document.documentElement.style.setProperty('--banner-h', h + 'px');
                // 페이지 콘텐츠 밀어내기
                var firstSection = document.querySelector('body > section, body > main, .hero-section, [class*="min-h"]');
                if (firstSection) firstSection.style.marginTop = h + 'px';
            }
            window.addEventListener('load', adjustBanner);
            window.addEventListener('resize', adjustBanner);
        })();
    </script>
`;

// <body> 태그 직후에 배너 삽입
if (content.includes('<body')) {
    // body 여는 태그 뒤에 삽입
    content = content.replace(/(<body[^>]*>)/, '$1\n' + bannerHtml);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ 바우처 배너 삽입 완료!');
    console.log('📍 삽입 위치: <body> 태그 직후');
} else {
    console.log('❌ <body> 태그를 찾지 못했습니다.');
}
