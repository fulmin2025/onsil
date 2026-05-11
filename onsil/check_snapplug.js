
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

async function checkSnapPlug() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    console.log('--- funeral_homes 테이블 데이터 확인 ---');
    const { data, error } = await supabase
        .from('funeral_homes')
        .select('name, is_alliance')
        .eq('name', '스냅플러그')
        .maybeSingle();

    if (error) {
        console.error('Error fetching data:', error.message);
    } else if (data) {
        console.log('✅ 스냅플러그가 DB에 존재합니다:', data);
    } else {
        console.log('❌ 스냅플러그가 DB에 없습니다.');
        
        // 전체 목록 개수 확인
        const { count, error: countError } = await supabase
            .from('funeral_homes')
            .select('*', { count: 'exact', head: true });
        
        if (!countError) {
            console.log(`현재 총 ${count}개의 장례식장이 등록되어 있습니다.`);
        }
    }
}

checkSnapPlug();
