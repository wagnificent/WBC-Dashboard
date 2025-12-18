/**
 * Discover Actual Schema Script
 * This script uses the working SupabaseManager to discover the actual database schema
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function discoverActualSchema() {
    console.log('🔍 Discovering Actual Database Schema');
    console.log('=====================================');

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // Discover teams schema
        await discoverTeamsSchema(supabaseManager);

        // Discover games schema
        await discoverGamesSchema(supabaseManager);

        // Discover players schema (if accessible)
        await discoverPlayersSchema(supabaseManager);

        console.log('🎉 Schema discovery completed!');

    } catch (error) {
        console.error('❌ Schema discovery failed:', error);
    }
}

/**
 * Discover Teams Schema
 */
async function discoverTeamsSchema(supabaseManager) {
    console.log('\n📋 Discovering Teams Schema:');

    try {
        const teams = await supabaseManager.getTeams();

        if (teams && teams.length > 0) {
            console.log('✅ Teams found:', teams.length);
            console.log('📊 Actual teams columns:', Object.keys(teams[0]));
            console.log('📊 Sample team data:', JSON.stringify(teams[0], null, 2));
        } else {
            console.log('❌ No teams data available');
        }
    } catch (error) {
        console.error('❌ Teams discovery error:', error.message);
    }
}

/**
 * Discover Games Schema
 */
async function discoverGamesSchema(supabaseManager) {
    console.log('\n📋 Discovering Games Schema:');

    try {
        const games = await supabaseManager.getGames();

        if (games && games.length > 0) {
            console.log('✅ Games found:', games.length);
            console.log('📊 Actual games columns:', Object.keys(games[0]));
            console.log('📊 Sample game data:', JSON.stringify(games[0], null, 2));
        } else {
            console.log('❌ No games data available');
        }
    } catch (error) {
        console.error('❌ Games discovery error:', error.message);
    }
}

/**
 * Discover Players Schema
 */
async function discoverPlayersSchema(supabaseManager) {
    console.log('\n📋 Discovering Players Schema:');

    try {
        // Try to get players for the first team
        const players = await supabaseManager.getTeamPlayers(1);

        if (players && players.length > 0) {
            console.log('✅ Players found:', players.length);
            console.log('📊 Actual players columns:', Object.keys(players[0]));
            console.log('📊 Sample player data:', JSON.stringify(players[0], null, 2));
        } else {
            console.log('ℹ️ No players found for team 1, trying all players...');

            // If team players doesn't work, try getting all players directly
            try {
                const allPlayers = await supabaseManager.getAllPlayers();
                if (allPlayers && allPlayers.length > 0) {
                    console.log('✅ All players found:', allPlayers.length);
                    console.log('📊 Actual players columns:', Object.keys(allPlayers[0]));
                    console.log('📊 Sample player data:', JSON.stringify(allPlayers[0], null, 2));
                } else {
                    console.log('❌ No players data available');
                }
            } catch (error) {
                console.error('❌ All players discovery error:', error.message);
            }
        }
    } catch (error) {
        console.error('❌ Players discovery error:', error.message);
    }
}

// Run the discovery
(async () => {
    await discoverActualSchema();
})();
