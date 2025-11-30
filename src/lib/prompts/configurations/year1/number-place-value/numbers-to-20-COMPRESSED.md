# Ages 5-6: Numbers to 20

Generate EXACTLY {{questionCount}} Year 1 numbers to 20 questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Number Range:** 0-20 ONLY (focus on 11-20)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Visual Support:** Ten-frames, number lines, object arrays
**Place Value:** Understanding tens and ones (e.g., 14 = 1 ten + 4 ones)

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Count and write number (object array, 6-18 objects) - RANDOMIZE: object + quantity + question wording
**Q2:** Number line - missing number (show 6 consecutive numbers) - RANDOMIZE: starting number + question wording
**Q3:** Ten-frame recognition (show 10-20) - RANDOMIZE: quantity + question wording
**Q4:** One more, one less (given number 5-19) - RANDOMIZE: central number + question variation
**Q5:** Number word matching (letter selection format) - RANDOMIZE: number set + shuffle options

## NUMBER WORDS (0-20)

zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty

## OBJECTS - `/images/{object}.png`

Fruits: apple,banana,orange,strawberry
School: pencil,book,crayon,scissors
Toys: ball,car,doll,kite,bear
Shapes: star,heart,circle,square

## Q1 - Count and Write (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object + ONE quantity (6-18) + ONE question variation

**Object Pool** (pick ONE):
- apple, banana, orange, strawberry (fruits)
- pencil, book, crayon, scissors (school)
- ball, car, doll, bear (toys)
- star, heart, circle, square (shapes)

**Quantities**: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18

**Question Variations** (pick ONE):
- "Count the [objects]. Write the number."
- "How many [objects] are there?"
- "Count the [objects]."
- "How many [objects] can you see?"

**Answer Format Variations** (pick ONE):
- "There are ____ [objects]."
- "I can see ____ [objects]."
- "There are ____ altogether."

## Q2 - Number Line Missing Number (RANDOMIZE!)
**RANDOMIZE**: Pick ONE starting number + ONE question variation

**Starting Numbers** (pick ONE - show 6 consecutive):
- 3, 4, 5, 6, 7, 8 (missing can be any position)
- 7, 8, 9, 10, 11, 12
- 10, 11, 12, 13, 14, 15
- 12, 13, 14, 15, 16, 17
- 14, 15, 16, 17, 18, 19

**Missing Position**: Position 2, 3, or 4 (not first or last - too easy)

**Question Variations** (pick ONE):
- "What number is missing?"
- "Which number is missing from the number line?"
- "Fill in the missing number."
- "What number should go in the box?"

**Answer Format Variations** (pick ONE):
- "The missing number is ____"
- "The number is ____"
- "____ is missing."

## Q3 - Ten-Frame Recognition (RANDOMIZE!)
**RANDOMIZE**: Pick ONE quantity (10-20) + ONE question variation + ONE color

**Quantities**: 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20

