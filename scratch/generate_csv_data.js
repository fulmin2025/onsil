const fs = require('fs');
const vm = require('vm');

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
  L: {
    map: () => ({ setView: () => {}, addLayer: () => {} }),
    tileLayer: () => ({ addTo: () => {} }),
    marker: () => ({ addTo: () => {}, bindPopup: () => {} })
  },
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval
};

vm.createContext(context);

console.log('데이터 로드 및 병합 진행 중...');
const scriptContent = fs.readFileSync('test_script.js', 'utf8');
const startIndex = scriptContent.indexOf('const FOUR_PAWS_PRICES =');
const cleanCode = scriptContent.substring(startIndex);
vm.runInContext(cleanCode, context);

const REAL_DATA = context.REAL_DATA || {};
const dbHomes = JSON.parse(fs.readFileSync('scratch/db_funeral_homes_dump.json', 'utf8'));
const mergedHomes = JSON.parse(fs.readFileSync('scratch/merged_funeral_homes.json', 'utf8'));

// 데이터 병합 Map 생성
const allHomesMap = new Map();

// 로컬 데이터 병합
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

// DB 데이터 병합
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

// REAL_DATA 병합
Object.entries(REAL_DATA).forEach(([name, data]) => {
  const existing = allHomesMap.get(name);
  if (existing) {
    existing.address = data.address || existing.address;
    existing.image_url = data.imageUrl || existing.image_url;
    if (!existing.prices || existing.prices.length === 0) {
      existing.prices = data.prices || [];
    }
  } else {
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

// 하늘강아지, 파트라슈, 아이헤븐 최신 상세 요금 강제 병합
const haneulPrices = context.HANEUL_PRICES || [];
const patraschePrices = [
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

const homesList = Array.from(allHomesMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'ko'));

// CSV 이스케이프 함수
function escapeCsv(val) {
  if (val === null || val === undefined) return '';
  let str = String(val).replace(/"/g, '""');
  // 개행이나 콤마가 포함되면 쌍따옴표로 묶음
  if (str.includes(',') || str.includes('\n') || str.includes('\r') || str.includes('"')) {
    str = `"${str}"`;
  }
  return str;
}

// 파일 1: 전체_장례식장_요약_목록.csv (BOM 추가)
let summaryCsv = '\ufeff장례식장명,주소,대표연락처,24시간운영여부,제휴여부,소개글\n';
homesList.forEach(home => {
  const is24 = home.is_24h ? 'Y' : 'N';
  const isAlliance = home.is_alliance ? 'Y' : 'N';
  const description = home.description || `${home.name}은(는) 보호자님의 슬픔을 위로하며, 정성을 다해 반려동물의 마지막 소풍길을 배웅합니다.`;
  
  summaryCsv += `${escapeCsv(home.name)},${escapeCsv(home.address)},${escapeCsv(home.phone)},${is24},${isAlliance},${escapeCsv(description)}\n`;
});

// 파일 2: 전체_장례식장_상세_요금표.csv (플랫 덴탈화 테이블, BOM 추가)
let detailsCsv = '\ufeff장례식장명,요금카테고리,상품/항목명,가격,상품설명\n';
const STANDARD_PRICES = context.STANDARD_PRICES || [];

homesList.forEach(home => {
  const prices = (home.prices && home.prices.length > 0) ? home.prices : STANDARD_PRICES;
  if (prices && prices.length > 0) {
    prices.forEach(cat => {
      const catName = cat.category || '기본 요금 안내';
      if (cat.items && cat.items.length > 0) {
        cat.items.forEach(item => {
          const desc = item.desc || item.longDesc || '-';
          detailsCsv += `${escapeCsv(home.name)},${escapeCsv(catName)},${escapeCsv(item.name)},${escapeCsv(item.price)},${escapeCsv(desc)}\n`;
        });
      } else {
        detailsCsv += `${escapeCsv(home.name)},${escapeCsv(catName)},-,-,-\n`;
      }
    });
  } else {
    detailsCsv += `${escapeCsv(home.name)},등록 요금 정보 없음,-,전화 문의,-\n`;
  }
});

// 파일 작성
fs.writeFileSync('전체_장례식장_요약_목록.csv', summaryCsv, 'utf8');
fs.writeFileSync('전체_장례식장_상세_요금표.csv', detailsCsv, 'utf8');

console.log('CSV 파일들이 성공적으로 생성되었습니다!');
console.log('1. 전체_장례식장_요약_목록.csv');
console.log('2. 전체_장례식장_상세_요금표.csv');
