# Ages 7-8: 3 Times Table (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on the 3 times table.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Complete the 3 times table facts
└── Q2: Quick-fire 3× questions

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problem using 3×
└── Q4: Arrays and groups of 3

SECTION C: REASONING (Q5)
└── Q5: Pattern spotting or problem solving
```

## 3 Times Table Focus

**Key Facts:** 3×1=3, 3×2=6, 3×3=9, 3×4=12, 3×5=15, 3×6=18, 3×7=21, 3×8=24, 3×9=27, 3×10=30, 3×11=33, 3×12=36

**Patterns to highlight:**
- Alternating odd/even: 3, 6, 9, 12, 15...
- Digit sum pattern: 3, 6, 9, 12(3), 15(6), 18(9), 21(3)...
- Adding 3 each time

**Related Division Facts:** 6÷3=2, 9÷3=3, 12÷3=4, etc.

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
.times-table-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0}
.times-fact{font-family:monospace;font-size:14pt;padding:8px;background:#fff;border:1px solid #ddd;border-radius:5px;text-align:center}
.array-box{display:inline-block;margin:10px;padding:10px;background:#fff;border:1px solid #ddd;border-radius:8px}
.array-row{display:flex;gap:5px;margin:3px 0}
.array-item{font-size:16pt}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Question Patterns

### Q1: Complete the Times Table (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Complete the 3 times table.</p>
  <div class="times-table-grid">
    <div class="times-fact">3 × 2 = <input type="text" class="answer-box-small" data-answer="6" style="width:40px"></div>
    <div class="times-fact">3 × 5 = <input type="text" class="answer-box-small" data-answer="15" style="width:40px"></div>
    <div class="times-fact">3 × 8 = <input type="text" class="answer-box-small" data-answer="24" style="width:40px"></div>
  </div>
</div>
```

### Q2: Quick-Fire Questions (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Answer these quickly!</p>
  <p class="sub-question">a) 3 × 4 = <input type="text" class="answer-box-small" data-answer="12" style="width:40px"></p>
  <p class="sub-question">b) 3 × 7 = <input type="text" class="answer-box-small" data-answer="21" style="width:40px"></p>
  <p class="sub-question">c) 3 × 9 = <input type="text" class="answer-box-small" data-answer="27" style="width:40px"></p>
</div>
```

### Q3: Word Problem (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character} buys <strong>6</strong> packs of {items}. Each pack has <strong>3</strong> {items}. How many {items} altogether?</span>
  </div>
  <p class="sub-question">6 × 3 = <input type="text" class="answer-box-small" data-answer="18" style="width:40px"> {items}</p>
</div>
```

### Q4: Arrays (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Write the multiplication for each array.</p>
  <div class="array-box">
    <div class="array-row">⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐</div>
  </div>
  <p class="sub-question"><input type="text" class="answer-box-small" data-answer="4" style="width:40px"> × 3 = <input type="text" class="answer-box-small" data-answer="12" style="width:40px"></p>
</div>
```

### Q5: Pattern/Problem Solving (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Spot the pattern.</p>
  <div class="reasoning-box">
    <p class="story-text">Look at the 3 times table: 3, 6, 9, 12, 15, 18...</p>
    <p class="sub-question">What is the next number? <input type="text" class="answer-box-small" data-answer="21" style="width:40px"></p>
    <p class="sub-question">What do you add each time? <input type="text" class="answer-box-small" data-answer="3" style="width:40px"></p>
  </div>
</div>
```

## Theme Variations

### Foundation 1 - Food Theme
- Characters: Chef Carlo, Baker Beth
- Context: Eggs in boxes, biscuits in packs
- Focus on 3×1 to 3×6

### Foundation 2 - Sports Theme
- Characters: Coach Kim, Player Leo
- Context: Balls, players in teams
- Focus on 3×1 to 3×6

### Practice 1 - Nature Theme
- Characters: Gardener Grace, Beekeeper Ben
- Context: Flowers, bees, leaves (groups of 3)
- Full range 3×1 to 3×10

### Practice 2 - Transport Theme
- Characters: Driver Dan, Pilot Priya
- Context: Wheels on tricycles, passengers
- Full range 3×1 to 3×10

### Practice 3 - Space Theme
- Characters: Astronaut Alex, Commander Cara
- Context: Rockets, planets, aliens
- Full range 3×1 to 3×12

### Practice 4 - Ocean Theme
- Characters: Diver Dina, Captain Carl
- Context: Fish, treasure, shells
- Full range 3×1 to 3×12

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 6, 15, 24</p>
  <p><strong>2.</strong> a) 12 &nbsp; b) 21 &nbsp; c) 27</p>
  <p><strong>3.</strong> 18</p>
  <p><strong>4.</strong> 4, 12</p>
  <p><strong>5.</strong> 21, 3</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All multiplication facts correct
- [ ] Characters named and used consistently
- [ ] Answer key matches all input boxes
- [ ] Theme carried throughout worksheet
