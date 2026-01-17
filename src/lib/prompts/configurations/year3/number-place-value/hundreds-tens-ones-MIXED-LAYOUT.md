# Ages 7-8: Hundreds, Tens, Ones (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 3 place value questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Numbers 100-999 (three-digit numbers)
- **Key skills:** Recognise place value in 3-digit numbers (hundreds, tens, ones)
- **Key concepts:** Partition numbers, identify digit values, read/write 3-digit numbers
- **Representations:** Base-10 blocks (flats, rods, cubes), place value charts
- **Key misconceptions:**
  - Writing "three hundred and four" as 3004 (zero placeholder error)
  - Thinking the digit "5" in 356 means 5, not 50 (face value vs place value)
  - Confusing digit position with digit value

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
.pv-chart{display:inline-block;border:3px solid #333;border-radius:8px;overflow:hidden;margin:10px 0}
.pv-row{display:flex}
.pv-cell{padding:12px 20px;text-align:center;font-size:16pt;font-weight:bold;border:1px solid #333;min-width:60px}
.pv-header{background:#4169E1;color:#FFF;font-size:14pt}
.pv-hundreds{background:#FFF3E0;color:#F57C00}
.pv-tens{background:#E3F2FD;color:#1976D2}
.pv-ones{background:#E8F5E9;color:#2E7D32}
.base10-visual{display:flex;justify-content:center;gap:20px;margin:15px 0;padding:15px;background:#FFF8E1;border-radius:8px;flex-wrap:wrap}
.block-group{text-align:center}
.block-label{font-size:11pt;font-weight:bold;margin-bottom:5px}
.hundreds-label{color:#F57C00}
.tens-label{color:#1976D2}
.ones-label{color:#2E7D32}
.hundred-flat{width:50px;height:50px;background:#FF9800;border:2px solid #F57C00;border-radius:4px;display:inline-block;margin:2px}
.ten-rod{width:50px;height:8px;background:#2196F3;border:1px solid #1565C0;border-radius:2px;display:block;margin:2px auto}
.one-cube{width:8px;height:8px;background:#4CAF50;border:1px solid #2E7D32;border-radius:1px;display:inline-block;margin:1px}
.partition-equation{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0;flex-wrap:wrap;font-size:18pt;font-weight:bold}
.partition-box{padding:8px 15px;border:2px solid #333;border-radius:6px;background:#FFF}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.scene-box{background:#FAFAFA;border-radius:8px;padding:12px;margin:10px 0;text-align:center}
.scene-objects{font-size:32pt;letter-spacing:5px;margin:10px 0}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:12px;padding:10px;margin:8px 0;position:relative}
.answer-box{display:inline-block;min-width:60px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:45px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Place value chart**: Fill in H, T, O for given numbers (e.g., 356 → H:3, T:5, O:6)
- **Digit value identification**: "What is the value of the digit 4 in 247?" → 40
- **Base-10 representation**: Count flats, rods, cubes shown

### Q2 OPTIONS (Fluency - Pick ONE):
- **Partitioning**: 456 = ___ + ___ + ___ (break into hundreds, tens, ones)
- **Make the number**: "__ hundreds, __ tens, __ ones makes ___"
- **Compare digits**: "Which digit is in the tens place in 829?"

### Q3 OPTIONS (Application - Pick ONE):
- **Counting context**: Character counts objects in groups of 100, 10, and 1
- **Real-world numbers**: Prices, page numbers, distances using 3-digit numbers
- **Base-10 blocks story**: Build a number from described blocks

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (partitioning)**: "A shop has 3 boxes of 100 pencils, 4 packs of 10, and 7 single pencils"
- **Comparison context**: Compare quantities using place value understanding
- **Two-step problem**: Identify digits AND calculate total value

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Statements about place value (e.g., "In 305, the 0 means there are no tens")
- **Explain mistake**: Character writes "three hundred and four" as 3004
- **Always/Sometimes/Never**: "A 3-digit number always has 3 hundreds"

## 6 WORKSHEET VARIATIONS

### WS1: Zoo Safari (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Place value chart | 245, 381, 509 → fill H, T, O |
| Q2 | Partitioning | 362=300+60+2, 417=400+10+7, 580=500+80+0 |
| Q3 | Animal counting | "The zoo has 2 groups of 100 animals, 4 groups of 10, and 5 single animals" |
| Q4 | Word problem | "Zara counts 134 🦁lions and 253 🐘elephants. What digit is in the tens place of 253?" |
| Q5 | True/False | "245 has 2 hundreds" (True), "In 307, the 0 means zero" (True), "509 has 50 tens" (False) |

### WS2: School Supplies (Easy-Medium)
| Q | Type | Details |
|---|------|---------|
| Q1 | Digit value | "What is the value of 6 in 362?" (60), "5 in 583?" (500), "4 in 147?" (7) |
| Q2 | Make the number | "4 hundreds, 2 tens, 9 ones = ___", "6 hundreds, 0 tens, 5 ones = ___" |
| Q3 | Pencil boxes | 📦📦📦 (100s) + bundles of 10 + singles = count total |
| Q4 | Supply order | "School orders 456 pencils. How many hundreds? How many left over after removing hundreds?" |
| Q5 | Explain mistake | Maya says "507 has 5 tens because I see a 5" - explain the error |

### WS3: Sweet Shop (Medium)
| Q | Type | Details |
|---|------|---------|
| Q1 | Base-10 blocks | Show 3 flats, 4 rods, 6 cubes → What number? |
| Q2 | Partitioning | 728=___+___+___, 605=___+___+___, 490=___+___+___ |
| Q3 | Sweet jars | 🍬 jars of 100, packets of 10, loose sweets - count total |
| Q4 | Shopping | "Tom buys sweets costing £2.73. What digit is in the ones place? What is its value?" |
| Q5 | True/False | "In 605, the 6 means 600" (True), "490 has 9 tens" (True), "302 has 32 tens" (False) |

### WS4: Sports Day (Medium-Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed: chart + value | Fill chart for 847, then "What is the value of 4 in 847?" |
| Q2 | Partitioning both ways | 536 = 500+30+6 AND "536 = ___ hundreds, ___ tens, ___ ones" |
| Q3 | Points scored | Teams score 3-digit points - identify place values |
| Q4 | Two-step | "Red team: 372 points. How many hundreds? What's left after removing 300?" |
| Q5 | Explain mistake | Leo writes "four hundred and eight" as 4008 |

### WS5: Space Mission (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Reverse: value to digit | "Which number has 7 in the hundreds place?" from list: 376, 763, 637 |
| Q2 | Zero placeholder | 708=___+___+___, 302=___+___+___, 850=___+___+___ |
| Q3 | Distance counting | "Rocket travels 4 hundred km, 0 tens km, 9 ones km. Total distance?" |
| Q4 | Comparison | "Planet A is 456 km away. Planet B is 465 km. Which digit is different? What's the difference in value?" |
| Q5 | Always/Sometimes/Never | "A 3-digit number has a digit in every place" → Always |

### WS6: Garden Centre (Challenge)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mystery number | "I have 4 hundreds, 0 tens, and 8 ones. What number am I?" (Plus 2 more) |
| Q2 | Flexible partitioning | "Show two different ways to partition 365" (300+60+5 or 300+65) |
| Q3 | Plant counting | Mixed bundles (100s, 10s, 1s) with visual representation |
| Q4 | Multi-step | "Sam plants 527 flowers. Take away the hundreds, then the tens. What's left?" |
| Q5 | Error analysis | "Explain why 600+30+5 = 635, NOT 6035" |

## TEMPLATES

**CRITICAL: All answer boxes MUST use `<input type="text">` elements with `data-answer` attributes for interactive functionality.**

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Place Value Chart Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Fill in the place value chart.</p>
  <p class="sub-question">a) 356</p>
  <div class="pv-chart">
    <div class="pv-row">
      <div class="pv-cell pv-header">H</div>
      <div class="pv-cell pv-header">T</div>
      <div class="pv-cell pv-header">O</div>
    </div>
    <div class="pv-row">
      <div class="pv-cell pv-hundreds"><input type="text" class="answer-box-small" data-answer="3" style="width:40px"></div>
      <div class="pv-cell pv-tens"><input type="text" class="answer-box-small" data-answer="5" style="width:40px"></div>
      <div class="pv-cell pv-ones"><input type="text" class="answer-box-small" data-answer="6" style="width:40px"></div>
    </div>
  </div>
</div>
```

### Q2 - Partitioning Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Partition these numbers.</p>
  <p class="sub-question">a) 456 = <input type="text" class="answer-box-small" data-answer="400" style="width:50px"> + <input type="text" class="answer-box-small" data-answer="50" style="width:50px"> + <input type="text" class="answer-box-small" data-answer="6" style="width:40px"></p>
  <p class="sub-question">b) 708 = <input type="text" class="answer-box-small" data-answer="700" style="width:50px"> + <input type="text" class="answer-box-small" data-answer="0" style="width:40px"> + <input type="text" class="answer-box-small" data-answer="8" style="width:40px"></p>
</div>
```

### Q3 - Context with Base-10 Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count the pencils.</p>
  <div class="scene-box">
    <div class="base10-visual">
      <div class="block-group">
        <p class="block-label hundreds-label">Boxes of 100</p>
        <div class="scene-objects">📦📦📦</div>
      </div>
      <div class="block-group">
        <p class="block-label tens-label">Packs of 10</p>
        <div class="scene-objects">📦📦</div>
      </div>
      <div class="block-group">
        <p class="block-label ones-label">Single pencils</p>
        <div class="scene-objects">✏️✏️✏️✏️</div>
      </div>
    </div>
  </div>
  <p class="sub-question">a) How many hundreds? <input type="text" class="answer-box-small" data-answer="3" style="width:40px"></p>
  <p class="sub-question">b) How many tens? <input type="text" class="answer-box-small" data-answer="2" style="width:40px"></p>
  <p class="sub-question">c) How many ones? <input type="text" class="answer-box-small" data-answer="4" style="width:40px"></p>
  <p class="sub-question">d) Total pencils: <input type="text" class="answer-box-small" data-answer="324" style="width:50px"></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Sam</strong> counts 527 flowers in the garden. He takes away all the hundreds first, then the tens.</span>
  </div>
  <p class="sub-question">a) How many hundreds does 527 have? <input type="text" class="answer-box-small" data-answer="5" style="width:40px"></p>
  <p class="sub-question">b) After removing the hundreds, how much is left? <input type="text" class="answer-box-small" data-answer="27" style="width:50px"></p>
  <p class="sub-question">c) After also removing the tens, how much is left? <input type="text" class="answer-box-small" data-answer="7" style="width:40px"></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) In 356, the digit 3 is worth 300. <input type="text" class="answer-box-small" data-answer="True" style="width:60px"></p>
    <p class="sub-question">b) The number 507 has 50 tens. <input type="text" class="answer-box-small" data-answer="False" style="width:60px"></p>
    <p class="sub-question">c) In 490, the 0 means there are zero ones. <input type="text" class="answer-box-small" data-answer="True" style="width:60px"></p>
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
      <span class="story-text">"Four hundred and eight is written as 4008"</span>
    </div>
  </div>
  <p class="sub-question">a) Is this correct? <input type="text" class="answer-box-small" data-answer="No" style="width:50px"></p>
  <p class="sub-question">b) What should four hundred and eight be written as? <input type="text" class="answer-box-small" data-answer="408" style="width:50px"></p>
  <p class="sub-question">c) How many tens does four hundred and eight have? <input type="text" class="answer-box-small" data-answer="0" style="width:40px"></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 3, 5, 6, 2, 4, 5, 5, 0, 9</p>
  <p><strong>2.</strong> 300, 60, 2, 400, 10, 7, 500, 80, 0</p>
  <p><strong>3.</strong> 2, 4, 5, 245</p>
  <p><strong>4.</strong> 5, 27, 7</p>
  <p><strong>5.</strong> True, True, False</p>
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
- [ ] Named character used in Q4?
- [ ] Q5 tests misconception (zero placeholder, digit value)?
- [ ] Theme consistent throughout worksheet?
