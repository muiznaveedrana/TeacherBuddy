# Ages 7-8: Word Problems (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on addition and subtraction word problems.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: One-step word problems
└── Q2: Two-step word problems

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Real-life context word problem
└── Q4: Comparison word problem

SECTION C: REASONING (Q5)
└── Q5: Multi-step problem with explanation
```

## Word Problem Types

**One-Step Problems:**
- Addition: combining, increasing, total
- Subtraction: taking away, difference, remaining

**Two-Step Problems:**
- Add then subtract
- Subtract then add
- Two additions or two subtractions

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
.answer-box-small{display:inline-block;min-width:60px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.step-box{background:#E3F2FD;border:1px solid #2196F3;border-radius:5px;padding:8px;margin:5px 0}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Question Patterns

### Q1: One-Step Word Problems (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Solve these word problems.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">a) {Character} has {number1} {items}. They get {number2} more. How many in total?</span>
  </div>
  <p class="sub-question">Answer: <input type="text" class="answer-box-small" data-answer="{total}" style="width:60px"> {items}</p>

  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">b) {Character} has {number1} {items}. They give away {number2}. How many left?</span>
  </div>
  <p class="sub-question">Answer: <input type="text" class="answer-box-small" data-answer="{remaining}" style="width:60px"> {items}</p>
</div>
```

### Q2: Two-Step Word Problems (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Solve this two-step problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character} had {number1} {items}. They bought {number2} more, then used {number3}. How many now?</span>
  </div>
  <p class="sub-question">Step 1: {number1} + {number2} = <input type="text" class="answer-box-small" data-answer="{step1}" style="width:60px"></p>
  <p class="sub-question">Step 2: {step1} - {number3} = <input type="text" class="answer-box-small" data-answer="{final}" style="width:60px"></p>
</div>
```

### Q3: Real-Life Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve this real-life problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Detailed story with real context}</span>
  </div>
  <p class="sub-question">Answer: <input type="text" class="answer-box-small" data-answer="{answer}" style="width:60px"> {unit}</p>
</div>
```

### Q4: Comparison Problem (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Find the difference.</p>
  <div class="word-problem-box">
    <span class="character-icon">{emoji}</span>
    <span class="story-text">{Character1} has {number1} {items}. {Character2} has {number2} {items}. How many more does {Character1/2} have?</span>
  </div>
  <p class="sub-question">Difference: <input type="text" class="answer-box-small" data-answer="{difference}" style="width:60px"> {items}</p>
</div>
```

### Q5: Multi-Step with Explanation (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Solve and explain.</p>
  <div class="reasoning-box">
    <p class="story-text">{Complex story problem}</p>
    <p class="sub-question">Step 1: <input type="text" class="answer-box-small" data-answer="{step1}" style="width:60px"></p>
    <p class="sub-question">Step 2: <input type="text" class="answer-box-small" data-answer="{step2}" style="width:60px"></p>
    <p class="sub-question">Final answer: <input type="text" class="answer-box-small" data-answer="{final}" style="width:60px"></p>
  </div>
</div>
```

## Theme Variations

### Foundation 1 - Toy Shop Theme
- Characters: Lily, Max (children)
- Context: Buying toys, collecting items
- Use simpler 3-digit numbers (100-400)

### Foundation 2 - Garden Theme
- Characters: Grandma Rose, Gardener Tom
- Context: Planting flowers, picking vegetables
- Use simpler 3-digit numbers (100-400)

### Practice 1 - School Theme
- Characters: Mrs. Brown (teacher), Class 3B
- Context: Books, pencils, school supplies
- Use medium 3-digit numbers (200-600)

### Practice 2 - Sports Day Theme
- Characters: Coach Ali, Team players
- Context: Points, distances, times
- Use medium 3-digit numbers (200-600)

### Practice 3 - Bakery Theme
- Characters: Baker Jo, Customer Sam
- Context: Cakes, bread, pastries
- Use harder 3-digit numbers (300-800)

### Practice 4 - Library Theme
- Characters: Librarian Ms. Chen, Reader Jake
- Context: Books borrowed, returned, shelved
- Use harder 3-digit numbers (300-800)

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 456 &nbsp; b) 234</p>
  <p><strong>2.</strong> 567, 389</p>
  <p><strong>3.</strong> 428</p>
  <p><strong>4.</strong> 175</p>
  <p><strong>5.</strong> 645, 289, 356</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All calculations mathematically correct
- [ ] Characters named and used consistently
- [ ] Answer key matches all input boxes
- [ ] Theme carried throughout worksheet
- [ ] Word problems age-appropriate and engaging
