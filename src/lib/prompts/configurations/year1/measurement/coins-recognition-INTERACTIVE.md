# Ages 5-6: Coins Recognition (INTERACTIVE-OPTIMISED V2)

Generate EXACTLY {{questionCount}} Year 1 money questions.

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Coins:** 1p, 2p, 5p, 10p, 20p ONLY (Year 1 appropriate)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Recognize coins, count small amounts, simple addition
**Currency:** UK £ and p notation

**INTERACTIVE MODE REQUIREMENTS (MUST FOLLOW!):**
- ALL answers use `<span class="answer-box"></span>` or `<span class="answer-line"></span>`
- NO radio buttons `<input type="radio">` - FORBIDDEN
- NO checkboxes - FORBIDDEN
- NO matching activities with drag-drop - FORBIDDEN
- NO multiple choice with buttons - FORBIDDEN
- Every answer-box MUST have an answer in Answer Key

## UK COIN IMAGES (CRITICAL - USE EXACT PATHS)

**Use REAL coin images from /images/ folder - NOT CSS circles!**

**Coin images and proportional sizes:**
- 1p: `/images/coin-1p-tails.png` width="35" height="35"
- 2p: `/images/coin-2p-tails.png` width="45" height="45"
- 5p: `/images/coin-5p-tails.png` width="31" height="31"
- 10p: `/images/coin-10p-tails.png` width="42" height="42"
- 20p: `/images/coin-20p-tails.png` width="37" height="37"

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** How much is this coin worth? (show 1 coin image) - answer: value like "10"
**Q2:** Count coins (same denomination) - answer: total like "8"
**Q3:** Add these coins (3-4 coins shown) - answer: total like "17"
**Q4:** Find the total (2-3 different coins with equation) - answer: total like "15"
**Q5:** Which costs more? Compare two amounts - answer: item name like "Banana"

## EXAMPLE OUTPUT

**Q1 (How much is this coin worth) - CORRECT FORMAT:**
```html
<div class="question" style="background: #FFF9C4; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p class="question-text" style="font-size: 18pt; font-weight: bold;"><span class="question-number">1.</span> How much is this coin worth?</p>
    <div class="coin-container" style="display: flex; justify-content: center; margin: 20px 0;">
        <img src="/images/coin-10p-tails.png" width="70" height="70" alt="10p coin">
    </div>
    <p class="answer-prompt" style="text-align: center; font-size: 16pt;">This coin is worth <span class="answer-box" style="display: inline-block; min-width: 60px; height: 35px; border: 3px solid #333; background: #FFF9C4; vertical-align: middle;"></span>p</p>
</div>
```

**Q2 (Count Same Coins):**
```html
<div class="question" style="background: #F1F8E9; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p class="question-text" style="font-size: 18pt; font-weight: bold;"><span class="question-number">2.</span> Count these 2p coins. How much altogether?</p>
    <div class="coin-array" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
        <img src="/images/coin-2p-tails.png" width="55" height="55" alt="2p">
        <img src="/images/coin-2p-tails.png" width="55" height="55" alt="2p">
        <img src="/images/coin-2p-tails.png" width="55" height="55" alt="2p">
        <img src="/images/coin-2p-tails.png" width="55" height="55" alt="2p">
    </div>
    <p class="answer-prompt" style="text-align: center; font-size: 16pt;">Total: <span class="answer-box" style="display: inline-block; min-width: 60px; height: 35px; border: 3px solid #333; background: #FFF9C4; vertical-align: middle;"></span>p</p>
</div>
```

**Q3 (Add Coin Values):**
```html
<div class="question" style="background: #E3F2FD; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p class="question-text" style="font-size: 18pt; font-weight: bold;"><span class="question-number">3.</span> Add up these coins. What is the total?</p>
    <div class="coin-array" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
        <img src="/images/coin-1p-tails.png" width="45" height="45" alt="1p">
        <img src="/images/coin-2p-tails.png" width="55" height="55" alt="2p">
        <img src="/images/coin-5p-tails.png" width="42" height="42" alt="5p">
    </div>
    <div class="addition-equation" style="display: flex; align-items: center; justify-content: center; gap: 15px; margin: 20px auto; padding: 15px; background: white; border: 3px solid #333; border-radius: 12px; max-width: 400px; font-size: 20pt; font-weight: bold;">
        <span>1p + 2p + 5p</span>
        <span style="color: #FF9800;">=</span>
        <span class="answer-box" style="display: inline-block; min-width: 60px; height: 40px; border: 3px solid #333; background: #FFF9C4;"></span>
        <span>p</span>
    </div>
</div>
```

