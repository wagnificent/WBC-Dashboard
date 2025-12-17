/**
 * Firebase Data Setup for Wooden Bat Classic Dashboard
 *
 * This script helps you set up the initial data in Firebase Firestore
 * using the new simplified structure.
 */

// Import the Firebase API
const firebaseAPI = new FirebaseAPI();

/**
 * Sample data for teams (simplified structure)
 */
const teamsData = [
    {
        team_name: "Red Sox",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    },
    {
        team_name: "Cubs",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    },
    {
        team_name: "Dodgers",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    },
    {
        team_name: "Braves",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    },
    {
        team_name: "Astros",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    },
    {
        team_name: "Mets",
        wins: 0,
        losses: 0,
        runs_scored: 0,
        runs_allowed: 0,
        players_count: 0
    }
];

/**
 * Sample data for players (simplified structure - no position/jersey_number)
 */
const playersData = [
    // Red Sox Players
    { first_name: "John", last_name: "Smith", age: 18, hometown: "Boston, MA", team_name: "Red Sox", tournaments_played: 1 },
    { first_name: "Mike", last_name: "Johnson", age: 17, hometown: "New York, NY", team_name: "Red Sox", tournaments_played: 2 },
    { first_name: "David", last_name: "Wilson", age: 19, hometown: "Chicago, IL", team_name: "Red Sox", tournaments_played: 1 },
    { first_name: "Robert", last_name: "Brown", age: 18, hometown: "Los Angeles, CA", team_name: "Red Sox", tournaments_played: 3 },
    { first_name: "James", last_name: "Davis", age: 17, hometown: "Houston, TX", team_name: "Red Sox", tournaments_played: 1 },

    // Cubs Players
    { first_name: "Charles", last_name: "Jackson", age: 18, hometown: "Miami, FL", team_name: "Cubs", tournaments_played: 2 },
    { first_name: "Daniel", last_name: "White", age: 19, hometown: "Atlanta, GA", team_name: "Cubs", tournaments_played: 1 },
    { first_name: "Matthew", last_name: "Harris", age: 17, hometown: "Seattle, WA", team_name: "Cubs", tournaments_played: 3 },
    { first_name: "Anthony", last_name: "Martin", age: 18, hometown: "Denver, CO", team_name: "Cubs", tournaments_played: 1 },
    { first_name: "Mark", last_name: "Thompson", age: 19, hometown: "Phoenix, AZ", team_name: "Cubs", tournaments_played: 2 },

    // Dodgers Players
    { first_name: "Edward", last_name: "Lewis", age: 18, hometown: "San Francisco, CA", team_name: "Dodgers", tournaments_played: 1 },
    { first_name: "Brian", last_name: "Lee", age: 17, hometown: "San Diego, CA", team_name: "Dodgers", tournaments_played: 2 },
    { first_name: "Ronald", last_name: "Walker", age: 19, hometown: "Portland, OR", team_name: "Dodgers", tournaments_played: 1 },
    { first_name: "Timothy", last_name: "Hall", age: 18, hometown: "Las Vegas, NV", team_name: "Dodgers", tournaments_played: 3 },
    { first_name: "Jason", last_name: "Allen", age: 17, hometown: "Salt Lake City, UT", team_name: "Dodgers", tournaments_played: 1 },

    // Braves Players
    { first_name: "Eric", last_name: "Hill", age: 18, hometown: "Dallas, TX", team_name: "Braves", tournaments_played: 2 },
    { first_name: "Stephen", last_name: "Scott", age: 19, hometown: "Austin, TX", team_name: "Braves", tournaments_played: 1 },
    { first_name: "Jonathan", last_name: "Green", age: 17, hometown: "San Antonio, TX", team_name: "Braves", tournaments_played: 3 },
    { first_name: "Andrew", last_name: "Adams", age: 18, hometown: "Houston, TX", team_name: "Braves", tournaments_played: 1 },
    { first_name: "Justin", last_name: "Baker", age: 19, hometown: "Fort Worth, TX", team_name: "Braves", tournaments_played: 2 },

    // Astros Players
    { first_name: "Daniel", last_name: "Turner", age: 18, hometown: "Orlando, FL", team_name: "Astros", tournaments_played: 1 },
    { first_name: "Matthew", last_name: "Phillips", age: 17, hometown: "Tampa, FL", team_name: "Astros", tournaments_played: 2 },
    { first_name: "Andrew", last_name: "Campbell", age: 19, hometown: "Jacksonville, FL", team_name: "Astros", tournaments_played: 1 },
    { first_name: "Joshua", last_name: "Parker", age: 18, hometown: "Miami, FL", team_name: "Astros", tournaments_played: 3 },
    { first_name: "Kevin", last_name: "Evans", age: 17, hometown: "Tallahassee, FL", team_name: "Astros", tournaments_played: 1 },

    // Mets Players
    { first_name: "David", last_name: "Rogers", age: 18, hometown: "New York, NY", team_name: "Mets", tournaments_played: 2 },
    { first_name: "Robert", last_name: "Reed", age: 19, hometown: "Buffalo, NY", team_name: "Mets", tournaments_played: 1 },
    { first_name: "Michael", last_name: "Cook", age: 17, hometown: "Rochester, NY", team_name: "Mets", tournaments_played: 3 },
    { first_name: "William", last_name: "Morgan", age: 18, hometown: "Albany, NY", team_name: "Mets", tournaments_played: 1 },
    { first_name: "Richard", last_name: "Bell", age: 19, hometown: "Syracuse, NY", team_name: "Mets", tournaments_played: 2 }
];

