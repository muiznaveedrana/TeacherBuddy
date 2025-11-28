# Ages 8-9: Four-Digit Numbers

**CRITICAL: EXACTLY {{questionCount}} questions. 4-digit place value (1000-9999): Th|H|T|O.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Number range**: 1000-9999 (four-digit numbers)
- **Place value**: Thousands (Th), Hundreds (H), Tens (T), Ones (O)
- **Skills**: Read, write, partition, represent, compare four-digit numbers
- **Representations**: Base-10 blocks, place value charts, number lines to 10,000
- **Example**: 5678 = 5000 + 600 + 70 + 8 (5 thousands, 6 hundreds, 7 tens, 8 ones)

## QUESTION TYPES

**Q1**: Place value chart. Fill in Th|H|T|O columns for given four-digit numbers.

**Q2**: Partitioning. "5678 = ___ + ___ + ___ + ___" (break into Th+H+T+O).

**Q3**: Digit value questions. "What is the value of the digit 5 in 5678?"

**Q4**: Number line positioning. Mark numbers on 0-10,000 number line.

**Q5**: Word problem. "A school has 3 buildings with 1000 seats each, 5 rooms with 100 seats, 7 benches with 10 seats, and 8 single chairs. How many seats total?"

## PLACE VALUE STRUCTURE (Year 4)

### Four-digit number: 5678
- **Thousands (Th)**: 5 × 1000 = 5000
- **Hundreds (H)**: 6 × 100 = 600
- **Tens (T)**: 7 × 10 = 70
- **Ones (O)**: 8 × 1 = 8
- **Total**: 5000 + 600 + 70 + 8 = 5678

