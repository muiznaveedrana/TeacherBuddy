# Ages 6-7: Times Tables 2, 5, 10 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 times tables questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Pattern spotting, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Tables:** 2, 5, 10 only (up to ×12)
- **Concept:** Multiplication as repeated addition and equal groups
- **Patterns:** 2s=always even, 5s=end in 0 or 5, 10s=end in 0
- **Key misconception:** Confusing × with + (3×5=8 instead of 15)

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
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:15pt}
.array-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.array-row{font-size:28pt;margin:5px 0;letter-spacing:8px}
.array-label{font-size:12pt;color:#666;margin-top:10px}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Array visual**: Show emoji array, count total
- **Repeated addition**: Convert addition to multiplication (5+5+5 = ? and 3×5 = ?)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Times tables grid**: 6 calculations (mix of 2s, 5s, 10s)
- **Missing number**: 6 equations with missing factor or product

### Q3 OPTIONS (Application - Pick ONE):
- **Equal groups**: Picture showing groups of objects, count total
- **Array context**: Real-world array (seats in rows, tiles, etc.)

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (single)**: "X bags with Y items each, how many total?"
- **Word problem (comparison)**: "Who has more? By how much?"
- **Money context**: "5p coins, how much altogether?"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False misconception**: Character says "4×5=9 because 4+5=9"
- **Pattern spotting**: "What do all answers in the 5 times table have in common?"
- **Explain error**: Character makes multiplication error, explain why wrong

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Food Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Array | 3 rows of 5 apples 🍎 → 15 |
| Q2 | Grid | 2×3, 5×4, 10×3, 2×5, 5×2, 10×2 → 6, 20, 30, 10, 10, 20 |
| Q3 | Equal groups | 4 plates with 5 cookies each → 20 |
| Q4 | Word problem | "Chef has 6 trays with 10 muffins" → 60 |
| Q5 | Misconception | "3×5=8 because 3+5=8" → No, 15 |

### WS2: Varied (Average - Animal Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Repeated add | 2+2+2+2+2=? and 5×2=? → 10, 10 |
| Q2 | Grid | 6×2, 8×5, 5×10, 7×2, 6×5, 7×10 → 12, 40, 50, 14, 30, 70 |
| Q3 | Array context | 5 rows of 5 butterflies → 25 |
| Q4 | Word problem | "8 pens with 5 chickens each" → 40 |
| Q5 | Misconception | "7×2=9 because 7+2=9" → No, 14 |

### WS3: Challenge (Hard - Space Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Array | 6 rows of 10 rockets 🚀 → 60 |
| Q2 | Grid | 9×2, 11×5, 9×10, 12×2, 8×5, 11×10 → 18, 55, 90, 24, 40, 110 |
| Q3 | Equal groups | 7 spaceships with 10 astronauts → 70 |
| Q4 | Word problem | "12 craters with 2 moon rocks each" → 24 |
| Q5 | Misconception | "9×10=19 because 9+10=19" → No, 90 |

## TEMPLATES

### Q1 - Array Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>How many apples in total? Count the rows and columns.</p>
  <div class="array-container">
    <div class="array-row">🍎🍎🍎🍎🍎</div>
    <div class="array-row">🍎🍎🍎🍎🍎</div>
    <div class="array-row">🍎🍎🍎🍎🍎</div>
    <p class="array-label">3 rows of 5</p>
  </div>
  <p class="sub-question">Total: <span class="answer-box-small"></span> apples</p>
</div>
```

### Q1 - Repeated Addition Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Complete the repeated addition and multiplication.</p>
  <p class="sub-question">a) 2 + 2 + 2 + 2 + 2 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) This is the same as 5 × 2 = <span class="answer-box-small"></span></p>
</div>
```

### Q2 - Times Tables Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Solve these multiplications.</p>
  <div class="fluency-grid">
    <div class="fluency-item">2 × 3 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">5 × 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">10 × 3 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">2 × 5 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">5 × 2 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">10 × 2 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Equal Groups Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count the equal groups.</p>
  <div class="scene-box">
    <p style="font-size:28pt">🍪🍪🍪🍪🍪 &nbsp; 🍪🍪🍪🍪🍪 &nbsp; 🍪🍪🍪🍪🍪 &nbsp; 🍪🍪🍪🍪🍪</p>
    <p class="scene-title">4 plates with 5 cookies each</p>
  </div>
  <p class="sub-question">How many cookies altogether? <span class="answer-box-small"></span> cookies</p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👨‍🍳</span>
    <span class="story-text"><strong>Chef Charlie</strong> has 6 trays. Each tray has 10 muffins. How many muffins are there altogether?</span>
  </div>
  <p class="sub-question">6 × 10 = <span class="answer-box-small"></span> muffins</p>
</div>
```

### Q5 - Misconception Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Look at what Max says.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Max says:</strong> "3 × 5 = 8 because 3 + 5 = 8"
    </div>
  </div>
  <p class="sub-question">a) Is Max correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is 3 × 5? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 15</p>
  <p><strong>2.</strong> 6, 20, 30, 10, 10, 20</p>
  <p><strong>3.</strong> 20</p>
  <p><strong>4.</strong> 60</p>
  <p><strong>5.</strong> No, 15</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## TIMES TABLES REFERENCE
| × | 2 | 5 | 10 |
|---|---|---|---|
| 1 | 2 | 5 | 10 |
| 2 | 4 | 10 | 20 |
| 3 | 6 | 15 | 30 |
| 4 | 8 | 20 | 40 |
| 5 | 10 | 25 | 50 |
| 6 | 12 | 30 | 60 |
| 7 | 14 | 35 | 70 |
| 8 | 16 | 40 | 80 |
| 9 | 18 | 45 | 90 |
| 10 | 20 | 50 | 100 |
| 11 | 22 | 55 | 110 |
| 12 | 24 | 60 | 120 |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Only 2, 5, 10 times tables used?
- [ ] Q5 tests × vs + misconception?
- [ ] Answer key comma-separated (no explanations)?
