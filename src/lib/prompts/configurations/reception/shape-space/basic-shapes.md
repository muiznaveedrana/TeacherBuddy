# Reception: Basic Shapes - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception basic shapes worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Basic 2D Shapes Only (CRITICAL - CURRICULUM REQUIREMENT)
- **ONLY use the 4 basic geometric shapes specified in UK EYFS curriculum**
- **ALLOWED SHAPES: circle, square, triangle, rectangle ONLY**
- **FORBIDDEN SHAPES: star, heart, diamond, oval, pentagon, hexagon, or ANY other shapes**
- **This is a strict curriculum requirement - using non-basic shapes = WORKSHEET FAILURE**
- Use informal and mathematical language: 'sides', 'corners', 'straight', 'flat', 'round', 'pointy'

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 4-5
- DO NOT deviate from the prescribed format for each question number

### Rule 4: Visual-First Approach (CRITICAL)
- **Focus on visual recognition before formal mathematical terminology**
- Use large, clear shape images
- Bright colors to engage young learners
- Real-world connections where appropriate

### Rule 5: Age-Appropriate Language
- **Use simple, clear instructions**
- Vocabulary: circle, square, triangle, rectangle, sides, corners, round, straight
- Encourage tracing, coloring, circling, matching activities

## VERIFIED VOCABULARY - WORKSHEET_OBJECTS LIBRARY

**CRITICAL: You MUST ONLY use objects from this approved list. Using unlisted objects WILL result in broken images.**

**67 objects with confirmed working images:**

**Fruits (10):** apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons, peaches, pineapples

**Garden & Nature (9):** flowers, butterflies, bees, birds, trees, leaves, mushrooms, worms, acorns

**School Supplies (9) - Excellent for counting in shape worksheets:** books, pencils, erasers, crayons, markers, scissors, rulers, glue, backpacks

**Farm Animals (9):** chickens, cows, sheep, pigs, horses, ducks, goats, geese, turkeys

**Toys (5):** balls, cars, dolls, kites, blocks

**Vegetables (6):** carrots, tomatoes, broccoli, cucumbers, peppers, potatoes

**Sports Equipment (5):** footballs, basketballs, tennis balls, bats, medals

**Food & Treats (2):** cookies, cupcakes

**Shapes & Objects (4) - PRIMARY for basic shapes (CURRICULUM-COMPLIANT ONLY):** circles, squares, triangles, rectangles

**NOTE FOR BASIC SHAPES WORKSHEET**: ONLY use circles, squares, triangles, rectangles. DO NOT use stars, hearts, diamonds, suns, or moons.

**Vehicles (5):** cars, buses, bikes, trains, planes

**FRESHNESS STRATEGY:** System provides forbidden list and priority categories. Select from fresh categories, avoid forbidden objects, target 80%+ new vocabulary.

**IMAGE PATHS**: All images are in `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**Example Paths:**
- Shapes: `/images/WORKSHEET_OBJECTS/counting/shapes/star.png`
- School: `/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png`
- Fruits: `/images/WORKSHEET_OBJECTS/counting/fruits/apple.png`

**NOTE:** All objects above have verified images in WORKSHEET_OBJECTS directory. Using objects NOT in this list will result in broken images and worksheet failure.

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Simple Shape Identification** (Easiest - Building Confidence)
**Format**: Show one large shape, ask child to name it
**Pedagogical Purpose**: Direct recognition, building vocabulary
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">What shape is this?</p>

    <div class="shape-display-large">
        <div class="giant-shape [shape-class]"></div>
    </div>

    <p class="answer-prompt">This is a <span class="answer-line">___________</span></p>
</div>
```
**Example**: Show large blue circle. "What shape is this? This is a ___" (Answer: circle)

**Shape Classes (ONLY BASIC SHAPES ALLOWED):**
- `.giant-shape.circle` - Blue circle
- `.giant-shape.square` - Red square
- `.giant-shape.triangle` - Green triangle
- `.giant-shape.rectangle` - Orange rectangle

**WARNING: DO NOT USE .star or .heart classes in Basic Shapes worksheets**

---

### **Question 2: Find the Shape** (Shape Hunting)
**Format**: Show multiple shapes, ask child to circle/color specific shape
**Pedagogical Purpose**: Shape discrimination, selective attention
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Find and circle all the TRIANGLES</p>

    <div class="shape-collection">
        <div class="shape-item circle"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item square"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item rectangle"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item circle"></div>
        <div class="shape-item square"></div>
    </div>

    <p class="answer-prompt">How many triangles did you find? <span class="answer-line">___</span></p>
