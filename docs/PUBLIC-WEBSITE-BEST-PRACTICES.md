# Public-Facing Website Best Practices

## Overview
This document outlines security, privacy, UX, and legal best practices for public-facing websites, specifically for FreeMathPrintable.com.

**Last Updated:** November 12, 2024

---

## 1. Access Control & Security

### 1.1 Principle of Least Privilege
**Rule:** Unauthorized users should ONLY see public content

**Current Issues Fixed:**
- ❌ **Before:** Footer linked to `/name-lists` and `/admin/library` for all users
- ✅ **After:** Protected routes removed from public footer

**Implementation Checklist:**
- [ ] Implement route protection middleware (Next.js middleware.ts)
- [ ] Add authentication checks for protected routes
- [ ] Return 401/403 errors for unauthorized access attempts
- [ ] Hide authenticated navigation for anonymous users
- [ ] Remove `<QuickAdminAccess />` from public pages

### 1.2 Route Protection
```typescript
// middleware.ts example
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const protectedRoutes = ['/name-lists', '/admin', '/profile', '/subscription']
  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const token = request.cookies.get('session-token')

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/name-lists/:path*', '/admin/:path*', '/profile/:path*', '/subscription/:path*']
}
```

### 1.3 API Security
- **Rate Limiting:** Prevent abuse (e.g., 100 requests/15min per IP)
- **Input Validation:** Sanitize all user inputs
- **CORS:** Restrict to your domain only
- **CSRF Protection:** Use tokens for state-changing operations
- **SQL Injection Prevention:** Use parameterized queries (already using Supabase)
- **XSS Prevention:** Sanitize HTML output

---

## 2. Privacy & Data Protection (UK GDPR Compliance)

### 2.1 Legal Requirements
✅ **Completed:**
- Privacy Policy created (`/privacy`)
- Terms of Service created (`/terms`)
- UK GDPR compliance sections included
- ICO contact information provided

### 2.2 Cookie Consent (REQUIRED)
**Action Needed:** Implement cookie consent banner

**UK GDPR Requirements:**
- Must obtain explicit consent BEFORE setting non-essential cookies
- Must allow users to opt-out easily
- Must provide granular control (analytics, marketing, functional)

**Recommended Implementation:**
```typescript
// Use a library like react-cookie-consent
import CookieConsent from "react-cookie-consent";

<CookieConsent
  location="bottom"
  buttonText="Accept All"
  declineButtonText="Reject Non-Essential"
  enableDeclineButton
  cookieName="freemathprintable-consent"
  style={{ background: "#1e293b" }}
  buttonStyle={{ background: "#3b82f6", color: "#fff", fontSize: "14px" }}
  declineButtonStyle={{ background: "#64748b", color: "#fff", fontSize: "14px" }}
  expires={365}
>
  We use cookies to improve your experience. Essential cookies are required for the site to function.
  <a href="/privacy" style={{ color: "#60a5fa" }}>Learn more</a>
</CookieConsent>
```

### 2.3 Data Minimization
**Principle:** Only collect data you actually need

**Current Best Practices:**
- ✅ Student names stored locally per user (not shared)
- ✅ No tracking of minors directly
- ✅ Clear data retention policy (30 days after account deletion)

**Recommendations:**
- Make email the only required field for signup
- Make school name optional
- Don't log worksheet content (only metadata)
- Anonymous usage analytics (aggregate only)

### 2.4 User Rights Implementation
**Required Features:**
- [ ] Account deletion (Right to Erasure)
- [ ] Data export (Right to Portability) - JSON export of user data
- [ ] Data correction (Right to Rectification) - Edit profile
- [ ] Access request (Right to Access) - Download all personal data
- [ ] Consent withdrawal (Unsubscribe from emails)

---

## 3. User Experience (UX) Best Practices

### 3.1 Navigation for Unauthenticated Users
**Public Navigation Should Include:**
- ✅ Home
- ✅ Features
- ✅ How It Works
- ✅ Browse Library (free access)
- ✅ Login/Sign Up buttons

**Should NOT Include:**
- ❌ Name Lists
- ❌ Admin Dashboard
- ❌ Subscription Management
- ❌ Usage Analytics
- ❌ User profile dropdown

