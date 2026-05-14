const { createClient } = require('@supabase/supabase-client');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkNames() {
    const { data, error } = await supabase
        .from('funeral_homes')
        .select('name');

    if (error) {
        console.error('Error fetching names:', error);
        return;
    }

    console.log('Total funeral homes in DB:', data.length);
    console.log('Names in DB:');
    data.forEach(h => console.log(`- "${h.name}"`));
}

checkNames();
