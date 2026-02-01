---
name: Deployment Checklist
description: Full deployment workflow for Vercel + Supabase
---

# Deployment Checklist

Complete workflow for deploying to production.

## Pre-Deployment Checks

### 1. Code Quality
- [ ] All tests passing locally
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Lint clean (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### 2. Environment
- [ ] Ports 3000-3010 killed
- [ ] .next directory cleaned
- [ ] No uncommitted changes

### 3. Database
- [ ] DEV database has latest worksheets
- [ ] Worksheets tested and quality-assessed
- [ ] Answer keys verified

## Deployment Process

### Step 1: Deploy to Vercel
```bash
vercel --prod
```

**Wait for:**
- Build to complete
- Deployment URL to be live
- Quick smoke test on production URL

### Step 2: Promote Database
```bash
npm run db:promote
```

**This automatically:**
1. Backs up PROD database
2. Asks for confirmation
3. Copies NEW worksheets only (by slug)

### Step 3: Verify Production
- [ ] Production URL loads
- [ ] New worksheets visible in library
- [ ] Sample worksheet interaction works
- [ ] No console errors

## Rollback Procedures

### Vercel Rollback
1. Go to Vercel Dashboard
2. Find previous deployment
3. Click "Promote to Production"

### Database Rollback
```bash
node scripts/restore-database.js
```
Use backup created during db:promote

## Two Separate Deployments

| Component | Tool | What It Deploys |
|-----------|------|-----------------|
| Application | Vercel | Next.js app, API routes, UI |
| Data | Supabase | Worksheets, user data |

## Common Issues

### Port in Use
```bash
npx kill-port 3000
```

### Build Fails
```bash
rm -rf .next && npm run build
```

### Worksheets Not Appearing
- Check db:promote ran successfully
- Verify worksheet slugs are unique
- Check Supabase logs for errors