### 3.2 Clear Call-to-Actions (CTAs)
**Best Practices:**
- Primary CTA: "Browse Free Library" (no login required)
- Secondary CTA: "Sign Up" (for custom generation features)
- Use action-oriented language ("Get Started", "Try Free")
- Make value proposition clear ("No Credit Card Required")

### 3.3 Mobile Responsiveness
✅ **Already Implemented:**
- Touch-friendly buttons (min 44px height)
- Responsive grid layouts
- Mobile menu
- Touch-optimized forms

### 3.4 Accessibility (WCAG 2.1 AA Compliance)
**Checklist:**
- [ ] All images have alt text
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Keyboard navigation support
- [ ] ARIA labels for interactive elements
- [ ] Screen reader testing
- [ ] Focus indicators visible
- [ ] Skip to main content link

---

## 4. SEO & Performance

### 4.1 SEO Best Practices
✅ **Already Implemented:**
- Semantic HTML (h1, h2, h3 hierarchy)
- Meta descriptions
- Open Graph tags
- Keyword optimization
- Schema.org markup (recommended to add)

**Recommendations:**
```typescript
// Add JSON-LD structured data for better search results
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FreeMathPrintable.com",
  "description": "Free math printables for UK primary schools",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  }
}
</script>
```

### 4.2 Performance Optimization
**Core Web Vitals Goals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Current Optimizations:**
- ✅ Next.js Image optimization
- ✅ Code splitting
- ✅ Font optimization (Inter font)

**Additional Recommendations:**
- [ ] Lazy load images below the fold
- [ ] Preload critical fonts
- [ ] Minimize JavaScript bundle size
- [ ] Enable compression (Gzip/Brotli)
- [ ] Use CDN for static assets (already using ImageKit)

---

## 5. Legal & Compliance

### 5.1 Required Pages
✅ **Completed:**
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

**Additional Recommended Pages:**
- [ ] Cookie Policy (can be part of Privacy Policy)
- [ ] Accessibility Statement
- [ ] Content Licensing Information

### 5.2 Copyright & Attribution
**Best Practices:**
- ✅ Copyright notice in footer
- Add copyright year auto-update: `© ${new Date().getFullYear()}`
- Include attribution for open-source libraries (if applicable)
- Clearly state license for downloaded worksheets

### 5.3 COPPA Compliance (if applicable)
**Our Status:** Service is for teachers/parents, NOT directly for children
- ✅ No direct collection of children's personal information
- ✅ Student names stored locally per teacher account
- ✅ Terms require users to be 18+

---

## 6. Content Security

