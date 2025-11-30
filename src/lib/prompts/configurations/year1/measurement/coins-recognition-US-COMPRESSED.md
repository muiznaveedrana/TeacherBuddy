# Grade 1: US Coins Recognition

Generate EXACTLY {{questionCount}} Grade 1 money questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Coins:** Penny (1¢), Nickel (5¢), Dime (10¢), Quarter (25¢) ONLY (Grade 1 appropriate)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Recognize coins, count small amounts, simple addition
**Currency:** US $ and ¢ notation

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Name the coin (show 1 coin) - RANDOMIZE: coin type
**Q2:** Count coins (same denomination) - RANDOMIZE: coin + quantity (2-5 coins)
**Q3:** Match coins to values - RANDOMIZE: 4 coins with values
**Q4:** Find the total (2-3 different coins) - RANDOMIZE: coin combination
**Q5:** Which costs more? (compare 2 amounts) - RANDOMIZE: coin combinations

## US COINS - Visual Representation

**Penny (1¢):** Copper color (#B87333), smallest value, shows Lincoln
**Nickel (5¢):** Silver color (#C0C0C0), larger than penny, shows Jefferson
**Dime (10¢):** Silver color (#C0C0C0), smallest size, shows Roosevelt
**Quarter (25¢):** Silver color (#C0C0C0), largest, shows Washington

## Q1 - Name the Coin (RANDOMIZE!)
**RANDOMIZE**: Pick ONE coin + show visual

**Coins**: Penny, Nickel, Dime, Quarter

**Question Variations** (pick ONE):
- "What coin is this?"
- "Name this coin."
- "How much is this coin worth?"
- "Circle the correct value."

**Answer Format**: Multiple choice with 3 options

## Q2 - Count Coins (Same Denomination) (RANDOMIZE!)
**RANDOMIZE**: Pick ONE coin type + quantity (2-5 coins)

**Coin Options**: Penny, Nickel, Dime, Quarter
**Quantities**: 2, 3, 4, 5 coins

**Question Variations** (pick ONE):
- "Count the [coin]s. How much altogether?"
- "Add up these coins."
- "How much money is there?"
- "Find the total."

**Examples**:
- 5 × penny = 5¢
- 3 × nickel = 15¢
- 4 × dime = 40¢
- 2 × quarter = 50¢

## Q3 - Match Coins to Values (RANDOMIZE!)
**RANDOMIZE**: Show 4 coins + shuffle value order

**Coins**: Always use 4 different coins (penny, nickel, dime, quarter)

**Question Variations** (pick ONE):
- "Draw lines to match the coins to their values."
- "Match each coin with the correct amount."
- "Connect the coins to the right values."
- "Join the coins to their worth."

**CRITICAL**: Always shuffle the value column order (don't align them!)

## Q4 - Find the Total (RANDOMIZE!)
**RANDOMIZE**: Pick 2-3 different coins + calculate total

**Combinations** (pick ONE):
- penny + nickel = 6¢
- penny + dime = 11¢
- nickel + dime = 15¢
- nickel + nickel = 10¢
- dime + dime = 20¢
- dime + quarter = 35¢
- penny + nickel + dime = 16¢
- nickel + dime + quarter = 40¢

**Question Variations** (pick ONE):
- "Add these coins together."
- "How much money altogether?"
- "Find the total amount."
- "Count all the money."

## Q5 - Which Costs More? (RANDOMIZE!)
**RANDOMIZE**: Show 2 items with prices (different coin combinations)

**Price Pairs** (one must be higher):
- Item A: 5¢ (one nickel) vs Item B: 3¢ (three pennies)
- Item A: 10¢ (one dime) vs Item B: 7¢ (one nickel + two pennies)
- Item A: 8¢ (three pennies + one nickel) vs Item B: 15¢ (one dime + one nickel)
- Item A: 12¢ (one dime + two pennies) vs Item B: 6¢ (one nickel + one penny)

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
        <div class="coin coin-nickel">
            <span class="coin-value">5¢</span>
        </div>
    </div>
    <div class="multiple-choice">
        <div class="choice-option">
            <input type="radio" name="q1" id="q1a">
            <label for="q1a">Penny</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1b">
            <label for="q1b">Nickel</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1c">
            <label for="q1c">Dime</label>
        </div>
    </div>
</div>
```

**Q2 (Count Same Coins):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Count these nickels. How much altogether?</p>
    <div class="coin-array">
        <div class="coin coin-nickel"><span class="coin-value">5¢</span></div>
        <div class="coin coin-nickel"><span class="coin-value">5¢</span></div>
        <div class="coin coin-nickel"><span class="coin-value">5¢</span></div>
        <div class="coin coin-nickel"><span class="coin-value">5¢</span></div>
    </div>
    <p class="answer-prompt">Total: <span class="answer-box"></span>¢</p>
</div>
```

**Q3 (Match Coins):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Draw lines to match the coins to their values.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item coin-item">
                <div class="coin coin-penny small"><span class="coin-value">1¢</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-nickel small"><span class="coin-value">5¢</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-dime small"><span class="coin-value">10¢</span></div>
            </div>
            <div class="match-item coin-item">
                <div class="coin coin-quarter small"><span class="coin-value">25¢</span></div>
            </div>
        </div>
        <div class="matching-column">
            <div class="match-item value">25¢</div>
            <div class="match-item value">1¢</div>
            <div class="match-item value">10¢</div>
            <div class="match-item value">5¢</div>
        </div>
    </div>
</div>
```

**Q4 (Find Total):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Add these coins together.</p>
    <div class="coin-array">
        <div class="coin coin-nickel"><span class="coin-value">5¢</span></div>
        <div class="coin coin-dime"><span class="coin-value">10¢</span></div>
    </div>
    <div class="addition-equation">
        <span class="value">5¢</span>
        <span class="operator">+</span>
        <span class="value">10¢</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
        <span class="unit">¢</span>
    </div>
</div>
```

**Q5 (Which Costs More):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which item costs more?</p>
    <div class="price-comparison">
        <div class="item-price">
            <div class="item-icon">Apple</div>
            <div class="coin-array small-coins">
                <div class="coin coin-nickel mini"><span class="coin-value">5¢</span></div>
            </div>
            <p class="price-label">5¢</p>
        </div>
        <div class="vs">vs</div>
        <div class="item-price">
            <div class="item-icon">Banana</div>
            <div class="coin-array small-coins">
                <div class="coin coin-nickel mini"><span class="coin-value">5¢</span></div>
                <div class="coin coin-penny mini"><span class="coin-value">1¢</span></div>
                <div class="coin coin-penny mini"><span class="coin-value">1¢</span></div>
            </div>
            <p class="price-label">7¢</p>
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
        <p><strong>1.</strong> Nickel (5¢)</p>
        <p><strong>2.</strong> 20¢ (4 × 5¢)</p>
        <p><strong>3.</strong> Penny-1¢, Nickel-5¢, Dime-10¢, Quarter-25¢</p>
        <p><strong>4.</strong> 15¢ (5¢ + 10¢)</p>
        <p><strong>5.</strong> Banana (7¢ > 5¢)</p>
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
.coin-penny{background:linear-gradient(135deg,#CD7F32,#B87333,#A0522D);color:white;}
.coin-nickel,.coin-dime,.coin-quarter{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333;}
.coin-dime{width:65px;height:65px;font-size:14pt;} /* Dime is smallest */
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
.item-icon{font-size:20pt;margin-bottom:10px;font-weight:bold;}
.price-label{font-weight:bold;font-size:18pt;color:#2E7D32;margin-top:10px;}
.vs{font-size:24pt;font-weight:bold;color:#FF9800;margin:0 15px;}
.small-coins{gap:8px;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:80px;height:30px;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:2px solid #333;min-width:200px;height:30px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
