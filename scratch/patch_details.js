const fs = require('fs');
let content = fs.readFileSync('search.html', 'utf8');

const newFunc = `        function getExtendedDetails(item) {
            if (!item) return null;
            const itemName = item.name || "이름 없음";
            let realInfo = REAL_DATA[itemName];
            if (!realInfo) {
                const foundKey = Object.keys(REAL_DATA).find(k => itemName.includes(k));
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
            for (let i = 0; i < itemName.length; i++) {
                hash = itemName.charCodeAt(i) + ((hash << 5) - hash);
            }
            const seededRandom = function () {
                const x = Math.sin(hash++) * 10000;
                return x - Math.floor(x);
            };

            const facilities = mockFacilities.sort(() => 0.5 - seededRandom()).slice(0, 4);
            const dynamicRating = (4.5 + seededRandom() * 0.5).toFixed(1);
            const dynamicReviewCount = Math.floor(seededRandom() * 200) + 10;

            let address = realInfo?.address || item.address || item.location;
            if (!address) {
                const region = getRegion(item);
                const regionMap = {
                    'seoul': '서울', 'incheon': '인천', 'gyeonggi': '경기',
                    'other': '전국', 'gangwon': '강원', 'chungcheong': '충청',
                    'gyeongsang': '경상', 'jeolla': '전라'
                };
                const city = regionMap[region] || '대한민국';
                address = city + ' 지역';
            }

            let prices = realInfo?.prices || item.prices || STANDARD_PRICES;
            let pricingType = realInfo?.pricingType || 'categorized';
            let imageUrl = realInfo?.imageUrl || item.image_url || null;

            return {
                ...item,
                name: itemName,
                rating: realInfo ? dynamicRating : (4.0 + Math.random() * 1.0).toFixed(1),
                reviewCount: realInfo ? dynamicReviewCount : Math.floor(Math.random() * 50) + 5,
                address: address,
                hours: '24시간 연중무휴',
                phone: PHONE_DATA[itemName] || item.phone || ("0507-" + (Math.floor(Math.random() * 9000) + 1000) + "-" + (Math.floor(Math.random() * 9000) + 1000)),
                description: itemName + "은(는) 보호자님의 슬픔을 깊이 위로하며, 정성을 다해 반려동물의 마지막 가는 길을 함께합니다.",
                facilities: facilities,
                prices: prices,
                pricingType: pricingType,
                imageUrl: imageUrl
            };
        }`;

// Match the old function
const oldFuncPattern = /function getExtendedDetails\(item\) \{[\s\S]*?\n\s*\}\s*\n\s*\/\/ --- Modal Logic ---/;
if (content.match(oldFuncPattern)) {
    console.log("Matched function. Replacing...");
    content = content.replace(oldFuncPattern, newFunc + '\n\n        // --- Modal Logic ---');
    fs.writeFileSync('search.html', content, 'utf8');
    console.log("Replaced successfully.");
} else {
    console.log("Could not match function pattern.");
}
