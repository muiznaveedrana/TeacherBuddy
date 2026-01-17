# Ages 7-8: Missing Number Multiplication (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on missing number problems in multiplication and division.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Find the missing factor (□ × 4 = 20)
└── Q2: Find the missing product or divisor

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problems with missing numbers
└── Q4: Function machines with missing steps

SECTION C: REASONING (Q5)
└── Q5: Find patterns or explain method
```

## Missing Number Multiplication Focus

**Key Concepts:**
- Using inverse operations to find missing numbers
- □ × 4 = 20, so □ = 20 ÷ 4 = 5
- 18 ÷ □ = 3, so □ = 18 ÷ 3 = 6
- Checking answers with multiplication

**Number Ranges:**
- Foundation: Missing factors from times tables 2-5
- Practice: Missing factors from all times tables, larger numbers

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
.function-box{background:#fff;border:2px solid #2196F3;border-radius:8px;padding:15px;margin:10px 0}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Theme Variations

### Foundation 1 - Shop Theme
- Characters: Shopkeeper Sid, Customer Cora
- Context: Items, prices, quantities
- Focus on ×2, ×3, ×4, ×5 tables

### Foundation 2 - Kitchen Theme
- Characters: Baker Bella, Helper Harry
- Context: Baking, ingredients, portions
- Focus on ×2, ×3, ×4, ×5 tables

### Practice 1 - Zoo Theme
- Characters: Zookeeper Zoe, Visitor Vince
- Context: Animals, feeding, enclosures
- Full range of tables

### Practice 2 - Garden Theme
- Characters: Gardener Gary, Helper Hannah
- Context: Plants, pots, seeds
- Full range with larger numbers

### Practice 3 - Sports Theme
- Characters: Coach Chris, Player Polly
- Context: Teams, points, equipment
- Challenging missing numbers

### Practice 4 - Space Theme
- Characters: Astronaut Alex, Space Explorer Emma
- Context: Planets, rockets, stars
- Complex multi-step problems

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 5 &nbsp; b) 4 &nbsp; c) 3</p>
  <p><strong>2.</strong> a) 24 &nbsp; b) 6 &nbsp; c) 7</p>
  <p><strong>3.</strong> 8</p>
  <p><strong>4.</strong> ×5, 35</p>
  <p><strong>5.</strong> 9 (explanation varies)</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All missing numbers are whole numbers
- [ ] Uses inverse operations correctly
- [ ] Word problems are clear and solvable
- [ ] Answer key matches all input boxes
