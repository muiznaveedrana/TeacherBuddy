# Reception: Simple Patterns (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception simple patterns questions using **CSS-based shapes and WORKSHEET_OBJECTS images**.

## 🚨 ABSOLUTE RULE - IMG TAGS ONLY (NO EXCEPTIONS)

**YOU MUST USE `<img>` TAGS FOR ALL OBJECTS - NEVER TEXT LABELS**

### CRITICAL: Object Substitution Examples

When you see examples with one object, use the EXACT SAME pattern for ANY object you choose:

**Example 1: Fruits** (showing apples and bananas in pattern):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/banana.png" width="60" height="60" alt="Banana" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/banana.png" width="60" height="60" alt="Banana" />
```

**Example 2: Farm Animals** (showing chickens and pigs):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png" width="60" height="60" alt="Chicken" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png" width="60" height="60" alt="Pig" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png" width="60" height="60" alt="Chicken" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png" width="60" height="60" alt="Pig" />
```

**Example 3: School Supplies** (showing books and pencils):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png" width="60" height="60" alt="Pencil" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png" width="60" height="60" alt="Pencil" />
```

**Example 4: Garden** (showing flowers and butterflies):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/butterfly.png" width="60" height="60" alt="Butterfly" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/butterfly.png" width="60" height="60" alt="Butterfly" />
```

**Example 5: Toys** (showing cars and balls):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
```

❌ **FORBIDDEN** - Text labels:
```html
Chicken Pig Chicken Pig
Flower Butterfly Flower Butterfly
```

❌ **FORBIDDEN** - Mixing img tags with text:
```html
<img src="...chicken.png" /> Chicken <img src="...pig.png" /> Pig
```

**PATTERN**: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**FOLDER NAME MAPPING** (USE THESE EXACT NAMES):
- Fruits → `/counting/fruits/`
- Farm Animals → `/counting/farm_animals/` (NOT `/counting/farm/`)
- School Supplies → `/counting/school_supplies/` (NOT `/counting/school/`)
- Food Treats → `/counting/food_treats/` (NOT `/counting/food/`)
- Toys → `/counting/toys/`
- Garden → `/counting/garden/`
- Vegetables → `/counting/vegetables/`
- Sports → `/counting/sports/`
- Shapes → `/counting/shapes/`
- Vehicles → `/counting/vehicles/`

**THIS RULE APPLIES TO EVERY SINGLE OBJECT** - whether it's apples, chickens, pigs, flowers, or ANY other object in VERIFIED OBJECTS. ALWAYS use explicit img tags with correct folder names. NEVER use text labels.

## VERIFIED VOCABULARY (WORKSHEET_OBJECTS ONLY)
**Shapes (PRIMARY for patterns):** stars, hearts, circles, squares, diamonds, suns, moons | **Fruits (excellent variety):** apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons | **Farm Animals (excellent for AB/ABC):** chickens, cows, sheep, pigs, horses, ducks, goats, geese | **Garden:** flowers, butterflies, bees, birds, trees | **Food Treats:** cookies, cupcakes | **Toys:** balls, cars, dolls, kites, blocks | **Vehicles:** cars, buses, bikes, trains, planes | **Sports:** footballs, basketballs, tennis balls

**FRESHNESS:** System provides forbidden list, fresh categories, avoid forbidden objects, target 80%+ novelty.
**Paths:** `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png` | **FORBIDDEN:** Any object NOT listed = broken images
**Pattern Tips:** Combine shapes+colors for visual variety, use objects for real-world context

## 🔴 PATTERN ANSWER VALIDATION (CRITICAL - AUTO-FAIL IF VIOLATED)

**MANDATORY FOR Q1, Q4, Q5**: Correct answer MUST exist in multiple choice options

**VALIDATION PROCESS** (required BEFORE rendering):
1. Identify pattern sequence (ABAB → next is A, or ABC-ABC → next is C)
2. Determine correct next item
3. **VERIFY correct answer EXISTS in multiple choice options**
4. If missing → **REGENERATE options immediately**

✅ **CORRECT**: Pattern: Red Circle-Blue Square-Red Circle-Blue Square-? | Correct: Red Circle | Options: Red Circle ✓, Blue Square, Green Triangle
❌ **WRONG**: Pattern: Red Circle-Blue Square-Red Circle-Blue Square-? | Correct: Red Circle | Options: Yellow Star, Green Triangle ❌ (Red Circle missing!)

**Multiple Choice Rules**:
- ALWAYS include correct answer as one of 2-4 options
- Use 2-3 items FROM pattern itself
- Add 1-2 distractor items (not in pattern)
- Match item types (shapes with shapes, objects with objects)

**FAILURE TO VALIDATE = AUTO-FAIL (Score 40/100)**

---

## CRITICAL RULES

**Questions:** EXACTLY {{questionCount}} - count before returning
**Patterns:** AB and ABB patterns with shapes and real objects
**Pattern Validation:** 🚨 Q1, Q4, Q5 MUST have correct answer in multiple choice options (see above)
**Colors:** Use colored question backgrounds (#FFF9C4, #E3F2FD, #F1F8E9, #FCE4EC, #FFF3E0)
**Visual:** Clear patterns children ages 4-5 can continue
**Spacing:** 🚨 CRITICAL - Pattern items MUST have visible gaps (15px minimum) so shapes don't touch
**CSS:** Include the compact CSS block below in generated HTML (gap: 15px already set)
**🚨 FRESHNESS**: Examples above (apples/bananas, chickens/pigs, books/pencils, flowers/butterflies, cars/balls) show FORMAT ONLY - USE FRESHNESS to select VARIED object pairs from different categories. DO NOT copy the example objects - select fresh object pairs using system guidance.

## 5-QUESTION FORMAT

**Q1:** AB pattern - what comes next? (colored shapes)
**Q2:** ABB pattern - what comes next? (shapes)
**Q3:** Copy pattern (hands-on practice)
**Q4:** AB pattern with objects from WORKSHEET_OBJECTS
**Q5:** ABC pattern (most complex)

## COLORS

Red (#E74C3C), Blue (#4A90E2), Green (#27AE60), Yellow (#F1C40F), Pink (#E91E63), Orange (#F39C12), Purple (#9B59B6)

## SHAPES

Circle, Square, Triangle, Star, Heart

## AVAILABLE OBJECTS (for Q4)

### Toys
ball, car, doll, kite, blocks, train

### Fruits
apple, banana, orange, strawberry, watermelon

### Farm Animals
cow, pig, sheep, chicken, duck, horse

## ULTRA-COMPACT CSS (MANDATORY - INCLUDE IN OUTPUT)

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

/* Pattern Sequences - CRITICAL: 15px gap for clear spacing between items */
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
.triangle.red { border-bottom-color: #E74C3C; background: none; }
.triangle.blue { border-bottom-color: #4A90E2; background: none; }
.triangle.green { border-bottom-color: #27AE60; background: none; }
.triangle.yellow { border-bottom-color: #F1C40F; background: none; }
.triangle.pink { border-bottom-color: #E91E63; background: none; }

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
    gap: 10px;
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

## EXAMPLE OUTPUT

**Q1 (AB Pattern - What Next?):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What comes NEXT?</p>
    <div class="pattern-sequence">
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices">
        <div class="choice-item circle red"></div>
        <div class="choice-item circle blue"></div>
    </div>
    <p class="answer-prompt">Circle your answer</p>
</div>
```

