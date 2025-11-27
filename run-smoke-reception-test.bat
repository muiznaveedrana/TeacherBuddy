@echo off
REM Run SMOKE test for Reception year group
echo Starting SMOKE Reception test...
npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE.*Reception" --headed --timeout=180000
