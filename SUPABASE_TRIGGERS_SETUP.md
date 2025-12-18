# Supabase Database Triggers Setup Guide

This guide explains how to set up database triggers for automatic team statistics calculation using the Supabase CLI.

## Overview

The database triggers automatically calculate and update team statistics (wins, losses, runs scored, runs allowed) whenever games are added or modified. This ensures data consistency and eliminates manual calculation errors.

## Prerequisites

1. **Supabase CLI installed**: `npm install -g supabase`
2. **Supabase account**: You need a Supabase project
3. **Project credentials**: Your `.env` file should contain `SUPABASE_URL` and `SUPABASE_KEY`

## Setup Instructions

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 2: Login to Supabase

```bash
supabase login
```

### Step 3: Link to Your Project

```bash
supabase link --project-ref your-project-id
```

You can find your project ID in your Supabase dashboard URL or settings.

### Step 4: Run the Migrations

```bash
# Navigate to your project directory
cd path/to/your/project

# Run the migrations
supabase db push
```

### Step 5: Verify the Setup

```bash
# Run the test script
node test-team-stats-triggers.js
```

## Manual Setup (Alternative)

If the automatic migration doesn't work, you can run the SQL manually:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL commands:

```sql
-- Create the trigger function
CREATE OR REPLACE FUNCTION update_team_stats_from_game()
RETURNS TRIGGER AS $$
DECLARE
    home_team_wins INTEGER;
    home_team_losses INTEGER;
    visiting_team_wins INTEGER;
    visiting_team_losses INTEGER;
    home_team_runs_scored INTEGER;
    home_team_runs_allowed INTEGER;
    visiting_team_runs_scored INTEGER;
    visiting_team_runs_allowed INTEGER;
BEGIN
    -- Only process if game is complete
    IF NEW.game_complete = TRUE THEN
        -- Calculate home team stats
        SELECT
            COUNT(*) FILTER (WHERE g.home_score > g.visiting_score) AS wins,
            COUNT(*) FILTER (WHERE g.home_score < g.visiting_score) AS losses,
            COALESCE(SUM(g.home_score), 0) AS runs_scored,
            COALESCE(SUM(g.visiting_score), 0) AS runs_allowed
        INTO
            home_team_wins, home_team_losses, home_team_runs_scored, home_team_runs_allowed
        FROM games g
        WHERE g.home_team_id = NEW.home_team_id AND g.game_complete = TRUE;

        -- Update home team
        UPDATE teams
        SET
            wins = home_team_wins,
            losses = home_team_losses,
            runs_scored = home_team_runs_scored,
            runs_allowed = home_team_runs_allowed
        WHERE id = NEW.home_team_id;

        -- Calculate visiting team stats
        SELECT
            COUNT(*) FILTER (WHERE g.visiting_score > g.home_score) AS wins,
            COUNT(*) FILTER (WHERE g.visiting_score < g.home_score) AS losses,
            COALESCE(SUM(g.visiting_score), 0) AS runs_scored,
            COALESCE(SUM(g.home_score), 0) AS runs_allowed
        INTO
            visiting_team_wins, visiting_team_losses, visiting_team_runs_scored, visiting_team_runs_allowed
        FROM games g
        WHERE g.visiting_team_id = NEW.visiting_team_id AND g.game_complete = TRUE;

        -- Update visiting team
        UPDATE teams
        SET
            wins = visiting_team_wins,
            losses = visiting_team_losses,
            runs_scored = visiting_team_runs_scored,
            runs_allowed = visiting_team_runs_allowed
        WHERE id = NEW.visiting_team_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for game insertions
CREATE TRIGGER update_team_stats_on_insert
AFTER INSERT ON games
FOR EACH ROW
EXECUTE FUNCTION update_team_stats_from_game();

-- Create trigger for game updates
CREATE TRIGGER update_team_stats_on_update
AFTER UPDATE ON games
FOR EACH ROW
EXECUTE FUNCTION update_team_stats_from_game();

-- Calculate initial statistics for existing data
CREATE OR REPLACE FUNCTION calculate_initial_team_stats()
RETURNS VOID AS $$
DECLARE
    team_record RECORD;
BEGIN
    FOR team_record IN SELECT id FROM teams LOOP
        UPDATE teams
        SET wins = (
            SELECT COUNT(*)
            FROM games
            WHERE (home_team_id = team_record.id AND home_score > visiting_score AND game_complete = TRUE)
               OR (visiting_team_id = team_record.id AND visiting_score > home_score AND game_complete = TRUE)
        ),
        losses = (
            SELECT COUNT(*)
            FROM games
            WHERE (home_team_id = team_record.id AND home_score < visiting_score AND game_complete = TRUE)
               OR (visiting_team_id = team_record.id AND visiting_score < home_score AND game_complete = TRUE)
        ),
        runs_scored = (
            SELECT COALESCE(SUM(CASE
                WHEN home_team_id = team_record.id THEN home_score
                WHEN visiting_team_id = team_record.id THEN visiting_score
                ELSE 0
            END), 0)
            FROM games
            WHERE game_complete = TRUE
        ),
        runs_allowed = (
            SELECT COALESCE(SUM(CASE
                WHEN home_team_id = team_record.id THEN visiting_score
                WHEN visiting_team_id = team_record.id THEN home_score
                ELSE 0
            END), 0)
            FROM games
            WHERE game_complete = TRUE
        )
        WHERE id = team_record.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the initial calculation
SELECT calculate_initial_team_stats();
```

## Troubleshooting

### Common Issues and Solutions

**Issue: "Permission denied" errors**
- Solution: Make sure you're using the correct Supabase credentials with sufficient permissions
- Check that your service role has proper database permissions

**Issue: Triggers not working**
- Solution: Verify the triggers were created by checking in your Supabase dashboard
- Go to Table Editor → games table → Triggers section

**Issue: Statistics not updating**
- Solution: Make sure `game_complete` is set to `true` when adding/updating games
- Check that the trigger function exists and has no syntax errors

**Issue: Migration failures**
- Solution: Try running `supabase migration up` instead of `supabase db push`
- Check the migration status with `supabase migration list`

## How It Works

### Trigger Logic

1. **On Game Insertion**: When a new game is added with `game_complete = true`, the trigger:
   - Calculates wins/losses for both teams
   - Updates runs scored and allowed
   - Applies the changes to the teams table

2. **On Game Updates**: When a game is modified, the trigger:
   - Recalculates all statistics for both teams
   - Ensures the statistics reflect the current game results

### Performance Considerations

- Triggers execute at the database level, so they're very efficient
- The calculations only run when `game_complete = true`
- Statistics are recalculated for all games each time, ensuring accuracy

## Verification

To verify the triggers are working:

1. Add a new game through your application
2. Check the team statistics in the database
3. Update an existing game result
4. Verify the statistics are recalculated correctly

## Support

If you encounter issues, check:
- The Supabase CLI documentation: https://supabase.com/docs/guides/cli
- Your project's SQL Editor for any errors
- The Supabase community forums for similar issues

The triggers should now automatically maintain accurate team statistics as games are played and results are entered!
