/**
 * search.html 복원 스크립트 (CRLF 버전)
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'search.html');
let content = fs.readFileSync(filePath, 'utf8');

// renderMapPins 함수가 없으면 통째로 삽입
// 현재 파일에는 renderMapPins 함수 body가 initNaverMap에 잘못 섞여있음
// 방법: initNaverMap 함수 내의 잘못된 marker 생성 코드를 정상으로 교체하고
// renderMapPins 함수를 renderRegionLabels 앞에 삽입

// 현재 깨진 부분 확인
const badPattern = /(\s+const marker = new naver\.maps\.Marker\([\s\S]+?naverMarkers\.push\(marker\);\r?\n\s+\}\);\r?\n\s+\})\r?\n\r?\n\s+function renderRegionLabels/;

const match = content.match(badPattern);
if (!match) {
    console.log('패턴 없음. 현재 renderRegionLabels 앞 내용:');
    const idx = content.indexOf('function renderRegionLabels');
    console.log(content.slice(idx - 200, idx));
    process.exit(1);
}

console.log('패턴 찾음! 교체 시작...');

// 교체할 올바른 내용: initNaverMap 마무리 + renderMapPins 삽입
const replacement = `
                naverMap = new naver.maps.Map('map', mapOptions);

                if (!naverMap) {
                    throw new Error('네이버 지도 객체 생성 실패');
                }

                naver.maps.Event.addListener(naverMap, 'zoom_changed', () => {
                    filterItems();
                });

                console.log('INIT: Map Success');

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
            if (currentZoom < 9) return;
            const showLabel = currentZoom >= 12;

            console.log(\`MAP: Rendering \${items.length} items (showLabel: \${showLabel})\`);

            items.forEach(item => {
                const lat = parseFloat(item.latitude);
                const lng = parseFloat(item.longitude);
                if (isNaN(lat) || isNaN(lng)) return;

                const isAlliance = item.is_alliance || item.isAlliance;
                const fillColor = (ON_CONFIG.showPartnership && isAlliance) ? '#C5A065' : '#8D7B68';

                const labelDisplay = showLabel ? 'block' : 'none';
                const labelBorder = showLabel ? 'border:1.5px solid ' + fillColor + ';' : '';
                const labelStyle = 'position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:rgba(255,255,255,0.95);color:#3b2a0e;font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px;' + labelBorder + 'box-shadow:0 2px 8px rgba(0,0,0,0.15);white-space:nowrap;pointer-events:none;letter-spacing:-0.3px;display:' + labelDisplay + ';';

                const iconHtml = [
                    '<div style="position:relative;cursor:pointer;"',
                    ' onmouseenter="this.querySelector(\\'.nl\\').style.display=\\'block\\'"',
                    ' onmouseleave="this.querySelector(\\'.nl\\').style.display=\\'' + labelDisplay + '\\'"',
                    '>',
                    '<div style="width:16px;height:16px;border-radius:50%;background-color:' + fillColor + ';border:2px solid #fff;box-shadow:0 0 10px rgba(0,0,0,0.3);"></div>',
                    '<div class="nl" style="' + labelStyle + '">' + item.name + '</div>',
                    '</div>'
                ].join('');

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

        function renderRegionLabels`;

content = content.replace(badPattern, replacement);

if (!content.includes('function renderMapPins')) {
    console.log('❌ renderMapPins 함수 삽입 실패!');
    process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ search.html 복원 완료! renderMapPins 이름 레이블 추가 성공!');
