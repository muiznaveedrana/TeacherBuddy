# Ages 6-7: Position & Direction (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Position: Where Is It?"
- Theme: Basic position words
- Focus: above, below, next to

**IF difficulty = "average":**
- Title: "Position: Left and Right!"
- Theme: Direction words
- Focus: left, right, between

**IF difficulty = "hard":**
- Title: "Position: Follow the Path!"
- Theme: Directions and positions
- Focus: Combined position language

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
.position-box{margin:12px 0;padding:15px;background:#FFF9C4;border:2px solid #FF9800;border-radius:8px;text-align:center}
.position-scene{display:flex;flex-direction:column;align-items:center;gap:5px;font-size:32pt}
.position-row{display:flex;justify-content:center;gap:20px}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:10px}
.ordering-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:80px}
.item-icon{font-size:28pt;margin-bottom:5px}
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

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Position words
- Q1: Two position questions (above/below or left/right)
- Q2: Count items in a position

### Section B: Application (Q3-Q4) - Order and identify
- Q3: Order items by position (3 items, write 1,2,3)
- Q4: Identify position of one item

### Section C: Reasoning (Q5) - Position reasoning + misconception
- Q5: Two parts: position answer + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Where Is It?)
**Scene**: Cat above box, dog below box

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Cat is ___ the box? Dog is ___ the box? | above, below |
| Q2 | How many animals are above the box? | 1 |
| Q3 | Order top to bottom: bird, cat, dog | 1, 2, 3 |
| Q4 | What is between the cat and dog? | box |
| Q5 | Position of bird + "Below means on top" misconception | above, No |

**Answer Key**: above, below, 1, 1, 2, 3, box, above, No

### Worksheet 2 (Average - Left and Right)
**Scene**: Apple, Banana, Orange in a row

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Banana is ___ of apple? Orange is ___ of banana? | right, right |
| Q2 | How many fruits are on the right of apple? | 2 |
| Q3 | Order left to right: Apple, Banana, Orange | 1, 2, 3 |
| Q4 | What fruit is between apple and orange? | banana |
| Q5 | Position of apple + "Left means first" misconception | left, No |

**Answer Key**: right, right, 2, 1, 2, 3, banana, left, No

### Worksheet 3 (Hard - Follow the Path)
**Scene**: House, Tree, School, Shop in a row

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Tree is ___ of house? Shop is ___ of school? | right, right |
| Q2 | How many buildings are on the left of shop? | 3 |
| Q3 | Order left to right: House, Tree, School | 1, 2, 3 |
| Q4 | What is between tree and shop? | school |
| Q5 | Position of school + "Next to means far away" misconception | middle, No |

**Answer Key**: right, right, 3, 1, 2, 3, school, middle, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> above, below</p>
  <p><strong>2.</strong> 1</p>
  <p><strong>3.</strong> 1, 2, 3</p>
  <p><strong>4.</strong> box</p>
  <p><strong>5.</strong> above, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (position words)?
- [ ] Q2: 1 answer (count)?
- [ ] Q3: 3 answers (ordering)?
- [ ] Q4: 1 answer (position word)?
- [ ] Q5: 2 answers (position + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
