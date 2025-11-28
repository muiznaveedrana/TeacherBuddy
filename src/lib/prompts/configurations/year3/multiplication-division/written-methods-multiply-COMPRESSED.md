# Ages 7-8: Written Methods - Multiplication

**CRITICAL: EXACTLY {{questionCount}} questions. Grid method for TU×U multiplication.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Grid method**: Systematic approach for TU × U (e.g., 23 × 4)
- **Partitioning**: Split two-digit number into tens and ones
- **Process**: (Tens × U) + (Ones × U) = Answer
- **Example**: 23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92
- **Range**: 11-99 × 2-9

## QUESTION TYPES

**Q1**: Grid method with guided partitioning. Show grid, students fill in calculations.

**Q2**: Grid method with visual number split. "Split 34 into 30 and 4, then multiply by 5."

**Q3**: Mixed practice grid (4-6 problems). Students create their own grids.

**Q4**: Scaling problems. "If 1 book costs £4, how much do 13 books cost?"

**Q5**: Word problem. "A baker makes 24 cupcakes each day. How many in 6 days?"

## GRID METHOD EXPLAINED

### Example: 23 × 4

**Step 1**: Partition 23 into 20 + 3

**Step 2**: Create grid:
```
×    | 4
-----|----
20   | 80
3    | 12
```

**Step 3**: Add partial products: 80 + 12 = 92

## COLOR SCHEME (Year 3 Enhanced)
- **Tens column**: #FF9800 (orange)
- **Ones column**: #4CAF50 (green)
- **Grid borders**: #2196F3 (blue)
- **Partial products**: #9C27B0 (purple)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.grid-method-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.partition-visual{display:flex;justify-content:center;align-items:center;gap:15px;margin:20px 0;flex-wrap:wrap}
.partition-box{padding:15px 25px;border:3px solid #FF9800;border-radius:8px;background:#FFF;font-size:24pt;font-weight:bold}
.partition-box.tens{background:#FFF3E0;color:#F57C00}
.partition-box.ones{background:#E8F5E9;color:#2E7D32}
.plus-sign{font-size:32pt;color:#2196F3}
.equals-sign{font-size:32pt;color:#4CAF50}
.multiplication-grid{display:inline-table;margin:20px auto;border-collapse:separate;border-spacing:0;border:3px solid #2196F3;border-radius:8px;overflow:hidden}
.grid-row{display:table-row}
.grid-cell{display:table-cell;padding:15px 20px;text-align:center;font-size:20pt;font-weight:bold;border:2px solid #2196F3;min-width:80px}
.grid-cell.header{background:#2196F3;color:#FFF;font-size:22pt}
.grid-cell.tens-label{background:#FFF3E0;color:#F57C00}
.grid-cell.ones-label{background:#E8F5E9;color:#2E7D32}
.grid-cell.product{background:#F3E5F5;color:#7B1FA2}
.grid-cell.answer-box{background:#FFF}
.step-by-step{margin:20px 0;padding:15px;background:#F5F5F5;border-radius:8px;border:2px solid #999}
.step{margin:12px 0;padding:10px;background:#FFF;border-left:4px solid #2196F3;border-radius:4px}
.step-number{display:inline-block;background:#2196F3;color:#FFF;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:10px;font-size:14pt;font-weight:bold}
.step-content{font-size:17pt;display:inline}
.addition-sum{font-size:24pt;font-weight:bold;text-align:center;margin:20px 0;padding:15px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.practice-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px;margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.practice-item{padding:15px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;text-align:center}
.practice-problem{font-size:26pt;font-weight:bold;margin:15px 0}
.times-symbol{color:#FF9800;margin:0 10px}
.grid-space{margin:15px 0;padding:15px;border:2px dashed #999;border-radius:6px;min-height:100px;background:#FAFAFA}
.grid-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.scaling-container{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.scaling-visual{display:flex;justify-content:space-around;align-items:center;margin:20px 0;flex-wrap:wrap}
.scaling-item{text-align:center;margin:15px;padding:15px;background:#FFF;border:3px solid #E91E63;border-radius:8px}
.scaling-label{font-size:15pt;font-weight:bold;color:#C2185B;margin-bottom:10px}
.scaling-value{font-size:36pt;font-weight:bold;color:#E91E63}
.scaling-calculation{font-size:22pt;text-align:center;margin:20px 0}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.problem-illustration{text-align:center;margin:20px 0}
.daily-amount{font-size:28pt;font-weight:bold;color:#FF9800;margin:10px 0}
.number-of-days{font-size:28pt;font-weight:bold;color:#2196F3;margin:10px 0}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. Use grid method for all TU × U multiplications
2. Always show partitioning (tens + ones)
3. Range: 11-99 × 2-9
4. Include partial products in grid
5. Show addition of partial products
6. Provide working space for student grids
7. Real-world contexts for word problems
8. Answer key with full grid working
9. Colored backgrounds Q1-Q5
10. Year 3 appropriate (ages 7-8)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Guided grid method with partitioning?
- [ ] Q2: Grid method with visual steps?
- [ ] Q3: Mixed practice (4+ problems)?
- [ ] Q4: Scaling problems with context?
- [ ] Q5: Word problem with grid method space?
- [ ] All multiplications TU × U format?
- [ ] Grid layouts clear and structured?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full grid working?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
