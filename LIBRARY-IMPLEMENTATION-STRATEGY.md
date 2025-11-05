# Autonomous Implementation Strategy for Worksheet Library

**TRIGGER PHRASE**: "execute complete implementation guide"

---

## 🎯 Strategic Overview

This document defines Claude Code's autonomous approach to implementing the complete worksheet library feature from COMPLETE-IMPLEMENTATION-GUIDE.md.

### **Core Principles**

1. **Claude Code Drives**: Takes strategic decisions, implements autonomously
2. **User Checkpoints**: Clear pause points for user review and approval
3. **Quality Gates**: Must pass before moving to next phase
4. **Test-Driven**: Test after every phase before proceeding
5. **Git-Tracked**: Atomic commits, feature branches, clean history
6. **Multi-Session Safe**: Can pause/resume at any checkpoint

---

## 📅 Implementation Timeline

**Total**: 6-7 sessions (10-15 hours of work)

```
Session 1: Phase 1 (Database) - 2 hours
Session 2: Phase 2 (Services) - 2-3 hours
Session 3: Phase 3 (API Routes) - 2 hours
Session 4: Phase 4.1-4.2 (Browse UI) - 2 hours
Session 5: Phase 4.3-4.4 (Admin Features) - 2-3 hours
Session 6: Phase 4.5 (Topic Guide Pages) - 2 hours
Session 7: Phase 5 (Testing & Deployment) - 2-3 hours
```

---

## 🛑 Mandatory Pause Points (User Review Required)

Claude Code will **automatically pause and wait for user approval** at these checkpoints:

### **Checkpoint 1: After Database Setup** ⏸️
- **Phase**: 1 (Foundation & Database)
- **Deliverables**: Database schema, indexes, RLS policies, sample data
- **User Action**: Review Supabase dashboard, verify table structure
- **Resume Command**: "continue to phase 2"

### **Checkpoint 2: After Services Layer** ⏸️
- **Phase**: 2 (Services & Backend)
- **Deliverables**: Type definitions, service functions, unit tests passing
- **User Action**: Review code quality, run tests manually
- **Resume Command**: "continue to phase 3"

### **Checkpoint 3: After API Routes** ⏸️
- **Phase**: 3 (API Endpoints)
- **Deliverables**: All API routes, integration tests, Postman collection
- **User Action**: Test API endpoints manually, verify responses
- **Resume Command**: "continue to phase 4"

### **Checkpoint 4: After Browse UI** ⏸️
- **Phase**: 4.1-4.2 (Library Browser & Detail View)
- **Deliverables**: Public-facing library UI working
- **User Action**: Browse library in browser, test filtering, download PDFs
- **Resume Command**: "continue to admin features"

### **Checkpoint 5: After Admin Features** ⏸️
- **Phase**: 4.3-4.4 (Save Button & Admin Dashboard)
- **Deliverables**: Admin authentication, save to library working
- **User Action**: Test saving worksheets, verify authentication
- **Resume Command**: "continue to topic guide pages"

### **Checkpoint 6: After Topic Guide Pages** ⏸️
- **Phase**: 4.5 (SEO Topic Pages)
- **Deliverables**: Topic guide pages, SSG working, SEO metadata
- **User Action**: Review topic pages, verify SEO tags
- **Resume Command**: "continue to testing"

### **Checkpoint 7: Final Review** ⏸️
- **Phase**: 5 (Testing & Deployment)
- **Deliverables**: E2E tests, deployment ready, documentation
- **User Action**: Final approval for production deployment
- **Resume Command**: "deploy to production"

---

## 🔄 Phase-by-Phase Autonomous Workflow

### **Pre-Phase (Every Phase)**

Claude Code will autonomously:

1. ✅ **Create Feature Branch**: `git checkout -b feature/library-phase-N-description`
2. ✅ **Read Implementation Guide**: Review relevant phase from COMPLETE-IMPLEMENTATION-GUIDE.md
3. ✅ **Update Progress Tracking**: Mark phase as "in_progress" in TodoWrite
4. ✅ **Announce Plan**: Tell user what will be implemented in this phase

---

