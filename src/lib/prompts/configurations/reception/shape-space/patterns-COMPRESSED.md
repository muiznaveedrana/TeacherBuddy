# Reception: Simple Patterns (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception simple patterns questions.

## CRITICAL RULES

**Patterns:** AB, ABB, ABC repeating patterns (visual only - NO numbers)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Elements:** Colors, shapes, objects from verified library
**Visual:** Clear, bright, distinct - ages 4-5 appropriate

## 5-QUESTION FORMAT

**Q1:** What comes next? (AB color pattern)
**Q2:** Continue the pattern (ABB shape pattern with blanks)
**Q3:** Copy the pattern (hands-on practice)
**Q4:** Object pattern from WORKSHEET_OBJECTS (real-world)
**Q5:** ABC pattern (most complex)

## COLORS

Red (#E74C3C), Blue (#4A90E2), Green (#27AE60), Yellow (#F1C40F), Pink (#E91E63), Orange (#F39C12), Purple (#9B59B6)

## SHAPES

Circle, Square, Triangle, Star, Heart

## OBJECTS (for Q4)

Fruits: apple, banana, orange, strawberry
Toys: ball, car, doll, kite
Shapes: star, heart, circle, square

## EXAMPLE OUTPUT

**Q1 (AB Pattern - What Next?):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What comes NEXT?</p>
    <div class="pattern-sequence">
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item circle blue"></div>
        <div class="pattern-item pattern-next">?</div>
    </div>
    <div class="pattern-choices">
        <div class="choice-item circle red"></div>
        <div class="choice-item circle blue"></div>
    </div>
    <p class="answer-prompt">Circle your answer</p>
</div>
```

**Q2 (ABB Pattern - Continue):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Draw the missing shapes</p>
    <div class="pattern-sequence">
        <div class="pattern-item square green"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item circle yellow"></div>
        <div class="pattern-item square green"></div>
        <div class="pattern-item pattern-blank"></div>
        <div class="pattern-blank"></div>
    </div>
</div>
```

**Q4 (Objects):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> What comes next?</p>
    <div class="pattern-sequence-objects">
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
        <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
        <div class="pattern-next">?</div>
    </div>
    <div class="object-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="50" height="50" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="50" height="50" />
        </div>
    </div>
</div>
```

**Q5 (ABC Pattern):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> What comes next?</p>
    <div class="pattern-sequence">
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item circle green"></div>
        <div class="pattern-item triangle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box"><span class="choice-label">A</span><div class="choice-shape triangle red"></div></div>
        <div class="choice-box"><span class="choice-label">B</span><div class="choice-shape circle green"></div></div>
        <div class="choice-box"><span class="choice-label">C</span><div class="choice-shape square blue"></div></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Red circle (AB pattern)</p>
        <p><strong>2.</strong> Yellow circle, Yellow circle (ABB pattern)</p>
        <p><strong>3.</strong> Copy: Star-Heart-Star-Heart</p>
        <p><strong>4.</strong> A - Ball (object AB pattern)</p>
        <p><strong>5.</strong> B - Green circle (ABC pattern)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
