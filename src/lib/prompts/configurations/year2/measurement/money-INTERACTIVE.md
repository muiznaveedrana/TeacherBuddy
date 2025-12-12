# Ages 6-7: Money (INTERACTIVE-OPTIMISED V2)

Generate EXACTLY {{questionCount}} Year 2 money questions.

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Currency:** UK pence (p) and pounds only
**Coins:** 1p, 2p, 5p, 10p, 20p, 50p, £1, £2
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Count coins, find totals, give change, compare amounts
**Ranges:** Totals up to 99p, change within 50p-100p

**INTERACTIVE MODE REQUIREMENTS (MUST FOLLOW!):**
- ALL answers use `<span class="answer-box"></span>` or `<span class="answer-line"></span>`
- NO radio buttons `<input type="radio">` - FORBIDDEN
- NO checkboxes - FORBIDDEN
- NO matching activities with drag-drop - FORBIDDEN
- NO multiple choice with buttons - FORBIDDEN
- NO working-space divs - FORBIDDEN
- Every answer-box MUST have an answer in Answer Key

## UK COIN IMAGES (CRITICAL - USE EXACT PATHS)

**Use REAL coin images from /images/ folder - NOT CSS circles!**

**Coin images and proportional sizes:**
- 5p: `/images/coin-5p-tails.png` width="31" height="31" (smallest)
- 1p: `/images/coin-1p-tails.png` width="35" height="35"
- 20p: `/images/coin-20p-tails.png` width="37" height="37"
- £1: `/images/coin-1pound-tails.png` width="39" height="39"
- 10p: `/images/coin-10p-tails.png` width="42" height="42"
- 2p: `/images/coin-2p-tails.png` width="45" height="45"
- 50p: `/images/coin-50p-tails.png` width="47" height="47"
- £2: `/images/coin-2pound-tails.png` width="49" height="49" (largest)

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Count coins - show 3-5 real coin images, ask total (answer: number like "55")
**Q2:** Find total - "Emma has 25p, finds 30p more. How much now?" (answer: number like "55")
**Q3:** Who has more? Compare two named characters with coin images (answer: name like "Emma")
**Q4:** Give change - "Buy item for 35p, pay with 50p. Change?" (answer: number like "15")
**Q5:** Shopping word problem - two items with prices (answer: total like "73")

## EXAMPLE OUTPUT

**Q1 (Count Coins) - CORRECT FORMAT:**
```html
<div class="question" style="background: #FFF9C4; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p style="font-size: 18pt; font-weight: bold;"><span style="display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;">1</span> How much money is this?</p>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin: 20px 0; padding: 15px; background: #E8F5E9; border: 2px solid #4CAF50; border-radius: 8px;">
        <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
        <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
        <img src="/images/coin-10p-tails.png" width="42" height="42" alt="10p">
        <img src="/images/coin-5p-tails.png" width="31" height="31" alt="5p">
    </div>
    <p style="text-align: center; font-size: 16pt;">Total: <span class="answer-box"></span>p</p>
</div>
```

**Q2 (Find Total):**
```html
<div class="question" style="background: #F1F8E9; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p style="font-size: 18pt; font-weight: bold;"><span style="display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;">2</span> Emma has 25p. She finds 30p more. How much does she have now?</p>
    <div style="display: flex; justify-content: center; gap: 30px; margin: 20px 0;">
        <div style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px;">
            <p style="font-weight: bold;">Emma has:</p>
            <div style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
                <img src="/images/coin-5p-tails.png" width="31" height="31" alt="5p">
            </div>
            <p style="font-size: 18pt; font-weight: bold; color: #2E7D32;">25p</p>
        </div>
        <div style="font-size: 30pt; font-weight: bold; color: #FF9800; display: flex; align-items: center;">+</div>
        <div style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px;">
            <p style="font-weight: bold;">She finds:</p>
            <div style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
                <img src="/images/coin-10p-tails.png" width="42" height="42" alt="10p">
            </div>
            <p style="font-size: 18pt; font-weight: bold; color: #2E7D32;">30p</p>
        </div>
    </div>
    <p style="text-align: center; font-size: 16pt;">Total: <span class="answer-box"></span>p</p>
</div>
```

