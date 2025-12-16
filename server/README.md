# Wooden Bat Classic Dashboard - Node.js Server

This server provides API endpoints for the Wooden Bat Classic Dashboard to interact with the SQLite database.

## Prerequisites

Since Node.js is not currently installed on your system, you'll need to install it first:

1. Download Node.js from https://nodejs.org/
2. Run the installer (choose the LTS version)
3. Restart your terminal/command prompt

## Setup Instructions

1. Install the required dependencies:
   ```bash
   npm install express sqlite3 cors
   ```

2. Create the database:
   ```bash
   node server/setup_database.js
   ```

3. Seed the database with initial data:
   ```bash
   node server/seed_database.js
   ```

4. Start the server:
   ```bash
   node server/server.js
   ```

## API Endpoints

- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get a specific team
- `GET /api/games` - Get all games (with optional filters)
- `GET /api/games/:id` - Get a specific game
- `GET /api/teams/:id/players` - Get players for a specific team
- `GET /api/teams/:id/games` - Get games for a specific team

## Database Files

- `database/wbc_dashboard.db` - SQLite database file
- `database/setup_database.sql` - Database schema
- `database/seed_data.sql` - Sample data

## Server Files

- `server/server.js` - Main server file
- `server/setup_database.js` - Database setup script
- `server/seed_database.js` - Database seeding script
- `server/config.js` - Configuration file
