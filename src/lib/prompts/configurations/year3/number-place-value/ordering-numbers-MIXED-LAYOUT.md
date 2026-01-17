# Ages 7-8: Ordering Numbers to 1000 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 3 ordering numbers questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Numbers 0-1000 (focus on 3-digit numbers)
- **Key skills:** Order numbers ascending/descending; find position in sequence
- **Key concepts:** Place value ordering (Hundreds → Tens → Ones)
- **Representations:** Number lines, place value charts, sequence boxes
- **Key misconceptions:**
  - Thinking more digits = bigger number
  - Ignoring leading zeros (treating 099 as greater than 100)
  - Confusing ascending vs descending order
  - Looking at rightmost digit instead of leftmost

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
.ordering-row{display:flex;justify-content:center;align-items:center;gap:10px;margin:10px 0;flex-wrap:wrap}
.order-num{display:inline-block;padding:8px 12px;border:2px solid #9C27B0;border-radius:6px;background:#F3E5F5;font-size:16pt;font-weight:bold}
.order-arrow{font-size:18pt;color:#9C27B0}
.number-line{display:flex;align-items:center;gap:5px;margin:10px 0;padding:10px;background:#f0f8ff;border-radius:8px;flex-wrap:wrap}
.number-line span{font-size:14pt;font-weight:bold}
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
- **Order smallest to largest**: 5 numbers in boxes
- **Order largest to smallest**: 5 numbers in boxes
- **Quick ordering**: 4 simple 3-digit numbers

### Q2 OPTIONS (Fluency - Pick ONE):
- **Missing number in sequence**: Find the number that fits between
- **Next/previous number**: "What comes after/before..."
- **Position in list**: "Which number is 3rd smallest?"

### Q3 OPTIONS (Application - Pick ONE):
- **Sports rankings**: Order players by scores
- **Race results**: Order runners by times
- **Bookshelf ordering**: Order book page counts

### Q4 OPTIONS (Application - Pick ONE):
- **Prize positions**: Order items by value
- **Height ordering**: Order people/things by height
- **Collection sizes**: Order collections by count

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Explain the order**: Why does X come before Y?
- **Find the mistake**: Character orders incorrectly
- **Always/Sometimes/Never**: Ordering rules

## 6 WORKSHEET VARIATIONS

### WS1: Sports League (Foundation 1 - Easy)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order smallest to largest | 325, 235, 352, 253, 523 | 235, 253, 325, 352, 523 |
| Q2 | Missing number | "___ comes between 400 and 420" | 410 |
| Q3 | Match scores | "Order teams: Red 456, Blue 564, Green 465" | Red, Green, Blue |
| Q4 | Points table | "Amy: 234, Ben: 324, Cat: 243. Who is 2nd?" | Cat |
| Q5 | True/False | "The smallest 3-digit number is 100" (True), "999 comes after 1000" (False) | True, False |

### WS2: Zoo Animals (Foundation 2 - Easy-Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order largest to smallest | 678, 687, 768, 786, 867 | 867, 786, 768, 687, 678 |
| Q2 | Next number | "What is 10 more than 595?" | 605 |
| Q3 | Animal weights | "Elephant: 890 kg, Lion: 189 kg, Bear: 450 kg" | Lion, Bear, Elephant |
| Q4 | Visitor counts | "Monday: 567, Tuesday: 576, Wednesday: 675. Order busiest" | Wednesday, Tuesday, Monday |
| Q5 | Error spotting | "Max says 099 is bigger than 100" | No, 100 |

### WS3: Treasure Hunt (Practice 1 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order smallest to largest | 809, 890, 908, 980, 98 | 98, 809, 890, 908, 980 |
| Q2 | Missing in sequence | "450, ___, 470, 480, 490" | 460 |
| Q3 | Coin values | "Chest A: 456p, Chest B: 654p, Chest C: 546p" | A, C, B |
| Q4 | Gem sorting | "Ruby: 789, Emerald: 798, Diamond: 879. Order highest first" | Diamond, Emerald, Ruby |
| Q5 | Always/Sometimes/Never | "The number with more hundreds is always bigger" | Sometimes |

### WS4: Baking Contest (Practice 2 - Medium)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order largest to smallest | 505, 550, 500, 555, 515 | 555, 550, 515, 505, 500 |
| Q2 | Position in order | "367, 376, 637, 673, 736. Which is 3rd smallest?" | 637 |
| Q3 | Cake weights | "Chocolate: 345g, Vanilla: 354g, Lemon: 435g" | Chocolate, Vanilla, Lemon |
| Q4 | Recipe votes | "Pie: 567, Tart: 657, Scone: 576. Order most popular" | Tart, Scone, Pie |
| Q5 | Explain order | "Why does 345 come before 354?" | Same H and T, 4<5 |

### WS5: Space Mission (Practice 3 - Medium-Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order smallest to largest | 199, 919, 991, 119, 911 | 119, 199, 911, 919, 991 |
| Q2 | Missing numbers | "700, ___, 720, ___, 740" | 710, 730 |
| Q3 | Planet distances | "Mars: 687 million, Venus: 678 million, Jupiter: 786 million" | Venus, Mars, Jupiter |
| Q4 | Fuel ordering | "Rocket A: 456L, B: 465L, C: 564L, D: 654L. Order smallest" | A, B, C, D |
| Q5 | Error analysis | "Zoe ordered: 456, 546, 465. Is this smallest to largest?" | No (correct: 456, 465, 546) |

### WS6: Music Festival (Practice 4 - Hard)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Order with tricky digits | 606, 660, 600, 666, 60 | 60, 600, 606, 660, 666 |
| Q2 | Between two numbers | "Which 3-digit number is exactly between 250 and 270?" | 260 |
| Q3 | Ticket sales | "Band A: 789, Band B: 798, Band C: 879, Band D: 897" | A, B, C, D |
| Q4 | Crowd sizes | "Stage 1: 456+100, Stage 2: 600, Stage 3: 550. Order largest first" | Stage 2, Stage 1, Stage 3 |
| Q5 | Complex reasoning | "List 3 numbers between 500 and 510" | 501, 505, 509 (or similar) |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Ordering Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Order these numbers from smallest to largest.</p>
  <div class="ordering-row">
    <span class="order-num">325</span>
    <span class="order-num">235</span>
    <span class="order-num">352</span>
    <span class="order-num">253</span>
    <span class="order-num">523</span>
  </div>
  <p class="sub-question">Smallest → <input type="text" class="answer-box-small" data-answer="235"> → <input type="text" class="answer-box-small" data-answer="253"> → <input type="text" class="answer-box-small" data-answer="325"> → <input type="text" class="answer-box-small" data-answer="352"> → <input type="text" class="answer-box-small" data-answer="523"> ← Largest</p>
</div>
```

### Q2 - Missing Number Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Find the missing number.</p>
  <div class="number-line">
    <span>400</span> <span>→</span> <input type="text" class="answer-box-small" data-answer="410"> <span>→</span> <span>420</span>
  </div>
</div>
```

### Q3 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Order the teams by points.</p>
  <div class="word-problem-box">
    <span class="character-icon">⚽</span>
    <span class="story-text"><strong>Red Team</strong> scored <strong>456</strong> points. <strong>Blue Team</strong> scored <strong>564</strong> points. <strong>Green Team</strong> scored <strong>465</strong> points.</span>
  </div>
  <p class="sub-question">Order from lowest to highest: <input type="text" class="answer-box-word" data-answer="Red">, <input type="text" class="answer-box-word" data-answer="Green">, <input type="text" class="answer-box-word" data-answer="Blue"></p>
</div>
```

### Q5 - Error Spotting Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find and fix the mistake.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <span class="story-text">"99 is bigger than 100 because it has two 9s!"</span>
    </div>
  </div>
  <p class="sub-question">a) Is Max correct? <input type="text" class="answer-box-word" data-answer="No"></p>
  <p class="sub-question">b) Which number is actually bigger? <input type="text" class="answer-box-small" data-answer="100"></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 235, 253, 325, 352, 523</p>
  <p><strong>2.</strong> 410</p>
  <p><strong>3.</strong> Red, Green, Blue</p>
  <p><strong>4.</strong> Cat</p>
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
- [ ] Q5 tests misconception (ordering errors, digit confusion)?
- [ ] Theme consistent throughout worksheet?
