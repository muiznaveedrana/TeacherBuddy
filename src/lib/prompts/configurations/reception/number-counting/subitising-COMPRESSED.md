# Ages 4-5: Subitising

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## EYFS Requirement
> "Subitise up to 5" - Children should instantly recognise quantities WITHOUT counting.
> Focus on perceptual subitising (1-5). Use conceptual subitising (seeing parts) only for extension.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## What is Subitising?
Recognising quantities **without counting** - instantly seeing "how many" (1-5 for Reception)

## Subitising Patterns (All should focus on 1-5)
**Dice patterns** (1-5): Standard dice dot arrangements - AVOID 6 for Reception
**Five-frame patterns** (1-5): Objects in 1×5 grid - PREFERRED for Reception
**Ten-frame patterns** (1-5): Objects in 2×5 grid, max 5 filled for Reception
**Finger patterns** (1-5): Hand showing fingers - VERY important for EYFS
**Domino patterns** (1-5): Standard domino dot arrangements
**Random clusters** (1-5): Small groups to recognize instantly

## Objects & Assets
**Core objects**: apple,banana,orange,strawberry,grape,cookie,cupcake,star,heart,circle,square,ball,car,doll,flower,butterfly,diamond,sun,moon
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Quantity Range - IMPORTANT
- **Primary focus**: 1-5 ONLY (EYFS requirement: subitise up to 5)
- **AVOID**: Numbers 6-10 for Reception level worksheets
- NO counting prompts - must be visual recognition

## 5 Question Types (EXACT ORDER)
**Q1 - Dice Pattern**: "How many dots?" Show standard dice face (1-5 ONLY)
**Q2 - Quick Look**: "How many {objects}?" Random cluster (2-5)
**Q3 - Five/Ten Frame**: "How many {objects}?" Use frame with 1-5 objects ONLY
**Q4 - Multi-Representation Match**: "Which shows {number}?" Mix dice/fingers/dots
**Q5 - Domino Subitising**: "How many dots altogether?" Domino with both sides (total ≤5)

## Q1 - Dice Pattern Recognition
**RANDOMIZE**: Pick ONE dice number (1-5 ONLY) + ONE question variation

**Question Variations** (pick ONE):
- "How many dots can you see?"
- "How many dots?"
- "What number is this?"
- "Quick look! How many dots?"

**Dice patterns (1-5 only)**:
- 1: center dot only
- 2: top-left and bottom-right corners
- 3: diagonal (top-left, center, bottom-right)
- 4: all four corners
- 5: four corners + center

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many dots can you see?</p>
    <div class="dice-display">
        <div class="dice-face">
            <div class="dot" style="grid-area:1/1;"></div>
            <div class="dot" style="grid-area:2/2;"></div>
            <div class="dot" style="grid-area:3/3;"></div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Quick Look (Random Cluster)
**RANDOMIZE**: Pick ONE object + quantity (2-5) + ONE arrangement + ONE question variation

**Question Variations** (pick ONE):
- "How many {objects}?"
- "How many can you see?"
- "Quick! How many {objects}?"
- "What number do you see?"

**Arrangements**: Random but recognizable patterns (not in a line)

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> How many stars?</p>
    <div class="quick-look-cluster">
        <img src="/images/star.png" width="40" height="40" alt="Star" style="position:absolute;top:10px;left:30px;" />
        <img src="/images/star.png" width="40" height="40" alt="Star" style="position:absolute;top:35px;left:80px;" />
        <img src="/images/star.png" width="40" height="40" alt="Star" style="position:absolute;top:15px;left:130px;" />
        <img src="/images/star.png" width="40" height="40" alt="Star" style="position:absolute;top:60px;left:55px;" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Five Frame / Ten Frame Recognition (1-5 ONLY)
**RANDOMIZE**: Pick ONE object + quantity (1-5 ONLY) + ONE question variation

**Question Variations** (pick ONE):
- "How many {objects}?"
- "How many can you see?"
- "What number is shown?"
- "Quick look! How many?"

**Frame rules**:
- Use FIVE FRAME (1×5) OR TEN FRAME (2×5) - either is acceptable
- Fill left to right
- **MAX 5 objects** for Reception (even in ten-frame, leave bottom row empty or nearly empty)

