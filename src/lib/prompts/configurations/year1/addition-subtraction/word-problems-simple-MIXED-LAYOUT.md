# Ages 5-6: Simple Word Problems (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 simple word problem questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic number sentences
**Section B: Application (Q3-Q4)** - Real-world word problems
**Section C: Reasoning (Q5)** - True/False, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1)
- **Operations:** Addition and subtraction within 20
- **Key skills:** Solve simple word problems, write number sentences
- **Visual representations:** Object images, number sentences
- **Key vocabulary:** altogether, how many more, left, total

## CRITICAL RULES
- NO color adjectives for objects (NO "red cars", "blue apples")
- Use quantity-only descriptions ("6 cars", "3 more cars")
- All numbers within 0-20

## OBJECTS - `/images/{object}.png`
**Toys**: car, ball, doll, bear, teddy-bear
**Fruits**: apple, banana, orange, strawberry
**School**: pencil, book, crayon
**Animals**: chicken, duck, pig, sheep

## NAMES
Emma, Ben, Sam, Lily, Max, Zara, Jack, Mia

## CSS (Compact - Mixed Layout)
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
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
.number-sentence{display:flex;align-items:center;justify-content:center;gap:10px;margin:15px auto;padding:12px;background:white;border:3px solid #333;border-radius:10px;max-width:350px;font-size:20pt;font-weight:bold}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.object-row{display:flex;gap:5px;justify-content:center;flex-wrap:wrap;margin:10px 0}
.object-row img{width:32px;height:32px}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.answer-box-small{display:inline-block;min-width:45px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px}
.answer-key h2{font-size:13pt;font-weight:bold;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0}
```

## 3 WORKSHEET VARIATIONS

### WS1: Foundation
| Q | Type | Answer |
|---|------|--------|
| Q1 | Number sentence: 5 + 3 = __ | 8 |
| Q2 | Number sentence: 9 - 4 = __ | 5 |
| Q3 | "Emma has 6 apples. She gets 3 more." | 9 |
| Q4 | "Ben has 10 pencils. He gives away 4." | 6 |
| Q5 | True/False: "5 + 2 = 7", "8 - 3 = 4", "4 + 4 = 8" | True, False, True |

### WS2: Varied
| Q | Type | Answer |
|---|------|--------|
| Q1 | Fill in: 7 + __ = 12 | 5 |
| Q2 | Fill in: 15 - __ = 9 | 6 |
| Q3 | "Lily sees 8 birds. 5 more fly in." | 13 |
| Q4 | "Sam has 14 stickers. He loses 6." | 8 |
| Q5 | "Jack says 7 + 8 = 14. Is he right?" | No, 15 |

### WS3: Challenge
| Q | Type | Answer |
|---|------|--------|
| Q1 | Two-part: 4 + 3 = __, 7 + 5 = __ | 7, 12 |
| Q2 | Two-part: 12 - 4 = __, 16 - 7 = __ | 8, 9 |
| Q3 | "Mia has 9 books. Gets 6 more. Gives 3 away." | 12 |
| Q4 | Comparison: "Ben: 15, Lily: 9. How many more?" | 6 |
| Q5 | "What is 8 + 7?" and "How did you work it out?" | 15 |

## ANSWER KEY FORMAT
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 8</p>
  <p><strong>2.</strong> 5</p>
  <p><strong>3.</strong> 9</p>
  <p><strong>4.</strong> 6</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```
