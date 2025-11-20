# Reception: Subitising - COMPRESSED

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## What is Subitising?
Recognising quantities **without counting** - instantly seeing "how many" (1-5 for Reception)

## Subitising Patterns
**Dice patterns** (1-6): Standard dice dot arrangements
**Ten-frame patterns** (1-10): Objects in 2×5 grid
**Finger patterns** (1-5): Hand showing fingers
**Domino patterns** (1-6): Standard domino dot arrangements
**Random clusters** (1-5): Small groups to recognize instantly

## Objects & Assets
**Core objects**: apple,banana,orange,strawberry,grape,cookie,cupcake,star,heart,circle,square,ball,car,doll,flower,butterfly,diamond,sun,moon
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Quantity Range
- **Primary focus**: 1-5 (instant recognition for Reception)
- **Extension**: 6-10 (for advanced students, use ten-frame)
- NO counting prompts - must be visual recognition

## 5 Question Types (EXACT ORDER)
**Q1 - Dice Pattern**: "How many dots?" Show standard dice face
**Q2 - Quick Look**: "How many {objects}?" Random cluster (1-5)
**Q3 - Ten Frame**: "How many {objects}?" Use 2×5 grid (1-10)
**Q4 - Matching Quantities**: "Which shows {number}?" Multiple choice
**Q5 - Two Groups**: "How many altogether?" Two small groups to subitise and combine

## Q1 - Dice Pattern Recognition
**RANDOMIZE**: Pick ONE dice number (1-6) + ONE question variation

**Question Variations** (pick ONE):
- "How many dots can you see?"
- "How many dots?"
- "What number is this?"
- "Count the dots quickly."

**Dice patterns**: Use standard dice dot arrangements

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many dots can you see?</p>
    <div class="dice-display">
        <div class="dice-face">
            <div class="dot" style="grid-area:1/1;"></div>
            <div class="dot" style="grid-area:2/2;"></div>
            <div class="dot" style="grid-area:3/3;"></div>
            <div class="dot" style="grid-area:1/3;"></div>
            <div class="dot" style="grid-area:3/1;"></div>
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

## Q3 - Ten Frame Recognition
**RANDOMIZE**: Pick ONE object + quantity (3-10) + ONE question variation

**Question Variations** (pick ONE):
- "How many {objects}?"
- "How many can you see?"
- "What number is shown?"
- "Quick look! How many?"

**Ten-frame rules**:
- Fill top row first (left to right)
- Then bottom row (left to right)
- This creates recognizable patterns

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> How many circles?</p>
    <div class="ten-frame-display">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell filled"><img src="/images/circle.png" width="20" height="20" alt="Circle" /></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Matching Quantities (Multiple Choice)
**RANDOMIZE**: Pick ONE target number (2-5) + create 3 different visual patterns

**Question Variations** (pick ONE):
- "Which shows {number}?"
- "Find {number}."
- "Which has {number} dots?"
- "Which group shows {number}?"

**Show 3 different patterns** (A/B/C): Mix of dots, objects, or ten-frame segments

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which shows 4?</p>
    <div class="matching-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="pattern-display">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="pattern-display">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="pattern-display">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
</div>
```

## Q5 - Two Groups (Combine by Subitising)
**RANDOMIZE**: Pick ONE object + 2 small quantities (each 1-3, total ≤5) + ONE question variation

**Question Variations** (pick ONE):
- "How many {objects} altogether?"
- "How many in total?"
- "Add both groups. How many?"
- "Quick! How many all together?"

**Purpose**: Practice subitising each group, then combining mentally

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> How many hearts altogether?</p>
    <div class="two-groups-display">
        <div class="group-cluster">
            <img src="/images/heart.png" width="35" height="35" alt="Heart" />
            <img src="/images/heart.png" width="35" height="35" alt="Heart" />
        </div>
        <div class="group-separator"></div>
        <div class="group-cluster">
            <img src="/images/heart.png" width="35" height="35" alt="Heart" />
            <img src="/images/heart.png" width="35" height="35" alt="Heart" />
            <img src="/images/heart.png" width="35" height="35" alt="Heart" />
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
.pattern-display{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;padding:10px;}
.two-groups-display{display:flex;gap:30px;justify-content:center;align-items:center;margin:20px auto;}
.group-cluster{display:flex;gap:8px;flex-wrap:wrap;padding:10px;border:2px dashed #999;border-radius:8px;}
.group-separator{width:2px;height:60px;background:#ccc;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
.answer-line{border-bottom:2px solid #333;display:inline-block;min-width:100px;margin-left:10px;}
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
        <p><strong>1.</strong> [Dice number, e.g., "5"]</p>
        <p><strong>2.</strong> [Count, e.g., "4"]</p>
        <p><strong>3.</strong> [Ten-frame count, e.g., "7"]</p>
        <p><strong>4.</strong> [Letter showing target, e.g., "B"]</p>
        <p><strong>5.</strong> [Total of both groups, e.g., "5"]</p>
    </div>
</div>
```
