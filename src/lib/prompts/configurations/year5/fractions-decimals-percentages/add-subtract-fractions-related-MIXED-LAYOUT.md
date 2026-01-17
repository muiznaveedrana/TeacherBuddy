# Ages 9-10: Add & Subtract Fractions with Related Denominators (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 5 fraction addition/subtraction questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Adding and subtracting fractions with related denominators
**Section B: Application (Q3-Q4)** - Real-world contexts (pizza, ribbon, water, measuring)
**Section C: Reasoning (Q5)** - Error spotting, compare methods, explain equivalence

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 5 - NCETM Fractions Unit)
- **Statutory requirement:** "Add and subtract fractions with the same denominator and denominators that are multiples of the same number"
- **Prerequisite:** Year 4 equivalent fractions, Year 5 improper fractions/mixed numbers
- **Key vocabulary:** equivalent, denominator, numerator, common denominator, simplify, related
- **Related skills:** Finding equivalent fractions, multiplying numerator and denominator by same number

## KEY CONCEPTS (Year 5 children)
- **Related denominators**: One denominator is a multiple of another (2 and 4, 3 and 6, 4 and 8)
- **Common denominator**: Convert to same denominator before adding/subtracting
- **Equivalent fractions**: 1/2 = 2/4 = 3/6 (same value, different notation)
- **Simplifying**: Reduce answer to lowest terms when possible

## ADDITION METHOD
**Example: 1/2 + 1/4**
- Denominators: 2 and 4 (4 is multiple of 2)
- Convert 1/2 to fourths: 1/2 = 2/4
- Add: 2/4 + 1/4 = 3/4

**Example: 2/3 + 1/6**
- Denominators: 3 and 6 (6 is multiple of 3)
- Convert 2/3 to sixths: 2/3 = 4/6
- Add: 4/6 + 1/6 = 5/6

## SUBTRACTION METHOD
**Example: 3/4 - 1/2**
- Denominators: 4 and 2 (4 is multiple of 2)
- Convert 1/2 to fourths: 1/2 = 2/4
- Subtract: 3/4 - 2/4 = 1/4

**Example: 5/6 - 1/3**
- Denominators: 6 and 3 (6 is multiple of 3)
- Convert 1/3 to sixths: 1/3 = 2/6
- Subtract: 5/6 - 2/6 = 3/6 = 1/2

## COMMON MISCONCEPTIONS (Year 5 children)
1. **Adding denominators**: 1/2 + 1/4 = 2/6 (WRONG - should be 3/4)
2. **Forgetting to convert**: Adding 1/2 + 1/4 as 2/6 instead of finding common denominator
3. **Only converting one fraction**: Both fractions need same denominator
4. **Not simplifying**: Leaving 2/4 instead of 1/2
5. **Wrong direction**: Converting larger denominator instead of smaller

