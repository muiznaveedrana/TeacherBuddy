# Year 2: Comparing Numbers (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 comparing numbers questions.

## CRITICAL RULES

**Number Range:** 0-100
**Questions:** EXACTLY {{questionCount}} - count before returning
**Symbols:** <, >, = (greater than, less than, equal to)
**Strategy:** Compare tens first, then ones
**Visual:** Base-10 blocks, place value charts

## 5-QUESTION FORMAT

**Q1:** Visual comparison - which is greater? (base-10 blocks)
**Q2:** Use <, >, = symbols to compare two numbers
**Q3:** Order 4 numbers from smallest to largest
**Q4:** Place value reasoning - explain comparison
**Q5:** Word problem - real-world comparison

## COMPARISON SYMBOLS

- **>** (greater than): 47 > 32
- **<** (less than): 25 < 61
- **=** (equal to): 50 = 50

## PLACE VALUE STRATEGY

1. Compare tens first (if different, that determines which is greater)
2. If tens same, compare ones

## EXAMPLE OUTPUT

**Q1 (Visual Comparison):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which number is GREATER?</p>
    <div class="comparison-visual">
        <div class="number-group">
            <p class="number-label">34</p>
            <div class="base10-blocks">
                <!-- 3 tens rods + 4 ones cubes -->
            </div>
        </div>
        <div class="vs-symbol">vs</div>
        <div class="number-group">
            <p class="number-label">52</p>
            <div class="base10-blocks">
                <!-- 5 tens rods + 2 ones cubes -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">Circle the greater number: <span class="choice">34</span> or <span class="choice">52</span></p>
</div>
```

**Q2 (Symbols):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Write <, >, or = in the box.</p>
    <div class="comparison-equation">
        <span class="number">67</span>
        <span class="symbol-box answer-box"></span>
        <span class="number">45</span>
    </div>
</div>
```

**Q3 (Ordering):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Write these numbers in order from SMALLEST to LARGEST.</p>
    <div class="number-set">
        <div class="number-card">82</div>
        <div class="number-card">27</div>
        <div class="number-card">65</div>
        <div class="number-card">51</div>
    </div>
    <div class="ordering-boxes">
        <div class="order-box"><span class="label">Smallest</span><div class="answer-box"></div></div>
        <div class="arrow">→</div>
        <div class="order-box"><div class="answer-box"></div></div>
        <div class="arrow">→</div>
        <div class="order-box"><div class="answer-box"></div></div>
        <div class="arrow">→</div>
        <div class="order-box"><span class="label">Largest</span><div class="answer-box"></div></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 52 is greater (5 tens vs 3 tens)</p>
        <p><strong>2.</strong> 67 > 45</p>
        <p><strong>3.</strong> 27, 51, 65, 82</p>
        <p><strong>4.</strong> 78 > 74 (same tens, 8 ones > 4 ones)</p>
        <p><strong>5.</strong> Maya has more stickers (86 > 59)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
