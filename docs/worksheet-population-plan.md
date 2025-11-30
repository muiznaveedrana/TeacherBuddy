# Worksheet Population Plan

## Overview
Populate the free-printables section with 3 worksheets per subtopic for all enabled year groups.
Each worksheet has unique questions and images.

## Targets
- **Year Groups:** Reception, Year 1, Year 2 (enabled in system)
- **Worksheets per subtopic:** 3 (with different questions/images each)
- **Interactive mode suitability:** Primary design criterion

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

### Step 0b: Research Best Practices
Claude will research:
- Top-rated worksheets from Teachers Pay Teachers (free + paid)
- Education.com examples
- Twinkl samples
- Other highly-rated educational resources

Focus areas:
- Question variety and engagement
- Age-appropriate difficulty
- Visual layout best practices
- Interactive suitability

### Step 0c: Suggest Improvements
Claude presents a **diff comparison** showing:
- Current prompt content
- Proposed changes with rationale
- How changes improve interactive mode suitability

### Step 0d: Approval & Update
- User reviews and approves/requests changes
- Claude updates the prompt file in codebase
- Move to Phase 1 (Generation)

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

### Step 1c: Generate Worksheet

Generate following:
1. Prompt's structure and formatting requirements
2. User's theme selection
3. Save to `public/preview-worksheet.html`
4. Provide localhost link: `http://localhost:3000/preview-worksheet.html`

---

## Phase 2: Screenshot & Batch Approval

Claude creates all 3 worksheets for a subtopic, then opens all 3 screenshots for review.

### Workflow:
1. Generate all 3 worksheets (`preview-worksheet-1.html`, `-2.html`, `-3.html`)
2. Take screenshots:
   ```powershell
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 1
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 2
   node M:\ClaudeCodeProjects\worksheetgenerator-ai\scripts\take-screenshot.js 3
   ```
3. Open all 3 screenshots for review:
   ```powershell
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-1.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-2.png"
   Start-Process "M:\ClaudeCodeProjects\worksheetgenerator-ai\public\preview-screenshot-3.png"
   ```
4. **Wait for user approval of ALL 3**
5. If changes requested → edit specific worksheet(s) → re-screenshot → repeat
6. Only proceed to Phase 3 when user explicitly approves all 3

---

## Phase 3: Save to Library

After user approves all 3 worksheets:

```powershell
cd M:\ClaudeCodeProjects\worksheetgenerator-ai

# Save each worksheet
node scripts/save-worksheet.js public/preview-worksheet-1.html "{YearGroup}" {topic} {subtopic} average 5
node scripts/save-worksheet.js public/preview-worksheet-2.html "{YearGroup}" {topic} {subtopic} average 5
node scripts/save-worksheet.js public/preview-worksheet-3.html "{YearGroup}" {topic} {subtopic} average 5
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
- Unique slug with auto-versioning

---

## Phase 4: Verify

1. **Library:** `http://localhost:3000/library` - Card appears
2. **Free Printables:** `http://localhost:3000/free-printables/{year}/{topic}/{subtopic}` - Shows in list
3. **Interactive Mode:** Click card → Test interactive toggle

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
| more-or-less | `reception\number-counting\more-or-less-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| early-addition | `reception\number-counting\early-addition-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| early-subtraction | `reception\number-counting\early-subtraction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| number-bonds | `reception\number-counting\number-bonds-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| subitising | `reception\number-counting\subitising-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |

#### Shape and Space (4 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| basic-shapes | `reception\shape-space\basic-shapes-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| patterns | `reception\shape-space\patterns-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| size-comparison | `reception\shape-space\size-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| position-direction | `reception\shape-space\position-direction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Measurement (4 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| length-comparison | `reception\measurement\length-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| weight-comparison | `reception\measurement\weight-comparison-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| capacity | `reception\measurement\capacity-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| time-concepts | `reception\measurement\time-concepts-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

---

### Year 1 (Ages 5-6) — 14 subtopics = 42 worksheets

#### Number and Place Value (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| numbers-to-20 | `year1\number-place-value\numbers-to-20-COMPRESSED.md` | ✅ | ✅ | ✅ | ✅ |
| counting-forwards-backwards | `year1\number-place-value\counting-forwards-backwards-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| number-bonds-10 | `year1\number-place-value\number-bonds-10-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

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

### Year 2 (Ages 6-7) — 24 subtopics = 72 worksheets

#### Number and Place Value (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| numbers-to-100 | `year2\number-place-value\numbers-to-100-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| comparing-numbers | `year2\number-place-value\comparing-numbers-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| rounding-nearest-10 | `year2\number-place-value\rounding-nearest-10-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Addition and Subtraction (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| two-digit-numbers | `year2\addition-subtraction\two-digit-numbers-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| mental-strategies | `year2\addition-subtraction\mental-strategies-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| word-problems | `year2\addition-subtraction\word-problems-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

#### Multiplication and Division (3 subtopics)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| times-tables-2-5-10 | `year2\multiplication-division\times-tables-2-5-10-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| equal-groups | `year2\multiplication-division\equal-groups-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |
| sharing-grouping | `year2\multiplication-division\sharing-grouping-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

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

#### Geometry: Position and Direction (1 subtopic)

| Subtopic | Prompt File | Prompt Refined | WS 1 | WS 2 | WS 3 |
|----------|-------------|----------------|------|------|------|
| position-direction | `year2\geometry-position\position-direction-COMPRESSED.md` | ⬜ | ⬜ | ⬜ | ⬜ |

---

## Progress Summary

| Year Group | Subtopics | Worksheets Target | Completed | Progress |
|------------|-----------|-------------------|-----------|----------|
| Reception | 15 | 45 | 18 | 40% |
| Year 1 | 14 | 42 | 3 | 7% |
| Year 2 | 24 | 72 | 0 | 0% |
| **Total** | **53** | **159** | **21** | **13%** |

---

## Session Log

| Date | Year | Subtopic | Action | Notes |
|------|------|----------|--------|-------|
| 2025-11-29 | Reception | counting-to-10 | Worksheets generated | 3 worksheets, mixed objects theme |
| 2025-11-29 | Reception | number-recognition | Worksheets generated | 3 worksheets |
| 2025-11-29 | - | - | Bug fix | Fixed region filter - library now shows all worksheets |
| 2025-11-29 | Reception | early-addition | Worksheets generated | 3 worksheets (Farm, Garden, Toys themes). Fixed prompt: added + sign to Q4, updated CSS gap to 15px, + sign to 35pt. Removed pig from objects list. |
| 2025-11-29 | Reception | early-subtraction | Worksheets generated | 3 worksheets (Ocean, Food, Adventure themes). Fixed prompt: updated crossed-item CSS to use wrapper div with ✕ mark overlay. Added new images: crab, dolphin, turtle, owl, penguin, rabbit, robot, rocket, truck. |

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

## Subtopic Tiers (Speed Classification)

### Tier Definitions

| Tier | Description | Phase 0 Approach | Est. Time/Subtopic |
|------|-------------|------------------|-------------------|
| **Tier 1** | Already interactive-friendly, simple numeric/letter answers | Skip research, quick review only | 5 min |
| **Tier 2** | Needs moderate refinement, some patterns to adapt | Light research, apply templates | 15 min |
| **Tier 3** | Complex, image-heavy, or problematic for interactive | Full research & refinement | 30+ min |

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

### Year 1 (14 subtopics)

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

**Year 1 Summary:** 6 Tier 1, 5 Tier 2, 2 Tier 3

---

### Year 2 (24 subtopics)

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

**Year 2 Summary:** 6 Tier 1, 9 Tier 2, 9 Tier 3

---

## Overall Summary

| Tier | Count | % of Total | Est. Total Time |
|------|-------|------------|-----------------|
| Done | 2 | 4% | - |
| Tier 1 | 17 | 32% | ~1.5 hours |
| Tier 2 | 20 | 38% | ~5 hours |
| Tier 3 | 14 | 26% | ~7+ hours |
| **Total** | **53** | 100% | ~13.5 hours |

## Recommended Processing Order

### Phase A: Blast through Tier 1 (17 subtopics)
Quick review, minimal refinement, generate worksheets rapidly.

**Reception Tier 1:** early-addition, early-subtraction, number-bonds, subitising (4)
**Year 1 Tier 1:** numbers-to-20, counting-forwards-backwards, number-bonds-10, adding-to-20, subtracting-within-20 (5)
**Year 2 Tier 1:** numbers-to-100, comparing-numbers, rounding-nearest-10, two-digit-numbers, times-tables-2-5-10, equal-groups (6)

### Phase B: Template-based Tier 2 (20 subtopics)
Apply proven patterns from Tier 1, moderate refinement.

### Phase C: Deep-dive Tier 3 (14 subtopics)
Full research, significant prompt redesign for interactive compatibility.

---


## Processing Queue (Ordered Checklist)

### Phase A: Tier 1 - Quick Processing (17 subtopics)

| # | Year | Subtopic | Prompt Review | WS 1 | WS 2 | WS 3 | Status |
|---|------|----------|---------------|------|------|------|--------|
| 1 | Reception | early-addition | ✅ | ✅ | ✅ | ✅ | Done |
| 2 | Reception | early-subtraction | ✅ | ✅ | ✅ | ✅ | Done |
| 3 | Reception | number-bonds | ✅ | ✅ | ✅ | ✅ | Done |
| 4 | Reception | subitising | ✅ | ✅ | ✅ | ✅ | Done |
| 5 | Year 1 | numbers-to-20 | ✅ | ✅ | ✅ | ✅ | Done |
| 6 | Year 1 | counting-forwards-backwards | ⬜ | ⬜ | ⬜ | ⬜ | **NEXT** |
| 7 | Year 1 | number-bonds-10 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 8 | Year 1 | adding-to-20 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 9 | Year 1 | subtracting-within-20 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 10 | Year 2 | numbers-to-100 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 11 | Year 2 | comparing-numbers | ⬜ | ⬜ | ⬜ | ⬜ | |
| 12 | Year 2 | rounding-nearest-10 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 13 | Year 2 | two-digit-numbers | ⬜ | ⬜ | ⬜ | ⬜ | |
| 14 | Year 2 | times-tables-2-5-10 | ⬜ | ⬜ | ⬜ | ⬜ | |
| 15 | Year 2 | equal-groups | ⬜ | ⬜ | ⬜ | ⬜ | |

**Phase A Target:** 51 worksheets (17 × 3)

---

### Phase B: Tier 2 - Template-Based (20 subtopics)

| # | Year | Subtopic | Prompt Review | WS 1 | WS 2 | WS 3 | Status |
|---|------|----------|---------------|------|------|------|--------|
| 16 | Reception | more-or-less | ⬜ | ⬜ | ⬜ | ⬜ | |
| 17 | Reception | basic-shapes | ⬜ | ⬜ | ⬜ | ⬜ | |
| 18 | Reception | size-comparison | ⬜ | ⬜ | ⬜ | ⬜ | |
| 19 | Reception | length-comparison | ⬜ | ⬜ | ⬜ | ⬜ | |
| 20 | Reception | weight-comparison | ⬜ | ⬜ | ⬜ | ⬜ | |
| 21 | Reception | capacity | ⬜ | ⬜ | ⬜ | ⬜ | |
| 22 | Year 1 | word-problems-simple | ⬜ | ⬜ | ⬜ | ⬜ | |
| 23 | Year 1 | length-height | ⬜ | ⬜ | ⬜ | ⬜ | |
| 24 | Year 1 | weight-capacity | ⬜ | ⬜ | ⬜ | ⬜ | |
| 25 | Year 1 | time-days-months | ⬜ | ⬜ | ⬜ | ⬜ | |
| 26 | Year 1 | 2d-shapes-basic | ⬜ | ⬜ | ⬜ | ⬜ | |
| 27 | Year 1 | 3d-shapes-basic | ⬜ | ⬜ | ⬜ | ⬜ | |
| 28 | Year 2 | mental-strategies | ⬜ | ⬜ | ⬜ | ⬜ | |
| 29 | Year 2 | word-problems | ⬜ | ⬜ | ⬜ | ⬜ | |
| 30 | Year 2 | sharing-grouping | ⬜ | ⬜ | ⬜ | ⬜ | |
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

**Phase C Target:** 42 worksheets (14 × 3)

---

## Grand Total

| Phase | Subtopics | Worksheets | Status |
|-------|-----------|------------|--------|
| Done | 7 | 21 | ✅ |
| Phase A (Tier 1) | 10 | 30 | ⬜ |
| Phase B (Tier 2) | 20 | 60 | ⬜ |
| Phase C (Tier 3) | 14 | 42 | ⬜ |
| **Total** | **51** | **153** | **21/153 (14%)** |

---
