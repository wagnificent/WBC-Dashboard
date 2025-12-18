/**
 * Script to check if database triggers exist
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTriggers() {
    console.log('🔍 Checking if database triggers exist...');

    try {
        // Check for the trigger function
        const { data: functionData, error: functionError } = await supabase
            .rpc('get_trigger_functions', {
                function_name: 'update_team_stats_from_game'
            });

        if (functionError) {
            console.log('❌ Trigger function not found or error:', functionError.message);
        } else {
            console.log('✅ Trigger function exists:', functionData);
        }

        // Check for triggers on the games table
        const { data: triggerData, error: triggerError } = await supabase
            .rpc('get_table_triggers', {
                table_name: 'games'
            });

        if (triggerError) {
            console.log('❌ Could not check table triggers:', triggerError.message);
        } else {
            console.log('📊 Triggers on games table:', triggerData);
        }

        // Try a direct SQL query to check triggers
        try {
            const { data: sqlData, error: sqlError } = await supabase
                .rpc('execute_sql', {
                    sql: "SELECT * FROM pg_trigger WHERE tgname LIKE 'update_team_stats%';"
                });

            if (sqlError) {
                console.log('❌ SQL query failed:', sqlError.message);
            } else {
                console.log('📋 Trigger query results:', sqlData);
            }
        } catch (error) {
            console.log('❌ Direct SQL execution not supported via RPC');
        }

    } catch (error) {
        console.error('❌ Error checking triggers:', error.message);
    }
}

// Run the check
checkTriggers();
