# AUTONOMOUS PROMPT ENGINEER V2.0
## Research-Driven Prompt Engineering for Stable, High-Quality Worksheets

**Version:** 2.0
**Purpose:** Complete guide for autonomous prompt engineering with visual reference library
**Audience:** Claude Code (AI Agent) with human collaboration checkpoints
**Scope:** All year groups (Reception - Year 6)

---

## 🎯 MISSION

Engineer **visually-grounded, research-driven worksheet prompts** that consistently achieve 95%+ quality scores through:
1. **Deep market research** of professional educational resources
2. **Visual reference library** of exemplar worksheets and printables
3. **Few-shot learning** with curated visual examples
4. **Configuration-specific prompts** (isolated, no master template)
5. **Multi-model testing** (Gemini 2.5 Flash vs Gemini 2.5 Pro)
6. **Rigorous automated testing** with strict vision assessment

---

## 📋 CORE PRINCIPLES

### 1. Visual-First Research
- **Collect before creating**: Gather 5-10 exemplar worksheets from market leaders
- **Build visual reference library**: Store all research materials in organized folders
- **Show, don't tell**: Let LLM see actual examples, not descriptions
- **Pattern recognition**: LLM learns from visual examples, not abstract instructions

### 2. Prompt Engineering Best Practices (2025)

Based on latest research from Lakera, PromptHub, and DeepLearning.AI:

#### Self-Consistency Prompting
- Generate multiple reasoning paths for complex questions
- Use explicit step-by-step instructions for LLM
- Validate outputs against golden references

#### Structured Formatting
- **Critical**: Clear structure > clever wording
- Use consistent delimiters (XML-style tags for Gemini)
- Provide exact output format expectations
- Constrain responses to prevent drift

#### Few-Shot Learning with Visual Examples
- **3-5 visual examples optimal** for pattern recognition
- Show actual worksheet screenshots in prompt context
- Maintain format consistency across examples
- Label space and distribution matter (random labels > no examples)

#### Output Anchoring
- Begin LLM responses with predefined HTML structure
- Control how answer starts to reduce randomness
- Use template prefilling for consistency

#### Model-Specific Optimization
- **Gemini 2.5 Flash**: Fast, cost-effective ($0.075/M tokens), hierarchical markdown
- **Gemini 2.5 Pro**: Higher quality ($1.25/M input, $10/M output), better UI/layout, excels with reference images
- Test BOTH models per configuration to identify quality/cost sweet spot

### 3. Configuration Isolation
- **NO master templates** - each config gets unique prompt
- **YES to value injection** - dynamic variables from code
- **Embrace repetition** - clarity > DRY principle
- **Maintainability** - easier to debug isolated prompts

### 4. Research Library Organization
```
./research-library/
├── {yearGroup}-{topic}-{subtopic}/
│   ├── exemplars/
│   │   ├── twinkl-001.png          # Market leader examples
│   │   ├── whiterose-002.png
│   │   ├── manual-add-003.jpg      # Human-added examples
│   │   └── teachstarter-004.png
│   ├── analysis/
│   │   ├── visual-patterns.md      # Identified design patterns
│   │   ├── layout-analysis.json    # Structured data
│   │   └── best-practices.md       # Key takeaways
│   └── metadata.json               # Research session info
```

---

## 🔄 AUTONOMOUS WORKFLOW (6 PHASES)

### PHASE 1: TARGETED RESEARCH & VISUAL LIBRARY (5-10 minutes)

**Goal**: Quickly gather 2-3 high-quality exemplar worksheets for visual reference

#### Step 1.1: Quick Web Research (3-5 min)
```javascript
const researchSources = [
  'https://www.twinkl.co.uk/search?q={yearGroup}+{topic}',
  'https://www.teachstarter.com/gb/',
  'https://whiterosemaths.com/'
];
```

**Streamlined Process:**
1. Search **TOP 2 sources only** (Twinkl + one other)
2. Grab **2-3 best exemplars** total (not per source)
3. Quick visual scan for quality patterns
4. Optional: Save to `./research-library/{config}/exemplars/` if valuable for future reference

**Quality Criteria (Quick Check):**
- Clear, age-appropriate design
- Good visual hierarchy
- Curriculum-aligned content

#### Step 1.2: Quick Pattern Analysis (2-3 min)

**Simplified Analysis** (just note key observations):

```markdown
## Key Patterns Identified

**Layout**: [Grid/Linear/Mixed]
**Visual Density**: [High/Medium/Low] - ~{X} images per question
**Typography**: Child-friendly fonts, {size}pt headings
**Color Use**: [Describe if distinctive]
**Special Features**: Mascot/badges/progress tracker/etc.

**Top 3 Patterns to Replicate**:
1. {Pattern 1}
2. {Pattern 2}
3. {Pattern 3}
```

#### Step 1.3: Quick Curriculum Check (2-3 min)

**Quick reference check:**
- What should Year X students know? (NC requirement)
- Age-appropriate language level
- Visual vs. text balance for this age group
- Task complexity (1-step, 2-step, etc.)

**Optional**: Document if complex curriculum rules apply (like "Basic Shapes ONLY circles/squares/triangles/rectangles for Reception")

#### Step 1.4: Image Asset Check (Optional - 2 min)

**Quick check** - What images are needed?
- List essential images only (e.g., `/images/numbers/1.png` to `/images/numbers/100.png` for Numbers to 100)
- Note if images already exist in `/public/images/`
- Flag if new images needed

#### ✋ CHECKPOINT 1: QUICK RESEARCH REVIEW (Human Approval - 2 min)

**Claude Code presents:**

1. **Quick Summary**
   - "Found 2-3 good exemplar worksheets"
   - Key patterns identified (layout, visual density, special features)

2. **Image Status**
   - Images needed: {list}
   - Images available: {list}
   - Action needed: {if any}

3. **Next Steps**
   - "Proceed to prompt creation?"
   - "Test with Gemini 2.5 Flash, Pro, or both?"

**Human Response:**
- ✅ "Go ahead" / "Approved" / "Continue"
- 📝 "Change: {specific feedback}"

---

### PHASE 2: IMAGE PREPARATION & VERIFICATION (Variable Time)

**Two Paths:**

#### Path A: Human Creates Images (Recommended for Production)

1. **Claude Code generates detailed image briefs**
   ```markdown
   ## Image Brief: 2d-circle.png

   **Specifications:**
   - Size: 60x60px @2x (120x120px export)
   - Format: PNG with transparency
   - Style: Flat vector, solid fill
   - Color: Primary blue #4169E1
   - Stroke: 2px darker blue outline #2C4A8C
   - Background: Transparent
   - Padding: 5px internal (50px circle diameter)

   **Visual Reference:**
   {Attach screenshot from exemplar showing similar style}

   **Usage Context:**
   - Appears 15-20 times per worksheet
   - Mixed with other shapes in grids
   - Must be clearly distinguishable at small size
   - Reception (ages 4-5) must recognize instantly

   **Quality Checklist:**
   - [ ] Perfect circle (not oval)
   - [ ] Smooth edges (no pixelation)
   - [ ] Consistent stroke weight
   - [ ] Transparent background (no white box)
   - [ ] Scales cleanly to 30px and 120px
   ```

2. **Human adds images to `/public/images/`**

