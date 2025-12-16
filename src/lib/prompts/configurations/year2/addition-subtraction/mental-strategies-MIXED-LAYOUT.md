# Ages 6-7: Mental Strategies (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 mental addition/subtraction questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Always/Sometimes/Never, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Strategies:** Doubles, Near doubles, Adding/subtracting 10, Bridging 10, Number bonds, Compensation
- **Range:** Within 100 (two-digit numbers)
- **Key skills:** Mental calculation, choosing efficient strategies, explaining reasoning
- **Key misconception:** Adding digits separately (27+15=312 instead of 42)

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
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.scene-objects{font-size:36pt;letter-spacing:8px}
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
- **Doubles**: 3 double calculations (5+5, 7+7, 9+9)
- **Missing numbers**: 3 equations with missing addend (?+6=13, 8+?=15, ?+?=14)
- **Near doubles**: 3 near-double calculations (6+7, 8+9, 15+16)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Add ones/tens grid**: 6 calculations mixing +1, +10, -1, -10
- **Subtraction grid**: 6 subtractions within 100
- **Mixed operations grid**: 6 calculations (add/subtract mix)

### Q3 OPTIONS (Application - Pick ONE):
- **Picture context**: Count objects in image, total with addition
- **Money context**: Coins to count and add
- **Shopping context**: Items with prices, find total

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (single step)**: Character has X, gets Y more, find total
- **Word problem (two step)**: Character has X, gets Y, then gives away Z
- **Comparison problem**: Two characters, find how many more/fewer

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Character makes claim about calculation
- **Always/Sometimes/Never**: Statement about adding/subtracting
- **Odd one out**: 4 calculations, find which doesn't belong

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Doubles | 5+5=10, 7+7=14, 9+9=18 |
| Q2 | Add ones/tens | 23+4=27, 45+10=55, 38+10=48, 72+10=82, 15+4=19, 64+10=74 |
| Q3 | Picture (cookies) | 12 cookies + 8 more = 20 total |
| Q4 | Single step | "Sam had 24 stickers, got 15 more" → 24+15=39 |
| Q5 | True/False | "7+7=14 and 8+8=14" → True, False, True |

### WS2: Practice (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Missing numbers | ?+7=13→6, 8+?=15→7, ?+?=14→7 |
| Q2 | Subtraction | 50-7=43, 46-8=38, 75-7=68, 52-7=45, 65-6=59, 71-7=64 |
| Q3 | Picture (cookies) | 15 cookies, ate 6, 15-6=9 left |
| Q4 | Two step | "Had 45, got 12 more, gave away 5" → 45+12=57, 57-5=52 |
| Q5 | Odd one out | A:15+15, B:20+10, C:10+19, D:14+16 → C (others=30) |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Near doubles | 6+7=13, 8+9=17, 15+16=31 |
| Q2 | Mixed | 54+10=64, 70-7=63, 68+10=78, 49-8=41, 62+10=72, 63-7=56 |
| Q3 | Fact family | 8+7=15, 7+8=15, 15-8=7, 15-7=8 |
| Q4 | Multi-step | "53 pages, read 15, then 10 more" → 53+15=68, 68-15=53 |
| Q5 | Always/Sometimes/Never | "Adding 10 changes the ones digit" → Sometimes, example: 5 |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Doubles Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Find the doubles.</p>
  <p class="sub-question">a) 5 + 5 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 7 + 7 = <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 9 + 9 = <span class="answer-box-small"></span></p>
</div>
```

### Q2 - Fluency Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Calculate each one.</p>
  <div class="fluency-grid">
    <div class="fluency-item">23 + 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">45 + 10 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">38 + 10 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">72 + 10 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">15 + 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">64 + 10 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Picture Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Look at the picture and solve.</p>
  <div class="scene-box">
    <div class="scene-objects">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <p class="scene-title">12 cookies on the plate</p>
    <div class="scene-objects" style="margin-top:10px">🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <p class="scene-title">8 more cookies added</p>
  </div>
  <p class="sub-question">a) How many cookies were there first? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many were added? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) How many cookies are there now? <span class="answer-box-small"></span> + <span class="answer-box-small"></span> = <span class="answer-box-small"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Sam</strong> had 24 stickers. His friend gave him 15 more stickers. How many stickers does Sam have now?</span>
  </div>
  <p class="sub-question">Sam now has <span class="answer-box-small"></span> stickers.</p>
  <p class="sub-question">Show your working: 24 + 15 = <span class="answer-box-small"></span></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 7 + 7 = 14 <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 8 + 8 = 14 <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 6 + 6 = 12 <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Odd One Out Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Which one doesn't belong?</p>
  <div class="reasoning-box">
    <div class="fluency-grid" style="grid-template-columns: repeat(4, 1fr);">
      <div class="fluency-item">A: 15+15</div>
      <div class="fluency-item">B: 20+10</div>
      <div class="fluency-item">C: 10+19</div>
      <div class="fluency-item">D: 14+16</div>
    </div>
  </div>
  <p class="sub-question">a) Which letter doesn't belong? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) What is the odd one's answer? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 10, 14, 18</p>
  <p><strong>2.</strong> 27, 55, 48, 82, 19, 74</p>
  <p><strong>3.</strong> 12, 8, 12, 8, 20</p>
  <p><strong>4.</strong> 39, 39</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
- [ ] Numbers within Year 2 range (within 100)?
