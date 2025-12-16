# Populate Worksheet From Scratch

## Overview

This document creates a **fully autonomous system** for generating high-quality, research-backed worksheets with **MIXED LAYOUT** design. Unlike the standard layout (uniform question format), mixed layout uses **varied question formats** across three pedagogically-proven sections.

**Goal:** Generate worksheets that are:
- Loved by teachers (curriculum-aligned, varied practice, reasoning opportunities)
- Loved by kids (engaging visuals, achievable challenges, themed characters)
- 100% functional in interactive mode (tested, validated, celebration-worthy)

---

## Layout Types

### Standard Layout (Existing)
- 5 questions with similar visual structure
- CPA progression within questions
- Single question format throughout

### Mixed Layout (NEW - This Document)
- 5 questions with **THREE distinct sections**
- **Varied question formats** within one worksheet
- Research-backed structure: Fluency → Application → Reasoning

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MIXED LAYOUT STRUCTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─── SECTION A: FLUENCY (Q1-Q2) ────────────────────────────────────┐  │
│  │  Quick practice, build confidence, drill core skills              │  │
│  │  • Q1: Visual/concrete practice                                   │  │
│  │  • Q2: Grid/table with multiple items (efficient practice)        │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─── SECTION B: APPLICATION (Q3-Q4) ────────────────────────────────┐  │
│  │  Real-world context, transfer learning                            │  │
│  │  • Q3: Picture-based problem with context                         │  │
│  │  • Q4: Word problem with themed character                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─── SECTION C: REASONING (Q5) ─────────────────────────────────────┐  │
│  │  Higher-order thinking, explain/justify                           │  │
│  │  • Q5: "Spot the error" / "Always, Sometimes, Never" /            │  │
│  │        "Which doesn't belong?" / "True or False - Explain"        │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Research Foundation

### Sources Consulted

