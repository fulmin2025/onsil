
const fs = require('fs');
const path = require('path');

const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

// 1. Correct Korean Text for Corrupted Files
const corrections = {
    "admin_reservations.html": {
        title: "예약 통합 관리 - The 온실 Admin",
        h1: "예약 통합 관리",
        p: "온실의 모든 실시간 예약 내역을 실시간으로 확인하고 관리할 수 있습니다.",
        btn: "신규 예약 등록",
        th: ["접수일시", "서비스/업체", "예약 일정", "서비스 금액", "반려동물 정보", "보호자 연락처", "작업"],
        modal_title: "신규 예약 수동 등록",
        modal_facility_label: "장례식장 선택",
        modal_facility_placeholder: "시설을 선택해주세요",
        modal_date: "예약 날짜",
        modal_time: "예약 시간",
        modal_name: "고객 성함",
        modal_pet_name: "아이 이름",
        modal_pet_type: "종류 (강아지/고양이 등)",
        modal_phone: "보호자 연락처",
        modal_submit: "예약 등록"
    },
    "admin_partners.html": {
        title: "업체 승인 관리 - The 온실 Admin",
        h2: "입점 신청 내역",
        p: "승인 대기 중인 신규 파트너 목록입니다.",
        th: ["신청 일시", "장례식장명", "담당자 / 연락처", "조작"],
        empty: "현재 승인 대기 중인 신청 건이 없습니다."
    }
};

adminFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // 2. Remove hardcoded ADMIN badge
    content = content.replace(/<span class="font-bold text-lg text-brand tracking-tight">온실\(Onsil\) <span class="text-\[10px\] bg-red-500 text-white px-1\.5 py-0\.5 rounded ml-1">ADMIN<\/span><\/span>/g, 
                             '<span class="font-bold text-lg text-brand tracking-tight">온실(Onsil) <span id="admin-badge" class="hidden text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>');

    // 3. Apply specific text corrections for corrupted files
    if (corrections[fpath]) {
        const c = corrections[fpath];
        if (fpath === "admin_reservations.html") {
            content = content.replace(/<title>.*?<\/title>/, `<title>${c.title}</title>`);
            content = content.replace(/<h1 id="dashboard-title".*?>.*?<\/h1>/, `<h1 id="dashboard-title" class="text-2xl font-bold text-gray-900">${c.h1}</h1>`);
            content = content.replace(/<p class="text-gray-500 mt-1">.*?<\/p>/, `<p class="text-gray-500 mt-1">${c.p}</p>`);
            content = content.replace(/<i class="fas fa-plus"><\/i> .*?\n/g, `<i class="fas fa-plus"></i> ${c.btn}\n`);
            content = content.replace(/\?규 ?약 ?록/g, c.btn); // Generic corrupted text
            
            // Modal corrections
            content = content.replace(/\?규 ?약 ?동 ?록/g, c.modal_title);
            content = content.replace(/\???장 ?택/g, c.modal_facility_label);
            content = content.replace(/\?설???택?주?요/g, c.modal_facility_placeholder);
            content = content.replace(/\?약 ?짜/g, c.modal_date);
            content = content.replace(/\?약 ?간/g, c.modal_time);
            content = content.replace(/고객 ?함/g, c.modal_name);
            content = content.replace(/\?이 ?름/g, c.modal_pet_name);
            content = content.replace(/종류 \(강아지\/고양\?\?\?\?/g, c.modal_pet_type);
            content = content.replace(/보호\?\?\?락\?/g, c.modal_phone);
            content = content.replace(/\?약 ?록/g, c.modal_submit);
            
            // Table headers
            content = content.replace(/\?수\?\?\//g, "접수일시");
            content = content.replace(/\?\?\?장/g, "서비스/업체");
            content = content.replace(/\?약 ?정/g, "예약 일정");
            content = content.replace(/\?비\?\? 금액/g, "금액");
            content = content.replace(/반려\?물 ?보/g, "반려동물 정보");
            content = content.replace(/보호\?\?\?락\?/g, "연락처");
            content = content.replace(/\?업/g, "작업");
        } else if (fpath === "admin_partners.html") {
            content = content.replace(/<title>.*?<\/title>/, `<title>${c.title}</title>`);
            content = content.replace(/<h2 class="text-2xl font-black text-gray-900 mb-2">.*?<\/h2>/, `<h2 class="text-2xl font-black text-gray-900 mb-2">${c.h2}</h2>`);
            content = content.replace(/<p class="text-sm text-gray-500 font-medium">.*?<\/p>/, `<p class="text-sm text-gray-500 font-medium">${c.p}</p>`);
            
            // Table headers
            content = content.replace(/\?청 ?시/g, "신청 일시");
            content = content.replace(/\?\?\?장\?/g, "장례식장명");
            content = content.replace(/\?당\?\? \/ ?락\?/g, "담당자 / 연락처");
            content = content.replace(/\?작/g, "조작");
        }
    }

    // 4. Add JavaScript to handle dynamic badge and strict partner name
    const badgeScript = `
        // Dynamic Badge & UI Adjustments
        async function updateAdminUI() {
            const user = await Auth.getCurrentUser();
            if (user) {
                const badge = document.getElementById('admin-badge');
                if (badge) {
                    if (user.role === 'admin') {
                        badge.classList.remove('hidden');
                        badge.textContent = 'ADMIN';
                        badge.className = 'text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1';
                    } else if (user.role === 'partner') {
                        badge.classList.remove('hidden');
                        badge.textContent = 'PARTNER';
                        badge.className = 'text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded ml-1';
                    }
                }
            }
        }
        document.addEventListener('DOMContentLoaded', updateAdminUI);
    `;
    
    if (!content.includes('updateAdminUI()')) {
        content = content.replace('</body>', `<script>${badgeScript}</script>\n</body>`);
    }

    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Updated and Fixed: ${fpath}`);
});
