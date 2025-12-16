/**
 * Firebase Data Modification Example
 *
 * This file demonstrates how to use the new Firebase data modification methods
 * to change information in the Firebase database.
 */

// Import the Firebase API
const firebaseAPI = new FirebaseAPI();

/**
 * Example: Adding a new team
 */
async function addNewTeamExample() {
    try {
        // Initialize Firebase
        await firebaseAPI.initialize();

        // Add a new team
        const newTeamId = await firebaseAPI.addTeam({
            team_name: "New Team"
        });

        console.log(`Added new team with ID: ${newTeamId}`);

        // You can now use this team in games and players
        return newTeamId;
    } catch (error) {
        console.error("Error adding team:", error);
    }
}

/**
 * Example: Updating a team
 */
async function updateTeamExample(teamId) {
    try {
        await firebaseAPI.initialize();

        // Update team information
        await firebaseAPI.updateTeam(teamId, {
            team_name: "Updated Team Name"
        });

        console.log(`Updated team ${teamId} successfully`);
    } catch (error) {
        console.error("Error updating team:", error);
    }
}

/**
 * Example: Deleting a team
 */
async function deleteTeamExample(teamId) {
    try {
        await firebaseAPI.initialize();

        // Delete team
        await firebaseAPI.deleteTeam(teamId);

        console.log(`Deleted team ${teamId} successfully`);
    } catch (error) {
        console.error("Error deleting team:", error);
    }
}

/**
 * Example: Adding a new player
 */
async function addNewPlayerExample(teamName) {
    try {
        await firebaseAPI.initialize();

        // Add a new player
        const newPlayerId = await firebaseAPI.addPlayer({
            first_name: "John",
            last_name: "Doe",
            position: "Pitcher",
            jersey_number: 42,
            team_name: teamName
        });

        console.log(`Added new player with ID: ${newPlayerId}`);
        return newPlayerId;
    } catch (error) {
        console.error("Error adding player:", error);
    }
}

/**
 * Example: Updating a player
 */
async function updatePlayerExample(playerId) {
    try {
        await firebaseAPI.initialize();

        // Update player information
        await firebaseAPI.updatePlayer(playerId, {
            jersey_number: 99,
            position: "Outfielder"
        });

        console.log(`Updated player ${playerId} successfully`);
    } catch (error) {
        console.error("Error updating player:", error);
    }
}

/**
 * Example: Adding a new game
 */
async function addNewGameExample(teamName, opponentName) {
    try {
        await firebaseAPI.initialize();

        // Add a new game
        const newGameId = await firebaseAPI.addGame({
            date: "2023-06-20",
            time: "10:00",
            team_name: teamName,
            opponent_name: opponentName,
            field_name: "Field 1",
            location: "Main Stadium",
            result: "Win",
            runs_scored: 5,
            runs_allowed: 2
        });

        console.log(`Added new game with ID: ${newGameId}`);
        return newGameId;
    } catch (error) {
        console.error("Error adding game:", error);
    }
}

/**
 * Example: Updating a game result
 */
async function updateGameResultExample(gameId) {
    try {
        await firebaseAPI.initialize();

        // Update game result
        await firebaseAPI.updateGame(gameId, {
            result: "Loss",
            runs_scored: 3,
            runs_allowed: 4
        });

        console.log(`Updated game ${gameId} result successfully`);
    } catch (error) {
        console.error("Error updating game:", error);
    }
}

/**
 * Example: Complete workflow - Add team, players, and game
 */
async function completeWorkflowExample() {
    try {
        await firebaseAPI.initialize();

        // 1. Add a new team
        const teamId = await firebaseAPI.addTeam({
            team_name: "Tournament Champions"
        });

        // 2. Add players to the team
        const player1Id = await firebaseAPI.addPlayer({
            first_name: "Michael",
            last_name: "Jordan",
            position: "Pitcher",
            jersey_number: 23,
            team_name: "Tournament Champions"
        });

        const player2Id = await firebaseAPI.addPlayer({
            first_name: "LeBron",
            last_name: "James",
            position: "Catcher",
            jersey_number: 6,
            team_name: "Tournament Champions"
        });

        // 3. Add a game for the team
        const gameId = await firebaseAPI.addGame({
            date: "2023-06-25",
            time: "14:00",
            team_name: "Tournament Champions",
            opponent_name: "Rival Team",
            field_name: "Championship Field",
            location: "Main Stadium",
            result: "Win",
            runs_scored: 8,
            runs_allowed: 1
        });

        console.log("Complete workflow executed successfully!");
        console.log(`Team ID: ${teamId}`);
        console.log(`Player IDs: ${player1Id}, ${player2Id}`);
        console.log(`Game ID: ${gameId}`);

    } catch (error) {
        console.error("Error in complete workflow:", error);
    }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addNewTeamExample,
        updateTeamExample,
        deleteTeamExample,
        addNewPlayerExample,
        updatePlayerExample,
        addNewGameExample,
        updateGameResultExample,
        completeWorkflowExample
    };
} else {
    // Make functions available in browser console
    window.addNewTeamExample = addNewTeamExample;
    window.updateTeamExample = updateTeamExample;
    window.deleteTeamExample = deleteTeamExample;
    window.addNewPlayerExample = addNewPlayerExample;
    window.updatePlayerExample = updatePlayerExample;
    window.addNewGameExample = addNewGameExample;
    window.updateGameResultExample = updateGameResultExample;
    window.completeWorkflowExample = completeWorkflowExample;
}
