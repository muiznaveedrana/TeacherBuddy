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

## Phase 4: Production (6 Unique Worksheets)

> **IMPORTANT:** Claude Code generates ALL worksheet HTML directly (see Learning 8). Do NOT use Gemini API.

### 6 Worksheet Structure (2 Foundation + 4 Practice)

| # | Worksheet Type | Difficulty | Focus | Target User |
|---|----------------|------------|-------|-------------|
| **1** | Foundation 1 | ⭐ Easy | Core concept introduction, heavy visual support | Struggling learners, SEN |
| **2** | Foundation 2 | ⭐ Easy | Alternative approach, scaffolded practice | Reinforcement, building confidence |
| **3** | Practice 1 | ⭐⭐ Average | Standard curriculum practice | Typical classroom use |
| **4** | Practice 2 | ⭐⭐ Average | Real-world application focus | Homework, independent work |
| **5** | Practice 3 | ⭐⭐ Average | Word problems, varied formats | Extra practice |
| **6** | Practice 4 | ⭐⭐ Average | Mixed question styles, consolidation | Mastery through repetition |

**Pedagogical Rationale:**
- **2 Foundation (Easy):** Accessible entry points for struggling learners and SEN support
- **4 Practice (Average):** Targets 80-90% of mainstream learners with varied contexts
- **No Challenge level:** Focus on mainstream population, not gifted/higher ability extension

### Step 4a: Generate All 6 Worksheets

**Claude Code creates HTML directly for each worksheet:**

```
┌─────────────────────────────────────────────────────────────────┐
│ WORKSHEET GENERATION SEQUENCE (2 Foundation + 4 Practice)        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  WS1: Foundation 1 (⭐ Easy)                                     │
│  ├── Read prompt template                                        │
│  ├── Core concept with HEAVY visual support                      │
│  ├── Simpler numbers, more scaffolding                           │
│  └── Save: public/preview-{subtopic}-foundation-1.html           │
│                                                                  │
│  WS2: Foundation 2 (⭐ Easy)                                     │
│  ├── DIFFERENT theme/context from WS1                            │
│  ├── Same easy level, alternative approach                       │
│  └── Save: public/preview-{subtopic}-foundation-2.html           │
│                                                                  │
│  WS3: Practice 1 (⭐⭐ Average)                                   │
│  ├── Standard curriculum-aligned difficulty                      │
│  ├── Balanced visual/abstract mix                                │
│  └── Save: public/preview-{subtopic}-practice-1.html             │
│                                                                  │
│  WS4: Practice 2 (⭐⭐ Average)                                   │
│  ├── Real-world application focus                                │
│  ├── DIFFERENT formats from WS3                                  │
│  └── Save: public/preview-{subtopic}-practice-2.html             │
│                                                                  │
│  WS5: Practice 3 (⭐⭐ Average)                                   │
│  ├── Word problems, varied contexts                              │
│  ├── Extra practice for reinforcement                            │
│  └── Save: public/preview-{subtopic}-practice-3.html             │
│                                                                  │
│  WS6: Practice 4 (⭐⭐ Average)                                   │
│  ├── Mixed question styles                                       │
│  ├── Consolidation and mastery                                   │
│  └── Save: public/preview-{subtopic}-practice-4.html             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Key Requirements for ALL 6:**
- ALL 5 questions must be UNIQUE across worksheets (30 unique questions total)
- Foundation (1-2): Easy difficulty for struggling learners
- Practice (3-6): Average difficulty for 80-90% mainstream
- Each worksheet must stand alone as complete practice
- Variety comes from context/format, NOT difficulty
- Comma-separated answer key format (see Learning 4)

### Step 4b: Visual Review (All 6)

```powershell
# Open all 6 in browser for side-by-side comparison
$subtopic = "{subtopic}"
@("foundation-1","foundation-2","practice-1","practice-2","practice-3","practice-4") | ForEach-Object {
  Start-Process "public/preview-$subtopic-$_.html"
}
```

**Visual Checklist (for EACH worksheet):**
- [ ] Layout badge shows "Mixed Layout"
- [ ] Section headers visible (A: Fluency, B: Application, C: Reasoning)
- [ ] Q2 grid displays correctly (2×3 or 3×2)
- [ ] All 5 question backgrounds correct colors
- [ ] Answer boxes visible, yellow, properly sized (min-width 70px)
- [ ] Questions are DIFFERENT from other worksheets (unique contexts/formats)
- [ ] Foundation (1-2): Easy difficulty with scaffolding
- [ ] Practice (3-6): Average difficulty for mainstream learners
- [ ] No broken images or layout issues
- [ ] Full-width layout (no side margins in thumbnail)

### Step 4c: Save All 6 to Library

```powershell
$yearGroup = "Year 3"
$topic = "{topic}"
$subtopic = "{subtopic}"

# Foundation worksheets (EASY difficulty)
node scripts/save-worksheet.js "public/preview-$subtopic-foundation-1.html" "$yearGroup" $topic $subtopic easy 5
node scripts/save-worksheet.js "public/preview-$subtopic-foundation-2.html" "$yearGroup" $topic $subtopic easy 5

# Practice worksheets (AVERAGE difficulty)
node scripts/save-worksheet.js "public/preview-$subtopic-practice-1.html" "$yearGroup" $topic $subtopic average 5
node scripts/save-worksheet.js "public/preview-$subtopic-practice-2.html" "$yearGroup" $topic $subtopic average 5
node scripts/save-worksheet.js "public/preview-$subtopic-practice-3.html" "$yearGroup" $topic $subtopic average 5
node scripts/save-worksheet.js "public/preview-$subtopic-practice-4.html" "$yearGroup" $topic $subtopic average 5
```

Record all 6 generated slugs.

### Step 4d: Interactive Tests (All 6 Must Pass 100%)

**Create Playwright test file:** `tests/e2e/interactive-{subtopic}-all.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

