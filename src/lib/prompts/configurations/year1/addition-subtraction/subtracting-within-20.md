# Year 1: Subtracting within 20 - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 subtracting within 20 worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Subtraction Concepts (CRITICAL)
- **Subtract within 20 (minuends 0-20, differences non-negative)**
- Use number bonds (if 3+7=10, then 10-7=3)
- Counting back on number line
- Taking away (removal model)
- Finding the difference (comparison model)

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Progress from concrete (visual taking away) to abstract

### Rule 4: Visual Support (CRITICAL)
- **Cross out objects, number lines, ten-frames**
- Clear visual representations for subtraction
- Verified WORKSHEET_OBJECTS for concrete understanding

### Rule 5: Connection to Addition
- **Emphasize subtraction-addition relationship**
- Use fact families (3+7=10, 10-3=7, 10-7=3)
- Build on number bonds knowledge

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Picture Subtraction - Cross Out** (Easiest - Concrete)
**Format**: Show objects, cross out some, count remainder
**Pedagogical Purpose**: Understanding subtraction as taking away
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">There are 9 strawberries. Cross out 4. How many are left?</p>

    <div class="picture-subtraction">
        <div class="object-group">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Strawberry" />
        </div>
        <p class="instruction">Cross out 4 strawberries</p>
    </div>

    <div class="subtraction-equation">
        <span class="number">9</span>
        <span class="operator">−</span>
        <span class="number">4</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">9 − 4 = ___</p>
</div>
```
**Example**: 9 strawberries, cross out 4 (Answer: 5)

---

### **Question 2: Number Line Subtraction** (Counting Back)
**Format**: Use number line to count back
**Pedagogical Purpose**: Understanding subtraction as movement backward
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Use the number line. Start at 14, count back 6.</p>

    <div class="number-line-subtraction">
        <div class="number-line-visual">
            <div class="number-tick">5</div>
            <div class="number-tick">6</div>
            <div class="number-tick">7</div>
            <div class="number-tick end-point">8</div>
            <div class="number-tick">9</div>
            <div class="number-tick">10</div>
            <div class="number-tick">11</div>
            <div class="number-tick">12</div>
            <div class="number-tick">13</div>
            <div class="number-tick start-point">14</div>
            <div class="number-tick">15</div>
        </div>
        <p class="jump-label">Start at 14, jump back 6 ←</p>
    </div>

    <div class="subtraction-equation">
        <span class="number">14</span>
        <span class="operator">−</span>
        <span class="number">6</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">14 − 6 = ___</p>
</div>
```
**Example**: Start at 14, count back 6 (Answer: 8)

---

### **Question 3: Subtraction Using Ten-Frames** (Bridging Through 10)
**Format**: Use ten-frames to subtract, especially bridging through 10
**Pedagogical Purpose**: Using ten-frames for subtraction strategy
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Use the ten-frames. Cross out dots to subtract.</p>

    <div class="ten-frame-subtraction">
        <div class="double-ten-frame">
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
                    <div class="frame-cell filled"></div>
                    <div class="frame-cell filled"></div>
                </div>
            </div>
            <div class="ten-frame">
                <div class="frame-row">
                    <div class="frame-cell filled"></div>
                    <div class="frame-cell filled"></div>
                    <div class="frame-cell filled"></div>
                    <div class="frame-cell empty"></div>
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
        <p class="strategy-hint">13 dots total. Cross out 5.</p>
    </div>

    <div class="subtraction-equation">
        <span class="number">13</span>
        <span class="operator">−</span>
        <span class="number">5</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">13 − 5 = ___</p>
</div>
```
**Example**: 13 − 5 using ten-frames (Answer: 8)

---

### **Question 4: Fact Families** (Relationship to Addition)
**Format**: Complete fact family showing addition-subtraction relationship
**Pedagogical Purpose**: Understanding inverse operations
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Complete the fact family.</p>

    <div class="fact-family-box">
        <div class="fact-row">
            <span class="fact-equation">6 + 8 = 14</span>
        </div>
        <div class="fact-row">
            <span class="fact-equation">8 + 6 = <span class="answer-box-small"></span></span>
        </div>
        <div class="fact-row">
            <span class="fact-equation">14 − 6 = <span class="answer-box-small"></span></span>
        </div>
        <div class="fact-row">
            <span class="fact-equation">14 − 8 = <span class="answer-box-small"></span></span>
        </div>
    </div>

    <p class="answer-prompt">Write the missing numbers</p>
</div>
```
**Example**: Given 6+8=14, complete: 8+6=__, 14-6=__, 14-8=__ (Answers: 14, 8, 6)

---

