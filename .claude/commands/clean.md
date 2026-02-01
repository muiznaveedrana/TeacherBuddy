# Clean Environment

Prepare the development environment by cleaning caches and killing ports.

## Full Clean (Recommended before build)

### Step 1: Kill All Ports (3000-3010)
```bash
for port in 3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010; do npx kill-port $port; done
```

Windows alternative:
```powershell
3000..3010 | ForEach-Object { npx kill-port $_ }
```

### Step 2: Remove .next Directory
```bash
rm -rf .next
```

Windows alternative:
```powershell
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
```

### Step 3: Clear Node Cache (Optional)
```bash
rm -rf node_modules/.cache
```

## Quick Clean (Just ports)
```bash
npx kill-port 3000 && npx kill-port 3001 && npx kill-port 3002
```

## After Clean
Start dev server on port 3000:
```bash
npm run dev
```

## When to Clean
- Before running build
- When port 3000 is already in use
- When experiencing permission issues with trace files
- Before running E2E tests
