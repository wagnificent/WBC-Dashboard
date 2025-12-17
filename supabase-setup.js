/**
 * Supabase Setup Script for WBC Tournament
 *
 * This script provides a comprehensive setup process for the Supabase database.
 * It validates credentials, creates tables, imports data, and verifies the setup.
 */

const { SupabaseManager } = require('./supabase-api-manager');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * Main setup function
 */
async function setupSupabaseDatabase() {
    console.log('🚀 Starting WBC Tournament Supabase Setup');
    console.log('========================================');

    // Validate environment variables
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
        console.error('❌ Error: Supabase credentials not configured.');
        console.error('Please set SUPABASE_URL and SUPABASE_KEY environment variables.');
        console.error('You can create a .env file from .env.example and fill in your credentials.');
        return;
    }

    console.log('✅ Environment variables loaded successfully');

    try {
        // Initialize Supabase Manager
        const supabaseManager = new SupabaseManager();

        // Run complete setup
        const result = await supabaseManager.completeSetup();

        if (result.success) {
            console.log('🎉 Setup completed successfully!');
            console.log('📊 Your Supabase database is ready to use.');

            // Test data retrieval
            await testDatabaseConnection(supabaseManager);
        } else {
            console.error('❌ Setup failed:', result.error);
        }
    } catch (error) {
        console.error('❌ Unexpected error during setup:', error);
    }
}

/**
 * Test database connection and data retrieval
 */
async function testDatabaseConnection(supabaseManager) {
    console.log('\n🧪 Testing database connection...');

    try {
        // Test teams retrieval
        const teams = await supabaseManager.getTeams();
        console.log(`✅ Teams retrieved: ${teams.length} teams found`);

        // Test games retrieval
        const games = await supabaseManager.getGames();
        console.log(`✅ Games retrieved: ${games.length} games found`);

        // Test players retrieval
        const players = await supabaseManager.getTeamPlayers(1); // Get players for team 1
        console.log(`✅ Players retrieved: ${players.length} players found for team 1`);

        console.log('🎉 All tests passed! Database is working correctly.');
    } catch (error) {
        console.error('❌ Database test failed:', error);
    }
}

/**
 * Display setup instructions
 */
function displaySetupInstructions() {
    console.log('\n📋 Supabase Setup Instructions');
    console.log('=============================');
    console.log('1. Create a Supabase account at https://supabase.com');
    console.log('2. Create a new project named "WBC Tournament"');
    console.log('3. Copy your project URL and API key from Supabase dashboard');
    console.log('4. Create a .env file from .env.example');
    console.log('5. Fill in your SUPABASE_URL and SUPABASE_KEY in the .env file');
    console.log('6. Run this setup script: node supabase-setup.js');
    console.log('7. Your database will be automatically configured!');
}

/**
 * Run the setup
 */
(async () => {
    displaySetupInstructions();
    await setupSupabaseDatabase();
})();
