# Ages 6-7: Equal Groups (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION (CRITICAL - READ FIRST)

**CHECK THE DIFFICULTY PARAMETER AND USE ONLY THAT THEME:**

**IF difficulty = "easy":**
- Title: "Equal Groups: Baking Fun!"
- Q1: Use 🍪 cookies (4 groups of 3 = 12)
- Q2: Use ⭐ stars (5 groups of 2 = 10)
- Q4: Baker Bella with 🧁 cupcakes
- Q5: Chef Charlie

**IF difficulty = "average":**
- Title: "Equal Groups: Farm Adventure!"
- Q1: Use 🐔 chickens (5 groups of 4 = 20)
- Q2: Use ♥ hearts (4 groups of 5 = 20)
- Q4: Farmer Fred with 🐑 sheep
- Q5: Zara the Zookeeper

**IF difficulty = "hard":**
- Title: "Equal Groups: School Challenge!"
- Q1: Use ✏️ pencils (6 groups of 5 = 30)
- Q2: Use ● circles (3 groups of 6 = 18)
- Q4: Teacher Tom with 📚 books
- Q5: Student Sally

**FAILURE TO FOLLOW THE CORRECT THEME = INVALID WORKSHEET**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Concept:** Multiplication as equal groups
- **Language:** "groups of", "in each group", "altogether"
- **Visual:** Circles/boxes containing objects, emoji arrays
- **Interactive Priority:** All answers must be typed numbers or single letters
- **Key Misconception:** Confusing number of groups with number in each group

## QUESTION TYPES (CPA Progression)

**Q1**: Concrete - Count equal groups (visual with circles/boxes containing emojis)
**Q2**: Pictorial - Identify groups and items from visual, write multiplication (THREE sub-questions)
**Q3**: Abstract - Calculate from description "X groups of Y"
**Q4**: Real-world context with themed character
**Q5**: Reasoning challenge - character confuses groups vs items per group

