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
