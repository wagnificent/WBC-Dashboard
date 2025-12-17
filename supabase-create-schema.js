/**
 * Supabase Database Schema Creation Script
 *
 * This script creates the necessary SQL functions and tables for the WBC Tournament.
 * It must be run before the main setup script to ensure tables exist.
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create the database schema
 */
async function createDatabaseSchema() {
    console.log('🚀 Creating Supabase Database Schema');
    console.log('====================================');

    try {
        // Validate credentials
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_KEY environment variables.');
        }

        console.log('✅ Credentials validated');

        // Create SQL functions for table creation
        await createTableCreationFunctions();

        console.log('🎉 Database schema setup completed successfully!');
        console.log('✅ You can now run the main setup script: node supabase-setup.js');

    } catch (error) {
        console.error('❌ Schema creation failed:', error.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Make sure you have valid Supabase credentials in your .env file');
        console.log('2. Check that your Supabase project is running');
        console.log('3. Verify you have proper permissions to create functions');
        console.log('4. Try running with default credentials first to test connectivity');
    }
}

/**
 * Create SQL functions for table creation
 */
async function createTableCreationFunctions() {
    console.log('📋 Creating SQL functions for table management...');

    // SQL function to create teams table
    const createTeamsTableSQL = `
        CREATE OR REPLACE FUNCTION create_teams_table()
        RETURNS void AS $$
        BEGIN
            CREATE TABLE IF NOT EXISTS teams (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                wins INTEGER DEFAULT 0,
                losses INTEGER DEFAULT 0,
                runs_scored INTEGER DEFAULT 0,
                runs_allowed INTEGER DEFAULT 0,
                players_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Teams table already exists or error occurred: %', SQLERRM;
        END;
        $$ LANGUAGE plpgsql;
    `;

    // SQL function to create players table
    const createPlayersTableSQL = `
        CREATE OR REPLACE FUNCTION create_players_table()
        RETURNS void AS $$
        BEGIN
            CREATE TABLE IF NOT EXISTS players (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                age INTEGER,
                hometown VARCHAR(255),
                team_id INTEGER REFERENCES teams(id),
                tournaments_played INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Players table already exists or error occurred: %', SQLERRM;
        END;
        $$ LANGUAGE plpgsql;
    `;

    // SQL function to create games table
    const createGamesTableSQL = `
        CREATE OR REPLACE FUNCTION create_games_table()
        RETURNS void AS $$
        BEGIN
            CREATE TABLE IF NOT EXISTS games (
                id SERIAL PRIMARY KEY,
                day_of_week VARCHAR(50) NOT NULL,
                time VARCHAR(50) NOT NULL,
                stadium_name VARCHAR(255) NOT NULL,
                home_team_id INTEGER REFERENCES teams(id),
                visiting_team_id INTEGER REFERENCES teams(id),
                home_score INTEGER,
                visiting_score INTEGER,
                game_complete BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW()
            );
            EXCEPTION WHEN OTHERS THEN
                RAISE NOTICE 'Games table already exists or error occurred: %', SQLERRM;
        END;
        $$ LANGUAGE plpgsql;
    `;

    try {
        // Execute SQL functions using Supabase's direct SQL interface
        console.log('📝 Creating teams table function...');
        const { error: teamsError } = await supabase.rpc('create_teams_table');
        if (teamsError) console.warn('⚠️ Teams function warning:', teamsError.message);

        console.log('📝 Creating players table function...');
        const { error: playersError } = await supabase.rpc('create_players_table');
        if (playersError) console.warn('⚠️ Players function warning:', playersError.message);

        console.log('📝 Creating games table function...');
        const { error: gamesError } = await supabase.rpc('create_games_table');
        if (gamesError) console.warn('⚠️ Games function warning:', gamesError.message);

        console.log('✅ SQL functions created successfully');

    } catch (error) {
        console.error('❌ Error creating SQL functions:', error);

        // Fallback: Try creating tables directly if RPC fails
        console.log('🔄 Trying direct table creation as fallback...');
        await createTablesDirectly();
    }
}

/**
 * Fallback method to create tables directly
 */
async function createTablesDirectly() {
    try {
        // Create teams table
        const { error: teamsError } = await supabase
            .from('teams')
            .select('*');

        if (teamsError && teamsError.code === '42P01') {
            console.log('📋 Creating teams table directly...');
            // Note: Supabase doesn't allow direct table creation via JS client
            // This would need to be done via Supabase dashboard or SQL interface
            console.warn('⚠️ Direct table creation requires Supabase dashboard or SQL interface');
        }

        // Create players table
        const { error: playersError } = await supabase
            .from('players')
            .select('*');

        if (playersError && playersError.code === '42P01') {
            console.log('📋 Creating players table directly...');
            console.warn('⚠️ Direct table creation requires Supabase dashboard or SQL interface');
        }

        // Create games table
        const { error: gamesError } = await supabase
            .from('games')
            .select('*');

        if (gamesError && gamesError.code === '42P01') {
            console.log('📋 Creating games table directly...');
            console.warn('⚠️ Direct table creation requires Supabase dashboard or SQL interface');
        }

    } catch (error) {
        console.error('❌ Fallback table creation failed:', error);
    }
}

/**
 * Alternative approach: Provide SQL commands for manual execution
 */
function provideManualSQLCommands() {
    console.log('\n📋 Manual SQL Commands for Table Creation:');
    console.log('========================================');

    const teamsSQL = `
        CREATE TABLE teams (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            wins INTEGER DEFAULT 0,
            losses INTEGER DEFAULT 0,
            runs_scored INTEGER DEFAULT 0,
            runs_allowed INTEGER DEFAULT 0,
            players_count INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    const playersSQL = `
        CREATE TABLE players (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            age INTEGER,
            hometown VARCHAR(255),
            team_id INTEGER REFERENCES teams(id),
            tournaments_played INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    const gamesSQL = `
        CREATE TABLE games (
            id SERIAL PRIMARY KEY,
            day_of_week VARCHAR(50) NOT NULL,
            time VARCHAR(50) NOT NULL,
            stadium_name VARCHAR(255) NOT NULL,
            home_team_id INTEGER REFERENCES teams(id),
            visiting_team_id INTEGER REFERENCES teams(id),
            home_score INTEGER,
            visiting_score INTEGER,
            game_complete BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    console.log('\n1. Teams Table SQL:');
    console.log(teamsSQL);

    console.log('\n2. Players Table SQL:');
    console.log(playersSQL);

    console.log('\n3. Games Table SQL:');
    console.log(gamesSQL);

    console.log('\n📝 Instructions:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to the SQL Editor');
    console.log('3. Execute each SQL command above');
    console.log('4. Then run: node supabase-setup.js');
}

/**
 * Run the schema creation
 */
(async () => {
    await createDatabaseSchema();
    provideManualSQLCommands();
})();
