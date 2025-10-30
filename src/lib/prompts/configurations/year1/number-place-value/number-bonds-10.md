# Year 1: Number Bonds to 10 Worksheet

**Generate EXACTLY {{questionCount}} questions following the 5 mandatory types below.**

## CRITICAL RULES
1. **All bonds must sum to 10** (0+10, 1+9, 2+8, 3+7, 4+6, 5+5, etc.)
2. **NO visual answer clues** - Answer boxes/circles must NOT be colored differently
3. **Use ONLY verified fruit images from WORKSHEET_OBJECTS:**
   - Path format: `/images/WORKSHEET_OBJECTS/counting/fruits/[fruitname].png`
   - Available: apple, banana, grape, lemon, orange, peach, pear, pineapple, strawberry, watermelon
   - Q4 must use descriptive words (big, ripe, sweet) NOT colors
   - Labels: "5 ripe strawberries" (describes the shown group)

---

## 5 MANDATORY QUESTIONS (IN ORDER)

### Q1: Complete Bond - Ten Frame Visual (BG: #FFF9C4)
Show filled circles in ten-frame, find missing part to make 10.

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
    <p class="answer-prompt">7 + ___ = 10</p>
</div>
```

---

### Q2: Part-Whole Diagram (BG: #E3F2FD)
Whole = 10 at top, two parts below. One part given, find missing part.

```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Fill in the missing number to make 10.</p>
    <div class="part-whole-diagram">
        <div class="whole-circle">
            <span class="whole-number">10</span>
        </div>
        <div class="connecting-lines"></div>
        <div class="parts-row">
            <div class="part-circle">
                <span class="part-number">6</span>
            </div>
            <div class="part-circle missing">
                <span class="part-number">?</span>
            </div>
        </div>
    </div>
    <p class="answer-prompt">6 and ___ make 10</p>
</div>
```

---

### Q3: Bond Families - Commutative Property (BG: #F1F8E9)
Show one bond (e.g., 3+7=10), complete the family (7+3, 10-3, 10-7).

```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">3.</span>
    <p class="question-text">Complete the number bond family.</p>
    <div class="bond-family">
        <div class="bond-pair">
            <span class="bond-equation">3 + 7 = 10</span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">7 + 3 = <span class="answer-box-small"></span></span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">10 - 3 = <span class="answer-box-small"></span></span>
        </div>
        <div class="bond-pair">
            <span class="bond-equation">10 - 7 = <span class="answer-box-small"></span></span>
        </div>
    </div>
</div>
```

**Example families:** 4+6, 2+8, 5+5, 3+7

---

### Q4: Real-World Objects (BG: #FCE4EC)
Use actual images from WORKSHEET_OBJECTS/counting/fruits/ folder.

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

**CRITICAL - Use ONLY these verified fruit image paths:** 
```
/images/WORKSHEET_OBJECTS/counting/fruits/apple.png
/images/WORKSHEET_OBJECTS/counting/fruits/banana.png
/images/WORKSHEET_OBJECTS/counting/fruits/grape.png
/images/WORKSHEET_OBJECTS/counting/fruits/lemon.png
/images/WORKSHEET_OBJECTS/counting/fruits/orange.png
/images/WORKSHEET_OBJECTS/counting/fruits/peach.png
/images/WORKSHEET_OBJECTS/counting/fruits/pear.png
/images/WORKSHEET_OBJECTS/counting/fruits/pineapple.png
/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png
/images/WORKSHEET_OBJECTS/counting/fruits/watermelon.png
```

**Question formats (use descriptive words, NOT colors):**
- "There are 10 apples. 4 apples are big. How many more apples?"
- "There are 10 bananas. 6 bananas are ripe. How many more bananas?"
- "There are 10 oranges. 3 oranges are sweet. How many more oranges?"
- "There are 10 strawberries. 7 strawberries are ripe. How many more strawberries?"

---

### Q5: Quick Recall Grid (BG: #FFF3E0)
6 quick bonds in 2x3 grid format. Mix of _+n=10 and n+_=10.

```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Fill in the missing numbers to make 10.</p>
    <div class="quick-bonds-grid">
        <div class="bond-item">
            <span class="bond-mini">2 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">5 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">8 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini">1 + <span class="answer-box-tiny"></span> = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini"><span class="answer-box-tiny"></span> + 6 = 10</span>
        </div>
        <div class="bond-item">
            <span class="bond-mini"><span class="answer-box-tiny"></span> + 3 = 10</span>
        </div>
    </div>
</div>
```

---

## NUMBER BONDS TO 10 (Reference)

**All pairs:**
0+10, 1+9, 2+8, 3+7, 4+6, 5+5, 6+4, 7+3, 8+2, 9+1, 10+0

**Bond families (use for Q3):**
- 3+7=10, 7+3=10, 10-3=7, 10-7=3
- 4+6=10, 6+4=10, 10-4=6, 10-6=4
- 2+8=10, 8+2=10, 10-2=8, 10-8=2

---

## CSS

```css
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
```

---

## ANSWER KEY

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Answer] (e.g., 3 for 7+3=10)</p>
        <p><strong>2.</strong> [Answer] (e.g., 4 for 6 and 4 make 10)</p>
        <p><strong>3.</strong> [Answers] (e.g., 10, 7, 3 for bond family)</p>
        <p><strong>4.</strong> [Answer] (e.g., 6 green apples)</p>
        <p><strong>5.</strong> [6 answers] (e.g., 8, 5, 2, 9, 4, 7)</p>
    </div>
</div>
```

---

## VALIDATION

✓ Exactly 5 questions ✓ All bonds sum to 10 ✓ Q1=ten-frame ✓ Q2=part-whole ✓ Q3=bond family ✓ Q4=fruits with verified paths (/images/WORKSHEET_OBJECTS/counting/fruits/) ✓ Q5=quick grid ✓ Answer key included

**Output complete HTML with: header, 5 questions (exact order above), answer key.**
**Use placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}**