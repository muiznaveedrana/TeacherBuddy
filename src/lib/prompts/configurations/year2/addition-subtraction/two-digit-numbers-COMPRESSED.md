# Year 2: Two-Digit Addition & Subtraction (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 two-digit addition/subtraction questions.

## CRITICAL RULES

**Number Range:** 0-100 (two-digit focus)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Methods:** Partitioning, column method
**Visual:** Base-10 blocks, part-whole models, vertical layout

## 5-QUESTION FORMAT

**Q1:** Addition with base-10 blocks visual (e.g., 34 + 23)
**Q2:** Column addition - 2 problems (vertical format)
**Q3:** Subtraction with partitioning - show tens and ones
**Q4:** Column subtraction - 2 problems (vertical format)
**Q5:** Word problem - mixed addition and subtraction

## PARTITIONING STRATEGY

**45 + 32:**
- (40 + 5) + (30 + 2)
- Tens: 40 + 30 = 70
- Ones: 5 + 2 = 7
- Total: 77

## COLUMN METHOD

```
  45
+ 32
----
  77
```

## EXAMPLE OUTPUT

**Q1 (Base-10 Addition):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Add using the base-10 blocks.</p>
    <div class="addition-visual">
        <div class="number-group">
            <p class="label">34</p>
            <div class="base10-blocks">
                <!-- 3 tens rods + 4 ones cubes -->
            </div>
        </div>
        <div class="operator">+</div>
        <div class="number-group">
            <p class="label">52</p>
            <div class="base10-blocks">
                <!-- 5 tens rods + 2 ones cubes -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">34 + 52 = <span class="answer-box"></span></p>
</div>
```

**Q2 (Column Addition):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Solve these additions.</p>
    <div class="column-grid">
        <div class="column-problem">
            <div class="number-column">
              <div class="number">47</div>
              <div class="number">+&nbsp;31</div>
              <div class="line"></div>
              <div class="answer-space"></div>
            </div>
        </div>
        <div class="column-problem">
            <div class="number-column">
              <div class="number">65</div>
              <div class="number">+&nbsp;23</div>
              <div class="line"></div>
              <div class="answer-space"></div>
            </div>
        </div>
    </div>
</div>
```

**Q3 (Partitioning Subtraction):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Subtract by partitioning: 58 - 23</p>
    <div class="partition-model">
        <div class="part-whole">
            <div class="whole">58</div>
            <div class="parts">
                <div class="part">50 (tens)</div>
                <div class="part">8 (ones)</div>
            </div>
        </div>
        <div class="operator">−</div>
        <div class="part-whole">
            <div class="whole">23</div>
            <div class="parts">
                <div class="part">20 (tens)</div>
                <div class="part">3 (ones)</div>
            </div>
        </div>
    </div>
    <p class="working">50 - 20 = <span class="answer-box"></span></p>
    <p class="working">8 - 3 = <span class="answer-box"></span></p>
    <p class="answer-prompt">58 - 23 = <span class="answer-box"></span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 34 + 52 = 86</p>
        <p><strong>2.</strong> 47 + 31 = 78, 65 + 23 = 88</p>
        <p><strong>3.</strong> 58 - 23 = 35 (50-20=30, 8-3=5, 30+5=35)</p>
        <p><strong>4.</strong> 76 - 42 = 34, 89 - 56 = 33</p>
        <p><strong>5.</strong> 45 children (68 - 23)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
