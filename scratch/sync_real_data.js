const fs = require('fs');

const manualData = JSON.parse(fs.readFileSync('manual_data.json', 'utf8'));
let searchHtml = fs.readFileSync('search.html', 'utf8');

// 1. REAL_DATA 블록 찾기
const startMarker = 'const REAL_DATA = {';
const endMarker = '};';
const startIdx = searchHtml.indexOf(startMarker);
const endIdx = searchHtml.indexOf(endMarker, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error("REAL_DATA marker not found");
    process.exit(1);
}

// 2. 기존 REAL_DATA를 수동으로 파싱 (간단하게 키-값 쌍 추출)
const realDataContent = searchHtml.substring(startIdx + startMarker.length, endIdx);
const existingData = {};

// 업체별 블록 추출 (정교하진 않지만 대략적으로...)
const entries = realDataContent.split(/,\s*\n\s*"/);
entries.forEach(entry => {
    let cleanEntry = entry.trim();
    if (cleanEntry.startsWith('"')) cleanEntry = cleanEntry.substring(1);
    const keyMatch = cleanEntry.match(/^([^"]+)"\s*:\s*({[\s\S]*})/);
    if (keyMatch) {
        const key = keyMatch[1];
        try {
            // eval을 사용하여 객체 리터럴 파싱 (보안 위험은 로컬 작업이므로 감수)
            // 실제 서비스 코드라면 주의해야 함. 여기서는 데이터 동기화용.
            // constants가 정의되어 있어야 하므로, search.html의 상수 선언부도 가져와야 함.
            existingData[key] = key; // 일단 키만 저장
        } catch (e) {}
    }
});

// 3. REAL_DATA 재생성
// manual_data.json에 있는 업체들은 덮어쓰고, 없는 업체들은 기존 것(또는 상수로 정의된 것) 유지
// 하지만 중복 방지를 위해 새로운 객체를 조립함

// 실제로 더 안전한 방법: 
// search.html에서 REAL_DATA 블록 전체를 manual_data.json 기반으로 생성된 문자열로 교체
// 단, manual_data.json에 없는 업체(REAL_DATA에만 있는 업체)들도 보존해야 함.

const mergedData = { ...manualData };

// manual_data.json에 없지만 REAL_DATA에 있는 업체들을 보존하기 위해 
// 기존 search.html에서 업체 리스트를 다시 정확히 추출
const lines = realDataContent.split('\n');
let currentKey = null;
let currentBlock = "";
let braceLevel = 0;

const finalDataEntries = [];

// manual_data에 있는 업체들은 이미 mergedData에 있음.
// REAL_DATA에만 있는 업체들을 문자열 그대로 가져옴.
// (중복 제거를 위해 이미 manual_data에 있는 업체는 건너뜀)

// ... 이 작업은 수동으로 정교하게 하는 것이 안전함.

// 우선, 중복이 확실한 녀석들을 제거하는 것부터 시작.
console.log("Starting sync...");

// search.html의 REAL_DATA 부분을 직접 수정하는 대신, 
// 정제된 REAL_DATA 객체를 새로 구성하여 파일에 덮어씀.
