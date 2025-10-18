# Year 1: Number Bonds to 10 - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 number bonds to 10 worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Number Bonds Concept (CRITICAL)
- **Focus on number bonds to 10 (all pairs that make 10)**
- Pairs: 0+10, 1+9, 2+8, 3+7, 4+6, 5+5, 6+4, 7+3, 8+2, 9+1, 10+0
- Foundation for mental addition and subtraction
- Commutative property (3+7 = 7+3)
- Part-part-whole understanding

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 5-6
- Progress from concrete to abstract understanding

### Rule 4: Visual Support (CRITICAL)
- **Use ten-frames, part-part-whole diagrams, and object arrays**
- Clear visual representations of bonds
- Verified WORKSHEET_OBJECTS for concrete understanding
- Age-appropriate for 5-6 year olds

### Rule 5: Fluency Building
- **Develop automatic recall of number bonds to 10**
- Use varied representations (ten-frames, objects, numbers)
- Real-world contexts (fingers, dominos, fruit)
- Foundation for Year 2 bonds to 20

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Complete the Number Bond - Visual** (Easiest - Building Confidence)
**Format**: Show objects/dots, complete the bond to 10
**Pedagogical Purpose**: Visual understanding of bonds to 10
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Complete the number bond to 10.</p>

    <div class="bond-visual">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
            </div>
        </div>
    </div>

    <div class="bond-equation">
        <span class="number-filled">7</span>
        <span class="plus-sign">+</span>
        <span class="answer-box"></span>
        <span class="equals-sign">=</span>
        <span class="number-filled">10</span>
    </div>

    <p class="answer-prompt">7 + ___ = 10</p>
</div>
```
**Example**: Show 7 filled circles in ten-frame. "7 + ___ = 10" (Answer: 3)

---

### **Question 2: Part-Part-Whole Diagram** (Understanding Structure)
**Format**: Part-part-whole circles, find missing part
**Pedagogical Purpose**: Understanding parts and wholes
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Fill in the missing number to make 10.</p>

    <div class="part-whole-diagram">
        <div class="whole-circle">
            <span class="whole-number">10</span>
        </div>
        <div class="connecting-lines"></div>
        <div class="parts-row">
            <div class="part-circle">
                <span class="part-number">6</span>
            </div>
            <div class="part-circle missing">
                <span class="part-number">?</span>
            </div>
        </div>
    </div>

    <p class="answer-prompt">6 and ___ make 10</p>
</div>
```
**Example**: Whole = 10, Part 1 = 6, Part 2 = ? (Answer: 4)

---

### **Question 3: Number Bond Families** (Pattern Recognition)
**Format**: Show related bonds, find the pattern
**Pedagogical Purpose**: Understanding commutative property and bond families
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Complete the number bond family.</p>

    <div class="bond-family">
        <div class="bond-pair">
            <span class="bond-equation">3 + 7 = 10</span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">7 + 3 = <span class="answer-box-small"></span></span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">10 - 3 = <span class="answer-box-small"></span></span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">10 - 7 = <span class="answer-box-small"></span></span>
        </div>
    </div>

    <p class="answer-prompt">Write the missing numbers</p>
</div>
```
**Example**: Given 3+7=10, complete: 7+3=__, 10-3=__, 10-7=__ (Answers: 10, 7, 3)

---

### **Question 4: Real-World Objects** (Application)
**Format**: Use WORKSHEET_OBJECTS to show bonds to 10
**Pedagogical Purpose**: Applying bonds to real-world contexts
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Emma has 10 apples. 4 are red and the rest are green. How many are green?</p>

    <div class="object-bond-visual">
        <div class="objects-group red-apples">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
            <p class="object-label">4 red apples</p>
        </div>
        <div class="objects-group green-apples">
            <div class="placeholder-box">?</div>
            <p class="object-label">___ green apples</p>
        </div>
    </div>

    <div class="bond-equation">
        <span class="number-filled">4</span>
        <span class="plus-sign">+</span>
        <span class="answer-box"></span>
        <span class="equals-sign">=</span>
        <span class="number-filled">10</span>
    </div>

    <p class="answer-prompt">There are ___ green apples.</p>
</div>
```
**Example**: 10 apples total, 4 red, how many green? (Answer: 6)

**Object Scenarios**:
- Apples (red and green)
- Balloons (blue and yellow)
- Pencils (long and short)
- Books (open and closed)
- Stars (large and small)

---

### **Question 5: Quick Recall - Missing Bonds** (Fluency Challenge)
**Format**: Multiple missing bonds, quick recall practice
**Pedagogical Purpose**: Developing automaticity with bonds to 10
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Fill in the missing numbers to make 10.</p>

    <div class="quick-bonds-grid">
        <div class="bond-item">
            <span class="bond-mini">2 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">5 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">8 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">1 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini"><span class="answer-box-tiny"></span> + 6 = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini"><span class="answer-box-tiny"></span> + 3 = 10</span>
        </div>
    </div>

    <p class="answer-prompt">Complete all the number bonds</p>
