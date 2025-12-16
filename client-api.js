/**
 * Wooden Bat Classic Dashboard - Client API
 *
 * This file provides functions to interact with the server API
 * and replace the hardcoded data in the dashboard.
 */

class DashboardAPI {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    /**
     * Fetch all teams
     * @returns {Promise<Array>} Array of team objects
     */
    async getTeams() {
        try {
            const response = await fetch(`${this.baseUrl}/api/teams`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching teams:', error);
            return [];
        }
    }

    /**
     * Fetch all games with optional filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise<Array>} Array of game objects
     */
    async getGames(filters = {}) {
        try {
            // Build query string from filters
            const queryParams = new URLSearchParams();

            if (filters.team) queryParams.append('team', filters.team);
            if (filters.opponent) queryParams.append('opponent', filters.opponent);
            if (filters.field) queryParams.append('field', filters.field);
            if (filters.date) queryParams.append('date', filters.date);
            if (filters.time) queryParams.append('time', filters.time);
            if (filters.result) queryParams.append('result', filters.result);

            const queryString = queryParams.toString();
            const url = `${this.baseUrl}/api/games${queryString ? '?' + queryString : ''}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching games:', error);
            return [];
        }
    }

    /**
     * Fetch players for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of player objects
     */
    async getTeamPlayers(teamId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/teams/${teamId}/players`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching team players:', error);
            return [];
        }
    }

    /**
     * Fetch games for a specific team
     * @param {number} teamId - Team ID
     * @returns {Promise<Array>} Array of game objects
     */
    async getTeamGames(teamId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/teams/${teamId}/games`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching team games:', error);
            return [];
        }
    }

    /**
     * Convert API game data to the format expected by the dashboard
     * @param {Array} apiGames - Games from API
     * @returns {Array} Games in dashboard format
     */
    convertGamesToDashboardFormat(apiGames) {
        return apiGames.map(game => ({
            date: game.date,
            time: game.time,
            team: game.team_name,
            opponent: game.opponent_name,
            field: game.field_name,
            location: game.location,
            result: game.result
        }));
    }

    /**
     * Convert API player data to the format expected by the dashboard
     * @param {Array} apiPlayers - Players from API
     * @returns {Array} Players in dashboard format
     */
    convertPlayersToDashboardFormat(apiPlayers) {
        return apiPlayers.map(player => ({
            name: `${player.first_name} ${player.last_name}`,
            position: player.position,
            number: player.jersey_number
        }));
    }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardAPI;
} else {
    window.DashboardAPI = DashboardAPI;
}
