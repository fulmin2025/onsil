import os

def safe_replace(filename):
    print(f"Processing {filename}...")
    with open(filename, 'rb') as f:
        content = f.read()

    # 1. Replace logo filename (Global)
    content = content.replace(b'onsil_logo_final.png', b'onsil_logo_tr.png')

    # 2. Add 120px Logo to Promise section
    promise_marker = b'<span class="text-brand-warm font-bold text-sm tracking-widest uppercase">The \xec\x98\xa8\xec\x8b\xa4 Promise</span>'
    if b'w-[120px] h-[120px]' not in content:
        logo_html = b'\n                <div class="flex justify-center mb-6">\n                    <img src="./images/onsil_logo_tr.png" class="w-[120px] h-[120px] object-contain" alt="\xec\x98\xa8\xec\x8b\xa4 \xec\xba\x90\xeb\xa6\xad\xed\x84\xb0 \xeb\xa1\x9c\xea\xb3\xa0">\n                </div>\n                '
        content = content.replace(promise_marker, logo_html + promise_marker)

    # 3. Replace Reviews section with Community Preview
    start_marker = b'    <!-- Reviews -->'
    end_marker = b'    <!-- CTA Section -->'
    
    start_pos = content.find(start_marker)
    end_pos = content.find(end_marker)
    
    if start_pos != -1 and end_pos != -1:
        new_community_html = """    <!-- Community Preview -->
    <section class="py-20 sm:py-28 bg-brand-cream fade-up">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <div class="text-center mb-16">
                <span class="text-brand-sage font-bold text-sm tracking-widest uppercase">Community</span>
                <h2 class="text-3xl sm:text-4xl font-bold text-brand mt-4 leading-tight">우리가 함께 나누는 이야기</h2>
                <p class="text-brand/50 font-serif text-lg mt-4">따뜻한 위로와 소중한 추억을 공유합니다</p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <!-- Pet Pride -->
                <a href="community.html" class="group h-full">
                    <div class="bg-white rounded-[2.5rem] overflow-hidden border border-brand/5 shadow-sm hover:shadow-xl transition-all duration-500 card-hover h-full flex flex-col">
                        <div class="relative h-64 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800" 
                                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="반려동물 자랑">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <span class="text-white text-sm font-medium transition-all transform translate-y-4 group-hover:translate-y-0">실시간 게시글 보기 →</span>
                            </div>
                            <div class="absolute top-6 left-6">
                                <span class="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand uppercase tracking-wider shadow-sm">반려동물 자랑</span>
                            </div>
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <h3 class="text-xl font-bold text-brand mb-3 group-hover:text-brand-warm transition-colors">우리 아이의 예쁜 모습</h3>
                            <p class="text-brand/60 text-sm leading-relaxed mb-6 flex-1">행복했던 순간들을 기록하고 자랑해보세요.</p>
                            <div class="flex items-center justify-between pt-6 border-t border-brand/5 mt-auto">
                                <div class="flex -space-x-2">
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">🐶</div>
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">🐱</div>
                                </div>
                                <span class="text-xs font-bold text-brand/30">1.2k+ 참여함</span>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- Daily Life -->
                <a href="community.html" class="group h-full">
                    <div class="bg-white rounded-[2.5rem] overflow-hidden border border-brand/5 shadow-sm hover:shadow-xl transition-all duration-500 card-hover h-full flex flex-col">
                        <div class="relative h-64 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800" 
                                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="일상 이야기">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <span class="text-white text-sm font-medium transition-all transform translate-y-4 group-hover:translate-y-0">실시간 게시글 보기 →</span>
                            </div>
                            <div class="absolute top-6 left-6">
                                <span class="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand uppercase tracking-wider shadow-sm">일상 이야기</span>
                            </div>
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <h3 class="text-xl font-bold text-brand mb-3 group-hover:text-brand-warm transition-colors">소중한 일상 공유</h3>
                            <p class="text-brand/60 text-sm leading-relaxed mb-6 flex-1">다른 보호자님들과 따뜻함을 나눠보세요.</p>
                            <div class="flex items-center justify-between pt-6 border-t border-brand/5 mt-auto">
                                <div class="flex -space-x-2">
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">💬</div>
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">❤️</div>
                                </div>
                                <span class="text-xs font-bold text-brand/30">850+ 게시글</span>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- Welcome -->
                <a href="community.html" class="group h-full">
                    <div class="bg-white rounded-[2.5rem] overflow-hidden border border-brand/5 shadow-sm hover:shadow-xl transition-all duration-500 card-hover h-full flex flex-col">
                        <div class="relative h-64 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
                                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="가입 인사">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <span class="text-white text-sm font-medium transition-all transform translate-y-4 group-hover:translate-y-0">실시간 게시글 보기 →</span>
                            </div>
                            <div class="absolute top-6 left-6">
                                <span class="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-brand uppercase tracking-wider shadow-sm">가입 인사</span>
                            </div>
                        </div>
                        <div class="p-8 flex flex-col flex-1">
                            <h3 class="text-xl font-bold text-brand mb-3 group-hover:text-brand-warm transition-colors">새로운 인연의 시작</h3>
                            <p class="text-brand/60 text-sm leading-relaxed mb-6 flex-1">처음 오셨나요? 반가운 인사를 나눠보세요.</p>
                            <div class="flex items-center justify-between pt-6 border-t border-brand/5 mt-auto">
                                <div class="flex -space-x-2">
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">✨</div>
                                    <div class="w-8 h-8 rounded-full border-2 border-white bg-brand-cream flex items-center justify-center text-[10px]">👋</div>
                                </div>
                                <span class="text-xs font-bold text-brand/30">반가운 인사들</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div class="text-center mt-16">
                <a href="community.html"
                    class="inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-full font-bold hover:bg-brand-light transition-all shadow-lg hover:shadow-xl group">
                    더 많은 커뮤니티 이야기 보기 <i class="fas fa-arrow-right group-hover:ml-2 transition-all"></i>
                </a>
            </div>
        </div>
    </section>
"""
        content = content[:start_pos] + new_community_html.encode('utf-8') + content[end_pos:]

    with open(filename, 'wb') as f:
        f.write(content)
    print(f"Successfully updated {filename}")

# Global update for logo filename in all HTML files
import glob
for f in glob.glob('**/*.html', recursive=True):
    safe_replace(f)
