# Reception: Simple Patterns - COMPRESSED

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Rules
- Q1-Q3, Q5: CSS shapes only (NO text/images)
- Q4: IMG tags with FULL paths, **50x50px**
- Pattern length: 2-3 cycles max
- **VARY colors and shapes each worksheet**

## 5 Questions
1. AB pattern (shapes, multiple choice)
2. ABB pattern (fill blanks)
3. Copy pattern
4. AB objects (**50x50 img tags**, multiple choice)
5. ABC pattern (shapes, multiple choice)

## Color Variations - RANDOMIZE!
**Q1-Q2 Color Pairs** (pick DIFFERENT for each): Red/Blue, Red/Green, Blue/Yellow, Green/Yellow, Orange/Purple, Red/Orange
**Q5 Color Sets** (pick ONE): Red/Blue/Green, Red/Yellow/Blue, Green/Orange/Purple, Blue/Yellow/Green, Red/Green/Orange, Purple/Orange/Red

## Q1 - AB Pattern

```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What comes next in this pattern?</p>
    <div class="pattern-sequence">
        <div class="pattern-item circle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape circle red"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape square blue"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape triangle green"></div>
        </div>
    </div>
</div>
```

## Q4 - Objects
FULL paths: `/images/{object}.png` (50x50px)
**VARY objects**: fruits (apple, banana, orange), farm_animals (cow, chicken, sheep), toys (ball, doll)

```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> What comes next in this pattern?</p>
    <div class="pattern-sequence-objects">
        <img src="/images/ball.png" width="50" height="50" alt="Ball" />
        <img src="/images/doll.png" width="50" height="50" alt="Doll" />
        <img src="/images/ball.png" width="50" height="50" alt="Ball" />
        <div class="pattern-next">?</div>
    </div>
    <div class="object-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/doll.png" width="50" height="50" alt="Doll" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/ball.png" width="50" height="50" alt="Ball" />
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/cow.png" width="50" height="50" alt="Cow" />
        </div>
    </div>
</div>
```

## Q5 - ABC Pattern (VARY COLORS!)

```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> What comes next?</p>
    <div class="pattern-sequence">
        <div class="pattern-item circle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-item triangle green"></div>
        <div class="pattern-item circle red"></div>
        <div class="pattern-item square blue"></div>
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape triangle green"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape circle red"></div>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape square blue"></div>
        </div>
    </div>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.pattern-sequence,.pattern-sequence-objects{display:flex;gap:15px;justify-content:center;padding:20px;flex-wrap:wrap;}
.pattern-item{width:60px;height:60px;border:2px solid #333;}
.pattern-item.circle{border-radius:50%;}
.pattern-item.triangle{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:52px solid #333;border-top:none;background:transparent;}
.red{background:#E74C3C;}
.blue{background:#4A90E2;}
.green{background:#27AE60;}
.yellow{background:#F1C40F;}
.orange{background:#FF8C00;}
.purple{background:#9B59B6;}
.pattern-item.triangle.red{border-bottom-color:#E74C3C;background:transparent;}
.pattern-item.triangle.blue{border-bottom-color:#4A90E2;background:transparent;}
.pattern-item.triangle.green{border-bottom-color:#27AE60;background:transparent;}
.pattern-item.triangle.yellow{border-bottom-color:#F1C40F;background:transparent;}
.pattern-item.triangle.orange{border-bottom-color:#FF8C00;background:transparent;}
.pattern-item.triangle.purple{border-bottom-color:#9B59B6;background:transparent;}
.pattern-next{width:60px;height:60px;border:3px dashed #FF6347;display:flex;align-items:center;justify-content:center;font-size:32pt;color:#FF6347;}
.pattern-choices-abc,.object-choices{display:flex;gap:20px;justify-content:center;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;}
.choice-shape{width:60px;height:60px;margin:0 auto;border:2px solid #333;}
.choice-shape.circle{border-radius:50%;}
.choice-shape.triangle{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:52px solid #333;border-top:none;background:transparent;}
.choice-shape.triangle.red{border-bottom-color:#E74C3C;background:transparent;}
.choice-shape.triangle.blue{border-bottom-color:#4A90E2;background:transparent;}
.choice-shape.triangle.green{border-bottom-color:#27AE60;background:transparent;}
.choice-shape.triangle.yellow{border-bottom-color:#F1C40F;background:transparent;}
.choice-shape.triangle.orange{border-bottom-color:#FF8C00;background:transparent;}
.choice-shape.triangle.purple{border-bottom-color:#9B59B6;background:transparent;}
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
        <p><strong>1.</strong> [Next shape/color, e.g., "A (Red Circle)"]</p>
        <p><strong>2.</strong> [Missing shapes, e.g., "Two blue squares"]</p>
        <p><strong>3.</strong> [Pattern to copy, e.g., "Yellow triangle, green square, yellow triangle"]</p>
        <p><strong>4.</strong> [Next object, e.g., "A (Doll)"]</p>
        <p><strong>5.</strong> [Next shape/color, e.g., "A (Green Triangle)"]</p>
    </div>
</div>
```
