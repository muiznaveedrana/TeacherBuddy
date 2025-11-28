# Ages 5-6: Coins Recognition

Generate EXACTLY {{questionCount}} Year 1 money questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Coins:** 1p, 2p, 5p, 10p, 20p ONLY (Year 1 appropriate)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Recognize coins, count small amounts, simple addition
**Currency:** UK £ and p notation

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Name the coin (show 1 coin) - RANDOMIZE: coin type
**Q2:** Count coins (same denomination) - RANDOMIZE: coin + quantity (2-5 coins)
**Q3:** Match coins to values - RANDOMIZE: 4 coins with values
**Q4:** Find the total (2-3 different coins) - RANDOMIZE: coin combination
**Q5:** Which costs more? (compare 2 amounts) - RANDOMIZE: coin combinations

## UK COINS - Visual Representation

**1p:** Copper color (#B87333), smallest
**2p:** Copper color (#B87333), larger than 1p
**5p:** Silver color (#C0C0C0), small silver
**10p:** Silver color (#C0C0C0), medium silver
**20p:** Silver color (#C0C0C0), 7-sided (heptagon)

## Q1 - Name the Coin (RANDOMIZE!)
**RANDOMIZE**: Pick ONE coin + show visual

**Coins**: 1p, 2p, 5p, 10p, 20p

**Question Variations** (pick ONE):
- "What coin is this?"
- "Name this coin."
- "How much is this coin worth?"
- "Circle the correct value."

**Answer Format**: Multiple choice with 3 options

## Q2 - Count Coins (Same Denomination) (RANDOMIZE!)
**RANDOMIZE**: Pick ONE coin type + quantity (2-5 coins)

**Coin Options**: 1p, 2p, 5p, 10p
**Quantities**: 2, 3, 4, 5 coins

**Question Variations** (pick ONE):
- "Count the [coin]s. How much altogether?"
- "Add up these coins."
- "How much money is there?"
- "Find the total."

**Examples**:
- 5 × 1p = 5p
- 3 × 2p = 6p
- 4 × 5p = 20p
- 2 × 10p = 20p

## Q3 - Match Coins to Values (RANDOMIZE!)
**RANDOMIZE**: Show 4 coins + shuffle value order

**Coins**: Always use 4 different coins (e.g., 1p, 2p, 5p, 10p)

**Question Variations** (pick ONE):
- "Draw lines to match the coins to their values."
- "Match each coin with the correct amount."
- "Connect the coins to the right values."
- "Join the coins to their worth."

**CRITICAL**: Always shuffle the value column order (don't align them!)

## Q4 - Find the Total (RANDOMIZE!)
**RANDOMIZE**: Pick 2-3 different coins + calculate total

**Combinations** (pick ONE):
- 1p + 2p = 3p
- 1p + 5p = 6p
- 2p + 5p = 7p
- 5p + 5p = 10p
- 5p + 10p = 15p
- 10p + 10p = 20p
- 1p + 2p + 5p = 8p
- 2p + 5p + 10p = 17p

**Question Variations** (pick ONE):
- "Add these coins together."
- "How much money altogether?"
- "Find the total amount."
- "Count all the money."

## Q5 - Which Costs More? (RANDOMIZE!)
**RANDOMIZE**: Show 2 items with prices (different coin combinations)

**Price Pairs** (one must be higher):
- Item A: 5p (one 5p) vs Item B: 3p (three 1p)
- Item A: 10p (one 10p) vs Item B: 7p (one 5p + one 2p)
- Item A: 8p (four 2p) vs Item B: 15p (one 10p + one 5p)
- Item A: 12p (one 10p + one 2p) vs Item B: 6p (three 2p)

**Question Variations** (pick ONE):
- "Which item costs more?"
- "Circle the more expensive item."
- "Which is more expensive?"
- "Which costs the most?"

## EXAMPLE OUTPUT

**Q1 (Name the Coin):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What coin is this?</p>
    <div class="coin-container">
        <div class="coin coin-5p">
            <span class="coin-value">5p</span>
        </div>
    </div>
    <div class="multiple-choice">
        <div class="choice-option">
            <input type="radio" name="q1" id="q1a">
            <label for="q1a">2p</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1b">
            <label for="q1b">5p</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1c">
            <label for="q1c">10p</label>
        </div>
    </div>
</div>
```

**Q2 (Count Same Coins):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Count these 2p coins. How much altogether?</p>
    <div class="coin-array">
        <div class="coin coin-2p"><span class="coin-value">2p</span></div>
        <div class="coin coin-2p"><span class="coin-value">2p</span></div>
        <div class="coin coin-2p"><span class="coin-value">2p</span></div>
        <div class="coin coin-2p"><span class="coin-value">2p</span></div>
    </div>
    <p class="answer-prompt">Total: <span class="answer-box"></span>p</p>
</div>
```

**Q3 (Match Coins):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Draw lines to match the coins to their values.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item coin-item">
                <div class="coin coin-1p small"><span class="coin-value">1p</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-2p small"><span class="coin-value">2p</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-5p small"><span class="coin-value">5p</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-10p small"><span class="coin-value">10p</span></div>
            </div>
        </div>
        <div class="matching-column">
            <div class="match-item value">10p</div>
            <div class="match-item value">1p</div>
            <div class="match-item value">5p</div>
            <div class="match-item value">2p</div>
        </div>
    </div>
</div>
```

**Q4 (Find Total):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Add these coins together.</p>
    <div class="coin-array">
        <div class="coin coin-5p"><span class="coin-value">5p</span></div>
        <div class="coin coin-10p"><span class="coin-value">10p</span></div>
    </div>
    <div class="addition-equation">
        <span class="value">5p</span>
        <span class="operator">+</span>
        <span class="value">10p</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
        <span class="unit">p</span>
    </div>
</div>
```

**Q5 (Which Costs More):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which item costs more?</p>
    <div class="price-comparison">
        <div class="item-price">
            <div class="item-icon">🍎 Apple</div>
            <div class="coin-array small-coins">
                <div class="coin coin-5p mini"><span class="coin-value">5p</span></div>
            </div>
            <p class="price-label">5p</p>
        </div>
        <div class="vs">vs</div>
        <div class="item-price">
            <div class="item-icon">🍌 Banana</div>
            <div class="coin-array small-coins">
                <div class="coin coin-5p mini"><span class="coin-value">5p</span></div>
                <div class="coin coin-2p mini"><span class="coin-value">2p</span></div>
            </div>
            <p class="price-label">7p</p>
        </div>
    </div>
    <p class="answer-prompt">The <span class="answer-line"></span> costs more.</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 5p</p>
        <p><strong>2.</strong> 8p (4 × 2p)</p>
        <p><strong>3.</strong> 1p-1p, 2p-2p, 5p-5p, 10p-10p</p>
        <p><strong>4.</strong> 15p (5p + 10p)</p>
        <p><strong>5.</strong> Banana (7p > 5p)</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.coin-container{display:flex;justify-content:center;margin:20px 0;}
.coin-array{display:flex;gap:15px;justify-content:center;flex-wrap:wrap;margin:15px 0;}
.coin{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt;border:3px solid #333;position:relative;}
.coin-1p,.coin-2p{background:linear-gradient(135deg,#CD7F32,#B87333,#A0522D);color:white;}
.coin-5p,.coin-10p,.coin-20p{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333;}
.coin-20p{clip-path:polygon(50% 0%,90% 20%,100% 60%,75% 100%,25% 100%,0% 60%,10% 20%);}
.coin.small{width:60px;height:60px;font-size:13pt;}
.coin.mini{width:40px;height:40px;font-size:10pt;}
.coin-value{text-shadow:1px 1px 2px rgba(0,0,0,0.3);}
.multiple-choice{margin:15px 0;}
.choice-option{margin:8px 0;padding:8px;border:2px solid #ddd;border-radius:5px;}
.choice-option label{margin-left:10px;font-size:14pt;}
.matching-activity{display:grid;grid-template-columns:1fr 1fr;gap:30px;max-width:400px;margin:15px auto;}
.matching-column{display:flex;flex-direction:column;gap:15px;}
.match-item{padding:12px;border:2px solid #333;border-radius:8px;text-align:center;font-weight:bold;font-size:14pt;min-height:70px;display:flex;align-items:center;justify-content:center;}
.match-item.coin-item{background:#F0F0F0;}
.match-item.value{background:#FFF9C4;}
.addition-equation{display:flex;align-items:center;justify-content:center;gap:15px;margin:20px auto;padding:15px;background:white;border:3px solid #333;border-radius:12px;max-width:400px;font-size:20pt;font-weight:bold;}
.value{min-width:50px;text-align:center;}
.operator{font-size:24pt;color:#FF9800;}
.unit{font-size:16pt;}
.price-comparison{display:flex;justify-content:space-around;align-items:center;margin:20px auto;max-width:500px;}
.item-price{text-align:center;padding:15px;border:2px solid #ddd;border-radius:8px;flex:1;}
.item-icon{font-size:32pt;margin-bottom:10px;}
.price-label{font-weight:bold;font-size:18pt;color:#2E7D32;margin-top:10px;}
.vs{font-size:24pt;font-weight:bold;color:#FF9800;margin:0 15px;}
.small-coins{gap:8px;}
.answer-prompt{font-weight:bold;margin-top:15px;text-align:center;font-size:15pt;}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:80px;height:30px;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:2px solid #333;min-width:200px;height:30px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
