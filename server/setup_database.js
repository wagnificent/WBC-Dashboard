const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Create database directory if it doesn't exist
const dbDir = path.dirname(config.database.filename);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new sqlite3.Database(config.database.filename);

// Read SQL file
const setupSql = fs.readFileSync(path.join(__dirname, '../database/setup_database.sql'), 'utf8');

// Execute SQL commands
db.serialize(() => {
    db.exec(setupSql, (err) => {
        if (err) {
            console.error('Error setting up database:', err);
            process.exit(1);
        }

        console.log('Database setup completed successfully!');
        console.log(`Database file created at: ${path.resolve(config.database.filename)}`);
    });
});

// Close database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database connection:', err);
        process.exit(1);
    }
});
