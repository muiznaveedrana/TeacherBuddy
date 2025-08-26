# WorksheetGenerator.AI Fullstack Architecture Document

## Introduction

This document outlines the complete fullstack architecture for WorksheetGenerator.AI, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### Starter Template or Existing Project

**N/A - Greenfield project**

Based on analysis of the current project state, this is a greenfield development of WorksheetGenerator.AI with only a basic HTML placeholder file. The PRD clearly specifies the technology choices and architecture:

- **Framework:** Next.js 14+ with App Router
- **UI:** shadcn/ui components with Tailwind CSS  
- **Backend:** Supabase for authentication and database
- **AI:** Google Gemini API for worksheet generation
- **Deployment:** Vercel platform

The project should be built from scratch following these specific technology constraints, rather than using any existing starter template.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-08 | 1.0 | Initial architecture document creation | Architect |

## High Level Architecture

### Technical Summary
WorksheetGenerator.AI employs a modern Jamstack architecture using Next.js 14 App Router as a fullstack framework, deployed on Vercel with Supabase providing authentication and database services. The frontend uses shadcn/ui components with Tailwind CSS for rapid development, while backend API routes handle AI integration with Google Gemini for worksheet generation and PDF conversion via Puppeteer. Key integration points include Supabase Auth for Google OAuth, Stripe for subscription management, and AdSense for revenue optimization. This architecture achieves the PRD's core goals of 5-7 second generation times, 99% uptime, and seamless teacher workflows through a streamlined technology stack optimized for single-developer rapid iteration.

### Platform and Infrastructure Choice

**Platform:** Vercel + Supabase  
**Key Services:** Next.js hosting, Serverless Functions, Supabase Auth/Database, Edge CDN  
**Deployment Host and Regions:** Global edge deployment with UK/Europe priority

This combination provides:
- **Rapid Development:** Minimal infrastructure management allows focus on business logic
- **Automatic Scaling:** Serverless functions handle concurrent worksheet generation efficiently  
- **Built-in Authentication:** Supabase Auth integrates seamlessly with Google OAuth for teacher Gmail accounts
- **Database & Real-time:** Supabase provides PostgreSQL with usage counters and subscription management
- **Performance:** Vercel's edge network ensures <3s page loads for UK teachers

### Repository Structure

**Structure:** Single Next.js monorepo  
**Monorepo Tool:** Native Next.js project structure (no additional tooling needed)  
**Package Organization:** App Router with co-located components and API routes

This approach optimizes for:
- Single developer workflow with Claude Code assistance
- Minimal complexity while supporting fullstack development
- Shared TypeScript types between frontend and backend
- Streamlined deployment pipeline

### High Level Architecture Diagram

```mermaid
graph TB
    User[UK Teachers] --> CDN[Vercel Edge CDN]
    CDN --> App[Next.js App Router]
    
    App --> Auth[Supabase Auth]
    App --> DB[Supabase PostgreSQL]
    App --> Storage[Supabase Storage]
    
    App --> Gemini[Google Gemini API]
    App --> Stripe[Stripe API]
    App --> AdSense[Google AdSense]
    
    Auth --> Google[Google OAuth]
    
    subgraph "Serverless Functions"
        Generate[Worksheet Generation]
        PDF[PDF Conversion]
        Webhook[Stripe Webhooks]
    end
    
    App --> Generate
    Generate --> Gemini
    Generate --> PDF
    PDF --> Storage
```

### Architectural Patterns

- **Jamstack Architecture:** Pre-rendered pages with serverless API endpoints - _Rationale:_ Optimal performance and automatic scaling for educational SaaS
- **Component-Based UI:** Reusable shadcn/ui components with TypeScript - _Rationale:_ Rapid development and consistent design system
- **Pipeline Pattern:** Linear data flow from configuration → AI prompt → PDF generation - _Rationale:_ Simple, reliable worksheet generation workflow
- **Repository Pattern:** Abstract database operations through Supabase client - _Rationale:_ Clean data access and built-in security policies
- **Strategy Pattern:** Configurable AI prompts based on curriculum/difficulty - _Rationale:_ Curriculum-aligned content generation flexibility

## Tech Stack

### Technology Stack Table

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

### Additional Key Technologies

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| AI Generation | Google Gemini API | Latest | Worksheet content generation | Curriculum-aligned content creation |
| PDF Generation | Puppeteer | 21+ | HTML-to-PDF conversion | High-quality A4 worksheet output |
| Payment Processing | Stripe | Latest | Subscription management | Pro/Pro Plus tier billing |
| Advertisement | Google AdSense | Latest | Free tier revenue | Optimized ad placement strategy |
| Forms | React Hook Form | 7.45+ | Form validation | Configuration and profile forms |
| Schema Validation | Zod | 3.22+ | Runtime type validation | API request/response validation |

## Data Models

### User

**Purpose:** Represents UK primary school teachers using the platform for worksheet generation

**Key Attributes:**
- id: UUID - Unique identifier from Supabase Auth
- email: string - Gmail address from Google OAuth
- created_at: timestamp - Account creation date
- updated_at: timestamp - Last profile update

