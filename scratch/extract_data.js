const fs = require('fs');
const path = require('path');

const searchPath = path.join(__dirname, '../onsil/search.html');
const manualDataPath = path.join(__dirname, '../onsil/manual_data.json');
const funeralHomesJsonPath = path.join(__dirname, '../funeral_homes.json');
const phoneDataPath = path.join(__dirname, '../onsil/phone_data.js');

// 1. RAW_JSON (from search.html)
const searchContent = fs.readFileSync(searchPath, 'utf8');
const rawJsonMatch = searchContent.match(/const RAW_JSON = (\{[\s\S]*?\})\s*;/);
const rawJson = rawJsonMatch ? JSON.parse(rawJsonMatch[1]) : { business: [] };

// 2. funeral_homes.json
const fhJsonRaw = fs.readFileSync(funeralHomesJsonPath, 'utf8');
const fhJson = JSON.parse(fhJsonRaw.replace(/^\uFEFF/, ''));

// 3. manual_data.json
const manualDataRaw = fs.readFileSync(manualDataPath, 'utf8');
const manualData = JSON.parse(manualDataRaw.replace(/^\uFEFF/, ''));

// 4. phone_data.js
const phoneDataContent = fs.readFileSync(phoneDataPath, 'utf8');
const phoneMatches = phoneDataContent.match(/"([^"]+)":\s*"([^"]+)"/g);
const phoneMap = {};
if (phoneMatches) {
    phoneMatches.forEach(m => {
        const parts = m.split(':');
        const name = parts[0].trim().replace(/"/g, '');
        const phone = parts[1].trim().replace(/"/g, '');
        phoneMap[name] = phone;
    });
}

// 5. recovery.js (SnapPlug)
const snapPlug = {
    name: "스냅플러그",
    address: "부천시 도당동 121-2",
    latitude: 37.518174,
    longitude: 126.779774,
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

// --- MERGING ---
const allNames = new Set([
    ...rawJson.business.map(b => b.name),
    ...fhJson.business.map(b => b.name),
    ...Object.keys(manualData),
    ...Object.keys(phoneMap),
    snapPlug.name
]);

const merged = Array.from(allNames).map(name => {
    const fromRaw = rawJson.business.find(b => b.name === name) || {};
    const fromFh = fhJson.business.find(b => b.name === name) || {};
    const fromManual = manualData[name] || {};
    const fromPhone = phoneMap[name] || '';
    
    // SnapPlug override
    if (name === snapPlug.name) {
        return {
            uuid: 'snap-plug-uuid', // Placeholder or generate one
            name: snapPlug.name,
            enName: 'snapplug',
            latitude: snapPlug.latitude,
            longitude: snapPlug.longitude,
            isAlliance: snapPlug.isAlliance,
            address: snapPlug.address,
            is24h: false,
            prices: snapPlug.prices,
            phone: snapPlug.phone
        };
    }

    return {
        uuid: fromRaw.uuid || fromFh.uuid || null,
        name: name,
        enName: fromRaw.enName || fromFh.enName || null,
        latitude: parseFloat(fromRaw.latitude || fromFh.latitude || null),
        longitude: parseFloat(fromRaw.longitude || fromFh.longitude || null),
        isAlliance: fromRaw.isAlliance || fromFh.isAlliance || false,
        address: fromManual.address || null,
        is24h: fromManual.is24h || false,
        prices: fromManual.prices || [],
        phone: fromPhone
    };
});

fs.writeFileSync(path.join(__dirname, 'merged_funeral_homes.json'), JSON.stringify(merged, null, 2));
console.log(`성공적으로 ${merged.length}개의 데이터를 병합했습니다. (스냅플러그 포함)`);
