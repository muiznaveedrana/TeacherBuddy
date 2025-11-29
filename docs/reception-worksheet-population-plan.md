# Reception/Kindergarten Worksheet Population Plan

## Overview
Populate the free-printables section with 3 worksheets per subtopic for Reception (Kindergarten).
Each worksheet has unique questions and images.

## Target
- **Year Group:** Reception (Kindergarten)
- **Worksheets per subtopic:** 3 (with different questions/images each)
- **Total subtopics:** 15
- **Total worksheets:** 45

---

## Subtopics Checklist

### Prompt File Paths Reference
All prompts are located in:
```
M:\ClaudeCodeProjects\worksheetgenerator-ai\src\lib\prompts\configurations\reception\
```

### 1. Number & Counting (7 subtopics = 21 worksheets)

| Subtopic | Prompt File (MUST READ BEFORE GENERATING) | WS 1 | WS 2 | WS 3 |
|----------|-------------------------------------------|------|------|------|
| counting-to-10 | `number-counting\counting-to-10-COMPRESSED.md` | ✅ | ✅ | ✅ |
| number-recognition | `number-counting\number-recognition-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| early-addition | `number-counting\early-addition-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| early-subtraction | `number-counting\early-subtraction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| more-or-less | `number-counting\more-or-less-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| number-bonds | `number-counting\number-bonds-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| subitising | `number-counting\subitising-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |

### 2. Shape & Space (4 subtopics = 12 worksheets)

| Subtopic | Prompt File (MUST READ BEFORE GENERATING) | WS 1 | WS 2 | WS 3 |
|----------|-------------------------------------------|------|------|------|
| basic-shapes | `shape-space\basic-shapes-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| patterns | `shape-space\patterns-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| position-direction | `shape-space\position-direction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| size-comparison | `shape-space\size-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |

### 3. Measurement (4 subtopics = 12 worksheets)

| Subtopic | Prompt File (MUST READ BEFORE GENERATING) | WS 1 | WS 2 | WS 3 |
|----------|-------------------------------------------|------|------|------|
| capacity | `measurement\capacity-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| length-comparison | `measurement\length-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| time-concepts | `measurement\time-concepts-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |
| weight-comparison | `measurement\weight-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ |

---

## Workflow (Per Worksheet)

### Step 1: Generate & Manual Preview

**⚠️ MANDATORY: Must use the subtopic-specific prompt file**

Prompt files are located at:
```
M:\ClaudeCodeProjects\worksheetgenerator-ai\src\lib\prompts\configurations\reception\{topic}\{subtopic}-COMPRESSED.md
```

Before generating any worksheet, Claude MUST:
1. **Read the corresponding prompt file** for the subtopic being generated
2. **DISPLAY to user which prompt was selected** (see format below)
3. Use that prompt's structure, question types, and formatting requirements
4. Follow any subtopic-specific instructions in the prompt

**Claude MUST display this message BEFORE generating:**
```
📋 PROMPT SELECTED:
   Subtopic: {subtopic}
   Prompt File: {full path to prompt file}
   
   Reading prompt now...
```

**Claude MUST then display the full prompt content to the user.**

### Step 1b: Theme Selection (User Choice)

After showing the prompt, Claude MUST ask the user to choose a theme approach:

```
🎨 THEME SELECTION:

Choose how objects should be selected for this worksheet:

1. **Random Mix** - Use random different objects from the prompt's full list
   (e.g., apple, butterfly, car, dog, cookie)
   Title: "Counting to 10 - Mixed Objects #1"

2. **Themed** - You specify a theme, I'll use matching objects
   Available themes: Farm Animals, Fruits, Vegetables, Wild Animals, 
   School Supplies, Toys, Sports, Food/Treats, Nature, Shapes
   Title: "Counting to 10 - {Your Theme} #1"

3. **Custom** - You specify exactly which objects to use
   Title: "Counting to 10 - {Your Title}"

Reply with: 1, 2 (+ theme name), or 3 (+ object list)
```

**Claude waits for user response before generating.**

### Step 1c: Generate Worksheet

Generate worksheet following:
1. **The prompt's structure, question types, and formatting requirements**
2. **The user's theme selection from Step 1b**
3. Save to `public/preview-worksheet.html`
4. Provide localhost link for manual review: `http://localhost:3000/preview-worksheet.html`

### Step 2: Screenshot & Batch Approval

**Batch Workflow:** Claude creates all 3 worksheets for a subtopic, then opens all 3 screenshots for review.

Claude Desktop will:
1. Generate all 3 worksheets for the subtopic (saved as `preview-worksheet-1.html`, `preview-worksheet-2.html`, `preview-worksheet-3.html`)
2. Take screenshots of all 3:
   ```powershell
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 1
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 2
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 3
   ```
3. **Open all 3 screenshots** for user to review:
   ```powershell
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-1.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-2.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-3.png"
   ```
4. **Wait for user approval of ALL 3 before saving**
5. If user requests changes → make edits to specific worksheet(s) → re-screenshot → repeat until all approved
6. Only proceed to Step 3 when user explicitly approves all 3

