# Ages 6-7: Finding Fractions (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Find fractions of shapes AND quantities.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Finding Fractions: Fruit Fun!"
- Theme: Fruits
- Numbers: 8, 12, 12, 16, 8
- Focus: Halves and simple quarters

**IF difficulty = "average":**
- Title: "Finding Fractions: Shape Safari!"
- Theme: Shapes/Toys
- Numbers: 12, 16, 16, 20, 12
- Focus: Halves and quarters

**IF difficulty = "hard":**
- Title: "Finding Fractions: Party Challenge!"
- Theme: Party/Food
- Numbers: 16, 20, 20, 24, 16
- Focus: Quarters and three-quarters

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

/* FRACTION VISUALS */
.object-array{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px}
.count-circle{width:35px;height:35px;border-radius:50%;border:2px solid #333;background:#4CAF50}
.count-square{width:35px;height:35px;border:2px solid #333;background:#2196F3;border-radius:3px}
.fraction-display{font-size:18pt;font-weight:bold;color:#1976D2;text-align:center;margin:10px 0}

/* COMPARISON BOX */
.comparison-container{display:flex;justify-content:space-around;margin:12px 0;flex-wrap:wrap;gap:10px}
.comparison-item{text-align:center;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:120px}
.comparison-label{font-weight:bold;color:#1976D2;margin-bottom:5px}

/* CHOCOLATE BAR */
.chocolate-bar{display:flex;border:3px solid #333;border-radius:5px;overflow:hidden;margin:12px auto;max-width:280px}
.chocolate-piece{width:35px;height:50px;border-right:2px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11pt;background:#8B4513;color:#FFF}
.chocolate-piece:last-child{border-right:none}

/* ANSWER ELEMENTS */
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Basic fraction finding
- Q1: Find fraction of shapes visually
- Q2: Calculate fraction of quantity with equation

### Section B: Application (Q3-Q4) - Word problems and comparisons
- Q3: Word problem with objects
- Q4: Compare two fractions

### Section C: Reasoning (Q5) - Real-world context (chocolate bar)

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Fruit Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Find 1/2 of 8 circles | 4 |
| Q2 | Find 1/4 of 12 | 12, 3 |
| Q3 | 12 apples, takes 1/2 | 6 |
| Q4 | 1/4 of 16 vs 1/2 of 16 | 4, 8, half |
| Q5 | Chocolate bar 8 pieces, eats 1/2 | 4 |

**Answer Key**: 4, 12, 3, 6, 4, 8, half, 4

### Worksheet 2 (Average - Shape Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Find 1/4 of 12 squares | 3 |
| Q2 | Find 1/2 of 16 | 16, 8 |
| Q3 | 16 toys, takes 1/4 | 4 |
| Q4 | 1/4 of 20 vs 1/2 of 20 | 5, 10, half |
| Q5 | Chocolate bar 12 pieces, eats 3/4 | 9 |

**Answer Key**: 3, 16, 8, 4, 5, 10, half, 9

### Worksheet 3 (Hard - Party Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Find 1/4 of 16 circles | 4 |
| Q2 | Find 3/4 of 20 | 20, 15 |
| Q3 | 20 sweets, gives away 3/4 | 15 |
| Q4 | 1/4 of 24 vs 1/2 of 24 | 6, 12, half |
| Q5 | Chocolate bar 16 pieces, eats 3/4 | 12 |

**Answer Key**: 4, 20, 15, 15, 6, 12, half, 12

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 4</p>
  <p><strong>2.</strong> 12, 3</p>
  <p><strong>3.</strong> 6</p>
  <p><strong>4.</strong> 4, 8, half</p>
  <p><strong>5.</strong> 4</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] All numbers divisible by 2 and 4?
- [ ] Visual support for Q1-Q3?
- [ ] Answers are whole numbers?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 1+2+1+3+1 = 8 answers?

Generate complete HTML. UK Year 2 aligned.
