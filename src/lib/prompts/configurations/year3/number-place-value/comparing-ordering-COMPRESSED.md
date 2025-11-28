# Ages 7-8: Comparing and Ordering Numbers

**CRITICAL: EXACTLY {{questionCount}} questions. Compare/order 0-1000 using <, >, =.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Number range**: 0-1000
- **Comparison symbols**: < (less than), > (greater than), = (equal to)
- **Skills**: Compare, order, reason about place value
- **Understanding**: Use place value to compare (H→T→O)
- **Example**: 456 > 423 (4H same, 5T > 2T)

## QUESTION TYPES

**Q1**: Compare using <, >, = symbols. Show 3 pairs of numbers to compare.

**Q2**: Ordering activity. "Order these 5 numbers from smallest to largest."

**Q3**: Place value reasoning. "Explain why 567 > 489 using place value."

**Q4**: Number line positioning. Mark numbers on 0-1000 number line.

**Q5**: Word problem. "Tom scored 456 points. Emma scored 523. Who scored more?"

## COMPARISON STRATEGIES (Year 3)

### Step-by-step comparison:
1. **Compare hundreds first** (4__ vs 5__ → 5 is bigger)
2. **If hundreds same, compare tens** (45_ vs 42_ → 5T > 2T)
3. **If tens same, compare ones** (456 vs 453 → 6 > 3)

