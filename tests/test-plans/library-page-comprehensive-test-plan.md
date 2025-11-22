# Worksheet Library Page - Comprehensive Test Plan

## Application Overview

The Worksheet Library page (http://localhost:3000/library) is a comprehensive, SEO-optimized browsing interface for free printable math worksheets. The application features:

### Core Functionality
- **Browse & Filter System**: Browse thousands of published worksheets with advanced filtering
- **AI-Powered Search**: Natural language search that converts queries into structured filters
- **Infinite Scroll**: Lazy-loading pagination with automatic "load more" functionality
- **Responsive Grid Layout**: 2/3/4 column responsive grid based on screen size
- **Worksheet Cards**: Rich preview cards with badges, hover effects, and metadata
- **Detail Pages**: Individual worksheet pages with full metadata and download options
- **Interactive Mode**: Online practice mode with feedback
- **PDF Download**: Generate and download worksheets as PDFs
- **Analytics Tracking**: View and download counts (no authentication required)

### Key Features
- **Public Access**: No authentication required for browsing or downloading
- **Admin Features**: Edit functionality visible only to authenticated admin users
- **SEO Optimization**: Server-side rendering, metadata, structured data, breadcrumbs
- **Performance**: Caching, lazy loading, optimized images
- **URL State Management**: All filters and pagination reflected in URL for shareability

### Technical Architecture
- **Frontend**: Next.js 14 with App Router, React Server Components
- **Backend**: Supabase PostgreSQL database
- **APIs**: RESTful endpoints for browse, search, download, related worksheets
- **Filtering**: 6 filter categories (Year Group, Topic, Subtopic, Visual Theme, Activity Type, Seasonal Theme)
- **Sorting**: Newest First, Most Popular
- **Pagination**: 20 items per page with infinite scroll

---

## Test Scenarios

### 1. Page Load and Initial State

#### 1.1 Initial Page Load
**Steps:**
1. Navigate to http://localhost:3000/library
2. Wait for page to fully load

**Expected Results:**
- Page loads within 3 seconds
- Hero section displays with title "Free Printable Library"
- Search bar is visible with placeholder text "Try: 'easy christmas counting for reception' or 'year 1 addition'..."
- Breadcrumb shows: Home > Library
- Sidebar filters panel is visible on desktop (hidden on mobile)
- Worksheet grid displays with 20 worksheets initially
- Loading state shows 8 skeleton cards before content loads
- Sort dropdown defaults to "Newest First"
- Counter shows "Showing [X] worksheets"

#### 1.2 Empty State Display
**Steps:**
1. Navigate to http://localhost:3000/library
2. Apply filters that return no results (e.g., combination unlikely to exist)
3. Wait for results to load

**Expected Results:**
- Grid is replaced with empty state message
- Message displays: "No worksheets found"
- Subtext displays: "Try adjusting your filters"
- No worksheet cards are shown
- Clear filters button is visible in sidebar

#### 1.3 Error State Display
**Steps:**
1. Simulate API failure (if possible via network throttling or mock)
2. Navigate to http://localhost:3000/library

**Expected Results:**
- Error message appears: "Error: Failed to load worksheets"
- Red border and background styling on error message
- No worksheet cards are shown
- User can refresh to retry

---

### 2. Navigation and Header

#### 2.1 Top Navigation Links
**Steps:**
1. Navigate to http://localhost:3000/library
2. Verify navigation header contains expected links
3. Click "Home" link
4. Return to library and click "Browse Library" link
5. Return to library and click "Create Printable" link

**Expected Results:**
- Navigation header is sticky and stays at top during scroll
- "FreeMathPrintable.com" logo is visible and links to home
- "Home" link has Home icon and navigates to "/"
- "Browse Library" link is highlighted (active state) and navigates to "/library"
- "Create Printable" link has PlusCircle icon and navigates to "/create"
- All links use hover states (color change to blue-700)
- Current page indicator shows "Browse Library" in blue-700

#### 2.2 Admin-Only Elements
**Steps:**
1. Load page without authentication
2. Verify logout button is NOT visible
3. Authenticate as admin user
4. Reload library page

**Expected Results:**
- Non-admin users: No logout button visible
- Admin users: Logout button appears in top-right with LogOut icon
- Clicking logout signs out user and redirects to home page

#### 2.3 Breadcrumb Navigation
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Home" in breadcrumb
3. Return to library
4. Breadcrumb updates when filters are applied

**Expected Results:**
- Breadcrumb shows "Home > Library" on main library page
- "Home" is clickable and navigates to "/"
- "Library" is plain text (current page, not clickable)
- ChevronRight icon separates items

---

### 3. Search Functionality

#### 3.1 Basic Text Search
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click in search input field
3. Type "counting" and press Enter
4. Verify results update

**Expected Results:**
- Search input accepts text input
- Search icon (magnifying glass) appears on left of input
- On focus, suggestions dropdown appears (if query is empty)
- Pressing Enter submits search
- Results filter to worksheets matching "counting"
- URL updates to include ?q=counting
- Clear button (X icon) appears when text is entered
- Sparkles icon appears briefly during AI parsing

#### 3.2 AI-Powered Natural Language Search
**Steps:**
1. Navigate to http://localhost:3000/library
2. Type "easy christmas counting for reception" in search
3. Press Enter
4. Wait for AI parsing

**Expected Results:**
- AI parses query into structured filters:
  - year_group: "Reception"
  - seasonal_theme: "christmas"
  - topic or subtopic related to counting
- URL updates with parsed filters (e.g., ?year_group=Reception&seasonal_theme=christmas&topic=number-counting)
- Results display worksheets matching ALL parsed filters
- Search input shows sparkles icon during processing
- Console logs show AI parsed query
- Analytics tracks search as 'ai' type

#### 3.3 Search Suggestions
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click in empty search input field
3. Verify suggestions dropdown appears
4. Click a suggestion

**Expected Results:**
- Dropdown appears below search input with white background and shadow
- Header shows "Try these AI-powered searches" with sparkles icon
- 7 suggestions are displayed:
  - numbers
  - counting reception
  - addition year 1
  - subtraction
  - shapes
  - christmas counting
  - animals
- Clicking suggestion fills search and submits query
- Dropdown closes after selection

#### 3.4 Search Clear Functionality
**Steps:**
1. Navigate to http://localhost:3000/library
2. Type "addition" in search
3. Click X (clear) button
4. Verify search is cleared

**Expected Results:**
- X button appears on right side of input when text is present
- Clicking X clears the search input
- URL resets to /library (removes ?q= parameter)
- All worksheets are shown again (no search filter)
- Focus returns to search input

#### 3.5 Search Loading State
**Steps:**
1. Navigate to http://localhost:3000/library
2. Type a query and press Enter
3. Observe loading state during AI parsing

**Expected Results:**
- Sparkles icon appears on right side of input (blue, pulsing animation)
- Input is disabled during search processing
- Clear button is hidden during processing
- Search completes within 2-3 seconds

#### 3.6 Search Fallback Behavior
**Steps:**
1. Navigate to http://localhost:3000/library
2. Enter a very ambiguous query that AI cannot parse
3. Submit search

**Expected Results:**
- If AI cannot extract structured filters, fallback to text search
- URL shows ?q=[query]
- Text search is performed on worksheet titles, topics, subtopics
- Analytics tracks search as 'text' type (fallback)

---

### 4. Filter System (Sidebar)

#### 4.1 Year Group Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Year Group" dropdown
3. Select "Reception"
4. Verify results update

**Expected Results:**
- Dropdown opens showing "All Years" option plus 7 year groups:
  - Reception, Year 1, Year 2, Year 3, Year 4, Year 5, Year 6
- Selecting "Reception" updates URL to ?year_group=Reception
- Worksheet grid refreshes showing only Reception worksheets
- Dropdown shows "Reception" as selected value
- Clear filters button appears in sidebar header

#### 4.2 Topic Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Topic" dropdown
3. Select a topic (e.g., "Addition Subtraction")

**Expected Results:**
- Dropdown opens showing "All Topics" plus 7 topics:
  - Addition Subtraction, Fractions, Measurement, Multiplication Division, Number Counting, Number Place Value, Shape Space
- Labels are formatted as Title Case (e.g., "Addition Subtraction" from "addition-subtraction")
- Selecting topic updates URL to ?topic=addition-subtraction
- Results filter to show only worksheets with that topic
- Can combine with other filters

#### 4.3 Subtopic Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Subtopic" dropdown
3. Select a subtopic

**Expected Results:**
- Dropdown opens showing "All Subtopics" plus available subtopics
- Subtopics include options like:
  - Adding To 20, Comparing Numbers, Counting Forwards Backwards, Counting To 10, etc.
- Selecting subtopic updates URL with ?subtopic=[value]
- Results filter to match subtopic

#### 4.4 Visual Theme Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Visual Theme" dropdown
3. Select "Animals"

**Expected Results:**
- Dropdown shows "All Themes" plus 7 themes:
  - Animals, Fruits, Toys, Vehicles, Food, Sports, Space
- Capitalized labels (e.g., "Animals")
- Selecting theme filters worksheets by visual_theme
- URL updates to ?visual_theme=animals

#### 4.5 Activity Type Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Activity Type" dropdown
3. Select an activity type

**Expected Results:**
- Dropdown shows "All Activities" plus 6 types:
  - Circle Answer, Fill Blanks, Matching, Color Count, Trace Write, Cut Paste
- Labels formatted as Title Case with spaces
- Selecting type updates URL with ?activity_type=[value]
- Results filter accordingly

#### 4.6 Seasonal Theme Filter
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click "Seasonal Theme" dropdown
3. Select "Christmas"

**Expected Results:**
- Dropdown shows "All Seasons" plus 6 themes:
  - Christmas, Halloween, Easter, Summer, Spring, Autumn
- Selecting theme updates URL with ?seasonal_theme=christmas
- Results show only Christmas-themed worksheets
- Seasonal badge visible on worksheet cards

#### 4.7 Multiple Filter Combination
**Steps:**
1. Navigate to http://localhost:3000/library
2. Select "Year Group: Reception"
3. Select "Topic: Number Counting"
4. Select "Visual Theme: Animals"
5. Verify results match ALL filters

**Expected Results:**
- URL shows all filters: ?year_group=Reception&topic=number-counting&visual_theme=animals
- Results show worksheets matching ALL selected filters (AND logic)
- Counter updates to show filtered count
- All selected filters show in their respective dropdowns
- Clear button visible in sidebar

#### 4.8 Clear All Filters
**Steps:**
1. Navigate to http://localhost:3000/library
2. Apply multiple filters
3. Click "Clear" button in sidebar
4. Verify filters reset

**Expected Results:**
- Clear button appears in sidebar header when any filter is active
- Clicking "Clear" removes all filters
- URL resets to /library (no query params)
- All dropdowns reset to "All [Category]"
- Full worksheet list is displayed
- Counter shows total worksheet count

#### 4.9 Filter Dropdown Single-Open Behavior
**Steps:**
1. Navigate to http://localhost:3000/library
2. Open "Year Group" dropdown
3. Without closing, try to open "Topic" dropdown

**Expected Results:**
- Only one dropdown can be open at a time
- Opening a new dropdown automatically closes the previous one
- Console logs show dropdown open/close events
- State management prevents multiple dropdowns open

#### 4.10 Filter Persistence via URL
**Steps:**
1. Navigate to http://localhost:3000/library?year_group=Year%201&topic=addition-subtraction
2. Verify filters are applied on page load
3. Share URL with filters and open in new tab

**Expected Results:**
- Filters from URL are automatically applied on page load
- Dropdowns show selected values
- Results match URL filters
- URL parameters are decoded properly
- Sharing URL preserves filter state

---

### 5. Sorting and Display Options

#### 5.1 Sort by Newest First (Default)
**Steps:**
1. Navigate to http://localhost:3000/library
2. Verify default sort order
3. Check URL parameters

**Expected Results:**
- Sort dropdown defaults to "Newest First"
- Worksheets are ordered by published_at DESC
- Most recently published worksheets appear first
- URL shows ?sort=newest (or no sort parameter, defaults to newest)
- NEW badge visible on worksheets published within last 7 days

#### 5.2 Sort by Most Popular
**Steps:**
1. Navigate to http://localhost:3000/library
2. Change sort dropdown to "Most Popular"
3. Verify sort order changes

**Expected Results:**
- Selecting "Most Popular" updates URL to ?sort=popular
- Worksheets re-order by download_count DESC
- Worksheets with highest downloads appear first
- HOT badge (fire emoji) visible on worksheets with >1000 downloads
- Counter maintains accurate count

#### 5.3 Sort Persistence with Filters
**Steps:**
1. Navigate to http://localhost:3000/library
2. Apply a filter (e.g., Year 1)
3. Change sort to "Most Popular"
4. Verify both filter and sort are preserved

**Expected Results:**
- URL shows both filter and sort: ?year_group=Year%201&sort=popular
- Results are filtered AND sorted correctly
- Changing filters maintains sort order
- Changing sort maintains filters

---

### 6. Worksheet Cards Display

#### 6.1 Card Layout and Structure
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe worksheet card layout on desktop
3. Resize to mobile and observe responsive behavior

**Expected Results:**
- Desktop (lg): 4-column grid
- Tablet (md): 3-column grid
- Mobile: 2-column grid
- Cards have white background, rounded corners, border
- Aspect ratio 4:5 for thumbnail
- Hover effect: shadow increases, image scales 105%, aspect changes to 4:7

#### 6.2 Card Thumbnail Display
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe worksheet thumbnails
3. Verify images load correctly

**Expected Results:**
- All thumbnails load from ImageKit CDN
- Images use Next.js Image component for optimization
- object-cover maintains aspect ratio
- object-top alignment shows worksheet header
- Placeholder shows gray background while loading
- Images are properly sized (responsive sizes attribute)

#### 6.3 Year Group Badge
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe year group badges on cards
3. Verify color coding

**Expected Results:**
- Badge appears in top-right corner of thumbnail
- Color-coded by year group:
  - Reception: Purple (bg-purple-600)
  - Year 1: Blue (bg-blue-600)
  - Year 2: Green (bg-green-600)
  - Year 3: Orange (bg-orange-600)
  - Year 4: Red (bg-red-600)
  - Year 5: Teal (bg-teal-600)
  - Year 6: Pink (bg-pink-600)
- Badge has white text, small font (10px), rounded corners
- Badge fades out on hover

#### 6.4 Status Badges (NEW/HOT)
**Steps:**
1. Navigate to http://localhost:3000/library
2. Find worksheets published within last 7 days
3. Find worksheets with >1000 downloads

**Expected Results:**
- NEW badge (blue, star emoji) on worksheets published < 7 days ago
- HOT badge (red, fire emoji) on worksheets with download_count > 1000
- Only one status badge shown (NEW takes priority over HOT)
- Badges appear in top-left corner
- Badges have backdrop blur effect
- Badges fade out on hover

#### 6.5 Download Count Badge
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe download count on each card

**Expected Results:**
- Download count badge in bottom-right corner
- Shows download arrow emoji + count
- Count is formatted with locale separators (e.g., "1,234")
- Dark background (bg-gray-900/80) with white text
- Badge fades out on hover

#### 6.6 Version Badge
**Steps:**
1. Navigate to http://localhost:3000/library
2. Find worksheets with version suffixes (e.g., -v2, -v3)

**Expected Results:**
- Version badge appears in bottom-left corner
- Shows notebook emoji + version (e.g., "V2")
- Amber background (bg-amber-500/90)
- Only shown for versions 2+ (not shown for v1)
- Extracted from slug pattern "-v2" or title pattern "(v2)"
- Badge fades out on hover

#### 6.7 Card Title and Metadata
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe card footer information

**Expected Results:**
- Title shown in 12px bold font
- Title truncated to 1 line with ellipsis
- Topic and subtopic shown below title in 10px gray text
- Metadata format: "[Topic] • [Subtopic]"
- Footer fades out completely on hover (opacity-0, height-0)

#### 6.8 Card Hover Effects
**Steps:**
1. Navigate to http://localhost:3000/library
2. Hover over various worksheet cards
3. Observe all interactive effects

**Expected Results:**
- Card shadow increases (hover:shadow-2xl)
- Thumbnail aspect ratio changes from 4:5 to 4:7 (expands vertically)
- Image scales up 105%
- All badges fade out (opacity-0, scale-0)
- Footer content fades out
- Hover instruction overlay appears at bottom
- Black gradient overlay with text "Click to view full worksheet"
- All transitions smooth (300ms duration)
- Cursor changes to pointer

#### 6.9 Card Click Navigation
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click on a worksheet card
3. Verify navigation to detail page

**Expected Results:**
- Card is wrapped in Link component
- Clicking anywhere on card navigates to /library/[slug]
- URL uses worksheet slug (e.g., /library/reception-counting-animals)
- Navigation is client-side (no full page reload)
- Browser back button returns to library with filters preserved

---

### 7. Infinite Scroll and Pagination

#### 7.1 Initial Page Load (First 20)
**Steps:**
1. Navigate to http://localhost:3000/library
2. Wait for initial load
3. Count worksheets displayed

**Expected Results:**
- Exactly 20 worksheets load initially (or less if total < 20)
- Counter shows "Showing 20 worksheets"
- Page parameter defaults to 0
- URL does not show ?page= parameter on first page

#### 7.2 Infinite Scroll Trigger
**Steps:**
1. Navigate to http://localhost:3000/library
2. Scroll down to bottom of page
3. Observe loading indicator
4. Continue scrolling as more worksheets load

**Expected Results:**
- IntersectionObserver triggers load 400px before reaching bottom
- Loading skeleton cards appear (4 cards in grid layout)
- Next 20 worksheets load automatically
- Counter updates to "Showing 40 worksheets"
- URL updates to ?page=1
- Smooth continuous scrolling experience
- No "Load More" button required

#### 7.3 Multiple Page Loads
**Steps:**
1. Navigate to http://localhost:3000/library
2. Scroll through multiple pages (3-4 pages)
3. Verify continuous loading

**Expected Results:**
- Each scroll triggers next page load
- Pages load sequentially: page 0, 1, 2, 3...
- Worksheets accumulate (20, 40, 60, 80...)
- URL updates to reflect current page
- Loading state shows between pages
- No duplicate worksheets
- Scroll position maintained during loads

#### 7.4 End of Results
**Steps:**
1. Navigate to http://localhost:3000/library
2. Apply filters to get limited results (< 60 worksheets)
3. Scroll until all worksheets are loaded

**Expected Results:**
- When has_more = false, loading stops
- End message appears: "✓ You've viewed all worksheets"
- Total count shown: "Total: [X] worksheets"
- Border-top separator above message
- No more loading on scroll
- Message styled with gray text, centered

#### 7.5 Direct Page Navigation via URL
**Steps:**
1. Navigate to http://localhost:3000/library?page=2
2. Wait for page to load
3. Verify correct worksheets are shown

**Expected Results:**
- Pages 0, 1, and 2 load (all pages up to target)
- Total of 60 worksheets displayed
- Counter shows "Showing 60 worksheets"
- Scroll position at top
- Can continue infinite scroll from page 2
- URL state properly hydrated

#### 7.6 Pagination with Filters
**Steps:**
1. Navigate to http://localhost:3000/library
2. Apply a filter
3. Scroll to load page 2
4. Verify filter persistence

**Expected Results:**
- Filter resets pagination to page 0
- Changing filter removes page parameter from URL
- Filtered results support infinite scroll
- Page counter specific to filtered results
- URL maintains both filter and page: ?year_group=Year%201&page=1

#### 7.7 Loading State Animation
**Steps:**
1. Navigate to http://localhost:3000/library
2. Observe loading skeleton during initial load
3. Observe loading skeleton during infinite scroll

**Expected Results:**
- Initial: 8 skeleton cards in grid layout
- Infinite scroll: 4 skeleton cards appended to grid
- Skeleton cards have:
  - Aspect ratio 4:5 for thumbnail (gray-200)
  - Two gray bars in footer (gray-200)
  - Pulse animation (animate-pulse)
- Loading message: "Scroll down to load more..." when not actively loading

---

### 8. Worksheet Detail Page

#### 8.1 Navigate to Detail Page
**Steps:**
1. Navigate to http://localhost:3000/library
2. Click on any worksheet card
3. Verify detail page loads

**Expected Results:**
- URL changes to /library/[slug]
- Detail page loads with full worksheet information
- Sticky navigation header at top
- Breadcrumb navigation shown
- Large thumbnail preview (left side)
- Metadata panel (right side)
- Related worksheets at bottom

#### 8.2 Detail Page - Layout and Structure
**Steps:**
1. Navigate to any worksheet detail page (e.g., /library/reception-counting-animals)
2. Observe page structure

**Expected Results:**
- Two-column layout on desktop (image left, info right)
- Single column on mobile (image top, info bottom)
- White background cards with borders
- Proper spacing and padding
- Responsive to screen size

#### 8.3 Detail Page - Thumbnail Display
**Steps:**
1. On detail page, observe main thumbnail
2. Verify image quality and sizing

**Expected Results:**
- Aspect ratio 4:5 maintained
- Image fills container with object-contain
- High-quality image from ImageKit
- Priority loading (loads immediately)
- Gray placeholder while loading

#### 8.4 Detail Page - Title and Statistics
**Steps:**
1. On detail page, observe title and stats
2. Verify view and download counts

**Expected Results:**
- Large title (3xl font, bold, gray-900)
- View count with eye icon: "👁 [count] views"
- Download count with arrow icon: "⬇ [count] downloads"
- Counts formatted with locale separators
- Stats in row below title

#### 8.5 Detail Page - Metadata Panel
**Steps:**
1. On detail page, observe metadata section
2. Verify all fields are displayed correctly

**Expected Results:**
- Gray background panel with rounded corners
- Key-value pairs for:
  - Year Group: [value]
  - Topic: [value]
  - Subtopic: [value]
  - Theme: [value] (if present, capitalized)
  - Activity: [value] (if present, title case)
  - Season: [value] (if present, capitalized)
- Fields only shown if data exists
- Proper spacing between rows

#### 8.6 Detail Page - Interactive Mode Button
**Steps:**
1. On detail page, click "Interactive Mode" button
2. Verify navigation and functionality

**Expected Results:**
- Large purple-blue gradient button (prominent)
- Text: "🎮 Interactive Mode"
- Tooltip on hover: "Practice online with feedback and celebration upon completion! Perfect for tablets and computers."
- Clicking navigates to /library/[slug]/interactive
- Button is full-width, large size
- Default variant styling

#### 8.7 Detail Page - Download PDF Button
**Steps:**
1. On detail page, click "Download PDF" button
2. Wait for PDF generation
3. Verify download completes

**Expected Results:**
- Button text: "📥 Download PDF"
- Clicking button starts PDF generation
- Loading state: "⏳ Generating PDF..." with spinning animation
- Button disabled during generation
- PDF downloads automatically with filename [slug].pdf
- Success toast message: "PDF downloaded successfully!"
- Toast appears top-right, green background, 2-second duration
- Download count increments (fire-and-forget)
- Analytics recorded (IP hash, user agent, referrer)

#### 8.8 Detail Page - Edit & Download Button
**Steps:**
1. On detail page as non-admin, observe edit button
2. As admin, click edit button
3. Verify navigation

**Expected Results:**
- Outline variant button
- Text: "✏️ Edit & Download"
- Tooltip: "Customize this worksheet by editing questions and images, then download"
- Clicking navigates to /library/[slug]/edit
- Available to all users (not admin-only)
- Full-width, large size

#### 8.9 Detail Page - Educational Benefits Section
**Steps:**
1. On detail page, scroll to educational benefits section
2. Verify content display

**Expected Results:**
- Section only shown if educational_benefits field exists
- White card with border
- Title: "About This Worksheet" (2xl font, bold)
- Content displayed with preserved line breaks (whitespace-pre-line)
- Readable line height

#### 8.10 Detail Page - Learning Objectives
**Steps:**
1. On detail page, observe learning objectives section
2. Verify list formatting

**Expected Results:**
- Section only shown if learning_objectives array has items
- Blue background card (blue-50) with blue border
- Title: "Learning Objectives" (xl font, bold)
- Bulleted list with checkmarks
- Each item has blue checkmark icon (✓)
- Gray text, proper spacing

#### 8.11 Detail Page - How to Use Section
**Steps:**
1. On detail page, find "How to Use" section
2. Verify content formatting

**Expected Results:**
- White card with border
- Title: "💡 How to Use This Worksheet" (xl font)
- Content with preserved line breaks
- Gray text, readable spacing

#### 8.12 Detail Page - Skills Developed Tags
**Steps:**
1. On detail page, observe skills developed section
2. Verify tag display

**Expected Results:**
- Section only shown if skills_developed array exists
- Title: "Skills Developed" (lg font, semibold)
- Tags displayed in flex-wrap row
- Each tag: green background (green-50), green text, rounded-full
- Green border around tags
- Proper spacing between tags

#### 8.13 Detail Page - FAQ Section
**Steps:**
1. On detail page, scroll to FAQ section
2. Verify question/answer pairs

**Expected Results:**
- White card with border
- Title: "❓ Frequently Asked Questions" (2xl font)
- Each FAQ item:
  - Question in bold, large font (lg), gray-900
  - Answer below in gray-700, readable line height
  - Border between items
  - No border after last item

#### 8.14 Detail Page - Statistics Display (Bottom)
**Steps:**
1. On detail page, observe statistics section in sidebar
2. Verify download and view counts

**Expected Results:**
- Border-top separator
- Two columns: Downloads | Views
- Large numbers (lg font, gray-900)
- Labels below numbers
- Centered text alignment
- Locale-formatted numbers

#### 8.15 Detail Page - Tags Display
**Steps:**
1. On detail page (if tags exist), observe tags section
2. Verify tag styling

**Expected Results:**
- Section only shown if tags array exists
- Border-top separator
- Tags in flex-wrap row
- Each tag: blue background (blue-50), blue text, rounded-full
- Small font size
- Proper spacing between tags

#### 8.16 Detail Page - Related Worksheets
**Steps:**
1. On detail page, scroll to bottom
2. Observe related worksheets section
3. Click on a related worksheet

**Expected Results:**
- Section title: "You may also like" (2xl font, bold)
- 4-column grid on desktop, 2 on mobile
- Up to 4 related worksheets shown
- Related worksheets determined by same topic/year_group
- Each card shows: thumbnail, title, year group, download/view counts
- Hover effect on cards
- Clicking navigates to that worksheet's detail page
- Loading state: 4 skeleton cards while fetching

#### 8.17 Detail Page - Breadcrumb Navigation
**Steps:**
1. On detail page, observe breadcrumb
2. Click breadcrumb links
3. Verify navigation

**Expected Results:**
- Breadcrumb shows: Library > [Year Group] > [Topic] > [Title]
- "Library" links to /library
- Year Group links to /library?year_group=[value]
- Topic links to /library?topic=[value]
- Current title is plain text (not clickable)
- Proper spacing and separators

#### 8.18 Detail Page - SEO and Metadata
**Steps:**
1. Navigate to detail page
2. View page source (or check dev tools)
3. Verify meta tags and structured data

**Expected Results:**
- Title tag: seo_title or fallback to title
- Meta description: seo_description
- Meta keywords: seo_keywords joined
- Open Graph tags for social sharing
- JSON-LD structured data (type: LearningResource)
- Structured data includes: name, description, educationalLevel, image, keywords, datePublished

#### 8.19 Detail Page - View Count Increment
**Steps:**
1. Note initial view count on detail page
2. Refresh the page
3. Verify view count increases

**Expected Results:**
- View count increments by 1 on each page load
- Update is fire-and-forget (doesn't block page load)
- Console logs confirmation of increment
- Download count does NOT increment on page view

---

### 9. Interactive Mode

#### 9.1 Navigate to Interactive Mode
**Steps:**
1. From detail page, click "Interactive Mode" button
2. Wait for interactive page to load

**Expected Results:**
- URL changes to /library/[slug]/interactive
- Interactive worksheet client component loads
- View count incremented (fire-and-forget)
- Page title: "[SEO Title] - Interactive Worksheet"
- Meta description includes "Practice interactively"

#### 9.2 Interactive Mode - Worksheet Display
**Steps:**
1. On interactive page, observe worksheet rendering
2. Verify all questions are interactive

**Expected Results:**
- Worksheet HTML rendered in interactive container
- Questions allow user input
- Input fields functional
- Answer checking available
- Visual feedback on answers

#### 9.3 Interactive Mode - Completion Celebration
**Steps:**
1. On interactive page, complete all questions correctly
2. Observe completion state

**Expected Results:**
- Celebration animation/message appears
- Positive feedback displayed
- Option to try again or exit
- Confetti or visual celebration effect

---

### 10. Edit Mode

#### 10.1 Navigate to Edit Mode
**Steps:**
1. From detail page, click "Edit & Download" button
2. Verify edit page loads

**Expected Results:**
- URL changes to /library/[slug]/edit
- Edit interface loads
- Worksheet HTML is editable
- All questions can be modified
- Images can be changed

#### 10.2 Edit Mode - Modify Content
**Steps:**
1. On edit page, modify a question
2. Change an image
3. Update worksheet title

**Expected Results:**
- Text editing works smoothly
- Image replacement functional
- Changes reflected in preview
- Undo/redo available (if implemented)

#### 10.3 Edit Mode - Download Edited Version
**Steps:**
1. On edit page, make edits
2. Click download button
3. Verify custom PDF downloads

**Expected Results:**
- Edited worksheet generates PDF
- Custom HTML used for PDF generation
- Download includes edits
- Original worksheet in library unchanged
- Filename reflects slug

---

### 11. Analytics and Tracking

#### 11.1 Search Analytics
**Steps:**
1. Perform various searches
2. Check console logs for analytics events

**Expected Results:**
- AI search tracked with type: 'ai'
- Text search tracked with type: 'text'
- Search query, year_group, topic logged
- Analytics function called: trackLibrarySearch()

#### 11.2 Download Analytics
**Steps:**
1. Download a PDF from detail page
2. Verify analytics recording

**Expected Results:**
- Download count increments in database
- last_downloaded_at timestamp updated
- IP hash recorded (SHA-256 hashed)
- User agent stored
- Referrer captured (if present)
- Function: recordDownload() called

#### 11.3 View Count Tracking
**Steps:**
1. View a worksheet detail page
2. Check database for view count increment

**Expected Results:**
- View count increments on detail page load
- View count increments on interactive page load
- No authentication required
- Fire-and-forget update (doesn't block UI)

---

### 12. Responsive Design

#### 12.1 Mobile Layout (< 640px)
**Steps:**
1. Resize browser to mobile width (375px)
2. Navigate through library
3. Verify responsive behavior

**Expected Results:**
- 2-column worksheet grid
- Sidebar filters hidden (desktop-only with lg:block)
- Navigation links may collapse to hamburger menu
- Search bar full-width
- Cards maintain aspect ratio
- Touch-friendly button sizes
- No horizontal scroll

#### 12.2 Tablet Layout (768px - 1024px)
**Steps:**
1. Resize to tablet width (768px)
2. Navigate library

**Expected Results:**
- 3-column worksheet grid
- Sidebar visible on large tablets (>1024px)
- Navigation visible
- Comfortable spacing
- Readable font sizes

#### 12.3 Desktop Layout (> 1024px)
**Steps:**
1. View on desktop (1280px+)
2. Verify full layout

**Expected Results:**
- 4-column worksheet grid
- Sidebar filters visible
- Full navigation with all links
- Optimal spacing and typography
- Hover states functional

#### 12.4 Detail Page Mobile View
**Steps:**
1. Resize to mobile (375px)
2. View worksheet detail page

**Expected Results:**
- Single column layout (image top, info bottom)
- Buttons stack vertically
- Breadcrumb responsive
- Related worksheets in 2-column grid
- Readable content

---

### 13. URL State Management and Routing

#### 13.1 URL Parameter Encoding
**Steps:**
1. Apply filter "Year 1"
2. Check URL encoding

**Expected Results:**
- Spaces encoded as %20 or +
- URL is human-readable and shareable
- Special characters properly encoded
- Parameters use URLSearchParams API

#### 13.2 URL Parameter Decoding
**Steps:**
1. Navigate to URL with encoded params: /library?year_group=Year%201
2. Verify filters applied correctly

**Expected Results:**
- Encoded params decoded properly
- Filters applied on page load
- Dropdowns show correct selected values
- No JavaScript errors

#### 13.3 URL State Sharing
**Steps:**
1. Apply complex filters and reach page 3
2. Copy URL
3. Open URL in new incognito tab
4. Verify exact state restored

**Expected Results:**
- All filters from URL applied
- Pagination state restored (pages 0-3 loaded)
- Sort order preserved
- Search query restored (if present)
- No loss of state

#### 13.4 Browser Back/Forward Navigation
**Steps:**
1. Navigate library, applying different filters
2. Use browser back button
3. Use browser forward button

**Expected Results:**
- Back button returns to previous filter state
- Forward button moves to next state
- URL updates correctly
- No full page reloads (client-side navigation)
- State preserved accurately

#### 13.5 URL Validation and Error Handling
**Steps:**
1. Navigate to URL with invalid filter value: /library?year_group=InvalidYear
2. Observe behavior

**Expected Results:**
- Invalid filters ignored gracefully
- No JavaScript errors
- Page loads with default state
- No worksheets shown if filter truly invalid
- Empty state message may appear

---

### 14. Performance and Optimization

#### 14.1 Initial Page Load Performance
**Steps:**
1. Clear cache
2. Navigate to /library
3. Measure load time (Network tab)

**Expected Results:**
- Time to First Byte (TTFB) < 500ms
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Total page load < 3s
- Server-side rendering for SEO

#### 14.2 Image Loading Optimization
**Steps:**
1. Load library page
2. Check Network tab for image loading
3. Scroll through pages

**Expected Results:**
- Images use Next.js Image component
- Lazy loading enabled (only visible images load)
- Responsive image sizes (srcset)
- WebP format used (if browser supports)
- ImageKit CDN transformations applied
- Thumbnails properly sized

#### 14.3 Infinite Scroll Performance
**Steps:**
1. Scroll through 100+ worksheets
2. Monitor memory usage
3. Check for lag or jank

**Expected Results:**
- Smooth scrolling (60fps)
- No memory leaks
- IntersectionObserver efficient
- No accumulated lag
- Worksheets render quickly

#### 14.4 API Response Caching
**Steps:**
1. Load library page
2. Check response headers
3. Reload page

**Expected Results:**
- Browse API: revalidate = 0 (fresh data)
- Detail pages: revalidate = 3600 (1 hour cache)
- Cache-Control headers set appropriately
- Static generation where possible

---

### 15. Error Handling and Edge Cases

#### 15.1 Network Error Handling
**Steps:**
1. Simulate network disconnection
2. Try to load library page
3. Try to apply filters

**Expected Results:**
- Graceful error messages
- Retry functionality available
- No white screen of death
- User-friendly error text

#### 15.2 Empty Result Sets
**Steps:**
1. Apply filter combinations that return 0 results
2. Verify empty state

**Expected Results:**
- Empty state message: "No worksheets found"
- Subtext: "Try adjusting your filters"
- Clear filters button available
- No error thrown

#### 15.3 Slow Network Conditions
**Steps:**
1. Throttle network to "Slow 3G"
2. Navigate library
3. Apply filters

**Expected Results:**
- Loading states shown appropriately
- Skeleton loaders visible
- No timeout errors (reasonable timeout limits)
- User aware of loading progress

#### 15.4 Missing Thumbnail Images
**Steps:**
1. If possible, break an image URL
2. Observe fallback behavior

**Expected Results:**
- Broken image shows gray placeholder
- Alt text visible
- No broken image icon
- Layout not disrupted

#### 15.5 Very Long Worksheet Titles
**Steps:**
1. Find worksheet with long title
2. Verify truncation on card

**Expected Results:**
- Title truncated with ellipsis (line-clamp-1)
- Hover shows full title (if tooltip implemented)
- Card layout not broken
- Readable on all screen sizes

#### 15.6 API Timeout
**Steps:**
1. Simulate very slow API response (>30s)
2. Observe timeout behavior

**Expected Results:**
- Request times out gracefully
- Error message shown to user
- Retry option available
- No infinite loading state

#### 15.7 Invalid Slug in URL
**Steps:**
1. Navigate to /library/invalid-slug-that-does-not-exist
2. Verify 404 handling

**Expected Results:**
- 404 page shown
- User-friendly message
- Link back to library
- Proper HTTP 404 status code

---

### 16. SEO and Accessibility

#### 16.1 Meta Tags and Social Sharing
**Steps:**
1. View page source of /library
2. Check for meta tags
3. Use social media debugger tools

**Expected Results:**
- Title: "Free Math Printables Library | FreeMathPrintable.com"
- Description: "Browse thousands of free printable math resources..."
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Canonical URL set

#### 16.2 Structured Data (JSON-LD)
**Steps:**
1. View page source of detail page
2. Validate structured data with Google's tool

**Expected Results:**
- JSON-LD script tag present
- Type: LearningResource
- All required fields populated
- Valid schema.org markup
- Rich snippets eligible

#### 16.3 Heading Structure
**Steps:**
1. Check heading hierarchy on library page
2. Verify semantic HTML

**Expected Results:**
- Single h1: "Free Printable Library"
- h2 for major sections
- h3 for subsections
- Logical hierarchy (no skipped levels)

#### 16.4 Keyboard Navigation
**Steps:**
1. Navigate library using only keyboard
2. Tab through interactive elements
3. Test filter dropdowns with keyboard

**Expected Results:**
- All interactive elements reachable via Tab
- Focus indicators visible
- Enter/Space activates buttons
- Arrow keys work in dropdowns
- Escape closes dropdowns
- No keyboard traps

#### 16.5 Screen Reader Compatibility
**Steps:**
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate library page
3. Verify announcements

**Expected Results:**
- Page title announced
- Landmarks identified (nav, main, aside)
- Links have descriptive text
- Images have alt attributes
- Form labels properly associated
- Status messages announced

#### 16.6 Color Contrast
**Steps:**
1. Use browser dev tools to check contrast
2. Verify all text meets WCAG AA standards

**Expected Results:**
- Text contrast ratio ≥ 4.5:1 (normal text)
- Text contrast ratio ≥ 3:1 (large text)
- Interactive elements have sufficient contrast
- No reliance on color alone for information

#### 16.7 Breadcrumb Schema
**Steps:**
1. View page source of detail page
2. Check for breadcrumb schema

**Expected Results:**
- BreadcrumbList schema present (if implemented)
- Position property for each item
- Proper nesting and structure

---

### 17. Admin-Specific Features

#### 17.1 Admin Authentication Check
**Steps:**
1. Load library as non-authenticated user
2. Verify admin features hidden
3. Login as admin
4. Verify admin features visible

**Expected Results:**
- Non-admin: No edit buttons, no logout button
- Admin: Logout button in header
- Admin check via Supabase auth
- Role verified from profiles table

#### 17.2 Admin - Edit Access
**Steps:**
1. As admin, navigate to detail page
2. Click "Edit & Download"
3. Verify edit permissions

**Expected Results:**
- Edit page accessible to all users (not admin-only)
- Edit functionality works
- Edits don't affect original library version

---

### 18. Cross-Browser Compatibility

#### 18.1 Chrome/Edge Testing
**Steps:**
1. Test all scenarios in Chrome
2. Test all scenarios in Edge

**Expected Results:**
- All features work identically
- Layout consistent
- No console errors
- Performance acceptable

#### 18.2 Firefox Testing
**Steps:**
1. Test library page in Firefox
2. Verify filters and infinite scroll

**Expected Results:**
- All functionality works
- CSS renders correctly
- IntersectionObserver supported
- No Firefox-specific bugs

#### 18.3 Safari Testing
**Steps:**
1. Test library page in Safari (macOS/iOS)
2. Verify mobile Safari behavior

**Expected Results:**
- All features functional
- No Safari-specific rendering issues
- Touch events work on iOS
- Smooth scrolling

---

## Summary

This comprehensive test plan covers:

- **18 major test categories**
- **100+ individual test scenarios**
- **All core functionality**: Browse, filter, search, sort, infinite scroll
- **All pages**: Library index, detail, interactive, edit
- **User interactions**: Clicks, hovers, keyboard navigation, touch
- **Data flows**: API calls, state management, URL routing
- **Edge cases**: Empty states, errors, loading states
- **Quality attributes**: Performance, SEO, accessibility, responsiveness
- **Admin features**: Authentication, role-based access

This test plan is designed to be executed by the playwright-test-generator agent to create comprehensive E2E tests that verify all critical user flows and functionality of the worksheet library application.

---

## Test Execution Notes

**Environment:**
- Base URL: http://localhost:3000
- Browser: Chromium (desktop viewport)
- Database: Supabase with published worksheets
- Authentication: Optional (admin tests require login)

**Prerequisites:**
- Application running on port 3000
- Database seeded with variety of worksheets (different year groups, topics, themes)
- At least 60+ worksheets for pagination testing
- Some worksheets published within last 7 days (for NEW badge testing)
- Some worksheets with >1000 downloads (for HOT badge testing)

**Test Data Requirements:**
- Worksheets spanning all year groups (Reception - Year 6)
- Coverage of all topics and subtopics
- Various visual themes, activity types, seasonal themes
- Some worksheets with versions (v2, v3) for version badge testing
- Worksheets with complete SEO metadata for testing
- Worksheets with educational content fields populated

**Notes for Test Generator:**
- Use data-testid attributes where helpful for stable selectors
- Focus on functional testing (no screenshots per project guidelines)
- Verify element visibility and functionality
- Test actual button clicks and navigation
- Validate state changes and URL updates
- Check for proper error handling
- Ensure responsive behavior on different viewports
