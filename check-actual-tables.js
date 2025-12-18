/**
 * Check Actual Tables Script
 * This script checks what tables actually exist and their structure
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkActualTables() {
    console.log('🔍 Checking Actual Tables in Database');
    console.log('=====================================');

    try {
        // Try to get all tables information
        await checkAllTables();
        await checkSpecificTables();

    } catch (error) {
        console.error('❌ Error checking tables:', error);
    }
}

/**
 * Check all tables using different approaches
 */
async function checkAllTables() {
    console.log('\n📋 Checking all accessible tables:');

    try {
        // Try to get data from teams table with different approaches
        console.log('🔍 Trying teams table...');
        const { data: teams1, error: teamsError1 } = await supabase
            .from('teams')
            .select('*');

        if (teamsError1) {
            console.log('❌ Teams table error:', teamsError1.message);
        } else {
            console.log('✅ Teams response:', teams1);
            if (teams1 && teams1.length > 0) {
                console.log('✅ Teams found:', teams1.length);
                console.log('📊 First team:', teams1[0]);
            } else {
                console.log('ℹ️ Teams data is empty or null');
            }
        }

        // Try players table
        console.log('🔍 Trying players table...');
        const { data: players, error: playersError } = await supabase
            .from('players')
            .select('*');

        if (playersError) {
            console.log('❌ Players table error:', playersError.message);
        } else {
            console.log('✅ Players response:', players);
            if (players && players.length > 0) {
                console.log('✅ Players found:', players.length);
                console.log('📊 First player:', players[0]);
            } else {
                console.log('ℹ️ Players data is empty or null');
            }
        }

        // Try games table
        console.log('🔍 Trying games table...');
        const { data: games, error: gamesError } = await supabase
            .from('games')
            .select('*');

        if (gamesError) {
            console.log('❌ Games table error:', gamesError.message);
        } else {
            console.log('✅ Games response:', games);
            if (games && games.length > 0) {
                console.log('✅ Games found:', games.length);
                console.log('📊 First game:', games[0]);
            } else {
                console.log('ℹ️ Games data is empty or null');
            }
        }

    } catch (error) {
        console.error('❌ Error checking all tables:', error.message);
    }
}

/**
 * Check specific tables with different query approaches
 */
async function checkSpecificTables() {
    console.log('\n🔍 Checking tables with different approaches:');

    try {
        // Try to get table info using RPC if available
        console.log('🔍 Trying to get table information via RPC...');

        // Check if we can get any data at all
        const { data: anyData, error: anyError } = await supabase
            .from('teams')
            .select('name')
            .limit(1);

        if (anyError) {
            console.log('❌ Cannot access teams table:', anyError.message);
        } else {
            console.log('✅ Teams name response:', anyData);
            if (anyData && anyData.length > 0) {
                console.log('✅ Can access teams table, found:', anyData.length, 'records');
            } else {
                console.log('ℹ️ Teams name data is empty or null');
            }
        }

    } catch (error) {
        console.error('❌ Error in specific table check:', error.message);
    }
}

// Run the check
(async () => {
    await checkActualTables();
})();
