# Ages 9-10: Multiply 4-Digit by 2-Digit Numbers (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 5 long multiplication questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Column method practice, estimation, checking strategies
**Section B: Application (Q3-Q4)** - Real-world contexts, multi-step problems, area models
**Section C: Reasoning (Q5)** - Error spotting, explain method, compare strategies

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 5 - NCETM 6-Week Focus)
- **Statutory requirement:** "Multiply numbers up to 4 digits by a one- or two-digit number using a formal written method, including long multiplication for two-digit numbers"
- **Prerequisite:** Year 4 short multiplication (4-digit × 1-digit), times tables to 12×12
- **Method:** Compact column method (long multiplication)
- **Key vocabulary:** multiply, product, factor, partial product, estimate, inverse
- **Related skills:** Estimation, checking with inverse, place value understanding

## COMMON MISCONCEPTIONS (Year 5 children)
1. **Place value alignment:** Not aligning digits correctly in columns
2. **Zero placeholder:** Forgetting the zero (or space) when multiplying by the tens digit
3. **Carrying errors:** Losing carried digits or adding them in wrong column
4. **Partial products:** Adding partial products incorrectly
5. **"Multiplication makes bigger":** Misunderstanding when multiplying by numbers < 10

## NUMBER RANGES FOR YEAR 5
| Level | 4-digit number | 2-digit multiplier | Approx. product |
|-------|----------------|-------------------|-----------------|
| Foundation | 1,000-2,999 | 11-25 | 11,000-75,000 |
| Practice | 1,000-4,999 | 21-45 | 21,000-225,000 |
| Challenge | 1,000-9,999 | 31-99 | 31,000-990,000 |

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
.column-method{font-family:'Courier New',monospace;font-size:16pt;font-weight:bold;text-align:right;background:#FAFAFA;padding:10px;border-radius:6px;margin:8px 0}
.column-method .line{border-top:2px solid #333;margin-top:5px;padding-top:5px}
.estimation-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:10px 0}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:12px;margin:8px 0}
.error-box{background:#FFEBEE;border:2px solid #EF5350;border-radius:8px;padding:12px;margin:10px 0}
.method-comparison{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:12px 0}
.method-box{padding:12px;border:2px solid #2196F3;border-radius:8px;background:#fff}
.answer-box{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:60px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-large{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-word{display:inline-block;min-width:120px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Calculation grid**: 2 long multiplication problems with column layout
- **Step-by-step completion**: Partially completed column method to finish
- **Estimation first**: Estimate then calculate (important Year 5 skill)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Calculation grid**: 2 more problems (different difficulty)
- **Inverse check**: Calculate then check using division
- **Compare and order**: Calculate two products, compare sizes
- **Missing digit**: Long multiplication with one digit missing

### Q3 OPTIONS (Application - Pick ONE):
- **Area context**: Calculate area of rectangle (length × width)
- **Scaling problem**: Mass, distance, capacity problems
- **Real-world arrays**: Stadium seats, theatre seating, tiles

### Q4 OPTIONS (Application - Pick ONE):
- **Multi-step word problem**: Requires multiplication + another operation
- **Cost calculation**: Total cost of multiple expensive items
- **Distance/speed/time**: Journey calculations
- **Comparison word problem**: "How many more/fewer?"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Common place value or carrying mistake
- **Always/Sometimes/Never**: Multiplication properties
- **Explain the method**: "Show how you would calculate..."
- **Compare methods**: Grid method vs column method

## 6 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Shopping Theme - Focus: 4-digit × 2-digit basic)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 1,245 × 12, 2,134 × 11 | 14940, 23474 |
| Q2 | Calculation grid | 1,523 × 13, 1,872 × 14 | 19799, 26208 |
| Q3 | Area context | Field 1,450m × 23m | 33350 |
| Q4 | Word problem | 12 TVs at £1,299 each | 15588 |
| Q5 | Error spotting | Forgot zero placeholder | No, 23850 |

### WS2: Foundation (Easy - Sports Theme - Focus: Estimation)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Estimate + calculate | 2,315 × 14 ≈ 2000×14=28000 | 28000, 32410 |
| Q2 | Estimate + calculate | 1,876 × 21 ≈ 2000×20=40000 | 40000, 39396 |
| Q3 | Stadium seats | 2,450 seats × 15 rows | 36750 |
| Q4 | Word problem | 21 buses, 1,250 km each | 26250 |
| Q5 | Error spotting | Carrying error in tens | No, correct answer |

### WS3: Practice (Average - Travel Theme - Focus: Larger numbers)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 3,456 × 23, 4,127 × 32 | 79488, 132064 |
| Q2 | Inverse check | Calculate 2,584 × 34, then 87856 ÷ 34 | 87856, 2584 |
| Q3 | Distance context | Train 3,250 km × 24 journeys | 78000 |
| Q4 | Multi-step | 35 coaches × 2,150 miles + 500 return | 75750 |
| Q5 | Explain method | Show steps for 1,234 × 45 | 55530 |

### WS4: Practice (Average - Construction Theme - Focus: Area problems)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 2,875 × 36, 3,924 × 28 | 103500, 109872 |
| Q2 | Compare products | 4,250 × 24 vs 3,800 × 27 | 102000, 102600, second |
| Q3 | Tile calculation | Floor 2,350 cm × 42 tiles per row | 98700 |
| Q4 | Cost calculation | 28 windows at £2,475 each | 69300 |
| Q5 | Always/Sometimes/Never | "4-digit × 2-digit always gives 6-digit" | Sometimes |

### WS5: Practice (Average - Environment Theme - Focus: Multi-step)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 5,248 × 43, 4,736 × 51 | 225664, 241536 |
| Q2 | Missing digit | 3,_52 × 24 = 84,048 | 5 (3,502 × 24) |
| Q3 | Tree planting | 3,500 trees × 45 rows | 157500 |
| Q4 | Multi-step | 38 days × 4,250 litres - 15,000 wasted | 146500 |
| Q5 | Explain method | Use 2,500 × 40 to estimate 2,543 × 38 | 100000, close to 96634 |

### WS6: Practice (Average - Science Theme - Focus: Checking strategies)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Calculation grid | 6,124 × 47, 7,235 × 56 | 287828, 405160 |
| Q2 | Estimate then calculate | 4,876 × 53 ≈ 5000×50 | 250000, 258428 |
| Q3 | Space context | Satellite 5,400 km × 62 orbits | 334800 |
| Q4 | Word problem | 53 weeks × 7,450 bacteria samples | 394850 |
| Q5 | Error spotting | Decimal point placed wrong | Correct position |

## TEMPLATES

### Worksheet Header Template:
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">Long Multiplication: 4-Digit × 2-Digit <span class="layout-badge">Mixed Layout</span></h1>
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

### Q1 - Calculation Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Calculate using long multiplication.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a)</p>
      <div class="column-method">
        &nbsp;&nbsp;&nbsp;&nbsp;1 2 4 5<br>
        × &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 2<br>
        <div class="line"></div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="14940"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b)</p>
      <div class="column-method">
        &nbsp;&nbsp;&nbsp;&nbsp;2 1 3 4<br>
        × &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 1<br>
        <div class="line"></div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="23474"></p>
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
      <p class="calculation-label">a) 2,315 × 14</p>
      <div class="estimation-box">
        <p>Estimate: 2,000 × 14 = <input type="text" class="answer-box-small" data-answer="28000"></p>
      </div>
      <p>Calculate: 2,315 × 14 = <input type="text" class="answer-box" data-answer="32410"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) 1,876 × 21</p>
      <div class="estimation-box">
        <p>Estimate: 2,000 × 20 = <input type="text" class="answer-box-small" data-answer="40000"></p>
      </div>
      <p>Calculate: 1,876 × 21 = <input type="text" class="answer-box" data-answer="39396"></p>
    </div>
  </div>
</div>
```

### Q2 - Inverse Check Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Calculate, then check using division.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) Calculate:</p>
      <p style="font-size:16pt;font-weight:bold;">2,584 × 34 = <input type="text" class="answer-box" data-answer="87856"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) Check:</p>
      <p style="font-size:16pt;font-weight:bold;"><input type="text" class="answer-box-small" data-answer="87856"> ÷ 34 = <input type="text" class="answer-box-small" data-answer="2584"></p>
    </div>
  </div>
</div>
```

### Q3 - Area Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Calculate the area.</p>
  <div class="word-problem-box">
    <span class="character-icon">🏟️</span>
    <span class="story-text">A sports field is <strong>1,450 metres</strong> long and <strong>23 metres</strong> wide.</span>
  </div>
  <p class="sub-question">Area = length × width</p>
  <p class="sub-question">Area = 1,450 × 23 = <input type="text" class="answer-box" data-answer="33350"> m²</p>
</div>
```

### Q3 - Stadium Seats Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🏟️</span>
    <span class="story-text">A stadium has <strong>15 sections</strong>. Each section has <strong>2,450 seats</strong>. How many seats are there in total?</span>
  </div>
  <p class="sub-question">Calculation: 2,450 × 15 = <input type="text" class="answer-box" data-answer="36750"> seats</p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">🛒</span>
    <span class="story-text"><strong>Electronics Store</strong> sells 12 televisions. Each television costs <strong>£1,299</strong>. What is the total cost?</span>
  </div>
  <p class="sub-question">Total cost: 12 × £1,299 = £<input type="text" class="answer-box" data-answer="15588"></p>
</div>
```

### Q4 - Multi-step Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Solve this two-step problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🚌</span>
    <span class="story-text">A coach company has <strong>35 coaches</strong>. Each coach travels <strong>2,150 miles</strong> in a month. If they add <strong>500 miles</strong> for return journeys, what is the total distance?</span>
  </div>
  <p class="sub-question">Step 1: 35 × 2,150 = <input type="text" class="answer-box" data-answer="75250"> miles</p>
  <p class="sub-question">Step 2: <input type="text" class="answer-box-small" data-answer="75250"> + 500 = <input type="text" class="answer-box" data-answer="75750"> miles</p>
</div>
```

### Q5 - Error Spotting Template (CRITICAL):
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the mistake.</p>
  <div class="error-box">
    <p><strong>Jake calculated:</strong></p>
    <div class="column-method" style="text-align:left;padding-left:20px;">
      &nbsp;&nbsp;&nbsp;&nbsp;1 9 5 0<br>
      × &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 2<br>
      ────────<br>
      &nbsp;&nbsp;&nbsp;&nbsp;3 9 0 0 &nbsp;(1,950 × 2)<br>
      &nbsp;&nbsp;1 9 5 0 &nbsp;&nbsp;(1,950 × 1) ❌<br>
      ────────<br>
      &nbsp;&nbsp;2 3 4 5 0
    </div>
  </div>
  <p class="sub-question">a) Is Jake correct? <input type="text" class="answer-box-word" data-answer="No"> (Yes / No)</p>
  <p class="sub-question">b) What mistake did Jake make? <input type="text" class="answer-box-word" data-answer="forgot zero placeholder"></p>
  <p class="sub-question">c) The correct answer is: <input type="text" class="answer-box" data-answer="23400"></p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "When you multiply a 4-digit number by a 2-digit number, the answer always has 6 digits."
    </p>
  </div>
  <p class="sub-question">a) Answer: <input type="text" class="answer-box-word" data-answer="Sometimes"></p>
  <p class="sub-question">b) Example to prove: <input type="text" class="answer-box-small" data-answer="1000"> × <input type="text" class="answer-box-small" data-answer="10"> = <input type="text" class="answer-box" data-answer="10000"></p>
</div>
```

### Q5 - Explain Method Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Explain how you would estimate this calculation.</p>
  <div class="reasoning-box">
    <p style="font-size:18pt;font-weight:bold;text-align:center;margin:10px 0;">
      2,543 × 38
    </p>
  </div>
  <p class="sub-question">a) Round 2,543 to the nearest thousand: <input type="text" class="answer-box-small" data-answer="3000"></p>
  <p class="sub-question">b) Round 38 to the nearest ten: <input type="text" class="answer-box-small" data-answer="40"></p>
  <p class="sub-question">c) Estimate: <input type="text" class="answer-box-small" data-answer="3000"> × <input type="text" class="answer-box-small" data-answer="40"> = <input type="text" class="answer-box" data-answer="120000"></p>
  <p class="sub-question">d) Is this estimate close to the actual answer of 96,634? <input type="text" class="answer-box-word" data-answer="Yes"></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 14940, 23474</p>
  <p><strong>2.</strong> 19799, 26208</p>
  <p><strong>3.</strong> 33350</p>
  <p><strong>4.</strong> 15588</p>
  <p><strong>5.</strong> No, forgot zero placeholder, 23400</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses. Each answer on its own line with question number prefix.