## DENOMINATOR PAIRS FOR YEAR 5
| Level | Denominator Pairs | Example |
|-------|------------------|---------|
| Foundation | 2&4, 2&6, 3&6 | 1/2 + 1/4 |
| Practice | 2&8, 3&9, 4&8, 5&10 | 3/4 + 1/8 |
| Challenge | 4&12, 5&15, 6&12 | 2/3 + 5/12 |

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
.fraction-item{padding:15px;border:2px solid #2196F3;border-radius:8px;background:#fff;text-align:center}
.fraction-calc{font-size:24pt;font-weight:bold;color:#1976D2;margin:10px 0;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.frac{display:inline-block;text-align:center;vertical-align:middle}
.frac-num{display:block;border-bottom:3px solid #333;padding-bottom:3px;font-weight:bold}
.frac-den{display:block;padding-top:3px;font-weight:bold}
.op-symbol{font-size:24pt;font-weight:bold;color:#FF9800;margin:0 8px}
.equals-symbol{font-size:24pt;font-weight:bold;color:#4CAF50;margin:0 8px}
.conversion-step{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:10px 0}
.step-label{font-size:12pt;color:#2E7D32;font-weight:bold;margin-bottom:8px}
.equivalent-box{display:flex;align-items:center;justify-content:center;gap:15px;margin:10px 0}
.arrow-right{font-size:20pt;color:#FF9800}
.visual-container{margin:15px 0;padding:15px;background:#FFF8E1;border:2px solid #FFB300;border-radius:8px}
.bar-model{display:flex;height:40px;border:2px solid #333;border-radius:4px;overflow:hidden;margin:10px 0}
.bar-section{display:flex;align-items:center;justify-content:center;font-weight:bold;color:white}
.bar-filled{background:#4CAF50}
.bar-empty{background:#E0E0E0;color:#666}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.error-box{background:#FFEBEE;border:2px solid #EF5350;border-radius:8px;padding:12px;margin:10px 0}
.method-box{padding:12px;border:2px solid #9C27B0;border-radius:8px;background:#F3E5F5;margin:10px 0}
.method-step{font-size:14pt;margin:5px 0}
.answer-box{display:inline-block;min-width:50px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:35px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Addition grid**: 2-4 addition problems with related denominators
- **Step-by-step addition**: Show equivalent fraction conversion then add
- **Visual bar addition**: Bar models showing fraction addition

### Q2 OPTIONS (Fluency - Pick ONE):
- **Subtraction grid**: 2-4 subtraction problems with related denominators
- **Step-by-step subtraction**: Show equivalent fraction conversion then subtract
- **Mixed addition and subtraction**: 2 of each operation

### Q3 OPTIONS (Application - Pick ONE):
- **Pizza sharing**: "Maya ate 1/2 pizza, then 1/4 more. How much total?"
- **Ribbon cutting**: "Started with 3/4 metre, used 1/2. How much left?"
- **Water measuring**: "Poured 2/3 litre, then 1/6 more"

### Q4 OPTIONS (Application - Pick ONE):
- **Two-step problem**: Add then subtract (or vice versa)
- **Comparison problem**: "Who used more ribbon - Amy (1/2 + 1/4) or Ben (3/4)?"
- **Missing value**: "? + 1/4 = 3/4"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the error**: Common mistake (adding denominators)
- **Who is correct?**: Two children with different methods
- **Always/Sometimes/Never**: "When adding fractions, the denominator always gets bigger"
- **Explain**: "Why does 1/2 + 1/4 NOT equal 2/6?"

## 6 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Pizza Theme - Focus: Halves and Quarters)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Addition | 1/2+1/4, 1/4+1/2, 2/4+1/4, 1/4+2/4 | 3/4, 3/4, 3/4, 3/4 |
| Q2 | Subtraction | 3/4-1/2, 3/4-1/4, 2/4-1/4, 1/2-1/4 | 1/4, 2/4, 1/4, 1/4 |
| Q3 | Pizza | 1/2 + 1/4 pizza eaten | 2/4, 3/4 |
| Q4 | Comparison | Maya 1/2+1/4, Ben 2/4, who ate more | Maya, 3/4, 2/4 |
| Q5 | Error spotting | 1/2+1/4=2/6 wrong | No, 3/4 |

### WS2: Foundation (Easy - Baking Theme - Focus: Thirds and Sixths)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Addition | 1/3+1/6, 2/6+1/3, 1/6+2/3, 1/3+2/6 | 3/6, 4/6, 5/6, 4/6 |
| Q2 | Subtraction | 2/3-1/6, 5/6-1/3, 4/6-1/3, 1/3-1/6 | 3/6, 3/6, 2/6, 1/6 |
| Q3 | Flour | 1/3 + 1/6 cup used | 2/6, 3/6 |
| Q4 | Recipe | Need 5/6, have 1/3, need more | 2/6, 3/6 |
| Q5 | Who is correct | Amy: 1/3=2/6, Ben: 1/3=3/6 | Amy, multiply both by 2 |

### WS3: Practice (Average - Craft Theme - Focus: Mixed pairs)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Addition steps | 1/2+1/8 (show 4/8), 3/4+1/8 (show 6/8) | 4/8, 5/8, 6/8, 7/8 |
| Q2 | Subtraction steps | 3/4-1/8, 7/8-1/2 | 6/8, 5/8, 4/8, 3/8 |
| Q3 | Ribbon | Had 7/8m, used 1/2m | 4/8, 3/8 |
| Q4 | Two-step | Start 1, use 1/4, add 1/8 | 3/4, 7/8 |
| Q5 | Explain | Why 1/2+1/4 ≠ 2/6 | add denominators wrong, need common |

### WS4: Practice (Average - Garden Theme - Focus: Tenths and fifths)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Addition | 1/5+3/10, 2/5+1/10, 3/10+2/5, 1/10+3/5 | 5/10, 5/10, 7/10, 7/10 |
| Q2 | Subtraction | 7/10-2/5, 4/5-3/10, 9/10-1/5, 3/5-1/10 | 3/10, 5/10, 7/10, 5/10 |
| Q3 | Water | 2/5 litre + 1/10 litre | 4/10, 5/10 |
| Q4 | Missing value | ?/10 + 1/5 = 7/10 | 2/10, 5/10 |
| Q5 | Always/Sometimes/Never | Adding makes denominator bigger | Never |

### WS5: Practice (Average - Sports Theme - Focus: Simplifying)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Add and simplify | 1/2+1/4, 1/3+1/6, 2/4+1/8, 1/5+2/10 | 3/4, 1/2, 5/8, 2/5 |
| Q2 | Subtract and simplify | 3/4-1/2, 5/6-1/3, 7/8-1/4, 4/5-2/10 | 1/4, 1/2, 5/8, 3/5 |
| Q3 | Race distance | 1/2km + 1/4km run | 2/4, 3/4 |
| Q4 | Water drunk | 3/4L - 1/2L remaining | 2/4, 1/4, 1/4 |
| Q5 | Error spotting | 2/6 not simplified to 1/3 | Yes, 2/6=1/3 |

### WS6: Practice (Average - Cooking Theme - Focus: Multi-step)
| Q | Type | Details | Answers |
|---|------|---------|---------|
| Q1 | Mixed operations | 1/2+1/4, 3/4-1/2, 1/3+1/6, 2/3-1/6 | 3/4, 1/4, 1/2, 1/2 |
| Q2 | Three fractions | 1/2+1/4+1/4, 1/3+1/6+1/6 | 1, 2/3 |
| Q3 | Recipe | 1/4+1/8 cup sugar, 1/2 cup flour | 2/8, 3/8, 4/8 |
| Q4 | Remaining | Start 1, use 1/2, then 1/4 | 1/2, 1/4 |
| Q5 | Compare methods | Convert to 4ths vs 8ths | Both correct, 8ths |

## TEMPLATES

### Worksheet Header Template:
```html
<div class="worksheet-header">
  <h1 class="worksheet-title">Add &amp; Subtract Fractions <span class="layout-badge">Mixed Layout</span></h1>
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

### Q1 - Addition Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Add these fractions. Show equivalent fractions first.</p>
  <div class="fraction-grid">
    <div class="fraction-item">
      <p style="margin-bottom:5px;">a)</p>
      <div class="fraction-calc">
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">2</span></span>
        <span class="op-symbol">+</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="2"></span><span class="frac-den">4</span></span>
        <span class="op-symbol">+</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">4</span></span>
      </div>
    </div>
    <div class="fraction-item">
      <p style="margin-bottom:5px;">b)</p>
      <div class="fraction-calc">
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">3</span></span>
        <span class="op-symbol">+</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">6</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="2"></span><span class="frac-den">6</span></span>
        <span class="op-symbol">+</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">6</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">6</span></span>
      </div>
    </div>
  </div>
</div>
```

### Q2 - Subtraction Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Subtract these fractions.</p>
  <div class="fraction-grid">
    <div class="fraction-item">
      <p style="margin-bottom:5px;">a)</p>
      <div class="fraction-calc">
        <span class="frac"><span class="frac-num">3</span><span class="frac-den">4</span></span>
        <span class="op-symbol">−</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">2</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="1"></span><span class="frac-den">4</span></span>
      </div>
    </div>
    <div class="fraction-item">
      <p style="margin-bottom:5px;">b)</p>
      <div class="fraction-calc">
        <span class="frac"><span class="frac-num">5</span><span class="frac-den">6</span></span>
        <span class="op-symbol">−</span>
        <span class="frac"><span class="frac-num">1</span><span class="frac-den">3</span></span>
        <span class="equals-symbol">=</span>
        <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">6</span></span>
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
    <span class="story-text">Maya ate <strong>1/2</strong> of a pizza for lunch. Later, she ate <strong>1/4</strong> more. How much pizza did Maya eat altogether?</span>
  </div>
  <div class="conversion-step">
    <p class="step-label">Step 1: Convert to same denominator</p>
    <div class="equivalent-box">
      <span class="frac"><span class="frac-num">1</span><span class="frac-den">2</span></span>
      <span class="arrow-right">→</span>
      <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="2"></span><span class="frac-den">4</span></span>
    </div>
  </div>
  <p class="sub-question">Step 2: Add the fractions</p>
  <div class="fraction-calc" style="font-size:20pt;">
    <span class="frac"><span class="frac-num">2</span><span class="frac-den">4</span></span>
    <span class="op-symbol">+</span>
    <span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span>
    <span class="equals-symbol">=</span>
    <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">4</span></span>
  </div>
</div>
```

### Q4 - Comparison Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Who ate more pizza?</p>
  <div class="word-problem-box">
    <span class="character-icon">👦👧</span>
    <span class="story-text">Maya ate <strong>1/2 + 1/4</strong> pizza. Ben ate <strong>2/4</strong> pizza.</span>
  </div>
  <p class="sub-question">a) Maya's total: <input type="text" class="answer-box-small" data-answer="3">/4 pizza</p>
  <p class="sub-question">b) Ben's total: <input type="text" class="answer-box-small" data-answer="2">/4 pizza</p>
  <p class="sub-question">c) Who ate more? <input type="text" class="answer-box-word" data-answer="Maya"></p>
</div>
```

### Q5 - Error Spotting Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the mistake.</p>
  <div class="error-box">
    <p><strong>Jake calculated:</strong></p>
    <div class="fraction-calc" style="font-size:20pt;">
      <span class="frac"><span class="frac-num">1</span><span class="frac-den">2</span></span>
      <span class="op-symbol">+</span>
      <span class="frac"><span class="frac-num">1</span><span class="frac-den">4</span></span>
      <span class="equals-symbol">=</span>
      <span class="frac"><span class="frac-num">2</span><span class="frac-den">6</span></span>
      <span style="color:red;font-size:20pt;margin-left:10px;">❌</span>
    </div>
    <p style="margin-top:10px;"><em>"I added the tops and added the bottoms!"</em></p>
  </div>
  <p class="sub-question">a) Is Jake correct? <input type="text" class="answer-box-word" data-answer="No"></p>
  <p class="sub-question">b) What should Jake do instead? Find a <input type="text" class="answer-box-word" data-answer="common"> denominator</p>
  <p class="sub-question">c) The correct answer is: <span class="frac"><span class="frac-num"><input type="text" class="answer-box-small" data-answer="3"></span><span class="frac-den">4</span></span></p>
</div>
```

### Q5 - Always/Sometimes/Never Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Is this statement Always, Sometimes, or Never true?</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;margin:10px 0;">
      "When you add two fractions, the denominator gets bigger."
    </p>
  </div>
  <p class="sub-question">a) Answer: <input type="text" class="answer-box-word" data-answer="Never"></p>
  <p class="sub-question">b) Explain: When adding fractions, we keep the <input type="text" class="answer-box-word" data-answer="same"> denominator (after converting)</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 2, 3, 2, 3</p>
  <p><strong>2.</strong> 1, 3</p>
  <p><strong>3.</strong> 2, 3</p>
  <p><strong>4.</strong> 3, 2, Maya</p>
  <p><strong>5.</strong> No, common, 3</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses. Each answer on its own line with question number prefix.

## FRACTION REFERENCE (Common Calculations)

### Halves and Quarters:
| Calculation | Steps | Answer |
|-------------|-------|--------|
| 1/2 + 1/4 | 2/4 + 1/4 | 3/4 |
| 1/4 + 1/2 | 1/4 + 2/4 | 3/4 |
| 3/4 - 1/2 | 3/4 - 2/4 | 1/4 |
| 1/2 - 1/4 | 2/4 - 1/4 | 1/4 |

### Thirds and Sixths:
| Calculation | Steps | Answer |
|-------------|-------|--------|
| 1/3 + 1/6 | 2/6 + 1/6 | 3/6 = 1/2 |
| 2/3 + 1/6 | 4/6 + 1/6 | 5/6 |
| 5/6 - 1/3 | 5/6 - 2/6 | 3/6 = 1/2 |
| 2/3 - 1/6 | 4/6 - 1/6 | 3/6 = 1/2 |

### Fifths and Tenths:
| Calculation | Steps | Answer |
|-------------|-------|--------|
| 1/5 + 3/10 | 2/10 + 3/10 | 5/10 = 1/2 |
| 2/5 + 1/10 | 4/10 + 1/10 | 5/10 = 1/2 |
| 7/10 - 2/5 | 7/10 - 4/10 | 3/10 |
| 4/5 - 3/10 | 8/10 - 3/10 | 5/10 = 1/2 |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency - calculations)?
- [ ] Q3-Q4 in Section B (Application - word problems)?
- [ ] Q5 in Section C (Reasoning - error/explain)?
- [ ] Related denominators only (one is multiple of other)?
- [ ] Equivalent fraction conversion shown?
- [ ] Common denominator method demonstrated?
- [ ] Real-world contexts (pizza, ribbon, water)?
- [ ] Common misconception addressed in Q5?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All calculations verified for accuracy?
- [ ] Year 5 appropriate vocabulary and difficulty?
- [ ] Fraction notation uses proper HTML (frac-num, frac-den)?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