**Colors** (for filled circles - pick ONE):
- blue (#4A90E2)
- red (#E74C3C)
- green (#27AE60)
- orange (#FF9800)

**Question Variations** (pick ONE):
- "Count the [color] circles."
- "How many [color] circles are there?"
- "Count the [color] counters."
- "How many [color] dots can you see?"

**Answer Format Variations** (pick ONE):
- "There are ____ [color] circles."
- "I can see ____ [color] circles."
- "There are ____ altogether."

## Q4 - One More, One Less (RANDOMIZE!)
**RANDOMIZE**: Pick ONE central number (6-18) + ONE question variation

**Central Numbers**: 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18

**Question Variations** (pick ONE):
- "Fill in the missing numbers."
- "What is one more and one less than [number]?"
- "Complete the number pattern."
- "Write the numbers that are one more and one less."

**Format Variations** (pick ONE):
- Standard: "One Less | [Number] | One More"
- Alternative: "1 less than [number] is ____. 1 more than [number] is ____."

## Q5 - Number Words Letter Matching (INTERACTIVE FORMAT)
**RANDOMIZE**: Pick ONE number set (4 numbers) + shuffle the letter options

**Number Sets** (pick ONE - always use 4 numbers):
- **Set 1**: 11, 13, 16, 19
- **Set 2**: 12, 14, 17, 20
- **Set 3**: 10, 13, 15, 18
- **Set 4**: 11, 14, 16, 20
- **Set 5**: 12, 15, 17, 19
- **Set 6**: 10, 12, 16, 18
- **Set 7**: 11, 15, 17, 20

**Question Text**: "Match each number to its letter."

**FORMAT**: Two columns side by side:
- LEFT: Numbers with answer boxes (e.g., "13 = ___")
- RIGHT: Lettered word options (A, B, C, D) - SHUFFLED order

**CRITICAL**: 
- Shuffle the A, B, C, D options so they DON'T align with the numbers
- Each letter is used exactly once
- Child writes A, B, C, or D in each box

**Example**:
```
13 = ___     A) nineteen
16 = ___     B) eleven
19 = ___     C) sixteen
11 = ___     D) thirteen
```
Answer: D, C, A, B

## EXAMPLE OUTPUT

**Q1 (Count and Write):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Count the apples. Write the number.</p>
    <div class="counting-array">
        <img src="/images/apple.png" width="45" height="45" alt="Apple" />
        <!-- repeat for total count -->
    </div>
    <p class="answer-prompt">There are <span class="answer-box"></span> apples.</p>
</div>
```

**Q2 (Number Line):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> What number is missing?</p>
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

**Q3 (Ten-Frame):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Count the blue circles.</p>
    <div class="ten-frame-container">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <!-- 5 cells per row, 2 rows per frame -->
            </div>
        </div>
        <!-- Use 2 ten-frames for numbers 11-20 -->
    </div>
    <p class="answer-prompt">There are <span class="answer-box"></span> blue circles.</p>
</div>
```

**Q4 (One More/Less):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Fill in the missing numbers.</p>
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
</div>
```

**Q5 (Number Words - Letter Matching):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Match each number to its letter.</p>
    <div class="letter-matching">
        <div class="matching-left">
            <div class="match-row"><span class="match-number">13</span> = <span class="answer-box small"></span></div>
            <div class="match-row"><span class="match-number">16</span> = <span class="answer-box small"></span></div>
            <div class="match-row"><span class="match-number">19</span> = <span class="answer-box small"></span></div>
            <div class="match-row"><span class="match-number">11</span> = <span class="answer-box small"></span></div>
        </div>
        <div class="matching-right">
            <div class="option-row"><span class="option-letter">A)</span> <span class="option-word">nineteen</span></div>
            <div class="option-row"><span class="option-letter">B)</span> <span class="option-word">eleven</span></div>
            <div class="option-row"><span class="option-letter">C)</span> <span class="option-word">sixteen</span></div>
            <div class="option-row"><span class="option-letter">D)</span> <span class="option-word">thirteen</span></div>
        </div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 8</p>
        <p><strong>2.</strong> 15</p>
        <p><strong>3.</strong> 13</p>
        <p><strong>4.</strong> 13, 15</p>
        <p><strong>5.</strong> D, C, A, B</p>
    </div>
</div>
```

**CRITICAL - Answer Key Formatting Rules:**
- Q1-Q3 (single input): Just the number (e.g., "8", NOT "8 apples")
- Q4 (multi-input): Comma-separated values (e.g., "13, 15")
- Q5 (letter matching): Comma-separated letters in order (e.g., "D, C, A, B")

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.counting-array{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:15px 0;max-width:450px;margin-left:auto;margin-right:auto;}
.number-line-container{margin:15px auto;max-width:500px;}
.number-line{display:flex;justify-content:space-between;padding:10px 0;}
.number-marker{width:50px;height:50px;border:2px solid #333;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18pt;background:#fff;}
.number-marker.missing{background:#ffffcc;color:#999;}
.ten-frame-container{display:flex;gap:20px;justify-content:center;margin:15px 0;flex-wrap:wrap;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:40px;height:40px;border:2px solid #333;border-radius:4px;display:flex;align-items:center;justify-content:center;}
.frame-cell.filled{background:#4A90E2;border-radius:50%;}
.frame-cell.empty{background:#f5f5f5;}
.number-relationships{display:flex;justify-content:center;margin:15px 0;}
.relationship-row{display:flex;gap:20px;align-items:center;}
.relationship-box{text-align:center;padding:15px;border:3px solid #ddd;border-radius:10px;min-width:90px;background:#fff;}
.central-number{background:#FFF3E0;border-color:#FF9800;}
.number-display{font-size:28pt;font-weight:bold;}
.relationship-label{font-size:11pt;margin-bottom:8px;color:#666;}
.letter-matching{display:flex;justify-content:center;gap:40px;margin:15px auto;}
.matching-left{display:flex;flex-direction:column;gap:10px;}
.matching-right{display:flex;flex-direction:column;gap:10px;}
.match-row{font-size:16pt;font-weight:bold;display:flex;align-items:center;gap:8px;}
.match-number{background:#E3F2FD;padding:8px 15px;border-radius:8px;min-width:40px;text-align:center;}
.option-row{font-size:16pt;display:flex;align-items:center;gap:8px;padding:8px 0;}
.option-letter{font-weight:bold;color:#555;}
.option-word{background:#FFF9C4;padding:8px 15px;border-radius:8px;}
.answer-prompt{font-size:15pt;margin:22px 0 0 0;text-align:center;}
.answer-box{display:inline-block;border-bottom:3px solid #333;min-width:80px;height:28px;margin:0 5px;}
.answer-box.small{min-width:40px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```
