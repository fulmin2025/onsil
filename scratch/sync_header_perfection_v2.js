
const fs = require('fs');
const path = require('path');

const targetFiles = ["index.html", "search.html", "guide.html", "self-diagnosis.html", "community.html", "memory.html", "onsil/search.html", "onsil/guide.html", "onsil/self-diagnosis.html"];

function getHeader(activePage) {
    const searchCls = activePage === 'search' ? 'text-brand font-bold bg-brand/5' : 'text-brand/70 font-medium hover:text-brand hover:bg-brand/5';
    const guideCls = activePage === 'guide' ? 'text-brand font-bold bg-brand/5' : 'text-brand/70 font-medium hover:text-brand hover:bg-brand/5';
    const diagCls = activePage === 'self-diagnosis' ? 'text-brand font-bold bg-brand/5' : 'text-brand/70 font-medium hover:text-brand hover:bg-brand/5';
    const memoCls = activePage === 'memory' ? 'text-brand font-bold bg-brand/5' : 'text-brand/70 font-medium hover:text-brand hover:bg-brand/5';
    const commCls = activePage === 'community' ? 'text-brand font-bold bg-brand/5' : 'text-brand/70 font-medium hover:text-brand hover:bg-brand/5';

    return `    <!-- Header -->
    <header id="main-header" class="fixed top-0 z-50 w-full bg-white border-b border-brand/5 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group shrink-0">
                <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                    <span class="text-white text-xs font-bold">온</span>
                </div>
                <span class="font-bold text-lg text-brand tracking-tight whitespace-nowrap">온실(Onsil)</span>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden lg:flex items-center gap-1">
                <a href="search.html"
                    class="px-4 py-2 text-sm ${searchCls} rounded-lg transition-all whitespace-nowrap">장례식장 찾기</a>
                <a href="guide.html"
                    class="px-4 py-2 text-sm ${guideCls} rounded-lg transition-all whitespace-nowrap">이별 가이드</a>
                <a href="self-diagnosis.html"
                    class="px-4 py-2 text-sm ${diagCls} rounded-lg transition-all whitespace-nowrap">건강자가진단</a>
                <a href="memory.html"
                    class="px-4 py-2 text-sm ${memoCls} rounded-lg transition-all whitespace-nowrap">추억 가이드</a>
                <a href="community.html"
                    class="px-4 py-2 text-sm ${commCls} rounded-lg transition-all whitespace-nowrap">커뮤니티</a>
            </nav>

            <div class="hidden lg:flex items-center gap-1.5 flex-nowrap shrink-0">
                <div id="auth-container"></div>
                <a href="search.html?quote=true"
                    class="bg-brand-warm hover:bg-brand-warmDark text-white px-3 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <i class="fas fa-calculator"></i> 바로 견적받기
                </a>
                <button
                    onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })"
                    class="bg-brand-sage hover:bg-[#87A08B]/90 text-white px-3 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <i class="fas fa-calendar-check"></i> 예약하기
                </button>
                <a href="tel:1551-5052"
                    class="bg-brand-warm hover:bg-brand-warmDark text-white px-3 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-warm/20 flex items-center gap-1.5 whitespace-nowrap">
                    <i class="fas fa-phone-alt text-xs"></i> 1551-5052
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn"
                class="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand/5 transition-colors"
                onclick="toggleMobileNav()">
                <i class="fas fa-bars text-brand text-lg" id="menu-icon"></i>
            </button>
        </div>
    </header>`;
}

targetFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    const fileName = path.basename(fpath, '.html');
    
    const header = getHeader(fileName);
    
    // Replace the header block
    if (content.includes('<!-- Header -->')) {
        content = content.replace(/<!-- Header -->\s*<header.*?>.*?<\/header>/gs, header);
    } else {
        content = content.replace(/<header.*?>.*?<\/header>/gs, header);
    }
    
    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Matched Header: ${fpath}`);
});