| Source | Key Insight | Application |
|--------|-------------|-------------|
| [Third Space Learning](https://thirdspacelearning.com/blog/fluency-reasoning-problem-solving/) | Fluency → Reasoning → Problem Solving is curriculum-mandated | Three-section structure |
| [Maths No Problem CPA](https://mathsnoproblem.com/en/approach/concrete-pictorial-abstract) | CPA is cyclical, not linear | Mix concrete/abstract in same worksheet |
| [White Rose Maths](https://masterthecurriculum.co.uk/blog/white-rose-maths-small-steps-progression/) | Small steps + varied fluency | Multiple question types per skill |
| [Classroom Secrets](https://classroomsecrets.co.uk/resource-guide/resources/maths/varied-fluency-and-reasoning-and-problem-solving) | Varied Fluency + Reasoning + Problem Solving worksheets | Separate sections |
| [Cognitive Load Theory](https://orrbitt.com/news/white-space-cognitive-load-designing-easier-processing/) | White space reduces overload | Clean section breaks, visual breathing room |
| [Bloom's Taxonomy](https://nrich.maths.org/5826) | Lower → Higher order progression | Q1-2 (Remember/Apply) → Q3-4 (Apply) → Q5 (Analyze/Evaluate) |
| [NCETM Curriculum Maps](https://www.ncetm.org.uk/classroom-resources/cp-year-1-curriculum-map/) | Ready-to-progress criteria | Align questions to statutory requirements |

### Age-Appropriate Design Matrix

| Age Group | Visual Density | Text Complexity | Fluency Style | Reasoning Style |
|-----------|---------------|-----------------|---------------|-----------------|
| **Reception (4-5)** | Very high (80% visual) | Minimal (1-2 words) | Count objects, match | "Which has more?" |
| **Year 1 (5-6)** | High (60% visual) | Simple sentences | Number sentences, 2×3 grids | "True or False?" |
| **Year 2 (6-7)** | Medium (40% visual) | Full sentences | Calculation grids, tables | "Always/Sometimes/Never" |
| **Year 3+ (7+)** | Lower (20% visual) | Paragraph problems | Abstract equations | "Explain why..." |

---

## Autonomous Workflow

### Trigger
User specifies: `"Create mixed layout for [Year Group] [Topic] [Subtopic]"`

### System Response
Claude Code autonomously:
1. Researches the topic (web search, curriculum docs)
2. Designs age-appropriate mixed layout
3. Creates prompt from scratch
4. Generates and validates test worksheet
5. Produces 3 themed worksheets
6. Saves to library with interactive tests

---

## Phase 0: Topic Research (Autonomous)

**Duration:** 10-15 minutes per subtopic

### Step 0a: Curriculum Requirements Search

```
SEARCH QUERIES:
1. "{subtopic} {Year Group} National Curriculum UK objectives"
2. "{subtopic} KS1/KS2 learning outcomes statutory"
3. "{subtopic} White Rose Maths small steps"
```

**Extract:**
- Statutory requirements for this year group
- Key vocabulary children must use
- Prerequisite knowledge assumed
- What comes next (progression)

### Step 0b: Competitor Analysis

```
SEARCH QUERIES:
1. "{subtopic} worksheet {Year Group} site:twinkl.co.uk"
2. "{subtopic} worksheet {Year Group} site:teacherspayteachers.com"
3. "{subtopic} worksheet {Year Group} site:classroomsecrets.co.uk"
```

**Extract:**
- Most popular question formats
- Visual styles that work
- Common themes used
- Price points (indicates value/quality)

### Step 0c: Common Misconceptions

```
SEARCH QUERIES:
1. "{subtopic} common misconceptions primary maths"
2. "{subtopic} mistakes children make {Year Group}"
3. "{subtopic} NCETM teaching points"
```

**Extract:**
- Top 3 misconceptions to address
- Why children make these errors
- How to test for understanding (becomes Q5)

### Step 0d: Age-Appropriate Formats

```
SEARCH QUERIES:
1. "{subtopic} interactive worksheet {Year Group}"
2. "{subtopic} fill in the blank activities ages {age range}"
3. "{subtopic} hands-on activities primary"
```

**Extract:**
- Question formats that work for this age
- Visual representations commonly used
- Interactive-friendly patterns

### Step 0e: Document Research Summary

```markdown
## RESEARCH SUMMARY: {Subtopic}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Curriculum Requirements
- Objective 1: [statutory requirement]
- Objective 2: [statutory requirement]
- Key vocabulary: [word1, word2, word3]

### Competitor Insights
- Best-selling format: [description]
- Most engaging visual: [description]
- Popular themes: [theme1, theme2, theme3]

### Misconceptions to Test
1. [Misconception]: Children think... because...
2. [Misconception]: Children think... because...
3. [Misconception]: Children think... because...

### Question Format Recommendations
- Fluency (Q1-Q2): [format description]
- Application (Q3-Q4): [format description]
- Reasoning (Q5): [format description]

### Sources
- [URL1]
- [URL2]
- [URL3]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Phase 1: Layout Design

### Step 1a: Select Layout Pattern

Based on year group and topic, select the appropriate mixed layout variant:

#### Reception Mixed Layout
```
┌────────────────────────────────────────────────┐
│ Q1: VISUAL COUNTING                            │
│     [Large emoji grid] → Count and write       │
│     80% visual, 20% text                       │
├────────────────────────────────────────────────┤
│ Q2: MATCH/CONNECT                              │
│     [Left items] ─── [Right items]             │
│     Draw lines or write matching numbers       │
├────────────────────────────────────────────────┤
│ Q3: PICTURE SCENE                              │
│     [Scene with objects] + simple question     │
│     "How many ___ are in the picture?"         │
├────────────────────────────────────────────────┤
│ Q4: STORY WITH IMAGES                          │
│     [Character] + [Objects] + [Question]       │
│     "Ben has 3 ___. He gets 2 more. Total?"    │
├────────────────────────────────────────────────┤
│ Q5: COMPARE/CHOOSE                             │
│     [Option A] vs [Option B]                   │
│     "Which has more?" / "Circle the bigger"    │
└────────────────────────────────────────────────┘
```

#### Year 1 Mixed Layout
```
┌────────────────────────────────────────────────┐
│ SECTION A: FLUENCY                             │
├────────────────────────────────────────────────┤
│ Q1: VISUAL + NUMBER SENTENCE                   │
│     [Images] → [Number sentence with blank]    │
│     60% visual, 40% text                       │
├────────────────────────────────────────────────┤
│ Q2: PRACTICE GRID (2×3 or 3×2)                 │
│     ┌─────┬─────┬─────┐                        │
│     │ a)  │ b)  │ c)  │                        │
│     ├─────┼─────┼─────┤                        │
│     │ d)  │ e)  │ f)  │                        │
│     └─────┴─────┴─────┘                        │
├────────────────────────────────────────────────┤
│ SECTION B: APPLICATION                         │
├────────────────────────────────────────────────┤
│ Q3: PICTURE PROBLEM                            │
│     [Themed visual] + [Context sentence]       │
│     [Number sentence] + [Answer box]           │
├────────────────────────────────────────────────┤
│ Q4: WORD PROBLEM                               │
│     [Character name] + [Story context]         │
│     [Question] + [Answer with units]           │
├────────────────────────────────────────────────┤
│ SECTION C: REASONING                           │
├────────────────────────────────────────────────┤
│ Q5: TRUE OR FALSE / SPOT THE ERROR             │
│     [Character speech bubble with claim]       │
│     a) Is [name] correct? [Yes/No]             │
│     b) The correct answer is: [___]            │
└────────────────────────────────────────────────┘
```

#### Year 2 Mixed Layout
```
┌────────────────────────────────────────────────┐
│ SECTION A: FLUENCY                             │
├────────────────────────────────────────────────┤
│ Q1: QUICK-FIRE CALCULATIONS                    │
│     Single visual + equation OR                │
│     Bar model + equation                       │
├────────────────────────────────────────────────┤
│ Q2: CALCULATION GRID (2×3 or 3×2)              │
│     Abstract equations, minimal visual         │
│     More complex than Year 1                   │
├────────────────────────────────────────────────┤
│ SECTION B: APPLICATION                         │
├────────────────────────────────────────────────┤
│ Q3: MULTI-STEP VISUAL                          │
│     [Context image] + [2-part question]        │
│     a) First step                              │
│     b) Second step                             │
├────────────────────────────────────────────────┤
│ Q4: WORD PROBLEM (More complex)                │
│     [Character] + [Multi-sentence story]       │
│     Requires choosing operation                │
├────────────────────────────────────────────────┤
│ SECTION C: REASONING                           │
├────────────────────────────────────────────────┤
│ Q5: ALWAYS/SOMETIMES/NEVER                     │
│     OR "Explain why [statement] is wrong"      │
│     OR "Which doesn't belong? Why?"            │
│     a) Answer selection                        │
│     b) Explain reasoning (short text)          │
└────────────────────────────────────────────────┘
```

### Step 1b: Define Section Headers

Each mixed layout worksheet includes visible section headers:

```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>
```

### Step 1c: CSS Template for Mixed Layout

```css
/* MIXED LAYOUT BASE CSS */
body {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 15pt;
  padding: 15px;
  line-height: 1.4;
}

/* WORKSHEET HEADER */
.worksheet-header {
  text-align: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 3px solid #4169E1;
}
.worksheet-title {
  font-size: 22pt;
  color: #2c3e50;
  margin: 0;
}
.worksheet-details {
  font-size: 11pt;
  color: #666;
  margin-top: 5px;
}
.layout-badge {
  display: inline-block;
  background: #9C27B0;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 9pt;
  margin-left: 10px;
}

