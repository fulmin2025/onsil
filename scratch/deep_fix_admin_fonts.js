
const fs = require('fs');
const path = require('path');

const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

adminFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // 1. Common Font Fixes (Corrupted characters cleanup)
    content = content.replace(/\?약/g, "예약");
    content = content.replace(/\?합/g, "통합");
    content = content.replace(/\?합/g, "통합"); // Double check
    content = content.replace(/\?관리/g, "관리");
    content = content.replace(/\?관?/g, "관리");
    content = content.replace(/관???보??/g, "관리 대시보드");
    content = content.replace(/\?규/g, "신규");
    content = content.replace(/\?록/g, "등록");
    content = content.replace(/\?공?으?/g, "성공적으로");
    content = content.replace(/\?었?니??/g, "되었습니다.");
    content = content.replace(/\?이??/g, "데이터를");
    content = content.replace(/불러\?는/g, "불러오는");
    content = content.replace(/중입\?다/g, "중입니다");
    content = content.replace(/\?대/g, "현재");
    content = content.replace(/\?습\?다/g, "없습니다");
    content = content.replace(/\?청/g, "신청");
    content = content.replace(/\?역/g, "내역");
    content = content.replace(/\?인/g, "승인");
    content = content.replace(/\?체/g, "업체");
    content = content.replace(/\?장/g, "현장");
    content = content.replace(/\?정/g, "일정");
    content = content.replace(/\???장/g, "서비스/업체");
    content = content.replace(/\?비??/g, "서비스");
    content = content.replace(/\?락?/g, "연락처");
    content = content.replace(/\?업/g, "작업");
    content = content.replace(/\?동/g, "수동");
    content = content.replace(/\???장 ?택/g, "장례식장 선택");
    content = content.replace(/\?설\?\?\?택\?주\?요/g, "시설을 선택해주세요");
    content = content.replace(/\?짜/g, "날짜");
    content = content.replace(/\?간/g, "시간");
    content = content.replace(/고객 ?함/g, "고객 성함");
    content = content.replace(/\?이 ?름/g, "아이 이름");
    content = content.replace(/\?름/g, "이름");
    content = content.replace(/\?함/g, "성함");
    content = content.replace(/종류 \(강아지\/고양\?\?\?\?/g, "종류 (강아지/고양이 등)");
    content = content.replace(/\?말 ??\?시겠습\?까/g, "정말 삭제하시겠습니까");
    content = content.replace(/\?패/g, "실패");
    content = content.replace(/\?류/g, "오류");
    content = content.replace(/\?시/g, "일시");
    content = content.replace(/\?작/g, "조작");
    content = content.replace(/\?인/g, "승인");
    
    // 2. Remove hardcoded ADMIN badge and add Dynamic logic
    if (content.includes('ADMIN</span></span>')) {
        content = content.replace(/<span class="font-bold text-lg text-brand tracking-tight">온실\(Onsil\) <span class="text-\[10px\] bg-red-500 text-white px-1\.5 py-0\.5 rounded ml-1">ADMIN<\/span><\/span>/g, 
                                 '<span class="font-bold text-lg text-brand tracking-tight">온실(Onsil) <span id="admin-badge" class="hidden text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>');
    }

    const badgeScript = `
    <!-- Dynamic Badge & UI Adjustments -->
    <script>
        async function updateAdminUI() {
            try {
                const user = await Auth.getCurrentUser();
                if (user) {
                    const badge = document.getElementById('admin-badge');
                    if (badge) {
                        if (user.role === 'admin' || user.email === 'fulmin@nate.com') {
                            badge.classList.remove('hidden');
                            badge.textContent = 'ADMIN';
                            badge.className = 'text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1';
                        } else if (user.role === 'partner') {
                            badge.classList.remove('hidden');
                            badge.textContent = 'PARTNER';
                            badge.className = 'text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded ml-1';
                        } else {
                            badge.classList.add('hidden');
                        }
                    }
                }
            } catch (err) { console.error("Admin UI Error:", err); }
        }
        document.addEventListener('DOMContentLoaded', updateAdminUI);
    </script>
    `;
    
    if (!content.includes('updateAdminUI()')) {
        content = content.replace('</body>', `${badgeScript}\n</body>`);
    }

    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Deep Fixed: ${fpath}`);
});