## CSS (Compact - Interactive Optimised):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* EQUAL GROUPS VISUAL */
.groups-container{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.group-circle{border:3px dashed #1976D2;border-radius:50%;padding:15px;display:flex;gap:5px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:80px;min-height:80px}
.group-box{border:3px solid #FF9800;border-radius:8px;padding:10px;display:flex;gap:5px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:70px}
.group-emoji{font-size:24pt}

/* CALCULATION BOX */
.calc-container{background:#F5F5F5;border-radius:8px;padding:15px;margin:15px 0;text-align:center}
.calc-line{font-size:18pt;margin:10px 0}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.context-icon{font-size:36pt;margin-bottom:10px}
.context-number{font-size:24pt;font-weight:bold;color:#E65100}
.context-story{font-size:14pt;color:#333;margin:10px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:12px;flex:1;position:relative}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #66BB6A transparent transparent}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:55px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## TEMPLATES

### Q1: Concrete (Count Equal Groups)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Count the groups. How many altogether?</p>
  <div class="groups-container">
    <div class="group-circle"><span class="group-emoji">🍎🍎🍎</span></div>
    <div class="group-circle"><span class="group-emoji">🍎🍎🍎</span></div>
    <div class="group-circle"><span class="group-emoji">🍎🍎🍎</span></div>
    <div class="group-circle"><span class="group-emoji">🍎🍎🍎</span></div>
  </div>
  <p class="sub-question">Total: <span class="answer-box"></span> apples</p>
</div>
```

### Q2: Pictorial (Identify and Calculate - THREE sub-questions)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Look at the groups. Fill in the blanks.</p>
  <div class="groups-container">
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
    <div class="group-box"><span class="group-emoji">⭐⭐</span></div>
  </div>
  <p class="sub-question">a) How many groups? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many in each group? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) Total: 5 × 2 = <span class="answer-box"></span></p>
</div>
```

### Q3: Abstract (Calculate from Description)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Work out the totals.</p>
  <div class="calc-container">
    <p class="calc-line">a) 3 groups of 5 = <span class="answer-box"></span></p>
    <p class="calc-line">b) 6 groups of 2 = <span class="answer-box"></span></p>
    <p class="calc-line">c) 4 groups of 10 = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q4: Real-World Context (THEMED)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">🧁</div>
    <p class="context-story"><span class="character-name">Baker Bella</span> puts <strong>4 cupcakes</strong> on each plate.</p>
    <p class="context-story">She has <strong>6 plates</strong>.</p>
    <div class="context-number">6 plates × 4 cupcakes</div>
  </div>
  <p class="sub-question">How many cupcakes altogether? <span class="answer-box"></span> cupcakes</p>
</div>
```

### Q5: Reasoning Challenge (Tests Misconception)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Look at what Tommy says.</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👦</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Tommy says:</strong> "5 groups of 3 is the same as 3 groups of 5"</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Is Tommy correct? <span class="answer-box-small"></span> (Yes / No)</p>
  <p class="sub-question">b) 5 groups of 3 = <span class="answer-box"></span></p>
  <p class="sub-question">c) 3 groups of 5 = <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Smaller numbers, Food Theme)
**Characters**: Baker Bella, Chef Charlie

| Q | Details |
|---|---------|
| Q1 | 4 groups of 3 cookies 🍪 (12 total) |
| Q2 | 5 groups of 2 stars ⭐ → a)5 b)2 c)5×2=10 |
| Q3 | a)3×5=15 b)6×2=12 c)4×10=40 |
| Q4 | Baker Bella: 6 plates × 4 cupcakes 🧁 = 24 |
| Q5 | "5 groups of 3 = 3 groups of 5" - YES! (both 15, commutative) |

**Answer Key**:
- Q1: 12 (4 groups × 3 = 12 cookies)
- Q2: a) 5  b) 2  c) 10
- Q3: a) 15  b) 12  c) 40
- Q4: 24 cupcakes (6 × 4 = 24)
- Q5: a) Yes  b) 15  c) 15 (both equal 15 - multiplication is commutative!)

### Worksheet 2 (Average - Medium numbers, Animal Theme)
**Characters**: Farmer Fred, Zara the Zookeeper

| Q | Details |
|---|---------|
| Q1 | 5 groups of 4 chickens 🐔 (20 total) |
| Q2 | 4 groups of 5 hearts ♥ → a)4 b)5 c)4×5=20 |
| Q3 | a)4×5=20 b)7×2=14 c)3×10=30 |
| Q4 | Farmer Fred: 5 pens × 6 sheep 🐑 = 30 |
| Q5 | "6 groups of 2 = 2 groups of 6" - YES! (both 12) |

**Answer Key**:
- Q1: 20 (5 groups × 4 = 20 chickens)
- Q2: a) 4  b) 5  c) 20
- Q3: a) 20  b) 14  c) 30
- Q4: 30 sheep (5 × 6 = 30)
- Q5: a) Yes  b) 12  c) 12 (both equal 12 - multiplication is commutative!)

### Worksheet 3 (Hard - Larger numbers, School Theme)
**Characters**: Teacher Tom, Student Sally

| Q | Details |
|---|---------|
| Q1 | 6 groups of 5 pencils ✏️ (30 total) |
| Q2 | 3 groups of 6 circles ● → a)3 b)6 c)3×6=18 |
| Q3 | a)5×5=25 b)8×2=16 c)6×10=60 |
| Q4 | Teacher Tom: 8 tables × 5 books 📚 = 40 |
| Q5 | "4 groups of 10 = 10 groups of 4" - YES! (both 40) |

**Answer Key**:
- Q1: 30 (6 groups × 5 = 30 pencils)
- Q2: a) 3  b) 6  c) 18
- Q3: a) 25  b) 16  c) 60
- Q4: 40 books (8 × 5 = 40)
- Q5: a) Yes  b) 40  c) 40 (both equal 40 - multiplication is commutative!)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 20 (5 groups × 4 = 20 chickens)</p>
  <p><strong>2.</strong> a) 4 &nbsp; b) 5 &nbsp; c) 20</p>
  <p><strong>3.</strong> a) 20 &nbsp; b) 14 &nbsp; c) 30</p>
  <p><strong>4.</strong> 30 sheep (5 × 6 = 30)</p>
  <p><strong>5.</strong> a) Yes &nbsp; b) 12 &nbsp; c) 12 (both equal - commutative property!)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b, c) - each gets its own answer in key
4. **Q2 has THREE sub-questions**: groups, items per group, multiplication
5. **Q3 has THREE calculations**: different combinations
6. **Q5 tests commutative property** - "X groups of Y = Y groups of X"
7. **Themed characters** - use names from theme variation
8. **Use emojis** for group items matching the theme
9. **NO drawing activities** - all answers typed in boxes
10. **NO "circle" instructions** - use answer boxes

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Visual groups with ONE answer box (total)?
- [ ] Q2: Visual with THREE sub-questions (a, b, c)?
- [ ] Q3: THREE calculation questions (a, b, c)?
- [ ] Q4: Themed context with character name?
- [ ] Q5: Reasoning with THREE answers (Yes/No + two calculations)?
- [ ] ALL answer boxes use `.answer-box` or `.answer-box-small` class?
- [ ] Answer key uses a) b) c) format for multi-part questions?
- [ ] NO drawing activities (Q2 changed to fill-in-blank)?
- [ ] NO "circle" instructions (all typed answers)?
- [ ] Total answer count: 1 + 3 + 3 + 1 + 3 = 11 answers?

Generate complete HTML. UK Year 2 aligned. Use themed characters throughout.
