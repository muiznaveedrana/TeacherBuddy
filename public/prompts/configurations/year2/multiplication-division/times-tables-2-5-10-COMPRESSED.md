# Year 2: Times Tables 2, 5, 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 times tables (2, 5, 10) questions.

## CRITICAL RULES

**Tables:** 2, 5, 10 only (up to ×12)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Concept:** Multiplication as repeated addition
**Visual:** Arrays, equal groups, skip counting
**Patterns:** 2s=even, 5s=end 0/5, 10s=end 0

## 5-QUESTION FORMAT

**Q1:** Visual array - count rows and columns
**Q2:** Repeated addition to multiplication (e.g., 10+10+10 = 3×10)
**Q3:** Mixed times tables - 6 facts (2s, 5s, 10s)
**Q4:** Pattern recognition - complete sequences
**Q5:** Word problem - multiplication context

## TIMES TABLES

**2×:** 2,4,6,8,10,12,14,16,18,20,22,24
**5×:** 5,10,15,20,25,30,35,40,45,50,55,60
**10×:** 10,20,30,40,50,60,70,80,90,100,110,120

## CSS

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:15px;line-height:1.6}
.question{margin:15px 0;padding:15px;border-radius:10px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:10px;font-weight:bold}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.array-visual{margin:15px 0;text-align:center}
.array-row{font-size:28pt;margin:5px 0}
.repeated-addition{margin:15px 0;padding:12px;background:#F5F5F5;border-radius:8px}
.equation{font-size:18pt;margin:10px 0}
.multiply{font-size:18pt;margin:10px 0;color:#1976D2}
.times-tables-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:15px 0}
.tt-item{padding:12px;border:2px solid #ddd;border-radius:8px;font-size:18pt;background:#FFF}
.pattern-sequences{margin:15px 0}
.pattern-sequences p{margin:12px 0;font-size:17pt}
.answer-box{display:inline-block;min-width:60px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 5px;background:transparent}
.working{font-size:16pt;margin:10px 0}
.answer-key{margin-top:30px;padding:20px;background:#E8F4F8;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key-title{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center}
.answer-key-content p{font-size:15pt;line-height:1.8;margin:8px 0}
```

## EXAMPLE OUTPUT

**Q1 (Array):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples in total?</p>
    <div class="array-visual">
        <!-- 4 rows of 5 apples -->
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
        <div class="array-row">🍎🍎🍎🍎🍎</div>
    </div>
    <p class="working">4 rows of 5 = <span class="answer-line">___ × ___ = ___</span></p>
</div>
```

**Q2 (Repeated Addition):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Write as multiplication.</p>
    <div class="repeated-addition">
        <p class="equation">2 + 2 + 2 + 2 + 2 = <span class="answer-box"></span></p>
        <p class="multiply">This is the same as: <span class="answer-line">___ × ___ = ___</span></p>
    </div>
</div>
```

**Q3 (Times Tables Grid):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Solve these multiplications.</p>
    <div class="times-tables-grid">
        <div class="tt-item">3 × 2 = <span class="answer-box"></span></div>
        <div class="tt-item">7 × 5 = <span class="answer-box"></span></div>
        <div class="tt-item">6 × 10 = <span class="answer-box"></span></div>
        <div class="tt-item">9 × 2 = <span class="answer-box"></span></div>
        <div class="tt-item">4 × 5 = <span class="answer-box"></span></div>
        <div class="tt-item">8 × 10 = <span class="answer-box"></span></div>
    </div>
</div>
```

**Q4 (Patterns):**
```html
<div class="question" style="background: #FFE0E0;">
    <p class="question-text"><span class="question-number">4.</span> Complete the patterns.</p>
    <div class="pattern-sequences">
        <p>Count in 2s: 2, 4, 6, <span class="answer-box"></span>, <span class="answer-box"></span>, 12</p>
        <p>Count in 5s: 15, 20, <span class="answer-box"></span>, 30, <span class="answer-box"></span></p>
        <p>Count in 10s: 40, <span class="answer-box"></span>, 60, <span class="answer-box"></span>, 80</p>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 4 × 5 = 20 apples</p>
        <p><strong>2.</strong> 10, and 5 × 2 = 10</p>
        <p><strong>3.</strong> 6, 35, 60, 18, 20, 80</p>
        <p><strong>4.</strong> 8, 10 (2s); 25, 35 (5s); 50, 70 (10s)</p>
        <p><strong>5.</strong> 30 cookies (6 × 5 = 30)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
