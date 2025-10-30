# Year 1: Numbers to 20 - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 numbers to 20 worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Number Range (CRITICAL)
- **Focus on numbers 0-20 ONLY**
- Children learning to read and write numbers in numerals and words
- Understanding one more, one less within 20
- Place value: tens and ones (e.g., 14 = 1 ten and 4 ones)

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Each question type has been researched and proven effective for ages 5-6
- Progress from recognition to application

### Rule 4: Visual Support (CRITICAL)
- **Use ten-frames, number lines, and object arrays**
- Clear visual representations for all numbers
- Verified WORKSHEET_OBJECTS for counting activities
- Bright, engaging visuals appropriate for ages 5-6

### Rule 5: Number Word Connection
- **Connect numerals to number words**
- Age-appropriate language: "Count", "How many?", "Write the number"
- Focus on building number sense and fluency

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Count and Write the Number** (Easiest - Building Confidence)
**Format**: Show array of objects, ask child to count and write number
**Pedagogical Purpose**: Counting and numeral recognition (0-20)
**HTML Structure**:
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Count the apples. Write the number.</p>

    <div class="counting-array">
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
    </div>

    <p class="answer-prompt">There are <span class="answer-box"></span> apples.</p>
</div>
```
**Example**: Show 8 apples in array. "Count the apples. Write the number." (Answer: 8)

---

### **Question 2: Number Line - What Number?** (Reading Number Position)
**Format**: Show number line with missing number
**Pedagogical Purpose**: Understanding number sequence and position
**HTML Structure**:
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">What number is missing on the number line?</p>

    <div class="number-line-container">
        <div class="number-line">
            <div class="number-marker">12</div>
            <div class="number-marker">13</div>
            <div class="number-marker">14</div>
            <div class="number-marker missing">?</div>
            <div class="number-marker">16</div>
            <div class="number-marker">17</div>
        </div>
    </div>

    <p class="answer-prompt">The missing number is <span class="answer-box"></span></p>
</div>
```
**Example**: 12-13-14-?-16-17 (Answer: 15)

---

### **Question 3: Ten-Frame Recognition** (Place Value Foundation)
**Format**: Show ten-frame with dots, identify number
**Pedagogical Purpose**: Visual recognition, foundation for place value
**HTML Structure**:
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">How many dots are in the ten-frame?</p>

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

    <p class="answer-prompt">There are <span class="answer-box"></span> dots.</p>
</div>
```
**Example**: Show 13 dots in ten-frame (Answer: 13)

**Ten-Frame Guidelines**:
- Always show 2 rows of 5 cells each
- Fill first row completely before second row
- Use for numbers 10-20 to show place value visually

---

### **Question 4: One More, One Less** (Number Relationships)
**Format**: Given a number, find one more or one less
**Pedagogical Purpose**: Understanding number relationships within 20
**HTML Structure**:
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Fill in the missing numbers.</p>

    <div class="number-relationships">
        <div class="relationship-row">
            <div class="relationship-box">
                <p class="relationship-label">One Less</p>
                <div class="answer-box"></div>
            </div>
            <div class="relationship-box central-number">
                <div class="number-display">14</div>
            </div>
            <div class="relationship-box">
                <p class="relationship-label">One More</p>
                <div class="answer-box"></div>
            </div>
        </div>
    </div>

    <p class="answer-prompt">What is one less than 14? What is one more than 14?</p>
</div>
```
**Example**: Given 14, find one less (13) and one more (15)

---

### **Question 5: Number Word Matching** (Connecting Numerals and Words)
**Format**: Match numerals to number words
**Pedagogical Purpose**: Reading and writing number words, application
**HTML Structure**:
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Draw lines to match the numbers to the words.</p>

    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item number">11</div>
            <div class="match-item number">15</div>
            <div class="match-item number">18</div>
            <div class="match-item number">20</div>
        </div>

        <div class="matching-column">
            <div class="match-item word">twenty</div>
            <div class="match-item word">eleven</div>
            <div class="match-item word">eighteen</div>
            <div class="match-item word">fifteen</div>
        </div>
    </div>

    <p class="answer-prompt">Draw lines to match each number to its word.</p>
</div>
```
**Example**: Match 11→eleven, 15→fifteen, 18→eighteen, 20→twenty

**Number Words (0-20)**:
zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty

---

## NUMBER RANGE GUIDELINES

### Numbers to Use:
- **Focus range**: 11-20 (teens are challenging for Year 1)
- **Include**: Some single digits (6-10) for confidence building
- **Teen numbers**: Special focus as these are tricky (thirteen vs thirty)

### Object Selection (WORKSHEET_OBJECTS):
- **Fruits**: apple, banana, orange, strawberry, watermelon
- **School**: pencil, book, crayon, scissors, ruler
- **Toys**: ball, car, doll, kite, teddy bear
- **Shapes**: star, heart, circle, square, triangle

### Visual Layout:
- Arrays: 2 rows maximum for counting clarity
- Ten-frames: Standard 2×5 grid
- Number lines: Show 6-8 consecutive numbers

---

## CSS

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:14pt;padding:15px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.counting-array{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:15px 0;}
.number-line-container{margin:15px auto;max-width:400px;}
.number-line{display:flex;justify-content:space-around;padding:10px;}
.number-marker{width:40px;height:40px;border:2px solid #333;border-radius:5px;display:flex;align-items:center;justify-content:center;font-weight:bold;}
.number-marker.missing{background:#ffffcc;font-size:20pt;}
.ten-frame{display:flex;flex-direction:column;margin:15px auto;width:fit-content;}
.frame-row{display:flex;}
.frame-cell{width:40px;height:40px;border:2px solid #333;margin:2px;}
.frame-cell.filled{background:#4A90E2;border-radius:50%;}
.frame-cell.empty{background:#fff;}
.number-relationships{display:flex;justify-content:center;margin:15px 0;}
.relationship-row{display:flex;gap:15px;align-items:center;}
.relationship-box{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;min-width:80px;}
.central-number{background:#FFF3E0;}
.number-display{font-size:24pt;font-weight:bold;}
.relationship-label{font-size:12pt;margin-bottom:5px;}
.matching-activity{display:grid;grid-template-columns:1fr 1fr;gap:30px;max-width:400px;margin:15px auto;}
.matching-column{display:flex;flex-direction:column;gap:15px;}
.match-item{padding:12px;border:2px solid #333;border-radius:8px;text-align:center;font-weight:bold;font-size:14pt;}
.match-item.number{background:#E3F2FD;}
.match-item.word{background:#FFF9C4;}
.answer-prompt{font-weight:bold;margin-top:10px;}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:60px;height:24px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
```

---

## ANSWER KEY (MANDATORY)

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 8 apples</p>
        <p><strong>2.</strong> 15 (missing number on number line)</p>
        <p><strong>3.</strong> 13 dots</p>
        <p><strong>4.</strong> One less: 13, One more: 15</p>
        <p><strong>5.</strong> Match: 11→eleven, 15→fifteen, 18→eighteen, 20→twenty</p>
    </div>
</div>
```

---

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Count and write number (array of objects)?**
3. ✓ **Question 2 = Number line with missing number?**
4. ✓ **Question 3 = Ten-frame recognition?**
5. ✓ **Question 4 = One more, one less?**
6. ✓ **Question 5 = Number word matching?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All numbers within 0-20 range?**
9. ✓ **Visual supports clear and age-appropriate?**
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
