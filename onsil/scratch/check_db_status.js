
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://fkmcanwlcigofjhbfkzs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9OyB7n3foIalMmDxq1-_PA_s3xYfcJS'; // This is a public key, but usually used in browser. 
// I might need a service role key for node script if RLS is on, but let's try with this first.

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDB() {
    console.log('Checking funeral_homes table...');
    try {
        const { data, error } = await supabase
            .from('funeral_homes')
            .select('count', { count: 'exact', head: true });
        
        if (error) {
            console.error('Error fetching count:', error);
            
            // Try specifying schema
            console.log('Trying with public schema explicitly...');
            const supabasePublic = createClient(SUPABASE_URL, SUPABASE_KEY, {
                db: { schema: 'public' }
            });
            const { data: data2, error: error2 } = await supabasePublic
                .from('funeral_homes')
                .select('count', { count: 'exact', head: true });
            
            if (error2) {
                console.error('Error with public schema:', error2);
            } else {
                console.log('Success with public schema! Count:', data2);
            }
        } else {
            console.log('Success! Count:', data);
        }
    } catch (e) {
        console.error('Exception:', e);
    }
}

checkDB();