/* SECTION HEADERS */
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0 10px 0;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
}
.section-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: white;
  font-size: 14pt;
}
.section-title {
  font-size: 14pt;
}
.section-fluency {
  background: #E3F2FD;
  border-left: 4px solid #2196F3;
}
.section-fluency .section-letter {
  background: #2196F3;
}
.section-application {
  background: #F3E5F5;
  border-left: 4px solid #9C27B0;
}
.section-application .section-letter {
  background: #9C27B0;
}
.section-reasoning {
  background: #FFF3E0;
  border-left: 4px solid #FF9800;
}
.section-reasoning .section-letter {
  background: #FF9800;
}

/* QUESTION BASE */
.question {
  margin: 10px 0;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #ddd;
}
.question-number {
  display: inline-block;
  background: #4169E1;
  color: white;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  margin-right: 8px;
  font-weight: bold;
  font-size: 13pt;
}
.question-text {
  font-size: 15pt;
  margin: 5px 0;
  font-weight: 600;
}
.sub-question {
  font-size: 14pt;
  margin: 8px 0 8px 10px;
  font-weight: normal;
}

/* FLUENCY GRID */
.fluency-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 15px 0;
}
.fluency-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #FFF;
  font-size: 16pt;
}
.fluency-label {
  font-size: 12pt;
  color: #666;
  margin-bottom: 5px;
}

/* VISUAL CONTAINERS */
.visual-box {
  margin: 15px auto;
  padding: 15px;
  background: #FAFAFA;
  border-radius: 10px;
  text-align: center;
  max-width: 450px;
}
.visual-box img {
  width: 40px;
  height: 40px;
  margin: 3px;
}

/* WORD PROBLEM BOX */
.word-problem-box {
  background: #FFF3E0;
  border: 2px solid #FF9800;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
}
.character-name {
  font-weight: bold;
  color: #1976D2;
}
.story-text {
  font-size: 14pt;
  color: #333;
  line-height: 1.5;
}

/* REASONING BOX */
.reasoning-box {
  background: #E8F5E9;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
}
.speech-bubble {
  background: white;
  border: 2px solid #66BB6A;
  border-radius: 12px;
  padding: 12px;
  margin: 10px 0;
  position: relative;
}
.character-icon {
  font-size: 32pt;
  margin-right: 10px;
}

/* ANSWER ELEMENTS */
.answer-box {
  display: inline-block;
  min-width: 55px;
  height: 40px;
  border: 3px solid #333;
  border-radius: 8px;
  background: #FFF9C4;
  vertical-align: middle;
  margin: 0 5px;
}
.answer-box-small {
  display: inline-block;
  min-width: 40px;
  height: 32px;
  border: 3px solid #333;
  border-radius: 6px;
  background: #FFF9C4;
  vertical-align: middle;
  margin: 0 3px;
}

/* ANSWER KEY */
.answer-key {
  margin-top: 30px;
  padding: 15px;
  background: #f0f8ff;
  border: 2px solid #4169E1;
  border-radius: 10px;
  page-break-before: always;
}
.answer-key h2 {
  font-size: 14pt;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 10px 0;
  text-align: center;
}
.answer-key p {
  font-size: 12pt;
  margin: 5px 0;
  line-height: 1.6;
}
```

---

## Phase 2: Prompt Creation

### Step 2a: Prompt Header Template

```markdown
# Ages {age-range}: {Subtopic Title} (MIXED LAYOUT V1)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

**LAYOUT TYPE:** Mixed (Fluency → Application → Reasoning)

## YEAR {N} FOCUS
- **Curriculum objective:** [from Phase 0 research]
- **Key vocabulary:** [word1, word2, word3]
- **Number range:** [e.g., within 20, to 100]
- **Visual requirements:** [e.g., shapes must be clearly different sizes]
- **Interactive Priority:** All answers must be typed (numbers or short words)
- **Key Misconception:** [from Phase 0 research - tested in Q5]

## SECTION STRUCTURE
- **Section A (Fluency):** Q1 + Q2 - Quick practice, build confidence
- **Section B (Application):** Q3 + Q4 - Real-world context
- **Section C (Reasoning):** Q5 - Higher-order thinking

BGs: Q1=#E3F2FD Q2=#E3F2FD Q3=#F3E5F5 Q4=#F3E5F5 Q5=#FFF3E0
```

### Step 2b: Question Templates

Define 5 different question formats based on research:

```markdown
## QUESTION TEMPLATES

### Q1: Fluency - Visual Practice
[Specific format for this subtopic based on research]
- Visual element: [description]
- Answer type: [number / word / symbol]
- Sub-questions: [none / a,b if split]

### Q2: Fluency - Practice Grid
[Grid layout with 6 items]
- Grid layout: 2×3 or 3×2
- Difficulty progression: a→f gets slightly harder
- Answer type: [same as Q1]

### Q3: Application - Picture Problem
[Visual context + question]
- Image/scene: [description]
- Context sentence: [pattern]
- Answer: [with units if applicable]

### Q4: Application - Word Problem
[Character + story + question]
- Character: [from theme]
- Story pattern: [description]
- Question: [what to find]

### Q5: Reasoning - [Type]
[Spot the error / True-False / Which doesn't belong]
- Setup: [how misconception is presented]
- Part a: [Yes/No or selection]
- Part b: [correct answer or explanation]
```

### Step 2c: Theme Variations

```markdown
## THEME VARIATIONS (3 Worksheets)

### Theme 1: [Name] (Easy difficulty)
- Characters: [Name1, Name2]
- Objects: [emoji1, emoji2, emoji3]
- Setting: [context]
- Number range: [lower end]

### Theme 2: [Name] (Average difficulty)
- Characters: [Name1, Name2]
- Objects: [emoji1, emoji2, emoji3]
- Setting: [context]
- Number range: [middle]

### Theme 3: [Name] (Challenge difficulty)
- Characters: [Name1, Name2]
- Objects: [emoji1, emoji2, emoji3]
- Setting: [context]
- Number range: [higher end]
```

### Step 2d: Answer Key Format

```markdown
## ANSWER KEY FORMAT (Parser-Compatible)

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> [answer] (explanation)</p>
  <p><strong>2.</strong> a) [ans] b) [ans] c) [ans] d) [ans] e) [ans] f) [ans]</p>
  <p><strong>3.</strong> [answer] (explanation)</p>
  <p><strong>4.</strong> [answer] [units] (calculation shown)</p>
  <p><strong>5.</strong> a) [Yes/No] b) [correct answer] (explanation of misconception)</p>
