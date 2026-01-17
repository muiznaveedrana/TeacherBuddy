# Ages 8-9: Times Tables - Focus on 7× (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 4 times tables questions focusing on the **7 times table** using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - 7× table practice, related facts
**Section B: Application (Q3-Q4)** - Real-world 7× problems
**Section C: Reasoning (Q5)** - Patterns, explain thinking, spot errors

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 4 - MTC Critical)
- **Focus:** The 7 times table is the HARDEST for most children
- **MTC Facts:** 7×6=42, 7×7=49, 7×8=56, 7×9=63 appear frequently
- **Strategies:** Link to 5× +2×, use commutativity, fact families
- **Key misconception:** Confusing × with + (7×6=13 instead of 42)
- **Division link:** 42÷7, 49÷7, 56÷7, 63÷7

## DIFFICULT 7× FACTS
Most challenging (MTC focus):
- 7×6=42, 7×7=49, 7×8=56, 7×9=63
- 7×11=77, 7×12=84
- Related divisions: 56÷7=8, 63÷7=9

## CSS (Same as times-tables-to-12)
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
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
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px}
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:14px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:16pt;font-family:'Courier New',monospace}
.fact-family-box{background:#FAFAFA;border:2px solid #2196F3;border-radius:8px;padding:12px;margin:10px 0}
.fact-family-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fact-family-item{padding:10px;background:#E3F2FD;border:2px solid #2196F3;border-radius:6px;font-size:16pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.missing-number-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:12px 0}
.missing-number-item{padding:14px;border:2px solid #FF9800;border-radius:6px;background:#FFF3E0;font-size:18pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.array-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.array-row{font-size:24pt;margin:3px 0;letter-spacing:6px}
.array-label{font-size:12pt;color:#666;margin-top:10px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:12px;margin:8px 0}
.pattern-box{background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:12px;margin:10px 0}
.pattern-sequence{font-size:20pt;font-weight:bold;font-family:'Courier New',monospace;margin:10px 0}
.answer-box{display:inline-block;min-width:70px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:55px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## 6 WORKSHEET VARIATIONS (Focus on 7×)

### WS1: Foundation 1 (Easy - Days Theme - 7 days in a week)
| Q | Type | Details |
|---|------|---------|
| Q1 | 7× Grid | 7×2, 7×3, 7×4, 7×5, 7×6, 7×7 → 14, 21, 28, 35, 42, 49 |
| Q2 | Missing | 7×___=21, ___×7=28, 7×___=42, ___×7=35 → 3, 4, 6, 5 |
| Q3 | Days context | "3 weeks = how many days?" → 21 |
| Q4 | Word problem | "Each week has 7 days. How many days in 4 weeks?" → 28 |
| Q5 | Error | "7×6=13 because 7+6=13" → No, 42 |

### WS2: Foundation 2 (Easy - Sports Theme - 7 players)
| Q | Type | Details |
|---|------|---------|
| Q1 | 7× Grid | 7×1, 7×2, 7×3, 7×4, 7×5, 7×6 → 7, 14, 21, 28, 35, 42 |
| Q2 | Fact family | 7, 8, 56 → 7×8=56, 8×7=56, 56÷7=8, 56÷8=7 |
| Q3 | Teams | "7 teams with 6 players each" → 42 |
| Q4 | Word problem | "Each netball team has 7 players. 5 teams = ?" → 35 |
| Q5 | Error | "7×7=14 because 7+7=14" → No, 49 |

### WS3: Practice 1 (Average - Nature Theme - 7× harder facts)
| Q | Type | Details |
|---|------|---------|
| Q1 | 7× Grid | 7×6, 7×7, 7×8, 7×9, 7×11, 7×12 → 42, 49, 56, 63, 77, 84 |
| Q2 | Missing | 7×___=56, ___×7=63, 7×___=49, ___×7=84 → 8, 9, 7, 12 |
| Q3 | Array | 7 rows of 9 flowers → 63 |
| Q4 | Multi-step | "7 trees, 8 apples each. Then 7 more trees, 9 apples each" → 56+63=119 |
| Q5 | Pattern | "7, 14, 21, 28... what's next three?" → 35, 42, 49 |

### WS4: Practice 2 (Average - School Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | Fact family | 7, 9, 63 → 7×9=63, 9×7=63, 63÷7=9, 63÷9=7 |
| Q2 | 7× Grid | 7×4, 7×6, 7×8, 7×9, 7×10, 7×12 → 28, 42, 56, 63, 70, 84 |
| Q3 | Groups | "7 tables, 8 books on each" → 56 |
| Q4 | Word problem | "Library has 7 shelves. 11 books on each shelf" → 77 |
| Q5 | Explain | "Use 7×8=56 to work out 7×9" → 56+7=63 |

### WS5: Practice 3 (Average - Food Theme - MTC Focus)
| Q | Type | Details |
|---|------|---------|
| Q1 | 7× Grid | 7×5, 7×6, 7×7, 7×8, 7×9, 7×11 → 35, 42, 49, 56, 63, 77 |
| Q2 | Division link | 42÷7, 56÷7, 63÷7, 49÷7 → 6, 8, 9, 7 |
| Q3 | Sharing | "56 cookies into 7 boxes" → 8 each |
| Q4 | Multi-step | "7 plates with 6 sandwiches, then 7 more plates with 7" → 42+49=91 |
| Q5 | Always/Sometimes/Never | "7× always gives an odd answer" → Sometimes |

### WS6: Practice 4 (Average - Travel Theme - All 7× mixed)
| Q | Type | Details |
|---|------|---------|
| Q1 | 7× Grid | 7×3, 7×6, 7×8, 7×9, 7×11, 7×12 → 21, 42, 56, 63, 77, 84 |
| Q2 | Missing | ___×7=77, 7×___=84, ___×7=63, 7×___=56 → 11, 12, 9, 8 |
| Q3 | Context | "7 carriages, 12 passengers each" → 84 |
| Q4 | Word problem | "Journey takes 7 hours. 9 miles per hour" → 63 miles |
| Q5 | Error | "7×8=15 because 7+8=15" → No, 56 |

## ANSWER KEY FORMAT
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 14, 21, 28, 35, 42, 49</p>
  <p><strong>2.</strong> 3, 4, 6, 5</p>
  <p><strong>3.</strong> 21</p>
  <p><strong>4.</strong> 28</p>
  <p><strong>5.</strong> No, 42, multiplication, addition</p>
</div>
```

## 7× TABLE REFERENCE
| × | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | 7 | 14 | 21 | 28 | 35 | 42 | 49 | 56 | 63 | 70 | 77 | 84 |

### Strategies to teach:
- **5×+2×**: 7×6 = (5×6)+(2×6) = 30+12 = 42
- **Commutativity**: 7×8 = 8×7
- **Near doubles**: 7×7 = 49, 7×8 = 49+7 = 56
- **Pattern**: Units digit goes 7,4,1,8,5,2,9,6,3,0 (repeating)
