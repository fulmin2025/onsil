
const fs = require('fs');
const path = require('path');

const userFiles = ["search.html", "guide.html", "community.html", "self-diagnosis.html", "memory.html", "detail.html", "mypage.html", "reservation.html", "contact.html", "partnership.html", "login.html", "signup.html"];
const adminFiles = ["admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html"];

const allUserFiles = [...userFiles, ...userFiles.map(f => `onsil/${f}`)];
const allAdminFiles = [...adminFiles, ...adminFiles.map(f => `onsil/${f}`)];

const newTailwind = `    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            DEFAULT: '#2C3E50',
                            light: '#34495E',
                            dark: '#1A252F',
                            cream: '#F8F6F3',
                            warm: '#D4A574',
                            warmDark: '#B8894E',
                            sage: '#87A08B',
                            mist: '#E8ECE9'
                        },
                        partner: "#1B2B48",
                        primary: "#1B2B48",
                        accent: "#D4A574",
                        onsil: "#8D7B68"
                    },
                    fontFamily: {
                        sans: ['Pretendard', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>`;

function getUserHeader(activePage) {
    const searchCls = activePage.includes("search") ? "text-brand font-bold bg-brand/5" : "text-brand/70 font-medium hover:text-brand hover:bg-brand/5";
    const guideCls = activePage.includes("guide") ? "text-brand font-bold bg-brand/5" : "text-brand/70 font-medium hover:text-brand hover:bg-brand/5";
    const diagCls = activePage.includes("self-diagnosis") ? "text-brand font-bold bg-brand/5" : "text-brand/70 font-medium hover:text-brand hover:bg-brand/5";
    const memoCls = activePage.includes("memory") ? "text-brand font-bold bg-brand/5" : "text-brand/70 font-medium hover:text-brand hover:bg-brand/5";
    const commCls = activePage.includes("community") ? "text-brand font-bold bg-brand/5" : "text-brand/70 font-medium hover:text-brand hover:bg-brand/5";

    return `    <!-- Header -->
    <header id="main-header" class="fixed top-0 z-50 w-full bg-white border-b border-brand/5 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                    <span class="text-white text-xs font-bold">온</span>
                </div>
                <span class="font-bold text-lg text-brand tracking-tight">온실(Onsil)</span>
            </a>
            <nav class="hidden lg:flex items-center gap-1">
                <a href="search.html" class="px-4 py-2 text-sm ${searchCls} rounded-lg transition-all">장례식장 찾기</a>
                <a href="guide.html" class="px-4 py-2 text-sm ${guideCls} rounded-lg transition-all">이별 가이드</a>
                <a href="self-diagnosis.html" class="px-4 py-2 text-sm ${diagCls} rounded-lg transition-all">건강자가진단</a>
                <a href="memory.html" class="px-4 py-2 text-sm ${memoCls} rounded-lg transition-all">추억 가이드</a>
                <a href="community.html" class="px-4 py-2 text-sm ${commCls} rounded-lg transition-all">커뮤니티</a>
            </nav>
            <div class="hidden lg:flex items-center gap-1.5">
                <div id="auth-container"></div>
                <a href="search.html?quote=true" class="bg-brand-warm hover:bg-brand-warmDark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2"><i class="fas fa-calculator"></i> 견적받기</a>
                <button onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })" class="bg-brand-sage hover:bg-[#87A08B]/90 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2"><i class="fas fa-calendar-check text-sm"></i> 예약하기</button>
                <a href="tel:1551-5052" class="bg-brand-warm hover:bg-brand-warmDark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-warm/20 flex items-center gap-2"><i class="fas fa-phone-alt text-xs"></i> 1551-5052</a>
            </div>
            <div class="flex lg:hidden items-center gap-2">
                <a href="tel:1551-5052" class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand/5 text-brand hover:bg-brand/10 transition-colors"><i class="fas fa-phone-alt text-sm"></i></a>
                <button onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })" class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sage/10 text-brand-sage hover:bg-brand-sage/20 transition-colors"><i class="fas fa-calendar-check text-sm"></i></button>
                <button id="mobile-menu-btn" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand/5 transition-colors" onclick="toggleMobileNav()"><i class="fas fa-bars text-brand text-xl" id="menu-icon"></i></button>
            </div>
        </div>
    </header>`;
}

function getAdminHeader(activePage) {
    const resBold = activePage.includes("reservations") ? "font-bold text-brand bg-brand/5" : "font-medium text-brand/70 hover:text-brand hover:bg-brand/5";
    const partBold = activePage.includes("partners") ? "font-bold text-brand bg-brand/5" : "font-medium text-brand/70 hover:text-brand hover:bg-brand/5";
    const homeBold = activePage.includes("funeral_homes") ? "font-bold text-brand bg-brand/5" : "font-medium text-brand/70 hover:text-brand hover:bg-brand/5";

    return `    <!-- Header -->
    <header id="main-header" class="fixed top-0 z-50 w-full bg-white border-b border-brand/5 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <div class="flex items-center gap-6">
                <a href="index.html" class="flex items-center gap-2 group">
                    <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                        <span class="text-white text-xs font-bold">온</span>
                    </div>
                    <span class="font-bold text-lg text-brand tracking-tight">온실(Onsil) <span class="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>
                </a>
                
                <nav class="hidden md:flex items-center gap-1 border-l border-gray-100 pl-6 ml-2">
                    <a href="admin_reservations.html" class="px-4 py-2 text-sm ${resBold} rounded-lg transition-all">예약 관리</a>
                    <a href="admin_partners.html" class="px-4 py-2 text-sm ${partBold} rounded-lg transition-all">파트너 관리</a>
                    <a href="admin_funeral_homes.html" class="px-4 py-2 text-sm ${homeBold} rounded-lg transition-all">장례식장 관리</a>
                </nav>
            </div>
            <div class="flex items-center gap-3">
                <div id="auth-container"></div>
                <button onclick="Auth.logout()" class="hidden sm:block px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">로그아웃</button>
            </div>
        </div>
    </header>`;
}

function processFiles(files, type) {
    files.forEach(fpath => {
        if (!fs.existsSync(fpath)) return;
        
        let content = fs.readFileSync(fpath, 'utf8');
        const fileName = path.basename(fpath, '.html');
        
        // Replace Tailwind
        content = content.replace(/<script>\s*tailwind\.config\s*=\s*\{.*?\}(;?)\s*<\/script>/gs, newTailwind);
        
        // Replace Header
        const header = type === 'admin' ? getAdminHeader(fileName) : getUserHeader(fileName);
        if (content.includes('<!-- Header -->')) {
            content = content.replace(/<!-- Header -->\s*<header.*?>.*?<\/header>/gs, header);
        } else {
            content = content.replace(/<header.*?>.*?<\/header>/gs, header);
        }
        
        fs.writeFileSync(fpath, content, 'utf8');
        console.log(`Updated: ${fpath}`);
    });
}

processFiles(allUserFiles, 'user');
processFiles(allAdminFiles, 'admin');