### **PHASE 1: Database Foundation** (Session 1)

**Branch**: `feature/library-phase-1-database`

#### **Autonomous Steps:**

1. **Environment Check**
   - Verify Supabase CLI access (`npx supabase`)
   - Check .env.local for credentials
   - Test Supabase connection

2. **Database Schema Creation**
   - Create `library_worksheets` table with ALL fields
   - Include `region` field (default 'UK')
   - Add all constraints and defaults
   - Execute via Supabase SQL editor or migration

3. **Index Creation**
   - Create composite indexes (region + status + published_at)
   - Create topic/subtopic indexes
   - Create search optimization indexes

4. **Row Level Security**
   - Enable RLS on library_worksheets
   - Create public SELECT policy
   - Create authenticated INSERT/UPDATE/DELETE policies

5. **Sample Data Insertion**
   - Insert 3-5 sample worksheets
   - Cover different year groups and topics
   - Include variety of themes/layouts

6. **Verification Tests**
   - Query sample data
   - Test RLS policies (authenticated vs anonymous)
   - Verify indexes are used (EXPLAIN ANALYZE)

#### **Quality Gate:**

- [ ] Table created successfully
- [ ] All indexes exist
- [ ] RLS policies working
- [ ] Sample data queryable
- [ ] No SQL errors

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 1 - Database schema, indexes, and RLS policies

- Created library_worksheets table with region field
- Added composite indexes for performance
- Configured RLS for admin-write, public-read
- Inserted sample data for testing

✅ Phase 1 Complete - Database Foundation"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 1**

**Claude Code says:**
```
✅ Phase 1 Complete - Database Foundation

Deliverables:
- library_worksheets table created
- 3 composite indexes added
- RLS policies configured (admin-write, public-read)
- 5 sample worksheets inserted

Next Steps:
1. Review Supabase dashboard: [URL]
2. Verify table structure matches guide
3. Check sample data in SQL editor

When ready, type: "continue to phase 2"
```

---

### **PHASE 2: Services & Backend** (Session 2)

**Branch**: `feature/library-phase-2-services`

#### **Autonomous Steps:**

1. **Type Definitions**
   - Create `src/lib/types/library.ts`
   - Define LibraryWorksheet interface (with region)
   - Define LibraryFilters (with topic/subtopic)
   - Define CreateLibraryWorksheetInput
   - Export all types

2. **Library Service Functions**
   - Create `src/lib/services/libraryService.ts`
   - Implement `browseLibraryWorksheets(filters)` with region='UK' filter
   - Implement `getLibraryWorksheetBySlug(slug)`
   - Implement `createLibraryWorksheet(input)` (defaults to region='UK')
   - Implement `updateLibraryWorksheet(id, updates)`
   - Implement `deleteLibraryWorksheet(id)`
   - Implement `incrementViewCount(id)`
   - Implement `incrementDownloadCount(id)`

3. **Slug Generation Utility**
   - Create `src/lib/utils/slugify.ts`
   - Implement slug generation from title + differentiators
   - Handle collisions with numeric suffix

4. **Thumbnail Service Integration**
   - Update `src/lib/services/thumbnailService.ts`
   - Add ImageKit upload function (using MCP if available)
   - Generate thumbnail from HTML content
   - Return ImageKit CDN URL

5. **Unit Tests**
   - Create `src/lib/services/__tests__/libraryService.test.ts`
   - Mock Supabase client
   - Test all CRUD operations
   - Test filter combinations
   - Test region filtering (UK only)

#### **Quality Gate:**

- [ ] All types defined correctly
- [ ] All service functions implemented
- [ ] Unit tests written and passing
- [ ] No TypeScript errors
- [ ] Code reviewed by code-reviewer subagent

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 2 - Service layer with UK region filtering

- Added LibraryWorksheet types with region field
- Implemented libraryService with full CRUD operations
- Hard-coded UK region filter for MVP
- Added slug generation utility
- Unit tests passing (12/12)

✅ Phase 2 Complete - Services & Backend"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 2**

---

### **PHASE 3: API Endpoints** (Session 3)

