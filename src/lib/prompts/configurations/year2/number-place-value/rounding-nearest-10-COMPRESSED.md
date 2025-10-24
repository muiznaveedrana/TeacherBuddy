# Year 2: Rounding to Nearest 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 rounding to nearest 10 questions.

## CRITICAL RULES

**Number Range:** 0-100
**Questions:** EXACTLY {{questionCount}} - count before returning
**Rounding Rule:** Look at ones digit (1-4 down, 5-9 up, 0 stays)
**Visual:** Number lines showing decades with midpoints

## 5-QUESTION FORMAT

**Q1:** Number line - circle nearest 10
**Q2:** Round 3 numbers to nearest 10
**Q3:** Ones digit rule - which numbers round to given 10?
**Q4:** Real-world estimation context
**Q5:** Challenge - round and compare

## ROUNDING RULE

**Ones digit:**
- **0**: Stays (already a ten)
- **1-4**: Round DOWN
- **5-9**: Round UP

**Examples:**
- 23 → 20 (ones=3, down)
- 47 → 50 (ones=7, up)
- 85 → 90 (ones=5, up)
- 30 → 30 (already ten)

## EXAMPLE OUTPUT

**Q1 (Number Line):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Round 34 to the nearest 10. Circle the answer on the number line.</p>
    <div class="number-line">
        <div class="nl-marker">20</div>
        <div class="nl-tick"></div>
        <div class="nl-tick"></div>
        <div class="nl-tick"></div>
        <div class="nl-tick"></div>
        <div class="nl-marker midpoint">25</div>
        <div class="nl-tick"></div>
        <div class="nl-tick"></div>
        <div class="nl-tick"></div>
        <div class="nl-position target">34</div>
        <div class="nl-marker">30</div>
        <div class="nl-tick"></div>
        <div class="nl-marker">40</div>
    </div>
    <p class="instruction">34 is closer to: <span class="choice">30</span> or <span class="choice">40</span>?</p>
</div>
```

**Q2 (Round Numbers):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Round each number to the nearest 10.</p>
    <div class="rounding-grid">
        <div class="round-item">
            <span class="number">52</span>
            <span class="arrow">→</span>
            <span class="answer-box"></span>
        </div>
        <div class="round-item">
            <span class="number">78</span>
            <span class="arrow">→</span>
            <span class="answer-box"></span>
        </div>
        <div class="round-item">
            <span class="number">23</span>
            <span class="arrow">→</span>
            <span class="answer-box"></span>
        </div>
    </div>
</div>
```

**Q3 (Ones Digit Rule):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Circle ALL the numbers that round to 40.</p>
    <div class="number-options">
        <div class="number-card">36</div>
        <div class="number-card">42</div>
        <div class="number-card">35</div>
        <div class="number-card">44</div>
        <div class="number-card">49</div>
        <div class="number-card">33</div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 30 (34 is closer to 30 than 40)</p>
        <p><strong>2.</strong> 52→50, 78→80, 23→20</p>
        <p><strong>3.</strong> 36, 42, 35, 44 (all round to 40)</p>
        <p><strong>4.</strong> About 60 children (57 rounds to 60)</p>
        <p><strong>5.</strong> 68→70, 45→50, 32→30</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
