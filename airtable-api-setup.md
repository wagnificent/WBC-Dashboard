# 🏆 Wooden Bat Classic - Airtable API Setup Guide

## 🚀 Getting Started with Airtable API Management

This guide explains how to set up and use the Airtable API manager for your Wooden Bat Classic tournament.

## 📋 Prerequisites

1. **Airtable Account**: You need an Airtable account (free plan is sufficient)
2. **Node.js**: Install Node.js (v14 or higher) from [nodejs.org](https://nodejs.org)
3. **Airtable Base**: You can create one manually or use an existing one

## 🔑 Step 1: Get Your Airtable API Key

1. Go to [Airtable Account Page](https://airtable.com/account)
2. Scroll down to "API" section
3. Click "Generate API key"
4. Copy the API key (keep it secure!)

## 📊 Step 2: Set Up Your Airtable Base

### Option A: Create a New Base
1. Go to [Airtable](https://airtable.com) and sign in
2. Click "Add a base" → "Start from scratch"
3. Name it "WBC Tournament" or similar
4. Copy the Base ID from the API documentation

### Option B: Use Existing Base
1. Open your existing base
2. Click "Help" → "API documentation"
3. Copy the Base ID from the URL

## 🛠️ Step 3: Configure the API Manager

1. **Install dependencies**:
   ```bash
   npm install axios
   ```

2. **Set up configuration**:
   - Edit `airtable-api-manager.js`
   - Set your API key and Base ID in the config section
   - OR set environment variables:
     ```bash
     export AIRTABLE_API_KEY="your_api_key_here"
     export AIRTABLE_BASE_ID="your_base_id_here"
     ```

## 🚀 Step 4: Run the Complete Setup

```bash
node airtable-api-manager.js setup
```

This will:
- Create all necessary tables (Teams, Players, Games)
- Import sample data from CSV files
- Calculate team statistics
- Create a backup of all data

## 📚 Available Commands

### Complete Setup
```bash
node airtable-api-manager.js setup
```
- Sets up the entire database structure
- Imports all sample data
- Calculates statistics
- Creates backups

### Update Statistics
```bash
node airtable-api-manager.js update-stats
```
- Recalculates all team statistics based on game results
- Updates wins, losses, runs scored/allowed

### Export Data
```bash
node airtable-api-manager.js export
```
- Exports all data to JSON files
- Creates backup in `airtable-backup/` directory

### Help
```bash
node airtable-api-manager.js help
```
- Shows all available commands

## 🎯 Common Operations

### Adding a New Team
```javascript
const { TournamentManager } = require('./airtable-api-manager');

const manager = new TournamentManager();
await manager.addCompleteTeam(
    { Name: "New Team", Wins: 0, Losses: 0, "Runs Scored": 0, "Runs Allowed": 0, "Players Count": 0 },
    [
        { "First Name": "John", "Last Name": "Doe", Age: 18, Hometown: "City", "Tournaments Played": 1 }
        // Add more players...
    ]
);
```

### Adding a New Game
```javascript
await manager.addGameWithStats({
    "Day of Week": "Thursday",
    "Time": "08:00",
    "Stadium Name": "Field 1",
    "Home Team": ["Team 1"],
    "Visiting Team": ["Team 2"],
    "Home Score": 5,
    "Visiting Score": 3,
    "Game Complete": true
});
```

## 🔧 Advanced Configuration

### Environment Variables
For better security, use environment variables:

```bash
# Set variables (Linux/Mac)
export AIRTABLE_API_KEY="your_api_key"
export AIRTABLE_BASE_ID="your_base_id"

# Set variables (Windows)
set AIRTABLE_API_KEY="your_api_key"
set AIRTABLE_BASE_ID="your_base_id"
```

### Custom Configuration
Create a `config.js` file:

```javascript
module.exports = {
    apiKey: process.env.AIRTABLE_API_KEY || 'your_api_key',
    baseId: process.env.AIRTABLE_BASE_ID || 'your_base_id',
    tables: {
        teams: 'Teams',
        players: 'Players',
        games: 'Games'
    }
};
```

## 📊 Data Structure

### Teams Table
- **Name**: Team name (text)
- **Wins**: Win count (number)
- **Losses**: Loss count (number)
- **Runs Scored**: Total runs scored (number)
- **Runs Allowed**: Total runs allowed (number)
- **Players Count**: Number of players (number)

### Players Table
- **First Name**: Player first name (text)
- **Last Name**: Player last name (text)
- **Age**: Player age (number)
- **Hometown**: Player hometown (text)
- **Team**: Linked to Teams table
- **Tournaments Played**: Tournament count (number)

### Games Table
- **Day of Week**: Day of game (single select)
- **Time**: Game time (text)
- **Stadium Name**: Stadium name (text)
- **Home Team**: Linked to Teams table
- **Visiting Team**: Linked to Teams table
- **Home Score**: Home team score (number)
- **Visiting Score**: Visiting team score (number)
- **Game Complete**: Completion status (checkbox)

## 🎯 Best Practices

### Security
- Keep your API key secure
- Don't commit API keys to version control
- Use environment variables for sensitive data

### Performance
- Batch operations when possible
- Be aware of API rate limits (5 requests per second)
- Use pagination for large datasets

### Error Handling
- Check return values for success/failure
- Handle errors gracefully
- Log operations for debugging

## 🆘 Troubleshooting

### Common Issues

**API Key Not Working**
- Double-check the key is correct
- Ensure it has proper permissions
- Regenerate if needed

**Base Not Found**
- Verify the Base ID is correct
- Check that you have access to the base

**Rate Limit Exceeded**
- Wait and try again
- Implement delays between requests
- Batch operations when possible

**Permission Errors**
- Check your Airtable plan permissions
- Ensure API key has proper access
- Verify base sharing settings

## 📞 Support

For help with this system:
1. Check the error messages
2. Review the documentation
3. Contact me for assistance

This system provides a complete, professional solution for managing your Wooden Bat Classic tournament data via Airtable API!
