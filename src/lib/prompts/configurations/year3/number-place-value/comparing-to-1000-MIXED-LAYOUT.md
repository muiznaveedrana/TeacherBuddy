# Ages 7-8: Comparing Numbers to 1000 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 3 comparing numbers questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Numbers 0-1000 (focus on 3-digit numbers)
- **Key skills:** Compare using <, >, = symbols; order numbers
- **Key concepts:** Place value comparison (Hundreds → Tens → Ones)
- **Representations:** Number lines, place value charts
- **Key misconceptions:**
  - Thinking longer number = bigger (e.g., 99 > 100)
  - Ignoring place value order (comparing ones before hundreds)
  - Confusing < and > symbols

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
.comparison-row{display:flex;justify-content:center;align-items:center;gap:15px;margin:10px 0;flex-wrap:wrap}
.compare-num{display:inline-block;padding:8px 15px;border:3px solid #2196F3;border-radius:8px;background:#FFF;font-size:18pt;font-weight:bold;min-width:60px;text-align:center}
.symbol-box{display:inline-block;min-width:50px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;font-size:24pt;line-height:40px;text-align:center;vertical-align:middle}
.ordering-row{display:flex;justify-content:center;align-items:center;gap:10px;margin:10px 0;flex-wrap:wrap}
.order-num{display:inline-block;padding:8px 12px;border:2px solid #9C27B0;border-radius:6px;background:#F3E5F5;font-size:16pt;font-weight:bold}
.order-arrow{font-size:18pt;color:#9C27B0}
.order-box{display:inline-block;min-width:50px;height:36px;border:2px dashed #9C27B0;border-radius:6px;background:#FFF;font-size:16pt;line-height:36px;text-align:center}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
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
- **Compare pairs**: Fill <, >, or = between two numbers (3 pairs)
- **Symbol completion**: "456 ___ 423" → >
- **Quick comparisons**: Simple 3-digit pairs

### Q2 OPTIONS (Fluency - Pick ONE):
- **Order smallest to largest**: 5 numbers in boxes
- **Order largest to smallest**: 5 numbers in boxes
- **Missing number**: "Which number goes between 234 and 456?"

### Q3 OPTIONS (Application - Pick ONE):
- **Score comparison**: Character scores (sports, games)
- **Distance comparison**: Journey lengths
- **Collection counting**: Who has more items?

### Q4 OPTIONS (Application - Pick ONE):
- **Shopping context**: Compare prices
- **Height/length**: Compare measurements
- **Multi-step**: Compare totals after adding

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Statements about comparisons
- **Explain mistake**: Character compares incorrectly
- **Always/Sometimes/Never**: Comparison rules

## 6 WORKSHEET VARIATIONS

### WS1: Sports Day (Foundation 1 - Easy)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 345 ___ 354, 500 ___ 500, 621 ___ 612 | <, =, > |
| Q2 | Order smallest | 234, 432, 324, 423, 243 | 234, 243, 324, 423, 432 |
| Q3 | Sports score | "Red: 456 points, Blue: 465 points. Who won?" | Blue |
| Q4 | Race times | "Amir: 234 sec, Ben: 243 sec. Who was faster?" | Amir |
| Q5 | True/False | "567 > 576" (False), "400 = 400" (True) | False, True |

### WS2: Pet Shop (Foundation 2 - Easy-Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 189 ___ 198, 305 ___ 350, 777 ___ 777 | <, <, = |
| Q2 | Order smallest | 156, 165, 516, 561, 615 | 156, 165, 516, 561, 615 |
| Q3 | Pet counting | "Fish: 345, Hamsters: 354. Which is more?" | Hamsters |
| Q4 | Price compare | "Puppy: £489, Kitten: £498. Which costs less?" | Puppy |
| Q5 | Explain error | "Sam says 305 < 53 because 5 > 0" - What's wrong? | No, 305 |

### WS3: Sweet Factory (Practice 1 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 456 ___ 546, 789 ___ 798, 300 ___ 299 | <, <, > |
| Q2 | Order largest | 892, 829, 928, 982, 289 | 982, 928, 892, 829, 289 |
| Q3 | Sweet jars | "Jar A: 567 sweets, Jar B: 576 sweets" | B |
| Q4 | Production | "Monday: 456, Tuesday: 465. Total compared to 900?" | < |
| Q5 | True/False | "Any 3-digit > any 2-digit" (True), "500 > 499" (True), "100 < 99" (False) | True, True, False |

### WS4: Space Mission (Practice 2 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 708 ___ 780, 609 ___ 690, 505 ___ 505 | <, <, = |
| Q2 | Order smallest | 709, 790, 907, 970, 097 | 97, 709, 790, 907, 970 |
| Q3 | Distance | "Mars: 456 km, Venus: 654 km. Which is closer?" | Mars |
| Q4 | Fuel compare | "Rocket A: 378 litres, B: 387 litres" | A |
| Q5 | Explain thinking | "Why is 708 < 780? Explain using hundreds and tens" | Same H, 0T < 8T |

### WS5: Library Books (Practice 3 - Medium-Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 999 ___ 1000, 456 ___ 465, 890 ___ 809 | <, <, > |
| Q2 | Order largest | 345, 435, 534, 543, 354 | 543, 534, 435, 354, 345 |
| Q3 | Book count | "Fiction: 678 books, Non-fiction: 687" | Non-fiction |
| Q4 | Pages read | "Mia: 234+100, Tom: 345. Who read more?" | Tom |
| Q5 | Always/Sometimes/Never | "Adding 10 makes a number bigger" | Always |

### WS6: Garden Centre (Practice 4 - Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Compare pairs | 499 ___ 500, 850 ___ 805, 1000 ___ 999 | <, >, > |
| Q2 | Order with zeros | 505, 550, 500, 555, 055 | 55, 500, 505, 550, 555 |
| Q3 | Plant sales | "Roses: 467, Tulips: 476, Daisies: 647" - Order | Roses, Tulips, Daisies |
| Q4 | Revenue | "Weekday: 456, Weekend: 564. Difference?" | 108 |
| Q5 | Error analysis | "Zara says 099 > 100 because it has 99" | No, 100 |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Compare Pairs Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Write <, >, or = in each box.</p>
  <p class="sub-question">a) 345 <input type="text" class="answer-box-small" data-answer="<"> 354</p>
  <p class="sub-question">b) 500 <input type="text" class="answer-box-small" data-answer="="> 500</p>
  <p class="sub-question">c) 621 <input type="text" class="answer-box-small" data-answer=">"> 612</p>
</div>
```

### Q2 - Ordering Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Order these numbers from smallest to largest.</p>
  <div class="ordering-row">
    <span class="order-num">234</span>
    <span class="order-num">432</span>
    <span class="order-num">324</span>
    <span class="order-num">423</span>
    <span class="order-num">243</span>
  </div>
  <p class="sub-question">Smallest <input type="text" class="answer-box-small" data-answer="234"> → <input type="text" class="answer-box-small" data-answer="243"> → <input type="text" class="answer-box-small" data-answer="324"> → <input type="text" class="answer-box-small" data-answer="423"> → <input type="text" class="answer-box-small" data-answer="432"> Largest</p>
</div>
```

### Q3 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🏆</span>
    <span class="story-text"><strong>Red Team</strong> scored <strong>456</strong> points. <strong>Blue Team</strong> scored <strong>465</strong> points.</span>
  </div>
  <p class="sub-question">Which team scored more? <input type="text" class="answer-box-word" data-answer="Blue"></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 567 is greater than 576. <input type="text" class="answer-box-word" data-answer="False"></p>
    <p class="sub-question">b) 400 equals 400. <input type="text" class="answer-box-word" data-answer="True"></p>
  </div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> <, =, ></p>
  <p><strong>2.</strong> 234, 243, 324, 423, 432</p>
  <p><strong>3.</strong> Blue</p>
  <p><strong>4.</strong> Amir</p>
  <p><strong>5.</strong> False, True</p>
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
- [ ] All answer boxes use input with data-answer attribute?
- [ ] Numbers within Year 3 range (0-1000)?
- [ ] Named character used in word problems?
- [ ] Q5 tests misconception (symbol confusion, place value)?
- [ ] Theme consistent throughout worksheet?