**Q3 (Who Has More):**
```html
<div class="question" style="background: #E3F2FD; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p style="font-size: 18pt; font-weight: bold;"><span style="display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;">3</span> Who has more money?</p>
    <div style="display: flex; justify-content: space-around; margin: 20px 0;">
        <div style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; min-width: 150px;">
            <p style="font-size: 16pt; font-weight: bold;">Tom</p>
            <div style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
                <img src="/images/coin-10p-tails.png" width="42" height="42" alt="10p">
            </div>
            <p style="font-size: 20pt; font-weight: bold; color: #2E7D32;">30p</p>
        </div>
        <div style="font-size: 24pt; font-weight: bold; color: #FF9800; display: flex; align-items: center;">VS</div>
        <div style="text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; min-width: 150px;">
            <p style="font-size: 16pt; font-weight: bold;">Emma</p>
            <div style="display: flex; gap: 8px; justify-content: center; margin: 10px 0;">
                <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
                <img src="/images/coin-20p-tails.png" width="37" height="37" alt="20p">
            </div>
            <p style="font-size: 20pt; font-weight: bold; color: #2E7D32;">40p</p>
        </div>
    </div>
    <p style="text-align: center; font-size: 16pt;"><span class="answer-line"></span> has more money.</p>
</div>
```

**Q4 (Give Change):**
```html
<div class="question" style="background: #FCE4EC; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p style="font-size: 18pt; font-weight: bold;"><span style="display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;">4</span> You buy sweets for 35p. You pay with 50p. How much change?</p>
    <div style="display: flex; justify-content: center; gap: 40px; margin: 20px 0; padding: 15px; background: #FFF9C4; border: 2px dashed #FF9800; border-radius: 8px;">
        <div style="text-align: center;">
            <p style="font-weight: bold;">Cost:</p>
            <p style="font-size: 24pt; font-weight: bold; color: #FF5722;">35p</p>
        </div>
        <div style="text-align: center;">
            <p style="font-weight: bold;">You pay:</p>
            <div style="margin: 10px 0;">
                <img src="/images/coin-50p-tails.png" width="47" height="47" alt="50p">
            </div>
            <p style="font-size: 18pt; font-weight: bold;">50p</p>
        </div>
    </div>
    <p style="text-align: center; font-size: 16pt;">Change: <span class="answer-box"></span>p</p>
</div>
```

**Q5 (Shopping Word Problem):**
```html
<div class="question" style="background: #FFF3E0; padding: 20px; border-radius: 10px; margin: 15px 0;">
    <p style="font-size: 18pt; font-weight: bold;"><span style="display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;">5</span> A pencil costs 45p. An eraser costs 28p. How much for both?</p>
    <div style="display: flex; justify-content: center; gap: 30px; margin: 20px 0; padding: 15px; background: #E3F2FD; border: 2px solid #1976D2; border-radius: 8px;">
        <div style="text-align: center; padding: 10px; background: white; border-radius: 5px;">
            <div style="font-size: 40pt;">✏️</div>
            <p style="font-weight: bold;">Pencil</p>
            <p style="font-size: 20pt; font-weight: bold; color: #FF5722; background: #FFF; padding: 5px 15px; border: 2px solid #FF5722; border-radius: 5px;">45p</p>
        </div>
        <div style="font-size: 30pt; font-weight: bold; color: #FF9800; display: flex; align-items: center;">+</div>
        <div style="text-align: center; padding: 10px; background: white; border-radius: 5px;">
            <div style="font-size: 40pt;">🧽</div>
            <p style="font-weight: bold;">Eraser</p>
            <p style="font-size: 20pt; font-weight: bold; color: #FF5722; background: #FFF; padding: 5px 15px; border: 2px solid #FF5722; border-radius: 5px;">28p</p>
        </div>
    </div>
    <p style="text-align: center; font-size: 16pt;">Total cost: <span class="answer-box"></span>p</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key" style="margin-top: 40px; padding: 20px; background: #f5f5f5; border: 2px solid #333; border-radius: 8px;">
    <h2 class="answer-key-title" style="font-size: 18pt; margin-bottom: 15px;">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 55</p>
        <p><strong>2.</strong> 55</p>
        <p><strong>3.</strong> Emma</p>
        <p><strong>4.</strong> 15</p>
        <p><strong>5.</strong> 73</p>
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
- [ ] NO working-space divs

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
