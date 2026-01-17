# Ages 7-8: 4 Times Table (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on the 4 times table.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Complete the 4 times table facts
└── Q2: Quick-fire 4× questions

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problem using 4×
└── Q4: Arrays and groups of 4

SECTION C: REASONING (Q5)
└── Q5: Pattern spotting or problem solving
```

## 4 Times Table Focus

**Key Facts:** 4×1=4, 4×2=8, 4×3=12, 4×4=16, 4×5=20, 4×6=24, 4×7=28, 4×8=32, 4×9=36, 4×10=40, 4×11=44, 4×12=48

**Patterns to highlight:**
- All answers are even numbers
- Double the 2 times table: 4×5 = 2×(2×5) = 20
- Ends in 0, 4, 8, 2, 6, 0, 4, 8, 2, 6 pattern
- Adding 4 each time

**Related Division Facts:** 8÷4=2, 12÷4=3, 16÷4=4, etc.

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

## Theme Variations

### Foundation 1 - Animals Theme
- Characters: Farmer Fred, Vet Vicky
- Context: Legs on animals (dogs, cats), animal pens
- Focus on 4×1 to 4×6

### Foundation 2 - Vehicles Theme
- Characters: Mechanic Mike, Driver Donna
- Context: Wheels on cars, tyres
- Focus on 4×1 to 4×6

### Practice 1 - School Theme
- Characters: Teacher Tom, Helper Hannah
- Context: Desks in rows, chairs in classrooms
- Full range 4×1 to 4×10

### Practice 2 - Party Theme
- Characters: Party Planner Penny, Decorator Dan
- Context: Balloons in bunches, sweets in bags
- Full range 4×1 to 4×10

### Practice 3 - Music Theme
- Characters: Band Leader Ben, Musician Maya
- Context: Instruments, sheet music pages
- Full range 4×1 to 4×12

### Practice 4 - Art Theme
- Characters: Artist Aiden, Painter Paula
- Context: Paintbrushes, canvases, art supplies
- Full range 4×1 to 4×12

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 4, 8, 12, 16, 20, 24</p>
  <p><strong>2.</strong> a) 16 &nbsp; b) 28 &nbsp; c) 36</p>
  <p><strong>3.</strong> 20</p>
  <p><strong>4.</strong> 6, 24</p>
  <p><strong>5.</strong> 32, 4</p>
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
