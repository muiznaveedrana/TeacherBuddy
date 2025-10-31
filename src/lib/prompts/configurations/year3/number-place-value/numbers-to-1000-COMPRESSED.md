# Y3: Numbers to 1000 ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Place value: 0-1000 (H|T|O).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Number range**: 0-1000
- **Place value**: Hundreds (H), Tens (T), Ones (O)
- **Skills**: Read, write, partition, identify digit values
- **Representations**: Base-10 blocks, place value charts, number lines
- **Example**: 456 = 400 + 50 + 6 (4 hundreds, 5 tens, 6 ones)

## QUESTION TYPES

**Q1**: Base-10 blocks representation. Show hundreds flats, tens rods, ones cubes.

**Q2**: Place value chart. Fill in H|T|O columns for given numbers.

**Q3**: Partitioning. "456 = ___ + ___ + ___" (break into H+T+O).

**Q4**: Digit value questions. "What is the value of the digit 5 in 456?"

**Q5**: Word problem. "A shop has 3 boxes of 100 pencils, 4 packs of 10, and 7 single pencils. How many pencils?"

## BASE-10 BLOCKS (CSS)

### Hundreds Flat: 100×100px orange square
### Tens Rod: 100×15px blue rectangle
### Ones Cube: 15×15px green square

## COLOR SCHEME (Year 3 Enhanced)
- **Hundreds**: #FF9800 (orange) - largest value
- **Tens**: #2196F3 (blue) - middle value
- **Ones**: #4CAF50 (green) - smallest value
- **Borders**: 3px solid #333

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.base10-container{margin:18px 0;padding:18px;background:#FFF3E0;border-radius:8px;text-align:center}
.base10-blocks{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin:20px 0}
.block-group{text-align:center;margin:15px}
.block-label{font-size:16pt;font-weight:bold;margin-bottom:10px}
.hundreds-label{color:#F57C00}
.tens-label{color:#1976D2}
.ones-label{color:#2E7D32}
.hundred-flat{width:100px;height:100px;background:#FF9800;border:3px solid #F57C00;border-radius:6px;display:inline-block;margin:5px;position:relative}
.hundred-flat::after{content:'100';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:24pt;font-weight:bold;color:#FFF}
.ten-rod{width:100px;height:15px;background:#2196F3;border:2px solid #1565C0;border-radius:3px;display:inline-block;margin:3px}
.one-cube{width:15px;height:15px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;display:inline-block;margin:2px}
.number-display{font-size:36pt;font-weight:bold;color:#1976D2;margin:20px 0;padding:15px;background:#FFF;border:3px solid #2196F3;border-radius:8px;display:inline-block}
.place-value-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.pv-chart{display:inline-table;margin:20px auto;border-collapse:separate;border-spacing:0;border:3px solid #2196F3;border-radius:8px;overflow:hidden}
.pv-row{display:table-row}
.pv-cell{display:table-cell;padding:20px 30px;text-align:center;font-size:24pt;font-weight:bold;border:2px solid #2196F3;min-width:100px}
.pv-header{background:#2196F3;color:#FFF;font-size:20pt}
.pv-hundreds{background:#FFF3E0;color:#F57C00}
.pv-tens{background:#E3F2FD;color:#1976D2}
.pv-ones{background:#E8F5E9;color:#2E7D32}
.pv-answer{background:#FFF;min-height:60px}
.partition-container{margin:18px 0;padding:18px;background:#E8F5E9;border-radius:8px}
.partition-equation{display:flex;justify-content:center;align-items:center;gap:15px;margin:25px 0;flex-wrap:wrap}
.partition-box{padding:15px 30px;border:3px solid;border-radius:8px;font-size:28pt;font-weight:bold;min-width:120px;text-align:center}
.partition-hundreds{background:#FFF3E0;border-color:#FF9800;color:#F57C00}
.partition-tens{background:#E3F2FD;border-color:#2196F3;color:#1976D2}
.partition-ones{background:#E8F5E9;border-color:#4CAF50;color:#2E7D32}
.partition-total{background:#FFF;border-color:#333;color:#333}
.plus-symbol{font-size:36pt;color:#FF9800;font-weight:bold}
.equals-symbol{font-size:36pt;color:#4CAF50;font-weight:bold}
.digit-value-container{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.number-breakdown{display:flex;justify-content:center;gap:5px;margin:20px 0}
.digit-box{padding:20px 25px;border:4px solid #E91E63;border-radius:8px;font-size:48pt;font-weight:bold;background:#FFF}
.digit-box.highlight{background:#FFE0F0;border-width:5px}
.digit-position{text-align:center;margin-top:10px;font-size:15pt;font-weight:bold;color:#C2185B}
.value-explanation{margin:20px 0;padding:15px;background:#FFF;border:2px dashed #E91E63;border-radius:6px;font-size:18pt;text-align:center}
.word-problem-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.problem-visual{display:flex;justify-content:center;gap:30px;flex-wrap:wrap;margin:20px 0}
.visual-group{text-align:center;margin:15px}
.visual-label{font-size:16pt;font-weight:bold;margin-bottom:10px}
.visual-quantity{font-size:32pt;font-weight:bold;margin:10px 0}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.number-line-container{margin:20px 0;padding:20px;background:#F5F5F5;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:30px 10px 10px;margin:20px 0}
.number-line::before{content:'';position:absolute;bottom:10px;left:5%;right:5%;height:4px;background:#333}
.number-mark{width:40px;height:40px;background:#E0E0E0;border:2px solid #999;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12pt;font-weight:bold;z-index:1;flex-direction:column}
.number-mark.major{background:#2196F3;color:#FFF;border-width:3px}
.answer-box{display:inline-block;min-width:100px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:120px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. All numbers 0-1000 (three-digit place value)
2. Use base-10 blocks for visual representation
3. Place value charts show H|T|O clearly
4. Partition into hundreds + tens + ones
5. Digit value questions focus on place value understanding
6. Real-world contexts for word problems
7. Answer key shows full working
8. Colored backgrounds Q1-Q5
9. Color-coded by place value (H=orange, T=blue, O=green)
10. Year 3 appropriate (ages 7-8)

## NUMBER WORDS
- 456 = four hundred and fifty-six
- 720 = seven hundred and twenty
- 305 = three hundred and five

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Base-10 blocks with H/T/O?
- [ ] Q2: Place value chart?
- [ ] Q3: Partitioning equation?
- [ ] Q4: Digit value identification?
- [ ] Q5: Real-world word problem?
- [ ] All numbers 0-1000?
- [ ] Color-coded place values?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?
- [ ] Year 3 appropriate?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
