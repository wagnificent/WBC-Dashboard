/**
 * Firebase Data Setup for Wooden Bat Classic Dashboard
 *
 * This script helps you set up the initial data in Firebase Firestore.
 * Run this script after setting up Firebase to populate your database.
 */

// Import the Firebase API
const firebaseAPI = new FirebaseAPI();

/**
 * Sample data for teams
 */
const teamsData = [
    { team_name: 'Red Sox' },
    { team_name: 'Cubs' },
    { team_name: 'Dodgers' },
    { team_name: 'Braves' },
    { team_name: 'Astros' },
    { team_name: 'Mets' },
    { team_name: 'White Sox' },
    { team_name: 'Yankees' },
    { team_name: 'Cardinals' },
    { team_name: 'Giants' },
    { team_name: 'Phillies' },
    { team_name: 'Rangers' },
    { team_name: 'Nationals' },
    { team_name: 'Tigers' },
    { team_name: 'Rays' },
    { team_name: 'Brewers' },
    { team_name: 'Padres' },
    { team_name: 'Marlins' },
    { team_name: 'Athletics' },
    { team_name: 'Pirates' },
    { team_name: 'Royals' },
    { team_name: 'Indians' }
];

/**
 * Sample data for players (Red Sox team)
 */
const playersData = [
    // Red Sox Players
    { first_name: 'John', last_name: 'Smith', position: 'Pitcher', jersey_number: 15, team_name: 'Red Sox' },
    { first_name: 'Mike', last_name: 'Johnson', position: 'Catcher', jersey_number: 22, team_name: 'Red Sox' },
    { first_name: 'David', last_name: 'Wilson', position: 'First Base', jersey_number: 8, team_name: 'Red Sox' },
    { first_name: 'Robert', last_name: 'Brown', position: 'Second Base', jersey_number: 12, team_name: 'Red Sox' },
    { first_name: 'James', last_name: 'Davis', position: 'Third Base', jersey_number: 18, team_name: 'Red Sox' },
    { first_name: 'Michael', last_name: 'Miller', position: 'Shortstop', jersey_number: 7, team_name: 'Red Sox' },
    { first_name: 'William', last_name: 'Moore', position: 'Left Field', jersey_number: 24, team_name: 'Red Sox' },
    { first_name: 'Richard', last_name: 'Taylor', position: 'Center Field', jersey_number: 3, team_name: 'Red Sox' },
    { first_name: 'Joseph', last_name: 'Anderson', position: 'Right Field', jersey_number: 19, team_name: 'Red Sox' },
    { first_name: 'Thomas', last_name: 'Thomas', position: 'Designated Hitter', jersey_number: 11, team_name: 'Red Sox' },

    // Cubs Players
    { first_name: 'Charles', last_name: 'Jackson', position: 'Pitcher', jersey_number: 27, team_name: 'Cubs' },
    { first_name: 'Daniel', last_name: 'White', position: 'Catcher', jersey_number: 5, team_name: 'Cubs' },
    { first_name: 'Matthew', last_name: 'Harris', position: 'First Base', jersey_number: 14, team_name: 'Cubs' },
    { first_name: 'Anthony', last_name: 'Martin', position: 'Second Base', jersey_number: 9, team_name: 'Cubs' },
    { first_name: 'Mark', last_name: 'Thompson', position: 'Third Base', jersey_number: 21, team_name: 'Cubs' },
    { first_name: 'Donald', last_name: 'Garcia', position: 'Shortstop', jersey_number: 2, team_name: 'Cubs' },
    { first_name: 'Steven', last_name: 'Martinez', position: 'Left Field', jersey_number: 17, team_name: 'Cubs' },
    { first_name: 'Paul', last_name: 'Robinson', position: 'Center Field', jersey_number: 28, team_name: 'Cubs' },
    { first_name: 'Kenneth', last_name: 'Clark', position: 'Right Field', jersey_number: 6, team_name: 'Cubs' },
    { first_name: 'George', last_name: 'Rodriguez', position: 'Designated Hitter', jersey_number: 25, team_name: 'Cubs' }
];

