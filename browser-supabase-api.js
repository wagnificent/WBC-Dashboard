/**
 * Browser-compatible Supabase API for WBC Tournament
 *
 * This script provides Supabase database access for browser environments
 * using the Supabase JavaScript client directly.
 */

// This will be initialized when the Supabase client is loaded
let supabaseClient = null;
let supabaseInitialized = false;

/**
 * Initialize the Supabase client for browser use
 */
function initSupabase() {
    // If already initialized, return
    if (supabaseInitialized) {
        return;
    }

    // Check if Supabase is already loaded and available
    if (window.supabase && window.supabase.createClient) {
        // Create the Supabase client with PUBLIC credentials (safe for browser use)
        const supabaseUrl = 'https://xdexdvknggkhxxpakuys.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZXhkdmtuZ2draHh4cGFrdXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTUxODIsImV4cCI6MjA4MTU3MTE4Mn0.3IVzuCSTJCQH9cPNoYq1nzh4q92CXa8BlWKHZtc4dnA';

        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        supabaseInitialized = true;
        return;
    }

    // If Supabase is not loaded yet, wait for it
    console.log('Waiting for Supabase to load...');
    const checkSupabase = setInterval(() => {
        if (window.supabase && window.supabase.createClient) {
            clearInterval(checkSupabase);

            // Create the Supabase client with PUBLIC credentials (safe for browser use)
            const supabaseUrl = 'https://xdexdvknggkhxxpakuys.supabase.co';
            const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZXhkdmtuZ2draHh4cGFrdXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTUxODIsImV4cCI6MjA4MTU3MTE4Mn0.3IVzuCSTJCQH9cPNoYq1nzh4q92CXa8BlWKHZtc4dnA';

            supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
            supabaseInitialized = true;
            console.log('Supabase initialized successfully with public key');
        }
    }, 100);
}

/**
 * Browser-compatible Supabase Manager
 */
class BrowserSupabaseManager {
    constructor() {
        // Initialize Supabase client
        initSupabase();
    }

    /**
     * Get all teams
     * @returns {Promise<Array>} Array of team objects
     */
    async getTeams() {
        try {
            const { data, error } = await supabaseClient
                .from('teams')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching teams:', error);
            throw error;
        }
    }

    /**
     * Get all players
     * @returns {Promise<Array>} Array of player objects
     */
    async getAllPlayers() {
        try {
            const { data, error } = await supabaseClient
                .from('players')
                .select('*')
                .order('last_name')
                .order('first_name');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    }

    /**
     * Get all games with optional filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise<Array>} Array of game objects
     */
    async getGames(filters = {}) {
        try {
            let query = supabaseClient
                .from('games')
                .select('*');

            // Apply filters
            if (filters.day_of_week) {
                query = query.eq('day_of_week', filters.day_of_week);
            }

            if (filters.team_id) {
                query = query.or(`home_team_id.eq.${filters.team_id},visiting_team_id.eq.${filters.team_id}`);
            }

            if (filters.stadium_name) {
                query = query.eq('stadium_name', filters.stadium_name);
            }

            const { data, error } = await query.order('day_of_week').order('time');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }

    /**
     * Get players for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of player objects
     */
    async getTeamPlayers(teamId) {
        try {
            const { data, error } = await supabaseClient
                .from('players')
                .select('*')
                .eq('team_id', teamId)
                .order('last_name')
                .order('first_name');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching team players:', error);
            throw error;
        }
    }

    /**
     * Get games for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of game objects
     */
    async getTeamGames(teamName) {
        try {
            // Get all games first, then filter by team name (actual schema)
            const { data: allGames, error } = await supabaseClient
                .from('games')
                .select('*')
                .order('day_of_week')
                .order('time');

            if (error) throw error;

            // Filter games where the team is either home or visiting team
            const teamGames = allGames.filter(game =>
                game.home_team_name === teamName || game.visiting_team_name === teamName
            );

            return teamGames || [];
        } catch (error) {
            console.error('Error fetching team games:', error);
            throw error;
        }
    }
}

// Make the class available globally for browser use
window.BrowserSupabaseManager = BrowserSupabaseManager;
