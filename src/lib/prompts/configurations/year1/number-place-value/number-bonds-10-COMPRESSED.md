# Ages 5-6: Number Bonds to 10

**Generate EXACTLY 5 questions following the mandatory types below.**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#E8F5E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## Rules
1. **All bonds sum to 10** (0+10, 1+9, 2+8, 3+7, 4+6, 5+5)
2. **NO visual answer clues** - Answer boxes must NOT reveal answers
3. **RANDOMIZE** each worksheet - different numbers, different missing values

## 5 Questions (IN ORDER)

**Q1: Ten Frame** (BG: #FFF9C4) - Count filled cells, find missing to make 10
**Q2: Rainbow Bonds** (BG: #E8F5E9) - Fill missing numbers on rainbow (0-10 sequence)
**Q3: Domino** (BG: #E3F2FD) - Count dots on each half, write equation
**Q4: Butterfly** (BG: #FCE4EC) - Spots on wings must total 10
**Q5: Quick Bonds** (BG: #FFF3E0) - 4 fill-in-blank equations in 2x2 grid

---

## Q1 - Ten Frame
Pick random filled amount (1-9). Question: "How many more to make 10?"

```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Count the counters. What number makes 10?</p>
    <div class="ten-frame-container">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell filled"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
                <div class="frame-cell empty"></div>
            </div>
        </div>
    </div>
    <div class="equation-row">
        <span class="num">3</span>
        <span class="op">+</span>
        <span class="answer-box"></span>
        <span class="op">=</span>
        <span class="num">10</span>
    </div>
</div>
```

---

## Q2 - Rainbow Bonds
Shows 0-10 in sequence. Rainbow arcs connect bond pairs (0↔10, 1↔9, 2↔8, 3↔7, 4↔6, 5↔5). Pick 3 random numbers to be missing (as dashed boxes).

```html
<div class="question" style="background: #E8F5E9;">
    <span class="question-number">2.</span>
    <p class="question-text">Complete the rainbow number bonds.</p>
    <div class="rainbow-container">
        <svg viewBox="0 0 440 160" class="rainbow-svg">
            <path d="M 20 150 A 200 150 0 0 1 420 150" fill="none" stroke="#FF6B6B" stroke-width="8"/>
            <path d="M 60 150 A 160 120 0 0 1 380 150" fill="none" stroke="#FFA94D" stroke-width="8"/>
            <path d="M 100 150 A 130 95 0 0 1 340 150" fill="none" stroke="#FFE066" stroke-width="8"/>
            <path d="M 140 150 A 100 70 0 0 1 300 150" fill="none" stroke="#69DB7C" stroke-width="8"/>
            <path d="M 180 150 A 70 50 0 0 1 260 150" fill="none" stroke="#74C0FC" stroke-width="8"/>
            <circle cx="220" cy="150" r="6" fill="#B197FC"/>
        </svg>
        <div class="rainbow-numbers">
            <div class="rainbow-num">0</div>
            <div class="rainbow-num answer-box-small"></div>
            <div class="rainbow-num">2</div>
            <div class="rainbow-num">3</div>
            <div class="rainbow-num">4</div>
            <div class="rainbow-num answer-box-small"></div>
            <div class="rainbow-num">6</div>
            <div class="rainbow-num">7</div>
            <div class="rainbow-num">8</div>
            <div class="rainbow-num answer-box-small"></div>
            <div class="rainbow-num">10</div>
        </div>
    </div>
</div>
```

---

## Q3 - Domino
3D black domino tile with white dots. Pick any bond pair (e.g., 3+7, 2+8). Child counts dots and writes equation.

```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">3.</span>
    <p class="question-text">Count the dots. Write the number bond.</p>
    <div class="domino-container">
        <div class="domino">
            <div class="domino-half">
                <!-- 3 dots example: diagonal pattern -->
                <div class="dot" style="grid-area:1/1;"></div>
                <div style="grid-area:1/2;"></div>
                <div style="grid-area:1/3;"></div>
                <div style="grid-area:2/1;"></div>
                <div class="dot" style="grid-area:2/2;"></div>
                <div style="grid-area:2/3;"></div>
                <div style="grid-area:3/1;"></div>
                <div style="grid-area:3/2;"></div>
                <div class="dot" style="grid-area:3/3;"></div>
            </div>
            <div class="domino-divider"></div>
            <div class="domino-half">
                <!-- 7 dots -->
                <div class="dot" style="grid-area:1/1;"></div>
                <div class="dot" style="grid-area:1/2;"></div>
                <div class="dot" style="grid-area:1/3;"></div>
                <div class="dot" style="grid-area:2/1;"></div>
                <div style="grid-area:2/2;"></div>
                <div class="dot" style="grid-area:2/3;"></div>
                <div class="dot" style="grid-area:3/1;"></div>
                <div style="grid-area:3/2;"></div>
                <div class="dot" style="grid-area:3/3;"></div>
            </div>
        </div>
    </div>
    <div class="equation-row">
        <span class="answer-box"></span>
        <span class="op">+</span>
        <span class="answer-box"></span>
        <span class="op">=</span>
        <span class="num">10</span>
    </div>
</div>
```

**Dot patterns for domino (3x3 grid positions):**
- 1 dot: center (2/2)
- 2 dots: top-right (1/3), bottom-left (3/1)
- 3 dots: diagonal (1/1, 2/2, 3/3)
- 4 dots: corners (1/1, 1/3, 3/1, 3/3)
- 5 dots: corners + center
- 6 dots: left column + right column (1/1, 2/1, 3/1, 1/3, 2/3, 3/3)
- 7 dots: 6 + center
- 8 dots: all except center
- 9 dots: all positions

---

## Q4 - Butterfly
Left wing shows spots (solid border), right wing is answer (dashed border with "?"). Child calculates missing spots.

```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">The butterfly needs 10 spots in total. How many spots on the other wing?</p>
    <div class="butterfly-container">
        <div class="butterfly">
            <div class="wing left-wing">
                <div class="spot"></div>
                <div class="spot"></div>
                <div class="spot"></div>
                <div class="spot"></div>
            </div>
            <div class="butterfly-body">
                <div class="antenna"></div>
                <div class="body-segment head">🙂</div>
                <div class="body-segment"></div>
                <div class="body-segment"></div>
            </div>
            <div class="wing right-wing">
                <div class="spot-placeholder">?</div>
            </div>
        </div>
        <div class="wing-labels">
            <span class="wing-count">4 spots</span>
            <span class="wing-count answer-label">___ spots</span>
        </div>
    </div>
    <div class="equation-row">
        <span class="num">4</span>
        <span class="op">+</span>
        <span class="answer-box"></span>
        <span class="op">=</span>
        <span class="num">10</span>
    </div>
</div>
```

---

## Q5 - Quick Bonds (2x2 Grid)
4 equations in a 2-column grid. Each shows: number + ___ = 10. Interactive-friendly fill-in-blank.

```html
<div class="question" style="background: #FFF3E0;">
    <span class="question-number">5.</span>
    <p class="question-text">Fill in the missing numbers to make 10.</p>
    <div class="bonds-grid">
        <div class="bond-row">
            <span class="bond-num">3</span>
            <span class="bond-plus">+</span>
            <span class="bond-answer" data-answer="7"></span>
            <span class="bond-equals">=</span>
            <span class="bond-ten">10</span>
        </div>
        <div class="bond-row">
            <span class="bond-num">8</span>
            <span class="bond-plus">+</span>
            <span class="bond-answer" data-answer="2"></span>
            <span class="bond-equals">=</span>
            <span class="bond-ten">10</span>
        </div>
        <div class="bond-row">
            <span class="bond-num">5</span>
            <span class="bond-plus">+</span>
            <span class="bond-answer" data-answer="5"></span>
            <span class="bond-equals">=</span>
            <span class="bond-ten">10</span>
        </div>
        <div class="bond-row">
            <span class="bond-num">1</span>
            <span class="bond-plus">+</span>
            <span class="bond-answer" data-answer="9"></span>
            <span class="bond-equals">=</span>
            <span class="bond-ten">10</span>
        </div>
    </div>
</div>
```

---

## CSS (MANDATORY - Use exactly)
```css
<style>
body{font-family:'Sassoon Primary','Century Gothic',sans-serif;font-size:16pt;margin:0;padding:20px;background:#fff;}
.worksheet-header{text-align:center;margin-bottom:20px;padding-bottom:15px;border-bottom:3px solid #333;}
.worksheet-title{font-size:22pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;}
.worksheet-subtitle{font-size:14pt;color:#666;margin:0;}
.question{margin:12px 0;padding:15px;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.1);}
.question-number{font-size:16pt;font-weight:700;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;display:inline;margin:0;}

/* Ten Frame */
.ten-frame-container{text-align:center;margin:15px auto;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:#fff;}
.frame-cell.filled{background:#4CAF50;position:relative;}
.frame-cell.filled::after{content:'';width:28px;height:28px;background:#2E7D32;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);}

/* Equation Row */
.equation-row{display:flex;align-items:center;justify-content:center;gap:12px;margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #2196F3;border-radius:10px;max-width:350px;font-size:22pt;font-weight:bold;}
.num{width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:#4CAF50;color:#fff;border-radius:8px;border:3px solid #2E7D32;}
.op{font-size:24pt;color:#333;}
.answer-box{display:inline-block;width:50px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4;}

/* Rainbow Bonds */
.rainbow-container{position:relative;margin:15px auto;max-width:440px;text-align:center;}
.rainbow-svg{width:100%;height:140px;}
.rainbow-numbers{display:flex;justify-content:space-between;padding:0;margin-top:-5px;}
.rainbow-num{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:15pt;font-weight:bold;background:#fff;border:2px solid #333;border-radius:50%;}
.rainbow-num.answer-box-small{background:#FFF9C4;border:3px dashed #FF5722;}

/* Domino */
.domino-container{display:flex;justify-content:center;margin:15px auto;}
.domino{display:flex;align-items:center;background:#1a1a1a;padding:15px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.4);}
.domino-half{width:100px;height:100px;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:3px;padding:5px;}
.domino-divider{width:4px;height:100px;background:#444;margin:0 30px;border-radius:2px;}
.dot{width:22px;height:22px;background:#fff;border-radius:50%;box-shadow:inset 0 2px 4px rgba(0,0,0,0.2);justify-self:center;align-self:center;}

/* Butterfly */
.butterfly-container{display:flex;flex-direction:column;align-items:center;margin:15px auto;}
.butterfly{display:flex;align-items:center;justify-content:center;}
.wing{width:110px;height:130px;border-radius:50%;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:8px;padding:15px;}
.left-wing{background:linear-gradient(135deg,#FF9AA2 0%,#FFB7B2 50%,#FFDAC1 100%);border:3px solid #E91E63;}
.right-wing{background:linear-gradient(225deg,#B5EAD7 0%,#C7CEEA 50%,#E2F0CB 100%);border:3px dashed #4CAF50;}
.butterfly-body{display:flex;flex-direction:column;align-items:center;margin:0 8px;z-index:1;}
.body-segment{width:28px;height:28px;background:#8B4513;border-radius:50%;margin:2px 0;}
.body-segment.head{background:#D2691E;font-size:18pt;display:flex;align-items:center;justify-content:center;}
.antenna{position:relative;width:40px;height:25px;}
.antenna::before,.antenna::after{content:'';position:absolute;bottom:0;width:3px;height:20px;background:#8B4513;border-radius:3px;}
.antenna::before{left:8px;transform:rotate(-30deg);}
.antenna::after{right:8px;transform:rotate(30deg);}
.spot{width:22px;height:22px;background:#E91E63;border-radius:50%;border:2px solid #C2185B;}
.spot-placeholder{width:60px;height:60px;background:#fff;border:3px dashed #FF5722;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28pt;font-weight:bold;color:#FF5722;}
.wing-labels{display:flex;justify-content:space-between;width:300px;margin-top:10px;}
.wing-count{font-size:14pt;font-weight:bold;color:#333;}
.answer-label{color:#FF5722;}

/* Quick Bonds Grid */
.bonds-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:15px auto;padding:12px;background:#fff;border:3px solid #FF9800;border-radius:12px;max-width:420px;}
.bond-row{display:flex;align-items:center;justify-content:center;gap:5px;padding:8px 5px;background:#FFF8E1;border-radius:8px;}
.bond-num{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;background:#FFECB3;border:3px solid #FF9800;border-radius:50%;flex-shrink:0;}
.bond-plus{font-size:16pt;font-weight:bold;color:#333;}
.bond-answer{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:3px solid #333;border-radius:50%;background:#FFF9C4;font-size:16pt;flex-shrink:0;}
.bond-equals{font-size:16pt;font-weight:bold;color:#333;}
.bond-ten{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:14pt;font-weight:bold;background:#4CAF50;color:#fff;border-radius:50%;border:3px solid #2E7D32;flex-shrink:0;}

/* Answer Key */
.answer-key{margin-top:25px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center;}
.answer-key p{font-size:12pt;margin:5px 0;}
</style>
```

---

## Answer Key Format
```html
<div class="answer-key">
    <h2>Answer Key</h2>
    <p><strong>1.</strong> [Ten frame answer, e.g., 7 (3 + 7 = 10)]</p>
    <p><strong>2.</strong> [Rainbow missing numbers, e.g., 1, 5, 9]</p>
    <p><strong>3.</strong> [Domino equation, e.g., 3 + 7 = 10]</p>
    <p><strong>4.</strong> [Butterfly spots, e.g., 6 spots (4 + 6 = 10)]</p>
    <p><strong>5.</strong> [Quick bonds answers, e.g., 7, 2, 5, 9]</p>
</div>
```

---

## RANDOMIZATION REQUIREMENTS
Each worksheet MUST vary:
- Q1: Different filled count (1-9)
- Q2: Different 3 missing numbers from 0-10
- Q3: Different domino pair (not always 3+7)
- Q4: Different spot count on left wing (1-9)
- Q5: Different 4 bonds (pick from 0-10 pairs, shuffle order)
