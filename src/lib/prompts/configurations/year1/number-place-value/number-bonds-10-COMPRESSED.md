# Year 1: Number Bonds to 10

**Generate EXACTLY {{questionCount}} questions following the 5 mandatory types below.**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## Rules
1. **All bonds sum to 10** (0+10, 1+9, 2+8, 3+7, 4+6, 5+5)
2. **NO visual answer clues** - Answer boxes must NOT be colored differently
3. **Fruit images**: `/images/WORKSHEET_OBJECTS/counting/fruits/{name}.png` - Available: apple, banana, grape, lemon, orange, peach, pear, pineapple, strawberry, watermelon
4. **Q4 descriptive words only** (big, ripe, sweet) NOT colors

## 5 Questions (IN ORDER)

**Q1: Ten Frame** (BG: #FFF9C4) - Show filled circles, find missing part
**Q2: Part-Whole** (BG: #E3F2FD) - Whole=10 at top, 2 parts below
**Q3: Bond Family** (BG: #F1F8E9) - Given 3+7=10, complete: 7+3, 10-3, 10-7
**Q4: Real Objects** (BG: #FCE4EC) - Use fruit images, descriptive labels
**Q5: Quick Grid** (BG: #FFF3E0) - 6 bonds in 2x3 grid

## Q1 Template
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Complete the number bond to 10.</p>
    <div class="bond-visual">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
            </div>
        </div>
    </div>
    <div class="bond-equation">
        <span class="number-filled">7</span>
        <span class="plus-sign">+</span>
        <span class="answer-box"></span>
        <span class="equals-sign">=</span>
        <span class="number-filled">10</span>
    </div>
</div>
```

## Q2 Template
```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Fill in the missing number to make 10.</p>
    <div class="part-whole-diagram">
        <div class="whole-circle"><span class="whole-number">10</span></div>
        <div class="connecting-lines"></div>
        <div class="parts-row">
            <div class="part-circle"><span class="part-number">6</span></div>
            <div class="part-circle missing"><span class="part-number">?</span></div>
        </div>
    </div>
</div>
```

## Q3 Template
```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Complete the number bond family.</p>
    <div class="bond-family">
        <div class="bond-pair"><span class="bond-equation">3 + 7 = 10</span></div>
        <div class="bond-pair"><span class="bond-equation">7 + 3 = <span class="answer-box-small"></span></span></div>
        <div class="bond-pair"><span class="bond-equation">10 - 3 = <span class="answer-box-small"></span></span></div>
        <div class="bond-pair"><span class="bond-equation">10 - 7 = <span class="answer-box-small"></span></span></div>
    </div>
</div>
```

## Q4 Template
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">There are 10 strawberries. 5 strawberries are ripe. How many more strawberries?</p>
    <div class="object-bond-visual">
        <div class="objects-group">
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
            <p class="object-label">5 ripe strawberries</p>
        </div>
        <div class="objects-group">
            <div class="placeholder-box">?</div>
            <p class="object-label">___ strawberries</p>
        </div>
    </div>
    <div class="bond-equation">
        <span class="number-filled">5</span>
        <span class="plus-sign">+</span>
        <span class="answer-box"></span>
        <span class="equals-sign">=</span>
        <span class="number-filled">10</span>
    </div>
</div>
```

## Q5 Template
```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Fill in the missing numbers to make 10.</p>
    <div class="quick-bonds-grid">
        <div class="bond-item"><span class="bond-mini">2 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">5 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">8 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini">1 + <span class="answer-box-tiny"></span> = 10</span></div>
        <div class="bond-item"><span class="bond-mini"><span class="answer-box-tiny"></span> + 6 = 10</span></div>
        <div class="bond-item"><span class="bond-mini"><span class="answer-box-tiny"></span> + 3 = 10</span></div>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Sassoon Primary','Century Gothic',sans-serif;font-size:16pt;margin:0;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1);}
.question-number{font-size:18pt;font-weight:bold;color:#2c3e50;margin-right:8px;}
.question-text{font-size:16pt;margin:6px 0;font-weight:600;}
.bond-visual{text-align:center;margin:20px auto;}
.ten-frame{display:inline-block;padding:10px;background:#fff;border:4px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:5px;margin-bottom:5px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:50px;height:50px;border:2px solid #333;border-radius:4px;background:#fff;}
.frame-cell.filled{background:#4CAF50;position:relative;}
.frame-cell.filled::after{content:'';width:30px;height:30px;background:#2E7D32;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}
.bond-equation{display:flex;align-items:center;justify-content:center;gap:15px;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #2196F3;border-radius:12px;max-width:400px;font-size:24pt;font-weight:bold;}
.number-filled{width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:#4CAF50;color:#fff;border-radius:8px;border:3px solid #2E7D32;}
.plus-sign,.equals-sign{font-size:28pt;color:#333;}
.part-whole-diagram{margin:20px auto;max-width:300px;text-align:center;}
.whole-circle{width:100px;height:100px;background:#FF9800;border:4px solid #F57C00;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
.whole-number{font-size:36pt;font-weight:bold;color:#fff;}
.connecting-lines{width:2px;height:40px;background:#333;margin:0 auto;position:relative;}
.connecting-lines::before{content:'';position:absolute;bottom:0;left:-60px;width:60px;height:2px;background:#333;}
.connecting-lines::after{content:'';position:absolute;bottom:0;right:-60px;width:60px;height:2px;background:#333;}
.parts-row{display:flex;justify-content:space-around;margin-top:20px;}
.part-circle{width:80px;height:80px;background:#4CAF50;border:4px solid #2E7D32;border-radius:50%;display:flex;align-items:center;justify-content:center;}
.part-circle.missing{background:#fff;border-color:#FF5722;border-style:dashed;}
.part-number{font-size:28pt;font-weight:bold;color:#fff;}
.part-circle.missing .part-number{color:#FF5722;}
.bond-family{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #9C27B0;border-radius:12px;max-width:400px;}
.bond-pair{margin:12px 0;padding:10px;background:#fff;border:2px solid #ddd;border-radius:8px;}
.bond-equation{font-size:18pt;font-weight:bold;color:#2c3e50;}
.answer-box-small{display:inline-block;min-width:40px;height:30px;border:2px solid #333;border-radius:4px;background:#FFF9C4;margin:0 5px;vertical-align:middle;}
.object-bond-visual{display:flex;justify-content:space-around;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #E91E63;border-radius:12px;max-width:500px;}
.objects-group{text-align:center;flex:1;}
.objects-group img{margin:5px;}
.object-label{font-size:14pt;font-weight:bold;color:#2c3e50;margin-top:10px;}
.placeholder-box{width:80px;height:80px;background:#fff;border:3px dashed #FF5722;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:32pt;font-weight:bold;color:#FF5722;margin:10px auto;}
.quick-bonds-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #FF5722;border-radius:12px;max-width:500px;}
.bond-item{padding:12px;background:#fff;border:2px solid #ddd;border-radius:8px;text-align:center;}
.bond-mini{font-size:16pt;font-weight:bold;color:#2c3e50;}
.answer-box-tiny{display:inline-block;min-width:35px;height:35px;border:2px solid #333;border-radius:4px;background:#FFF9C4;margin:0 3px;vertical-align:middle;}
.answer-box{display:inline-block;min-width:60px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF9C4;margin:0 8px;vertical-align:middle;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;color:#2c3e50;margin-bottom:10px;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [e.g., 3 for 7+3=10]</p>
        <p><strong>2.</strong> [e.g., 4 for 6 and 4 make 10]</p>
        <p><strong>3.</strong> [e.g., 10, 7, 3]</p>
        <p><strong>4.</strong> [e.g., 5 more strawberries]</p>
        <p><strong>5.</strong> [e.g., 8, 5, 2, 9, 4, 7]</p>
    </div>
</div>
```
