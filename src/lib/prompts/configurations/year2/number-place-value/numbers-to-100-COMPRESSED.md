# Year 2: Numbers to 100

**CRITICAL: EXACTLY {{questionCount}} questions. Numbers to 100, place value focus.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 0-100 (emphasis on tens and ones)
- **Place Value**: Tens and ones understanding
- **Visual Representations**: Base-10 blocks, hundred square, place value charts, number lines
- **Ages 6-7**: Build on Year 1 (0-20) knowledge

## QUESTION TYPES

**Q1**: Base-10 blocks representation. "What number is shown?"

**Q2**: Place value chart. "Complete the chart for the number __."

**Q3**: Number line identification. "What number is at the marked position?"

**Q4**: Number words matching. "Match the numeral to the word."

**Q5**: Word problem with place value. "The shop has __ boxes of 10 and __ single items. How many total?"

## NUMBER WORDS
- **Tens**: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety
- **Teens**: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen
- **Compound**: twenty-one (21), thirty-five (35), etc.

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.base10-container{display:flex;justify-content:center;gap:15px;margin:15px 0;flex-wrap:wrap}
.base10-group{text-align:center}
.base10-blocks{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:280px}
.block-ten{width:70px;height:22px;background:#FF9800;border:2px solid #F57C00;border-radius:3px;margin:2px}
.block-one{width:18px;height:18px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;margin:2px}
.pv-chart{display:inline-block;border:2px solid #333;margin:10px 0;background:#FFF}
.pv-row{display:flex}
.pv-cell{border:2px solid #666;padding:10px 20px;font-size:15pt;font-weight:bold;text-align:center;min-width:60px}
.pv-header{background:#1976D2;color:white}
.number-line-container{margin:15px 0;padding:15px;background:#E3F2FD;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:20px 8px 8px}
.number-line::before{content:'';position:absolute;bottom:8px;left:5%;right:5%;height:2px;background:#333}
.tick{width:32px;height:32px;background:#E0E0E0;border:2px solid #999;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;z-index:1}
.tick.highlight{background:#FF9800;color:white;border:3px solid #F57C00}
.tick.empty{background:#FFF;border:2px dashed #FF9800}
.word-matching{margin:15px 0;padding:15px;background:#FFF9C4;border:2px solid #FF9800;border-radius:8px}
.matching-pairs{display:flex;justify-content:space-around;flex-wrap:wrap;margin:10px 0}
.matching-item{margin:10px;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:120px;text-align:center}
.word-problem-visual{margin:10px 0;padding:15px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px;text-align:center}
.box-visual{display:inline-block;width:50px;height:50px;background:#FF9800;border:2px solid #F57C00;border-radius:5px;margin:5px;position:relative}
.box-label{font-size:18pt;font-weight:bold;color:#FFF}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use numbers 0-100 (focus on 10-99 for main teaching)
2. Base-10 blocks: Orange rectangles = tens, green squares = ones
3. Number lines: Use `.tick` elements with even spacing (5 ticks minimum)
4. For number line missing number: use `.tick.empty` with "?" inside
5. Place value charts: clearly labeled "Tens" and "Ones" columns
6. Number words: Use UK English spelling
7. Answer key with clear explanations
8. Colored backgrounds Q1-Q5

## EXAMPLES

### Q1 Template (Base-10 Blocks):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> What number is shown?</p>
  <div class="base10-container">
    <div class="base10-blocks">
      <div class="block-ten"></div>
      <div class="block-ten"></div>
      <div class="block-ten"></div>
      <div class="block-ten"></div>
      <div class="block-one"></div>
      <div class="block-one"></div>
      <div class="block-one"></div>
      <div class="block-one"></div>
      <div class="block-one"></div>
      <div class="block-one"></div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Place Value Chart):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> 87 = <span class="answer-box"></span> and <span class="answer-box"></span></p>
</div>
```

### Q3 Template (Number Line - CORRECT FORMAT):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Look at the number line. What number should go where the '?' is?</p>
  <div class="number-line-container">
    <div class="number-line">
      <div class="tick">60</div>
      <div class="tick">70</div>
      <div class="tick empty">?</div>
      <div class="tick">90</div>
      <div class="tick">100</div>
    </div>
  </div>
  <p class="question-text">The missing number is <span class="answer-line"></span></p>
</div>
```

### Q4 Template (Number Words):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Match the number word to the correct numeral.</p>
  <div class="word-matching">
    <p class="question-text">a) Ninety-one = <span class="answer-box"></span></p>
    <p class="question-text">b) Sixty-three = <span class="answer-box"></span></p>
    <p class="question-text">c) Forty-five = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> How many cakes?</p>
  <div class="word-problem-visual">
    <p style="font-size:30pt;margin:10px 0">📦📦📦📦📦📦📦</p>
    <p style="font-size:30pt;margin:10px 0">🧁🧁🧁🧁🧁🧁🧁🧁</p>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> cakes</p>
</div>
```

**CRITICAL EMOJI RULES for Q5:**
- ONLY use common emojis that render reliably: 📦 🧁 🍎 🍫 🎈 ⚽ 📚 ✏️
- DO NOT use uncommon emojis that may not render properly
- If emoji fails, use simple text description instead: "7 boxes" and "8 single items"
- NEVER use non-English text or transliterations
- Each box emoji = 10 items, each single emoji = 1 item


## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Numbers in range 0-100?
- [ ] Number line uses `.tick` elements with even spacing?
- [ ] Base-10 blocks correctly colored (orange tens, green ones)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?

Generate complete HTML. UK Year 2 aligned.
