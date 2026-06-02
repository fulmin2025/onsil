const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function dumpAll() {
  console.log('DB에서 전체 장례식장 조회 중...');
  let allData = [];
  let page = 0;
  const pageSize = 100;
  
  while (true) {
    const { data, error } = await supabase
      .from('funeral_homes')
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1);
      
    if (error) {
      console.error('에러 발생:', error);
      break;
    }
    
    if (!data || data.length === 0) {
      break;
    }
    
    allData = allData.concat(data);
    if (data.length < pageSize) {
      break;
    }
    page++;
  }
  
  console.log(`총 ${allData.length}개의 데이터 조회 완료.`);
  fs.writeFileSync('scratch/db_funeral_homes_dump.json', JSON.stringify(allData, null, 2), 'utf8');
  console.log('scratch/db_funeral_homes_dump.json 파일로 저장 완료.');
}

dumpAll();
