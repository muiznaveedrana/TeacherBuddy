# Reception: Simple Patterns - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception simple patterns worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Pattern Types (CRITICAL)
- **Focus on simple repeating patterns appropriate for ages 4-5**
- PRIMARY PATTERNS: AB (e.g., red-blue-red-blue)
- INTERMEDIATE PATTERNS: ABB (e.g., red-blue-blue-red-blue-blue)
- ADVANCED PATTERNS: ABC (e.g., red-blue-green-red-blue-green)
- Use colors, shapes, and objects from verified library

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 4-5
- Progress from simple to complex pattern recognition

### Rule 4: Visual-First Approach (CRITICAL)
- **ALL patterns must be visual - use colors, shapes, or objects**
- **MANDATORY: Pattern items MUST have clear spacing between them (minimum 15px gap)**
- Clear, distinct elements in each pattern
- Bright, engaging colors
- NO number patterns (ages 4-5 focus on visual patterns)
- **CRITICAL: Children must see individual items clearly separated - no items touching or overlapping**

### Rule 5: Age-Appropriate Language
- **Use simple instructions**
- Vocabulary: pattern, repeat, next, comes after, continues
- "What comes next?", "Continue the pattern", "Copy the pattern"

## VERIFIED VOCABULARY - WORKSHEET_OBJECTS LIBRARY

**CRITICAL: You MUST ONLY use objects from this approved list. Using unlisted objects WILL result in broken images.**

**67 objects with confirmed working images:**

**Fruits (10) - Excellent for patterns:** apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons, peaches, pineapples

**Garden & Nature (9) - Great visual variety:** flowers, butterflies, bees, birds, trees, leaves, mushrooms, worms, acorns

**School Supplies (9):** books, pencils, erasers, crayons, markers, scissors, rulers, glue, backpacks

**Farm Animals (9) - Excellent for patterns:** chickens, cows, sheep, pigs, horses, ducks, goats, geese, turkeys

**Toys (5):** balls, cars, dolls, kites, blocks

**Vegetables (6):** carrots, tomatoes, broccoli, cucumbers, peppers, potatoes

**Sports Equipment (5):** footballs, basketballs, tennis balls, bats, medals

**Food & Treats (2) - Good for simple patterns:** cookies, cupcakes

**Shapes & Objects (7) - PRIMARY for geometric patterns:** stars, hearts, circles, squares, diamonds, suns, moons

**Vehicles (5):** cars, buses, bikes, trains, planes

**FRESHNESS STRATEGY:** System provides forbidden list and priority categories. Select from fresh categories, avoid forbidden objects, target 80%+ new vocabulary.

**IMAGE PATHS**: All images are in `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**Example Paths:**
- Shapes: `/images/WORKSHEET_OBJECTS/counting/shapes/star.png`
- Fruits: `/images/WORKSHEET_OBJECTS/counting/fruits/apple.png`
- Farm Animals: `/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png`

**CRITICAL NOTES FOR PATTERNS:**
- Combine shapes AND objects for variety (e.g., red circle, blue square, red circle, blue square)
- Farm animals work excellently for AB/ABC patterns
- Fruits provide good visual variety and color contrast

**NOTE:** All objects above have verified images in WORKSHEET_OBJECTS directory. Using objects NOT in this list will result in broken images and worksheet failure.

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: What Comes Next? (AB Pattern)** (Easiest - Building Confidence)
**Format**: Show simple AB color pattern, ask what comes next
**Pedagogical Purpose**: Basic pattern recognition
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">What comes NEXT in this pattern?</p>

    <div class="pattern-sequence">
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item pattern-next">?</div>
    </div>

    <div class="pattern-choices">
        <div class="choice-item circle red"></div>
        <div class="choice-item circle blue"></div>
    </div>

    <p class="answer-prompt">Circle your answer</p>
</div>
```
**Example**: Red-Blue-Red-Blue-Red-? (Answer: Blue)

---

