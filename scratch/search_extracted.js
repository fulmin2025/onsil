
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
    

// ---- SCRIPT BOUNDARY ---- 


        // --- Naver Map State ---
        let naverMap = null;
        let naverMarkers = [];
        let regionMarkers = [];
        let enrichedHomesData = null;
        let currentSortMode = 'recommend';
        let userLocation = { lat: 37.5665, lng: 126.9780 };

        // --- Global Configuration ---
        const ON_CONFIG = {
            showPartnership: false
        };

        // --- Core Application Logic ---
        const resultList = document.getElementById('result-list');
        const resultCount = document.getElementById('result-count');
        const mapPinsContainer = document.getElementById('pins-container');


        function renderListItems(items) {
            const resultList = document.getElementById('result-list');
            const resultCount = document.getElementById('result-count');
            if (!resultList || !resultCount) return;

            resultList.innerHTML = '';
            resultCount.innerHTML = `총 <span class="text-[#C5A065] font-bold">${items.length}</span>개 장례식장`;

            items.forEach(item => {
                const el = document.createElement('div');
                el.className = "search-item bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 cursor-pointer group";
                el.onclick = () => location.href = 'detail.html?id=' + (item.external_uuid || item.id || item.uuid);

                const realData = (typeof REAL_DATA !== 'undefined') ? REAL_DATA[item.name] : null;
                const defaultImage = 'https://images.unsplash.com/photo-1596230526487-11152a4a754b?w=500';
                const image = item.image_url || (realData && realData.imageUrl) ? (item.image_url || realData.imageUrl) : defaultImage;

                let priceText = "상담 문의";
                const itemPrices = item.prices || (realData ? realData.prices : null);
                if (itemPrices && itemPrices.length > 0) {
                    try {
                        const firstCategory = itemPrices[0];
                        if (firstCategory.items && firstCategory.items.length > 0) {
                            priceText = firstCategory.items[0].price;
                        }
                    } catch (e) { }
                }

                const rating = item.rating || (realData && realData.rating) ? (item.rating || realData.rating) : (4.5 + Math.random() * 0.5).toFixed(1);
                const reviewCount = item.review_count || (realData && realData.reviewCount) ? (item.review_count || realData.reviewCount) : Math.floor(Math.random() * 100) + 10;

                let badgesHtml = '';
                const isAlliance = item.is_alliance || item.isAlliance;
                if (ON_CONFIG.showPartnership && isAlliance) badgesHtml += '<span class="bg-[#8D7B68] text-white text-xs px-2 py-1 rounded mr-2">제휴</span>';

                el.innerHTML = `
                        <div class="w-full md:w-48 h-32 bg-gray-200 rounded-lg bg-cover bg-center shrink-0" style="background-image: url('${image}')"></div>
                        <div class="flex-1 flex flex-col justify-between">
                            <div>
                                <div class="flex justify-between items-start mb-1">
                                    <div>
                                        ${badgesHtml}
                                        <h3 class="text-xl font-bold mt-1 inline-block align-middle group-hover:text-[#8D7B68] transition-colors">${item.name}</h3>
                                    </div>
                                </div>
                                <p class="text-gray-400 text-xs mb-3">${item.address || (item.enName || '')}</p>
                                <div class="flex gap-2 text-[11px] text-gray-500 mb-4">
                                    <span class="px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">개별 추모실</span>
                                    <span class="px-2 py-0.5 bg-gray-50 rounded-full border border-gray-100">박스관 포함</span>
                                </div>
                            </div>
                            <div class="flex justify-between items-center border-t border-gray-50 pt-3">
                                <span class="font-bold text-gray-900 border-b-2 border-[#C5A065]/30">최저 ${priceText}</span>
                                <button class="bg-[#8D7B68] text-white px-5 py-2 rounded-xl text-sm font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all" onclick="event.stopPropagation(); handleReservation('${item.name}')">예약하기</button>
                            </div>
                        </div>
                    `;
                resultList.appendChild(el);
            });
        }

        // --- Leaflet Map Tools ---
        const MAP_INITIAL_VIEW = [36.5, 127.8];
        const MAP_INITIAL_ZOOM = 7.3;

        const REGION_CONFIG = {
            'seoul': { name: '서울', coords: [37.5665, 126.9780], zoom: 11 },
            'gyeonggi': { name: '경기도', coords: [37.5500, 127.2500], zoom: 10 },
            'incheon': { name: '인천', coords: [37.4563, 126.6052], zoom: 11 },
            'gangwon': { name: '강원도', coords: [37.7500, 128.3000], zoom: 9 },
            'chungcheong': { name: '충청도', coords: [36.5500, 127.2000], zoom: 9 },
            'jeolla': { name: '전라도', coords: [35.4000, 127.0000], zoom: 9 },
            'gyeongsang': { name: '경상도', coords: [35.7000, 128.7000], zoom: 9 }
        };

        function initNaverMap() {
            if (naverMap) return;
            console.log('INIT: Map starting...');
            try {
                // Naver Map 초기화
                const mapOptions = {
                    center: new naver.maps.LatLng(MAP_INITIAL_VIEW[0], MAP_INITIAL_VIEW[1]),
                    zoom: MAP_INITIAL_ZOOM,
                    zoomControl: false,
                    scaleControl: true,
                    mapDataControl: false,
                    logoControl: true, 
                };
                
                naverMap = new naver.maps.Map('map', mapOptions);

                if (!naverMap) {
                    throw new Error('네이버 지도 객체 생성 실패');
                }

                naver.maps.Event.addListener(naverMap, 'zoom_changed', () => {
                    filterItems();
                });

                console.log('INIT: Map Success');

                // Render markers immediately if data is ready
                if (enrichedHomesData) {
                    renderMapPins(enrichedHomesData);
                } else {
                    filterItems();
                }
            } catch (e) {
                console.error('INIT: Map Error', e);
            }
        }

        function renderMapPins(items) {
            if (!naverMap) {
                console.warn('MAP: Map not initialized');
                return;
            }
            
            naverMarkers.forEach(m => m.setMap(null));
            naverMarkers = [];

            const currentZoom = naverMap.getZoom();
            if (currentZoom < 9) return; // 줌이 9 미만일 때는 개별 마커를 표시하지 않음

            console.log(`MAP: Rendering ${items.length} items`);

            items.forEach(item => {
                const lat = parseFloat(item.latitude);
                const lng = parseFloat(item.longitude);
                if (isNaN(lat) || isNaN(lng)) return;

                const isAlliance = item.is_alliance || item.isAlliance;
                const fillColor = (ON_CONFIG.showPartnership && isAlliance) ? '#C5A065' : '#8D7B68';
                
                const iconHtml = `<div class="relative group cursor-pointer map-pulse-wrapper">
                    <div class="map-pulse" style="width:16px;height:16px;border-radius:50%;background-color:${fillColor};border:2px solid #fff;box-shadow:0 0 10px rgba(0,0,0,0.3)"></div>
                    <div class="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50">${item.name}</div>
                </div>`;

                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(lat, lng),
                    map: naverMap,
                    icon: {
                        content: iconHtml,
                        size: new naver.maps.Size(16, 16),
                        anchor: new naver.maps.Point(8, 8)
                    }
                });

                naver.maps.Event.addListener(marker, 'click', (e) => {
                    location.href = 'detail.html?id=' + (item.external_uuid || item.id || item.uuid);
                    naverMap.setCenter(new naver.maps.LatLng(lat, lng));
                    naverMap.setZoom(13);
                });

                naverMarkers.push(marker);
            });
        }

        function renderRegionLabels(items) {
            if (!naverMap) return;
            
            regionMarkers.forEach(m => m.setMap(null));
            regionMarkers = [];

            const currentZoom = naverMap.getZoom();
            if (currentZoom >= 9) return; // 줌이 일정 수준 이상일 때는 권역별 배지를 숨김

            const regionCounts = {
                'seoul': 0, 'gyeonggi': 0, 'incheon': 0, 'gangwon': 0,
                'chungcheong': 0, 'jeolla': 0, 'gyeongsang': 0
            };

            items.forEach(item => {
                const reg = getRegion(item);
                if (regionCounts[reg] !== undefined) regionCounts[reg]++;
            });

            Object.entries(REGION_CONFIG).forEach(([key, config]) => {
                const count = regionCounts[key];
                if (count > 0) {
                    const badgeHtml = `<div class="region-badge-inner flex flex-col items-center justify-center bg-[#8D7B68] text-white rounded-full border-2 border-white cursor-pointer shadow-lg transform transition-all" style="width: 52px; height: 52px;">
                                <span class="text-[10px] font-medium opacity-80">${config.name}</span>
                                <span class="text-base font-bold">${count}</span>
                               </div>`;

                    const marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(config.coords[0], config.coords[1]),
                        map: naverMap,
                        icon: {
                            content: badgeHtml,
                            size: new naver.maps.Size(52, 52),
                            anchor: new naver.maps.Point(26, 26)
                        }
                    });

                    naver.maps.Event.addListener(marker, 'click', (e) => {
                        naverMap.setCenter(new naver.maps.LatLng(config.coords[0], config.coords[1]));
                        naverMap.setZoom(config.zoom);
                    });

                    regionMarkers.push(marker);
                }
            });
        }

        // --- Helper Functions ---
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        function getRegion(item) {
            // RAW_JSON에 주소 필드가 없으므로 REAL_DATA에서 이름을 키로 하여 주소를 가져옵니다.
            // 일부 데이터에서 location 속성을 사용할 수도 있으므로 addr 추출을 보강합니다.
            const realInfo = (typeof REAL_DATA !== 'undefined') ? REAL_DATA[item.name] : null;
            const addr = item.address || item.location || (realInfo ? (realInfo.address || realInfo.location || '') : '') || '';
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);

            if (addr.includes('서울')) return 'seoul';
            if (addr.includes('경기')) return 'gyeonggi';
            if (addr.includes('인천')) return 'incheon';
            if (addr.includes('강원')) return 'gangwon';
            if (addr.includes('충남') || addr.includes('충북') || addr.includes('대전') || addr.includes('세종') || addr.includes('충청')) return 'chungcheong';
            if (addr.includes('경남') || addr.includes('경북') || addr.includes('부산') || addr.includes('대구') || addr.includes('울산') || addr.includes('경상')) return 'gyeongsang';
            if (addr.includes('전남') || addr.includes('전북') || addr.includes('광주') || addr.includes('전라')) return 'jeolla';

            // 좌표 기반Fallback (주소 데이터가 부실한 경우를 대비)
            // 강원도 범위를 조금 더 동쪽(127.9 이상)으로 좁혀서 경기도(양평 등)와 겹치지 않게 합니다.
            if (lat > 37.0 && lat < 38.6 && lng > 127.9) return 'gangwon';
            if (lat < 37.0 && lng > 127.6) return 'gyeongsang';
            if (lat < 36.1 && lng < 127.6) return 'jeolla';
            if (lat < 37.1 && lng < 127.6) return 'chungcheong';
            if (lat > 37.4 && lat < 37.7 && lng > 126.8 && lng < 127.2) return 'seoul';
            if (lat > 37.3 && lat < 37.6 && lng > 126.3 && lng < 126.8) return 'incheon';
            if (lat > 36.9 && lat < 38.3 && lng > 126.1 && lng < 127.9) return 'gyeonggi';
            return 'other';
        }

        function updateFilterCounts(itemsToCount = funeralHomesData) {
            const counts = {
                'seoul': 0, 'gyeonggi': 0, 'incheon': 0, 'gangwon': 0,
                'chungcheong': 0, 'jeolla': 0, 'gyeongsang': 0
            };

            itemsToCount.forEach(item => {
                const region = getRegion(item);
                if (counts[region] !== undefined) {
                    counts[region]++;
                }
            });

            // 수도권 통합 개수 표시
            const sudogwonCount = (counts['seoul'] || 0) + (counts['gyeonggi'] || 0) + (counts['incheon'] || 0);
            const sudogwonEl = document.getElementById('count-sudogwon');
            if (sudogwonEl) sudogwonEl.textContent = sudogwonCount;

            for (const [region, count] of Object.entries(counts)) {
                const el = document.getElementById(`count-${region}`);
                if (el) el.textContent = count;
            }
        }

        function filterItems() {
            if (!enrichedHomesData) {
                enrichedHomesData = funeralHomesData.map(item => getExtendedDetails(item));
            }

            const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
            const checkedValues = Array.from(checkboxes).map(cb => cb.value);
            
            // 구분: 지역 필터 vs 시설 필터
            const regionValues = ['sudogwon', 'chungcheong', 'gyeongsang', 'jeolla', 'gangwon'];
            const checkedRegions = checkedValues.filter(v => regionValues.includes(v));
            const checkedFacilities = checkedValues.filter(v => !regionValues.includes(v));
            
            const allianceCheckbox = document.getElementById('filter-alliance');
            const mobileAllianceCheckbox = document.getElementById('mobile-filter-alliance');
            const showOnlyAlliance = (allianceCheckbox && allianceCheckbox.checked) || (mobileAllianceCheckbox && mobileAllianceCheckbox.checked);

            const filteredItems = (enrichedHomesData || []).filter(item => {
                // 제휴 업체 필터
                const isAlliance = item.is_alliance || item.isAlliance;
                if (showOnlyAlliance && !isAlliance) return false;

                // 지역 필터
                if (checkedRegions.length > 0) {
                    const region = getRegion(item);
                    let regionMatch = false;
                    if (checkedRegions.includes('sudogwon')) {
                        if (['seoul', 'gyeonggi', 'incheon'].includes(region)) regionMatch = true;
                    }
                    if (checkedRegions.includes(region)) regionMatch = true;
                    if (!regionMatch) return false;
                }

                // 시설 필터 (REAL_DATA의 주소나 이름 정보를 활용하거나 태그 기반 매칭)
                if (checkedFacilities.length > 0) {
                    const realData = (typeof REAL_DATA !== 'undefined') ? REAL_DATA[item.name] : null;
                    if (!realData) return false;
                    
                    // 현재 UI상 '개별추모실' 등은 모든 업체 상세에 공통으로 표시되거나 특정 로직이 필요함
                    // 여기서는 필터링 기능 구현을 위해 간단한 매칭 로직 적용
                    // (실제 데이터에 시설 정보가 명시적이지 않으므로, 데모를 위해 true 처리하거나 
                    // 특정 키워드 매칭 가능)
                }

                return true;
            });

            if (currentSortMode === 'distance') {
                filteredItems.sort((a, b) => {
                    const distA = calculateDistance(userLocation.lat, userLocation.lng, parseFloat(a.latitude), parseFloat(a.longitude));
                    const distB = calculateDistance(userLocation.lat, userLocation.lng, parseFloat(b.latitude), parseFloat(b.longitude));
                    return distA - distB;
                });
            } else if (currentSortMode === 'price') {
                filteredItems.sort((a, b) => parsePrice(a) - parsePrice(b));
            } else {
                if (ON_CONFIG.showPartnership) {
                    filteredItems.sort((a, b) => {
                        const allianceA = a.is_alliance || a.isAlliance ? 1 : 0;
                        const allianceB = b.is_alliance || b.isAlliance ? 1 : 0;
                        return allianceB - allianceA;
                    });
                } else {
                    // 기본 정렬: 이름순 또는 등록역순 (현재는 데이터 순서 유지)
                }
            }

            renderListItems(filteredItems);
            renderMapPins(filteredItems);
            renderRegionLabels(filteredItems);
            updateFilterCounts(filteredItems); // 사이드바 숫자 실시간 동기화

            const countSpan = document.querySelector('#result-count span');
            if (countSpan) countSpan.textContent = filteredItems.length;
        }

        // Alliance Filter UI Toggle
        if (!ON_CONFIG.showPartnership) {
            const allianceFilter = document.getElementById('filter-alliance');
            if (allianceFilter) {
                const allianceWrapper = allianceFilter.closest('div.bg-\\[\\#8D7B68\\]\\/5');
                if (allianceWrapper) allianceWrapper.style.display = 'none';
            }
        }

        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        filterCheckboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                // 상호 동기화 (같은 value를 가진 체크박스들)
                if (e.target.value) {
                    document.querySelectorAll(`.filter-checkbox[value="${e.target.value}"]`).forEach(syncCb => {
                        syncCb.checked = e.target.checked;
                    });
                }
                // 제휴 필터 동기화
                if (e.target.id === 'filter-alliance' || e.target.id === 'mobile-filter-alliance') {
                    const isChecked = e.target.checked;
                    const mainAlliance = document.getElementById('filter-alliance');
                    const mobileAlliance = document.getElementById('mobile-filter-alliance');
                    if (mainAlliance) mainAlliance.checked = isChecked;
                    if (mobileAlliance) mobileAlliance.checked = isChecked;
                }
                filterItems();
            });
        });

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSortMode = e.target.value;
                filterItems();
            });
        }

        // --- View Toggle Logic ---
        window.showView = function (viewId) {
            console.log('VIEW: Switching to', viewId);
            const list = document.getElementById('result-list');
            const map = document.getElementById('map-view');
            const btnList = document.getElementById('btn-list-view');
            const btnMap = document.getElementById('btn-map-view');

            list.classList.toggle('hidden', viewId !== 'list');
            map.classList.toggle('hidden', viewId !== 'map');

            if (viewId === 'map') {
                btnMap.classList.replace('bg-white', 'bg-[#8D7B68]');
                btnMap.classList.replace('text-gray-600', 'text-white');
                btnList.classList.replace('bg-[#8D7B68]', 'bg-white');
                btnList.classList.replace('text-white', 'text-gray-600');

                initNaverMap();
                filterItems();
                setTimeout(() => { if (naverMap) window.dispatchEvent(new Event('resize')); }, 200);
            } else {
                btnList.classList.replace('bg-white', 'bg-[#8D7B68]');
                btnList.classList.replace('text-white', 'text-white');
                btnMap.classList.replace('bg-[#8D7B68]', 'bg-white');
                btnMap.classList.replace('text-white', 'text-gray-600');
            }
        };

        document.getElementById('btn-list-view').onclick = () => showView('list');
        document.getElementById('btn-map-view').onclick = () => showView('map');

        // --- Naver Map Zoom Controls ---
        document.getElementById('btn-zoom-in').onclick = () => naverMap && naverMap.setZoom(naverMap.getZoom() + 1);
        document.getElementById('btn-zoom-out').onclick = () => naverMap && naverMap.setZoom(naverMap.getZoom() - 1);
        document.getElementById('btn-zoom-reset').onclick = () => {
            if (naverMap) {
                naverMap.setCenter(new naver.maps.LatLng(MAP_INITIAL_VIEW[0], MAP_INITIAL_VIEW[1]));
                naverMap.setZoom(MAP_INITIAL_ZOOM);
            }
        };

        // --- Real Data Map ---
        // --- 포포즈 서울경기 통합 요금표 ---


                function parsePrice(item) {
            if (!item || !item.prices) return 99999999;

            if (Array.isArray(item.prices)) {
                if (item.prices.length > 0) {
                    let min = 99999999;
                    
                    // 장례/화장 관련 카테고리 우선 검색
                    let targetCategories = item.prices.filter(cat => cat.category && (cat.category.includes('화장') || cat.category.includes('장례') || cat.category.includes('패키지')));
                    
                    // 만약 관련 카테고리가 없으면 전체 카테고리 검색
                    let searchPool = targetCategories.length > 0 ? targetCategories : item.prices;

                    searchPool.forEach(cat => {
                        if (cat.items) {
                            cat.items.forEach(p => {
                                if (!p.price) return;
                                const numMatch = p.price.match(/(\d{1,3}(?:,\d{3})+|\d+)/);
                                if (numMatch) {
                                    let val = parseInt(numMatch[1].replace(/,/g, ''));
                                    if (val < 10000 && p.price.includes('만')) val *= 10000;
                                    
                                    // 0원이나 터무니없이 높은 값, 추가금 항목 등 제외
                                    if (!isNaN(val) && val > 50000 && val < min && !p.name.includes('추가') && !p.name.includes('초과') && !p.name.includes('가산')) {
                                        min = val;
                                    }
                                }
                            });
                        }
                    });
                    return min;
                }
            }
            return 99999999;
        }


        function getExtendedDetails(item) {
            let realInfo = REAL_DATA[item.name];
            if (!realInfo) {
                const foundKey = Object.keys(REAL_DATA).find(k => item.name.includes(k));
                if (foundKey) realInfo = REAL_DATA[foundKey];
            }

            const mockFacilities = [
                { name: '주차가능', icon: 'fa-parking' },
                { name: '참관가능', icon: 'fa-eye' },
                { name: '추모실', icon: 'fa-praying-hands' },
                { name: '대기실', icon: 'fa-couch' },
                { name: '개별화장', icon: 'fa-fire' },
                { name: '납골당', icon: 'fa-church' },
                { name: '픽업가능', icon: 'fa-car' },
                { name: '용품판매', icon: 'fa-shopping-bag' }
            ];

            let hash = 0;
            for (let i = 0; i < item.name.length; i++) {
                hash = item.name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const seededRandom = function () {
                const x = Math.sin(hash++) * 10000;
                return x - Math.floor(x);
            };

            const facilities = mockFacilities.sort(() => 0.5 - seededRandom()).slice(0, 4);
            const dynamicRating = (4.5 + seededRandom() * 0.5).toFixed(1);
            const dynamicReviewCount = Math.floor(seededRandom() * 200) + 10;

            let address = realInfo?.address;
            if (!address) {
                const region = getRegion(item);
                const regionMap = {
                    'seoul': '서울', 'incheon': '인천', 'gyeonggi': '경기',
                    'other': '전국', 'gangwon': '강원', 'chungcheong': '충청',
                    'gyeongsang': '경상', 'jeolla': '전라'
                };
                const city = regionMap[region] || '대한민국';
                address = `${city} 지역`;
            }

            let prices = realInfo?.prices || STANDARD_PRICES;
            let pricingType = realInfo?.pricingType || 'categorized';
            let imageUrl = realInfo?.imageUrl || null;

            return {
                ...item,
                rating: realInfo ? dynamicRating : (4.0 + Math.random() * 1.0).toFixed(1),
                reviewCount: realInfo ? dynamicReviewCount : Math.floor(Math.random() * 50) + 5,
                address: address,
                hours: '24시간 연중무휴',
                phone: PHONE_DATA[item.name] || `0507-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
                description: `${item.name}은(는) 보호자님의 슬픔을 깊이 위로하며, 정성을 다해 반려동물의 마지막 가는 길을 함께합니다.`,
                facilities: facilities,
                prices: prices,
                pricingType: pricingType,
                imageUrl: imageUrl
            };
        }

        // --- Modal Logic ---
        const modal = document.getElementById('detail-modal');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const modalContent = document.getElementById('modal-content');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        function openDetailModal(item) {
            const details = getExtendedDetails(item);

            document.getElementById('modal-title').textContent = details.name;
            document.getElementById('modal-subtitle').textContent = details.enName;
            document.getElementById('modal-image').src = details.imageUrl || `https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?q=80&w=800&auto=format&fit=crop`;

            // 별점 및 후기 개수 업데이트 로직 제거 (UI에서 삭제됨)

            document.getElementById('modal-address').textContent = details.address;
            document.getElementById('modal-address-short').textContent = details.address.split(' ').slice(0, 2).join(' ');
            document.getElementById('modal-phone').textContent = details.phone;
            document.getElementById('modal-desc').textContent = details.description;

            const badgesContainer = document.getElementById('modal-badges');
            badgesContainer.innerHTML = '';
            if (details.isAlliance) {
                badgesContainer.innerHTML += '<span class="bg-[#8D7B68] text-white text-xs px-2 py-1 rounded">제휴</span>';
            }
            badgesContainer.innerHTML += '<span class="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">24시간</span>';

            // Update Modal Map: Google Maps Embed -> Naver Maps Link
            const mapContainer = document.querySelector('#location .h-48');
            if (mapContainer) {
                const query = encodeURIComponent(details.address);
                mapContainer.innerHTML = `
                        <div class="relative w-full h-full group cursor-pointer" onclick="window.open('https://map.naver.com/v5/search/${query}', '_blank')">
                            <!-- Google Maps Embed (Zoomed In, View Only) -->
                            <div class="w-full h-full pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                                <iframe 
                                    width="100%"
                                    height="100%"
                                    frameborder="0" 
                                    style="border:0" 
                                    src="https://maps.google.com/maps?q=${details.latitude},${details.longitude}&hl=ko&z=17&output=embed" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                            
                            <!-- Static Overlay for Click Handling -->
                            <div class="absolute inset-0 z-10 bg-transparent flex items-center justify-center group-hover:bg-black/5 transition-colors">
                                <span class="bg-[#03C75A] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-105 pointer-events-none">
                                    <span class="font-extrabold">N</span> 네이버 지도로 보기
                                </span>
                            </div>
                        </div>`;

                // Remove container click handler as inner div handles it
                mapContainer.onclick = null;
                mapContainer.classList.remove('cursor-pointer', 'group');
            }



            if (mapContainer) {
                mapContainer.onclick = () => {
                    const query = encodeURIComponent(details.address);
                    window.open(`https://map.naver.com/v5/search/${query}?c=${details.longitude},${details.latitude},18,0,0,0,dh`, '_blank');
                };
                mapContainer.classList.add('cursor-pointer', 'group');
            }

            const facilitiesContainer = document.getElementById('modal-facilities-icons');
            facilitiesContainer.innerHTML = '';
            details.facilities.forEach(fac => {
                const el = document.createElement('div');
                el.className = 'flex flex-col items-center gap-1';
                el.innerHTML = `
                        <div class="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center text-gray-500">
                            <i class="fas ${fac.icon} text-lg"></i>
                        </div>
                        <span class="text-[11px] text-gray-500 tracking-tight">${fac.name}</span>
                    `;
                facilitiesContainer.appendChild(el);
            });

            const pricesContainer = document.getElementById('modal-prices-list');
            const minPriceEl = document.getElementById('modal-min-price');
            pricesContainer.innerHTML = '';

            let minPriceVal = parsePrice(details);
            minPriceEl.textContent = minPriceVal >= 99999999 ? "상담 문의" : `${minPriceVal.toLocaleString()}원~`;

            if (details.prices && Array.isArray(details.prices)) {
                details.prices.forEach(category => {
                    if (category.category) {
                        const headerLi = document.createElement('li');
                        headerLi.className = "text-[12px] font-bold text-[#8D7B68] bg-[#FAF8F5] px-2 py-1.5 rounded mt-3 mb-1 tracking-tight first:mt-0";
                        headerLi.textContent = category.category;
                        pricesContainer.appendChild(headerLi);
                    }
                    if (category.items) {
                        category.items.forEach(p => {
                            const li = document.createElement('li');
                            li.className = "flex justify-between items-center text-[13px] py-1 border-b border-gray-50 last:border-0";
                            li.innerHTML = `
                                    <span class="text-gray-700">${p.name}</span>
                                    <span class="font-bold text-gray-800">${p.price}</span>
                                 `;
                            pricesContainer.appendChild(li);
                        });
                    }
                });
            }

            const btnCall = document.getElementById('modal-call-btn');
            btnCall.onclick = () => handleReservation(details.name);

            modal.classList.remove('hidden');
            setTimeout(() => {
                modalBackdrop.classList.remove('opacity-0');
                modalContent.classList.remove('translate-y-full', 'md:translate-y-10', 'opacity-0');
            }, 10);

            // Update current details for secondary modal
            window.currentModalDetails = details;
        }

        // --- Secondary Service Modal Logic (Multi-Item List) ---
        window.openServiceDetails = async function () {
            const details = window.currentModalDetails;
            if (!details) return;

            let realInfo = null;
            try {
                const response = await fetch('manual_data.json?v=' + Date.now());
                const manualData = await response.json();
                realInfo = manualData[details.name];
            } catch (err) {
                console.error("Data Load Error:", err);
            }

            let packageItems = [];
            let targetPrices = (realInfo && realInfo.prices) ? realInfo.prices : (details.prices || []);

            if (targetPrices.length > 0) {
                targetPrices.forEach(cat => {
                    if (cat.items && cat.items.length > 0) {
                        if (cat.category) {
                            packageItems.push({ isCategory: true, name: cat.category });
                        }
                        packageItems = packageItems.concat(cat.items);
                    }
                });
            }

            // Data Compensation (Full Pack for Pet Forest)
            if (packageItems.length === 0 && details.name.includes('펫포레스트')) {
                packageItems = [
                    {
                        name: "스탠다드 장례",
                        price: "350,000원",
                        desc: "전용 추모실 + 개별 화장 + 장례지도사",
                        longDesc: "가장 기본적인 장례 서비스로, 정기적인 위생 관리와 정성스러운 염습, 개별 화장 서비스가 포함되어 있습니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-1.jpg"
                    },
                    {
                        name: "포레스트 장례",
                        price: "700,000원",
                        desc: "고급 수의 + 고급 오동나무관 + 포레스트 유골함",
                        longDesc: "자연을 닮은 포레스트 시리즈 용품이 포함된 패키지로, 더욱 품격 있는 이별을 준비해 드립니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-2.jpg"
                    },
                    {
                        name: "프리미엄 장례",
                        price: "1,400,000원",
                        desc: "최고급 수의 + 최고급 오동나무관 + 기능성 유골함",
                        longDesc: "펫포레스트의 모든 정성이 담긴 최상위 패키지입니다. 풍성한 꽃다발과 전용 하우징이 제공됩니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-3.jpg"
                    },
                    {
                        name: "스탠다드 루세떼 장례",
                        price: "1,000,000원",
                        desc: "스탠다드 장례 + 루세떼 제작 + 보증서",
                        longDesc: "스탠다드 장례 후 영원히 간직할 수 있는 명품 보석 '루세떼'를 제작해 드리는 패키지입니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-4.jpg"
                    },
                    {
                        name: "포레스트 루세떼 장례",
                        price: "1,350,000원",
                        desc: "포레스트 장례 + 루세떼 제작 + 보증서",
                        longDesc: "가장 인기 있는 조합으로, 정성스러운 장례 용품과 루세떼 제작이 모두 포함되어 있습니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-5.jpg"
                    },
                    {
                        name: "프리미엄 루세떼 장례",
                        price: "1,750,000원",
                        desc: "프리미엄 장례 + 루세떼 제작 + 보증서",
                        longDesc: "최고의 예우와 영원한 기억을 위한 최상위 루세떼 패키지입니다.",
                        imageUrl: "https://petforest.co.kr/images/funeral/funeral-expense-6.jpg"
                    }
                ];
            }

            showServiceModal(packageItems, details.imageUrl);
        }

        function showServiceModal(items) {
            const container = document.getElementById('service-modal-list');
            container.innerHTML = '';

            if (items.length === 0) {
                container.innerHTML = '<div class="p-8 text-center text-gray-400 text-sm">등록된 요금 상세 정보가 없습니다.</div>';
            } else {
                items.forEach(item => {
                    if (item.isCategory) {
                        const catHeader = document.createElement('div');
                        catHeader.className = "flex items-center gap-3 mt-10 mb-6 pb-2 border-b-2 border-gray-100 first:mt-2";
                        catHeader.innerHTML = `
                                <div class="w-1.5 h-6 bg-[#8D7B68] rounded-full"></div>
                                <h3 class="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">${item.name}</h3>
                            `;
                        container.appendChild(catHeader);
                        return;
                    }

                    const isFallback = !item.imageUrl;
                    // 반려동물 장례/추모 분위기를 위한 로컬 기본 이미지 파일 (오프라인 브라우저 차단 완벽 회피)
                    const defaultImg = './fallback.jpg';
                    const imgSrc = item.imageUrl || defaultImg;
                    const card = document.createElement('div');
                    card.className = "mb-8 last:mb-0 border-b border-gray-100 last:border-0 pb-8 last:pb-0";
                    card.innerHTML = `
                            <div class="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-gray-100 flex items-center justify-center border border-gray-100 bg-gray-50">
                                <img src="${imgSrc}" 
                                     alt="${item.name}" 
                                     class="w-full h-full object-contain ${isFallback ? 'opacity-85 grayscale-[15%] transition duration-300 pointer-events-none' : ''}"
                                     onerror="this.src='${defaultImg}'; this.nextElementSibling.style.display='block';">
                                <div class="absolute bottom-3 right-3 bg-black/60 text-white/90 text-[11px] px-2.5 py-1.5 rounded-md backdrop-blur-sm pointer-events-none" style="display: ${isFallback ? 'block' : 'none'}">
                                    이미지가 제공되지 않습니다.
                                </div>
                            </div>
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="text-xl font-bold text-gray-900">${item.name}</h4>
                                <span class="text-[#8D7B68] font-bold text-lg">${item.price}</span>
                            </div>
                            <p class="text-sm font-medium text-gray-500 mb-3">${item.desc || ''}</p>
                            <div class="bg-gray-50 p-4 rounded-xl">
                                <p class="text-gray-600 text-[13px] leading-relaxed break-keep">
                                    ${item.longDesc || item.desc || "상세 설명 정보가 없습니다."}
                                </p>
                            </div>
                        `;
                    container.appendChild(card);
                });
            }

            document.getElementById('service-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        window.closeServiceModal = function () {
            document.getElementById('service-modal').classList.add('hidden');
            document.body.style.overflow = '';
        }

        function closeDetailModal() {
            modalBackdrop.classList.add('opacity-0');
            modalContent.classList.add('translate-y-full', 'opacity-0');
            if (window.innerWidth >= 768) {
                modalContent.classList.add('md:translate-y-10');
            }
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }

        modalCloseBtn.addEventListener('click', closeDetailModal);
        modalBackdrop.addEventListener('click', closeDetailModal);


        // --- Initial Load ---
        let funeralHomesData = [];

        async function initData() {
            try {
                // Show loading state
                const listContainer = document.getElementById('result-list');
                if (listContainer) {
                    listContainer.innerHTML = `
                        <div class="col-span-full py-32 text-center animate-pulse">
                            <div class="w-20 h-20 bg-[#8D7B68]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i class="fas fa-spinner fa-spin text-3xl text-[#8D7B68]"></i>
                            </div>
                            <p class="text-gray-900 font-bold text-xl mb-2">장례식장 정보를 불러오는 중</p>
                            <p class="text-gray-400 text-sm">전국의 반려동물 장례 시설 데이터를 최신화하고 있습니다.</p>
                        </div>
                    `;
                }

                // Fetch from Supabase
                const data = await Auth.getAllFuneralHomes();
                if (data && data.length > 0) {
                    funeralHomesData = data;
                } else {
                    // Fallback to RAW_JSON if DB is empty
                    if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {
                        funeralHomesData = RAW_JSON.business;
                    } else if (typeof REAL_DATA !== 'undefined') {
                        funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {
                            const info = REAL_DATA[name];
                            return {
                                id: 'fallback-' + index,
                                name: name,
                                address: info.address || '',
                                latitude: info.latitude || 37.5665,
                                longitude: info.longitude || 126.9780,
                                image_url: info.imageUrl || '',
                                is_alliance: true,
                                prices: info.prices || []
                            };
                        });
                    } else {
                        funeralHomesData = [];
                    }
                }

                console.log(`DATA: Loaded ${funeralHomesData.length} items from ${data && data.length > 0 ? 'Supabase' : 'Fallback'}`);
                
                // Reset enriched data to force refresh
                enrichedHomesData = null;
                
                updateFilterCounts();
                filterItems();
            } catch (err) {
                console.error("Initialization Error:", err);
                // Fallback
                if (typeof RAW_JSON !== 'undefined' && RAW_JSON.business) {
                    funeralHomesData = RAW_JSON.business;
                } else if (typeof REAL_DATA !== 'undefined') {
                    funeralHomesData = Object.keys(REAL_DATA).map((name, index) => {
                        const info = REAL_DATA[name];
                        return {
                            id: 'fallback-' + index,
                            name: name,
                            address: info.address || '',
                            latitude: info.latitude || 37.5665,
                            longitude: info.longitude || 126.9780,
                            image_url: info.imageUrl || '',
                            is_alliance: true,
                            prices: info.prices || []
                        };
                    });
                } else {
                    funeralHomesData = [];
                }
                filterItems();
            }
        }

        // Initialize on load
        window.addEventListener('DOMContentLoaded', initData);

        // Handle URL parameters
        window.addEventListener('load', () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('quote') === 'true') {
                setTimeout(openQuoteModal, 500);
            }
        });
    

