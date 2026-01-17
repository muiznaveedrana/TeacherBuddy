# Ages 7-8: Scaling Problems (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on scaling problems (times as many, times as much).

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Simple scaling (2×, 3×, 4× as many)
└── Q2: Scaling with pictures/representations

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problems with scaling
└── Q4: Comparison statements

SECTION C: REASONING (Q5)
└── Q5: Explain or compare scaling situations
```

## Scaling Problems Focus

**Key Concepts:**
- "Times as many" means multiplication
- 3 times as many as 4 = 3 × 4 = 12
- Comparing quantities using scaling language
- Understanding "times as much" in context

**Number Ranges:**
- Foundation: Scaling by 2, 3, 4, 5 with small numbers
- Practice: Scaling by 2-10, larger base numbers

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
.scaling-box{background:#fff;border:2px solid #2196F3;border-radius:8px;padding:15px;margin:10px 0}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Theme Variations

### Foundation 1 - Pet Shop Theme
- Characters: Pet Shop Paula, Customer Carl
- Context: Pets, food, treats
- Focus on 2×, 3×, 4× scaling

### Foundation 2 - Sweet Shop Theme
- Characters: Sweet Shop Sally, Buyer Ben
- Context: Sweets, lollipops, chocolates
- Focus on 2×, 3×, 4×, 5× scaling

### Practice 1 - Farm Theme
- Characters: Farmer Fred, Helper Holly
- Context: Animals, eggs, vegetables
- Full range of multipliers

### Practice 2 - School Theme
- Characters: Teacher Tina, Student Sam
- Context: Books, pencils, stickers
- Full range with larger numbers

### Practice 3 - Garden Theme
- Characters: Gardener Gemma, Helper Hugo
- Context: Flowers, seeds, pots
- Comparison problems

### Practice 4 - Sports Theme
- Characters: Coach Callum, Player Penny
- Context: Points, medals, trophies
- Challenging comparison problems

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 12 &nbsp; b) 15 &nbsp; c) 20</p>
  <p><strong>2.</strong> a) 8 &nbsp; b) 18</p>
  <p><strong>3.</strong> 24</p>
  <p><strong>4.</strong> 3 times as many</p>
  <p><strong>5.</strong> 30 (5 × 6 = 30)</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] "Times as many" language used correctly
- [ ] Calculations are correct
- [ ] Word problems contextualise scaling
- [ ] Answer key matches all input boxes
