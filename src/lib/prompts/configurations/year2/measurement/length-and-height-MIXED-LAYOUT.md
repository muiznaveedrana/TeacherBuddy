# Ages 6-7: Length and Height (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Standard units (cm, m).**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Length and Height: School Supplies!"
- Theme: Pencils, crayons, rulers
- Numbers: 10-30 cm range

**IF difficulty = "average":**
- Title: "Length and Height: Garden Fun!"
- Theme: Plants, insects, garden items
- Numbers: 20-50 cm range

**IF difficulty = "hard":**
- Title: "Length and Height: Around the House!"
- Theme: Household items, furniture
- Numbers: 30-80 cm range, includes metres

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

/* RULER VISUAL */
.ruler-container{margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px;text-align:center}
.ruler{display:flex;align-items:flex-end;border-bottom:3px solid #333;height:50px;max-width:350px;margin:10px auto;position:relative}
.ruler-mark{flex:1;border-left:2px solid #333;height:15px;position:relative}
.ruler-mark.major{height:25px;border-left:3px solid #333}
.ruler-label{font-size:10pt;font-weight:bold;position:absolute;bottom:-18px;left:-8px}
.object-bar{position:absolute;bottom:5px;left:0;height:20px;background:#4CAF50;border-radius:3px}

/* COMPARISON */
.comparison-container{margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px}
.comparison-item{display:flex;align-items:center;gap:10px;margin:8px 0}
.item-bar{height:25px;background:linear-gradient(90deg,#2196F3,#1565C0);border-radius:4px}
.item-label{font-weight:bold;min-width:80px}
.item-value{font-weight:bold;color:#1976D2}

/* ORDERING */
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:10px}
.ordering-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:80px}
.item-icon{font-size:28pt;margin-bottom:5px}
.ordering-number{display:inline-block;width:30px;height:30px;line-height:30px;border:2px solid #333;border-radius:50%;background:#FFF9C4;margin-top:5px}

/* CONVERSION */
.conversion-box{margin:12px 0;padding:12px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.conversion-item{font-size:14pt;font-weight:bold;margin:8px 0;padding:8px;background:#FFF;border-radius:5px}

/* WORD PROBLEM */
.word-problem-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:12px;margin:12px 0}
.measurement-display{font-size:16pt;font-weight:bold;color:#E65100;margin:8px 0}

/* ANSWER ELEMENTS */
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Reading and comparing
- Q1: Read a ruler measurement
- Q2: Compare two measurements

### Section B: Application (Q3-Q4) - Ordering and conversion
- Q3: Order objects by length/height
- Q4: Convert or compare cm and m

### Section C: Reasoning (Q5) - Word problem

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - School Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Pencil on ruler showing 12 cm | 12 |
| Q2 | Crayon 15cm vs Pen 22cm - which longer, how much | pen, 7 |
| Q3 | Order: Eraser 5cm, Pencil 15cm, Ruler 20cm | 1, 2, 3 |
| Q4 | 100 cm = ? m | 1 |
| Q5 | String 24cm, cut 8cm. How much left? | 16 |

**Answer Key**: 12, pen, 7, 1, 2, 3, 1, 16

### Worksheet 2 (Average - Garden Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Caterpillar on ruler showing 25 cm | 25 |
| Q2 | Flower 35cm vs Grass 28cm - which taller, how much | flower, 7 |
| Q3 | Order: Leaf 12cm, Snail 8cm, Stick 30cm | 2, 1, 3 |
| Q4 | 200 cm = ? m | 2 |
| Q5 | Plant 45cm, grows 18cm. How tall now? | 63 |

**Answer Key**: 25, flower, 7, 2, 1, 3, 2, 63

### Worksheet 3 (Hard - Household Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Book on ruler showing 28 cm | 28 |
| Q2 | Table 75cm vs Chair 45cm - which taller, how much | table, 30 |
| Q3 | Order: Cup 12cm, Vase 35cm, Lamp 55cm | 1, 2, 3 |
| Q4 | 150 cm = ? m and ? cm | 1, 50 |
| Q5 | Ribbon 80cm, use 35cm. How much left? | 45 |

**Answer Key**: 28, table, 30, 1, 2, 3, 1, 50, 45

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 12</p>
  <p><strong>2.</strong> pen, 7</p>
  <p><strong>3.</strong> 1, 2, 3</p>
  <p><strong>4.</strong> 1</p>
  <p><strong>5.</strong> 16</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] All use standard units (cm/m)?
- [ ] Realistic measurements?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 1+2+3+1+1 = 8 answers (Easy/Average) or 9 (Hard)?

Generate complete HTML. UK Year 2 aligned.
