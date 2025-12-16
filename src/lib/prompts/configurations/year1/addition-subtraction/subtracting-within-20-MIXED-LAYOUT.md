# Year 1 Subtracting within 20 - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Year 1 subtraction questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Quick calculations, number facts
**Section B: APPLICATION (Q3-Q4)** - Picture problems, word problems
**Section C: REASONING (Q5)** - True/False, explain thinking

## DIFFICULTY LEVELS

**Foundation (Easy):** Subtraction within 10 only (minuends 3-10)
**Varied (Average):** Mixed within 15 (minuends 9-15)
**Challenge (Hard):** Full range within 20 (minuends 14-20)

## MANDATORY HTML PATTERNS

### Answer Key Format (CRITICAL)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> X, Y</p>
  <p><strong>2.</strong> A, B, C, D</p>
  <p><strong>3.</strong> P, Q</p>
  <p><strong>4.</strong> M, N</p>
  <p><strong>5.</strong> Yes/No, Z</p>
</div>
```

### Section Headers
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Fluency Grid (Q2)
```html
<div class="fluency-grid">
  <div class="fluency-item">10 - 4 = <span class="answer-box-small"></span></div>
  <div class="fluency-item">12 - 5 = <span class="answer-box-small"></span></div>
</div>
```

### Answer Boxes
- `<span class="answer-box-small"></span>` - for numbers
- `<span class="answer-box-word"></span>` - for Yes/No answers

## QUESTION TEMPLATES

### Q1: Simple Subtractions (2 parts)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Solve these subtractions.</p>
  <p class="sub-question">a) 7 - 2 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 8 - 4 = <span class="answer-box-small"></span></p>
</div>
```
**Answer:** X, Y (comma-separated)

### Q2: Fluency Grid (4 calculations)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Calculate each one.</p>
  <div class="fluency-grid">
    <div class="fluency-item">5 - 2 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">6 - 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">9 - 5 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">10 - 5 = <span class="answer-box-small"></span></div>
  </div>
</div>
```
**Answer:** A, B, C, D (order matters - left to right, top to bottom)

### Q3: Picture Subtraction (count and subtract)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count and subtract.</p>
  <div class="scene-box">
    <p style="font-size:32pt">🍎🍎🍎🍎🍎🍎🍎🍎</p>
    <p class="scene-title">8 apples</p>
  </div>
  <p class="sub-question">a) How many apples? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 3 apples are eaten. How many left? 8 - 3 = <span class="answer-box-small"></span></p>
</div>
```
**Answer:** P, Q (total count, subtraction result)

### Q4: Word Problems (2 stories)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has 6 balloons. 2 balloons pop. How many balloons are left?</span>
  </div>
  <p class="sub-question">a) Lily has <span class="answer-box-small"></span> balloons left.</p>
  <div class="word-problem-box" style="margin-top:15px">
    <span class="character-icon">🐶</span>
    <span class="story-text">There are 7 dogs. 4 dogs run away. How many dogs are left?</span>
  </div>
  <p class="sub-question">b) There are <span class="answer-box-small"></span> dogs left.</p>
</div>
```
**Answer:** M, N (story 1 answer, story 2 answer)

### Q5: Reasoning (True/False with follow-up)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Ben says:</strong> "If I know 4 + 6 = 10, then I also know 10 - 6 = 4"
    </div>
  </div>
  <p class="sub-question">a) Is Ben correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is 10 - 4? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** Yes/No, Z (judgment, related calculation)

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
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
```

## COMPLETE STRUCTURE
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subtracting within 20 - Year 1 {{difficulty}}</title>
  {{CSS}}
</head>
<body>
  <div class="worksheet-header">
    <h1 class="worksheet-title">Subtracting within 20 <span class="layout-badge">{{difficulty}}</span></h1>
    <p class="worksheet-details">Year 1 | Addition and Subtraction | Name: _______________ Date: _______________</p>
  </div>

  <!-- SECTION A: FLUENCY -->
  {{Section A Header}}
  {{Q1}}
  {{Q2}}

  <!-- SECTION B: APPLICATION -->
  {{Section B Header}}
  {{Q3}}
  {{Q4}}

  <!-- SECTION C: REASONING -->
  {{Section C Header}}
  {{Q5}}

  <!-- ANSWER KEY -->
  {{Answer Key}}
</body>
</html>
```

## EMOJI OPTIONS FOR SCENES
- Fruits: 🍎 🍊 🍌 🍓
- Animals: 🐶 🐱 🐦 🐟
- Objects: 🎈 ⭐ 🌟 🎁
- People: 👧 👦 👨 👩

## WORD PROBLEM CONTEXTS
- Balloons popping/flying away
- Eating fruits/cookies
- Giving away toys/stickers
- Animals leaving/running away
- Books returned to shelf
- Stars disappearing behind clouds

Generate worksheet NOW with correct answers.
