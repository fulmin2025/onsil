
$userFiles = @("search.html", "guide.html", "community.html", "self-diagnosis.html", "memory.html", "detail.html", "mypage.html", "reservation.html", "contact.html", "partnership.html", "login.html", "signup.html")
$adminFiles = @("admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html")

$onsilUserFiles = $userFiles | ForEach-Object { "onsil/$_" }
$onsilAdminFiles = $adminFiles | ForEach-Object { "onsil/$_" }

$allUserFiles = $userFiles + $onsilUserFiles
$allAdminFiles = $adminFiles + $onsilAdminFiles

$new_tailwind = @"
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
    </script>
"@

function Get-User-Header($activePage) {
    $search_cls = if ($activePage -eq "search") { "text-brand font-bold bg-brand/5" } else { "text-brand/70 font-medium hover:text-brand hover:bg-brand/5" }
    $guide_cls = if ($activePage -eq "guide") { "text-brand font-bold bg-brand/5" } else { "text-brand/70 font-medium hover:text-brand hover:bg-brand/5" }
    $diag_cls = if ($activePage -eq "self-diagnosis") { "text-brand font-bold bg-brand/5" } else { "text-brand/70 font-medium hover:text-brand hover:bg-brand/5" }
    $memo_cls = if ($activePage -eq "memory") { "text-brand font-bold bg-brand/5" } else { "text-brand/70 font-medium hover:text-brand hover:bg-brand/5" }
    $comm_cls = if ($activePage -eq "community") { "text-brand font-bold bg-brand/5" } else { "text-brand/70 font-medium hover:text-brand hover:bg-brand/5" }

    return @"
    <!-- Header -->
    <header id="main-header" class="fixed top-0 z-50 w-full bg-white border-b border-brand/5 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
            <a href="index.html" class="flex items-center gap-2 group">
                <div class="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
                    <span class="text-white text-xs font-bold">온</span>
                </div>
                <span class="font-bold text-lg text-brand tracking-tight">온실(Onsil)</span>
            </a>

            <!-- Desktop Nav -->
            <nav class="hidden lg:flex items-center gap-1">
                <a href="search.html" class="px-4 py-2 text-sm $search_cls rounded-lg transition-all">장례식장 찾기</a>
                <a href="guide.html" class="px-4 py-2 text-sm $guide_cls rounded-lg transition-all">이별 가이드</a>
                <a href="self-diagnosis.html" class="px-4 py-2 text-sm $diag_cls rounded-lg transition-all">건강자가진단</a>
                <a href="memory.html" class="px-4 py-2 text-sm $memo_cls rounded-lg transition-all">추억 가이드</a>
                <a href="community.html" class="px-4 py-2 text-sm $comm_cls rounded-lg transition-all">커뮤니티</a>
            </nav>

            <div class="hidden lg:flex items-center gap-1.5">
                <div id="auth-container"></div>
                <a href="search.html?quote=true" class="bg-brand-warm hover:bg-brand-warmDark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                    <i class="fas fa-calculator"></i> 견적받기
                </a>
                <button onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })" class="bg-brand-sage hover:bg-[#87A08B]/90 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
                    <i class="fas fa-calendar-check text-sm"></i> 예약하기
                </button>
                <a href="tel:1551-5052" class="bg-brand-warm hover:bg-brand-warmDark text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-warm/20 flex items-center gap-2">
                    <i class="fas fa-phone-alt text-xs"></i> 1551-5052
                </a>
            </div>

            <!-- Mobile Header Actions -->
            <div class="flex lg:hidden items-center gap-2">
                <a href="tel:1551-5052" class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand/5 text-brand hover:bg-brand/10 transition-colors" title="전화 상담">
                    <i class="fas fa-phone-alt text-sm"></i>
                </a>
                <button onclick="window.Auth && window.Auth.getCurrentUser().then(user => { if(user) location.href='search.html'; else { alert('예약은 로그인 후 이용 가능합니다.'); location.href='login.html'; } }).catch(() => { location.href='login.html'; })" class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sage/10 text-brand-sage hover:bg-brand-sage/20 transition-colors" title="예약하기">
                    <i class="fas fa-calendar-check text-sm"></i>
                </button>
                <button id="mobile-menu-btn" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-brand/5 transition-colors" onclick="toggleMobileNav()">
                    <i class="fas fa-bars text-brand text-xl" id="menu-icon"></i>
                </button>
            </div>
        </div>
    </header>
"@
}

function Get-Admin-Header($activePage) {
    $res_bold = if ($activePage -eq "admin_reservations") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    $part_bold = if ($activePage -eq "admin_partners") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    $home_bold = if ($activePage -eq "admin_funeral_homes") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    
    return @"
    <!-- Header -->
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
                    <a href="admin_reservations.html" class="px-4 py-2 text-sm $res_bold rounded-lg transition-all">예약 관리</a>
                    <a href="admin_partners.html" class="px-4 py-2 text-sm $part_bold rounded-lg transition-all">파트너 관리</a>
                    <a href="admin_funeral_homes.html" class="px-4 py-2 text-sm $home_bold rounded-lg transition-all">장례식장 관리</a>
                </nav>
            </div>

            <div class="flex items-center gap-3">
                <div id="auth-container"></div>
                <button onclick="Auth.logout()" class="hidden sm:block px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    로그아웃
                </button>
            </div>
        </div>
    </header>
"@
}

# User Pages
foreach ($fpath in $allUserFiles) {
    if (Test-Path $fpath) {
        $content = Get-Content $fpath -Raw -Encoding UTF8
        $pageName = [System.IO.Path]::GetFileNameWithoutExtension($fpath)
        
        $content = [regex]::Replace($content, "(?s)<script>\s*tailwind\.config\s*=\s*\{.*?\}(;?)\s*</script>", $new_tailwind)
        
        $header = Get-User-Header $pageName
        $content = [regex]::Replace($content, "(?s)<!-- Header -->\s*<header.*?>.*?</header>", $header)
        if (-not ($content -like "*<!-- Header -->*")) {
             $content = [regex]::Replace($content, "(?s)<header.*?>.*?</header>", $header)
        }
        
        Set-Content -Path $fpath -Value $content -Encoding UTF8
        Write-Host "Updated User Page: $fpath"
    }
}

# Admin Pages
foreach ($fpath in $allAdminFiles) {
    if (Test-Path $fpath) {
        $content = Get-Content $fpath -Raw -Encoding UTF8
        $pageName = [System.IO.Path]::GetFileNameWithoutExtension($fpath)
        
        $content = [regex]::Replace($content, "(?s)<script>\s*tailwind\.config\s*=\s*\{.*?\}(;?)\s*</script>", $new_tailwind)
        
        $header = Get-Admin-Header $pageName
        $content = [regex]::Replace($content, "(?s)<!-- Header -->\s*<header.*?>.*?</header>", $header)
        if (-not ($content -like "*<!-- Header -->*")) {
             $content = [regex]::Replace($content, "(?s)<header.*?>.*?</header>", $header)
        }
        
        Set-Content -Path $fpath -Value $content -Encoding UTF8
        Write-Host "Updated Admin Page: $fpath"
    }
}
