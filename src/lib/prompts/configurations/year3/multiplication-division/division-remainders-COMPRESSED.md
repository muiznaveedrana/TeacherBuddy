# Y3: Division with Remainders ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Division TU÷U with remainders.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Division with remainders**: Not all divisions result in whole numbers
- **Range**: Two-digit ÷ single-digit (e.g., 17÷3, 25÷4)
- **Skills**: Calculate quotient and remainder, interpret remainders in context
- **Notation**: 17 ÷ 3 = 5 remainder 2 (or 5 r2)
- **Real-world**: Understanding what remainders mean (leftovers, rounding up/down)

## QUESTION TYPES

**Q1**: Visual division. Show objects being grouped. "17 sweets shared between 3 children. How many each? How many left over?"

**Q2**: Division facts grid (6-8 problems). Mix of divisions with and without remainders.

**Q3**: Interpret remainders. "You have 23 cookies. You put 5 in each bag. How many full bags? How many cookies left?"

**Q4**: Missing number problems. "? ÷ 4 = 6 r2" or "18 ÷ ? = 3 r3"

**Q5**: Word problem with context. "A farmer has 29 eggs. Egg boxes hold 6 eggs. How many boxes does he fill? How many eggs are left over?"

## REMAINDER CONCEPTS

### Understanding Remainders:
- **Remainder**: The amount "left over" after equal sharing
- **Must be smaller** than the divisor
- **Real-world contexts**: Sharing, grouping, packaging

### Example: 17 ÷ 5
- 17 ÷ 5 = 3 remainder 2
- "3 groups of 5, with 2 left over"
- Check: (3 × 5) + 2 = 15 + 2 = 17 ✓

## COLOR SCHEME (Year 3 Enhanced)
- **Groups/quotient**: #4CAF50 (green)
- **Remainder/leftovers**: #FF9800 (orange - "extra")
- **Division symbol**: #2196F3 (blue)
- **Borders**: 3px solid #333

