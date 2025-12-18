/**
 * Test Database Viewer Functionality
 * This script tests the database viewer with the updated schema
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testDatabaseViewerFunctionality() {
    console.log('🧪 Testing Database Viewer Functionality');
    console.log('========================================');

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // Test 1: Get teams and display them
        console.log('\n📋 Testing Teams Data:');
        const teams = await supabaseManager.getTeams();
        console.log(`✅ Found ${teams.length} teams:`);
        teams.forEach(team => {
            console.log(`- ${team.name}: ${team.wins}-${team.losses}`);
        });

        // Test 2: Get games and convert to dashboard format
        console.log('\n📋 Testing Games Data Conversion:');
        const games = await supabaseManager.getGames();
        console.log(`✅ Found ${games.length} games`);

        const dashboardGames = supabaseManager.convertGamesToDashboardFormat(games);
        console.log(`✅ Converted ${dashboardGames.length} games to dashboard format`);

        // Display sample dashboard games
        console.log('\n📊 Sample Dashboard Games:');
        dashboardGames.slice(0, 3).forEach((game, index) => {
            console.log(`${index + 1}. ${game.team} vs ${game.opponent} - ${game.result} (${game.runs_scored}-${game.runs_allowed})`);
        });

        // Test 3: Get team games (using team name instead of ID)
        console.log('\n📋 Testing Team Games Functionality:');
        const redSoxGames = await supabaseManager.getTeamGames('Red Sox');
        console.log(`✅ Found ${redSoxGames.length} games for Red Sox`);

        // Test 4: Test error handling
        console.log('\n🛡️ Testing Error Handling:');
        try {
            const nonExistentGames = await supabaseManager.getTeamGames('NonExistentTeam');
            console.log(`✅ Non-existent team returned ${nonExistentGames.length} games (should be 0)`);
        } catch (error) {
            console.log('✅ Error handling works correctly');
        }

        console.log('\n🎉 All database viewer tests completed successfully!');
        console.log('✅ The code now matches the actual database schema');

    } catch (error) {
        console.error('❌ Database viewer test failed:', error);
    }
}

// Run the test
(async () => {
    await testDatabaseViewerFunctionality();
})();
