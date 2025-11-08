# Supabase Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in the project details:
   - Project name: `very-professional-blog` (or any name you prefer)
   - Database password: (create a strong password)
   - Region: Choose the closest to your users
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Create the Events Table

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New query"
3. Copy the contents of `supabase-setup.sql` and paste it into the editor
4. Click "Run" to execute the SQL
5. Verify the table was created by going to **Table Editor** → you should see the `events` table

## Step 3: Get Your API Credentials

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (copy from `.env.local.example`)
2. Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Restart your development server if it's running

## Step 5: Test the Connection

After setting up, you can test your analytics by:
1. Running `npm run dev`
2. Visiting your blog
3. Checking the `events` table in Supabase to see tracked events

## Querying Your Data

You can query your analytics data from the Supabase SQL Editor:

```sql
-- Get all page views
SELECT * FROM events WHERE event = 'page-view' ORDER BY timestamp DESC;

-- Get A/B test assignments
SELECT * FROM events WHERE event = 'ab-test-assignment' ORDER BY timestamp DESC;

-- Count events by type
SELECT event, COUNT(*) as count FROM events GROUP BY event;

-- Get events from the last 7 days
SELECT * FROM events 
WHERE timestamp > NOW() - INTERVAL '7 days'
ORDER BY timestamp DESC;
```

## Connecting from Python (for Data Analysis)

Install the Supabase Python client:

```bash
pip install supabase
```

Query your data:

```python
from supabase import create_client
import pandas as pd

# Initialize Supabase client
url = "your_supabase_url"
key = "your_anon_key"
supabase = create_client(url, key)

# Get all events
response = supabase.table("events").select("*").execute()
df = pd.DataFrame(response.data)

# Analyze your data
print(df.head())
print(df['event'].value_counts())
```

