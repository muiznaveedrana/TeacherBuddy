# Year 1: Number Bonds to 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 number bonds to 10 questions.

## CRITICAL RULES

**Bonds:** All pairs making 10 (0+10, 1+9, 2+8, 3+7, 4+6, 5+5, etc.)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Concept:** Part-part-whole, commutative property, automatic recall
**Visual:** Ten-frames, part-whole diagrams, object arrays

## 5-QUESTION FORMAT

**Q1:** Complete bond with ten-frame visual (show X filled, find missing to make 10)
**Q2:** Part-whole diagram (whole=10, one part given, find other)
**Q3:** Bond families (given 3+7=10, complete family: 7+3, 10-3, 10-7)
**Q4:** Real-world objects from WORKSHEET_OBJECTS (word problem)
**Q5:** Quick recall grid (6 missing bonds, rapid fluency practice)

## ALL BONDS TO 10

0+10, 1+9, 2+8, 3+7, 4+6, 5+5, 6+4, 7+3, 8+2, 9+1, 10+0

## OBJECTS (WORKSHEET_OBJECTS)

Fruits: apple (red/green), banana, orange, strawberry
Toys: ball, car, teddy bear, kite
School: pencil, book, crayon
Shapes: star, heart, circle

## EXAMPLE OUTPUT

**Q1 (Ten-Frame Visual):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Complete the number bond to 10.</p>
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
</div>
```

**Q2 (Part-Whole):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Fill in the missing number to make 10.</p>
    <div class="part-whole-diagram">
        <div class="whole-circle"><span class="whole-number">10</span></div>
        <div class="connecting-lines"></div>
        <div class="parts-row">
            <div class="part-circle"><span class="part-number">6</span></div>
            <div class="part-circle missing"><span class="part-number">?</span></div>
        </div>
    </div>
    <p class="answer-prompt">6 and ___ make 10</p>
</div>
```

**Q3 (Bond Family):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Complete the number bond family.</p>
    <div class="bond-family">
        <div class="bond-pair"><span class="bond-equation">3 + 7 = 10</span></div>
        <div class="bond-pair"><span class="bond-equation">7 + 3 = <span class="answer-box-small"></span></span></div>
        <div class="bond-pair"><span class="bond-equation">10 - 3 = <span class="answer-box-small"></span></span></div>
        <div class="bond-pair"><span class="bond-equation">10 - 7 = <span class="answer-box-small"></span></span></div>
    </div>
</div>
```

**Q4 (Real-World Objects):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Emma has 10 apples. 4 are red and the rest are green. How many are green?</p>
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
</div>
```

**Q5 (Quick Recall Grid):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Fill in the missing numbers to make 10.</p>
    <div class="quick-bonds-grid">
        <div class="bond-item"><span class="bond-mini">2 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">5 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">8 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">1 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini"><span class="answer-box-tiny"></span> + 6 = 10</span></div>
        <div class="bond-item"><span class="bond-mini"><span class="answer-box-tiny"></span> + 3 = 10</span></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 3 (7 + 3 = 10)</p>
        <p><strong>2.</strong> 4 (6 and 4 make 10)</p>
        <p><strong>3.</strong> 10, 7, 3 (bond family)</p>
        <p><strong>4.</strong> 6 green apples</p>
        <p><strong>5.</strong> 8, 5, 2, 9, 4, 7</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
