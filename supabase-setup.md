# 🚀 Supabase Setup Guide for WBC Tournament

## 📋 Step 1: Create Supabase Account and Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up** (free, no credit card required)
3. **Create a new project** named "WBC Tournament"
4. **Copy your project credentials** (you'll need these later)

## 📋 Step 2: Configure Environment Variables

1. **Copy `.env.example` to `.env`**:
   ```bash
   copy .env.example .env
   ```

2. **Fill in your Supabase credentials** in the `.env` file:
   ```
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_KEY=your_supabase_api_key_here
   ```

3. **Get your credentials** from your Supabase dashboard:
   - **Project URL**: Found in your project settings (looks like: `https://your-project-ref.supabase.co`)
   - **API Key**: Found in Settings → API → Project API keys

## 📋 Step 3: Create Database Schema

**Option A: Automatic Schema Creation (Recommended)**

1. **Run the schema creation script**:
   ```bash
   node supabase-create-schema.js
   ```

2. **The script will**:
   - ✅ Validate your credentials
   - ✅ Create SQL functions for table management
   - ✅ Attempt to create tables automatically
   - ✅ Provide SQL commands if automatic creation fails

**Option B: Manual Schema Creation**

If the automatic script doesn't work, you can create tables manually:

1. **Go to your Supabase dashboard**
2. **Navigate to the SQL Editor**
3. **Execute these SQL commands**:

```sql
-- Create Teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    runs_scored INTEGER DEFAULT 0,
    runs_allowed INTEGER DEFAULT 0,
    players_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Players table
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INTEGER,
    hometown VARCHAR(255),
    team_id INTEGER REFERENCES teams(id),
    tournaments_played INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create Games table
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    stadium_name VARCHAR(255) NOT NULL,
    home_team_id INTEGER REFERENCES teams(id),
    visiting_team_id INTEGER REFERENCES teams(id),
    home_score INTEGER,
    visiting_score INTEGER,
    game_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 📋 Step 4: Run the Automated Setup

1. **Run the setup script**:
   ```bash
   node supabase-setup.js
   ```

2. **The script will automatically**:
   - ✅ Validate your credentials
   - ✅ Verify tables exist
   - ✅ Import sample data (teams, players, games)
   - ✅ Test the database connection
   - ✅ Verify everything is working

## 🎯 Database Schema

### Teams Table
```sql
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    runs_scored INTEGER DEFAULT 0,
    runs_allowed INTEGER DEFAULT 0,
    players_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Players Table
```sql
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    age INTEGER,
    hometown VARCHAR(255),
    team_id INTEGER REFERENCES teams(id),
    tournaments_played INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Games Table
```sql
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(50) NOT NULL,
    time VARCHAR(50) NOT NULL,
    stadium_name VARCHAR(255) NOT NULL,
    home_team_id INTEGER REFERENCES teams(id),
    visiting_team_id INTEGER REFERENCES teams(id),
    home_score INTEGER,
    visiting_score INTEGER,
    game_complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 📋 API Methods Available

The `SupabaseManager` class provides comprehensive data access methods:

### Data Retrieval
```javascript
// Get all teams
const teams = await supabaseManager.getTeams();

// Get all games (with optional filters)
const games = await supabaseManager.getGames({ day_of_week: 'Monday' });

// Get players for a team
const players = await supabaseManager.getTeamPlayers(1);

// Get games for a team
const teamGames = await supabaseManager.getTeamGames(1);
```

### Data Modification
```javascript
// Add a new team
const newTeam = await supabaseManager.addTeam({ name: 'Yankees', wins: 0, losses: 0 });

// Update a team
const updatedTeam = await supabaseManager.updateTeam(1, { wins: 5 });

// Delete a team
await supabaseManager.deleteTeam(1);
```

### Utility Methods
```javascript
// Convert games to dashboard format
const dashboardGames = supabaseManager.convertGamesToDashboardFormat(games);
```

## 🎯 Dashboard Integration

The dashboard automatically uses Supabase with fallback to sample data:

1. **If Supabase connection succeeds**: Real data is loaded from your database
2. **If Supabase connection fails**: Sample data is used (you'll see a warning in console)

## 📋 Troubleshooting

### Common Issues and Solutions

**Issue: "Supabase credentials not configured"**
- Solution: Make sure you've created `.env` file with valid credentials

**Issue: "Table doesn't exist"**
- Solution: Run the setup script first to create tables

**Issue: "Invalid API key"**
- Solution: Double-check your SUPABASE_KEY in the `.env` file

**Issue: "Network error"**
- Solution: Check your internet connection and Supabase project status

## 🎯 Next Steps

1. **Create your Supabase account** at [supabase.com](https://supabase.com)
2. **Set up your `.env` file** with your credentials
3. **Run the setup script**: `node supabase-setup.js`
4. **Start your dashboard**: Open `index.html` in your browser
5. **Enjoy your fully functional Supabase-powered tournament dashboard!**

## 🚀 Advanced Usage

### Customizing the Data

You can modify the sample data in `supabase-api-manager.js`:
- Edit the `teamsData` array to change team names
- Edit the `playersData` array to add/remove players
- Edit the `gamesData` array to modify the schedule

### Adding More Features

The `SupabaseManager` class is easily extensible:
- Add new methods for additional data operations
- Extend existing methods with more complex queries
- Add validation and business logic as needed

This gives you a **completely automated, production-ready solution** that you can reuse and extend for future projects!
