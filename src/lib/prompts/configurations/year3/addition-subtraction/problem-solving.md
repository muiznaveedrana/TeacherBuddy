# Y3: Problem Solving - Addition & Subtraction

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS (Injected by system):
{{PROBLEM_TYPE}}
{{CONTEXT_SPEC}}
{{VISUAL_SUPPORT}}
{{OPERATION_FOCUS}}
{{REASONING_LEVEL}}

<!-- DEBUG: Freshness injection validates rotation -->

## FOCUS: PROBLEM SOLVING & REASONING

### Year 3 Problem-Solving Objectives:
- Solve **two-step** problems in contexts
- Use **inverse operations** to check answers
- Solve **missing number** problems
- Represent problems using **bar models**
- Solve **comparison** problems ("How many more?")
- Apply **reasoning** to multi-step situations

### CPA Approach (Concrete-Pictorial-Abstract):
1. **Concrete**: Real-world contexts (money, shopping, school)
2. **Pictorial**: Bar models, diagrams, images
3. **Abstract**: Number sentences, equations

## CORE PROBLEM TYPES

### TWO-STEP (Sequential operations)
**Pattern**: Perform one operation, then another
**Examples**:
- "Sarah had 456 stickers. She gave 123 to Tom, then bought 278 more. How many does she have now?"
  - Step 1: 456 - 123 = 333
  - Step 2: 333 + 278 = 611

- "A shop had 800 books. They sold 234 on Monday and 156 on Tuesday. How many are left?"
  - Step 1: 234 + 156 = 390 (total sold)
  - Step 2: 800 - 390 = 410 (remaining)

### COMPARISON ("How many more/less?")
**Pattern**: Find the difference between two quantities
**Examples**:
- "Tom has 567 marbles. Sarah has 289 marbles. How many more does Tom have?"
  - Solution: 567 - 289 = 278

- "Class A raised £4.56. Class B raised £6.78. How much more did Class B raise?"
  - Solution: £6.78 - £4.56 = £2.22

### MISSING NUMBER (Find the unknown)
**Pattern**: One number in an equation is missing
**Examples**:
- "456 + ___ = 734" (Solution: 278)
- "___ - 278 = 456" (Solution: 734)
- "345 + 267 = ___ - 156" (Multi-step: find sum first, then add 156)

### INVERSE OPERATIONS (Checking/relationships)
**Pattern**: Use addition to check subtraction (and vice versa)
**Examples**:
- "If 456 + 278 = 734, what is 734 - 278?" (Answer: 456)
- "Check this subtraction using addition: 800 - 234 = 566"
  - Check: 566 + 234 = 800 ✓

### MULTI-STEP CHALLENGE (Complex reasoning)
**Pattern**: Three or more steps, or requires choosing operation
**Examples**:
- "A school has 456 Year 3 students and 378 Year 4 students. If 234 students go on a trip, how many stay at school?"
  - Step 1: 456 + 378 = 834 (total students)
  - Step 2: 834 - 234 = 600 (remaining)

## QUESTION SPECS (Use {{PROBLEM_TYPE}}):

**Q1 Options:**
- `two-step-add-sub`: Add first, then subtract (or vice versa)
- `two-step-money`: Money context with two operations
- `two-step-shopping`: Shopping scenario (buy/spend)
- `two-step-school`: School context (students, books, supplies)
- `two-step-combined-total`: Add two amounts, then use total
- `two-step-bar-model`: Include bar model visualization

**Q2 Options:**
- `comparison-how-many-more`: "How many more does X have than Y?"
- `comparison-difference`: Find the difference between two amounts
- `comparison-money`: Compare money amounts
- `comparison-bar-model`: Use bar model to show comparison
- `comparison-greater-by`: "A is greater than B by how much?"
- `comparison-missing-part`: Given whole and one part, find other part

**Q3 Options:**
- `missing-addend`: ___ + 278 = 734
- `missing-subtrahend`: 734 - ___ = 456
- `missing-minuend`: ___ - 278 = 456
- `missing-both-sides`: 456 + ___ = 734 - ___
- `missing-in-context`: Word problem with missing number
- `create-equation`: "Write the equation, then solve"

