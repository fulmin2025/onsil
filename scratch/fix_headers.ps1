
$files = @("admin_reservations.html", "admin_partners.html", "admin_funeral_homes.html", "onsil/admin_reservations.html", "onsil/admin_partners.html", "onsil/admin_funeral_homes.html")

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

function Get-Header($page) {
    $res_bold = if ($page -eq "reservations") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    $part_bold = if ($page -eq "partners") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    $home_bold = if ($page -eq "funeral_homes") { "font-bold text-brand bg-brand/5" } else { "font-medium text-brand/70 hover:text-brand hover:bg-brand/5" }
    
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

foreach ($fpath in $files) {
    if (Test-Path $fpath) {
        $content = Get-Content $fpath -Raw -Encoding UTF8
        
        $page = if ($fpath -like "*reservations*") { "reservations" } elseif ($fpath -like "*partners*") { "partners" } else { "funeral_homes" }
        
        # Replace Tailwind
        $content = [regex]::Replace($content, "(?s)<script>\s*tailwind\.config\s*=\s*\{.*?\}(;?)\s*</script>", $new_tailwind)
        
        # Replace Header
        $header = Get-Header $page
        $content = [regex]::Replace($content, "(?s)<!-- Header -->\s*<header.*?>.*?</header>", $header)
        if (-not ($content -like "*<!-- Header -->*")) {
             $content = [regex]::Replace($content, "(?s)<header.*?>.*?</header>", $header)
        }
        
        Set-Content -Path $fpath -Value $content -Encoding UTF8
        Write-Host "Updated $fpath"
    }
}
