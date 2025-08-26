# External APIs

The project requires several external API integrations based on PRD requirements:

## Google Gemini API

- **Purpose:** AI-powered worksheet content generation with UK curriculum alignment
- **Documentation:** https://ai.google.dev/docs/gemini_api
- **Base URL(s):** https://generativelanguage.googleapis.com/v1beta
- **Authentication:** API Key authentication via environment variable
- **Rate Limits:** 60 requests per minute, 1,000 requests per day (free tier)

**Key Endpoints Used:**
- `POST /models/gemini-pro:generateContent` - Generate worksheet content from curriculum prompts

**Integration Notes:** Critical for 5-7 second generation target. Requires sophisticated prompt engineering for curriculum alignment. Rate limits may require Pro tier upgrade for production scale.

## Stripe API

- **Purpose:** Payment processing for Pro and Pro Plus subscription tiers
- **Documentation:** https://stripe.com/docs/api
- **Base URL(s):** https://api.stripe.com/v1
- **Authentication:** Secret key for server-side operations, Publishable key for client-side
- **Rate Limits:** 100 requests per second per account

**Key Endpoints Used:**
- `POST /checkout/sessions` - Create subscription checkout sessions
- `POST /customers` - Create customer records
- `GET /subscriptions/{id}` - Retrieve subscription status
- `POST /webhooks` - Handle subscription lifecycle events

**Integration Notes:** Webhook signature verification required for security. Handles recurring billing, proration, and dunning management automatically.

## Google AdSense API

- **Purpose:** Revenue optimization through strategic advertisement placement
- **Documentation:** https://developers.google.com/adsense/management
- **Base URL(s):** https://www.googleads.com/adsense/new (Ad serving via JavaScript)
- **Authentication:** OAuth 2.0 for management API, site verification for ad serving
- **Rate Limits:** 2,000 requests per day for management API

**Key Endpoints Used:**
- Ad serving via JavaScript integration (no direct API calls)
- Management API for performance reporting and optimization

**Integration Notes:** Requires site approval for educational content. Must implement GDPR-compliant consent management. Ad visibility controlled by subscription tier.

## Supabase APIs (Integrated Services)

- **Purpose:** Authentication, database operations, real-time subscriptions, and file storage
- **Documentation:** https://supabase.com/docs/reference/javascript
- **Base URL(s):** https://[project-ref].supabase.co
- **Authentication:** JWT tokens, API keys, row-level security
- **Rate Limits:** Varies by service tier

**Key Endpoints Used:**
- Authentication via Supabase Auth (Google OAuth)
- Database operations via PostgREST
- Real-time subscriptions for usage counters
- Storage for PDF file hosting

**Integration Notes:** Provides complete backend-as-a-service functionality. Row-level security policies ensure data isolation. Real-time subscriptions enable immediate UI updates.

## Google OAuth 2.0

- **Purpose:** Teacher authentication using existing Gmail accounts
- **Documentation:** https://developers.google.com/identity/protocols/oauth2
- **Base URL(s):** https://accounts.google.com/oauth/authorize
- **Authentication:** Client ID, Client Secret, OAuth 2.0 flow
- **Rate Limits:** Standard OAuth rate limits

**Key Endpoints Used:**
- `GET /oauth/authorize` - Initiate OAuth flow
- `POST /oauth/token` - Exchange authorization code for tokens

**Integration Notes:** Integrated through Supabase Auth provider configuration. Requires Google Cloud Console setup and consent screen approval.