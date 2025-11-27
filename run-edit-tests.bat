@echo off
echo ====================================
echo Running Edit E2E Tests (FIXED VERSION)
echo ====================================
echo Fixed 11 failing tests - See EDIT-TESTS-FIX-SUMMARY.md
echo.

REM Kill any processes on ports 3000-3010
echo Cleaning up ports...
for /L %%i in (3000,1,3010) do (
    npx kill-port %%i 2>nul
)
echo.

echo Running all edit tests...
npx playwright test tests/e2e/edit.spec.ts --reporter=list

echo.
echo ====================================
echo Test run complete!
echo ====================================
echo.
echo To run with UI mode: npx playwright test tests/e2e/edit.spec.ts --ui
echo To run headed: npx playwright test tests/e2e/edit.spec.ts --headed
echo To debug specific test: npx playwright test tests/e2e/edit.spec.ts -g "TEST-ID"
echo.
pause
