# Reception: Size Comparison - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception size comparison worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Comparison Vocabulary (CRITICAL)
- **Use age-appropriate size comparison words**
- PRIMARY VOCABULARY: bigger, smaller, taller, shorter, longer, wider
- SUPERLATIVES: biggest, smallest, tallest, shortest, longest
- Focus on visual comparison before measurement

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format with FRESHNESS
- **Follow the 5-question pedagogical STRUCTURE (question types) but USE FRESHNESS for object selection**
- Each question type has been researched and proven effective for ages 4-5
- Progress from simple 2-object comparison to more complex
- **CRITICAL: Examples show "ball", "tree", "carrot" but you MUST use FRESHNESS to select DIFFERENT objects**
- **DO NOT copy example objects - examples show FORMAT only, not which objects to use**

### Rule 4: Visual Clarity (CRITICAL - RECEPTION AGES 4-5)
- **Size differences must be EXAGGERATED and IMMEDIATELY OBVIOUS**
- **MANDATORY MINIMUM: 50% size difference for all comparisons (NOT 30%)**
- **CRITICAL: For Reception, differences must be "WOW that's big!" level obvious**
- Use CSS scaling for clear size differences (e.g., height: 60px vs height: 120px = 100% difference)
- **WRONG**: 80px vs 90px (only 12% difference - TOO SUBTLE for 4-year-olds)
- **CORRECT**: 60px vs 120px (100% difference - IMMEDIATELY OBVIOUS)
- Same objects in different sizes (not different objects)
- **CRITICAL: Children must be able to SEE the size difference from across the room - if two objects look similar in size, the question is INVALID**

### Rule 5: Real-World Contexts
- **Use familiar objects and scenarios**
- Animals, toys, everyday items
- Relatable situations for 4-5 year olds

## VERIFIED VOCABULARY - WORKSHEET_OBJECTS LIBRARY

**CRITICAL: You MUST ONLY use objects from this approved list. Using unlisted objects WILL result in broken images.**

**67 objects with confirmed working images:**

**Fruits (10) - Good for size comparison:** apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons, peaches, pineapples

**Garden & Nature (9):** flowers, butterflies, bees, birds, trees, leaves, mushrooms, worms, acorns

**School Supplies (9):** books, pencils, erasers, crayons, markers, scissors, rulers, glue, backpacks

**Farm Animals (9) - Good for size comparison:** chickens, cows, sheep, pigs, horses, ducks, goats, geese, turkeys

**Toys (5) - Excellent for size comparison:** balls, cars, dolls, kites, blocks

**Vegetables (6) - Good for size comparison:** carrots, tomatoes, broccoli, cucumbers, peppers, potatoes

**Sports Equipment (5) - Excellent for size comparison:** footballs, basketballs, tennis balls, bats, medals

**Food & Treats (2):** cookies, cupcakes

**Shapes & Objects (7) - Use for geometric comparisons:** stars, hearts, circles, squares, diamonds, suns, moons

**Vehicles (5) - Good for size comparison:** cars, buses, bikes, trains, planes
n**FRESHNESS STRATEGY:** System provides forbidden list and priority categories. Select from fresh categories, avoid forbidden objects, target 80%+ new vocabulary.

**IMAGE PATHS**: All images are in `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**Example Paths:**
- Fruits: `/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png`
- Toys: `/images/WORKSHEET_OBJECTS/counting/toys/bear.png`
- Sports: `/images/WORKSHEET_OBJECTS/counting/sports/basketball.png`
- Food Treats: `/images/WORKSHEET_OBJECTS/counting/food_treats/icecream.png`
- **Farm Animals (CRITICAL)**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png` (NOTE: `farm_animals` with UNDERSCORE, NOT `farm`)

**CRITICAL NOTES FOR SIZE COMPARISON:**
- Use actual images from WORKSHEET_OBJECTS with different width/height attributes for size differences
- **IGNORE example objects** (trees, ice cream, etc.) - Use FRESHNESS to select fresh objects from verified vocabulary
- **FORBIDDEN FOR SIZE COMPARISON**: Crayons (CSS rendering unreliable), rulers (CSS rendering unreliable), lollipops, giraffes
- **USE INSTEAD**: Actual images from WORKSHEET_OBJECTS - trees, flowers, mushrooms, animals, vehicles

**NOTE:** All objects above have verified images in WORKSHEET_OBJECTS directory. Using objects NOT in this list will result in broken images and worksheet failure.

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Which is Bigger?** (Easiest - 2 Objects)
**Format**: Show 2 identical shapes/objects in different sizes
**Pedagogical Purpose**: Basic size discrimination
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Which ball is bigger? Circle your answer.</p>

    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Ball A</span>
            <div class="circle-object small-size" style="background: #4A90E2;"></div>
        </div>

        <div class="comparison-item">
            <span class="item-label">Ball B</span>
            <div class="circle-object large-size" style="background: #4A90E2;"></div>
        </div>
    </div>

    <p class="answer-prompt">Circle: <span class="answer-choice">Ball A</span> or <span class="answer-choice">Ball B</span></p>