// 2 Foundation (Easy) + 4 Practice (Average) worksheets
const WORKSHEETS = [
  { slug: '{subtopic}-foundation-1', answers: ['...'] },  // Easy
  { slug: '{subtopic}-foundation-2', answers: ['...'] },  // Easy
  { slug: '{subtopic}-practice-1', answers: ['...'] },    // Average
  { slug: '{subtopic}-practice-2', answers: ['...'] },    // Average
  { slug: '{subtopic}-practice-3', answers: ['...'] },    // Average
  { slug: '{subtopic}-practice-4', answers: ['...'] },    // Average
]

test.describe('Interactive: {Subtopic} (6 worksheets)', () => {
  for (const ws of WORKSHEETS) {
    test(`${ws.slug} should complete with 100% score`, async ({ page }) => {
      await page.goto(`/library/${ws.slug}/interactive`)

      // Remove cookie consent
      await page.evaluate(() => {
        document.querySelector('.cookie-consent-container')?.remove()
      })

      // Fill all answers
      const inputs = page.locator('input[type="text"]')
      const count = await inputs.count()

      for (let i = 0; i < count; i++) {
        await inputs.nth(i).pressSequentially(ws.answers[i], { delay: 50 })
      }

      // Submit and verify 100%
      await page.getByRole('button', { name: /check answers/i }).click()
      await expect(page.getByText('100%')).toBeVisible()
    })
  }
})
```

**Run tests:**
```powershell
npx playwright test tests/e2e/interactive-{subtopic}-all.spec.ts --project=chromium
```

**All 6 tests MUST pass with 100% score before subtopic is considered complete.**

### Step 4e: Quality Assurance Checklist

Before marking subtopic complete, verify:

```
┌─────────────────────────────────────────────────────────────────┐
│ QUALITY GATE CHECKLIST (2 Foundation + 4 Practice)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ☐ All 6 worksheets generated with unique questions              │
│ ☐ Foundation (1-2): Easy difficulty, heavy scaffolding          │
│ ☐ Practice (1-4): Average difficulty for 80-90% of learners     │
│ ☐ Variety achieved through context/format within each level     │
│ ☐ Visual review passed for all 6                                │
│ ☐ All 6 saved to library with correct metadata                  │
│ ☐ Interactive tests pass 100% for all 6                         │
│ ☐ SEO metadata added (title, description, keywords)             │
│ ☐ Answer keys are comma-separated format                        │
│ ☐ No duplicate questions across the 6 worksheets                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Subtopic Status Tracking

### Legend
- ⬜ = Not started (no worksheets)
- 🔷 = Standard layout only (existing)
- 🟡 = Mixed layout partial (1-5 worksheets)
- 🟣 = Mixed layout complete (6 worksheets: 2 Foundation + 4 Practice)
- ✅ = Both layouts complete (6+ worksheets)

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

## Year 3 (Ages 7-8) — 60 subtopics (COMPREHENSIVE - Updated Dec 2024)

