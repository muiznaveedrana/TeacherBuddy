# Worksheet Population Plan

## Overview
Populate the free-printables section with 3 worksheets per subtopic for all enabled year groups.
Each worksheet has unique questions and images.

## Targets
- **Year Groups:** Reception, Year 1, Year 2 (enabled in system)
- **Worksheets per subtopic:** 3 (with different questions/images each)
- **Interactive mode suitability:** Primary design criterion

---

## Sub-Agent Requirements (For Parallel Processing)

This document is designed for sub-agents to work independently on different subtopics in parallel.

### Prerequisites for Each Sub-Agent

1. **Dev Server Running:** `http://localhost:3000` must be accessible
2. **Desktop Commander Access:** For file operations
3. **Codebase Access:** `M:\ClaudeCodeProjects\worksheetgenerator-ai`
4. **API Timeout:** Max 30 seconds for worksheet generation calls (streaming typically completes in 5-10s)

### Sub-Agent Assignment Format

Each sub-agent receives ONE subtopic to complete end-to-end:
```
ASSIGNED SUBTOPIC:
- Year Group: {Reception|Year 1|Year 2}
- Topic: {topic-id}
- Subtopic: {subtopic-id}
- Tier: {1|2|3}
- Prompt Path: src/lib/prompts/configurations/{year}/{topic}/{subtopic}-COMPRESSED.md
```

### Sub-Agent Workflow (Follow Strictly)

```
Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4
(Prompt QA)  (Generate)  (Approve)   (Save)    (Test)
```

**Each phase must complete before moving to next.**

### Success Criteria for Sub-Agent

Sub-agent marks subtopic COMPLETE only when:
- [ ] Phase 0: Prompt refined and tested
- [ ] Phase 1: 3 worksheets generated with different themes
- [ ] Phase 2: All 3 visually approved (screenshots verified)
- [ ] Phase 3: All 3 saved to library (slugs recorded)
- [ ] Phase 4: All 3 pass interactive tests with 100% score

### Sub-Agent Output Format

After completing subtopic, sub-agent reports:
```
SUBTOPIC COMPLETE: {subtopic}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Year Group: {year}
Topic: {topic}
Prompt Refined: ✅

Worksheets:
1. Slug: {slug-v1} | Theme: {theme} | Test: 100% ✅
2. Slug: {slug-v2} | Theme: {theme} | Test: 100% ✅
3. Slug: {slug-v3} | Theme: {theme} | Test: 100% ✅

Interactive Test Report: tests/e2e/interactive/test-report.html
Time Taken: {duration}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Conflict Avoidance

- Each sub-agent works on DIFFERENT subtopic
- Preview files use subtopic-specific names: `preview-worksheet-{subtopic}-{N}.html`
- Test files use subtopic-specific names
- No shared state between sub-agents

### Error Escalation

If sub-agent encounters blocking issue:
1. Document the specific error
2. Note which phase failed
3. Report: `BLOCKED: {subtopic} - {error description}`
4. Do NOT proceed to next phase

---

## Interactive Mode Requirements

Worksheets MUST be designed for interactive mode first. This means:

### ✅ Suitable Question Types
- Fill-in-the-blank with numeric answers
- Fill-in-the-blank with short text (single word)
- Multiple choice (select one)
- Matching (drag-and-drop or selection)
- Counting with numeric input
- True/False questions
- Simple calculations with numeric answers

### ❌ Avoid These (Not Interactive-Friendly)
- Coloring activities
- Cut and paste activities
- Drawing/tracing (unless digital tracing supported)
- Open-ended written responses
- Physical manipulation activities
- Activities requiring scissors/glue

---

## Phase 0: Prompt Analysis & Refinement (Per Subtopic)

**BEFORE generating any worksheets, each subtopic prompt must be analyzed and refined.**

### Step 0a: Read Current Prompt
```
Path: src/lib/prompts/configurations/{year}/{topic}/{subtopic}-COMPRESSED.md
```

### Step 0b: Analyze Parser & Interactive Mode Requirements

**Read the parser code to understand what patterns are detected:**
```
File: src/lib/utils/structuredWorksheetParser.ts
```

**Parser detection order (matters for multi-input questions):**
1. `answer-line` - line-based answers
2. `symbol-box` - for comparison symbols (>, <, =)
3. `order-answer` - for ordering questions
4. `answer-slot` - for open-ended questions
5. `bond-answer` - for number bonds
6. `answer-cell` - for place value tables
7. `answer-box` / `answer-box-small` - general numeric input
8. Underscores (3+) - fallback pattern
9. Fallback textarea - if no patterns found

**Check answer validator for special logic:**
```
File: src/lib/utils/answerValidator.ts
```

### Step 0c: Compare with Successful Reference Prompt

Find a **completed, working prompt** in the same year group:
```
Path: src/lib/prompts/configurations/{year}/{topic}/
```

**Extract successful patterns:**
- Theme variations (how many complete worksheet examples?)
- Named characters (used throughout, not just one question)
- Answer key format (parser-compatible)
- Multi-part question format (a, b, c labeling)
- CSS classes for answer boxes
- Reasoning/misconception testing patterns

### Step 0d: QA Checklist - Identify Issues

Run through this checklist against current prompt:

| Check | Pass/Fail | Issue |
|-------|-----------|-------|
| Theme variations (3 complete examples) | | |
| Named characters throughout | | |
| No "circle/select" patterns | | |
| No `working-space` divs | | |
| Answer key uses a) b) c) format | | |
| All answer boxes have CSS classes | | |
| Multi-part questions properly labeled | | |
| Reasoning question tests misconception | | |
| Number ranges match year group | | |
| CPA progression (Concrete→Pictorial→Abstract) | | |

### Step 0e: Research Best Practices (MANDATORY)

**Use Claude Code WebSearch tool to research before refining any prompt.**

**Search queries to run:**
1. `"{subtopic} Year {N} worksheet UK curriculum {year}"` - Find curriculum-aligned examples
2. `"{concept} KS1/KS2 interactive activities"` - Find interactive-friendly formats
3. `"{concept} common misconceptions primary maths"` - Identify reasoning question targets

**Key sources to search:**
- [NCETM](https://www.ncetm.org.uk/) - National curriculum guidance and teaching points
- [White Rose Maths](https://whiterosemaths.com/) - Scheme of work alignment
- [Classroom Secrets](https://classroomsecrets.co.uk/) - Differentiated worksheet examples
- [Teachers Pay Teachers](https://www.teacherspayteachers.com/) - Creative activity ideas
- [Twinkl](https://www.twinkl.co.uk/) - Visual representation examples
- [The Owl Teacher](https://theowlteacher.com/) - Conceptual teaching approaches

**Research checklist:**
- [ ] Searched for year-group specific examples
- [ ] Identified partitive vs quotitive (or equivalent concept distinction)
- [ ] Found common misconceptions to test in Q5
- [ ] Gathered theme ideas (avoiding items used in previous subtopics)
- [ ] Verified number ranges appropriate for year group
- [ ] Confirmed interactive-friendly question formats

**Theme item rules (avoid repetition):**
- Check what emojis/items were used in other subtopics in same topic
- Each worksheet set should have UNIQUE themed items
- Example: If equal-groups used 🍪🐔✏️, sharing-grouping should use 🎈🌸⚽

**Document findings:**
```
RESEARCH SUMMARY: {subtopic}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sources consulted: [list URLs]
Key concepts: [partitive/quotitive, etc.]
Misconception for Q5: [description]
Theme items (Easy/Avg/Hard): [emojis]
Number ranges: [min-max for year group]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 0f: Create Enhanced Prompt

**Required elements:**

