/**
 * index.html의 '장례식장 비교 내위치 기반 추천' Visual Card를 
 * '3대 핵심 지원내역' (보험증권 분석, 장례 바우처, 상담사 즉시연결) 카드와 이미지로 교체하는 스크립트
 */
const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const targetCardHtml = `                <!-- Visual Card -->
                <div class="relative fade-up block lg:block mt-8 lg:mt-0 max-w-md mx-auto lg:max-w-none"
                    style="animation-delay: 0.2s;">
                    <div
                        class="relative bg-white rounded-3xl shadow-2xl shadow-brand/8 p-5 sm:p-8 border border-brand/5">
                        <!-- Mock comparison card -->
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-10 h-10 bg-brand-sage/15 rounded-xl flex items-center justify-center">
                                <i class="fas fa-balance-scale text-brand-sage"></i>
                            </div>
                            <div>
                                <p class="font-bold text-brand text-sm">장례식장 비교</p>
                                <p class="text-xs text-brand/40">내 위치 기반 추천</p>
                            </div>
                        </div>

                        <!-- Mock items -->
                        <div id="home-recommendation-list" class="space-y-2.5">
                            <div
                                class="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-brand-cream rounded-2xl border border-brand/5">
                                <div
                                    class="w-12 h-12 sm:w-16 sm:h-16 bg-brand-warm/10 rounded-xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-building text-brand-warm text-lg sm:text-xl"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="text-[10px] px-1.5 py-0.5 bg-brand-warm/15 text-brand-warm rounded font-bold">제휴</span>
                                        <p class="font-bold text-brand text-sm truncate">스냅플러그</p>
                                    </div>
                                    <p class="text-xs text-brand/40 mt-0.5">경기 부천 · 5.0★</p>
                                </div>
                                <p class="font-bold text-brand text-sm whitespace-nowrap">20만원~</p>
                            </div>

                            <div
                                class="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded-2xl border border-brand/5">
                                <div
                                    class="w-12 h-12 sm:w-16 sm:h-16 bg-brand-warm/10 rounded-xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-building text-brand-warm text-lg sm:text-xl"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="text-[10px] px-1.5 py-0.5 bg-brand-warm/15 text-brand-warm rounded font-bold">안심인증</span>
                                        <p class="font-bold text-brand text-sm truncate">펫포레스트 남양주점</p>
                                    </div>
                                    <p class="text-xs text-brand/40 mt-0.5">경기 남양주 · 4.8★</p>
                                </div>
                                <p class="font-bold text-brand text-sm whitespace-nowrap">25만원~</p>
                            </div>


                            <div
                                class="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-white rounded-2xl border border-brand/5">
                                <div
                                    class="w-12 h-12 sm:w-16 sm:h-16 bg-brand/5 rounded-xl flex items-center justify-center shrink-0">
                                    <i class="fas fa-building text-brand/40 text-lg sm:text-xl"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        
                                        <p class="font-bold text-brand text-sm truncate">굿바이펫</p>
                                    </div>
                                    <p class="text-xs text-brand/40 mt-0.5">충북 제천 · 4.7★</p>
                                </div>
                                <p class="font-bold text-brand text-sm whitespace-nowrap">20만원~</p>
                            </div>
                        </div>

                        <a href="search.html"
                            class="block text-center w-full mt-4 py-3 bg-brand text-white rounded-xl text-sm font-bold hover:bg-brand-light transition-colors">
                            비교하기
                        </a>
                    </div>`;

