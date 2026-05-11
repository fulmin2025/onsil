-- ============================================
-- 🏠 funeral_homes 주소 일괄 업데이트 SQL
-- REAL_DATA 기반으로 null 주소를 채워넣습니다.
-- ============================================

-- 1. 리틀포즈
UPDATE funeral_homes SET address = '대구 군위군 부계면 창평리 812' WHERE name = '리틀포즈' AND (address IS NULL OR address = 'null');

-- 2. 21그램 경기광주점
UPDATE funeral_homes SET address = '경기 광주시 매산동 139' WHERE name = '21그램 경기광주점' AND (address IS NULL OR address = 'null');

-- 3. 경북
UPDATE funeral_homes SET address = '경북 김천시 봉산면 신암리 396' WHERE name = '경북' AND (address IS NULL OR address = 'null');

-- 4. 21그램 남양주점
UPDATE funeral_homes SET address = '경기 남양주시 화도읍 차산리 856-1' WHERE name = '21그램 남양주점' AND (address IS NULL OR address = 'null');

-- 5. 한별리멤버파크
UPDATE funeral_homes SET address = '경남 함안군 산인면 송산로 441' WHERE name = '한별리멤버파크' AND (address IS NULL OR address = 'null');

-- 6. 해피펫
UPDATE funeral_homes SET address = '전북 완주군 이서면 은교리 508' WHERE name = '해피펫' AND (address IS NULL OR address = 'null');

-- 7. 펫바라기 남원점
UPDATE funeral_homes SET address = '전북 남원시 보절면 신파리 403' WHERE name = '펫바라기 남원점' AND (address IS NULL OR address = 'null');

-- 8. 포포즈 세종점
UPDATE funeral_homes SET address = '세종 부강면 부강리 658-2' WHERE name = '포포즈 세종점' AND (address IS NULL OR address = 'null');

-- 9. 스윗드림펫
UPDATE funeral_homes SET address = '경북 칠곡군 가산면 다부리 651' WHERE name = '스윗드림펫' AND (address IS NULL OR address = 'null');

-- 10. 포포즈 양주점
UPDATE funeral_homes SET address = '경기 양주시 광적면 비암리 583-4' WHERE name = '포포즈 양주점' AND (address IS NULL OR address = 'null');

-- 11. 백꽃사랑하이빛
UPDATE funeral_homes SET address = '경기 광주시 곤지암읍 부항리 236' WHERE name = '백꽃사랑하이빛' AND (address IS NULL OR address = 'null');

-- 12. 포포즈 경기광주점
UPDATE funeral_homes SET address = '경기 광주시 초월읍 신월리 592-19' WHERE name = '포포즈 경기광주점' AND (address IS NULL OR address = 'null');

-- 13. 강아지펫헤븐
UPDATE funeral_homes SET address = '경북 성주군 선남면 오도리 91' WHERE name = '강아지펫헤븐' AND (address IS NULL OR address = 'null');

-- 14. 러브펫 경기광주점
UPDATE funeral_homes SET address = '경기 광주시 초월읍 지월리 712-10' WHERE name = '러브펫 경기광주점' AND (address IS NULL OR address = 'null');

-- 15. 몽몽이엠파크
UPDATE funeral_homes SET address = '경기 남양주시 화도읍 구암리 305' WHERE name = '몽몽이엠파크' AND (address IS NULL OR address = 'null');

-- 16. 펫바라기 일산점
UPDATE funeral_homes SET address = '경기 고양시 일산동구 설문동 515-1' WHERE name = '펫바라기 일산점' AND (address IS NULL OR address = 'null');

-- 17. 전주아리움
UPDATE funeral_homes SET address = '전북 전주시 완산구 효자동3가 1039-1' WHERE name = '전주아리움' AND (address IS NULL OR address = 'null');

-- 18. 젠틀펫스타
UPDATE funeral_homes SET address = '경북 문경시 문경읍 진안리 350-4' WHERE name = '젠틀펫스타' AND (address IS NULL OR address = 'null');

