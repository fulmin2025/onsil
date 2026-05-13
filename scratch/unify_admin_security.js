
const fs = require('fs');
const path = require('path');

const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

const adminEmails = [
    'fulmin@nate.com', 
    'theonsil@gmail.com', 
    'admin@theonsil.co.kr', 
    'theonsilofficial@gmail.com', 
    'admin@onsil.com'
];

function getCheckAdminJS(fileName) {
    const isFuneralHomeMgmt = fileName === 'admin_funeral_homes.html' || fileName === 'admin_partners.html';
    
    return `
    <script>
        async function checkAdminAccess() {
            try {
                const user = await Auth.getCurrentUser();
                if (!user) {
                    location.href = 'index.html';
                    return;
                }
                
                const isAdmin = ${JSON.stringify(adminEmails)}.includes(user.email?.toLowerCase()) || user.role === 'admin';
                const isPartner = user.role === 'partner';
                
                ${isFuneralHomeMgmt ? `
                if (!isAdmin) {
                    alert('관리자 전용 페이지입니다.');
                    location.href = 'index.html';
                    return;
                }
                ` : `
                if (!isAdmin && !isPartner) {
                    alert('접근 권한이 없습니다.');
                    location.href = 'index.html';
                    return;
                }
                `}
                
                // Load Page Data
                if (typeof loadReservations === 'function') loadReservations();
                if (typeof loadPendingPartners === 'function') loadPendingPartners();
                if (typeof loadFuneralHomes === 'function') loadFuneralHomes();
                
                // Update UI Badges
                const badge = document.getElementById('admin-badge');
                if (badge) {
                    if (isAdmin) {
                        badge.classList.remove('hidden');
                        badge.textContent = 'ADMIN';
                        badge.className = 'text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1';
                    } else if (isPartner) {
                        badge.classList.remove('hidden');
                        badge.textContent = 'PARTNER';
                        badge.className = 'text-[10px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded ml-1';
                    }
                }
                
                // Hide restricted menu items for partners
                if (isPartner) {
                    const partnersMenu = document.querySelector('a[href="admin_partners.html"]');
                    const funeralMenu = document.querySelector('a[href="admin_funeral_homes.html"]');
                    if (partnersMenu) partnersMenu.classList.add('hidden');
                    if (funeralMenu) funeralMenu.classList.add('hidden');
                }
            } catch (err) {
                console.error("Auth Check Error:", err);
                location.href = 'index.html';
            }
        }
        document.addEventListener('DOMContentLoaded', checkAdminAccess);
    </script>
    `;
}

adminFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    const fileName = path.basename(fpath);
    
    // 1. Remove old checkAdmin/checkAdminAccess scripts and badge scripts
    content = content.replace(/<script>\s*\/\/ Role check.*?<\/script>/gs, '');
    content = content.replace(/<script>\s*async function checkAdminAccess\(\).*?<\/script>/gs, '');
    content = content.replace(/<script>\s*async function checkAdmin\(\).*?<\/script>/gs, '');
    content = content.replace(/<!-- Dynamic Badge & UI Adjustments -->.*?<\/script>/gs, '');
    
    // 2. Insert new standardized security script
    content = content.replace('</body>', `${getCheckAdminJS(fileName)}\n</body>`);
    
    // 3. Ensure header links are consistent
    content = content.replace(/admin_reservations\.html" class="px-4 py-2 text-sm font-bold text-brand bg-brand\/5/g, 'admin_reservations.html" id="nav-res" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5');
    content = content.replace(/admin_partners\.html" class="px-4 py-2 text-sm font-bold text-brand bg-brand\/5/g, 'admin_partners.html" id="nav-partners" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5');
    content = content.replace(/admin_funeral_homes\.html" class="px-4 py-2 text-sm font-bold text-brand bg-brand\/5/g, 'admin_funeral_homes.html" id="nav-homes" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5');
    
    // 4. Highlight active nav
    if (fileName === 'admin_reservations.html') {
        content = content.replace('id="nav-res" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5', 'id="nav-res" class="px-4 py-2 text-sm font-bold text-brand bg-brand/5');
    } else if (fileName === 'admin_partners.html') {
        content = content.replace('id="nav-partners" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5', 'id="nav-partners" class="px-4 py-2 text-sm font-bold text-brand bg-brand/5');
    } else if (fileName === 'admin_funeral_homes.html') {
        content = content.replace('id="nav-homes" class="px-4 py-2 text-sm font-medium text-brand/70 hover:text-brand hover:bg-brand/5', 'id="nav-homes" class="px-4 py-2 text-sm font-bold text-brand bg-brand/5');
    }

    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Secured and Standardized: ${fpath}`);
});
