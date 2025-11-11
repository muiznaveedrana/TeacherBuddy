# Year 2: Money

**CRITICAL: EXACTLY {{questionCount}} questions. UK pence (p) and pounds (£).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Currency**: UK pence (p) and pounds (£)
- **Coins**: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2
- **Skills**: Count money, find totals, give change, compare amounts
- **Ages 6-7**: Practical shopping contexts

## QUESTION TYPES

**Q1**: Count coins. Show coin images. "How much money is this?" Total up to 99p.

**Q2**: Find total. "Emma has 25p. She finds 30p more. How much does she have now?"

**Q3**: Compare amounts. Two money amounts shown. "Who has more money?"

**Q4**: Simple change. "You buy sweets for 35p. You pay with 50p. How much change?"

**Q5**: Word problem. Shopping context. "A pencil costs 45p. An eraser costs 28p. How much for both?"

## NUMBER RANGES
- **Pence**: 1p-99p (Year 2 comfortable range)
- **Simple pounds**: £1, £2 (whole pounds only)
- **Totals**: Up to 99p for adding
- **Change**: Within 50p-100p range

## UK COIN IMAGES (CRITICAL - USE EXACT PATHS)

⚠️ **CRITICAL**: Copy paths EXACTLY. All images are in `/images/` directory.

**Small coins (tails only)**:
- 1p: `/images/coin-1p-tails.png`
- 2p: `/images/coin-2p-tails.png`
- 5p: `/images/coin-5p-tails.png`
- 10p: `/images/coin-10p-tails.png`

**Larger coins (heads OR tails - choose randomly)**:
- 20p heads: `/images/coin-20p-heads.png`
- 20p tails: `/images/coin-20p-tails.png`
- 50p heads: `/images/coin-50p-heads.png`
- 50p tails: `/images/coin-50p-tails.png`
- £1 heads: `/images/coin-1pound-heads.png`
- £1 tails: `/images/coin-1pound-tails.png`
- £2 heads: `/images/coin-2pound-heads.png`
- £2 tails: `/images/coin-2pound-tails.png`

**Bank notes (front or back)**:
- £5 front: `/images/note-5-front.png`
- £5 back: `/images/note-5-back.png`
- £10 front: `/images/note-10-front.png`
- £10 back: `/images/note-10-back.png`
- £20 front: `/images/note-20-front.png`
- £20 back: `/images/note-20-back.png`
- £50 front: `/images/note-50.png`
- £50 back: `/images/note-50-back.png`

## COIN SIZES (PROPORTIONALLY ACCURATE - CRITICAL):
⚠️ Sizes reflect real UK coin proportions for educational accuracy:
- 5p: 31px (smallest - 18mm real)
- 1p: 35px (20.3mm real)
- 20p: 37px (21.4mm real)
- £1: 39px (22.5mm real)
- 10p: 42px (24.5mm real)
- 2p: 45px (25.9mm real)
- 50p: 47px (27.3mm real)
- £2: 49px (largest - 28.4mm real)

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.money-container{margin:10px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.coin-group{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:15px 0}
.coin-group img{margin:5px;object-fit:contain;display:inline-block}
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

1. Use UK currency symbols: p for pence, £ for pounds
2. Use EXACT coin image paths (copy from above)
3. **CRITICAL**: Set BOTH width AND height to keep coins circular (e.g., `width="31" height="31"`)
4. Use proportional sizes from above (5p=31px, 1p=35px, 20p=37px, £1=39px, 10p=42px, 2p=45px, 50p=47px, £2=49px)
5. Realistic prices (pencil: 45p NOT £45!)
6. Include coin visuals for counting questions
7. Answer key with calculation steps
8. Colored backgrounds Q1-Q5
9. Year 2 appropriate amounts (up to 99p)

## EXAMPLES

### Q1 Template (Counting Coins):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> How much money is shown here?</p>
  <div class="money-container">
    <div class="coin-group">
      <img src="/images/coin-20p-heads.png" width="37" height="37" alt="20p">
      <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
      <img src="/images/coin-10p-tails.png" width="42" height="42" alt="10p">
      <img src="/images/coin-5p-tails.png" width="31" height="31" alt="5p">
    </div>
    <p class="money-label">Total: <span class="answer-box"></span>p</p>
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
        <img src="/images/coin-20p-heads.png" width="37" height="37" alt="20p">
        <img src="/images/coin-10p-tails.png" width="42" height="42" alt="10p">
      </div>
      <p class="money-amount">30p</p>
    </div>
    <div class="money-item">
      <p><strong>Emma</strong></p>
      <div class="coin-group">
        <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
        <img src="/images/coin-20p-heads.png" width="37" height="37" alt="20p">
      </div>
      <p class="money-amount">40p</p>
    </div>
  </div>
  <p class="question-text"><span class="answer-line"></span> has more money.</p>
</div>
```

### Q4 Template (Change):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> You buy sweets for 35p. You pay with 50p. How much change do you get?</p>
  <div class="change-calculation">
    <div class="change-step">
      <strong>Cost:</strong> 35p
    </div>
    <div class="change-step">
      <strong>You pay:</strong> 50p
      <div class="coin-group" style="justify-content:flex-start;margin-top:10px">
        <img src="/images/coin-50p-heads.png" width="47" height="47" alt="50p">
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Change: <span class="answer-box"></span>p</p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A pencil costs 45p. An eraser costs 28p. How much do they cost together?</p>
  <div class="word-problem-visual">
    <div class="shopping-context">
      <div class="shopping-item">
        <img src="/images/pencil.png" alt="pencil" style="height:50px">
        <span class="price-tag">45p</span>
      </div>
      <div class="shopping-item">
        <img src="/images/crayon.png" alt="eraser" style="height:45px">
        <span class="price-tag">28p</span>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Total cost: <span class="answer-box"></span>p</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All UK coin paths correct?
- [ ] Coin sizes appropriate?
- [ ] Realistic prices?
- [ ] Colored backgrounds Q1-Q5?
- [ ] p/£ symbols used correctly?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. UK Year 2 aligned.
