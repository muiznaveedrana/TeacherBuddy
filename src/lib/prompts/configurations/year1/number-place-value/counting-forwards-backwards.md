# Year 1: Counting Forwards and Backwards - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 counting forwards and backwards worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Counting Skills (CRITICAL)
- **Count forwards and backwards within 100**
- Focus primarily on 0-20 for Year 1 start
- Include some 20-50 for stretch
- Count in ones from any number
- Count backwards (reverse counting)

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 5-6
- Progress from simple forward counting to backward counting

### Rule 4: Visual Support (CRITICAL)
- **Use number lines, number tracks, and object sequences**
- Clear visual cues for counting direction
- Arrows showing forward/backward direction
- Age-appropriate for 5-6 year olds

### Rule 5: Practical Application
- **Real-world counting contexts**
- Steps, houses, books on shelf, days
- Making counting meaningful and relatable

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Count Forwards - Fill Missing Numbers** (Easiest - Building Confidence)
**Format**: Number sequence with 2-3 missing numbers, count forwards
**Pedagogical Purpose**: Sequential counting, number order
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Fill in the missing numbers. Count FORWARDS.</p>

    <div class="number-sequence">
        <div class="sequence-box filled">5</div>
        <div class="sequence-box filled">6</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">8</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
        <div class="sequence-box filled">11</div>
    </div>

    <p class="answer-prompt">Write the missing numbers</p>
</div>
```
**Example**: 5-6-__-8-__-10-11 (Answer: 7, 9)

---

### **Question 2: Count Backwards - Fill Missing Numbers** (Reverse Sequence)
**Format**: Number sequence with missing numbers, count backwards
**Pedagogical Purpose**: Backward counting fluency
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Fill in the missing numbers. Count BACKWARDS.</p>

    <div class="number-sequence backwards">
        <div class="sequence-box filled">15</div>
        <div class="sequence-box filled">14</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">12</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
    </div>

    <div class="direction-arrow backwards">←</div>

    <p class="answer-prompt">Write the missing numbers</p>
</div>
```
**Example**: 15-14-__-12-__-10 (Answer: 13, 11)

---

### **Question 3: Number Line Jumps - Forwards** (Visual Counting)
**Format**: Number line with arrows, count forwards by ones
**Pedagogical Purpose**: Understanding counting as movement on number line
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Start at 8. Count forwards 5 steps. Where do you land?</p>

    <div class="number-line-jumps">
        <div class="number-line-extended">
            <div class="number-point">6</div>
            <div class="number-point">7</div>
            <div class="number-point start">8</div>
            <div class="number-point">9</div>
            <div class="number-point">10</div>
            <div class="number-point">11</div>
            <div class="number-point">12</div>
            <div class="number-point end">13</div>
            <div class="number-point">14</div>
        </div>
        <div class="jump-instruction">
            <p>Make 5 jumps forward →</p>
        </div>
    </div>

    <p class="answer-prompt">You land on <span class="answer-box"></span></p>
</div>
```
**Example**: Start at 8, count forward 5 steps (Answer: 13)

---

### **Question 4: Real-World Counting - Stairs/Steps** (Application)
**Format**: Visual of stairs/steps, count forwards or backwards
**Pedagogical Purpose**: Practical application of counting
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Emma is climbing stairs. She starts at step 3 and climbs up 6 more steps. What step is she on now?</p>

    <div class="stairs-visual">
        <div class="stair-step">9</div>
        <div class="stair-step">8</div>
        <div class="stair-step">7</div>
        <div class="stair-step">6</div>
        <div class="stair-step">5</div>
        <div class="stair-step">4</div>
        <div class="stair-step start-step">3</div>
        <div class="stair-step">2</div>
        <div class="stair-step">1</div>
    </div>

    <p class="answer-prompt">Emma is on step <span class="answer-box"></span></p>
</div>
```
**Example**: Start at step 3, climb 6 steps (Answer: step 9)

**Alternative contexts**:
- Houses on a street (number 5, count forward 7 houses)
- Books on shelf (book 10, count backward 4 books)
- Days of the month (12th, count forward 5 days)

---

### **Question 5: Count Backwards Challenge** (Most Complex)
**Format**: Number line jumps backwards, multi-step
**Pedagogical Purpose**: Backward counting fluency, challenge question
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Start at 20. Count backwards 7 steps. Where do you land?</p>

    <div class="number-line-jumps">
        <div class="number-line-extended">
            <div class="number-point">11</div>
            <div class="number-point">12</div>
            <div class="number-point end">13</div>
            <div class="number-point">14</div>
            <div class="number-point">15</div>
            <div class="number-point">16</div>
            <div class="number-point">17</div>
            <div class="number-point">18</div>
            <div class="number-point">19</div>
            <div class="number-point start">20</div>
        </div>
        <div class="jump-instruction">
            <p>Make 7 jumps backward ←</p>
        </div>
    </div>

    <p class="answer-prompt">You land on <span class="answer-box"></span></p>
