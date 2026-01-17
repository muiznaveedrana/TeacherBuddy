# Ages 8-9: Division Facts to 12×12 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 4 division facts questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, fact families, related division facts
**Section B: Application (Q3-Q4)** - Real-world division problems, sharing, grouping
**Section C: Reasoning (Q5)** - True/False, Error spotting, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 4 - MTC Inverse Operations)
- **Requirement:** Recall division facts corresponding to multiplication tables up to 12×12
- **Focus dividends:** Products from 6×, 7×, 8×, 9×, 11×, 12× tables
- **Key link:** Division is the INVERSE of multiplication (if 7×8=56, then 56÷7=8 and 56÷8=7)
- **Speed target:** Instant recall within 3-6 seconds (MTC preparation)
- **Vocabulary:** dividend, divisor, quotient, share, group, divide equally
- **Key misconception:** "Division always makes numbers smaller" (not true with fractions/decimals)
- **Common error:** Confusing 56÷7 with 56-7

## DIFFICULT DIVISION FACTS TO INCLUDE
Focus on inverse of hardest times tables:
- 42÷6, 42÷7, 56÷7, 56÷8, 63÷7, 63÷9
- 48÷6, 48÷8, 72÷8, 72÷9
- 54÷6, 54÷9, 81÷9
- 121÷11, 132÷11, 132÷12, 144÷12

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
.sharing-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.sharing-row{font-size:24pt;margin:3px 0;letter-spacing:6px}
.sharing-label{font-size:12pt;color:#666;margin-top:10px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:12px;margin:8px 0}
.answer-box{display:inline-block;min-width:70px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:55px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Division facts grid**: 6 division problems from Year 4 focus tables (6, 7, 8, 9, 11, 12)
- **Fact family**: Given product and factors, write 4 related facts (2×, 2÷)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Missing dividend/divisor**: 4 equations with missing numbers
- **Related facts**: "If 7×8=56, what is 56÷7? What is 56÷8?"
- **Division grid**: 6 more division problems (different from Q1)

### Q3 OPTIONS (Application - Pick ONE):
- **Sharing context**: Items shared equally between groups
- **Grouping context**: How many groups can be made?
- **Array division**: Visual showing rows/columns, find one dimension

### Q4 OPTIONS (Application - Pick ONE):
- **Multi-step division problem**: Real-world context requiring division
- **Comparison problem**: "How many times more/fewer?"
- **Word problem with remainder interpretation**: Practical context

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Character subtracts instead of divides (56÷7=49)
- **Always/Sometimes/Never**: "Division always gives a smaller answer"
- **Use multiplication to check**: "How can you check 72÷8=9?"
- **Explain inverse relationship**: "Use 8×9=72 to work out 72÷9"

## 6 WORKSHEET VARIATIONS

### WS1: Foundation 1 (Easy - Food Theme - Focus: 6÷ and simpler facts)
| Q | Type | Details |
|---|------|---------|
| Q1 | Division grid | 24÷6, 30÷6, 36÷6, 42÷6, 48÷6, 54÷6 → 4, 5, 6, 7, 8, 9 |
| Q2 | Missing | 42÷___=7, ___÷6=8, 36÷___=6, ___÷6=9 → 6, 48, 6, 54 |
| Q3 | Sharing | 48 cookies shared between 6 plates → 8 |
| Q4 | Word problem | "Chef has 54 eggs. Puts 6 in each box. How many boxes?" → 9 |
| Q5 | Error | "56÷7=49 because 56-7=49" → No, 8 |

### WS2: Foundation 2 (Easy - Sports Theme - Focus: 7÷ facts)
| Q | Type | Details |
|---|------|---------|
| Q1 | Division grid | 21÷7, 28÷7, 35÷7, 42÷7, 49÷7, 56÷7 → 3, 4, 5, 6, 7, 8 |
| Q2 | Related | If 7×8=56, then 56÷7=?, 56÷8=?, 8×7=? → 8, 7, 56 |
| Q3 | Grouping | 63 players, teams of 7 → 9 teams |
| Q4 | Word problem | "49 stickers shared between 7 friends" → 7 each |
| Q5 | Error | "63÷7=56 because 63-7=56" → No, 9 |

### WS3: Practice 1 (Average - Nature Theme - Focus: 8÷ and 9÷)
| Q | Type | Details |
|---|------|---------|
| Q1 | Fact family | Numbers 8, 9, 72 → 8×9=72, 9×8=72, 72÷8=9, 72÷9=8 |
| Q2 | Division grid | 48÷8, 56÷8, 64÷8, 54÷9, 63÷9, 81÷9 → 6, 7, 8, 6, 7, 9 |
| Q3 | Sharing | 72 seeds into 8 pots → 9 seeds each |
| Q4 | Multi-step | "Garden has 81 flowers. 9 in each row. How many rows?" → 9 |
| Q5 | Check | "Use multiplication to check: 72÷8=9. Check: 9×8=?" → 72 |

### WS4: Practice 2 (Average - School Theme - Focus: 11÷ and 12÷)
| Q | Type | Details |
|---|------|---------|
| Q1 | Division grid | 66÷11, 77÷11, 88÷11, 72÷12, 84÷12, 96÷12 → 6, 7, 8, 6, 7, 8 |
| Q2 | Missing | 99÷___=9, ___÷12=9, 121÷___=11, ___÷11=12 → 11, 108, 11, 132 |
| Q3 | Grouping | 132 pencils into boxes of 11 → 12 boxes |
| Q4 | Word problem | "144 chairs in 12 equal rows" → 12 chairs per row |
| Q5 | Always/Sometimes/Never | "When you divide by 12, you always get a smaller answer" → Sometimes |

### WS5: Practice 3 (Average - Travel Theme - Focus: Mixed harder facts)
| Q | Type | Details |
|---|------|---------|
| Q1 | Fact family | Numbers 7, 9, 63 → 7×9=63, 9×7=63, 63÷7=9, 63÷9=7 |
| Q2 | Division grid | 42÷6, 56÷8, 63÷7, 72÷9, 84÷12, 99÷11 → 7, 7, 9, 8, 7, 9 |
| Q3 | Sharing | 108 passengers on 12 buses → 9 per bus |
| Q4 | Multi-step | "Ferry has 88 seats in 11 rows. How many seats per row?" → 8 |
| Q5 | Explain | "Use 8×7=56 to work out 56÷8" → 56÷8=7 (inverse) |

### WS6: Practice 4 (Average - Party Theme - Focus: All tables mixed)
| Q | Type | Details |
|---|------|---------|
| Q1 | Division grid | 48÷6, 63÷9, 77÷7, 96÷8, 110÷11, 132÷12 → 8, 7, 11, 12, 10, 11 |
| Q2 | Missing | 72÷___=8, ___÷7=9, 81÷___=9, ___÷12=11 → 9, 63, 9, 132 |
| Q3 | Grouping | 144 party bags into groups of 12 → 12 groups |
| Q4 | Word problem | "168 sweets shared between 12 children" → 14 each |
| Q5 | Error | "72÷9=63 because 72-9=63" → No, 8 |

## TEMPLATES

### Q1 - Division Facts Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Work out these divisions.</p>
  <div class="fluency-grid">
    <div class="fluency-item">24 ÷ 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">30 ÷ 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">36 ÷ 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">42 ÷ 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">48 ÷ 6 = <span class="answer-box-small"></span></div>
    <div class="fluency-item">54 ÷ 6 = <span class="answer-box-small"></span></div>
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
    <div class="missing-number-item">42 ÷ <span class="answer-box-small"></span> = 7</div>
    <div class="missing-number-item"><span class="answer-box-small"></span> ÷ 6 = 8</div>
    <div class="missing-number-item">36 ÷ <span class="answer-box-small"></span> = 6</div>
    <div class="missing-number-item"><span class="answer-box-small"></span> ÷ 6 = 9</div>
  </div>
</div>
```

### Q3 - Sharing Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the sharing problem.</p>
  <div class="sharing-container">
    <div class="sharing-row">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <div class="sharing-row">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <div class="sharing-row">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <div class="sharing-row">🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪</div>
    <p class="sharing-label">48 cookies to share between 6 plates</p>
  </div>
  <p class="sub-question">Division: 48 ÷ 6 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Each plate gets: <span class="answer-box-small"></span> cookies</p>
</div>
```

### Q3 - Grouping Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the grouping problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">⚽</span>
    <span class="story-text">There are <strong>63 players</strong>. They need to be put into teams of <strong>7</strong>. How many teams can be made?</span>
  </div>
  <p class="sub-question">Division: 63 ÷ 7 = <span class="answer-box-small"></span> teams</p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👨‍🍳</span>
    <span class="story-text"><strong>Chef Carlos</strong> has 54 eggs. He puts 6 eggs in each box. How many boxes does he need?</span>
  </div>
  <p class="sub-question">54 ÷ 6 = <span class="answer-box-small"></span> boxes</p>
</div>
```

### Q5 - Spot the Error Template (CRITICAL):
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Look at what Tom says.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "56 ÷ 7 = 49 because 56 - 7 = 49"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is the correct answer for 56 ÷ 7? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) Tom confused <span class="answer-box-word"></span> with <span class="answer-box-word"></span></p>
</div>
```

### Q5 - Check with Multiplication Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Use multiplication to check division.</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      72 ÷ 8 = 9
    </p>
  </div>
  <p class="sub-question">a) Check by multiplying: 9 × 8 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) Is the division correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">c) Explain: Division and multiplication are <span class="answer-box-word"></span> operations</p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "When you divide a number by 12, you always get a smaller answer."
    </p>
  </div>
  <p class="sub-question">a) Circle: <strong>Always</strong> / <strong>Sometimes</strong> / <strong>Never</strong></p>
  <p class="sub-question">b) Give an example: 12 ÷ 12 = <span class="answer-box-small"></span> (same, not smaller)</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 4, 5, 6, 7, 8, 9</p>
  <p><strong>2.</strong> 6, 48, 6, 54</p>
  <p><strong>3.</strong> 8, 8</p>
  <p><strong>4.</strong> 9</p>
  <p><strong>5.</strong> No, 8, division, subtraction</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## DIVISION FACTS REFERENCE (All to 12×12)