## COLOR SCHEME (Year 4 Enhanced)
- **Thousands**: #E91E63 (pink) - NEW for Year 4
- **Hundreds**: #FF9800 (orange)
- **Tens**: #2196F3 (blue)
- **Ones**: #4CAF50 (green)
- **Borders**: 3px solid #333
- **Font size**: 17pt base (vs 16pt Y3) - age-appropriate increase
- **Question numbers**: 34px (vs 32px Y3)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.place-value-container{margin:20px 0;padding:20px;background:#E3F2FD;border-radius:8px}
.pv-chart{display:inline-table;margin:20px auto;border-collapse:separate;border-spacing:0;border:3px solid #1976D2;border-radius:8px;overflow:hidden}
.pv-row{display:table-row}
.pv-cell{display:table-cell;padding:20px 30px;text-align:center;font-size:26pt;font-weight:bold;border:2px solid #1976D2;min-width:110px}
.pv-header{background:#1976D2;color:#FFF;font-size:18pt}
.pv-thousands{background:#FCE4EC;color:#C2185B}
.pv-hundreds{background:#FFF3E0;color:#F57C00}
.pv-tens{background:#E3F2FD;color:#1976D2}
.pv-ones{background:#E8F5E9;color:#2E7D32}
.pv-answer{background:#FFF;min-height:70px}
.number-display{font-size:42pt;font-weight:bold;color:#1976D2;margin:25px 0;padding:18px;background:#FFF;border:4px solid #2196F3;border-radius:8px;display:inline-block}
.partition-container{margin:20px 0;padding:20px;background:#F1F8E9;border-radius:8px}
.partition-equation{display:flex;justify-content:center;align-items:center;gap:18px;margin:25px 0;flex-wrap:wrap}
.partition-box{padding:18px 32px;border:4px solid;border-radius:8px;font-size:32pt;font-weight:bold;min-width:140px;text-align:center}
.partition-thousands{background:#FCE4EC;border-color:#E91E63;color:#C2185B}
.partition-hundreds{background:#FFF3E0;border-color:#FF9800;color:#F57C00}
.partition-tens{background:#E3F2FD;border-color:#2196F3;color:#1976D2}
.partition-ones{background:#E8F5E9;border-color:#4CAF50;color:#2E7D32}
.partition-total{background:#FFF;border-color:#333;color:#333}
.plus-symbol{font-size:40pt;color:#FF9800;font-weight:bold}
.equals-symbol{font-size:40pt;color:#4CAF50;font-weight:bold}
.digit-value-container{margin:20px 0;padding:20px;background:#FCE4EC;border-radius:8px}
.number-breakdown{display:flex;justify-content:center;gap:6px;margin:25px 0}
.digit-box{padding:22px 28px;border:4px solid;border-radius:8px;font-size:52pt;font-weight:bold;background:#FFF}
.digit-box.th{border-color:#E91E63;color:#E91E63}
.digit-box.h{border-color:#FF9800;color:#FF9800}
.digit-box.t{border-color:#2196F3;color:#2196F3}
.digit-box.o{border-color:#4CAF50;color:#4CAF50}
.digit-box.highlight{box-shadow:0 0 20px rgba(233,30,99,0.5);border-width:6px}
.digit-position{text-align:center;margin-top:12px;font-size:16pt;font-weight:bold}
.digit-position.th{color:#C2185B}
.digit-position.h{color:#F57C00}
.digit-position.t{color:#1976D2}
.digit-position.o{color:#2E7D32}
.value-explanation{margin:20px 0;padding:18px;background:#FFF;border:3px dashed #E91E63;border-radius:8px;font-size:20pt;text-align:center}
.number-line-container{margin:25px 0;padding:25px;background:#F5F5F5;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:35px 15px 15px;margin:25px 0}
.number-line::before{content:'';position:absolute;bottom:15px;left:5%;right:5%;height:5px;background:#333;border-radius:2px}
.number-mark{width:45px;height:45px;background:#E0E0E0;border:3px solid #999;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14pt;font-weight:bold;z-index:1;flex-direction:column}
.number-mark.major{background:#E91E63;color:#FFF;border-width:4px;width:50px;height:50px;font-size:15pt}
.word-problem-container{margin:20px 0;padding:20px;background:#FFF3E0;border:3px dashed #FF9800;border-radius:8px}
.problem-visual{display:flex;justify-content:center;gap:35px;flex-wrap:wrap;margin:25px 0}
.visual-group{text-align:center;margin:18px}
.visual-label{font-size:17pt;font-weight:bold;margin-bottom:12px}
.visual-quantity{font-size:36pt;font-weight:bold;margin:12px 0}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:55px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:55px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:140px;margin:0 10px;background:transparent}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:90px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Example 1: Place Value Chart
**Number**: 5678

| Th | H | T | O |
|----|---|---|---|
| 5  | 6 | 7 | 8 |

**Values**:
- Thousands: 5 × 1000 = 5000
- Hundreds: 6 × 100 = 600
- Tens: 7 × 10 = 70
- Ones: 8 × 1 = 8

### Example 2: Partitioning
5678 = 5000 + 600 + 70 + 8

### Example 3: Digit Value
**Question**: What is the value of the digit 6 in 5678?
**Answer**: 600 (6 hundreds = 600)

### Example 4: Number Line (0-10,000)
```
0----1000----2000----3000----4000----5000----6000----7000----8000----9000----10000
                                           ↑
                                        5678 is here
```

### Example 5: Word Problem
**Problem**: A factory produced 2 batches of 1000 items, 4 boxes of 100 items, 5 packs of 10 items, and 9 single items. How many items total?

**Solution**:
- 2 × 1000 = 2000
- 4 × 100 = 400
- 5 × 10 = 50
- 9 × 1 = 9
- **Total**: 2000 + 400 + 50 + 9 = 2459 items

## NUMBER WORDS (Year 4)
- 5678 = five thousand, six hundred and seventy-eight
- 3042 = three thousand and forty-two
- 7000 = seven thousand
- 9999 = nine thousand, nine hundred and ninety-nine

## RULES

1. All numbers 1000-9999 (four-digit range)
2. Use place value charts showing Th|H|T|O clearly
3. Partition into thousands + hundreds + tens + ones
4. Digit value questions focus on place value understanding
5. Number lines show scale to 10,000
6. Real-world contexts for word problems
7. Answer key shows full working
8. Colored backgrounds Q1-Q5
9. Color-coded by place value (Th=pink, H=orange, T=blue, O=green)
10. Year 4 appropriate (ages 8-9)
11. Font size 17pt (larger than Year 3)
12. Question numbers 34px (larger than Year 3)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Place value chart with Th|H|T|O columns?
- [ ] Q2: Partitioning equation into 4 parts?
- [ ] Q3: Digit value identification with 4-digit numbers?
- [ ] Q4: Number line to 10,000?
- [ ] Q5: Real-world word problem with context?
- [ ] All numbers 1000-9999 range?
- [ ] Color-coded place values (Th=pink, H=orange, T=blue, O=green)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included with full working?
- [ ] Year 4 appropriate complexity?
- [ ] Font sizes increased for Year 4 (17pt base, 34px question numbers)?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
