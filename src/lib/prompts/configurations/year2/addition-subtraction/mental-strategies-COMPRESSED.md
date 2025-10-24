# Year 2: Mental Strategies (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 mental strategies questions.

## CRITICAL RULES

**Strategies:** Near doubles, bridging through 10, compensation, fact families
**Questions:** EXACTLY {{questionCount}} - count before returning
**Focus:** Mental calculation before writing
**Visual:** Number lines, part-whole diagrams, ten-frames

## 5-QUESTION FORMAT

**Q1:** Near doubles (e.g., 7+8 is 7+7+1)
**Q2:** Bridging through 10 (break to make 10 first)
**Q3:** Number bonds/fact families
**Q4:** Compensation (adjust to friendly numbers)
**Q5:** Mixed strategies (choose best for each)

## STRATEGIES

**Near Doubles:** 6+7 → think 6+6=12, so 6+7=13
**Bridging 10:** 8+5 → 8+2=10, then 10+3=13
**Compensation:** 29+15 → 30+15=45, then 45-1=44
**Known Facts:** If 4+3=7, then 40+30=70

## EXAMPLE OUTPUT

**Q1 (Near Doubles):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Use DOUBLES to solve: 8 + 9 = ?</p>
    <div class="doubles-hint">
        <p class="hint">Think: 8 + 8 = <span class="answer-box small"></span></p>
        <p class="hint">So 8 + 9 = <span class="answer-box small"></span> + 1</p>
    </div>
    <p class="answer-prompt">8 + 9 = <span class="answer-box"></span></p>
</div>
```

**Q2 (Bridging Through 10):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Use MAKE 10 to solve: 7 + 6 = ?</p>
    <div class="bridging-visual">
        <div class="step">7 + <span class="highlight">3</span> = 10</div>
        <div class="arrow">↓</div>
        <div class="step">10 + <span class="answer-box small"></span> = ?</div>
    </div>
    <p class="explanation">(We split 6 into 3 and 3)</p>
    <p class="answer-prompt">7 + 6 = <span class="answer-box"></span></p>
</div>
```

**Q3 (Fact Families):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Complete the fact family.</p>
    <div class="fact-family">
        <div class="part-whole-diagram">
            <div class="whole">15</div>
            <div class="parts">
                <div class="part">8</div>
                <div class="part">7</div>
            </div>
        </div>
        <div class="equations">
            <p>8 + 7 = <span class="answer-box"></span></p>
            <p>7 + 8 = <span class="answer-box"></span></p>
            <p>15 - 8 = <span class="answer-box"></span></p>
            <p>15 - 7 = <span class="answer-box"></span></p>
        </div>
    </div>
</div>
```

**Q4 (Compensation):**
```html
<div class="question" style="background: #FFE0E0;">
    <p class="question-text"><span class="question-number">4.</span> Use COMPENSATION: 38 + 14 = ?</p>
    <div class="compensation-steps">
        <p class="step">Round 38 to 40 (add 2)</p>
        <p class="step">40 + 14 = <span class="answer-box small"></span></p>
        <p class="step">Adjust: <span class="answer-box small"></span> - 2 = <span class="answer-box"></span></p>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 17 (8+8=16, so 8+9=17)</p>
        <p><strong>2.</strong> 13 (7+3=10, 10+3=13)</p>
        <p><strong>3.</strong> 8+7=15, 7+8=15, 15-8=7, 15-7=8</p>
        <p><strong>4.</strong> 52 (40+14=54, 54-2=52)</p>
        <p><strong>5.</strong> Various strategies demonstrated</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
