# Ages 6-7: Rounding to Nearest 10

**CRITICAL: EXACTLY {{questionCount}} questions. Concrete-Pictorial-Abstract progression.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 10-99 (avoid 0-9 and 100+ for simplicity)
- **Rounding Rule**: Look at ones digit (1-4 down, 5-9 up, 0 stays)
- **CPA Progression**: Start with base-10 blocks (concrete), use number lines (pictorial), then abstract
- **Ages 6-7**: Visual support crucial, real-world contexts engaging


## QUESTION TYPES (CPA Progression)

**Q1 (Concrete):** Base-10 blocks + rounding. "Show 47 with blocks. Closer to 40 or 50?"

**Q2 (Pictorial):** Number line with midpoint marked. Visual "closer to" decision.

**Q3 (Pattern Recognition):** Sort numbers by rounding target. "Circle ALL that round to 60."

**Q4 (Real-World):** Money, age, height, sports scores. Practical estimation.

**Q5 (Challenge):** Round multiple numbers or simple operations with rounded numbers.

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
.rounding-choices{margin:15px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px;text-align:center}
.choice-box{display:inline-block;margin:10px;padding:15px 25px;border:3px solid #333;border-radius:8px;background:#FFF;font-size:20pt;font-weight:bold;cursor:pointer}
.choice-box:hover{background:#FFF9C4;border-color:#FF9800}
.number-line-container{margin:15px 0;padding:15px;background:#E8F5E9;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:20px 8px 30px}
.number-line::before{content:'';position:absolute;bottom:30px;left:5%;right:5%;height:3px;background:#333}
.tick{width:32px;height:32px;background:#E0E0E0;border:2px solid #999;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;position:relative;z-index:1}
.tick.decade{background:#1976D2;color:#FFF;font-size:15pt;border:3px solid #0D47A1}
.tick.midpoint{background:#FF9800;color:#FFF;border:3px solid #F57C00}
.tick.target{background:#4CAF50;color:#FFF;border:3px solid #2E7D32;width:40px;height:40px;font-size:15pt}
.tick-label{position:absolute;bottom:-25px;left:50%;transform:translateX(-50%);font-size:10pt;color:#666;white-space:nowrap}
.rounding-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:15px;margin:15px 0}
.round-item{display:flex;align-items:center;justify-content:space-between;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.round-number{font-size:20pt;font-weight:bold;color:#1976D2}
.round-arrow{font-size:20pt;color:#FF9800;margin:0 10px}
.number-cards{display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin:15px 0}
.number-card{padding:15px 20px;border:3px solid #333;border-radius:8px;background:#FFF;font-size:20pt;font-weight:bold;min-width:60px;text-align:center;cursor:pointer}
.number-card:hover{background:#E3F2FD;border-color:#2196F3}
.money-visual{display:inline-block;margin:10px;padding:15px;background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;text-align:center}
.coin-display{font-size:30pt;margin:10px 0}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Always use CPA progression (concrete→pictorial→abstract)
2. Ones digit 5-9 rounds UP (critical - test with 45, 65, 85)
3. Show midpoint (25, 35, 45, etc.) visually on number lines BUT NO LABELS
4. Use base-10 blocks for Q1 (orange tens, green ones)
5. Real-world contexts: money (pence), ages, heights, sports scores
6. Avoid emojis that may not render - use text or reliable emojis (🪙💰⚽📏)
7. **NO CLUES**: Remove all hint boxes, instruction boxes, ones digit highlighting, "(X tens and Y ones)" text, "halfway" labels, and "closer to" prompts
8. Answer key with clear explanations of rounding rule
9. Colored backgrounds Q1-Q5
10. **CRITICAL**: NO orange/colored text in questions that gives away answers

## EXAMPLES

### Q1 Template (Concrete - Base-10 Blocks):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Round 47 to the nearest 10.</p>
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
      <div class="block-one"></div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Pictorial - Number Line with Midpoint):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Round 63 to the nearest 10.</p>
  <div class="number-line-container">
    <div class="number-line">
      <div class="tick decade">60</div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick target">63</div>
      <div class="tick"></div>
      <div class="tick midpoint">65</div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick decade">70</div>
    </div>
  </div>
  <p class="question-text">63 rounds to: <span class="answer-box"></span></p>
</div>
```

### Q3 Template (Pattern Recognition - Sort Numbers):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Circle ALL the numbers that would round to 40.</p>
  <div class="number-cards">
    <div class="number-card">32</div>
    <div class="number-card">38</div>
    <div class="number-card">41</div>
    <div class="number-card">45</div>
    <div class="number-card">44</div>
    <div class="number-card">49</div>
  </div>
</div>
```

### Q4 Template (Real-World - Money):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> You have 58 pence. Round to the nearest 10 pence.</p>
  <div class="money-visual">
    <p class="coin-display">🪙 58p</p>
  </div>
  <p class="question-text">Answer: About <span class="answer-box"></span> pence</p>
</div>
```

### Q5 Template (Challenge - Round and Calculate):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A library has 27 books on one shelf and 42 books on another shelf. Round each number to the nearest 10. Then add them together.</p>
  <div class="rounding-grid">
    <div class="round-item">
      <span class="round-number">27</span>
      <span class="round-arrow">→</span>
      <span class="answer-box"></span>
    </div>
    <div class="round-item">
      <span class="round-number">42</span>
      <span class="round-arrow">→</span>
      <span class="answer-box"></span>
    </div>
  </div>
  <p class="question-text">Now add the rounded numbers:</p>
  <div class="working-space"></div>
  <p class="question-text">About <span class="answer-box"></span> books altogether</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1 uses base-10 blocks (concrete)?
- [ ] Q2 uses number line with midpoint marked (pictorial)?
- [ ] Q3 focuses on pattern recognition?
- [ ] Q4 uses real-world context (money/age/height)?
- [ ] NO hint text or labels on visuals?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with explanations?

Generate complete HTML. UK Year 2 aligned.