</div>
```
**Example**: Small ball vs Large ball. "Which is bigger?" (Answer: Ball B)
**CRITICAL**: Use plain text in questions - NO markdown (**, etc.) which renders as literal symbols
**AGE-APPROPRIATE TEXT**: "Which ball is bigger?" (lowercase/title case - NO CAPITALS like BIGGER)

---

### **Question 2: Which is Smaller/Shorter?** (Opposite Concept)
**Format**: Show 2 objects, ask for smaller/shorter
**Pedagogical Purpose**: Understanding opposite comparison terms
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Which tree is shorter? Circle your answer.</p>

    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Tree A</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/garden/tree.png" width="80" height="140" alt="Tree A" />
        </div>

        <div class="comparison-item">
            <span class="item-label">Tree B</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/garden/tree.png" width="50" height="80" alt="Tree B" />
        </div>
    </div>

    <p class="answer-prompt">Circle: <span class="answer-choice">Tree A</span> or <span class="answer-choice">Tree B</span></p>
</div>
```
**Example**: Tall tree (140px) vs Short tree (80px) with HUGE size difference. "Which is shorter?" (Answer: Tree B)
**CRITICAL**: Tree A must be 140px height, Tree B must be 80px height for 75% size difference (OBVIOUS to 4-year-olds)
**AGE-APPROPRIATE TEXT**: "Which tree is shorter?" (lowercase - NO CAPITALS like SHORTER)

---

### **Question 3: Biggest Among Three** (Increased Complexity)
**Format**: Show 3 objects, identify biggest/tallest/longest
**Pedagogical Purpose**: Comparing multiple items, superlatives

**🚨 CRITICAL - AVOID CSS PENCILS**: Do NOT use CSS-generated pencils (they render inconsistently and disproportionately large). Instead, use:
- **RECOMMENDED**: Carrots, bananas, snakes, ribbons, sticks from WORKSHEET_OBJECTS
- **EXAMPLE**: `/images/WORKSHEET_OBJECTS/counting/vegetables/carrot.png` at widths 40px, 70px, 100px

**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Which carrot is the longest? Circle your answer.</p>

    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">Carrot A</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/vegetables/carrot.png" width="40" height="60" alt="Carrot A" />
        </div>

        <div class="comparison-item">
            <span class="item-label">Carrot B</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/vegetables/carrot.png" width="70" height="100" alt="Carrot B" />
        </div>

        <div class="comparison-item">
            <span class="item-label">Carrot C</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/vegetables/carrot.png" width="100" height="140" alt="Carrot C" />
        </div>
    </div>

    <p class="answer-prompt">Circle: A, B, or C</p>
</div>
```
**Example**: Small, Medium, Large carrots. "Which is longest?" (Answer: Carrot C)
**AGE-APPROPRIATE TEXT**: "Which carrot is the longest?" (lowercase, NO capitals, NO ** markdown)
**CRITICAL**: AVOID CSS pencils - use actual images for consistent visual scale

---

### **Question 4: Real-World Size Ordering** (Sequencing)
**Format**: Order 3 animals/objects from smallest to biggest
**Pedagogical Purpose**: Sequencing by size, practical application

**🚨 CRITICAL PATH WARNING - MUST READ:**
- Farm animal images MUST use path: `/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png`
- NOTE THE UNDERSCORE: `farm_animals` NOT `farm`
- Using `/counting/farm/chicken.png` will cause BROKEN IMAGES
- Copy the EXACT paths from the HTML template below

**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Can you put these animals in order from smallest to biggest?</p>

    <div class="ordering-activity">
        <div class="animals-unsorted">
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png" width="50" height="50" alt="Chicken" />
                <p>Chicken</p>
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/horse.png" width="80" height="80" alt="Horse" />
                <p>Horse</p>
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/sheep.png" width="65" height="65" alt="Sheep" />
                <p>Sheep</p>
            </div>
        </div>

        <div class="size-labels">
            <div class="size-box">Smallest</div>
            <div class="size-box">Medium</div>
            <div class="size-box">Biggest</div>
        </div>
    </div>

    <p class="answer-prompt">Draw lines to order from smallest to biggest</p>
</div>
```
**Example**: Chicken (smallest), Sheep (medium), Horse (biggest)
**CRITICAL**: Use plain text - NO ** markdown in question text (renders as literal **)
**AGE-APPROPRIATE TEXT**: "Can you put these animals in order from smallest to biggest?" (lowercase)

---