**Branch**: `feature/library-phase-3-api-routes`

#### **Autonomous Steps:**

1. **Browse API Route**
   - Create `src/app/api/library/browse/route.ts`
   - Accept filters as query params (year_group, topic, subtopic, search, sort_by)
   - Call libraryService.browseLibraryWorksheets()
   - Return paginated JSON response
   - Add proper error handling

2. **Detail API Route**
   - Create `src/app/api/library/[slug]/route.ts`
   - Get worksheet by slug
   - Increment view count
   - Return full worksheet data

3. **Download API Route**
   - Create `src/app/api/library/[slug]/download/route.ts`
   - Generate PDF from HTML content (use existing PDF generation)
   - Increment download count
   - Stream PDF response

4. **Admin Create Route**
   - Create `src/app/api/library/admin/create/route.ts`
   - Require authentication (Supabase Auth)
   - Generate thumbnail with ImageKit MCP
   - Create worksheet entry
   - Return success/error

5. **Admin Update/Delete Routes**
   - Create `src/app/api/library/admin/[id]/route.ts`
   - PATCH for updates
   - DELETE for removal
   - Require auth + ownership check

6. **Integration Tests**
   - Create `tests/api/library.test.ts`
   - Test browse with various filters
   - Test detail view
   - Test download (mock PDF generation)
   - Test admin routes (mock auth)

#### **Quality Gate:**

- [ ] All API routes implemented
- [ ] Authentication working on admin routes
- [ ] Integration tests passing
- [ ] Manual API testing with curl/Postman
- [ ] Proper error responses

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 3 - API endpoints with authentication

- Browse API with topic/subtopic/year_group filters
- Detail view with auto view tracking
- PDF download with count tracking
- Admin CRUD routes with Supabase Auth
- Integration tests passing (8/8)

✅ Phase 3 Complete - API Endpoints"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 3**

---

### **PHASE 4.1-4.2: Browse UI** (Session 4)

**Branch**: `feature/library-phase-4-browse-ui`

#### **Autonomous Steps:**

1. **Library Browser Page**
   - Create `src/app/library/page.tsx`
   - Server-side rendering with ISR (revalidate: 3600)
   - Implement filter sidebar (year_group, topic, subtopic, visual_theme, activity_type, seasonal_theme)
   - Grid layout for worksheet cards
   - Pagination
   - Search bar

2. **Worksheet Card Component**
   - Create `src/components/library/WorksheetCard.tsx`
   - Show thumbnail from ImageKit CDN
   - Display title, year_group, topic
   - Show download count (no ratings)
   - Link to detail page

3. **Filter Component**
   - Create `src/components/library/LibraryFilters.tsx`
   - Dropdowns for year_group (Priority 1)
   - Dropdowns for topic/subtopic (Priority 2-3)
   - Dropdowns for visual_theme, activity_type, seasonal_theme
   - Search input
   - Sort options (newest, popular, downloads)
   - Update URL params on filter change

4. **Detail View Page**
   - Create `src/app/library/[slug]/page.tsx`
   - SSG with fallback: 'blocking'
   - Show full worksheet details
   - Preview image (thumbnail)
   - Download PDF button
   - Related worksheets section
   - View count + download count display

5. **Visual Testing**
   - Open dev server in browser
   - Test filtering combinations
   - Test search
   - Test pagination
   - Test download button

#### **Quality Gate:**

- [ ] Browse page renders correctly
- [ ] Filters work (URL params update)
- [ ] Detail page shows worksheet info
- [ ] Download button triggers PDF generation
- [ ] Responsive design works
- [ ] No console errors

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 4.1-4.2 - Public browse UI with topic filters

- Library browse page with ISR
- Filter sidebar (year/topic/subtopic/theme/activity/season)
- Worksheet cards with thumbnails
- Detail view with download tracking
- Responsive grid layout

✅ Phase 4.1-4.2 Complete - Browse UI"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 4**

---

### **PHASE 4.3-4.4: Admin Features** (Session 5)

**Branch**: `feature/library-phase-4-admin-features`

#### **Autonomous Steps:**