</div>
```
**Example**: 2+__=10, 5+__=10, 8+__=10, 1+__=10, __+6=10, __+3=10 (Answers: 8, 5, 2, 9, 4, 7)

---

## NUMBER BONDS GUIDELINES

### All Number Bonds to 10:
- 0 + 10 = 10
- 1 + 9 = 10
- 2 + 8 = 10
- 3 + 7 = 10
- 4 + 6 = 10
- 5 + 5 = 10 (double)
- 6 + 4 = 10
- 7 + 3 = 10
- 8 + 2 = 10
- 9 + 1 = 10
- 10 + 0 = 10

### Bond Families (Focus on commutative property):
- 3 + 7 = 10, 7 + 3 = 10, 10 - 3 = 7, 10 - 7 = 3
- 4 + 6 = 10, 6 + 4 = 10, 10 - 4 = 6, 10 - 6 = 4
- 2 + 8 = 10, 8 + 2 = 10, 10 - 2 = 8, 10 - 8 = 2

### Object Selection (WORKSHEET_OBJECTS):
- **Fruits**: apple (red/green varieties), banana, orange, strawberry
- **Toys**: ball, car, teddy bear, kite
- **School**: pencil, book, crayon
- **Shapes**: star, heart, circle

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR NUMBER BONDS)

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

/* Bond Visual with Ten-Frame */
.bond-visual {
    text-align: center;
    margin: 20px auto;
}

.ten-frame {
    display: inline-block;
    padding: 10px;
    background: white;
    border: 4px solid #333;
    border-radius: 8px;
}

.frame-row {
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
}

.frame-row:last-child {
    margin-bottom: 0;
}

.frame-cell {
    width: 50px;
    height: 50px;
    border: 2px solid #333;
    border-radius: 4px;
    background: white;
}

.frame-cell.filled {
    background: #4CAF50;
    position: relative;
}

.frame-cell.filled::after {
    content: '';
    width: 30px;
    height: 30px;
    background: #2E7D32;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Bond Equation */
.bond-equation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #2196F3;
    border-radius: 12px;
    max-width: 400px;
    font-size: 24pt;
    font-weight: bold;
}

.number-filled {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4CAF50;
    color: white;
    border-radius: 8px;
    border: 3px solid #2E7D32;
}

.plus-sign, .equals-sign {
    font-size: 28pt;
    color: #333;
}

/* Part-Whole Diagram */
.part-whole-diagram {
    margin: 20px auto;
    max-width: 300px;
    text-align: center;
}

.whole-circle {
    width: 100px;
    height: 100px;
    background: #FF9800;
    border: 4px solid #F57C00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.whole-number {
    font-size: 36pt;
    font-weight: bold;
    color: white;
}

.connecting-lines {
    width: 2px;
    height: 40px;
    background: #333;
    margin: 0 auto;
    position: relative;
}

.connecting-lines::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -60px;
    width: 60px;
    height: 2px;
    background: #333;
}

.connecting-lines::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: -60px;
    width: 60px;
    height: 2px;
    background: #333;
}

.parts-row {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.part-circle {
    width: 80px;
    height: 80px;
    background: #4CAF50;
    border: 4px solid #2E7D32;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.part-circle.missing {
    background: white;
    border-color: #FF5722;
    border-style: dashed;
}

.part-number {
    font-size: 28pt;
    font-weight: bold;
    color: white;
}

.part-circle.missing .part-number {
    color: #FF5722;
}

/* Bond Families */
.bond-family {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #9C27B0;
    border-radius: 12px;
    max-width: 400px;
}

.bond-pair {
    margin: 12px 0;
    padding: 10px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
}

.bond-equation {
    font-size: 18pt;
    font-weight: bold;
    color: #2c3e50;
}

.answer-box-small {
    display: inline-block;
    min-width: 40px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 4px;
    background: #FFF9C4;
    margin: 0 5px;
    vertical-align: middle;
}

/* Object Bond Visual */
.object-bond-visual {
    display: flex;
    justify-content: space-around;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #E91E63;
    border-radius: 12px;
    max-width: 500px;
}

.objects-group {
    text-align: center;
    flex: 1;
}

.objects-group img {
    margin: 5px;
}

.object-label {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin-top: 10px;
}

.placeholder-box {
    width: 80px;
    height: 80px;
    background: white;
    border: 3px dashed #FF5722;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32pt;
    font-weight: bold;
    color: #FF5722;
    margin: 10px auto;
}

/* Quick Bonds Grid */
.quick-bonds-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #FF5722;
    border-radius: 12px;
    max-width: 500px;
}

.bond-item {
    padding: 12px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
    text-align: center;
}

.bond-mini {
    font-size: 16pt;
    font-weight: bold;
    color: #2c3e50;
}

.answer-box-tiny {
    display: inline-block;
    min-width: 35px;
    height: 35px;
    border: 2px solid #333;
    border-radius: 4px;
    background: #FFF9C4;
    margin: 0 3px;
    vertical-align: middle;
}

/* Answer Prompts and Boxes */
.answer-prompt {
    font-size: 15pt;
    margin: 15px 0;
    font-weight: 600;
    text-align: center;
}

.answer-box {
    display: inline-block;
    min-width: 60px;
    height: 60px;
    border: 3px solid #333;
    border-radius: 8px;
    background: #FFF9C4;
    margin: 0 8px;
    vertical-align: middle;
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
        <p><strong>1.</strong> 3 (7 + 3 = 10)</p>
        <p><strong>2.</strong> 4 (6 and 4 make 10)</p>
        <p><strong>3.</strong> 10, 7, 3 (bond family: 3+7=10, 7+3=10, 10-3=7, 10-7=3)</p>
        <p><strong>4.</strong> 6 green apples (4 + 6 = 10)</p>
        <p><strong>5.</strong> 8, 5, 2, 9, 4, 7 (bonds to 10)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Complete bond with ten-frame visual?**
3. ✓ **Question 2 = Part-whole diagram?**
4. ✓ **Question 3 = Number bond families?**
5. ✓ **Question 4 = Real-world objects from WORKSHEET_OBJECTS?**
6. ✓ **Question 5 = Quick recall grid (6 bonds)?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All bonds sum to 10?**
9. ✓ **Visual representations clear and accurate?**
10. ✓ **UK Year 1 curriculum aligned (ages 5-6)?**

**If ANY fails, STOP and regenerate.**

---

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