**Q4 Options:**
- `inverse-check-addition`: Check addition using subtraction
- `inverse-check-subtraction`: Check subtraction using addition
- `inverse-fact-family`: Complete fact family (4 equations)
- `inverse-find-error`: Spot error, use inverse to correct
- `inverse-reasoning`: "If X + Y = Z, then..."
- `inverse-word-problem`: Real-world context requiring inverse thinking

**Q5 Options:**
- `multi-step-3operations`: Three sequential operations
- `multi-step-money-shopping`: Complex shopping problem
- `multi-step-school-trip`: School trip context
- `multi-step-choose-operation`: Student decides which operations needed
- `multi-step-bar-model-complex`: Multi-part bar model
- `multi-step-reasoning-challenge`: Requires logical reasoning

## CONTEXT SPECS (Use {{CONTEXT_SPEC}}):

**money**: UK currency (EMPHASIZE THIS)
- Shopping, saving, pocket money, fundraising
- Use realistic amounts (£1-£9.99)
- Show coin/note images where appropriate
- `/images/WORKSHEET_OBJECTS/money/UK coins/[coin] [side] col - TRF.png`

**school**: Educational context
- Students, books, pencils, classrooms
- School trips, library, sports day
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/[item].png`

**shopping**: Retail scenarios
- Buying toys, food, books
- Spending and change
- Combine with money context

**travel**: Journeys and distances
- Bus rides, train travel, walking
- Miles, kilometers (Y3 appropriate)
- Time-based scenarios

**party**: Celebrations
- Balloons, cakes, guests, presents
- Distributing items equally/unequally

**sports**: Active contexts
- Team scores, race times, points
- Comparing performance

## VISUAL SUPPORT (Use {{VISUAL_SUPPORT}}):

**bar-model**: Singapore-style bar models (RECOMMENDED)
- Whole at top, parts below (or vice versa)
- Color-coded segments
- Clear labels

**objects**: Counting objects images
- Use WORKSHEET_OBJECTS library
- Show actual quantities

**number-line**: Jumps showing operations
- Start point, end point, jumps labeled

**diagrams**: Custom problem diagrams
- Flowcharts for multi-step
- Comparison bars

**none**: Abstract only (numbers/text)
- For advanced students
- Focus on mental reasoning

## REASONING LEVELS (Use {{REASONING_LEVEL}}):

**concrete**: Clear, straightforward
- Single concept
- Obvious operation choice

**pictorial**: Visual support needed
- Bar model assesses problem-solving skills
- Objects/images scaffold thinking

**abstract**: Independent reasoning required
- Multiple possible approaches
- Student chooses strategy

## CSS (Ultra-Compact):

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600;line-height:1.6}

/* Bar Model (Singapore Method) */
.bar-model-container{margin:15px 0;padding:15px;background:#F3E5F5;border:2px solid #9C27B0;border-radius:8px}
.bar-model-title{font-size:14pt;font-weight:bold;color:#6A1B9A;margin-bottom:12px;text-align:center}
.bar-whole{display:flex;margin:10px 0;border:3px solid #333}
.bar-parts{display:flex;margin:10px 0}
.bar-segment{height:55px;display:flex;align-items:center;justify-content:center;font-size:17pt;font-weight:bold;color:white;border:3px solid #333;position:relative}
.bar-segment.whole{background:#4A148C;width:100%}
.bar-segment.part1{background:#9C27B0;flex:1}
.bar-segment.part2{background:#7B1FA2;flex:1}
.bar-segment.part3{background:#6A1B9A;flex:1}
.bar-segment.unknown{background:#E1BEE7;color:#4A148C;border-style:dashed}
.bar-label{text-align:center;font-size:13pt;font-weight:bold;margin-top:5px;color:#6A1B9A}
.bar-question-mark{font-size:32pt;color:#6A1B9A}

/* Two-Step Problem Layout */
.two-step-container{margin:12px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.step-box{margin:10px 0;padding:10px;background:white;border:2px solid #FF9800;border-radius:6px}
.step-label{font-size:14pt;font-weight:bold;color:#E65100;margin-bottom:5px}
.step-work{font-size:16pt;margin:5px 0;min-height:40px}

/* Comparison Visuals */
.comparison-container{margin:12px 0;padding:12px;background:#E3F2FD;border:2px solid #2196F3;border-radius:8px}
.comparison-bars{display:flex;justify-content:space-around;margin:15px 0;gap:20px}
.comparison-bar{text-align:center;flex:1}
.comparison-bar-visual{height:40px;background:#2196F3;border:2px solid #1976D2;border-radius:4px;position:relative;margin:10px 0}
.comparison-label{font-size:14pt;font-weight:bold;margin:5px 0}
.comparison-value{font-size:16pt;color:white;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}

/* Missing Number Highlight */
.missing-blank{display:inline-block;min-width:80px;height:40px;border-bottom:4px solid #FF5722;background:#FFF9C4;vertical-align:baseline;margin:0 5px;text-align:center}

/* Inverse Operations Display */
.inverse-container{margin:12px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.inverse-title{font-size:15pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.inverse-equation{font-size:18pt;margin:8px 0;padding:8px;background:white;border-radius:4px;text-align:center;font-weight:bold}
.inverse-arrow{font-size:24pt;color:#4CAF50;text-align:center;margin:5px 0}

/* Multi-Step Flow */
.multi-step-flow{margin:12px 0;padding:12px;background:#FCE4EC;border:2px solid #E91E63;border-radius:8px}
.flow-step{display:flex;align-items:center;margin:10px 0}
.flow-number{width:35px;height:35px;background:#E91E63;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt;flex-shrink:0;margin-right:12px}
.flow-text{flex:1;font-size:15pt;line-height:1.5}
.flow-arrow{font-size:28pt;color:#E91E63;text-align:center;margin:5px 0}

/* Money Display */
.money-visual{margin:10px 0;padding:10px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.money-group{display:flex;gap:8px;align-items:center;justify-content:center;margin:8px 0;flex-wrap:wrap}
.money-label{font-size:14pt;font-weight:bold;margin:5px 0}

/* Working Space */
.working-space{border:2px dashed #999;padding:15px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}

/* Answer Boxes */
.answer-box{display:inline-block;min-width:100px;height:45px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-box-small{min-width:70px;height:40px}

/* Answer Key */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
.answer-key .working{font-style:italic;color:#555;margin-left:15px;font-size:12pt}
.answer-key .step{font-weight:bold;color:#1976D2}
</style>
```

