# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.0+ | Type-safe development | Prevents runtime errors in worksheet generation pipeline |
| Frontend Framework | Next.js | 14+ | Full-stack React framework | App Router, API routes, and Vercel optimization |
| UI Component Library | shadcn/ui | Latest | Pre-built accessible components | Rapid development without custom design work |
| State Management | Zustand | 4.4+ | Lightweight client state | Simple state management for user session and config |
| Backend Language | TypeScript | 5.0+ | Server-side logic | Shared types between frontend and backend |
| Backend Framework | Next.js API Routes | 14+ | Serverless API endpoints | Integrated with frontend, minimal configuration |
| API Style | REST | - | HTTP endpoints | Simple, reliable communication pattern |
| Database | Supabase PostgreSQL | Latest | User data and subscriptions | Built-in auth, real-time, row-level security |
| Cache | Vercel Edge Cache | - | Static asset caching | Automatic CDN caching for performance |
| File Storage | Supabase Storage | Latest | Generated PDF storage | Integrated with database for user files |
| Authentication | Supabase Auth | Latest | Google OAuth integration | Gmail login for UK teachers |
| Frontend Testing | Vitest + RTL | Latest | Unit and integration tests | Fast testing for React components |
| Backend Testing | Vitest | Latest | API route testing | Same testing framework for consistency |
| E2E Testing | Playwright | Latest | End-to-end workflows | Critical user journey validation |
| Build Tool | Next.js | 14+ | Integrated build system | Zero-config build and deployment |
| Bundler | Next.js Turbopack | 14+ | Fast development builds | Integrated with Next.js for speed |
| IaC Tool | Vercel CLI | Latest | Infrastructure management | Simple deployment and environment config |
| CI/CD | Vercel Git Integration | - | Automatic deployments | Push-to-deploy workflow |
| Monitoring | Vercel Analytics | - | Performance monitoring | Built-in web vitals and usage metrics |
| Logging | Vercel Functions Logs | - | Application logging | Serverless function debugging |
| CSS Framework | Tailwind CSS | 3.3+ | Utility-first styling | Rapid UI development with shadcn/ui |

## Additional Key Technologies

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| AI Generation | Google Gemini API | Latest | Worksheet content generation | Curriculum-aligned content creation |
| PDF Generation | Puppeteer | 21+ | HTML-to-PDF conversion | High-quality A4 worksheet output |
| Payment Processing | Stripe | Latest | Subscription management | Pro/Pro Plus tier billing |
| Advertisement | Google AdSense | Latest | Free tier revenue | Optimized ad placement strategy |
| Forms | React Hook Form | 7.45+ | Form validation | Configuration and profile forms |
| Schema Validation | Zod | 3.22+ | Runtime type validation | API request/response validation |