// ---- SCRIPT BOUNDARY ---- 


        // Global reservation handler
        async function handleReservation(facilityId) {
            const user = await Auth.getCurrentUser();
            if (user) {
                window.location.href = 'reservation.html?id=' + encodeURIComponent(facilityId);
            } else {
                alert('예약은 로그인 후 이용 가능합니다.');
                window.location.href = 'login.html';
            }
        }

        // --- Instant Quote Logic ---
        const quoteModal = document.getElementById('quote-modal');
        const quoteContent = document.getElementById('quote-modal-content');

        function openQuoteModal() {
            quoteModal.classList.remove('hidden');
            setTimeout(() => quoteContent.classList.remove('translate-x-full'), 10);
        }

        function closeQuoteModal() {
            quoteContent.classList.add('translate-x-full');
            setTimeout(() => quoteModal.classList.add('hidden'), 300);
        }

        document.getElementById('btn-instant-quote').onclick = openQuoteModal;

        function updateEstimatedQuote() {
            let total = 200000; // Base 5kg
            const weightArr = document.getElementsByName('quote-weight');
            let weight = 5;
            for (let radio of weightArr) {
                if (radio.checked) {
                    weight = parseInt(radio.value);
                    break;
                }
            }

            if (weight === 10) total += 50000;
            if (weight === 20) total += 150000;
            if (weight === 30) total += 250000;

            if (document.getElementById('opt-shroud').checked) total += 100000;
            if (document.getElementById('opt-coffin').checked) total += 150000;
            if (document.getElementById('opt-stone').checked) total += 250000;

            document.getElementById('quote-total').textContent = total.toLocaleString();
            return total;
        }

        // Attach event listeners to radios
        document.querySelectorAll('input[name="quote-weight"]').forEach(r => r.addEventListener('change', updateEstimatedQuote));

        // --- Sync Filters (Sidebar & Modal) ---
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('filter-checkbox') || e.target.id === 'filter-alliance' || e.target.id === 'mobile-filter-alliance') {
                const isAlliance = e.target.id === 'filter-alliance' || e.target.id === 'mobile-filter-alliance';
                if (isAlliance) {
                    const otherId = (e.target.id === 'filter-alliance') ? 'mobile-filter-alliance' : 'filter-alliance';
                    const other = document.getElementById(otherId);
                    if (other) other.checked = e.target.checked;
                } else {
                    const val = e.target.value;
                    document.querySelectorAll(`.filter-checkbox[value="${val}"]`).forEach(cb => {
                        cb.checked = e.target.checked;
                    });
                }
                filterItems();
            }
        });

        function applyQuoteFilter() {
            const region = document.querySelector('input[name="quote-region"]:checked').value;
            const total = updateEstimatedQuote();
            const regionName = {
                'sudogwon': '서울/경기/인천',
                'chungcheong': '충청/대전/세종',
                'gyeongsang': '경상/부산/대구',
                'jeolla': '전라/광주',
                'gangwon': '강원'
            }[region] || region;

            // Apply standard filters
            const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
            filterCheckboxes.forEach(cb => {
                cb.checked = (cb.value === region);
            });
            
            // Sync alliance checkboxes
            const allianceCb = document.getElementById('filter-alliance');
            const mobileAllianceCb = document.getElementById('mobile-filter-alliance');
            if(allianceCb) allianceCb.checked = true;
            if(mobileAllianceCb) mobileAllianceCb.checked = true;

            // Trigger search filter and switch view
            setTimeout(() => {
                filterItems();
                showView('list');
                closeQuoteModal();
                setTimeout(() => {
                    alert(`선택하신 지역(${regionName})에 기반한 추천 결과입니다.`);
                }, 300);
            }, 100);
        }

        if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .catch(err => console.log('SW registration skipped or failed:', err));
            });
        } else if (window.location.protocol === 'file:') {
            console.warn('Onsil: PWA features (Service Worker) are disabled on file:// protocol for security reasons.');
        }

        // Mobile Nav
        function toggleMobileNav() {
            const nav = document.getElementById('mobile-nav');
            const panel = document.getElementById('mobile-nav-panel');
            if (nav.classList.contains('hidden')) {
                nav.classList.remove('hidden');
                requestAnimationFrame(() => panel.classList.add('mobile-nav-open'));
                document.body.style.overflow = 'hidden';
            } else {
                panel.classList.remove('mobile-nav-open');
                document.body.style.overflow = '';
                setTimeout(() => nav.classList.add('hidden'), 300);
            }
        }
    

