# 🏆 Wooden Bat Classic - Airtable Setup Guide

## 📋 Step-by-Step Airtable Base Setup

### 1. **Create a New Airtable Base**
1. Go to [Airtable.com](https://airtable.com) and sign in
2. Click "Add a base" → "Start from scratch"
3. Name your base "WBC Tournament" or similar

### 2. **Create Teams Table**
1. Click "+ Add table" and name it "Teams"
2. Add these fields:
   - **Name** (Single line text) - Team name
   - **Wins** (Number) - Win count
   - **Losses** (Number) - Loss count
   - **Runs Scored** (Number) - Total runs scored
   - **Runs Allowed** (Number) - Total runs allowed
   - **Players Count** (Number) - Number of players on team
   - **Win Percentage** (Formula): `ROUND(Wins / (Wins + Losses), 3)`

### 3. **Create Players Table**
1. Click "+ Add table" and name it "Players"
2. Add these fields:
   - **First Name** (Single line text)
   - **Last Name** (Single line text)
   - **Age** (Number)
   - **Hometown** (Single line text)
   - **Team** (Link to Teams table)
   - **Tournaments Played** (Number)
   - **Full Name** (Formula): `First Name & " " & Last Name`

### 4. **Create Games Table**
1. Click "+ Add table" and name it "Games"
2. Add these fields:
   - **Day of Week** (Single select: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday)
   - **Time** (Single line text) - Format: "08:00"
   - **Stadium Name** (Single line text)
   - **Home Team** (Link to Teams table)
   - **Visiting Team** (Link to Teams table)
   - **Home Score** (Number)
   - **Visiting Score** (Number)
   - **Game Complete** (Checkbox)
   - **Winner** (Formula): `IF(Game Complete, IF(Home Score > Visiting Score, Home Team, IF(Visiting Score > Home Score, Visiting Team, "Tie")), "")`

### 5. **Create Useful Views**

#### Teams Table Views:
- **All Teams** (Grid view) - Show all fields
- **Standings** (Grid view) - Sort by Wins (descending)
- **Stats Summary** (Grid view) - Show Name, Wins, Losses, Win Percentage

#### Players Table Views:
- **All Players** (Grid view) - Show all fields
- **By Team** (Grid view) - Group by Team
- **Roster** (Grid view) - Show Full Name, Age, Hometown, Team

#### Games Table Views:
- **All Games** (Grid view) - Show all fields
- **By Day** (Grid view) - Group by Day of Week
- **Schedule** (Grid view) - Sort by Day of Week, then Time
- **Completed Games** (Grid view) - Filter: Game Complete = true

### 6. **Import Sample Data**

#### Import Teams Data:
1. Go to Teams table
2. Click "..." → "Import data"
3. Select the CSV file or copy/paste from the data below

#### Import Players Data:
1. Go to Players table
2. Click "..." → "Import data"
3. Select the CSV file or copy/paste from the data below

#### Import Games Data:
1. Go to Games table
2. Click "..." → "Import data"
3. Select the CSV file or copy/paste from the data below

### 7. **Set Up Sharing (Optional)**
1. Click "Share" button in top-right
2. Configure sharing settings for your team members
3. Set appropriate permissions (Editor or Commenter)

## 🎯 Tips for Best Results

### Data Entry Tips:
- **Consistent Formatting**: Use same format for times (HH:MM)
- **Team Names**: Use exact same names in all tables
- **Link Fields**: Always use the link fields to connect tables
- **Game Results**: Update scores and check "Game Complete" when done

### View Customization:
- **Color Coding**: Add color to different days or teams
- **Filtering**: Create filters for specific teams or days
- **Sorting**: Sort games by time for daily schedules

### Maintenance:
- **Regular Backups**: Export data periodically
- **Data Validation**: Check links between tables
- **Cleanup**: Remove old games after tournament

## 📊 Sample Data Format

### Teams Data:
```
Name,Wins,Losses,Runs Scored,Runs Allowed,Players Count
Red Sox,0,0,0,0,0
Cubs,0,0,0,0,0
Dodgers,0,0,0,0,0
Braves,0,0,0,0,0
Astros,0,0,0,0,0
Mets,0,0,0,0,0
```

### Players Data:
```
First Name,Last Name,Age,Hometown,Team,Tournaments Played
John,Smith,18,Boston, MA,Red Sox,1
Mike,Johnson,17,New York, NY,Red Sox,2
David,Wilson,19,Chicago, IL,Red Sox,1
Robert,Brown,18,Los Angeles, CA,Red Sox,3
James,Davis,17,Houston, TX,Red Sox,1
```

### Games Data:
```
Day of Week,Time,Stadium Name,Home Team,Visiting Team,Home Score,Visiting Score,Game Complete
Monday,08:00,Field 1,Red Sox,Cubs,5,3,TRUE
Monday,10:00,Field 2,Dodgers,Braves,4,2,TRUE
Monday,12:00,Field 1,Astros,Mets,6,1,TRUE
```

## 🔧 Advanced Setup (Optional)

### Automations:
- Create automation to update team stats when games are completed
- Set up notifications for upcoming games
- Create summary reports automatically

### Integrations:
- Connect to Google Calendar for schedule
- Set up email notifications
- Create printable PDF reports

This setup provides a complete, user-friendly system for managing your Wooden Bat Classic tournament!