### 6.1 Content Security Policy (CSP)
**Recommended Implementation:**
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https://ik.imagekit.io;
      font-src 'self' data:;
      connect-src 'self' https://api.freemathprintable.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  }
]
```

### 6.2 HTTPS Enforcement
- ✅ Vercel automatically enforces HTTPS
- Ensure all external resources load via HTTPS
- Set `Strict-Transport-Security` header

---

## 7. Authentication & Session Management

### 7.1 Secure Authentication
**Best Practices:**
- Use OAuth 2.0 / OpenID Connect (Google, Microsoft)
- Implement magic link email authentication (passwordless)
- If using passwords:
  - Minimum 8 characters
  - Require uppercase, lowercase, number, special char
  - Use bcrypt/argon2 for hashing (handled by Supabase Auth)
  - Implement rate limiting on login attempts

### 7.2 Session Management
**Security Requirements:**
- [ ] Secure session cookies (`HttpOnly`, `Secure`, `SameSite=Strict`)
- [ ] Session timeout after inactivity (30 minutes recommended)
- [ ] Logout functionality that clears all session data
- [ ] Remember Me functionality (optional, 30-day token)

**Example:**
```typescript
// Set secure cookie
res.setHeader('Set-Cookie', `session=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${60*60*24*30}; Path=/`)
```

---

## 8. Error Handling & Monitoring

### 8.1 User-Friendly Error Pages
**Required Pages:**
- [ ] 404 - Page Not Found (with helpful navigation)
- [ ] 500 - Server Error (generic message, don't expose stack traces)
- [ ] 403 - Forbidden (for unauthorized access attempts)
- [ ] 503 - Service Unavailable (during maintenance)

### 8.2 Logging & Monitoring
**What to Log:**
- API errors and failures
- Authentication attempts (failed logins)
- Rate limit violations
- Unusual access patterns

**What NOT to Log:**
- Passwords or tokens
- Full student names
- Personal information

**Recommended Tools:**
- Vercel Analytics (built-in)
- Sentry for error tracking
- LogRocket for session replay (with PII masking)

---

## 9. Testing & Quality Assurance

### 9.1 Security Testing
**Regular Audits:**
- [ ] Penetration testing (annual)
- [ ] Dependency vulnerability scanning (npm audit)
- [ ] OWASP Top 10 review
- [ ] Security headers check (securityheaders.com)

### 9.2 Accessibility Testing
**Tools:**
- [ ] Lighthouse (Chrome DevTools)
- [ ] axe DevTools browser extension
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Keyboard-only navigation testing

### 9.3 Cross-Browser Testing
**Minimum Support:**
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## 10. Compliance Checklist

### Pre-Launch Checklist
- [ ] Privacy Policy published and linked in footer
- [ ] Terms of Service published and linked in footer
- [ ] Cookie consent banner implemented
- [ ] All protected routes require authentication
- [ ] Admin access removed from public pages
- [ ] HTTPS enforced on all pages
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Error pages created (404, 500, 403)
- [ ] Accessibility audit completed
- [ ] SEO meta tags on all pages
- [ ] Analytics with privacy controls
- [ ] Data export/deletion functionality
- [ ] Contact email monitored
- [ ] Backup and disaster recovery plan

### Ongoing Compliance
- [ ] Monthly: Review access logs for suspicious activity
- [ ] Quarterly: Update dependencies and patch vulnerabilities
- [ ] Quarterly: Review and update Privacy Policy if needed
- [ ] Annually: Comprehensive security audit
- [ ] Annually: Review GDPR compliance
- [ ] As needed: Respond to data subject requests within 30 days

---

## 11. Specific Recommendations for FreeMathPrintable.com

### Immediate Actions (High Priority)
1. **Remove QuickAdminAccess from public pages**
   - Only render on authenticated admin routes
   - File: `src/app/layout.tsx:76`

2. **Implement route protection middleware**
   - Protect: `/name-lists`, `/admin/*`, `/profile`, `/subscription`, `/analytics`
   - Redirect to `/login` if not authenticated

3. **Add cookie consent banner**
   - Required for UK GDPR compliance
   - Implement before launch

4. **Create separate navigation components**
   - `PublicNav.tsx` - For landing page (no user info)
   - `AuthenticatedNav.tsx` - For logged-in users (current navigation.tsx)
   - Conditional rendering based on auth state

### Short-term Actions (Medium Priority)
1. **Implement data export functionality**
   - Allow users to download their data in JSON format
   - Include: account info, name lists, generation history

2. **Add account deletion feature**
   - Self-service account deletion
   - 30-day grace period before permanent deletion
   - Clear confirmation dialog

3. **Create custom error pages**
   - 404.tsx with helpful navigation
   - 500.tsx with support contact info

4. **Add structured data (Schema.org)**
   - Improve search engine visibility
   - Better rich snippets in search results

### Long-term Actions (Lower Priority)
1. **Accessibility audit and improvements**
   - Hire accessibility consultant
   - WCAG 2.1 AA compliance certification

2. **Security penetration testing**
   - Third-party security audit
   - Vulnerability assessment

3. **Performance optimization**
   - Core Web Vitals monitoring
   - Image optimization review
   - Bundle size analysis

---

## 12. Resources & References

### UK GDPR & Data Protection
- [ICO Guide for Small Organizations](https://ico.org.uk/for-organisations/guide-to-data-protection/)
- [UK GDPR Full Text](https://www.gov.uk/data-protection)

### Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [UK Government Accessibility Requirements](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction)

### Next.js Specific
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)

---

## Summary

**Fixed Issues:**
1. ✅ Removed protected links from public footer (`/name-lists`, `/admin/library`)
2. ✅ Created comprehensive Privacy Policy
3. ✅ Created comprehensive Terms of Service
4. ✅ Updated footer with proper legal links

**Next Steps:**
1. Implement route protection middleware
2. Add cookie consent banner
3. Separate public and authenticated navigation
4. Remove QuickAdminAccess from public pages
5. Implement user data export/deletion

**Key Principle:**
**"Show unauthorized users ONLY what they need to understand your value proposition and sign up. Everything else should require authentication."**
