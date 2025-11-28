# Ages 4-5: Number Bonds

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Objects & Assets
**fruits**: apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple
**farm_animals**: chicken,cow,sheep,pig,horse,duck,goat,goose,turkey
**garden**: flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn
**school**: book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack
**vegetables**: carrot,tomato,broccoli,cucumber,pepper,potato
**shapes**: star,heart,circle,square,diamond,sun,moon
**toys**: ball,car,doll,kite,block
**vehicles**: bus,bike,train,plane
**sports**: football,basketball,tennis_ball,bat,medal
**treats**: cookie,cupcake
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava,Noah,Mia
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Number Bonds Focus
- **Primary**: Bonds to 5 (1+4, 2+3, 3+2, 4+1)
- **Secondary**: Bonds to 10 (simpler ones: 5+5, 4+6, 3+7, 2+8, 1+9)
- Part-whole relationships
- Missing number problems
- Use DIFFERENT objects for each question

## 5 Question Types (EXACT ORDER)
**Q1 - Part-Whole (Visual)**: Show total, split into 2 groups. "X + ? = Y"
**Q2 - Missing Part**: "? + X = Y" with visual groups
**Q3 - Bonds to 5**: Multiple choice - "Which makes 5?"
**Q4 - Double Facts**: "Double X" or "X + X = ?" (doubles to 5)
**Q5 - Bonds to 10**: Visual part-whole for 10 (using ten-frame optional)

## Q1 - Part-Whole Visual
**RANDOMIZE**: Pick ONE object + total (5 or 10) + split + ONE question variation

**Question Variations** (pick ONE - NO equations in question text):
- "I have {X} {objects}. How many more do I need to make {total}?"
- "There are {X} {objects}. How many more to make {total}?"
- "We have {X} {objects}. We want {total}. How many more?"
- "Count {X} {objects}. How many more needed to make {total}?"

**Visual**: Show first group clearly, second group as empty boxes. NO + or = signs in visual.

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> I have 3 apples. How many more do I need to make 5?</p>
    <div class="visual-scenario">
        <div class="have-section">
            <p class="label">I have:</p>
            <div class="objects-display">
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            </div>
        </div>
        <div class="need-section">
            <p class="label">I need more:</p>
            <div class="mystery-boxes">
                <div class="mystery-box">?</div>
                <div class="mystery-box">?</div>
            </div>
        </div>
        <div class="total-section">
            <p class="label">To make:</p>
            <p class="total-number">5</p>
        </div>
    </div>
    <p class="answer-prompt">How many more? <span class="answer-line"></span></p>
</div>
```

## Q2 - Missing Part (Reversed)
**RANDOMIZE**: Pick ONE object + total (5 or 10) + known part + ONE question variation

**Question Variations** (pick ONE - NO equations in question text):
- "We want {total} {objects}. We can see {X} {objects}. How many are hidden?"
- "There are {total} {objects} altogether. I can see {X}. How many are hiding?"
- "We need {total} {objects}. {X} are here. How many more boxes?"
- "{total} {objects} in total. Count {X}. How many in the box?"

**Visual**: Show some objects visible, empty box for hidden ones. NO + or = signs in visual.

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> There are 5 stars altogether. I can see 4 stars. How many are hiding in the box?</p>
    <div class="visual-scenario">
        <div class="total-section">
            <p class="label">Total:</p>
            <p class="total-number">5</p>
        </div>
        <div class="visible-section">
            <p class="label">I can see:</p>
            <div class="objects-display">
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
            </div>
        </div>
        <div class="hidden-section">
            <p class="label">Hiding:</p>
            <div class="mystery-boxes">
                <div class="mystery-box">?</div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">How many are hiding? <span class="answer-line"></span></p>
</div>
```

## Q3 - Bonds to 5 (Multiple Choice)
**RANDOMIZE**: Pick ONE number pair that makes 5 + ONE question variation

