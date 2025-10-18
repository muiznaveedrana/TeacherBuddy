# Year 1: Adding to 20 - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 adding to 20 worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Addition Concepts (CRITICAL)
- **Add numbers within 20 (results 0-20)**
- Use number bonds knowledge (especially bonds to 10)
- Bridging through 10 (e.g., 8+5 = 8+2+3 = 10+3)
- Commutative property (3+5 = 5+3)
- Visual support for concrete understanding

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 5-6
- Progress from concrete to abstract

### Rule 4: Visual Support (CRITICAL)
- **Use object arrays, ten-frames, number lines**
- Clear visual representations for addition
- Verified WORKSHEET_OBJECTS for counting
- Age-appropriate for 5-6 year olds

### Rule 5: Building Fluency
- **Develop mental addition strategies**
- Use doubles (5+5, 6+6, 7+7, 8+8)
- Near doubles (6+7 is 6+6+1)
- Making 10 first (8+7 = 8+2+5 = 10+5)

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Picture Addition - Count All** (Easiest - Concrete)
**Format**: Show two groups of objects, count all to find sum
**Pedagogical Purpose**: Concrete understanding of addition as combining
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Add the apples. How many apples in total?</p>

    <div class="picture-addition">
        <div class="group-container">
            <div class="addend-group">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <p class="group-label">5 apples</p>
            </div>
            <div class="plus-symbol">+</div>
            <div class="addend-group">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <p class="group-label">3 apples</p>
            </div>
        </div>
    </div>

    <div class="addition-equation">
        <span class="number">5</span>
        <span class="operator">+</span>
        <span class="number">3</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">5 + 3 = ___</p>
</div>
```
**Example**: 5 apples + 3 apples = ? (Answer: 8)

---

### **Question 2: Number Line Addition** (Visual Strategy)
**Format**: Use number line to show addition as jumps forward
**Pedagogical Purpose**: Understanding addition as movement/counting on
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Use the number line to find the answer.</p>

    <div class="number-line-addition">
        <div class="number-line-visual">
            <div class="number-tick">0</div>
            <div class="number-tick">1</div>
            <div class="number-tick">2</div>
            <div class="number-tick">3</div>
            <div class="number-tick">4</div>
            <div class="number-tick">5</div>
            <div class="number-tick">6</div>
            <div class="number-tick start-point">7</div>
            <div class="number-tick">8</div>
            <div class="number-tick">9</div>
            <div class="number-tick">10</div>
            <div class="number-tick">11</div>
            <div class="number-tick">12</div>
            <div class="number-tick">13</div>
            <div class="number-tick end-point">14</div>
        </div>
        <p class="jump-label">Start at 7, jump forward 5 →</p>
    </div>

    <div class="addition-equation">
        <span class="number">7</span>
        <span class="operator">+</span>
        <span class="number">5</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">7 + 5 = ___</p>
</div>
```
**Example**: Start at 7, jump 5 forward (Answer: 12)

---

### **Question 3: Ten-Frame Addition (Bridging Through 10)** (Key Strategy)
**Format**: Use double ten-frames to show making 10
**Pedagogical Purpose**: Understanding bridging through 10 strategy
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Use the ten-frames to add.</p>

    <div class="ten-frame-addition">
        <div class="double-ten-frame">
            <div class="frame-section">
                <p class="frame-label">First addend: 8</p>
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
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                </div>
            </div>
            <div class="frame-section">
                <p class="frame-label">Second addend: 6</p>
                <div class="ten-frame">
                    <div class="frame-row">
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                    <div class="frame-row">
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                </div>
            </div>
        </div>
        <p class="strategy-hint">8 + 2 = 10, then 10 + 4 = ?</p>
    </div>

    <div class="addition-equation">
        <span class="number">8</span>
        <span class="operator">+</span>
        <span class="number">6</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">8 + 6 = ___</p>
