# TeacherBuddy UI/UX Design Specification

> Comprehensive design guide for FreeMathPrintable.com - An AI-powered math worksheet generator for teachers and homeschooling parents.

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Design System](#design-system)
3. [Page-by-Page Mockups](#page-by-page-mockups)
4. [Component Library](#component-library)
5. [Interaction Patterns](#interaction-patterns)
6. [Accessibility Guidelines](#accessibility-guidelines)
7. [Implementation Roadmap](#implementation-roadmap)

---

## Design Philosophy

### Core Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Teacher-First** | Every design decision optimizes for busy teachers | Large buttons, minimal steps, clear hierarchy |
| **Trust Through Quality** | Professional appearance builds confidence | Polished typography, consistent spacing, no visual bugs |
| **Warm Professionalism** | Educational without being childish or corporate | Soft colors, friendly illustrations, approachable copy |
| **Speed to Value** | Minimize time from landing to worksheet | Progressive disclosure, smart defaults, instant feedback |
| **Delightful Moments** | Celebrate success without being annoying | Subtle animations, encouraging microcopy, achievement badges |

### Emotional Journey

```
Landing Page       → "This looks professional and free!"
Configuration      → "So easy to set up exactly what I need"
Generation         → "Wow, that was fast!"
Preview/Edit       → "I can customize everything!"
Download           → "Perfect for my class tomorrow!"
```

---

## Design System

### Color Palette

#### Primary Colors
```css
/* Trust Blue - Main brand color */
--blue-50: #EFF6FF;
--blue-100: #DBEAFE;
--blue-500: #3B82F6;
--blue-600: #2563EB;
--blue-700: #1D4ED8;

/* Warm Purple - Secondary accent */
--purple-50: #FAF5FF;
--purple-100: #F3E8FF;
--purple-500: #8B5CF6;
--purple-600: #7C3AED;

/* Success Green - Positive actions */
--green-50: #ECFDF5;
--green-500: #10B981;
--green-600: #059669;

/* Warm Orange - Engagement/CTAs */
--orange-50: #FFF7ED;
--orange-500: #F59E0B;
--orange-600: #D97706;
```

#### Background Colors
```css
/* Warm backgrounds instead of pure white */
--bg-cream: #FEFDFB;
--bg-warm-gray: #F9FAFB;
--bg-paper: #FDF8F3;
--bg-chalkboard: #1E293B;
```

#### Semantic Colors
```css
/* States */
--error: #EF4444;
--warning: #F59E0B;
--success: #10B981;
--info: #3B82F6;

/* Grade Level Colors */
--reception: #EC4899;  /* Pink - youngest */
--year-1: #F97316;     /* Orange */
--year-2: #EAB308;     /* Yellow */
--year-3: #22C55E;     /* Green */
--year-4: #06B6D4;     /* Cyan */
--year-5: #3B82F6;     /* Blue */
--year-6: #8B5CF6;     /* Purple - oldest */
```

### Typography

#### Font Stack
```css
/* Headings - Friendly and rounded */
--font-heading: 'Nunito', 'Quicksand', system-ui, sans-serif;

/* Body - Clean and readable */
--font-body: 'Inter', 'Open Sans', system-ui, sans-serif;

/* Decorative - Handwritten feel */
--font-handwritten: 'Caveat', 'Patrick Hand', cursive;

/* Monospace - For numbers/code */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale
```css
--text-xs: 0.75rem;    /* 12px - Labels, hints */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Large body */
--text-xl: 1.25rem;    /* 20px - Subheadings */
--text-2xl: 1.5rem;    /* 24px - Section titles */
--text-3xl: 1.875rem;  /* 30px - Page titles */
--text-4xl: 2.25rem;   /* 36px - Hero titles */
--text-5xl: 3rem;      /* 48px - Impact text */
```

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.5rem;    /* 8px - Buttons, inputs */
--radius-lg: 0.75rem;   /* 12px - Cards */
--radius-xl: 1rem;      /* 16px - Large cards */
--radius-2xl: 1.5rem;   /* 24px - Modals */
--radius-full: 9999px;  /* Pills, badges */
```

### Shadows
```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

/* Colored shadows for depth */
--shadow-blue: 0 4px 14px rgba(59, 130, 246, 0.25);
--shadow-purple: 0 4px 14px rgba(139, 92, 246, 0.25);
--shadow-green: 0 4px 14px rgba(16, 185, 129, 0.25);
```

---

## Page-by-Page Mockups

### 1. Homepage / Landing Page

#### Structure
```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR                                              │
│ [Logo]    [Library] [Create] [How it Works]      [Sign In]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                      HERO SECTION                           │
│  ┌──────────────────────┐  ┌─────────────────────────────┐ │
│  │                      │  │  "Create Perfect Math       │ │
│  │   [Illustration:     │  │   Worksheets in Seconds"    │ │
│  │    Happy teacher     │  │                             │ │
│  │    with worksheets]  │  │  AI-powered. Curriculum-    │ │
│  │                      │  │  aligned. 100% Free.        │ │
│  └──────────────────────┘  │                             │ │
│                            │  [Browse Library] [Create]   │ │
│                            └─────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                   TRUST BADGES ROW                          │
│  [✓ 100% Free] [✓ No Signup] [✓ Print Ready] [✓ UK & US]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                 GRADE LEVEL NAVIGATION                      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│  │ K   │ │ 1st │ │ 2nd │ │ 3rd │ │ 4th │ │ 5th │ │ 6th │  │
│  │     │ │     │ │     │ │     │ │     │ │     │ │     │  │
│  │[icon]│ │[icon]│ │[icon]│ │[icon]│ │[icon]│ │[icon]│ │[icon]│  │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                  FEATURED WORKSHEETS                        │
│  "Popular This Week"                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │[Preview]│ │[Preview]│ │[Preview]│ │[Preview]│           │
│  │ Title   │ │ Title   │ │ Title   │ │ Title   │           │
│  │ Grade 1 │ │ Grade 2 │ │ Grade K │ │ Grade 3 │           │
│  │ [↓ 234] │ │ [↓ 189] │ │ [↓ 156] │ │ [↓ 142] │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    HOW IT WORKS                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │     1       │   │     2       │   │     3       │       │
│  │  [Select]   │   │  [Generate] │   │  [Download] │       │
│  │  Grade &    │   │  AI creates │   │  Print or   │       │
│  │  Topic      │   │  worksheet  │   │  practice   │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│              CUSTOMIZATION SHOWCASE                         │
│  "Make Every Worksheet Your Own"                            │
│  [Interactive demo showing edit capabilities]               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    TESTIMONIALS                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "Saves me 2 hours every week!"                      │   │
│  │                     - Sarah M., Year 2 Teacher       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                       FOOTER                                │
│  [Grade Links] [Topics] [Resources] [Legal]                 │
│  [Trust badges: Curriculum logos, security badges]          │
└─────────────────────────────────────────────────────────────┘
```

#### Key Design Elements

**Hero Section:**
- Left: Warm illustration of a smiling teacher with children, holding a worksheet
- Right: Clear value proposition with gradient text accent
- Two CTAs: Primary "Browse Library" (green), Secondary "Create Custom" (purple outline)
- Floating decorative elements: Subtle math symbols, pencils, rulers (10% opacity)

**Grade Navigation:**
- Horizontal scrollable on mobile
- Each grade card has:
  - Unique color from grade palette
  - Age-appropriate icon (teddy bear for K, rocket for 6th)
  - Hover: Slight lift with shadow, shows "X worksheets" count
- Active state: Solid fill with white text

**Trust Badges:**
- Pill-shaped badges with icons
- Soft background colors matching content
- Subtle entrance animation on scroll

---

### 2. Worksheet Generator (/create)

#### Structure
```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION (Compact)                                        │
│ [← Home] FreeMathPrintable.com   [Library] [Help]          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─ CONFIGURATION ─┐    ┌─────── PREVIEW ───────────┐      │
│  │                  │    │                           │      │
│  │  STEP INDICATOR  │    │  ┌───────────────────┐   │      │
│  │  ● ○ ○ ○         │    │  │                   │   │      │
│  │  Layout          │    │  │                   │   │      │
│  │                  │    │  │   WORKSHEET       │   │      │
│  │  ┌────────────┐  │    │  │   PREVIEW         │   │      │
│  │  │ [Standard] │  │    │  │                   │   │      │
│  │  │ [Grid]     │  │    │  │   (Live updates   │   │      │
│  │  │ [2-Column] │  │    │  │    as you         │   │      │
│  │  │ [Diff]     │  │    │  │    configure)     │   │      │
│  │  │ [Reason]   │  │    │  │                   │   │      │
│  │  └────────────┘  │    │  │                   │   │      │
│  │                  │    │  └───────────────────┘   │      │
│  │  Year Group      │    │                           │      │
│  │  [Dropdown ▼]    │    │  ┌─────────────────────┐ │      │
│  │                  │    │  │ [View] [Edit]       │ │      │
│  │  Topic           │    │  └─────────────────────┘ │      │
│  │  [Dropdown ▼]    │    │                           │      │
│  │                  │    └───────────────────────────┘      │
│  │  Subtopic        │                                       │
│  │  [Dropdown ▼]    │    ┌─────────────────────────────┐   │
│  │                  │    │  [Generate Worksheet]        │   │
│  │  ┌────────────┐  │    │  [Download PDF] [Interactive]│   │
│  │  │ Show Ans ⚪│  │    └─────────────────────────────┘   │
│  │  └────────────┘  │                                       │
│  │                  │                                       │
│  └──────────────────┘                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Key Design Elements

**Configuration Panel (Left - 30%):**
- Sticky on desktop, collapsible drawer on mobile
- Step indicator showing progress through configuration
- Visual layout selector with thumbnail previews instead of dropdown
- Smart defaults based on common choices
- Collapsible "Advanced Options" for theme, question count
- Region toggle (US/UK) appears contextually for currency topics

**Preview Panel (Right - 70%):**
- Paper-like frame with subtle shadow (looks like a printed page)
- Zoom controls (+/-) in corner
- Mode toggle tabs: "View" | "Edit"
- Loading state: Skeleton with typing animation
- Empty state: Encouraging illustration with "Configure and click Generate"

**Generate Button:**
- Large, prominent, gradient background
- Disabled state shows what's missing: "Select a subtopic to continue"
- Loading state: Progress bar with percentage + educational tip

**Action Bar (Below Preview):**
- Sticky on scroll
- Three buttons: Regenerate | Download PDF | Interactive Mode
- Admin: Additional "Save to Library" button

---

### 3. Library Browser (/library)

#### Structure
```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION                                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LIBRARY HEADER                                             │
│  "Free Math Worksheet Library"                              │
│  "1,247 curriculum-aligned worksheets ready to download"   │
│                                                             │
│  ┌─ SEARCH & FILTERS ─────────────────────────────────────┐│
│  │ [🔍 Search worksheets...                              ]││
│  │                                                         ││
│  │ [All Grades ▼] [All Topics ▼] [Difficulty ▼] [Sort ▼] ││
│  │                                                         ││
│  │ Active Filters: [Grade 2 ✕] [Addition ✕]  [Clear All] ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  RESULTS: "24 worksheets found"                             │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │ [Thumb] │ │ [Thumb] │ │ [Thumb] │ │ [Thumb] │           │
│  │         │ │         │ │         │ │         │           │
│  │ Title   │ │ Title   │ │ Title   │ │ Title   │           │
│  │ ───────│ │ ───────│ │ ───────│ │ ───────│           │
│  │ Grade 2 │ │ Grade 1 │ │ Grade 2 │ │ Grade 3 │           │
│  │ ⭐⭐⭐⭐ │ │ ⭐⭐⭐⭐⭐│ │ ⭐⭐⭐  │ │ ⭐⭐⭐⭐ │           │
│  │ [↓234] │ │ [↓189] │ │ [↓156] │ │ [↓142] │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  ...    │ │  ...    │ │  ...    │ │  ...    │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  [Load More] or Infinite Scroll                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Key Design Elements

**Worksheet Cards:**
```
┌─────────────────────────────────┐
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │   [Worksheet Preview    │   │
│  │    Thumbnail]           │   │
│  │                         │   │
│  │   ┌─────┐               │   │
│  │   │ NEW │ (badge)       │   │
│  │   └─────┘               │   │
│  └─────────────────────────┘   │
│                                 │
│  Addition to 20                 │  ← Title (truncate with ...)
│  Year 1 • Standard Layout       │  ← Metadata
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ Easy │ │ 5 Qs │ │ 📥234│   │  ← Tags/Stats
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  [Preview] [Download]           │  ← Quick Actions (on hover)
└─────────────────────────────────┘
```

**Filter Bar:**
- Horizontal filter pills on desktop, bottom sheet on mobile
- Active filters shown as removable chips
- "Clear All" to reset
- Filter counts shown in parentheses: "Grade 2 (24)"

**Search:**
- Prominent search bar with placeholder examples
- Recent searches dropdown
- Instant results as you type

---

### 4. Worksheet Detail Page

#### Structure
```
┌─────────────────────────────────────────────────────────────┐
│ BREADCRUMB: Library > Year 2 > Addition > Addition to 20   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─ WORKSHEET INFO ────────┐  ┌─ PREVIEW ────────────────┐ │
│  │                          │  │                          │ │
│  │  "Addition to 20"        │  │  ┌────────────────────┐ │ │
│  │  Year 2 Mathematics      │  │  │                    │ │ │
│  │                          │  │  │   [Interactive     │ │ │
│  │  ⭐⭐⭐⭐⭐ (4.8 rating)    │  │  │    Preview]        │ │ │
│  │  📥 1,234 downloads      │  │  │                    │ │ │
│  │                          │  │  │   Zoomable         │ │ │
│  │  ┌──────────────────┐   │  │  │   Scrollable       │ │ │
│  │  │ Curriculum Tags  │   │  │  │                    │ │ │
│  │  │ [Addition] [Y2]  │   │  │  │                    │ │ │
│  │  │ [Mental Math]    │   │  │  └────────────────────┘ │ │
│  │  └──────────────────┘   │  │                          │ │
│  │                          │  │  [Zoom +] [Zoom -]      │ │
│  │  ACTIONS:                │  └──────────────────────────┘ │
│  │                          │                               │
│  │  [📥 Download PDF]       │                               │
│  │  (Primary CTA)           │                               │
│  │                          │                               │
│  │  [🎮 Practice Online]    │                               │
│  │  [✏️ Customize & Edit]   │                               │
│  │  [🔄 Generate Similar]   │                               │
│  │                          │                               │
│  └──────────────────────────┘                               │
│                                                             │
│  ┌─ RELATED WORKSHEETS ─────────────────────────────────┐  │
│  │  "More Addition Worksheets for Year 2"               │  │
│  │  [Card] [Card] [Card] [Card]                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. Interactive Practice Mode

#### Structure (Child-Friendly)
```
┌─────────────────────────────────────────────────────────────┐
│  ┌─ PROGRESS BAR ─────────────────────────────────────────┐│
│  │ ⭐⭐⭐○○○○○○○  Question 3 of 10       [Exit]           ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │               QUESTION DISPLAY                          ││
│  │                                                         ││
│  │        [Large, clear question with images]              ││
│  │                                                         ││
│  │            🍎🍎🍎  +  🍎🍎  =  ___                       ││
│  │                                                         ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─ ANSWER INPUT ──────────────────────────────────────────┐│
│  │                                                         ││
│  │         ┌─────────────────────────────┐                ││
│  │         │                             │                ││
│  │         │         [  5  ]             │ ← Big input    ││
│  │         │                             │                ││
│  │         └─────────────────────────────┘                ││
│  │                                                         ││
│  │         [1] [2] [3] [4] [5]  ← Number pad (optional)   ││
│  │         [6] [7] [8] [9] [0]                            ││
│  │                                                         ││
│  │              [Check Answer ✓]                          ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
│  ┌─ ENCOURAGEMENT ─────────────────────────────────────────┐│
│  │  "You're doing great! 🌟"                               ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Feedback States

**Correct Answer:**
```
┌─────────────────────────────────────────┐
│                                         │
│     ✨ 🎉 ✨                             │
│                                         │
│     "That's right!"                     │
│                                         │
│     +10 points                          │
│                                         │
│     [Continue →]                        │
│                                         │
└─────────────────────────────────────────┘
```
- Confetti animation
- Star collection sound
- Points animation
- Auto-advance after 1.5s

**Incorrect Answer:**
```
┌─────────────────────────────────────────┐
│                                         │
│     "Almost! Let's try again."          │
│                                         │
│     Hint: Count all the apples 🍎       │
│                                         │
│     [Try Again]                         │
│                                         │
└─────────────────────────────────────────┘
```
- Gentle shake animation
- Encouraging message
- Optional hint reveal
- No penalty, just retry

**Completion Screen:**
```
┌─────────────────────────────────────────┐
│                                         │
│         🏆 AMAZING WORK! 🏆             │
│                                         │
│     You completed the worksheet!        │
│                                         │
│     ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐                    │
│           10/10 correct                 │
│                                         │
│     [Try Another] [Download PDF]        │
│                                         │
└─────────────────────────────────────────┘
```
- Full celebration animation
- Achievement badge earned
- Share option (optional)

---

## Component Library

### Button Variants

```tsx
// Primary - Main actions
<Button variant="primary" size="lg">
  Generate Worksheet
</Button>

// Secondary - Alternative actions
<Button variant="secondary" size="md">
  Download PDF
</Button>

// Outline - Tertiary actions
<Button variant="outline" size="md">
  View Details
</Button>

// Ghost - Minimal actions
<Button variant="ghost" size="sm">
  Cancel
</Button>

// Destructive - Dangerous actions
<Button variant="destructive" size="md">
  Delete
</Button>

// Success - Positive confirmations
<Button variant="success" size="lg">
  Save to Library
</Button>
```

#### Button Sizes
```css
/* Touch-friendly sizing */
--btn-sm: height 32px, padding 12px 16px, font 14px
--btn-md: height 40px, padding 16px 24px, font 16px
--btn-lg: height 48px, padding 20px 32px, font 18px
--btn-xl: height 56px, padding 24px 40px, font 20px (mobile primary)
```

### Card Component

```tsx
// Worksheet Card
<WorksheetCard
  thumbnail="/preview.jpg"
  title="Addition to 20"
  grade="Year 2"
  topic="Addition"
  downloads={1234}
  isNew={true}
  difficulty="easy"
  onPreview={() => {}}
  onDownload={() => {}}
/>
```

### Input Components

```tsx
// Select with visual options
<VisualSelect
  label="Choose Layout"
  options={[
    { id: 'standard', icon: '📝', label: 'Standard', preview: '/layouts/standard.png' },
    { id: 'grid', icon: '🔢', label: 'Grid', preview: '/layouts/grid.png' },
    // ...
  ]}
  value={layout}
  onChange={setLayout}
/>

// Cascading Select (Year > Topic > Subtopic)
<CascadingSelect
  levels={[
    { label: 'Year Group', options: years },
    { label: 'Topic', options: topics, dependsOn: 'yearGroup' },
    { label: 'Subtopic', options: subtopics, dependsOn: 'topic' },
  ]}
  values={values}
  onChange={setValues}
/>
```

### Progress Components

```tsx
// Generation Progress
<GenerationProgress
  status="generating" // 'idle' | 'generating' | 'complete' | 'error'
  progress={65}
  tip="Did you know? Teachers save an average of 2 hours per week!"
/>

// Step Indicator
<StepIndicator
  steps={['Layout', 'Grade', 'Topic', 'Generate']}
  currentStep={2}
/>
```

### Badge Components

```tsx
// Grade Badge
<GradeBadge grade="year-2" size="md" />

// Difficulty Badge
<DifficultyBadge level="easy" /> // easy | average | hard

// Status Badge
<StatusBadge status="new" /> // new | popular | updated

// Trust Badge
<TrustBadge icon="check" text="100% Free" />
```

---

## Interaction Patterns

### Hover States
- Cards: Subtle lift (translateY -2px) + shadow increase
- Buttons: Background darkens 10%, scale 1.02
- Links: Underline appears, color shifts
- Thumbnails: Slight zoom (scale 1.05) with overlay actions

### Loading States
- Skeleton screens for content areas (animated shimmer)
- Spinner + text for actions ("Generating your worksheet...")
- Progress bar for long operations (with percentage)
- Optimistic UI for toggles and quick actions

### Empty States
- Friendly illustration (not just text)
- Clear action to resolve (e.g., "No worksheets found. Try a different filter.")
- Suggestion of what to do next

### Error States
- Red border/background for inline errors
- Toast notifications for transient errors
- Full-page error with retry for critical failures
- Helpful error messages (not technical jargon)

### Success States
- Green checkmark animation
- Toast notification with action (e.g., "Downloaded! [Open folder]")
- Confetti for major achievements (worksheet completion)

### Transitions
- Page transitions: Fade + slight slide (150ms)
- Modal: Fade in + scale from 95% (200ms)
- Drawer: Slide from edge (250ms, ease-out)
- Accordion: Height expand with content fade (200ms)

---

## Accessibility Guidelines

### Keyboard Navigation
- All interactive elements focusable
- Visible focus rings (2px solid blue, 2px offset)
- Logical tab order (left to right, top to bottom)
- Skip link to main content
- Escape closes modals/dropdowns

### Screen Readers
- All images have meaningful alt text
- ARIA labels for icon-only buttons
- Live regions for dynamic content updates
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs

### Color & Contrast
- Minimum 4.5:1 contrast for body text
- Minimum 3:1 for large text and icons
- Don't rely on color alone (use icons/text too)
- Color-blind friendly palette (tested with simulators)

### Motion
- Respect prefers-reduced-motion
- No autoplay for animations
- Pause/stop controls for long animations
- Avoid flashing content

### Touch Targets
- Minimum 44x44px touch targets
- 8px minimum spacing between targets
- Larger targets for primary actions (48-56px)

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up design tokens (CSS variables)
- [ ] Update Tailwind config with new colors/typography
- [ ] Create base component variants (Button, Input, Card)
- [ ] Implement new color palette across app

### Phase 2: Homepage Redesign (Week 3-4)
- [ ] New hero section with illustration
- [ ] Redesigned grade navigation
- [ ] Featured worksheets carousel
- [ ] Trust badges and social proof
- [ ] Footer redesign

### Phase 3: Generator Page (Week 5-6)
- [ ] Visual layout selector
- [ ] Step progress indicator
- [ ] Improved preview panel
- [ ] Enhanced loading states
- [ ] Mobile drawer for configuration

### Phase 4: Library & Detail (Week 7-8)
- [ ] Redesigned worksheet cards
- [ ] Enhanced filter bar
- [ ] Search improvements
- [ ] Detail page layout
- [ ] Related worksheets section

### Phase 5: Interactive Mode (Week 9-10)
- [ ] Child-friendly interface
- [ ] Celebration animations
- [ ] Number pad input
- [ ] Progress tracking
- [ ] Completion screen

### Phase 6: Polish & Testing (Week 11-12)
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] User testing feedback incorporation

---

## Appendix

### Recommended Assets
- Illustrations: [unDraw](https://undraw.co/), [Storyset](https://storyset.com/)
- Icons: [Lucide](https://lucide.dev/) (already used), [Phosphor](https://phosphoricons.com/)
- Fonts: Google Fonts (Nunito, Inter, Caveat)
- Stock photos: [Unsplash](https://unsplash.com/) (teacher/classroom images)

### Design Tools
- Figma for mockups and prototypes
- Storybook for component documentation
- Chromatic for visual regression testing

### Reference Sites
- [Canva for Education](https://www.canva.com/education/)
- [Teachers Pay Teachers](https://www.teacherspayteachers.com/)
- [Twinkl](https://www.twinkl.co.uk/)
- [Education.com](https://www.education.com/)
