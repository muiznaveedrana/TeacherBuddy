# Year 1: Subtracting within 20 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 subtracting within 20 questions.

## CRITICAL RULES

**Differences:** 0-19 (minuends 3-20, subtrahends 1-12)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Strategies:** Count back, think addition, bridge through 10, fact families
**Visual:** Cross out objects, number lines, ten-frames

## 5-QUESTION FORMAT

**Q1:** Picture subtraction - cross out (show objects, cross out some, count remainder)
**Q2:** Number line subtraction - count back (start point, jump backward, find end)
**Q3:** Ten-frame subtraction (use double ten-frames, cross out dots)
**Q4:** Fact families (complete family showing addition-subtraction link)
**Q5:** Word problem with WORKSHEET_OBJECTS (taking away context)

## KEY STRATEGIES

- **Count back:** For small subtrahends
- **Think addition:** "What adds to X to make Y?"
- **Bridge through 10:** 13-5 = 13-3-2 = 10-2
- **Fact families:** If 6+8=14, then 14-6=8 and 14-8=6

## OBJECTS (WORKSHEET_OBJECTS)

Fruits: strawberry, apple, banana, orange
Toys: ball, car, teddy bear, doll
School: pencil, book, crayon
Food: for "eating" contexts

## WORD PROBLEM CONTEXTS

- Balloons flying away
- Eating fruits/cookies
- Giving away toys/stickers
- Animals leaving/running away
- Books returned to shelf

## EXAMPLE OUTPUT

**Q1 (Picture Subtraction):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> There are 9 strawberries. Cross out 4. How many are left?</p>
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
</div>
```

**Q4 (Fact Families):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Complete the fact family.</p>
    <div class="fact-family-box">
        <div class="fact-row"><span class="fact-equation">6 + 8 = 14</span></div>
        <div class="fact-row"><span class="fact-equation">8 + 6 = <span class="answer-box-small"></span></span></div>
        <div class="fact-row"><span class="fact-equation">14 − 6 = <span class="answer-box-small"></span></span></div>
        <div class="fact-row"><span class="fact-equation">14 − 8 = <span class="answer-box-small"></span></span></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 5 (9 − 4)</p>
        <p><strong>2.</strong> 8 (14 − 6, number line)</p>
        <p><strong>3.</strong> 8 (13 − 5, ten-frames)</p>
        <p><strong>4.</strong> 14, 8, 6 (fact family)</p>
        <p><strong>5.</strong> 5 balloons (12 − 7 word problem)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
