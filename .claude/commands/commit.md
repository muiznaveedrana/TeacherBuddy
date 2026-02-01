# Smart Commit

Create a well-structured commit for the current changes.

## Steps

1. **Run tests** to ensure nothing is broken
   ```bash
   npx playwright test tests/e2e/ --project=chromium-desktop
   ```

2. **Check what's changed**
   ```bash
   git status
   git diff --stat
   ```

3. **Stage appropriate files**
   - Stage only relevant files
   - NEVER stage .env, secrets, or credentials
   - Review each file before staging

4. **Write descriptive commit message**
   - Use conventional commit format
   - Be specific about what changed and why

## Commit Message Format

```
type(scope): short description

- Detail 1
- Detail 2

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance
