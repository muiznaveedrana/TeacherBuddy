# Ages 6-7: Two-Digit Addition and Subtraction (INTERACTIVE-OPTIMISED V2 + INTEGRATED ANSWER BOX)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 20-99 (two-digit numbers)
- **Operations**: Addition and subtraction within 100
- **Methods**: Partitioning, column method, number lines, mental strategies
- **Regrouping**: Optional - depends on difficulty
- **Interactive Priority**: All answers must be typed numbers (NO working space divs)
- **Key Misconception**: "Subtraction means taking away the smaller from larger" (test this!)

## QUESTION TYPES (Progressive Difficulty)

**Q1**: Partitioning addition - break into tens and ones (visual)
**Q2**: Column addition - INTEGRATED answer box below line (Option 1 UX)
**Q3**: Subtraction using number line or partitioning
**Q4**: Column subtraction - INTEGRATED answer box below line (Option 1 UX)
**Q5**: Word problem with reasoning challenge (character makes mistake)

## CSS (Compact - Interactive Optimised):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4;max-width:800px;margin:0 auto}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* PARTITIONING */
.partition-container{display:flex;justify-content:center;align-items:center;gap:12px;margin:15px 0;flex-wrap:wrap}
.partition-box{border:3px solid #333;padding:8px 12px;border-radius:8px;font-size:18pt;font-weight:bold;min-width:55px;text-align:center}
.partition-tens{background:#FFEB3B;color:#000}
.partition-ones{background:#81C784;color:#000}
.operator{font-size:24pt;font-weight:bold;color:#FF9800;margin:0 8px}

/* COLUMN METHOD - OPTION 1: INTEGRATED ANSWER BOX */
.column-container{display:inline-block;border:3px solid #333;padding:15px 20px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:'Courier New',monospace;font-size:20pt;line-height:1.4;margin:15px 0}
.column-line{border-top:3px solid #000;margin:5px 0;padding-top:8px}
/* Answer box is INSIDE column-container, BELOW the line - mimics paper-based learning */

/* NUMBER LINE */
.number-line-container{margin:15px 0;padding:15px;background:#E8F5E9;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:25px 10px 15px}
.number-line::before{content:'';position:absolute;top:50%;left:5%;right:5%;height:3px;background:#333;transform:translateY(-50%)}
.tick{width:36px;height:36px;background:#F5F5F5;border:2px solid #BDBDBD;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12pt;font-weight:normal;position:relative;z-index:2;color:#666}
.tick.start{background:#FFB74D;color:#000;font-weight:bold;border:3px solid #FF9800}
.tick.jump{background:#4CAF50;color:#FFF;font-weight:bold;border:3px solid #2E7D32}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.context-icon{font-size:36pt;margin-bottom:10px}
.context-story{font-size:14pt;color:#333;margin:10px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:12px;flex:1;position:relative}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #66BB6A transparent transparent}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:70px;height:42px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px;font-size:16pt;text-align:center}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## TEMPLATES

### Q1: Partitioning Addition
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Solve 34 + 25 using partitioning.</p>
  <div class="partition-container">
    <div class="partition-box partition-tens">30</div>
    <span class="operator">+</span>
    <div class="partition-box partition-ones">4</div>
    <span class="operator">+</span>
    <div class="partition-box partition-tens">20</div>
    <span class="operator">+</span>
    <div class="partition-box partition-ones">5</div>
  </div>
  <p class="sub-question">a) Add the tens: 30 + 20 = <span class="answer-box"></span></p>
  <p class="sub-question">b) Add the ones: 4 + 5 = <span class="answer-box"></span></p>
  <p class="sub-question">c) Total: <span class="answer-box"></span></p>
</div>
```

### Q2: Column Addition (OPTION 1 - INTEGRATED ANSWER BOX)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Add using the column method.</p>
  <div style="text-align:center;margin:15px 0">
    <div class="column-container">
      &nbsp;&nbsp;4 7<br>
    + 3 6<br>
    <div class="column-line"></div>
    <div style="text-align:right"><span class="answer-box" style="display:inline-block;min-width:95px;margin-top:3px"></span></div>
    </div>
  </div>
</div>
```
**CRITICAL**: Answer box is INSIDE column-container div, BELOW the horizontal line, RIGHT-ALIGNED under the numbers. This mimics paper-based learning where children write the answer directly underneath the column numbers.

### Q3: Subtraction with Number Line
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Subtract 52 - 18 using the number line.</p>
  <div class="number-line-container">
    <p style="margin:5px 0;font-size:13pt;text-align:center">Start at 52, jump back 10, then back 8</p>
    <div class="number-line">
      <div class="tick">32</div>
      <div class="tick">34</div>
      <div class="tick">36</div>
      <div class="tick">38</div>
      <div class="tick">40</div>
      <div class="tick jump">42</div>
      <div class="tick">44</div>
      <div class="tick">48</div>
      <div class="tick">50</div>
      <div class="tick start">52</div>
    </div>
  </div>
  <p class="sub-question">52 - 18 = <span class="answer-box"></span></p>
</div>
```

### Q4: Column Subtraction (OPTION 1 - INTEGRATED ANSWER BOX)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Subtract using the column method.</p>
  <div style="text-align:center;margin:15px 0">
    <div class="column-container">
      &nbsp;&nbsp;6 5<br>
    - 2 7<br>
    <div class="column-line"></div>
    <div style="text-align:right"><span class="answer-box" style="display:inline-block;min-width:95px;margin-top:3px"></span></div>
    </div>
  </div>
</div>
```
**CRITICAL**: Answer box is INSIDE column-container div, BELOW the horizontal line, RIGHT-ALIGNED under the numbers. This reinforces column alignment and place value understanding.

### Q5: Word Problem with Reasoning
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">⚽</div>
    <p class="context-story"><span class="character-name">Jake</span> had 45 stickers. He gave 18 to his friend.</p>
    <p class="context-story">How many stickers does Jake have left?</p>
  </div>
  <p class="sub-question">a) Jake has <span class="answer-box"></span> stickers left.</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👧</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Mia says:</strong> "45 - 18 = 33 because 45 - 10 = 35, then 35 - 8 = 33."</p>
      </div>
    </div>
  </div>
  <p class="sub-question">b) Is Mia correct? <span class="answer-box"></span> (Yes / No)</p>
  <p class="sub-question">c) If No, what is the correct answer? <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Numbers 20-50, School Theme)
**Characters**: Emma, Leo, Mr. Smith

| Q | Problem | Method |
|---|---------|--------|
| Q1 | 23 + 15 | Partitioning (20+3+10+5) |
| Q2 | 34 + 21 | Column addition (no regrouping) |
| Q3 | 38 - 12 | Number line (jump back) |
| Q4 | 45 - 23 | Column subtraction (no borrowing) |
| Q5 | Emma had 32 pencils, got 14 more | Word problem + reasoning |

**Misconception Test (Q5c):** Leo says "32 + 14 = 56" - WRONG! (Should be 46)

**Answer Key**:
- Q1: a) 30  b) 8  c) 38
- Q2: 55
- Q3: 26
- Q4: 22
- Q5: a) 46  b) No  c) 46 (Leo added tens wrong: 30+10=40, not 50)

