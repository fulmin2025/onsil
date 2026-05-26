/**
 * index.html에 바우처 배너를 올바른 위치에 삽입하는 스크립트
 */
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const bannerHtml = `
    <!-- 🌿 온실 추모 지원 바우처 배너 -->
    <div id="voucher-banner" class="w-full relative z-[51]" style="background: linear-gradient(135deg, #1a1a2e 0%, #2c2c4a 40%, #1e3a3a 100%); border-bottom: 2px solid #d4af37;">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-12 -left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-12 -right-5 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl"></div>
        </div>
        <div class="max-w-md mx-auto px-4 py-4 text-center relative z-10">
            <!-- 상단 뱃지 -->
            <div class="inline-flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/35 rounded-full px-3 py-1 mb-2">
                <span class="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></span>
                <span class="text-[10px] font-bold text-yellow-300 tracking-wider">온실 추모 지원 프로그램</span>
            </div>
            
            <!-- 메인 카피 -->
            <p class="text-sm font-bold text-gray-100 leading-snug mb-1 font-serif">
                사랑하는 아이에게 줄 수 있는 마지막 배려, <span class="text-yellow-300 font-extrabold">‘장례’</span>.
            </p>
            <!-- 서브 카피 -->
            <p class="text-[11px] text-gray-300/90 leading-normal mb-3">
                준비된 바우처와 함께 가장 깊은 애도의 시간을 마주하세요.
            </p>
            
            <!-- 바우처 박스 -->
            <div class="bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 border border-yellow-500/40 rounded-xl px-4 py-2.5 mb-3 inline-flex items-center gap-2">
                <span class="text-lg">🎫</span>
                <span class="text-xs font-black text-yellow-200 tracking-tight text-left">
                    마음 편한 이별을 위한 <span class="text-sm text-yellow-400 font-black underline">총 10만 원</span> 추모 지원 바우처 증정
                </span>
            </div>
            
            <!-- 버튼 -->
            <div class="flex items-center justify-center gap-2">
                <a href="search.html" class="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-xs font-extrabold px-4 py-2 rounded-lg shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform">
                    <i class="fas fa-gift text-[10px]"></i> 바우처 받기
                </a>
                <a href="tel:1551-5052" class="flex items-center gap-1 bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-bold px-3 py-2 rounded-lg">
                    <i class="fas fa-phone-alt text-[10px]"></i> 1551-5052
                </a>
            </div>
            
            <!-- 닫기 버튼 -->
            <button onclick="document.getElementById('voucher-banner').style.display='none'; document.getElementById('main-header').style.top='0px'; document.querySelector('section.relative').style.paddingTop='64px';" class="absolute top-3 right-3 text-gray-400/80 hover:text-white text-sm p-1">
                ✕
            </button>
        </div>
    </div>
    
    <script>
        // 배너 높이만큼 헤더와 첫 섹션의 위치를 동적으로 조절합니다.
        window.addEventListener('DOMContentLoaded', () => {
            const banner = document.getElementById('voucher-banner');
            const header = document.getElementById('main-header');
            const hero = document.querySelector('section.relative');
            
            if (banner && header) {
                const bannerHeight = banner.offsetHeight;
                header.style.top = bannerHeight + 'px';
                if (hero) {
                    hero.style.paddingTop = (bannerHeight + 64) + 'px';
                }
            }
        });
    </script>
`;

const headerCloseTag = '</header>';
if (content.includes(headerCloseTag)) {
    content = content.replace(headerCloseTag, headerCloseTag + '\n' + bannerHtml);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('✅ index.html에 바우처 배너 삽입 성공!');
} else {
    console.log('❌ </header> 태그를 찾지 못했습니다.');
}