### **Question 5: Comparative Reasoning with Images** (Application Challenge)
**Format**: Visual comparison with size reasoning
**Pedagogical Purpose**: Applying size concepts with visual support
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Look at the ice creams. Who has the tallest ice cream?</p>

    <div class="ice-cream-comparison">
        <div class="ice-cream-item">
            <img src="/images/WORKSHEET_OBJECTS/counting/food_treats/icecream.png" width="40" height="80" alt="Ben's ice cream" />
            <p class="child-name">Ben</p>
        </div>

        <div class="ice-cream-item">
            <img src="/images/WORKSHEET_OBJECTS/counting/food_treats/icecream.png" width="40" height="110" alt="Sam's ice cream" />
            <p class="child-name">Sam</p>
        </div>

        <div class="ice-cream-item">
            <img src="/images/WORKSHEET_OBJECTS/counting/food_treats/icecream.png" width="40" height="140" alt="Chloe's ice cream" />
            <p class="child-name">Chloe</p>
        </div>
    </div>

    <p class="answer-prompt">Who has the tallest? Circle: Ben, Sam, or Chloe</p>
</div>
```
**Example**: Chloe (140px) > Sam (110px) > Ben (80px). "Who has the tallest?" (Answer: Chloe)
**CRITICAL**: Use actual ice cream image at DIFFERENT heights (80px, 110px, 140px) for OBVIOUS visual differences
**NO MARKDOWN**: Plain text only - **tallest** renders as literal ** symbols
**AGE-APPROPRIATE TEXT**: "Look at the ice creams. Who has the tallest ice cream?" (lowercase - NO CAPITALS)

---

## SIZE COMPARISON GUIDELINES

### Object Types for Different Questions:
- **Q1 (Bigger/Smaller)**: Balls, circles, boxes, toys, oranges
- **Q2 (Taller/Shorter)**: Trees, flowers, mushrooms (using actual images from WORKSHEET_OBJECTS)
- **Q3 (Longest/Shortest)**: 🚨 AVOID CSS pencils - USE: carrots, bananas, snakes, ribbons with actual PNG images from WORKSHEET_OBJECTS
- **Q4 (Ordering)**: Animals, vehicles, everyday objects
- **Q5 (Reasoning with Images)**: Ice creams, trees, towers (using actual images)

### Size Ratios (EXAGGERATED for Reception Ages 4-5):
- **CRITICAL: MINIMUM 50% size difference for all comparisons**
- **Small**: 50-60px
- **Medium**: 100-120px (NOT 80-90px - too close to small!)
- **Large**: 130-150px
- **MANDATORY MINIMUM**: 50% difference (e.g., 60px → 120px = 100% difference)
- **WRONG EXAMPLE**: 80px vs 90px (only 12% difference - REJECT THIS!)
- **CORRECT EXAMPLE**: 60px vs 120px (100% difference - ACCEPTABLE!)
- **VALIDATION**: Before returning HTML, measure each size difference. If less than 50%, REGENERATE with bigger differences

### Child Names (for Q5):
**Boys:** Ben, Sam, Jack, Oliver, Noah, Harry, Leo
**Girls:** Emma, Lily, Sophie, Ava, Mia, Isla, Grace

### Verified Objects (WORKSHEET_OBJECTS):
- Farm animals: chicken, sheep, cow, horse, pig, duck
- Vehicles: car, bus, bike, train, plane
- Toys: ball, car, doll
- Food treats: `/images/WORKSHEET_OBJECTS/counting/food_treats/icecream.png` (use at heights 80px, 110px, 140px for Q5)

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR SIZE COMPARISON)

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

/* Size Comparison Containers */
.size-comparison-two, .size-comparison-three {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 600px;
    gap: 30px;
}

.comparison-item {
    text-align: center;
}

.item-label {
    display: block;
    font-size: 15pt;
    font-weight: bold;
    margin-bottom: 15px;
    color: #2c3e50;
}

/* Size Variants */
.small-size {
    width: 50px;
    height: 50px;
}

.medium-size {
    width: 80px;
    height: 80px;
}

.large-size {
    width: 120px;
    height: 120px;
}

/* Circle Objects */
.circle-object {
    border-radius: 50%;
    margin: 0 auto;
}

/* Tree Objects */
.tree-object {
    width: 60px;
    background: #27AE60;
    margin: 0 auto;
    border-radius: 5px 5px 0 0;
    position: relative;
}

.tree-object.short-size {
    height: 60px;
}

.tree-object.tall-size {
    height: 140px;
}

.tree-object::after {
    content: '';
    width: 20px;
    height: 30px;
    background: #8B4513;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
}

/* Crayon Objects (For Q2 - HUGE size differences) */
.crayon-object {
    width: 20px;
    background: linear-gradient(to bottom, #E74C3C 0%, #E74C3C 90%, #34495E 90%);
    margin: 0 auto;
    border-radius: 3px 3px 0 0;
    position: relative;
}

.short-crayon {
    height: 50px;
}

.tall-crayon {
    height: 130px;
}

.crayon-object::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #E74C3C;
}

/* Pencil Objects */
.pencil-object {
    width: 15px;
    background: linear-gradient(to bottom, #F39C12 0%, #F39C12 85%, #FFD700 85%, #FFD700 100%);
    margin: 0 auto;
    border-radius: 2px;
}

.short-pencil {
    height: 60px;
}

.medium-pencil {
    height: 90px;
}

.long-pencil {
    height: 130px;
}

/* Ordering Activity */
.ordering-activity {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    max-width: 600px;
    gap: 30px;
}

.animals-unsorted, .size-labels {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.animal-box, .size-box {
    padding: 15px;
    background: white;
    border: 3px solid #ddd;
    border-radius: 10px;
    text-align: center;
    min-width: 120px;
}

.animal-box img {
    object-fit: contain;
}

.size-box {
    font-weight: bold;
    font-size: 14pt;
    color: #2c3e50;
    background: #E3F2FD;
}

/* Ice Cream Comparison (Q5 with Images) */
.ice-cream-comparison {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 20px auto;
    padding: 20px;
    background: linear-gradient(to top, #FFF3E0 0%, #ffffff 100%);
    border: 3px solid #FF9800;
    border-radius: 12px;
    max-width: 500px;
    min-height: 200px;
}

.ice-cream-item {
    text-align: center;
}

.ice-cream-item img {
    object-fit: contain;
}

/* Height Comparison Scenario */
.height-comparison-scenario {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 20px auto;
    padding: 20px;
    background: linear-gradient(to top, #C8E6C9 0%, #ffffff 100%);
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 500px;
    min-height: 200px;
}

.child-figure {
    text-align: center;
}

.stick-figure {
    width: 40px;
    background: #2196F3;
    margin: 0 auto 10px;
    border-radius: 20px 20px 0 0;
}

.stick-figure.short-height {
    height: 80px;
}

.stick-figure.medium-height {
    height: 110px;
}

.stick-figure.tall-height {
    height: 140px;
}

.child-name {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
}

/* Answer Prompts */
.answer-prompt {
    font-size: 15pt;
    margin: 10px 0;
    font-weight: 600;
    text-align: center;
}

.answer-choice {
    display: inline-block;
    padding: 5px 12px;
    margin: 0 5px;
    border: 2px solid #333;
    border-radius: 20px;
    background: white;
    cursor: pointer;
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

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Bigger object] (e.g., Ball B - bigger)</p>
        <p><strong>2.</strong> Tree B (shorter) - 80px vs 140px for OBVIOUS difference</p>
        <p><strong>3.</strong> [Longest object] (e.g., Pencil B - longest)</p>
        <p><strong>4.</strong> Smallest: [smallest animal], Medium: [medium], Biggest: [biggest]</p>
        <p><strong>5.</strong> [Child name] (tallest ice cream - 140px vs 110px vs 80px)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Which is bigger? (2 objects with HUGE difference)?**
3. ✓ **Question 2 = Which is smaller/shorter? (Trees/flowers with 80px vs 140px - using actual images)?**
4. ✓ **Question 3 = Biggest/longest among 3 (clear gradation)?**
5. ✓ **Question 4 = Size ordering activity?**
6. ✓ **Question 5 = Ice cream comparison with images (80px, 110px, 140px)?**
7. ✓ **Answer key present at bottom?**
8. ✓ **CRITICAL: MINIMUM 50% size difference for ALL comparisons (NOT 30%!)?**
9. ✓ **CRITICAL: Check EACH object pair - measure the difference. 60px vs 70px = FAIL. 60px vs 120px = PASS.**
10. ✓ **CRITICAL: Q2 must use actual images (NOT CSS crayons/rulers) with 80px vs 140px (75% difference)**
11. ✓ **CRITICAL: Q3 must use actual images (NOT CSS pencils) - use carrots/bananas with PNG images**
12. ✓ **CRITICAL: Q5 ice cream images must be at DIFFERENT heights (80px, 110px, 140px)**
13. ✓ **CRITICAL: Can a 4-year-old see the difference from across the room?**
14. ✓ **CRITICAL: ALL question text uses lowercase/title case (NO CAPITALS like BIGGER, SHORTEST)?**
15. ✓ **Age-appropriate vocabulary (ages 4-5)?**
16. ✓ **Real-world, relatable contexts?**
17. ✓ **NO CSS pencils, crayons, or rulers used (they render unreliably)?**

**If ANY fails, STOP and regenerate with BIGGER size differences and age-appropriate text.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