**Q4 (Find Total with Equation):**
```html
<div class="question" style="background: #FCE4EC; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p class="question-text" style="font-size: 18pt; font-weight: bold;"><span class="question-number">4.</span> Add these coins together.</p>
    <div class="coin-array" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
        <img src="/images/coin-5p-tails.png" width="42" height="42" alt="5p">
        <img src="/images/coin-10p-tails.png" width="55" height="55" alt="10p">
    </div>
    <div class="addition-equation" style="display: flex; align-items: center; justify-content: center; gap: 15px; margin: 20px auto; padding: 15px; background: white; border: 3px solid #333; border-radius: 12px; max-width: 350px; font-size: 20pt; font-weight: bold;">
        <span>5p</span>
        <span style="color: #FF9800;">+</span>
        <span>10p</span>
        <span style="color: #FF9800;">=</span>
        <span class="answer-box" style="display: inline-block; min-width: 60px; height: 40px; border: 3px solid #333; background: #FFF9C4;"></span>
        <span>p</span>
    </div>
</div>
```

**Q5 (Which Costs More):**
```html
<div class="question" style="background: #FFF3E0; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p class="question-text" style="font-size: 18pt; font-weight: bold;"><span class="question-number">5.</span> Which item costs more?</p>
    <div class="price-comparison" style="display: flex; justify-content: space-around; align-items: center; margin: 20px auto; max-width: 500px;">
        <div class="item-price" style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; flex: 1; margin: 0 10px;">
            <div style="font-size: 40pt; margin-bottom: 10px;">🍎</div>
            <div style="font-size: 16pt; font-weight: bold;">Apple</div>
            <div class="coin-array" style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-5p-tails.png" width="35" height="35" alt="5p">
            </div>
            <p style="font-weight: bold; font-size: 20pt; color: #2E7D32; margin-top: 10px;">5p</p>
        </div>
        <div style="font-size: 24pt; font-weight: bold; color: #FF9800;">VS</div>
        <div class="item-price" style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; flex: 1; margin: 0 10px;">
            <div style="font-size: 40pt; margin-bottom: 10px;">🍌</div>
            <div style="font-size: 16pt; font-weight: bold;">Banana</div>
            <div class="coin-array" style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-5p-tails.png" width="35" height="35" alt="5p">
                <img src="/images/coin-2p-tails.png" width="40" height="40" alt="2p">
            </div>
            <p style="font-weight: bold; font-size: 20pt; color: #2E7D32; margin-top: 10px;">7p</p>
        </div>
    </div>
    <p class="answer-prompt" style="text-align: center; font-size: 16pt; margin-top: 20px;">The <span class="answer-line" style="display: inline-block; border-bottom: 3px solid #333; min-width: 150px; height: 30px;"></span> costs more.</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key" style="margin-top: 40px; padding: 20px; background: #f5f5f5; border: 2px solid #333; border-radius: 8px;">
    <h2 class="answer-key-title" style="font-size: 18pt; margin-bottom: 15px;">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 10</p>
        <p><strong>2.</strong> 8</p>
        <p><strong>3.</strong> 8</p>
        <p><strong>4.</strong> 15</p>
        <p><strong>5.</strong> Banana</p>
    </div>
</div>
```

## CSS (Minimal - inline styles preferred)
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:15px 0;padding:20px;border-radius:10px;}
.answer-box{display:inline-block;min-width:60px;height:35px;border:3px solid #333;background:#FFF9C4;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:3px solid #333;min-width:150px;height:30px;}
```

## VALIDATION CHECKLIST
Before returning the worksheet:
- [ ] Exactly 5 questions present
- [ ] All questions use answer-box or answer-line (no radio buttons, no matching)
- [ ] REAL coin images used (NOT CSS circles)
- [ ] Each answer-box has corresponding answer in Answer Key
- [ ] Answer Key uses format: `<p><strong>N.</strong> answer</p>`
- [ ] Background colors match spec

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
