# Year 2: Sharing and Grouping (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 sharing and grouping questions.

## CRITICAL RULES

**Concept:** Division as sharing and grouping
**Questions:** EXACTLY {{questionCount}} - count before returning
**Types:** Sharing (partitive) and Grouping (quotitive)
**Visual:** Circles for sharing, boxes for grouping, WORKSHEET_OBJECTS
**Link:** Use 2, 5, 10 times tables (inverse of multiplication)

## 5-QUESTION FORMAT

**Q1:** Sharing visual (share equally between groups)
**Q2:** Grouping visual (make groups of given size)
**Q3:** Link to multiplication (if 3×4=12, then 12÷3=?)
**Q4:** Mixed division - 4 problems (sharing and grouping)
**Q5:** Word problem (real-world division)

## SHARING VS GROUPING

**Sharing:** 20 stickers between 5 children → 20 ÷ 5 = 4 each
**Grouping:** 20 stickers into groups of 4 → 20 ÷ 4 = 5 groups

## EXAMPLE OUTPUT

**Q1 (Sharing):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Share 12 apples equally between 3 plates. Draw lines to show sharing.</p>
    <div class="sharing-visual">
        <div class="objects-to-share">
            🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎
        </div>
        <div class="plates">
            <div class="plate">Plate 1</div>
            <div class="plate">Plate 2</div>
            <div class="plate">Plate 3</div>
        </div>
    </div>
    <p class="answer-prompt">Each plate gets <span class="answer-box"></span> apples</p>
    <p>12 ÷ 3 = <span class="answer-box"></span></p>
</div>
```

**Q2 (Grouping):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Put 20 stars into groups of 5. Draw circles around each group.</p>
    <div class="grouping-visual">
        ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐
    </div>
    <p class="answer-prompt">Number of groups: <span class="answer-box"></span></p>
    <p>20 ÷ 5 = <span class="answer-box"></span> groups</p>
</div>
```

**Q3 (Link to Multiplication):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Use multiplication to help with division.</p>
    <div class="mult-div-link">
        <div class="fact-pair">
            <p>If 4 × 5 = 20</p>
            <p>Then 20 ÷ 4 = <span class="answer-box"></span></p>
            <p>And 20 ÷ 5 = <span class="answer-box"></span></p>
        </div>
        <div class="fact-pair">
            <p>If 6 × 2 = 12</p>
            <p>Then 12 ÷ 6 = <span class="answer-box"></span></p>
            <p>And 12 ÷ 2 = <span class="answer-box"></span></p>
        </div>
    </div>
</div>
```

**Q4 (Mixed Division):**
```html
<div class="question" style="background: #FFE0E0;">
    <p class="question-text"><span class="question-number">4.</span> Solve these divisions.</p>
    <div class="division-grid">
        <div class="div-item">18 ÷ 2 = <span class="answer-box"></span></div>
        <div class="div-item">35 ÷ 5 = <span class="answer-box"></span></div>
        <div class="div-item">60 ÷ 10 = <span class="answer-box"></span></div>
        <div class="div-item">24 ÷ 2 = <span class="answer-box"></span></div>
    </div>
</div>
```

**Q5 (Word Problem):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> There are 30 children. The teacher puts them into teams of 5. How many teams are there?</p>
    <div class="word-problem-visual">
        <div class="total">30 children</div>
        <div class="group-size">Teams of 5</div>
        <div class="teams-boxes">
            [5] [5] [5] [5] [5] [5]
        </div>
    </div>
    <p class="working">30 ÷ 5 = <span class="answer-box"></span> teams</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 4 apples each (12 ÷ 3 = 4)</p>
        <p><strong>2.</strong> 4 groups (20 ÷ 5 = 4)</p>
        <p><strong>3.</strong> 20÷4=5, 20÷5=4, 12÷6=2, 12÷2=6</p>
        <p><strong>4.</strong> 9, 7, 6, 12</p>
        <p><strong>5.</strong> 6 teams (30 ÷ 5 = 6)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
