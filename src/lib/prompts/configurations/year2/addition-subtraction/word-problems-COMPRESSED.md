# Year 2: Word Problems (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 word problems.

## CRITICAL RULES

**Number Range:** 0-100
**Questions:** EXACTLY {{questionCount}} - count before returning
**Problem Types:** One-step and two-step (addition/subtraction focus)
**Visual:** Bar models, picture representations, number sentences
**Contexts:** School, toys, money, fruit, birthdays

## 5-QUESTION FORMAT

**Q1:** Addition - result unknown (combining groups)
**Q2:** Subtraction - result unknown (taking away)
**Q3:** Comparison - how many more/fewer?
**Q4:** Part unknown - missing addend
**Q5:** Two-step - combine two operations

## PROBLEM STRUCTURES

**Addition:** "Ben has 24 marbles. Emma gives him 15 more. How many now?"
**Subtraction:** "Lily had 45 stickers. She used 18. How many left?"
**Comparison:** "Sam has 36 shells. Jack has 22. How many more does Sam have?"
**Part Unknown:** "50 children total. 32 are girls. How many boys?"
**Two-Step:** "Maya had 30 pencils. Bought 15, gave away 12. How many now?"

## EXAMPLE OUTPUT

**Q1 (Addition):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Tom has 28 toy cars. His friend gives him 17 more toy cars. How many toy cars does Tom have altogether?</p>
    <div class="word-problem-visual">
        <div class="bar-model">
            <div class="bar-part" style="width: 60%;">28 cars</div>
            <div class="bar-part" style="width: 40%;">17 cars</div>
        </div>
        <p class="label">Total: ?</p>
    </div>
    <div class="working-space">
        <p>Number sentence: <span class="answer-line">___ + ___ = ___</span></p>
        <p class="answer-prompt">Answer: <span class="answer-box"></span> toy cars</p>
    </div>
</div>
```

**Q2 (Subtraction):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Sarah had 56 sweets. She ate 23 sweets. How many sweets does she have left?</p>
    <div class="word-problem-visual">
        <div class="starting-amount">Started with: 56</div>
        <div class="crossed-out">Ate: 23</div>
        <div class="remaining">Left: ?</div>
    </div>
    <div class="working-space">
        <p>Number sentence: <span class="answer-line">___ - ___ = ___</span></p>
        <p class="answer-prompt">Answer: <span class="answer-box"></span> sweets</p>
    </div>
</div>
```

**Q3 (Comparison):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Jack read 42 pages. Emma read 27 pages. How many MORE pages did Jack read than Emma?</p>
    <div class="comparison-bars">
        <div class="compare-bar">
            <div class="bar jack" style="width: 100%;">Jack: 42 pages</div>
        </div>
        <div class="compare-bar">
            <div class="bar emma" style="width: 64%;">Emma: 27 pages</div>
        </div>
        <div class="difference">Difference: ?</div>
    </div>
    <div class="working-space">
        <p>Number sentence: <span class="answer-line">___ - ___ = ___</span></p>
        <p class="answer-prompt">Answer: <span class="answer-box"></span> more pages</p>
    </div>
</div>
```

**Q5 (Two-Step):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> A shop had 60 balloons. They sold 35 balloons in the morning and 18 balloons in the afternoon. How many balloons are left?</p>
    <div class="two-step-visual">
        <div class="step">Started: 60</div>
        <div class="step">Morning: -35</div>
        <div class="step">Afternoon: -18</div>
        <div class="step">Left: ?</div>
    </div>
    <div class="working-space">
        <p>Step 1: <span class="answer-line">60 - 35 = ___</span></p>
        <p>Step 2: <span class="answer-line">___ - 18 = ___</span></p>
        <p class="answer-prompt">Answer: <span class="answer-box"></span> balloons</p>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 45 toy cars (28 + 17 = 45)</p>
        <p><strong>2.</strong> 33 sweets (56 - 23 = 33)</p>
        <p><strong>3.</strong> 15 more pages (42 - 27 = 15)</p>
        <p><strong>4.</strong> 22 boys (50 - 28 = 22)</p>
        <p><strong>5.</strong> 7 balloons (60-35=25, 25-18=7)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
