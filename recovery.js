const fs = require('fs');
const path = require('path');

const snapPlugData = {
    name: "스냅플러그",
    address: "부천시 도당동 121-2",
    lat: 37.518174,
    lng: 126.779774,
    phone: "1551-5051",
    prices: [
        {
            category: "스냅플러그 장례 비용",
            items: [
                { name: "기본 장례", price: "200,000원", desc: "개별 화장, 추모실 이용 등 포함" }
            ]
        }
    ],
    isAlliance: true
};

const snapPlugShort = { name: "스냅플러그", lat: 37.518174, lng: 126.779774, region: "경기 부천", price: "20만원~", isAlliance: true };

const partnerLoginHtml = `
                        <li class="pt-2 border-t border-brand/5">
                            <a href="partner-login.html" class="text-xs font-bold text-gray-400 hover:text-partner transition-colors">
                                <i class="fas fa-lock text-[10px] mr-1"></i> 업체 로그인
                            </a>
                        </li>`;

const partnerLoginHtmlAlt = `
                        <li class="pt-2 border-t border-[#2C3E50]/5">
                            <a href="partner-login.html" class="text-xs font-bold text-gray-400 hover:text-partner transition-colors">
                                <i class="fas fa-lock text-[10px] mr-1"></i> 업체 로그인
                            </a>
                        </li>`;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Fix Privacy Policy link
    content = content.replace(/terms\.html"([^>]*>개인정보처리방침<\/a>)/g, 'privacy.html"$1');

    // 2. Add Partner Login if missing
    if (!content.includes('partner-login.html')) {
        content = content.replace(/(privacy\.html"[^>]*>개인정보처리방침<\/a><\/li>)/, '$1' + partnerLoginHtml);
        content = content.replace(/(privacy\.html"[^>]*>개인정보처리방침<\/a><\/li>)/, '$1' + partnerLoginHtmlAlt);
    }

    // 3. Restore SnapPlug
    if (!content.includes('스냅플러그')) {
        if (content.includes('const REAL_DATA = {')) {
            content = content.replace('const REAL_DATA = {', 'const REAL_DATA = {\n            "스냅플러그": ' + JSON.stringify(snapPlugData, null, 4) + ',');
        } else if (content.includes('const HOMES_DATA = [')) {
            content = content.replace('const HOMES_DATA = [', 'const HOMES_DATA = [' + JSON.stringify(snapPlugShort) + ',');
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${filePath}`);
    }
}

const filesToFix = [
    'index.html', 'search.html', 'memory.html', 'guide.html',
    'onsil/index.html', 'onsil/search.html', 'onsil/memory.html', 'onsil/guide.html'
];

filesToFix.forEach(f => {
    if (fs.existsSync(f)) fixFile(f);
});
