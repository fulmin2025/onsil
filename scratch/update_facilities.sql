-- 1. 하늘강아지 정보 업데이트
UPDATE public.funeral_homes
SET 
  address = '경기 광주시 초월읍 선동리 386-5',
  phone = '1551-5052',
  is_24h = FALSE,
  image_url = 'https://cdn.imweb.me/thumbnail/20250810/14567aedad916.jpg',
  description = '경기 광주의 반려동물 장례식장으로, 단독 추모공간과 여유로운 추모 시간을 제공하여 마지막 이별에 집중할 수 있도록 돕습니다.',
  prices = '[
    {
      "category": "일반 장례 패키지 (10kg 미만 기준)",
      "items": [
        { "name": "기본 장례", "price": "200,000원", "desc": "개별화장, 단독 추모실, 기본 유골함 등 포함", "longDesc": "단독 추모실, 국화 헌화, 개별 화장, 보자기, 장례 확인서, 편지지, 붉은 실, 발 도장 키트, 털 간직 키트, 기본 유골함, 유골 주머니가 포함된 기본 장례 서비스입니다.", "imageUrl": "./images/haneul_basic.png" },
        { "name": "스카이 장례", "price": "450,000원", "desc": "소동물 35만원 / 기본 장례 + 최고급 수의 및 관", "longDesc": "기본 장례 구성에 염습, 최고급 수의, 최고급 관, 도자기 유골함, 원목 액자가 추가로 제공됩니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/6bece5aaa1b19.jpg" },
        { "name": "요람 장례", "price": "700,000원", "desc": "최고급 요람 세트 및 무지개 유골함 등", "longDesc": "기본 장례 구성에 염습, 요람 침구 세트, 최고급 요람, 생화 꽃 장식(소량), 무지개 유골함, 원목 액자가 모두 포함된 품격 있는 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/12607cb830076.jpg" },
        { "name": "프리미엄 장례", "price": "900,000원", "desc": "최상위 수의/관 세트 및 기능성 유골함 등", "longDesc": "기본 장례 구성에 염습, 최상위 수의 세트, 최상위 관, 생화 꽃 장식(소량), 기능성 유골함, 아크릴 액자가 포함된 프리미엄 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/0a5e1d569f503.jpg" },
        { "name": "VIP 장례", "price": "1,300,000원", "desc": "VIP 수의/관 세트 및 VIP 생화 장식 등 최상급 예우", "longDesc": "최상의 예우를 위해 기본 장례 구성에 염습, VIP 수의 세트, VIP 관, VIP 생화 꽃 장식, 최고급 기능성 유골함, 아크릴 액자가 포함된 최고급 장례 서비스입니다.", "imageUrl": "https://cdn.imweb.me/thumbnail/20250810/4ba0908c5194f.jpg" }
      ]
    },
    {
      "category": "스톤 장례 패키지 (메모리얼 스톤 포함)",
      "items": [
        { "name": "기본 스톤 장례", "price": "500,000원", "desc": "소동물 30만원 / 기본 장례 + 메모리얼 스톤", "longDesc": "기본 장례 패키지에 아이의 유골을 아름답게 간직할 수 있는 메모리얼 스톤 제작과 유리 스톤함이 포함됩니다.", "imageUrl": "./images/haneul_stone_basic.png" },
        { "name": "스카이 스톤 장례", "price": "750,000원", "desc": "소동물 45만원 / 스카이 장례 + 메모리얼 스톤", "longDesc": "스카이 장례 패키지(최고급 수의/관 등)에 메모리얼 스톤 제작과 유리 스톤함이 포함됩니다.", "imageUrl": "./images/haneul_stone_sky.png" },
        { "name": "요람 스톤 장례", "price": "1,000,000원", "desc": "요람 장례 + 메모리얼 스톤 및 원목 스톤함", "longDesc": "요람 장례(최고급 요람 등) 패키지에 더해 메모리얼 스톤 제작과 고급스러운 원목 스톤함이 제공됩니다.", "imageUrl": "./images/haneul_stone_cradle.png" },
        { "name": "프리미엄 스톤 장례", "price": "1,300,000원", "desc": "프리미엄 장례 + 메모리얼 스톤 및 원목 스톤함", "longDesc": "프리미엄 장례(최상위 수의/관 등)에 메모리얼 스톤 제작과 고급 원목 스톤함이 함께 제공되는 고품격 패키지입니다.", "imageUrl": "./images/haneul_stone_premium.jpg" },
        { "name": "VIP 스톤 장례", "price": "1,650,000원", "desc": "VIP 장례 + 상위 기능성 유골함 또는 원목 스톤함", "longDesc": "가장 고귀한 예우를 위한 VIP 장례 패키지에 메모리얼 스톤 제작과 상위 기능성 고도자 유골함(또는 원목 스톤함)이 포함된 최고급 옵션입니다.", "imageUrl": "./images/haneul_stone_vip.jpg" }
      ]
    },
    {
      "category": "체중별 추가 비용",
      "items": [
        { "name": "10kg ~ 20kg", "price": "10,000원", "desc": "1kg당 추가 요금 1만원", "longDesc": "기본 제공 무게인 10kg을 초과하여 최대 20kg까지는 1kg 초과 시마다 10,000원이 추가로 청구됩니다." },
        { "name": "20kg 초과", "price": "15,000원", "desc": "1kg당 추가 요금 1.5만원", "longDesc": "20kg 이상의 대형견/동물의 경우 기준 초과 1kg당 15,000원씩의 장례 추가 비용이 발생합니다." }
      ]
    }
  ]'::jsonb
WHERE name = '하늘강아지';

-- 2. 파트라슈 정보 업데이트
UPDATE public.funeral_homes
SET
  address = '부산 기장군 장안읍 좌동리 49-1',
  phone = '1551-5052',
  is_24h = FALSE,
  image_url = '/images/container/content/con02_01.jpg',
  description = '부산 기장군에 위치하여 오랜 시간 보호자님들의 신뢰를 받아온 안심 반려동물 장례식장 파트라슈입니다.',
  prices = '[
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
  ]'::jsonb
WHERE name = '파트라슈';

-- 3. 아이헤븐 정보 업데이트
UPDATE public.funeral_homes
SET
  address = '경남 김해시 생림면 봉림리 872-1',
  phone = '0507-8718-213',
  is_24h = TRUE,
  image_url = 'https://cdn.imweb.me/upload/S202306122b453f1bb47a0/6c0b6a857354c.png',
  description = '경남 김해의 24시간 반려동물 장례식장으로, 아이를 위한 따뜻하고 경건한 이별 공간을 제공합니다.'
WHERE name = '아이헤븐';
