/**
 * index.html의 바우처 배너 스타일과 스크립트를 변경하여 
 * 상단 메뉴(Header)의 아래에 밀착 고정(fixed top: 64px) 되도록 수정하는 스크립트
 */
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. 배너 시작 div 스타일 변경
const targetDivOpen = `<div id="voucher-banner" class="w-full relative z-[51]" style="background: linear-gradient(135deg, #1a1a2e 0%, #2c2c4a 40%, #1e3a3a 100%); border-bottom: 2px solid #d4af37;">`;
const replacementDivOpen = `<div id="voucher-banner" class="w-full fixed left-0 right-0 z-[49]" style="top: 64px; background: linear-gradient(135deg, #1a1a2e 0%, #2c2c4a 40%, #1e3a3a 100%); border-bottom: 2px solid #d4af37;">`;

// 2. 배너 닫기 버튼 onclick 속성 변경 (닫을 때 첫 섹션의 paddingTop을 원래 헤더 높이인 64px로 복구)
const targetCloseBtn = `onclick="document.getElementById('voucher-banner').style.display='none'; document.getElementById('main-header').style.top='0px'; document.querySelector('section.relative').style.paddingTop='64px';"`;
const replacementCloseBtn = `onclick="document.getElementById('voucher-banner').style.display='none'; const hero = document.querySelector('section.relative'); if(hero) { hero.style.paddingTop = '64px'; }`;

// 3. 스크립트 블록 변경 (헤더의 top은 0으로 고정해두고, 첫 섹션의 paddingTop만 배너 높이만큼 추가로 밀어줌)
const targetScript = `<script>
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
    </script>`;

const replacementScript = `<script>
        // 헤더 아래에 배너를 고정하고 첫 섹션(히어로)의 상단 여백을 동적으로 맞춥니다.
        window.addEventListener('DOMContentLoaded', () => {
            const banner = document.getElementById('voucher-banner');
            const header = document.getElementById('main-header');
            const hero = document.querySelector('section.relative');
            
            if (banner && header) {
                // 헤더 높이 확인 (모바일/데스크톱 대응)
                const headerHeight = header.offsetHeight || 64;
                banner.style.top = headerHeight + 'px';
                
                const adjustPadding = () => {
                    if (banner.style.display !== 'none') {
                        const bannerHeight = banner.offsetHeight;
                        if (hero) {
                            hero.style.paddingTop = (headerHeight + bannerHeight) + 'px';
                        }
                    }
                };
                
                adjustPadding();
                // 창 크기 조절 시 높이 재계산
                window.addEventListener('resize', adjustPadding);
            }
        });
    </script>`;

if (content.includes(targetDivOpen)) {
    content = content.replace(targetDivOpen, replacementDivOpen);
    content = content.replace(targetCloseBtn, replacementCloseBtn);
    content = content.replace(targetScript, replacementScript);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('✅ 바우처 배너 위치 수정 완료! (상단 메뉴 아래 밀착 고정)');
} else {
    console.log('❌ 치환 대상을 찾지 못했습니다. 파일 상태를 확인해보세요.');
}
