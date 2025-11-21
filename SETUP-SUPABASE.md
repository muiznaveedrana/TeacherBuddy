# Supabase Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Get Your Supabase API Keys

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/iiatpmoracqxavcrvcrk/settings/api

2. **Copy Your API Keys**
   You'll see two keys on this page:

   - **Project URL**: `https://iiatpmoracqxavcrvcrk.supabase.co` ✅ (Already filled in `.env.local`)
   - **anon public key**: Copy this (starts with `eyJhbGc...`)
   - **service_role key**: Copy this (starts with `eyJhbGc...`)

### Step 2: Update .env.local File

Open `.env.local` and replace the placeholder values:

```bash
# Replace these two lines:
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# With your actual keys from Step 1
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_actual_service_role_key
```

### Step 3: Verify Database Setup

Run this command to check if your database tables exist:

```bash
npx supabase db pull
```

If tables don't exist, run the migrations:

```bash
# Apply migrations from supabase/migrations/
npx supabase db push
```

### Step 4: Test the Connection

Restart your dev server:

```bash
# Kill existing server
npx kill-port 3000

# Start fresh
npm run dev
```

Then visit: http://localhost:3000/library

✅ **Success**: You should see the library page load without errors
❌ **Error**: If you see "Unhandled Runtime Error", check that your API keys are correct

---

## Optional: Additional API Keys

### Anthropic Claude API (Required for Worksheet Generation)

1. Get key from: https://console.anthropic.com/settings/keys
2. Update in `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-...
   ```

### Google Gemini API (For Prompt Engineering)

1. Get key from: https://aistudio.google.com/app/apikey
2. Update in `.env.local`:
   ```
   GEMINI_API_KEY=AIza...
   ```

---

## Troubleshooting

### Error: "supabaseUrl is required"

**Fix**: Make sure `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`

### Error: "Invalid API key"

**Fix**:
1. Go to https://supabase.com/dashboard/project/iiatpmoracqxavcrvcrk/settings/api
2. Copy the keys again
3. Make sure there are no extra spaces or quotes

### Library Page Returns 500 Error

**Fix**: Check that database tables exist:
```bash
npx supabase db pull
```

---

## Quick Commands

```bash
# Check Supabase connection
npx supabase projects list

# Pull latest database schema
npx supabase db pull

# Apply migrations
npx supabase db push

# Reset local database (careful!)
npx supabase db reset
```

---

## Status Checklist

- [x] `.env.local` file created
- [x] Supabase URL configured
- [ ] API keys added (you need to do this manually)
- [ ] Database tables verified
- [ ] Connection tested

**Next Step**: Get your API keys from the Supabase dashboard and update `.env.local`
