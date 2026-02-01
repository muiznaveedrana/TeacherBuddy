# Run Interactive Tests by Year Group

Run E2E tests for a specific year group.

## Usage
Specify the year group to test: reception, year1, year2, year3, year4, or year5

## Commands

### Reception (51 tests)
```bash
npx playwright test tests/e2e/interactive/reception/ --project=chromium-desktop --workers=4 --timeout=30000
```

### Year 1 (62 tests)
```bash
npx playwright test tests/e2e/interactive/year1/ --project=chromium-desktop --workers=4 --timeout=30000
```

### Year 2 (70 tests)
```bash
npx playwright test tests/e2e/interactive/year2/ --project=chromium-desktop --workers=4 --timeout=30000
```

### Year 3 (217 tests)
```bash
npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4 --timeout=30000
```

### Year 4 (61 tests)
```bash
npx playwright test tests/e2e/interactive/year4/ --project=chromium-desktop --workers=4 --timeout=30000
```

### Year 5 (30 tests)
```bash
npx playwright test tests/e2e/interactive/year5/ --project=chromium-desktop --workers=4 --timeout=30000
```

## Before Running
Kill ports first:
```bash
npx kill-port 3000 && npx kill-port 3001 && npx kill-port 3002
```

## Run Specific Test
```bash
npx playwright test tests/e2e/interactive/{year-group}/{worksheet-slug}.spec.ts --project=chromium-desktop
```
