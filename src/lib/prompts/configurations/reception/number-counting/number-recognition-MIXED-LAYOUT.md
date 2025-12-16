# Reception Number Recognition - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Reception number recognition questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Identify numerals, match numbers to words
**Section B: APPLICATION (Q3-Q4)** - Match numerals to quantities, real-world contexts
**Section C: REASONING (Q5)** - True/False about number recognition

## DIFFICULTY LEVELS

**Foundation (Easy):** Numbers 1-5, simple matching
**Varied (Average):** Numbers 1-10, varied matching formats
**Challenge (Hard):** Numbers 5-10, reverse matching (quantities to numerals)

## MANDATORY HTML PATTERNS

### Answer Key Format (CRITICAL)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> X, Y, Z, W</p>
  <p><strong>2.</strong> A, B, C, D</p>
  <p><strong>3.</strong> M, N</p>
  <p><strong>4.</strong> P, Q</p>
  <p><strong>5.</strong> Yes/No, Z</p>
</div>
```

### Number Display Box
```html
<div class="number-box">
  <span class="big-number">5</span>
</div>
```

### Number-Word Matching
```html
<div class="match-row">
  <span class="number-display">3</span>
  <span class="arrow">→</span>
  <span class="answer-box-word"></span>
</div>
```

## QUESTION TEMPLATES

### Q1: Read the Number - Write the Word (4 items)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Write the number word.</p>
  <div class="number-grid">
    <div class="number-item">
      <div class="number-box"><span class="big-number">2</span></div>
      <p class="sub-question">a) <span class="answer-box-word"></span></p>
    </div>
    <div class="number-item">
      <div class="number-box"><span class="big-number">5</span></div>
      <p class="sub-question">b) <span class="answer-box-word"></span></p>
    </div>
    <div class="number-item">
      <div class="number-box"><span class="big-number">3</span></div>
      <p class="sub-question">c) <span class="answer-box-word"></span></p>
    </div>
    <div class="number-item">
      <div class="number-box"><span class="big-number">1</span></div>
      <p class="sub-question">d) <span class="answer-box-word"></span></p>
    </div>
  </div>
</div>
```
**Answer:** two, five, three, one

### Q2: Match Number to Amount (4 items)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>How many? Write the number.</p>
  <div class="number-grid">
    <div class="number-item">
      <div class="counting-box"><p class="counting-items">⭐⭐⭐</p></div>
      <p class="sub-question">a) <span class="answer-box-small"></span></p>
    </div>
    <div class="number-item">
      <div class="counting-box"><p class="counting-items">⭐⭐⭐⭐⭐</p></div>
      <p class="sub-question">b) <span class="answer-box-small"></span></p>
    </div>
    <div class="number-item">
      <div class="counting-box"><p class="counting-items">⭐⭐</p></div>
      <p class="sub-question">c) <span class="answer-box-small"></span></p>
    </div>
    <div class="number-item">
      <div class="counting-box"><p class="counting-items">⭐⭐⭐⭐</p></div>
      <p class="sub-question">d) <span class="answer-box-small"></span></p>
    </div>
  </div>
</div>
```
**Answer:** 3, 5, 2, 4

### Q3: Match in Context (2 items)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Write the number you see.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> sees this number on her door:</span>
    <div class="number-box inline"><span class="big-number">4</span></div>
  </div>
  <p class="sub-question">a) Lily's door shows number <span class="answer-box-small"></span></p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Max</strong> sees this on his birthday badge:</span>
    <div class="number-box inline"><span class="big-number">5</span></div>
  </div>
  <p class="sub-question">b) Max is <span class="answer-box-small"></span> years old.</p>
</div>
```
**Answer:** 4, 5

### Q4: Count and Match Number (2 items)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Count the objects. Write the number.</p>
  <div class="word-problem-box">
    <span class="story-text">How many cupcakes at the party?</span>
    <div class="counting-box"><p class="counting-items">🧁🧁🧁</p></div>
  </div>
  <p class="sub-question">a) There are <span class="answer-box-small"></span> cupcakes.</p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="story-text">How many balloons?</span>
    <div class="counting-box"><p class="counting-items">🎈🎈🎈🎈🎈</p></div>
  </div>
  <p class="sub-question">b) There are <span class="answer-box-small"></span> balloons.</p>
</div>
```
**Answer:** 3, 5

### Q5: Reasoning (True/False + Number Recognition)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Sam says:</strong> "This is the number 4."
      <div class="number-box inline"><span class="big-number">4</span></div>
    </div>
  </div>
  <p class="sub-question">a) Is Sam correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What number comes after 4? <span class="answer-box-small"></span></p>
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
.number-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:10px 0}
.number-item{text-align:center}
.number-box{background:#E8F5E9;border:3px solid #4CAF50;border-radius:12px;padding:10px;display:inline-block;margin:5px}
.number-box.inline{display:inline-block;vertical-align:middle;margin-left:10px}
.big-number{font-size:48pt;font-weight:bold;color:#2E7D32}
.counting-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
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

## NUMBER WORD REFERENCE

| Number | Word |
|--------|------|
| 1 | one |
| 2 | two |
| 3 | three |
| 4 | four |
| 5 | five |
| 6 | six |
| 7 | seven |
| 8 | eight |
| 9 | nine |
| 10 | ten |

## GUIDELINES

- **Foundation:** Numbers 1-5 only, focus on recognition
- **Varied:** Numbers 1-10, mix of recognition and matching
- **Challenge:** Numbers 5-10, include "what comes before/after"
- Always have exactly 12 input fields total (4+4+2+2)
- Number words must be lowercase in answers
- Big numbers should be 48pt, bold, green (#2E7D32)

Generate worksheet NOW with correct answers matching the numbers shown.
