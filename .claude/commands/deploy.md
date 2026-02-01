# Production Deployment (Two-Step Process)

Execute the full deployment workflow:

## Step 1: Vercel Deployment
Deploy the application code to production:
```bash
vercel --prod
```

Wait for deployment to complete and verify the URL.

## Step 2: Database Promotion
Copy worksheet data from DEV to PROD Supabase:
```bash
npm run db:promote
```

This will:
- Backup PROD database first
- Ask for confirmation
- Copy only NEW worksheets (by slug)

## Post-Deployment Verification
1. Check the production URL works
2. Verify new worksheets appear in library
3. Test a sample worksheet interaction

## Rollback (if needed)
- Vercel: Use Vercel dashboard to rollback to previous deployment
- Database: Restore from backup created by db:promote
