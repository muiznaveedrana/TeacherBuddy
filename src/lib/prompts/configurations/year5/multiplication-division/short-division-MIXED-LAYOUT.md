# Ages 9-10: Short Division - 4-Digit by 1-Digit (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 5 short division questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Bus stop method practice, carrying remainders, checking strategies
**Section B: Application (Q3-Q4)** - Real-world contexts, sharing/grouping problems, multi-step problems
**Section C: Reasoning (Q5)** - Error spotting, remainder interpretation, explain method

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 5 - National Curriculum)
- **Statutory requirement:** "Divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately for the context"
- **Prerequisite:** Year 4 division facts to 12×12, understanding of remainders
- **Method:** Short division (bus stop method)
- **Key vocabulary:** divide, quotient, divisor, dividend, remainder, share, group
- **Related skills:** Checking with multiplication, interpreting remainders, estimation

## COMMON MISCONCEPTIONS (Year 5 children)
1. **Forgetting to carry remainders:** Not carrying remainders to the next column
2. **Remainder placement:** Writing remainder in wrong position
3. **Zero in quotient:** Missing zeros when digit can't be divided
4. **Remainder too large:** Remainder equals or exceeds divisor
5. **Checking errors:** Not using multiplication to verify answer

## NUMBER RANGES FOR YEAR 5
| Level | Dividend | Divisor | Has Remainder |
|-------|----------|---------|---------------|
| Foundation | 3-4 digits | 2-6 | Mixed |
| Practice | 3-4 digits | 2-9 | Mixed |
| Challenge | 4 digits | 6-9 | Mixed |