## TEMPLATES (Match {{PROBLEM_TYPE}}):

### Q1-two-step-add-sub:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> A library had 456 books. They bought 278 more books, then lent out 234 books. How many books does the library have now?</p>

  <div class="two-step-container">
    <div class="step-box">
      <p class="step-label">Step 1:</p>
      <div class="step-work"></div>
    </div>
    <div class="step-box">
      <p class="step-label">Step 2:</p>
      <div class="step-work"></div>
    </div>
  </div>

  <p class="question-text" style="margin-top:12px;font-size:16pt">
    Final answer: <span class="answer-box"></span> books
  </p>
</div>
```

### Q1-two-step-bar-model:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Sarah saved £4.56. Her grandmother gave her £2.78 more. She then spent £3.45 on a book. How much money does Sarah have left?</p>

  <div class="bar-model-container">
    <p class="bar-model-title">Bar Model:</p>

    <p style="font-size:13pt;margin:5px 0;text-align:center;color:#6A1B9A">Step 1: Find total saved</p>
    <div class="bar-parts">
      <div class="bar-segment part1">£4.56</div>
      <div class="bar-segment part2">£2.78</div>
    </div>
    <p class="bar-label">Total: ?</p>

    <p style="font-size:13pt;margin:15px 0 5px 0;text-align:center;color:#6A1B9A">Step 2: Subtract spent</p>
    <div class="bar-whole">
      <div class="bar-segment whole">Total from Step 1</div>
    </div>
    <div class="bar-parts">
      <div class="bar-segment part1">£3.45 (spent)</div>
      <div class="bar-segment unknown"><span class="bar-question-mark">?</span></div>
    </div>
  </div>

  <div class="working-space">
    <p class="working-label">Show your working:</p>
  </div>

  <p class="question-text">Sarah has <span class="answer-box"></span> left</p>
</div>
```

