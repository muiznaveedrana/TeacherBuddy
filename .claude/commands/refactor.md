# Code Refactoring

Refactor: $ARGUMENTS

## Refactoring Steps

1. **Analyze current implementation**
   - Read the code thoroughly
   - Understand the current behavior
   - Identify code smells

2. **Ensure tests exist**
   - If no tests, write them first
   - Tests protect against regression

3. **Identify improvements**
   - Dead code removal
   - Duplicate code consolidation
   - Complex functions to break down
   - Poor naming to fix
   - Missing type safety

4. **Plan refactoring**
   - Small, incremental changes
   - One thing at a time
   - Keep commits atomic

5. **Refactor**
   - Make changes
   - Run tests after each change
   - Commit frequently

6. **Verify**
   - All tests still pass
   - Behavior unchanged
   - Code is cleaner

## Code Smells to Look For
- Functions over 50 lines
- Deep nesting (> 3 levels)
- Magic numbers/strings
- Duplicated code
- Unused variables/imports
- Any type usage
- Missing error handling
