const { SupabaseManager } = require('./supabase-api-manager');

(async () => {
    const mgr = new SupabaseManager();

    // Get teams
    const teams = await mgr.getTeams();
    console.log('Teams and their games:');

    // Check games for each team
    for (const team of teams) {
        const games = await mgr.getTeamGames(team.id);
        console.log(`${team.id}: ${team.name} - ${games.length} games`);
        if (games.length > 0) {
            console.log(`  Sample game: ${games[0].day_of_week} ${games[0].time} vs Team ${games[0].home_team_id === team.id ? games[0].visiting_team_id : games[0].home_team_id}`);
        }
    }
})();
