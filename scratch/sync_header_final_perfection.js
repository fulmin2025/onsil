const fs = require('fs');
const path = require('path');

const targetFiles = ["index.html", "search.html", "guide.html", "self-diagnosis.html", "community.html", "memory.html"];

// index.html을 기준으로 한 완전한 헤더 템플릿 (Active 효과 제거하여 index.html과 일치시킴)
const headerTemplate = `    <!-- Header -->
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
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">장례식장 찾기</a>
                <a href="services.html"
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">장례 서비스</a>
                <a href="guide.html"
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">이별 가이드</a>
                <a href="self-diagnosis.html"
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">건강자가진단</a>
                <a href="memory.html"
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">추억 가이드</a>
                <a href="community.html"
                    class="px-4 py-2 text-sm text-brand/70 font-medium hover:text-brand hover:bg-brand/5 rounded-lg transition-all whitespace-nowrap">커뮤니티</a>
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

const mobileNavTemplate = `    <!-- Mobile Navigation Overlay -->
    <div id="mobile-nav" class="fixed inset-0 z-[60] hidden">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="toggleMobileNav()"></div>
        <div class="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl transform translate-x-full transition-transform duration-300"
            id="mobile-nav-panel">
            <div class="p-6">
                <div class="flex justify-between items-center mb-8">
                    <span class="font-bold text-lg text-brand">메뉴</span>
                    <button onclick="toggleMobileNav()"
                        class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
                        <i class="fas fa-times text-gray-500"></i>
                    </button>
                </div>
                <nav class="space-y-1">
                    <a href="search.html?quote=true"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors bg-brand-cream/50">
                        <i class="fas fa-calculator text-brand-warm w-5 text-center"></i>
                        <span class="font-bold text-brand">바로 견적받기</span>
                    </a>
                    <a href="search.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-search text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">장례식장 찾기</span>
                    </a>
                    <a href="services.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-scroll text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">장례 서비스</span>
                    </a>
                    <a href="guide.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-book-open text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">이별 가이드</span>
                    </a>
                    <a href="self-diagnosis.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-stethoscope text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">건강자가진단</span>
                    </a>
                    <a href="memory.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-heart text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">추억 가이드</span>
                    </a>
                    <a href="community.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-comments text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">커뮤니티</span>
                    </a>
                    <a href="contact.html"
                        class="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-brand-cream transition-colors">
                        <i class="fas fa-envelope text-brand-warm w-5 text-center"></i>
                        <span class="font-medium text-brand">문의하기</span>
                    </a>
                </nav>
                <div class="mt-8 pt-6 border-t">
                    <button
                        onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })"
                        class="w-full flex items-center justify-center gap-2 bg-brand-sage text-white py-3.5 rounded-xl font-bold shadow-lg mb-3 hover:bg-[#87A08B]/90 transition-colors">
                        <i class="fas fa-calendar-check"></i> 예약하기
                    </button>
                    <a href="tel:1551-5052"
                        class="flex items-center justify-center gap-2 bg-brand-warm text-white py-3.5 rounded-xl font-bold shadow-lg">
                        <i class="fas fa-phone-alt"></i> 상담전화 1551-5052
                    </a>
                    <div class="flex gap-2 mt-3">
                        <a href="login.html"
                            class="flex-1 text-center py-3 border border-brand/20 rounded-xl text-sm font-medium text-brand hover:bg-brand/5 transition-colors">로그인</a>
                        <a href="signup.html"
                            class="flex-1 text-center py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-light transition-colors">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

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

targetFiles.forEach(fpath => {
    if (!fs.existsSync(fpath)) return;
    
    let content = fs.readFileSync(fpath, 'utf8');
    
    // 1. Head standardization (excluding index.html which has its own complex styles)
    if (fpath !== 'index.html') {
        const titleMatch = content.match(/<title>.*?<\/title>/i);
        const title = titleMatch ? titleMatch[0] : '<title>온실(Onsil)</title>';
        content = content.replace(/<head>.*?<\/head>/gs, `<head>${baseHead}\n    ${title}\n</head>`);
        content = content.replace(/<body.*?>/i, `<body class="bg-brand-cream font-sans text-brand antialiased">`);
    } else {
        content = content.replace(/bg-white\/95/g, 'bg-white');
    }
    
    // 2. Header replacement (Exact same HTML for everyone)
    if (content.includes('<!-- Header -->')) {
        content = content.replace(/<!-- Header -->\s*<header.*?>.*?<\/header>/gs, headerTemplate);
    } else {
        content = content.replace(/<header.*?>.*?.*?<\/header>/gs, headerTemplate);
    }

    // 3. Mobile Navigation Overlay replacement
    if (content.includes('<!-- Mobile Navigation Overlay -->')) {
        content = content.replace(/<!-- Mobile Navigation Overlay -->\s*<div id="mobile-nav".*?>.*?<\/div>\s*<\/div>\s*<\/div>/gs, mobileNavTemplate);
    } else {
        content = content.replace(/<div id="mobile-nav".*?>.*?<\/div>\s*<\/div>\s*<\/div>/gs, mobileNavTemplate);
    }
    
    // 4. Fix index.html scroll script to not remove white background
    if (fpath === 'index.html') {
        content = content.replace(/header\.classList\.remove\('bg-white\/95', 'backdrop-blur-lg', 'shadow-sm', 'border-b', 'border-brand\/5'\);/g, '');
    }
    
    fs.writeFileSync(fpath, content, 'utf8');
    console.log(`Perfectly Synced: ${fpath}`);
});
