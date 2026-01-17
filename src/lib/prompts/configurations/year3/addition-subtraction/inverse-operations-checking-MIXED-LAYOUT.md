# Ages 7-8: Inverse Operations & Checking (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on using inverse operations to check calculations.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Basic inverse operation pairs
└── Q2: Check calculations using inverse

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problem - check the answer
└── Q4: Word problem - find and fix errors

SECTION C: REASONING (Q5)
└── Q5: Explain why inverse operations work
```

## Inverse Operations Focus

**Key Concept:** Addition and subtraction are inverse operations.
- If a + b = c, then c - b = a and c - a = b
- Use this relationship to CHECK answers
- "Inverse" means opposite or reverse

**Number Range:** 3-digit numbers (100-999), focusing on numbers that require exchange

**Checking Strategy:**
1. Start with the answer
2. Perform the inverse operation
3. If you get back to the original number, the answer is correct

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
.inverse-pair{display:flex;gap:40px;align-items:center;margin:10px 0;flex-wrap:wrap}
.equation-box{font-family:monospace;font-size:16pt;background:#fff;border:2px solid #ddd;padding:10px 15px;border-radius:8px}
.check-arrow{font-size:20pt;color:#4CAF50}
.answer-box-small{display:inline-block;min-width:50px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.correct-box{background:#C8E6C9;border-color:#4CAF50}
.incorrect-box{background:#FFCDD2;border-color:#F44336}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Question Patterns

### Q1: Complete Inverse Operation Pairs (Fluency)
Show addition equation, student writes the inverse subtraction.
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Write the inverse operation.</p>
  <div class="inverse-pair">
    <div class="equation-box">245 + 318 = 563</div>
    <span class="check-arrow">→</span>
    <div class="equation-box">563 - <input type="text" class="answer-box-small" data-answer="318"> = <input type="text" class="answer-box-small" data-answer="245"></div>
  </div>
  <!-- Repeat for 2-3 pairs -->
</div>
```

### Q2: Check These Calculations (Fluency)
Given a calculation, use inverse to check if correct.
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Use the inverse operation to check. Write ✓ or ✗.</p>
  <p class="sub-question">a) 428 - 163 = 265 → Check: 265 + 163 = <input type="text" class="answer-box-small" data-answer="428">
    Is this correct? <input type="text" class="answer-box-small" data-answer="✓" style="width:40px"></p>
</div>
```

### Q3: Word Problem - Check the Answer (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Check {Character}'s answer.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character} says: "{number1} - {number2} = {answer}". Use the inverse to check.</span>
  </div>
  <p class="sub-question">Inverse check: {answer} + {number2} = <input type="text" class="answer-box-small" data-answer="{result}"></p>
  <p class="sub-question">{Character} is <input type="text" class="answer-box-word" data-answer="correct/wrong">.</p>
</div>
```

### Q4: Find and Fix the Error (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Find the mistake.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character} calculated: {number1} + {number2} = {wrong_answer}. Check using inverse.</span>
  </div>
  <p class="sub-question">Inverse: {wrong_answer} - {number2} = <input type="text" class="answer-box-small" data-answer="{result}"> (should be {number1})</p>
  <p class="sub-question">The correct answer is <input type="text" class="answer-box-small" data-answer="{correct_answer}">.</p>
</div>
```

### Q5: Explain Why (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Why does inverse work?</p>
  <div class="reasoning-box">
    <p class="sub-question">If 350 + 275 = 625, then 625 - 275 = <input type="text" class="answer-box-small" data-answer="350"></p>
    <p class="sub-question">This works because addition and subtraction are <input type="text" class="answer-box-word" data-answer="inverse"> operations.</p>
  </div>
</div>
```

## Theme Variations

### Foundation 1 - Pets Theme
- Characters: Max (dog), Luna (cat)
- Context: Counting pet food, toys, treats
- Use simpler 3-digit numbers (100-500)

### Foundation 2 - School Theme
- Characters: Miss Smith (teacher), Oliver (student)
- Context: Counting books, pencils, paper
- Use simpler 3-digit numbers (100-500)

### Practice 1 - Sports Theme
- Characters: Coach Tom, Player Emma
- Context: Points scored, laps completed
- Use medium 3-digit numbers (200-700)

### Practice 2 - Space Theme
- Characters: Astronaut Zara, Captain Max
- Context: Distance traveled, fuel used
- Use medium 3-digit numbers (200-700)

### Practice 3 - Farm Theme
- Characters: Farmer Ben, Helper Sophie
- Context: Animals counted, crops harvested
- Use harder 3-digit numbers (300-900)

### Practice 4 - Shop Theme
- Characters: Shopkeeper Ali, Customer Ruby
- Context: Items in stock, items sold
- Use harder 3-digit numbers (300-900)

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 318, 245 &nbsp; 156, 347 &nbsp; 429, 238</p>
  <p><strong>2.</strong> a) 428, ✓ &nbsp; b) 524, ✗ (should be 523)</p>
  <p><strong>3.</strong> 645, correct</p>
  <p><strong>4.</strong> 382, 587</p>
  <p><strong>5.</strong> 350, inverse</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All inverse pairs mathematically correct
- [ ] Characters named and used consistently
- [ ] Answer key matches all input boxes
- [ ] Theme carried throughout worksheet
