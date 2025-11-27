@echo off
echo ====================================
echo Running Library Save SMOKE Tests
echo ====================================
echo Testing ALL 3 smoke tests:
echo - Reception: Number and Counting > Counting to 10
echo - Year 1: Number and Place Value > Numbers to 20
echo - Year 2: Multiplication and Division > Times Tables 2, 5, 10
echo.

REM Kill any processes on ports 3000-3010
echo Cleaning up ports...
for /L %%i in (3000,1,3010) do (
    npx kill-port %%i 2>nul
)
echo.

echo Starting dev server on port 3000...
start /B npm run dev

echo Waiting for server to be ready...
timeout /t 15 /nobreak >nul

echo Running ALL SMOKE tests (3 tests)...
npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE" --reporter=list

echo.
echo ====================================
echo Test run complete!
echo ====================================
echo.
pause
