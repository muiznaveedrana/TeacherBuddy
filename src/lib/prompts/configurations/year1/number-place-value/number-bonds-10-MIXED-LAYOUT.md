# Ages 5-6: Number Bonds to 10 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 number bonds questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Odd one out, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1)
- **Number bonds to 10:** 0+10, 1+9, 2+8, 3+7, 4+6, 5+5
- **Key skill:** Instant recall of pairs that make 10
- **Visual representations:** Ten frames, part-whole models, dominoes
- **Key misconception:** Thinking 7+4=10 (confusing with 7+3)

## CSS (Compact - Mixed Layout)
```css
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
.ten-frame{display:inline-grid;grid-template-columns:repeat(5,1fr);gap:3px;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;margin:10px auto}
.frame-cell{width:35px;height:35px;border:2px solid #333;border-radius:4px;background:#fff}
.frame-cell.filled{background:#4CAF50}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.part-whole{display:flex;flex-direction:column;align-items:center;margin:15px auto}
.whole-circle{width:70px;height:70px;background:#FF9800;border:3px solid #F57C00;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;font-weight:bold;color:white}
.parts-row{display:flex;gap:20px;margin-top:15px}
.part-circle{width:55px;height:55px;border:3px solid #333;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20pt;font-weight:bold}
.part-filled{background:#4CAF50;color:white;border-color:#2E7D32}
.part-empty{background:#FFF9C4;border-style:dashed}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Ten frame**: Show filled cells, find missing to make 10
- **Part-whole model**: Show whole (10), one part filled, find missing part
- **Missing addend**: 3 equations with missing number (?+6=10, 8+?=10)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Quick bonds grid**: 4-6 equations to complete (3+?=10, 7+?=10)
- **Match pairs**: Match numbers to their bond partner
- **Fill in blanks**: Mixed equations with blanks

### Q3 OPTIONS (Application - Pick ONE):
- **Object context**: Counters/cookies/apples to count, find how many more to make 10
- **Story with pictures**: Visual story with objects showing bond

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem**: "Sam has 4 apples. How many more to make 10?"
- **Sharing problem**: "10 sweets shared, 6 on one plate, how many on other?"
- **Comparison**: "I have 3, you have ?, together we have 10"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Character makes claim about a bond
- **Fact family**: Complete related facts (3+7=10, 7+3=10, 10-3=7, 10-7=3)
- **Explain error**: Character makes mistake, explain why wrong

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Ten frame | 4 filled → 4+?=10 → 6 |
| Q2 | Quick bonds | 3+?=10, 5+?=10, 8+?=10, 1+?=10 → 7, 5, 2, 9 |
| Q3 | Apple context | 6 apples, how many more to make 10? → 4 |
| Q4 | Word problem | "Lily has 7 stickers. How many more to make 10?" → 3 |
| Q5 | True/False | "4+6=10" True, "3+8=10" False, "5+5=10" True |

### WS2: Varied (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Part-whole | Whole=10, Part=3, find other part → 7 |
| Q2 | Quick bonds | 2+?=10, 6+?=10, 9+?=10, 4+?=10 → 8, 4, 1, 6 |
| Q3 | Cookie context | 10 cookies needed, have 5, need ? more → 5 |
| Q4 | Sharing | "10 pencils, 4 in box, how many out?" → 6 |
| Q5 | Fact family | 2+8=10, 8+2=?, 10-2=?, 10-8=? → 10, 8, 2 |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Missing addend | ?+3=10, 7+?=10, ?+?=10 → 7, 3, varies |
| Q2 | Quick bonds | 1+?=10, 4+?=10, 7+?=10, 0+?=10 → 9, 6, 3, 10 |
| Q3 | Two-step | 10 sweets, ate 3, then 2 more, how many left? → 5 |
| Q4 | Comparison | "Tom: 6, Maya: ? Together: 10" → 4 |
| Q5 | Explain error | "Max says 7+4=10" → No, 7+3=10 |

## TEMPLATES

### Q1 - Ten Frame Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Count the counters. How many more to make 10?</p>
  <div style="text-align:center">
    <div class="ten-frame">
      <div class="frame-cell filled"></div>
      <div class="frame-cell filled"></div>
      <div class="frame-cell filled"></div>
      <div class="frame-cell filled"></div>
      <div class="frame-cell"></div>
      <div class="frame-cell"></div>
      <div class="frame-cell"></div>
      <div class="frame-cell"></div>
      <div class="frame-cell"></div>
      <div class="frame-cell"></div>
    </div>
  </div>
  <p class="sub-question">There are <span class="answer-box-small"></span> counters.</p>
  <p class="sub-question">I need <span class="answer-box-small"></span> more to make 10.</p>
</div>
```

### Q2 - Quick Bonds Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Fill in the missing numbers to make 10.</p>
  <div class="fluency-grid">
    <div class="fluency-item">3 + <span class="answer-box-small"></span> = 10</div>
    <div class="fluency-item">5 + <span class="answer-box-small"></span> = 10</div>
    <div class="fluency-item">8 + <span class="answer-box-small"></span> = 10</div>
    <div class="fluency-item">1 + <span class="answer-box-small"></span> = 10</div>
  </div>
</div>
```

### Q3 - Object Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count and solve.</p>
  <div class="scene-box">
    <p style="font-size:32pt">🍎🍎🍎🍎🍎🍎</p>
    <p class="scene-title">Apples on the table</p>
  </div>
  <p class="sub-question">There are <span class="answer-box-small"></span> apples.</p>
  <p class="sub-question">How many more apples to make 10? <span class="answer-box-small"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has 7 stickers. She wants 10 stickers. How many more does she need?</span>
  </div>
  <p class="sub-question">Lily needs <span class="answer-box-small"></span> more stickers.</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 4 + 6 = 10 <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 3 + 8 = 10 <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 5 + 5 = 10 <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Fact Family Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Complete the fact family for 2, 8, and 10.</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 2 + 8 = <span class="answer-box-small"></span></p>
    <p class="sub-question">b) 8 + 2 = <span class="answer-box-small"></span></p>
    <p class="sub-question">c) 10 - 2 = <span class="answer-box-small"></span></p>
    <p class="sub-question">d) 10 - 8 = <span class="answer-box-small"></span></p>
  </div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 4, 6</p>
  <p><strong>2.</strong> 7, 5, 2, 9</p>
  <p><strong>3.</strong> 6, 4</p>
  <p><strong>4.</strong> 3</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## NUMBER BONDS REFERENCE
| First | Second | Total |
|-------|--------|-------|
| 0 | 10 | 10 |
| 1 | 9 | 10 |
| 2 | 8 | 10 |
| 3 | 7 | 10 |
| 4 | 6 | 10 |
| 5 | 5 | 10 |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] All bonds sum to 10?
- [ ] Answer key comma-separated (no explanations)?
