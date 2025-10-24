# Year 2: Equal Groups (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 equal groups questions.

## CRITICAL RULES

**Concept:** Multiplication as equal groups
**Questions:** EXACTLY {{questionCount}} - count before returning
**Visual:** Circles/boxes containing objects, WORKSHEET_OBJECTS
**Language:** "groups of", "in each group", "altogether"

## 5-QUESTION FORMAT

**Q1:** Count equal groups (visual with circles)
**Q2:** Draw equal groups (from description)
**Q3:** Write multiplication sentence (from visual)
**Q4:** Comparison (more groups vs more in each)
**Q5:** Word problem (equal groups context)

## EXAMPLE OUTPUT

**Q1 (Count Groups):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Count the groups and objects.</p>
    <div class="equal-groups-visual">
        <div class="group-circle">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
        </div>
        <div class="group-circle">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
        </div>
        <div class="group-circle">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
        </div>
        <div class="group-circle">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="30" />
        </div>
    </div>
    <p class="question">How many groups? <span class="answer-box"></span></p>
    <p class="question">How many in each group? <span class="answer-box"></span></p>
    <p class="question">How many altogether? <span class="answer-line">___ × ___ = ___</span></p>
</div>
```

**Q2 (Draw Groups):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Draw 5 groups of 2 stars. ⭐</p>
    <div class="drawing-space">
        <div class="draw-box"></div>
        <div class="draw-box"></div>
        <div class="draw-box"></div>
        <div class="draw-box"></div>
        <div class="draw-box"></div>
    </div>
    <p class="answer-prompt">Total: <span class="answer-line">___ × ___ = ___</span></p>
</div>
```

**Q3 (Write Multiplication):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Write the multiplication sentence.</p>
    <div class="group-visual">
        [🍌🍌🍌🍌🍌] [🍌🍌🍌🍌🍌] [🍌🍌🍌🍌🍌]
    </div>
    <p class="answer-prompt"><span class="answer-line">___ groups of ___ = ___ × ___ = ___</span></p>
</div>
```

**Q4 (Comparison):**
```html
<div class="question" style="background: #FFE0E0;">
    <p class="question-text"><span class="question-number">4.</span> Which has MORE altogether?</p>
    <div class="comparison">
        <div class="option-a">
            <p>Option A: 3 groups of 5</p>
            <div class="groups">[●●●●●] [●●●●●] [●●●●●]</div>
        </div>
        <div class="option-b">
            <p>Option B: 5 groups of 3</p>
            <div class="groups">[●●●] [●●●] [●●●] [●●●] [●●●]</div>
        </div>
    </div>
    <p class="answer-prompt">Circle: <span class="choice">Option A</span>, <span class="choice">Option B</span>, or <span class="choice">Same</span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 4 groups, 3 in each, 4 × 3 = 12</p>
        <p><strong>2.</strong> Drawing shows 5 groups of 2, 5 × 2 = 10</p>
        <p><strong>3.</strong> 3 groups of 5, 3 × 5 = 15</p>
        <p><strong>4.</strong> Same (both equal 15)</p>
        <p><strong>5.</strong> 24 cookies (6 plates × 4 cookies each)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
