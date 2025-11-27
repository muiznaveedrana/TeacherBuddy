@echo off
echo ====================================
echo Running Library Save SMOKE Tests in UI Mode
echo ====================================
echo Testing ALL 3 smoke tests:
echo - Reception: Number and Counting > Counting to 10
echo - Year 1: Number and Place Value > Numbers to 20
echo - Year 2: Multiplication and Division > Times Tables 2, 5, 10
echo.
echo Dev server is already running on port 3000
echo.
echo Starting Playwright UI mode...
npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE" --ui

echo.
echo ====================================
echo Test UI closed
echo ====================================
echo.
pause
