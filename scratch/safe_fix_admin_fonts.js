
const fs = require('fs');
const path = require('path');

const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

adminFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // Use string replacement for safety with '?'
    const fixMap = {
        "?약": "예약",
        "?합": "통합",
        "?관리": "관리",
        "?관?": "관리",
        "관???보??": "관리 대시보드",
        "?규": "신규",
        "?록": "등록",
        "?공?으?": "성공적으로",
        "?었?니??": "되었습니다.",
        "?이??": "데이터를",
        "불러?는": "불러오는",
        "중입?다": "중입니다",
        "?대": "현재",
        "?습?다": "없습니다",
        "?청": "신청",
        "?역": "내역",
        "?인": "승인",
        "?체": "업체",
        "?장": "현장",
        "?정": "일정",
        "??장": "서비스/업체",
        "?비??": "서비스",
        "?락?": "연락처",
        "?업": "작업",
        "?동": "수동",
        "??장 ?택": "장례식장 선택",
        "?설???택?주?요": "시설을 선택해주세요",
        "?짜": "날짜",
        "?간": "시간",
        "고객 ?함": "고객 성함",
        "?이 ?름": "아이 이름",
        "?름": "이름",
        "?함": "성함",
        "종류 (강아지/고양????": "종류 (강아지/고양이 등)",
        "?말 ???시겠습?까": "정말 삭제하시겠습니까",
        "?패": "실패",
        "?류": "오류",
        "?시": "일시",
        "?작": "조작"
    };

    for (const [key, val] of Object.entries(fixMap)) {
        content = content.split(key).join(val);
    }
    
    // Additional cleanup
    content = content.replace(/<span class="font-bold text-lg text-brand tracking-tight">온실\(Onsil\) <span class="text-\[10px\] bg-red-500 text-white px-1\.5 py-0\.5 rounded ml-1">ADMIN<\/span><\/span>/g, 
                             '<span class="font-bold text-lg text-brand tracking-tight">온실(Onsil) <span id="admin-badge" class="hidden text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>');

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
    console.log(`Safe Fixed: ${fpath}`);
});
