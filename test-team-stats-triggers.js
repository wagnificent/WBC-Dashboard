/**
 * Test Script for Team Statistics Triggers
 *
 * This script tests the automatic calculation of team statistics
 * using the database triggers we implemented.
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function testTeamStatsTriggers() {
    console.log('🧪 Testing Team Statistics Triggers');
    console.log('===================================');

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // Test 1: Check initial team statistics
        console.log('\n📊 Test 1: Checking initial team statistics...');
        const teamsBefore = await supabaseManager.getTeams();
        console.log('Initial team statistics:');
        teamsBefore.forEach(team => {
            console.log(`${team.name}: ${team.wins}W - ${team.losses}L (Runs: ${team.runs_scored}-${team.runs_allowed})`);
        });

        // Test 2: Add a new game and verify triggers work
        console.log('\n📊 Test 2: Adding a new game to test triggers...');

        // Get the first two teams for the test game
        const team1 = teamsBefore[0];
        const team2 = teamsBefore[1];

        const newGame = {
            day_of_week: 'Thursday',
            time: '14:00',
            stadium_name: 'Field 1',
            home_team_id: team1.id,
            visiting_team_id: team2.id,
            home_score: 7,
            visiting_score: 3,
            game_complete: true
        };

        console.log(`Adding game: ${team1.name} (home) vs ${team2.name} (visiting)`);
        console.log(`Score: ${newGame.home_score}-${newGame.visiting_score}`);

        const addedGame = await supabaseManager.addGame(newGame);
        console.log('✅ Game added successfully');

        // Test 3: Verify team statistics were automatically updated
        console.log('\n📊 Test 3: Verifying automatic statistics update...');

        const teamsAfter = await supabaseManager.getTeams();

        // Find the teams that played in the game
        const homeTeamAfter = teamsAfter.find(t => t.id === team1.id);
        const visitingTeamAfter = teamsAfter.find(t => t.id === team2.id);

        console.log('Team statistics after adding game:');
        console.log(`${homeTeamAfter.name}: ${homeTeamAfter.wins}W - ${homeTeamAfter.losses}L (Runs: ${homeTeamAfter.runs_scored}-${homeTeamAfter.runs_allowed})`);
        console.log(`${visitingTeamAfter.name}: ${visitingTeamAfter.wins}W - ${visitingTeamAfter.losses}L (Runs: ${visitingTeamAfter.runs_scored}-${visitingTeamAfter.runs_allowed})`);

        // Verify the statistics are correct
        const homeTeamWinsCorrect = homeTeamAfter.wins === team1.wins + 1;
        const visitingTeamLossesCorrect = visitingTeamAfter.losses === team2.losses + 1;
        const homeTeamRunsCorrect = homeTeamAfter.runs_scored === team1.runs_scored + 7 && homeTeamAfter.runs_allowed === team1.runs_allowed + 3;
        const visitingTeamRunsCorrect = visitingTeamAfter.runs_scored === team2.runs_scored + 3 && visitingTeamAfter.runs_allowed === team2.runs_allowed + 7;

        console.log('\n📊 Test Results:');
        console.log(`✅ Home team wins incremented: ${homeTeamWinsCorrect}`);
        console.log(`✅ Visiting team losses incremented: ${visitingTeamLossesCorrect}`);
        console.log(`✅ Home team runs updated: ${homeTeamRunsCorrect}`);
        console.log(`✅ Visiting team runs updated: ${visitingTeamRunsCorrect}`);

        if (homeTeamWinsCorrect && visitingTeamLossesCorrect && homeTeamRunsCorrect && visitingTeamRunsCorrect) {
            console.log('\n🎉 All tests passed! Triggers are working correctly.');
        } else {
            console.log('\n❌ Some tests failed. Triggers may not be working properly.');
            console.log('🔧 Troubleshooting suggestions:');
            console.log('1. Make sure the triggers were created successfully');
            console.log('2. Check that you have the latest migration files');
            console.log('3. Verify your Supabase connection is working');
            console.log('4. Try running the setup script again');
        }

        // Test 4: Update the game and verify triggers work on updates
        console.log('\n📊 Test 4: Testing triggers on game updates...');

        const updatedGame = {
            home_score: 5,
            visiting_score: 6,
            game_complete: true
        };

        console.log(`Updating game score to: ${updatedGame.home_score}-${updatedGame.visiting_score}`);

        const updatedGameResult = await supabaseManager.updateGame(addedGame.id, updatedGame);
        console.log('✅ Game updated successfully');

        // Check statistics after update
        const teamsAfterUpdate = await supabaseManager.getTeams();
        const homeTeamAfterUpdate = teamsAfterUpdate.find(t => t.id === team1.id);
        const visitingTeamAfterUpdate = teamsAfterUpdate.find(t => t.id === team2.id);

        console.log('Team statistics after game update:');
        console.log(`${homeTeamAfterUpdate.name}: ${homeTeamAfterUpdate.wins}W - ${homeTeamAfterUpdate.losses}L (Runs: ${homeTeamAfterUpdate.runs_scored}-${homeTeamAfterUpdate.runs_allowed})`);
        console.log(`${visitingTeamAfterUpdate.name}: ${visitingTeamAfterUpdate.wins}W - ${visitingTeamAfterUpdate.losses}L (Runs: ${visitingTeamAfterUpdate.runs_scored}-${visitingTeamAfterUpdate.runs_allowed})`);

        // Verify the updated statistics are correct
        const homeTeamStatsCorrectAfterUpdate = homeTeamAfterUpdate.wins === team1.wins && homeTeamAfterUpdate.losses === team1.losses + 1;
        const visitingTeamStatsCorrectAfterUpdate = visitingTeamAfterUpdate.wins === team2.wins + 1 && visitingTeamAfterUpdate.losses === team2.losses;
        const runsUpdatedCorrectly = homeTeamAfterUpdate.runs_scored === team1.runs_scored + 5 && homeTeamAfterUpdate.runs_allowed === team1.runs_allowed + 6 &&
                                     visitingTeamAfterUpdate.runs_scored === team2.runs_scored + 6 && visitingTeamAfterUpdate.runs_allowed === team2.runs_allowed + 5;

        console.log('\n📊 Update Test Results:');
        console.log(`✅ Home team stats corrected: ${homeTeamStatsCorrectAfterUpdate}`);
        console.log(`✅ Visiting team stats corrected: ${visitingTeamStatsCorrectAfterUpdate}`);
        console.log(`✅ Runs updated correctly: ${runsUpdatedCorrectly}`);

        if (homeTeamStatsCorrectAfterUpdate && visitingTeamStatsCorrectAfterUpdate && runsUpdatedCorrectly) {
            console.log('\n🎉 Update test passed! Triggers work on game updates.');
        } else {
            console.log('\n❌ Update test failed. Triggers may not work on updates.');
            console.log('🔧 Troubleshooting suggestions:');
            console.log('1. Check if the update trigger was created');
            console.log('2. Verify the trigger function has proper update logic');
            console.log('3. Try manually updating a game in the Supabase dashboard');
        }

        console.log('\n🎉 Trigger testing completed!');

        // Provide manual verification instructions
        console.log('\n🔍 Manual Verification Steps:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Check the SQL Editor for any trigger-related functions');
        console.log('3. Verify the triggers exist on the games table');
        console.log('4. Try adding/updating games manually to see if stats change');

    } catch (error) {
        console.error('❌ Error during trigger testing:', error);
        console.log('🔧 Common issues and solutions:');
        console.log('- Connection issues: Check your .env file and Supabase credentials');
        console.log('- Permission issues: Make sure your service role has proper permissions');
        console.log('- Migration issues: Try running the migrations again');
        console.log('- Trigger issues: Check if triggers were created successfully');
    }
}

/**
 * Run the test
 */
(async () => {
    await testTeamStatsTriggers();
})();