### **Question 2: Continue the Pattern (ABB Pattern)** (Intermediate)
**Format**: Show ABB shape pattern, ask child to complete
**Pedagogical Purpose**: Recognizing more complex repeating units
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Draw or color the missing shapes to continue the pattern</p>

    <div class="pattern-sequence">
        <div class="pattern-item square green"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item square green"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item pattern-blank"></div>
        <div class="pattern-item pattern-blank"></div>
    </div>

    <p class="answer-prompt">What shapes come next?</p>
</div>
```
**Example**: Square-Circle-Circle-Square-Circle-Circle-__-__ (Answer: Square-Circle)

---

### **Question 3: Copy the Pattern** (Hands-On Practice)
**Format**: Show complete pattern, provide blank spaces to copy
**Pedagogical Purpose**: Reproducing patterns, fine motor skills
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Copy this pattern in the boxes below</p>

    <div class="pattern-to-copy">
        <div class="pattern-item star yellow"></div>
        <div class="pattern-item heart pink"></div>
        <div class="pattern-item star yellow"></div>
        <div class="pattern-item heart pink"></div>
    </div>

    <div class="pattern-copy-area">
        <div class="copy-box"></div>
        <div class="copy-box"></div>
        <div class="copy-box"></div>
        <div class="copy-box"></div>
    </div>

    <p class="answer-prompt">Draw the pattern</p>
</div>
```
**Example**: Show Star-Heart-Star-Heart, child copies into empty boxes

---

### **Question 4: Object Pattern (Real-World)** (Application)
**Format**: Pattern using familiar objects from WORKSHEET_OBJECTS
**Pedagogical Purpose**: Connecting patterns to real-world items
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">What comes next in Emma's toy pattern?</p>

    <div class="pattern-sequence-objects">
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
        <div class="pattern-next">?</div>
    </div>

    <div class="object-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="50" height="50" alt="Ball" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="50" height="50" alt="Car" />
        </div>
    </div>

    <p class="answer-prompt">Circle A or B</p>
</div>
```
**Example**: Ball-Car-Ball-Car-? (Answer: Ball)

**Verified Objects for Patterns:**
- Fruits: apple, banana, orange, strawberry
- Toys: ball, car, doll, kite
- Shapes: star, heart, circle, square
- Vegetables: carrot, tomato

---

### **Question 5: ABC Pattern Challenge** (Most Complex)
**Format**: Three-element repeating pattern
**Pedagogical Purpose**: Advanced pattern recognition for ready learners
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">What comes next? Circle the answer.</p>

    <div class="pattern-sequence">
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item circle green"></div>
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item pattern-next">?</div>
    </div>

    <div class="pattern-choices-abc">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape triangle red"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape circle green"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape square blue"></div>
        </div>
    </div>

    <p class="answer-prompt">Circle A, B, or C</p>
</div>
```
**Example**: Red Triangle-Blue Square-Green Circle-Red Triangle-Blue Square-? (Answer: Green Circle)

---

## PATTERN ANSWER VALIDATION (CRITICAL - AUTO-FAIL IF VIOLATED)

### MANDATORY RULE: Correct Answer MUST Be in Multiple Choice Options

For ALL "What comes next?" pattern questions (Q1, Q4, Q5):

**VALIDATION PROCESS (REQUIRED BEFORE RENDERING):**
1. **Identify the pattern sequence** (e.g., ABAB → next is A, or ABC-ABC → next is C)
2. **Determine the correct next item** (which specific shape/color/object continues the pattern)
3. **VERIFY the correct answer EXISTS in the multiple choice options**
4. **If correct answer is MISSING → REGENERATE the multiple choice options immediately**

**CRITICAL EXAMPLES:**

✅ **CORRECT - Pattern Answer Validation PASSES:**
```
Pattern: Red Circle - Blue Square - Red Circle - Blue Square - ?
Correct answer: Red Circle
Multiple choice options: Red Circle ✓, Blue Square, Green Triangle
Status: VALID - Correct answer is present in options
```

❌ **WRONG - Pattern Answer Validation FAILS:**
```
Pattern: Red Circle - Blue Square - Red Circle - Blue Square - ?
Correct answer: Red Circle
Multiple choice options: Yellow Star, Green Triangle, Purple Heart
Status: INVALID - Red Circle is MISSING from options!
Action Required: REGENERATE options to include Red Circle
```

### Multiple Choice Generation Rules:

1. **ALWAYS include the correct answer** as one of the 2-4 options
2. **Use items FROM the pattern** for at least 2-3 options
3. **Add 1-2 distractor options** (items NOT in the pattern) for cognitive challenge
4. **Match item types**: If pattern uses shapes, options must use shapes; if pattern uses objects (toys, fruits), options must use objects
5. **Vary correct answer position**: Don't always put correct answer first or last

**Example - Q1 (AB Pattern with Shapes):**
- Pattern: Star - Diamond - Star - Diamond - ?
- Correct answer: Star
- Multiple choice: Star ✓, Diamond, Triangle, Circle (4 options, correct answer present)

**Example - Q4 (AB Pattern with Objects):**
- Pattern: Ball - Car - Ball - Car - ?
- Correct answer: Ball
- Multiple choice: Ball ✓, Car (2 options, correct answer present)

**Example - Q5 (ABC Pattern):**
- Pattern: Red Triangle - Blue Square - Green Circle - Red Triangle - Blue Square - ?
- Correct answer: Green Circle
- Multiple choice: Red Triangle, Green Circle ✓, Blue Square, Yellow Star (4 options, correct answer present)

### Pre-Render Validation Checklist:

Before finalizing HTML for EACH pattern question:
- [ ] Pattern sequence is clear (AB, ABB, ABC)
- [ ] Correct next item is determinable
- [ ] Correct answer is INCLUDED in multiple choice options
- [ ] If correct answer is missing → REGENERATE options
- [ ] NEVER render a question where correct answer is unavailable

**FAILURE TO VALIDATE = AUTO-FAIL WORKSHEET (Score 40/100)**

---

## PATTERN GUIDELINES

### Pattern Types Distribution:
- **Q1**: AB pattern (simplest - 2 elements) - MUST validate answer in options
- **Q2**: ABB pattern (3 elements, one repeats) - Fill-in-the-blank format
- **Q3**: AB pattern for copying - Drawing activity
- **Q4**: AB pattern with real objects - MUST validate answer in options
- **Q5**: ABC pattern (most complex - 3 different elements) - MUST validate answer in options

