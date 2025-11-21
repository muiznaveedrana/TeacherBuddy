# TeacherBuddy/FreeMathPrintable E2E Test Plan

**Version:** 1.0
**Last Updated:** 2025-11-21
**Application:** TeacherBuddy/FreeMathPrintable Worksheet Generator

---

## Table of Contents

1. [Application Overview](#application-overview)
2. [Current Test Coverage](#current-test-coverage)
3. [Test Scenarios by Feature Area](#test-scenarios-by-feature-area)
4. [Coverage Gaps & Priorities](#coverage-gaps--priorities)
5. [Critical User Journeys](#critical-user-journeys)
6. [Edge Cases & Error Handling](#edge-cases--error-handling)
7. [Mobile & Responsiveness](#mobile--responsiveness)
8. [Performance & SEO](#performance--seo)

---

## 1. Application Overview

### Key Features

**TeacherBuddy** is a UK curriculum-aligned worksheet generator with the following core features:

- **Worksheet Generation**: AI-powered worksheet creation with streaming generation
- **Library System**: Browse, save, search, and manage worksheets
- **Interactive Worksheets**: Gamified interactive mode with answer checking
- **Name Lists**: Personalized worksheet generation with student names
- **Admin Panel**: Library management, publishing, and moderation
- **Authentication**: Supabase-based authentication (Google OAuth)
- **SEO**: Sitemap, robots.txt, and meta tags for organic traffic

### Technology Stack

- **Framework**: Next.js 14.2.15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API (streaming)
- **PDF Generation**: Puppeteer + Chrome
- **Testing**: Playwright (Chromium only for speed)

### Supported User Roles

1. **Anonymous Users**: Browse library, view worksheets
2. **Authenticated Users**: Generate worksheets, save to library
3. **Admin Users**: Publish/unpublish worksheets, manage library

---

## 2. Current Test Coverage

### Existing Test Files

| Test File | Coverage | Status |
|-----------|----------|--------|
| `new-user-flow.spec.ts` | Landing → Login → Dashboard | ✅ Implemented |
| `library-browse.spec.ts` | Library browsing, filtering, SEO | ✅ Implemented |
| `library-save.spec.ts` | Save to library, admin panel | ✅ Implemented |
| `name-lists.spec.ts` | Name list CRUD operations | ✅ Implemented |
| `comprehensive-library-save.spec.ts` | All year groups/topics (30 configs) | ✅ Implemented |
| `library-generate-similar.spec.ts` | Generate similar worksheet feature | ✅ Implemented |
| `test-worksheet-generation.spec.ts` | Basic generation test | ✅ Implemented |

### Coverage Summary

- ✅ **Well Covered**: Authentication, library browsing, name lists, worksheet generation
- ⚠️ **Partial Coverage**: Error handling, edge cases, mobile
- ❌ **Not Covered**: Interactive mode, privacy settings, subscriptions, PDF downloads, AI search, related worksheets

---

## 3. Test Scenarios by Feature Area

### 3.1 Authentication & User Management

#### Scenario 1.1: New User Registration Flow
**Priority:** P0 (Critical)
**Status:** ✅ Covered (new-user-flow.spec.ts)

**Steps:**
1. Navigate to landing page (/)
2. Click "Start Creating" button
3. Verify redirect to /login
4. Click "Sign in with Google" button
5. Verify loading state appears
6. Verify redirect to /create dashboard

**Expected:**
- Smooth navigation flow
- Loading states shown
- Dashboard loads with worksheet form

**Edge Cases:**
- Test with existing user (should skip onboarding)
- Test authentication errors
- Test session persistence

---

#### Scenario 1.2: Profile Setup Flow (First-Time Users)
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. New user signs in with Google
2. Verify redirect to /profile-setup
3. Fill in name, school, year groups taught
4. Submit profile
5. Verify redirect to /create

**Expected:**
- Profile form validation works
- Mandatory fields enforced
- Profile saved to database

**Edge Cases:**
- Skip profile setup (should allow)
- Invalid inputs (special characters, SQL injection attempts)
- Network errors during submission

---

#### Scenario 1.3: Session Persistence
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Sign in as user
2. Generate a worksheet
3. Refresh the page
4. Verify user still authenticated
5. Verify worksheet preview still visible

**Expected:**
- Session persists across page refreshes
- No re-authentication required
- Generated content persists in sessionStorage

---

### 3.2 Worksheet Generation

#### Scenario 2.1: Standard Worksheet Generation (Happy Path)
**Priority:** P0 (Critical)
**Status:** ✅ Covered (test-worksheet-generation.spec.ts, comprehensive-library-save.spec.ts)

**Steps:**
1. Navigate to /create
2. Select Layout (e.g., "Standard Layout")
3. Select Year Group (e.g., "Year 1")
4. Select Topic (e.g., "Addition and Subtraction")
5. Select Subtopic (e.g., "Adding within 20")
6. Click "Generate Worksheet"
7. Wait for streaming generation (progress bar updates)
8. Verify worksheet preview appears
9. Verify Download PDF button enabled

**Expected:**
- Configuration form validates correctly
- Generate button enables only when all fields filled
- Streaming progress shown (SSE updates)
- Worksheet HTML renders correctly
- Answer key appears at bottom

**Edge Cases:**
- Cancel generation mid-stream
- Network interruption during generation
- API rate limiting
- Invalid topic/subtopic combinations

---

#### Scenario 2.2: Worksheet Regeneration (Freshness Mechanism)
**Priority:** P1 (High)
**Status:** ⚠️ Partially Covered

**Steps:**
1. Generate a worksheet (Year 1, Counting to 20, Apples theme)
2. Click "Regenerate" button
3. Verify new worksheet generates
4. Verify different images/objects used (freshness)
5. Regenerate again
6. Verify images continue to vary

**Expected:**
- Each regeneration uses different visual objects
- No duplicate images/objects across iterations
- Freshness tracking works (previousWorksheets ref)

**Edge Cases:**
- Regenerate >5 times (history limit)
- Regenerate with theme that has limited objects

---

#### Scenario 2.3: Visual Theme Selection
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /create
2. Configure Year 1, Counting to 10
3. Select Visual Theme: "Animals"
4. Generate worksheet
5. Verify animal images used
6. Regenerate with theme "Food"
7. Verify food images used

**Expected:**
- Theme selection changes worksheet visuals
- Images match selected theme
- Theme persists during regeneration

---

#### Scenario 2.4: PDF Download
**Priority:** P0 (Critical)
**Status:** ❌ Not Covered

**Steps:**
1. Generate a worksheet
2. Toggle "Show Answers" OFF
3. Click "Download PDF"
4. Wait for PDF generation (loading state)
5. Verify PDF downloads successfully
6. Open PDF and verify:
   - Worksheet content matches preview
   - Answer key NOT included (toggle was OFF)
   - Formatting preserved

**Expected:**
- PDF downloads as .pdf file
- Filename includes year group/topic
- PDF matches HTML preview
- Answer key respects toggle setting
- Mascots included in PDF (if added)

**Edge Cases:**
- Download with mascots added
- Download with answers ON
- Download very large worksheet (10 questions)
- PDF generation timeout/failure

---

### 3.3 Library System

#### Scenario 3.1: Browse Library
**Priority:** P0 (Critical)
**Status:** ✅ Covered (library-browse.spec.ts)

**Steps:**
1. Navigate to /library
2. Verify page loads with worksheet grid
3. Verify worksheets display with thumbnails
4. Verify metadata shown (year group, topic, difficulty)

**Expected:**
- Library page loads quickly (<3s)
- Worksheets displayed in grid layout
- Pagination/infinite scroll works
- Thumbnails load correctly

---

#### Scenario 3.2: Filter Worksheets by Year Group
**Priority:** P1 (High)
**Status:** ✅ Covered (library-browse.spec.ts)

**Steps:**
1. Navigate to /library
2. Click year group filter dropdown
3. Select "Year 1"
4. Verify URL updates with query param (?year_group=Year+1)
5. Verify only Year 1 worksheets shown
6. Verify filter badge appears

**Expected:**
- Filter applied immediately
- URL reflects filter state (shareable)
- Results update dynamically

---

#### Scenario 3.3: Search Worksheets (Text Search)
**Priority:** P1 (High)
**Status:** ⚠️ Partially Covered (library-browse.spec.ts - basic check)

**Steps:**
1. Navigate to /library
2. Enter search term "addition" in search box
3. Verify API request to /api/library/browse?search=addition
4. Verify results show only addition worksheets
5. Clear search
6. Verify all worksheets shown again

**Expected:**
- Search debounced (not instant)
- Results update dynamically
- Empty state shown if no results

**Edge Cases:**
- Search with special characters
- Search with very long query
- Search with SQL injection attempts

---

#### Scenario 3.4: AI-Powered Semantic Search
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /library
2. Click "AI Search" toggle/button
3. Enter natural language query: "worksheets for struggling students with number bonds"
4. Verify API request to /api/library/ai-search
5. Verify semantically relevant results shown
6. Verify results ranked by relevance

**Expected:**
- AI search understands intent
- Results more relevant than keyword search
- Loading state shown during AI processing

---

#### Scenario 3.5: View Worksheet Detail Page
**Priority:** P0 (Critical)
**Status:** ✅ Covered (library-browse.spec.ts)

**Steps:**
1. Navigate to /library
2. Click on a worksheet card
3. Verify navigation to /library/[slug]
4. Verify worksheet preview shown
5. Verify metadata displayed (year, topic, difficulty, tags)
6. Verify Download PDF button visible
7. Verify "Generate Similar Worksheet" button visible

**Expected:**
- Detail page loads quickly
- Preview scrollable
- Buttons functional

---

#### Scenario 3.6: Generate Similar Worksheet
**Priority:** P1 (High)
**Status:** ✅ Covered (library-generate-similar.spec.ts)

**Steps:**
1. Navigate to /library/year-1-addition-worksheet
2. Click "Generate Similar Worksheet" button
3. Verify redirect to /create with query params
4. Verify form pre-filled (year group, topic, subtopic)
5. Verify worksheet preview restored from sessionStorage
6. Verify "From Library" badge shown
7. Click "Regenerate" to generate new variation

**Expected:**
- Configuration pre-filled correctly
- Preview restored immediately
- User can regenerate or modify config

---

#### Scenario 3.7: Related Worksheets
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /library/year-1-addition-worksheet
2. Scroll to "Related Worksheets" section
3. Verify API request to /api/library/[id]/related
4. Verify 3-5 related worksheets shown
5. Click a related worksheet
6. Verify navigation to that worksheet's detail page

**Expected:**
- Related worksheets shown based on:
  - Same year group + topic
  - Same subtopic
  - Similar difficulty
- Thumbnails load correctly

---

#### Scenario 3.8: Save Worksheet to Library (Admin Only)
**Priority:** P0 (Critical)
**Status:** ✅ Covered (library-save.spec.ts, comprehensive-library-save.spec.ts)

**Steps:**
1. Sign in as admin
2. Generate a worksheet
3. Click "Save to Library" button
4. Verify modal opens
5. Verify title pre-filled (not "Generating...")
6. Fill in SEO title, meta description, tags
7. Click "Save to Library" (submit button)
8. Wait for thumbnail generation
9. Verify success message
10. Verify modal closes

**Expected:**
- Modal opens with pre-filled title
- Thumbnail generated from HTML
- Worksheet saved to database
- Success toast shown

**Edge Cases:**
- Save with duplicate title (should allow or warn)
- Save without thumbnail (should fallback gracefully)
- Network error during save

---

### 3.4 Interactive Worksheets

#### Scenario 4.1: Launch Interactive Mode
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Generate a worksheet with answers
2. Click "🎮 Interactive Worksheet" button
3. Verify navigation to /preview/interactive
4. Verify worksheet loads with interactive UI
5. Verify questions displayed
6. Verify input fields shown for answers
7. Verify "Check Answers" button visible

**Expected:**
- Interactive mode loads quickly
- All questions interactive
- Answer key hidden by default

---

#### Scenario 4.2: Answer Questions Correctly
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Launch interactive mode
2. Answer first question correctly
3. Click "Check" button
4. Verify green checkmark appears
5. Verify confetti animation plays
6. Verify score updates (1/5)

**Expected:**
- Correct answers marked green
- Visual feedback (confetti)
- Score increments

---

#### Scenario 4.3: Answer Questions Incorrectly
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Launch interactive mode
2. Answer first question incorrectly
3. Click "Check" button
4. Verify red X appears
5. Verify hint shown ("Try again!")
6. Correct the answer
7. Click "Check" again
8. Verify green checkmark appears

**Expected:**
- Incorrect answers marked red
- Hints/encouragement shown
- Allow retry without penalty

---

#### Scenario 4.4: Complete All Questions
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Launch interactive mode
2. Answer all 5 questions correctly
3. Verify completion modal appears
4. Verify final score shown (5/5)
5. Verify celebration animation
6. Click "Try Another Worksheet"
7. Verify navigation to /library

**Expected:**
- Completion modal celebrates success
- Option to try another worksheet
- Score persisted (optional)

---

#### Scenario 4.5: Interactive Mode from Library
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /library/year-1-addition-worksheet
2. Click "🎮 Try Interactive Mode" button
3. Verify navigation to /library/[slug]/interactive
4. Verify worksheet loads in interactive mode
5. Complete the worksheet
6. Verify score tracked for library worksheet

**Expected:**
- Library worksheets support interactive mode
- Progress tracked separately from generated worksheets

---

### 3.5 Name Lists

#### Scenario 5.1: View Name Lists Page
**Priority:** P1 (High)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Verify page title "Name Lists"
3. Verify description shown
4. Verify mock name lists displayed (3 lists)
5. Verify name counts shown (25, 18, 20)

**Expected:**
- Page loads with mock data
- Lists displayed in grid layout

---

#### Scenario 5.2: Create New Name List
**Priority:** P1 (High)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Click "Create New List" button
3. Verify modal opens
4. Fill in title: "Test Class"
5. Fill in names (one per line): Alice, Bob, Charlie
6. Verify name count updates (3 names)
7. Click "Create List"
8. Verify modal closes
9. Verify new list appears in grid

**Expected:**
- Modal form validation works
- Name count updates dynamically
- List created successfully

---

#### Scenario 5.3: Load Default UK Names
**Priority:** P2 (Medium)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Click "Create New List"
2. Click "Load UK Default Names" button
3. Verify textarea populated with 20 common UK names
4. Verify name count updates (20 names)

**Expected:**
- Default names include common UK names (Emma, Oliver, Ava, etc.)
- Names can be edited after loading

---

#### Scenario 5.4: Edit Existing Name List
**Priority:** P1 (High)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Click "Edit" button on "Year 3 Class A"
3. Verify modal opens with existing data
4. Modify title to "Year 3 Class A - Updated"
5. Add more names
6. Click "Update List"
7. Verify list updated

**Expected:**
- Edit modal pre-filled with existing data
- Changes saved correctly

---

#### Scenario 5.5: Delete Name List
**Priority:** P1 (High)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Click delete/trash icon on "Year 3 Class A"
3. Verify confirmation dialog appears
4. Verify warning message shown
5. Click "Delete List"
6. Verify list removed from grid
7. Verify other lists still visible

**Expected:**
- Confirmation required before deletion
- Deletion is immediate (optimistic update)

---

#### Scenario 5.6: Export Name List (CSV)
**Priority:** P2 (Medium)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Click "Export" button on a list
3. Verify CSV file downloads
4. Verify filename matches list title
5. Open CSV and verify names present

**Expected:**
- CSV download triggered
- Filename: "Year_3_Class_A.csv"
- CSV format: one name per row

---

#### Scenario 5.7: Search Name Lists
**Priority:** P2 (Medium)
**Status:** ✅ Covered (name-lists.spec.ts)

**Steps:**
1. Navigate to /name-lists
2. Enter "Year 3" in search box
3. Verify only "Year 3 Class A" shown
4. Clear search
5. Verify all lists shown again

**Expected:**
- Search filters lists in real-time
- Case-insensitive search

---

### 3.6 Admin Panel

#### Scenario 6.1: Access Admin Library Page
**Priority:** P1 (High)
**Status:** ✅ Covered (library-save.spec.ts)

**Steps:**
1. Sign in as admin user
2. Navigate to /admin/library
3. Verify page loads with "Library Admin" heading
4. Verify stats shown (Total Worksheets, Published, Unpublished)
5. Verify worksheet table/list loads

**Expected:**
- Only admins can access
- Non-admins redirected to login or 403

---

#### Scenario 6.2: Publish Worksheet
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /admin/library
2. Find an unpublished worksheet
3. Click "Publish" button
4. Verify API request to /api/admin/library/[id]/publish
5. Verify success message
6. Verify worksheet status changes to "Published"
7. Navigate to /library
8. Verify worksheet now visible in public library

**Expected:**
- Worksheet published immediately
- Appears in public library
- Thumbnail visible

---

#### Scenario 6.3: Unpublish Worksheet
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /admin/library
2. Find a published worksheet
3. Click "Unpublish" button
4. Verify confirmation dialog
5. Confirm unpublish
6. Verify API request to /api/admin/library/[id]/unpublish
7. Verify worksheet status changes to "Unpublished"
8. Navigate to /library
9. Verify worksheet NOT visible in public library

**Expected:**
- Unpublish requires confirmation
- Removed from public library immediately

---

#### Scenario 6.4: Delete Worksheet (Admin)
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /admin/library
2. Find a worksheet
3. Click "Delete" button
4. Verify confirmation dialog with warning
5. Confirm deletion
6. Verify API request to /api/admin/library/[id] (DELETE)
7. Verify worksheet removed from table
8. Verify success message

**Expected:**
- Deletion requires confirmation
- Permanent deletion (no undo)
- Associated thumbnails also deleted

---

#### Scenario 6.5: Edit Worksheet Metadata
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /admin/library
2. Click "Edit" on a worksheet
3. Verify navigation to /library/[slug]/edit
4. Modify title, SEO title, tags
5. Click "Save Changes"
6. Verify API request to /api/library/[id]/update
7. Verify success message
8. Navigate back to /library/[slug]
9. Verify metadata updated

**Expected:**
- Edit form pre-filled with current data
- Changes saved correctly
- URL slug NOT changed (stable URLs)

---

#### Scenario 6.6: Admin Search & Filter
**Priority:** P2 (Medium)
**Status:** ⚠️ Partially Covered (basic check)

**Steps:**
1. Navigate to /admin/library
2. Use search box to find "addition" worksheets
3. Verify results filtered
4. Use status filter (Published/Unpublished)
5. Verify filter applied
6. Use year group filter
7. Verify filter applied

**Expected:**
- Multiple filters can be combined
- Results update dynamically

---

### 3.7 Privacy & Settings

#### Scenario 7.1: View Privacy Policy
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /privacy
2. Verify privacy policy content shown
3. Verify sections: Data Collection, Cookies, Third Parties
4. Verify last updated date

**Expected:**
- Full privacy policy displayed
- GDPR-compliant language

---

#### Scenario 7.2: View Terms of Service
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /terms
2. Verify terms of service content shown
3. Verify sections: Usage, Content, Liability

**Expected:**
- Full terms displayed
- Clear usage restrictions

---

#### Scenario 7.3: Cookie Consent Banner
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Open app in incognito mode
2. Navigate to /
3. Verify cookie consent banner appears at bottom
4. Verify "Accept All" and "Reject All" buttons
5. Click "Accept All"
6. Verify banner disappears
7. Verify choice persisted (cookie set)

**Expected:**
- Banner shown on first visit
- Choice persisted across sessions
- Google Analytics enabled after accept

---

#### Scenario 7.4: Privacy Settings Page
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /privacy-settings
2. Verify cookie preferences shown
3. Toggle "Analytics Cookies" OFF
4. Click "Save Preferences"
5. Verify Google Analytics disabled
6. Refresh page
7. Verify preferences persisted

**Expected:**
- Granular cookie control
- Settings saved to localStorage/cookies

---

### 3.8 Subscription & Payments

#### Scenario 8.1: View Subscription Page
**Priority:** P2 (Medium)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /subscription
2. Verify pricing tiers shown
3. Verify feature comparison table
4. Verify "Choose Plan" buttons

**Expected:**
- Clear pricing (£/month or year)
- Feature differences highlighted

---

#### Scenario 8.2: Upgrade to Premium (Placeholder)
**Priority:** P3 (Low)
**Status:** ❌ Not Covered

**Note:** Subscription system not yet implemented. Test should verify placeholder/coming soon message.

**Steps:**
1. Navigate to /subscription
2. Click "Choose Plan" on Premium tier
3. Verify "Coming Soon" message or redirect to contact form

**Expected:**
- Graceful handling of unimplemented feature

---

### 3.9 SEO & Performance

#### Scenario 9.1: Sitemap Generation
**Priority:** P1 (High)
**Status:** ✅ Covered (library-browse.spec.ts)

**Steps:**
1. Navigate to /sitemap.xml
2. Verify XML content returned
3. Verify content-type: application/xml
4. Verify `<urlset>` tag present
5. Verify `<loc>` tags for key pages
6. Verify library worksheets included

**Expected:**
- Valid XML format
- All public pages listed
- Last modified dates included

---

#### Scenario 9.2: Robots.txt
**Priority:** P1 (High)
**Status:** ✅ Covered (library-browse.spec.ts)

**Steps:**
1. Navigate to /robots.txt
2. Verify plain text content
3. Verify "User-Agent: *" present
4. Verify sitemap reference included
5. Verify disallow rules (if any)

**Expected:**
- Valid robots.txt format
- Sitemap URL included

---

#### Scenario 9.3: Meta Tags for SEO
**Priority:** P1 (High)
**Status:** ⚠️ Partially Covered (basic check)

**Steps:**
1. Navigate to /library
2. Inspect page source
3. Verify meta description present and descriptive
4. Navigate to /library/[slug]
5. Verify dynamic meta tags (title includes worksheet name)
6. Verify Open Graph tags for social sharing

**Expected:**
- Each page has unique meta description
- Title tag descriptive (<60 chars)
- OG tags for Twitter/Facebook previews

---

#### Scenario 9.4: Page Load Performance
**Priority:** P1 (High)
**Status:** ❌ Not Covered

**Steps:**
1. Navigate to /library
2. Measure time to First Contentful Paint (FCP)
3. Verify FCP < 1.8s
4. Measure time to Largest Contentful Paint (LCP)
5. Verify LCP < 2.5s
6. Verify no layout shifts (CLS < 0.1)

**Expected:**
- All Core Web Vitals in "Good" range
- Images lazy-loaded
- Critical CSS inlined

---

---

## 4. Coverage Gaps & Priorities

### High Priority Gaps (P0-P1)

1. **PDF Download Functionality** ❌
   - Not tested at all
   - Critical for core value prop
   - Should test with/without answers, with mascots

2. **Interactive Worksheet Mode** ❌
   - Entire feature untested
   - Unique selling point
   - High user engagement feature

3. **Admin Panel Actions** ❌
   - Publish/unpublish not tested
   - Delete not tested
   - Edit metadata not tested

4. **Cookie Consent & Privacy** ❌
   - GDPR compliance not verified
   - Google Analytics opt-in not tested

5. **Error Handling** ❌
   - API failures not tested
   - Network errors not tested
   - Validation errors partially tested

6. **Session Persistence** ❌
   - Session expiry not tested
   - Refresh behavior not tested

### Medium Priority Gaps (P2)

1. **AI-Powered Search** ❌
2. **Related Worksheets** ❌
3. **Visual Theme Selection** ❌
4. **Privacy Settings Page** ❌
5. **Meta Tags & SEO (detailed)** ⚠️

### Low Priority (P3)

1. **Subscription/Payments** ❌ (Not implemented yet)
2. **Advanced Admin Features** ❌

---

## 5. Critical User Journeys

### Journey 1: First-Time Teacher Generates Worksheet

**User Goal:** Create and download a Year 1 addition worksheet

**Steps:**
1. Land on homepage
2. Click "Start Creating"
3. Sign in with Google
4. (Optional) Complete profile setup
5. Select Year 1, Addition, Adding within 20
6. Click "Generate Worksheet"
7. Wait for generation (streaming)
8. Preview worksheet
9. Click "Download PDF"
10. Save PDF to computer
11. Print worksheet for class

**Current Coverage:** ✅ Steps 1-8, ❌ Steps 9-11

**Priority:** P0 (Critical)

---

### Journey 2: Teacher Finds Free Worksheet in Library

**User Goal:** Browse library and download a pre-made worksheet

**Steps:**
1. Navigate to /library
2. Browse available worksheets
3. Filter by Year 2
4. Click on a worksheet
5. Preview worksheet
6. Click "Download PDF"
7. Save and print

**Current Coverage:** ✅ Steps 1-5, ❌ Steps 6-7

**Priority:** P0 (Critical)

---

### Journey 3: Student Completes Interactive Worksheet

**User Goal:** Complete a worksheet in gamified interactive mode

**Steps:**
1. Teacher generates worksheet
2. Click "Interactive Mode"
3. Student answers questions
4. Click "Check Answers"
5. Receive instant feedback (confetti for correct)
6. Complete all questions
7. See final score and celebration

**Current Coverage:** ❌ Entire journey

**Priority:** P1 (High)

---

### Journey 4: Teacher Creates Personalized Name List

**User Goal:** Save student names for personalized worksheets

**Steps:**
1. Navigate to /name-lists
2. Click "Create New List"
3. Enter class name: "Year 3 Class B"
4. Load default UK names
5. Add/remove names to match class roster
6. Save list
7. Generate worksheet using name list
8. Verify student names appear in worksheet

**Current Coverage:** ✅ Steps 1-6, ❌ Steps 7-8

**Priority:** P1 (High)

---

### Journey 5: Admin Publishes Worksheet to Library

**User Goal:** Generate high-quality worksheet and publish for all users

**Steps:**
1. Sign in as admin
2. Generate excellent worksheet
3. Click "Save to Library"
4. Fill in SEO metadata
5. Save (auto-publish)
6. Navigate to /admin/library
7. Verify worksheet appears as "Published"
8. Navigate to /library
9. Verify worksheet visible to all users

**Current Coverage:** ✅ Steps 1-7, ⚠️ Step 8-9 (basic check)

**Priority:** P1 (High)

---

## 6. Edge Cases & Error Handling

### 6.1 Network & API Errors

#### Test: API Timeout During Generation
**Priority:** P1

**Steps:**
1. Mock /api/generate-stream to timeout after 60s
2. Click "Generate Worksheet"
3. Verify timeout error shown
4. Verify "Try Again" button appears

**Expected:**
- User-friendly error message
- Option to retry
- No blank screen

---

#### Test: Network Interruption Mid-Generation
**Priority:** P1

**Steps:**
1. Click "Generate Worksheet"
2. Interrupt network after 30% progress
3. Verify error detected
4. Verify partial content NOT shown
5. Verify error message with retry option

**Expected:**
- Graceful degradation
- Clear error messaging

---

#### Test: 500 Error from API
**Priority:** P1

**Steps:**
1. Mock /api/generate-stream to return 500
2. Click "Generate Worksheet"
3. Verify error message shown
4. Verify error logged to console

**Expected:**
- Generic error message (not technical details)
- Retry option provided

---

### 6.2 Validation & Input Errors

#### Test: Generate Without Full Configuration
**Priority:** P1

**Steps:**
1. Navigate to /create
2. Select Year Group only (no topic)
3. Attempt to click "Generate Worksheet"
4. Verify button disabled
5. Verify helper text shows missing fields

**Expected:**
- Generate button disabled
- Clear indication of what's missing

---

#### Test: SQL Injection in Search
**Priority:** P1

**Steps:**
1. Navigate to /library
2. Enter search: `'; DROP TABLE worksheets; --`
3. Verify no database error
4. Verify safe handling (no results or escaped query)

**Expected:**
- Input sanitized
- No SQL execution
- No error exposed to user

---

#### Test: XSS in Name List
**Priority:** P1

**Steps:**
1. Create name list
2. Enter name: `<script>alert('XSS')</script>`
3. Save list
4. Generate worksheet using this list
5. Verify script NOT executed
6. Verify name escaped in HTML

**Expected:**
- Input sanitized
- No script execution
- Safe rendering

---

### 6.3 Browser Compatibility

#### Test: Safari/iOS Support
**Priority:** P2

**Steps:**
1. Open app in Safari (desktop & iOS)
2. Test all critical flows
3. Verify PDF download works
4. Verify interactive mode works

**Expected:**
- No layout issues
- All features functional

---

### 6.4 Concurrent Users

#### Test: Multiple Simultaneous Generations
**Priority:** P2

**Steps:**
1. Open app in 3 browser tabs
2. Generate worksheet in all tabs simultaneously
3. Verify all generations succeed
4. Verify no interference between tabs

**Expected:**
- Each tab independent
- No rate limiting triggered

---

## 7. Mobile & Responsiveness

### 7.1 Mobile-First Experience

#### Test: Mobile Navigation
**Priority:** P1

**Steps:**
1. Open app on mobile viewport (375x667)
2. Verify hamburger menu appears
3. Tap menu
4. Verify navigation links accessible
5. Tap "Create Worksheet"
6. Verify navigation works

**Expected:**
- Mobile menu functional
- Touch targets large enough (44x44px)

---

#### Test: Mobile Worksheet Generation
**Priority:** P1

**Steps:**
1. Open /create on mobile
2. Select configuration (touch-friendly dropdowns)
3. Generate worksheet
4. Verify preview scrollable
5. Download PDF
6. Verify PDF downloads correctly

**Expected:**
- Form inputs large and touch-friendly
- Dropdowns work on iOS/Android
- PDF download triggers correctly

---

#### Test: Mobile Library Browsing
**Priority:** P1

**Steps:**
1. Open /library on mobile
2. Scroll through worksheets
3. Verify infinite scroll or pagination works
4. Tap on a worksheet
5. Verify detail page loads
6. Verify preview scrollable

**Expected:**
- Grid layout responsive (1-2 columns)
- Touch scrolling smooth
- No horizontal scroll

---

### 7.2 Tablet Experience

#### Test: Tablet Layout (iPad)
**Priority:** P2

**Steps:**
1. Open app on tablet viewport (768x1024)
2. Verify 2-column layout on library
3. Verify dashboard shows side-by-side panels
4. Test all critical flows

**Expected:**
- Optimal use of screen space
- Not just scaled-up mobile view

---

### 7.3 Touch Gestures

#### Test: Pull-to-Refresh
**Priority:** P2

**Steps:**
1. Open /library on mobile
2. Pull down from top
3. Verify refresh animation
4. Verify library re-fetches data

**Expected:**
- Smooth pull-to-refresh gesture
- Data refreshed

---

## 8. Performance & SEO

### 8.1 Load Time Testing

#### Test: Library Page Load Time
**Priority:** P1

**Steps:**
1. Clear cache and cookies
2. Navigate to /library
3. Measure time to interactive (TTI)
4. Verify TTI < 3s on 3G network

**Expected:**
- Fast initial load
- Progressive enhancement

---

#### Test: Worksheet Generation Speed
**Priority:** P1

**Steps:**
1. Generate 5 worksheets consecutively
2. Measure average generation time
3. Verify average < 45s

**Expected:**
- Consistent generation speed
- No slowdown over time

---

### 8.2 SEO Testing

#### Test: Google Crawlability
**Priority:** P1

**Steps:**
1. Use Google Search Console (or Lighthouse)
2. Verify all public pages crawlable
3. Verify no orphaned pages
4. Verify internal linking structure

**Expected:**
- All pages indexed
- Logical site structure

---

#### Test: Structured Data
**Priority:** P2

**Steps:**
1. Navigate to /library/[slug]
2. Inspect page source
3. Verify JSON-LD structured data present
4. Verify schema.org type: "LearningResource"

**Expected:**
- Rich snippets eligible
- Educational metadata included

---

## Appendix A: Test Data Requirements

### Mock Users

1. **Admin User**
   - Email: admin@example.com
   - Role: admin
   - Has full access

2. **Regular Teacher**
   - Email: teacher@example.com
   - Role: user
   - Has basic access

3. **Anonymous User**
   - Not authenticated
   - Can browse library only

### Mock Worksheets

1. **Published Worksheet**
   - Slug: year-1-addition-worksheet
   - Year: Year 1
   - Topic: Addition
   - Status: Published

2. **Unpublished Worksheet**
   - Slug: draft-worksheet
   - Status: Unpublished

### Mock Name Lists

1. Year 3 Class A (25 names)
2. Year 4 Maths Group (18 names)
3. Reception Class (20 names)

---

## Appendix B: Test Execution Strategy

### Test Pyramid

- **E2E Tests (Playwright)**: Critical user journeys, integration flows
- **Integration Tests (Vitest)**: API routes, database queries
- **Unit Tests (Vitest)**: Helper functions, utilities

### CI/CD Integration

- Run E2E tests on:
  - Pull requests (smoke tests only)
  - Main branch commits (full suite)
  - Nightly (comprehensive suite with performance tests)

### Test Environments

- **Local**: Development testing
- **Staging**: Pre-production validation
- **Production**: Smoke tests post-deployment

---

## Appendix C: Known Issues & Limitations

1. **Supabase Authentication**: Tests require valid Supabase project setup
2. **PDF Generation**: Requires Chromium/Puppeteer (resource-intensive)
3. **AI Generation**: Tests depend on Claude API availability and quota
4. **Image Assets**: Some tests require specific test images in /images/ directory
5. **Thumbnail Generation**: May timeout if server under load

---

**End of Test Plan**
