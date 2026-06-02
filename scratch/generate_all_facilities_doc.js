const fs = require('fs');
const vm = require('vm');
const path = require('path');

// 1. VM 컨텍스트에 브라우저 모조(Mock) 객체 구성
const context = {
  document: {
    getElementById: () => ({
      appendChild: () => {},
      classList: { toggle: () => {}, replace: () => {} },
      addEventListener: () => {},
      closest: () => ({ style: {} }),
      onclick: null
    }),
    querySelectorAll: () => []
  },
  window: {
    location: { search: '', href: '' },
    addEventListener: () => {}
  },
  naver: {
    maps: {
      LatLng: function() {},
      Map: function() {
        return {
          getZoom: () => 10,
          setCenter: () => {},
          setZoom: () => {}
        };
      },
      Event: { addListener: () => {} },
      Marker: function() {},
      Size: function() {},
      Point: function() {}
    }
  },
  L: { // Leaflet 모조 객체 (혹시 필요할 수 있으므로 추가)
    map: () => ({ setView: () => {}, addLayer: () => {} }),
    tileLayer: () => ({ addTo: () => {} }),
    marker: () => ({ addTo: () => {}, bindPopup: () => {} })
  },
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval
};

vm.createContext(context);

console.log('test_script.js 실행하여 REAL_DATA 및 가격 정보 파싱 중...');
const scriptContent = fs.readFileSync('test_script.js', 'utf8');

// 구문 에러가 있는 앞부분을 잘라내고, 가격 정보 정의가 시작되는 'const FOUR_PAWS_PRICES =' 부분부터 실행합니다.
const startIndex = scriptContent.indexOf('const FOUR_PAWS_PRICES =');
if (startIndex === -1) {
  console.error('const FOUR_PAWS_PRICES = 문구를 찾을 수 없습니다.');
  process.exit(1);
}

const cleanCode = scriptContent.substring(startIndex);

try {
  vm.runInContext(cleanCode, context);
  console.log('test_script.js 실행 완료! REAL_DATA를 획득했습니다.');
} catch (err) {
  console.error('test_script.js 실행 중 에러 발생:', err.message);
  process.exit(1);
}

// 획득한 데이터
const REAL_DATA = context.REAL_DATA || {};
const STANDARD_PRICES = context.STANDARD_PRICES || [];

// 2. DB 덤프 데이터 및 로컬 JSON 데이터 로드
const dbHomes = JSON.parse(fs.readFileSync('scratch/db_funeral_homes_dump.json', 'utf8'));
const mergedHomes = JSON.parse(fs.readFileSync('scratch/merged_funeral_homes.json', 'utf8'));

// 3. 데이터 병합 (중복 제거 및 최신화)
// 모든 장례식장 맵 생성 (이름 기준)
const allHomesMap = new Map();

// 3-1. 로컬 merged_funeral_homes.json 기반으로 채워넣기
mergedHomes.forEach(home => {
  allHomesMap.set(home.name, {
    name: home.name,
    address: home.address || null,
    phone: home.phone || null,
    is_alliance: home.isAlliance || false,
    is_24h: home.is24h || false,
    prices: home.prices || [],
    latitude: home.latitude,
    longitude: home.longitude,
    description: null,
    image_url: null
  });
});

// 3-2. DB 덤프 데이터를 덮어써서 최신화 및 누락분 추가
dbHomes.forEach(home => {
  const existing = allHomesMap.get(home.name) || {};
  allHomesMap.set(home.name, {
    ...existing,
    name: home.name,
    address: home.address || existing.address,
    phone: home.phone || existing.phone,
    is_alliance: home.is_alliance !== undefined ? home.is_alliance : existing.is_alliance,
    is_24h: home.is_24h !== undefined ? home.is_24h : existing.is_24h,
    prices: (home.prices && home.prices.length > 0) ? home.prices : existing.prices,
    latitude: home.latitude !== undefined ? home.latitude : existing.latitude,
    longitude: home.longitude !== undefined ? home.longitude : existing.longitude,
    description: home.description || existing.description,
    image_url: home.image_url || existing.image_url
  });
});

// 3-3. test_script.js의 REAL_DATA 정보 병합
Object.entries(REAL_DATA).forEach(([name, data]) => {
  const existing = allHomesMap.get(name);
  if (existing) {
    existing.address = data.address || existing.address;
    existing.image_url = data.imageUrl || existing.image_url;
    if (!existing.prices || existing.prices.length === 0) {
      existing.prices = data.prices || [];
    }
  } else {
    // DB와 merged_funeral_homes에 둘 다 없었던 새로운 업체인 경우 추가
    allHomesMap.set(name, {
      name: name,
      address: data.address || null,
      phone: null,
      is_alliance: false,
      is_24h: false,
      prices: data.prices || [],
      latitude: null,
      longitude: null,
      description: null,
      image_url: data.imageUrl || null
    });
  }
});

// 3-4. 우리가 방금 작업했던 하늘강아지, 파트라슈, 아이헤븐 최신 상세 요금 강제 병합
const haneulPrices = context.HANEUL_PRICES || [];
const patraschePrices = PATRASCHE_PRICES = [
  {
    "category": "기본 장례 비용",
    "items": [
      { "name": "기본 화장 (5kg 미만)", "price": "200,000원 ~" },
      { "name": "기본 화장 (5~15kg)", "price": "250,000원 ~" }
    ]
  },
  {
    "category": "필수 포함 내역",
    "items": [
      { "name": "기본 영정사진", "price": "무료" },
      { "name": "개별 추모실", "price": "무료" },
      { "name": "기본 유골함", "price": "무료" }
    ]
  },
  {
    "category": "추가 선택 사항",
    "items": [
      { "name": "수의/관", "price": "별도 비용" },
      { "name": "메모리얼 스톤", "price": "200,000원 ~" }
    ]
  }
];

