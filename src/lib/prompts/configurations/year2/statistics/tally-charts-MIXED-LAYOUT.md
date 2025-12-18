# Ages 6-7: Tally Charts (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Tally Charts: Favorite Foods!"
- Theme: Food survey data
- Focus: Simple counting, small numbers (1-10)

**IF difficulty = "average":**
- Title: "Tally Charts: School Survey!"
- Theme: School activities data
- Focus: Groups of 5, numbers up to 15

**IF difficulty = "hard":**
- Title: "Tally Charts: Class Data!"
- Theme: Class census data
- Focus: Larger numbers (10-20), multiple operations

## CSS (Mixed Layout - Compact):
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
.tally-box{margin:12px 0;padding:12px;background:#FAFAFA;border:2px solid #1976D2;border-radius:8px}
.tally-title{font-size:16pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:10px}
.tally-row{display:flex;align-items:center;gap:10px;margin:8px 0;padding:8px;background:#FFF;border-radius:5px}
.tally-label{font-weight:bold;min-width:100px}
.tally-marks{font-size:18pt;font-family:monospace;letter-spacing:3px}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:10px}
.ordering-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:80px}
.item-icon{font-size:28pt;margin-bottom:5px}
.word-problem-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:12px 0;text-align:center}
.reasoning-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#FFE082;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #FFA726;border-radius:10px;padding:10px;flex:1}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## TALLY MARK REPRESENTATION
- Use | for individual marks
- Use 卌 or show as |||| for groups of 5 (crossed tally)
- Example: 7 = 卌 || (5+2)
- Example: 12 = 卌 卌 || (5+5+2)

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Reading tally charts
- Q1: Read tally for two categories (how many X, how many Y)
- Q2: Compare (how many more)

### Section B: Application (Q3-Q4) - Ordering and calculating
- Q3: Order categories by count
- Q4: Calculate total

### Section C: Reasoning (Q5) - Count tally + misconception

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Favorite Foods)
**Tally Chart**: Pizza 卌|| (7), Pasta ||| (3), Burger 卌 (5).

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many chose pizza? How many chose pasta? | 7, 3 |
| Q2 | How many more chose pizza than pasta? | 4 |
| Q3 | Order: Pizza, Pasta, Burger by popularity | 1, 3, 2 |
| Q4 | Total children? | 15 |
| Q5 | Count 卌卌||| = ? + misconception | 13, No |

**Answer Key**: 7, 3, 4, 1, 3, 2, 15, 13, No

### Worksheet 2 (Average - School Survey)
**Tally Chart**: Reading 卌卌 (10), Games 卌||| (8), Art 卌卌|| (12).

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many chose reading? How many chose games? | 10, 8 |
| Q2 | How many more chose art than games? | 4 |
| Q3 | Order: Reading, Games, Art by popularity | 2, 3, 1 |
| Q4 | Total children? | 30 |
| Q5 | Count 卌卌卌| = ? + misconception | 16, No |

**Answer Key**: 10, 8, 4, 2, 3, 1, 30, 16, No

### Worksheet 3 (Hard - Class Data)
**Tally Chart**: Walk 卌卌|| (12), Car 卌卌卌 (15), Bus 卌||| (8).

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many walk? How many take car? | 12, 15 |
| Q2 | How many more take car than bus? | 7 |
| Q3 | Order: Walk, Car, Bus by count | 2, 1, 3 |
| Q4 | Total children? | 35 |
| Q5 | Count 卌卌卌|| = ? + misconception | 17, No |

**Answer Key**: 12, 15, 7, 2, 1, 3, 35, 17, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 7, 3</p>
  <p><strong>2.</strong> 4</p>
  <p><strong>3.</strong> 1, 3, 2</p>
  <p><strong>4.</strong> 15</p>
  <p><strong>5.</strong> 13, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (count + count)?
- [ ] Q2: 1 answer (difference)?
- [ ] Q3: 3 answers (ordering numbers)?
- [ ] Q4: 1 answer (total)?
- [ ] Q5: 2 answers (tally count + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
