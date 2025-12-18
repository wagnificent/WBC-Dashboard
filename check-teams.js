const { SupabaseManager } = require('./supabase-api-manager');

(async () => {
    const mgr = new SupabaseManager();
    const teams = await mgr.getTeams();
    console.log('Teams in database:');
    teams.forEach(t => console.log(`${t.id}: ${t.name}`));
})();
