# Ages 6-7: Comparing Numbers

**CRITICAL: EXACTLY {{questionCount}} questions. Compare numbers 0-100 using <, >, = symbols.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 0-100 (two-digit numbers)
- **Symbols**: < (less than), > (greater than), = (equal to)
- **Strategy**: Compare TENS first, then ONES
- **Key Skills**: Place value comparison, reasoning, open-ended problems

## QUESTION TYPES (Reasoning-focused)

**Q1**: Place value comparison - base-10 blocks shown, WRITE answer in box (NOT circle)
**Q2**: Open-ended - "What number could go in the box?" (multiple correct answers)
**Q3**: Fill in the symbol (<, >, =) with reasoning element (Tom says...)
**Q4**: Order 4 numbers smallest to largest
**Q5**: Word problem with three-part question

## COMPARISON VOCABULARY (UK)
- "greater than" (NOT bigger)
- "less than" (NOT smaller)
- "equal to" (same as)

## CSS
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* BASE-10 BLOCKS */
.comparison-container{display:flex;justify-content:center;align-items:flex-end;gap:30px;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.number-group{text-align:center}
.number-label{font-size:24pt;font-weight:bold;color:#1976D2;margin-bottom:10px}
.blocks-area{display:flex;gap:15px;justify-content:center;align-items:flex-end}
.tens-stack{display:flex;flex-direction:column;gap:3px}
.ones-stack{display:flex;flex-wrap:wrap;gap:2px;max-width:60px;align-content:flex-end}
.ten-rod{width:80px;height:18px;background:linear-gradient(180deg,#FFB74D 0%,#FF9800 100%);border:2px solid #E65100;border-radius:3px;box-shadow:1px 1px 0 #BF360C}
.unit-cube{width:18px;height:18px;background:linear-gradient(135deg,#81C784 0%,#4CAF50 100%);border:2px solid #2E7D32;border-radius:2px;box-shadow:1px 1px 0 #1B5E20}
.vs-circle{width:50px;height:50px;background:#E3F2FD;border:3px solid #1976D2;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;color:#1976D2}

/* OPEN-ENDED BOX */
.open-ended-box{background:#E8F5E9;border:3px solid #4CAF50;border-radius:10px;padding:20px;margin:15px 0;text-align:center}
.equation-display{font-size:28pt;font-weight:bold;display:flex;align-items:center;justify-content:center;gap:15px}
.mystery-box{width:70px;height:55px;border:3px dashed #FF9800;border-radius:8px;background:#FFF9C4;display:inline-flex;align-items:center;justify-content:center;font-size:24pt;color:#999}
.symbol-large{color:#E53935;font-size:32pt}
.multiple-answers{display:flex;gap:15px;justify-content:center;margin-top:15px}
.answer-slot{width:60px;height:45px;border:2px solid #333;border-radius:8px;background:#FFF}

/* SYMBOL ROWS */
.symbol-row{display:flex;align-items:center;justify-content:center;gap:15px;margin:12px 0;font-size:22pt;font-weight:bold}
.compare-number{background:#FFF;border:3px solid #333;border-radius:8px;padding:10px 20px;min-width:60px;text-align:center}
.symbol-box{width:60px;height:50px;border:3px dashed #FF9800;border-radius:8px;background:#FFF9C4}
.symbol-hint{display:flex;justify-content:center;gap:20px;margin-top:10px;font-size:12pt;color:#666}
.symbol-option{padding:5px 15px;border:2px solid #ddd;border-radius:5px;background:#FFF}

/* REASONING BOX */
.reasoning-box{background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#E1BEE7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #9C27B0;border-radius:10px;padding:12px;position:relative;flex:1}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #9C27B0 transparent transparent}

/* ORDERING */
.number-cards{display:flex;justify-content:center;gap:15px;margin:15px 0;flex-wrap:wrap}
.number-card{background:linear-gradient(180deg,#BBDEFB 0%,#90CAF9 100%);border:3px solid #1976D2;border-radius:10px;padding:15px 20px;font-size:22pt;font-weight:bold;color:#0D47A1;box-shadow:3px 3px 0 #0D47A1}
.order-row{display:flex;align-items:center;justify-content:center;gap:8px;margin:15px 0}
.order-box{display:flex;flex-direction:column;align-items:center;gap:5px}
.order-label{font-size:10pt;color:#666;font-weight:bold}
.order-answer{width:60px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF}
.order-arrow{font-size:20pt;color:#4CAF50}

/* WORD PROBLEM */
.word-problem-box{background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px;padding:15px;margin:10px 0}
.comparison-visual{display:flex;justify-content:center;gap:40px;margin:15px 0}
.person-group{text-align:center;padding:15px;background:#FFF;border-radius:8px;border:2px solid #FFB74D}
.person-name{font-size:14pt;font-weight:bold;color:#E65100;margin-bottom:10px}
.person-amount{font-size:28pt;font-weight:bold;color:#333}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:65px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;width:45px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
```

## TEMPLATES

### Q1: Base-10 Block Comparison (WRITE answer, NOT circle)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Look at the blocks. Which number is <strong>greater</strong>?</p>
  <div class="comparison-container">
    <div class="number-group">
      <div class="number-label">34</div>
      <div class="blocks-area">
        <div class="tens-stack">
          <div class="ten-rod"></div>
          <div class="ten-rod"></div>
          <div class="ten-rod"></div>
        </div>
        <div class="ones-stack">
          <div class="unit-cube"></div><div class="unit-cube"></div>
          <div class="unit-cube"></div><div class="unit-cube"></div>
        </div>
      </div>
    </div>
    <div class="vs-circle">VS</div>
    <div class="number-group">
      <div class="number-label">52</div>
      <div class="blocks-area">
        <div class="tens-stack">
          <div class="ten-rod"></div><div class="ten-rod"></div>
          <div class="ten-rod"></div><div class="ten-rod"></div>
          <div class="ten-rod"></div>
        </div>
        <div class="ones-stack">
          <div class="unit-cube"></div><div class="unit-cube"></div>
        </div>
      </div>
    </div>
  </div>
  <p class="sub-question">a) The greater number is: <span class="answer-box"></span></p>
  <p class="sub-question">b) It has <span class="answer-box-small"></span> tens. (How many tens does the greater number have?)</p>
</div>
```

### Q2: Open-Ended (Multiple Correct Answers)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> What number could go in the box?</p>
  <div class="open-ended-box">
    <div class="equation-display">
      <span class="mystery-box">?</span>
      <span class="symbol-large">&lt;</span>
      <span style="font-size:32pt">45</span>
    </div>
    <p style="font-size:13pt;color:#555;margin:15px 0 5px 0">The mystery number must be <strong>less than</strong> 45.</p>
    <p style="font-size:14pt;font-weight:bold;margin:10px 0">Find 3 different numbers that work:</p>
    <div class="multiple-answers">
      <div class="answer-slot"></div>
      <div class="answer-slot"></div>
      <div class="answer-slot"></div>
    </div>
  </div>
</div>
```

### Q3: Symbol Fill-in with Reasoning
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Write <strong>&lt;</strong>, <strong>&gt;</strong>, or <strong>=</strong> in each box.</p>
  <div class="symbol-hint">
    <span class="symbol-option">&lt; less than</span>
    <span class="symbol-option">&gt; greater than</span>
    <span class="symbol-option">= equal to</span>
  </div>
  <div class="symbol-row">
    <span class="compare-number">38</span>
    <span class="symbol-box"></span>
    <span class="compare-number">45</span>
  </div>
  <div class="symbol-row">
    <span class="compare-number">50</span>
    <span class="symbol-box"></span>
    <span class="compare-number">50</span>
  </div>
  <!-- REASONING ELEMENT - Tests common misconception -->
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">🧒</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Tom says:</strong> "29 is greater than 35 because 9 is more than 5."</p>
      </div>
    </div>
    <p class="sub-question" style="margin-top:12px">c) Is Tom correct? <span class="answer-box-small"></span> (Yes / No)</p>
    <p class="sub-question">d) Write the correct symbol: 29 <span class="answer-box-small"></span> 35</p>
  </div>
</div>
```

### Q4: Order Numbers Smallest to Largest
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Write these numbers in order from <strong>smallest</strong> to <strong>largest</strong>.</p>
  <div class="number-cards">
    <div class="number-card">47</div>
    <div class="number-card">28</div>
    <div class="number-card">35</div>
    <div class="number-card">41</div>
  </div>
  <div class="order-row">
    <div class="order-box">
      <span class="order-label">Smallest</span>
      <div class="order-answer"></div>
    </div>
    <span class="order-arrow">→</span>
    <div class="order-box"><div class="order-answer"></div></div>
    <span class="order-arrow">→</span>
    <div class="order-box"><div class="order-answer"></div></div>
    <span class="order-arrow">→</span>
    <div class="order-box">
      <span class="order-label">Largest</span>
      <div class="order-answer"></div>
    </div>
  </div>
</div>
```

### Q5: Word Problem Comparison
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Read the problem and answer the questions.</p>
  <div class="word-problem-box">
    <p style="font-size:14pt;margin:10px 0"><strong>Maya</strong> collected <strong>42 stickers</strong>. <strong>Sam</strong> collected <strong>35 stickers</strong>.</p>
    <div class="comparison-visual">
      <div class="person-group">
        <div class="person-name">Maya</div>
        <div class="person-amount">42</div>
      </div>
      <div class="person-group">
        <div class="person-name">Sam</div>
        <div class="person-amount">35</div>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Who collected <strong>more</strong> stickers? <span class="answer-box"></span></p>
  <p class="sub-question">b) Write using a symbol: 42 <span class="answer-box-small"></span> 35</p>
  <p class="sub-question">c) How many more stickers does Maya have? <span class="answer-box-small"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

**Worksheet 1 (Easy - Numbers 20-50):**
- Q1: Compare 34 vs 52 (clear tens difference)
- Q2: ? < 45 (find 3 numbers less than 45)
- Q3: 38 vs 45, 50 vs 50, Tom says "29 > 35" - No, 29 < 35
- Q4: Order 28, 35, 41, 47
- Q5: Maya (42) vs Sam (35) stickers

**Worksheet 2 (Average - Numbers 40-70):**
- Q1: Compare 58 vs 43 (bigger number shown first)
- Q2: 52 < ? (find 3 numbers greater than 52)
- Q3: 63 vs 48, 55 vs 55, Tom says "67 > 76" - No, 67 < 76
- Q4: Order 61, 48, 55, 39
- Q5: Class A (63 books) vs Class B (58 books)

**Worksheet 3 (Hard - Numbers 60-99, close comparisons):**
- Q1: Compare 76 vs 79 (same tens, different ones - harder!)
- Q2: ? > 85 (find 3 numbers greater than 85)
- Q3: 91 vs 89, 77 vs 77, Tom says "84 > 48" - Yes, correct!
- Q4: Order 92, 78, 89, 81 (close numbers)
- Q5: Red team (85 points) vs Blue team (91 points)

## RULES

1. **Q1**: WRITE answer in box (NOT "circle" - must work on tablets)
2. **Q2**: Open-ended with 3 answer slots (multiple correct answers)
3. **Q3**: Must include reasoning element ("Tom says..." tests misconception)
4. **Q3**: Must include at least one = comparison
5. **Q4**: 4 numbers to order with answer boxes
6. **Q5**: Three-part question (who has more + symbol + how many more)
7. **NO unnecessary hints** - let children reason through problems
8. **Answer key** explains reasoning

## ANSWER KEY FORMAT
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>Q1:</strong> a) 52 b) 5 tens (52 has 5 tens, 34 has only 3 tens)</p>
  <p><strong>Q2:</strong> Any 3 numbers less than 45, e.g. 10, 30, 44 (many correct answers)</p>
  <p><strong>Q3:</strong> 38 &lt; 45, 50 = 50, c) No d) 29 &lt; 35 (compare tens first: 2 tens &lt; 3 tens)</p>
  <p><strong>Q4:</strong> 28, 35, 41, 47</p>
  <p><strong>Q5:</strong> a) Maya b) 42 &gt; 35 c) 7 more</p>
</div>
```

Generate complete HTML. UK Year 2 aligned.
