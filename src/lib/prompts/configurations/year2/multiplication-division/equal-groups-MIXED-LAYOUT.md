# Ages 6-7: Equal Groups (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION (CRITICAL - READ FIRST)

**CHECK THE DIFFICULTY PARAMETER AND USE ONLY THAT THEME:**

**IF difficulty = "easy":**
- Title: "Equal Groups: Baking Fun!"
- Theme: Food/Baking
- Q1: 4 groups of 3 cookies
- Q2: 5 groups of 2 stars
- Q4: Baker Bella with cupcakes
- Q5: Chef Charlie

**IF difficulty = "average":**
- Title: "Equal Groups: Farm Adventure!"
- Theme: Animals/Farm
- Q1: 5 groups of 4 chickens
- Q2: 4 groups of 5 hearts
- Q4: Farmer Fred with sheep
- Q5: Zara the Zookeeper

**IF difficulty = "hard":**
- Title: "Equal Groups: School Challenge!"
- Theme: School
- Q1: 6 groups of 5 pencils
- Q2: 3 groups of 6 circles
- Q4: Teacher Tom with books
- Q5: Student Sally

## CSS (Mixed Layout - Compact):
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

/* EQUAL GROUPS VISUAL */
.groups-container{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px}
.group-circle{border:3px dashed #1976D2;border-radius:50%;padding:12px;display:flex;gap:4px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:70px;min-height:70px}
.group-box{border:3px solid #FF9800;border-radius:8px;padding:10px;display:flex;gap:4px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:60px}
.group-emoji{font-size:20pt}

/* CALCULATION BOX */
.calc-container{background:#F5F5F5;border-radius:8px;padding:12px;margin:12px 0;text-align:center}
.calc-line{font-size:16pt;margin:8px 0}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:12px;margin:12px 0;text-align:center}
.context-icon{font-size:32pt;margin-bottom:8px}
.context-number{font-size:20pt;font-weight:bold;color:#E65100}
.context-story{font-size:13pt;color:#333;margin:8px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:10px;flex:1}

/* ANSWER ELEMENTS */
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Basic equal groups skills
- Q1: Count objects in equal groups visually
- Q2: Identify groups, items per group, and calculate total

### Section B: Application (Q3-Q4) - Real-world problems
- Q3: Calculate from descriptions (3 calculations)
- Q4: Word problem with themed character

### Section C: Reasoning (Q5) - Commutative property challenge

## HTML TEMPLATES

### HEADER
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">Equal Groups<span class="layout-badge">Mixed Layout</span></h1>
  <div class="worksheet-details">Grade 2 / Year 2 (Ages 6-7) • Multiplication • [THEME] Theme</div>
</div>
```

### SECTION HEADERS
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>
```

### Q1: Count Equal Groups (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Count the groups. How many altogether?</p>
  <div class="groups-container">
    <div class="group-circle"><span class="group-emoji">🍪🍪🍪</span></div>
    <div class="group-circle"><span class="group-emoji">🍪🍪🍪</span></div>
    <div class="group-circle"><span class="group-emoji">🍪🍪🍪</span></div>
    <div class="group-circle"><span class="group-emoji">🍪🍪🍪</span></div>
  </div>
  <p class="sub-question">4 groups of 3 = <span class="answer-box-small"></span></p>
  <p class="sub-question">There are <span class="answer-box-small"></span> cookies altogether.</p>
</div>
```

### Q2: Identify and Calculate (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Look at the groups. Fill in the blanks.</p>
  <div class="groups-container">
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
  </div>
  <p class="sub-question">a) How many groups? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many in each group? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 5 x 2 = <span class="answer-box-small"></span></p>
</div>
```

### Q3: Calculate from Descriptions (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Work out the totals.</p>
  <div class="calc-container">
    <p class="calc-line">a) 3 groups of 5 = <span class="answer-box-small"></span></p>
    <p class="calc-line">b) 6 groups of 2 = <span class="answer-box-small"></span></p>
    <p class="calc-line">c) 4 groups of 10 = <span class="answer-box-small"></span></p>
  </div>
</div>
```

### Q4: Word Problem (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">🧁</div>
    <p class="context-story"><span class="character-name">Baker Bella</span> puts <strong>4 cupcakes</strong> on each plate.</p>
    <p class="context-story">She has <strong>6 plates</strong>.</p>
    <div class="context-number">6 x 4 = ?</div>
  </div>
  <p class="sub-question">How many cupcakes altogether? <span class="answer-box-small"></span></p>
</div>
```

### Q5: Reasoning Challenge (Commutative Property)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this correct?</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👨‍🍳</div>
      <div class="speech-bubble">
        <p><strong>Chef Charlie says:</strong> "5 groups of 3 is the same as 3 groups of 5."</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Is Chef Charlie correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) 5 groups of 3 = <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 3 groups of 5 = <span class="answer-box-small"></span></p>
</div>
```

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Baking Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 4 groups of 3 cookies 🍪 | 12, 12 |
| Q2 | 5 groups of 2 stars ⭐ | 5, 2, 10 |
| Q3 | a)3x5 b)6x2 c)4x10 | 15, 12, 40 |
| Q4 | Baker Bella: 6 plates x 4 cupcakes 🧁 | 24 |
| Q5 | "5 groups of 3 = 3 groups of 5" | Yes, 15, 15 |

**Answer Key**: 12, 12, 5, 2, 10, 15, 12, 40, 24, Yes, 15, 15

### Worksheet 2 (Average - Farm Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 5 groups of 4 chickens 🐔 | 20, 20 |
| Q2 | 4 groups of 5 hearts ♥ | 4, 5, 20 |
| Q3 | a)4x5 b)7x2 c)3x10 | 20, 14, 30 |
| Q4 | Farmer Fred: 5 pens x 6 sheep 🐑 | 30 |
| Q5 | "6 groups of 2 = 2 groups of 6" | Yes, 12, 12 |

**Answer Key**: 20, 20, 4, 5, 20, 20, 14, 30, 30, Yes, 12, 12

### Worksheet 3 (Hard - School Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 6 groups of 5 pencils ✏️ | 30, 30 |
| Q2 | 3 groups of 6 circles ●●●●●● | 3, 6, 18 |
| Q3 | a)5x5 b)8x2 c)6x10 | 25, 16, 60 |
| Q4 | Teacher Tom: 8 tables x 5 books 📚 | 40 |
| Q5 | "4 groups of 10 = 10 groups of 4" | Yes, 40, 40 |

**Answer Key**: 30, 30, 3, 6, 18, 25, 16, 60, 40, Yes, 40, 40

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 12, 12</p>
  <p><strong>2.</strong> 5, 2, 10</p>
  <p><strong>3.</strong> 15, 12, 40</p>
  <p><strong>4.</strong> 24</p>
  <p><strong>5.</strong> Yes, 15, 15</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: Visual groups with 2 answers (calculation + sentence)?
- [ ] Q2: THREE sub-questions (groups, items, total)?
- [ ] Q3: THREE calculations (a, b, c)?
- [ ] Q4: Word problem with themed character?
- [ ] Q5: Reasoning with YES/NO + two calculations?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+3+3+1+3 = 12 answers?

Generate complete HTML. UK Year 2 aligned.
