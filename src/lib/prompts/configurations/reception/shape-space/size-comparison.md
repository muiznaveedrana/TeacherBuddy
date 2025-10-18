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

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 4-5
- Progress from simple 2-object comparison to more complex

### Rule 4: Visual Clarity (CRITICAL)
- **Size differences must be OBVIOUS (not subtle)**
- Use CSS scaling for clear size differences
- Minimum 30% size difference for ages 4-5
- Same objects in different sizes (not different objects)

### Rule 5: Real-World Contexts
- **Use familiar objects and scenarios**
- Animals, toys, everyday items
- Relatable situations for 4-5 year olds

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Which is Bigger?** (Easiest - 2 Objects)
**Format**: Show 2 identical shapes/objects in different sizes
**Pedagogical Purpose**: Basic size discrimination
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Which ball is BIGGER? Circle your answer.</p>

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
**Example**: Small ball vs Large ball. "Which is BIGGER?" (Answer: Ball B)

---

### **Question 2: Which is Smaller/Shorter?** (Opposite Concept)
**Format**: Show 2 objects, ask for smaller/shorter
**Pedagogical Purpose**: Understanding opposite comparison terms
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Which tree is SHORTER? Circle your answer.</p>

    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Tree 1</span>
            <div class="tree-object tall-size"></div>
        </div>

        <div class="comparison-item">
            <span class="item-label">Tree 2</span>
            <div class="tree-object short-size"></div>
        </div>
    </div>

    <p class="answer-prompt">Circle: <span class="answer-choice">Tree 1</span> or <span class="answer-choice">Tree 2</span></p>
</div>
```
**Example**: Tall tree vs Short tree. "Which is SHORTER?" (Answer: Tree 2)

---

### **Question 3: Biggest Among Three** (Increased Complexity)
**Format**: Show 3 objects, identify biggest/tallest/longest
**Pedagogical Purpose**: Comparing multiple items, superlatives
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Which pencil is the LONGEST? Circle your answer.</p>

    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">Pencil A</span>
            <div class="pencil-object short-pencil"></div>
        </div>

        <div class="comparison-item">
            <span class="item-label">Pencil B</span>
            <div class="pencil-object long-pencil"></div>
        </div>

        <div class="comparison-item">
            <span class="item-label">Pencil C</span>
            <div class="pencil-object medium-pencil"></div>
        </div>
    </div>

    <p class="answer-prompt">Circle: A, B, or C</p>
</div>
```
**Example**: Short, Long, Medium pencils. "Which is LONGEST?" (Answer: Pencil B)

---

### **Question 4: Real-World Size Ordering** (Sequencing)
**Format**: Order 3 animals/objects from smallest to biggest
**Pedagogical Purpose**: Sequencing by size, practical application
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Draw lines to match each animal to its size order</p>

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

---

### **Question 5: Comparative Reasoning** (Application Challenge)
**Format**: Word problem with size comparison
**Pedagogical Purpose**: Applying size concepts to scenarios
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Ben is TALLER than Emma. Emma is TALLER than Lily. Who is the TALLEST?</p>

    <div class="height-comparison-scenario">
        <div class="child-figure">
            <div class="stick-figure short-height"></div>
            <p class="child-name">Lily</p>
        </div>

        <div class="child-figure">
            <div class="stick-figure medium-height"></div>
            <p class="child-name">Emma</p>
        </div>

        <div class="child-figure">
            <div class="stick-figure tall-height"></div>
            <p class="child-name">Ben</p>
        </div>
    </div>

    <p class="answer-prompt">The tallest is: <span class="answer-line">__________</span></p>
</div>
```
**Example**: Ben > Emma > Lily. "Who is TALLEST?" (Answer: Ben)

---

## SIZE COMPARISON GUIDELINES

### Object Types for Different Questions:
- **Q1 (Bigger/Smaller)**: Balls, circles, boxes, toys
- **Q2 (Taller/Shorter)**: Trees, towers, people, buildings
- **Q3 (Longest/Shortest)**: Pencils, ribbons, lines, snakes
- **Q4 (Ordering)**: Animals, vehicles, everyday objects
- **Q5 (Reasoning)**: People heights, tower heights

### Size Ratios (Make Differences Obvious):
- Small: 50-60px
- Medium: 80-90px
- Large: 110-130px
- Minimum 30% difference between sizes

### Child Names (for Q5):
**Boys:** Ben, Sam, Jack, Oliver, Noah, Harry, Leo
**Girls:** Emma, Lily, Sophie, Ava, Mia, Isla, Grace

### Verified Objects (WORKSHEET_OBJECTS):
- Farm animals: chicken, sheep, cow, horse, pig, duck
- Vehicles: car, bus, bike, train, plane
- Toys: ball, car, doll

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
    height: 80px;
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
        <p><strong>1.</strong> Ball B (bigger)</p>
        <p><strong>2.</strong> Tree 2 (shorter)</p>
        <p><strong>3.</strong> Pencil B (longest)</p>
        <p><strong>4.</strong> Smallest: Chicken, Medium: Sheep, Biggest: Horse</p>
        <p><strong>5.</strong> Ben (tallest)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Which is bigger? (2 objects)?**
3. ✓ **Question 2 = Which is smaller/shorter? (2 objects)?**
4. ✓ **Question 3 = Biggest/longest among 3?**
5. ✓ **Question 4 = Size ordering activity?**
6. ✓ **Question 5 = Comparative reasoning?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All size differences obvious (30%+ difference)?**
9. ✓ **Age-appropriate vocabulary (ages 4-5)?**
10. ✓ **Real-world, relatable contexts?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