**Important:** Claude does NOT save ANY worksheets until user approves ALL 3. The iteration loop continues until the user says "approved", "all good", "save them", or similar.

### Step 3: Save All to Library (Only After Batch Approval)

After user approves all 3 worksheets, Claude Desktop saves each one using the simple wrapper script:

```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai

# Save worksheet 1
node scripts/save-worksheet.js public/preview-worksheet-1.html Reception number-counting counting-to-10 average 5

# Save worksheet 2
node scripts/save-worksheet.js public/preview-worksheet-2.html Reception number-counting counting-to-10 average 5

# Save worksheet 3
node scripts/save-worksheet.js public/preview-worksheet-3.html Reception number-counting counting-to-10 average 5
```

**Script usage:**
```
node scripts/save-worksheet.js <file> <year_group> <topic> <subtopic> [difficulty] [question_count]
```

The script automatically generates:
- SEO metadata (title, description, keywords)
- Thumbnail (uploaded to ImageKit)
- Educational content via Gemini AI (learning objectives, how to use, benefits, skills, FAQ)
- Unique slug with auto-versioning (v2, v3, etc.)

### Step 4: Verify
1. **Library:** `http://localhost:3000/library` - Card appears
2. **Free Printables:** `http://localhost:3000/free-printables/reception/{topic}/{subtopic}` - Shows in list
3. **Interactive Mode:** Click card → Test interactive toggle

---

## Title Naming Convention

**Standard Header Format (from `src/lib/templates/layouts.ts`):**

The worksheet header MUST follow the exact format used in the codebase:

```html
<div class="worksheet-header">
  <h1 class="worksheet-title">{subtopic in Title Case}</h1>
  <div class="worksheet-details">{internationalYearLabel} • {topic in Title Case}</div>
</div>
```

**Components:**
- **Title (`.worksheet-title`):** Subtopic only, in Title Case
  - Example: "Counting To 10", "Number Recognition", "Basic Shapes"
- **Details (`.worksheet-details`):** International year label + topic
  - Format: `{yearLabel} • {topic}`
  - Example: "Kindergarten / Reception (Ages 4-5) • Number And Counting"

**International Year Labels (from `src/lib/data/curriculum.ts`):**
| Internal Value | International Label |
|----------------|---------------------|
| Reception | Kindergarten / Reception (Ages 4-5) |
| Year 1 | Grade 1 / Year 1 (Ages 5-6) |
| Year 2 | Grade 2 / Year 2 (Ages 6-7) |

**Topic Labels:**
| Topic ID | Display Label |
|----------|---------------|
| number-counting | Number And Counting |
| shape-space | Shape And Space |
| measurement | Measurement |

**NO Name/Date fields** - the base template does not include these.

**CSS Settings for Reception (from `layouts.ts`):**
```css
font-family: 'Comic Sans MS', Arial, sans-serif;
font-size: 18pt;
line-height: 1.9;
padding: 6mm 10mm;
```

---

## Metadata Template

```javascript
{
  title: "Counting To 10",  // Subtopic in Title Case (matches worksheet-title)
  year_group: "reception",
  topic: "number-counting",
  subtopic: "counting-to-10",
  difficulty: "average",
  question_count: 5,
  layout_type: "standard",
  tags: ["counting", "numbers", "kindergarten", "reception"]
}
```

---

## Region Configuration

**All worksheets are shown to ALL users regardless of region.**

- **Universal worksheets** (counting, shapes, etc.) - Region field is metadata only, not used for filtering
- **Region-specific worksheets** (UK coins, US coins) - Both versions appear in library, users can optionally filter by region

**Save script behavior:**
- Default: `region: 'UK'` (for UK National Curriculum alignment)
- Can override with `region` parameter for US-specific content

**Browse behavior:**
- Shows ALL published worksheets (no region filter by default)
- Optional region filter available if user explicitly requests it

**Key fix applied (2025-11-29):**
- Removed hard-coded `.eq('region', 'UK')` from `browseLibraryWorksheets()` in `libraryService.ts`
- Library now displays all worksheets regardless of region

---

## Phase 2: Interactive Mode Testing

After saving each worksheet:
1. Navigate to `/library/{slug}`
2. Toggle "Interactive Mode" 
3. Verify:
   - Questions display correctly
   - Input fields work
   - Validation/feedback works
   - Mobile responsive

---

## Progress Tracking

Update this doc after each batch:

**Started:** November 29, 2025
**Current Progress:** 3/45 worksheets

### Session Log
| Date | Subtopic | Worksheets Created | Notes |
|------|----------|-------------------|-------|
| 2025-11-29 | counting-to-10 | 3 | Mixed objects theme. Removed pencil, crayon, football from prompt due to bad images. Fixed region filter bug - library now shows all worksheets. |

---

## Quick Commands

### List available images:
```powershell
Get-ChildItem "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\images" -Filter "*.png" | Select-Object Name
```

### Check saved worksheets count:
```sql
SELECT subtopic, COUNT(*) FROM library_worksheets 
WHERE year_group = 'Reception' AND status = 'published'
GROUP BY subtopic;
```

### Start dev server:
```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai
npm run dev
```
