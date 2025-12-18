/**
 * Simple test to check if the trigger function exists and works
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testTriggerFunction() {
    console.log('🧪 Testing if trigger function exists...');

    try {
        // Try to call the initial statistics calculation function directly
        const { data, error } = await supabase
            .rpc('calculate_initial_team_stats');

        if (error) {
            console.log('❌ Trigger function error:', error.message);
            console.log('This likely means the triggers were not created properly.');
        } else {
            console.log('✅ Trigger function executed successfully:', data);
        }

        // Check if we can see the teams table
        const { data: teams, error: teamsError } = await supabase
            .from('teams')
            .select('*')
            .limit(1);

        if (teamsError) {
            console.log('❌ Cannot access teams table:', teamsError.message);
        } else {
            console.log('✅ Can access teams table');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testTriggerFunction();