## CSS (Compact - Mixed Layout - Year 5)
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
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
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px}
.calculation-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:12px 0}
.calculation-item{padding:15px;border:2px solid #2196F3;border-radius:8px;background:#fff;text-align:center}
.calculation-label{font-size:11pt;color:#666;margin-bottom:8px}
.bus-stop{display:inline-block;position:relative;font-family:'Courier New',monospace;font-size:22pt;font-weight:bold;margin:15px auto;padding:15px 25px 15px 45px;background:#FAFAFA;border-radius:8px}
.bus-stop-bracket{position:absolute;left:30px;top:35%;height:30%;border-left:4px solid #333;border-top:4px solid #333;border-bottom:4px solid #333;width:12px;border-radius:6px 0 0 6px}
.bus-stop-divisor{position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:22pt;color:#2E7D32}
.bus-stop-line{border-top:4px solid #333;margin:8px 0}
.bus-stop-quotient{letter-spacing:12px;color:#7B1FA2;text-align:right}
.bus-stop-dividend{letter-spacing:12px;color:#1976D2;text-align:right}
.remainder-badge{display:inline-block;padding:4px 10px;background:#FFF3E0;border:2px solid #FF9800;border-radius:6px;color:#E65100;font-weight:bold;font-size:14pt;margin-left:10px}
.estimation-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:10px 0}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.error-box{background:#FFEBEE;border:2px solid #EF5350;border-radius:8px;padding:12px;margin:10px 0}
.check-box{background:#F3E5F5;border:2px solid #9C27B0;border-radius:8px;padding:12px;margin:10px 0}
.check-formula{font-size:14pt;text-align:center;padding:10px;background:#E1BEE7;border-radius:6px;margin:8px 0}
.answer-box{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-large{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-word{display:inline-block;min-width:120px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Calculation grid**: 2 short division problems with bus stop layout
- **Step-by-step completion**: Partially completed division to finish
- **Estimate then divide**: Estimate first, then calculate exactly

### Q2 OPTIONS (Fluency - Pick ONE):
- **Calculation grid**: 2 more problems (different difficulty)
- **Inverse check**: Calculate then check using multiplication
- **With and without remainder**: One exact division, one with remainder
- **Missing digit**: Division with one digit missing in quotient

### Q3 OPTIONS (Application - Pick ONE):
- **Sharing equally**: Items shared among groups
- **Grouping problem**: How many groups can be made
- **Real-world division**: Distance, time, money contexts

### Q4 OPTIONS (Application - Pick ONE):
- **Multi-step word problem**: Requires division + another operation
- **Remainder interpretation**: Round up/down based on context
- **Comparison word problem**: "How many more/fewer groups?"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Common carrying or remainder mistake
- **Interpret remainder**: Choose correct interpretation in context
- **Explain the method**: "Show how you would calculate..."
- **Always/Sometimes/Never**: Division properties

## 6 WORKSHEET VARIATIONS

### WS1: Foundation 1 (Sharing Theme - Focus: Basic bus stop method)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 456 ÷ 3 = 152, 624 ÷ 4 = 156 | 152, 156 |
| Q2 | Calculation grid | 735 ÷ 5 = 147, 864 ÷ 6 = 144 | 147, 144 |
| Q3 | Sharing equally | 1,248 stickers ÷ 4 children | 312 |
| Q4 | Word problem | 2,565 books on 5 shelves | 513 |
| Q5 | Error spotting | Forgot to carry remainder | No, 127 |

### WS2: Foundation 2 (School Theme - Focus: Remainders)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Estimate + divide | 847 ÷ 4 ≈ 800÷4=200 | 200, 211 r 3 |
| Q2 | Estimate + divide | 1,359 ÷ 6 ≈ 1200÷6=200 | 200, 226 r 3 |
| Q3 | Grouping | 1,478 pupils, 6 per team | 246 r 2 |
| Q4 | Remainder context | 2,347 eggs in boxes of 6 | 391 r 5, 392 |
| Q5 | Error spotting | Remainder larger than divisor | No, 189 r 2 |

### WS3: Practice 1 (Travel Theme - Focus: 4-digit dividends)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 2,436 ÷ 6 = 406, 3,255 ÷ 5 = 651 | 406, 651 |
| Q2 | Inverse check | 4,284 ÷ 7 = 612, check 612 × 7 | 612, 4284 |
| Q3 | Distance context | 5,670 km in 9 days | 630 |
| Q4 | Multi-step | 8,424 passengers, 8 ferries, how many per ferry + 500 extra | 1053, 1553 |
| Q5 | Explain method | Show steps for 3,456 ÷ 8 | 432 |

### WS4: Practice 2 (Sports Theme - Focus: Checking answers)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 4,872 ÷ 8 = 609, 5,481 ÷ 9 = 609 | 609, 609 |
| Q2 | With/without remainder | 3,654 ÷ 6 = 609, 4,783 ÷ 7 = 683 r 2 | 609, 683 r 2 |
| Q3 | Tickets context | 7,245 tickets shared among 9 stands | 805 |
| Q4 | Remainder context | 2,389 footballs, 8 per bag | 298 r 5, 299 |
| Q5 | Interpret remainder | 2,350 people, minibuses hold 8 | 293 r 6, 294 |

### WS5: Practice 3 (Factory Theme - Focus: Multi-step problems)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 6,328 ÷ 8 = 791, 7,236 ÷ 9 = 804 | 791, 804 |
| Q2 | Missing digit | 5,_72 ÷ 6 = 912 (find missing digit) | 4 |
| Q3 | Production context | 9,135 items in 5 hours | 1827 |
| Q4 | Multi-step | 8,568 ÷ 7 then add 250 bonus | 1224, 1474 |
| Q5 | Always/Sometimes/Never | "Remainder is always less than divisor" | Always |

### WS6: Practice 4 (Nature Theme - Focus: Problem solving)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 8,456 ÷ 8 = 1057, 9,324 ÷ 9 = 1036 | 1057, 1036 |
| Q2 | Inverse check | 7,371 ÷ 9 = 819, check 819 × 9 | 819, 7371 |
| Q3 | Nature context | 6,384 seeds planted in 8 rows | 798 |
| Q4 | Comparison | Field A: 5,670÷7 vs Field B: 4,872÷6 | 810, 812, Field B |
| Q5 | Explain method | Show checking 4,536 ÷ 7 = 648 | 648, 4536 |

## TEMPLATES

### Worksheet Header Template:
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">Short Division: 4-Digit ÷ 1-Digit <span class="layout-badge">Mixed Layout</span></h1>
  <p class="worksheet-details">Year 5 | Ages 9-10 | {{difficulty}} {{version}}</p>
</div>
```

### Section Headers:
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

### Q1 - Calculation Grid Template (Bus Stop Method):
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Calculate using short division.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) 456 ÷ 3</p>
      <div class="bus-stop">
        <span class="bus-stop-divisor">3</span>
        <span class="bus-stop-bracket"></span>
        <div class="bus-stop-quotient">? ? ?</div>
        <div class="bus-stop-line"></div>
        <div class="bus-stop-dividend">4 5 6</div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="152"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) 624 ÷ 4</p>
      <div class="bus-stop">
        <span class="bus-stop-divisor">4</span>
        <span class="bus-stop-bracket"></span>
        <div class="bus-stop-quotient">? ? ?</div>
        <div class="bus-stop-line"></div>
        <div class="bus-stop-dividend">6 2 4</div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="156"></p>
    </div>
  </div>
</div>
```

### Q1 - Estimate First Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Estimate first, then calculate.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) 847 ÷ 4</p>
      <div class="estimation-box">
        <p>Estimate: 800 ÷ 4 = <input type="text" class="answer-box-small" data-answer="200"></p>
      </div>
      <p>Calculate: 847 ÷ 4 = <input type="text" class="answer-box" data-answer="211 r 3"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) 1,359 ÷ 6</p>
      <div class="estimation-box">
        <p>Estimate: 1,200 ÷ 6 = <input type="text" class="answer-box-small" data-answer="200"></p>
      </div>
      <p>Calculate: 1,359 ÷ 6 = <input type="text" class="answer-box" data-answer="226 r 3"></p>
    </div>
  </div>
</div>
```

### Q2 - Inverse Check Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Calculate, then check using multiplication.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) Calculate:</p>
      <p style="font-size:16pt;font-weight:bold;">4,284 ÷ 7 = <input type="text" class="answer-box" data-answer="612"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) Check:</p>
      <div class="check-box">
        <p class="check-formula">Answer × Divisor = Dividend</p>
        <p style="font-size:16pt;font-weight:bold;text-align:center;"><input type="text" class="answer-box-small" data-answer="612"> × 7 = <input type="text" class="answer-box" data-answer="4284"></p>
      </div>
    </div>
  </div>
</div>
```

### Q3 - Sharing Equally Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🎁</span>
    <span class="story-text">A teacher has <strong>1,248 stickers</strong> to share equally among <strong>4 children</strong>. How many stickers does each child get?</span>
  </div>
  <p class="sub-question">Calculation: 1,248 ÷ 4 = <input type="text" class="answer-box" data-answer="312"> stickers each</p>
</div>
```

### Q3 - Distance Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">✈️</span>
    <span class="story-text">A plane travels <strong>5,670 kilometres</strong> in <strong>9 days</strong>. How many kilometres does it travel each day?</span>
  </div>
  <p class="sub-question">Distance per day: 5,670 ÷ 9 = <input type="text" class="answer-box" data-answer="630"> km</p>
</div>
```

### Q4 - Remainder Interpretation Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read carefully and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">🥚</span>
    <span class="story-text">A farm collects <strong>2,347 eggs</strong>. Each box holds <strong>6 eggs</strong>. How many boxes are needed to pack ALL the eggs?</span>
  </div>
  <p class="sub-question">a) 2,347 ÷ 6 = <input type="text" class="answer-box" data-answer="391 r 5"></p>
  <p class="sub-question">b) Boxes needed (round up for remainder): <input type="text" class="answer-box" data-answer="392"> boxes</p>
</div>
```

### Q4 - Multi-step Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Solve this two-step problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">⛴️</span>
    <span class="story-text"><strong>8,424 passengers</strong> need to travel on <strong>8 ferries</strong>. How many on each ferry? If <strong>500 extra passengers</strong> join one ferry, how many on that ferry?</span>
  </div>
  <p class="sub-question">Step 1: 8,424 ÷ 8 = <input type="text" class="answer-box" data-answer="1053"> passengers per ferry</p>
  <p class="sub-question">Step 2: <input type="text" class="answer-box-small" data-answer="1053"> + 500 = <input type="text" class="answer-box" data-answer="1553"> passengers</p>
</div>
```

### Q5 - Error Spotting Template (CRITICAL):
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the mistake.</p>
  <div class="error-box">
    <p><strong>Sophie calculated:</strong></p>
    <div class="bus-stop" style="margin:10px auto;display:block;">
      <span class="bus-stop-divisor">5</span>
      <span class="bus-stop-bracket"></span>
      <div class="bus-stop-quotient">1 2 5</div>
      <div class="bus-stop-line"></div>
      <div class="bus-stop-dividend">6 3 5</div>
    </div>
    <p style="text-align:center;font-size:14pt;">Sophie says: "635 ÷ 5 = 125"</p>
  </div>
  <p class="sub-question">a) Is Sophie correct? <input type="text" class="answer-box-word" data-answer="No"> (Yes / No)</p>
  <p class="sub-question">b) The correct answer is: <input type="text" class="answer-box" data-answer="127"></p>
</div>
```

### Q5 - Interpret Remainder Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Think about the remainder.</p>
  <div class="word-problem-box">
    <span class="character-icon">🚐</span>
    <span class="story-text"><strong>2,350 people</strong> need transport. Each minibus holds <strong>8 people</strong>. How many minibuses are needed?</span>
  </div>
  <p class="sub-question">a) 2,350 ÷ 8 = <input type="text" class="answer-box" data-answer="293 r 6"></p>
  <p class="sub-question">b) Number of minibuses needed: <input type="text" class="answer-box" data-answer="294"></p>
  <p class="sub-question">c) Why do we round up? Because <input type="text" class="answer-box-word" data-answer="everyone needs transport"></p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "The remainder in a division calculation is always less than the divisor."
    </p>
  </div>
  <p class="sub-question">a) Answer: <input type="text" class="answer-box-word" data-answer="Always"></p>
  <p class="sub-question">b) Explain why: If remainder equals or exceeds divisor, we can divide <input type="text" class="answer-box-word" data-answer="again"></p>
</div>
```

### Q5 - Explain Method Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Show how to check a division.</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;">Check: 4,536 ÷ 7 = 648</p>
  </div>
  <p class="sub-question">a) Calculate: 4,536 ÷ 7 = <input type="text" class="answer-box" data-answer="648"></p>
  <p class="sub-question">b) Check using multiplication: 648 × 7 = <input type="text" class="answer-box" data-answer="4536"></p>
  <p class="sub-question">c) Does it match the original dividend? <input type="text" class="answer-box-word" data-answer="Yes"></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 152, 156</p>
  <p><strong>2.</strong> 147, 144</p>
  <p><strong>3.</strong> 312</p>
  <p><strong>4.</strong> 513</p>
  <p><strong>5.</strong> No, 127</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses. Each answer on its own line with question number prefix. Remainders written as "r 3" format.

## CALCULATION REFERENCE (Common Divisions)

### Foundation Level Examples:
| Calculation | Quotient |
|-------------|----------|
| 456 ÷ 3 | 152 |
| 624 ÷ 4 | 156 |
| 735 ÷ 5 | 147 |
| 864 ÷ 6 | 144 |
| 847 ÷ 4 | 211 r 3 |
| 1,359 ÷ 6 | 226 r 3 |
| 1,248 ÷ 4 | 312 |
| 2,565 ÷ 5 | 513 |

### Practice Level Examples:
| Calculation | Quotient |
|-------------|----------|
| 2,436 ÷ 6 | 406 |
| 3,255 ÷ 5 | 651 |
| 4,284 ÷ 7 | 612 |
| 4,872 ÷ 8 | 609 |
| 5,481 ÷ 9 | 609 |
| 5,670 ÷ 9 | 630 |
| 3,654 ÷ 6 | 609 |
| 4,783 ÷ 7 | 683 r 2 |

### Challenge Level Examples:
| Calculation | Quotient |
|-------------|----------|
| 6,328 ÷ 8 | 791 |
| 7,236 ÷ 9 | 804 |
| 8,456 ÷ 8 | 1,057 |
| 9,324 ÷ 9 | 1,036 |
| 7,371 ÷ 9 | 819 |
| 8,424 ÷ 8 | 1,053 |
| 6,384 ÷ 8 | 798 |

## SHORT DIVISION METHOD STEPS (Bus Stop)
For children's reference and teacher guidance:

**Example: 2,436 ÷ 6**
```
Step 1: Set up bus stop
        ___________
    6 ) 2 4 3 6

Step 2: 2 ÷ 6 = 0 (can't divide, combine with next)
Step 3: 24 ÷ 6 = 4 remainder 0
        ___4_______
    6 ) 2 4 3 6

Step 4: 3 ÷ 6 = 0 remainder 3 (write 0, carry 3)
        ___4_0_____
    6 ) 2 4 ³3 6

Step 5: 36 ÷ 6 = 6 remainder 0
        ___4_0_6___
    6 ) 2 4 ³3 6

Answer: 406
```

**Example with remainder: 4,783 ÷ 7**
```
        ___6_8_3___
    7 ) 4 7 8 3
         ⁶ ¹

4 ÷ 7 = 0 r 4 → 47 ÷ 7 = 6 r 5
58 ÷ 7 = 8 r 2 → 23 ÷ 7 = 3 r 2

Answer: 683 r 2
```

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Short division (bus stop) method used?
- [ ] Appropriate number ranges for Year 5?
- [ ] Remainders handled correctly (r X format)?
- [ ] Real-world contexts in application questions?
- [ ] Remainder interpretation included?
- [ ] Checking with multiplication included?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All calculations verified for accuracy?
- [ ] Year 5 appropriate vocabulary and difficulty?