3. **Claude Code verifies:**
   ```javascript
   async function verifyImageLibrary(manifest) {
     const results = {
       found: [],
       missing: [],
       issues: []
     };

     for (const asset of manifest) {
       const fullPath = path.join(process.cwd(), 'public', asset.path);

       // Check existence
       if (!fs.existsSync(fullPath)) {
         results.missing.push(asset.path);
         continue;
       }

       // Check file size
       const stats = fs.statSync(fullPath);
       if (stats.size > 100000) { // 100KB
         results.issues.push({
           path: asset.path,
           issue: `File too large: ${(stats.size/1024).toFixed(1)}KB (recommend <100KB)`,
           severity: 'warning'
         });
       }

       // Check dimensions (if PNG/JPG)
       if (asset.path.match(/\.(png|jpg|jpeg)$/i)) {
         const dimensions = await getImageDimensions(fullPath);
         const expected = parseSize(asset.size); // "60x60px" -> {w:60,h:60}

         if (Math.abs(dimensions.width - expected.w) > 5 ||
             Math.abs(dimensions.height - expected.h) > 5) {
           results.issues.push({
             path: asset.path,
             issue: `Size mismatch: ${dimensions.width}x${dimensions.height}px (expected ${asset.size})`,
             severity: 'warning'
           });
         }
       }

       results.found.push(asset.path);
     }

     return results;
   }
   ```

4. **Report to human:**
   ```markdown
   ## Image Verification Report

   ✅ **Found (18/20):**
   - /images/2d-circle.png
   - /images/2d-square.png
   - ... (16 more)

   ❌ **Missing (2/20):**
   - /images/mascot/helper-owl-thinking.png
   - /images/achievement/badge-complete.png

   ⚠️ **Issues (3):**
   - /images/2d-heart.png - File too large: 145KB (recommend <100KB)
   - /images/mascot/helper-owl.png - Size 85x85px (expected 80x80px)
   - /images/2d-star.png - No transparency detected

   **Ready to proceed?** {waiting for confirmation}
   ```

#### Path B: Placeholder Paths (For Testing/Development)

1. Document all required image paths in prompt
2. Use clear placeholder comments
3. Add to backlog for image creation
4. Test with missing images (expect some broken visuals)
5. Flag for production: "REQUIRES IMAGES BEFORE DEPLOYMENT"

---

### PHASE 3: PROMPT CREATION (60-90 minutes)

**Goal**: Create configuration-specific prompt with visual few-shot learning

#### Step 3.1: Few-Shot Visual Examples (30 min)

**Prepare visual few-shot learning context:**

```markdown
# FEW-SHOT LEARNING: Visual Examples

You are about to create a "{yearGroup} {topic} - {subtopic}" worksheet.

Before I give you the instructions, study these 3-5 EXEMPLAR WORKSHEETS from professional educators:

## Example 1: Twinkl Premium Resource
{Base64 encoded image OR image URL}

**What makes this excellent:**
- Clear visual hierarchy with 20pt headings
- 3-column grid layout with 40px gaps
- Color-coded question backgrounds (#FFF9C4, #E3F2FD, #F1F8E9)
- Helper owl mascot appears 3 times for guidance
- Each question has 2-3 supporting images
- Achievement stars in header (5 stars, one per question)
- Clean, uncluttered design with 40% white space
- Age-appropriate language (6-8 word sentences)

## Example 2: White Rose Maths
{Base64 encoded image OR image URL}

**What makes this excellent:**
- Progressive difficulty (easy warmup → challenge at end)
- CPA approach: Concrete visuals in Q1-2, Pictorial in Q3-4, Abstract in Q5
- Number line diagrams for scaffolding
- Real-world context (farm animals, toys)
- Clear answer boxes with dotted lines
- Working space provided for each question

## Example 3: Master the Curriculum
{Base64 encoded image OR image URL}

**What makes this excellent:**
- Consistent shape sizing (all shapes 60x60px)
- Grid-based layout for shape sorting
- Bold question numbers in circles
- Simple, direct instructions ("Circle the squares")
- High image-to-text ratio (70% visual, 30% text)

---

## YOUR TASK

Create a similar worksheet that combines the best elements from these examples:
- Use the layout approach from Example 1
- Apply the progressive difficulty from Example 2
- Match the visual clarity from Example 3

**Critical requirements:**
{Specific instructions follow...}
```

**Implementation:**
- Convert exemplar screenshots to base64 for embedding
- OR provide accessible URLs if images hosted
- Gemini 2.5 Pro excels at visual pattern recognition
- 3-5 examples optimal (more can cause confusion)

#### Step 3.2: Structured Prompt Template (40 min)

**NO master template - each config is unique, but follows this STRUCTURE:**

```markdown
# {Year Group}: {Topic} - {Subtopic}

**CONFIGURATION ID**: {configId}
**MODEL TARGET**: Gemini 2.5 {Flash|Pro}
**QUALITY TARGET**: 95/100
**CRITICAL**: Generate EXACTLY {{questionCount}} questions

---

## VISUAL REFERENCE LIBRARY

{Few-shot examples from Step 3.1}

---

## STRICT REQUIREMENTS

### Output Format
**CRITICAL**: Return ONLY valid HTML. No markdown, no explanations, no preamble.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{Year Group} - {Topic}</title>
  <style>
    /* EMBEDDED CSS - No external stylesheets */
    {Full CSS here - see CSS Template section}
  </style>
</head>
<body>
  {Content structure - see below}
</body>
</html>
```

### Question Count
**CRITICAL**: Worksheets must have EXACTLY {{questionCount}} questions.
- If {{questionCount}} = 5, generate 5 questions (not 4, not 6)
- Each question gets unique background color
- Progressive difficulty: Q1 (easiest) → Q{{questionCount}} (hardest)

### Background Colors (MANDATORY)
**CRITICAL**: Each question MUST have a colored background for visual separation.

```css
Q1: #FFF9C4  /* Light Yellow - Warmup */
Q2: #F1F8E9  /* Light Green - Building */
Q3: #E3F2FD  /* Light Blue - Core */
Q4: #FCE4EC  /* Light Pink - Challenge */
Q5: #FFF3E0  /* Light Orange - Achievement */
```

Apply in HTML:
```html
<div class="question" style="background: #FFF9C4;">
  <!-- Q1 content -->
</div>
```