</div>
```
**Example**: Show mix of 8 shapes (3 triangles, 2 circles, 2 squares, 1 rectangle). "Circle all the TRIANGLES. How many did you find?" (Answer: 3)

---

### **Question 3: Counting Shapes in a Scene** (Real-World Application)
**Format**: Show picture with multiple objects of same shape, ask to count
**Pedagogical Purpose**: Connecting shapes to real-world objects
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Count the CIRCLES in the picture</p>

    <div class="shape-scene">
        <!-- Create a simple scene with circle-shaped objects -->
        <!-- Example: balloons, wheels, clocks, buttons -->
        <div class="scene-object">
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
        </div>
        <!-- Or use CSS circles -->
        <div class="scene-circle small" style="background: #FF6B6B;"></div>
        <div class="scene-circle medium" style="background: #4ECDC4;"></div>
        <div class="scene-circle small" style="background: #FFD93D;"></div>
        <div class="scene-circle large" style="background: #6BCB77;"></div>
    </div>

    <p class="answer-prompt">I found <span class="answer-line">___</span> circles</p>
</div>
```
**Example**: Show scene with 5 circle objects (balls, buttons, wheels). "Count the circles. I found ___ circles" (Answer: 5)

---

### **Question 4: Shape Matching** (Properties Recognition)
**Format**: Match shapes on left to identical shapes on right
**Pedagogical Purpose**: Visual discrimination, same/different concept

**🚨 CRITICAL - CURRICULUM COMPLIANCE:**
- **ONLY USE**: circle, square, triangle, rectangle CSS classes
- **FORBIDDEN**: .heart, .star, .diamond, or ANY other shape classes
- **If you use hearts or stars → WORKSHEET WILL FAIL QUALITY CHECK**

**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Draw a line from each shape on the left to the SAME shape on the right</p>

    <div class="matching-container">
        <div class="match-left">
            <div class="match-shape circle"></div>
            <div class="match-shape square"></div>
            <div class="match-shape triangle"></div>
        </div>

        <div class="match-middle">
            <div class="match-line-space"></div>
            <div class="match-line-space"></div>
            <div class="match-line-space"></div>
        </div>

        <div class="match-right">
            <div class="match-shape triangle"></div>
            <div class="match-shape circle"></div>
            <div class="match-shape square"></div>
        </div>
    </div>

    <p class="answer-prompt">Draw lines to match the shapes</p>
</div>
```
**Example**: Left: circle, square, triangle. Right (scrambled): triangle, circle, square. "Draw lines to match"

---

### **Question 5: Shape Properties Challenge** (Consolidation)
**Format**: Multiple choice about shape properties (sides/corners)
**Pedagogical Purpose**: Understanding shape characteristics

**🚨 CRITICAL - CURRICULUM COMPLIANCE & RENDERING:**
- **ONLY USE**: circle, square, triangle, rectangle CSS classes
- **FORBIDDEN**: .heart, .star, .diamond, or ANY other shape classes
- **Triangle Rendering**: ALWAYS use `.choice-shape.triangle` CSS class - NEVER use text "Triangle" without the CSS shape
- **Each choice box MUST have**: `<div class="choice-shape [shape]"></div>` followed by `<p class="shape-name">[Shape]</p>`
- **If you use hearts/stars OR forget triangle CSS → WORKSHEET WILL FAIL QUALITY CHECK**

**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Which shape has 4 EQUAL sides? Circle your answer.</p>

    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape triangle"></div>
            <p class="shape-name">Triangle</p>
        </div>

        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape square"></div>
            <p class="shape-name">Square</p>
        </div>

        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape circle"></div>
            <p class="shape-name">Circle</p>
        </div>
    </div>

    <p class="answer-prompt">Circle your answer: A, B, or C</p>
</div>
```
**Example**: "Which shape has 4 equal sides?" Options: Triangle, Square, Circle (Answer: B, Square)

**Variation Questions for Q5:**
- "Which shape has NO corners?"
- "Which shape has 3 sides?"
- "Which shape is round?"
- "Which shape has 4 corners?"

---

## SHAPE VARIATION GUIDELINES

### Shape Distribution (Across 5 Questions):
- **Q1**: Use circle, square, triangle, or rectangle (PRIMARY shapes)
- **Q2**: Mix of 4-5 different shapes, target 1 specific shape
- **Q3**: Focus on circles (easiest to find in real-world)
- **Q4**: Use 3 different shapes for matching
- **Q5**: Properties question - square, triangle, circle, or rectangle

### Shape Counts for Q2 (Find the Shape):
- Total shapes shown: 8-10
- Target shape occurrences: 3-5
- Other shapes: Fill remaining spaces
- Ensure clear visual separation

### Real-World Shape Examples (Q3):
- **Circles**: balls, buttons, wheels, clocks, coins, suns, moons, balloons
- **Squares**: windows, boxes, crackers, tiles, pictures
- **Triangles**: roofs, pizza slices, party hats, sails, mountains
- **Rectangles**: doors, books, phones, rulers, boxes

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR SHAPES)

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

/* Q1: Giant Shape Display */
.shape-display-large {
    margin: 20px auto;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 4px solid #5a67d8;
    border-radius: 16px;
    max-width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 180px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.giant-shape {
    width: 120px;
    height: 120px;
}

.giant-shape.circle {
    border-radius: 50%;
    background: #4A90E2;
}

.giant-shape.square {
    background: #E74C3C;
}

.giant-shape.triangle {
    width: 120px !important;
    height: 120px !important;
    background: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
}

.giant-shape.triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 104px solid #27AE60;
    position: absolute;
    bottom: 8px;
}