#### TypeScript Interface
```typescript
interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}
```

#### Relationships
- Has one UserProfile
- Has many WorksheetGenerations
- Has many NameLists
- Has one Subscription

### UserProfile

**Purpose:** Stores curriculum-specific information and preferences for generating appropriate worksheets

**Key Attributes:**
- user_id: UUID - Foreign key to User
- country: string - Default "England" 
- curriculum: string - "UK National Curriculum"
- year_group: string - Reception through Year 6
- last_topic: string - Persisted configuration
- last_subtopic: string - Persisted configuration
- last_difficulty: string - Easy/Average/Hard
- last_question_count: number - 5-30 questions
- last_name_list_id: UUID - Reference to selected name list

#### TypeScript Interface
```typescript
interface UserProfile {
  user_id: string;
  country: string;
  curriculum: string;
  year_group: string;
  last_topic?: string;
  last_subtopic?: string;
  last_difficulty?: 'Easy' | 'Average' | 'Hard';
  last_question_count?: number;
  last_name_list_id?: string;
  created_at: string;
  updated_at: string;
}
```

#### Relationships
- Belongs to User
- References NameList for last_name_list_id

### WorksheetGeneration

**Purpose:** Tracks each worksheet creation for usage limits, analytics, and user history

**Key Attributes:**
- id: UUID - Unique generation identifier
- user_id: UUID - Foreign key to User
- topic: string - Math curriculum topic
- subtopic: string - Specific learning objective
- difficulty: string - Easy/Average/Hard
- question_count: number - Number of questions generated
- name_list_id: UUID - Names used in worksheet
- pdf_url: string - Supabase Storage URL
- generated_at: timestamp - Creation time
- processing_time_ms: number - Performance tracking

#### TypeScript Interface
```typescript
interface WorksheetGeneration {
  id: string;
  user_id: string;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Average' | 'Hard';
  question_count: number;
  name_list_id?: string;
  pdf_url?: string;
  generated_at: string;
  processing_time_ms?: number;
}
```

#### Relationships
- Belongs to User
- References NameList
- Tracked by UsageCounter

### NameList

**Purpose:** Stores student name collections for personalized worksheet question generation

**Key Attributes:**
- id: UUID - Unique list identifier
- user_id: UUID - Foreign key to User
- name: string - List display name (e.g., "Year 3 Class")
- names: string[] - Array of student names
- is_default: boolean - System-provided default list
- created_at: timestamp - List creation date

#### TypeScript Interface
```typescript
interface NameList {
  id: string;
  user_id: string;
  name: string;
  names: string[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
```

#### Relationships
- Belongs to User
- Used by WorksheetGenerations
- Referenced by UserProfile for persistence

### Subscription

**Purpose:** Manages Free/Pro/Pro Plus tier status and Stripe integration for payment processing

**Key Attributes:**
- id: UUID - Unique subscription identifier
- user_id: UUID - Foreign key to User
- tier: string - Free/Pro/Pro Plus
- stripe_customer_id: string - Stripe customer reference
- stripe_subscription_id: string - Active subscription reference
- status: string - Active/Canceled/Past Due
- current_period_start: timestamp - Billing period start
- current_period_end: timestamp - Billing period end
- monthly_limit: number - Worksheet generation limit

#### TypeScript Interface
```typescript
interface Subscription {
  id: string;
  user_id: string;
  tier: 'Free' | 'Pro' | 'Pro Plus';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: 'Active' | 'Canceled' | 'Past Due' | 'Incomplete';
  current_period_start: string;
  current_period_end: string;
  monthly_limit: number;
  created_at: string;
  updated_at: string;
}
```

#### Relationships
- Belongs to User
- Determines UsageCounter limits

### UsageCounter

**Purpose:** Tracks monthly and daily worksheet generation counts for tier limit enforcement

**Key Attributes:**
- id: UUID - Unique counter identifier
- user_id: UUID - Foreign key to User
- month_year: string - "2024-01" format for partitioning
- monthly_count: number - Current month generations
- daily_count: number - Current day generations
- last_generation_date: date - For daily counter reset
- last_reset_date: date - Monthly counter tracking

#### TypeScript Interface
```typescript
interface UsageCounter {
  id: string;
  user_id: string;
  month_year: string;
  monthly_count: number;
  daily_count: number;
  last_generation_date: string;
  last_reset_date: string;
  updated_at: string;
}
```

#### Relationships
- Belongs to User
- Incremented by WorksheetGeneration
- Checked against Subscription limits

## API Specification

Based on the REST API style from the Tech Stack, here's the comprehensive API specification for WorksheetGenerator.AI:

```yaml
openapi: 3.0.0
info:
  title: WorksheetGenerator.AI API
  version: 1.0.0
  description: REST API for AI-powered UK curriculum worksheet generation platform
servers:
  - url: https://worksheetgenerator.vercel.app/api
    description: Production API server

paths:
  /auth/callback:
    get:
      summary: Google OAuth callback handler
      description: Handles Google OAuth redirect and creates user session
      parameters:
        - name: code
          in: query
          required: true
          schema:
            type: string
          description: OAuth authorization code
      responses:
        '302':
          description: Redirect to dashboard or profile setup
        '400':
          description: OAuth error

  /profile:
    get:
      summary: Get user profile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: User profile data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
    
    post:
      summary: Create or update user profile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfileInput'
      responses:
        '200':
          description: Profile updated successfully
        '201':
          description: Profile created successfully

  /worksheets/generate:
    post:
      summary: Generate new worksheet
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WorksheetGenerationRequest'
      responses:
        '200':
          description: Worksheet generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WorksheetGenerationResponse'
        '429':
          description: Usage limit exceeded
        '500':
          description: Generation failed

  /worksheets/{id}/download:
    get:
      summary: Download worksheet PDF
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Worksheet generation ID
      responses:
        '200':
          description: PDF file
          content:
            application/pdf:
              schema:
                type: string
                format: binary

  /usage:
    get:
      summary: Get current usage statistics
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Usage counter data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsageStats'

  /namelists:
    get:
      summary: Get user's name lists
      security:
        - bearerAuth: []
      responses:
        '200':
          description: List of name lists
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/NameList'
    
    post:
      summary: Create new name list
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NameListInput'
      responses:
        '201':
          description: Name list created

  /namelists/{id}:
    put:
      summary: Update name list
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NameListInput'
      responses:
        '200':
          description: Name list updated
    
    delete:
      summary: Delete name list
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Name list deleted

  /subscription:
    get:
      summary: Get subscription details
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Subscription information
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Subscription'

  /subscription/upgrade:
    post:
      summary: Create Stripe checkout session for upgrade
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                tier:
                  type: string
                  enum: [Pro, 'Pro Plus']
      responses:
        '200':
          description: Stripe checkout URL
          content:
            application/json:
              schema:
                type: object
                properties:
                  checkout_url:
                    type: string

  /webhooks/stripe:
    post:
      summary: Stripe webhook handler
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: Webhook processed

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    UserProfile:
      type: object
      properties:
        user_id:
          type: string
        country:
          type: string
        curriculum:
          type: string
        year_group:
          type: string
        last_topic:
          type: string
        last_subtopic:
          type: string
        last_difficulty:
          type: string
          enum: [Easy, Average, Hard]
        last_question_count:
          type: integer
        last_name_list_id:
          type: string

    UserProfileInput:
      type: object
      required: [country, curriculum, year_group]
      properties:
        country:
          type: string
        curriculum:
          type: string
        year_group:
          type: string
        last_topic:
          type: string
        last_subtopic:
          type: string
        last_difficulty:
          type: string
        last_question_count:
          type: integer
        last_name_list_id:
          type: string

    WorksheetGenerationRequest:
      type: object
      required: [topic, subtopic, difficulty, question_count]
      properties:
        topic:
          type: string
        subtopic:
          type: string
        difficulty:
          type: string
          enum: [Easy, Average, Hard]
        question_count:
          type: integer
          minimum: 5
          maximum: 30
        name_list_id:
          type: string

    WorksheetGenerationResponse:
      type: object
      properties:
        id:
          type: string
        pdf_url:
          type: string
        generated_at:
          type: string
        processing_time_ms:
          type: integer

    UsageStats:
      type: object
      properties:
        monthly_count:
          type: integer
        monthly_limit:
          type: integer
        daily_count:
          type: integer
        days_until_reset:
          type: integer
        tier:
          type: string

    NameList:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        names:
          type: array
          items:
            type: string
        is_default:
          type: boolean

    NameListInput:
      type: object
      required: [name, names]
      properties:
        name:
          type: string
        names:
          type: array
          items:
            type: string

    Subscription:
      type: object
      properties:
        tier:
          type: string
          enum: [Free, Pro, 'Pro Plus']
        status:
          type: string
        monthly_limit:
          type: integer
        current_period_end:
          type: string
```

## Components

Based on the architectural patterns, tech stack, and data models, here are the major logical components across the fullstack:

### AuthenticationService

**Responsibility:** Handles Google OAuth integration, session management, and user authentication state across the application

**Key Interfaces:**
- signInWithGoogle(): Promise<User>
- signOut(): Promise<void>
- getCurrentUser(): User | null
- onAuthStateChange(callback): Unsubscribe

**Dependencies:** Supabase Auth, Google OAuth provider

**Technology Stack:** Supabase Auth client with Next.js middleware for route protection

### WorksheetGenerator

**Responsibility:** Core business logic for AI-powered worksheet generation, managing the complete pipeline from configuration to PDF output

**Key Interfaces:**
- generateWorksheet(config: GenerationConfig): Promise<WorksheetResult>
- validateUsageLimit(userId: string): Promise<boolean>
- saveGenerationRecord(generation: WorksheetGeneration): Promise<void>

**Dependencies:** Google Gemini API, Puppeteer service, UsageTracker, FileStorage

**Technology Stack:** Next.js API routes with Google Gemini integration and Puppeteer for PDF conversion