</div>
```

**RULES:**
- Every answer box needs corresponding answer
- Multi-part questions use a) b) c) format
- Grid answers (Q2) labeled a-f
- Include brief explanation in parentheses
- Q5 reasoning explanation addresses the misconception
```

### Step 2e: Validation Checklist

```markdown
## VALIDATION CHECKLIST

Before generating, verify:
- [ ] EXACTLY {{questionCount}} questions (5)?
- [ ] Section A has 2 questions (Q1, Q2)?
- [ ] Section B has 2 questions (Q3, Q4)?
- [ ] Section C has 1 question (Q5)?
- [ ] Q2 has 6 sub-items in grid format?
- [ ] Q5 tests the key misconception?
- [ ] All answer boxes use `.answer-box` or `.answer-box-small`?
- [ ] Answer key uses a) b) format for multi-part?
- [ ] Character names used consistently?
- [ ] Layout badge shows "Mixed Layout"?
- [ ] Section headers included?

Total answer boxes expected: 1 + 6 + 1 + 1 + 2 = 11 (typical)
```

---

## Phase 3: Test Generation & Validation

### Step 3a: Generate Test Worksheet

Claude Code generates ONE test worksheet following the prompt:

```powershell
# Save test HTML
# Output: public/preview-worksheet-{subtopic}-mixed-test.html
```

### Step 3b: Screenshot and Visual Review

```powershell
node scripts/take-screenshot.js {subtopic}-mixed-test
Start-Process "public/preview-screenshot-{subtopic}-mixed-test.png"
```

**Visual Checklist:**
- [ ] Section headers visible (A: Fluency, B: Application, C: Reasoning)?
- [ ] Layout badge shows "Mixed Layout"?
- [ ] Q2 grid displays correctly (2×3 or 3×2)?
- [ ] All 5 question backgrounds correct?
- [ ] Answer boxes visible and styled?
- [ ] Reasoning box (Q5) has speech bubble?
- [ ] Overall layout balanced and not cramped?

### Step 3c: Interactive Mode Validation

**Part A: Answer Extraction**
```powershell
node scripts/extract-answers.js public/preview-worksheet-{subtopic}-mixed-test.html
```

Verify:
- [ ] All answer boxes detected
- [ ] Answer count matches expected (typically 11)
- [ ] Multi-part answers split correctly

**Part B: Interactive Layout Check**

1. Save temporarily to library
2. Open interactive mode: `http://localhost:3000/library/{slug}/interactive`
3. Verify inputs appear IN-PLACE (not at question end)
4. Delete temporary worksheet

### Step 3d: Fix Issues

If validation fails:
1. Identify specific issue (CSS, HTML structure, answer format)
2. Update prompt
3. Regenerate test
4. Repeat 3a-3c until PASS

---

## Phase 4: Production (1 Unique Worksheet)

> **IMPORTANT:** Claude Code generates the worksheet HTML directly (see Learning 8). Do NOT use Gemini API.

### Step 4a: Generate Production Worksheet

**Claude Code creates the HTML directly:**
1. Read the prompt template from `src/lib/prompts/configurations/`
2. Generate worksheet HTML with DIFFERENT questions from test worksheet (see Learning 10)
3. Save to: `public/preview-worksheet-{subtopic}-mixed-prod.html`

**Key requirements:**
- ALL 5 questions must differ from test worksheet
- Same learning objectives, different formats
- Use varied visuals, numbers, scenarios

### Step 4b: Visual Review

```powershell
# Open in browser to review
Start-Process "http://localhost:3000" -ArgumentList "public/preview-worksheet-{subtopic}-mixed-prod.html"
```

Verify:
- [ ] All 5 questions are DIFFERENT from test worksheet
- [ ] Layout is clean and age-appropriate
- [ ] Answer key format is correct (comma-separated)

### Step 4c: Save to Library

```powershell
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-mixed-prod.html "{YearGroup}" {topic} {subtopic} average 5
```

Record generated slug.

### Step 4d: Interactive Test

Create Playwright test and verify **100% score**.

---

## Subtopic Status Tracking

### Legend
- ⬜ = Not started (no worksheets)
- 🔷 = Standard layout only (existing)
- 🟣 = Mixed layout complete (2 worksheets: 1 test + 1 prod)
- ✅ = Both layouts complete

---

## Reception (Ages 4-5) — 15 subtopics

### Number and Counting (7 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| counting-to-10 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| number-recognition | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| more-or-less | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| early-addition | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| early-subtraction | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| number-bonds | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| subitising | ✅ 3 | ⬜ 0 | 3 | 🔷 |

### Shape and Space (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| basic-shapes | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| patterns | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| size-comparison | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| position-direction | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Measurement (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| length-comparison | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| weight-comparison | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| capacity | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| time-concepts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Reception Total:** 33 Standard + 0 Mixed = 33 worksheets

---

## Year 1 (Ages 5-6) — 13 subtopics

### Number and Place Value (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| numbers-to-20 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| counting-forwards-backwards | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| number-bonds-10 | ✅ 3 | 🟣 3 | 6 | 🟣 **COMPLETE** |

### Addition and Subtraction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| adding-to-20 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| subtracting-within-20 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| word-problems-simple | ✅ 3 | ⬜ 0 | 3 | 🔷 |

