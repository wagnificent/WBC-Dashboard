/**
 * Schema Examination Script
 * This script examines the actual table structure in the Supabase database
 * and compares it with the expected schema from the code.
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function examineDatabaseSchema() {
    console.log('🔍 Examining Actual Database Schema');
    console.log('===================================');

    try {
        // Examine each table structure
        await examineTeamsTable();
        await examinePlayersTable();
        await examineGamesTable();

        console.log('🎉 Schema examination completed!');
    } catch (error) {
        console.error('❌ Schema examination failed:', error);
    }
}

/**
 * Examine Teams Table Structure
 */
async function examineTeamsTable() {
    console.log('\n📋 Examining Teams Table:');

    try {
        // Get sample data to see actual columns
        const { data: teams, error } = await supabase
            .from('teams')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error examining teams table:', error.message);
            return;
        }

        if (teams && teams.length > 0) {
            const team = teams[0];
            console.log('✅ Teams table columns:', Object.keys(team));
            console.log('📊 Sample team data:', team);
        } else {
            console.log('ℹ️ No teams found in database');
        }
    } catch (error) {
        console.error('❌ Teams examination error:', error.message);
    }
}

/**
 * Examine Players Table Structure
 */
async function examinePlayersTable() {
    console.log('\n📋 Examining Players Table:');

    try {
        // Get sample data to see actual columns
        const { data: players, error } = await supabase
            .from('players')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error examining players table:', error.message);
            return;
        }

        if (players && players.length > 0) {
            const player = players[0];
            console.log('✅ Players table columns:', Object.keys(player));
            console.log('📊 Sample player data:', player);
        } else {
            console.log('ℹ️ No players found in database');
        }
    } catch (error) {
        console.error('❌ Players examination error:', error.message);
    }
}

/**
 * Examine Games Table Structure
 */
async function examineGamesTable() {
    console.log('\n📋 Examining Games Table:');

    try {
        // Get sample data to see actual columns
        const { data: games, error } = await supabase
            .from('games')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error examining games table:', error.message);
            return;
        }

        if (games && games.length > 0) {
            const game = games[0];
            console.log('✅ Games table columns:', Object.keys(game));
            console.log('📊 Sample game data:', game);
        } else {
            console.log('ℹ️ No games found in database');
        }
    } catch (error) {
        console.error('❌ Games examination error:', error.message);
    }
}

/**
 * Compare with Expected Schema
 */
function compareWithExpectedSchema() {
    console.log('\n🔄 Comparing with Expected Schema:');
    console.log('=================================');

    const expectedSchema = {
        teams: ['id', 'name', 'wins', 'losses', 'runs_scored', 'runs_allowed', 'players_count', 'created_at'],
        players: ['id', 'first_name', 'last_name', 'age', 'hometown', 'team_id', 'tournaments_played', 'created_at'],
        games: ['id', 'day_of_week', 'time', 'stadium_name', 'home_team_id', 'visiting_team_id', 'home_score', 'visiting_score', 'game_complete', 'created_at']
    };

    console.log('📝 Expected Teams columns:', expectedSchema.teams);
    console.log('📝 Expected Players columns:', expectedSchema.players);
    console.log('📝 Expected Games columns:', expectedSchema.games);
}

// Run the examination
(async () => {
    await examineDatabaseSchema();
    compareWithExpectedSchema();
})();