**Example (Five Frame)**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> How many apples?</p>
    <div class="five-frame-display">
        <div class="five-frame">
            <div class="frame-cell filled"><img src="/images/apple.png" width="35" height="35" alt="Apple" /></div>
            <div class="frame-cell filled"><img src="/images/apple.png" width="35" height="35" alt="Apple" /></div>
            <div class="frame-cell filled"><img src="/images/apple.png" width="35" height="35" alt="Apple" /></div>
            <div class="frame-cell empty"></div>
            <div class="frame-cell empty"></div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Multi-Representation Matching (Multiple Choice)
**RANDOMIZE**: Pick ONE target number (2-5) + create 3 DIFFERENT representation types

**Question Variations** (pick ONE):
- "Which shows {number}?"
- "Find {number}."
- "Which picture shows {number}?"

**IMPORTANT**: Use DIFFERENT representations for A, B, C choices. Mix from:
- Dice pattern (dots arranged like dice)
- Finger pattern (hand showing fingers)
- Dot cluster (random arrangement)
- Objects in a row

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which shows 3?</p>
    <div class="matching-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="pattern-display dice-style">
                <div class="mini-dice">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="pattern-display finger-style">
                <span class="finger-display">✋</span>
                <span class="finger-count">3 fingers up</span>
            </div>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="pattern-display dots-style">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Domino Subitising (Conceptual Subitising)
**RANDOMIZE**: Pick domino with two sides where TOTAL ≤ 5

**Question Variations** (pick ONE):
- "How many dots altogether?"
- "How many dots on this domino?"
- "Quick! How many dots in total?"

**Valid domino combinations (total ≤ 5)**:
- 0|1, 0|2, 0|3, 0|4, 0|5
- 1|1, 1|2, 1|3, 1|4
- 2|1, 2|2, 2|3
- 3|1, 3|2
- 4|1

**Purpose**: Child subitises each half, then combines mentally (conceptual subitising)

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> How many dots altogether?</p>
    <div class="domino-display">
        <div class="domino">
            <div class="domino-half">
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <div class="domino-divider"></div>
            <div class="domino-half">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.dice-display{text-align:center;margin:20px 0;}
.dice-face{width:120px;height:120px;border:3px solid #333;border-radius:15px;background:#fff;display:inline-grid;grid-template:repeat(3,1fr)/repeat(3,1fr);gap:10px;padding:15px;box-shadow:2px 2px 8px rgba(0,0,0,0.2);}
.dot{width:18px;height:18px;background:#333;border-radius:50%;}
.quick-look-cluster{position:relative;height:120px;margin:20px auto 40px auto;max-width:200px;}
.five-frame-display{text-align:center;margin:20px 0;}
.five-frame{display:inline-flex;gap:4px;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.ten-frame-display{text-align:center;margin:20px 0;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:50px;height:50px;border:2px solid #333;border-radius:4px;display:flex;align-items:center;justify-content:center;}
.frame-cell.filled{background:#FFE4B5;}
.frame-cell.empty{background:#fff;}
.matching-choices{display:flex;gap:20px;justify-content:center;margin-top:15px;flex-wrap:wrap;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:100px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:10px;display:block;}
.pattern-display{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;min-height:60px;align-items:center;}
.mini-dice{display:grid;grid-template:repeat(2,1fr)/repeat(2,1fr);gap:5px;padding:8px;border:2px solid #333;border-radius:6px;background:#fff;}
.finger-display{font-size:36pt;}
.finger-count{font-size:10pt;color:#666;display:block;}
.domino-display{text-align:center;margin:20px 0;}
.domino{display:inline-flex;border:3px solid #333;border-radius:8px;background:#fff;box-shadow:2px 2px 8px rgba(0,0,0,0.2);}
.domino-half{display:grid;grid-template:repeat(3,1fr)/repeat(2,1fr);gap:5px;padding:15px;width:80px;height:100px;align-content:center;justify-items:center;}
.domino-divider{width:3px;background:#333;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Dice number 1-5, e.g., "3"]</p>
        <p><strong>2.</strong> [Cluster count 2-5, e.g., "4"]</p>
        <p><strong>3.</strong> [Frame count 1-5, e.g., "3"]</p>
        <p><strong>4.</strong> [Letter and number, e.g., "C (3)" - must include the target number in parentheses]</p>
        <p><strong>5.</strong> [Domino total ≤5, e.g., "5"]</p>
    </div>
</div>
```
