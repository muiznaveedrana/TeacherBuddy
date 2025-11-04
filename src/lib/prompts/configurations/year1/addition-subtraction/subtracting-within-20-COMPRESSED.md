# Year 1: Subtracting within 20 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 subtracting within 20 questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES - NO ANSWER CLUES!

1. **Differences:** 0-19 (minuends 3-20, subtrahends 1-12)
2. **Questions:** EXACTLY {{questionCount}} - count before returning
3. **Strategies:** Count back, think addition, bridge through 10, fact families
4. **Visual:** Cross out objects, number lines, ten-frames

5. **ABSOLUTELY NO VISUAL ANSWER CLUES**:
   - ❌ NO colored/highlighted numbers in visuals (e.g., green "7", red "12" in number line)
   - ❌ NO strategy hints/text (e.g., "Start at 12. Jump back 5 steps.")
   - ❌ NO calculation steps shown in the question
   - ❌ ALL numbers in visuals must be plain black - NO colored hints

**❌ WRONG:**
- Number line with green "7" (answer) and red "12" (start)
- Red text: "Start at 12. Jump back 5 steps."
- Colored numbers showing the calculation path

**✓ CORRECT:**
- All numbers plain black in visuals
- No strategy hints visible to students
- Question text does NOT show calculation steps

## 5-QUESTION FORMAT

**Q1:** Picture subtraction - cross out (show objects, cross out some, count remainder)
**Q2:** Number line subtraction - count back (start point, jump backward, find end)
**Q3:** Ten-frame subtraction (show all dots filled green, child crosses out specified number, counts remainder)
**Q4:** Fact families (complete family showing addition-subtraction link)
**Q5:** Word problem with images (taking away context)

## KEY STRATEGIES

- **Count back:** For small subtrahends
- **Think addition:** "What adds to X to make Y?"
- **Bridge through 10:** 13-5 = 13-3-2 = 10-2
- **Fact families:** If 6+8=14, then 14-6=8 and 14-8=6

## OBJECTS - `/images/{object}.png`

**Fruits**: strawberry,apple,banana,orange
**Toys**: ball,car,doll
**School**: pencil,book,crayon,eraser,scissors
**Farm Animals**: chicken,cow,sheep,pig,horse,goat,duck,goose,turkey

## WORD PROBLEM CONTEXTS

- Balloons flying away
- Eating fruits/cookies
- Giving away toys/stickers
- Animals leaving/running away
- Books returned to shelf

## EXAMPLE OUTPUT

**Q1 (Picture Subtraction):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> There are 9 strawberries. Cross out 4. How many are left?</p>
    <div class="picture-subtraction">
        <div class="object-group">
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
            <img src="/images/strawberry.png" width="50" height="50" alt="Strawberry" />
        </div>
        <p class="instruction">Cross out 4 strawberries</p>
    </div>
    <div class="subtraction-equation">
        <span class="number">9</span>
        <span class="operator">−</span>
        <span class="number">4</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>
</div>
```

**Q4 (Fact Families):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Complete the fact family.</p>
    <div class="fact-family-box">
        <div class="fact-row"><span class="fact-equation">6 + 8 = 14</span></div>
        <div class="fact-row"><span class="fact-equation">8 + 6 = <span class="answer-box-small"></span></span></div>
        <div class="fact-row"><span class="fact-equation">14 − 6 = <span class="answer-box-small"></span></span></div>
        <div class="fact-row"><span class="fact-equation">14 − 8 = <span class="answer-box-small"></span></span></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 5 (9 − 4)</p>
        <p><strong>2.</strong> 8 (14 − 6, number line)</p>
        <p><strong>3.</strong> 8 (13 − 5, ten-frames)</p>
        <p><strong>4.</strong> 14, 8, 6 (fact family)</p>
        <p><strong>5.</strong> 5 balloons (12 − 7 word problem)</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}
.question{margin:10px 0;padding:12px;border-radius:8px}
.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}
.picture-subtraction{margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #F44336;border-radius:12px;max-width:500px}
.object-group{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-bottom:10px;max-width:350px;margin-left:auto;margin-right:auto}
.object-group img{width:32px;height:32px}
.instruction{font-size:14pt;font-weight:bold;color:#D32F2F;text-align:center}
.subtraction-equation{display:flex;align-items:center;justify-content:center;gap:15px;margin:20px auto;padding:15px;background:white;border:3px solid #333;border-radius:12px;max-width:400px;font-size:24pt;font-weight:bold}
.number{min-width:50px;text-align:center}
.operator{font-size:28pt;color:#F44336}
.answer-box{display:inline-block;min-width:60px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4}
.number-line-subtraction{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #2196F3;border-radius:12px;max-width:700px}
.number-line-visual{display:flex;justify-content:space-between;padding:30px 10px 10px;position:relative}
.number-line-visual::before{content:'';position:absolute;bottom:10px;left:3%;right:3%;height:4px;background:#333}
.number-tick{width:40px;height:40px;background:#E0E0E0;border:2px solid #999;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13pt;font-weight:bold;z-index:1}
.number-tick.start-point{background:#F44336;color:white;border-width:3px}
.number-tick.end-point{background:#4CAF50;color:white;border-width:3px}
.jump-label{text-align:center;font-size:15pt;font-weight:bold;color:#D32F2F}
.ten-frame-subtraction{margin:20px auto;max-width:600px}
.double-ten-frame{display:flex;gap:30px;justify-content:center;padding:20px;background:#f8f9ff;border:3px solid #9C27B0;border-radius:12px}
.frame-section{text-align:center}
.ten-frame{display:inline-block;padding:8px;background:white;border:3px solid #333;border-radius:8px}
.frame-row{display:flex;gap:4px;margin-bottom:4px}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:white;position:relative}
.frame-cell.filled{background:#4CAF50}
.frame-cell.filled::after{content:'';width:28px;height:28px;background:#2E7D32;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
.frame-cell.crossed{background:#FFCDD2}
.frame-cell.crossed::before,.frame-cell.crossed::after{content:'';position:absolute;width:2px;height:50px;background:#D32F2F;top:50%;left:50%;transform:translate(-50%,-50%)}
.frame-cell.crossed::before{transform:translate(-50%,-50%) rotate(45deg)}
.frame-cell.crossed::after{transform:translate(-50%,-50%) rotate(-45deg)}
.fact-family-box{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #E91E63;border-radius:12px;max-width:400px}
.fact-row{margin:12px 0;padding:10px;background:white;border:2px solid #ddd;border-radius:8px}
.fact-equation{font-size:18pt;font-weight:bold}
.answer-box-small{display:inline-block;min-width:40px;height:30px;border:2px solid #333;border-radius:4px;background:#FFF9C4;margin:0 5px;vertical-align:middle}
.word-problem-visual{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #FF5722;border-radius:12px;max-width:600px}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center}
.answer-key-content p{font-size:12pt;margin:6px 0}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