1. **Header with version tag:**
   ```markdown
   # Ages X-Y: {Subtopic} (INTERACTIVE-OPTIMISED V2)
   ```

2. **Critical instruction:**
   ```markdown
   **CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**
   ```

3. **Background colors for visual variety:**
   ```markdown
   BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0
   ```

4. **Year-specific focus section:**
   - Number range for year group
   - Key rules/concepts
   - CPA progression requirements
   - Interactive priority statement
   - Key misconception to test

5. **Question types with format specs:**
   - Q1: Concrete representation
   - Q2: Pictorial representation
   - Q3: Abstract/practice
   - Q4: Real-world context with character
   - Q5: Reasoning challenge with misconception

6. **CSS classes (must include):**
   ```css
   .answer-box{min-width:55px;height:40px;border:3px solid #333;background:#FFF9C4}
   .answer-box-small{min-width:40px;height:32px;border:2px solid #333;background:#FFF9C4}
   .sub-question{margin:8px 0 8px 10px}
   .character-name{font-weight:bold;color:#1976D2}
   .context-story{font-size:14pt;color:#333}
   ```

7. **Theme variations (3 complete examples):**
   - Worksheet 1 (Easy range): Theme A - Characters X, Y
   - Worksheet 2 (Average range): Theme B - Characters Z, W
   - Worksheet 3 (Hard range): Theme C - Characters A, B

8. **Answer key format (parser-compatible):**
   ```html
   <p><strong>1.</strong> a) answer1 &nbsp; b) answer2 (explanation)</p>
   <p><strong>2.</strong> a) answer1 &nbsp; b) answer2</p>
   ```

9. **Validation checklist at end of prompt:**
   - Exactly {{questionCount}} questions
   - Each question type matches spec
   - All answer boxes have answers in key
   - At least one misconception tested
   - Character names used consistently

### Step 0g: Generate Test Worksheet

1. **Generate ONE test worksheet:**
   ```powershell
   node scripts/test-generate-{subtopic}.js
   ```
   Output: `public/preview-worksheet-test.html`

2. **Take screenshot:**
   ```powershell
   node scripts/take-screenshot.js test
   ```
   Output: `public/preview-screenshot-test.png`

3. **Visual verification checklist:**
   - [ ] All 5 question types present
   - [ ] Background colors correct
   - [ ] Answer boxes visible and styled
   - [ ] Character names appear
   - [ ] Visual elements render (blocks, number lines, etc.)
   - [ ] Answer key format correct
   - [ ] No interactive-incompatible elements

### Step 0h: Validate Interactive Compatibility (CRITICAL - DUAL VALIDATION)

**This step catches parser AND renderer issues BEFORE generating 3 production worksheets.**

#### Part A: Answer Extraction Validation

1. **Extract answers from test worksheet:**
   ```powershell
   node scripts/extract-answers.js public/preview-worksheet-test.html
   ```

2. **Review extraction output:**
   ```
   ✅ PASS Indicators:
   - All answer boxes detected
   - Answer key parsed correctly
   - Input count matches answer count
   - Multi-part answers (a, b, c) extracted properly
   - Clean answer values (no extra text)

   ❌ FAIL Indicators:
   - "Answer key not found"
   - Input/answer count mismatch
   - Multi-part answers not split
   - Extra text in answers (e.g., "5 apples" instead of "5")
   - Parser warnings about format
   ```

3. **If extraction FAILS:**
   - Identify the specific issue in prompt
   - Common fixes:
     * Answer key format → Use `<p><strong>1.</strong> a) X &nbsp; b) Y</p>`
     * Missing answers → Add answer for every input box
     * Wrong CSS classes → Use `.answer-box` or `.answer-box-small`
     * Multi-part format → Use a) b) c) with proper spacing
   - Update prompt → Repeat Step 0g → Repeat Step 0h
   - **DO NOT proceed until extraction passes**

#### Part B: Interactive Layout Validation (NEW - CRITICAL)

**Why this matters:** Even if answer extraction passes, the interactive mode renderer may place inputs at the END of questions instead of IN-PLACE where the yellow boxes are. This makes worksheets unusable.

4. **Run automated validation script (RECOMMENDED):**
   ```powershell
   node scripts/validate-interactive-layout.js public/preview-worksheet-test.html "{YearGroup}" {topic} {subtopic}
   ```

   This script automatically:
   - Saves worksheet temporarily to library
   - Takes static preview screenshot
   - Opens interactive mode
   - Analyzes input placement (in-place vs at-end)
   - Takes interactive screenshot
   - Generates validation report
   - Cleans up (deletes temp worksheet)

   **Exit codes:**
   - `0` = PASS (inputs are in-place)
   - `1` = FAIL (inputs at end or other issues)

5. **OR manual verification (if script unavailable):**

   a. Save test worksheet to library (temporary):
   ```powershell
   node scripts/save-worksheet.js public/preview-worksheet-test.html "{YearGroup}" {topic} {subtopic}-test average 5
   ```
   Note the generated slug (e.g., `{topic}-{subtopic}-test`)

   b. Open interactive mode and visually verify:
   ```
   http://localhost:3000/library/{slug}/interactive
   ```

6. **Interactive Layout Checklist:**
   ```
   ┌─────────────────────────────────────────────────────────────────┐
   │ STATIC PREVIEW              vs    INTERACTIVE MODE              │
   ├─────────────────────────────────────────────────────────────────┤
   │                                                                 │
   │ Q1: 5 + [YELLOW BOX] = 8    →    5 + [INPUT BOX] = 8  ✅ GOOD  │
   │                                                                 │
   │ Q1: 5 + [YELLOW BOX] = 8    →    5 + _______ = 8               │
   │                                   Answer: [INPUT]    ❌ BAD    │
   │                                                                 │
   └─────────────────────────────────────────────────────────────────┘

   For EACH question, verify:
   [ ] Input boxes appear IN-PLACE (where yellow boxes were)
   [ ] Input boxes have yellow background (#FFF9C4)
   [ ] Input boxes have same size/style as original answer-box
   [ ] NO inputs appended at bottom of questions
   [ ] Layout structure preserved (equations, grids, etc.)
   ```

7. **Take interactive mode screenshot:**
   - Use browser screenshot or `Win+Shift+S`
   - Save as: `public/preview-screenshot-test-INTERACTIVE.png`
   - Compare side-by-side with static screenshot

8. **If interactive layout FAILS (inputs at end):**

   **Root Cause:** The renderer couldn't find placeholder markers in HTML.

   **Diagnosis:**
   - Open browser console in interactive mode
   - Look for: `❌ No pattern matched for {subId}`
   - Look for: `NO placeholders - trying answer-box fallback`

   **Common Fixes:**
   a) **Prompt CSS issue** - Ensure answer boxes use exact classes:
      ```html
      <span class="answer-box"></span>        <!-- Regular -->
      <span class="answer-box-small"></span>  <!-- Small -->
      ```

   b) **Nested HTML issue** - Don't nest answer-box inside complex structures:
      ```html
      ❌ <div class="complex"><span class="answer-box"></span></div>
      ✅ <span class="answer-box"></span>
      ```

   c) **Self-closing issue** - Use proper closing tags:
      ```html
      ❌ <span class="answer-box" />
      ✅ <span class="answer-box"></span>
      ```

   - Update prompt with fixes
   - Repeat Step 0g (generate test again)
   - Repeat Step 0h (validate again)
   - **DO NOT proceed to Phase 1 until BOTH validations pass**

9. **Delete temporary test worksheet from library:**
   ```sql
   DELETE FROM library_worksheets WHERE slug = '{topic}-{subtopic}-test';
   ```
   Or via Supabase dashboard.