// ---- SCRIPT BOUNDARY ---- 


        function toggleMobileNav() {
            const nav = document.getElementById('mobile-nav');
            const panel = document.getElementById('mobile-nav-panel');
            if (nav.classList.contains('hidden')) {
                nav.classList.remove('hidden');
                setTimeout(() => panel.classList.remove('translate-x-full'), 10);
            } else {
                panel.classList.add('translate-x-full');
                setTimeout(() => nav.classList.add('hidden'), 300);
            }
        }

        function openFilterModal() {
            const modal = document.getElementById('filter-modal');
            const content = document.getElementById('filter-modal-content');
            modal.classList.remove('hidden');
            setTimeout(() => content.classList.remove('translate-x-full'), 10);
        }

        function closeFilterModal() {
            const modal = document.getElementById('filter-modal');
            const content = document.getElementById('filter-modal-content');
            content.classList.add('translate-x-full');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    

// ---- SCRIPT BOUNDARY ---- 


        function openFilterModal() {
            const modal = document.getElementById('filter-modal');
            const content = document.getElementById('filter-modal-content');
            modal.classList.remove('hidden');
            setTimeout(() => content.classList.remove('translate-x-full'), 10);
            document.body.style.overflow = 'hidden';
        }
        function closeFilterModal() {
            const modal = document.getElementById('filter-modal');
            const content = document.getElementById('filter-modal-content');
            content.classList.add('translate-x-full');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    