1. **Supabase Auth Setup**
   - Configure Supabase Auth providers (Email, Google)
   - Create auth middleware
   - Add sign-in/sign-out buttons

2. **Save to Library Button**
   - Add to existing worksheet generator result page
   - Show only when authenticated
   - Modal to set title, tags, theme, activity type
   - Call admin create API
   - Show success/error toast

3. **Admin Dashboard**
   - Create `src/app/admin/library/page.tsx`
   - Require authentication
   - List user's published worksheets
   - Edit/delete actions
   - Publish/unpublish toggle

4. **Auth Context**
   - Create `src/contexts/AuthContext.tsx`
   - Wrap app with auth provider
   - Provide user state globally

5. **E2E Test for Admin Flow**
   - Create `tests/e2e/library-admin.spec.ts`
   - Test login
   - Test saving worksheet
   - Test editing/deleting

#### **Quality Gate:**

- [ ] Authentication working (Google + Email)
- [ ] Save to library button appears for admins
- [ ] Admin dashboard accessible
- [ ] Can publish/edit/delete worksheets
- [ ] E2E test passing

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 4.3-4.4 - Admin features with Supabase Auth

- Supabase Auth integration (Email + Google)
- Save to Library button in worksheet generator
- Admin dashboard for managing worksheets
- Edit/delete functionality
- E2E test for admin flow passing

✅ Phase 4.3-4.4 Complete - Admin Features"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 5**

---

### **PHASE 4.5: Topic Guide Pages** (Session 6)

**Branch**: `feature/library-phase-4.5-topic-guides`

#### **Autonomous Steps:**

1. **Topic Guide Page Route**
   - Create `src/app/library/topics/[topic-slug]/page.tsx`
   - Generate static params for all topics
   - SSG for all topic pages

2. **Topic Content Generator**
   - Create `src/lib/utils/topicGuides.ts`
   - Define educational content for each topic
   - 200-300 words intro per topic
   - Key learning points
   - Age-appropriate descriptions

3. **Topic Page UI**
   - Educational introduction section
   - Year group filter buttons
   - Grid of all worksheets for topic
   - SEO metadata (title, description, Open Graph)

4. **Topic Index Page**
   - Create `src/app/library/topics/page.tsx`
   - List all topics with descriptions
   - Link to topic guide pages
   - Breadcrumb navigation

5. **Internal Linking**
   - Add "Browse by Topic" link in library navbar
   - Add topic links in worksheet detail pages
   - Add breadcrumbs

6. **SEO Verification**
   - Check meta tags
   - Verify structured data
   - Test with Google Rich Results Test

#### **Quality Gate:**

- [ ] All topic pages generate successfully
- [ ] Educational content displays
- [ ] Year group filtering works
- [ ] SEO metadata correct
- [ ] Internal links working

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 4.5 - Topic guide pages for SEO

- Topic guide pages with educational content
- SSG for 50+ topic/year-group combinations
- SEO metadata and Open Graph tags
- Internal linking strategy
- Breadcrumb navigation

✅ Phase 4.5 Complete - Topic Guide Pages"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 6**

---

### **PHASE 5: Testing & Deployment** (Session 7)

**Branch**: `feature/library-phase-5-testing-deployment`

#### **Autonomous Steps:**

1. **E2E Test Suite**
   - Create `tests/e2e/library-public-flow.spec.ts`
   - Test browse → filter → detail → download flow
   - Test search functionality
   - Test topic guide navigation

2. **Performance Testing**
   - Run Lighthouse audit
   - Check SSG/ISR working correctly
   - Verify ImageKit CDN loading
   - Test loading times

3. **Documentation**
   - Update README with library feature
   - Create LIBRARY-USER-GUIDE.md
   - Create LIBRARY-ADMIN-GUIDE.md

4. **Deployment Preparation**
   - Run production build (`npm run build`)
   - Fix any build errors
   - Test production build locally
   - Verify environment variables in Vercel

5. **Final Code Review**
   - Run code-reviewer subagent on all new code
   - Fix any critical issues
   - Optimize images/code

6. **Create Master PR**
   - Merge all feature branches
   - Create comprehensive PR description
   - Link to all checkpoints

