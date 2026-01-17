# Ages 8-9: Times Tables to 12×12 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 4 times tables questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, fact families, related facts
**Section B: Application (Q3-Q4)** - Real-world problems, scaling, arrays
**Section C: Reasoning (Q5)** - True/False, Pattern spotting, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 4 - MTC Preparation)
- **Tables:** ALL tables 2× to 12× (up to ×12)
- **Focus tables:** 6×, 7×, 9×, 11×, 12× (new for Year 4)
- **Review tables:** 2×, 3×, 4×, 5×, 8×, 10× (mastered in Year 3)
- **Speed target:** Instant recall within 3 seconds (MTC format: 6 seconds)
- **Related skills:** Division facts, factor pairs, commutativity
- **Key misconception:** Confusing × with + (7×6=13 instead of 42)

## DIFFICULT FACTS TO INCLUDE
Year 4 students struggle most with:
- 7×6=42, 7×7=49, 7×8=56, 7×9=63
- 8×6=48, 8×7=56, 8×8=64
- 9×6=54, 9×7=63, 9×8=72
- 11×11=121, 12×12=144

## CSS (Compact - Mixed Layout - Year 4)
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
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:14px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:16pt;font-family:'Courier New',monospace}
.fact-family-box{background:#FAFAFA;border:2px solid #2196F3;border-radius:8px;padding:12px;margin:10px 0}
.fact-family-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fact-family-item{padding:10px;background:#E3F2FD;border:2px solid #2196F3;border-radius:6px;font-size:16pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.missing-number-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:12px 0}
.missing-number-item{padding:14px;border:2px solid #FF9800;border-radius:6px;background:#FFF3E0;font-size:18pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.array-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.array-row{font-size:24pt;margin:3px 0;letter-spacing:6px}
.array-label{font-size:12pt;color:#666;margin-top:10px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:12px;margin:8px 0}
.pattern-box{background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:12px;margin:10px 0}
.pattern-sequence{font-size:20pt;font-weight:bold;font-family:'Courier New',monospace;margin:10px 0}
.answer-box{display:inline-block;min-width:70px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:55px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Times tables grid**: 6 calculations mixing NEW Year 4 tables (6, 7, 9, 11, 12)
- **Fact family**: Given 3 numbers, write 4 related facts (2×, 2÷)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Missing number**: 4 equations with missing factor or product (harder tables)
- **Division facts**: 6 division problems using known times tables
- **Related facts**: "If 7×8=56, what is 8×7? What is 56÷7?"

### Q3 OPTIONS (Application - Pick ONE):
- **Array context**: Real-world array (seats in rows, eggs in cartons, tiles)
- **Scaling problem**: "Tom has 3 times as many stickers as Sam"
- **Equal groups**: Picture showing groups of objects

### Q4 OPTIONS (Application - Pick ONE):
- **Multi-step word problem**: Two operations needed
- **Comparison word problem**: "How many more does X have than Y?"
- **Real-world context**: Sports teams, packing items, money

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Character confuses × with + (CRITICAL misconception)
- **Always/Sometimes/Never**: "Multiplying two numbers gives an even answer"
- **Pattern spotting**: "What pattern do you notice in the 9 times table?"
- **Explain your thinking**: "How can you use 6×7 to work out 6×8?"

## 6 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Food Theme - Focus: 6× and 11× tables)
| Q | Type | Details |
|---|------|---------|
| Q1 | Grid | 6×4, 6×5, 6×7, 11×3, 11×5, 11×6 → 24, 30, 42, 33, 55, 66 |
| Q2 | Missing | 6×___=36, ___×11=77, 6×___=54, ___×6=48 → 6, 7, 9, 8 |
| Q3 | Array | 6 rows of 8 cupcakes → 48 |
| Q4 | Word problem | "Baker has 11 trays with 7 cookies each" → 77 |
| Q5 | Error | "6×7=13 because 6+7=13" → No, 42 |

### WS2: Foundation (Easy - Sports Theme - Focus: 7× table)
| Q | Type | Details |
|---|------|---------|
| Q1 | Grid | 7×3, 7×4, 7×5, 7×6, 7×8, 7×9 → 21, 28, 35, 42, 56, 63 |
| Q2 | Division | 42÷7, 56÷7, 63÷7, 28÷7, 49÷7, 35÷7 → 6, 8, 9, 4, 7, 5 |
| Q3 | Equal groups | 7 football teams with 11 players → 77 |
| Q4 | Word problem | "7 swimming lanes, 8 swimmers in each" → 56 |
| Q5 | Error | "7×8=15 because 7+8=15" → No, 56 |

### WS3: Varied (Average - Nature Theme - Focus: 8× and 9× tables)
| Q | Type | Details |
|---|------|---------|
| Q1 | Fact family | Numbers 8, 9, 72 → 8×9=72, 9×8=72, 72÷8=9, 72÷9=8 |
| Q2 | Missing | 9×___=54, 8×___=64, ___×9=81, ___×8=72 → 6, 8, 9, 9 |
| Q3 | Array | 9 rows of 8 flowers → 72 |
| Q4 | Multi-step | "Garden has 8 rows of 6 tulips and 8 rows of 7 daffodils" → 48+56=104 |
| Q5 | Pattern | "9× table: 9,18,27,36... What do the digits add up to?" → 9 |

### WS4: Varied (Average - School Theme - Focus: 12× table)
| Q | Type | Details |
|---|------|---------|
| Q1 | Grid | 12×3, 12×4, 12×5, 12×6, 12×7, 12×8 → 36, 48, 60, 72, 84, 96 |
| Q2 | Related | If 12×6=72, then 6×12=?, 72÷12=?, 72÷6=? → 72, 6, 12 |
| Q3 | Scaling | "Class A has 8 pencils. Class B has 12 times as many" → 96 |
| Q4 | Word problem | "12 months in a year. How many months in 9 years?" → 108 |
| Q5 | Always/Sometimes/Never | "Multiples of 12 are always even" → Always |

### WS5: Challenge (Hard - Space Theme - Focus: Mixed difficult facts)
| Q | Type | Details |
|---|------|---------|
| Q1 | Grid | 7×7, 8×8, 9×9, 11×11, 12×12, 7×9 → 49, 64, 81, 121, 144, 63 |
| Q2 | Missing | 8×___=72, 9×___=108, ___×7=84, ___×11=132 → 9, 12, 12, 12 |
| Q3 | Array | 11 rows of 12 stars → 132 |
| Q4 | Multi-step | "Spaceship has 9 decks. Each deck has 8 cabins. Each cabin has 4 beds" → 288 |
| Q5 | Explain | "Use 7×8=56 to work out 7×9" → 56+7=63 |

### WS6: Challenge (Hard - Travel Theme - Focus: All tables mixed)
| Q | Type | Details |
|---|------|---------|
| Q1 | Fact family | Numbers 8, 7, 56 → 8×7=56, 7×8=56, 56÷8=7, 56÷7=8 |
| Q2 | Missing | 7×___=63, 9×___=72, ___×6=66, ___×8=96 → 9, 8, 11, 12 |
| Q3 | Scaling | "Express train is 9 times faster than walking. Walk=4mph" → 36mph |
| Q4 | Multi-step | "Plane has 12 rows. 6 seats per row. 3 planes" → 216 |
| Q5 | Always/Sometimes/Never | "When you multiply two odd numbers, the answer is odd" → Always |

## TEMPLATES

### Q1 - Times Tables Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Work out these multiplications.</p>
  <div class="fluency-grid">
    <div class="fluency-item">6 × 4 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">6 × 5 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">6 × 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">11 × 3 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">11 × 5 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">11 × 6 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q1 - Fact Family Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Complete the fact family for 8, 9 and 72.</p>
  <div class="fact-family-box">
    <div class="fact-family-grid">
      <div class="fact-family-item">8 × 9 = <span class="answer-box-small"></span></div>
      <div class="fact-family-item">9 × 8 = <span class="answer-box-small"></span></div>
      <div class="fact-family-item">72 ÷ 8 = <span class="answer-box-small"></span></div>
      <div class="fact-family-item">72 ÷ 9 = <span class="answer-box-small"></span></div>
    </div>
  </div>
</div>
```

### Q2 - Missing Number Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Find the missing numbers.</p>
  <div class="missing-number-grid">
    <div class="missing-number-item">6 × <span class="answer-box-small"></span> = 36</div>
    <div class="missing-number-item"><span class="answer-box-small"></span> × 11 = 77</div>
    <div class="missing-number-item">6 × <span class="answer-box-small"></span> = 54</div>
    <div class="missing-number-item"><span class="answer-box-small"></span> × 6 = 48</div>
  </div>
</div>
```

### Q2 - Division Facts Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Work out these divisions.</p>
  <div class="fluency-grid">
    <div class="fluency-item">42 ÷ 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">56 ÷ 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">63 ÷ 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">28 ÷ 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">49 ÷ 7 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">35 ÷ 7 = <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Array Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count the array.</p>
  <div class="array-container">
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <div class="array-row">🧁🧁🧁🧁🧁🧁🧁🧁</div>
    <p class="array-label">6 rows of 8 cupcakes</p>
  </div>
  <p class="sub-question">Multiplication: 6 × 8 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Total cupcakes: <span class="answer-box-small"></span></p>
</div>
```

### Q3 - Scaling Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the scaling problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">✏️</span>
    <span class="story-text">Class A has <strong>8 pencils</strong>. Class B has <strong>12 times as many</strong> pencils as Class A.</span>
  </div>
  <p class="sub-question">How many pencils does Class B have? <span class="answer-box"></span> pencils</p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👨‍🍳</span>
    <span class="story-text"><strong>Baker Ben</strong> has 11 trays. Each tray holds 7 cookies. How many cookies are there altogether?</span>
  </div>
  <p class="sub-question">11 × 7 = <span class="answer-box-small"></span> cookies</p>
</div>
```

### Q4 - Multi-step Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Solve this two-step problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🌷</span>
    <span class="story-text">A garden has <strong>8 rows of tulips</strong> with <strong>6 tulips</strong> in each row, and <strong>8 rows of daffodils</strong> with <strong>7 daffodils</strong> in each row. How many flowers are there altogether?</span>
  </div>
  <p class="sub-question">Tulips: 8 × 6 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Daffodils: 8 × 7 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Total: <span class="answer-box-small"></span> + <span class="answer-box-small"></span> = <span class="answer-box"></span> flowers</p>
</div>
```

### Q5 - Spot the Error Template (CRITICAL):
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Look at what Mia says.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <strong>Mia says:</strong> "6 × 7 = 13 because 6 + 7 = 13"
    </div>
  </div>
  <p class="sub-question">a) Is Mia correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is the correct answer for 6 × 7? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) Explain Mia's mistake: She confused <span class="answer-box-word"></span> with <span class="answer-box-word"></span></p>
</div>
```

### Q5 - Pattern Spotting Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Spot the pattern.</p>
  <div class="pattern-box">
    <p><strong>9 times table:</strong></p>
    <p class="pattern-sequence">9, 18, 27, 36, 45, 54, 63, 72, 81, 90</p>
  </div>
  <p class="sub-question">a) Add the digits of each number (e.g., 18 → 1+8=9)</p>
  <p class="sub-question">b) What do you notice? <span class="answer-box-word"></span></p>
  <p class="sub-question">c) What would be the digit sum of 9 × 11 = 99? <span class="answer-box-small"></span></p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "Multiples of 12 are always even numbers."
    </p>
  </div>
  <p class="sub-question">a) Circle: <strong>Always</strong> / <strong>Sometimes</strong> / <strong>Never</strong></p>
  <p class="sub-question">b) Give an example to prove your answer: 12 × <span class="answer-box-small"></span> = <span class="answer-box-small"></span></p>
