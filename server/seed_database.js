const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Create database connection
const db = new sqlite3.Database(config.database.filename);

// Read SQL file
const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed_data.sql'), 'utf8');

// Execute SQL commands
db.serialize(() => {
    db.exec(seedSql, (err) => {
        if (err) {
            console.error('Error seeding database:', err);
            process.exit(1);
        }

        console.log('Database seeding completed successfully!');

        // Get some statistics about the seeded data
        db.all('SELECT COUNT(*) as teamCount FROM teams', (err, rows) => {
            if (!err) console.log(`Teams inserted: ${rows[0].teamCount}`);

            db.all('SELECT COUNT(*) as playerCount FROM players', (err, rows) => {
                if (!err) console.log(`Players inserted: ${rows[0].playerCount}`);

                db.all('SELECT COUNT(*) as gameCount FROM games', (err, rows) => {
                    if (!err) console.log(`Games inserted: ${rows[0].gameCount}`);
                });
            });
        });
    });
});

// Close database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database connection:', err);
        process.exit(1);
    }
});