#### **Quality Gate:**

- [ ] All E2E tests passing
- [ ] Production build successful
- [ ] Lighthouse score > 90
- [ ] Documentation complete
- [ ] Code review passed

#### **Git Commit:**

```bash
git add .
git commit -m "feat(library): Phase 5 - Testing and deployment ready

- E2E test suite complete (15/15 tests passing)
- Production build optimized
- Documentation updated
- Performance: Lighthouse 95/100
- Ready for production deployment

✅ Phase 5 Complete - Ready to Deploy"
```

#### **Pause Point:** ⏸️ **CHECKPOINT 7 (Final Review)**

---

## 🤖 Autonomous Decision-Making Authority

Claude Code has **full authority** to make these decisions without asking:

### **Technical Decisions** ✅

- Choice of component structure
- File organization
- Naming conventions
- Code patterns (existing codebase style)
- Test strategies
- Error handling approaches
- Loading states and UX improvements

### **Implementation Decisions** ✅

- Order of implementation within a phase
- Refactoring for code quality
- Adding helpful utilities
- Performance optimizations
- Accessibility improvements

### **Quality Decisions** ✅

- When to use code-reviewer subagent
- When to add extra tests
- When to refactor for clarity
- When to add comments

### **Requires User Approval** ❌

- Moving to next phase (must wait for checkpoint approval)
- Changing database schema beyond the guide
- Adding new features not in guide
- Deploying to production
- Changing authentication strategy
- Major architectural changes

---

## 📊 Progress Tracking

Claude Code will autonomously maintain:

1. **TodoWrite**: Real-time task tracking during each phase
2. **Git Commits**: Atomic commits with clear messages
3. **Progress File**: Auto-update LIBRARY-IMPLEMENTATION-PROGRESS.md

---

## 🔍 Quality Assurance Protocol

After each phase, Claude Code will autonomously:

1. **Run Tests**: Execute all relevant tests
2. **Code Review**: Use code-reviewer subagent
3. **Manual Verification**: Test the feature manually
4. **Git Commit**: Create atomic commit
5. **Report Status**: Summarize deliverables to user

---

## 🚨 Error Handling Protocol

If Claude Code encounters errors:

1. **Try to Fix**: Attempt autonomous resolution (max 3 attempts)
2. **Document Issue**: Log error in LIBRARY-ISSUES.md
3. **Report to User**: Explain error and proposed solution
4. **Wait for Guidance**: Pause if critical blocker

---

## 📝 Session Start Protocol

When user types **"execute complete implementation guide"**:

### **Claude Code Will:**

1. ✅ Read LIBRARY-IMPLEMENTATION-PROGRESS.md to find current phase
2. ✅ Read COMPLETE-IMPLEMENTATION-GUIDE.md for implementation details
3. ✅ Create/checkout appropriate feature branch
4. ✅ Announce current phase and plan
5. ✅ Request confirmation: "Ready to start Phase X? (yes/no)"
6. ✅ Execute autonomously until checkpoint
7. ✅ Pause at checkpoint with clear deliverables summary

### **User Will:**

1. Type: **"execute complete implementation guide"**
2. Confirm start: **"yes"**
3. Wait for checkpoint pause
4. Review deliverables
5. Type resume command when ready: **"continue to phase X"**

---

## 🎯 Success Criteria

Implementation is complete when:

- [ ] All 7 checkpoints passed
- [ ] All tests passing (unit + integration + E2E)
- [ ] Production build successful
- [ ] Documentation complete
- [ ] User approves final review
- [ ] Feature deployed to production

---

## 📞 User Commands

| Command | Action |
|---------|--------|
| `execute complete implementation guide` | Start/resume implementation |
| `continue to phase N` | Approve checkpoint, move to next phase |
| `pause implementation` | Save progress, create checkpoint branch |
| `show progress` | Display current status and next steps |
| `review phase N` | Show summary of completed phase |
| `deploy to production` | Final deployment after checkpoint 7 |

---

**END OF STRATEGY**

*Claude Code: Autonomous, strategic, quality-focused implementation.*
