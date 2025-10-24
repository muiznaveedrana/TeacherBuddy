# Year 2: Times Tables 2, 5, 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 times tables (2, 5, 10) questions.

## CRITICAL RULES

**Tables:** 2, 5, 10 only (up to ×12)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Concept:** Multiplication as repeated addition
**Visual:** Arrays, equal groups, skip counting
**Patterns:** 2s=even, 5s=end 0/5, 10s=end 0

## 5-QUESTION FORMAT

**Q1:** Visual array - count rows and columns
**Q2:** Repeated addition to multiplication (e.g., 10+10+10 = 3×10)
**Q3:** Mixed times tables - 6 facts (2s, 5s, 10s)
**Q4:** Pattern recognition - complete sequences
**Q5:** Word problem - multiplication context

## TIMES TABLES

**2×:** 2,4,6,8,10,12,14,16,18,20,22,24
**5×:** 5,10,15,20,25,30,35,40,45,50,55,60
**10×:** 10,20,30,40,50,60,70,80,90,100,110,120

## EXAMPLE OUTPUT

**Q1 (Array):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples in total?</p>
    <div class="array-visual">
        <!-- 4 rows of 5 apples -->
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
    </div>
    <p class="working">4 rows of 5 = <span class="answer-line">___ × ___ = ___</span></p>
</div>
```

**Q2 (Repeated Addition):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Write as multiplication.</p>
    <div class="repeated-addition">
        <p class="equation">2 + 2 + 2 + 2 + 2 = <span class="answer-box"></span></p>
        <p class="multiply">This is the same as: <span class="answer-line">___ × ___ = ___</span></p>
    </div>
</div>
```

**Q3 (Times Tables Grid):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Solve these multiplications.</p>
    <div class="times-tables-grid">
        <div class="tt-item">3 × 2 = <span class="answer-box"></span></div>
        <div class="tt-item">7 × 5 = <span class="answer-box"></span></div>
        <div class="tt-item">6 × 10 = <span class="answer-box"></span></div>
        <div class="tt-item">9 × 2 = <span class="answer-box"></span></div>
        <div class="tt-item">4 × 5 = <span class="answer-box"></span></div>
        <div class="tt-item">8 × 10 = <span class="answer-box"></span></div>
    </div>
</div>
```

**Q4 (Patterns):**
```html
<div class="question" style="background: #FFE0E0;">
    <p class="question-text"><span class="question-number">4.</span> Complete the patterns.</p>
    <div class="pattern-sequences">
        <p>Count in 2s: 2, 4, 6, <span class="answer-box"></span>, <span class="answer-box"></span>, 12</p>
        <p>Count in 5s: 15, 20, <span class="answer-box"></span>, 30, <span class="answer-box"></span></p>
        <p>Count in 10s: 40, <span class="answer-box"></span>, 60, <span class="answer-box"></span>, 80</p>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 4 × 5 = 20 apples</p>
        <p><strong>2.</strong> 10, and 5 × 2 = 10</p>
        <p><strong>3.</strong> 6, 35, 60, 18, 20, 80</p>
        <p><strong>4.</strong> 8, 10 (2s); 25, 35 (5s); 50, 70 (10s)</p>
        <p><strong>5.</strong> 30 cookies (6 × 5 = 30)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
