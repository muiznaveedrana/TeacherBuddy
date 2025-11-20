# Year 1: Numbers to 20

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
**Q5:** Number word matching (numerals to words) - RANDOMIZE: number set + question wording

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

## Q5 - Number Words Matching (RANDOMIZE!)
**RANDOMIZE**: Pick ONE number set (4 numbers) + ONE question variation + shuffle word order

**Number Sets** (pick ONE - always use 4 numbers):
- **Set 1**: 11, 13, 16, 19
- **Set 2**: 12, 14, 17, 20
- **Set 3**: 10, 13, 15, 18
- **Set 4**: 11, 14, 16, 20
- **Set 5**: 12, 15, 17, 19
- **Set 6**: 10, 12, 16, 18
- **Set 7**: 11, 15, 17, 20

**Question Variations** (pick ONE):
- "Draw lines to match the numbers to the words."
- "Match the numbers with the correct words."
- "Connect each number to its word."
- "Match the numerals to the number words."

**CRITICAL**: Always shuffle the word column order (don't align them!)

## EXAMPLE OUTPUT

**Q1 (Count and Write):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Count the apples. Write the number.</p>
    <div class="counting-array">
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
    </div>
    <p class="answer-prompt">There are <span class="answer-box"></span> apples.</p>
</div>
```

**Q2 (Number Line):**
```html
<div class="question" style="background: #E3F2FD;">
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
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Count the blue circles.</p>
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

**Q5 (Number Words):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Draw lines to match the numbers to the words.</p>
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
        <p><strong>5.</strong> 11-eleven, 15-fifteen, 18-eighteen, 20-twenty</p>
    </div>
</div>
```

**CRITICAL - Answer Key Formatting Rules:**
- Q1-Q3 (single input): Just the number (e.g., "8", NOT "8 apples")
- Q4 (multi-input): Comma-separated values (e.g., "13, 15" or "less: 13, more: 15")
- Q5 (matching): Use hyphens, not arrows (e.g., "11-eleven" works better than "11→eleven")
- NEVER use format like "One less: 13" or "1 less: 13" - just use numbers!

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
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
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
