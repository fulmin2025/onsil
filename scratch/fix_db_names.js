const { createClient } = require('@supabase/supabase-client');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fixNames() {
    // Fix "리포즈" -> "리틀포즈"
    const { error: error1 } = await supabase
        .from('funeral_homes')
        .update({ name: '리틀포즈' })
        .eq('name', '리포즈');

    if (error1) console.error('Error fixing 리포즈:', error1);
    else console.log('Fixed 리포즈 -> 리틀포즈');

    // Add any other fixes if needed
}

// Note: We can't run this directly without @supabase/supabase-client installed.
// I will provide the SQL to the user or try to run it via curl if possible.
