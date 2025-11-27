@echo off
echo ========================================
echo Running SMOKE Test for Reception
echo ========================================
echo.

REM Run only the Reception smoke test
npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE.*Reception" --timeout=40000

echo.
echo ========================================
echo Test Complete
echo ========================================
pause
