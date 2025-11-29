# WorksheetGenerator.AI - Comprehensive Codebase Overview

## Project Overview

**WorksheetGenerator.AI** is a Next.js 14+ application that generates AI-powered math worksheets for UK primary school teachers. The system uses Google Gemini 2.5 Flash for content generation, producing professional PDF worksheets aligned with the UK National Curriculum.

**Target Users:** UK primary school teachers (Reception through Year 6)  
**Core Value:** Generate curriculum-aligned math worksheets in 5-7 seconds

---

## Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 14+ (App Router) | Full-stack React framework |
| **UI** | shadcn/ui + Tailwind CSS | Component library & styling |
| **Database** | Supabase PostgreSQL | User data, worksheet library |
| **Auth** | Supabase Auth (Google OAuth) | Teacher authentication |
| **AI** | Google Gemini 2.5 Flash | Worksheet content generation |
| **PDF** | Puppeteer / @sparticuz/chromium | HTML-to-PDF conversion |
| **Images** | ImageKit CDN, Local /images/ | Educational image assets |
| **Testing** | Vitest, Playwright | Unit, integration, E2E tests |
| **Deployment** | Vercel | Hosting & serverless functions |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  /create          → Worksheet configuration UI                  │
│  /preview         → Live worksheet preview                      │
│  /library         → Browse saved worksheets                     │
│  /free-printables → Public SEO hub pages                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API ROUTES (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  /api/generate-stream     → SSE streaming generation            │
│  /api/generate-worksheet  → Standard generation                 │
│  /api/library/*           → Library CRUD operations             │
│  /api/worksheets/generate-pdf → PDF conversion                  │
│  /api/curriculum/*        → Topic/subtopic data                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CORE SERVICES                               │
├─────────────────────────────────────────────────────────────────┤
│  gemini.ts            → AI generation orchestration             │
│  promptService.ts     → Unified prompt engineering              │
│  pdfGenerationService → HTML-to-PDF conversion                  │
│  libraryService.ts    → Worksheet CRUD + Supabase               │
│  imageLibraryService  → Educational image management            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│  Google Gemini API    → Content generation                      │
│  Supabase             → Database, Auth, Storage                 │
│  ImageKit             → CDN for optimized images                │
│  Vercel               → Hosting, Edge functions                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
worksheetgenerator-ai/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Auth routes (login/callback)
│   │   ├── admin/              # Admin dashboard
│   │   ├── api/                # API routes (see below)
│   │   ├── create/             # Worksheet creation page
│   │   ├── free-printables/    # SEO hub pages
│   │   ├── library/            # Worksheet library browser
│   │   ├── name-lists/         # Student name management
│   │   ├── preview/            # Worksheet preview
│   │   ├── privacy/            # Privacy policy
│   │   └── terms/              # Terms of service
│   │
│   ├── components/             # React components
│   │   ├── admin/              # Admin-specific components
│   │   ├── ads/                # AdSense integration
│   │   ├── homepage/           # Landing page components
│   │   ├── library/            # Library browser components
│   │   ├── mobile/             # Mobile-specific components
│   │   ├── states/             # Loading/error state components
│   │   ├── ui/                 # shadcn/ui components
│   │   └── worksheet/          # Worksheet display components
│   │
│   ├── lib/                    # Core business logic
│   │   ├── auth/               # Authentication helpers
│   │   ├── config/             # Configuration (taxonomy, options)
│   │   ├── data/               # Static data (curriculum, layouts)
│   │   ├── helpers/            # Utility helpers
│   │   ├── hooks/              # React hooks
│   │   ├── prompts/            # AI prompt templates
│   │   │   ├── configurations/ # Config-specific prompts (by year/topic)
│   │   │   └── shared/         # Shared prompt components
│   │   ├── services/           # Core services (see below)
│   │   ├── supabase/           # Supabase client
│   │   ├── templates/          # Layout HTML templates
│   │   ├── types/              # TypeScript interfaces
│   │   └── utils/              # Utility functions
│   │
│   ├── styles/                 # Global styles
│   ├── tests/                  # Unit tests
│   └── worksheet-engine/       # Quality assessment system
│
├── tests/                      # Test suites
│   ├── e2e/                    # Playwright E2E tests
│   ├── api/                    # API route tests
│   └── integration/            # Integration tests
│
├── scripts/                    # Automation scripts
│   ├── autonomous-worksheet-quality-agent.js
│   ├── batch-parallel-agent.js
│   └── vision-catalog-claude.js
│
├── docs/                       # Documentation
│   ├── prd/                    # Product requirements
│   ├── stories/                # User stories
│   └── architecture.md         # Full architecture document
│
├── public/                     # Static assets
│   ├── images/                 # Educational images (333+ curated)
│   ├── images-flat/            # Flat-style images
│   └── icons/                  # App icons
│
├── supabase/                   # Database migrations
│   └── migrations/             # SQL migration files
│
├── .claude/                    # Claude Code configuration
│   ├── agents/                 # Automated agent prompts
│   └── skills/                 # Claude Code skills
│
└── .bmad-core/                 # BMAD workflow system
```

---

## Core Services

### 1. gemini.ts - AI Generation Orchestration
**Location:** `src/lib/services/gemini.ts`

Main entry point for worksheet generation. Orchestrates the complete pipeline:
1. Validates configuration (layout, question count, names)
2. Calls PromptService for optimized prompts
3. Makes Gemini API calls with dynamic token limits
4. Parses and validates generated HTML
5. Injects copyright and dev metrics

**Key Functions:**
- `generateWorksheet(config, options)` → Main generation function
- `callGeminiWithRetry(prompt, config, metrics)` → API call with retry logic
- `calculateOptimalTokens(config)` → Dynamic token optimization
- `parseGeneratedContent(content, config)` → HTML parsing/validation

### 2. promptService.ts - Unified Prompt Engineering
**Location:** `src/lib/services/promptService.ts`

Central prompt generation service implementing USP (Unified Service Prompt) architecture:
- Loads config-specific prompts from `src/lib/prompts/configurations/`
- Falls back to generic prompt if no specific prompt exists
- Applies freshness tracking (avoids repeating content)
- Handles region-specific variations (UK/US)

**Prompt File Location:**
```
src/lib/prompts/configurations/
├── reception/
│   ├── number-counting/
│   │   ├── counting-to-10-COMPRESSED.md
│   │   └── number-recognition-COMPRESSED.md
│   └── shape-space/
├── year1/
├── year2/
└── year3/
```

### 3. libraryService.ts - Worksheet Library
**Location:** `src/lib/services/libraryService.ts`

Manages worksheet storage in Supabase:
- Save worksheets with metadata, thumbnails, PDFs
- Browse/search worksheets with filters
- Generate similar worksheets
- Track versions and quality scores

### 4. pdfGenerationService.ts - PDF Conversion
**Location:** `src/lib/services/pdfGenerationService.ts`

Converts HTML worksheets to print-ready PDFs:
- Uses Puppeteer with @sparticuz/chromium for serverless
- A4 format optimization
- Proper margins and scaling

### 5. imageLibraryService.ts - Educational Images
**Location:** `src/lib/services/imageLibraryService.ts`

Manages 333+ curated educational images:
- Categories: fruits, vegetables, animals, school items, shapes, coins
- Provides image suggestions based on question context
- Handles fallback images

---

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/generate-stream` | POST | SSE streaming worksheet generation |
| `/api/generate-worksheet` | POST | Standard worksheet generation |
| `/api/worksheets/generate-pdf` | POST | HTML → PDF conversion |
| `/api/library/save` | POST | Save worksheet to library |
| `/api/library/browse` | GET | Browse library with filters |
| `/api/library/[id]` | GET/PUT/DELETE | Single worksheet operations |
| `/api/library/ai-search` | POST | AI-powered worksheet search |
| `/api/curriculum/topics` | GET | Get topics for year group |
| `/api/curriculum/subtopics` | GET | Get subtopics for topic |

---

## Data Models

### WorksheetConfig (Input)
```typescript
interface WorksheetConfig {
  layout: LayoutType          // 'standard' | 'fluency' | 'grid' | etc.
  topic: string               // e.g., 'number-counting'
  subtopic: string            // e.g., 'counting-to-10'
  difficulty: DifficultyLevel // 'easy' | 'average' | 'hard'
  questionCount: number       // 5-30
  yearGroup: string           // 'Reception' | 'Year 1' | etc.
  studentNames?: string[]     // Optional student names
  visualTheme?: VisualTheme   // 'animals' | 'food' | 'sports' | etc.
  region?: 'UK' | 'US'        // Region for currency/measurements
}
```

### GeneratedWorksheet (Output)
```typescript
interface GeneratedWorksheet {
  title: string
  html: string                // Complete HTML document
  metadata: {
    topic: string
    subtopic: string
    difficulty: DifficultyLevel
    questionCount: number
    curriculum: string
    generatedAt: string
    promptTemplate?: string
    qualityScore?: number
  }
}
```

### Library Worksheet (Supabase)
```typescript
interface LibraryWorksheet {
  id: string
  title: string
  year_group: string
  topic: string
  subtopic: string
  difficulty: string
  question_count: number
  html_content: string
  thumbnail_url: string
  pdf_url: string
  quality_score: number
  region: 'UK' | 'US'
  created_at: string
  updated_at: string
}
```

---

## Key Workflows

### 1. Worksheet Generation Flow
```
User configures → API validates → PromptService generates prompt
→ Gemini API generates HTML → Parse & validate → Inject branding
→ Return to client → Optional: Save to library / Generate PDF
```

### 2. Library Save Flow
```
User clicks "Save" → Generate thumbnail (Sharp) → Generate PDF (Puppeteer)
→ Upload to Supabase Storage → Save metadata to database → Return success
```

### 3. Quality Assessment (Autonomous Agent)
```
Run agent → Generate N worksheets → Vision assessment (Claude)
→ Score each worksheet → Generate HTML report → Open in browser
```

---

## Environment Variables

```bash
# AI Generation
GEMINI_API_KEY=            # Google Gemini API key

# Database & Auth
NEXT_PUBLIC_SUPABASE_URL=  # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Image CDN (optional)
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# Development
NODE_ENV=development
SHOW_DEV_METRICS=true      # Show generation metrics on worksheets
```

---

## Testing

### Unit Tests (Vitest)
```bash
npm test                   # Run all unit tests
npm test -- --watch        # Watch mode
```

### E2E Tests (Playwright)
```bash
npx playwright test                              # All E2E tests
npx playwright test tests/e2e/library.spec.ts   # Specific test
npx playwright test --grep "SMOKE"              # Smoke tests only
```

### Quality Assessment
```bash
# Run autonomous worksheet quality agent (3 iterations, 2 cycles)
# See CLAUDE.md for trigger phrase
```

---

## Development Commands

```bash
npm run dev                    # Start dev server (port 3000)
npm run build                  # Production build
npm run lint                   # ESLint
npm run worksheet-engine       # Run worksheet engine CLI
npm run prompt-automation      # Run prompt engineering automation
```

---

## Key Files for Understanding the System

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Claude Code guidance & memory |
| `docs/architecture.md` | Full architecture document |
| `src/lib/services/gemini.ts` | Core AI generation logic |
| `src/lib/services/promptService.ts` | Prompt engineering |
| `src/lib/config/worksheetTaxonomy.ts` | Curriculum structure |
| `src/lib/data/curriculum.ts` | Year group/topic data |
| `src/lib/types/worksheet.ts` | Core TypeScript types |

---

## Quality Targets

- **Generation Time:** ≤7 seconds
- **Quality Score:** ≥4.5/5.0 (Vision assessment)
- **Image Success Rate:** ≥97% (no broken images)
- **Question Accuracy:** 100% curriculum-aligned

---

## Recent Updates (as of project state)

1. **Config-Specific Prompts:** Moved from generic prompts to per-config `.md` files
2. **Image System:** Migrated to `/images/` directory (333+ curated images)
3. **Region Support:** Added UK/US region variations for money topics
4. **Freshness Tracking:** Prevents duplicate content across generations
5. **Library System:** Complete CRUD with thumbnails, PDFs, search
