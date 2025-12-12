# Disaster Recovery Plan

## FreeMathPrintable.com - Complete Recovery Guide

**Last Updated:** December 2024
**Recovery Time Objective (RTO):** 2-4 hours
**Recovery Point Objective (RPO):** Last backup (run `npm run db:backup` regularly)

---

## Quick Reference

| Component | Provider | Replaceable? | Recovery Time |
|-----------|----------|--------------|---------------|
| Source Code | GitHub | Yes (any Git host) | 5 minutes |
| Database | Supabase | Yes (any PostgreSQL) | 30 minutes |
| Hosting | Vercel | Yes (Netlify, Railway, etc.) | 15 minutes |
| CDN/Images | ImageKit | Yes (Cloudinary, S3, etc.) | 1-2 hours |
| Domain | Your registrar | Keep access secure | Varies |

---

## What You Have Backed Up

### 1. Source Code (SAFE)
- **Location:** `M:\ClaudeCodeProjects\worksheetgenerator-ai\`
- **Remote:** GitHub repository
- **Contains:** All application code, migrations, scripts

### 2. Database Schema (SAFE)
- **Location:** `supabase/migrations/*.sql`
- **Files:**
  - `20250105_create_library_tables.sql`
  - `20250107_add_rich_content_fields.sql`
  - `20250108_add_user_profiles_and_roles.sql`
  - `20250109_fix_profiles_rls.sql`
  - `20251113230800_add_mascots_to_library.sql`
  - `20251128232208_add_alt_text_to_worksheets.sql`

### 3. Worksheet Data (BACKUP REQUIRED)
- **Location:** `backups/latest/library_worksheets.json`
- **Current count:** ~97 worksheets
- **Run backup:** `npm run db:backup`

### 4. CDN Images (REGENERABLE)
- **Provider:** ImageKit
- **Type:** Worksheet thumbnails only
- **Recovery:** Can regenerate from `html_content` in database

---

## Disaster Scenarios & Recovery Steps

---

### SCENARIO 1: Lost Supabase Access

**Symptoms:** Database connection errors, can't read/write worksheets

**Recovery Steps:**

1. **Create new Supabase project**
   ```
   - Go to https://supabase.com
   - Create new project (free tier works)
   - Note: Project URL and API keys
   ```

2. **Apply database migrations**
   ```bash
   # Option A: Using Supabase CLI
   npx supabase db push

   # Option B: Manual SQL execution
   # Run each file in supabase/migrations/ in order via Supabase SQL Editor
   ```

3. **Restore worksheet data**
   ```bash
   # Use the restore script
   npm run db:restore latest

   # Or manually import backups/latest/library_worksheets.json
   ```

4. **Update environment variables**
   ```bash
   # Edit .env.local with new credentials
   NEXT_PUBLIC_SUPABASE_URL=https://NEW-PROJECT-ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=new-anon-key
   SUPABASE_SERVICE_ROLE_KEY=new-service-role-key
   ```

5. **Update production (Vercel)**
   ```
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Update all SUPABASE_* variables
   - Redeploy
   ```

6. **Regenerate thumbnails** (if needed)
   ```bash
   node scripts/regenerate-thumbnails.js
   ```

**Estimated Time:** 30-45 minutes

---

### SCENARIO 2: Lost Vercel Access

**Symptoms:** Website down, can't deploy

**Recovery Steps:**

1. **Choose alternative hosting**
   - Netlify (recommended - similar to Vercel)
   - Railway
   - AWS Amplify
   - Self-hosted (any Node.js server)

2. **Deploy to Netlify (example)**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Build the project
   npm run build

   # Deploy
   netlify deploy --prod
   ```

3. **Deploy to Railway (example)**
   ```
   - Go to https://railway.app
   - Connect GitHub repository
   - Auto-deploys on push
   ```

4. **Set environment variables in new platform**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/your-id
   IMAGEKIT_PRIVATE_KEY=your-private-key
   IMAGEKIT_PUBLIC_KEY=your-public-key
   ```

5. **Update DNS**
   ```
   - Go to your domain registrar
   - Update A/CNAME records to point to new host
   - Netlify: Add custom domain in dashboard
   - Railway: Add custom domain in settings
   ```

**Estimated Time:** 15-30 minutes

---

### SCENARIO 3: Lost ImageKit Access

**Symptoms:** Thumbnail images broken/missing, 404 errors on images

**Recovery Steps:**

1. **Option A: Create new ImageKit account**
   ```
   - Go to https://imagekit.io
   - Create account (free tier: 20GB bandwidth/month)
   - Get new API credentials
   ```

2. **Option B: Switch to Cloudinary**
   ```
   - Go to https://cloudinary.com
   - Create account
   - Update upload logic in src/lib/imagekit.ts
   ```

3. **Update environment variables**
   ```bash
   NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/NEW-ID
   IMAGEKIT_PRIVATE_KEY=new-private-key
   IMAGEKIT_PUBLIC_KEY=new-public-key
   ```

4. **Regenerate all thumbnails**
   ```bash
   # This script will:
   # 1. Fetch all worksheets from database
   # 2. Render each html_content
   # 3. Take screenshot
   # 4. Upload to new CDN
   # 5. Update thumbnail_url in database

   node scripts/regenerate-thumbnails.js
   ```

**Estimated Time:** 1-2 hours (mostly thumbnail regeneration)

---

### SCENARIO 4: Lost Everything (Complete Disaster)

**Recovery Steps:**

1. **Get source code**
   ```bash
   git clone https://github.com/YOUR-USERNAME/worksheetgenerator-ai.git
   cd worksheetgenerator-ai
   npm install
   ```

2. **Create new Supabase project**
   - Follow Scenario 1, steps 1-3

3. **Create new hosting**
   - Follow Scenario 2, steps 1-4

4. **Create new CDN**
   - Follow Scenario 3, steps 1-4

5. **Update DNS**
   - Point freemathprintable.com to new host

6. **Verify everything works**
   ```bash
   npm run build
   npm run dev  # Test locally first
   ```

**Estimated Time:** 2-4 hours

---

## Backup Procedures

### Manual Backup (Run Weekly)

```bash
# Backup all database tables
npm run db:backup

# This creates:
# - backups/TIMESTAMP/library_worksheets.json
# - backups/TIMESTAMP/library_downloads.json
# - backups/TIMESTAMP/profiles.json
# - backups/latest/ (symlink to latest backup)
```

### What Gets Backed Up

| Table | Contains | Size |
|-------|----------|------|
| library_worksheets | All worksheet content, HTML, metadata | ~97 rows |
| library_downloads | Download statistics | Variable |
| profiles | User profiles | Variable |

### Backup Storage Recommendations

1. **Local:** `backups/` folder (already in place)
2. **Cloud:** Copy to Google Drive / Dropbox monthly
3. **Git:** Backup JSON files are gitignored - consider committing monthly snapshots

---

## Environment Variables Reference

```bash
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# ImageKit (CDN)
NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/xxx
IMAGEKIT_PRIVATE_KEY=private_xxx
IMAGEKIT_PUBLIC_KEY=public_xxx

# OpenAI (Worksheet Generation)
OPENAI_API_KEY=sk-xxx

# Google (Optional - Analytics)
NEXT_PUBLIC_GA_ID=G-xxx
```

---

## Important Files & Locations

```
worksheetgenerator-ai/
├── backups/
│   ├── latest/                    # Most recent backup
│   │   ├── library_worksheets.json
│   │   ├── library_downloads.json
│   │   └── profiles.json
│   └── TIMESTAMP/                 # Historical backups
├── supabase/
│   └── migrations/                # Database schema (6 files)
├── scripts/
│   ├── backup-database.js         # npm run db:backup
│   ├── restore-database.js        # npm run db:restore
│   ├── promote-to-production.js   # npm run db:promote
│   └── regenerate-thumbnails.js   # Recreate CDN images
├── .env.local                     # DEV credentials (DO NOT COMMIT)
└── docs/
    └── DISASTER-RECOVERY.md       # This document
```

---

## Contact & Access Information

Store these securely (password manager recommended):

| Service | Dashboard URL | Account Email |
|---------|---------------|---------------|
| Supabase DEV | https://supabase.com/dashboard/project/lyvtcecjatlnrjhtovwb | your-email |
| Supabase PROD | https://supabase.com/dashboard/project/iiatpmoracqxavcrvcrk | your-email |
| Vercel | https://vercel.com/dashboard | your-email |
| ImageKit | https://imagekit.io/dashboard | your-email |
| GitHub | https://github.com/YOUR-USERNAME | your-email |
| Domain Registrar | varies | your-email |

---

## Recovery Checklist

Use this checklist during recovery:

- [ ] Source code accessible (git clone works)
- [ ] Database created and migrations applied
- [ ] Worksheet data restored from backup
- [ ] Environment variables configured
- [ ] Application builds successfully (`npm run build`)
- [ ] Application runs locally (`npm run dev`)
- [ ] Deployed to hosting platform
- [ ] DNS pointing to new host
- [ ] HTTPS certificate active
- [ ] Thumbnails regenerated (if CDN changed)
- [ ] All pages load correctly
- [ ] Worksheet download works
- [ ] Admin functions work

---

## Prevention Tips

1. **Run backups weekly:** `npm run db:backup`
2. **Store backups offsite:** Google Drive, Dropbox, or external drive
3. **Use password manager:** Store all API keys and credentials
4. **Enable 2FA:** On all service accounts (Supabase, Vercel, GitHub, ImageKit)
5. **Document changes:** Keep this recovery doc updated
6. **Test recovery annually:** Do a dry-run to verify backup restoration works

---

## Summary

**You are well-protected because:**

1. Source code is in Git (recoverable anywhere)
2. Database schema is in migration files (recreatable)
3. Worksheet content is backed up as JSON (restorable)
4. CDN images are regenerable from HTML content
5. All services are replaceable with alternatives

**The only thing you CANNOT recover without backup:**
- Worksheet data (if you lose both Supabase AND local backup)

**Action Item:** Run `npm run db:backup` weekly and copy `backups/latest/` to cloud storage monthly.
