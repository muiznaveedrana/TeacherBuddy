# Reception Early Addition - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Reception early addition questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Add objects using visuals, number sentences
**Section B: APPLICATION (Q3-Q4)** - Addition in real-world contexts
**Section C: REASONING (Q5)** - True/False about addition

## DIFFICULTY LEVELS

**Foundation (Easy):** Adding within 5 (e.g., 2+1, 3+2)
**Varied (Average):** Adding within 10 (e.g., 4+3, 5+4)
**Challenge (Hard):** Adding to make 10 (e.g., 6+4, 7+3)

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

### Addition Visual Display
```html
<div class="addition-box">
  <span class="counting-items">🍎🍎🍎</span>
  <span class="plus-sign">+</span>
  <span class="counting-items">🍎🍎</span>
  <span class="equals-sign">=</span>
  <span class="answer-box-small"></span>
</div>
```

## QUESTION TEMPLATES

### Q1: Count and Add (2 additions)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Count and add. How many altogether?</p>
  <div class="addition-box">
    <span class="counting-items">🐶🐶</span>
    <span class="plus-sign">+</span>
    <span class="counting-items">🐶🐶🐶</span>
    <span class="equals-sign">=</span>
    <span class="answer-box-small"></span>
  </div>
  <p class="sub-question">a) 2 + 3 = <span class="answer-box-small"></span></p>
  <div class="addition-box" style="margin-top:15px">
    <span class="counting-items">⭐⭐⭐⭐</span>
    <span class="plus-sign">+</span>
    <span class="counting-items">⭐</span>
    <span class="equals-sign">=</span>
    <span class="answer-box-small"></span>
  </div>
  <p class="sub-question">b) 4 + 1 = <span class="answer-box-small"></span></p>
</div>
```
**Answer:** 5, 5

### Q2: Number Sentences (2 additions)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Add the numbers.</p>
  <div class="number-sentence">
    <div class="addition-box">
      <span class="counting-items">🎈🎈🎈</span>
      <span class="plus-sign">+</span>
      <span class="counting-items">🎈🎈</span>
      <span class="equals-sign">=</span>
      <span class="answer-box-small"></span>
    </div>
  </div>
  <p class="sub-question">a) 3 + 2 = <span class="answer-box-small"></span></p>
  <div class="number-sentence" style="margin-top:15px">
    <div class="addition-box">
      <span class="counting-items">🐱🐱</span>
      <span class="plus-sign">+</span>
      <span class="counting-items">🐱🐱</span>
      <span class="equals-sign">=</span>
      <span class="answer-box-small"></span>
    </div>
  </div>
  <p class="sub-question">b) 2 + 2 = <span class="answer-box-small"></span></p>
</div>
```
**Answer:** 5, 4

### Q3: Story Addition (2 parts)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and add.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Amy</strong> has 3 apples.</span>
    <div class="counting-box inline"><p class="counting-items">🍎🍎🍎</p></div>
    <span class="story-text">She gets 2 more.</span>
    <div class="counting-box inline"><p class="counting-items">🍎🍎</p></div>
  </div>
  <p class="sub-question">a) How many apples now? <span class="answer-box-small"></span></p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Ben</strong> has 4 cars.</span>
    <div class="counting-box inline"><p class="counting-items">🚗🚗🚗🚗</p></div>
    <span class="story-text">Dad gives him 1 more.</span>
    <div class="counting-box inline"><p class="counting-items">🚗</p></div>
  </div>
  <p class="sub-question">b) How many cars now? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** 5, 5

### Q4: Add in Context (2 parts)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Add together.</p>
  <div class="word-problem-box">
    <span class="story-text">Plate 1:</span>
    <div class="counting-box inline"><p class="counting-items">🍪🍪🍪</p></div>
    <span class="story-text">Plate 2:</span>
    <div class="counting-box inline"><p class="counting-items">🍪🍪</p></div>
  </div>
  <p class="sub-question">a) How many cookies altogether? <span class="answer-box-small"></span></p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="story-text">Box 1:</span>
    <div class="counting-box inline"><p class="counting-items">✏️✏️</p></div>
    <span class="story-text">Box 2:</span>
    <div class="counting-box inline"><p class="counting-items">✏️✏️✏️</p></div>
  </div>
  <p class="sub-question">b) How many pencils altogether? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** 5, 5

### Q5: True/False Reasoning
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "2 + 3 = 5"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is 1 + 4? <span class="answer-box-small"></span></p>
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
.addition-box{display:flex;align-items:center;justify-content:center;gap:10px;background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0}
.plus-sign,.equals-sign{font-size:28pt;font-weight:bold;color:#4CAF50}
.counting-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.counting-box.inline{display:inline-block;vertical-align:middle;margin:0 10px}
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

## ADDITION GUIDELINES

- **Foundation:** Totals up to 5 only (1+1, 2+1, 2+2, 3+1, 3+2, 4+1)
- **Varied:** Totals up to 10 (4+3, 5+2, 5+4, 6+2, etc.)
- **Challenge:** Making 10 (6+4, 7+3, 8+2, 9+1) and bridging
- Plus and equals signs should be large and colorful
- Emoji groups must be countable (use spacing)
- Always have exactly 10 input fields total (2+2+2+2+2)

Generate worksheet NOW with correct answers based on emoji counts.
