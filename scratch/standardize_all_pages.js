
const fs = require('fs');
const path = require('path');

const targetFiles = ["search.html", "guide.html", "self-diagnosis.html", "community.html", "memory.html"];

// index.html에서 추출한 베이스 설정 (Tailwind, Fonts, etc.)
const baseHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#2C3E50">
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" href="icons/icon.svg">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <script>
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
                        }
                    },
                    fontFamily: {
                        sans: ['Pretendard', 'system-ui', 'sans-serif'],
                        serif: ['Nanum Myeongjo', 'serif'],
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap');

        /* 헤더 고정으로 인한 본문 가림 방지 */
        body {
            padding-top: 64px; /* h-16 */
        }
        @media (min-width: 640px) {
            body {
                padding-top: 72px; /* h-18 */
            }
        }
        main {
            padding-top: 2rem !important;
        }
        .mobile-nav-open {
            transform: translateX(0) !important;
        }
    </style>
`;

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
    
    // 1. Replace Head (keep original title if possible)
    const titleMatch = content.match(/<title>.*?<\/title>/i);
    const title = titleMatch ? titleMatch[0] : '<title>온실(Onsil)</title>';
    
    content = content.replace(/<head>.*?<\/head>/gs, `<head>${baseHead}\n    ${title}\n</head>`);
    
    // 2. Standardize Body tag
    content = content.replace(/<body.*?>/i, `<body class="bg-brand-cream font-sans text-brand antialiased">`);
    
    // 3. Replace Header
    const header = getHeader(fileName);
    if (content.includes('<!-- Header -->')) {
        content = content.replace(/<!-- Header -->\s*<header.*?>.*?<\/header>/gs, header);
    } else {
        content = content.replace(/<header.*?>.*?<\/header>/gs, header);
    }
    
    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Standardized: ${fpath}`);
});