### Focus Division Facts for Year 4 (MTC Inverse)
| ÷ | 6 | 7 | 8 | 9 | 11 | 12 |
|---|---|---|---|---|---|---|
| 6 | 1 | - | - | - | - | - |
| 12 | 2 | - | - | - | - | 1 |
| 18 | 3 | - | - | 2 | - | - |
| 24 | 4 | - | 3 | - | - | 2 |
| 30 | 5 | - | - | - | - | - |
| 36 | 6 | - | - | 4 | - | 3 |
| 42 | 7 | 6 | - | - | - | - |
| 48 | 8 | - | 6 | - | - | 4 |
| 54 | 9 | - | - | 6 | - | - |
| 56 | - | 8 | 7 | - | - | - |
| 63 | - | 9 | - | 7 | - | - |
| 64 | - | - | 8 | - | - | - |
| 66 | 11 | - | - | - | 6 | - |
| 72 | 12 | - | 9 | 8 | - | 6 |
| 77 | - | 11 | - | - | 7 | - |
| 81 | - | - | - | 9 | - | - |
| 84 | 14 | 12 | - | - | - | 7 |
| 88 | - | - | 11 | - | 8 | - |
| 96 | 16 | - | 12 | - | - | 8 |
| 99 | - | - | - | 11 | 9 | - |
| 108 | 18 | - | - | 12 | - | 9 |
| 110 | - | - | - | - | 10 | - |
| 121 | - | - | - | - | 11 | - |
| 132 | 22 | - | - | - | 12 | 11 |
| 144 | 24 | - | 18 | 16 | - | 12 |

### Key Strategies to Include:
- **Inverse relationship**: If 7×8=56, then 56÷7=8 and 56÷8=7
- **Checking with multiplication**: Division × divisor = dividend
- **Sharing vs Grouping**: Two models of division
- **Using known facts**: 72÷8 = ? Think: 8 × ? = 72

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] ALL division facts from tables 2× to 12× included?
- [ ] Focus on Year 4 difficult facts (÷6, ÷7, ÷8, ÷9, ÷11, ÷12)?
- [ ] Q5 tests ÷ vs − misconception OR includes reasoning?
- [ ] Link to multiplication clearly shown (inverse relationship)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] Real-world sharing/grouping problems in Q3-Q4?
- [ ] Year 4 appropriate (ages 8-9)?
