# Code Review

Review the changes for: $ARGUMENTS

## Review Checklist

### 1. Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate

### 2. Security
- [ ] No hardcoded secrets or API keys
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Authentication/authorization checked

### 3. Code Quality
- [ ] Code is readable and self-documenting
- [ ] No unnecessary complexity
- [ ] DRY principle followed
- [ ] Consistent naming conventions
- [ ] No dead code or unused imports

### 4. Testing
- [ ] Tests exist for new functionality
- [ ] Tests are meaningful (not just coverage)
- [ ] Edge cases are tested

### 5. Performance
- [ ] No obvious performance issues
- [ ] No N+1 queries
- [ ] Appropriate caching if needed

## Output Format

```
## Code Review Summary

### Approved / Changes Requested

### Issues Found
1. [Critical/Major/Minor] - Description

### Suggestions
1. Suggestion for improvement

### What's Good
1. Positive feedback
```
