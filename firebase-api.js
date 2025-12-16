/**
 * Firebase API for Wooden Bat Classic Dashboard
 *
 * This file provides Firebase-specific data access methods
 * that replace the Node.js API implementation.
 */

class FirebaseAPI {
  constructor() {
    this.db = null;
    this.initialized = false;
    this.initializationPromise = null;
  }

  /**
   * Initialize the Firebase API
   */
  async initialize() {
    if (this.initialized) {
      return true;
    }

    if (!this.initializationPromise) {
      this.initializationPromise = new Promise((resolve, reject) => {
        // Check if firebase-config.js is loaded
        if (typeof initializeFirebase === 'undefined') {
          console.error('Firebase configuration not loaded. Make sure firebase-config.js is included.');
          reject(new Error('Firebase configuration not loaded'));
          return;
        }

        // Initialize Firebase
        initializeFirebase();

        // Wait for Firebase to be ready
        const checkFirebaseReady = () => {
          if (typeof getFirestore === 'function') {
            this.db = getFirestore();
            this.initialized = true;
            console.log('Firebase API initialized successfully');
            resolve(true);
          } else {
            setTimeout(checkFirebaseReady, 100);
          }
        };

        checkFirebaseReady();
      });
    }

    return this.initializationPromise;
  }

  /**
   * Get all teams from Firestore
   * @returns {Promise<Array>} Array of team objects
   */
  async getTeams() {
    await this.initialize();

    try {
      const teamsRef = this.db.collection('teams');
      const snapshot = await teamsRef.orderBy('team_name').get();

      const teams = [];
      snapshot.forEach(doc => {
        teams.push({
          team_id: doc.id,
          team_name: doc.data().team_name,
          ...doc.data()
        });
      });

      return teams;
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
    await this.initialize();

    try {
      let gamesRef = this.db.collection('games');

      // Apply filters
      if (filters.team) {
        gamesRef = gamesRef.where('team_name', '==', filters.team);
      }

      if (filters.opponent) {
        gamesRef = gamesRef.where('opponent_name', '==', filters.opponent);
      }

      if (filters.field) {
        gamesRef = gamesRef.where('field_name', '==', filters.field);
      }

      if (filters.date) {
        gamesRef = gamesRef.where('date', '==', filters.date);
      }

      if (filters.time) {
        gamesRef = gamesRef.where('time', '==', filters.time);
      }

      if (filters.result) {
        gamesRef = gamesRef.where('result', '==', filters.result);
      }

      const snapshot = await gamesRef.orderBy('date').orderBy('time').get();

      const games = [];
      snapshot.forEach(doc => {
        games.push({
          game_id: doc.id,
          ...doc.data()
        });
      });

      return games;
    } catch (error) {
      console.error('Error fetching games:', error);
      return [];
    }
  }

  /**
   * Get players for a specific team
   * @param {string} teamName - Team name
   * @returns {Promise<Array>} Array of player objects
   */
  async getTeamPlayers(teamName) {
    await this.initialize();

    try {
      const playersRef = this.db.collection('players');
      const snapshot = await playersRef.where('team_name', '==', teamName)
                                      .orderBy('last_name')
                                      .orderBy('first_name')
                                      .get();

      const players = [];
      snapshot.forEach(doc => {
        players.push({
          player_id: doc.id,
          ...doc.data()
        });
      });

      return players;
    } catch (error) {
      console.error('Error fetching team players:', error);
      return [];
    }
  }

  /**
   * Get games for a specific team
   * @param {string} teamName - Team name
   * @returns {Promise<Array>} Array of game objects
   */
  async getTeamGames(teamName) {
    await this.initialize();

    try {
      const gamesRef = this.db.collection('games');
      const snapshot = await gamesRef.where('team_name', '==', teamName)
                                    .orderBy('date')
                                    .orderBy('time')
                                    .get();

      const games = [];
      snapshot.forEach(doc => {
        games.push({
          game_id: doc.id,
          ...doc.data()
        });
      });

      return games;
    } catch (error) {
      console.error('Error fetching team games:', error);
      return [];
    }
  }

  // ========== TEAM MANAGEMENT METHODS ==========

  /**
   * Add a new team to Firestore
   * @param {Object} teamData - Team data to add
   * @returns {Promise<string>} ID of the newly created team
   */
  async addTeam(teamData) {
    await this.initialize();

    try {
      const docRef = await this.db.collection('teams').add(teamData);
      console.log('Team added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding team:', error);
      throw error;
    }
  }

  /**
   * Update an existing team in Firestore
   * @param {string} teamId - Team ID to update
   * @param {Object} teamData - Team data to update
   * @returns {Promise<void>}
   */
  async updateTeam(teamId, teamData) {
    await this.initialize();

    try {
      await this.db.collection('teams').doc(teamId).update(teamData);
      console.log('Team updated successfully:', teamId);
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  /**
   * Delete a team from Firestore
   * @param {string} teamId - Team ID to delete
   * @returns {Promise<void>}
   */
  async deleteTeam(teamId) {
    await this.initialize();

    try {
      await this.db.collection('teams').doc(teamId).delete();
      console.log('Team deleted successfully:', teamId);
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

  // ========== PLAYER MANAGEMENT METHODS ==========

  /**
   * Add a new player to Firestore
   * @param {Object} playerData - Player data to add
   * @returns {Promise<string>} ID of the newly created player
   */
  async addPlayer(playerData) {
    await this.initialize();

    try {
      const docRef = await this.db.collection('players').add(playerData);
      console.log('Player added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding player:', error);
      throw error;
    }
  }

  /**
   * Update an existing player in Firestore
   * @param {string} playerId - Player ID to update
   * @param {Object} playerData - Player data to update
   * @returns {Promise<void>}
   */
  async updatePlayer(playerId, playerData) {
    await this.initialize();

    try {
      await this.db.collection('players').doc(playerId).update(playerData);
      console.log('Player updated successfully:', playerId);
    } catch (error) {
      console.error('Error updating player:', error);
      throw error;
    }
  }

  /**
   * Delete a player from Firestore
   * @param {string} playerId - Player ID to delete
   * @returns {Promise<void>}
   */
  async deletePlayer(playerId) {
    await this.initialize();

    try {
      await this.db.collection('players').doc(playerId).delete();
      console.log('Player deleted successfully:', playerId);
    } catch (error) {
      console.error('Error deleting player:', error);
      throw error;
    }
  }

  // ========== GAME MANAGEMENT METHODS ==========

  /**
   * Add a new game to Firestore
   * @param {Object} gameData - Game data to add
   * @returns {Promise<string>} ID of the newly created game
   */
  async addGame(gameData) {
    await this.initialize();

    try {
      const docRef = await this.db.collection('games').add(gameData);
      console.log('Game added with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  }

  /**
   * Update an existing game in Firestore
   * @param {string} gameId - Game ID to update
   * @param {Object} gameData - Game data to update
   * @returns {Promise<void>}
   */
  async updateGame(gameId, gameData) {
    await this.initialize();

    try {
      await this.db.collection('games').doc(gameId).update(gameData);
      console.log('Game updated successfully:', gameId);
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  }

  /**
   * Delete a game from Firestore
   * @param {string} gameId - Game ID to delete
   * @returns {Promise<void>}
   */
  async deleteGame(gameId) {
    await this.initialize();

    try {
      await this.db.collection('games').doc(gameId).delete();
      console.log('Game deleted successfully:', gameId);
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  }

  /**
   * Convert Firebase game data to dashboard format
   * @param {Array} firebaseGames - Games from Firebase
   * @returns {Array} Games in dashboard format
   */
  convertGamesToDashboardFormat(firebaseGames) {
    return firebaseGames.map(game => ({
      date: game.date,
      time: game.time,
      team: game.team_name,
      opponent: game.opponent_name,
      field: game.field_name,
      location: game.location,
      result: game.result,
      runs_scored: game.runs_scored || 0,
      runs_allowed: game.runs_allowed || 0
    }));
  }

  /**
   * Convert Firebase player data to dashboard format
   * @param {Array} firebasePlayers - Players from Firebase
   * @returns {Array} Players in dashboard format
   */
  convertPlayersToDashboardFormat(firebasePlayers) {
    return firebasePlayers.map(player => ({
      name: `${player.first_name} ${player.last_name}`,
      position: player.position,
      number: player.jersey_number
    }));
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FirebaseAPI;
} else {
  // Browser global
  window.FirebaseAPI = FirebaseAPI;
}