/**
 * Sample data for games (simplified structure - no dates, just day_of_week)
 */
const gamesData = [
    // Day 1 - Monday
    {
        day_of_week: "Monday",
        time: "08:00",
        stadium_name: "Field 1",
        home_team: "Red Sox",
        visiting_team: "Cubs",
        home_score: 5,
        visiting_score: 3,
        game_complete: true
    },
    {
        day_of_week: "Monday",
        time: "10:00",
        stadium_name: "Field 2",
        home_team: "Dodgers",
        visiting_team: "Braves",
        home_score: 4,
        visiting_score: 2,
        game_complete: true
    },
    {
        day_of_week: "Monday",
        time: "12:00",
        stadium_name: "Field 1",
        home_team: "Astros",
        visiting_team: "Mets",
        home_score: 6,
        visiting_score: 1,
        game_complete: true
    },

    // Day 2 - Tuesday
    {
        day_of_week: "Tuesday",
        time: "08:00",
        stadium_name: "Field 1",
        home_team: "Cubs",
        visiting_team: "Dodgers",
        home_score: 3,
        visiting_score: 5,
        game_complete: true
    },
    {
        day_of_week: "Tuesday",
        time: "10:00",
        stadium_name: "Field 2",
        home_team: "Braves",
        visiting_team: "Astros",
        home_score: 2,
        visiting_score: 4,
        game_complete: true
    },
    {
        day_of_week: "Tuesday",
        time: "12:00",
        stadium_name: "Field 1",
        home_team: "Mets",
        visiting_team: "Red Sox",
        home_score: 1,
        visiting_score: 7,
        game_complete: true
    },

    // Day 3 - Wednesday (continue pattern for 6 days)
    {
        day_of_week: "Wednesday",
        time: "08:00",
        stadium_name: "Field 1",
        home_team: "Red Sox",
        visiting_team: "Braves",
        home_score: 4,
        visiting_score: 3,
        game_complete: true
    },
    {
        day_of_week: "Wednesday",
        time: "10:00",
        stadium_name: "Field 2",
        home_team: "Cubs",
        visiting_team: "Mets",
        home_score: 5,
        visiting_score: 2,
        game_complete: true
    },
    {
        day_of_week: "Wednesday",
        time: "12:00",
        stadium_name: "Field 1",
        home_team: "Dodgers",
        visiting_team: "Astros",
        home_score: 3,
        visiting_score: 1,
        game_complete: true
    }
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
        return true;
    } catch (error) {
        console.error('Error adding teams:', error);
        return false;
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

        // Update player counts for each team
        await updateTeamPlayerCounts();
        return true;
    } catch (error) {
        console.error('Error adding players:', error);
        return false;
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

        // Update team statistics based on games
        await updateTeamStatistics();
        return true;
    } catch (error) {
        console.error('Error adding games:', error);
        return false;
    }
}

/**
 * Function to update team player counts
 */
async function updateTeamPlayerCounts() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        // Get all players grouped by team
        const playersSnapshot = await db.collection('players').get();
        const teamCounts = {};

        playersSnapshot.forEach(doc => {
            const teamName = doc.data().team_name;
            teamCounts[teamName] = (teamCounts[teamName] || 0) + 1;
        });

        // Update each team's player count
        const teamsSnapshot = await db.collection('teams').get();
        const batch = db.batch();

        teamsSnapshot.forEach(doc => {
            const teamName = doc.data().team_name;
            const count = teamCounts[teamName] || 0;
            batch.update(doc.ref, { players_count: count });
        });

        await batch.commit();
        console.log('Team player counts updated successfully!');
    } catch (error) {
        console.error('Error updating team player counts:', error);
    }
}