### Image Paths (CRITICAL)
**ALL images MUST use absolute paths starting with /images/**

✅ CORRECT:
```html
<img src="/images/2d-circle.png" alt="Circle" />
<img src="/images/mascot/helper-owl.png" alt="Owl helper" />
```

❌ INCORRECT:
```html
<img src="images/circle.png" alt="Circle" />
<img src="./2d-circle.png" alt="Circle" />
<img src="../images/circle.png" alt="Circle" />
```

### Available Image Assets
**ONLY use images from this approved list:**

```yaml
shapes:
  - /images/2d-circle.png      # 60x60px
  - /images/2d-square.png      # 60x60px
  - /images/2d-triangle.png    # 60x60px
  - /images/2d-rectangle.png   # 60x60px

mascot:
  - /images/mascot/helper-owl-happy.png      # 80x80px
  - /images/mascot/helper-owl-thinking.png   # 80x80px
  - /images/mascot/helper-owl-pointing.png   # 80x80px
  - /images/mascot/helper-owl-celebrating.png # 80x80px

achievement:
  - /images/achievement/star-gold.png        # 40x40px
  - /images/achievement/star-silver.png      # 40x40px
  - /images/achievement/badge-complete.png   # 50x50px
```

**DO NOT** create placeholder text like "Ben's ice cream" - use actual images only.
**DO NOT** use images not in this list - they will appear broken.

---

## EDUCATIONAL REQUIREMENTS

### Curriculum Alignment: {UK National Curriculum Reference}
**Statutory Requirement:**
"{Verbatim from NC document}"

**Assessment Objective:**
"{What pupils should demonstrate}"

### Age Appropriateness: {Year Group} (ages {X-Y})
**Reading Level**: {Reception: Pre-reader | Year 1: CVC words | etc.}
**Sentence Length**: {5-8 words | 8-12 words | etc.} maximum
**Vocabulary**: {Simple/familiar words only | Basic math terms OK | etc.}
**Task Complexity**: {1-step | 2-step with scaffolding | multi-step}

### Cognitive Load
**Reception-Year 2**:
- One instruction per question
- Strong visual support (70-80% images)
- Minimal text

**Year 3-4**:
- Two-step instructions OK with scaffolding
- Balanced visual/text (50-60% images)
- Introduce math vocabulary

**Year 5-6**:
- Multi-step problems with clear structure
- Visual support for complex concepts (30-40% images)
- Standard math terminology

---

## QUESTION STRUCTURE & PROGRESSION

### Q1: WARM-UP (Easiest - 95% Success Rate Target)
**Purpose**: Build confidence, activate prior knowledge
**Difficulty**: Very easy
**Number Range**: {Lowest end of spectrum}
**Visual Support**: Maximum (3-4 images)
**Scaffolding**: Full support

**Example Question Types**:
- {Specific Q1 type for this config}
- {Alternative Q1 type}

**Template:**
```html
<div class="question" style="background: #FFF9C4; padding: 20px; margin: 20px 0; border-radius: 12px;">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="display: inline-block; width: 40px; height: 40px; line-height: 40px; text-align: center; background: #4169E1; color: white; border-radius: 50%; font-weight: bold; font-size: 18pt;">1</span>
    <img src="/images/mascot/helper-owl-pointing.png" width="60" height="60" alt="Owl helper" style="margin-left: auto;" />
  </div>

  <p style="font-size: 16pt; font-weight: 600; margin: 10px 0;">
    {Clear, simple instruction}
  </p>

  <div style="text-align: center; margin: 20px 0;">
    {Visual content - images/diagrams}
  </div>

  <p style="font-size: 15pt; margin: 15px 0;">
    Write your answer: <span style="display: inline-block; border-bottom: 3px solid #333; min-width: 80px; margin: 0 10px;"></span>
  </p>

  <div style="border: 3px dashed #999; border-radius: 8px; padding: 15px; min-height: 60px; background: #FAFAFA; margin: 15px 0; text-align: center; color: #999; font-style: italic;">
    Show your working here
  </div>
</div>
```

### Q2: BUILDING (Easy-Medium - 85% Success Rate)
**Purpose**: Apply concept with light scaffolding
**Difficulty**: Easy-Medium
**Number Range**: {Mid-low range}
**Visual Support**: High (2-3 images)
**Scaffolding**: Moderate support

{Similar structure to Q1, but adapted}

### Q3: CORE (Medium - 75% Success Rate)
**Purpose**: Independent application of concept
**Difficulty**: Medium
**Number Range**: {Mid range}
**Visual Support**: Medium (1-2 images)
**Scaffolding**: Minimal prompting

### Q4: CHALLENGE (Medium-Hard - 65% Success Rate)
**Purpose**: Stretch thinking, apply in new context
**Difficulty**: Medium-Hard
**Number Range**: {High range}
**Visual Support**: Low (0-1 images)
**Scaffolding**: Independent work

### Q5: MASTERY (Hard - 50-60% Success Rate)
**Purpose**: Demonstrate full understanding, real-world application
**Difficulty**: Hard/Application
**Number Range**: {Full range}
**Visual Support**: Context-dependent
**Scaffolding**: Problem-solving mindset

**Special Feature**: Celebration on completion
```html
<div style="text-align: center; margin-top: 20px;">
  <img src="/images/mascot/helper-owl-celebrating.png" width="80" height="80" alt="Well done!" />
  <p style="font-weight: bold; color: #FF9800; font-size: 18pt; margin: 10px 0;">Amazing work! 🌟</p>
</div>
```

---

## CRITICAL CONTENT RULES

### For "Basic Shapes" Subtopic ONLY:
**ALLOWED SHAPES** (Reception EYFS curriculum):
- Circle
- Square
- Triangle
- Rectangle

**FORBIDDEN SHAPES** (too advanced for Reception):
- ❌ Hearts
- ❌ Stars
- ❌ Diamonds
- ❌ Ovals
- ❌ Hexagons
- ❌ Pentagons
- ❌ Any other complex/decorative shapes

**WHY**: UK EYFS statutory framework defines "basic shapes" as circle, square, triangle, rectangle only. Using hearts/stars in a "Basic Shapes" worksheet = curriculum violation = AUTOMATIC FAIL.

**Image paths for basic shapes ONLY:**
- /images/2d-circle.png
- /images/2d-square.png
- /images/2d-triangle.png
- /images/2d-rectangle.png

### For "Patterns" Subtopic:
**CRITICAL**: If question asks "What comes next?" with multiple choice:
1. Identify the pattern (AB, ABB, ABC, AABB, etc.)
2. Determine the correct next item
3. **VERIFY** the correct answer EXISTS in the multiple choice options
4. If correct answer missing from options = unanswerable = FAIL

**Example FAILURE:**
```
Pattern: Star-Diamond-Star-Diamond-?
Correct answer: Star
Options provided: Square, Triangle, Circle
Problem: NO STAR OPTION = Question is UNANSWERABLE
```

**Always include correct answer in options!**

### For "Size Comparison" Questions:
**CRITICAL**: Objects being compared MUST have OBVIOUS visual differences.

**Minimum Requirements:**
- Reception (ages 4-5): 50%+ size difference preferred
- Year 1-2: 30%+ size difference minimum
- Year 3+: 20%+ size difference minimum

**Example FAILURE:**
```html
<p>Which tree is SHORTER?</p>
<img src="/images/tree-a.png" height="100px" /> <!-- Tree A -->
<img src="/images/tree-b.png" height="100px" /> <!-- Tree B -->
```
Problem: IDENTICAL heights = unanswerable = FAIL

**Example SUCCESS:**
```html
<p>Which tree is SHORTER?</p>
<img src="/images/tree-a.png" height="100px" /> <!-- Tree A -->
<img src="/images/tree-b.png" height="160px" /> <!-- Tree B (60% taller) -->
```
Result: Clear visual difference, child can answer by looking.

---

## VISUAL DESIGN STANDARDS

### Typography
```css
body {
  font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', 'Century Gothic', sans-serif;
  font-size: 15pt;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 24pt;
  font-weight: bold;
  color: #2C3E50;
}

.question-text {
  font-size: 16pt;
  font-weight: 600;
  line-height: 1.5;
}

.answer-prompt {
  font-size: 15pt;
  font-weight: normal;
}
```

### Spacing & Layout
```css
.question {
  margin: 20px 0;
  padding: 20px;
  border-radius: 12px;
  border: none;
}

.question-number {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #4169E1;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18pt;
  margin-right: 15px;
}

/* White space: 30-40% of page should be empty for visual breathing room */
```

### Image Sizing
```css
.shape-small {
  width: 40px;
  height: 40px;
}

