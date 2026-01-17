# Ages 9-10: Improper Fractions and Mixed Numbers (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 5 fraction conversion questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Conversion practice (improper ↔ mixed numbers)
**Section B: Application (Q3-Q4)** - Real-world contexts (pizza, cake, sharing scenarios)
**Section C: Reasoning (Q5)** - Error spotting, compare methods, explain equivalence

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 5 - NCETM 7-Week Fractions Unit)
- **Statutory requirement:** "Recognise mixed numbers and improper fractions and convert from one form to the other"
- **Prerequisite:** Year 4 equivalent fractions, understanding of numerator/denominator
- **Key vocabulary:** improper fraction, mixed number, convert, equivalent, numerator, denominator
- **Related skills:** Division with remainders, multiplication facts, visual representation

## KEY CONCEPTS (Year 5 children)
- **Proper fraction**: Numerator < denominator (less than 1 whole)
- **Improper fraction**: Numerator ≥ denominator (equal to or more than 1 whole)
- **Mixed number**: Whole number + proper fraction (e.g., 2¾)
- **Equivalence**: Same value, different notation (7/4 = 1¾)

## CONVERSION METHODS

### Improper → Mixed (Divide)
**Example: 7/4 to mixed**
- 7 ÷ 4 = 1 remainder 3
- Answer: 1¾

### Mixed → Improper (Multiply then Add)
**Example: 2⅓ to improper**
- (2 × 3) + 1 = 7
- Answer: 7/3

## COMMON MISCONCEPTIONS (Year 5 children)
1. **Confusing numerator/denominator** when converting
2. **Adding instead of multiplying** whole by denominator
3. **Forgetting remainder** in improper → mixed
4. **Thinking 3/3 = 3** instead of 1 whole
5. **Not simplifying** when possible