/**
 * Sample data for games (first few games - add more as needed)
 */
const gamesData = [
    // Day 1 - June 15, 2023
    { date: '2023-06-15', time: '08:00', team_name: 'Red Sox', opponent_name: 'Yankees', field_name: 'Field 1', location: 'Boston Stadium', result: 'Win', runs_scored: 7, runs_allowed: 3 },
    { date: '2023-06-15', time: '08:00', team_name: 'Cubs', opponent_name: 'Cardinals', field_name: 'Field 2', location: 'Chicago Park', result: 'Loss', runs_scored: 2, runs_allowed: 5 },
    { date: '2023-06-15', time: '08:00', team_name: 'Dodgers', opponent_name: 'Giants', field_name: 'Field 3', location: 'Los Angeles Arena', result: 'Win', runs_scored: 6, runs_allowed: 4 },
    { date: '2023-06-15', time: '08:00', team_name: 'Braves', opponent_name: 'Phillies', field_name: 'Field 4', location: 'Atlanta Stadium', result: 'Win', runs_scored: 8, runs_allowed: 2 },
    { date: '2023-06-15', time: '08:00', team_name: 'Astros', opponent_name: 'Rangers', field_name: 'Field 5', location: 'Houston Park', result: 'Loss', runs_scored: 3, runs_allowed: 7 },
    { date: '2023-06-15', time: '08:00', team_name: 'Mets', opponent_name: 'Nationals', field_name: 'Field 6', location: 'New York Arena', result: 'Win', runs_scored: 5, runs_allowed: 1 },
    { date: '2023-06-15', time: '08:00', team_name: 'White Sox', opponent_name: 'Tigers', field_name: 'Field 7', location: 'Chicago Stadium', result: 'Loss', runs_scored: 2, runs_allowed: 4 }
];

/**
 * Function to add teams to Firestore
 */
async function addTeams() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        const batch = db.batch();

        teamsData.forEach(team => {
            const teamRef = db.collection('teams').doc();
            batch.set(teamRef, team);
        });

        await batch.commit();
        console.log('Teams added successfully!');
    } catch (error) {
        console.error('Error adding teams:', error);
    }
}

/**
 * Function to add players to Firestore
 */
async function addPlayers() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        const batch = db.batch();

        playersData.forEach(player => {
            const playerRef = db.collection('players').doc();
            batch.set(playerRef, player);
        });

        await batch.commit();
        console.log('Players added successfully!');
    } catch (error) {
        console.error('Error adding players:', error);
    }
}

/**
 * Function to add games to Firestore
 */
async function addGames() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        const batch = db.batch();

        gamesData.forEach(game => {
            const gameRef = db.collection('games').doc();
            batch.set(gameRef, game);
        });

        await batch.commit();
        console.log('Games added successfully!');
    } catch (error) {
        console.error('Error adding games:', error);
    }
}

/**
 * Function to set up all data
 */
async function setupAllData() {
    try {
        // Initialize Firebase
        await firebaseAPI.initialize();

        // Add data in sequence
        await addTeams();
        await addPlayers();
        await addGames();

        console.log('All data setup completed successfully!');
    } catch (error) {
        console.error('Error setting up data:', error);
    }
}

// Export functions for use in browser console or other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupAllData,
        addTeams,
        addPlayers,
        addGames,
        teamsData,
        playersData,
        gamesData
    };
} else {
    // Make functions available in browser console
    window.setupFirebaseData = setupAllData;
    window.addTeamsToFirebase = addTeams;
    window.addPlayersToFirebase = addPlayers;
    window.addGamesToFirebase = addGames;
}

// Run setup if this script is executed directly
if (typeof window !== 'undefined') {
    // You can call setupFirebaseData() from browser console to populate data
    console.log('Firebase data setup script loaded. Call setupFirebaseData() to populate your database.');
}