### ConfigurationManager

**Responsibility:** Manages worksheet configuration state, curriculum data, and user preference persistence

**Key Interfaces:**
- getCurriculumTopics(yearGroup: string): Topic[]
- getSubtopics(topic: string, yearGroup: string): Subtopic[]
- saveUserConfiguration(config: UserConfig): Promise<void>
- loadUserConfiguration(userId: string): Promise<UserConfig>

**Dependencies:** UserProfile service, curriculum data store

**Technology Stack:** Zustand for client state management, Supabase for persistence

### NameListManager

**Responsibility:** Handles creation, editing, and management of student name lists for personalized worksheet generation

**Key Interfaces:**
- createNameList(nameList: NameListInput): Promise<NameList>
- updateNameList(id: string, updates: NameListInput): Promise<void>
- deleteNameList(id: string): Promise<void>
- getUserNameLists(userId: string): Promise<NameList[]>

**Dependencies:** Database service, user authentication

**Technology Stack:** Next.js API routes with Supabase PostgreSQL

### UsageTracker

**Responsibility:** Monitors and enforces worksheet generation limits based on subscription tiers with real-time counter updates

**Key Interfaces:**
- incrementUsage(userId: string): Promise<UsageResult>
- getCurrentUsage(userId: string): Promise<UsageStats>
- resetMonthlyCounters(): Promise<void>
- checkUsageLimit(userId: string): Promise<boolean>

**Dependencies:** Subscription service, database service

**Technology Stack:** Supabase PostgreSQL with real-time subscriptions, database functions for atomic updates

### SubscriptionService

**Responsibility:** Manages user subscription tiers, Stripe integration, and payment processing workflows

**Key Interfaces:**
- createCheckoutSession(tier: SubscriptionTier): Promise<CheckoutSession>
- handleWebhook(event: StripeEvent): Promise<void>
- updateSubscription(userId: string, subscription: SubscriptionData): Promise<void>
- getCurrentSubscription(userId: string): Promise<Subscription>

**Dependencies:** Stripe API, webhook handlers, database service

**Technology Stack:** Stripe SDK with Next.js API routes, webhook signature verification

### PDFService

**Responsibility:** Converts AI-generated HTML content to professional PDF worksheets with consistent formatting

**Key Interfaces:**
- convertHTMLToPDF(html: string, options: PDFOptions): Promise<Buffer>
- uploadPDF(buffer: Buffer, filename: string): Promise<string>
- generateFilename(config: GenerationConfig): string

**Dependencies:** Puppeteer, Supabase Storage

**Technology Stack:** Puppeteer running in Vercel serverless functions, Supabase Storage for file hosting

### AdService

**Responsibility:** Manages AdSense integration with intelligent placement based on subscription tier and generation state

**Key Interfaces:**
- shouldShowAds(user: User): boolean
- getAdConfiguration(placement: AdPlacement): AdConfig
- trackAdInteraction(event: AdEvent): Promise<void>

**Dependencies:** Subscription service, user authentication

**Technology Stack:** Google AdSense with React components, conditional rendering based on subscription status

### UIComponents

**Responsibility:** Reusable interface components built on shadcn/ui for consistent design system and rapid development

**Key Interfaces:**
- WorksheetConfigForm: Configuration interface component
- GenerationProgress: Loading state with progress indication
- UsageIndicator: Real-time usage counter display
- SubscriptionManager: Tier upgrade and billing interface

**Dependencies:** shadcn/ui library, React Hook Form, state management

**Technology Stack:** React with TypeScript, shadcn/ui components, Tailwind CSS styling

### Component Diagrams

```mermaid
graph TB
    User[User Interface] --> Auth[AuthenticationService]
    User --> Config[ConfigurationManager]
    User --> Names[NameListManager]
    User --> Sub[SubscriptionService]
    
    Config --> Generator[WorksheetGenerator]
    Names --> Generator
    
    Generator --> Gemini[Google Gemini API]
    Generator --> PDF[PDFService]
    Generator --> Usage[UsageTracker]
    
    PDF --> Storage[Supabase Storage]
    Usage --> DB[Supabase Database]
    Auth --> DB
    Sub --> Stripe[Stripe API]
    Sub --> DB
    
    User --> Ads[AdService]
    Ads --> AdSense[Google AdSense]
    
    Usage --> Realtime[Real-time Updates]
    Realtime --> User
```

## External APIs

The project requires several external API integrations based on PRD requirements:

### Google Gemini API

- **Purpose:** AI-powered worksheet content generation with UK curriculum alignment
- **Documentation:** https://ai.google.dev/docs/gemini_api
- **Base URL(s):** https://generativelanguage.googleapis.com/v1beta
- **Authentication:** API Key authentication via environment variable
- **Rate Limits:** 60 requests per minute, 1,000 requests per day (free tier)

**Key Endpoints Used:**
- `POST /models/gemini-pro:generateContent` - Generate worksheet content from curriculum prompts

**Integration Notes:** Critical for 5-7 second generation target. Requires sophisticated prompt engineering for curriculum alignment. Rate limits may require Pro tier upgrade for production scale.