-- 19. 하늘강아지
UPDATE funeral_homes SET address = '경기 광주시 초월읍 선동리 386-5' WHERE name = '하늘강아지' AND (address IS NULL OR address = 'null');

-- 20. 포포즈 화성점
UPDATE funeral_homes SET address = '경기 화성시 팔탄면 창곡리 925-6' WHERE name = '포포즈 화성점' AND (address IS NULL OR address = 'null');

-- 21. 해늘마루
UPDATE funeral_homes SET address = '전남 목포시 대양동 756-10' WHERE name = '해늘마루' AND (address IS NULL OR address = 'null');

-- 22. 전주하늘
UPDATE funeral_homes SET address = '전북 완주군 소양면 신원리 1-3' WHERE name = '전주하늘' AND (address IS NULL OR address = 'null');

-- 23. 펫노블레스
UPDATE funeral_homes SET address = '경남 양산시 상북면 상삼리 807' WHERE name = '펫노블레스' AND (address IS NULL OR address = 'null');

-- 24. 서래안펫타운
UPDATE funeral_homes SET address = '전북 군산시 경암동 570-39' WHERE name = '서래안펫타운' AND (address IS NULL OR address = 'null');

-- 25. 펫콤
UPDATE funeral_homes SET address = '경기 안산시 단원구 목내동 517-9' WHERE name = '펫콤' AND (address IS NULL OR address = 'null');

-- 26. 한별
UPDATE funeral_homes SET address = '경남 창원시 성산구 창원대로 11' WHERE name = '한별' AND (address IS NULL OR address = 'null');

-- 27. 포포즈 김해점
UPDATE funeral_homes SET address = '경상남도 김해시 한림면 안하로 102' WHERE name = '포포즈 김해점' AND (address IS NULL OR address = 'null');

-- 28. 푸른솔
UPDATE funeral_homes SET address = '전남 여수시 율촌면 취적리 964-3' WHERE name = '푸른솔' AND (address IS NULL OR address = 'null');

-- 29. 펫로스케어
UPDATE funeral_homes SET address = '경남 김해시 상동면 우계리 112-1' WHERE name = '펫로스케어' AND (address IS NULL OR address = 'null');

-- 30. 펫메모리얼
UPDATE funeral_homes SET address = '강원 횡성군 공근면 초원리 109-16' WHERE name = '펫메모리얼' AND (address IS NULL OR address = 'null');

-- 31. 파트라슈
UPDATE funeral_homes SET address = '부산 기장군 장안읍 좌동리 49-1' WHERE name = '파트라슈' AND (address IS NULL OR address = 'null');

-- 32. 리멤버파크
UPDATE funeral_homes SET address = '충남 논산시 연산면 청동리 16' WHERE name = '리멤버파크' AND (address IS NULL OR address = 'null');

-- 33. 스마일어게인
UPDATE funeral_homes SET address = '충북 영동군 추풍령면 작점리 148' WHERE name = '스마일어게인' AND (address IS NULL OR address = 'null');

-- 34. 21그램 천안아산점
UPDATE funeral_homes SET address = '충청남도 천안시 동남구 광풍로 1668' WHERE name = '21그램 천안아산점' AND (address IS NULL OR address = 'null');

-- 35. 아리아펫
UPDATE funeral_homes SET address = '경기 이천시 마장면 장암리 525-1' WHERE name = '아리아펫' AND (address IS NULL OR address = 'null');

-- 36. 포포즈 김포점
UPDATE funeral_homes SET address = '경기 김포시 월곶면 개곡리 810-1' WHERE name = '포포즈 김포점' AND (address IS NULL OR address = 'null');

-- ============================================
-- 기존에 잘못된 문자열 'null'로 들어간 것도 수정
-- (실제 NULL 로 변경)
-- ============================================
UPDATE funeral_homes SET address = NULL WHERE address = 'null';

-- ============================================
-- 결과 확인
-- ============================================
SELECT name, address, region FROM funeral_homes ORDER BY name;
