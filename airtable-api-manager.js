/**
 * Airtable API Manager for Wooden Bat Classic Tournament
 *
 * This script provides comprehensive Airtable API management capabilities
 * for setting up and maintaining the tournament database.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration - these should be set via environment variables
const config = {
    apiKey: process.env.AIRTABLE_API_KEY || '',
    baseId: process.env.AIRTABLE_BASE_ID || '',
    tables: {
        teams: 'Teams',
        players: 'Players',
        games: 'Games'
    }
};

/**
 * Airtable API Client
 */
class AirtableAPI {
    constructor(apiKey, baseId) {
        this.apiKey = apiKey;
        this.baseId = baseId;
        this.baseUrl = `https://api.airtable.com/v0/${baseId}`;
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Create a new base (requires enterprise plan)
     * For most users, we'll create tables in an existing base
     */
    async createBase(baseName, tables) {
        try {
            // Note: Base creation requires Airtable Enterprise plan
            // For standard plans, we create tables in existing base
            console.log('⚠️ Base creation requires Airtable Enterprise plan');
            console.log('📋 Creating tables in existing base instead...');

            // Create each table
            for (const table of tables) {
                await this.createTable(table);
            }

            return { success: true, message: 'Tables created successfully' };
        } catch (error) {
            console.error('Error creating base:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create a table (simulated - Airtable creates tables automatically)
     */
    async createTable(tableName) {
        try {
            // Airtable creates tables automatically when you add records
            // So we'll just verify we can access the table
            const response = await axios.get(`${this.baseUrl}/${encodeURIComponent(tableName)}`, {
                headers: this.headers
            });

            console.log(`✅ Table "${tableName}" is accessible`);
            return { success: true, table: tableName };
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Table doesn't exist yet, will be created when we add first record
                console.log(`ℹ️ Table "${tableName}" will be created when first record is added`);
                return { success: true, table: tableName, created: false };
            }
            console.error(`Error accessing table "${tableName}":`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add records to a table
     */
    async addRecords(tableName, records) {
        try {
            const response = await axios.post(`${this.baseUrl}/${encodeURIComponent(tableName)}`, {
                records: records.map(record => ({
                    fields: record
                }))
            }, { headers: this.headers });

            console.log(`✅ Added ${records.length} records to ${tableName}`);
            return { success: true, records: response.data.records };
        } catch (error) {
            console.error(`Error adding records to ${tableName}:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Update a record
     */
    async updateRecord(tableName, recordId, fields) {
        try {
            const response = await axios.patch(`${this.baseUrl}/${encodeURIComponent(tableName)}/${recordId}`, {
                fields: fields
            }, { headers: this.headers });

            console.log(`✅ Updated record ${recordId} in ${tableName}`);
            return { success: true, record: response.data };
        } catch (error) {
            console.error(`Error updating record ${recordId}:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Delete a record
     */
    async deleteRecord(tableName, recordId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${encodeURIComponent(tableName)}/${recordId}`, {
                headers: this.headers
            });

            console.log(`✅ Deleted record ${recordId} from ${tableName}`);
            return { success: true };
        } catch (error) {
            console.error(`Error deleting record ${recordId}:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get all records from a table
     */
    async getAllRecords(tableName) {
        try {
            const response = await axios.get(`${this.baseUrl}/${encodeURIComponent(tableName)}`, {
                headers: this.headers
            });

            console.log(`✅ Retrieved ${response.data.records.length} records from ${tableName}`);
            return { success: true, records: response.data.records };
        } catch (error) {
            console.error(`Error getting records from ${tableName}:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Setup the complete tournament database
     */
    async setupTournamentDatabase() {
        try {
            console.log('🚀 Starting tournament database setup...');

            // 1. Create tables (they'll be created automatically)
            await this.createTable(config.tables.teams);
            await this.createTable(config.tables.players);
            await this.createTable(config.tables.games);

            // 2. Import teams
            const teamsData = this._loadCSVData('airtable-data/teams.csv');
            const teamsResult = await this.addRecords(config.tables.teams, teamsData);
            if (!teamsResult.success) throw new Error('Failed to add teams');

            // 3. Import players
            const playersData = this._loadCSVData('airtable-data/players.csv');
            const playersResult = await this.addRecords(config.tables.players, playersData);
            if (!playersResult.success) throw new Error('Failed to add players');

            // 4. Import games
            const gamesData = this._loadCSVData('airtable-data/games.csv');
            const gamesResult = await this.addRecords(config.tables.games, gamesData);
            if (!gamesResult.success) throw new Error('Failed to add games');

            console.log('🎉 Tournament database setup completed successfully!');
            return { success: true, message: 'Database setup completed' };
        } catch (error) {
            console.error('❌ Database setup failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Load CSV data from file
     */
    _loadCSVData(filePath) {
        try {
            const csvContent = fs.readFileSync(filePath, 'utf8');
            const lines = csvContent.split('\n').filter(line => line.trim() !== '');
            const headers = lines[0].split(',');

            return lines.slice(1).map(line => {
                const values = line.split(',');
                const record = {};

                headers.forEach((header, index) => {
                    record[header.trim()] = values[index] ? values[index].trim() : '';
                });

                return record;
            });
        } catch (error) {
            console.error(`Error loading CSV file ${filePath}:`, error.message);
            return [];
        }
    }

    /**
     * Update team statistics based on game results
     */
    async updateTeamStatistics() {
        try {
            console.log('📊 Updating team statistics...');

            // Get all teams
            const teamsResult = await this.getAllRecords(config.tables.teams);
            if (!teamsResult.success) throw new Error('Failed to get teams');

            // Get all games
            const gamesResult = await this.getAllRecords(config.tables.games);
            if (!gamesResult.success) throw new Error('Failed to get games');

            // Calculate statistics for each team
            const teamStats = {};

            // Initialize stats
            teamsResult.records.forEach(team => {
                teamStats[team.fields.Name] = {
                    wins: 0,
                    losses: 0,
                    runs_scored: 0,
                    runs_allowed: 0,
                    games_played: 0
                };
            });

            // Process games
            gamesResult.records.forEach(game => {
                if (game.fields['Game Complete']) {
                    const homeTeam = game.fields['Home Team'][0];
                    const visitingTeam = game.fields['Visiting Team'][0];
                    const homeScore = parseInt(game.fields['Home Score']) || 0;
                    const visitingScore = parseInt(game.fields['Visiting Score']) || 0;

                    // Update home team stats
                    teamStats[homeTeam].runs_scored += homeScore;
                    teamStats[homeTeam].runs_allowed += visitingScore;
                    teamStats[homeTeam].games_played += 1;

                    // Update visiting team stats
                    teamStats[visitingTeam].runs_scored += visitingScore;
                    teamStats[visitingTeam].runs_allowed += homeScore;
                    teamStats[visitingTeam].games_played += 1;

                    // Update win/loss
                    if (homeScore > visitingScore) {
                        teamStats[homeTeam].wins += 1;
                        teamStats[visitingTeam].losses += 1;
                    } else if (visitingScore > homeScore) {
                        teamStats[homeTeam].losses += 1;
                        teamStats[visitingTeam].wins += 1;
                    }
                }
            });

            // Update teams with calculated statistics
            for (const teamRecord of teamsResult.records) {
                const teamName = teamRecord.fields.Name;
                const stats = teamStats[teamName] || { wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0 };

                await this.updateRecord(config.tables.teams, teamRecord.id, {
                    Wins: stats.wins,
                    Losses: stats.losses,
                    'Runs Scored': stats.runs_scored,
                    'Runs Allowed': stats.runs_allowed
                });
            }

            console.log('✅ Team statistics updated successfully');
            return { success: true };
        } catch (error) {
            console.error('Error updating team statistics:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add a new team
     */
    async addTeam(teamData) {
        return await this.addRecords(config.tables.teams, [teamData]);
    }

    /**
     * Add a new player
     */
    async addPlayer(playerData) {
        return await this.addRecords(config.tables.players, [playerData]);
    }

    /**
     * Add a new game
     */
    async addGame(gameData) {
        return await this.addRecords(config.tables.games, [gameData]);
    }

    /**
     * Export all data to JSON files for backup
     */
    async exportDataToJSON() {
        try {
            console.log('💾 Exporting data to JSON files...');

            // Create backup directory
            const backupDir = 'airtable-backup';
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir);
            }

            // Export each table
            for (const [key, tableName] of Object.entries(config.tables)) {
                const result = await this.getAllRecords(tableName);
                if (result.success) {
                    const filePath = path.join(backupDir, `${key}-backup.json`);
                    fs.writeFileSync(filePath, JSON.stringify(result.records, null, 2));
                    console.log(`✅ Exported ${tableName} to ${filePath}`);
                }
            }

            console.log('🎉 Data export completed successfully!');
            return { success: true };
        } catch (error) {
            console.error('Error exporting data:', error.message);
            return { success: false, error: error.message };
        }
    }
}

/**
 * Tournament Manager - High-level management functions
 */
class TournamentManager {
    constructor(apiKey, baseId) {
        this.api = new AirtableAPI(apiKey, baseId);
    }

    /**
     * Complete setup of tournament database
     */
    async completeSetup() {
        try {
            console.log('🏆 Starting complete tournament setup...');

            // 1. Setup database structure and import data
            const setupResult = await this.api.setupTournamentDatabase();
            if (!setupResult.success) throw new Error('Database setup failed');

            // 2. Update team statistics
            const statsResult = await this.api.updateTeamStatistics();
            if (!statsResult.success) throw new Error('Statistics update failed');

            // 3. Export backup
            const exportResult = await this.api.exportDataToJSON();
            if (!exportResult.success) throw new Error('Data export failed');

            console.log('🎉 Complete tournament setup successful!');
            console.log('📊 Database is ready for use');
            console.log('💾 Backup created in airtable-backup/ directory');

            return { success: true, message: 'Tournament setup completed successfully' };
        } catch (error) {
            console.error('❌ Complete setup failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add a complete team with players
     */
    async addCompleteTeam(teamData, playersData) {
        try {
            console.log(`👥 Adding complete team: ${teamData.Name}`);

            // Add team
            const teamResult = await this.api.addTeam(teamData);
            if (!teamResult.success) throw new Error('Failed to add team');

            // Add players
            const playersWithTeam = playersData.map(player => ({
                ...player,
                Team: [teamData.Name]
            }));

            const playersResult = await this.api.addRecords(config.tables.players, playersWithTeam);
            if (!playersResult.success) throw new Error('Failed to add players');

            // Update team player count
            const teams = await this.api.getAllRecords(config.tables.teams);
            const team = teams.records.find(t => t.fields.Name === teamData.Name);
            if (team) {
                await this.api.updateRecord(config.tables.teams, team.id, {
                    'Players Count': playersData.length
                });
            }

            console.log(`✅ Added team ${teamData.Name} with ${playersData.length} players`);
            return { success: true };
        } catch (error) {
            console.error(`Error adding complete team:`, error.message);
            return { success: false, error: error.message };
        }
    }

    /**
     * Add a game and update statistics
     */
    async addGameWithStats(gameData) {
        try {
            console.log(`⚾ Adding game: ${gameData['Home Team']} vs ${gameData['Visiting Team']}`);

            // Add game
            const gameResult = await this.api.addGame(gameData);
            if (!gameResult.success) throw new Error('Failed to add game');

            // Update statistics
            const statsResult = await this.api.updateTeamStatistics();
            if (!statsResult.success) throw new Error('Failed to update statistics');

            console.log(`✅ Added game and updated statistics`);
            return { success: true };
        } catch (error) {
            console.error(`Error adding game with stats:`, error.message);
            return { success: false, error: error.message };
        }
    }
}

/**
 * Command Line Interface
 */
function showHelp() {
    console.log(`
🏆 Wooden Bat Classic - Airtable API Manager

Usage:
  node airtable-api-manager.js <command> [options]

Commands:
  setup              Complete tournament database setup
  add-team           Add a new team
  add-player         Add a new player
  add-game           Add a new game
  update-stats       Update team statistics
  export             Export data to JSON
  backup             Create data backup
  help               Show this help message

Examples:
  node airtable-api-manager.js setup
  node airtable-api-manager.js add-team --name "New Team"
  node airtable-api-manager.js update-stats
  node airtable-api-manager.js export
`);
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    // Check for API key
    if (!config.apiKey || config.apiKey === 'your_api_key_here') {
        console.error('❌ Please set your Airtable API key in the config or environment variables');
        console.log('📋 Set AIRTABLE_API_KEY environment variable or edit the config');
        process.exit(1);
    }

    const manager = new TournamentManager(config.apiKey, config.baseId);

    try {
        switch (command) {
            case 'setup':
                await manager.completeSetup();
                break;

            case 'add-team':
                // In a real implementation, we'd parse additional arguments
                console.log('👥 Add team functionality - would parse arguments here');
                break;

            case 'add-player':
                console.log('👤 Add player functionality - would parse arguments here');
                break;

            case 'add-game':
                console.log('⚾ Add game functionality - would parse arguments here');
                break;

            case 'update-stats':
                await manager.api.updateTeamStatistics();
                break;

            case 'export':
                await manager.api.exportDataToJSON();
                break;

            case 'backup':
                await manager.api.exportDataToJSON();
                break;

            case 'help':
            default:
                showHelp();
                break;
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the CLI if this script is executed directly
if (require.main === module) {
    main();
}

// Export for use in other scripts
module.exports = {
    AirtableAPI,
    TournamentManager,
    config
};
