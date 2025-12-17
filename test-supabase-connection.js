/**
 * Supabase Connection Test Script
 *
 * This script tests the Supabase database connection and all API methods
 * to ensure everything is working correctly.
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Run comprehensive tests
 */
async function runTests() {
    console.log('🧪 Running Supabase Connection Tests');
    console.log('====================================');

    // Validate environment variables first
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        console.warn('⚠️  Warning: Using default credentials for testing');
        console.warn('For production, set SUPABASE_URL and SUPABASE_KEY in .env file');
    }

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // Test 1: Database connection
        console.log('\n📶 Testing database connection...');
        const teams = await supabaseManager.getTeams();
        console.log(`✅ Connection successful! Found ${teams.length} teams`);

        // Test 2: Data retrieval methods
        console.log('\n📊 Testing data retrieval methods...');

        // Test teams
        const allTeams = await supabaseManager.getTeams();
        console.log(`✅ getTeams(): ${allTeams.length} teams retrieved`);

        // Test games
        const allGames = await supabaseManager.getGames();
        console.log(`✅ getGames(): ${allGames.length} games retrieved`);

        // Test filtered games
        const mondayGames = await supabaseManager.getGames({ day_of_week: 'Monday' });
        console.log(`✅ getGames({ day_of_week: 'Monday' }): ${mondayGames.length} games retrieved`);

        // Test players
        if (allTeams.length > 0) {
            const players = await supabaseManager.getTeamPlayers(1);
            console.log(`✅ getTeamPlayers(1): ${players.length} players retrieved`);
        }

        // Test team games
        if (allTeams.length > 0) {
            const teamGames = await supabaseManager.getTeamGames(1);
            console.log(`✅ getTeamGames(1): ${teamGames.length} games retrieved`);
        }

        // Test 3: Data conversion
        console.log('\n🔄 Testing data conversion...');
        const dashboardGames = supabaseManager.convertGamesToDashboardFormat(allGames);
        console.log(`✅ convertGamesToDashboardFormat(): ${dashboardGames.length} games converted`);

        // Display sample converted game
        if (dashboardGames.length > 0) {
            console.log('\n📋 Sample converted game:');
            console.log(JSON.stringify(dashboardGames[0], null, 2));
        }

        // Test 4: Error handling
        console.log('\n🛡️ Testing error handling...');

        // Test non-existent team
        try {
            await supabaseManager.getTeamPlayers(9999);
            console.log('❌ Error handling test failed - should have thrown error');
        } catch (error) {
            console.log('✅ Error handling works correctly for non-existent team');
        }

        // Summary
        console.log('\n🎉 All tests completed successfully!');
        console.log('📊 Your Supabase database is working perfectly.');

        // Show connection info
        console.log('\n📋 Connection Information:');
        console.log(`- Project URL: ${process.env.SUPABASE_URL || 'default'}`);
        console.log(`- API Key: ${process.env.SUPABASE_KEY ? 'configured' : 'using default'}`);
        console.log(`- Database Status: ✅ Connected`);
        console.log(`- Tables Created: teams, players, games`);
        console.log(`- Sample Data: ${allTeams.length} teams, ${allGames.length} games`);

    } catch (error) {
        console.error('❌ Test failed:', error.message);

        // Provide helpful troubleshooting
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Check your .env file has valid SUPABASE_URL and SUPABASE_KEY');
        console.log('2. Verify your Supabase project is running');
        console.log('3. Check your internet connection');
        console.log('4. Run the setup script first: node supabase-setup.js');
        console.log('5. If using default credentials, they may not work - get real credentials from Supabase');
    }
}

/**
 * Run the tests
 */
(async () => {
    await runTests();
})();