**Number pairs for 5**: 1+4, 2+3, 3+2, 4+1

**Question Variations** (pick ONE):
- "Which makes 5?"
- "Which pair adds up to 5?"
- "Find the number bond to 5."
- "Which equals 5?"

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which makes 5?</p>
    <div class="choice-boxes-bonds">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="bond-equation">2 + 2</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="bond-equation">2 + 3</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="bond-equation">3 + 3</p>
        </div>
    </div>
</div>
```

## Q4 - Double Facts
**RANDOMIZE**: Pick ONE number (1-5) + ONE question variation

**Doubles**: 1+1=2, 2+2=4, 3+3=6, 4+4=8, 5+5=10

**Question Variations** (pick ONE):
- "Double {X} = ?"
- "{X} + {X} = ?"
- "What is {X} doubled?"
- "{X} add {X} = ?"

**Visual**: Show two identical groups

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> 3 + 3 = ?</p>
    <div class="doubles-display">
        <div class="double-group">
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
        <div class="plus-sign">+</div>
        <div class="double-group">
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Bonds to 10 (Part-Whole)
**RANDOMIZE**: Pick ONE bond to 10 (simpler ones) + ONE question variation

**Bonds to 10** (pick easier ones for Reception):
- 5 + 5 (easiest - doubles)
- 6 + 4
- 7 + 3
- 8 + 2
- 9 + 1

**Question Variations** (pick ONE):
- "{X} + ? = 10"
- "What makes 10 with {X}?"
- "How many more to make 10?"
- "{X} and how many more make 10?"

**Visual**: Use ten-frame (optional) or grouped objects

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> 6 + ? = 10</p>
    <div class="bonds-to-10">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/heart.png" width="18" height="18" alt="Heart" /></div>
                <div class="frame-cell empty">?</div>
                <div class="frame-cell empty">?</div>
                <div class="frame-cell empty">?</div>
                <div class="frame-cell empty">?</div>
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
.visual-scenario{display:flex;gap:20px;justify-content:center;align-items:flex-start;margin:20px 0;flex-wrap:wrap;}
.have-section,.need-section,.total-section,.visible-section,.hidden-section{text-align:center;padding:15px;background:#fff;border:2px solid #ddd;border-radius:10px;min-width:100px;}
.label{font-size:13pt;font-weight:600;margin:0 0 10px 0;color:#555;}
.objects-display{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:120px;margin:0 auto;}
.mystery-boxes{display:flex;gap:6px;justify-content:center;}
.mystery-box{width:50px;height:50px;border:3px dashed #FF6347;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28pt;color:#FF6347;font-weight:bold;}
.total-number{font-size:32pt;font-weight:bold;color:#4CAF50;margin:0;}
.part-whole-display,.doubles-display{display:flex;gap:15px;justify-content:center;align-items:center;margin:15px 0;flex-wrap:wrap;}
.plus-sign,.equals-sign{font-size:24pt;font-weight:bold;color:#333;}
.choice-boxes-bonds{display:flex;gap:20px;justify-content:center;margin-top:15px;flex-wrap:wrap;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:80px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.bond-equation{font-size:18pt;font-weight:bold;margin:0;}
.bonds-to-10{margin:15px 0;text-align:center;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;display:flex;align-items:center;justify-content:center;}
.frame-cell.filled{background:#FFE4B5;}
.frame-cell.empty{background:#fff;font-size:20pt;color:#FF6347;}
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
        <p><strong>1.</strong> [Missing part, e.g., "2" (because 3+2=5)]</p>
        <p><strong>2.</strong> [Missing part, e.g., "1" (because 1+4=5)]</p>
        <p><strong>3.</strong> [Letter, e.g., "B (2+3)"]</p>
        <p><strong>4.</strong> [Double, e.g., "6" (3+3=6)]</p>
        <p><strong>5.</strong> [Missing part, e.g., "4" (because 6+4=10)]</p>
    </div>
</div>
```