**CRITICAL: Answer key values must be CLEAN NUMBERS ONLY. ✅ CORRECT: 'a) 27' ❌ WRONG: 'a) 27 animals'. Explanations go in parentheses AFTER all answers**

### Worksheet 2 (Average - Numbers 30-70, Animal Theme)
**Characters**: Zara the Zookeeper, Monkey Max

| Q | Problem | Method |
|---|---------|--------|
| Q1 | 36 + 27 | Partitioning (30+6+20+7) |
| Q2 | 48 + 35 | Column addition (with regrouping) |
| Q3 | 54 - 19 | Number line (jump back 10, then 9) |
| Q4 | 62 - 28 | Column subtraction (with borrowing) |
| Q5 | Zara fed 51 animals, 24 left | Word problem + reasoning |

**Misconception Test (Q5c):** Max says "51 - 24 = 33" - WRONG! (Common error: subtracting smaller from larger in each column)

**Answer Key**:
- Q1: a) 50  b) 13  c) 63
- Q2: 83 (regrouping: 8+5=13, write 3 carry 1)
- Q3: 35
- Q4: 34 (borrowing: 12-8=4, 5-2=3)
- Q5: a) 27  b) No  c) 27 (Max did 4-1=3, 5-2=3, giving 33 - wrong!)

