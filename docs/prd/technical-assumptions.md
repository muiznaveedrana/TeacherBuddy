# Technical Assumptions

## Repository Structure: Monorepo
Single Next.js project with integrated Supabase client, maintaining minimal complexity while supporting full-stack development. This approach reduces deployment complexity and enables rapid development with Claude Code assistance.

## Service Architecture
**Next.js Full-Stack Monolith:** Thin business layer architecture following the pipeline: configuration → prompt engineering → Gemini API → HTML → PDF conversion. Next.js API routes handle authentication, subscription management, and AI integration while Supabase manages data persistence and real-time subscriptions.

**Key Architecture Components:**
- **Frontend:** Next.js 14+ App Router with Tailwind CSS and shadcn/ui components
- **Backend:** Next.js API routes for AI integration and business logic
- **Database:** Supabase PostgreSQL with built-in authentication and row-level security
- **AI Generation:** Google Gemini API for curriculum-aligned worksheet content
- **PDF Conversion:** use Puppeteer for high quality A4 HTML-to-PDF in serverless functions

## Testing Requirements
**Unit + Integration Testing:** Comprehensive testing approach including unit tests for utility functions, integration tests for AI generation pipeline, and end-to-end testing for critical user workflows (authentication, worksheet generation, subscription management). Manual testing convenience methods for curriculum alignment validation and PDF output quality assurance.

## Additional Technical Assumptions and Requests

**Authentication & Security:**
- Supabase Auth with Google OAuth provider for seamless Gmail integration
- Environment variables for API keys (Gemini, Stripe, Supabase)
- Row-level security policies for user data protection and GDPR compliance

**Performance & Scalability:**
- Vercel deployment for automatic scaling and global CDN distribution
- 5-7 second worksheet generation target requires optimized prompt engineering and API response handling
- HTML-to-PDF conversion must maintain formatting quality while meeting performance targets

**Third-Party Integrations:**
- Google Gemini API for AI content generation with curriculum-specific prompt templates
- Stripe integration for subscription management and payment processing
- AdSense integration with strategic placement optimization
- Supabase real-time subscriptions for usage counter updates

**Development & Deployment:**
- Single developer workflow optimized for rapid iteration with Claude Code
- Streamlined tech stack (shadcn/ui, Supabase templates) to minimize design complexity
- Bootstrap development approach with £2,500 initial investment constraint