</div>
```
**Example**: 8 + 6 using ten-frames (Answer: 14)

---

### **Question 4: Missing Addend** (Inverse Thinking)
**Format**: Given sum and one addend, find missing addend
**Pedagogical Purpose**: Developing flexibility with addition/subtraction relationship
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Find the missing number.</p>

    <div class="missing-addend-visual">
        <div class="part-whole-addition">
            <div class="total-circle">
                <span class="total-number">13</span>
                <p class="circle-label">Total</p>
            </div>
            <div class="parts-addition">
                <div class="part-box filled">
                    <span class="part-number">7</span>
                </div>
                <div class="part-box missing">
                    <span class="part-number">?</span>
                </div>
            </div>
        </div>
    </div>

    <div class="addition-equation">
        <span class="number">7</span>
        <span class="operator">+</span>
        <span class="answer-box"></span>
        <span class="operator">=</span>
        <span class="number">13</span>
    </div>

    <p class="answer-prompt">7 + ___ = 13</p>
</div>
```
**Example**: 7 + ? = 13 (Answer: 6)

---

### **Question 5: Word Problem - Addition** (Real-World Application)
**Format**: Simple word problem requiring addition
**Pedagogical Purpose**: Applying addition to real-world contexts
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Ben has 9 toy cars. His friend gives him 5 more cars. How many cars does Ben have now?</p>

    <div class="word-problem-visual">
        <div class="problem-illustration">
            <div class="initial-group">
                <p class="illustration-label">Ben's cars</p>
                <div class="object-array">
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                </div>
            </div>
            <div class="added-group">
                <p class="illustration-label">Friend gives 5 more</p>
                <div class="object-array">
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                </div>
            </div>
        </div>
    </div>

    <div class="addition-equation">
        <span class="number">9</span>
        <span class="operator">+</span>
        <span class="number">5</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">Ben has ___ cars.</p>