.giant-shape.rectangle {
    width: 140px;
    height: 80px;
    background: #F39C12;
}

.giant-shape.star {
    background: #F1C40F;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.giant-shape.heart {
    background: #E91E63;
    width: 100px;
    height: 100px;
    position: relative;
}

.giant-shape.heart:before,
.giant-shape.heart:after {
    content: "";
    background: #E91E63;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
}

.giant-shape.heart:before {
    left: -30px;
}

.giant-shape.heart:after {
    right: -30px;
}

/* Q2: Shape Collection Grid */
.shape-collection {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin: 20px auto;
    max-width: 450px;
    padding: 20px;
    background: #f8f9ff;
    border-radius: 12px;
}

.shape-item {
    width: 80px;
    height: 80px;
    margin: 0 auto;
}

.shape-item.circle {
    border-radius: 50%;
    background: #4A90E2;
}

.shape-item.square {
    background: #E74C3C;
}

.shape-item.triangle {
    width: 80px !important;
    height: 80px !important;
    background: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
}

.shape-item.triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 69px solid #27AE60;
    position: absolute;
    bottom: 5px;
}

.shape-item.rectangle {
    width: 90px;
    height: 50px;
    background: #F39C12;
}

.shape-item.star {
    background: #F1C40F;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.shape-item.heart {
    background: #E91E63;
    width: 70px;
    height: 70px;
    position: relative;
    transform: rotate(-45deg);
}

.shape-item.heart:before {
    content: "";
    background: #E91E63;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: -25px;
    left: 0;
}

.shape-item.heart:after {
    content: "";
    background: #E91E63;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: -25px;
}

/* Q3: Shape Scene */
.shape-scene {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin: 20px auto;
    padding: 25px;
    background: linear-gradient(to bottom, #87CEEB 0%, #ffffff 100%);
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 500px;
    min-height: 200px;
}

.scene-circle {
    border-radius: 50%;
}

.scene-circle.small {
    width: 50px;
    height: 50px;
}

.scene-circle.medium {
    width: 70px;
    height: 70px;
}

.scene-circle.large {
    width: 90px;
    height: 90px;
}

/* Q4: Matching Container */
.matching-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    max-width: 500px;
    gap: 30px;
}

.match-left, .match-right {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.match-middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.match-line-space {
    height: 60px;
    border-bottom: 2px dashed #ccc;
}

.match-shape {
    width: 60px;
    height: 60px;
}

.match-shape.circle {
    border-radius: 50%;
    background: #4A90E2;
}

.match-shape.square {
    background: #E74C3C;
}

.match-shape.triangle {
    width: 60px !important;
    height: 60px !important;
    background: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
}

.match-shape.triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid #27AE60;
    position: absolute;
    bottom: 4px;
}

.match-shape.rectangle {
    width: 70px;
    height: 45px;
    background: #F39C12;
}

/* Q5: Shape Choices */
.shape-choices {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 20px auto;
    max-width: 550px;
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
    font-size: 18pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.choice-shape {
    width: 80px;
    height: 80px;
    margin: 10px auto;
}

.choice-shape.circle {
    border-radius: 50%;
    background: #4A90E2;
}

.choice-shape.square {
    background: #E74C3C;
}

.choice-shape.triangle {
    width: 80px !important;
    height: 80px !important;
    background: transparent;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
}

.choice-shape.triangle::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 69px solid #27AE60;
    position: absolute;
    bottom: 5px;
}

.choice-shape.rectangle {
    width: 90px;
    height: 55px;
    background: #F39C12;
}

.shape-name {
    font-size: 14pt;
    font-weight: 600;
    color: #555;
    margin-top: 10px;
}

/* Answer Prompts */
.answer-prompt {
    font-size: 15pt;
    margin: 10px 0;
    font-weight: 600;
    text-align: center;
}

.answer-line {
    display: inline-block;
    min-width: 100px;
    border-bottom: 2px solid #333;
    margin: 0 6px;
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

**Add after all questions:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Shape name - circle/square/triangle/rectangle]</p>
        <p><strong>2.</strong> [Number] triangles found</p>
        <p><strong>3.</strong> [Number] circles found</p>
        <p><strong>4.</strong> Matching: circle→circle, square→square, triangle→triangle</p>
        <p><strong>5.</strong> [Answer letter] - [Shape name with property]</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Giant shape identification?**
3. ✓ **Question 2 = Find and count specific shapes?**
4. ✓ **Question 3 = Count shapes in a scene?**
5. ✓ **Question 4 = Shape matching activity?**
6. ✓ **Question 5 = Shape properties (sides/corners)?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All shapes clearly visible and distinct?**
9. ✓ **Age-appropriate language (ages 4-5)?**
10. ✓ **CSS includes all necessary shape styles?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
