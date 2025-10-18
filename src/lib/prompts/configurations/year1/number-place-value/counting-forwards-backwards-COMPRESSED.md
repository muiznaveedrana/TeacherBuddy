# Year 1: Counting Forwards and Backwards (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 counting forwards/backwards questions.

## CRITICAL RULES

**Number Range:** 0-20 (primary), some 20-50 for stretch
**Questions:** EXACTLY {{questionCount}} - count before returning
**Skills:** Forward counting, backward counting, number line jumps
**Visual:** Number lines, sequences, stairs, arrows for direction

## 5-QUESTION FORMAT

**Q1:** Count forwards - fill missing numbers (1-20 range, 2-3 missing)
**Q2:** Count backwards - fill missing numbers (10-20 range, 2-3 missing)
**Q3:** Number line jumps forward (start 5-15, jump 3-6 steps)
**Q4:** Real-world counting - stairs/steps/houses (practical application)
**Q5:** Count backwards challenge (start 15-20, jump 5-8 steps backward)

## DIRECTION CUES

- Forward: → arrows, "count up", ascending visuals
- Backward: ← arrows, "count down", descending visuals
- Start: highlighted green, marked "START"
- End/Answer: highlighted orange or "?"

## REAL-WORLD CONTEXTS

- Stairs (up = forward, down = backward)
- Houses on street
- Books on shelf
- Days/dates
- Seats in row

## EXAMPLE OUTPUT

**Q1 (Count Forwards):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Fill in the missing numbers. Count FORWARDS.</p>
    <div class="number-sequence">
        <div class="sequence-box filled">5</div>
        <div class="sequence-box filled">6</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">8</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
        <div class="sequence-box filled">11</div>
    </div>
    <p class="answer-prompt">Write the missing numbers</p>
</div>
```

**Q2 (Count Backwards):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Fill in the missing numbers. Count BACKWARDS.</p>
    <div class="number-sequence backwards">
        <div class="sequence-box filled">15</div>
        <div class="sequence-box filled">14</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">12</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
    </div>
    <div class="direction-arrow backwards">←</div>
</div>
```

**Q3 (Number Line Forward):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Start at 8. Count forwards 5 steps. Where do you land?</p>
    <div class="number-line-jumps">
        <div class="number-line-extended">
            <div class="number-point">6</div>
            <div class="number-point">7</div>
            <div class="number-point start">8</div>
            <div class="number-point">9</div>
            <div class="number-point">10</div>
            <div class="number-point">11</div>
            <div class="number-point">12</div>
            <div class="number-point end">13</div>
            <div class="number-point">14</div>
        </div>
        <div class="jump-instruction"><p>Make 5 jumps forward →</p></div>
    </div>
    <p class="answer-prompt">You land on <span class="answer-box"></span></p>
</div>
```

**Q4 (Stairs/Real-World):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Emma is climbing stairs. She starts at step 3 and climbs up 6 more steps. What step is she on now?</p>
    <div class="stairs-visual">
        <div class="stair-step">9</div>
        <div class="stair-step">8</div>
        <div class="stair-step">7</div>
        <div class="stair-step">6</div>
        <div class="stair-step">5</div>
        <div class="stair-step">4</div>
        <div class="stair-step start-step">3</div>
        <div class="stair-step">2</div>
        <div class="stair-step">1</div>
    </div>
    <p class="answer-prompt">Emma is on step <span class="answer-box"></span></p>
</div>
```

**Q5 (Backwards Challenge):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Start at 20. Count backwards 7 steps. Where do you land?</p>
    <div class="number-line-jumps">
        <div class="number-line-extended">
            <div class="number-point">11</div>
            <div class="number-point">12</div>
            <div class="number-point end">13</div>
            <div class="number-point">14</div>
            <div class="number-point">15</div>
            <div class="number-point">16</div>
            <div class="number-point">17</div>
            <div class="number-point">18</div>
            <div class="number-point">19</div>
            <div class="number-point start">20</div>
        </div>
        <div class="jump-instruction"><p>Make 7 jumps backward ←</p></div>
    </div>
    <p class="answer-prompt">You land on <span class="answer-box"></span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 7, 9 (forward sequence)</p>
        <p><strong>2.</strong> 13, 11 (backward sequence)</p>
        <p><strong>3.</strong> 13 (start 8, forward 5)</p>
        <p><strong>4.</strong> Step 9 (start 3, climb 6)</p>
        <p><strong>5.</strong> 13 (start 20, backward 7)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