## COLOR SCHEME (Year 3 Enhanced)
- **Less than (<)**: #FF5722 (red-orange)
- **Greater than (>)**: #4CAF50 (green)
- **Equal (=)**: #2196F3 (blue)
- **Number boxes**: White with place value colors
- **Hundreds**: #FF9800 (orange) border
- **Tens**: #2196F3 (blue) border
- **Ones**: #4CAF50 (green) border

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.comparison-container{margin:18px 0;padding:18px;background:#FFF9C4;border-radius:8px}
.comparison-row{display:flex;justify-content:center;align-items:center;gap:20px;margin:20px 0;flex-wrap:wrap}
.number-box{padding:20px 30px;border:4px solid #2196F3;border-radius:8px;background:#FFF;font-size:36pt;font-weight:bold;color:#333;min-width:140px;text-align:center}
.number-box.highlight-hundreds{border-color:#FF9800;box-shadow:0 0 10px #FF9800}
.number-box.highlight-tens{border-color:#2196F3;box-shadow:0 0 10px #2196F3}
.number-box.highlight-ones{border-color:#4CAF50;box-shadow:0 0 10px #4CAF50}
.comparison-symbol{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:48pt;font-weight:bold;border:4px solid}
.symbol-less{background:#FFE5DD;color:#FF5722;border-color:#FF5722}
.symbol-greater{background:#E8F5E9;color:#4CAF50;border-color:#4CAF50}
.symbol-equal{background:#E3F2FD;color:#2196F3;border-color:#2196F3}
.symbol-box{display:inline-block;min-width:60px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF;font-size:42pt;line-height:60px;text-align:center;margin:0 10px;vertical-align:middle}
.ordering-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.numbers-to-order{display:flex;justify-content:center;gap:15px;margin:25px 0;flex-wrap:wrap}
.order-number{padding:18px 25px;border:3px solid #2196F3;border-radius:8px;background:#FFF;font-size:32pt;font-weight:bold;color:#333;box-shadow:2px 2px 5px rgba(0,0,0,0.2)}
.ordering-boxes{display:flex;justify-content:center;gap:12px;margin:25px 0;flex-wrap:wrap}
.order-box{padding:15px 20px;border:3px dashed #2196F3;border-radius:8px;background:#FFF;min-width:100px;height:70px;text-align:center;font-size:28pt;font-weight:bold}
.order-label{text-align:center;font-size:14pt;color:#1976D2;margin-top:8px;font-weight:bold}
.arrow-right{font-size:32pt;color:#2196F3;margin:0 5px}
.reasoning-container{margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.place-value-breakdown{display:flex;justify-content:space-around;margin:20px 0;flex-wrap:wrap}
.pv-column{text-align:center;margin:15px;padding:15px;background:#FFF;border-radius:8px;border:3px solid}
.pv-column.hundreds{border-color:#FF9800}
.pv-column.tens{border-color:#2196F3}
.pv-column.ones{border-color:#4CAF50}
.pv-label{font-size:15pt;font-weight:bold;margin-bottom:10px}
.pv-label.h{color:#F57C00}
.pv-label.t{color:#1976D2}
.pv-label.o{color:#2E7D32}
.pv-value{font-size:48pt;font-weight:bold}
.pv-value.h{color:#FF9800}
.pv-value.t{color:#2196F3}
.pv-value.o{color:#4CAF50}
.reasoning-box{margin:20px 0;padding:15px;background:#FFF;border:2px dashed #4CAF50;border-radius:6px;font-size:17pt;line-height:1.6}
.explanation-line{margin:10px 0;padding:10px;background:#E8F5E9;border-left:4px solid #4CAF50;border-radius:4px}
.number-line-container{margin:20px 0;padding:20px;background:#FCE4EC;border-radius:8px}
.number-line{position:relative;height:100px;margin:30px 20px;background:#FFF;border-radius:8px;padding:20px 10px}
.number-line-track{position:absolute;bottom:30px;left:5%;right:5%;height:6px;background:#E91E63;border-radius:3px}
.number-line-marks{position:relative;height:80px;display:flex;justify-content:space-between;padding:0 5%}
.number-mark{position:relative;width:2px;height:20px;background:#C2185B}
.number-mark.major{height:30px;background:#E91E63;width:4px}
.mark-label{position:absolute;top:35px;left:50%;transform:translateX(-50%);font-size:14pt;font-weight:bold;color:#C2185B;white-space:nowrap}
.number-mark.major .mark-label{font-size:16pt;top:40px}
.position-box{position:absolute;bottom:45px;transform:translateX(-50%);width:80px;height:50px;border:3px solid #E91E63;border-radius:8px;background:#FFF;display:flex;align-items:center;justify-content:center;font-size:24pt;font-weight:bold;color:#E91E63}
.word-problem-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.comparison-scenario{display:flex;justify-content:space-around;margin:25px 0;flex-wrap:wrap}
.person-card{text-align:center;padding:20px;background:#FFF;border:3px solid #FF9800;border-radius:8px;margin:10px;min-width:200px}
.person-name{font-size:20pt;font-weight:bold;color:#FF9800;margin-bottom:15px}
.person-value{font-size:42pt;font-weight:bold;color:#F57C00;margin:15px 0}
.vs-symbol{font-size:36pt;font-weight:bold;color:#FF9800;display:flex;align-items:center}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:80px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:150px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## COMPARISON SYMBOLS EXPLAINED

**< (Less than)**: Left number is smaller
- Example: 234 < 456 (234 is less than 456)
- Visual: Arrow points to smaller number

**> (Greater than)**: Left number is bigger
- Example: 678 > 234 (678 is greater than 234)
- Visual: Arrow points to smaller number

**= (Equal to)**: Both numbers are the same
- Example: 500 = 500 (same value)

## RULES

1. All numbers 0-1000 range
2. Use <, >, = symbols correctly
3. Show place value reasoning (H→T→O)
4. Include number line positioning
5. Ordering: smallest to largest (5 numbers)
6. Real-world comparison contexts
7. Answer key with explanations
8. Colored backgrounds Q1-Q5
9. Year 3 appropriate (ages 7-8)
10. Clear visual hierarchy

## PLACE VALUE COMPARISON STRATEGY

**Example: Compare 567 and 489**
1. **Hundreds**: 5 vs 4 → 5 > 4
2. Stop here! 567 > 489 (because 5H > 4H)

**Example: Compare 456 and 423**
1. **Hundreds**: 4 vs 4 → same
2. **Tens**: 5 vs 2 → 5 > 2
3. 456 > 423 (because 5T > 2T)

**Example: Compare 456 and 453**
1. **Hundreds**: 4 vs 4 → same
2. **Tens**: 5 vs 5 → same
3. **Ones**: 6 vs 3 → 6 > 3
4. 456 > 453 (because 6O > 3O)

## NUMBER LINE EXAMPLES

0----100----200----300----400----500----600----700----800----900----1000

- 0 = start
- 250 = quarter way
- 500 = halfway
- 750 = three-quarters
- 1000 = end

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: 3 comparison pairs with <, >, = symbols?
- [ ] Q2: Order 5 numbers (smallest to largest)?
- [ ] Q3: Place value reasoning with H|T|O breakdown?
- [ ] Q4: Number line positioning (0-1000)?
- [ ] Q5: Real-world comparison word problem?
- [ ] All numbers 0-1000 range?
- [ ] Comparison symbols used correctly?
- [ ] Place value explanations clear?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full reasoning?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