### Color Palette (Use bright, distinct colors):
- Red (#E74C3C)
- Blue (#4A90E2)
- Green (#27AE60)
- Yellow (#F1C40F)
- Pink (#E91E63)
- Orange (#F39C12)
- Purple (#9B59B6)

### Shape Options:
- Circle, Square, Triangle, Rectangle, Star, Heart

### Pattern Length Guidelines:
- **CRITICAL FOR AGES 4-5: Keep patterns SIMPLE and SHORT**
- Show 2-3 complete cycles (NOT 4-6, that's too complex for Reception)
- Ask for 1-2 next elements maximum
- Ensure pattern is obvious and repeating
- **Example for AB pattern**: Show Red-Blue-Red-Blue-Red-? (2.5 cycles, perfect for age 4-5)
- **Example for ABC pattern**: Show Red-Blue-Green-Red-Blue-? (1.5 cycles is sufficient)

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR PATTERNS)

```css
body {
    font-family: 'Sassoon Primary', 'Century Gothic', 'Comic Sans MS', sans-serif;
    font-size: 16pt;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background: white;
    color: #000;
}

.worksheet-header {
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 6px;
    border-bottom: 3px solid #000;
}

.worksheet-title {
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}

.question {
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.question-number {
    font-size: 18pt;
    font-weight: bold;
    color: #2c3e50;
    margin-right: 8px;
}

.question-text {
    font-size: 16pt;
    line-height: 1.4;
    margin: 6px 0;
    font-weight: 600;
}

/* Pattern Sequences */
.pattern-sequence, .pattern-sequence-objects, .pattern-to-copy {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px dashed #4CAF50;
    border-radius: 12px;
    max-width: 600px;
    flex-wrap: wrap;
}

.pattern-item {
    width: 60px;
    height: 60px;
    border: 2px solid #333;
    border-radius: 8px;
}

/* Circles */
.pattern-item.circle {
    border-radius: 50%;
}

/* Squares */
.pattern-item.square {
    border-radius: 8px;
}

/* Triangles */
.pattern-item.triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid;
    border-top: none;
    border-radius: 0;
}

/* Stars */
.pattern-item.star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    border-radius: 0;
}

/* Hearts */
.pattern-item.heart {
    position: relative;
    transform: rotate(-45deg);
    border-radius: 0;
}

/* Colors */
.red { background-color: #E74C3C; border-color: #C0392B; }
.blue { background-color: #4A90E2; border-color: #2E5C8A; }
.green { background-color: #27AE60; border-color: #1E8449; }
.yellow { background-color: #F1C40F; border-color: #C29D0B; }
.pink { background-color: #E91E63; border-color: #AD1457; }
.orange { background-color: #F39C12; border-color: #CA6F1E; }
.purple { background-color: #9B59B6; border-color: #7D3C98; }

/* Triangle colors - special handling */
.triangle.red { border-bottom-color: #E74C3C; }
.triangle.blue { border-bottom-color: #4A90E2; }
.triangle.green { border-bottom-color: #27AE60; }
.triangle.yellow { border-bottom-color: #F1C40F; }
.triangle.pink { border-bottom-color: #E91E63; }

.pattern-next {
    width: 60px;
    height: 60px;
    background: white;
    border: 3px dashed #FF6347;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32pt;
    font-weight: bold;
    color: #FF6347;
}

.pattern-blank {
    width: 60px;
    height: 60px;
    background: white;
    border: 2px solid #999;
    border-radius: 8px;
}

/* Pattern Choices */
.pattern-choices, .pattern-choices-abc, .object-choices {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 15px auto;
    flex-wrap: wrap;
}

.choice-item {
    width: 70px;
    height: 70px;
    border: 3px solid #333;
    cursor: pointer;
}

.choice-item:hover {
    border-color: #4CAF50;
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
}

.choice-box {
    padding: 15px;
    background: white;
    border: 3px solid #ddd;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
}

.choice-box:hover {
    border-color: #4CAF50;
    background: #f0f9ff;
}

.choice-label {
    display: block;
    font-size: 16pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
}

.choice-shape {
    width: 60px;
    height: 60px;
    margin: 0 auto;
}

/* Copy Area */
.pattern-copy-area {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 20px auto;
    padding: 15px;
}

.copy-box {
    width: 70px;
    height: 70px;
    background: white;
    border: 2px solid #999;
    border-radius: 8px;
}

/* Answer Prompts */
.answer-prompt {
    font-size: 15pt;
    margin: 10px 0;
    font-weight: 600;
    text-align: center;
}

/* Answer Key */
.answer-key {
    margin-top: 30px;
    padding: 15px;
    background: #f0f8ff;
    border: 2px solid #4169E1;
    border-radius: 10px;
    page-break-before: always;
}

.answer-key-title {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin: 0 0 10px 0;
    text-align: center;
}

.answer-key-content p {
    font-size: 12pt;
    margin: 6px 0;
    line-height: 1.5;
}
```

---

## ANSWER KEY (MANDATORY)

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Blue circle (AB pattern continues)</p>
        <p><strong>2.</strong> Square-Circle (ABB pattern: Green Square, Yellow Circles)</p>
        <p><strong>3.</strong> Copy: Star-Heart-Star-Heart</p>
        <p><strong>4.</strong> A - Ball (AB pattern with toys)</p>
        <p><strong>5.</strong> B - Green Circle (ABC pattern: Triangle-Square-Circle)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = AB pattern (what comes next)?**
3. ✓ **Question 2 = ABB pattern (continue)?**
4. ✓ **Question 3 = Copy pattern activity?**
5. ✓ **Question 4 = Object pattern from WORKSHEET_OBJECTS?**
6. ✓ **Question 5 = ABC pattern (most complex)?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All patterns have clear, distinct colors/shapes?**
9. ✓ **CRITICAL: Pattern items have at least 15px gap between them (no touching/crowding)?**
10. ✓ **Pattern sequences are obvious and repeating?**
11. ✓ **CRITICAL: Patterns are SHORT (2-3 cycles max, NOT 4-6 cycles)?**
12. ✓ **Age-appropriate complexity for 4-5 year olds (simple AB, ABB, ABC only)?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
