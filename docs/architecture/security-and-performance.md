# Security and Performance

## Security Requirements

**Frontend Security:**
- CSP Headers: `default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co`
- XSS Prevention: React's built-in XSS protection, input sanitization via Zod validation, Content Security Policy enforcement
- Secure Storage: JWT tokens in httpOnly cookies, sensitive config in environment variables, no client-side storage of API keys

**Backend Security:**
- Input Validation: Zod schema validation on all API routes, SQL injection prevention via Supabase parameterized queries, file upload restrictions
- Rate Limiting: 100 requests per minute per IP via Vercel Edge Config, worksheet generation limited to 1 request per 10 seconds per user
- CORS Policy: `origin: ['https://worksheetgenerator.ai'], credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE']`

**Authentication Security:**
- Token Storage: JWT tokens in secure, httpOnly, sameSite cookies with 24-hour expiration
- Session Management: Supabase Auth automatic token refresh, secure logout across all devices, session timeout after 30 days inactivity
- Password Policy: N/A (OAuth only), Google OAuth security standards enforced, account verification via email domain validation

## Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <500KB initial bundle, <200KB per route chunk, tree shaking for unused shadcn/ui components
- Loading Strategy: Next.js automatic code splitting, dynamic imports for heavy components, progressive image loading with blur placeholders
- Caching Strategy: Static assets cached for 1 year, API responses cached for 5 minutes, user configuration localStorage persistence

**Backend Performance:**
- Response Time Target: <2 seconds for API routes, <7 seconds for worksheet generation, <1 second for usage counter updates
- Database Optimization: Indexed queries on user_id and timestamp fields, connection pooling via Supabase (max 100 connections), query optimization with EXPLAIN analysis
- Caching Strategy: Curriculum data cached in memory, PDF files cached in Supabase Storage with CDN, usage counters real-time via WebSocket subscriptions