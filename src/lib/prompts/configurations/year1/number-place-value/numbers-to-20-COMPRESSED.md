# Year 1: Numbers to 20 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 numbers to 20 questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Number Range:** 0-20 ONLY (focus on 11-20)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Visual Support:** Ten-frames, number lines, object arrays
**Place Value:** Understanding tens and ones (e.g., 14 = 1 ten + 4 ones)

## 5-QUESTION FORMAT

**Q1:** Count and write number (object array, 6-18 objects)
**Q2:** Number line - missing number (show 6 consecutive numbers)
**Q3:** Ten-frame recognition (10-20 dots)
**Q4:** One more, one less (given number 5-19)
**Q5:** Number word matching (numerals to words)

## NUMBER WORDS (0-20)

zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty

## OBJECTS (WORKSHEET_OBJECTS)

Fruits: apple, banana, orange, strawberry
School: pencil, book, crayon, scissors
Toys: ball, car, doll, kite
Shapes: star, heart, circle, square

## EXAMPLE OUTPUT

**Q1 (Count and Write):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Count the apples. Write the number.</p>
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
    <p class="question-text"><span class="question-number">3.</span> How many dots are in the ten-frame?</p>
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
        <p><strong>1.</strong> 8 apples</p>
        <p><strong>2.</strong> 15</p>
        <p><strong>3.</strong> 13 dots</p>
        <p><strong>4.</strong> One less: 13, One more: 15</p>
        <p><strong>5.</strong> 11→eleven, 15→fifteen, 18→eighteen, 20→twenty</p>
    </div>
</div>
```

## CSS
```css
<style>
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
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
