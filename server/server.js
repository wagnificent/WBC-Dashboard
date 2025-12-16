const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const config = require('./config');

// Create Express app
const app = express();
const port = config.server.port;

// Middleware
app.use(cors(config.api.cors));
app.use(express.json());

// Database connection
const db = new sqlite3.Database(config.database.filename);

// API Routes
app.get('/api/teams', (req, res) => {
    db.all('SELECT * FROM teams ORDER BY team_name', (err, rows) => {
        if (err) {
            console.error('Error fetching teams:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.get('/api/teams/:id', (req, res) => {
    const teamId = req.params.id;
    db.get('SELECT * FROM teams WHERE team_id = ?', [teamId], (err, row) => {
        if (err) {
            console.error('Error fetching team:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(row);
    });
});

app.get('/api/games', (req, res) => {
    const { team, opponent, field, date, time, result } = req.query;

    let sql = 'SELECT g.*, t1.team_name as team_name, t2.team_name as opponent_name FROM games g ';
    sql += 'JOIN teams t1 ON g.team_id = t1.team_id ';
    sql += 'JOIN teams t2 ON g.opponent_id = t2.team_id ';
    sql += 'WHERE 1=1 ';

    const params = [];

    if (team) {
        sql += 'AND t1.team_name = ? ';
        params.push(team);
    }

    if (opponent) {
        sql += 'AND t2.team_name = ? ';
        params.push(opponent);
    }

    if (field) {
        sql += 'AND g.field_name = ? ';
        params.push(field);
    }

    if (date) {
        sql += 'AND g.date = ? ';
        params.push(date);
    }

    if (time) {
        sql += 'AND g.time = ? ';
        params.push(time);
    }

    if (result) {
        sql += 'AND g.result = ? ';
        params.push(result);
    }

    sql += 'ORDER BY g.date, g.time';

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Error fetching games:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.get('/api/games/:id', (req, res) => {
    const gameId = req.params.id;
    const sql = 'SELECT g.*, t1.team_name as team_name, t2.team_name as opponent_name FROM games g ';
    sql += 'JOIN teams t1 ON g.team_id = t1.team_id ';
    sql += 'JOIN teams t2 ON g.opponent_id = t2.team_id ';
    sql += 'WHERE g.game_id = ?';

    db.get(sql, [gameId], (err, row) => {
        if (err) {
            console.error('Error fetching game:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(row);
    });
});

app.get('/api/teams/:id/players', (req, res) => {
    const teamId = req.params.id;
    const sql = 'SELECT p.* FROM players p ';
    sql += 'JOIN team_players tp ON p.player_id = tp.player_id ';
    sql += 'WHERE tp.team_id = ? ';
    sql += 'ORDER BY p.last_name, p.first_name';

    db.all(sql, [teamId], (err, rows) => {
        if (err) {
            console.error('Error fetching players:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.get('/api/teams/:id/games', (req, res) => {
    const teamId = req.params.id;
    const sql = 'SELECT g.*, t1.team_name as team_name, t2.team_name as opponent_name FROM games g ';
    sql += 'JOIN teams t1 ON g.team_id = t1.team_id ';
    sql += 'JOIN teams t2 ON g.opponent_id = t2.team_id ';
    sql += 'WHERE g.team_id = ? ';
    sql += 'ORDER BY g.date, g.time';

    db.all(sql, [teamId], (err, rows) => {
        if (err) {
            console.error('Error fetching team games:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Wooden Bat Classic Dashboard API server running on http://${config.server.host}:${port}`);
    console.log('Available endpoints:');
    console.log(`- GET http://${config.server.host}:${port}/api/teams`);
    console.log(`- GET http://${config.server.host}:${port}/api/games`);
    console.log(`- GET http://${config.server.host}:${port}/api/teams/:id/players`);
    console.log(`- GET http://${config.server.host}:${port}/api/teams/:id/games`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database connection:', err);
        } else {
            console.log('Database connection closed.');
        }
        process.exit();
    });
});
