
import os

files = ['admin_reservations.html', 'admin_partners.html', 'admin_funeral_homes.html']
onsil_files = ['onsil/admin_reservations.html', 'onsil/admin_partners.html', 'onsil/admin_funeral_homes.html']

all_files = files + onsil_files

new_tailwind = """    <script>
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
    </script>"""

def get_header(active_page):
    res_bold = 'font-bold text-brand bg-brand/5' if active_page == 'reservations' else 'font-medium text-brand/70 hover:text-brand hover:bg-brand/5'
    part_bold = 'font-bold text-brand bg-brand/5' if active_page == 'partners' else 'font-medium text-brand/70 hover:text-brand hover:bg-brand/5'
    home_bold = 'font-bold text-brand bg-brand/5' if active_page == 'funeral_homes' else 'font-medium text-brand/70 hover:text-brand hover:bg-brand/5'
    
    return f"""    <!-- Header -->
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
                    <a href="admin_reservations.html" class="px-4 py-2 text-sm {res_bold} rounded-lg transition-all">예약 관리</a>
                    <a href="admin_partners.html" class="px-4 py-2 text-sm {part_bold} rounded-lg transition-all">파트너 관리</a>
                    <a href="admin_funeral_homes.html" class="px-4 py-2 text-sm {home_bold} rounded-lg transition-all">장례식장 관리</a>
                </nav>
            </div>

            <div class="flex items-center gap-3">
                <div id="auth-container"></div>
                <button onclick="Auth.logout()" class="hidden sm:block px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    로그아웃
                </button>
            </div>
        </div>
    </header>"""

for fpath in all_files:
    if not os.path.exists(fpath): continue
    
    with open(fpath, 'rb') as f:
        content = f.read().decode('utf-8', errors='replace')
    
    # Identify page
    page = 'reservations' if 'reservations' in fpath else ('partners' if 'partners' in fpath else 'funeral_homes')
    
    # Replace tailwind config
    # Look for <script>\s*tailwind.config = ... </script>
    import re
    content = re.sub(r'<script>\s*tailwind\.config\s*=\s*\{.*?\}\s*</script>', new_tailwind, content, flags=re.DOTALL)
    
    # Replace Header
    # Look for <header.*?>.*?</header>
    content = re.sub(r'<!-- Header -->\s*<header.*?>.*?</header>', get_header(page), content, flags=re.DOTALL)
    # If no comment, just look for <header>
    if '<header' in content and '<!-- Header -->' not in content:
        content = re.sub(r'<header.*?>.*?</header>', get_header(page), content, flags=re.DOTALL)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {fpath}")