const replacementCardHtml = `                <!-- Visual Card (3대 핵심 지원 내역) -->
                <div class="relative fade-up block lg:block mt-8 lg:mt-0 max-w-md mx-auto lg:max-w-none"
                    style="animation-delay: 0.2s;">
                    <div
                        class="relative bg-white rounded-3xl shadow-2xl shadow-brand/8 p-5 sm:p-7 border border-brand/5">
                        
                        <!-- Card Header -->
                        <div class="flex items-center gap-3 mb-5">
                            <div class="w-10 h-10 bg-brand-warm/15 rounded-xl flex items-center justify-center">
                                <i class="fas fa-award text-brand-warm"></i>
                            </div>
                            <div>
                                <p class="font-bold text-brand text-sm">온실 안심 케어</p>
                                <p class="text-xs text-brand/50">마음 편한 이별을 위한 3대 핵심 지원</p>
                            </div>
                        </div>

                        <!-- Generated Services Image -->
                        <div class="overflow-hidden rounded-2xl border border-brand/10 shadow-md mb-5 bg-brand-cream relative group">
                            <img src="images/onsil_three_services.png" alt="온실 3대 핵심 지원 내역" class="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        <!-- List of features in clean text layout -->
                        <ul class="space-y-3 mb-5">
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 w-5 h-5 bg-brand-sage/15 text-brand-sage rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                                <div class="text-left">
                                    <p class="text-xs font-bold text-brand">맞춤형 반려동물 보험증권 분석</p>
                                    <p class="text-[10px] text-brand/50">장례 보장을 놓치지 않도록 세심히 점검해 드립니다.</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 w-5 h-5 bg-brand-sage/15 text-brand-sage rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                                <div class="text-left">
                                    <p class="text-xs font-bold text-brand">10만원 추모 지원 바우처 즉시 제공</p>
                                    <p class="text-[10px] text-brand/50">제휴 장례식장 이용 시 사용할 수 있는 특별 바우처 증정.</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="flex-shrink-0 w-5 h-5 bg-brand-sage/15 text-brand-sage rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                                <div class="text-left">
                                    <p class="text-xs font-bold text-brand">전문 장례 상담사 1:1 즉시 연결</p>
                                    <p class="text-[10px] text-brand/50">24시간 언제나 가장 빠른 상담과 안내를 약속합니다.</p>
                                </div>
                            </li>
                        </ul>

                        <!-- CTA Action Button -->
                        <div class="grid grid-cols-2 gap-2">
                            <a href="services.html"
                                class="block text-center py-3 bg-brand text-white rounded-xl text-xs font-bold hover:bg-brand-light transition-colors shadow-sm">
                                혜택 상세 보기
                            </a>
                            <a href="tel:1551-5052"
                                class="block text-center py-3 bg-brand-warm text-white rounded-xl text-xs font-bold hover:bg-brand-warmDark transition-colors shadow-sm">
                                즉시 전화 연결
                            </a>
                        </div>
                    </div>`;

// CRLF/LF 둘 다 대응할 수 있도록 공백 정규화 후 치환
const cleanTarget = targetCardHtml.replace(/\r\n/g, '\n').trim();
const cleanContent = content.replace(/\r\n/g, '\n');

if (cleanContent.includes(cleanTarget)) {
    content = cleanContent.replace(cleanTarget, replacementCardHtml);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('✅ index.html Visual Card 교체 완료!');
} else {
    // 부분 매칭 시도
    console.log('⚠️ 전체 HTML 매칭 실패. 부분 탐색 시도 중...');
    const fallbackTarget = '<!-- Visual Card -->';
    if (content.includes(fallbackTarget)) {
        // Mock comparison card 근처 영역을 타겟으로 교체
        const startIndex = content.indexOf('<!-- Visual Card -->');
        const endIndex = content.indexOf('<!-- Floating badges -->', startIndex);
        if (startIndex !== -1 && endIndex !== -1) {
            const before = content.substring(0, startIndex);
            const after = content.substring(endIndex);
            content = before + replacementCardHtml + '\n                    ' + after;
            fs.writeFileSync(targetFile, content, 'utf8');
            console.log('✅ index.html Visual Card 부분 매칭 교체 성공!');
        } else {
            console.log('❌ 영역을 탐색하지 못했습니다.');
        }
    } else {
        console.log('❌ 대상 주석을 찾을 수 없습니다.');
    }
}
