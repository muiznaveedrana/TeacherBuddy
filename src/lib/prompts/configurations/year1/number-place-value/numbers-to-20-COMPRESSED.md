# Year 1: Numbers to 20 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 numbers to 20 questions.

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

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