### Measurement (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| length-height | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| weight-capacity | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time-days-months | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| coins-recognition | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Shapes (2 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| 2d-shapes-basic | ⬜ 0 | 🟣 3 | 3 | 🟣 **COMPLETE** |
| 3d-shapes-basic | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Fractions (1 subtopic)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| halves-and-quarters | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Year 1 Total:** 21 Standard + 6 Mixed = 27 worksheets

---

## Year 2 (Ages 6-7) — 26 subtopics

### Number and Place Value (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| numbers-to-100 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| comparing-numbers | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| rounding-nearest-10 | ✅ 3 | ⬜ 0 | 3 | 🔷 |

### Addition and Subtraction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| two-digit-numbers | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| mental-strategies | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| word-problems | ✅ 3 | ⬜ 0 | 3 | 🔷 |

### Multiplication and Division (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| times-tables-2-5-10 | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| equal-groups | ✅ 3 | ⬜ 0 | 3 | 🔷 |
| sharing-grouping | ✅ 3 | ⬜ 0 | 3 | 🔷 |

### Fractions (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| recognising-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| finding-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| equivalent-fractions-simple | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Measurement (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| length-and-height | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mass-and-weight | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| capacity-and-volume | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| money | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Statistics (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| pictograms | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| tally-charts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| block-diagrams-tables | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Properties of Shapes (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| 2d-shapes-properties | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 3d-shapes-properties | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| sorting-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Position and Direction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| position-direction | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| movement | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| turns | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Year 2 Total:** 24 Standard + 0 Mixed = 24 worksheets

---

## Progress Summary

| Year Group | Subtopics | Standard WS | Mixed WS | Total | Target (3 mixed each) |
|------------|-----------|-------------|----------|-------|----------------------|
| Reception | 15 | 33 | 0 | 33 | 45 |
| Year 1 | 13 | 21 | 3 | 24 | 39 |
| Year 2 | 26 | 24 | 0 | 24 | 78 |
| **Total** | **54** | **78** | **3** | **81** | **162** |

**Overall Progress:** 78 Standard + 3 Mixed = 81 worksheets

---

## Pilot: Year 1 - 2D Shapes Basic

### Why This Topic?

1. **Moderate complexity (Tier 2)** - Good for validating the system
2. **Natural variety** - Shapes support diverse question formats:
   - Fluency: Identify shapes, count sides/corners
   - Application: Find shapes in real objects
   - Reasoning: "Which shape doesn't belong?"
3. **Clear answers** - Shape names and counts are unambiguous
4. **Visual-heavy** - Tests mixed layout visual design

### Research Required

```
SEARCH QUERIES:
1. "2D shapes Year 1 National Curriculum objectives UK"
2. "2D shapes worksheet Year 1 site:twinkl.co.uk"
3. "2D shapes common misconceptions KS1"
4. "identify shapes corners sides Year 1 activities"
```

### Expected Question Types

| Question | Section | Format | Answer Type |
|----------|---------|--------|-------------|
| Q1 | Fluency | Match shape to name | Word (shape name) |
| Q2 | Fluency | Count sides/corners grid | Numbers (6 items) |
| Q3 | Application | Find shapes in picture | Numbers/Words |
| Q4 | Application | Word problem with shapes | Number |
| Q5 | Reasoning | "Which doesn't belong?" | Letter + explanation |

### Theme Ideas

1. **Playground** - Shapes in playground equipment
2. **Kitchen** - Shapes in food/plates/utensils
3. **Nature** - Shapes in leaves/flowers/animals

---

## Session Log

| Date | Year | Subtopic | Layout | Action | Notes |
|------|------|----------|--------|--------|-------|
| 2025-12-15 | Y1 | 2d-shapes-basic | Mixed | Phase 0-3 Complete | Test worksheet validated at 100%. Key bug: answer key format (now documented) |
| 2025-12-15 | Y1 | 2d-shapes-basic | Mixed | Phase 4 (v1) | 3 themed worksheets - REJECTED: repetitive questions, 5 worksheets instead of 2 |
| 2025-12-15 | Y1 | 2d-shapes-basic | Mixed | Phase 4 (v2) | 2 unique worksheets - REJECTED: need 3 worksheets, layout too spacey (block-within-block) |
| 2025-12-15 | Y1 | 2d-shapes-basic | Mixed | Phase 4 (v3) | 3 compact worksheets - REJECTED: too congested, boxes too narrow, thumbnail not full width |
| 2025-12-15 | Y1 | 2d-shapes-basic | Mixed | **FINAL SUCCESS** | 3 balanced worksheets, wider input boxes, full-width thumbnails, all 100%. Added Learning 12. |
| 2025-12-15 | Y2 | times-tables-2-5-10 | Mixed | Phase 0-4 Complete | 3 worksheets (Foundation, Skip Counting, Challenge), all 100%. Added Learnings 13-14. |
| 2025-12-15 | Y1+Y2 | All | Mixed | SEO Optimization | Re-saved all 6 worksheets with optimized SEO metadata (titles, descriptions, keywords, tags). |
| 2025-12-15 | Y1 | number-bonds-10 | Mixed | Phase 0-4 Complete | 3 worksheets (Foundation, Match/Complete, Challenge), all 100%. Fixed True/False validation bug. Added Learning 15. |

---

## Quick Reference

### Commands

```powershell
# Generate test worksheet
# (Claude Code generates HTML directly)

# Take screenshot
node scripts/take-screenshot.js {subtopic}-mixed-{N}

# Extract answers
node scripts/extract-answers.js public/preview-worksheet-{subtopic}-mixed-test.html

# Save to library
node scripts/save-worksheet.js public/preview-worksheet-{subtopic}-mixed-1.html "{Year}" {topic} {subtopic} average 5

# Run interactive tests
node scripts/run-interactive-tests.js --subtopic={subtopic}
```

### Layout Badge HTML