.shape-medium {
  width: 60px;
  height: 60px;
}

.shape-large {
  width: 100px;
  height: 100px;
}

.mascot-small {
  width: 60px;
  height: 60px;
}

.mascot-large {
  width: 80px;
  height: 80px;
}
```

---

## ANSWER KEY REQUIREMENTS

**CRITICAL**: ALWAYS include a complete answer key on a separate page.

```html
<!-- Page break before answer key -->
<div style="page-break-before: always; margin-top: 40px; padding: 20px; background: #E8F4F8; border: 3px solid #4169E1; border-radius: 12px;">

  <h2 style="text-align: center; color: #2C3E50; margin-bottom: 20px;">🌟 Answer Key 🌟</h2>

  <div style="font-size: 14pt; line-height: 1.8;">
    <p><strong>Question 1:</strong> {Answer} — {Brief explanation/working if needed}</p>
    <p><strong>Question 2:</strong> {Answer} — {Brief explanation/working if needed}</p>
    <p><strong>Question 3:</strong> {Answer} — {Brief explanation/working if needed}</p>
    <p><strong>Question 4:</strong> {Answer} — {Brief explanation/working if needed}</p>
    <p><strong>Question 5:</strong> {Answer} — {Full working shown for complex problem}</p>
  </div>

  <p style="text-align: center; margin-top: 20px; font-style: italic; color: #666; font-size: 13pt;">
    Brilliant work! You're a {topic} superstar! 🎉
  </p>

</div>
```

**Answer Key Checklist:**
- [ ] Separate page (page-break-before: always)
- [ ] All {{questionCount}} answers provided
- [ ] Working shown for complex questions (Q4-Q5)
- [ ] Encouraging final message
- [ ] Answers are CORRECT (verify each one)

---

## VALIDATION CHECKLIST

Before returning HTML, verify:

### Structure
- [ ] Valid HTML5 (DOCTYPE, html, head, body tags)
- [ ] Embedded CSS in <style> tag (no external stylesheets)
- [ ] EXACTLY {{questionCount}} questions
- [ ] Each question has unique background color
- [ ] Progressive difficulty Q1 → Q{{questionCount}}

### Images
- [ ] ALL image paths start with /images/
- [ ] ALL images from approved asset list
- [ ] NO placeholder text instead of images
- [ ] Image sizes appropriate (40-100px for shapes, 60-80px for mascot)
- [ ] Alt text provided for accessibility

### Content
- [ ] Age-appropriate language
- [ ] Curriculum-aligned questions
- [ ] Correct answers in answer key
- [ ] No markdown syntax visible (**text** should render as bold, not show **)
- [ ] Clear, simple instructions

### Visual Quality
- [ ] 30-40% white space (not cramped)
- [ ] Question numbers in colored circles
- [ ] Answer boxes/lines provided
- [ ] Working space for each question
- [ ] Mascot appears 2-3 times minimum

### Critical Rules
- [ ] Basic Shapes: ONLY circle/square/triangle/rectangle (if applicable)
- [ ] Patterns: Correct answer EXISTS in multiple choice (if applicable)
- [ ] Size Comparisons: 30-50%+ visual difference (if applicable)
- [ ] NO broken/missing images

---

## OUTPUT FORMAT

Return ONLY the complete HTML. No explanations, no markdown, no preamble.

Start with:
```html
<!DOCTYPE html>
<html lang="en">
<head>
...
```

End with:
```html
</body>
</html>
```

**DO NOT** include any text before `<!DOCTYPE html>` or after `</html>`.

---

## EXAMPLE OUTPUT STRUCTURE

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{Year Group} - {Topic}</title>
  <style>
    /* Complete embedded CSS */
  </style>
</head>
<body>

  <!-- Header with achievement tracker -->
  <div class="achievement-header">
    <img src="/images/mascot/helper-owl-happy.png" class="mascot-large" alt="Helper Owl">
    <div>
      <h1>{Worksheet Title}</h1>
      <p>Year {X} • {Topic}</p>
    </div>
    <div class="star-tracker">
      <img src="/images/achievement/star-gold.png" class="star" alt="Star">
      <!-- Repeat for {{questionCount}} stars -->
    </div>
  </div>

  <!-- Question 1: Warmup -->
  <div class="question" style="background: #FFF9C4;">
    <!-- Q1 content -->
  </div>

  <!-- Question 2: Building -->
  <div class="question" style="background: #F1F8E9;">
    <!-- Q2 content -->
  </div>

  <!-- Question 3: Core -->
  <div class="question" style="background: #E3F2FD;">
    <!-- Q3 content -->
  </div>

  <!-- Question 4: Challenge -->
  <div class="question" style="background: #FCE4EC;">
    <!-- Q4 content -->
  </div>

  <!-- Question 5: Mastery -->
  <div class="question" style="background: #FFF3E0;">
    <!-- Q5 content with celebration -->
  </div>

  <!-- Answer Key (separate page) -->
  <div style="page-break-before: always; ...">
    <!-- Answer key content -->
  </div>

</body>
</html>
```

---

## RANDOMIZATION & VARIETY

**CRITICAL**: Each worksheet generated should be DIFFERENT.