if (allHomesMap.has('하늘강아지')) {
  const h = allHomesMap.get('하늘강아지');
  h.prices = haneulPrices;
  h.address = '경기 광주시 초월읍 선동리 386-5';
  h.phone = '1551-5052';
  h.description = '경기 광주의 반려동물 장례식장으로, 단독 추모공간과 여유로운 추모 시간을 제공하여 마지막 이별에 집중할 수 있도록 돕습니다.';
  h.image_url = 'https://cdn.imweb.me/thumbnail/20250810/14567aedad916.jpg';
}

if (allHomesMap.has('파트라슈')) {
  const p = allHomesMap.get('파트라슈');
  p.prices = patraschePrices;
  p.address = '부산 기장군 장안읍 좌동리 49-1';
  p.phone = '1551-5052';
  p.description = '부산 기장군에 위치하여 오랜 시간 보호자님들의 신뢰를 받아온 안심 반려동물 장례식장 파트라슈입니다.';
  p.image_url = '/images/container/content/con02_01.jpg';
}

if (allHomesMap.has('아이헤븐')) {
  const i = allHomesMap.get('아이헤븐');
  i.address = '경남 김해시 생림면 봉림리 872-1';
  i.phone = '0507-8718-213';
  i.is_24h = true;
  i.description = '경남 김해의 24시간 반려동물 장례식장으로, 아이를 위한 따뜻하고 경건한 이별 공간을 제공합니다.';
  i.image_url = 'https://cdn.imweb.me/upload/S202306122b453f1bb47a0/6c0b6a857354c.png';
}

// 4. 마크다운 생성 로직
const homesList = Array.from(allHomesMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'ko'));

let md = `# 🌸 전국의 반려동물 장례식장 종합 도감 (총 ${homesList.length}개소)

본 문서는 프로젝트 '더온실' 데이터베이스 및 로컬 마스터 데이터로부터 수집한 전국의 모든 반려동물 장례식장의 주소, 연락처, 운영시간, 소개글 및 상세 요금 패키지 정보를 가나다순으로 정리한 도감입니다.

---

## 📌 전국 장례식장 요약 목록

| 번호 | 장례식장명 | 주소 | 연락처 | 24시간 운영 | 제휴 여부 |
| :---: | :--- | :--- | :--- | :---: | :---: |
`;

homesList.forEach((home, index) => {
  const allianceBadge = home.is_alliance ? '⭕' : '❌';
  const hour24Badge = home.is_24h ? '⭕' : '❌';
  const address = home.address || '정보 없음';
  const phone = home.phone || '정보 없음';
  
  md += `| ${index + 1} | **[${home.name}](#-${home.name.replace(/\s+/g, '-')})** | ${address} | ${phone} | ${hour24Badge} | ${allianceBadge} |\n`;
});

md += `\n---\n\n## 🔍 장례식장별 시설 소개 및 요금 상세 안내\n\n`;

homesList.forEach((home, index) => {
  const allianceText = home.is_alliance ? '🤝 [온실 제휴 안심 장례식장]' : '';
  const hour24Text = home.is_24h ? '⏰ [24시간 연중무휴 운영]' : '';
  const address = home.address || '주소 정보 등록 대기 중';
  const phone = home.phone || '연락처 정보 등록 대기 중';
  const description = home.description || `${home.name}은(는) 보호자님의 슬픔을 위로하며, 정성을 다해 반려동물의 마지막 소풍길을 배웅합니다.`;
  const imageUrl = home.image_url ? `\n![${home.name} 대표 이미지](${home.image_url})\n` : '';
  
  md += `### 🏠 ${home.name}\n\n`;
  md += `${allianceText} ${hour24Text}\n\n`;
  md += `* **주소**: ${address}\n`;
  md += `* **대표전화**: ${phone}\n`;
  md += `* **소개글**: ${description}\n`;
  md += imageUrl;
  md += `\n`;
  
  // 요금 정보 렌더링
  md += `#### 💵 요금 패키지 정보\n\n`;
  
  const prices = (home.prices && home.prices.length > 0) ? home.prices : STANDARD_PRICES;
  
  if (prices && prices.length > 0) {
    prices.forEach(category => {
      md += `* **${category.category || '기본 요금 안내'}**\n`;
      md += `\n  | 상품/항목명 | 가격 | 상세 설명 |\n  | :--- | :---: | :--- |\n`;
      if (category.items && category.items.length > 0) {
        category.items.forEach(item => {
          const desc = item.desc || item.longDesc || '-';
          md += `  | ${item.name} | **${item.price}** | ${desc} |\n`;
        });
      } else {
        md += `  | - | **-** | 정보 없음 |\n`;
      }
      md += `\n`;
    });
  } else {
    md += `> 💡 등록된 요금 테이블이 없습니다. 상세 비용은 대표 전화로 문의해 주세요.\n\n`;
  }
  
  md += `---\n\n`;
});

// 문서 저장
const artifactPath = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5eec7a70-ac5f-42dd-bb56-1ba77f6ae18d\\funeral_homes_guide.md';
fs.writeFileSync(artifactPath, md, 'utf8');
console.log('성공적으로 전체 장례식장 도감 문서를 생성하였습니다:', artifactPath);