</div>
```
**Example**: Start at 20, count backward 7 steps (Answer: 13)

---

## COUNTING GUIDELINES

### Number Ranges by Question:
- **Q1 (Forward)**: 1-20 range
- **Q2 (Backward)**: 10-20 range
- **Q3 (Number line forward)**: Start 5-15, jump 3-6 steps
- **Q4 (Real-world)**: 1-20 range
- **Q5 (Backward challenge)**: Start 15-20, jump 5-8 steps backward

### Real-World Contexts:
- Stairs/steps (climbing up = forward, climbing down = backward)
- Houses on a street (walking along)
- Books on a shelf (counting left to right)
- Days/dates on calendar
- Seats in a row

### Visual Cues:
- Forward counting: → arrows, "count up", ascending steps
- Backward counting: ← arrows, "count down", descending steps
- Start position: highlighted/colored differently
- End position: marked with "?"

---

## ULTRA-COMPACT CSS (OPTIMIZED FOR COUNTING)

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

/* Number Sequences */
.number-sequence {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 600px;
    position: relative;
}

.number-sequence.backwards::before {
    content: '← Count Backwards';
    position: absolute;
    top: -10px;
    left: 20px;
    background: #E3F2FD;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 13pt;
    font-weight: bold;
    color: #1976D2;
}

.sequence-box {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22pt;
    font-weight: bold;
    border: 3px solid #333;
    border-radius: 8px;
}

.sequence-box.filled {
    background: #4CAF50;
    color: white;
    border-color: #2E7D32;
}

.sequence-box.empty {
    background: white;
    border-style: dashed;
    border-color: #FF5722;
}

.direction-arrow {
    text-align: center;
    font-size: 40pt;
    color: #1976D2;
    margin: 10px 0;
}

/* Number Line with Jumps */
.number-line-jumps {
    margin: 20px auto;
    padding: 20px;
    background: #f8f9ff;
    border: 3px solid #2196F3;
    border-radius: 12px;
    max-width: 700px;
}

.number-line-extended {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 30px 10px;
    margin-bottom: 15px;
}

.number-line-extended::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 3%;
    right: 3%;
    height: 4px;
    background: #333;
}

.number-point {
    width: 50px;
    height: 50px;
    background: #E0E0E0;
    border: 2px solid #999;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16pt;
    font-weight: bold;
    position: relative;
    z-index: 1;
}

.number-point.start {
    background: #4CAF50;
    color: white;
    border-color: #2E7D32;
    border-width: 4px;
}

.number-point.start::after {
    content: 'START';
    position: absolute;
    bottom: -25px;
    font-size: 10pt;
    color: #4CAF50;
    font-weight: bold;
}

.number-point.end {
    background: #FF9800;
    color: white;
    border-color: #F57C00;
    border-width: 4px;
}

.jump-instruction {
    text-align: center;
    font-size: 15pt;
    font-weight: bold;
    color: #1976D2;
}

/* Stairs Visual */
.stairs-visual {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px auto;
    padding: 20px;
    background: linear-gradient(to bottom, #E3F2FD, #BBDEFB);
    border: 3px solid #2196F3;
    border-radius: 12px;
    max-width: 400px;
}

.stair-step {
    width: 80px;
    height: 40px;
    background: #795548;
    border: 2px solid #5D4037;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18pt;
    font-weight: bold;
    color: white;
    margin-left: 0;
    margin-bottom: 2px;
    position: relative;
}

.stair-step:nth-child(1) { margin-left: 0px; }
.stair-step:nth-child(2) { margin-left: 20px; }
.stair-step:nth-child(3) { margin-left: 40px; }
.stair-step:nth-child(4) { margin-left: 60px; }
.stair-step:nth-child(5) { margin-left: 80px; }
.stair-step:nth-child(6) { margin-left: 100px; }
.stair-step:nth-child(7) { margin-left: 120px; }
.stair-step:nth-child(8) { margin-left: 140px; }
.stair-step:nth-child(9) { margin-left: 160px; }

.stair-step.start-step {
    background: #4CAF50;
    border-color: #2E7D32;
    border-width: 4px;
}

.stair-step.start-step::after {
    content: '★';
    position: absolute;
    left: -25px;
    font-size: 20pt;
    color: #4CAF50;
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
    height: 40px;
    border: 3px solid #333;
    border-radius: 6px;
    background: white;
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
        <p><strong>1.</strong> 7, 9 (forward sequence 5-11)</p>
        <p><strong>2.</strong> 13, 11 (backward sequence 15-10)</p>
        <p><strong>3.</strong> 13 (start 8, forward 5 steps)</p>
        <p><strong>4.</strong> Step 9 (start step 3, climb 6 steps)</p>
        <p><strong>5.</strong> 13 (start 20, backward 7 steps)</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Count forwards (missing numbers)?**
3. ✓ **Question 2 = Count backwards (missing numbers)?**
4. ✓ **Question 3 = Number line jumps forward?**
5. ✓ **Question 4 = Real-world counting context?**
6. ✓ **Question 5 = Count backwards challenge?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All numbers within appropriate range (0-20)?**
9. ✓ **Visual direction cues (arrows) present?**
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
