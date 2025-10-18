# Reception: Number Recognition - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception number recognition worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Number Range (CRITICAL)
- **ONLY use numbers 1-10** (NO exceptions - this is Reception ages 4-5)
- FORBIDDEN: 0, 11, 12, 15, 20, 100, 666, or ANY number <1 or >10
- ALLOWED: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ONLY

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 4-5
- DO NOT deviate from the prescribed format for each question number

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Simple Numeral Identification** (Easiest - Building Confidence)
**Format**: Show large numeral, ask child to identify/write it
**Pedagogical Purpose**: Direct recognition without distractions
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">What number is this?</p>

    <div class="number-display-large">
        <span class="giant-number">[NUMBER 1-10]</span>
    </div>

    <p class="answer-prompt">Write the number: <span class="answer-line">___</span></p>
</div>
```
**Example**: Show giant "5", ask "What number is this? Write the number: ___"

---

### **Question 2: Match Numeral to Objects** (Building Connections)
**Format**: Show numeral, provide 3 object groups (different quantities), ask to circle correct match
**Pedagogical Purpose**: Connecting abstract numeral to concrete quantity
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Circle the group that matches the number</p>

    <div class="number-display-medium">
        <span class="large-number">[TARGET NUMBER]</span>
    </div>

    <div class="multiple-choice-grid">
        <div class="choice-option">
            <span class="option-label">A.</span>
            <div class="objects-row">
                <!-- Show WRONG quantity (e.g., 5 objects when target is 3) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="45" height="45" alt="{Object}" />
                <!-- Repeat for wrong quantity -->
            </div>
        </div>

        <div class="choice-option">
            <span class="option-label">B.</span>
            <div class="objects-row">
                <!-- Show CORRECT quantity matching target number -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="45" height="45" alt="{Object}" />
                <!-- Repeat for CORRECT quantity -->
            </div>
        </div>

        <div class="choice-option">
            <span class="option-label">C.</span>
            <div class="objects-row">
                <!-- Show WRONG quantity (e.g., 1 object when target is 3) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="45" height="45" alt="{Object}" />
            </div>
        </div>
    </div>
</div>
```
**Example**: Show "3", provide options: A) 5 apples, B) 3 apples ✓, C) 1 apple

---

### **Question 3: Ten Frame Recognition** (Visual Support)
**Format**: Show objects in ten-frame (2x5 grid), ask how many
**Pedagogical Purpose**: Subitizing (instant recognition), structured counting
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">How many stars do you see? Write the number.</p>

    <div class="ten-frame">
        <div class="frame-row">
            <div class="frame-cell filled">★</div>
            <div class="frame-cell filled">★</div>
            <div class="frame-cell filled">★</div>
            <div class="frame-cell filled">★</div>
            <div class="frame-cell filled">★</div>
        </div>
        <div class="frame-row">
            <div class="frame-cell filled">★</div>
            <div class="frame-cell filled">★</div>
            <div class="frame-cell empty"></div>
            <div class="frame-cell empty"></div>
            <div class="frame-cell empty"></div>
        </div>
    </div>

    <p class="answer-prompt">The number is: <span class="answer-line">___</span></p>
</div>
```
**Example**: Show 7 stars in ten-frame (top row full, 2 in bottom), ask "How many stars?"

---

### **Question 4: Contextual Counting** (Real-World Application)
**Format**: Show objects in realistic scenario with context, ask to count and write number
**Pedagogical Purpose**: Applying skills to meaningful situations
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">[Name] has some [objects]. How many [objects] does [Name] have?</p>

    <div class="context-scene">
        <!-- Show objects arranged in realistic grouping (2 rows of 3, or scattered naturally) -->
        <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="55" height="55" alt="{Object}" />
        <!-- Repeat for quantity -->
    </div>

    <p class="answer-prompt">[Name] has <span class="answer-line">___</span> [objects].</p>
    <p class="answer-prompt">Write the number: <span class="answer-line">___</span></p>
</div>
```
**Example**: "Emma has some pencils. How many pencils does Emma have?" [Show 6 pencils] "Emma has ___ pencils. Write the number: ___"

