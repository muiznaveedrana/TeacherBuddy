# Year 1 Halves and Quarters - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Year 1 fractions questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Identify fractions, calculate halves/quarters
**Section B: APPLICATION (Q3-Q4)** - Picture fractions, word problems
**Section C: REASONING (Q5)** - True/False about fractions

## DIFFICULTY LEVELS

**Foundation (Easy):** Simple halves, numbers 4-10
**Varied (Average):** Halves and quarters, numbers 8-14
**Challenge (Hard):** Mixed fractions, numbers 12-20

## MANDATORY HTML PATTERNS

### Answer Key Format (CRITICAL)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 1/2, 1/4</p>
  <p><strong>2.</strong> A, B, C, D</p>
  <p><strong>3.</strong> X, Y</p>
  <p><strong>4.</strong> M, N</p>
  <p><strong>5.</strong> Yes/No, Z</p>
</div>
```

### Fraction Shapes (SVG)
```html
<!-- Half of circle shaded -->
<svg width="80" height="80" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="35" fill="white" stroke="#333" stroke-width="2"/>
  <path d="M40,40 L40,5 A35,35 0 0,1 75,40 Z" fill="#4CAF50"/>
  <line x1="40" y1="5" x2="40" y2="75" stroke="#333" stroke-width="2"/>
  <line x1="5" y1="40" x2="75" y2="40" stroke="#333" stroke-width="2"/>
</svg>

<!-- Quarter of circle shaded -->
<svg width="80" height="80" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="35" fill="white" stroke="#333" stroke-width="2"/>
  <path d="M40,40 L40,5 A35,35 0 0,1 75,40 Z" fill="#2196F3"/>
  <line x1="40" y1="5" x2="40" y2="75" stroke="#333" stroke-width="2"/>
  <line x1="5" y1="40" x2="75" y2="40" stroke="#333" stroke-width="2"/>
</svg>
```

## QUESTION TEMPLATES

### Q1: Identify Fractions Shown (2-3 shapes)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>What fraction is shaded?</p>
  <div class="fraction-visual">
    <div class="shape-box">
      {{SVG shape a with shading}}
      <p class="shape-label">a)</p>
    </div>
    <div class="shape-box">
      {{SVG shape b with shading}}
      <p class="shape-label">b)</p>
    </div>
  </div>
  <p class="sub-question">a) <span class="answer-box-small"></span> is shaded</p>
  <p class="sub-question">b) <span class="answer-box-small"></span> is shaded</p>
</div>
```
**Answer format:** 1/2, 1/4 (fractions as X/Y)

### Q2: Calculate Halves/Quarters (4 items)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Find half of each number.</p>
  <div class="fluency-grid">
    <div class="fluency-item">Half of 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">Half of 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">Half of 8 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">Half of 10 = <span class="answer-box-small"></span></div>
  </div>
</div>
```
**Answer:** 2, 3, 4, 5

### Q3: Picture Fractions (count and find)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count and find half.</p>
  <div class="scene-box">
    <p style="font-size:32pt">🍪🍪🍪🍪🍪🍪</p>
    <p class="scene-title">6 cookies</p>
  </div>
  <p class="sub-question">a) How many cookies are there? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) Half of the cookies = <span class="answer-box-small"></span></p>
</div>
```
**Answer:** 6, 3

### Q4: Word Problems (2 stories)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Amy</strong> has 8 strawberries. She gives half to her friend.</span>
  </div>
  <p class="sub-question">a) Her friend gets <span class="answer-box-small"></span> strawberries.</p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="character-icon">🍕</span>
    <span class="story-text">A pizza is cut into 4 equal slices. Tom eats 1 slice. How many are left?</span>
  </div>
  <p class="sub-question">b) <span class="answer-box-small"></span> slices are left.</p>
</div>
```
**Answer:** 4, 3

### Q5: Reasoning (True/False)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Ben says:</strong> "Half of 10 is the same as 5"
    </div>
  </div>
  <p class="sub-question">a) Is Ben correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is half of 12? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** Yes, 6

## CSS (REQUIRED)
```css
<style>
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:10pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
.section-title{font-size:12pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}
.question{margin:10px 0;padding:12px;border-radius:8px}
.q-fluency{background:#E3F2FD}
.q-application{background:#F3E5F5}
.q-reasoning{background:#FFF3E0}
.question-number{display:inline-block;background:#4169E1;color:white;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:12pt}
.question-text{font-size:14pt;margin:5px 0;font-weight:600}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}
.fluency-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:15pt}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.fraction-visual{display:flex;justify-content:center;gap:30px;margin:15px 0}
.shape-box{text-align:center;padding:10px;background:white;border:2px solid #ddd;border-radius:8px}
.shape-label{font-size:11pt;color:#666;margin-top:5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
```

## FRACTION EXAMPLES

**Halves:** 1/2 (half of 4=2, half of 6=3, half of 8=4, half of 10=5, half of 12=6)
**Quarters:** 1/4 (quarter of 4=1, quarter of 8=2, quarter of 12=3, quarter of 16=4)
**Key relationships:**
- A quarter is smaller than a half
- 2 quarters = 1 half
- 4 quarters = 1 whole

## EMOJI OPTIONS
- Food: 🍪 🍕 🍎 🍰
- Objects: ⭐ 🎈 📚 ✏️
- People: 👧 👦 👨 👩

Generate worksheet NOW with correct answers.
