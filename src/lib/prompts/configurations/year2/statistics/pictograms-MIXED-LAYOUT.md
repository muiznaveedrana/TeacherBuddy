# Ages 6-7: Pictograms (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Pictograms: Favorite Fruits!"
- Theme: Fruit survey data
- Focus: Simple 1:1 scale, basic counting

**IF difficulty = "average":**
- Title: "Pictograms: Our Pets!"
- Theme: Pet survey data
- Focus: Comparison questions, simple calculations

**IF difficulty = "hard":**
- Title: "Pictograms: Sports Day!"
- Theme: Sports and activities data
- Focus: 1:2 scale, multi-step problems

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
.pictogram-box{margin:12px 0;padding:12px;background:#FAFAFA;border:2px solid #1976D2;border-radius:8px}
.pictogram-title{font-size:16pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:10px}
.pictogram-scale{font-size:12pt;font-weight:bold;color:#FF5722;text-align:center;margin-bottom:10px;padding:5px;background:#FFF3E0;border-radius:5px}
.pictogram-row{display:flex;align-items:center;gap:10px;margin:8px 0;padding:8px;background:#FFF;border-radius:5px}
.pictogram-label{font-weight:bold;min-width:100px}
.pictogram-icons{font-size:24pt}
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

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Reading pictograms
- Q1: Read pictogram for two categories (how many chose X, how many chose Y)
- Q2: Compare (how many more)

### Section B: Application (Q3-Q4) - Ordering and calculating
- Q3: Order categories by popularity
- Q4: Calculate total

### Section C: Reasoning (Q5) - Scale problem + misconception

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Favorite Fruits)
**Pictogram**: Apple 🍎🍎🍎🍎🍎 (5), Banana 🍌🍌🍌 (3), Orange 🍊🍊🍊🍊 (4). Scale 1:1.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many chose apples? How many chose bananas? | 5, 3 |
| Q2 | How many more chose apples than bananas? | 2 |
| Q3 | Order: Apple, Banana, Orange by popularity | 1, 3, 2 |
| Q4 | How many children in total? | 12 |
| Q5 | Scale 1:2 pictogram (4 icons = ?) + misconception | 8, No |

**Answer Key**: 5, 3, 2, 1, 3, 2, 12, 8, No

### Worksheet 2 (Average - Our Pets)
**Pictogram**: Dog 🐕🐕🐕🐕🐕🐕 (6), Cat 🐱🐱🐱🐱 (4), Fish 🐟🐟🐟🐟🐟🐟🐟🐟 (8). Scale 1:1.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many chose dogs? How many chose cats? | 6, 4 |
| Q2 | How many more chose fish than dogs? | 2 |
| Q3 | Order: Dog, Cat, Fish by popularity | 2, 3, 1 |
| Q4 | How many children in total? | 18 |
| Q5 | Scale 1:2 pictogram (5 icons = ?) + misconception | 10, No |

**Answer Key**: 6, 4, 2, 2, 3, 1, 18, 10, No

### Worksheet 3 (Hard - Sports Day)
**Pictogram**: Running 🏃🏃🏃🏃🏃🏃🏃 (7), Swimming 🏊🏊🏊🏊🏊 (5), Football ⚽⚽⚽⚽⚽⚽⚽⚽ (8). Scale 1:1.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many chose running? How many chose swimming? | 7, 5 |
| Q2 | How many more chose football than swimming? | 3 |
| Q3 | Order: Running, Swimming, Football by popularity | 2, 3, 1 |
| Q4 | How many children in total? | 20 |
| Q5 | Scale 1:2 pictogram (6 icons = ?) + misconception | 12, No |

**Answer Key**: 7, 5, 3, 2, 3, 1, 20, 12, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 5, 3</p>
  <p><strong>2.</strong> 2</p>
  <p><strong>3.</strong> 1, 3, 2</p>
  <p><strong>4.</strong> 12</p>
  <p><strong>5.</strong> 8, No</p>
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
- [ ] Q5: 2 answers (scale calculation + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