10. **If BOTH validations PASS:**
    - Record: "Answer extraction: ✅ PASS"
    - Record: "Interactive layout: ✅ IN-PLACE"
    - Proceed to Step 0i

#### Summary: Phase 0h Success Criteria

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 0h VALIDATION CHECKLIST                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Part A: Answer Extraction                                       │
│   [ ] All answer boxes detected                                 │
│   [ ] Input count = Answer count                                │
│   [ ] Clean answer values (numbers only, no extra text)         │
│                                                                 │
│ Part B: Interactive Layout                                      │
│   [ ] Inputs appear IN-PLACE (not at question end)              │
│   [ ] Yellow background preserved (#FFF9C4)                     │
│   [ ] Layout structure matches static preview                   │
│   [ ] All 5 questions render correctly                          │
│                                                                 │
│ RESULT: Both ✅ → Proceed to Phase 0i                           │
│         Any ❌ → Fix prompt → Repeat 0g-0h                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 0i: Backup & Deploy Validated Prompt

**Only execute this step after Step 0h validation passes.**

1. **Backup original prompt:**
   ```
   {subtopic}-BACKUP.md
   ```

2. **Deploy enhanced prompt:**
   ```
   {subtopic}-COMPRESSED.md
   ```

3. **Clean up test files:**
   ```powershell
   # Optional: Remove test worksheet (or keep for reference)
   Remove-Item public/preview-worksheet-test.html
   Remove-Item public/preview-screenshot-test.png
   ```

4. **Update this document:**
   - Mark "Prompt Refined" as ✅ in Processing Queue
   - Add session log entry with "Interactive validation: PASS"
   - Record any prompt fixes applied

5. **Move to Phase 1 (Production Generation)**

**KEY BENEFIT:** You now have confidence that all 3 production worksheets will work in interactive mode, avoiding database pollution with failed versions.

---

## Phase 1: Generate & Preview

### Step 1a: Read Prompt (MANDATORY)

Prompt files are located at:
```
M:\ClaudeCodeProjects\worksheetgenerator-ai\src\lib\prompts\configurations\{year}\{topic}\{subtopic}-COMPRESSED.md
```

Year folder mapping:
- Reception → `reception`
- Year 1 → `year1`
- Year 2 → `year2`

Before generating any worksheet, Claude MUST:
1. **Read the corresponding prompt file** for the subtopic
2. **DISPLAY to user which prompt was selected**
3. Follow prompt's structure, question types, and formatting

**Claude MUST display:**
```
📋 PROMPT SELECTED:
   Year Group: {year_group}
   Subtopic: {subtopic}
   Prompt File: {full path}
   
   Reading prompt now...
```

### Step 1b: Theme Selection

**For Sub-Agents (Automated):**
Sub-agents automatically use the 3 theme variations from the prompt:
- Worksheet 1: Theme variation 1 (typically Easy range)
- Worksheet 2: Theme variation 2 (typically Average range)
- Worksheet 3: Theme variation 3 (typically Hard range)

If prompt has only 1 theme example, use "Random Mix" for variety.

**For Interactive Sessions (User Choice):**

After showing the prompt, Claude asks:

```
🎨 THEME SELECTION:

1. **Random Mix** - Random different objects from prompt's list
   Title: "{Subtopic} - Mixed Objects #N"

2. **Themed** - You specify a theme, I'll use matching objects
   Available: Farm Animals, Fruits, Vegetables, Wild Animals, 
   School Supplies, Toys, Sports, Food/Treats, Nature, Shapes
   Title: "{Subtopic} - {Theme} #N"

3. **Custom** - You specify exactly which objects
   Title: "{Subtopic} - {Your Title}"

Reply with: 1, 2 (+ theme name), or 3 (+ object list)
```

### Step 1c: Generate Worksheet (CLAUDE CODE DIRECT - NO GEMINI)

**IMPORTANT: Claude Code (Opus 4.5) generates worksheets DIRECTLY from prompts.**

**WHY:** Gemini 2.5 Flash doesn't reliably follow theme-to-difficulty mappings in prompts. Claude Code with Opus 4.5 provides:
- Better prompt adherence (themes, characters, formatting)
- Consistent theme differentiation across difficulty levels
- More reliable answer key formatting
- No API timeout issues

**HOW:** Claude Code reads the prompt file and generates the complete HTML worksheet directly, bypassing the `/api/generate-worksheet` endpoint (which uses Gemini).

**Workflow:**
1. Read the prompt file (Step 1a)
2. Select theme variation from prompt (based on difficulty: easy/average/hard)
3. Generate complete HTML following prompt's structure exactly
4. Save to `public/preview-worksheet-{subtopic}-{N}.html`
5. Use `/api/library/save` endpoint to save to library (this still works - it just stores the HTML, not generates it)

**Example for 3 worksheets:**
- V1 (easy): Use theme variation 1 from prompt
- V2 (average): Use theme variation 2 from prompt
- V3 (hard): Use theme variation 3 from prompt

Generate following:
1. Prompt's structure and formatting requirements
2. Selected theme variation (match difficulty level)
3. Save to `public/preview-worksheet-{subtopic}-{N}.html`
4. Provide localhost link: `http://localhost:3000/preview-worksheet-{subtopic}-{N}.html`

---

## Phase 2: Screenshot & Batch Approval

Claude creates all 3 worksheets for a subtopic, then opens all 3 screenshots for review.

### Workflow:

**File Naming Convention (for parallel sub-agents):**
- HTML: `preview-worksheet-{subtopic}-1.html`, `-2.html`, `-3.html`
- Screenshots: `preview-screenshot-{subtopic}-1.png`, `-2.png`, `-3.png`

1. Generate all 3 worksheets:
   ```
   public/preview-worksheet-{subtopic}-1.html
   public/preview-worksheet-{subtopic}-2.html
   public/preview-worksheet-{subtopic}-3.html
   ```

2. Take screenshots:
   ```powershell
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js {subtopic}-1
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js {subtopic}-2
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js {subtopic}-3
   ```

3. Open all 3 screenshots for review:
   ```powershell
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-{subtopic}-1.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-{subtopic}-2.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-{subtopic}-3.png"
   ```

4. **Wait for user approval of ALL 3**
5. If changes requested → edit specific worksheet(s) → re-screenshot → repeat
6. Only proceed to Phase 3 when user explicitly approves all 3

---

## Phase 3: Save to Library

After user approves all 3 worksheets:

```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai

# Save each worksheet (using subtopic-specific filenames)
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-1.html "{YearGroup}" {topic} {subtopic} average 5
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-2.html "{YearGroup}" {topic} {subtopic} average 5
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-3.html "{YearGroup}" {topic} {subtopic} average 5
```

**Script usage:**
```
node scripts/save-worksheet.js <file> <year_group> <topic> <subtopic> [difficulty] [question_count]
```

Year group values: `Reception`, `Year 1`, `Year 2`

The script automatically generates:
- SEO metadata (title, description, keywords)
- Thumbnail (uploaded to ImageKit)
- Educational content via Gemini AI
- Unique slug with auto-versioning (e.g., `{topic}-{subtopic}`, `-v2`, `-v3`)

---

## Phase 4: Verify & Spot-Check Interactive Mode

**NOTE: Interactive validation already completed in Phase 0h. This phase is a spot-check to confirm production worksheets work as expected.**

Since the prompt was validated in Phase 0h, all 3 worksheets should achieve 100% score. If any fail, it indicates an issue with theme variations or content generation (not the prompt structure).

### Step 4a: Visual Verification

1. **Library Page:** `http://localhost:3000/library`
   - [ ] All 3 worksheet cards appear
   - [ ] Thumbnails display correctly
   - [ ] Titles and metadata are accurate

2. **Free Printables Page:** `http://localhost:3000/free-printables/{year}/{topic}/{subtopic}`
   - [ ] All 3 worksheets appear in list
   - [ ] Links work correctly

### Step 4b: Run Interactive Mode Tests

**Option A: Test Specific Subtopic (Recommended for Sub-Agents)**
```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai
node scripts/run-interactive-tests.js --subtopic={subtopic}
```

Filter options:
- `--subtopic=rounding-nearest-10` — Filter by subtopic
- `--slug=number-place-value-rounding` — Filter by slug pattern
- `--topic=number-place-value` — Filter by topic
- `--year="Year 2"` — Filter by year group

This generates a subtopic-specific report:
`tests/e2e/interactive/test-report-{subtopic}.html`

**Option B: Run All Library Tests**
```powershell
node scripts/run-interactive-tests.js
```

Tests ALL worksheets, generates: `tests/e2e/interactive/test-report.html`

**Option C: Extract Answers First (for debugging)**

Use the answer extraction script to verify answer key parsing:
```powershell
# From saved worksheet slug
node scripts/extract-answers.js {topic}-{subtopic}

# From HTML file
node scripts/extract-answers.js public/preview-worksheet-{subtopic}-1.html
```

This script:
- Parses answer key from worksheet HTML
- Shows raw answers as parsed
- Outputs test-ready `WORKSHEET_ANSWERS` array
- Generates full test file template

**Option D: Create Dedicated Test File (for complex worksheets)**

Create file: `tests/e2e/interactive/{topic}-{subtopic}-v{N}.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = '{topic}-{subtopic}-v{N}'
// Extract answers from answer key in order they appear
const WORKSHEET_ANSWERS = ["answer1", "answer2", "answer3", ...]
// Optional: Yes/No button answers (if worksheet has Yes/No questions)
const YES_NO_BUTTON = "No" // or "Yes"

// Remove cookie consent overlay
async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if (el.style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Fill all text inputs
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    
    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    // Handle Yes/No button if needed
    if (YES_NO_BUTTON) {
      const yesNoBtn = page.locator(`button:has-text("${YES_NO_BUTTON}")`).first()
      if (await yesNoBtn.count() > 0) {
        await yesNoBtn.click({ force: true })
      }
    }

    await dismissCookieConsent(page)
    
    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    // Verify 100% score
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })
    
    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    expect(scoreText).toBe('100%')
  })
})
```

Run with:
```powershell
npx playwright test tests/e2e/interactive/{topic}-{subtopic}-v{N}.spec.ts
```

### Step 4c: Verify Test Results

**Success Criteria (ALL must pass):**
- [ ] Worksheet 1: 100% score ✅
- [ ] Worksheet 2: 100% score ✅
- [ ] Worksheet 3: 100% score ✅

**If any test fails, check:**

1. **Answer Key Parsing Issues:**
   - Open HTML report: `tests/e2e/interactive/test-report.html`
   - Check "Raw Answer Key" section - are answers parsed correctly?
   - Check "Answers Filled" table - do expected answers match?

2. **Input Count Mismatch:**
   - Report shows: "Expected X answers but found Y inputs"
   - Cause: Answer key format doesn't match input structure
   - Fix: Update prompt's answer key format (use a) b) c) for multi-part)

3. **Wrong Answers:**
   - Report shows which specific answers failed
   - Common issues:
     - Extra text in answer (e.g., "5 apples" instead of "5")
     - Multi-part answers not split correctly
     - Yes/No questions not handled as buttons

4. **Interactive-Incompatible Elements:**
   - "Circle all" patterns → Change to individual input boxes
   - "Working space" divs → Remove completely
   - Selection-based questions → Convert to fill-in-blank

### Step 4c: Verify Test Results (Spot-Check)

**Expected:** All 3 worksheets should pass 100% (prompt was validated in Phase 0h)

**If UNEXPECTED failures occur:**

1. **Analyze the failure type:**
   - Content-specific issue (e.g., wrong numbers in this theme)
   - Theme variation problem (e.g., characters not used consistently)
   - NOT a parser issue (already validated in Phase 0h)

2. **Fix approach:**
   - For content errors: Regenerate affected worksheet(s) with corrected theme
   - For theme issues: Update prompt's theme variation examples
   - Re-save affected worksheet(s) (will auto-version)
   - Re-test

3. **If structural parser issues appear:**
   - This indicates Phase 0h validation was incomplete
   - Return to Phase 0h and re-validate with the failing worksheet
   - Update prompt structure
   - Restart from Phase 1

**Note:** Structural failures at this stage are rare and indicate the need to improve Phase 0h validation process.

### Step 4d: Mark Subtopic Complete

Only mark ✅ when ALL of the following are true:
- [ ] 3 worksheets saved to library
- [ ] All 3 visible in library page
- [ ] All 3 visible in free-printables page
- [ ] All 3 achieve 100% in interactive tests
- [ ] HTML test report shows all PASSED

**Update Processing Queue:**
```markdown
| 12 | Year 2 | rounding-nearest-10 | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
```

**Add Session Log Entry:**
```markdown
| {date} | {year} | {subtopic} | Complete | 3 worksheets saved, all interactive tests pass 100% |
```

---

## Quick Reference: All Steps (Bullet Summary)

### Phase 0: Prompt Analysis & Refinement
- **0a** — Read current prompt file
- **0b** — Analyze parser patterns (structuredWorksheetParser.ts) and validator logic (answerValidator.ts)
- **0c** — Compare with successful reference prompt in same year group
- **0d** — Run 10-point QA checklist (themes, characters, no circle/select, answer key format, etc.)
- **0e** — Research best practices (TPT, White Rose, Classroom Secrets) — *Tier 2/3 only*
- **0f** — Create enhanced prompt with 9 required elements
- **0g** — Generate ONE test worksheet + screenshot verification
- **0h** — **CRITICAL: DUAL VALIDATION**
  - **Part A: Answer Extraction**
    - Extract answers: `node scripts/extract-answers.js public/preview-worksheet-test.html`
    - Verify: inputs = answers, clean format
  - **Part B: Interactive Layout** (NEW)
    - Save temp to library: `node scripts/save-worksheet.js ... {subtopic}-test`
    - Open: `http://localhost:3000/library/{slug}/interactive`
    - Verify: inputs appear IN-PLACE (not at question end)
    - Verify: yellow background (#FFF9C4) preserved
    - Delete temp worksheet after validation
  - If EITHER fails → Fix prompt → Repeat 0g-0h
  - Only proceed when BOTH validations PASS
- **0i** — Backup original, deploy validated prompt, update document

**Phase 0 Result:** Validated prompt that guarantees:
- ✅ Answer extraction works
- ✅ Interactive layout matches static preview (inputs IN-PLACE)

### Phase 1: Generate & Preview
- **1a** — Read prompt file (MANDATORY - display which prompt)
- **1b** — Theme selection (Random Mix / Themed / Custom)
- **1c** — Generate worksheet → save to preview file

### Phase 2: Screenshot & Batch Approval
- Generate all 3 worksheets (different themes)
- Take screenshots for all 3
- Open screenshots for user review
- Get explicit approval for ALL 3
- If changes needed → fix → re-screenshot → repeat

### Phase 3: Save to Library
- Run `save-worksheet.js` for each of 3 worksheets
- Record slugs: `{topic}-{subtopic}`, `{topic}-{subtopic}-v2`, `{topic}-{subtopic}-v3`

### Phase 4: Spot-Check Interactive Mode
- **4a** — Visual verification (library page, free-printables page)
- **4b** — Run interactive tests: `node scripts/run-interactive-tests.js --subtopic={subtopic}`
- **4c** — Verify ALL 3 worksheets achieve 100% score (should pass since Phase 0h validated)
- **4d** — Mark subtopic complete when all 3 pass at 100%

**Note:** Failures at this stage are rare (prompt already validated in Phase 0h)

### Key Commands (Quick Reference)
```powershell
# Generate worksheet
node scripts/test-generate-{subtopic}.js

# Take screenshots
node scripts/take-screenshot.js {subtopic}-1
node scripts/take-screenshot.js {subtopic}-2
node scripts/take-screenshot.js {subtopic}-3

# Phase 0h Part A: Extract answers (answer validation)
node scripts/extract-answers.js public/preview-worksheet-test.html

# Phase 0h Part B: Validate interactive layout (NEW - CRITICAL)
node scripts/validate-interactive-layout.js public/preview-worksheet-test.html "{Year}" {topic} {subtopic}

# Save to library
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-1.html "{Year}" {topic} {subtopic} average 5

# Run interactive tests (subtopic-specific)
node scripts/run-interactive-tests.js --subtopic={subtopic}

# Run all tests
node scripts/run-interactive-tests.js
```

### Success = All 5 Checkmarks
```
✅ Phase 0: Prompt refined + DUAL validation PASSED
   ├─ Part A: Answer extraction ✓
   └─ Part B: Interactive layout IN-PLACE ✓
✅ Phase 1: 3 worksheets generated
✅ Phase 2: All 3 visually approved
✅ Phase 3: All 3 saved to library
✅ Phase 4: All 3 pass interactive spot-check (100%)
```

**Key Improvement:** Phase 0h dual validation ensures:
- Clean database (no failed worksheet versions)
- Interactive mode looks identical to static preview
- E2E tests pass on first attempt (no layout surprises)

---

## Subtopics Checklist

### Prompt File Base Path
```
M:\ClaudeCodeProjects\worksheetgenerator-ai\src\lib\prompts\configurations\
```

Legend:
- ⬜ = Not started
- 🔄 = Prompt refined, worksheets pending
- ✅ = Complete (3 worksheets saved)

---

### Reception (Ages 4-5) — 15 subtopics = 45 worksheets

#### Number and Counting (7 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| counting-to-10 | `reception\number-counting\counting-to-10-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| number-recognition | `reception\number-counting\number-recognition-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| more-or-less | `reception\number-counting\more-or-less-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| early-addition | `reception\number-counting\early-addition-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| early-subtraction | `reception\number-counting\early-subtraction-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| number-bonds | `reception\number-counting\number-bonds-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| subitising | `reception\number-counting\subitising-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |

#### Shape and Space (4 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| basic-shapes | `reception\shape-space\basic-shapes-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| patterns | `reception\shape-space\patterns-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| size-comparison | `reception\shape-space\size-comparison-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| position-direction | `reception\shape-space\position-direction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Measurement (4 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| length-comparison | `reception\measurement\length-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| weight-comparison | `reception\measurement\weight-comparison-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| capacity | `reception\measurement\capacity-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| time-concepts | `reception\measurement\time-concepts-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

---

### Year 1 (Ages 5-6) — 13 subtopics = 39 worksheets

#### Number and Place Value (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| numbers-to-20 | `year1\number-place-value\numbers-to-20-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| counting-forwards-backwards | `year1\number-place-value\counting-forwards-backwards-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| number-bonds-10 | `year1\number-place-value\number-bonds-10-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |

#### Addition and Subtraction (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| adding-to-20 | `year1\addition-subtraction\adding-to-20-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| subtracting-within-20 | `year1\addition-subtraction\subtracting-within-20-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| word-problems-simple | `year1\addition-subtraction\word-problems-simple-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Measurement (4 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| length-height | `year1\measurement\length-height-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| weight-capacity | `year1\measurement\weight-capacity-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| time-days-months | `year1\measurement\time-days-months-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| coins-recognition | `year1\measurement\coins-recognition-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Geometry: Shapes (2 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| 2d-shapes-basic | `year1\geometry-shapes\2d-shapes-basic-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| 3d-shapes-basic | `year1\geometry-shapes\3d-shapes-basic-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Fractions (1 subtopic)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| halves-and-quarters | `year1\fractions\halves-and-quarters-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

---

### Year 2 (Ages 6-7) — 26 subtopics = 78 worksheets

#### Number and Place Value (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| numbers-to-100 | `year2\number-place-value\numbers-to-100-COMPRESSED.md` | ✅ | ✅ | ✅ | 3 |
| comparing-numbers | `year2\number-place-value\comparing-numbers-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| rounding-nearest-10 | `year2\number-place-value\rounding-nearest-10-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |

#### Addition and Subtraction (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| two-digit-numbers | `year2\addition-subtraction\two-digit-numbers-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| mental-strategies | `year2\addition-subtraction\mental-strategies-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| word-problems | `year2\addition-subtraction\word-problems-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Multiplication and Division (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| times-tables-2-5-10 | `year2\multiplication-division\times-tables-2-5-10-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| equal-groups | `year2\multiplication-division\equal-groups-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| sharing-grouping | `year2\multiplication-division\sharing-grouping-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |

#### Fractions (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| recognising-fractions | `year2\fractions\recognising-fractions-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| finding-fractions | `year2\fractions\finding-fractions-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| equivalent-fractions-simple | `year2\fractions\equivalent-fractions-simple-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Measurement (5 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| length-and-height | `year2\measurement\length-and-height-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| mass-and-weight | `year2\measurement\mass-and-weight-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| capacity-and-volume | `year2\measurement\capacity-and-volume-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| money | `year2\measurement\money-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| time | `year2\measurement\time-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Statistics (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| pictograms | `year2\statistics\pictograms-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| tally-charts | `year2\statistics\tally-charts-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| block-diagrams-tables | `year2\statistics\block-diagrams-tables-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Geometry: Properties of Shapes (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| 2d-shapes-properties | `year2\geometry-shapes\2d-shapes-properties-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| 3d-shapes-properties | `year2\geometry-shapes\3d-shapes-properties-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| sorting-shapes | `year2\geometry-shapes\sorting-shapes-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Geometry: Position and Direction (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| position-direction | `year2\geometry-position\position-direction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| movement | `year2\geometry-position\movement-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| turns | `year2\geometry-position\turns-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Progress Summary

| Year Group | Subtopics | Worksheets Target | Completed | Progress |
|------------|-----------|-------------------|-----------|----------|
| Reception | 15 | 45 | 33 | 73% |
| Year 1 | 13 | 39 | 15 | 38% |
| Year 2 | 26 | 78 | 21 | 27% |
| **Total** | **54** | **162** | **69** | **43%** |

---

## Session Log

| Date | Year | Subtopic | Action | Notes |
|------|------|----------|--------|-------|
| 2025-11-29 | Reception | counting-to-10 | Worksheets generated | 3 worksheets, mixed objects theme |
| 2025-11-29 | Reception | number-recognition | Worksheets generated | 3 worksheets |
| 2025-11-29 | - | - | Bug fix | Fixed region filter - library now shows all worksheets |
| 2025-11-29 | Reception | early-addition | Worksheets generated | 3 worksheets (Farm, Garden, Toys themes). Fixed prompt: added + sign to Q4, updated CSS gap to 15px, + sign to 35pt. Removed pig from objects list. |
| 2025-11-29 | Reception | early-subtraction | Worksheets generated | 3 worksheets (Ocean, Food, Adventure themes). Fixed prompt: updated crossed-item CSS to use wrapper div with ✕ mark overlay. Added new images: crab, dolphin, turtle, owl, penguin, rabbit, robot, rocket, truck. |
| 2025-11-30 | Year 1 | adding-to-20 | Worksheets generated | 3 worksheets (Farm, School, Fruit themes) |
| 2025-11-30 | Year 1 | subtracting-within-20 | Worksheets generated | 3 worksheets (Duck/Banana, Cow/Sheep, Book/Orange themes). Year 1 Tier 1 complete. |
| 2025-12-03 | Year 2 | rounding-nearest-10 | Prompt refined | Full QA: analyzed parser patterns, compared with comparing-numbers prompt, identified 8 issues (circle-selection, working-space, missing themes), created V2 with 3 theme variations (Sports/Animal/Space), misconception testing (X5 rounds UP), test generated & visually verified. |
| 2025-12-05 | Year 2 | rounding-nearest-10 | Complete | 3 worksheets saved, all interactive tests pass. Fixed inline input layout issue in StructuredQuestion.tsx. |
| 2025-12-05 | Year 2 | two-digit-numbers | Complete | 3 worksheets saved, all interactive tests pass. |
| 2025-12-05 | Year 2 | times-tables-2-5-10 | Complete | 3 worksheets saved (Food/Animal/Space themes), prompt enhanced with V2 (misconception testing: × vs +), all interactive tests pass 100%. |
| 2025-12-05 | Year 2 | equal-groups | Complete | 3 worksheets saved (Food/Farm/School themes), all interactive tests pass 100%. |
| 2025-12-05 | Year 2 | sharing-grouping | Complete | 3 worksheets saved (Party/Garden/Sports themes), partitive vs quotitive division, Q5a Yes/No text input (not button), all interactive tests pass 100%. Fixed DB field length limits (seo_title max 57 chars). |
| 2025-12-08 | Reception | more-or-less | Fix | v3 worksheet was not saved (404 error). Saved as v4, all 4 interactive tests pass 100%. Fixed duplicate `filters` variable in run-interactive-tests.js. |

---

## Quick Reference

### Year Group Labels (from curriculum.ts)

| Internal Value | International Label |
|----------------|---------------------|
| Reception | Kindergarten / Reception (Ages 4-5) |
| Year 1 | Grade 1 / Year 1 (Ages 5-6) |
| Year 2 | Grade 2 / Year 2 (Ages 6-7) |

### Topic Labels

| Topic ID | Display Label |
|----------|---------------|
| number-counting | Number and Counting |
| number-place-value | Number and Place Value |
| addition-subtraction | Addition and Subtraction |
| multiplication-division | Multiplication and Division |
| fractions | Fractions |
| measurement | Measurement |
| geometry-shapes | Geometry: Shapes |
| geometry-position | Geometry: Position and Direction |
| statistics | Statistics |
| shape-space | Shape and Space |

### Quick Commands

**List available images:**
```powershell
Get-ChildItem "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\images" -Filter "*.png" | Select-Object Name
```

**Check saved worksheets count:**
```sql
SELECT year_group, subtopic, COUNT(*) FROM library_worksheets 
WHERE status = 'published'
GROUP BY year_group, subtopic
ORDER BY year_group, subtopic;
```

**Start dev server:**
```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai
npm run dev
```

---

## Region Configuration

**All worksheets are shown to ALL users regardless of region.**

- Default: `region: 'UK'` (for UK National Curriculum alignment)
- US-specific prompts exist for money topics (e.g., `coins-recognition-US-COMPRESSED.md`)
- Both UK and US versions appear in library
- Optional region filter available if user requests

---

## Metadata Template

```javascript
{
  title: "{Subtopic in Title Case}",
  year_group: "{reception|year1|year2}",
  topic: "{topic-id}",
  subtopic: "{subtopic-id}",
  difficulty: "average",
  question_count: 5,
  layout_type: "standard",
  tags: ["{relevant}", "{tags}"]
}
```

---

## Title Naming Convention

**Worksheet Header Format:**
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">{Subtopic in Title Case}</h1>
  <div class="worksheet-details">{International Year Label} • {Topic in Title Case}</div>
</div>
```

**Example:**
- Title: "Counting To 10"
- Details: "Kindergarten / Reception (Ages 4-5) • Number And Counting"


---

## Subtopic Tiers (Complexity Classification)

**NOTE: Phase 0h validation is MANDATORY for ALL tiers.** Tiers only indicate expected complexity, not workflow shortcuts.

### Tier Definitions

| Tier | Description | Expected Complexity |
|------|-------------|---------------------|
| **Tier 1** | Simple numeric/letter answers, proven patterns exist | Low - likely works first try |
| **Tier 2** | Needs moderate refinement, some patterns to adapt | Medium - may need 1-2 iterations |
| **Tier 3** | Complex visuals, image-heavy, or novel format | High - expect prompt refinement |

### Classification Criteria

**Tier 1 (Fast):**
- Counting with numeric answers
- Simple fill-in-blank numbers
- Multiple choice (circle/select letter)
- Basic matching with clear patterns

**Tier 2 (Medium):**
- Word problems needing answer extraction
- Comparison questions (more/less, bigger/smaller)
- Matching with word answers
- Time/money with specific formats

**Tier 3 (Complex):**
- Measurement with images/scales
- Geometry requiring shape recognition
- Position/direction with spatial elements
- Statistics with charts/graphs
- Fractions with visual representations
- Activities traditionally requiring drawing/coloring

---

### Reception (15 subtopics)

| Subtopic | Tier | Rationale |
|----------|------|-----------|
| counting-to-10 | ✅ Done | - |
| number-recognition | ✅ Done | - |
| more-or-less | **Tier 2** | Comparison pattern, needs "circle the group" → letter answer |
| early-addition | **Tier 1** | Numeric answers, picture counting |
| early-subtraction | **Tier 1** | Numeric answers, picture counting |
| number-bonds | **Tier 1** | Numeric fill-in-blank (pairs to 5/10) |
| subitising | **Tier 1** | Dice/dot patterns → numeric answer |
| basic-shapes | **Tier 2** | Shape naming → word input, may need matching format |
| patterns | **Tier 3** | "What comes next" - may need image selection or complex input |
| size-comparison | **Tier 2** | Similar to more-or-less, comparison template |
| position-direction | **Tier 3** | Spatial concepts, may rely on pointing/circling images |
| length-comparison | **Tier 2** | Comparison template, "which is longer" |
| weight-comparison | **Tier 2** | Comparison template, "which is heavier" |
| capacity | **Tier 2** | Comparison template, "full/empty/half" |
| time-concepts | **Tier 3** | Sequencing, clock reading - complex visual elements |

**Reception Summary:** 2 done, 5 Tier 1, 6 Tier 2, 2 Tier 3

---

### Year 1 (13 subtopics)

| Subtopic | Tier | Rationale |
|----------|------|-----------|
| numbers-to-20 | **Tier 1** | Counting, number writing - numeric answers |
| counting-forwards-backwards | **Tier 1** | Number sequences - numeric fill-in-blank |
| number-bonds-10 | **Tier 1** | Numeric pairs - fill-in-blank |
| adding-to-20 | **Tier 1** | Arithmetic - numeric answers |
| subtracting-within-20 | **Tier 1** | Arithmetic - numeric answers |
| word-problems-simple | **Tier 2** | Need clear answer extraction format |
| length-height | **Tier 2** | Measurement comparison, may need units |
| weight-capacity | **Tier 2** | Measurement comparison |
| time-days-months | **Tier 2** | Sequencing, word answers (days/months) |
| coins-recognition | **Tier 3** | UK/US coin images, value calculations |
| 2d-shapes-basic | **Tier 2** | Shape naming - word or matching format |
| 3d-shapes-basic | **Tier 2** | Shape naming - word or matching format |
| halves-and-quarters | **Tier 3** | Fraction visuals, shading - needs careful design |

**Year 1 Summary:** 5 Tier 1, 5 Tier 2, 3 Tier 3

---

### Year 2 (26 subtopics)

| Subtopic | Tier | Rationale |
|----------|------|-----------|
| numbers-to-100 | **Tier 1** | Number sequences - numeric answers |
| comparing-numbers | **Tier 1** | >, <, = symbols or word answers |
| rounding-nearest-10 | **Tier 1** | Numeric answers |
| two-digit-numbers | **Tier 1** | Arithmetic - numeric answers |
| mental-strategies | **Tier 2** | May need strategy explanation format |
| word-problems | **Tier 2** | Answer extraction format |
| times-tables-2-5-10 | **Tier 1** | Multiplication - numeric answers |
| equal-groups | **Tier 1** | Counting groups - numeric answers |
| sharing-grouping | **Tier 2** | Division concept - may need visual support |
| recognising-fractions | **Tier 3** | Fraction visuals, shaded shapes |
| finding-fractions | **Tier 3** | Fraction of quantity - visual + numeric |
| equivalent-fractions-simple | **Tier 3** | Fraction comparison - complex visuals |
| length-and-height | **Tier 2** | Measurement with units (cm, m) |
| mass-and-weight | **Tier 2** | Measurement with units (g, kg) |
| capacity-and-volume | **Tier 2** | Measurement with units (ml, l) |
| money | **Tier 3** | Coin calculations, UK/US variants |
| time | **Tier 3** | Clock reading, time calculations |
| pictograms | **Tier 3** | Data interpretation from charts |
| tally-charts | **Tier 2** | Counting tallies - numeric answers |
| block-diagrams-tables | **Tier 3** | Data interpretation from diagrams |
| 2d-shapes-properties | **Tier 2** | Sides/corners counting - numeric |
| 3d-shapes-properties | **Tier 2** | Faces/edges/vertices - numeric |
| sorting-shapes | **Tier 3** | Classification - may need drag/select |
| position-direction | **Tier 3** | Spatial movement - complex |
| movement | **Tier 3** | Movement patterns - spatial/directional |
| turns | **Tier 3** | Quarter/half/whole turns - rotational concepts |

**Year 2 Summary:** 6 Tier 1, 9 Tier 2, 11 Tier 3

---

## Overall Summary

| Tier | Count | % of Total | Est. Total Time |
|------|-------|------------|-----------------|
| Done | 2 | 4% | - |
| Tier 1 | 17 | 31% | ~1.5 hours |
| Tier 2 | 19 | 35% | ~5 hours |
| Tier 3 | 16 | 30% | ~8+ hours |
| **Total** | **54** | 100% | ~14.5 hours |

## Recommended Processing Order

**ALL subtopics follow the SAME workflow:** Phase 0 (with 0h validation) → Phase 1 → Phase 2 → Phase 3 → Phase 4

### Phase A: Tier 1 Subtopics (17 total)
Simpler prompts, likely pass validation on first try.

### Phase B: Tier 2 Subtopics (20 total)
Apply proven patterns, may need 1-2 prompt iterations.

### Phase C: Tier 3 Subtopics (14 total)
Complex formats, expect prompt refinement before validation passes.

---


## Processing Queue (Ordered Checklist)

### Phase A: Tier 1 Subtopics (17 subtopics)

| # | Year | Subtopic | Prompt Review | WS 1 | WS 2 | WS 3 | Status |
|---|------|----------|---------------|------|------|------|--------|
| 1 | Reception | early-addition | ✅ | ✅ | ✅ | ✅ | Done |
| 2 | Reception | early-subtraction | ✅ | ✅ | ✅ | ✅ | Done |
| 3 | Reception | number-bonds | ✅ | ✅ | ✅ | ✅ | Done |
| 4 | Reception | subitising | ✅ | ✅ | ✅ | ✅ | Done |
| 5 | Year 1 | numbers-to-20 | ✅ | ✅ | ✅ | ✅ | Done |
| 6 | Year 1 | counting-forwards-backwards | ✅ | ✅ | ✅ | ✅ | Done |
| 7 | Year 1 | number-bonds-10 | ✅ | ✅ | ✅ | ✅ | Done |
| 8 | Year 1 | adding-to-20 | ✅ | ✅ | ✅ | ✅ | Done |
| 9 | Year 1 | subtracting-within-20 | ✅ | ✅ | ✅ | ✅ | Done |
| 10 | Year 2 | numbers-to-100 | ✅ | ✅ | ✅ | 3 | ✅ DONE |
| 11 | Year 2 | comparing-numbers | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 12 | Year 2 | rounding-nearest-10 | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 13 | Year 2 | two-digit-numbers | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 14 | Year 2 | times-tables-2-5-10 | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 15 | Year 2 | equal-groups | ✅ | ✅ | ✅ | ✅ | ✅ DONE |

**Phase A Target:** 51 worksheets (17 × 3)

---

### Phase B: Tier 2 - Template-Based (20 subtopics)

| # | Year | Subtopic | Prompt Review | WS 1 | WS 2 | WS 3 | Status |
|---|------|----------|---------------|------|------|------|--------|
| 16 | Reception | more-or-less | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 17 | Reception | basic-shapes | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 18 | Reception | size-comparison | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 19 | Reception | length-comparison | ⬜ | ⬜ | ⬜ | ⬜ | |
| 20 | Reception | weight-comparison | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 21 | Reception | capacity | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 22 | Year 1 | word-problems-simple | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 23 | Year 1 | length-height | ⬜ | ⬜ | ⬜ | ⬜ | |
| 24 | Year 1 | weight-capacity | ⬜ | ⬜ | ⬜ | ⬜ | |
| 25 | Year 1 | time-days-months | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 26 | Year 1 | 2d-shapes-basic | ⬜ | ⬜ | ⬜ | ⬜ | |
| 27 | Year 1 | 3d-shapes-basic | ⬜ | ⬜ | ⬜ | ⬜ | |
| 28 | Year 2 | mental-strategies | ⬜ | ⬜ | ⬜ | ⬜ | |
| 29 | Year 2 | word-problems | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 30 | Year 2 | sharing-grouping | ✅ | ✅ | ✅ | ✅ | ✅ DONE |
| 31 | Year 2 | length-and-height | ⬜ | ⬜ | ⬜ | ⬜ | |
| 32 | Year 2 | mass-and-weight | ⬜ | ⬜ | ⬜ | ⬜ | |
| 33 | Year 2 | capacity-and-volume | ⬜ | ⬜ | ⬜ | ⬜ | |
| 34 | Year 2 | tally-charts | ⬜ | ⬜ | ⬜ | ⬜ | |
| 35 | Year 2 | 2d-shapes-properties | ⬜ | ⬜ | ⬜ | ⬜ | |
| 36 | Year 2 | 3d-shapes-properties | ⬜ | ⬜ | ⬜ | ⬜ | |

**Phase B Target:** 60 worksheets (20 × 3)

---

### Phase C: Tier 3 - Deep Research (14 subtopics)

| # | Year | Subtopic | Prompt Review | WS 1 | WS 2 | WS 3 | Status |
|---|------|----------|---------------|------|------|------|--------|
| 37 | Reception | patterns | ⬜ | ⬜ | ⬜ | ⬜ | |
| 38 | Reception | position-direction | ⬜ | ⬜ | ⬜ | ⬜ | |
| 39 | Reception | time-concepts | ⬜ | ⬜ | ⬜ | ⬜ | |
| 40 | Year 1 | coins-recognition | ⬜ | ⬜ | ⬜ | ⬜ | |
| 41 | Year 1 | halves-and-quarters | ⬜ | ⬜ | ⬜ | ⬜ | |
| 42 | Year 2 | recognising-fractions | ⬜ | ⬜ | ⬜ | ⬜ | |
| 43 | Year 2 | finding-fractions | ⬜ | ⬜ | ⬜ | ⬜ | |
| 44 | Year 2 | equivalent-fractions-simple | ⬜ | ⬜ | ⬜ | ⬜ | |
| 45 | Year 2 | money | ⬜ | ⬜ | ⬜ | ⬜ | |
| 46 | Year 2 | time | ⬜ | ⬜ | ⬜ | ⬜ | |
| 47 | Year 2 | pictograms | ⬜ | ⬜ | ⬜ | ⬜ | |
| 48 | Year 2 | block-diagrams-tables | ⬜ | ⬜ | ⬜ | ⬜ | |
| 49 | Year 2 | sorting-shapes | ⬜ | ⬜ | ⬜ | ⬜ | |
| 50 | Year 2 | position-direction | ⬜ | ⬜ | ⬜ | ⬜ | |
| 51 | Year 2 | movement | ⬜ | ⬜ | ⬜ | ⬜ | |
| 52 | Year 2 | turns | ⬜ | ⬜ | ⬜ | ⬜ | |

**Phase C Target:** 48 worksheets (16 × 3)

---

## Grand Total

| Phase | Subtopics | Worksheets | Status |
|-------|-----------|------------|--------|
| Done | 27 | 81 | ✅ |
| Phase A (Tier 1) | 0 | 0 | ✅ ALL DONE |
| Phase B (Tier 2) | 11 | 33 | ⬜ |
| Phase C (Tier 3) | 16 | 48 | ⬜ |
| **Total** | **54** | **162** | **81/162 (50%)** |

---

## Technical Learnings: Interactive Mode Renderer

### Critical Fix: Inline Input Layout (December 2024)

**Problem Discovered:** Input boxes in interactive mode were appearing on SEPARATE LINES instead of inline with text. For example:
- **Expected:** `a) 78 is between [___] and [___]` (inputs inline)
- **Actual:** `a) 78 is between` (line 1) `[___]` (line 2) `and` (line 3) `[___]` (line 4)

**Root Cause:** The original renderer in `StructuredQuestion.tsx` split HTML by placeholder markers and used `dangerouslySetInnerHTML` for each fragment. This caused:
1. Browser auto-closes incomplete HTML tags (e.g., `<p>a) 78 is between ` becomes `<p>a) 78 is between </p>`)
2. Each fragment becomes a block element, breaking inline flow
3. React re-renders on every keystroke replaced the DOM, losing input values

**Solution Implemented:** Ref-based approach (see `StructuredQuestion.tsx` lines 2110-2234):

```typescript
// Key approach:
1. Build complete HTML with actual <input> elements (not React components)
2. Use useRef to set innerHTML ONLY ONCE on mount
3. Never re-render the HTML - inputs remain stable in DOM
4. Use event delegation (onInput) to capture input changes
5. Separate useEffect handles submission styling updates
```

**Key Code Pattern:**
```typescript
const htmlContentRef = useRef<HTMLDivElement>(null)
const isInitializedRef = useRef(false)