### Stripe API

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

### Google AdSense API

- **Purpose:** Revenue optimization through strategic advertisement placement
- **Documentation:** https://developers.google.com/adsense/management
- **Base URL(s):** https://www.googleads.com/adsense/new (Ad serving via JavaScript)
- **Authentication:** OAuth 2.0 for management API, site verification for ad serving
- **Rate Limits:** 2,000 requests per day for management API

**Key Endpoints Used:**
- Ad serving via JavaScript integration (no direct API calls)
- Management API for performance reporting and optimization

**Integration Notes:** Requires site approval for educational content. Must implement GDPR-compliant consent management. Ad visibility controlled by subscription tier.

### Supabase APIs (Integrated Services)

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

### Google OAuth 2.0

- **Purpose:** Teacher authentication using existing Gmail accounts
- **Documentation:** https://developers.google.com/identity/protocols/oauth2
- **Base URL(s):** https://accounts.google.com/oauth/authorize
- **Authentication:** Client ID, Client Secret, OAuth 2.0 flow
- **Rate Limits:** Standard OAuth rate limits

**Key Endpoints Used:**
- `GET /oauth/authorize` - Initiate OAuth flow
- `POST /oauth/token` - Exchange authorization code for tokens

**Integration Notes:** Integrated through Supabase Auth provider configuration. Requires Google Cloud Console setup and consent screen approval.

## Core Workflows

```mermaid
sequenceDiagram
    participant T as Teacher
    participant UI as UI Components
    participant Auth as AuthService
    participant Config as ConfigManager
    participant Gen as WorksheetGenerator
    participant Usage as UsageTracker
    participant Gemini as Gemini API
    participant PDF as PDFService
    participant Storage as Supabase Storage

    Note over T,Storage: User Authentication Flow
    T->>UI: Click "Sign in with Google"
    UI->>Auth: signInWithGoogle()
    Auth->>Auth: Redirect to Google OAuth
    Auth->>Auth: Handle callback
    Auth->>UI: Return user session
    UI->>T: Redirect to dashboard

    Note over T,Storage: First-Time Profile Setup
    T->>UI: Complete profile form
    UI->>Config: saveUserProfile(data)
    Config->>Storage: Store profile data
    Storage->>UI: Confirm saved
    UI->>T: Redirect to generation interface

    Note over T,Storage: Worksheet Generation Flow
    T->>UI: Select topic, difficulty, etc.
    UI->>Config: loadUserConfiguration()
    Config->>UI: Return saved preferences
    
    T->>UI: Click "Generate"
    UI->>Usage: checkUsageLimit(userId)
    Usage->>Storage: Query current usage
    Storage->>Usage: Return usage stats
    
    alt Usage limit reached
        Usage->>UI: Usage exceeded error
        UI->>T: Show upgrade prompt
    else Usage available
        Usage->>Gen: Proceed with generation
        UI->>T: Show progress indicator
        
        Gen->>Gemini: Generate content prompt
        Gemini->>Gen: Return HTML worksheet
        Gen->>PDF: convertHTMLToPDF(html)
        PDF->>Storage: Upload PDF file
        Storage->>PDF: Return file URL
        
        Gen->>Usage: incrementUsage(userId)
        Usage->>Storage: Update counters atomically
        
        Gen->>UI: Return generation result
        UI->>T: Display PDF preview
    end

    Note over T,Storage: Subscription Upgrade Flow
    T->>UI: Click "Upgrade to Pro"
    UI->>UI: Load subscription manager
    T->>UI: Select Pro tier
    UI->>Gen: Create Stripe checkout
    Gen->>Gen: Redirect to Stripe
    Gen->>Gen: Handle successful payment
    Gen->>Storage: Update subscription tier
    Storage->>UI: Real-time tier update
    UI->>T: Remove ads, increase limits

    Note over T,Storage: Error Handling Flows
    Gemini-->>Gen: API timeout/error
    Gen->>UI: Generation failed message
    UI->>T: Retry option with explanation
    
    PDF-->>Gen: PDF conversion failed
    Gen->>UI: Processing error message
    UI->>T: Contact support option
```

## Database Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- This table is automatically created by Supabase Auth
-- We reference auth.users for foreign keys

-- User profiles table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    country VARCHAR(100) NOT NULL DEFAULT 'England',
    curriculum VARCHAR(100) NOT NULL DEFAULT 'UK National Curriculum',
    year_group VARCHAR(50) NOT NULL,
    last_topic VARCHAR(255),
    last_subtopic VARCHAR(255),
    last_difficulty VARCHAR(20) CHECK (last_difficulty IN ('Easy', 'Average', 'Hard')),
    last_question_count INTEGER CHECK (last_question_count BETWEEN 5 AND 30),
    last_name_list_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Name lists table
CREATE TABLE name_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    names TEXT[] NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tier VARCHAR(20) NOT NULL DEFAULT 'Free' CHECK (tier IN ('Free', 'Pro', 'Pro Plus')),
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Canceled', 'Past Due', 'Incomplete')),
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 month'),
    monthly_limit INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id),
    UNIQUE(stripe_customer_id),
    UNIQUE(stripe_subscription_id)
);

