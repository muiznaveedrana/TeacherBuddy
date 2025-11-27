@echo off
setlocal enabledelayedexpansion

echo ================================================================
echo SMOKE TEST VERIFICATION AND EXECUTION
echo ================================================================
echo.

REM Step 1: Check if auth state file exists
echo [1/4] Checking authentication state...
if exist "tests\e2e\.auth-state.json" (
    echo    ✓ Auth state file exists
    for %%A in ("tests\e2e\.auth-state.json") do (
        echo    ✓ File size: %%~zA bytes
    )
) else (
    echo    ⚠ Auth state file NOT found
    echo    ℹ Will be created automatically on first run
)
echo.

REM Step 2: Check if dev server is running
echo [2/4] Checking dev server on port 3000...
netstat -ano | findstr ":3000" >nul 2>&1
if !errorlevel! EQU 0 (
    echo    ✓ Dev server is running on port 3000
) else (
    echo    ✗ Dev server NOT running on port 3000
    echo    ℹ Please start dev server first: npm run dev
    echo.
    pause
    exit /b 1
)
echo.

REM Step 3: Quick connectivity test
echo [3/4] Testing server connectivity...
curl -s -o nul -w "%%{http_code}" http://localhost:3000 > temp_status.txt 2>nul
set /p HTTP_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "!HTTP_STATUS!" == "200" (
    echo    ✓ Server responding with HTTP 200
) else if "!HTTP_STATUS!" == "307" (
    echo    ✓ Server responding with HTTP 307 ^(redirect^)
) else if "!HTTP_STATUS!" == "" (
    echo    ⚠ Could not connect to server
    echo    ℹ Make sure http://localhost:3000 is accessible
) else (
    echo    ⚠ Server returned HTTP !HTTP_STATUS!
)
echo.

REM Step 4: Display test configuration
echo [4/4] Test Configuration
echo    • Test Suite: Quick Smoke Test - Sample Configurations
echo    • Test Count: 3 tests
echo    • Tests:
echo      1. Reception ^> Number and Counting ^> Counting to 10
echo      2. Year 1 ^> Number and Place Value ^> Numbers to 20
echo      3. Year 2 ^> Multiplication and Division ^> Times Tables 2, 5, 10
echo    • Timeout: 90 seconds per test
echo    • Mode: UI Mode ^(Interactive^)
echo.

echo ================================================================
echo STARTING PLAYWRIGHT UI MODE
echo ================================================================
echo.
echo Instructions:
echo  • UI will open in a new window
echo  • Click the play button to run tests
echo  • Watch real-time execution
echo  • Click on failed tests to debug
echo  • Press Ctrl+C to exit when done
echo.
echo Starting in 3 seconds...
timeout /t 3 /nobreak >nul

REM Run the tests in UI mode
npx playwright test tests/e2e/comprehensive-library-save.spec.ts --grep "SMOKE" --ui

echo.
echo ================================================================
echo TEST RUN COMPLETE
echo ================================================================
echo.
echo Check the results in the Playwright UI
echo.
echo Common Issues:
echo  • Auth state invalid: Delete tests\e2e\.auth-state.json and re-run
echo  • Dropdown timeout: Check if year-group options are rendering
echo  • Generation timeout: Increase timeout in test ^(currently 90s^)
echo.
pause