---

### **Question 5: Matching Challenge** (Consolidation)
**Format**: Show 2 numerals on left, 4 picture groups on right, draw lines to match
**Pedagogical Purpose**: Testing multiple numbers, applying all learned skills
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Draw a line from the number to the correct picture</p>

    <div class="matching-container">
        <div class="match-left">
            <div class="number-box">[NUMBER 1]</div>
            <div class="number-box">[NUMBER 2]</div>
        </div>

        <div class="match-right">
            <div class="picture-option">
                <!-- Group with WRONG quantity for NUMBER 1 -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object1}.png" width="40" height="40" />
                <!-- Repeat for wrong quantity -->
            </div>
            <div class="picture-option">
                <!-- Group CORRECT for NUMBER 1 -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object2}.png" width="40" height="40" />
                <!-- Repeat for correct quantity -->
            </div>
            <div class="picture-option">
                <!-- Group CORRECT for NUMBER 2 -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object3}.png" width="40" height="40" />
                <!-- Repeat for correct quantity -->
            </div>
            <div class="picture-option">
                <!-- Group with WRONG quantity for NUMBER 2 -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object4}.png" width="40" height="40" />
                <!-- Repeat for wrong quantity -->
            </div>
        </div>
    </div>
</div>
```
**Example**: Show "4" and "8" on left. Show groups of: 8 butterflies, 4 flowers, 2 balls, 9 stars on right. Child draws lines to match.

---

## NUMBER VARIATION (CRITICAL - USE DIFFERENT NUMBERS EACH TIME)

**🔄 FRESHNESS RULE: VARY YOUR NUMBERS ACROSS WORKSHEETS**

- **DO NOT reuse the same numbers across iterations**
- **DO NOT always use 7, 5, 8 - these are too common!**
- For each worksheet generation, RANDOMLY select DIFFERENT numbers from 1-10
- Track which numbers you use and avoid repeating the same pattern

**Example Bad Practice** ❌:
- Iteration 1: Q1 uses 7, Q2 uses 5, Q3 uses 8 stars
- Iteration 2: Q1 uses 7 (REPEATED!), Q2 uses 5 (REPEATED!), Q3 uses 8 stars (REPEATED!)

**Example Good Practice** ✅:
- Iteration 1: Q1 uses 7, Q2 uses 5, Q3 uses 8 stars
- Iteration 2: Q1 uses 3 (DIFFERENT!), Q2 uses 9 (DIFFERENT!), Q3 uses 6 stars (DIFFERENT!)
- Iteration 3: Q1 uses 2 (DIFFERENT!), Q2 uses 10 (DIFFERENT!), Q3 uses 4 stars (DIFFERENT!)

**SPECIFIC INSTRUCTIONS:**
1. **Question 1 (Giant Number)**: Rotate through ALL numbers 1-10, not just 7
2. **Question 2 (Matching)**: Use different target numbers (not always 5!)
3. **Question 3 (Ten Frame)**: Vary the star count (1-10, not always 8!)
4. **Question 4 (Contextual)**: Change the quantity being counted
5. **Question 5 (Matching)**: Use different number pairs each time

## OBJECT VARIETY (Use DIFFERENT objects for each question)

**VERIFIED VOCABULARY - 67 objects:**
**Fruits:** apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons, peaches, pineapples
**Garden:** flowers, butterflies, bees, birds, trees, leaves, mushrooms, worms, acorns
**School:** books, pencils, erasers, crayons, markers, scissors, rulers, glue, backpacks
**Farm Animals:** chickens, cows, sheep, pigs, horses, ducks, goats, geese, turkeys
**Toys:** balls, cars, dolls, kites, blocks
**Vegetables:** carrots, tomatoes, broccoli, cucumbers, peppers, potatoes
**Sports:** footballs, basketballs, tennis balls, bats, medals
**Food:** cookies, cupcakes
**Shapes:** stars, hearts, circles, squares, diamonds, suns, moons
**Vehicles:** cars, buses, bikes, trains, planes

**Image paths**: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

---

## ULTRA-COMPACT CSS (STRATEGY 3 - OPTIMIZED FOR 5 QUESTIONS)

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

/* Q1: Giant Number Display - ULTRA COMPACT */
.number-display-large {
    margin: 10px auto;
    padding: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 3px solid #5a67d8;
    border-radius: 12px;
    max-width: 100px;
    text-align: center;
    box-shadow: 0 3px 8px rgba(0,0,0,0.18);
}

.giant-number {
    font-size: 36pt;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Q2: Medium Number Display - ULTRA COMPACT */
.number-display-medium {
    margin: 10px auto;
    padding: 15px;
    background: #FFA500;
    border: 3px solid #FF8C00;
    border-radius: 10px;
    max-width: 90px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.large-number {
    font-size: 32pt;
    font-weight: bold;
    color: white;
}

/* Q2: Multiple Choice - HORIZONTAL 3-COLUMN GRID */
.multiple-choice-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 10px auto;
    max-width: 600px;
}

.choice-option {
    padding: 10px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
}

.choice-option:hover {
    border-color: #4CAF50;
    background: #f0f9ff;
}

.option-label {
    font-size: 16pt;
    font-weight: bold;
    margin-right: 8px;
    color: #2c3e50;
    display: block;
    margin-bottom: 4px;
}

.objects-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}

.objects-row img {
    width: 38px;
    height: 38px;
}

/* Q3: Ten Frame - ULTRA COMPACT */
.ten-frame {
    display: table;
    margin: 10px auto;
    border: 2px solid #333;
    border-collapse: collapse;
    box-shadow: 0 2px 5px rgba(0,0,0,0.12);
}

.frame-row {
    display: table-row;
}

.frame-cell {
    display: table-cell;
    width: 38px;
    height: 38px;
    border: 2px solid #333;
    text-align: center;
    vertical-align: middle;
    font-size: 24pt;
}

.frame-cell.filled {
    background: #FFD700;
}

.frame-cell.empty {
    background: #FFFFFF;
}

/* Q4: Context Scene - ULTRA COMPACT */
.context-scene {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 10px auto;
    padding: 12px;
    background: #f8f9ff;
    border-radius: 8px;
    max-width: 420px;
}

.context-scene img {
    width: 42px;
    height: 42px;
}

/* Q5: Matching - ULTRA COMPACT */
.matching-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px auto;
    max-width: 500px;
    gap: 20px;
}

.match-left {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.match-right {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.number-box {
    width: 50px;
    height: 50px;
    background: #FF6347;
    color: white;
    border: 3px solid #DC143C;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24pt;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0,0,0,0.18);
}

.picture-option {
    display: flex;
    gap: 5px;
    padding: 6px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 6px;
    justify-content: center;
    flex-wrap: wrap;
}

.picture-option img {
    width: 32px;
    height: 32px;
}

/* Answer Prompts - ULTRA COMPACT */
.answer-prompt {
    font-size: 15pt;
    margin: 8px 0;
    font-weight: 600;
}

.answer-line {
    display: inline-block;
    min-width: 60px;
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
        <p><strong>1.</strong> [Q1 answer - the number shown]</p>
        <p><strong>2.</strong> [Q2 answer - option B (the matching group)]</p>
        <p><strong>3.</strong> [Q3 answer - count from ten-frame]</p>
        <p><strong>4.</strong> [Q4 answer - count from context scene]</p>
        <p><strong>5.</strong> [Q5 answer - both number matches, e.g., "4→flowers, 8→butterflies"]</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **All numbers 1-10 only?**
3. ✓ **Question 1 = Giant number format?**
4. ✓ **Question 2 = Multiple choice with 3 options?**
5. ✓ **Question 3 = Ten frame format?**
6. ✓ **Question 4 = Contextual scenario?**
7. ✓ **Question 5 = Matching with 2 numbers, 4 pictures?**
8. ✓ **Answer key present at bottom?**
9. ✓ **All different objects used?**
10. ✓ **All image paths correct (WORKSHEET_OBJECTS)?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Enhanced CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