```html
<span class="layout-badge">Mixed Layout</span>
```

### Section Headers HTML

```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

---

## Success Criteria

A subtopic is **COMPLETE** when:

```
✅ Phase 0: Research documented
✅ Phase 1: Layout designed for year group
✅ Phase 2: Prompt created from scratch
✅ Phase 3: Test worksheet validated (extraction + interactive)
✅ Phase 4a: 3 themed worksheets generated
✅ Phase 4b: All 3 visually approved
✅ Phase 4c: All 3 saved to library
✅ Phase 4d: All 3 pass interactive tests (100%)
```

**Worksheet Quality Indicators:**
- Teachers would want to download/print it
- Children would enjoy completing it
- Answers are unambiguous
- Interactive mode works flawlessly
- Visual design is clean and age-appropriate

---

## Key Learnings (From Pilot)

> **CRITICAL**: These learnings were discovered during the Year 1 2D Shapes Basic pilot. Apply them to ALL future worksheets to avoid repeating issues.

### Learning 1: Answer Key Format is CRITICAL

**Problem:** Parser failed to extract individual answers from "a) circle  b) triangle  c) square  d) rectangle"

**Root Cause:** The parser's regex for b), c), d) only matches numbers/Yes/No, NOT text. The fallback uses comma-split, but there were no commas.

**Solution:** Use **COMMA-SEPARATED** format for answer keys:

```html
<!-- ❌ WRONG - Parser fails on text answers -->
<p><strong>1.</strong> a) circle  b) triangle  c) square  d) rectangle</p>

<!-- ✅ CORRECT - Comma-separated, parser works -->
<p><strong>1.</strong> circle, triangle, square, rectangle</p>
```

**Rule:** Always use commas between multi-part answers. Remove a), b), c) prefixes for text answers.

### Learning 2: Answer Normalizer Strips Shape Names

**Problem:** The validator's `normalizeAnswer()` function removes words like "circle", "square", "triangle" (lines 73-74 in answerValidator.ts).

**Impact:** If answer key has "circle" and student enters "circle", both become "" and should match. But if format is wrong, they don't get compared correctly.

**Solution:** The comma-separated format fixes this because it enables correct parsing first.

### Learning 3: Count Inputs Carefully

**Problem:** Test had 17 answers but worksheet had 18 inputs.

**Root Cause:** Missed counting the Yes/No input in Q5.

**Solution:** Always count ALL inputs including:
- Shape name inputs (text)
- Number inputs
- Yes/No text inputs (NOT buttons)
- Sub-question inputs (a, b, c)

**Formula for this pilot:**
```
Q1: 4 inputs (shape names)
Q2: 6 inputs (side counts in grid)
Q3: 3 inputs (shape counts)
Q4: 2 inputs (total + comparison)
Q5: 3 inputs (Yes/No + 2 numbers)
TOTAL: 18 inputs
```

### Learning 4: Answer Key Template for Mixed Layout

**Correct format for interactive validation:**

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <!-- Comma-separated, NO letter prefixes for text answers -->
  <p><strong>1.</strong> circle, triangle, square, rectangle</p>
  <p><strong>2.</strong> 3, 4, 4, 5, 6, 0</p>
  <p><strong>3.</strong> 3, 1, 1</p>
  <p><strong>4.</strong> 5, 1</p>
  <p><strong>5.</strong> No, 4, 4</p>
</div>
```

**Rules:**
1. Use commas between ALL multi-part answers
2. No a), b), c) prefixes for text/word answers
3. Can include explanation in parentheses AFTER the answers: `3, 4, 4, 5, 6, 0 (circle has 0 sides)`
4. "No" and "Yes" must be in answer array, NOT as button clicks

### Learning 5: Test Before Production

**Workflow that caught the bug:**

1. Generate test worksheet
2. Run `node scripts/extract-answers.js` - shows what parser extracts
3. Create Playwright test with extracted answers
4. If test fails, use debug test to identify WHICH inputs are wrong
5. Fix answer key format, re-save, re-test
6. Only proceed to production when test passes 100%

### Learning 6: Debug Test Template

When tests fail, use this debug test to identify exactly which answers are wrong:

```typescript
// Log each input's context
const inputs = page.locator('input[type="text"]')
for (let i = 0; i < await inputs.count(); i++) {
  const context = await inputs.nth(i).evaluate(el =>
    el.closest('.question')?.textContent?.substring(0, 80)
  )
  console.log(`Input ${i+1}: ${context}`)
}

// After submission, check which are correct/wrong
const results = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('input')).map(inp => ({
    value: inp.value,
    isCorrect: inp.classList.contains('border-green-500'),
    isWrong: inp.classList.contains('border-red-500')
  }))
})
```

### Learning 7: Prompt Template Must Match Parser

**Update prompt's answer key section to use comma format:**

```markdown
## ANSWER KEY FORMAT (Parser-Compatible)

IMPORTANT: Use COMMA-SEPARATED answers. No a), b), c) prefixes for text.

\`\`\`html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> answer1, answer2, answer3, answer4</p>
  <p><strong>2.</strong> 3, 4, 4, 5, 6, 0</p>
  <!-- ... -->
</div>
\`\`\`
```

### Learning 8: Use Claude Code to Generate Worksheets (NOT Gemini)

**Problem:** Using Gemini 2.5 Flash API produces inconsistent quality and doesn't leverage Claude's superior layout understanding.

**Solution:** Claude Code MUST generate all worksheet HTML directly:

1. **Claude Code reads the prompt template** from `src/lib/prompts/configurations/`
2. **Claude Code generates the HTML** using its own capabilities
3. **Save using `scripts/save-worksheet.js`** (which handles thumbnail + DB save)

**DO NOT use:**
- Gemini API for worksheet generation
- Any external LLM API for content creation

**Reason:** Claude Code has context of the entire codebase, understands the CSS patterns, knows the answer key format requirements, and produces consistently high-quality output.

