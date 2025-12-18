# Ages 6-7: Word Problems - Addition & Subtraction (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 word problems using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Simple one-step word problems
**Section B: Application (Q3-Q4)** - More complex real-world problems
**Section C: Reasoning (Q5)** - Explain thinking, spot the mistake

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Operations:** Addition and subtraction within 100
- **Range:** Two-digit numbers (20-99)
- **Problem types:** Result unknown, change unknown, comparison
- **Key skills:** Read and understand word problems, identify operation needed
- **Key misconception:** Using wrong operation (adding when should subtract)

## CSS (Compact - Mixed Layout)
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
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.bar-model{display:flex;border:2px solid #333;border-radius:6px;overflow:hidden;margin:10px auto;max-width:400px}
.bar-section{padding:15px 10px;font-size:14pt;font-weight:bold;text-align:center;border-right:2px solid #333;min-width:60px}
.bar-section:last-child{border-right:none}
.bar-known{background:#4CAF50;color:white}
.bar-unknown{background:#FFF9C4;color:#333;border:2px dashed #FF5722}
.bar-label{text-align:center;margin-top:8px;font-size:11pt;color:#555}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.equation-line{font-size:14pt;margin:8px 0 8px 10px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Addition result unknown**: "X had 34 items, got 25 more. How many now?"
- **Subtraction result unknown**: "X had 56 items, gave away 23. How many left?"

### Q2 OPTIONS (Fluency - Pick ONE):
- **Addition result unknown**: Different context from Q1
- **Subtraction result unknown**: Different context from Q1
- **Simple comparison**: "Who has more? How many more?"

### Q3 OPTIONS (Application - Pick ONE):
- **Part unknown**: "X had some. Got 15 more, now has 42. How many at start?"
- **Comparison with bar model**: Compare two quantities visually
- **Money context**: Buying items, calculating change

### Q4 OPTIONS (Application - Pick ONE):
- **Two-step problem**: "X had 45, got 20, then gave away 15"
- **Comparison difference**: "A has X, B has Y. How many more does A have?"
- **Combined problem**: Addition and subtraction in one story

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Spot the mistake**: Character uses wrong operation
- **Explain choice**: "Why did you add/subtract?"
- **True/False with reasoning**: Statement about word problem solving

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Toy Shop Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition | "Lily had 24 dolls, got 15 more" → 39 |
| Q2 | Subtraction | "Max had 45 cars, gave away 12" → 33 |
| Q3 | Part unknown | "Started with some, got 18, now has 43. Started with?" → 25 |
| Q4 | Two-step | "Ben had 35 toys, got 20, gave away 15" → 40 |
| Q5 | Spot mistake | "Emma adds 45+23 to find how many left" → No, should subtract |

### WS2: Practice (Average - Garden Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition | "Garden had 38 tulips, planted 27 more" → 65 |
| Q2 | Subtraction | "56 butterflies, 19 flew away" → 37 |
| Q3 | Comparison | "Rose has 45 seeds, Tom has 38. Who has more? How many more?" → Rose, 7 |
| Q4 | Two-step | "68 apples picked, 25 eaten, 15 more picked" → 58 |
| Q5 | Explain | "Why did you subtract in Q2?" → Because butterflies left |

### WS3: Challenge (Hard - Sports Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Addition | "Team scored 47 points first half, 38 second half" → 85 |
| Q2 | Subtraction | "84 fans in stadium, 36 left early" → 48 |
| Q3 | Part unknown bar model | "Some swimmers, 29 joined, now 72. How many at start?" → 43 |
| Q4 | Complex two-step | "School had 95 balls, lost 38, bought 25 new" → 82 |
| Q5 | Spot mistake | "Jake subtracts to find total of both teams" → No, should add |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Addition Word Problem Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> had 24 dolls. She got 15 more dolls for her birthday. How many dolls does Lily have now?</span>
  </div>
  <p class="equation-line">24 + 15 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Lily has <span class="answer-box-small"></span> dolls now.</p>
</div>
```

### Q2 - Subtraction Word Problem Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Max</strong> had 45 toy cars. He gave 12 cars to his friend. How many cars does Max have left?</span>
  </div>
  <p class="equation-line">45 - 12 = <span class="answer-box-small"></span></p>
  <p class="sub-question">Max has <span class="answer-box-small"></span> cars left.</p>
</div>
```

### Q3 - Part Unknown with Bar Model Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and solve using the bar model.</p>
  <div class="word-problem-box">
    <span class="character-icon">🧸</span>
    <span class="story-text"><strong>Jake</strong> had some toys. He got 18 more toys. Now he has 43 toys. How many toys did Jake have at the start?</span>
  </div>
  <div class="scene-box">
    <div class="bar-model">
      <div class="bar-section bar-unknown">?</div>
      <div class="bar-section bar-known">18</div>
    </div>
    <p class="bar-label">Total: 43</p>
  </div>
  <p class="sub-question">Jake had <span class="answer-box-small"></span> toys at the start.</p>
</div>
```

### Q4 - Two-Step Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve. Show your working.</p>
  <div class="word-problem-box">
    <span class="character-icon">🎮</span>
    <span class="story-text"><strong>Ben</strong> had 35 toys. His mum gave him 20 more. Then he gave 15 toys to his sister. How many toys does Ben have now?</span>
  </div>
  <p class="sub-question">a) After getting toys from mum: 35 + 20 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) After giving to sister: <span class="answer-box-small"></span> - 15 = <span class="answer-box-small"></span></p>
  <p class="sub-question">c) Ben has <span class="answer-box-small"></span> toys now.</p>
</div>
```

### Q5 - Spot the Mistake Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Spot the mistake.</p>
  <div class="word-problem-box">
    <span class="story-text"><strong>Problem:</strong> Emma had 45 stickers. She gave 23 to her friend. How many stickers does Emma have left?</span>
  </div>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <strong>Emma says:</strong> "I need to add 45 + 23 = 68 stickers left."
    </div>
  </div>
  <p class="sub-question">a) Is Emma correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) What operation should she use? <span class="answer-box-word"></span></p>
  <p class="sub-question">c) What is the correct answer? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 39, 39</p>
  <p><strong>2.</strong> 33, 33</p>
  <p><strong>3.</strong> 25</p>
  <p><strong>4.</strong> 55, 55, 40, 40</p>
  <p><strong>5.</strong> No, Subtract, 22</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## WORD PROBLEM KEY PHRASES
- **Addition clues:** "in total", "altogether", "how many now", "combined", "got more"
- **Subtraction clues:** "how many left", "remaining", "gave away", "difference", "fewer"
- **Part unknown clues:** "started with some", "had some", "at the beginning"

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Q5 tests operation choice misconception?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
- [ ] Numbers within Year 2 range (two-digit)?