</div>
```

### Q5 - Explain Thinking Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Use what you know to work out a new fact.</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      You know that 7 × 8 = 56
    </p>
  </div>
  <p class="sub-question">a) Use this to work out 7 × 9 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) Explain how you worked it out:</p>
  <p class="sub-question" style="margin-left:20px;">7 × 9 = 7 × 8 + <span class="answer-box-small"></span> = 56 + <span class="answer-box-small"></span> = <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 24, 30, 42, 33, 55, 66</p>
  <p><strong>2.</strong> 6, 7, 9, 8</p>
  <p><strong>3.</strong> 48, 48</p>
  <p><strong>4.</strong> 77</p>
  <p><strong>5.</strong> No, 42, multiplication, addition</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## TIMES TABLES REFERENCE (All to 12×12)

### Focus Tables for Year 4 (NEW)
| × | 6 | 7 | 9 | 11 | 12 |
|---|---|---|---|---|---|
| 1 | 6 | 7 | 9 | 11 | 12 |
| 2 | 12 | 14 | 18 | 22 | 24 |
| 3 | 18 | 21 | 27 | 33 | 36 |
| 4 | 24 | 28 | 36 | 44 | 48 |
| 5 | 30 | 35 | 45 | 55 | 60 |
| 6 | 36 | 42 | 54 | 66 | 72 |
| 7 | 42 | 49 | 63 | 77 | 84 |
| 8 | 48 | 56 | 72 | 88 | 96 |
| 9 | 54 | 63 | 81 | 99 | 108 |
| 10 | 60 | 70 | 90 | 110 | 120 |
| 11 | 66 | 77 | 99 | 121 | 132 |
| 12 | 72 | 84 | 108 | 132 | 144 |

### Strategies to Include:
- **6× table**: Double the 3× table
- **7× table**: Hardest - needs lots of practice
- **9× table**: Digit sum always = 9 (9×4=36, 3+6=9)
- **11× table**: Pattern up to 11×9 (11, 22, 33, 44, 55, 66, 77, 88, 99)
- **12× table**: Double the 6× table

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] ALL tables 2× to 12× included?
- [ ] Focus on Year 4 difficult facts (6×, 7×, 9×, 11×, 12×)?
- [ ] Q5 tests × vs + misconception OR includes reasoning?
- [ ] MTC-style instant recall questions included?
- [ ] Related division facts shown?
- [ ] Answer key comma-separated (no explanations)?
- [ ] Real-world word problems in Q3-Q4?
- [ ] Year 4 appropriate (ages 8-9)?