### Q2-comparison-how-many-more:
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Tom collected 567 football stickers. Ben collected 289 football stickers. How many more stickers does Tom have than Ben?</p>

  <div class="comparison-container">
    <div class="comparison-bars">
      <div class="comparison-bar">
        <p class="comparison-label">Tom's stickers</p>
        <div class="comparison-bar-visual" style="width:100%">
          <span class="comparison-value">567</span>
        </div>
      </div>
      <div class="comparison-bar">
        <p class="comparison-label">Ben's stickers</p>
        <div class="comparison-bar-visual" style="width:51%;background:#64B5F6">
          <span class="comparison-value">289</span>
        </div>
      </div>
    </div>
    <p style="text-align:center;font-size:14pt;margin-top:10px;color:#1976D2;font-weight:bold">
      The difference = ?
    </p>
  </div>

  <div class="working-space"></div>

  <p class="question-text">Tom has <span class="answer-box"></span> more stickers</p>
</div>
```

### Q3-missing-addend:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Complete the missing number:</p>

  <div style="text-align:center;margin:20px 0">
    <p style="font-size:22pt;font-weight:bold;font-family:monospace">
      456 + <span class="missing-blank"></span> = 734
    </p>
  </div>

  <p style="text-align:center;font-size:14pt;font-style:italic;color:#558B2F;margin:10px 0">
    Hint: What number do you add to 456 to make 734?
  </p>

  <div class="working-space">
    <p class="working-label">Show how you found the answer:</p>
  </div>

  <p class="question-text" style="text-align:center">
    Missing number: <span class="answer-box"></span>
  </p>
</div>
```

### Q4-inverse-check-subtraction:
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Use inverse operations to check this subtraction:</p>

  <div class="inverse-container">
    <p class="inverse-title">Given calculation:</p>
    <div class="inverse-equation">800 - 234 = 566</div>

    <p class="inverse-arrow">⬇️</p>

    <p class="inverse-title">Check using addition:</p>
    <div class="inverse-equation" style="background:#FFF9C4">
      566 + 234 = <span class="answer-box-small"></span>
    </div>

    <p style="text-align:center;margin-top:12px;font-size:15pt;color:#2E7D32">
      If your answer equals 800, the subtraction was correct! ✓
    </p>
  </div>

  <p class="question-text" style="margin-top:15px">
    Is the original answer correct? <span class="answer-box-small"></span> (Yes/No)
  </p>
</div>
```

### Q5-multi-step-money-shopping:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A school raised money for charity. Year 3 raised £4.56, Year 4 raised £6.78, and Year 5 raised £5.34. If their target was £20.00, how much more do they need to raise?</p>

  <div class="multi-step-flow">
    <div class="flow-step">
      <div class="flow-number">1</div>
      <div class="flow-text">Add all the money raised so far</div>
    </div>
    <div class="flow-arrow">⬇️</div>
    <div class="flow-step">
      <div class="flow-number">2</div>
      <div class="flow-text">Subtract total from target (£20.00)</div>
    </div>
  </div>

  <div class="working-space">
    <p class="working-label">Show all your working:</p>
  </div>

  <p class="question-text" style="margin-top:15px;font-size:16pt">
    They need to raise £<span class="answer-box"></span> more
  </p>
</div>
```

