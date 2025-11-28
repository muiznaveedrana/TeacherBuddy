# Grade 2: US Money

**CRITICAL: EXACTLY {{questionCount}} questions. US cents (¢) and dollars ($).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## GRADE 2 FOCUS
- **Currency**: US cents (¢) and dollars ($)
- **Coins**: Penny (1¢), Nickel (5¢), Dime (10¢), Quarter (25¢), Half-dollar (50¢), Dollar ($1)
- **Skills**: Count money, find totals, give change, compare amounts
- **Ages 7-8**: Practical shopping contexts

## QUESTION TYPES

**Q1**: Count coins. Show coin visuals. "How much money is this?" Total up to 99¢.

**Q2**: Find total. "Emma has 25¢. She finds 30¢ more. How much does she have now?"

**Q3**: Compare amounts. Two money amounts shown. "Who has more money?"

**Q4**: Simple change. "You buy candy for 35¢. You pay with 50¢. How much change?"

**Q5**: Word problem. Shopping context. "A pencil costs 45¢. An eraser costs 28¢. How much for both?"

## NUMBER RANGES
- **Cents**: 1¢-99¢ (Grade 2 comfortable range)
- **Simple dollars**: $1, $2 (whole dollars only)
- **Totals**: Up to 99¢ for adding
- **Change**: Within 50¢-$1 range

## US COIN STYLING (CSS-BASED)

**Penny (1¢):** Copper/bronze, Lincoln portrait
**Nickel (5¢):** Silver, Jefferson portrait
**Dime (10¢):** Silver, smallest coin, Roosevelt portrait
**Quarter (25¢):** Silver, largest common coin, Washington portrait

## COIN SIZES (PROPORTIONALLY ACCURATE - CRITICAL):
- Dime: 60px (smallest - 17.91mm real)
- Penny: 70px (19.05mm real)
- Nickel: 75px (21.21mm real)
- Quarter: 85px (largest - 24.26mm real)

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.money-container{margin:10px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.coin-group{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:15px 0}
.coin{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;border:3px solid #333;text-shadow:1px 1px 2px rgba(0,0,0,0.3)}
.coin-penny{background:linear-gradient(135deg,#CD7F32,#B87333,#A0522D);color:white;width:70px;height:70px;font-size:14pt}
.coin-nickel{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333;width:75px;height:75px;font-size:14pt}
.coin-dime{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333;width:60px;height:60px;font-size:12pt}
.coin-quarter{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333;width:85px;height:85px;font-size:16pt}
.money-total{font-size:20pt;font-weight:bold;color:#2E7D32;margin-top:15px}
.money-label{font-size:15pt;font-weight:bold;margin:10px 0;color:#1976D2}
.money-comparison{display:flex;justify-content:space-around;margin:15px 0;flex-wrap:wrap}
.money-item{text-align:center;padding:15px;margin:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:180px}
.money-amount{font-size:22pt;font-weight:bold;color:#2E7D32;margin:10px 0}
.change-calculation{margin:10px 0;padding:15px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.change-step{margin:10px 0;padding:10px;background:#FFF;border-radius:5px;font-size:15pt}
.shopping-context{margin:10px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.shopping-item{display:flex;align-items:center;gap:15px;margin:10px 0;padding:10px;background:#FFF;border-radius:5px}
.shopping-item img{height:50px}
.price-tag{font-size:20pt;font-weight:bold;color:#FF5722;background:#FFF;padding:5px 15px;border:2px solid #FF5722;border-radius:5px}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use US currency symbols: ¢ for cents, $ for dollars
2. Use CSS-styled coin divs (see examples below)
3. **CRITICAL**: Use proportional sizes (dime=60px smallest, quarter=85px largest)
4. Realistic prices (pencil: 45¢ NOT $45!)
5. Include coin visuals for counting questions
6. Answer key with calculation steps
7. Colored backgrounds Q1-Q5
8. Grade 2 appropriate amounts (up to 99¢)

## EXAMPLES

### Q1 Template (Counting Coins):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> How much money is shown here?</p>
  <div class="money-container">
    <div class="coin-group">
      <div class="coin coin-quarter">25¢</div>
      <div class="coin coin-quarter">25¢</div>
      <div class="coin coin-dime">10¢</div>
      <div class="coin coin-nickel">5¢</div>
    </div>
    <p class="money-label">Total: <span class="answer-box"></span>¢</p>
  </div>
</div>
```

### Q3 Template (Comparison):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Who has more money?</p>
  <div class="money-comparison">
    <div class="money-item">
      <p><strong>Tom</strong></p>
      <div class="coin-group">
        <div class="coin coin-quarter">25¢</div>
        <div class="coin coin-dime">10¢</div>
      </div>
      <p class="money-amount">35¢</p>
    </div>
    <div class="money-item">
      <p><strong>Emma</strong></p>
      <div class="coin-group">
        <div class="coin coin-quarter">25¢</div>
        <div class="coin coin-quarter">25¢</div>
      </div>
      <p class="money-amount">50¢</p>
    </div>
  </div>
  <p class="question-text"><span class="answer-line"></span> has more money.</p>
</div>
```

### Q4 Template (Change):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> You buy candy for 35¢. You pay with 50¢. How much change do you get?</p>
  <div class="change-calculation">
    <div class="change-step">
      <strong>Cost:</strong> 35¢
    </div>
    <div class="change-step">
      <strong>You pay:</strong> 50¢
      <div class="coin-group" style="justify-content:flex-start;margin-top:10px">
        <div class="coin coin-quarter">25¢</div>
        <div class="coin coin-quarter">25¢</div>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Change: <span class="answer-box"></span>¢</p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A pencil costs 45¢. An eraser costs 28¢. How much do they cost together?</p>
  <div class="word-problem-visual">
    <div class="shopping-context">
      <div class="shopping-item">
        <img src="/images/pencil.png" alt="pencil" style="height:50px">
        <span class="price-tag">45¢</span>
      </div>
      <div class="shopping-item">
        <img src="/images/crayon.png" alt="eraser" style="height:45px">
        <span class="price-tag">28¢</span>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Total cost: <span class="answer-box"></span>¢</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All US coin CSS styling correct?
- [ ] Coin sizes appropriate (dime smallest)?
- [ ] Realistic prices?
- [ ] Colored backgrounds Q1-Q5?
- [ ] ¢/$ symbols used correctly?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. US Grade 2 aligned.
