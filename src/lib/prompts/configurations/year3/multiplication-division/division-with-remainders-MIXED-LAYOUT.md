# Ages 7-8: Division with Remainders (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on division with remainders.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Basic division with remainders
└── Q2: Write the remainder

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problems with remainders
└── Q4: Division sentences with remainders

SECTION C: REASONING (Q5)
└── Q5: Explain what the remainder means
```

## Division with Remainders Focus

**Key Concepts:**
- Understanding remainders as "left over"
- Writing answers as: quotient r remainder
- Remainders must be less than the divisor
- Checking: (quotient × divisor) + remainder = dividend

**Number Ranges:**
- Foundation: Dividends up to 30, divisors 2-5
- Practice: Dividends up to 50, divisors 2-10

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
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Theme Variations

### Foundation 1 - Sweet Shop Theme
- Characters: Sweet Shop Sally, Customer Colin
- Context: Sweets, bags, sharing
- Focus on ÷2, ÷3, ÷4, ÷5 with small numbers

### Foundation 2 - Toy Box Theme
- Characters: Toy Tom, Friend Fiona
- Context: Toys, boxes, sharing between friends
- Focus on ÷2, ÷3, ÷4, ÷5 with small numbers

### Practice 1 - Garden Theme
- Characters: Gardener Grace, Helper Henry
- Context: Seeds, pots, flowers
- Full range of divisors with larger numbers

### Practice 2 - Classroom Theme
- Characters: Teacher Tim, Student Sarah
- Context: Pencils, books, groups
- Full range with contextual remainders

### Practice 3 - Party Theme
- Characters: Host Hannah, Guest Gary
- Context: Party bags, treats, tables
- Full range with real-world meaning

### Practice 4 - Sports Theme
- Characters: Coach Chris, Player Penny
- Context: Teams, equipment, matches
- Challenging problems with reasoning

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 3 r 1 &nbsp; b) 4 r 2 &nbsp; c) 5 r 3</p>
  <p><strong>2.</strong> a) 2 &nbsp; b) 1 &nbsp; c) 3</p>
  <p><strong>3.</strong> 4 r 2 (4 bags with 2 left over)</p>
  <p><strong>4.</strong> a) 6 r 1 &nbsp; b) 7 r 2</p>
  <p><strong>5.</strong> 3 left over means 3 children don't get a sweet</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] All remainders are less than divisors
- [ ] Answers use "r" notation (e.g., 4 r 2)
- [ ] Word problems explain what remainder means
- [ ] Answer key matches all input boxes
