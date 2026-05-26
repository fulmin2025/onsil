/**
 * 15개 제휴 장례식장 is_alliance = true 업데이트 스크립트
 * Node.js로 실행: node set_alliance.js
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 사용자가 요청한 15개 제휴 장례식장 이름 목록
const ALLIANCE_NAMES = [
    '좋은친구들',
    '스마일어게인',
    '대전이별공간',
    '굿바이펫',
    '러블리엔젤',
    '경북반려동물장례식장',
    '강아지펫헤븐',
    '하늘소풍',
    '별이되다',
    '이별공간',
    '스타티스',
    '펫바라기 남원점',
    '푸른솔',
    '타임투',
    '순천 반려동물장례식장 하늘별',
];

async function main() {
    console.log('🔍 Supabase에서 장례식장 데이터 조회 중...\n');

    // 1. 전체 장례식장 목록 조회 (이름 매칭을 위해)
    const { data: allHomes, error: fetchError } = await supabase
        .from('funeral_homes')
        .select('id, name, is_alliance');

    if (fetchError) {
        console.error('❌ 조회 실패:', fetchError.message);
        process.exit(1);
    }

    console.log(`📋 전체 장례식장 수: ${allHomes.length}개\n`);

    // 2. 이름으로 매칭되는 업체 찾기
    const matched = [];
    const notFound = [];

    for (const allianceName of ALLIANCE_NAMES) {
        const found = allHomes.find(h =>
            h.name === allianceName ||
            h.name.includes(allianceName) ||
            allianceName.includes(h.name)
        );
        if (found) {
            matched.push({ id: found.id, name: found.name, dbName: found.name });
            console.log(`  ✅ 찾음: "${allianceName}" → DB: "${found.name}" (id: ${found.id}, 현재 is_alliance: ${found.is_alliance})`);
        } else {
            notFound.push(allianceName);
            console.log(`  ❌ 없음: "${allianceName}" → DB에서 찾을 수 없습니다.`);
        }
    }

    console.log(`\n📊 매칭 결과: ${matched.length}개 찾음, ${notFound.length}개 없음\n`);

    if (matched.length === 0) {
        console.log('업데이트할 데이터가 없습니다.');
        process.exit(0);
    }

    // 3. 매칭된 업체들 is_alliance = true 업데이트
    console.log('🔄 is_alliance = true 로 업데이트 중...\n');
    
    const ids = matched.map(m => m.id);
    const { data: updatedData, error: updateError } = await supabase
        .from('funeral_homes')
        .update({ is_alliance: true })
        .in('id', ids)
        .select('id, name, is_alliance');

    if (updateError) {
        console.error('❌ 업데이트 실패:', updateError.message);
        process.exit(1);
    }

    console.log(`✅ ${updatedData.length}개 업데이트 완료!\n`);
    updatedData.forEach(h => {
        console.log(`  🌿 "${h.name}" → is_alliance: ${h.is_alliance}`);
    });

    if (notFound.length > 0) {
        console.log('\n⚠️  DB에 없는 업체 (직접 추가 필요):');
        notFound.forEach(n => console.log(`  - ${n}`));
    }

    console.log('\n🎉 완료! search.html에서 "온실 제휴 업체만 보기"를 누르면 이제 표시됩니다!');
}

main();
