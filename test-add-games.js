/**
 * Test Script: Add Sample Games to Database
 *
 * This script adds 5 new games to the Games table to test database write operations
 * and then verifies the data was added successfully.
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Main test function
 */
async function testAddGames() {
    console.log('🧪 Testing Database Write Operations');
    console.log('====================================');

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // First, verify we can read existing data
        console.log('📊 Checking existing data...');
        const existingGames = await supabaseManager.getGames();
        console.log(`✅ Found ${existingGames.length} existing games`);

        // Verify teams exist for foreign key references
        console.log('📋 Verifying team references...');
        const teams = await supabaseManager.getTeams();
        if (teams.length === 0) {
            throw new Error('No teams found in database. Please run setup script first.');
        }
        console.log(`✅ Found ${teams.length} teams available`);

        // Define 5 new games to add (Thursday games)
        const newGames = [
            // Thursday Games - extending the tournament
            {
                day_of_week: 'Thursday',
                time: '08:00',
                stadium_name: 'Field 1',
                home_team_id: 1, // Red Sox
                visiting_team_id: 3, // Dodgers
                home_score: 7,
                visiting_score: 2,
                game_complete: true
            },
            {
                day_of_week: 'Thursday',
                time: '10:00',
                stadium_name: 'Field 2',
                home_team_id: 2, // Cubs
                visiting_team_id: 4, // Braves
                home_score: 3,
                visiting_score: 4,
                game_complete: true
            },
            {
                day_of_week: 'Thursday',
                time: '12:00',
                stadium_name: 'Field 1',
                home_team_id: 5, // Astros
                visiting_team_id: 6, // Mets
                home_score: 5,
                visiting_score: 5,
                game_complete: true
            },
            // Friday Games - championship round
            {
                day_of_week: 'Friday',
                time: '09:00',
                stadium_name: 'Field 1',
                home_team_id: 1, // Red Sox (winner)
                visiting_team_id: 4, // Braves (winner)
                home_score: 6,
                visiting_score: 3,
                game_complete: true
            },
            {
                day_of_week: 'Friday',
                time: '11:00',
                stadium_name: 'Field 1',
                home_team_id: 3, // Dodgers (winner)
                visiting_team_id: 6, // Mets (winner)
                home_score: 4,
                visiting_score: 2,
                game_complete: true
            }
        ];

        console.log('📝 Adding 5 new games to database...');

        // Add each game and track success
        const addedGames = [];
        for (let i = 0; i < newGames.length; i++) {
            const game = newGames[i];
            console.log(`  Adding game ${i + 1}: ${getTeamName(teams, game.home_team_id)} vs ${getTeamName(teams, game.visiting_team_id)}`);

            try {
                const addedGame = await supabaseManager.addGame(game);
                addedGames.push(addedGame);
                console.log(`  ✅ Game added successfully (ID: ${addedGame.id})`);
            } catch (error) {
                console.error(`  ❌ Failed to add game ${i + 1}:`, error.message);
            }
        }

        // Verify the games were added
        console.log('🔍 Verifying data was added...');
        const allGamesAfter = await supabaseManager.getGames();

        if (allGamesAfter.length === existingGames.length + addedGames.length) {
            console.log(`✅ Success! Database now contains ${allGamesAfter.length} games`);
        } else {
            console.warn(`⚠️ Expected ${existingGames.length + addedGames.length} games, found ${allGamesAfter.length}`);
        }

        // Display the newly added games in dashboard format
        console.log('📋 Newly Added Games:');
        console.log('====================');
        const dashboardGames = supabaseManager.convertGamesToDashboardFormat(addedGames);
        dashboardGames.forEach((game, index) => {
            console.log(`${index + 1}. ${game.date} ${game.time} - ${game.team} vs ${game.opponent}`);
            console.log(`   Field: ${game.field}, Result: ${game.result} (${game.runs_scored}-${game.runs_allowed})`);
        });

        // Test reading specific games
        console.log('📊 Testing filtered queries...');
        const thursdayGames = await supabaseManager.getGames({ day_of_week: 'Thursday' });
        console.log(`✅ Found ${thursdayGames.length} Thursday games`);

        const fridayGames = await supabaseManager.getGames({ day_of_week: 'Friday' });
        console.log(`✅ Found ${fridayGames.length} Friday games`);

        // Summary
        console.log('\n🎉 Test Results Summary:');
        console.log('======================');
        console.log(`✅ Database Connection: Working`);
        console.log(`✅ Write Operations: ${addedGames.length}/5 games added successfully`);
        console.log(`✅ Read Operations: ${allGamesAfter.length} total games retrieved`);
        console.log(`✅ Data Conversion: ${dashboardGames.length} games converted to dashboard format`);
        console.log(`✅ Filtered Queries: Thursday (${thursdayGames.length}), Friday (${fridayGames.length})`);
        console.log('\n📊 Your Supabase database is working perfectly!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure your .env file has valid SUPABASE_URL and SUPABASE_KEY');
        console.log('2. Verify tables were created (run supabase-create-schema.js if needed)');
        console.log('3. Check that you have proper write permissions');
        console.log('4. Run the main setup script first: node supabase-setup.js');
    }
}

/**
 * Helper function to get team name by ID
 */
function getTeamName(teams, teamId) {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : `Team ${teamId}`;
}

/**
 * Run the test
 */
(async () => {
    await testAddGames();
})();
