# Ages 7-8: Missing Number Problems (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on missing number problems in addition and subtraction.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Find the missing number (addition)
└── Q2: Find the missing number (subtraction)

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problem with missing number
└── Q4: Balance/equation problem

SECTION C: REASONING (Q5)
└── Q5: Multi-step missing number puzzle
```

## Missing Number Types

**Addition Missing Numbers:**
- □ + 245 = 567 (find the first addend)
- 345 + □ = 678 (find the second addend)
- 234 + 345 = □ (find the sum)

**Subtraction Missing Numbers:**
- □ - 234 = 345 (find the minuend)
- 567 - □ = 234 (find the subtrahend)
- 456 - 234 = □ (find the difference)

**Number Range:** 3-digit numbers (100-999)

## CSS Styles (Include in every worksheet)

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
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.equation-row{font-family:monospace;font-size:16pt;margin:8px 0;display:flex;align-items:center;gap:5px}
.answer-box-small{display:inline-block;min-width:60px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.balance-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:10px 0;display:flex;justify-content:center;align-items:center;gap:20px}
.balance-side{font-family:monospace;font-size:16pt;padding:10px 15px;background:#fff;border-radius:5px;border:1px solid #ddd}
.balance-equals{font-size:24pt;color:#4CAF50}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Question Patterns

### Q1: Missing Number - Addition (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Find the missing numbers.</p>
  <p class="sub-question">a) <input type="text" class="answer-box-small" data-answer="234" style="width:60px"> + 345 = 579</p>
  <p class="sub-question">b) 456 + <input type="text" class="answer-box-small" data-answer="287" style="width:60px"> = 743</p>
  <p class="sub-question">c) 378 + 256 = <input type="text" class="answer-box-small" data-answer="634" style="width:60px"></p>
</div>
```

### Q2: Missing Number - Subtraction (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Find the missing numbers.</p>
  <p class="sub-question">a) <input type="text" class="answer-box-small" data-answer="567" style="width:60px"> - 234 = 333</p>
  <p class="sub-question">b) 645 - <input type="text" class="answer-box-small" data-answer="278" style="width:60px"> = 367</p>
  <p class="sub-question">c) 789 - 345 = <input type="text" class="answer-box-small" data-answer="444" style="width:60px"></p>
</div>
```

### Q3: Word Problem with Missing Number (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Find the missing number.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character} had some {items}. After buying {number} more, they had {total}. How many did they start with?</span>
  </div>
  <p class="sub-question">□ + {number} = {total}</p>
  <p class="sub-question">Answer: <input type="text" class="answer-box-small" data-answer="{missing}" style="width:60px"> {items}</p>
</div>
```

### Q4: Balance/Equation Problem (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Make the scales balance.</p>
  <div class="balance-box">
    <div class="balance-side">345 + 278</div>
    <span class="balance-equals">=</span>
    <div class="balance-side"><input type="text" class="answer-box-small" data-answer="623" style="width:60px"></div>
  </div>
  <div class="balance-box">
    <div class="balance-side">□ - 156</div>
    <span class="balance-equals">=</span>
    <div class="balance-side">389</div>
  </div>
  <p class="sub-question">□ = <input type="text" class="answer-box-small" data-answer="545" style="width:60px"></p>
</div>
```

### Q5: Multi-Step Missing Number Puzzle (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Solve the puzzle.</p>
  <div class="reasoning-box">
    <p class="story-text">I think of a number. I add {number1} and get {result1}. Then I subtract {number2} and get {result2}. What was my number?</p>
    <p class="sub-question">Step 1: □ + {number1} = {result1}, so □ = <input type="text" class="answer-box-small" data-answer="{step1}" style="width:60px"></p>
    <p class="sub-question">Check: {step1} - {number2} = <input type="text" class="answer-box-small" data-answer="{result2}" style="width:60px"> ✓</p>
  </div>
</div>
```

## Theme Variations

### Foundation 1 - Sweet Shop Theme
- Characters: Candy (shopkeeper), Tom (customer)
- Context: Sweets, chocolates, lollipops
- Use simpler 3-digit numbers (100-400)

### Foundation 2 - Pet Store Theme
- Characters: Mr. Paws (owner), Emma (helper)
- Context: Pet food, toys, treats
- Use simpler 3-digit numbers (100-400)

### Practice 1 - Cinema Theme
- Characters: Movie Max, Ticket Tina
- Context: Tickets, popcorn, seats
- Use medium 3-digit numbers (200-600)

### Practice 2 - Train Station Theme
- Characters: Driver Dan, Conductor Chloe
- Context: Passengers, carriages, journeys
- Use medium 3-digit numbers (200-600)

### Practice 3 - Zoo Theme
- Characters: Zookeeper Zara, Helper Harry
- Context: Animals, visitors, feeding times
- Use harder 3-digit numbers (300-800)

### Practice 4 - Museum Theme
- Characters: Curator Kate, Guide Greg
- Context: Exhibits, visitors, artifacts
- Use harder 3-digit numbers (300-800)

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 234 &nbsp; b) 287 &nbsp; c) 634</p>
  <p><strong>2.</strong> a) 567 &nbsp; b) 278 &nbsp; c) 444</p>
  <p><strong>3.</strong> 345</p>
  <p><strong>4.</strong> 623, 545</p>
  <p><strong>5.</strong> 256, 189</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All missing numbers mathematically correct
- [ ] Characters named and used consistently
- [ ] Answer key matches all input boxes
- [ ] Theme carried throughout worksheet