**Randomize:**
- Question wording (pick from variations)
- Numbers used (within specified ranges)
- Visual arrangements (don't always put circle first)
- Themes/contexts (farm, space, ocean, classroom, etc.)
- Multiple choice option order (shuffle, don't align)
- Image quantities (vary 3-7 objects, not always 5)

**Don't Randomize:**
- Question count (always {{questionCount}})
- Progressive difficulty structure
- Background colors
- Image paths
- Answer key format

---

## FINAL INSTRUCTION

You are now ready to generate a high-quality, print-ready worksheet for {Year Group} {Topic} - {Subtopic}.

Study the visual examples above, follow ALL requirements, and generate ONLY valid HTML output.

Begin generation now.
```

---

### PHASE 4: AUTOMATED TESTING (30-60 minutes)

**Goal**: Generate multiple worksheets with BOTH models, assess quality

#### Step 4.1: Multi-Model Test Strategy

```javascript
const testPlan = {
  configId: 'reception-shape-space-basic-shapes',
  models: [
    { name: 'gemini-2.5-flash', iterations: 5 },
    { name: 'gemini-2.5-pro', iterations: 5 }
  ],
  totalTests: 10
};

async function runMultiModelTest(testPlan) {
  const results = {
    'gemini-2.5-flash': [],
    'gemini-2.5-pro': []
  };

  for (const modelConfig of testPlan.models) {
    console.log(`\n🧪 Testing: ${modelConfig.name}\n`);

    for (let i = 1; i <= modelConfig.iterations; i++) {
      console.log(`  Iteration ${i}/${modelConfig.iterations}...`);

      // Generate worksheet
      const worksheet = await generateWorksheet({
        configId: testPlan.configId,
        model: modelConfig.name,
        promptPath: `./prompts/configurations/${testPlan.configId}.md`
      });

      // Capture screenshot
      const screenshot = await captureScreenshot(worksheet,
        `./test-results/${modelConfig.name}/iteration-${i}.png`
      );

      // Run vision assessment using STRICT criteria
      const assessment = await runStrictVisionAssessment(screenshot, {
        configId: testPlan.configId,
        expectedQuestions: 5,
        strictCriteria: true
      });

      // Store result
      results[modelConfig.name].push({
        iteration: i,
        score: assessment.score,
        passed: assessment.score >= 95,
        issues: assessment.issues,
        screenshot: screenshot,
        generationTime: worksheet.generationTime,
        tokenCount: worksheet.tokenCount,
        cost: calculateCost(modelConfig.name, worksheet.tokenCount)
      });

      console.log(`    Score: ${assessment.score}/100 ${assessment.passed ? '✅' : '❌'}`);
      console.log(`    Cost: $${results[modelConfig.name][i-1].cost.toFixed(4)}`);
      console.log(`    Time: ${worksheet.generationTime}ms`);
    }
  }

  return analyzeMultiModelResults(results);
}

function analyzeMultiModelResults(results) {
  const analysis = {};

  for (const [model, iterations] of Object.entries(results)) {
    const scores = iterations.map(r => r.score);
    const passed = iterations.filter(r => r.passed).length;
    const totalCost = iterations.reduce((sum, r) => sum + r.cost, 0);
    const avgTime = iterations.reduce((sum, r) => sum + r.generationTime, 0) / iterations.length;

    analysis[model] = {
      avgScore: (scores.reduce((a,b) => a+b, 0) / scores.length).toFixed(1),
      minScore: Math.min(...scores),
      maxScore: Math.max(...scores),
      passRate: `${passed}/${iterations.length}`,
      passPercentage: ((passed / iterations.length) * 100).toFixed(0) + '%',
      totalCost: '$' + totalCost.toFixed(4),
      avgCostPerWorksheet: '$' + (totalCost / iterations.length).toFixed(4),
      avgGenerationTime: Math.round(avgTime) + 'ms',
      commonIssues: identifyCommonIssues(iterations),
      recommendation: generateRecommendation(scores, passed, totalCost, avgTime)
    };
  }

  // Determine winner
  analysis.winner = determineWinner(analysis);

  return analysis;
}

function calculateCost(model, tokenCount) {
  const pricing = {
    'gemini-2.5-flash': { input: 0.000075, output: 0.0003 }, // per 1K tokens
    'gemini-2.5-pro': { input: 0.00125, output: 0.010 }
  };

  const inputTokens = tokenCount.input || 0;
  const outputTokens = tokenCount.output || 0;

  return ((inputTokens / 1000) * pricing[model].input) +
         ((outputTokens / 1000) * pricing[model].output);
}

function determineWinner(analysis) {
  // Scoring rubric:
  // - Quality (60%): Average score
  // - Consistency (20%): Pass rate
  // - Cost (15%): Cost per worksheet
  // - Speed (5%): Generation time

  const models = Object.keys(analysis).filter(k => k !== 'winner');
  let bestModel = null;
  let bestScore = 0;

  for (const model of models) {
    const data = analysis[model];
    const qualityScore = parseFloat(data.avgScore) / 100 * 60;
    const consistencyScore = parseInt(data.passPercentage) / 100 * 20;
    const costScore = (1 - (parseFloat(data.avgCostPerWorksheet.slice(1)) / 0.10)) * 15; // $0.10 max
    const speedScore = (1 - (parseInt(data.avgGenerationTime) / 10000)) * 5; // 10s max

    const totalScore = qualityScore + consistencyScore +
                      Math.max(0, costScore) + Math.max(0, speedScore);

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestModel = model;
    }
  }

  return {
    model: bestModel,
    score: bestScore.toFixed(1),
    reasoning: generateWinnerReasoning(analysis, bestModel)
  };
}
```

#### Step 4.2: Vision Assessment (Using STRICT Criteria)

```javascript
async function runStrictVisionAssessment(screenshotPath, config) {
  // Load strict criteria from STRICT-VISION-ASSESSMENT-CRITERIA.md
  const criteria = await loadStrictCriteria();

  // Use Claude Code vision to analyze screenshot
  const visionPrompt = `
You are assessing a ${config.configId} worksheet using STRICT production-ready criteria.

CRITICAL AUTO-FAIL CONDITIONS:
1. ANY broken images (placeholder text, empty boxes) → Max score 65
2. Missing questions (less than ${config.expectedQuestions}) → Score = (visible/${config.expectedQuestions} × 100)
3. Unanswerable comparison questions (identical objects) → Max score 40
4. Pattern questions missing correct answer in options → Max score 40
5. FOR BASIC SHAPES ONLY: Hearts/stars/diamonds used → Max score 65

ASSESSMENT PROCESS:
1. Count questions visible → Expected: ${config.expectedQuestions}
2. Check EVERY image → Any broken/missing?
3. Verify visual answerability → Can 4-year-old answer by LOOKING?
4. Check curriculum correctness → Shapes appropriate for subtopic?
5. Validate pattern answers → Correct option exists in multiple choice?

Return JSON:
{
  "score": 0-100,
  "productionReady": true/false,
  "criticalIssues": [],
  "warnings": [],
  "details": {
    "questionsVisible": X,
    "questionsExpected": ${config.expectedQuestions},
    "brokenImages": [],
    "unanswerableQuestions": [],
    "curriculumViolations": [],
    "patternAnswerIssues": [],
    "markdownVisible": false,
    "textFormattingIssues": []
  },
  "recommendations": []
}

Analyze this screenshot now:
${screenshotPath}
  `;

  const assessment = await claudeVisionAnalysis(visionPrompt, screenshotPath);

  // Apply automatic score caps
  if (assessment.details.brokenImages.length > 0) {
    assessment.score = Math.min(assessment.score, 65);
  }

  if (assessment.details.questionsVisible < config.expectedQuestions) {
    const percentVisible = assessment.details.questionsVisible / config.expectedQuestions;
    assessment.score = Math.min(assessment.score, percentVisible * 100);
  }

  if (assessment.details.unanswerableQuestions.length > 0) {
    assessment.score = Math.min(assessment.score, 40);
  }

  if (assessment.details.curriculumViolations.length > 0) {
    assessment.score = Math.min(assessment.score, 65);
  }

  if (assessment.details.patternAnswerIssues.length > 0) {
    assessment.score = Math.min(assessment.score, 40);
  }

  // Deduct for text formatting issues (markdown visible)
  if (assessment.details.textFormattingIssues.length > 0) {
    assessment.score -= (assessment.details.textFormattingIssues.length * 5);
  }

  assessment.productionReady = (assessment.score >= 95 &&
                                assessment.criticalIssues.length === 0);

  return assessment;
}
```

#### ✋ CHECKPOINT 2: TEST RESULTS REVIEW

**Claude Code presents:**

```markdown
## Multi-Model Test Results

### Gemini 2.5 Flash
**Overall Performance:**
- Average Score: 87.2/100
- Pass Rate: 3/5 (60%)
- Total Cost: $0.0012 (avg $0.00024/worksheet)
- Avg Generation Time: 2,340ms
- Recommendation: ⚠️ NEEDS REFINEMENT (low pass rate)

**Common Issues:**
1. Markdown symbols visible (**text** not rendered) - 4/5 iterations
2. Missing mascot in Q3-Q4 - 3/5 iterations
3. Pattern answer missing from options - 2/5 iterations

**Best Iteration:** #3 (Score: 92/100)
- Screenshot: ./test-results/gemini-2.5-flash/iteration-3.png
- Issues: Minor spacing issues only

**Worst Iteration:** #1 (Score: 78/100)
- Screenshot: ./test-results/gemini-2.5-flash/iteration-1.png
- Issues: Broken images, markdown visible, missing Q5

---

### Gemini 2.5 Pro
**Overall Performance:**
- Average Score: 96.4/100
- Pass Rate: 5/5 (100%) ✅
- Total Cost: $0.0187 (avg $0.00374/worksheet)
- Avg Generation Time: 4,120ms
- Recommendation: ✅ PRODUCTION READY

**Common Issues:**
(None - all iterations passed)

**Best Iteration:** #2 (Score: 98/100)
- Screenshot: ./test-results/gemini-2.5-pro/iteration-2.png
- Issues: None (perfect execution)

**Worst Iteration:** #5 (Score: 95/100)
- Screenshot: ./test-results/gemini-2.5-pro/iteration-5.png
- Issues: Minor: Star tracker slightly misaligned

---

### WINNER: Gemini 2.5 Pro 🏆

**Reasoning:**
- Quality: 96.4/100 (vs 87.2/100) - 10.5% better
- Consistency: 100% pass rate (vs 60%) - Much more reliable
- Cost: $0.00374/worksheet (vs $0.00024) - 15.6x more expensive BUT worth it
- Speed: 4.1s (vs 2.3s) - 76% slower BUT acceptable

**Verdict:**
Gemini 2.5 Pro is the clear winner. The quality and consistency improvements justify the higher cost. For production use with paying customers, reliability > cost savings.

**Estimated Annual Cost Impact:**
- If generating 10,000 worksheets/year
- Flash: $2.40/year
- Pro: $37.40/year
- Difference: $35/year (negligible for quality gain)

---

## Screenshots Gallery

[Display all 10 screenshots in grid for human review]

---

## Next Steps

Should I:
1. ✅ Deploy Gemini 2.5 Pro prompt to production (recommended)
2. 🔧 Refine Gemini 2.5 Flash prompt and retest (if cost is critical)
3. ⏸️ Pause for manual review before proceeding
4. 🔄 Generate additional test iterations for statistical confidence
```

**Human Response:**
- Decision on which model to use
- Whether to proceed to refinement or deploy
- Any concerns about specific issues observed

---

### PHASE 5: ITERATIVE REFINEMENT (Variable Time)

**Only if needed** (either model scored <95% avg OR pass rate <80%)

#### Refinement Strategy

```javascript
async function refinePrompt(testResults, promptPath) {
  const commonIssues = identifyCommonIssues(testResults);
  const refinements = [];

  for (const issue of commonIssues) {
    switch (issue.type) {
      case 'markdown-visible':
        refinements.push({
          issue: 'Markdown symbols showing instead of formatted text',
          location: promptPath,
          fix: addMarkdownRenderingInstructions(),
          priority: 'high'
        });
        break;

      case 'missing-mascot':
        refinements.push({
          issue: 'Mascot not appearing in required questions',
          location: promptPath,
          fix: addExplicitMascotRequirements(),
          priority: 'medium'
        });
        break;

      case 'broken-images':
        refinements.push({
          issue: 'Image paths incorrect or images missing',
          location: promptPath,
          fix: validateAndFixImagePaths(),
          priority: 'critical'
        });
        break;

      case 'pattern-answer-missing':
        refinements.push({
          issue: 'Pattern questions missing correct answer in options',
          location: promptPath,
          fix: addPatternAnswerValidation(),
          priority: 'critical'
        });
        break;

      case 'curriculum-violation':
        refinements.push({
          issue: 'Using inappropriate shapes for Basic Shapes worksheet',
          location: promptPath,
          fix: enforceBasicShapesOnly(),
          priority: 'critical'
        });
        break;
    }
  }

  // Apply refinements
  for (const refinement of refinements) {
    console.log(`Applying fix: ${refinement.issue}`);
    await applyRefinement(refinement);
  }

  // Retest
  console.log('\n🔁 Retesting with refined prompt...\n');
  const retestResults = await runMultiModelTest({
    configId: testResults.configId,
    models: [testResults.winner.model], // Only retest winning model
    iterations: 3
  });

  return retestResults;
}

function addMarkdownRenderingInstructions() {
  return `
**CRITICAL MARKDOWN RULE:**

DO NOT use markdown syntax in the HTML output. All formatting must be done with HTML tags and CSS.

❌ INCORRECT:
<p>Which ball is **Bigger**?</p>

✅ CORRECT:
<p>Which ball is <strong>Bigger</strong>?</p>

❌ INCORRECT:
<p>**Count the shapes**</p>

✅ CORRECT:
<p><strong>Count the shapes</strong></p>

If you need bold text, use <strong> tags.
If you need italic text, use <em> tags.
NEVER output ** or __ markdown symbols in the HTML.
  `;
}

function addExplicitMascotRequirements() {
  return `
**MASCOT REQUIREMENT (MANDATORY):**

The mascot MUST appear at least 3 times:
1. Q1: helper-owl-pointing.png (right side of question header)
2. Q3 or Q4: helper-owl-thinking.png (right side of question header)
3. Q5: helper-owl-celebrating.png (after completion message)

Example for Q1:
<div class="question" style="background: #FFF9C4;">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span class="question-number">1</span>
    <img src="/images/mascot/helper-owl-pointing.png"
         width="60" height="60" alt="Owl helper"
         style="margin-left: auto;" />
  </div>
  <!-- Rest of question -->
</div>

DO NOT skip the mascot. It is required for quality assessment.
  `;
}

function addPatternAnswerValidation() {
  return `
**PATTERN QUESTION ANSWER VALIDATION (CRITICAL):**

Before finalizing ANY pattern question with "What comes next?":

1. Identify your pattern (e.g., Star-Diamond-Star-Diamond-?)
2. Determine the correct next item (Star)
3. Check your multiple choice options
4. VERIFY the correct answer is included

If you plan this question:
"What comes next? ⭐🔷⭐🔷?"

And your options are:
A) Square
B) Triangle
C) Circle

STOP! This question is UNANSWERABLE. The correct answer (Star) is missing.

You MUST include:
A) Square
B) Star ⭐ (CORRECT ANSWER)
C) Triangle

**Validation Checklist for Pattern Questions:**
- [ ] Pattern identified (AB, ABC, AABB, etc.)
- [ ] Correct next item determined
- [ ] Correct item EXISTS in multiple choice options
- [ ] Options do not all look identical
  `;
}
```

**Refinement Loop:** Continue testing → identifying issues → refining → retesting until pass rate ≥80% and avg score ≥95

---

### PHASE 6: DEPLOYMENT & DOCUMENTATION

#### Step 6.1: Final Validation

```javascript
async function finalValidation(configId, modelChoice, testResults) {
  const checks = [];

  // Quality threshold
  checks.push({
    check: 'Average Score ≥95',
    passed: testResults.avgScore >= 95,
    value: testResults.avgScore,
    required: true
  });

  // Consistency threshold
  checks.push({
    check: 'Pass Rate ≥80% (4/5)',
    passed: testResults.passCount >= 4,
    value: `${testResults.passCount}/5`,
    required: true
  });

  // Zero critical failures
  const criticalFailures = testResults.results.filter(r =>
    r.issues.some(i => ['broken-images', 'curriculum-violation',
                         'pattern-answer-missing', 'unanswerable'].includes(i))
  ).length;

  checks.push({
    check: 'Zero Critical Failures',
    passed: criticalFailures === 0,
    value: criticalFailures,
    required: true
  });

  // Model cost acceptable
  const costPerWorksheet = testResults.avgCost;
  checks.push({
    check: 'Cost Per Worksheet <$0.01',
    passed: costPerWorksheet < 0.01,
    value: `$${costPerWorksheet.toFixed(4)}`,
    required: false
  });

  // Generation speed acceptable
  const avgTime = testResults.avgTime;
  checks.push({
    check: 'Generation Time <10s',
    passed: avgTime < 10000,
    value: `${(avgTime/1000).toFixed(1)}s`,
    required: false
  });

  const allRequiredPassed = checks.filter(c => c.required).every(c => c.passed);

  return {
    ready: allRequiredPassed,
    checks: checks,
    summary: allRequiredPassed ?
      '✅ ALL validation checks passed - PRODUCTION READY' :
      '❌ Validation failed - NOT ready for deployment'
  };
}
```

#### ✋ CHECKPOINT 3: DEPLOYMENT APPROVAL

**Claude Code presents:**

```markdown
## Final Validation Report

### Configuration: {configId}
### Model: {Gemini 2.5 Pro}
### Test Date: {ISO timestamp}

---

## Validation Checks

✅ Average Score ≥95: **96.4/100** (PASS)
✅ Pass Rate ≥80%: **5/5 (100%)** (PASS)
✅ Zero Critical Failures: **0** (PASS)
✅ Cost Per Worksheet <$0.01: **$0.0037** (PASS)
✅ Generation Time <10s: **4.1s** (PASS)

**Overall: ✅ PRODUCTION READY**

---

## Deployment Plan

1. **Save prompt to production location:**
   - Source: `./research-library/{configId}/prompt-final.md`
   - Target: `./src/lib/prompts/configurations/{yearGroup}/{category}/{subtopic}-COMPRESSED.md`

2. **Update configuration metadata:**
   - Model: gemini-2.5-pro
   - Quality score: 96.4/100
   - Pass rate: 100%
   - Validated: {ISO date}

3. **Archive test results:**
   - Location: `./prompt-engineering-results/session_{timestamp}/`
   - Includes: 10 test screenshots, assessment JSON, model comparison

4. **Update research library:**
   - Save top 3 generated worksheets as exemplars for future configs
   - Document learnings in `./research-library/{configId}/analysis/post-deployment-notes.md`

---

## Production Estimate

**Expected Quality:**
- 96-98% of generated worksheets will score ≥95/100
- <1% chance of critical failure
- Consistent visual quality

**Expected Cost:**
- $0.0037 per worksheet
- For 1,000 worksheets/month: $3.70/month
- For 10,000 worksheets/month: $37/month

**Expected Performance:**
- Generation time: 3-5 seconds
- 99.9% success rate
- Minimal retry needed

---

## Recommendations

1. ✅ **Deploy immediately** - Quality validated, no blockers
2. 📊 **Monitor first 100 generations** - Track quality in production
3. 🔄 **Review quarterly** - Check if prompt drift occurs
4. 📚 **Use as template** - Apply learnings to similar configs

---

Ready to deploy?

[Human approval needed]
```

**Human Approval:**
- ✅ Approved - deploy to production
- ⏸️ Pause - need more review
- 🔄 Changes requested - specific feedback

#### Step 6.2: Deployment

```javascript
async function deployToProduction(configId, promptPath, metadata) {
  // 1. Backup existing (if exists)
  const targetPath = getProductionPromptPath(configId);
  if (fs.existsSync(targetPath)) {
    const backupPath = `${targetPath}.backup-${Date.now()}`;
    await fs.copyFile(targetPath, backupPath);
    console.log(`✅ Backed up existing prompt: ${backupPath}`);
  }

  // 2. Copy new prompt
  await fs.copyFile(promptPath, targetPath);
  console.log(`✅ Deployed prompt: ${targetPath}`);

  // 3. Update metadata
  await updateConfigMetadata(configId, {
    model: metadata.model,
    qualityScore: metadata.qualityScore,
    passRate: metadata.passRate,
    validated: new Date().toISOString(),
    deployedBy: 'claude-code-autonomous-agent',
    version: incrementVersion(configId)
  });
  console.log(`✅ Updated metadata`);

  // 4. Archive test results
  const archivePath = `./prompt-engineering-archive/${configId}/validation-${Date.now()}/`;
  await fs.mkdir(archivePath, { recursive: true });
  await archiveTestResults(metadata.testResultsPath, archivePath);
  console.log(`✅ Archived test results: ${archivePath}`);

  // 5. Generate deployment report
  await generateDeploymentReport(configId, metadata, archivePath);
  console.log(`✅ Generated deployment report`);

  console.log(`\n🎉 DEPLOYMENT COMPLETE: ${configId}\n`);
}
```

#### Step 6.3: Post-Deployment Documentation

```markdown
# {configId} - Deployment Record

## Metadata
- **Configuration ID**: {configId}
- **Year Group**: {yearGroup}
- **Topic**: {topic}
- **Subtopic**: {subtopic}
- **Deployed**: {ISO timestamp}
- **Model**: {gemini-2.5-pro}
- **Version**: {1.0.0}

## Quality Metrics
- **Average Score**: 96.4/100
- **Pass Rate**: 100% (5/5)
- **Critical Failures**: 0
- **Production Ready**: ✅ Yes

## Cost & Performance
- **Cost Per Worksheet**: $0.0037
- **Generation Time**: 4.1s average
- **Token Usage**: ~15K input, ~8K output

## Research Sources
1. Twinkl Premium - Basic Shapes Worksheet (exemplar-001.png)
2. White Rose Maths - Reception Shapes (exemplar-002.png)
3. Master the Curriculum - Shape Recognition (exemplar-003.png)
4. Manual addition - Teacher's example (exemplar-004.jpg)

## Key Design Patterns
- 5-question structure with progressive difficulty
- Color-coded backgrounds for visual separation
- Helper owl mascot appears 3x per worksheet
- 70% visual density (high image-to-text ratio)
- Clear answer spaces and working areas
- Achievement stars header

## Image Assets Used
- /images/2d-circle.png (20x per worksheet)
- /images/2d-square.png (20x per worksheet)
- /images/2d-triangle.png (18x per worksheet)
- /images/2d-rectangle.png (15x per worksheet)
- /images/mascot/helper-owl-pointing.png (1x)
- /images/mascot/helper-owl-thinking.png (1x)
- /images/mascot/helper-owl-celebrating.png (1x)
- /images/achievement/star-gold.png (5x)

## Test Results Summary
- Iteration 1: 95/100 ✅
- Iteration 2: 98/100 ✅
- Iteration 3: 97/100 ✅
- Iteration 4: 96/100 ✅
- Iteration 5: 95/100 ✅

## Common Success Factors
- Few-shot visual examples in prompt (3 exemplars)
- Explicit curriculum rule: ONLY basic shapes (no hearts/stars)
- Pattern answer validation requirement
- Markdown formatting prohibition
- Clear image path specifications

## Lessons Learned
1. Gemini 2.5 Pro significantly outperforms Flash for visual layout
2. Few-shot learning with actual screenshots reduces errors by 60%
3. Explicit "DO NOT" rules more effective than positive instructions
4. Curriculum-specific validation critical for Reception content
5. Cost difference negligible at scale (Flash: $0.0002 vs Pro: $0.0037)

## Next Configurations to Tackle
1. reception-shape-space-patterns (similar visual patterns)
2. reception-shape-space-size-comparison (leverage same image assets)
3. year1-number-place-value-numbers-to-20 (new image set needed)

## Monitoring Plan
- Review first 100 generated worksheets
- Track quality scores in production
- Monitor for prompt drift over time
- Quarterly re-validation recommended

---

**Status**: ✅ DEPLOYED TO PRODUCTION
**Confidence Level**: HIGH
**Maintenance Required**: LOW (stable prompt)
```

---

## 📚 HUMAN CHECKPOINTS SUMMARY

### Checkpoint 1: Quick Research Review (After Phase 1)
**Claude shows:**
- 2-3 exemplar worksheets found
- Key patterns identified
- Image status

**Human decides:**
- Approve and continue
- Provide feedback

**Estimated time:** 2 minutes human review

---

### Checkpoint 2: Test Results (After Phase 4)
**Claude shows:**
- Multi-model comparison (Flash vs Pro)
- Screenshot gallery (2-4 worksheets)
- Quality scores and pass rates
- Cost and performance metrics

**Human decides:**
- Which model to use for production
- Whether to refine or deploy

**Estimated time:** 5 minutes human review

---

### Checkpoint 3: Deployment Approval (After Phase 6.1)
**Claude shows:**
- Final validation report
- Deployment plan
- Recommendations

**Human decides:**
- Approve deployment
- Request changes

**Estimated time:** 2 minutes human review

**Total human time investment:** ~10 minutes across entire workflow

---

## 🔧 TOOLS & SCRIPTS

### Research Library Management

```bash
# Create new research folder
mkdir -p ./research-library/{configId}/{exemplars,analysis}

# Add manual exemplar
cp ~/Downloads/teacher-example.png ./research-library/{configId}/exemplars/manual-001.png

# List all research sessions
ls -la ./research-library/

# Review visual patterns
cat ./research-library/{configId}/analysis/visual-patterns.md
```

### Image Verification

```bash
# Verify all images exist
node scripts/verify-image-library.js {configId}

# Check image sizes
node scripts/check-image-dimensions.js

# Optimize large images
node scripts/optimize-images.js ./public/images/
```

### Multi-Model Testing

```bash
# Run automated test (Flash vs Pro)
npm run test:prompt-multi-model -- --config={configId}

# Test single model only
npm run test:prompt-model -- --config={configId} --model=gemini-2.5-pro

# Test with custom iterations
npm run test:prompt-model -- --config={configId} --iterations=10
```

---

## 🎯 SUCCESS METRICS

### Quality Targets
- **Average Score**: ≥95/100
- **Pass Rate**: ≥80% (4/5 iterations minimum)
- **Critical Failures**: 0 (zero tolerance)

### Performance Targets
- **Generation Time**: <10 seconds
- **Cost Per Worksheet**: <$0.01
- **Success Rate**: ≥99%

### Production Readiness
- ✅ Passes all validation checks
- ✅ Zero critical curriculum violations
- ✅ Images load correctly 100% of time
- ✅ Age-appropriate language confirmed
- ✅ Answer key complete and correct

---

## 📖 QUICK REFERENCE

### Key Differences from V1.0

| Aspect | V1.0 | V2.0 (Optimized) |
|--------|------|------|
| Research Phase | 30 min | 5-10 min (streamlined) |
| Visual Examples | Described in text | Actual screenshots (2-3 exemplars) |
| Model Testing | Single model | Multi-model comparison (Flash vs Pro) |
| Prompts | Master template | Configuration-specific (isolated) |
| Image Library | Ad-hoc | Quick check + reuse existing |
| Few-Shot Learning | Not used | 2-3 visual examples per prompt |
| Human Checkpoints | 3 (30-45 min) | 3 (~10 min total) |
| Refinement | Auto-fix only | Auto-fix + model comparison |
| Total Time | 2-3 hours | 30-50 minutes |

### When to Use Each Model

**Gemini 2.5 Flash:**
- ✅ Simple worksheets (Year 5-6, text-heavy)
- ✅ Cost is critical priority
- ✅ Speed required (<3s generation)
- ❌ NOT for Reception-Year 2 (visual complexity)
- ❌ NOT for complex layouts

**Gemini 2.5 Pro:**
- ✅ Visual-heavy worksheets (Reception-Year 3)
- ✅ Complex layouts with images
- ✅ Pattern recognition questions
- ✅ Quality > cost priority
- ✅ Production deployments

---

## 🚀 GETTING STARTED

### For Claude Code Agent

When human says: **"Engineer prompt for {configId}"**

Execute this workflow:
1. Start Phase 1: Quick Research (5-10 min autonomous)
2. Pause at Checkpoint 1: Present research, wait for approval (2 min human)
3. Phase 2: Verify images (1-2 min autonomous)
4. Phase 3: Create prompt (15-20 min autonomous)
5. Phase 4: Test both models (5-10 min autonomous - parallel testing)
6. Pause at Checkpoint 2: Present results, wait for model choice (5 min human)
7. Phase 5: Refine if needed (5-10 min autonomous if needed)
8. Phase 6: Final validation
9. Pause at Checkpoint 3: Request deployment approval (2 min human)
10. Deploy and document

**Total time:** 30-50 minutes (autonomous) + 10 min (human checkpoints)

### For Human

**Your role:**
1. Provide configuration ID to start
2. Review research at Checkpoint 1 (2 min)
3. Images usually already exist - skip if available
4. Review test results at Checkpoint 2 (5 min)
5. Choose model (Flash vs Pro)
6. Approve deployment at Checkpoint 3 (2 min)
7. Monitor first 100 generations in production

**Your time investment:** ~10 minutes total across full workflow

---

## 📞 SUPPORT & TROUBLESHOOTING

### Common Issues

**Issue: Research finds low-quality exemplars**
- Solution: Manually add higher-quality examples to research library
- Human provides 2-3 professional teacher resources

**Issue: Image assets don't exist**
- Solution: Create images or use placeholder strategy
- Flag configuration for "images required before deployment"

**Issue: Both models score <95%**
- Solution: Review prompt structure, check for unclear instructions
- May need curriculum expert review for educational accuracy

**Issue: Prompt drift over time**
- Solution: Quarterly re-validation using same test process
- Update prompt if quality degrades

---

**Document Version**: 2.0
**Last Updated**: {current date}
**Agent**: Claude Code Autonomous Prompt Engineer
**Methodology**: Research-driven, visual-first, multi-model testing

🎯 **Ready to engineer production-ready prompts with confidence!**
