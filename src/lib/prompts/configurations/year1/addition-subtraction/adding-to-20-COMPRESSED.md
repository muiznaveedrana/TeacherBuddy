# Year 1: Adding to 20

Generate EXACTLY {{questionCount}} questions for ages 5-6.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES - NO ANSWER CLUES!

1. **Sums: 0-20** (addends 0-12)
2. **EXACTLY {{questionCount}} questions** with answer key
3. **Strategies**: Count all, count on, make 10, doubles
4. **Visuals**: Object arrays, number lines, ten-frames

5. **ABSOLUTELY NO VISUAL ANSWER CLUES**:
   - ❌ NO colored/highlighted numbers in visuals (e.g., orange "12" in number line)
   - ❌ NO strategy hints/text (e.g., "Think: 9 + 1 = 10, then 10 + 4 = ?")
   - ❌ NO calculation steps shown in the question
   - ❌ ALL numbers in visuals must be plain black - NO colored hints

**❌ WRONG:**
- Number line with orange colored answer positions
- Blue text: "Think: 9 + 1 = 10, then 10 + 4 = ?"
- Green highlighted numbers showing the calculation path

**✓ CORRECT:**
- All numbers plain black in visuals
- No strategy hints visible to students
- Question text does NOT show calculation steps

## 5-Question Format

1. Picture addition (two object groups)
2. Number line (jumps forward)
3. Ten-frame (bridging 10)
4. Missing addend (find ?)
5. Word problem (real-world context)

## Objects - `/images/{object}.png`

**School**: pencil,book,crayon,eraser,scissors
**Farm**: chicken,cow,sheep,pig
**Fruits**: apple,banana,orange
**Toys**: car,ball,doll
## Key Strategies

- Doubles: 5+5, 6+6, 7+7, 8+8, 9+9
- Near doubles: 6+7 = 6+6+1
- Make 10: 8+5 = 8+2+3 = 10+3 = 13

## CSS
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}
.question{margin:10px 0;padding:12px;border-radius:8px}
.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}
.picture-addition{margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #4CAF50;border-radius:12px;max-width:500px}
.group-container{display:flex;align-items:flex-start;justify-content:center;gap:15px;flex-wrap:wrap}
.addend-group{text-align:center;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:180px}
.addend-group img{width:32px;height:32px}
.group-label{font-size:14pt;font-weight:bold;margin-top:10px}
.plus-symbol{font-size:48pt;font-weight:bold;color:#FF9800}
.number-line-addition{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #2196F3;border-radius:12px;max-width:700px}
.number-line-visual{display:flex;justify-content:space-between;padding:30px 10px 10px;position:relative}
.number-line-visual::before{content:'';position:absolute;bottom:10px;left:3%;right:3%;height:4px;background:#333}
.number-tick{width:40px;height:40px;background:#E0E0E0;border:2px solid #999;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13pt;font-weight:bold;z-index:1}
.number-tick.start-point{background:#4CAF50;color:white;border-width:3px}
.number-tick.end-point{background:#FF9800;color:white;border-width:3px}
.jump-label{text-align:center;font-size:15pt;font-weight:bold;color:#1976D2}
.ten-frame-addition{margin:20px auto;max-width:600px}
.double-ten-frame{display:flex;gap:30px;justify-content:center;padding:20px;background:#f8f9ff;border:3px solid #9C27B0;border-radius:12px}
.frame-section{text-align:center}
.frame-label{font-size:14pt;font-weight:bold;margin-bottom:10px}
.ten-frame{display:inline-block;padding:8px;background:white;border:3px solid #333;border-radius:8px}
.frame-row{display:flex;gap:4px;margin-bottom:4px}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:white;position:relative}
.frame-cell.filled{background:#4CAF50}
.frame-cell.filled::after{content:'';width:28px;height:28px;background:#2E7D32;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
.missing-addend-visual{margin:20px auto;max-width:400px}
.part-whole-addition{text-align:center;padding:20px;background:#f8f9ff;border:3px solid #E91E63;border-radius:12px}
.total-circle{width:100px;height:100px;background:#FF9800;border:4px solid #F57C00;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;margin:0 auto 20px}
.total-number{font-size:36pt;font-weight:bold;color:white}
.parts-addition{display:flex;justify-content:center;gap:20px;margin-top:20px}
.part-box{width:70px;height:70px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:3px solid}
.part-box.filled{background:#4CAF50;border-color:#2E7D32}
.part-box.missing{background:white;border-color:#FF5722;border-style:dashed}
.part-number{font-size:28pt;font-weight:bold;color:white}
.part-box.missing .part-number{color:#FF5722}
.word-problem-visual{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #FF5722;border-radius:12px;max-width:600px}
.problem-illustration{display:flex;gap:30px;justify-content:space-around}
.initial-group,.added-group{text-align:center;flex:1}
.illustration-label{font-size:13pt;font-weight:bold;margin-bottom:10px}
.object-array{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.addition-equation{display:flex;align-items:center;justify-content:center;gap:15px;margin:20px auto;padding:15px;background:white;border:3px solid #333;border-radius:12px;max-width:400px;font-size:24pt;font-weight:bold}
.number{min-width:50px;text-align:center}
.operator{font-size:28pt;color:#FF9800}
.answer-box{display:inline-block;min-width:60px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4}
.answer-prompt{font-size:15pt;margin:15px 0;font-weight:600;text-align:center}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center}
</style>
```

## Q1 Example
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Count the chickens. How many in total?</p>
    <div class="picture-addition">
        <div class="group-container">
            <div class="addend-group">
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <p class="group-label">6 chickens</p>
            </div>
            <div class="plus-symbol">+</div>
            <div class="addend-group">
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <img src="/images/chicken.png" width="45" height="45" alt="Chicken" />
                <p class="group-label">4 chickens</p>
            </div>
        </div>
    </div>
    <div class="addition-equation">
        <span class="number">6</span>
        <span class="operator">+</span>
        <span class="number">4</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>
</div>
```

## Q3 Example
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Use the ten-frames to add.</p>
    <div class="ten-frame-addition">
        <div class="double-ten-frame">
            <div class="frame-section">
                <p class="frame-label">8</p>
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
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                </div>
            </div>
            <div class="frame-section">
                <p class="frame-label">6</p>
                <div class="ten-frame">
                    <div class="frame-row">
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
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
        </div>
    </div>
    <div class="addition-equation">
        <span class="number">8</span>
        <span class="operator">+</span>
        <span class="number">6</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>
</div>
```

## Answer Key
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 10 (6 + 4)</p>
        <p><strong>2.</strong> 11 (7 + 4, number line)</p>
        <p><strong>3.</strong> 14 (8 + 6, ten-frames)</p>
        <p><strong>4.</strong> 6 (7 + ? = 13)</p>
        <p><strong>5.</strong> 13 toys (8 + 5, word problem)</p>
    </div>
</div>
```

## Final Checks

- [ ] EXACTLY {{questionCount}} questions
- [ ] All sums 0-20
- [ ] Used SINGULAR filenames (chicken.png NOT chickens.png)
- [ ] Q1: Picture addition
- [ ] Q2: Number line
- [ ] Q3: Ten-frames
- [ ] Q4: Missing addend
- [ ] Q5: Word problem
- [ ] Answer key included

Generate now.