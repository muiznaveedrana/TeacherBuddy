# Ages 6-7: Sharing and Grouping (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Sharing and Grouping: Party Time!"
- Theme: Party/Celebration
- Q1: Share balloons between children
- Q2: Group sweets into bags
- Q4: Party Penny shares presents
- Q5: Danny's sharing puzzle

**IF difficulty = "average":**
- Title: "Sharing and Grouping: Garden Adventure!"
- Theme: Garden/Nature
- Q1: Share flowers into vases
- Q2: Group bees into hives
- Q4: Gardener Grace shares sunflowers
- Q5: Maya's grouping puzzle

**IF difficulty = "hard":**
- Title: "Sharing and Grouping: Sports Day!"
- Theme: Sports
- Q1: Share balls into bags
- Q2: Group books onto shelves
- Q4: Coach Carlos shares medals
- Q5: Sam's team puzzle

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

/* SHARING VISUAL */
.sharing-container{display:flex;flex-direction:column;align-items:center;gap:12px;margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px}
.items-to-share{text-align:center;font-size:24pt;letter-spacing:2px}
.share-targets{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.share-box{border:3px dashed #9C27B0;border-radius:10px;padding:12px 20px;min-width:60px;text-align:center;background:#F3E5F5}
.share-label{font-size:11pt;color:#7B1FA2;font-weight:bold}

/* GROUPING VISUAL */
.grouping-container{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px}
.group-circle{border:3px solid #1976D2;border-radius:50%;padding:12px;display:flex;gap:4px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:70px;min-height:70px;background:#E3F2FD}
.group-emoji{font-size:18pt}

/* CALCULATION BOX */
.calc-container{background:#F5F5F5;border-radius:8px;padding:12px;margin:12px 0;text-align:center}
.calc-line{font-size:16pt;margin:8px 0}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:12px;margin:12px 0;text-align:center}
.context-icon{font-size:32pt;margin-bottom:8px}
.context-number{font-size:20pt;font-weight:bold;color:#E65100}
.context-story{font-size:13pt;color:#333;margin:8px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:10px;flex:1}

/* ANSWER ELEMENTS */
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Basic sharing and grouping skills
- Q1: Sharing visual - items shared between containers
- Q2: Grouping visual - identify total, group size, number of groups

### Section B: Application (Q3-Q4) - Division calculations and word problems
- Q3: Division calculations (3 calculations)
- Q4: Word problem with themed character

### Section C: Reasoning (Q5) - Sharing vs grouping misconception challenge

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Party Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Share 12 balloons between 3 children | 4 |
| Q2 | 15 sweets in bags of 5 | 15, 5, 3 |
| Q3 | a)10÷2 b)20÷5 c)30÷10 | 5, 4, 3 |
| Q4 | Party Penny: 20 presents ÷ 4 children | 5 |
| Q5 | "12÷4 same as 12÷3?" | No, 3, 4 |

**Answer Key**: 4, 15, 5, 3, 5, 4, 3, 5, No, 3, 4

### Worksheet 2 (Average - Garden Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Share 20 flowers between 4 vases | 5 |
| Q2 | 18 bees in groups of 6 | 18, 6, 3 |
| Q3 | a)20÷2 b)25÷5 c)40÷10 | 10, 5, 4 |
| Q4 | Gardener Grace: 30 sunflowers ÷ 5 pots | 6 |
| Q5 | "18÷6 same as 18÷3?" | No, 3, 6 |

**Answer Key**: 5, 18, 6, 3, 10, 5, 4, 6, No, 3, 6

### Worksheet 3 (Hard - Sports Theme)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | Share 30 balls between 5 bags | 6 |
| Q2 | 24 books on shelves of 4 | 24, 4, 6 |
| Q3 | a)30÷2 b)35÷5 c)60÷10 | 15, 7, 6 |
| Q4 | Coach Carlos: 40 medals ÷ 8 winners | 5 |
| Q5 | "24÷8 same as 24÷3?" | No, 3, 8 |

**Answer Key**: 6, 24, 4, 6, 15, 7, 6, 5, No, 3, 8

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 4</p>
  <p><strong>2.</strong> 15, 5, 3</p>
  <p><strong>3.</strong> 5, 4, 3</p>
  <p><strong>4.</strong> 5</p>
  <p><strong>5.</strong> No, 3, 4</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: Sharing visual with 1 answer?
- [ ] Q2: Grouping visual with 3 sub-questions?
- [ ] Q3: THREE division calculations?
- [ ] Q4: Word problem with themed character?
- [ ] Q5: Reasoning with NO + two calculations?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 1+3+3+1+3 = 11 answers?

Generate complete HTML. UK Year 2 aligned.