### Worksheet 3 (Hard - Numbers 50-99, Space Theme)
**Characters**: Astronaut Amy, Robot Rex

| Q | Problem | Method |
|---|---------|--------|
| Q1 | 58 + 36 | Partitioning (50+8+30+6) |
| Q2 | 67 + 28 | Column addition (with regrouping) |
| Q3 | 73 - 27 | Number line (jump back 20, then 7) |
| Q4 | 81 - 45 | Column subtraction (with borrowing) |
| Q5 | Amy collected 92 moon rocks, gave away 38 | Word problem + reasoning |

**Misconception Test (Q5c):** Rex says "92 - 38 = 64" - WRONG! (Common error in borrowing)

**Answer Key**:
- Q1: a) 80  b) 14  c) 94
- Q2: 95 (regrouping: 7+8=15, write 5 carry 1)
- Q3: 46
- Q4: 36 (borrowing: 11-5=6, 7-4=3)
- Q5: a) 54  b) No  c) 54 (Rex forgot to borrow: did 12-8=4, 8-3=5, giving 54 - correct by accident!)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 50 &nbsp; b) 13 &nbsp; c) 63</p>
  <p><strong>2.</strong> 83 (8+5=13, write 3 carry 1)</p>
  <p><strong>3.</strong> 35 (54 - 10 = 44, then 44 - 9 = 35)</p>
  <p><strong>4.</strong> 34 (borrowing needed: 12-8=4, 5-2=3)</p>
  <p><strong>5.</strong> a) 27 &nbsp; b) No &nbsp; c) 27 (Max subtracted each digit separately: 4-1=3, 5-2=3 = 33, which is wrong!)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b, c) - each gets its own answer in key
4. **NO working-space divs** - interactive incompatible
5. **Q5 MUST test a common misconception** - character makes calculation error
6. **Themed characters** - use names from theme variation
7. **Answer key explains WHY** - show working for column method
8. **Clear regrouping notation** - show carrying/borrowing in answers
9. **Q2 and Q4: Answer box integrated INSIDE column-container, BELOW the line** - mimics paper-based learning, reinforces place value
10. **Clean numeric answers** - NO units in answer key values (e.g., "46" not "46 pencils")

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Partitioning with THREE sub-questions (a, b, c)?
- [ ] Q2: Column addition with INTEGRATED answer box below line (inside column-container)?
- [ ] Q3: Number line or partitioning subtraction?
- [ ] Q4: Column subtraction with INTEGRATED answer box below line (inside column-container)?
- [ ] Q5: Word problem with THREE parts (a, b, c)?
- [ ] ALL answer boxes have corresponding answers?
- [ ] Answer key uses a) b) c) format for multi-part questions?
- [ ] Character makes mistake in Q5 that tests common error?
- [ ] NO working-space divs?
- [ ] Clean numeric answers (no units in answer values)?
- [ ] Answer boxes in Q2/Q4 have min-width:95px (spans 2 digits, right-aligned)?

Generate complete HTML. UK Year 2 aligned. Use themed characters throughout.