### Learning 9: Exactly 3 Worksheets Per Subtopic

**Solution:** Generate exactly **3 worksheets per subtopic**:

| Worksheet | Purpose | Focus |
|-----------|---------|-------|
| **Worksheet 1** | Foundation practice | Core skill introduction |
| **Worksheet 2** | Varied practice | Different question formats |
| **Worksheet 3** | Challenge/Extension | Higher complexity or reasoning focus |

**Total per subtopic:** 3 worksheets

**Requirements:**
- ALL 5 questions must be DIFFERENT across worksheets
- Same learning objectives, different formats
- Teachers get genuine variety for differentiation

### Learning 10: Both Worksheets Must Be Unique

**Problem:** When creating multiple worksheets, Q1, Q2, Q5 were identical - only Q3-Q4 varied. This provides nearly identical experience.

**Solution:** The 2 worksheets MUST have genuinely different questions:

| Question | Test Worksheet | Production Worksheet |
|----------|----------------|----------------------|
| Q1 | Format A (e.g., name shapes) | Format B (e.g., match shape to description) |
| Q2 | Grid format (e.g., count sides) | Different grid (e.g., count corners) |
| Q3 | Scene A (e.g., playground) | Scene B (e.g., classroom) |
| Q4 | Word problem A | Word problem B (different numbers, context) |
| Q5 | Reasoning type A (e.g., True/False) | Reasoning type B (e.g., Which doesn't belong?) |

**Rules:**
1. Same learning objective, different question formats
2. No copy-paste between worksheets
3. Different visual layouts where possible
4. Different numbers/scenarios in word problems
5. Teacher should want ALL 3 worksheets for varied practice

### Learning 11: Compact Layout - No Block-Within-Block

**Problem:** Nested containers (`.scene-box` inside `.question`) create excessive whitespace with double padding/margins.

**Solution:** Use FLAT layout structure:

```css
/* COMPACT - No nested box padding */
.question{margin:8px 0;padding:10px;border-radius:8px}
.scene-box{padding:10px;margin:8px 0}  /* Reduced from 18px */
.word-problem-box{padding:10px;margin:8px 0}
.reasoning-box{padding:10px;margin:8px 0}

/* Images smaller for compactness */
.shape-item img{width:55px;height:55px}  /* Reduced from 75px */
.property-item img{width:45px;height:45px}  /* Reduced from 60px */
```

**Rules:**
1. Maximum 10px padding on inner boxes
2. Maximum 8px margin between elements
3. Smaller image sizes (55px max for shape displays)
4. No double borders (either question border OR inner box border, not both)
5. Remove section headers if space is tight - use colored question backgrounds instead

### Learning 12: Balanced Layout + Wider Boxes + Full-Width Thumbnails

**Problem:** Three related issues from user feedback:
1. Layout too congested (previous fix went too tight)
2. Yellow input boxes too narrow for kids to write on printables
3. Thumbnail showing left/right empty space (not full width)

**Solution:** Balanced CSS with specific improvements:

```css
/* FULL WIDTH - No max-width for proper thumbnails */
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}

/* BALANCED QUESTIONS - Not too tight, not too spacey */
.question{margin:10px 0;padding:12px;border-radius:8px}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}

/* WIDER ANSWER BOXES - Easy for kids to write */
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
```

**Rules:**
1. **NO max-width on body** - Thumbnails must extend to edges
2. **Balanced margins:** 10-12px (not 6-8px which is too tight)
3. **Wider input boxes:** min-width 50px (small), 70px (standard), 90px (word)
4. **Taller boxes:** 28-32px height for easier writing
5. **Body margin:0** - Critical for full-width thumbnails

### Learning 13: SEO Best Practices for Worksheets

**Goal:** Maximize organic search visibility for worksheet pages.

**SEO Metadata Structure:**

```javascript
{
  // SEO Title: 50-60 chars, primary keyword first
  seo_title: '2D Shapes Worksheet Year 1 - Free Printable (Grade 1)',

  // SEO Description: 150-160 chars, action-oriented with benefits
  seo_description: 'Free Year 1 2D shapes worksheet. Name circles, squares, triangles. Count sides and corners. Perfect for ages 5-6. Print-ready PDF with answers.',

  // Keywords: Long-tail, include both UK and US terms
  seo_keywords: [
    'year 1 2d shapes',           // UK primary
    'grade 1 shapes worksheet',   // US equivalent
    '2d shapes worksheet free',   // Intent keyword
    'shapes for 5 year olds',     // Age-specific
    'ks1 shapes',                 // UK curriculum
    'printable shapes worksheet'  // Format keyword
  ],

  // Tags: For filtering and categorization
  tags: ['year-1', 'grade-1', '2d-shapes', 'geometry', 'free', 'printable', 'with-answers']
}
```

**Rules:**
1. **SEO Title**: Primary keyword + Year Group (UK) + (US equivalent) + "Free Printable"
2. **SEO Description**: Action verb + topic + benefits + age range + format (PDF/printable)
3. **Keywords**: Mix of UK terms (Year 1, KS1) and US terms (Grade 1, Kindergarten)
4. **Tags**: Include difficulty level, with-answers, free, printable
5. **Slug**: Keep short, keyword-rich (avoid timestamps if possible)

### Learning 14: Answer Key Format for Interactive Mode

**Problem:** Special symbols like `=`, `>`, `<` in answer keys cause parsing issues.

**Solution:** Use text alternatives that parse correctly:

| Symbol | Use Instead |
|--------|-------------|
| `=` | `same`, `equal` |
| `>` | `A` (which is bigger), `greater` |
| `<` | `B` (which is bigger), `less` |
| `✓` | `correct`, `True` |
| `✗` | `incorrect`, `False` |

**Question Format Example:**
```html
<!-- BAD: Symbol answers -->
<p>Compare. Write <, > or = <span class="answer-box-small"></span></p>
Answer key: <p><strong>3.</strong> =, ></p>  <!-- FAILS: parsed as single answer -->

<!-- GOOD: Text answers -->
<p>Which is bigger? Write A, B, or same <span class="answer-box-small"></span></p>
Answer key: <p><strong>3.</strong> same, A</p>  <!-- WORKS: parsed as two answers -->
```

### Learning 15: True/False Questions Need Validation Exclusion

**Problem:** True/False questions contain equations (e.g., "6 + 4 = 10") that trigger the multi-step word problem validation, causing incorrect expected answers.

**Root Cause:** The answer validator detected multiple equations and 3+ inputs, triggering multi-step validation which calculated equation results (10, 10, 10) instead of accepting True/False answers.

**Fix Applied:** Added check in `src/lib/utils/answerValidator.ts` to exclude True/False questions from multi-step validation:

```javascript
// Skip multi-step validation for True/False questions
const isTrueFalseQuestion = html.toLowerCase().includes('true or false') ||
                             html.toLowerCase().includes('(true/false)') ||
                             html.toLowerCase().includes('true, false')

if ((hasStepPattern || hasMultipleEquations) && hasMultipleInputs && !isTrueFalseQuestion) {
  // Multi-step validation logic...
}
```

**Key Takeaway:** When adding True/False reasoning questions, always use one of these patterns in the question text:
- "True or False?"
- "(True/False)"
- Answer format: "True, True, False"

---

## Pilot Results: Year 1 2D Shapes Basic

| Metric | Result |
|--------|--------|
| Phases 0-3 | ✅ Completed |
| Phase 4 (Production) | ✅ 3 unique worksheets, all 100% |
| Iterations | 4 (v1: too many, v2: spacey layout, v3: compact but too tight, v4: BALANCED SUCCESS) |
| Key Learnings | 15 documented |

### Final Worksheets (Balanced Layout)

| # | Slug | Focus | Score |
|---|------|-------|-------|
| 1 | `2d-shapes-name-and-count-shapes-fill-in-the-blank` | Foundation: Name shapes + Count sides | 100% |
| 2 | `2d-shapes-shape-riddles-shapes-riddles` | Varied: Shape riddles + Count corners | 100% |
| 3 | `2d-shapes-shape-challenge-shapes-challenge` | Challenge: Table + Compare + Two-step | 100% |

### Question Comparison (All Unique)

| Q | WS1 Foundation | WS2 Varied | WS3 Challenge |
|---|----------------|------------|---------------|
| Q1 | Name 4 shapes | Shape riddles | Complete table (sides) |
| Q2 | Count sides (6) | Count corners (6) | Sides AND corners (3) |
| Q3 | Playground scene | Classroom scene | Robot factory scene |
| Q4 | Drawing problem | Building problem | Two-step problem |
| Q5 | True/False | Odd one out | "Always true?" explain |

**Test File:** `tests/e2e/interactive/2d-shapes-basic-all.spec.ts`

---

## Results: Year 2 Times Tables 2, 5, 10

| Metric | Result |
|--------|--------|
| Phases 0-4 | ✅ Completed in single session |
| Worksheets | 3 (Foundation, Varied, Challenge) |
| All Tests | 100% |
| Learnings Added | 13-14 (SEO, Answer Symbols) |

### Final Worksheets (SEO-Optimized)

| # | SEO Title | Slug | Score |
|---|-----------|------|-------|
| 1 | 2 5 10 Times Tables Worksheet Year 2 | `times-tables-2-5-10-quick-recall-*` | 100% |
| 2 | Skip Counting 2s 5s 10s Year 2 | `times-tables-2-5-10-skip-counting-*` | 100% |
| 3 | Times Tables Challenge Year 2 | `times-tables-2-5-10-challenge-*` | 100% |

### Question Comparison (All Unique)

| Q | WS1 Foundation | WS2 Varied | WS3 Challenge |
|---|----------------|------------|---------------|
| Q1 | Times table grid (×2,×5,×10) | Skip counting patterns | Fact families (×/÷) |
| Q2 | Missing number calculations | Find missing factors | Mult/Div table |
| Q3 | Count arrays | Equal groups with images | Compare calculations |
| Q4 | Simple word problem | Two-step word problem | Multi-step comparison |
| Q5 | True/False reasoning | Odd one out | Always/Sometimes/Never |

**Test File:** `tests/e2e/interactive/times-tables-2-5-10-all.spec.ts`

---

## Results: Year 1 Number Bonds to 10

| Metric | Result |
|--------|--------|
| Phases 0-4 | ✅ Completed in single session |
| Worksheets | 3 (Foundation, Varied, Challenge) |
| All Tests | 100% |
| Learnings Added | 15 (True/False validation fix) |

### Final Worksheets (SEO-Optimized)

| # | Title | Slug | Score |
|---|-------|------|-------|
| 1 | Number Bonds to 10 - Learn the Pairs | `number-bonds-to-10-learn-the-pairs-*` | 100% |
| 2 | Number Bonds to 10 - Match and Complete | `number-bonds-to-10-match-and-complete-*` | 100% |
| 3 | Number Bonds to 10 - Challenge | `number-bonds-to-10-challenge-*` | 100% |

### Question Comparison (All Unique)

| Q | WS1 Foundation | WS2 Varied | WS3 Challenge |
|---|----------------|------------|---------------|
| Q1 | Number bond diagrams | Match numbers to make 10 | Complete fact family |
| Q2 | Fill missing numbers | Dominoes to make 10 | Missing parts (both) |
| Q3 | Ten frame counting | Count objects + write bond | Compare calculations |
| Q4 | Word problem (stickers/cars) | Two-part word problem | Multi-step story |
| Q5 | True/False | Odd one out | Always/Sometimes/Never |

**Test File:** `tests/e2e/interactive/number-bonds-to-10-all.spec.ts`
