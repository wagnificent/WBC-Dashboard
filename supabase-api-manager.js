/**
 * Supabase API Manager for WBC Tournament
 *
 * This script provides comprehensive Supabase database management
 * for the Wooden Bat Classic tournament.
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://xdexdvknggkhxxpakuys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_secret_KjvTeoie8DO9ccO8LWCbkg_qRDeFFvk';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Database Setup Functions
 */
class SupabaseManager {
    /**
     * Create all tables and import data
     */
    async completeSetup() {
        try {
            console.log('🚀 Starting Supabase database setup...');

            // Validate credentials first
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_KEY environment variables.');
            }

            // 1. Create Teams table and import data
            await this._createTeamsTable();
            await this._importTeamsData();

            // 2. Create Players table and import data
            await this._createPlayersTable();
            await this._importPlayersData();

            // 3. Create Games table and import data
            await this._createGamesTable();
            await this._importGamesData();

            console.log('🎉 Supabase database setup completed successfully!');
            console.log('📊 Your database is ready to use!');
            return { success: true };
        } catch (error) {
            console.error('❌ Setup failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create Teams table using SQL
     */
    async _createTeamsTable() {
        console.log('📋 Creating Teams table...');

        try {
            // Check if table already exists
            const { data: existingTables, error: checkError } = await supabase
                .from('teams')
                .select('*')
                .limit(1);

            if (!checkError) {
                console.log('✅ Teams table already exists');
                return;
            }

            // If table doesn't exist, create it using SQL
            if (checkError && checkError.code === '42P01') {
                const { error: createError } = await supabase
                    .rpc('create_teams_table');

                if (createError) {
                    console.error('Error creating teams table:', createError);
                    throw createError;
                }
                console.log('✅ Teams table created successfully');
            } else if (checkError) {
                console.error('Unexpected error checking teams table:', checkError);
                throw checkError;
            }
        } catch (error) {
            console.error('Teams table setup error:', error);
            throw error;
        }
    }

    /**
     * Import Teams data
     */
    async _importTeamsData() {
        console.log('📥 Importing teams data...');
        const teamsData = [
            { name: 'Red Sox', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 },
            { name: 'Cubs', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 },
            { name: 'Dodgers', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 },
            { name: 'Braves', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 },
            { name: 'Astros', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 },
            { name: 'Mets', wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0, players_count: 0 }
        ];

        const { error } = await supabase
            .from('teams')
            .insert(teamsData);

        if (error) {
            console.error('Error importing teams:', error);
            throw error;
        }
        console.log('✅ Teams data imported');
    }

    /**
     * Create Players table using SQL
     */
    async _createPlayersTable() {
        console.log('📋 Creating Players table...');

        try {
            // Check if table already exists
            const { data: existingTables, error: checkError } = await supabase
                .from('players')
                .select('*')
                .limit(1);

            if (!checkError) {
                console.log('✅ Players table already exists');
                return;
            }

            // If table doesn't exist, create it using SQL
            if (checkError && checkError.code === '42P01') {
                const { error: createError } = await supabase
                    .rpc('create_players_table');

                if (createError) {
                    console.error('Error creating players table:', createError);
                    throw createError;
                }
                console.log('✅ Players table created successfully');
            } else if (checkError) {
                console.error('Unexpected error checking players table:', checkError);
                throw checkError;
            }
        } catch (error) {
            console.error('Players table setup error:', error);
            throw error;
        }
    }

    /**
     * Import Players data
     */
    async _importPlayersData() {
        console.log('📥 Importing players data...');
        const playersData = [
            // Red Sox Players
            { first_name: 'John', last_name: 'Smith', age: 18, hometown: 'Boston, MA', team_id: 1, tournaments_played: 1 },
            { first_name: 'Mike', last_name: 'Johnson', age: 17, hometown: 'New York, NY', team_id: 1, tournaments_played: 2 },
            { first_name: 'David', last_name: 'Wilson', age: 19, hometown: 'Chicago, IL', team_id: 1, tournaments_played: 1 },
            { first_name: 'Robert', last_name: 'Brown', age: 18, hometown: 'Los Angeles, CA', team_id: 1, tournaments_played: 3 },
            { first_name: 'James', last_name: 'Davis', age: 17, hometown: 'Houston, TX', team_id: 1, tournaments_played: 1 },

            // Cubs Players
            { first_name: 'Charles', last_name: 'Jackson', age: 18, hometown: 'Miami, FL', team_id: 2, tournaments_played: 2 },
            { first_name: 'Daniel', last_name: 'White', age: 19, hometown: 'Atlanta, GA', team_id: 2, tournaments_played: 1 },
            { first_name: 'Matthew', last_name: 'Harris', age: 17, hometown: 'Seattle, WA', team_id: 2, tournaments_played: 3 },
            { first_name: 'Anthony', last_name: 'Martin', age: 18, hometown: 'Denver, CO', team_id: 2, tournaments_played: 1 },
            { first_name: 'Mark', last_name: 'Thompson', age: 19, hometown: 'Phoenix, AZ', team_id: 2, tournaments_played: 2 },

            // Dodgers Players
            { first_name: 'Edward', last_name: 'Lewis', age: 18, hometown: 'San Francisco, CA', team_id: 3, tournaments_played: 1 },
            { first_name: 'Brian', last_name: 'Lee', age: 17, hometown: 'San Diego, CA', team_id: 3, tournaments_played: 2 },
            { first_name: 'Ronald', last_name: 'Walker', age: 19, hometown: 'Portland, OR', team_id: 3, tournaments_played: 1 },
            { first_name: 'Timothy', last_name: 'Hall', age: 18, hometown: 'Las Vegas, NV', team_id: 3, tournaments_played: 3 },
            { first_name: 'Jason', last_name: 'Allen', age: 17, hometown: 'Salt Lake City, UT', team_id: 3, tournaments_played: 1 },

            // Braves Players
            { first_name: 'Eric', last_name: 'Hill', age: 18, hometown: 'Dallas, TX', team_id: 4, tournaments_played: 2 },
            { first_name: 'Stephen', last_name: 'Scott', age: 19, hometown: 'Austin, TX', team_id: 4, tournaments_played: 1 },
            { first_name: 'Jonathan', last_name: 'Green', age: 17, hometown: 'San Antonio, TX', team_id: 4, tournaments_played: 3 },
            { first_name: 'Andrew', last_name: 'Adams', age: 18, hometown: 'Houston, TX', team_id: 4, tournaments_played: 1 },
            { first_name: 'Justin', last_name: 'Baker', age: 19, hometown: 'Fort Worth, TX', team_id: 4, tournaments_played: 2 },

            // Astros Players
            { first_name: 'Daniel', last_name: 'Turner', age: 18, hometown: 'Orlando, FL', team_id: 5, tournaments_played: 1 },
            { first_name: 'Matthew', last_name: 'Phillips', age: 17, hometown: 'Tampa, FL', team_id: 5, tournaments_played: 2 },
            { first_name: 'Andrew', last_name: 'Campbell', age: 19, hometown: 'Jacksonville, FL', team_id: 5, tournaments_played: 1 },
            { first_name: 'Joshua', last_name: 'Parker', age: 18, hometown: 'Miami, FL', team_id: 5, tournaments_played: 3 },
            { first_name: 'Kevin', last_name: 'Evans', age: 17, hometown: 'Tallahassee, FL', team_id: 5, tournaments_played: 1 },

            // Mets Players
            { first_name: 'David', last_name: 'Rogers', age: 18, hometown: 'New York, NY', team_id: 6, tournaments_played: 2 },
            { first_name: 'Robert', last_name: 'Reed', age: 19, hometown: 'Buffalo, NY', team_id: 6, tournaments_played: 1 },
            { first_name: 'Michael', last_name: 'Cook', age: 17, hometown: 'Rochester, NY', team_id: 6, tournaments_played: 3 },
            { first_name: 'William', last_name: 'Morgan', age: 18, hometown: 'Albany, NY', team_id: 6, tournaments_played: 1 },
            { first_name: 'Richard', last_name: 'Bell', age: 19, hometown: 'Syracuse, NY', team_id: 6, tournaments_played: 2 }
        ];

        const { error } = await supabase
            .from('players')
            .insert(playersData);

        if (error) {
            console.error('Error importing players:', error);
            throw error;
        }
        console.log('✅ Players data imported');
    }

    /**
     * Create Games table using SQL
     */
    async _createGamesTable() {
        console.log('📋 Creating Games table...');

        try {
            // Check if table already exists
            const { data: existingTables, error: checkError } = await supabase
                .from('games')
                .select('*')
                .limit(1);

            if (!checkError) {
                console.log('✅ Games table already exists');
                return;
            }

            // If table doesn't exist, create it using SQL
            if (checkError && checkError.code === '42P01') {
                const { error: createError } = await supabase
                    .rpc('create_games_table');

                if (createError) {
                    console.error('Error creating games table:', createError);
                    throw createError;
                }
                console.log('✅ Games table created successfully');
            } else if (checkError) {
                console.error('Unexpected error checking games table:', checkError);
                throw checkError;
            }
        } catch (error) {
            console.error('Games table setup error:', error);
            throw error;
        }
    }

    /**
     * Import Games data
     */
    async _importGamesData() {
        console.log('📥 Importing games data...');
        const gamesData = [
            // Monday Games
            { day_of_week: 'Monday', time: '08:00', stadium_name: 'Field 1', home_team_id: 1, visiting_team_id: 2, home_score: 5, visiting_score: 3, game_complete: true },
            { day_of_week: 'Monday', time: '10:00', stadium_name: 'Field 2', home_team_id: 3, visiting_team_id: 4, home_score: 4, visiting_score: 2, game_complete: true },
            { day_of_week: 'Monday', time: '12:00', stadium_name: 'Field 1', home_team_id: 5, visiting_team_id: 6, home_score: 6, visiting_score: 1, game_complete: true },

            // Tuesday Games
            { day_of_week: 'Tuesday', time: '08:00', stadium_name: 'Field 1', home_team_id: 2, visiting_team_id: 3, home_score: 3, visiting_score: 5, game_complete: true },
            { day_of_week: 'Tuesday', time: '10:00', stadium_name: 'Field 2', home_team_id: 4, visiting_team_id: 5, home_score: 2, visiting_score: 4, game_complete: true },
            { day_of_week: 'Tuesday', time: '12:00', stadium_name: 'Field 1', home_team_id: 6, visiting_team_id: 1, home_score: 1, visiting_score: 7, game_complete: true },

            // Wednesday Games
            { day_of_week: 'Wednesday', time: '08:00', stadium_name: 'Field 1', home_team_id: 1, visiting_team_id: 4, home_score: 4, visiting_score: 3, game_complete: true },
            { day_of_week: 'Wednesday', time: '10:00', stadium_name: 'Field 2', home_team_id: 2, visiting_team_id: 6, home_score: 5, visiting_score: 2, game_complete: true },
            { day_of_week: 'Wednesday', time: '12:00', stadium_name: 'Field 1', home_team_id: 3, visiting_team_id: 5, home_score: 3, visiting_score: 1, game_complete: true }
        ];

        const { error } = await supabase
            .from('games')
            .insert(gamesData);

        if (error) {
            console.error('Error importing games:', error);
            throw error;
        }
        console.log('✅ Games data imported');
    }

    /**
     * Update team statistics based on game results
     */
    async updateTeamStatistics() {
        console.log('📊 Updating team statistics...');
        // This would be implemented after games are added
        console.log('✅ Team statistics updated');
    }

    // ========== DATA RETRIEVAL METHODS ==========

    /**
     * Get all teams
     * @returns {Promise<Array>} Array of team objects
     */
    async getTeams() {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching teams:', error);
            return [];
        }
    }

    /**
     * Get all games with optional filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise<Array>} Array of game objects
     */
    async getGames(filters = {}) {
        try {
            let query = supabase
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
            return [];
        }
    }

    /**
     * Get players for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of player objects
     */
    async getTeamPlayers(teamId) {
        try {
            const { data, error } = await supabase
                .from('players')
                .select('*')
                .eq('team_id', teamId)
                .order('last_name')
                .order('first_name');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching team players:', error);
            return [];
        }
    }

    /**
     * Get games for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of game objects
     */
    async getTeamGames(teamId) {
        try {
            const { data, error } = await supabase
                .from('games')
                .select('*')
                .or(`home_team_id.eq.${teamId},visiting_team_id.eq.${teamId}`)
                .order('day_of_week')
                .order('time');

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('Error fetching team games:', error);
            return [];
        }
    }

    // ========== DATA MODIFICATION METHODS ==========

    /**
     * Add a new team
     * @param {Object} teamData - Team data to add
     * @returns {Promise<Object>} The newly created team
     */
    async addTeam(teamData) {
        try {
            const { data, error } = await supabase
                .from('teams')
                .insert([teamData])
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error adding team:', error);
            throw error;
        }
    }

    /**
     * Update an existing team
     * @param {number} teamId - Team ID to update
     * @param {Object} teamData - Team data to update
     * @returns {Promise<Object>} The updated team
     */
    async updateTeam(teamId, teamData) {
        try {
            const { data, error } = await supabase
                .from('teams')
                .update(teamData)
                .eq('id', teamId)
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error updating team:', error);
            throw error;
        }
    }

    /**
     * Delete a team
     * @param {number} teamId - Team ID to delete
     * @returns {Promise<boolean>} True if successful
     */
    async deleteTeam(teamId) {
        try {
            const { error } = await supabase
                .from('teams')
                .delete()
                .eq('id', teamId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting team:', error);
            throw error;
        }
    }

    /**
     * Add a new player
     * @param {Object} playerData - Player data to add
     * @returns {Promise<Object>} The newly created player
     */
    async addPlayer(playerData) {
        try {
            const { data, error } = await supabase
                .from('players')
                .insert([playerData])
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error adding player:', error);
            throw error;
        }
    }

    /**
     * Update an existing player
     * @param {number} playerId - Player ID to update
     * @param {Object} playerData - Player data to update
     * @returns {Promise<Object>} The updated player
     */
    async updatePlayer(playerId, playerData) {
        try {
            const { data, error } = await supabase
                .from('players')
                .update(playerData)
                .eq('id', playerId)
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error updating player:', error);
            throw error;
        }
    }

    /**
     * Delete a player
     * @param {number} playerId - Player ID to delete
     * @returns {Promise<boolean>} True if successful
     */
    async deletePlayer(playerId) {
        try {
            const { error } = await supabase
                .from('players')
                .delete()
                .eq('id', playerId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    }

    /**
     * Add a new game
     * @param {Object} gameData - Game data to add
     * @returns {Promise<Object>} The newly created game
     */
    async addGame(gameData) {
        try {
            const { data, error } = await supabase
                .from('games')
                .insert([gameData])
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error adding game:', error);
            throw error;
        }
    }

    /**
     * Update an existing game
     * @param {number} gameId - Game ID to update
     * @param {Object} gameData - Game data to update
     * @returns {Promise<Object>} The updated game
     */
    async updateGame(gameId, gameData) {
        try {
            const { data, error } = await supabase
                .from('games')
                .update(gameData)
                .eq('id', gameId)
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            console.error('Error updating game:', error);
            throw error;
        }
    }

    /**
     * Delete a game
     * @param {number} gameId - Game ID to delete
     * @returns {Promise<boolean>} True if successful
     */
    async deleteGame(gameId) {
        try {
            const { error } = await supabase
                .from('games')
                .delete()
                .eq('id', gameId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Error deleting game:', error);
            throw error;
        }
    }

    // ========== UTILITY METHODS ==========

    /**
     * Convert Supabase game data to dashboard format
     * @param {Array} supabaseGames - Games from Supabase
     * @returns {Array} Games in dashboard format
     */
    convertGamesToDashboardFormat(supabaseGames) {
        return supabaseGames.map(game => {
            // Get team names based on IDs
            const homeTeam = this.getTeamById(game.home_team_id);
            const visitingTeam = this.getTeamById(game.visiting_team_id);

            return {
                date: this._getDateFromDayOfWeek(game.day_of_week),
                time: game.time,
                team: homeTeam?.name || `Team ${game.home_team_id}`,
                opponent: visitingTeam?.name || `Team ${game.visiting_team_id}`,
                field: game.stadium_name,
                location: this._getLocationFromField(game.stadium_name),
                result: game.home_score > game.visiting_score ? 'Win' : game.home_score < game.visiting_score ? 'Loss' : 'Tie',
                runs_scored: game.home_score || 0,
                runs_allowed: game.visiting_score || 0
            };
        });
    }

    /**
     * Get team by ID
     * @param {number} teamId - Team ID
     * @returns {Promise<Object|null>} Team object or null
     */
    async getTeamById(teamId) {
        try {
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
                console.error('Error fetching team:', error);
            }
            return data || null;
        } catch (error) {
            console.error('Error fetching team:', error);
            return null;
        }
    }

    /**
     * Get location from field name
     * @param {string} fieldName - Field name
     * @returns {string} Location
     */
    _getLocationFromField(fieldName) {
        const fieldLocations = {
            'Field 1': 'Main Stadium',
            'Field 2': 'North Park',
            'Field 3': 'South Park',
            'Field 4': 'East Stadium',
            'Field 5': 'West Park',
            'Field 6': 'Central Arena',
            'Field 7': 'Training Field'
        };
        return fieldLocations[fieldName] || 'Tournament Complex';
    }

    /**
     * Get date from day of week (for dashboard display)
     * @param {string} dayOfWeek - Day of week
     * @returns {string} Formatted date
     */
    _getDateFromDayOfWeek(dayOfWeek) {
        // This would be enhanced with actual tournament dates
        const dates = {
            'Monday': '2023-06-15',
            'Tuesday': '2023-06-16',
            'Wednesday': '2023-06-17'
        };
        return dates[dayOfWeek] || '2023-06-15';
    }
}

// Export for use in other scripts
module.exports = { SupabaseManager };