## CALCULATION REFERENCE (Common Products)

### Foundation Level Examples:
| Calculation | Product |
|-------------|---------|
| 1,245 × 12 | 14,940 |
| 2,134 × 11 | 23,474 |
| 1,523 × 13 | 19,799 |
| 1,872 × 14 | 26,208 |
| 2,315 × 14 | 32,410 |
| 1,876 × 21 | 39,396 |

### Practice Level Examples:
| Calculation | Product |
|-------------|---------|
| 3,456 × 23 | 79,488 |
| 4,127 × 32 | 132,064 |
| 2,584 × 34 | 87,856 |
| 2,875 × 36 | 103,500 |
| 3,924 × 28 | 109,872 |
| 4,250 × 24 | 102,000 |
| 3,800 × 27 | 102,600 |

### Challenge Level Examples:
| Calculation | Product |
|-------------|---------|
| 5,248 × 43 | 225,664 |
| 4,736 × 51 | 241,536 |
| 6,124 × 47 | 287,828 |
| 7,235 × 56 | 405,160 |
| 4,876 × 53 | 258,428 |

## LONG MULTIPLICATION METHOD STEPS
For children's reference and teacher guidance:

**Example: 2,543 × 38**
```
Step 1: Set up vertically
    2 5 4 3
  ×     3 8
  ─────────

Step 2: Multiply by ones (8)
    2 5 4 3
  ×     3 8
  ─────────
  2 0 3 4 4  ← (2,543 × 8)

Step 3: Multiply by tens (30) - add zero placeholder
    2 5 4 3
  ×     3 8
  ─────────
  2 0 3 4 4
7 6 2 9 0   ← (2,543 × 30)

Step 4: Add partial products
  2 0 3 4 4
+ 7 6 2 9 0
─────────
  9 6 6 3 4
```

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] 4-digit × 2-digit calculations throughout?
- [ ] Estimation skills included?
- [ ] Place value understanding tested?
- [ ] Common misconception addressed in Q5?
- [ ] Real-world contexts in application questions?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All calculations verified for accuracy?
- [ ] Year 5 appropriate vocabulary and difficulty?