### Q5-multi-step-bar-model-complex:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Three classes collected books for the library. Class A collected 234 books, Class B collected 178 books, and Class C collected 156 books. If the school already had 456 books, how many books does the school have now?</p>

  <div class="bar-model-container">
    <p class="bar-model-title">Bar Model - Total collected:</p>
    <div class="bar-parts">
      <div class="bar-segment part1">234<br><span style="font-size:11pt">Class A</span></div>
      <div class="bar-segment part2">178<br><span style="font-size:11pt">Class B</span></div>
      <div class="bar-segment part3">156<br><span style="font-size:11pt">Class C</span></div>
    </div>
    <p class="bar-label">New books collected: ?</p>

    <p style="font-size:13pt;margin:15px 0 5px 0;text-align:center;color:#6A1B9A">Then add to original books:</p>
    <div class="bar-parts">
      <div class="bar-segment part1">456 (original)</div>
      <div class="bar-segment part2">? (new books)</div>
    </div>
    <p class="bar-label">Total books now: ?</p>
  </div>

  <div class="working-space"></div>

  <p class="question-text">Total books: <span class="answer-box"></span></p>
</div>
```

## GENERATION RULES

1. **Follow SPEC exactly**: Use {{PROBLEM_TYPE}} for each question
2. **Match CONTEXT**: Apply {{CONTEXT_SPEC}} appropriately (emphasize money)
3. **Integrate VISUAL_SUPPORT**: Use bar models, diagrams as specified
4. **Apply REASONING_LEVEL**: Match concrete/pictorial/abstract level
5. **Use OPERATION_FOCUS**: Ensure correct operation mix
6. **Real-world contexts**: Make problems meaningful and engaging
7. **UK currency** for money problems (pence and pounds)
8. **Clear question wording**: Child-friendly language
9. **Working space** for student calculations
10. **Answer key MUST include**:
    - Step-by-step working for multi-step problems
    - Explanation of inverse operations
    - How to use bar models
11. **3-DIGIT NUMBERS** primarily (some 4-digit acceptable for totals in multi-step problems)
12. **Colored backgrounds** consistently (Q1=#FFF9C4, Q2=#E3F2FD, Q3=#F1F8E9, Q4=#FCE4EC, Q5=#FFF3E0)
13. **USE COLOR COIN IMAGES**: ALWAYS use "col - TRF.png" (color) versions for maximum visual engagement

## UK MONEY REFERENCE

**Available Coins** (ALWAYS use color "col" versions, NEVER black & white "bw"):
- **1p**: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png` (width="35" height="35")
- **2p**: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png` (width="38" height="38")
- **5p**: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png` (width="40" height="40")
- **10p**: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png` (width="42" height="42")
- **20p**: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png` (width="44" height="44")
- **50p**: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png` (width="50" height="50")
- **£1**: `/images/WORKSHEET_OBJECTS/money/UK coins/£1 heads col - TRF.png` (width="52" height="52")
- **£2**: `/images/WORKSHEET_OBJECTS/money/UK coins/£2 heads col - TRF.png` (width="55" height="55")

**Realistic Amounts** for Year 3:
- Pocket money: £2-£5 per week
- Toys/books: £3-£9 per item
- Fundraising: £5-£20 class total
- Shopping trips: £4-£10 total spend

## VALIDATION CHECKLIST

Before returning worksheet:
- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q matches {{PROBLEM_TYPE}}?
- [ ] Context matches {{CONTEXT_SPEC}}?
- [ ] Visual support matches {{VISUAL_SUPPORT}}?
- [ ] Operation focus matches {{OPERATION_FOCUS}}?
- [ ] All problems solvable by Year 3 (ages 7-8)?
- [ ] Bar models used correctly (whole/parts clear)?
- [ ] Money problems use UK currency?
- [ ] Working space provided for calculations?
- [ ] Answer key shows full working?
- [ ] Multi-step problems clearly structured?
- [ ] Backgrounds: Q1=#FFF9C4, Q2=#E3F2FD, Q3=#F1F8E9, Q4=#FCE4EC, Q5=#FFF3E0?

<!-- DEBUG-END: Check console for rotation confirmation -->

Generate complete HTML. UK Year 3 (ages 7-8). Focus: PROBLEM SOLVING, REASONING, BAR MODELS.