-- Usage counters table
CREATE TABLE usage_counters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    month_year VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    monthly_count INTEGER NOT NULL DEFAULT 0,
    daily_count INTEGER NOT NULL DEFAULT 0,
    last_generation_date DATE DEFAULT CURRENT_DATE,
    last_reset_date DATE DEFAULT CURRENT_DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, month_year)
);

-- Worksheet generations table
CREATE TABLE worksheet_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    subtopic VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Average', 'Hard')),
    question_count INTEGER NOT NULL CHECK (question_count BETWEEN 5 AND 30),
    name_list_id UUID REFERENCES name_lists(id) ON DELETE SET NULL,
    pdf_url TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processing_time_ms INTEGER,
    FOREIGN KEY (name_list_id) REFERENCES name_lists(id)
);

-- Indexes for performance optimization
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_name_lists_user_id ON name_lists(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_usage_counters_user_month ON usage_counters(user_id, month_year);
CREATE INDEX idx_usage_counters_month_year ON usage_counters(month_year);
CREATE INDEX idx_worksheet_generations_user_id ON worksheet_generations(user_id);
CREATE INDEX idx_worksheet_generations_generated_at ON worksheet_generations(generated_at);

-- Row Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE name_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheet_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for name_lists
CREATE POLICY "Users can manage own name lists" ON name_lists
    FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view default name lists" ON name_lists
    FOR SELECT USING (is_default = true OR auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscription" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage subscriptions" ON subscriptions
    FOR ALL USING (true); -- Handled by service role for webhooks

-- RLS Policies for usage_counters
CREATE POLICY "Users can view own usage" ON usage_counters
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can manage usage counters" ON usage_counters
    FOR ALL USING (true); -- Handled by service role for atomic updates

-- RLS Policies for worksheet_generations
CREATE POLICY "Users can view own generations" ON worksheet_generations
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own generations" ON worksheet_generations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_name_lists_updated_at
    BEFORE UPDATE ON name_lists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Database functions for atomic operations
CREATE OR REPLACE FUNCTION increment_usage_counter(p_user_id UUID)
RETURNS TABLE(monthly_count INTEGER, daily_count INTEGER, monthly_limit INTEGER) AS $$
DECLARE
    current_month VARCHAR(7);
    counter_record RECORD;
    subscription_record RECORD;
BEGIN
    current_month := TO_CHAR(NOW(), 'YYYY-MM');
    
    -- Get current subscription limits
    SELECT monthly_limit INTO subscription_record
    FROM subscriptions 
    WHERE user_id = p_user_id;
    
    -- Insert or update usage counter
    INSERT INTO usage_counters (user_id, month_year, monthly_count, daily_count, last_generation_date)
    VALUES (p_user_id, current_month, 1, 1, CURRENT_DATE)
    ON CONFLICT (user_id, month_year)
    DO UPDATE SET
        monthly_count = CASE 
            WHEN usage_counters.last_reset_date < DATE_TRUNC('month', NOW())::DATE 
            THEN 1 
            ELSE usage_counters.monthly_count + 1 
        END,
        daily_count = CASE 
            WHEN usage_counters.last_generation_date < CURRENT_DATE 
            THEN 1 
            ELSE usage_counters.daily_count + 1 
        END,
        last_generation_date = CURRENT_DATE,
        last_reset_date = CASE 
            WHEN usage_counters.last_reset_date < DATE_TRUNC('month', NOW())::DATE 
            THEN CURRENT_DATE 
            ELSE usage_counters.last_reset_date 
        END,
        updated_at = NOW()
    RETURNING usage_counters.monthly_count, usage_counters.daily_count INTO counter_record;
    
    RETURN QUERY SELECT 
        counter_record.monthly_count, 
        counter_record.daily_count, 
        subscription_record.monthly_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check usage limits
CREATE OR REPLACE FUNCTION check_usage_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_month VARCHAR(7);
    current_usage INTEGER;
    limit_value INTEGER;
BEGIN
    current_month := TO_CHAR(NOW(), 'YYYY-MM');
    
    SELECT 
        COALESCE(uc.monthly_count, 0),
        s.monthly_limit
    INTO current_usage, limit_value
    FROM subscriptions s
    LEFT JOIN usage_counters uc ON uc.user_id = s.user_id AND uc.month_year = current_month
    WHERE s.user_id = p_user_id;
    
    RETURN current_usage < limit_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default subscription for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO subscriptions (user_id, tier, monthly_limit)
    VALUES (NEW.id, 'Free', 30);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Default name list data
INSERT INTO name_lists (user_id, name, names, is_default) VALUES
('00000000-0000-0000-0000-000000000000', 'UK Primary Names', 
ARRAY['Emma', 'Oliver', 'Ava', 'George', 'Isla', 'Noah', 'Sophia', 'Leo', 'Lily', 'Arthur', 
      'Grace', 'Oscar', 'Freya', 'Archie', 'Charlotte', 'Jack', 'Amelia', 'Harry', 'Emily', 'Henry'], 
true);
```

## Frontend Architecture

### Component Architecture

#### Component Organization
```
src/
├── components/
│   ├── ui/                     # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dropdown.tsx
│   │   └── progress.tsx
│   ├── auth/                   # Authentication components
│   │   ├── AuthProvider.tsx
│   │   ├── LoginButton.tsx
│   │   └── ProtectedRoute.tsx
│   ├── worksheet/              # Core generation features
│   │   ├── ConfigurationPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── GenerationProgress.tsx
│   │   └── DownloadButton.tsx
│   ├── subscription/           # Billing and usage
│   │   ├── UsageIndicator.tsx
│   │   ├── UpgradePrompt.tsx
│   │   └── SubscriptionManager.tsx
│   ├── namelists/             # Name management
│   │   ├── NameListSelector.tsx
│   │   ├── CreateNameListModal.tsx
│   │   └── NameListManager.tsx
│   └── layout/                # Layout components
│       ├── Navigation.tsx
│       ├── Sidebar.tsx
│       └── AdContainer.tsx
```

#### State Management Architecture

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Combined Store
export const useAppStore = create<AuthState & ConfigState & GenerationState & UsageState>()(
  persist(
    (set, get) => ({
      // State implementation
    }),
    {
      name: 'worksheet-generator-store',
      partialize: (state) => ({ 
        // Only persist certain parts
        topic: state.topic,
        subtopic: state.subtopic,
        difficulty: state.difficulty,
        questionCount: state.questionCount
      })
    }
  )
);
```

### Routing Architecture

#### Route Organization
```
app/
├── page.tsx                    # Landing page (public)
├── login/
│   └── page.tsx               # OAuth callback handler
├── dashboard/
│   ├── page.tsx               # Main worksheet generation interface
│   ├── profile/
│   │   └── page.tsx          # User profile management
│   ├── namelists/
│   │   └── page.tsx          # Name list management
│   └── subscription/
│       └── page.tsx          # Billing and usage management
├── api/                       # API routes
│   ├── auth/
│   ├── worksheets/
│   ├── usage/
│   └── webhooks/
└── globals.css                # Tailwind CSS imports
```

## Backend Architecture

### Service Architecture

Since the platform choice is Vercel + Supabase (serverless architecture), the backend is organized around Next.js API routes:

#### Function Organization
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

## Unified Project Structure

```plaintext
worksheetgenerator-ai/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml            # Test and lint on PR
│       └── deploy.yaml        # Deploy to Vercel on merge
├── app/                       # Next.js App Router
│   ├── (auth)/               # Auth route group
│   │   └── login/
│   │       └── page.tsx      # OAuth callback handler
│   ├── (dashboard)/          # Protected route group
│   │   ├── layout.tsx        # Dashboard layout with nav
│   │   ├── page.tsx          # Main worksheet generation interface
│   │   ├── profile/
│   │   │   └── page.tsx      # User profile management
│   │   ├── namelists/
│   │   │   └── page.tsx      # Name list management
│   │   └── subscription/
│   │       └── page.tsx      # Billing and usage management
│   ├── api/                  # Serverless API endpoints
│   │   ├── auth/
│   │   ├── worksheets/
│   │   ├── profile/
│   │   ├── usage/
│   │   ├── namelists/
│   │   ├── subscription/
│   │   └── webhooks/
│   ├── globals.css           # Tailwind CSS imports
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── not-found.tsx         # 404 page
├── components/               # Reusable UI components
│   ├── ui/                   # shadcn/ui base components
│   ├── auth/                 # Authentication components
│   ├── worksheet/            # Core generation features
│   ├── subscription/         # Billing and usage
│   ├── namelists/           # Name management
│   ├── ads/                 # Advertisement components
│   └── layout/              # Layout components
├── lib/                     # Shared utilities
│   ├── supabase/           # Supabase configuration
│   ├── services/           # Business logic services
│   ├── repositories/       # Data access layer
│   ├── stores/             # State management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── curriculum/         # Curriculum data
├── public/                 # Static assets
├── supabase/               # Database schema and migrations
├── tests/                  # Test files
├── .env.example            # Environment variables template
├── .env.local              # Local development environment
├── components.json         # shadcn/ui configuration
├── middleware.ts           # Next.js middleware for auth
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment settings
└── README.md               # Project documentation
```

## Development Workflow

### Local Development Setup

#### Prerequisites
```bash
# Required software versions
node --version    # v18.17.0 or higher
npm --version     # v9.6.0 or higher
git --version     # v2.34.0 or higher

# Install global dependencies
npm install -g vercel
npm install -g supabase
```

#### Initial Setup
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

#### Development Commands
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

### Environment Configuration

#### Required Environment Variables

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

## Deployment Architecture

### Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel Edge Network
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (Next.js build output)
- **CDN/Edge:** Global edge caching with UK/Europe priority regions

**Backend Deployment:**
- **Platform:** Vercel Serverless Functions
- **Build Command:** Automatic API route compilation
- **Deployment Method:** Git-based continuous deployment

### Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development and testing |
| Staging | https://worksheetgenerator-staging.vercel.app | https://worksheetgenerator-staging.vercel.app/api | Pre-production testing and validation |
| Production | https://worksheetgenerator.ai | https://worksheetgenerator.ai/api | Live environment serving UK teachers |

## Security and Performance

### Security Requirements

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

### Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <500KB initial bundle, <200KB per route chunk, tree shaking for unused shadcn/ui components
- Loading Strategy: Next.js automatic code splitting, dynamic imports for heavy components, progressive image loading with blur placeholders
- Caching Strategy: Static assets cached for 1 year, API responses cached for 5 minutes, user configuration localStorage persistence

**Backend Performance:**
- Response Time Target: <2 seconds for API routes, <7 seconds for worksheet generation, <1 second for usage counter updates
- Database Optimization: Indexed queries on user_id and timestamp fields, connection pooling via Supabase (max 100 connections), query optimization with EXPLAIN analysis
- Caching Strategy: Curriculum data cached in memory, PDF files cached in Supabase Storage with CDN, usage counters real-time via WebSocket subscriptions

## Testing Strategy

### Testing Pyramid

```
                  E2E Tests
                 /        \
            Integration Tests
               /            \
          Frontend Unit  Backend Unit
```

### Test Organization

#### Frontend Tests
- Component unit tests with React Testing Library
- Custom hook tests with testing utilities
- State management tests for Zustand stores
- Utility function tests with Vitest

#### Backend Tests  
- API route tests with mocked dependencies
- Service layer unit tests
- Database function tests
- Repository pattern tests

#### E2E Tests
- Authentication workflows with Playwright
- Core worksheet generation flow testing
- Payment and subscription flow validation
- Cross-browser compatibility testing

## Coding Standards

### Critical Fullstack Rules

- **Type Sharing:** Always define shared types in `lib/types/` and import consistently across frontend and backend to prevent API contract mismatches
- **API Calls:** Never make direct fetch calls from components - use service layer functions from `lib/services/` for consistent error handling and request formatting
- **Environment Variables:** Access only through config objects in `lib/config/`, never `process.env` directly in components to enable runtime validation and defaults
- **Error Handling:** All API routes must use standardized error response format with consistent status codes and error message structure
- **State Updates:** Never mutate Zustand state directly - use store actions to maintain predictable state transitions and enable debugging
- **Database Access:** Always use repository pattern from `lib/repositories/` rather than direct Supabase calls to abstract data access logic
- **Authentication Guards:** All protected routes and API endpoints must use `requireAuth()` middleware for consistent security enforcement
- **Input Validation:** Use Zod schemas defined in `lib/utils/validation.ts` for both frontend forms and API route validation to maintain data consistency

### Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `ConfigurationPanel.tsx` |
| Hooks | camelCase with 'use' | - | `useWorksheetGeneration.ts` |
| API Routes | - | kebab-case | `/api/worksheets/generate` |
| Database Tables | - | snake_case | `worksheet_generations` |
| Service Functions | camelCase | camelCase | `generateWorksheet()` |
| Store Actions | camelCase | - | `updateConfiguration()` |
| Type Interfaces | PascalCase | PascalCase | `WorksheetConfig` |
| Constants | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `MAX_QUESTION_COUNT` |
| CSS Classes | kebab-case | - | `configuration-panel` |
| Environment Variables | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `GEMINI_API_KEY` |

## Error Handling Strategy

### Error Flow

```mermaid
sequenceDiagram
    participant User as Teacher
    participant UI as Frontend
    participant API as API Route
    participant Service as Service Layer
    participant External as External API

    User->>UI: Generate Worksheet
    UI->>API: POST /api/worksheets/generate
    API->>Service: WorksheetService.generate()
    Service->>External: Gemini API call
    
    alt Success Path
        External->>Service: HTML content
        Service->>API: Worksheet result
        API->>UI: 200 + worksheet data
        UI->>User: Display PDF preview
    else API Error
        External-->>Service: API timeout/error
        Service-->>API: Throw ServiceError
        API-->>UI: 500 + error details
        UI-->>User: Show retry option
    else Validation Error
        API-->>UI: 400 + validation details
        UI-->>User: Highlight form errors
    else Usage Limit Error
        API-->>UI: 429 + limit details
        UI-->>User: Show upgrade prompt
    end
```

### Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
  success: false;
}
```

## Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics with Web Vitals tracking, React Error Boundaries with custom error reporting, performance monitoring via Navigation Timing API
- **Backend Monitoring:** Vercel Functions logs with structured logging, Supabase built-in database performance insights, custom metrics via API route instrumentation
- **Error Tracking:** Custom error reporting service integrated with Vercel Functions, centralized error aggregation and alerting system
- **Performance Monitoring:** Real-time worksheet generation time tracking, database query performance monitoring, API response time measurement

### Key Metrics

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

## Checklist Results Report

*[This section will be populated with the architect checklist results after document completion]*