const fs = require('fs');
const path = require('path');

const mergedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'merged_funeral_homes.json'), 'utf8'));

let sql = `-- 1. funeral_homes 테이블 생성
CREATE TABLE IF NOT EXISTS public.funeral_homes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_uuid UUID,
    name TEXT NOT NULL,
    en_name TEXT,
    latitude FLOAT8,
    longitude FLOAT8,
    is_alliance BOOLEAN DEFAULT FALSE,
    address TEXT,
    phone TEXT,
    is_24h BOOLEAN DEFAULT FALSE,
    prices JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS 설정 (기본적으로 모두 조회 가능하도록 설정)
ALTER TABLE public.funeral_homes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view funeral homes" ON public.funeral_homes FOR SELECT USING (true);

-- 3. 기존 데이터 삭제 (중복 방지)
TRUNCATE TABLE public.funeral_homes;

-- 4. 데이터 삽입
INSERT INTO public.funeral_homes (external_uuid, name, en_name, latitude, longitude, is_alliance, address, phone, is_24h, prices) VALUES
`;

const values = mergedData.map(item => {
    const escape = (str) => str ? str.replace(/'/g, "''") : null;
    const val = (v) => v === null ? 'NULL' : `'${v}'`;
    const bool = (v) => v ? 'TRUE' : 'FALSE';
    const json = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'`;

    return `(${val(item.uuid)}, '${escape(item.name)}', ${val(item.enName)}, ${item.latitude}, ${item.longitude}, ${bool(item.isAlliance)}, ${val(escape(item.address))}, ${val(item.phone)}, ${bool(item.is24h)}, ${json(item.prices)})`;
}).join(',\n');

sql += values + ';';

fs.writeFileSync(path.join(__dirname, 'setup_funeral_homes.sql'), sql);
console.log('SQL 스크립트가 성공적으로 생성되었습니다: scratch/setup_funeral_homes.sql');