> **Research Sources:** [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study), [NCETM Year 3 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-3-curriculum-map/), [White Rose Maths Year 3](https://thirdspacelearning.com/blog/white-rose-maths-year-3/), [Twinkl Year 3 Curriculum](https://www.twinkl.co.uk/teaching-wiki/national-curriculum-for-maths-for-year-3)

### Number and Place Value (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| hundreds-tens-ones | ⬜ 0 | ✅ 6 | 6 | 🟣 |
| representing-to-1000 | ⬜ 0 | ✅ 6 | 6 | 🟣 |
| reading-writing-to-1000 | ⬜ 0 | ✅ 6 | 6 | 🟣 |
| counting-4s-8s-50s-100s | ⬜ 0 | ✅ 6 | 6 | 🟣 |
| 10-100-more-less | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| comparing-to-1000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| ordering-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| estimating-rounding | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Addition and Subtraction (9 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| mental-addition-strategies | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mental-subtraction-strategies | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| column-addition-no-exchange | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| column-addition-with-exchange | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| column-subtraction-no-exchange | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| column-subtraction-with-exchange | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| inverse-operations-checking | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| add-subtract-word-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| missing-number-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Multiplication and Division (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| 3-times-table | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 4-times-table | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 8-times-table | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiplication-division-facts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiplying-2digit-by-1digit | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| division-with-remainders | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| scaling-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| missing-number-multiplication | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Fractions (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| understanding-tenths | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| unit-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| non-unit-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-of-amounts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-number-lines | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| equivalent-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| comparing-unit-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| adding-subtracting-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Length and Perimeter (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| measuring-mm-cm-m | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| converting-length | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| comparing-adding-lengths | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| perimeter-2d-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Mass and Capacity (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| measuring-mass-g-kg | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| converting-mass | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| measuring-capacity-ml-l | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| converting-capacity | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Money (2 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| adding-subtracting-money | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| giving-change | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Time (6 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| time-nearest-minute | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 12-24-hour-clocks | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| roman-numerals-clocks | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| seconds-minutes-hours | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| days-months-years | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| duration-of-events | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Properties of Shapes (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| draw-2d-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 2d-shape-properties | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| make-3d-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| 3d-shape-properties | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-turns | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| right-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| comparing-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| lines-types | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Statistics (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| bar-charts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| pictograms-scaled | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| tables-two-step-questions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Year 3 Total:** 0 Standard + 24 Mixed = 24 worksheets
**Subtopics with worksheets:** 4 of 60 (7%)
**Remaining to generate:** 56 subtopics × 6 worksheets = 336 worksheets

### Year 3 Priority Order (Based on White Rose Maths Sequence)

| Priority | Topic | Subtopic | Reason | Status |
|----------|-------|----------|--------|--------|
| ✅ 1 | number-place-value | hundreds-tens-ones | Foundation for Year 3 | 🟣 Complete |
| ✅ 2 | number-place-value | representing-to-1000 | Representations essential | 🟣 Complete |
| ✅ 3 | number-place-value | reading-writing-to-1000 | Core literacy | 🟣 Complete |
| ✅ 4 | number-place-value | counting-4s-8s-50s-100s | Prepares for times tables | 🟣 Complete |
| 🔴 5 | number-place-value | 10-100-more-less | Key mental maths | ⬜ Next |
| 🔴 6 | number-place-value | comparing-to-1000 | Ordering skills | ⬜ |
| 🔴 7 | addition-subtraction | mental-addition-strategies | Mental fluency first | ⬜ |
| 🔴 8 | addition-subtraction | column-addition-no-exchange | Written methods | ⬜ |
| 🟠 9 | multiplication-division | 3-times-table | New table for Year 3 | ⬜ |
| 🟠 10 | multiplication-division | 4-times-table | New table for Year 3 | ⬜ |
| 🟠 11 | multiplication-division | 8-times-table | New table for Year 3 | ⬜ |
| 🟡 12+ | All remaining | Continue through topics | Complete curriculum | ⬜ |

---

## Year 4 (Ages 8-9) — 68 subtopics (COMPREHENSIVE - Updated Dec 2024)

> **Research Sources:** [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study), [NCETM Year 4 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-4-curriculum-map/), [White Rose Maths Year 4](https://thirdspacelearning.com/blog/white-rose-maths-year-4/), [MTC Guidance](https://www.gov.uk/government/collections/multiplication-tables-check)

### Number and Place Value (7 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| four-digit-numbers | ✅ Prompt | ✅ 6 | 6 | **✅ COMPLETE** |
| find-1000-more-less | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| comparing-ordering-4-digit | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| counting-multiples-6-7-9-25-1000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| negative-numbers | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| rounding-10-100-1000 | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| roman-numerals-to-100 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Addition and Subtraction (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| column-addition-4-digit | ✅ Prompt | ✅ 6 | 6 | **✅ COMPLETE** |
| column-subtraction-4-digit | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| estimate-inverse-check | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| two-step-problems | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |

### Multiplication and Division - MTC FOCUS (13 subtopics) 🔴

> **CRITICAL:** Year 4 students sit the statutory Multiplication Tables Check (MTC) in June. 25 questions, 6 seconds each. Focus on 6×, 7×, 8×, 9×, 11×, 12× tables.

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| times-tables-3-6-9 | ⬜ 0 | ✅ 6 | 6 | **✅ COMPLETE** (NCETM Unit 4) |
| times-tables-7 | ⬜ 0 | ✅ 6 | 6 | **✅ COMPLETE** (NCETM Unit 5) |
| times-tables-11-12 | ⬜ 0 | ✅ 6 | 6 | **✅ COMPLETE** |
| **times-tables-to-12** | ✅ Prompt | ✅ 6 | 6 | **✅ COMPLETE** |
| division-facts-to-12 | ⬜ 0 | ✅ 6 | 6 | **✅ COMPLETE** |
| factor-pairs-commutativity | ✅ Prompt | ✅ 6 | 6 | **✅ COMPLETE** |
| multiply-by-0-and-1 | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| multiply-three-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| multiply-2-3-digit-by-1-digit | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| division-2-digit-by-1-digit | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| division-with-remainders | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW (NCETM Unit 12) |
| mental-multiplication-division | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| scaling-correspondence | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Fractions (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| equivalent-fractions | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| fractions-greater-than-1 | ⬜ 0 | ✅ 6 | 6 | **✅ COMPLETE** (NCETM Unit 9) |
| hundredths | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| add-subtract-same-denominator | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-of-amounts | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Decimals (7 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| decimal-tenths | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| decimal-hundredths | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| divide-by-10-100 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| decimal-equivalents | ✅ Prompt | ⬜ 0 | 0 | 🔷 Prompt Ready |
| compare-order-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| rounding-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| decimal-money-measures | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Length and Perimeter (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| convert-length-units | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| perimeter-rectangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| perimeter-rectilinear | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| find-missing-lengths | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Area (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| area-counting-squares | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| area-rectangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| compare-areas | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Mass and Capacity (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| convert-mass-units | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| convert-capacity-units | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| estimate-mass-capacity | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Money (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| money-pounds-pence | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| convert-money | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| money-calculations | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| money-word-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Time (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| time-12-hour | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| time-24-hour | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| time-analogue-digital | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time-conversions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time-duration | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |

### Geometry: Properties of Shapes (6 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| classify-triangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| classify-quadrilaterals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| acute-obtuse-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| compare-order-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| lines-of-symmetry | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| complete-symmetric-figures | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Position and Direction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| coordinates-first-quadrant | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| translations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| plot-points-polygons | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Statistics (4 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| bar-charts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time-graphs | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| pictograms-tables | ⬜ 0 | ⬜ 0 | 0 | ⬜ NEW |
| comparison-sum-difference | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Year 4 Total:** 54 Worksheets (9 PRIORITIES COMPLETE), 53 subtopics pending

### Year 4 Priority Order (MTC Focus + Core Curriculum)

| Priority | Subtopic | Reason | Status |
|----------|----------|--------|--------|
| ✅ **1** | **times-tables-to-12** | MTC statutory test (June) | ✅ COMPLETE (6 WS) |
| ✅ **2** | **division-facts-to-12** | MTC inverse operations | ✅ COMPLETE (6 WS) |
| ✅ **3** | **times-tables-7** | Hardest table (NCETM focus) | ✅ COMPLETE (6 WS) |
| ✅ **4** | **times-tables-3-6-9** | 6 weeks NCETM focus | ✅ COMPLETE (6 WS) |
| ✅ **5** | **factor-pairs-commutativity** | MTC support - fluency | ✅ COMPLETE (6 WS) |
| ✅ **6** | **times-tables-11-12** | Complete MTC coverage | ✅ COMPLETE (6 WS) |
| ✅ **7** | **fractions-greater-than-1** | NCETM Unit 9 (5 weeks!) | ✅ COMPLETE (6 WS) |
| ✅ **8** | **four-digit-numbers** | Core place value | ✅ COMPLETE (6 WS) |
| ✅ **9** | **column-addition-4-digit** | Core calculation | ✅ COMPLETE (6 WS) |
| 🟠 10 | equivalent-fractions | Key fractions concept | 🔷 Prompt Ready |
| 🟡 11 | decimal-tenths | Year 4 decimals intro | 🔷 Prompt Ready |
| 🟡 12 | negative-numbers | New concept for Y4 | 🔷 Prompt Ready |
| 🟡 13+ | All remaining (56 subtopics) | Complete curriculum | ⬜ Not Started |

### MTC Preparation Focus (Statutory June Test)

> **Key Stats:** 25 questions, 6 seconds each, focus on 6×7×8×9×11×12 tables
> **Most Difficult Facts:** 7×8=56, 7×9=63, 8×9=72, 6×7=42, 6×8=48, 12×12=144

| MTC Subtopic | Worksheets | Status |
|--------------|------------|--------|
| times-tables-to-12 (mixed) | ✅ 6 | ✅ COMPLETE |
| division-facts-to-12 | ✅ 6 | ✅ COMPLETE |
| times-tables-7 (focused) | ✅ 6 | ✅ COMPLETE |
| times-tables-3-6-9 | ✅ 6 | ✅ COMPLETE |
| times-tables-11-12 | ✅ 6 | ✅ COMPLETE |
| factor-pairs-commutativity | ✅ 6 | ✅ COMPLETE |
| **MTC Total** | **36 worksheets** | **🎉 ALL COMPLETE** |

---

## Year 5 (Ages 9-10) — 62 subtopics (COMPREHENSIVE - Updated Dec 2024)

> **Research Sources:** [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study), [NCETM Year 5 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-5-curriculum-map/), [White Rose Maths Year 5](https://thirdspacelearning.com/blog/white-rose-maths-year-5/)

### Number and Place Value (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| numbers-to-1000000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| powers-of-10 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| rounding-large-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| negative-numbers-context | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| roman-numerals-to-1000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Addition and Subtraction (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| column-add-large-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| column-subtract-large-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mental-add-subtract-large | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| inverse-operations-checking | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multi-step-add-subtract | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Multiplication and Division (12 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| multiples-common-multiples | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| factors-common-factors | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| prime-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| prime-numbers-to-100 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| square-cube-numbers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-4digit-by-1digit | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-4digit-by-2digit | ✅ 2 | ✅ 4 | 6 | ✅ |
| short-division | ✅ 2 | ✅ 4 | 6 | ✅ |
| division-with-remainders | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-divide-by-10-100-1000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mental-multiply-divide | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| order-of-operations-intro | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Fractions (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| compare-order-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| equivalent-fractions-visual | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| improper-fractions-mixed-numbers | ✅ 2 | ✅ 4 | 6 | ✅ |
| add-fractions-same-denominator | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| subtract-fractions-same-denominator | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| add-subtract-fractions-related | ✅ 2 | ✅ 4 | 6 | ✅ |
| multiply-fractions-by-integers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-of-amounts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Decimals (7 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| thousandths | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| read-write-decimals-3dp | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| compare-order-decimals-3dp | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| round-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| add-subtract-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-decimals-by-integers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| decimal-problems-3dp | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Percentages (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| understand-percentages | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| percentage-fraction-equivalents | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| percentage-decimal-equivalents | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Measurement (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| convert-metric-units | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| metric-imperial-approximations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| perimeter-composite-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| area-rectangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| area-compound-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| volume-capacity-cubes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| time-conversions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| problem-solving-measures | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Properties of Shapes (8 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| 3d-from-2d-representations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-in-degrees | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| measure-draw-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-at-point-360 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-on-line-180 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-multiples-90 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| rectangle-properties | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| regular-irregular-polygons | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Position and Direction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| reflection | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| translation | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| first-quadrant-coordinates | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Statistics (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| line-graphs | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| timetables | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| two-way-tables | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

**Year 5 Total:** 0 Worksheets (62 subtopics × 6 = 372 target)

### Year 5 Priority Order (Based on NCETM Curriculum Map)

> **NCETM Unit Allocation:** Decimal fractions (5wk), Money (2wk), Negative numbers (2wk), Short multiplication/division (6wk), Area/scaling (5wk), Calculating with decimals (3wk), Factors/multiples/primes (4wk), Fractions (7wk), Converting units (2wk), Angles (3wk)

| Priority | Topic | Subtopic | Reason | Status |
|----------|-------|----------|--------|--------|
| 🔴 1 | multiplication-division | multiply-4digit-by-2digit | NCETM 6-week focus | ✅ |
| 🔴 2 | multiplication-division | short-division | Formal written method | ✅ |
| 🔴 3 | fractions | improper-fractions-mixed-numbers | NCETM 7-week fractions unit | ✅ |
| 🔴 4 | fractions | add-subtract-fractions-related | Key Year 5 skill | ✅ |
| 🔴 5 | decimals | thousandths | New concept | ⬜ |
| 🟠 6 | multiplication-division | prime-numbers | Vocabulary and identification | ⬜ |
| 🟠 7 | multiplication-division | square-cube-numbers | New notation (², ³) | ⬜ |
| 🟠 8 | percentages | understand-percentages | New topic introduction | ⬜ |
| 🟠 9 | geometry-shapes | angles-in-degrees | NCETM 3-week focus | ⬜ |
| 🟡 10+ | All remaining | Complete curriculum | 50 subtopics | ⬜ |

### Year 5 Implementation Session Status

> **Last Updated:** 2024-12-21
> **Session Continuity:** This section tracks progress across sessions. Update after each subtopic completion.

| Subtopic | Research | Prompt | Worksheets | E2E Tests | Status |
|----------|----------|--------|------------|-----------|--------|
| 1. multiply-4digit-by-2digit | ✅ | ✅ | 6/6 | 6/6 | ✅ Complete |
| 2. short-division | ✅ | ✅ | 6/6 | 6/6 | ✅ Complete |
| 3. improper-fractions-mixed-numbers | ✅ | ✅ | 6/6 | 6/6 | ✅ Complete |
| 4. add-subtract-fractions-related | ✅ | ✅ | 6/6 | 6/6 | ✅ Complete |
| 5. thousandths | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |
| 6. prime-numbers | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |
| 7. square-cube-numbers | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |
| 8. understand-percentages | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |
| 9. angles-in-degrees | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |
| 10. numbers-to-1000000 | ⬜ | ⬜ | 0/6 | 0/6 | ⬜ Pending |

**Legend:**
- ⬜ = Not started
- 🔄 = In progress
- ✅ = Complete
- ❌ = Blocked/Issue

**Current Progress:** 2/10 priority subtopics complete (12/60 worksheets)

**Total Year 5 Progress:** 2/62 subtopics complete (12/372 worksheets)

---

## Year 6 (Ages 10-11) — 66 subtopics (COMPREHENSIVE - SATs Focus - Updated Dec 2024)

> **Research Sources:** [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study), [NCETM Year 6 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-6-curriculum-map/), [White Rose Maths Year 6](https://thirdspacelearning.com/blog/white-rose-maths-year-6/), [KS2 SATs 2024 Analysis](https://thirdspacelearning.com/blog/ks2-sats-papers-2024-maths-question-breakdown/)

> **SATs 2024 Analysis:** 35% Calculations, 26% Fractions/Decimals/Percentages, 10% Number/Place Value = 71% from these three domains. Algebra and Ratio are growing areas.

### Number and Place Value (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| numbers-to-10-million | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| place-value-digits | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| rounding-any-degree | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| negative-numbers-context | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| negative-number-calculations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Four Operations (11 subtopics) 🔴 SATs Focus

> **SATs 2024:** 35% of marks from calculations domain (highest ever). Long multiplication and long division are essential.

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| long-multiplication | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Critical |
| long-division | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Critical |
| short-division-2-digit-divisor | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| remainders-interpretation | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mental-calculations-large | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| common-factors | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| common-multiples | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| prime-numbers-identification | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| order-of-operations | ⬜ 0 | ⬜ 0 | 0 | ⬜ BIDMAS |
| multi-step-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Critical |
| estimation-checking | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Fractions (8 subtopics) 🔴 SATs Focus

> **SATs 2024:** 26% of marks from FDP domain. All four fraction operations tested.

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| simplify-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| common-denominators | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| compare-order-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| add-subtract-different-denominators | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Critical |
| multiply-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| divide-fractions-by-integers | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-as-division | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fractions-of-amounts | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Decimals (5 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| decimal-place-value-3dp | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-divide-by-10-100-1000 | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| multiply-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| divide-decimals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| rounding-specified-accuracy | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Percentages (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| percentage-of-amounts | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Regular |
| percentage-comparisons | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| fraction-decimal-percentage-equivalence | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Ratio and Proportion (6 subtopics) 🟠 Growing SATs Area

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| ratio-language-notation | ⬜ 0 | ⬜ 0 | 0 | ⬜ New for Y6 |
| ratio-and-fractions | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| scale-factors | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| unequal-sharing | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| percentage-change | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| proportional-reasoning | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Algebra (6 subtopics) 🟠 New for Year 6

> **SATs Note:** Algebra questions often disguised as ratio problems. Bar modelling is essential pre-cursor.

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| function-machines | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| simple-formulae | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| linear-sequences | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| missing-number-problems | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Regular |
| two-unknowns-equations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| enumerate-combinations | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Measurement (7 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| convert-metric-units-3dp | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| miles-kilometres | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| perimeter-area-relationship | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| area-triangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| area-parallelograms | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| volume-cuboids | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| formulae-area-volume | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Properties of Shapes (9 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| draw-2d-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| build-3d-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| classify-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-in-triangles | ⬜ 0 | ⬜ 0 | 0 | ⬜ SATs Regular |
| angles-in-quadrilaterals | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| angles-in-regular-polygons | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| circles-radius-diameter | ⬜ 0 | ⬜ 0 | 0 | ⬜ New for Y6 |
| angles-at-point-line | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| vertically-opposite-angles | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Geometry: Position and Direction (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| four-quadrant-coordinates | ⬜ 0 | ⬜ 0 | 0 | ⬜ New: all 4 quadrants |
| translate-shapes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| reflect-shapes-axes | ⬜ 0 | ⬜ 0 | 0 | ⬜ |

### Statistics (3 subtopics)

| Subtopic | Standard | Mixed | Total WS | Status |
|----------|----------|-------|----------|--------|
| pie-charts | ⬜ 0 | ⬜ 0 | 0 | ⬜ New for Y6 |
| line-graphs-interpret | ⬜ 0 | ⬜ 0 | 0 | ⬜ |
| mean-average | ⬜ 0 | ⬜ 0 | 0 | ⬜ New for Y6 |

**Year 6 Total:** 0 Worksheets (66 subtopics × 6 = 396 target)

### Year 6 Priority Order (SATs Focus + NCETM Allocation)

> **NCETM Unit Allocation:** Calculating (6wk + 1wk), Numbers to 10M (6wk), Shapes (2wk), Multiplication/Division (4wk), Perimeter/Area/Position (2wk), Fractions/Percentages (6wk), Statistics (1wk), Ratio/Proportion (2wk), Two Unknowns (2wk), Order of Operations (1wk), Mean (1wk)

| Priority | Topic | Subtopic | Reason | Status |
|----------|-------|----------|--------|--------|
| 🔴 1 | four-operations | long-multiplication | SATs 35% calculations | ⬜ |
| 🔴 2 | four-operations | long-division | SATs critical | ⬜ |
| 🔴 3 | fractions | add-subtract-different-denominators | SATs 26% FDP | ⬜ |
| 🔴 4 | four-operations | multi-step-problems | SATs reasoning | ⬜ |
| 🔴 5 | four-operations | order-of-operations | BIDMAS essential | ⬜ |
| 🔴 6 | percentages | percentage-of-amounts | SATs regular | ⬜ |
| 🟠 7 | ratio-proportion | ratio-language-notation | New topic | ⬜ |
| 🟠 8 | algebra | missing-number-problems | SATs regular | ⬜ |
| 🟠 9 | geometry-shapes | angles-in-triangles | Geometry reasoning | ⬜ |
| 🟠 10 | statistics | mean-average | New concept | ⬜ |
| 🟡 11+ | All remaining | Complete curriculum | 54 subtopics | ⬜ |

### SATs Preparation Focus

> **Key Stats:** 3 papers (1 Arithmetic + 2 Reasoning), 110 marks total, May test window
> **2024 Analysis:** 48% Year 6 content, 26% Year 5 content, 26% Years 3-4 content

| SATs Domain | Subtopics | Worksheets Needed | Priority |
|-------------|-----------|-------------------|----------|
| Calculations (35%) | long-multiplication, long-division, multi-step | 18 | 🔴 CRITICAL |
| FDP (26%) | all fractions + decimals + percentages | 42 | 🔴 CRITICAL |
| Number (10%) | place value, rounding, negative | 18 | 🔴 HIGH |
| Ratio/Algebra (10%) | all ratio + algebra subtopics | 36 | 🟠 HIGH |
| Geometry (12%) | angles, shapes, position | 45 | 🟠 MEDIUM |
| Statistics (5%) | pie charts, line graphs, mean | 18 | 🟡 MEDIUM |
| Measurement (2%) | all measurement subtopics | 27 | 🟡 LOWER |
| **Total** | **64 subtopics** | **384 worksheets** | - |

---

## Progress Summary (Updated December 2024)

| Year Group | Topics | Subtopics | Standard WS | Mixed WS | Total | E2E Tests |
|------------|--------|-----------|-------------|----------|-------|-----------|
| Reception | 3 | 15 | 33 | 3 | 36 | 36 (100%) |
| Year 1 | 5 | 13 | 30 | 33 | 63 | 63 (100%) |
| Year 2 | 8 | 26 | 33 | 30 | 69 | 69 (100%) |
| **Year 3** | **10** | **60** | **0** | **24** | **24** | Pending |
| **Year 4** | **13** | **68** | **0** | **6** | **6** | **6** |
| **Year 5** | **10** | **62** | **0** | **0** | **0** | Pending |
| **Year 6** | **11** | **66** | **0** | **0** | **0** | Pending |
| **Total** | **60** | **310** | **96** | **96** | **198** | **174** |

**Current Focus:** Year 3 Worksheet Population (56 subtopics × 6 worksheets = 336 worksheets remaining)

### Year 3 Comprehensive Update (December 2024)

**Research-backed restructuring:**
- Increased from 31 → **60 subtopics** (94% increase)
- Split Measurement into: Length/Perimeter, Mass/Capacity, Money, Time
- Added dedicated Fractions subtopic: `fractions-of-amounts`
- Expanded Time from 3 → 6 subtopics (Roman numerals, time conversions)
- Expanded Geometry from 5 → 8 subtopics (drawing, making 3D, angles as turns)
- Added word problems and missing number problems to Addition/Subtraction

**Sources:**
- [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)
- [NCETM Year 3 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-3-curriculum-map/)
- [White Rose Maths Year 3](https://thirdspacelearning.com/blog/white-rose-maths-year-3/)
- [Twinkl Year 3 Curriculum](https://www.twinkl.co.uk/teaching-wiki/national-curriculum-for-maths-for-year-3)

### Year 4 Comprehensive Update (December 2024)

**Research-backed restructuring:**
- Increased from 38 → **68 subtopics** (80% increase)
- Split Fractions and Decimals into separate topics
- Added dedicated Money, Length/Perimeter, Area, Mass/Capacity topics
- **13 multiplication/division subtopics** for MTC focus
- Added 30 NEW subtopics based on NCETM, White Rose, and official curriculum

**Sources:**
- [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)
- [NCETM Year 4 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-4-curriculum-map/)
- [White Rose Maths Year 4](https://thirdspacelearning.com/blog/white-rose-maths-year-4/)
- [MTC Guidance](https://www.gov.uk/government/collections/multiplication-tables-check)

### Year 5 Comprehensive Update (December 2024)

**Research-backed restructuring:**
- Comprehensive **62 subtopics** across 10 topics
- **Multiplication/Division:** 12 subtopics (square/cube numbers, formal methods, multi-step)
- **Fractions:** 8 subtopics (improper fractions, adding/subtracting same denominator, multiplying)
- **Decimals:** 7 subtopics (thousandths, rounding, decimal-fraction equivalence)
- **NEW Percentages topic:** 3 subtopics (link to fractions/decimals, common equivalents)
- **Measurement:** 8 subtopics (metric conversions, imperial units, volume, perimeter/area)
- **Geometry-Shapes:** 8 subtopics (3D properties, angles, reflection/translation)

**Key Year 5 Skills:**
- Formal written methods for all operations (including long division)
- Mental calculation strategies for large numbers
- Understanding decimals to 3 places
- Fraction-decimal-percentage equivalence
- Area and perimeter of irregular shapes

**Sources:**
- [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)
- [NCETM Year 5 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-5-curriculum-map/)
- [White Rose Maths Year 5](https://thirdspacelearning.com/blog/white-rose-maths-year-5/)

### Year 6 Comprehensive Update (December 2024)

**Research-backed restructuring (SATs Focus):**
- Comprehensive **66 subtopics** across 11 topics
- **Four Operations:** 11 subtopics (BIDMAS, multi-step problems, estimation)
- **Fractions:** 8 subtopics (all operations with mixed numbers, FDP conversion)
- **NEW Ratio & Proportion topic:** 6 subtopics (scaling, percentages, unequal sharing)
- **NEW Algebra topic:** 6 subtopics (expressions, equations, sequences, formulae)
- **Geometry-Shapes:** 9 subtopics (circle properties, nets, angle rules, coordinates)

**SATs Focus Areas (2024 Analysis):**
- 35% Calculations (four operations, multi-step)
- 26% Fractions, Decimals, Percentages
- 10% Number (place value, rounding)
- 8% Measurement
- 8% Geometry
- 7% Algebra
- 6% Ratio/Proportion

**Key Year 6 Skills:**
- Long division with remainders as fractions/decimals
- All fraction operations including division
- Percentage increase/decrease problems
- Simple algebraic equations
- Area/volume of complex shapes
- Angle sum rules (triangles, quadrilaterals, around a point)

**Sources:**
- [Gov.uk National Curriculum](https://www.gov.uk/government/publications/national-curriculum-in-england-mathematics-programmes-of-study)
- [NCETM Year 6 Curriculum Map](https://www.ncetm.org.uk/classroom-resources/cp-year-6-curriculum-map/)
- [White Rose Maths Year 6](https://thirdspacelearning.com/blog/white-rose-maths-year-6/)
- [KS2 SATs 2024 Analysis](https://thirdspacelearning.com/blog/ks2-sats-papers-2024-maths-question-breakdown/)

### Worksheet Generation Status

| Year Group | Status | Next Steps |
|------------|--------|------------|
| Reception | ✅ Complete (36 WS, 100% tested) | Maintain quality |
| Year 1 | ✅ Complete (63 WS, 100% tested) | Maintain quality |
| Year 2 | ✅ Complete (69 WS, 100% tested) | Maintain quality |
| **Year 3** | **🟣 In Progress (24 WS = 4 subtopics)** | **56 subtopics × 6 WS each = 336 remaining. Priority: place value, addition, times tables** |
| **Year 4** | **🟣 In Progress (6 WS = 1 subtopic)** | **67 subtopics × 6 WS each = 402 remaining. MTC priority: times-tables, factor-pairs** |
| **Year 5** | **🟣 In Progress (0 WS = 0 subtopics)** | **62 subtopics × 6 WS each = 372 target. Started Dec 2024. Priority: formal methods, FDP** |
| **Year 6** | **⬜ Not Started** | **66 subtopics × 6 WS each = 396 target. SATs priority: calculations, FDP, algebra** |

### Test Coverage Analysis
Run `node scripts/analyze-test-coverage.js` to verify:
- **Existing Layout:** 198 worksheets across Reception, Y1, Y2
- **New 6-Worksheet Target:**
  - Year 3: 60 subtopics × 6 WS = 360 target (24 complete = 7%)
  - Year 4: 68 subtopics × 6 WS = 408 target (6 complete = 1%)
  - Year 5: 62 subtopics × 6 WS = 372 target (0 complete = 0%)
  - Year 6: 66 subtopics × 6 WS = 396 target (0 complete = 0%)
- **Total Target:** 198 existing + 1,536 new = 1,734 worksheets

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
| 2025-12-16 | ALL | Multiple | Both | **100% TEST COVERAGE** | Created 29 missing E2E tests. Final: 168 worksheets, 168 tests, 100% coverage. |

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
✅ Phase 0: Research documented (curriculum, competitors, misconceptions)
✅ Phase 1: Layout designed for year group (age-appropriate)
✅ Phase 2: Prompt created from scratch (with all key learnings applied)
✅ Phase 3: Test worksheet validated (extraction + interactive 100%)
✅ Phase 4a: 6 worksheets generated (2 Foundation + 4 Practice)
    - 2 Foundation (⭐ Easy): For struggling learners, heavy scaffolding
    - 4 Practice (⭐⭐ Average): For 80-90% mainstream learners
✅ Phase 4b: All 6 visually approved (unique questions, correct difficulty)
✅ Phase 4c: All 6 saved to library with SEO metadata
✅ Phase 4d: All 6 pass interactive tests (100% score)
✅ Phase 4e: Quality gate checklist completed
```

**Total per subtopic:** 6 worksheets × 5 questions = 30 unique questions

**Worksheet Quality Indicators:**
- Teachers would want to download/print ALL 6 for classroom differentiation
- Foundation worksheets provide accessible entry for struggling learners
- Practice worksheets appropriate for 80-90% of mainstream learners
- Variety achieved through different contexts, themes, and formats
- Answers are unambiguous across all worksheets
- Interactive mode works flawlessly for all 6
- Visual design is clean and age-appropriate
- Questions are genuinely different (not just number swaps)

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

### Learning 9: Exactly 6 Worksheets Per Subtopic (Differentiated)

**Solution:** Generate exactly **6 worksheets per subtopic** with research-backed differentiation:

| # | Worksheet Type | Difficulty | Focus | Target User |
|---|----------------|------------|-------|-------------|
| **1** | Foundation A | ⭐ Easy | Heavy scaffolding, simple numbers | SEN, struggling learners |
| **2** | Foundation B | ⭐ Easy | Alternative approach, same level | Reinforcement |
| **3** | Practice A | ⭐⭐ Average | Standard curriculum difficulty | Typical classroom |
| **4** | Practice B | ⭐⭐ Average | Real-world contexts, word problems | Homework |
| **5** | Challenge A | ⭐⭐⭐ Hard | Multi-step, larger numbers | Higher ability |
| **6** | Challenge B | ⭐⭐⭐ Hard | Problem-solving, open-ended | Gifted & Talented |

**Total per subtopic:** 6 worksheets (30 unique questions)

**Why 6 instead of 3?**
- **Better differentiation:** Teachers need worksheets for ALL ability levels
- **SEN support:** Foundation worksheets provide accessible entry points
- **No ceiling effect:** Challenge worksheets extend higher achievers
- **More variety:** Prevents worksheet fatigue in classroom
- **Professional quality:** Matches commercial worksheet packs (typically 4-8 per topic)

**Requirements:**
- ALL 5 questions must be UNIQUE across all 6 worksheets
- Same learning objectives, varied difficulty and format
- Clear difficulty progression (Foundation → Practice → Challenge)
- Teachers would want ALL 6 for complete differentiation
- Interactive tests MUST pass 100% for all 6

### Learning 10: All 6 Worksheets Must Be Genuinely Unique

**Problem:** When creating multiple worksheets, questions were nearly identical - only numbers changed. This provides repetitive experience.

**Solution:** All 6 worksheets MUST have genuinely different questions with difficulty progression:

| Question | Foundation A/B | Practice A/B | Challenge A/B |
|----------|----------------|--------------|---------------|
| **Q1 (Fluency)** | Simple visual counting, heavy scaffolding | Standard format, balanced visual/abstract | Abstract, larger numbers |
| **Q2 (Grid)** | 2×3 grid, single-digit, visual support | 2×3 grid, two-digit or mixed | 3×3 grid, multi-digit, inverse operations |
| **Q3 (Application)** | Simple scene, one-step | Real-world context, one-step | Multi-step problem |
| **Q4 (Word Problem)** | Short sentence, single operation | Full paragraph, clear operation | Multi-sentence, choose operation |
| **Q5 (Reasoning)** | "True or False?" with guidance | "Spot the error" | "Always/Sometimes/Never" + explain |

**Differentiation Examples (Year 3 Addition):**

| Level | Q1 Example | Numbers Used |
|-------|------------|--------------|
| Foundation | "Add: 125 + 34 = ___" (with base-10 blocks shown) | 2-digit + 2-digit, no regrouping |
| Practice | "Complete: 347 + ___ = 582" (bar model shown) | 3-digit, some regrouping |
| Challenge | "Find two 3-digit numbers that add to exactly 1000" | Open-ended, multiple solutions |

**Rules:**
1. Same learning objective, DIFFERENT difficulty and format
2. No copy-paste between ANY of the 6 worksheets
3. Foundation: More visuals, simpler language, smaller numbers
4. Practice: Standard curriculum expectations
5. Challenge: Extended reasoning, open-ended where possible
6. Teacher should want ALL 6 worksheets for complete differentiation

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

### Learning 16: The 1:1 Rule - Every Worksheet Needs a Test

**Problem:** After creating many worksheets, we discovered 109 worksheets had no E2E tests (only 35% coverage initially).

**Root Cause:** Tests were created inconsistently - some subtopics had tests, others didn't. No tracking system enforced test creation.

**Solution:** Implement the **1:1 Rule**:

| Metric | Requirement |
|--------|-------------|
| Worksheets in DB | N |
| E2E Test Cases | N |
| Coverage | 100% |

**Workflow enforcement:**
```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
(Generate)  (Approve)   (Save)    (TEST)   (VERIFY)
                                   ↓         ↓
                          Create test   Run coverage
                          Pass 100%     Confirm 100%
```

**A subtopic is NOT complete until:**
- [ ] All 6 worksheets saved to library (2 Foundation + 4 Practice)
- [ ] All 6 have dedicated E2E test cases
- [ ] All 6 tests achieve 100% score
- [ ] Coverage analysis shows 100%

### Learning 17: 6 Worksheets Per Subtopic (2 Foundation + 4 Practice)

**Discovery:** Each subtopic requires 6 worksheets targeting mainstream learners:

| Difficulty Level | Worksheets | Target Users | Test Pattern |
|-----------------|------------|--------------|--------------|
| Foundation | 2 (1, 2) | Struggling learners, SEN support | `{subtopic}-foundation-{1,2}.spec.ts` |
| Practice | 4 (1-4) | 80-90% mainstream learners | `{subtopic}-practice-{1-4}.spec.ts` |
| **Total** | **6** | Mainstream + struggling | 6 test cases |

**Key insight:** No Challenge level - focus is on mainstream population:
- **Foundation 1-2 (⭐ Easy):** Heavy scaffolding, simple visuals, accessible entry points
- **Practice 1-4 (⭐⭐ Average):** Standard curriculum difficulty, varied contexts and formats

**Rationale:**
- Focus on 80-90% of mainstream learners (not gifted/higher ability extension)
- Foundation provides support for struggling learners without being too easy
- Extra practice worksheets (3-4) for reinforcement, not increased difficulty

**Impact on test coverage:**
```
60 Year 3 subtopics × 6 worksheets = 360 worksheets
68 Year 4 subtopics × 6 worksheets = 408 worksheets
Total new worksheets needed: 768 (Year 3 + Year 4)
```

### Learning 18: Test Coverage Analysis Script

**Tool:** `node scripts/analyze-test-coverage.js`

**What it does:**
1. Queries database for all worksheet slugs
2. Scans test files for `WORKSHEET_SLUG` constants
3. Identifies gaps (untested worksheets)
4. Generates JSON report

**Output:**
```
WORKSHEET & E2E TEST COVERAGE ANALYSIS
======================================================================

SUMMARY
Total worksheets in library: 168
Total unique slugs tested: 168
Coverage gap: 0 worksheets missing tests

BY LAYOUT TYPE

Standard Layout
  Worksheets: 96
  With tests: 96
  Missing tests: 0

Mixed Layout
  Worksheets: 66
  With tests: 66
  Missing tests: 0
```

**Run after every worksheet batch to verify coverage.**

### Learning 19: Test File Naming Conventions

**Consistent naming helps with coverage analysis:**

| Scenario | File Name | WORKSHEET_SLUG Format |
|----------|-----------|----------------------|
| Standard layout v1 | `{subtopic}.spec.ts` | `{topic}-{subtopic}` |
| Standard layout v2+ | `{subtopic}-v{N}.spec.ts` | `{topic}-{subtopic}-v{N}` |
| Mixed layout (3 tests) | `{subtopic}-all.spec.ts` | Multiple slugs in one file |
| Single mixed test | `{subtopic}-mixed.spec.ts` | `{subtopic}-{variant}` |

**Test file structure:**
```typescript
// CRITICAL: This constant is used by coverage analysis
const WORKSHEET_SLUG = 'exact-slug-from-database'
const WORKSHEET_ANSWERS = ["answer1", "answer2", ...]

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    // ... fill answers and verify 100%
  })
})
```

**The coverage script looks for:**
- `WORKSHEET_SLUG = 'slug'` constant definitions
- `page.goto('/library/slug/interactive')` patterns

### Learning 20: Handling Worksheet Versions with Timestamps

**Problem:** Some worksheets have timestamp suffixes:
- `time-days-and-months-foundation-vfoundation` (original)
- `time-days-and-months-foundation-vfoundation-251216-174736` (with timestamp)

**These are DIFFERENT worksheets** - not duplicates:
- Different HTML content
- Different answer keys
- Both need separate E2E tests

**Solution:** Create separate test files for each:
```
time-days-months-foundation-mixed.spec.ts  → tests non-timestamped version
time-days-months-foundation-251216.spec.ts → tests timestamped version
```

**Best practice:** Avoid creating duplicate worksheets with different timestamps. If content is updated, delete the old version and keep only the new one.

---

## Pilot Results: Year 1 2D Shapes Basic

| Metric | Result |
|--------|--------|
| Phases 0-3 | ✅ Completed |
| Phase 4 (Production) | ✅ 3 unique worksheets, all 100% |
| Iterations | 4 (v1: too many, v2: spacey layout, v3: compact but too tight, v4: BALANCED SUCCESS) |
| Key Learnings | 20 documented (1-15 from pilot, 16-20 from test coverage work) |

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
