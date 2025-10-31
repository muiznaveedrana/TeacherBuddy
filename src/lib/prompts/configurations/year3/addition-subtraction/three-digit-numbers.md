# Y3: Three-Digit Addition & Subtraction

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS (Injected by system):
{{METHOD_SPEC}}
{{NUMBER_RANGE}}
{{REGROUP_SPEC}}
{{CONTEXT}}
{{VISUAL_MODE}}

<!-- DEBUG: Freshness injection above validates rotation is working -->

## CORE METHODS

### COL-ADD (Column Addition)
Standard vertical format for 3-digit addition:
```
  456
+ 278
-----
  734
```
- Add ones column first, then tens, then hundreds
- **Regrouping**: Carry to next column when sum ≥ 10
- **No regrouping**: Each column sum < 10

### COL-SUB (Column Subtraction)
Standard vertical format for 3-digit subtraction:
```
  734
- 278
-----
  456
```
- Subtract ones column first, then tens, then hundreds
- **Borrowing**: When top digit < bottom digit, borrow from next column
- **No borrowing**: Top digit ≥ bottom digit in each column

### MENTAL-ADD (Mental Addition Strategies)
Add multiples of 10 and 100 mentally:
- **Add 10**: 456 + 10 = 466 (increase tens digit by 1)
- **Add 100**: 456 + 100 = 556 (increase hundreds digit by 1)
- **Add multiple tens**: 456 + 30 = 486 (add 3 to tens digit)
- **Add multiple hundreds**: 456 + 200 = 656 (add 2 to hundreds digit)

### MENTAL-SUB (Mental Subtraction Strategies)
Subtract multiples of 10 and 100 mentally:
- **Subtract 10**: 734 - 10 = 724 (decrease tens digit by 1)
- **Subtract 100**: 734 - 100 = 634 (decrease hundreds digit by 1)
- **Subtract multiple tens**: 734 - 30 = 704 (subtract 3 from tens digit)
- **Subtract multiple hundreds**: 734 - 200 = 534 (subtract 2 from hundreds digit)

### BASE10 (Base-10 Blocks Visual)
Visual representation using CSS-generated blocks:
- **Hundreds block**: Large square (100 units)
- **Tens rod**: Rectangle (10 units)
- **Ones cube**: Small square (1 unit)
- Example: 456 = 4 hundreds blocks + 5 tens rods + 6 ones cubes

### PV-CHART (Place Value Chart)
Table showing hundreds, tens, ones:
```
 H  | T  | O
----+----+----
 4  | 5  | 6
+2  | 7  | 8
----+----+----
 7  | 3  | 4
```

### NUM-LINE (Number Line)
Visual jumps for mental calculation:
- Show jumps of 10, 100 on number line
- Example: 456 + 200 → jump from 456 to 556 to 656

## QUESTION SPECS (Use {{METHOD_SPEC}}):

**Q1 Options:**
- `column-add-regroup-ones`: Column addition, regrouping in ones column (e.g., 456 + 278 = ones: 6+8=14, carry 1)
- `column-add-regroup-tens`: Column addition, regrouping in tens column (e.g., 437 + 285 = tens: 3+8+1=12, carry 1)
- `column-add-regroup-hundreds`: Column addition, regrouping in hundreds column (e.g., 567 + 489 = hundreds: 5+4+1=10, carry 1)
- `column-add-multi-regroup`: Column addition, regrouping in multiple columns
- `column-add-no-regroup`: Column addition, no regrouping needed (e.g., 321 + 456)
- `base10-visual-add`: Show base-10 blocks for addition
- `place-value-add`: Use place value chart for addition
- `expanded-notation-add`: Show expanded form (400+50+6) + (200+70+8)

