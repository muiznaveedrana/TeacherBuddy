# Y2: Two-Digit Addition/Subtraction

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS (Injected by system):
{{METHOD_SPEC}}
{{NUMBER_RANGE}}
{{REGROUP_SPEC}}
{{CONTEXT}}
{{OPERATION_MIX}}

<!-- DEBUG: Freshness injection above validates rotation is working -->

## CORE METHODS

### PART (Partitioning)
Split numbers into tens and ones:
- 45 + 32 → (40+5) + (30+2) → (40+30) + (5+2) → 70+7 = 77
- Horizontal: Show boxes/circles for tens and ones
- Vertical: Stack partitioned numbers

### COL (Column Method)
```
  45
+ 32
----
  77
```
Add ones column first, then tens column.
With regrouping: Carry to next column.

### B10 (Base-10 Blocks)
Visual representation:
- Large rectangle = 10
- Small square = 1
- CSS-generated, color-coded

### NL (Number Line)
Show jumps adding tens, then ones:
45 + 32 → Jump +30 to 75, then +2 to 77

## QUESTION SPECS (Use {{METHOD_SPEC}}):

**Q1 Options:**
- `partition-horizontal`: Show (40+5)+(30+2) with boxes
- `partition-vertical`: Stack partitioned format
- `partition-with-objects`: Use counting objects for tens/ones
- `base10-visual`: CSS base-10 blocks showing addition

**Q2 Options:**
- `column-addition-no-regroup`: Standard column, no carrying
- `column-addition-regroup`: Column with carrying (if {{REGROUP_SPEC}} allows)
- `horizontal-addition`: Write horizontally with working space
- `number-line-addition`: Show on number line

**Q3 Options:**
- `partition-subtraction`: Show tens and ones separated
- `base10-subtraction`: Base-10 blocks visual
- `number-line-subtraction`: Jumps backward
- `place-value-chart`: T|O chart format

**Q4 Options:**
- `column-subtraction-no-regroup`: Standard column, no borrowing
- `column-subtraction-regroup`: Column with borrowing (if {{REGROUP_SPEC}} allows)
- `horizontal-subtraction`: Write horizontally
- `comparison-subtraction`: Find difference between two numbers

**Q5 Options:**
- `word-problem-addition`: Real-world addition context
- `word-problem-subtraction`: Real-world subtraction context
- `word-problem-money`: Use UK pence
- `word-problem-mixed`: Two operations

## NUMBER RANGES (Use {{NUMBER_RANGE}}):

**Easy (20-50):** Smaller numbers, easier mental math, less regrouping
**Average (30-70):** Mixed difficulty
**Hard (50-99):** Larger numbers, more regrouping opportunities

## REGROUPING (Use {{REGROUP_SPEC}}):
- `Q2:no,Q4:no` - No regrouping/borrowing
- `Q2:yes,Q4:no` - Addition regroups, subtraction doesn't
- `Q2:no,Q4:yes` - Subtraction borrows, addition doesn't
- `Q2:yes,Q4:yes` - Both regroup (harder)

## CONTEXTS (Use {{CONTEXT}}):

