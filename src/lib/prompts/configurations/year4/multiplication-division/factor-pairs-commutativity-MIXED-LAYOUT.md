# Ages 8-9: Factor Pairs and Commutativity (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 4 factor pairs questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Find factor pairs, use commutativity
**Section B: Application (Q3-Q4)** - Arrays, rectangular arrangements, real-world problems
**Section C: Reasoning (Q5)** - Prime vs composite, explain thinking, always/sometimes/never

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 4 - UK National Curriculum)
- **Factor pairs**: Two numbers that multiply to give a target number
- **Commutativity**: 3×4 = 4×3 (order doesn't matter in multiplication)
- **Factor pairs of 24**: (1,24), (2,12), (3,8), (4,6)
- **Prime numbers intro**: Numbers with exactly 2 factors (1 and itself)
- **Mental calculation**: Use factor pairs to simplify calculations
- **Key misconception**: Forgetting that 1 and the number itself are always factors

## NUMBERS TO USE (Year 4 appropriate)
Good numbers for factor pairs: 12, 15, 16, 18, 20, 24, 30, 36, 40, 48
Prime numbers to include: 2, 3, 5, 7, 11, 13, 17, 19, 23

## CSS (Compact - Mixed Layout - Year 4)
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
.target-number-box{background:#F3E5F5;border:3px solid #9C27B0;border-radius:10px;padding:15px;margin:10px 0;text-align:center}
.target-number{font-size:42pt;font-weight:bold;color:#7B1FA2}
.factor-pair-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:12px 0}
.factor-pair-item{padding:12px;border:2px solid #9C27B0;border-radius:6px;background:#fff;font-size:16pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.commutativity-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:10px 0}
.commutativity-example{font-size:18pt;font-weight:bold;text-align:center;margin:10px 0;font-family:'Courier New',monospace}
.array-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.array-grid{display:inline-grid;gap:4px;margin:10px 0}
.array-cell{width:22px;height:22px;background:#9C27B0;border-radius:3px}
.array-label{font-size:12pt;color:#666;margin-top:10px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.number-cards{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:12px 0}
.number-card{padding:12px 18px;background:#fff;border:3px solid #9C27B0;border-radius:8px;font-size:22pt;font-weight:bold;color:#7B1FA2}
.prime-badge{background:#4CAF50;color:white;padding:3px 8px;border-radius:10px;font-size:10pt;margin-left:5px}
.answer-box{display:inline-block;min-width:70px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:55px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Find all factor pairs**: Given a number (24, 30, 36), list all factor pairs
- **Complete factor pairs**: Given partial pairs, find missing factors
- **Factor pair matching**: Match numbers to their factor pairs

### Q2 OPTIONS (Fluency - Pick ONE):
- **Commutativity practice**: Show that 3×8 = 8×3, use to solve related problems
- **Missing factor**: __ × 6 = 42 and 6 × __ = 42 (use commutativity)
- **Mental calculation**: Use factor pairs to calculate 4×15 as 4×3×5

### Q3 OPTIONS (Application - Pick ONE):
- **Array visualization**: Show factor pairs as rectangular arrays
- **Rectangle problem**: "A rectangle has area 24 cm². What could its sides be?"
- **Grid arrangements**: Arrange 30 tiles in different rectangular patterns

### Q4 OPTIONS (Application - Pick ONE):
- **Real-world arrangement**: Arrange seats, plants, books in rows
- **Multi-step problem**: Use factor pairs to solve practical problems
- **Equal sharing**: Divide items equally using factor knowledge

### Q5 OPTIONS (Reasoning - Pick ONE):
- **Prime vs Composite**: Sort numbers - which have only 2 factors?
- **Always/Sometimes/Never**: "A number always has 1 as a factor"
- **Explain thinking**: "Why does 7 have fewer factor pairs than 12?"

## THEME OPTIONS (Pick one for entire worksheet)
- **Garden Theme**: Planting flowers in rows, seed packets, garden beds
- **Classroom Theme**: Arranging desks, books on shelves, art supplies
- **Party Theme**: Setting tables, arranging chairs, party bags
- **Sports Theme**: Players in teams, equipment organization
- **Bakery Theme**: Cookies on trays, cupcakes in boxes

## EXAMPLE QUESTION STRUCTURES

### Q1 Example (Factor Pairs):
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Find all the factor pairs of 24.</p>
  <div class="target-number-box">
    <span class="target-number">24</span>
  </div>
  <div class="factor-pair-grid">
    <div class="factor-pair-item">1 × <span class="answer-box-small"></span> = 24</div>
    <div class="factor-pair-item">2 × <span class="answer-box-small"></span> = 24</div>
    <div class="factor-pair-item">3 × <span class="answer-box-small"></span> = 24</div>
    <div class="factor-pair-item">4 × <span class="answer-box-small"></span> = 24</div>
  </div>
</div>
```

### Q2 Example (Commutativity):
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Use commutativity to complete these.</p>
  <div class="commutativity-box">
    <p class="commutativity-example">If 7 × 8 = 56, then 8 × 7 = <span class="answer-box-small"></span></p>
    <p class="commutativity-example">If 6 × 9 = 54, then 9 × 6 = <span class="answer-box-small"></span></p>
    <p class="sub-question">a) <span class="answer-box-small"></span> × 5 = 35</p>
    <p class="sub-question">b) 5 × <span class="answer-box-small"></span> = 35</p>
  </div>
</div>
```

### Q5 Example (Reasoning):
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Sort these numbers into Prime and Composite.</p>
  <div class="number-cards">
    <span class="number-card">7</span>
    <span class="number-card">12</span>
    <span class="number-card">11</span>
    <span class="number-card">15</span>
    <span class="number-card">2</span>
    <span class="number-card">18</span>
  </div>
  <p class="sub-question">Prime numbers (only 2 factors): <span class="answer-box"></span></p>
  <p class="sub-question">Composite numbers (more than 2 factors): <span class="answer-box"></span></p>
</div>
```

## ANSWER KEY FORMAT
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 24, 12, 8, 6 (factor pairs: 1×24, 2×12, 3×8, 4×6)</p>
  <p><strong>2.</strong> 56, 54, 7, 7</p>
  <p><strong>3.</strong> [Array answers based on specific question]</p>
  <p><strong>4.</strong> [Word problem answer]</p>
  <p><strong>5.</strong> Prime: 7, 11, 2 | Composite: 12, 15, 18</p>
</div>
```

## VALIDATION CHECKLIST
- [ ] EXACTLY {{questionCount}} questions?
- [ ] Section A (Fluency): Q1-Q2 about factor pairs and commutativity?
- [ ] Section B (Application): Q3-Q4 with arrays and real-world problems?
- [ ] Section C (Reasoning): Q5 with prime/composite or explain thinking?
- [ ] All factor pairs found systematically?
- [ ] Commutativity demonstrated clearly?
- [ ] Year 4 appropriate numbers (mostly under 50)?
- [ ] Answer key with all answers?
- [ ] Consistent theme throughout?

## THEME-SPECIFIC DETAILS (Use in Application questions)

**Garden Theme Characters**: Gardener Gemma, Farmer Fred
**Classroom Theme Characters**: Teacher Tom, Student Sarah
**Party Theme Characters**: Party Planner Pam, Chef Charlie
**Sports Theme Characters**: Coach Carlos, Athlete Amy
**Bakery Theme Characters**: Baker Ben, Pastry Chef Paula

Generate complete HTML. UK Year 4 aligned (ages 8-9). Mixed Layout with Fluency/Application/Reasoning sections.