/**
 * Function to update team statistics based on games
 */
async function updateTeamStatistics() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        // Initialize team stats
        const teamsSnapshot = await db.collection('teams').get();
        const teamStats = {};

        teamsSnapshot.forEach(doc => {
            teamStats[doc.data().team_name] = {
                wins: 0,
                losses: 0,
                runs_scored: 0,
                runs_allowed: 0
            };
        });

        // Process all games to calculate stats
        const gamesSnapshot = await db.collection('games').get();

        gamesSnapshot.forEach(doc => {
            const game = doc.data();
            if (game.game_complete) {
                // Update home team stats
                teamStats[game.home_team].runs_scored += game.home_score;
                teamStats[game.home_team].runs_allowed += game.visiting_score;

                // Update visiting team stats
                teamStats[game.visiting_team].runs_scored += game.visiting_score;
                teamStats[game.visiting_team].runs_allowed += game.home_score;

                // Update win/loss records
                if (game.home_score > game.visiting_score) {
                    teamStats[game.home_team].wins += 1;
                    teamStats[game.visiting_team].losses += 1;
                } else if (game.home_score < game.visiting_score) {
                    teamStats[game.home_team].losses += 1;
                    teamStats[game.visiting_team].wins += 1;
                }
            }
        });

        // Update teams with calculated statistics
        const batch = db.batch();

        teamsSnapshot.forEach(doc => {
            const teamName = doc.data().team_name;
            const stats = teamStats[teamName] || { wins: 0, losses: 0, runs_scored: 0, runs_allowed: 0 };
            batch.update(doc.ref, stats);
        });

        await batch.commit();
        console.log('Team statistics updated successfully!');
    } catch (error) {
        console.error('Error updating team statistics:', error);
    }
}

/**
 * Function to add team schedules
 */
async function addTeamSchedules() {
    const db = firebaseAPI.getFirestore();
    if (!db) {
        console.error('Firebase not initialized');
        return;
    }

    try {
        const gamesSnapshot = await db.collection('games').get();
        const batch = db.batch();

        gamesSnapshot.forEach(gameDoc => {
            const game = gameDoc.data();

            // Add schedule entry for home team
            const homeScheduleRef = db.collection('team_schedules').doc();
            batch.set(homeScheduleRef, {
                team_name: game.home_team,
                game_id: gameDoc.id,
                opponent: game.visiting_team,
                day_of_week: game.day_of_week,
                time: game.time,
                location: "Home",
                stadium: game.stadium_name,
                created_at: new Date()
            });

            // Add schedule entry for visiting team
            const visitingScheduleRef = db.collection('team_schedules').doc();
            batch.set(visitingScheduleRef, {
                team_name: game.visiting_team,
                game_id: gameDoc.id,
                opponent: game.home_team,
                day_of_week: game.day_of_week,
                time: game.time,
                location: "Away",
                stadium: game.stadium_name,
                created_at: new Date()
            });
        });

        await batch.commit();
        console.log('Team schedules added successfully!');
        return true;
    } catch (error) {
        console.error('Error adding team schedules:', error);
        return false;
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
        const teamsSuccess = await addTeams();
        if (!teamsSuccess) return false;

        const playersSuccess = await addPlayers();
        if (!playersSuccess) return false;

        const gamesSuccess = await addGames();
        if (!gamesSuccess) return false;

        const schedulesSuccess = await addTeamSchedules();
        if (!schedulesSuccess) return false;

        console.log('All data setup completed successfully!');
        console.log('✅ Teams: 6 teams added');
        console.log('✅ Players: 30 players added (5 per team)');
        console.log('✅ Games: 9 games added (3 per day for 3 days)');
        console.log('✅ Team Schedules: 18 schedule entries added');
        console.log('✅ Statistics: Team stats calculated and updated');

        return true;
    } catch (error) {
        console.error('Error setting up data:', error);
        return false;
    }
}

// Export functions for use in browser console or other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupAllData,
        addTeams,
        addPlayers,
        addGames,
        addTeamSchedules,
        updateTeamPlayerCounts,
        updateTeamStatistics,
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
    window.addTeamSchedulesToFirebase = addTeamSchedules;
}

// Run setup if this script is executed directly
if (typeof window !== 'undefined') {
    // You can call setupFirebaseData() from browser console to populate data
    console.log('Firebase data setup script loaded. Call setupFirebaseData() to populate your database.');
}
