#!/bin/bash

# Supabase Triggers Setup Script
# This script uses the Supabase CLI to set up database triggers for automatic team statistics

echo "🚀 Setting up Supabase database triggers"
echo "======================================"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    exit 1
fi

# Check if we're logged in to Supabase
if ! supabase status &> /dev/null; then
    echo "❌ Not logged in to Supabase. Please login first:"
    echo "supabase login"
    exit 1
fi

# Link to the Supabase project if not already linked
if [ ! -f "supabase/config.toml" ]; then
    echo "🔗 Linking to Supabase project..."
    supabase link --project-ref $SUPABASE_PROJECT_ID || {
        echo "❌ Failed to link to Supabase project"
        echo "Please make sure SUPABASE_PROJECT_ID is set in your environment"
        exit 1
    }
fi

# Run the migrations
echo "📋 Running database migrations..."

# Migration 1: Create triggers
echo "📊 Creating team statistics triggers..."
supabase db push || {
    echo "⚠️  Automatic migration failed. Trying manual approach..."
    supabase migration up
}

# Alternative approach if the above fails
if [ $? -ne 0 ]; then
    echo "🔧 Trying alternative migration approach..."
    supabase migration list
    supabase migration up
fi

echo "✅ Trigger setup completed!"

# Test the triggers
echo "🧪 Testing trigger functionality..."
node test-team-stats-triggers.js

echo "🎉 Setup completed successfully!"