**school**: `/images/WORKSHEET_OBJECTS/counting/school_supplies/[pencil|book|eraser|crayon].png`
**toys**: `/images/WORKSHEET_OBJECTS/counting/toys/[ball|car|doll|teddy].png`
**food**: `/images/WORKSHEET_OBJECTS/counting/fruits/[apple|banana|orange|grape].png` or `/images/WORKSHEET_OBJECTS/counting/food_treats/[cookie|cupcake].png`
**animals**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/[chicken|cow|duck|sheep].png`
**money**: ONLY use these EXACT paths - DO NOT change heads/tails:
  - 1p: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png`
  - 2p: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png`
  - 5p: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png`
  - 10p: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png`
  - 20p: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png` or `/images/WORKSHEET_OBJECTS/money/UK coins/20p tails col - TRF.png`
  - 50p: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png` or `/images/WORKSHEET_OBJECTS/money/UK coins/50p tails col - TRF.png`
**party**: Use shapes or toys for balloons/presents

## CSS (Ultra-Compact - Space-Efficient):

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}

/* Partitioning - Horizontal */
.partition-container{display:flex;justify-content:center;align-items:center;gap:8px;margin:8px 0;flex-wrap:wrap}
.partition-box{border:2px solid #333;padding:4px 8px;border-radius:6px;font-size:15pt;font-weight:bold;background:white;min-width:40px;text-align:center}
.partition-tens{background:#FFEB3B;color:#000}
.partition-ones{background:#4CAF50;color:#fff}
.operator{font-size:20pt;font-weight:bold;color:#FF9800}

/* Partitioning - Vertical Stack */
.partition-vertical{text-align:center;margin:10px 0}
.partition-row{display:flex;justify-content:center;gap:8px;margin:5px 0;font-size:15pt;font-weight:bold}

/* Column Method */
.column-container{display:inline-block;border:2px solid #333;padding:10px 15px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:monospace;font-size:18pt;line-height:1.3;margin:8px auto}
.column-line{border-top:2px solid #000;margin:3px 0}

/* Base-10 Blocks */
.base10-container{display:flex;justify-content:center;gap:15px;margin:10px 0;flex-wrap:wrap}
.base10-group{text-align:center}
.base10-label{font-size:13pt;font-weight:bold;margin-bottom:5px;color:#1976D2}
.base10-blocks{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:280px}
.block-ten{width:70px;height:22px;background:#FF9800;border:2px solid #F57C00;border-radius:3px;margin:2px}
.block-one{width:18px;height:18px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;margin:2px}

/* Number Line */
.number-line-container{margin:10px 0;padding:10px;background:#E3F2FD;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:20px 8px 8px}
.number-line::before{content:'';position:absolute;bottom:8px;left:5%;right:5%;height:2px;background:#333}
.tick{width:28px;height:28px;background:#E0E0E0;border:2px solid #999;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10pt;font-weight:bold;z-index:1}
.tick.highlight{background:#FF9800;color:white;border-width:2px}

/* Place Value Chart */
.pv-chart{display:inline-block;border:2px solid #333;margin:8px 0}
.pv-row{display:flex}
.pv-cell{border:2px solid #666;padding:8px 15px;font-size:16pt;font-weight:bold;text-align:center;min-width:50px}
.pv-header{background:#1976D2;color:white}

/* Word Problem Visuals */
.word-problem-visual{margin:8px 0;padding:10px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.object-group{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.object-group img{width:35px;height:35px}

/* Answer Boxes */
.answer-box{display:inline-block;min-width:80px;height:40px;border:2px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.working-space{border:2px dashed #999;padding:8px;margin:8px 0;min-height:50px;background:#FAFAFA;border-radius:6px}

/* Answer Key */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## TEMPLATES (Match {{METHOD_SPEC}}):

### Q1-partition-horizontal:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Solve: 45 + 32 = ___</p>
  <div class="partition-container">
    <div class="partition-box partition-tens">40</div>
    <div class="operator">+</div>
    <div class="partition-box partition-ones">5</div>
    <div class="operator">+</div>
    <div class="partition-box partition-tens">30</div>
    <div class="operator">+</div>
    <div class="partition-box partition-ones">2</div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q2-column-addition-no-regroup:
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Add using column method:</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  34</div>
      <div>+ 25</div>
      <div class="column-line"></div>
      <div>____</div>
    </div>
  </div>
</div>
```

### Q3-base10-subtraction:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Subtract: 57 - 23 = ___</p>
  <div class="base10-container">
    <div class="base10-group">
      <p class="base10-label">57</p>
      <div class="base10-blocks">
        <!-- 5 ten-blocks, 7 one-blocks -->
      </div>
    </div>
  </div>
  <p class="question-text">Take away 23. Answer: <span class="answer-box"></span></p>
</div>
```

### Q5-word-problem-money:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Emma has 45p. She earns 28p more. How much does Emma have now?</p>
  <div class="word-problem-visual">
    <div class="object-group">
      <!-- Show coin images using EXACT paths -->
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png" width="45" height="45" alt="20p">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/20p tails col - TRF.png" width="45" height="45" alt="20p">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png" width="40" height="40" alt="5p">
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Answer: <span class="answer-box"></span>p</p>
</div>
```

## GENERATION RULES

1. Follow {{METHOD_SPEC}} exactly for each question
2. Use {{NUMBER_RANGE}} appropriate for difficulty
3. Apply {{REGROUP_SPEC}} for Q2 and Q4
4. Use {{CONTEXT}} objects for Q5 word problem
5. NO calculation hints or intermediate steps shown
6. NO method labels or spec names in student questions (e.g., NO "word-problem-money", NO "partition-horizontal")
7. Question text should be child-friendly without technical labels
8. Answer key must show working for teachers
9. ALL image paths must be complete and correct
10. Use colored backgrounds consistently

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q follows {{METHOD_SPEC}}?
- [ ] Numbers within {{NUMBER_RANGE}}?
- [ ] Regrouping matches {{REGROUP_SPEC}}?
- [ ] Q5 uses {{CONTEXT}} appropriately?
- [ ] Correct colored backgrounds?
- [ ] Answer key included?
- [ ] No hints in student questions?

<!-- DEBUG-END: Check console for freshness rotation confirmation -->

Generate complete HTML. UK Year 2 curriculum aligned.
