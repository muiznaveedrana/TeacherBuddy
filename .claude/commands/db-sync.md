# Database Sync Operations

Manage Supabase database operations between DEV and PROD.

## Promote DEV to PROD
Copy new worksheets from DEV to PROD:
```bash
npm run db:promote
```
- Backs up PROD first
- Asks for confirmation
- Only copies NEW worksheets (by slug)

## Backup Operations

### Backup DEV Database
```bash
node scripts/backup-database.js
```

### Backup PROD Database
```bash
node scripts/backup-prod-database.js
```

### Restore Database
```bash
node scripts/restore-database.js
```

## Supabase CLI Commands

### Check Connection
```bash
npx supabase db execute --project-ref <ref> "SELECT count(*) FROM worksheets"
```

### List Worksheets
```bash
npx supabase db execute --project-ref <ref> "SELECT slug, year_group FROM worksheets ORDER BY created_at DESC LIMIT 10"
```

## Environment
- Always use DEV for development
- PROD is read-only except during promotion
- Never run destructive queries on PROD without backup
