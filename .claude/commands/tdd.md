# Test-Driven Development

For feature: $ARGUMENTS

## TDD Workflow

1. **Write failing test first**
   - Create test file if it doesn't exist
   - Write test that describes expected behavior
   - Run test to confirm it fails

2. **Implement minimum code to pass**
   - Write only enough code to make the test pass
   - No extra features or optimizations yet

3. **Refactor for clarity**
   - Clean up the code
   - Improve naming
   - Remove duplication

4. **Ensure all tests pass**
   - Run full test suite
   - Fix any regressions

5. **Add edge case tests**
   - Null/undefined inputs
   - Empty arrays/objects
   - Boundary conditions
   - Error scenarios

## Commands
- Run tests: `npx playwright test`
- Run specific test: `npx playwright test [test-file]`
- Run with UI: `npx playwright test --ui`
