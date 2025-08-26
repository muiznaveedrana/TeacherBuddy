# Development Workflow

## Local Development Setup

### Prerequisites
```bash
# Required software versions
node --version    # v18.17.0 or higher
npm --version     # v9.6.0 or higher
git --version     # v2.34.0 or higher

# Install global dependencies
npm install -g vercel
npm install -g supabase
```

### Initial Setup
```bash
# Clone repository
git clone https://github.com/your-org/worksheetgenerator-ai.git
cd worksheetgenerator-ai

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start Supabase local development
supabase start

# Generate TypeScript types from database
npm run generate-types

# Run database migrations
supabase db reset

# Start development server
npm run dev
```

### Development Commands
```bash
# Start all services
npm run dev              # Next.js dev server on http://localhost:3000

# Run tests
npm run test             # Unit tests with Vitest
npm run test:e2e         # End-to-end tests with Playwright
npm run test:watch       # Watch mode for unit tests

# Database operations
npm run supabase:reset   # Reset local database
npm run generate-types   # Regenerate TypeScript types

# Code quality
npm run lint             # ESLint checks
npm run type-check       # TypeScript compilation check
npm run format           # Prettier formatting
```

## Environment Configuration

### Required Environment Variables

```bash
# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-your-adsense-id

# Backend (.env)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Shared
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
VERCEL_URL=worksheetgenerator.vercel.app
```