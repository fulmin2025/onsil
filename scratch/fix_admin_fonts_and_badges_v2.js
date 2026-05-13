
const fs = require('fs');
const path = require('path');

const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

const corrections = {
    "admin_reservations.html": {
        title: "예약 통합 관리 - The 온실 Admin",
        h1: "예약 통합 관리",
        p: "온실의 모든 실시간 예약 내역을 실시간으로 확인하고 관리할 수 있습니다.",
        btn: "신규 예약 등록",
        modal_title: "신규 예약 수동 등록"
    },
    "admin_partners.html": {
        title: "업체 승인 관리 - The 온실 Admin",
        h2: "입점 신청 내역",
        p: "승인 대기 중인 신규 파트너 목록입니다."
    }
};

adminFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // 1. Remove hardcoded ADMIN badge
    content = content.replace(/<span class="font-bold text-lg text-brand tracking-tight">온실\(Onsil\) <span class="text-\[10px\] bg-red-500 text-white px-1\.5 py-0\.5 rounded ml-1">ADMIN<\/span><\/span>/g, 
                             '<span class="font-bold text-lg text-brand tracking-tight">온실(Onsil) <span id="admin-badge" class="hidden text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>');

    // 2. Fix corrupted titles and headers using substring replacement instead of risky regex
    if (fpath === "admin_reservations.html") {
        content = content.replace(/<title>.*?<\/title>/, `<title>예약 통합 관리 - The 온실 Admin</title>`);
        content = content.replace(/<h1 id="dashboard-title".*?>.*?<\/h1>/, `<h1 id="dashboard-title" class="text-2xl font-bold text-gray-900">예약 통합 관리</h1>`);
        content = content.replace(/<p class="text-gray-500 mt-1">.*?<\/p>/, `<p class="text-gray-500 mt-1">온실의 모든 실시간 예약 내역을 실시간으로 확인하고 관리할 수 있습니다.</p>`);
        
        // Manual replacements for table headers and specific corrupted strings
        const tableHeaderCorrupt = '<th class="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">?수??/th>';
        if (content.includes(tableHeaderCorrupt)) {
            content = content.replace(tableHeaderCorrupt, '<th class="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">접수일시</th>');
        }
        // General cleanup of '?' corrupted areas (this is safer than regex with many ?)
        content = content.replace(/\?약 ?정/g, "예약 일정");
        content = content.replace(/\?비??금액/g, "서비스 금액");
        content = content.replace(/반려?물 ?보/g, "반려동물 정보");
        content = content.replace(/보호\?\?\?락\?/g, "연락처");
        content = content.replace(/\?규 ?약 ?록/g, "신규 예약 등록");
    } else if (fpath === "admin_partners.html") {
        content = content.replace(/<title>.*?<\/title>/, `<title>업체 승인 관리 - The 온실 Admin</title>`);
        content = content.replace(/<h2 class="text-2xl font-black text-gray-900 mb-2">.*?<\/h2>/, `<h2 class="text-2xl font-black text-gray-900 mb-2">입점 신청 내역</h2>`);
    }

    // 3. Add Dynamic Badge Logic
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
    console.log(`Updated: ${fpath}`);
});
