---
name: Security Review
description: Performs security audits on code changes
---

# Security Review Skill

This skill performs comprehensive security reviews on code.

## Automated Checks

### 1. Secrets Detection
- Scan for hardcoded API keys
- Check for passwords in code
- Detect tokens and credentials
- Verify .env files are gitignored

### 2. Input Validation
- Verify all user inputs are validated
- Check for type coercion issues
- Ensure length limits are enforced
- Validate file uploads (type, size, content)

### 3. SQL Injection Prevention
- Confirm parameterized queries
- Check for raw query string concatenation
- Verify ORM usage is safe

### 4. XSS Prevention
- Check for proper output encoding
- Verify dangerouslySetInnerHTML is avoided
- Confirm sanitization of user content
- Check for CSP headers

### 5. Authentication/Authorization
- Verify auth checks on protected routes
- Check session management
- Confirm CSRF protection
- Verify rate limiting exists

## Review Process

1. **Pre-commit**: Run security linters
2. **Code Review**: Check for common vulnerabilities
3. **Pre-deploy**: Run security scan
4. **Post-deploy**: Monitor for anomalies

## Common Vulnerabilities Checklist

- [ ] No secrets in code
- [ ] Input validation on all endpoints
- [ ] Parameterized database queries
- [ ] Output encoding for user content
- [ ] Auth checks on sensitive routes
- [ ] HTTPS enforced
- [ ] Secure cookie settings
- [ ] Rate limiting enabled
- [ ] Error messages don't leak info
- [ ] Dependencies are up to date

## Tools Integration

- ESLint security plugins
- npm audit for dependencies
- SAST tools for static analysis
- Secret scanners (git-secrets, trufflehog)