### **Question 5: Word Problem - Subtraction** (Real-World Application)
**Format**: Simple word problem requiring subtraction
**Pedagogical Purpose**: Applying subtraction to real contexts
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Emma had 12 balloons. 7 balloons flew away. How many balloons does Emma have left?</p>

    <div class="word-problem-visual">
        <div class="problem-illustration">
            <div class="initial-group">
                <p class="illustration-label">Emma's balloons</p>
                <div class="object-array">
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="40" height="40" alt="Balloon" />
                </div>
                <p class="action-label">7 fly away ↑</p>
            </div>
        </div>
    </div>

    <div class="subtraction-equation">
        <span class="number">12</span>
        <span class="operator">−</span>
        <span class="number">7</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>

    <p class="answer-prompt">Emma has ___ balloons left.</p>
</div>
```
**Example**: 12 balloons − 7 fly away = ? (Answer: 5 balloons)

**Word Problem Contexts**:
- Balloons flying away
- Eating fruits/cookies
- Giving away toys/stickers
- Animals leaving/running away
- Books returned to shelf

---

## SUBTRACTION GUIDELINES

### Subtraction Facts Focus (Year 1):
- **Within 10**: All related to bonds to 10
- **From 10**: 10-1, 10-2, ..., 10-9
- **From teens**: 11-2, 12-5, 15-8, etc.
- **Fact families**: Link to addition bonds

### Mental Strategies:
1. **Count back**: For small differences
2. **Use number line**: Visual counting back
3. **Think addition**: "What adds to 7 to make 12?"
4. **Bridge through 10**: 13-5 = 13-3-2 = 10-2
5. **Part-part-whole**: Understand relationships

### Number Range:
- Minuends: 3-20
- Subtrahends: 1-10 (occasionally to 12)
- Differences: 0-19 (non-negative)

### Object Selection (WORKSHEET_OBJECTS):
- **Fruits**: strawberry, apple, banana, orange
- **Toys**: ball, car, teddy bear, doll
- **School**: pencil, book, crayon
- **Food**: Use for "eating" contexts

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR SUBTRACTION)

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

/* Picture Subtraction */
.picture-subtraction {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #E91E63;
    border-radius: 12px;
    max-width: 600px;
    text-align: center;
}

.object-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-bottom: 15px;
}

.object-group img {
    object-fit: contain;
}

.instruction {
    font-size: 15pt;
    font-weight: bold;
    color: #C2185B;
    margin-top: 10px;
}

/* Number Line Subtraction */
.number-line-subtraction {
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
    background: #E91E63;
    color: white;
    border-width: 3px;
    border-color: #AD1457;
}

.number-tick.end-point {
    background: #4CAF50;
    color: white;
    border-width: 3px;
    border-color: #2E7D32;
}

.jump-label {
    text-align: center;
    font-size: 15pt;
    font-weight: bold;
    color: #1976D2;
}

/* Ten-Frame Subtraction */
.ten-frame-subtraction {
    margin: 20px auto;
    max-width: 600px;
    text-align: center;
}

.double-ten-frame {
    display: flex;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #9C27B0;
    border-radius: 12px;
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
    font-size: 14pt;
    font-style: italic;
    color: #7B1FA2;
    margin-top: 15px;
}

/* Fact Families */
.fact-family-box {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #FF9800;
    border-radius: 12px;
    max-width: 400px;
}

.fact-row {
    margin: 12px 0;
    padding: 10px;
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
}

.fact-equation {
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
    text-align: center;
}

.initial-group {
    margin-bottom: 15px;
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
    margin: 10px 0;
}

.object-array img {
    object-fit: contain;
}

.action-label {
    font-size: 14pt;
    font-weight: bold;
    color: #FF5722;
    margin-top: 10px;
}

/* Subtraction Equation */
.subtraction-equation {
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
    color: #E91E63;
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
        <p><strong>1.</strong> 5 (9 − 4 = 5, picture subtraction)</p>
        <p><strong>2.</strong> 8 (14 − 6 = 8, number line)</p>
        <p><strong>3.</strong> 8 (13 − 5 = 8, ten-frames)</p>
        <p><strong>4.</strong> 14, 8, 6 (fact family: 6+8, 14-6, 14-8)</p>
        <p><strong>5.</strong> 5 balloons (12 − 7 = 5, word problem)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Picture subtraction (cross out)?**
3. ✓ **Question 2 = Number line subtraction (count back)?**
4. ✓ **Question 3 = Ten-frame subtraction?**
5. ✓ **Question 4 = Fact families (addition-subtraction link)?**
6. ✓ **Question 5 = Word problem with WORKSHEET_OBJECTS?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All differences non-negative (0-19)?**
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
