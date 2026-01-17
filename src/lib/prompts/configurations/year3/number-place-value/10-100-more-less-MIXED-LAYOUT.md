# Ages 7-8: 10 More/Less, 100 More/Less (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 3 place value questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3 - White Rose Maths Autumn Block 1, Step 9)

**National Curriculum Objective:** Find 10 or 100 more or less than a given number

- **Range:** Numbers 100-999 (three-digit numbers)
- **Key skills:**
  - Find 10 more than a given number
  - Find 10 less than a given number
  - Find 100 more than a given number
  - Find 100 less than a given number
- **Key concepts:**
  - When adding/subtracting 10, only the TENS digit changes
  - When adding/subtracting 100, only the HUNDREDS digit changes
  - Understanding what happens when bridging 100s (e.g., 195 + 10 = 205)
  - Zero placeholder awareness (e.g., 400 + 10 = 410)

**Common Misconceptions (MUST address in Q5):**
1. Thinking ALL digits change when adding 10 or 100
2. Confusion with bridging (295 + 10 becoming 395 instead of 305)
3. Not understanding that 10 less than 300 is 290, not 200
4. Adding a zero instead of changing the digit (400 + 10 = 4010)
5. Confusing "10 more" with "add a 1 to the tens column"

**Representations:**
- Number lines with jumps of 10 or 100
- Place value charts showing digit changes
- Base-10 blocks (add/remove rods or flats)
- Arrow diagrams (+10, -10, +100, -100)

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
.number-machine{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px 0;flex-wrap:wrap}
.machine-input{padding:10px 15px;border:2px solid #333;border-radius:8px;background:#E3F2FD;font-size:16pt;font-weight:bold;min-width:60px;text-align:center}
.machine-arrow{font-size:24pt;color:#4169E1}
.machine-operation{padding:8px 15px;border:2px solid #4169E1;border-radius:8px;background:#FFF;font-size:14pt;font-weight:bold;color:#4169E1}
.machine-output{padding:10px 15px;border:2px solid #333;border-radius:8px;background:#FFF9C4;font-size:16pt;font-weight:bold;min-width:60px;text-align:center}
.grid-container{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0;max-width:400px}
.grid-item{padding:12px;border:2px solid #333;border-radius:8px;text-align:center;font-size:14pt}
.grid-header{background:#4169E1;color:white;font-weight:bold}
.grid-number{background:#E3F2FD;font-weight:bold}
.grid-answer{background:#FFF9C4}
.number-line-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.number-line{display:flex;align-items:center;justify-content:center;gap:20px;font-size:18pt;font-weight:bold;margin:10px 0}
.jump-arrow{color:#4169E1;font-size:14pt}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:12px;padding:10px;margin:8px 0;position:relative}
.pv-chart{display:inline-block;border:3px solid #333;border-radius:8px;overflow:hidden;margin:10px 0}
.pv-row{display:flex}
.pv-cell{padding:12px 20px;text-align:center;font-size:16pt;font-weight:bold;border:1px solid #333;min-width:50px}
.pv-header{background:#4169E1;color:#FFF;font-size:14pt}
.pv-hundreds{background:#FFF3E0;color:#F57C00}
.pv-tens{background:#E3F2FD;color:#1976D2}
.pv-ones{background:#E8F5E9;color:#2E7D32}
.highlight-change{background:#FFEB3B !important;border:3px solid #F44336 !important}
.answer-box{display:inline-block;min-width:60px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:45px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Number machine**: Input → +10 / -10 / +100 / -100 → Output
- **Quick fire grid**: 3 numbers, find 10 more AND 10 less for each
- **Fill the gap**: 356 + 10 = ___, 420 - 100 = ___

### Q2 OPTIONS (Fluency - Pick ONE):
- **Two-step operations**: 245 → +10 → ___ → +100 → ___
- **Complete the pattern**: 245, 255, 265, ___, ___, ___
- **Mixed operations**: Find 10 more, then 100 less

### Q3 OPTIONS (Application - Pick ONE):
- **Counting context**: Library books, sports points, money (in pence)
- **Step counting**: "Start at 350, take 3 jumps of 10. Where do you land?"
- **Number line jumps**: Show jumps and find final position

### Q4 OPTIONS (Application - Pick ONE):
- **Two-step word problem**: "Sam has 456 stickers. Gets 10 more, then loses 100."
- **Comparison**: "Which is bigger: 350 + 10 or 350 + 100?"
- **Real-world context**: Prices changing by £10 or £100

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False with bridging**: "10 more than 295 is 395" (False - it's 305)
- **Explain mistake**: "Amy says 10 less than 400 is 300" (Wrong - it's 390)
- **Which digit changes?**: "When finding 100 more, which column changes?"

## 6 WORKSHEET VARIATIONS (2 Foundation + 4 Practice)

### WS1: Foundation 1 - Pet Shop (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Number machine (+10) | 120→130, 245→255, 350→360 (simple +10 only) |
| Q2 | Grid: 10 more/less | 230, 450, 670 - find 10 more and 10 less for each |
| Q3 | Pet counting | "The pet shop has 340 fish. 10 more arrive. How many now?" |
| Q4 | Two-step simple | "Start: 250. Add 10. How many? Add 10 more. How many?" |
| Q5 | True/False simple | "10 more than 340 is 350" (True), "10 less than 500 is 400" (False) |

**Answers:** Q1: 130, 255, 360 | Q2: 240, 220, 460, 440, 680, 660 | Q3: 350 | Q4: 260, 270 | Q5: True, False

### WS2: Foundation 2 - Sweet Factory (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Number machine (+100) | 234→334, 156→256, 500→600 (simple +100 only) |
| Q2 | Grid: 100 more/less | 345, 620, 450 - find 100 more and 100 less for each |
| Q3 | Sweet jars | "Factory has 450 sweets. Makes 100 more. Total?" |
| Q4 | Comparison | "345 + 100 = ___ and 345 + 10 = ___. Which is more?" |
| Q5 | Which changes? | "When adding 100 to 356, which digit changes? H, T, or O?" |

**Answers:** Q1: 334, 256, 600 | Q2: 445, 245, 720, 520, 550, 350 | Q3: 550 | Q4: 445, 355, 445 | Q5: H

### WS3: Practice 1 - Sports Day (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed number machine | 347: +10→357, -100→247, +100→447, -10→337 |
| Q2 | Pattern completion | 265, 275, 285, ___, ___, ___ (counting in 10s) |
| Q3 | Points scored | "Red team: 345 points. Get 100 bonus. Then lose 10. Final score?" |
| Q4 | Number line jumps | "Start at 420, make 3 jumps of -10. Where do you land?" |
| Q5 | True/False bridging | "10 more than 295 is 305" (True), "100 less than 305 is 105" (False) |

**Answers:** Q1: 357, 247, 447, 337 | Q2: 295, 305, 315 | Q3: 435 | Q4: 390 | Q5: True, False

### WS4: Practice 2 - Toy Shop (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Two-step machine | 256 → +10 → ___ → +100 → ___, 480 → -100 → ___ → -10 → ___ |
| Q2 | Grid all four | 372: 10 more, 10 less, 100 more, 100 less |
| Q3 | Money problem | "Toy costs 549p. Price goes up by 10p. Then up by 100p. New price?" |
| Q4 | Backwards working | "___ + 100 = 567" and "___ - 10 = 340" |
| Q5 | Explain mistake | "Ben says: 10 less than 500 is 400." Why is Ben wrong? Correct answer? |

**Answers:** Q1: 266, 366, 380, 370 | Q2: 382, 362, 472, 272 | Q3: 659 | Q4: 467, 350 | Q5: False, 490

### WS5: Practice 3 - Library (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Reverse: find start | ___ + 10 = 375, ___ - 100 = 283, ___ + 100 = 600 |
| Q2 | Pattern with bridging | 185, 195, 205, ___, ___, ___ (bridges 200) |
| Q3 | Book counting | "Library has 496 books. 10 returned, 100 new. How many now?" |
| Q4 | Multi-step | "Start: 305. -10, then -100, then +10. Final number?" |
| Q5 | Always/Sometimes/Never | "When finding 10 more, the ones digit changes" - A/S/N? |

**Answers:** Q1: 365, 383, 500 | Q2: 215, 225, 235 | Q3: 586 | Q4: 205 | Q5: Never

### WS6: Practice 4 - Space Mission (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | All four operations | Start: 456. Find: +10, -10, +100, -100 |
| Q2 | Two patterns | 390, 400, 410, ___ AND 640, 540, 440, ___ |
| Q3 | Distance counting | "Rocket at 385km. Travels 100km more, then 10km less. Position?" |
| Q4 | Place value chart | Show 347, then show what happens when adding 100 (highlight H column) |
| Q5 | Explain bridging | "Why does 295 + 10 = 305 and NOT 395? Which digits change?" |

**Answers:** Q1: 466, 446, 556, 356 | Q2: 420, 340 | Q3: 475 | Q4: 4, 4, 7 | Q5: T and H, the tens become 0 and hundreds go up by 1

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Number Machine Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Complete the number machine.</p>
  <div class="number-machine">
    <div class="machine-input">347</div>
    <div class="machine-arrow">→</div>
    <div class="machine-operation">+ 10</div>
    <div class="machine-arrow">→</div>
    <div class="machine-output"><span class="answer-box-small"></span></div>
  </div>
  <div class="number-machine">
    <div class="machine-input">456</div>
    <div class="machine-arrow">→</div>
    <div class="machine-operation">+ 100</div>
    <div class="machine-arrow">→</div>
    <div class="machine-output"><span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q2 - Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Complete the grid.</p>
  <div class="grid-container">
    <div class="grid-item grid-header">Number</div>
    <div class="grid-item grid-header">10 More</div>
    <div class="grid-item grid-header">10 Less</div>
    <div class="grid-item grid-number">345</div>
    <div class="grid-item grid-answer"><span class="answer-box-small"></span></div>
    <div class="grid-item grid-answer"><span class="answer-box-small"></span></div>
    <div class="grid-item grid-number">560</div>
    <div class="grid-item grid-answer"><span class="answer-box-small"></span></div>
    <div class="grid-item grid-answer"><span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">👨‍🏫</span>
    <span class="story-text">The library has <strong>496</strong> books. <strong>10</strong> books are returned. Then <strong>100</strong> new books arrive.</span>
  </div>
  <p class="sub-question">How many books are there now? <span class="answer-box"></span></p>
</div>
```

### Q4 - Number Line Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Follow the jumps.</p>
  <div class="number-line-box">
    <p>Start at <strong>420</strong>. Make <strong>3 jumps of -10</strong>.</p>
    <div class="number-line">
      <span>420</span>
      <span class="jump-arrow">-10→</span>
      <span class="answer-box-small"></span>
      <span class="jump-arrow">-10→</span>
      <span class="answer-box-small"></span>
      <span class="jump-arrow">-10→</span>
      <span class="answer-box-small"></span>
    </div>
  </div>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 10 more than 295 is 305. <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 100 less than 305 is 105. <span class="answer-box-word"></span></p>
    <p class="sub-question">c) When finding 10 more, only the tens digit changes. <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Explain Mistake Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find and fix the mistake.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <span class="story-text">"10 less than 500 is 400"</span>
    </div>
  </div>
  <p class="sub-question">a) Is Amy correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) What is 10 less than 500? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) What is 100 less than 500? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 357, 556</p>
  <p><strong>2.</strong> 355, 335, 570, 550</p>
  <p><strong>3.</strong> 586</p>
  <p><strong>4.</strong> 410, 400, 390</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers and colors?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
- [ ] Numbers within Year 3 range (100-999)?
- [ ] Named character used in context questions?
- [ ] Q5 tests misconception (bridging, which digit changes)?
- [ ] Theme consistent throughout worksheet?
- [ ] Bridging examples included (e.g., 295+10=305)?
- [ ] Zero placeholder awareness (400+10=410)?
