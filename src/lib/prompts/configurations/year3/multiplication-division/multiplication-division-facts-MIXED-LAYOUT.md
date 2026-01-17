# Ages 7-8: Multiplication and Division Facts (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on multiplication and division facts (inverse relationship).

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Write related multiplication/division facts
└── Q2: Complete fact families

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problems using inverse
└── Q4: Use multiplication to check division

SECTION C: REASONING (Q5)
└── Q5: Problem solving with related facts
```

## Multiplication and Division Facts Focus

**Key Concepts:**
- Inverse relationship: 4 × 3 = 12 so 12 ÷ 3 = 4 and 12 ÷ 4 = 3
- Fact families: 4, 3, 12 gives 4 facts
- Using multiplication to check division
- Arrays showing both operations

**Fact Families to Use:**
- 2, 3, 6 → 2×3=6, 3×2=6, 6÷2=3, 6÷3=2
- 4, 5, 20 → 4×5=20, 5×4=20, 20÷4=5, 20÷5=4
- 3, 8, 24 → 3×8=24, 8×3=24, 24÷3=8, 24÷8=3
- And similar combinations

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
.fact-family-box{background:#fff;border:2px solid #2196F3;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.fact-family-numbers{font-size:18pt;font-weight:bold;color:#2196F3;margin-bottom:10px}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Theme Variations

### Foundation 1 - School Theme
- Characters: Teacher Tim, Helper Harriet
- Context: Books, pencils, desks
- Focus on 2, 5, 10 times tables

### Foundation 2 - Garden Theme
- Characters: Gardener Gina, Helper Henry
- Context: Seeds, flowers, pots
- Focus on 2, 5, 10 times tables

### Practice 1 - Shop Theme
- Characters: Shopkeeper Sam, Customer Carla
- Context: Items, coins, prices
- Full range including 3, 4, 8

### Practice 2 - Kitchen Theme
- Characters: Chef Charlie, Baker Beth
- Context: Ingredients, portions, recipes
- Full range including 3, 4, 8

### Practice 3 - Sports Theme
- Characters: Coach Casey, Player Pat
- Context: Teams, equipment, points
- Full range all tables

### Practice 4 - Adventure Theme
- Characters: Explorer Eve, Captain Carl
- Context: Treasure, maps, distances
- Full range all tables

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 12 &nbsp; b) 3 &nbsp; c) 4</p>
  <p><strong>2.</strong> a) 6 &nbsp; b) 6 &nbsp; c) 3 &nbsp; d) 2</p>
  <p><strong>3.</strong> 4, 20</p>
  <p><strong>4.</strong> 8, 8, correct</p>
  <p><strong>5.</strong> 3, 4, 12</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] Inverse relationship clearly shown
- [ ] Characters named and used consistently
- [ ] Answer key matches all input boxes
- [ ] Theme carried throughout worksheet
