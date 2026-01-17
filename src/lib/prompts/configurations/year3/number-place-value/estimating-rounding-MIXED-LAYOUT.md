# Ages 7-8: Estimating and Rounding to 1000 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 3 estimating and rounding questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Numbers 0-1000
- **Key skills:** Round to nearest 10, round to nearest 100, estimate quantities
- **Key concepts:**
  - Numbers ending 1-4 round down, 5-9 round up (for nearest 10)
  - Look at tens digit for rounding to 100
- **Representations:** Number lines, place value charts
- **Key misconceptions:**
  - Forgetting what to do with 5 (it rounds UP)
  - Looking at wrong digit when rounding
  - Not understanding that 450 rounds to 500 (not 400)

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
.number-line{display:flex;align-items:center;justify-content:center;gap:8px;margin:10px 0;padding:10px;background:#f0f8ff;border-radius:8px;flex-wrap:wrap}
.number-line span{font-size:14pt;font-weight:bold}
.rounding-box{display:inline-block;padding:8px 15px;border:2px solid #2196F3;border-radius:8px;background:#FFF;font-size:16pt;font-weight:bold;min-width:50px;text-align:center}
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
- **Round to nearest 10**: 3 numbers to round
- **Round to nearest 100**: 3 numbers to round
- **Quick rounding**: Mixed 10s and 100s

### Q2 OPTIONS (Fluency - Pick ONE):
- **Number line rounding**: Show position, find rounded value
- **Estimate the sum**: Round each, then add
- **Which rounds to...**: Find numbers that round to X

### Q3 OPTIONS (Application - Pick ONE):
- **Shopping estimation**: Round prices to estimate total
- **Distance estimation**: Round distances
- **Score estimation**: Round game scores

### Q4 OPTIONS (Application - Pick ONE):
- **Money context**: Estimate costs
- **Measurement**: Estimate lengths/weights
- **Capacity**: Estimate volumes

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Rounding statements
- **Explain mistake**: Character rounds incorrectly
- **Always/Sometimes/Never**: Rounding rules

## 6 WORKSHEET VARIATIONS

### WS1: Sweet Shop (Foundation 1 - Easy)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Round to nearest 10 | 23, 47, 85 | 20, 50, 90 |
| Q2 | Round to nearest 100 | 234, 567, 850 | 200, 600, 900 |
| Q3 | Shopping | "Sweets cost 47p, 23p, 31p. Estimate total (round to 10)" | 100p or £1 |
| Q4 | Weight | "Bag weighs 367g. Round to nearest 100g" | 400g |
| Q5 | True/False | "15 rounds to 20" (True), "44 rounds to 50" (False) | True, False |

### WS2: Sports Day (Foundation 2 - Easy-Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Round to nearest 10 | 34, 65, 98 | 30, 70, 100 |
| Q2 | Round to nearest 100 | 149, 450, 751 | 100, 500, 800 |
| Q3 | Distance | "Red ran 234m, Blue ran 178m. Estimate total (nearest 100)" | 400m |
| Q4 | Points | "Team scored 467 points. Round to nearest 10" | 470 |
| Q5 | Error spotting | "Sam says 145 rounds to 100. Is he correct?" | No, 150 |

### WS3: Pet Shop (Practice 1 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Round to nearest 10 | 156, 234, 795 | 160, 230, 800 |
| Q2 | Estimate sum | "243 + 168 ≈ ___ + ___ = ___" | 240, 170, 410 |
| Q3 | Price estimate | "Fish: £3.67, Food: £4.28. Estimate total (nearest £)" | £8 |
| Q4 | Weight | "Puppy: 4567g. Round to nearest 100g and 1000g" | 4600g, 5000g |
| Q5 | Always/Sometimes/Never | "Numbers ending in 5 round up" | Always |

### WS4: Bakery (Practice 2 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Round to nearest 100 | 249, 550, 851 | 200, 600, 900 |
| Q2 | Which rounds to | "Which numbers round to 500? 449, 450, 549, 550" | 450, 549 |
| Q3 | Flour estimate | "Recipe: 256g + 178g flour. Estimate total (nearest 100)" | 400g |
| Q4 | Sales | "Sold 367 cakes Monday, 425 Tuesday. Estimate total (nearest 10)" | 790 |
| Q5 | Explain | "Why does 450 round to 500, not 400?" | 5 in tens, rounds up |

### WS5: Theme Park (Practice 3 - Medium-Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Mixed rounding | "Round 467: to nearest 10 = ___, to nearest 100 = ___" | 470, 500 |
| Q2 | Estimate difference | "834 - 567 ≈ ___ - ___ = ___" | 830, 570, 260 |
| Q3 | Queue estimate | "Queue: 456 people. After 178 join, estimate total (nearest 100)" | 600 |
| Q4 | Height | "Rides need 125cm. Tom is 119cm. Round both to nearest 10" | 130, 120 |
| Q5 | Error analysis | "Mia rounded 549 to 600. Explain her mistake" | Should be 500 |

### WS6: Library (Practice 4 - Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Round 3 ways | "Round 455: to 10 = ___, to 100 = ___" | 460, 500 |
| Q2 | Reverse rounding | "A number rounds to 350. Give 2 possible numbers" | 345-354 (any 2) |
| Q3 | Book counting | "Fiction: 456 + 278 = ___. Estimate first (nearest 100)" | 700 |
| Q4 | Pages estimate | "Book A: 234 pages, B: 189 pages. Estimate total (nearest 50)" | 450 |
| Q5 | Complex reasoning | "Can a number round to the same value for nearest 10 and 100?" | Yes (e.g., 100, 200) |

## TEMPLATES

### Q1 - Rounding Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Round each number to the nearest 10.</p>
  <p class="sub-question">a) 23 → <input type="text" class="answer-box-small" data-answer="20"></p>
  <p class="sub-question">b) 47 → <input type="text" class="answer-box-small" data-answer="50"></p>
  <p class="sub-question">c) 85 → <input type="text" class="answer-box-small" data-answer="90"></p>
</div>
```

### Q2 - Number Line Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Round each number to the nearest 100.</p>
  <p class="sub-question">a) 234 → <input type="text" class="answer-box-small" data-answer="200"></p>
  <p class="sub-question">b) 567 → <input type="text" class="answer-box-small" data-answer="600"></p>
  <p class="sub-question">c) 850 → <input type="text" class="answer-box-small" data-answer="900"></p>
</div>
```

### Q3 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Estimate the total.</p>
  <div class="word-problem-box">
    <span class="character-icon">🍬</span>
    <span class="story-text">Sweets cost <strong>47p</strong>, <strong>23p</strong>, and <strong>31p</strong>. Estimate the total by rounding each to the nearest 10.</span>
  </div>
  <p class="sub-question">Estimated total: <input type="text" class="answer-box-small" data-answer="100">p</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 15 rounds to 20 (nearest 10). <input type="text" class="answer-box-word" data-answer="True"></p>
    <p class="sub-question">b) 44 rounds to 50 (nearest 10). <input type="text" class="answer-box-word" data-answer="False"></p>
  </div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 20, 50, 90</p>
  <p><strong>2.</strong> 200, 600, 900</p>
  <p><strong>3.</strong> 100</p>
  <p><strong>4.</strong> 400</p>
  <p><strong>5.</strong> True, False</p>
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
- [ ] Q5 tests misconception (rounding rules, digit confusion)?
- [ ] Theme consistent throughout worksheet?
