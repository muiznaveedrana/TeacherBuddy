# Ages 8-9: Times Tables - 3×, 6×, 9× Connections (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 4 times tables questions focusing on **3×, 6×, 9× table connections** using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - 3×, 6×, 9× table practice, related facts
**Section B: Application (Q3-Q4)** - Real-world problems using these tables
**Section C: Reasoning (Q5)** - Patterns, doubling/tripling relationships

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 4 - MTC Focus)
- **Key connections:** 6× = 3×+3× (double), 9× = 3×+3×+3× (triple)
- **MTC Facts:** 6×6=36, 6×7=42, 6×8=48, 9×6=54, 9×7=63, 9×8=72
- **Strategy:** Use 3× facts to derive 6× and 9× facts
- **9× finger trick:** Fingers show tens and ones
- **Pattern:** 9× digits sum to 9 (18→1+8=9, 27→2+7=9, etc.)

## DIFFICULT FACTS (MTC Focus)
- 6×7=42, 6×8=48, 6×9=54
- 9×6=54, 9×7=63, 9×8=72
- 3×8=24, 3×9=27, 3×12=36

## CSS (Same as other times tables)
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
.connection-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:12px 0}
.connection-item{padding:14px;border:2px solid #4CAF50;border-radius:6px;background:#E8F5E9;font-size:16pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.missing-number-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:12px 0}
.missing-number-item{padding:14px;border:2px solid #FF9800;border-radius:6px;background:#FFF3E0;font-size:18pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.pattern-box{background:#FCE4EC;border:2px solid #E91E63;border-radius:8px;padding:12px;margin:10px 0}
.pattern-sequence{font-size:20pt;font-weight:bold;font-family:'Courier New',monospace;margin:10px 0}
.answer-box{display:inline-block;min-width:70px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:55px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:100px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## 6 WORKSHEET VARIATIONS (3×, 6×, 9× Connections)

### WS1: Foundation 1 (Easy - Triangle Pattern)
| Q | Type | Details |
|---|------|---------|
| Q1 | 3× Grid | 3×2, 3×3, 3×4, 3×5, 3×6, 3×7 → 6, 9, 12, 15, 18, 21 |
| Q2 | Double 3× | 3×4=12, so 6×4=? ; 3×5=15, so 6×5=? → 24, 30 |
| Q3 | Sharing | "18 apples shared into 3 boxes" → 6 each |
| Q4 | Word problem | "3 rows of 8 chairs" → 24 |
| Q5 | Pattern | "3, 6, 9, 12... what's next three?" → 15, 18, 21 |

### WS2: Foundation 2 (Easy - Sports Theme)
| Q | Type | Details |
|---|------|---------|
| Q1 | 6× Grid | 6×2, 6×3, 6×4, 6×5, 6×6, 6×7 → 12, 18, 24, 30, 36, 42 |
| Q2 | Division | 18÷3, 24÷6, 30÷6, 36÷6 → 6, 4, 5, 6 |
| Q3 | Teams | "6 teams, 5 players each" → 30 |
| Q4 | Word problem | "6 packs of 7 stickers" → 42 |
| Q5 | Connection | "3×6=18, so 6×6=?" → 36 (double) |

### WS3: Practice 1 (Average - 9× Pattern Focus)
| Q | Type | Details |
|---|------|---------|
| Q1 | 9× Grid | 9×2, 9×3, 9×4, 9×5, 9×6, 9×7 → 18, 27, 36, 45, 54, 63 |
| Q2 | Triple 3× | 3×4=12, so 9×4=? ; 3×6=18, so 9×6=? → 36, 54 |
| Q3 | Context | "9 boxes, 8 items each" → 72 |
| Q4 | Multi-step | "9 packs of 5, then 9 packs of 6" → 45+54=99 |
| Q5 | Digit sum | "9×7=63, 6+3=?" Check pattern → 9 |

### WS4: Practice 2 (Average - All Three Tables)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed Grid | 3×8, 6×8, 9×8, 3×9, 6×9, 9×9 → 24, 48, 72, 27, 54, 81 |
| Q2 | Missing | 3×___=27, 6×___=48, 9×___=72, ___×6=42 → 9, 8, 8, 7 |
| Q3 | Context | "6 shelves, 9 books each" → 54 |
| Q4 | Word problem | "9 packets of 7 sweets" → 63 |
| Q5 | Connection | "If 3×7=21, what is 6×7? What is 9×7?" → 42, 63 |

### WS5: Practice 3 (Average - MTC Focus)
| Q | Type | Details |
|---|------|---------|
| Q1 | MTC Grid | 6×6, 6×7, 6×8, 9×6, 9×7, 9×8 → 36, 42, 48, 54, 63, 72 |
| Q2 | Division | 54÷6, 63÷9, 48÷6, 72÷9 → 9, 7, 8, 8 |
| Q3 | Sharing | "72 cards shared equally among 9 children" → 8 |
| Q4 | Multi-step | "6×7 + 9×7" → 42+63=105 |
| Q5 | Always/Sometimes/Never | "9× answers always have digits that sum to 9" → Always (for 1-10) |

### WS6: Practice 4 (Average - Real World Mixed)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed Grid | 3×11, 6×11, 9×11, 3×12, 6×12, 9×12 → 33, 66, 99, 36, 72, 108 |
| Q2 | Missing | ___×9=81, 6×___=54, 9×___=63, ___×3=36 → 9, 9, 7, 12 |
| Q3 | Context | "9 dozen eggs" (9×12) → 108 |
| Q4 | Word problem | "6 friends collect 11 shells each" → 66 |
| Q5 | Explain | "Use 3×8=24 to work out 9×8" → 24×3=72 |

## TABLE REFERENCES

### 3× Table
| × | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 3 | 3 | 6 | 9 | 12 | 15 | 18 | 21 | 24 | 27 | 30 | 33 | 36 |

### 6× Table
| × | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 54 | 60 | 66 | 72 |

### 9× Table
| × | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | 9 | 18 | 27 | 36 | 45 | 54 | 63 | 72 | 81 | 90 | 99 | 108 |

### Key Strategies:
- **Doubling:** 6× = 3×+3× = 2×(3×)
- **Tripling:** 9× = 3×+3×+3× = 3×(3×)
- **9× digit sum:** All products 9-90 have digits summing to 9
- **Finger trick:** Hold up 10 fingers, fold down the one for multiplier
