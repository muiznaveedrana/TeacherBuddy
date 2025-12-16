# Reception More or Less - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Reception more/less comparison questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Compare groups, identify more/less
**Section B: APPLICATION (Q3-Q4)** - Real-world comparison scenarios
**Section C: REASONING (Q5)** - True/False about comparisons

## DIFFICULTY LEVELS

**Foundation (Easy):** Numbers 1-5, clearly different amounts
**Varied (Average):** Numbers 1-10, varied comparisons
**Challenge (Hard):** Numbers 5-10, close comparisons requiring careful counting

## MANDATORY HTML PATTERNS

### Answer Key Format (CRITICAL)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> X, Y</p>
  <p><strong>2.</strong> A, B</p>
  <p><strong>3.</strong> M, N</p>
  <p><strong>4.</strong> P, Q</p>
  <p><strong>5.</strong> Yes/No, Z</p>
</div>
```

### Comparison Display
```html
<div class="comparison-box">
  <div class="group-container">
    <div class="group">
      <p class="counting-items">🍎🍎🍎</p>
      <p class="group-label">Group A</p>
    </div>
    <div class="vs-circle">VS</div>
    <div class="group">
      <p class="counting-items">🍎🍎🍎🍎🍎</p>
      <p class="group-label">Group B</p>
    </div>
  </div>
</div>
```

## QUESTION TEMPLATES

### Q1: Which has more? (2 comparisons)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Which group has more? Write A or B.</p>
  <div class="comparison-box">
    <div class="group-container">
      <div class="group">
        <p class="counting-items">🐶🐶🐶</p>
        <p class="group-label">A</p>
      </div>
      <div class="vs-circle">VS</div>
      <div class="group">
        <p class="counting-items">🐶🐶🐶🐶🐶</p>
        <p class="group-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Group <span class="answer-box-small"></span> has more dogs.</p>
  <div class="comparison-box" style="margin-top:15px">
    <div class="group-container">
      <div class="group">
        <p class="counting-items">⭐⭐⭐⭐</p>
        <p class="group-label">A</p>
      </div>
      <div class="vs-circle">VS</div>
      <div class="group">
        <p class="counting-items">⭐⭐</p>
        <p class="group-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">b) Group <span class="answer-box-small"></span> has more stars.</p>
</div>
```
**Answer:** B, A

### Q2: Which has less? (2 comparisons)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Which group has less? Write A or B.</p>
  <div class="comparison-box">
    <div class="group-container">
      <div class="group">
        <p class="counting-items">🎈🎈🎈🎈🎈</p>
        <p class="group-label">A</p>
      </div>
      <div class="vs-circle">VS</div>
      <div class="group">
        <p class="counting-items">🎈🎈</p>
        <p class="group-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Group <span class="answer-box-small"></span> has less balloons.</p>
  <div class="comparison-box" style="margin-top:15px">
    <div class="group-container">
      <div class="group">
        <p class="counting-items">🐱🐱</p>
        <p class="group-label">A</p>
      </div>
      <div class="vs-circle">VS</div>
      <div class="group">
        <p class="counting-items">🐱🐱🐱🐱</p>
        <p class="group-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">b) Group <span class="answer-box-small"></span> has less cats.</p>
</div>
```
**Answer:** B, A

### Q3: Story comparison (2 parts)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Who has more?</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Amy</strong> has:</span>
    <div class="counting-box inline"><p class="counting-items">🍎🍎🍎🍎</p></div>
  </div>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Ben</strong> has:</span>
    <div class="counting-box inline"><p class="counting-items">🍎🍎</p></div>
  </div>
  <p class="sub-question">a) Who has more apples? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) How many more? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** Amy, 2

### Q4: Compare in context (2 parts)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Look and compare.</p>
  <div class="word-problem-box">
    <span class="story-text">Shelf A:</span>
    <div class="counting-box"><p class="counting-items">📚📚📚📚📚</p></div>
  </div>
  <div class="word-problem-box">
    <span class="story-text">Shelf B:</span>
    <div class="counting-box"><p class="counting-items">📚📚📚</p></div>
  </div>
  <p class="sub-question">a) Which shelf has less books? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many less? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** B, 2

### Q5: True/False reasoning
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "5 is more than 3."
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What number is 1 more than 4? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** Yes, 5

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
.comparison-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0}
.group-container{display:flex;align-items:center;justify-content:center;gap:20px}
.group{text-align:center}
.vs-circle{background:#FF5722;color:white;width:40px;height:40px;line-height:40px;border-radius:50%;text-align:center;font-weight:bold;font-size:12pt}
.group-label{font-size:14pt;font-weight:bold;color:#333;margin-top:5px}
.counting-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.counting-box.inline{display:inline-block;vertical-align:middle;margin-left:10px}
.counting-items{font-size:36pt;letter-spacing:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
```

## COMPARISON GUIDELINES

- **Foundation:** Groups differ by 2-3 objects, use numbers 1-5
- **Varied:** Groups differ by 1-3 objects, use numbers 1-10
- **Challenge:** Groups differ by 1-2 objects, use numbers 5-10 (requires careful counting)
- VS circle should be prominent and colorful
- Group labels (A, B) must be clear and large
- Always have exactly 10 input fields total (2+2+2+2+2)

Generate worksheet NOW with correct answers based on emoji counts.