</div>
```
**Example**: 9 cars + 5 cars = ? (Answer: 14 cars)

**Word Problem Contexts**:
- Toys (cars, balls, dolls)
- Fruits (apples, bananas, oranges)
- Books/pencils
- Stickers/stars
- Animals (birds, fish)

---

## ADDITION GUIDELINES

### Addition Facts Focus (Year 1):
- **Within 10**: All bonds to 10 (fluent recall)
- **Doubles**: 5+5, 6+6, 7+7, 8+8, 9+9
- **Near doubles**: 6+7 (use 6+6+1)
- **Bridging 10**: 8+5, 7+6, 9+4 (make 10 first)
- **Adding to teens**: 11+3, 12+5, 14+6

### Mental Strategies:
1. **Count all**: For beginners (visual support)
2. **Count on**: Start from larger number
3. **Make 10**: Bridge through 10
4. **Use doubles**: Know doubles facts
5. **Part-part-whole**: Understand relationships

### Number Range:
- Addends: 0-10 (occasionally to 12)
- Sums: 0-20 (must not exceed 20)
- Focus on sums 11-20 for challenge

### Object Selection (WORKSHEET_OBJECTS):
- **Fruits**: apple, banana, orange, strawberry
- **Toys**: car, ball, teddy bear, doll, kite
- **School**: pencil, book, crayon
- **Animals**: Use farm animals for word problems

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR ADDITION)

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

/* Picture Addition */
.picture-addition {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 600px;
}

.group-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
}

.addend-group {
    text-align: center;
    flex: 1;
}

.addend-group img {
    margin: 5px;
}

.group-label {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin-top: 10px;
}

.plus-symbol {
    font-size: 48pt;
    font-weight: bold;
    color: #FF9800;
}

/* Number Line Addition */
.number-line-addition {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #2196F3;
    border-radius: 12px;
    max-width: 700px;
}

.number-line-visual {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    padding: 30px 10px 10px;
    margin-bottom: 15px;
}

.number-line-visual::before {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 3%;
    right: 3%;
    height: 4px;
    background: #333;
}

.number-tick {
    width: 40px;
    height: 40px;
    background: #E0E0E0;
    border: 2px solid #999;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13pt;
    font-weight: bold;
    position: relative;
    z-index: 1;
}

.number-tick.start-point {
    background: #4CAF50;
    color: white;
    border-width: 3px;
    border-color: #2E7D32;
}

.number-tick.end-point {
    background: #FF9800;
    color: white;
    border-width: 3px;
    border-color: #F57C00;
}

.jump-label {
    text-align: center;
    font-size: 15pt;
    font-weight: bold;
    color: #1976D2;
}

/* Ten-Frame Addition */
.ten-frame-addition {
    margin: 20px auto;
    max-width: 600px;
}

.double-ten-frame {
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #9C27B0;
    border-radius: 12px;
}

.frame-section {
    text-align: center;
}

.frame-label {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.ten-frame {
    display: inline-block;
    padding: 8px;
    background: white;
    border: 3px solid #333;
    border-radius: 8px;
}

.frame-row {
    display: flex;
    gap: 4px;
    margin-bottom: 4px;
}

.frame-row:last-child {
    margin-bottom: 0;
}

.frame-cell {
    width: 45px;
    height: 45px;
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
    width: 28px;
    height: 28px;
    background: #2E7D32;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.strategy-hint {
    text-align: center;
    font-size: 14pt;
    font-style: italic;
    color: #7B1FA2;
    margin-top: 15px;
}

/* Missing Addend Visual */
.missing-addend-visual {
    margin: 20px auto;
    max-width: 400px;
}

.part-whole-addition {
    text-align: center;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #E91E63;
    border-radius: 12px;
}

.total-circle {
    width: 100px;
    height: 100px;
    background: #FF9800;
    border: 4px solid #F57C00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto 20px;
}

.total-number {
    font-size: 36pt;
    font-weight: bold;
    color: white;
}

.circle-label {
    font-size: 11pt;
    color: white;
    margin: 0;
}

.parts-addition {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.part-box {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 3px solid;
}

.part-box.filled {
    background: #4CAF50;
    border-color: #2E7D32;
}

.part-box.missing {
    background: white;
    border-color: #FF5722;
    border-style: dashed;
}

.part-number {
    font-size: 28pt;
    font-weight: bold;
    color: white;
}

.part-box.missing .part-number {
    color: #FF5722;
}

/* Word Problem Visual */
.word-problem-visual {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #FF5722;
    border-radius: 12px;
    max-width: 600px;
}

.problem-illustration {
    display: flex;
    gap: 30px;
    justify-content: space-around;
}

.initial-group, .added-group {
    text-align: center;
    flex: 1;
}

.illustration-label {
    font-size: 13pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.object-array {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
}

.object-array img {
    object-fit: contain;
}

/* Addition Equation */
.addition-equation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin: 20px auto;
    padding: 15px;
    background: white;
    border: 3px solid #333;
    border-radius: 12px;
    max-width: 400px;
    font-size: 24pt;
    font-weight: bold;
}

.number {
    min-width: 50px;
    text-align: center;
    color: #2c3e50;
}

.operator {
    font-size: 28pt;
    color: #FF9800;
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
    height: 50px;
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
        <p><strong>1.</strong> 8 (5 + 3 = 8)</p>
        <p><strong>2.</strong> 12 (7 + 5 = 12, number line)</p>
        <p><strong>3.</strong> 14 (8 + 6 = 14, bridging through 10)</p>
        <p><strong>4.</strong> 6 (7 + 6 = 13, missing addend)</p>
        <p><strong>5.</strong> 14 cars (9 + 5 = 14, word problem)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Picture addition (object groups)?**
3. ✓ **Question 2 = Number line addition?**
4. ✓ **Question 3 = Ten-frame addition (bridging 10)?**
5. ✓ **Question 4 = Missing addend?**
6. ✓ **Question 5 = Word problem with WORKSHEET_OBJECTS?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All sums within 0-20?**
9. ✓ **Visual supports clear and accurate?**
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
