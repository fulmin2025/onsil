
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

async function checkSchema() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    console.log('--- reservations 테이블 데이터 샘플 확인 ---');
    const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching data:', error.message);
        if (error.message.includes('not find')) {
            console.log('실제로 컬럼이 존재하지 않거나 테이블이 없습니다.');
        }
    } else {
        console.log('성공! 기존 데이터 컬럼들:', Object.keys(data[0] || {}));
    }
}

checkSchema();
