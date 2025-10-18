# Reception: More or Less - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception "More or Less" comparing quantities worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

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

### Rule 4: Comparison Language (CRITICAL)
- **Use age-appropriate comparison vocabulary ONLY**
- ALLOWED: "more", "less", "fewer", "same", "most", "fewest"
- Focus on visual comparison before numerical comparison
- Always compare quantities within 1-10 range

### Rule 5: Visual Support Required
- **EVERY question MUST have images showing the objects being compared**
- Use clear, distinct groups for comparison
- Show the EXACT objects mentioned in the question

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Simple Visual Comparison - More** (Easiest - Building Confidence)
**Format**: Show 2 groups of objects, ask which has more
**Pedagogical Purpose**: Direct visual comparison, introducing "more" concept
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Which group has MORE [objects]? Circle your answer.</p>

    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">Group A</span>
            <div class="objects-display">
                <!-- Show SMALLER quantity (e.g., 3 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="60" height="60" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>

        <div class="comparison-group">
            <span class="group-label">Group B</span>
            <div class="objects-display">
                <!-- Show LARGER quantity (e.g., 7 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="60" height="60" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>
    </div>

    <p class="answer-prompt">Circle the group with MORE: <span class="answer-choice">Group A</span> or <span class="answer-choice">Group B</span></p>
</div>
```
**Example**: Group A shows 3 apples, Group B shows 7 apples. "Which group has MORE apples?"

---

### **Question 2: Simple Visual Comparison - Fewer/Less** (Building Understanding)
**Format**: Show 2 groups of objects, ask which has fewer/less
**Pedagogical Purpose**: Introducing opposite concept of "fewer" or "less"
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Which group has FEWER [objects]? Circle your answer.</p>

    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">Group A</span>
            <div class="objects-display">
                <!-- Show LARGER quantity (e.g., 9 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="60" height="60" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>

        <div class="comparison-group">
            <span class="group-label">Group B</span>
            <div class="objects-display">
                <!-- Show SMALLER quantity (e.g., 4 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="60" height="60" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>
    </div>

    <p class="answer-prompt">Circle the group with FEWER: <span class="answer-choice">Group A</span> or <span class="answer-choice">Group B</span></p>
</div>
```
**Example**: Group A shows 9 flowers, Group B shows 4 flowers. "Which group has FEWER flowers?"

---

### **Question 3: Three-Way Comparison - Most** (Increased Complexity)
**Format**: Show 3 groups of different objects, ask which has the most
**Pedagogical Purpose**: Comparing multiple quantities, introducing "most"
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Which child has the MOST [objects]? Circle your answer.</p>

    <div class="three-way-comparison">
        <div class="comparison-group">
            <span class="group-label">[Name 1]</span>
            <div class="objects-display">
                <!-- Show quantity 1 (e.g., 5 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="55" height="55" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>

        <div class="comparison-group">
            <span class="group-label">[Name 2]</span>
            <div class="objects-display">
                <!-- Show quantity 2 (e.g., 8 objects) - MOST -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="55" height="55" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>

        <div class="comparison-group">
            <span class="group-label">[Name 3]</span>
            <div class="objects-display">
                <!-- Show quantity 3 (e.g., 3 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="55" height="55" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
        </div>
    </div>

    <p class="answer-prompt">Who has the MOST? <span class="answer-choice">[Name 1]</span>, <span class="answer-choice">[Name 2]</span>, or <span class="answer-choice">[Name 3]</span></p>
</div>
```
**Example**: "Emma has 5 cars, Ben has 8 cars, Lily has 3 cars. Who has the MOST cars?" (Answer: Ben)

---

### **Question 4: Count and Compare with Numbers** (Bridging to Numeracy)
**Format**: Show 2 groups, count each, write numbers, circle which is more/less
**Pedagogical Purpose**: Connecting visual comparison to numerical comparison
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Count the [objects] in each box. Which box has MORE?</p>

    <div class="count-compare-container">
        <div class="count-box">
            <span class="box-label">Box 1</span>
            <div class="objects-display">
                <!-- Show quantity 1 (e.g., 6 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
            <p class="count-prompt">Count: <span class="answer-line">___</span></p>
        </div>

        <div class="count-box">
            <span class="box-label">Box 2</span>
            <div class="objects-display">
                <!-- Show quantity 2 (e.g., 4 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
            <p class="count-prompt">Count: <span class="answer-line">___</span></p>
        </div>
    </div>

    <p class="answer-prompt">Which box has MORE? Circle: <span class="answer-choice">Box 1</span> or <span class="answer-choice">Box 2</span></p>
</div>
```
**Example**: Box 1 has 6 pencils, Box 2 has 4 pencils. "Count and circle which has MORE." (Answer: Box 1, 6)

---

### **Question 5: Real-World Comparison Challenge** (Application)
**Format**: Contextual scenario with comparison, multiple-choice or fill-in
**Pedagogical Purpose**: Applying comparison skills to meaningful situations
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">[Name 1] has [number] [objects]. [Name 2] has [number] [objects]. Who has FEWER [objects]?</p>

    <div class="context-comparison">
        <div class="child-scenario">
            <span class="child-name">[Name 1]</span>
            <div class="objects-display">
                <!-- Show first child's quantity (e.g., 7 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
            <p class="quantity-label">[number] [objects]</p>
        </div>

        <div class="child-scenario">
            <span class="child-name">[Name 2]</span>
            <div class="objects-display">
                <!-- Show second child's quantity (e.g., 10 objects) -->
                <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />
                <!-- Repeat for quantity -->
            </div>
            <p class="quantity-label">[number] [objects]</p>
        </div>
    </div>

    <p class="answer-prompt">Who has FEWER [objects]? <span class="answer-line">___________</span></p>
</div>
```
**Example**: "Emma has 7 cookies. Ben has 10 cookies. Who has FEWER cookies?" (Answer: Emma)

---

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

**FRESHNESS STRATEGY:** System provides forbidden list and priority categories. Select from fresh categories, avoid forbidden objects, target 80%+ new vocabulary.

**Never repeat the same object type across questions!**

---

## COMPARISON GUIDELINES (CRITICAL)

### Quantity Differences:
- **Clear Visual Differences**: Ensure quantities are visibly different (minimum difference of 2-3 objects for ages 4-5)
- **Appropriate Ratios**: For Q1-Q3, use ratios that are obvious (e.g., 3 vs 7, not 6 vs 7)
- **Progression**: Start with larger differences (Q1-Q2), then smaller differences (Q4-Q5)

### Child Names (Use diverse, common UK names):
- **Boys**: Ben, Sam, Jack, Oliver, Noah, Harry, Leo, Ethan
- **Girls**: Emma, Lily, Sophie, Ava, Mia, Isla, Grace, Ella

### Question Distribution:
- Q1: "More" comparison (2 groups)
- Q2: "Fewer/Less" comparison (2 groups)
- Q3: "Most" comparison (3 groups)
- Q4: Count and compare with numbers (2 groups)
- Q5: Real-world contextual comparison

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

/* Comparison Containers */
.comparison-container, .three-way-comparison, .count-compare-container, .context-comparison {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin: 15px auto;
    max-width: 600px;
    gap: 20px;
}

.comparison-group, .count-box, .child-scenario {
    flex: 1;
    padding: 12px;
    background: white;
    border: 3px solid #4CAF50;
    border-radius: 10px;
    text-align: center;
}

.group-label, .box-label, .child-name {
    display: block;
    font-size: 16pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.objects-display {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 10px auto;
    padding: 10px;
    background: #f8f9ff;
    border-radius: 8px;
}

.objects-display img {
    width: 50px;
    height: 50px;
    object-fit: contain;
}

/* Three-way comparison - tighter spacing */
.three-way-comparison .comparison-group {
    flex: 0 1 30%;
}

.three-way-comparison .objects-display img {
    width: 45px;
    height: 45px;
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
    min-width: 80px;
    border-bottom: 2px solid #333;
    margin: 0 6px;
    text-align: center;
}

.count-prompt {
    font-size: 14pt;
    margin-top: 8px;
    font-weight: 600;
}

.quantity-label {
    font-size: 13pt;
    margin-top: 6px;
    color: #555;
    font-weight: 600;
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
        <p><strong>1.</strong> Group [A/B] (the group with more objects)</p>
        <p><strong>2.</strong> Group [A/B] (the group with fewer objects)</p>
        <p><strong>3.</strong> [Name] (the child with the most objects)</p>
        <p><strong>4.</strong> Box 1: [count], Box 2: [count]. Box [1/2] has more.</p>
        <p><strong>5.</strong> [Name] (the child with fewer objects)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **All numbers 1-10 only?**
3. ✓ **Question 1 = "More" comparison (2 groups)?**
4. ✓ **Question 2 = "Fewer/Less" comparison (2 groups)?**
5. ✓ **Question 3 = "Most" comparison (3 groups)?**
6. ✓ **Question 4 = Count and compare with numbers?**
7. ✓ **Question 5 = Real-world contextual comparison?**
8. ✓ **Answer key present at bottom?**
9. ✓ **All different objects used?**
10. ✓ **All image paths correct (WORKSHEET_OBJECTS)?**
11. ✓ **Clear visual differences between compared quantities?**
12. ✓ **Age-appropriate comparison language used?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