// Initialize HTML only once
useEffect(() => {
  if (htmlContentRef.current && !isInitializedRef.current) {
    htmlContentRef.current.innerHTML = buildInitialHTML()
    isInitializedRef.current = true
  }
}, []) // Empty deps - run only on mount

// Event delegation captures input changes
const handleContainerInput = (e: React.FormEvent<HTMLDivElement>) => {
  const target = e.target as HTMLInputElement
  if (target.tagName === 'INPUT' && target.dataset.subid) {
    onAnswerChange(target.dataset.subid, target.value)
  }
}

return (
  <div ref={containerRef} onInput={handleContainerInput}>
    <div ref={htmlContentRef} /> {/* HTML set via ref, not dangerouslySetInnerHTML */}
  </div>
)
```

### Input Box Styling Standards

**Uniform sizing for all inline inputs:**
```css
width: 60px;
min-width: 50px;
height: 37px;
padding: 4px;
font-size: 13pt;
font-weight: bold;
text-align: center;
border: 2px solid #333;
border-radius: 5px;
background-color: #FFF9C4;
vertical-align: middle;
margin: 0 2px;
```

**Important:** The renderer ignores parser-specified widths (which vary from 70px to 120px) and uses consistent 60px width for all inputs. This ensures uniform appearance across all worksheets.

### What NOT to Do

❌ **Don't split HTML by placeholders and use dangerouslySetInnerHTML for fragments**
- Browser auto-closes incomplete tags, creating block elements
- React re-renders replace DOM on every keystroke

❌ **Don't use CSS-only fixes (display: inline on p tags)**
- Doesn't address the fundamental split/re-render issue
- Causes text to run together (loses paragraph structure)

❌ **Don't use flexbox on the container**
- Breaks grid layouts in questions like "Round each number..."
- Puts parts (a) and (b) on same line when they should be separate

❌ **Don't use useMemo for HTML string with dangerouslySetInnerHTML**
- Even memoized, React still re-renders the div, replacing DOM

### Testing After Changes

Always run the functional test after any renderer changes:
```powershell
npx playwright test tests/e2e/interactive/rounding-nearest-10-v3.spec.ts
```

Expected result: 100% score with 14 input fields detected.

---

## Database Field Length Restrictions (CRITICAL)

**These limits are enforced by the database schema. Exceeding them causes save failures.**

### Field Limits (from `library_worksheets` table)

| Field | DB Type | Max Length | Safe Max | Notes |
|-------|---------|------------|----------|-------|
| `slug` | VARCHAR(255) | 255 | **55** | Leave room for timestamp suffix on duplicates |
| `title` | VARCHAR(255) | 255 | **150** | Keep titles concise |
| `seo_title` | VARCHAR(60) | 60 | **57** | Leave room for "..." |
| `seo_description` | VARCHAR(160) | 160 | **157** | Leave room for "..." |
| `visual_theme` | VARCHAR(50) | 50 | 50 | Theme name |
| `activity_type` | VARCHAR(100) | 100 | 100 | Activity type |
| `seasonal_theme` | VARCHAR(50) | 50 | 50 | Seasonal theme |

### Slug Generation Rules

The slug is auto-generated from worksheet metadata. Keep these short to avoid truncation:

1. **Title → Base slug:** `"Sharing and Grouping: Party Time!"` → `sharing-and-grouping-party-time`
2. **Visual theme appended:** `→ sharing-and-grouping-party-time-party`
3. **Activity type appended (if fits):** `→ sharing-and-grouping-party-time-party-division`
4. **Truncated at 55 chars**

**To avoid truncation issues:**
- Keep worksheet titles under 40 characters
- Use single-word themes (e.g., "Party" not "Party Time")
- Activity types are optional in slug (skipped if too long)

### Error Prevention

If you see this error during Phase 3:
```
value too long for type character varying(60)
```

**Likely causes:**
1. SEO title too long (max 60 chars)
2. SEO description too long (max 160 chars)
3. Slug too long (max 255, but keep under 55 for auto-versioning)

**Auto-truncation is now handled in `/api/library/save/route.ts`** - but keeping titles short is still best practice.

### Worksheet Title Guidelines

**Good examples (under 40 chars):**
- `Sharing and Grouping: Party Time!` ✅
- `Equal Groups: Farm Animals` ✅
- `Rounding to 10: Sports Day` ✅

**Bad examples (too long):**
- `Understanding Sharing and Grouping with Division Problems: Party Time Fun!` ❌
- `Learning Equal Groups Through Multiplication and Division Practice` ❌

---