**Q2 (ABB Pattern - Continue):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Draw the missing shapes</p>
    <div class="pattern-sequence">
        <div class="pattern-item square green"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item square green"></div>
        <div class="pattern-blank"></div>
        <div class="pattern-blank"></div>
    </div>
</div>
```

**Q4 (Objects):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> What comes next?</p>
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
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="50" height="50" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="50" height="50" />
        </div>
    </div>
</div>
```

**Q5 (ABC Pattern):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> What comes next?</p>
    <div class="pattern-sequence">
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item circle green"></div>
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box"><span class="choice-label">A</span><div class="choice-shape triangle red"></div></div>
        <div class="choice-box"><span class="choice-label">B</span><div class="choice-shape circle green"></div></div>
        <div class="choice-box"><span class="choice-label">C</span><div class="choice-shape square blue"></div></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Red circle (AB pattern)</p>
        <p><strong>2.</strong> Yellow circle, Yellow circle (ABB pattern)</p>
        <p><strong>3.</strong> Copy: Star-Heart-Star-Heart</p>
        <p><strong>4.</strong> A - Ball (AB pattern with toys)</p>
        <p><strong>5.</strong> B - Green circle (ABC pattern)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

**IMPORTANT:** Include the CSS block above in a `<style>` tag in the generated HTML output.

Generate worksheet NOW.
