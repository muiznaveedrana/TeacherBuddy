# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics with Web Vitals tracking, React Error Boundaries with custom error reporting, performance monitoring via Navigation Timing API
- **Backend Monitoring:** Vercel Functions logs with structured logging, Supabase built-in database performance insights, custom metrics via API route instrumentation
- **Error Tracking:** Custom error reporting service integrated with Vercel Functions, centralized error aggregation and alerting system
- **Performance Monitoring:** Real-time worksheet generation time tracking, database query performance monitoring, API response time measurement

## Key Metrics

**Frontend Metrics:**
- Core Web Vitals: Largest Contentful Paint (target: <2.5s), First Input Delay (target: <100ms), Cumulative Layout Shift (target: <0.1)
- JavaScript errors: Unhandled exceptions, component render failures, state management errors
- API response times: Worksheet generation API (target: <7s), user profile operations (target: <500ms), usage counter updates (target: <200ms)
- User interactions: Button clicks, form submissions, navigation patterns, feature usage analytics

**Backend Metrics:**
- Request rate: API calls per minute, concurrent worksheet generations, peak usage patterns during UK school hours
- Error rate: Failed worksheet generations (<1% target), API route errors, database query failures, external API timeouts
- Response time: 95th percentile response times for all endpoints, database query execution times, PDF generation performance
- Database query performance: Slow query identification (>500ms), connection pool utilization, index usage analysis

*[This section would contain comprehensive monitoring strategies, alerting configurations, and observability best practices as defined in the original architecture document.]*