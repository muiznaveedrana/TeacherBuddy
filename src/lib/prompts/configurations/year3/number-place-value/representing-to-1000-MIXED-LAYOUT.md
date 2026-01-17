# Ages 7-8: Representing Numbers to 1000 (MIXED LAYOUT)

Generate EXACTLY 5 Year 3 place value questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Numbers 100-999 (three-digit numbers)
- **Key skills:** Represent numbers using different representations
- **Representations:** Base-10 blocks, place value counters, part-whole models, number lines, words, numerals
- **Key concepts:**
  - Same number can be shown in multiple ways
  - Base-10: Flats (100s), Rods (10s), Cubes (1s)
  - Place value counters: 100, 10, 1 circles
  - Part-whole models show how numbers partition
- **Key misconceptions:**
  - Thinking representations must always look the same
  - Not recognising non-standard partitioning (e.g., 248 = 1 hundred + 14 tens + 8 ones)
  - Confusing the value of counters/blocks

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
.base10-visual{display:flex;justify-content:center;gap:20px;margin:15px 0;padding:15px;background:#FFF8E1;border-radius:8px;flex-wrap:wrap}
.block-group{text-align:center}
.block-label{font-size:11pt;font-weight:bold;margin-bottom:5px}
.hundreds-label{color:#F57C00}
.tens-label{color:#1976D2}
.ones-label{color:#2E7D32}
.hundred-flat{width:50px;height:50px;background:#FF9800;border:2px solid #F57C00;border-radius:4px;display:inline-block;margin:2px}
.ten-rod{width:50px;height:8px;background:#2196F3;border:1px solid #1565C0;border-radius:2px;display:block;margin:2px auto}
.one-cube{width:8px;height:8px;background:#4CAF50;border:1px solid #2E7D32;border-radius:1px;display:inline-block;margin:1px}
.pv-counter{display:inline-flex;align-items:center;justify-content:center;width:35px;height:35px;border-radius:50%;font-weight:bold;font-size:12pt;margin:3px}
.counter-100{background:#FF9800;color:white;border:2px solid #F57C00}
.counter-10{background:#2196F3;color:white;border:2px solid #1565C0}
.counter-1{background:#4CAF50;color:white;border:2px solid #2E7D32}
.counters-row{display:flex;flex-wrap:wrap;justify-content:center;gap:5px;margin:10px 0}
.part-whole{display:flex;flex-direction:column;align-items:center;margin:15px 0}
.whole-box{background:#9C27B0;color:white;padding:10px 25px;border-radius:8px;font-size:18pt;font-weight:bold;margin-bottom:10px}
.parts-row{display:flex;gap:20px}
.part-box{background:#E1BEE7;border:2px solid #9C27B0;padding:8px 20px;border-radius:8px;font-size:16pt;font-weight:bold;min-width:60px;text-align:center}
.connector-line{width:2px;height:20px;background:#9C27B0;margin:0 auto}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.scene-box{background:#FAFAFA;border-radius:8px;padding:12px;margin:10px 0;text-align:center}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:12px;padding:10px;margin:8px 0;position:relative}
.answer-box{display:inline-block;min-width:60px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:45px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
.representation-card{background:#fff;border:2px solid #ccc;border-radius:10px;padding:15px;margin:10px;display:inline-block;min-width:150px;text-align:center}
.match-letter{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;border-radius:50%;font-weight:bold;margin-right:10px}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Base-10 to number**: Show blocks → "What number is this?"
- **Number to base-10 description**: "How many flats, rods, cubes for 365?"
- **Place value counters**: Show counters → Write the number

### Q2 OPTIONS (Fluency - Pick ONE):
- **Part-whole model**: Complete the part-whole model for a number
- **Match representations**: Match number to correct representation
- **Multiple representations**: "Show 247 using counters AND words"

### Q3 OPTIONS (Application - Pick ONE):
- **Real-world counting**: Objects grouped in 100s, 10s, 1s
- **Building numbers**: "Use these blocks to make the largest/smallest number"
- **Story context**: Character uses base-10 blocks to count items

### Q4 OPTIONS (Application - Pick ONE):
- **Comparison using representations**: Compare two numbers shown as blocks
- **Missing representation**: "What's missing from this representation?"
- **Word problem with representations**: Solve and show answer using blocks/counters

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Same or different**: "Do these show the same number?"
- **Spot the mistake**: Wrong representation shown
- **Flexible representation**: "Show two different ways to represent 340"

## 6 WORKSHEET VARIATIONS

### WS1: Toy Shop (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Base-10 to number | Show 2 flats, 4 rods, 7 cubes → 247 |
| Q2 | Part-whole model | Complete: 358 → 300 + ? + 8 |
| Q3 | Toy counting | Boxes of 100, packs of 10, single toys |
| Q4 | Word problem | "Sam has 3 hundred-blocks, 5 ten-rods. What number?" |
| Q5 | Same or different | Two representations of 425 - are they equal? |

### WS2: Library Books (Easy-Medium)
| Q | Type | Details |
|---|------|---------|
| Q1 | Place value counters | Show 100, 100, 100, 10, 10, 1, 1, 1 → 323 |
| Q2 | Match representations | Match 3 numbers to 3 block pictures |
| Q3 | Book sorting | Books on shelves of 100, racks of 10, singles |
| Q4 | Building numbers | "Make 506 using the fewest blocks" |
| Q5 | Spot the mistake | "This shows 462" but blocks show 426 |

### WS3: Baking Day (Medium)
| Q | Type | Details |
|---|------|---------|
| Q1 | Number to description | "How many flats, rods, cubes for 708?" |
| Q2 | Multiple representations | Show 534 as blocks AND in words |
| Q3 | Ingredient counting | Bags of 100g, packs of 10g, single grams |
| Q4 | Missing blocks | "I have 400. I add 2 rods and 9 cubes. Total?" |
| Q5 | Flexible representation | "Show 250 in two different ways" |

### WS4: Football Stadium (Medium-Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed: counters + blocks | Both representations shown, identify number |
| Q2 | Non-standard partitioning | "620 = 5 hundreds + ? tens + 0 ones" |
| Q3 | Seat counting | Stadium sections of 100, rows of 10, seats |
| Q4 | Comparison | "Which is greater: 3 flats + 15 rods OR 450?" |
| Q5 | Error analysis | Wrong part-whole model - find the error |

### WS5: Space Station (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Reverse: description to number | "6 hundreds, 0 tens, 4 ones = ?" |
| Q2 | Equivalent representations | "12 tens = ? hundred + ? tens" |
| Q3 | Supply counting | Crates of 100, boxes of 10, single items in space |
| Q4 | Multi-step | "Start with 300, add 14 tens, add 5 ones. Total?" |
| Q5 | Always/Sometimes/Never | "A number can be shown in only one way" |

### WS6: Museum Treasures (Challenge)
| Q | Type | Details |
|---|------|---------|
| Q1 | Complex blocks | "4 flats, 12 rods, 15 cubes = ?" (requires regrouping understanding) |
| Q2 | Three representations | Same number as blocks, counters, and words |
| Q3 | Artifact counting | Ancient coins in chests, bags, and singles |
| Q4 | Create representation | "Show 807 using exactly 9 blocks/counters" |
| Q5 | Explain reasoning | "Why can 350 be shown as 3 flats + 5 rods OR 2 flats + 15 rods?" |

## TEMPLATES

**CRITICAL: All answer boxes MUST use `<input type="text">` elements with `data-answer` attributes for interactive functionality.**

### Base-10 Blocks Template:
```html
<div class="base10-visual">
  <div class="block-group">
    <p class="block-label hundreds-label">Hundreds (Flats)</p>
    <div class="hundred-flat"></div>
    <div class="hundred-flat"></div>
  </div>
  <div class="block-group">
    <p class="block-label tens-label">Tens (Rods)</p>
    <div class="ten-rod"></div>
    <div class="ten-rod"></div>
    <div class="ten-rod"></div>
  </div>
  <div class="block-group">
    <p class="block-label ones-label">Ones (Cubes)</p>
    <span class="one-cube"></span>
    <span class="one-cube"></span>
    <span class="one-cube"></span>
    <span class="one-cube"></span>
  </div>
</div>
<p class="sub-question">What number is shown? <input type="text" class="answer-box-small" data-answer="234" style="width:60px"></p>
```

### Place Value Counters Template:
```html
<div class="counters-row">
  <span class="pv-counter counter-100">100</span>
  <span class="pv-counter counter-100">100</span>
  <span class="pv-counter counter-100">100</span>
  <span class="pv-counter counter-10">10</span>
  <span class="pv-counter counter-10">10</span>
  <span class="pv-counter counter-1">1</span>
  <span class="pv-counter counter-1">1</span>
</div>
<p class="sub-question">What number is shown? <input type="text" class="answer-box-small" data-answer="322" style="width:60px"></p>
```

### Part-Whole Model Template:
```html
<div class="part-whole">
  <div class="whole-box">465</div>
  <div class="connector-line"></div>
  <div class="parts-row">
    <div class="part-box">400</div>
    <div class="part-box"><input type="text" class="answer-box-small" data-answer="60" style="width:50px"></div>
    <div class="part-box">5</div>
  </div>
</div>
```

### Number Description Template:
```html
<p class="sub-question">a) How many hundreds? <input type="text" class="answer-box-small" data-answer="7" style="width:40px"></p>
<p class="sub-question">b) How many tens? <input type="text" class="answer-box-small" data-answer="0" style="width:40px"></p>
<p class="sub-question">c) How many ones? <input type="text" class="answer-box-small" data-answer="8" style="width:40px"></p>
```

### Matching Template:
```html
<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center">
  <div class="representation-card">
    <span class="match-letter">A</span>
    <div class="base10-visual" style="margin:10px 0;padding:10px">
      <!-- blocks here -->
    </div>
  </div>
  <div class="representation-card">
    <span class="match-letter">B</span>
    <div class="counters-row">
      <!-- counters here -->
    </div>
  </div>
</div>
<p class="sub-question">Match 247: <input type="text" class="answer-box-small" data-answer="A" style="width:40px"></p>
```

### True/False Template:
```html
<p class="sub-question">a) These show the same number: <input type="text" class="answer-box-small" data-answer="True" style="width:60px"></p>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 247, 358, 506</p>
  <p><strong>2.</strong> 60, A, C, B</p>
  <p><strong>3.</strong> 3, 2, 5, 325</p>
  <p><strong>4.</strong> 350, 429</p>
  <p><strong>5.</strong> Yes, Same value</p>
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
- [ ] Multiple representation types used (blocks, counters, part-whole)?
- [ ] Numbers within Year 3 range (100-999)?
- [ ] Visual representations accurate (correct number of blocks/counters)?
- [ ] Theme consistent throughout worksheet?