## CSS (Ultra-Compact Year 3 Enhanced):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.division-visual-container{margin:18px 0;padding:18px;background:#E8F5E9;border-radius:8px}
.sharing-groups{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin:20px 0}
.group-box{text-align:center;padding:15px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;min-width:120px}
.group-label{font-size:16pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.group-items{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:150px;margin:10px auto}
.group-items img{width:25px;height:25px}
.remainder-box{text-align:center;padding:15px;margin:20px auto;background:#FFF3E0;border:3px dashed #FF9800;border-radius:8px;max-width:200px}
.remainder-label{font-size:18pt;font-weight:bold;color:#F57C00;margin-bottom:10px}
.remainder-items{display:flex;gap:6px;justify-content:center}
.remainder-items img{width:25px;height:25px}
.division-equation{font-size:28pt;font-weight:bold;text-align:center;margin:20px 0}
.divide-symbol{color:#2196F3;font-size:32pt;margin:0 12px}
.equals-symbol{color:#4CAF50;font-size:32pt;margin:0 12px}
.remainder-text{color:#FF9800;font-size:24pt;margin-left:10px}
.division-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.division-item{padding:15px;background:#FFF;border:3px solid #2196F3;border-radius:8px;text-align:center}
.division-fact{font-size:22pt;font-weight:bold;margin:10px 0;color:#1565C0}
.division-answer{min-width:120px;height:45px;border:3px solid #333;border-radius:6px;background:#FFF;display:inline-block;margin:8px 0;font-size:18pt;line-height:45px}
.interpretation-container{margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.context-visual{display:flex;justify-content:space-around;align-items:flex-start;flex-wrap:wrap;margin:20px 0}
.full-groups{text-align:center;margin:15px}
.full-group-label{font-size:16pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.bag-visual{display:inline-block;margin:8px;padding:12px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;position:relative}
.bag-visual::before{content:'FULL';position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#4CAF50;color:#FFF;padding:3px 10px;border-radius:4px;font-size:11pt;font-weight:bold}
.leftover-visual{text-align:center;margin:15px}
.leftover-label{font-size:16pt;font-weight:bold;color:#F57C00;margin-bottom:10px}
.leftover-items{display:inline-block;padding:12px;background:#FFF3E0;border:3px dashed #FF9800;border-radius:8px}
.missing-number-container{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.missing-equation{font-size:32pt;font-weight:bold;text-align:center;margin:25px 0}
.missing-box{display:inline-block;min-width:100px;height:70px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 12px;font-size:28pt;line-height:70px;text-align:center}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.problem-scenario{display:flex;justify-content:center;gap:25px;flex-wrap:wrap;margin:20px 0}
.scenario-item{text-align:center;margin:15px}
.scenario-label{font-size:16pt;font-weight:bold;margin-bottom:10px}
.check-work-box{margin:15px 0;padding:14px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.check-label{font-size:15pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.check-equation{font-size:18pt;margin:8px 0;padding:8px;background:#FFF;border-radius:4px}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:70px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. Divisions must have remainders (some questions can have no remainder for comparison)
2. Remainder must be SMALLER than divisor
3. Use real-world contexts (sharing, grouping, packaging)
4. Show visual representations for Q1
5. Include checking work: (quotient × divisor) + remainder = dividend
6. Interpret remainders appropriately in word problems
7. Use object images for visual divisions
8. Answer key with full working
9. Colored backgrounds Q1-Q5
10. Year 3 appropriate (ages 7-8)

## OBJECT IMAGES
- `/images/counting/fruits/apple.png` (25px)
- `/images/counting/toys/ball.png` (25px)
- `/images/counting/school_supplies/pencil.png` (25px)

## EXAMPLES

### Q1 Template (Visual Division):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Share 17 apples equally between 3 children. How many does each child get? How many are left over?</p>
  <div class="division-visual-container">
    <div class="sharing-groups">
      <div class="group-box">
        <p class="group-label">Child 1</p>
        <div class="group-items">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
      </div>
      <div class="group-box">
        <p class="group-label">Child 2</p>
        <div class="group-items">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
      </div>
      <div class="group-box">
        <p class="group-label">Child 3</p>
        <div class="group-items">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
      </div>
    </div>
    <div class="remainder-box">
      <p class="remainder-label">Left Over</p>
      <div class="remainder-items">
        <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
      </div>
    </div>
  </div>
  <div class="division-equation">
    17 <span class="divide-symbol">÷</span> 3 <span class="equals-symbol">=</span> <span class="answer-box" style="min-width:60px"></span> <span class="remainder-text">r</span> <span class="answer-box" style="min-width:60px"></span>
  </div>
  <p class="question-text">Each child gets <span class="answer-box" style="min-width:60px"></span> apples, with <span class="answer-box" style="min-width:60px"></span> left over.</p>
</div>
```

### Q2 Template (Division Facts Grid):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Work out these divisions. Write the answer with the remainder.</p>
  <div class="instruction-box">
    Example: 13 ÷ 4 = 3 r1 (3 groups of 4, with 1 left over)
  </div>
  <div class="division-grid">
    <div class="division-item">
      <div class="division-fact">19 ÷ 4 =</div>
      <span class="division-answer"></span>
    </div>
    <div class="division-item">
      <div class="division-fact">25 ÷ 3 =</div>
      <span class="division-answer"></span>
    </div>
    <div class="division-item">
      <div class="division-fact">22 ÷ 5 =</div>
      <span class="division-answer"></span>
    </div>
    <div class="division-item">
      <div class="division-fact">17 ÷ 6 =</div>
      <span class="division-answer"></span>
    </div>
    <div class="division-item">
      <div class="division-fact">29 ÷ 4 =</div>
      <span class="division-answer"></span>
    </div>
    <div class="division-item">
      <div class="division-fact">31 ÷ 5 =</div>
      <span class="division-answer"></span>
    </div>
  </div>
</div>
```

### Q3 Template (Interpret Remainders):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> You have 23 cookies. You put 5 cookies in each bag.</p>
  <div class="interpretation-container">
    <div class="context-visual">
      <div class="full-groups">
        <p class="full-group-label">Full Bags</p>
        <div class="bag-visual">
          <div style="display:flex;gap:5px;flex-wrap:wrap;max-width:80px">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
          </div>
        </div>
        <div class="bag-visual">
          <div style="display:flex;gap:5px;flex-wrap:wrap;max-width:80px">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
          </div>
        </div>
        <div class="bag-visual">
          <div style="display:flex;gap:5px;flex-wrap:wrap;max-width:80px">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
          </div>
        </div>
        <div class="bag-visual">
          <div style="display:flex;gap:5px;flex-wrap:wrap;max-width:80px">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
            <img src="/images/counting/toys/ball.png" width="15" height="15" alt="cookie">
          </div>
        </div>
      </div>
      <div class="leftover-visual">
        <p class="leftover-label">Cookies Left Over</p>
        <div class="leftover-items">
          <img src="/images/counting/toys/ball.png" width="25" height="25" alt="cookie">
          <img src="/images/counting/toys/ball.png" width="25" height="25" alt="cookie">
          <img src="/images/counting/toys/ball.png" width="25" height="25" alt="cookie">
        </div>
      </div>
    </div>
  </div>
  <p class="question-text">a) How many full bags can you make? <span class="answer-box" style="min-width:60px"></span> bags</p>
  <p class="question-text">b) How many cookies are left over? <span class="answer-box" style="min-width:60px"></span> cookies</p>
  <div class="working-space">
    <p class="working-space-label">Show your division:</p>
  </div>
</div>
```

### Q4 Template (Missing Numbers):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Find the missing numbers in these divisions.</p>
  <div class="missing-number-container">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">a) Find the missing number:</p>
    <div class="missing-equation">
      <span class="missing-box"></span> <span class="divide-symbol">÷</span> 4 <span class="equals-symbol">=</span> 6 <span class="remainder-text">r2</span>
    </div>
    <div class="check-work-box">
      <p class="check-label">Check your answer:</p>
      <div class="check-equation">(6 × 4) + 2 = ?</div>
    </div>
  </div>
  <div class="missing-number-container" style="margin-top:25px">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">b) Find the divisor:</p>
    <div class="missing-equation">
      20 <span class="divide-symbol">÷</span> <span class="missing-box"></span> <span class="equals-symbol">=</span> 3 <span class="remainder-text">r2</span>
    </div>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A farmer has 29 eggs. Egg boxes hold 6 eggs each. How many boxes can he fill completely? How many eggs will be left over?</p>
  <div class="word-problem-visual">
    <div class="problem-scenario">
      <div class="scenario-item">
        <p class="scenario-label">Total Eggs</p>
        <div style="font-size:48pt;font-weight:bold;color:#FF9800">29</div>
      </div>
      <div class="scenario-item">
        <p class="scenario-label">Eggs Per Box</p>
        <div style="font-size:48pt;font-weight:bold;color:#2196F3">6</div>
      </div>
    </div>
  </div>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
  <p class="question-text">Division: 29 ÷ 6 = <span class="answer-box" style="min-width:60px"></span> r <span class="answer-box" style="min-width:60px"></span></p>
  <p class="question-text">a) Full boxes: <span class="answer-box" style="min-width:60px"></span> boxes</p>
  <p class="question-text">b) Eggs left over: <span class="answer-box" style="min-width:60px"></span> eggs</p>
</div>
```

## ANSWER KEY TEMPLATE
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <div class="answer-key-content">
    <p><strong>1.</strong> 17 ÷ 3 = 5 r2. Each child gets 5 apples, with 2 left over.</p>
    <p><strong>2.</strong> 19÷4=4 r3, 25÷3=8 r1, 22÷5=4 r2, 17÷6=2 r5, 29÷4=7 r1, 31÷5=6 r1</p>
    <p><strong>3a.</strong> 4 full bags (23 ÷ 5 = 4 r3)</p>
    <p><strong>3b.</strong> 3 cookies left over</p>
    <p><strong>4a.</strong> 26 (check: 6×4=24, 24+2=26)</p>
    <p><strong>4b.</strong> 6 (20÷6=3 r2, check: 3×6=18, 18+2=20)</p>
    <p><strong>5.</strong> 29 ÷ 6 = 4 r5. The farmer can fill 4 boxes completely, with 5 eggs left over.</p>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Visual division with grouping and remainders?
- [ ] Q2: Division facts grid (6+ problems)?
- [ ] Q3: Interpretation with real-world context?
- [ ] Q4: Missing number problems?
- [ ] Q5: Word problem with remainder interpretation?
- [ ] Remainders smaller than divisors?
- [ ] Visual representations included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with working?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
