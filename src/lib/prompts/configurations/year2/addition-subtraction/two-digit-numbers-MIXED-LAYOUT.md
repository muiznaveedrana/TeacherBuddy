# Ages 6-7: Two-Digit Addition & Subtraction (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 two-digit addition/subtraction questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Explain thinking, Spot the mistake

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Range:** Two-digit numbers within 100
- **Operations:** Addition and subtraction
- **Methods:** Partitioning (tens and ones), mental strategies, number bonds
- **Key skills:** Add/subtract tens, add/subtract ones, bridging 10
- **Key misconception:** Adding digits separately (34+25=59→"3+2=5, 4+5=9" ignoring place value)

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
.partition-box{display:flex;justify-content:center;align-items:center;gap:8px;margin:10px 0}
.pv-tens{background:#FFEB3B;padding:8px 12px;border-radius:8px;font-weight:bold;font-size:16pt}
.pv-ones{background:#81C784;padding:8px 12px;border-radius:8px;font-weight:bold;font-size:16pt}
.operator{font-size:20pt;font-weight:bold;color:#333}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Addition grid**: 6 two-digit additions (e.g., 23+14, 35+22, etc.)
- **Partitioning**: Show partitioned numbers, find total
- **Missing number**: Addition equations with missing addend

### Q2 OPTIONS (Fluency - Pick ONE):
- **Subtraction grid**: 6 two-digit subtractions (e.g., 47-23, 58-15, etc.)
- **Subtraction partitioning**: Break down and subtract
- **Missing number**: Subtraction equations with missing value

### Q3 OPTIONS (Application - Pick ONE):
- **Addition word problem**: Character gains/collects items
- **Shopping context**: Add prices of items
- **Measurement context**: Add lengths or quantities

### Q4 OPTIONS (Application - Pick ONE):
- **Subtraction word problem**: Character gives away/uses items
- **Money change**: Pay and calculate change
- **Comparison**: Find the difference

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the mistake**: Character makes place value error
- **True/False**: Statements about addition/subtraction
- **Always/Sometimes/Never**: "Adding tens always increases the answer by 10"

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - School Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition grid | 23+14=37, 31+25=56, 42+16=58, 24+13=37, 35+22=57, 41+18=59 |
| Q2 | Subtraction grid | 47-23=24, 58-15=43, 69-26=43, 45-12=33, 56-24=32, 67-35=32 |
| Q3 | Word problem add | "Emma had 34 crayons, got 25 more" → 59 |
| Q4 | Word problem sub | "Leo had 56 stickers, gave away 23" → 33 |
| Q5 | Spot mistake | "Sam says 34+25=54 because 3+2=5 and 4+5=9" → No, 59 |

### WS2: Varied (Average - Pet Shop Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition grid | 38+27=65, 45+36=81, 29+34=63, 47+28=75, 36+45=81, 54+27=81 |
| Q2 | Subtraction grid | 63-28=35, 75-37=38, 84-49=35, 62-27=35, 73-38=35, 81-46=35 |
| Q3 | Word problem add | "Pet shop had 38 fish, got 27 more" → 65 |
| Q4 | Word problem sub | "Zara had 75 seeds, birds ate 37" → 38 |
| Q5 | Spot mistake | "Max says 63-28=45 because 6-2=4 and 8-3=5" → No, 35 |

### WS3: Challenge (Hard - Space Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition grid | 56+37=93, 48+45=93, 67+28=95, 59+34=93, 75+18=93, 64+29=93 |
| Q2 | Subtraction grid | 84-47=37, 92-56=36, 81-45=36, 93-58=35, 72-36=36, 85-49=36 |
| Q3 | Word problem add | "Astronaut found 56 moon rocks, then 37 more" → 93 |
| Q4 | Word problem sub | "Spaceship had 84 fuel units, used 47" → 37 |
| Q5 | Spot mistake | "Robot says 84-47=43 because 8-4=4 and 7-4=3" → No, 37 |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Addition Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Solve these additions.</p>
  <div class="fluency-grid">
    <div class="fluency-item">23 + 14 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">31 + 25 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">42 + 16 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">24 + 13 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">35 + 22 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">41 + 18 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q2 - Subtraction Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Solve these subtractions.</p>
  <div class="fluency-grid">
    <div class="fluency-item">47 - 23 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">58 - 15 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">69 - 26 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">45 - 12 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">56 - 24 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">67 - 35 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Addition Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Emma</strong> had 34 crayons. She got 25 more crayons for her birthday. How many crayons does Emma have now?</span>
  </div>
  <p class="sub-question">Emma has <span class="answer-box-small"></span> crayons now.</p>
</div>
```

### Q4 - Subtraction Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Leo</strong> had 56 stickers. He gave 23 stickers to his friend. How many stickers does Leo have left?</span>
  </div>
  <p class="sub-question">Leo has <span class="answer-box-small"></span> stickers left.</p>
</div>
```

### Q5 - Spot the Mistake Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Spot the mistake.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Sam says:</strong> "34 + 25 = 54 because 3 + 2 = 5 and 4 + 5 = 9"
    </div>
  </div>
  <p class="sub-question">a) Is Sam correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) What is the correct answer? 34 + 25 = <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 37, 56, 58, 37, 57, 59</p>
  <p><strong>2.</strong> 24, 43, 43, 33, 32, 32</p>
  <p><strong>3.</strong> 59</p>
  <p><strong>4.</strong> 33</p>
  <p><strong>5.</strong> No, 59</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## TWO-DIGIT CALCULATION TIPS
- **No regrouping (easy):** 23+14, 45-23 (no carrying/borrowing)
- **With regrouping (harder):** 38+27, 63-28 (carrying tens, borrowing)
- **Bridging 10:** When ones add to more than 10, or subtraction requires borrowing

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Q5 tests place value misconception?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
- [ ] Numbers within Year 2 range (two-digit, within 100)?
