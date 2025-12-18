# Ages 5-6: Coins Recognition (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 coins recognition questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, coin identification
**Section B: Application (Q3-Q4)** - Real-world context, counting coins
**Section C: Reasoning (Q5)** - True/False, Comparison

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1)
- **Coins:** 1p, 2p, 5p, 10p, 20p ONLY
- **Key skills:** Recognize coins, count same denomination, find totals
- **Currency:** UK £ and p notation

## UK COINS - Visual Representation
- **1p:** Copper (#B87333), smallest
- **2p:** Copper (#B87333), larger
- **5p:** Silver (#C0C0C0), small silver
- **10p:** Silver (#C0C0C0), medium
- **20p:** Silver (#C0C0C0), 7-sided

## CSS
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
.coin-display{display:flex;gap:12px;justify-content:center;margin:15px auto}
.coin{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt;border:3px solid #333}
.coin-1p,.coin-2p{background:linear-gradient(135deg,#CD7F32,#B87333,#A0522D);color:white}
.coin-5p,.coin-10p,.coin-20p{background:linear-gradient(135deg,#E8E8E8,#C0C0C0,#A8A8A8);color:#333}
.coin.small{width:50px;height:50px;font-size:12pt}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
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
| Q1 | Name the coin (show 5p) | 5 |
| Q2 | Count 4 x 2p coins | 8 |
| Q3 | Total: 5p + 10p | 15 |
| Q4 | "Apple costs 7p. Show: 5p + 2p" | 7 |
| Q5 | True/False: "5p is worth more than 2p" | True, False, True |

### WS2: Varied
| Q | Type | Answer |
|---|------|--------|
| Q1 | Name the coin (show 10p) | 10 |
| Q2 | Count 3 x 5p coins | 15 |
| Q3 | Total: 10p + 5p + 2p | 17 |
| Q4 | "Which costs more: 8p or 12p?" | 12 |
| Q5 | "Is 20p the same as two 10p coins?" | Yes |

### WS3: Challenge
| Q | Type | Answer |
|---|------|--------|
| Q1 | Name coins (show 20p and 1p) | 20, 1 |
| Q2 | Count mixed: 10p + 10p + 5p | 25 (but max 20p for Y1) → 10p + 5p + 2p = 17 |
| Q3 | Total: 10p + 5p + 2p + 1p | 18 |
| Q4 | "Pay 15p. Show which coins." | 10, 5 |
| Q5 | "Which is worth more: 5 x 2p or 1 x 10p?" | Same |