**Q2 Options:**
- `column-sub-borrow-ones`: Column subtraction, borrowing from tens (e.g., 734 - 278 = ones: can't do 4-8, borrow)
- `column-sub-borrow-tens`: Column subtraction, borrowing from hundreds (e.g., 634 - 278 = tens: can't do 2-7, borrow)
- `column-sub-multi-borrow`: Column subtraction, borrowing across multiple columns
- `column-sub-no-borrow`: Column subtraction, no borrowing needed (e.g., 987 - 432)
- `column-sub-zeros`: Subtraction with zeros (e.g., 800 - 234)
- `base10-visual-sub`: Show base-10 blocks for subtraction
- `place-value-sub`: Use place value chart for subtraction
- `horizontal-sub`: Write horizontally with working space

**Q3 Options:**
- `mental-add-tens`: Add multiples of 10 mentally (e.g., 456 + 30, 567 + 40)
- `mental-add-hundreds`: Add multiples of 100 mentally (e.g., 456 + 200, 567 + 300)
- `mental-sub-tens`: Subtract multiples of 10 mentally (e.g., 734 - 30, 845 - 50)
- `mental-sub-hundreds`: Subtract multiples of 100 mentally (e.g., 734 - 200, 845 - 300)
- `mental-mixed`: Mix of adding/subtracting tens and hundreds
- `number-line-mental`: Show number line for mental calculations
- `place-value-mental`: Apply place value knowledge
- `near-multiples`: Add/subtract near multiples (e.g., 456 + 99 = 456 + 100 - 1)

**Q4 Options:**
- `mixed-operations-4problems`: 4 mixed addition/subtraction problems
- `inverse-operations`: Show inverse relationships (e.g., if 456 + 278 = 734, then 734 - 278 = ?)
- `missing-numbers`: Find missing numbers (e.g., 456 + ___ = 734)
- `comparison-problems`: Compare sums/differences (e.g., which is greater: 456 + 200 or 500 + 100?)
- `true-false-statements`: Evaluate statements (e.g., 734 - 278 = 456 → True or False?)
- `estimation-check`: Estimate then calculate
- `multiple-choice`: Choose correct answer from 3 options

**Q5 Options:**
- `word-problem-money`: UK money context (pence and pounds)
- `word-problem-shopping`: Shopping scenario
- `word-problem-school`: School context (students, books, supplies)
- `word-problem-travel`: Distance, journeys
- `word-problem-multi-step`: Two-step problem (add then subtract or vice versa)
- `word-problem-comparison`: "How many more?" type questions
- `word-problem-bar-model`: Include bar model visual

## NUMBER RANGES (Use {{NUMBER_RANGE}}):

**Easy (200-400):** Smaller 3-digit numbers, less regrouping
**Average (300-600):** Mixed difficulty, moderate regrouping
**Hard (500-900):** Larger numbers, more regrouping opportunities
**Mixed:** Vary ranges across questions

## REGROUPING SPECS (Use {{REGROUP_SPEC}}):

- `Q1:ones,Q2:ones` - Regroup in ones column only
- `Q1:tens,Q2:tens` - Regroup in tens column only
- `Q1:multi,Q2:multi` - Multiple column regrouping
- `Q1:none,Q2:none` - No regrouping (easier)
- `Q1:ones,Q2:tens` - Different regrouping per question

## CONTEXTS (Use {{CONTEXT}}):

**money**: UK coins and notes (emphasize this context)
  - Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2
  - Use EXACT paths: `/images/WORKSHEET_OBJECTS/money/UK coins/[coin] [side] col - TRF.png`
  - Example: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png`
  - Scenarios: Saving, spending, shopping, pocket money

**school**: `/images/WORKSHEET_OBJECTS/counting/school_supplies/[pencil|book|eraser|crayon|marker|scissors|ruler|glue|backpack].png`
  - Scenarios: Classroom supplies, library books, students

**toys**: `/images/WORKSHEET_OBJECTS/counting/toys/[ball|car|doll|teddy|block|kite].png`
  - Scenarios: Toy shop, collections, birthday presents

**animals**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/[chicken|cow|duck|sheep|pig|horse|goat].png`
  - Scenarios: Farm visits, zoo, pet shop

**food**: `/images/WORKSHEET_OBJECTS/counting/fruits/[apple|banana|orange|strawberry|grape|pear|lemon|watermelon|peach].png` or `/images/WORKSHEET_OBJECTS/counting/food_treats/[cookie|cupcake].png`
  - Scenarios: Supermarket, fruit picking, baking

**shopping**: Mix of money, food, toys for realistic shopping contexts

## VISUAL MODES (Use {{VISUAL_MODE}}):

**column-standard**: Traditional column method layout
**column-expanded**: Column method with place value labels (H, T, O)
**base10-blocks**: CSS-generated base-10 visual blocks
**place-value-chart**: Table format with H|T|O columns
**number-line-jumps**: Number line showing jumps
**bar-model**: Bar model for word problems
**mixed**: Vary visual approaches across questions

## CSS (Ultra-Compact - Space-Efficient):

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}

/* Column Method - 3-Digit */
.column-container{display:inline-block;border:2px solid #333;padding:12px 18px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:monospace;font-size:20pt;line-height:1.4;margin:10px auto}
.column-line{border-top:3px solid #000;margin:4px 0}
.carry-notation{font-size:12pt;color:#FF5722;position:relative;top:-8px}

/* Place Value Chart */
.pv-chart{display:inline-block;border:3px solid #333;margin:10px 0;border-radius:6px}
.pv-row{display:flex}
.pv-cell{border:2px solid #666;padding:10px 18px;font-size:18pt;font-weight:bold;text-align:center;min-width:60px}
.pv-header{background:#1976D2;color:white;font-size:16pt}
.pv-label{background:#E3F2FD;color:#1976D2;font-weight:bold}

/* Base-10 Blocks for 3-Digit */
.base10-container{display:flex;justify-content:center;gap:20px;margin:12px 0;flex-wrap:wrap}
.base10-group{text-align:center}
.base10-label{font-size:14pt;font-weight:bold;margin-bottom:6px;color:#1976D2}
.base10-blocks{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:350px}
.block-hundred{width:80px;height:80px;background:#FFA726;border:3px solid #F57C00;border-radius:4px;margin:3px;position:relative}
.block-hundred::before{content:'100';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:18pt;font-weight:bold;color:#fff}
.block-ten{width:75px;height:24px;background:#FF9800;border:2px solid #F57C00;border-radius:3px;margin:2px}
.block-one{width:20px;height:20px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;margin:2px}

/* Number Line for 3-Digit */
.number-line-container{margin:12px 0;padding:12px;background:#E3F2FD;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:25px 10px 10px}
.number-line::before{content:'';position:absolute;bottom:10px;left:5%;right:5%;height:3px;background:#333}
.tick{width:32px;height:32px;background:#E0E0E0;border:2px solid #999;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;z-index:1}
.tick.start{background:#4CAF50;color:white;border-width:3px}
.tick.end{background:#FF9800;color:white;border-width:3px}
.jump-arrow{text-align:center;margin-top:8px;font-size:14pt;font-weight:bold;color:#1976D2}

/* Mental Calculation Display */
.mental-calc{text-align:center;margin:12px 0;padding:15px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.calc-step{font-size:17pt;margin:8px 0;font-weight:600}
.thinking-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}

/* Bar Model for Word Problems */
.bar-model-container{margin:12px 0;padding:12px;background:#F3E5F5;border-radius:8px}
.bar{display:flex;margin:10px 0}
.bar-segment{height:50px;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;color:white;border:2px solid #333;position:relative}
.bar-segment.part1{background:#9C27B0;flex:1}
.bar-segment.part2{background:#7B1FA2;flex:1}
.bar-segment.whole{background:#4A148C;width:100%}
.bar-label{text-align:center;font-size:14pt;font-weight:bold;margin-top:6px}

/* Word Problem Visuals - Money Focus */
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.money-display{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:10px 0}
.money-display img{margin:4px}
.coin-group{display:flex;gap:8px;align-items:center;margin:8px 0}
.coin-label{font-size:14pt;font-weight:bold;margin-left:8px}

/* Mixed Operations Grid */
.mixed-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:12px 0}
.mini-problem{padding:10px;background:white;border:2px solid #333;border-radius:6px;text-align:center}
.mini-problem .equation{font-size:16pt;font-weight:bold;margin:8px 0}

/* Answer Boxes */
.answer-box{display:inline-block;min-width:90px;height:42px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-box-large{min-width:120px;height:45px}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}

/* Answer Key */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
.answer-key .working{font-style:italic;color:#555;margin-left:15px;font-size:12pt}
</style>
```

## TEMPLATES (Match {{METHOD_SPEC}}):

### Q1-column-add-regroup-ones:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Add using column method:</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  456</div>
      <div>+ 278</div>
      <div class="column-line"></div>
      <div>_____</div>
    </div>
  </div>
  <p style="text-align:center;font-size:13pt;color:#666;margin-top:8px">Remember to regroup when needed!</p>
</div>
```

### Q1-base10-visual-add:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Add using the base-10 blocks:</p>
  <div class="base10-container">
    <div class="base10-group">
      <p class="base10-label">456</p>
      <div class="base10-blocks">
        <!-- 4 hundreds blocks -->
        <div class="block-hundred"></div>
        <div class="block-hundred"></div>
        <div class="block-hundred"></div>
        <div class="block-hundred"></div>
        <!-- 5 tens blocks -->
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <!-- 6 ones blocks -->
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
      </div>
    </div>
    <div style="font-size:24pt;color:#FF9800;font-weight:bold;align-self:center">+</div>
    <div class="base10-group">
      <p class="base10-label">278</p>
      <div class="base10-blocks">
        <!-- 2 hundreds blocks -->
        <div class="block-hundred"></div>
        <div class="block-hundred"></div>
        <!-- 7 tens blocks -->
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <div class="block-ten"></div>
        <!-- 8 ones blocks -->
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
        <div class="block-one"></div>
      </div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box-large"></span></p>
</div>
```

### Q2-column-sub-borrow-ones:
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Subtract using column method:</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  734</div>
      <div>- 278</div>
      <div class="column-line"></div>
      <div>_____</div>
    </div>
  </div>
  <p style="text-align:center;font-size:13pt;color:#666;margin-top:8px">You may need to borrow!</p>
</div>
```

### Q3-mental-add-hundreds:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Solve mentally (no column method):</p>
  <div class="mental-calc">
    <div class="calc-step">a) 456 + 200 = <span class="answer-box"></span></div>
    <div class="calc-step">b) 567 + 300 = <span class="answer-box"></span></div>
    <div class="calc-step">c) 678 + 100 = <span class="answer-box"></span></div>
  </div>
  <p style="text-align:center;font-size:13pt;font-style:italic;color:#7B1FA2;margin-top:8px">
    Hint: When adding 100, increase the hundreds digit by 1
  </p>
</div>
```

### Q3-number-line-mental:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Use the number line to add 200:</p>
  <div class="number-line-container">
    <p style="text-align:center;font-weight:bold">456 + 200 = ?</p>
    <div class="number-line">
      <div class="tick start">456</div>
      <div class="tick">556</div>
      <div class="tick end">656</div>
    </div>
    <div class="jump-arrow">+100 → +100</div>
  </div>
  <p class="question-text">456 + 200 = <span class="answer-box"></span></p>
</div>
```

### Q4-mixed-operations-4problems:
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Solve these calculations:</p>
  <div class="mixed-grid">
    <div class="mini-problem">
      <p class="equation">345 + 267 = <span class="answer-box"></span></p>
    </div>
    <div class="mini-problem">
      <p class="equation">612 - 345 = <span class="answer-box"></span></p>
    </div>
    <div class="mini-problem">
      <p class="equation">789 + 123 = <span class="answer-box"></span></p>
    </div>
    <div class="mini-problem">
      <p class="equation">900 - 456 = <span class="answer-box"></span></p>
    </div>
  </div>
</div>
```

### Q4-inverse-operations:
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Use inverse operations to complete:</p>
  <div style="margin:15px 0;padding:15px;background:white;border:2px solid #333;border-radius:6px">
    <p style="font-size:16pt;margin:10px 0">If 456 + 278 = 734, then:</p>
    <p style="font-size:16pt;margin:10px 0;margin-left:30px">a) 734 - 278 = <span class="answer-box"></span></p>
    <p style="font-size:16pt;margin:10px 0;margin-left:30px">b) 734 - 456 = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q5-word-problem-money:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Sarah has saved £4.56 in her piggy bank. Her grandmother gives her £2.78 more. How much money does Sarah have now?</p>
  <div class="word-problem-visual">
    <div class="money-display">
      <div class="coin-group">
        <img src="/images/WORKSHEET_OBJECTS/money/UK coins/£2 heads col - TRF.png" width="55" height="55" alt="£2">
        <img src="/images/WORKSHEET_OBJECTS/money/UK coins/£2 heads col - TRF.png" width="55" height="55" alt="£2">
        <span class="coin-label">£4.56 (Sarah's savings)</span>
      </div>
      <div style="font-size:28pt;color:#FF9800">+</div>
      <div class="coin-group">
        <img src="/images/WORKSHEET_OBJECTS/money/UK coins/£2 heads col - TRF.png" width="55" height="55" alt="£2">
        <img src="/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png" width="50" height="50" alt="50p">
        <span class="coin-label">£2.78 (from Grandma)</span>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Total: £<span class="answer-box"></span></p>
</div>
```

### Q5-word-problem-bar-model:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A bookshop had 734 books. They sold 278 books. How many books are left?</p>
  <div class="bar-model-container">
    <p style="font-size:14pt;font-weight:bold;margin-bottom:10px">Bar Model:</p>
    <div class="bar">
      <div class="bar-segment whole">734 books (total)</div>
    </div>
    <div class="bar">
      <div class="bar-segment part1">278 sold</div>
      <div class="bar-segment part2">? left</div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Books left: <span class="answer-box"></span></p>
</div>
```

## GENERATION RULES

1. **Follow SPEC exactly**: Use {{METHOD_SPEC}} for each question type
2. **Respect RANGE**: Apply {{NUMBER_RANGE}} per question (within 1000)
3. **Apply REGROUP_SPEC**: Follow regrouping/borrowing rules
4. **Use CONTEXT**: Integrate context for Q5 word problems
5. **Match VISUAL_MODE**: Apply specified visual approach
6. **NO calculation hints or intermediate steps** shown in student-facing questions
7. **NO method labels** in questions (e.g., NO "column-add-regroup-ones", NO "base10-visual-add")
8. **Question text child-friendly** without technical labels
9. **Answer key MUST show working** for teachers (include regrouping steps, borrowing notation)
10. **ALL image paths complete and correct** (UK coins for money problems)
11. **Use colored backgrounds** consistently (Q1=#FFF9C4, Q2=#E3F2FD, Q3=#F1F8E9, Q4=#FCE4EC, Q5=#FFF3E0)
12. **3-DIGIT NUMBERS ONLY** (100-999 range)
    - **Sums ≤ 1000 preferred**: Choose numbers where sum stays 3-digit when possible
    - **4-digit sums acceptable**: For multi-regroup practice (e.g., 567 + 489 = 1056)
    - **Subtraction always 3-digit results**: Top number > bottom number, result stays positive
13. **EMPHASIZE MONEY PROBLEMS** in Q5 variations (use UK currency)
14. **USE COLOR COIN IMAGES**: ALWAYS use "col - TRF.png" (color) versions, NEVER "bw - TRF.png" (black & white)

## UK MONEY REFERENCE (for Q5):

**Available Coins** (ALWAYS use color "col" versions, NEVER black & white "bw"):
- **1p**: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png` (width="35" height="35")
- **2p**: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png` (width="38" height="38")
- **5p**: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png` (width="40" height="40")
- **10p**: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png` (width="42" height="42")
- **20p**: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png` (width="44" height="44")
- **50p**: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png` (width="50" height="50")
- **£1**: `/images/WORKSHEET_OBJECTS/money/UK coins/£1 heads col - TRF.png` (width="52" height="52")
- **£2**: `/images/WORKSHEET_OBJECTS/money/UK coins/£2 heads col - TRF.png` (width="55" height="55")

**Money Contexts**:
- Saving pocket money
- Shopping (toys, books, snacks)
- Fundraising for charity
- Birthday money gifts
- Earning money (chores, helping)

## VALIDATION CHECKLIST

Before returning worksheet:
- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q follows {{METHOD_SPEC}}?
- [ ] Numbers within {{NUMBER_RANGE}} (100-999, sums ≤1000)?
- [ ] Regrouping matches {{REGROUP_SPEC}}?
- [ ] Q5 uses {{CONTEXT}} appropriately?
- [ ] Correct colored backgrounds for each question?
- [ ] Answer key included with working shown?
- [ ] No hints in student questions?
- [ ] All coin image paths correct for money problems?
- [ ] 3-digit numbers only (not 2-digit or 4-digit)?
- [ ] Mental calculation questions (Q3) don't require column method?

<!-- DEBUG-END: Check console for freshness rotation confirmation -->

Generate complete HTML. UK Year 3 curriculum aligned. Ages 7-8. Three-digit addition and subtraction within 1000.
