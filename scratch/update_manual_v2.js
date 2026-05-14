const fs = require('fs');
const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));

// 1. 리틀포즈 추가
manualData["리틀포즈"] = {
    "address": "대구 군위군 부계면 창평리 812",
    "pricingType": "categorized",
    "prices": [
        {
            "category": "기본 장례 서비스",
            "items": [
                { "name": "기본 장례 (5kg 미만)", "price": "250,000원", "desc": "염습, 추모예식, 개별화장, 유골함 포함" }
            ]
        }
    ]
};

// 2. 해늘마루 추가
manualData["해늘마루"] = {
    "address": "전남 목포시 대양동 756-10",
    "pricingType": "categorized",
    "prices": [
        {
            "category": "기본 장례 서비스",
            "items": [
                { "name": "기본 화장 (5kg 기준)", "price": "200,000원", "desc": "개별화장, 단독추모실, 유골함 포함" }
            ]
        }
    ]
};

// 3. 패투헤븐 데이터 수정 (별도 문의 -> 수치형)
if (manualData["패투헤븐"]) {
    manualData["패투헤븐"].prices[0].items[0].price = "200,000원";
}

fs.writeFileSync('manual_data.json', JSON.stringify(manualData, null, 4), 'utf8');
console.log("Updated manual_data.json with missing/corrected info.");
