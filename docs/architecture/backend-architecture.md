# Backend Architecture

## Service Architecture

Since the platform choice is Vercel + Supabase (serverless architecture), the backend is organized around Next.js API routes:

### Function Organization
```
app/api/
├── auth/
│   └── callback/
│       └── route.ts           # Google OAuth callback handler
├── profile/
│   └── route.ts               # GET/POST user profile operations
├── worksheets/
│   ├── generate/
│   │   └── route.ts           # POST worksheet generation
│   └── [id]/
│       └── download/
│           └── route.ts       # GET PDF download
├── usage/
│   └── route.ts               # GET usage statistics
├── namelists/
│   ├── route.ts               # GET/POST name lists
│   └── [id]/
│       └── route.ts           # PUT/DELETE specific name list
├── subscription/
│   ├── route.ts               # GET subscription details
│   ├── upgrade/
│   │   └── route.ts           # POST create Stripe checkout
│   └── portal/
│       └── route.ts           # GET customer portal URL
└── webhooks/
    └── stripe/
        └── route.ts           # POST Stripe webhook handler
```

*[This section would contain detailed backend service patterns, serverless function organization, and API route implementations as defined in the original architecture document.]*