## NUMBER RANGES FOR YEAR 5
| Level | Denominators | Numerators (improper) | Mixed Numbers |
|-------|--------------|----------------------|---------------|
| Foundation | 2, 3, 4, 5 | 3-12 | 1½ to 2¾ |
| Practice | 2, 3, 4, 5, 6, 8 | 5-20 | 1½ to 4⅝ |
| Challenge | 2-10 | 7-30 | 2½ to 5⅞ |

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
.fraction-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:12px 0}
.fraction-item{padding:15px;border:2px solid #E91E63;border-radius:8px;background:#fff;text-align:center}
.fraction-display{font-size:28pt;font-weight:bold;color:#C2185B;margin:10px 0}
.frac{display:inline-block;text-align:center;vertical-align:middle}
.frac-num{display:block;border-bottom:3px solid #333;padding-bottom:3px;font-weight:bold}
.frac-den{display:block;padding-top:3px;font-weight:bold}
.mixed-display{font-size:28pt;font-weight:bold;color:#7B1FA2}
.conversion-arrow{font-size:24pt;color:#FF9800;margin:0 15px}
.visual-container{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.circle-row{display:flex;gap:10px;justify-content:center;margin:10px 0;flex-wrap:wrap}
.fraction-circle{width:60px;height:60px;border:3px solid #333;border-radius:50%;background:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:bold;overflow:hidden}
.circle-full{background:#4CAF50}
.circle-empty{background:#fff}
.circle-half{background:linear-gradient(90deg,#4CAF50 50%,#fff 50%)}
.circle-quarter{background:conic-gradient(#4CAF50 0deg 90deg,#fff 90deg 360deg)}
.circle-three-quarter{background:conic-gradient(#4CAF50 0deg 270deg,#fff 270deg 360deg)}
.circle-third{background:conic-gradient(#4CAF50 0deg 120deg,#fff 120deg 360deg)}
.circle-two-thirds{background:conic-gradient(#4CAF50 0deg 240deg,#fff 240deg 360deg)}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.error-box{background:#FFEBEE;border:2px solid #EF5350;border-radius:8px;padding:12px;margin:10px 0}
.method-box{padding:12px;border:2px solid #9C27B0;border-radius:8px;background:#F3E5F5;margin:10px 0}
.method-step{font-size:14pt;margin:5px 0}
.answer-box{display:inline-block;min-width:60px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Convert improper to mixed**: Grid with 2-4 improper fractions to convert
- **Step-by-step conversion**: Show division steps, fill in mixed number
- **Visual matching**: Match improper fraction to circle diagrams

### Q2 OPTIONS (Fluency - Pick ONE):
- **Convert mixed to improper**: Grid with 2-4 mixed numbers to convert
- **Step-by-step conversion**: Show multiplication steps, fill in improper
- **Two-way conversion**: Convert one each way

### Q3 OPTIONS (Application - Pick ONE):
- **Pizza sharing**: "Mum cut 3 pizzas into quarters. The family ate 11 quarters."
- **Cake fractions**: "The bakery sold 2¾ cakes. How many quarter slices is that?"
- **Fair sharing**: Multiple items shared among friends

### Q4 OPTIONS (Application - Pick ONE):
- **Comparison word problem**: "Who ate more pizza - Tom (1¾) or Emma (7/4)?"
- **Adding mixed amounts**: "Sam drank 1½ litres, then 1¼ more"
- **Recipe scaling**: Double or halve recipe quantities

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Common conversion mistake (adding instead of multiplying)
- **Who is correct?**: Two children with different methods/answers
- **Explain why equal**: "Why does 9/4 = 2¼? Use pictures or words."
- **Always/Sometimes/Never**: "An improper fraction is always greater than 1"

## 6 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Pizza Theme - Focus: Basic conversions)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Improper → Mixed | 5/4, 7/3, 9/2, 11/4 | 1¼, 2⅓, 4½, 2¾ |
| Q2 | Mixed → Improper | 1½, 2¼, 1⅓, 3½ | 3/2, 9/4, 4/3, 7/2 |
| Q3 | Pizza sharing | 11/4 pizzas = ? whole + slices | 2, 3 |
| Q4 | Who ate more | Tom 1¾, Emma 5/4 | Tom, 7/4, 5/4 |
| Q5 | Error spotting | 2⅓ = 5/3 (wrong: 2+1=3) | No, 7/3 |

### WS2: Foundation (Easy - Cake Theme - Focus: Visual understanding)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Improper → Mixed | 7/4, 5/2, 8/3, 10/4 | 1¾, 2½, 2⅔, 2½ |
| Q2 | Mixed → Improper | 2½, 1¾, 3⅓, 2¼ | 5/2, 7/4, 10/3, 9/4 |
| Q3 | Cake slices | 2¾ cakes in quarters | 11 |
| Q4 | Comparison | Cake A: 9/4, Cake B: 2½ | Cake B, 10/4, 9/4 |
| Q5 | Explain equal | Why 7/4 = 1¾ | Picture, 7÷4=1r3 |

### WS3: Practice (Average - Sharing Theme - Focus: Step-by-step)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Improper → Mixed (steps) | 13/4, 11/3 (show division) | 3¼, 3⅔ |
| Q2 | Mixed → Improper (steps) | 3¾, 2⅝ (show multiplication) | 15/4, 21/8 |
| Q3 | Fair sharing | 17/5 bars shared = ? each | 3, 2 |
| Q4 | Recipe | Recipe needs 2⅓ cups, make double | 4⅔, 14/3 |
| Q5 | Who is correct | Amy: 11/4=2¾, Ben: 11/4=3¼ | Amy, 11÷4=2r3 |

### WS4: Practice (Average - Sports Theme - Focus: Comparison)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Improper → Mixed | 15/4, 17/5, 19/6, 23/8 | 3¾, 3⅖, 3⅙, 2⅞ |
| Q2 | Mixed → Improper | 4⅓, 2⅝, 3¾, 5½ | 13/3, 21/8, 15/4, 11/2 |
| Q3 | Distance | Ran 2¾ km, 13/4 km compare | same, 11/4 |
| Q4 | Water bottles | 15/4 litres vs 3½ litres | 15/4, 3¾, 3½ |
| Q5 | Always/Sometimes/Never | Improper > 1 always? | Sometimes, 4/4=1 |

### WS5: Practice (Average - Garden Theme - Focus: Multi-step)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Improper → Mixed | 17/6, 22/5, 25/8, 31/10 | 2⅚, 4⅖, 3⅛, 3₁/₁₀ |
| Q2 | Mixed → Improper | 3⅚, 4⅖, 2⅞, 5³/₁₀ | 23/6, 22/5, 23/8, 53/10 |
| Q3 | Planting | 3¼ rows, 4 seeds each | 13, 13 |
| Q4 | Water usage | 17/4 + 2¼ litres total | 4¼, 17/4, 9/4, 26/4 |
| Q5 | Explain method | Convert 3⅝ step by step | 3×8, 24, 24+5, 29/8 |

### WS6: Practice (Average - Cooking Theme - Focus: Checking)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Two-way | 19/5→mixed, 4⅜→improper | 3⅘, 35/8 |
| Q2 | Verify | Is 27/8 = 3⅜? Check both ways | Yes, 3×8+3=27 |
| Q3 | Recipe | Needs 2⅝ kg flour, have 21/8 kg | Yes, 21/8=2⅝ |
| Q4 | Portions | 25/6 servings for 6 people | 4, 1/6 |
| Q5 | Error spotting | 4⅖ = 18/5 (wrong: forgot ×) | No, 22/5 |

## TEMPLATES

### Worksheet Header Template:
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">Improper Fractions &amp; Mixed Numbers <span class="layout-badge">Mixed Layout</span></h1>
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

### Q1 - Convert Improper to Mixed Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Convert these improper fractions to mixed numbers.</p>
  <div class="fraction-grid">
    <div class="fraction-item">
      <p style="margin-bottom:5px;">a)</p>
      <div class="fraction-display">
        <span class="frac"><span class="frac-num">5</span><span class="frac-den">4</span></span>
        <span class="conversion-arrow">→</span>
        <input type="text" class="answer-box" data-answer="1¼">
      </div>
    </div>
    <div class="fraction-item">
      <p style="margin-bottom:5px;">b)</p>
      <div class="fraction-display">
        <span class="frac"><span class="frac-num">7</span><span class="frac-den">3</span></span>
        <span class="conversion-arrow">→</span>
        <input type="text" class="answer-box" data-answer="2⅓">
      </div>
    </div>
  </div>
</div>
```

### Q2 - Convert Mixed to Improper Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Convert these mixed numbers to improper fractions.</p>
  <div class="fraction-grid">
    <div class="fraction-item">
      <p style="margin-bottom:5px;">a)</p>
      <div class="fraction-display">
        <span class="mixed-display">1½</span>
        <span class="conversion-arrow">→</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">2</span></span>
      </div>
    </div>
    <div class="fraction-item">
      <p style="margin-bottom:5px;">b)</p>
      <div class="fraction-display">
        <span class="mixed-display">2¼</span>
        <span class="conversion-arrow">→</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="9"></span><span class="frac-den">4</span></span>
      </div>
    </div>
  </div>
</div>
```

### Q3 - Pizza Application Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the pizza problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🍕</span>
    <span class="story-text">Mum made <strong>3 pizzas</strong> and cut each into <strong>4 equal slices</strong>. The family ate <strong>11 slices</strong>.</span>
  </div>
  <div class="visual-container">
    <p style="text-align:center;font-weight:bold;">Show this as a mixed number:</p>
    <div class="circle-row">
      <div class="fraction-circle circle-full"></div>
      <div class="fraction-circle circle-full"></div>
      <div class="fraction-circle circle-three-quarter"></div>
    </div>
  </div>
  <p class="sub-question">a) How many whole pizzas? <input type="text" class="answer-box-small" data-answer="2"></p>
  <p class="sub-question">b) How many slices left over? <input type="text" class="answer-box-small" data-answer="3"></p>
  <p class="sub-question">c) Write as mixed number: <input type="text" class="answer-box" data-answer="2¾"></p>
</div>
```

### Q4 - Comparison Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Who ate more?</p>
  <div class="word-problem-box">
    <span class="character-icon">👦👧</span>
    <span class="story-text">Tom ate <strong>1¾ pizzas</strong>. Emma ate <strong>5/4 pizzas</strong>.</span>
  </div>
  <p class="sub-question">a) Convert Tom's amount to improper: 1¾ = <input type="text" class="answer-box-small" data-answer="7">/4</p>
  <p class="sub-question">b) Compare: <input type="text" class="answer-box-small" data-answer="7">/4 is greater than <input type="text" class="answer-box-small" data-answer="5">/4</p>
  <p class="sub-question">c) Who ate more? <input type="text" class="answer-box-word" data-answer="Tom"></p>
</div>
```

### Q5 - Error Spotting Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the mistake.</p>
  <div class="error-box">
    <p><strong>Jake converted 2⅓ to an improper fraction:</strong></p>
    <div class="method-box">
      <p class="method-step">"I add the whole number and numerator: 2 + 1 = 3"</p>
      <p class="method-step">"So 2⅓ = 3/3" ❌</p>
    </div>
  </div>
  <p class="sub-question">a) Is Jake correct? <input type="text" class="answer-box-word" data-answer="No"></p>
  <p class="sub-question">b) What should Jake do instead? <input type="text" class="answer-box-word" data-answer="multiply"> the whole by denominator, then add numerator</p>
  <p class="sub-question">c) The correct answer is: <input type="text" class="answer-box" data-answer="7/3"></p>
</div>
```

### Q5 - Who is Correct Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Who is correct?</p>
  <div class="reasoning-box">
    <p><strong>Amy says:</strong> "11/4 = 2¾ because 11 ÷ 4 = 2 remainder 3"</p>
    <p><strong>Ben says:</strong> "11/4 = 3¼ because 11 - 4 = 7 and 7 - 4 = 3"</p>
  </div>
  <p class="sub-question">a) Who is correct? <input type="text" class="answer-box-word" data-answer="Amy"></p>
  <p class="sub-question">b) Calculate: 11 ÷ 4 = <input type="text" class="answer-box-small" data-answer="2"> remainder <input type="text" class="answer-box-small" data-answer="3"></p>
  <p class="sub-question">c) So 11/4 = <input type="text" class="answer-box" data-answer="2¾"></p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes, or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "An improper fraction is always greater than 1."
    </p>
  </div>
  <p class="sub-question">a) Answer: <input type="text" class="answer-box-word" data-answer="Sometimes"></p>
  <p class="sub-question">b) Give an example where it equals 1: <input type="text" class="answer-box" data-answer="4/4"> = 1</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 1¼, 2⅓, 4½, 2¾</p>
  <p><strong>2.</strong> 3, 9, 4, 7</p>
  <p><strong>3.</strong> 2, 3, 2¾</p>
  <p><strong>4.</strong> 7, 7, 5, Tom</p>
  <p><strong>5.</strong> No, multiply, 7/3</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses. Each answer on its own line with question number prefix.

## FRACTION REFERENCE (Common Conversions)

### Halves, Thirds, Quarters:
| Improper | Mixed |
|----------|-------|
| 3/2 | 1½ |
| 5/2 | 2½ |
| 7/2 | 3½ |
| 4/3 | 1⅓ |
| 5/3 | 1⅔ |
| 7/3 | 2⅓ |
| 5/4 | 1¼ |
| 7/4 | 1¾ |
| 9/4 | 2¼ |
| 11/4 | 2¾ |

### Fifths, Sixths, Eighths:
| Improper | Mixed |
|----------|-------|
| 7/5 | 1⅖ |
| 11/5 | 2⅕ |
| 7/6 | 1⅙ |
| 11/6 | 1⅚ |
| 9/8 | 1⅛ |
| 11/8 | 1⅜ |
| 13/8 | 1⅝ |
| 15/8 | 1⅞ |

## VISUAL REPRESENTATION GUIDE

### Circle Diagrams (CSS Classes):
- `.circle-full` - Complete filled circle (1 whole)
- `.circle-half` - Half filled (½)
- `.circle-quarter` - Quarter filled (¼)
- `.circle-three-quarter` - Three quarters filled (¾)
- `.circle-third` - One third filled (⅓)
- `.circle-two-thirds` - Two thirds filled (⅔)

### Example: 7/4 as circles
```html
<div class="circle-row">
  <div class="fraction-circle circle-full"></div>
  <div class="fraction-circle circle-three-quarter"></div>
</div>
<p>7/4 = 1 whole + 3 quarters = 1¾</p>
```

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency - conversions)?
- [ ] Q3-Q4 in Section B (Application - word problems)?
- [ ] Q5 in Section C (Reasoning - error/explain)?
- [ ] Improper → Mixed conversions included?
- [ ] Mixed → Improper conversions included?
- [ ] Division method shown for improper → mixed?
- [ ] Multiplication method shown for mixed → improper?
- [ ] Real-world contexts (pizza, cake, sharing)?
- [ ] Visual representations (circles) used?
- [ ] Common misconception addressed in Q5?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All conversions verified for accuracy?
- [ ] Year 5 appropriate vocabulary and difficulty?
- [ ] Fraction notation uses proper HTML (frac-num, frac-den)?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
