# Ages 8-9: Four-Digit Calculations

**CRITICAL: EXACTLY {{questionCount}} questions. Add/subtract 4-digit numbers using column method.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Number range**: 1000-9999 (four-digit numbers)
- **Operations**: Column addition and subtraction with regrouping
- **Key skills**: Multiple regrouping across Th|H|T|O
- **Checking**: Use inverse operations and estimation
- **Understanding**: When to regroup, why it works

## QUESTION TYPES

**Q1**: Column addition with regrouping. 4-digit + 4-digit (e.g., 5678 + 2345).

**Q2**: Column subtraction with borrowing. 4-digit - 4-digit (e.g., 7654 - 3287).

**Q3**: Mixed calculations. Both addition and subtraction problems.

**Q4**: Missing number problems. Find the missing addend/subtrahend.

**Q5**: Word problem. Real-world context requiring 4-digit calculation.

## COLUMN METHOD (Year 4)

### Addition with Regrouping
```
    ¹ ¹ ¹
  5 6 7 8
+ 2 3 4 5
---------
  8 0 2 3
```
**Working**:
1. Ones: 8 + 5 = 13 (write 3, carry 1)
2. Tens: 7 + 4 + 1 = 12 (write 2, carry 1)
3. Hundreds: 6 + 3 + 1 = 10 (write 0, carry 1)
4. Thousands: 5 + 2 + 1 = 8

### Subtraction with Borrowing
```
  ⁶ ⁵ ¹⁴
  7̶ 6̶ 5̶ 4
- 3 2 8 7
---------
  4 3 6 7
```
**Working**:
1. Ones: Can't do 4 - 7, borrow → 14 - 7 = 7
2. Tens: Now 4 tens, can't do 4 - 8, borrow → 14 - 8 = 6
3. Hundreds: Now 5 hundreds → 5 - 2 = 3
4. Thousands: 6 - 3 = 4 (after borrowing)

## COLOR SCHEME (Year 4 Enhanced)
- **Addition**: #4CAF50 (green)
- **Subtraction**: #FF5722 (red-orange)
- **Carry numbers**: #FF5722 (red) - small, above
- **Borrow marks**: #E91E63 (pink) - strikethrough
- **Thousands**: #E91E63 (pink)
- **Hundreds**: #FF9800 (orange)
- **Tens**: #2196F3 (blue)
- **Ones**: #4CAF50 (green)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.column-container-y4{display:inline-block;border:4px solid #333;padding:20px 32px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:'Courier New',monospace;font-size:28pt;line-height:1.8;margin:20px auto;box-shadow:3px 3px 8px rgba(0,0,0,0.15);min-width:240px}
.column-number{margin:8px 0;letter-spacing:14px;font-weight:600}
.column-operator{margin:8px 0;text-align:left;font-weight:bold;font-size:26pt}
.column-operator.add{color:#4CAF50}
.column-operator.sub{color:#FF5722}
.column-line{border-top:5px solid #333;margin:12px 0}
.column-answer{margin:8px 0;font-weight:bold;color:#1976D2;min-height:45px}
.carry-number{font-size:16pt;color:#FF5722;position:relative;top:-18px;margin-right:6px;font-weight:bold;background:#FFF;padding:3px 6px;border-radius:4px;border:1px solid #FF5722}
.borrow-mark{font-size:14pt;color:#E91E63;position:relative;top:-14px;text-decoration:line-through;margin-right:5px}
.borrowed-number{font-size:20pt;color:#E91E63;font-weight:bold;background:#FFE0F0;padding:3px 8px;border-radius:4px}
.place-value-breakdown{margin:20px 0;padding:20px;background:#E3F2FD;border-radius:8px}
.pv-columns{display:flex;justify-content:center;gap:20px;margin:25px 0;flex-wrap:wrap}
.pv-column-box{text-align:center;padding:18px;background:#FFF;border:4px solid;border-radius:8px;min-width:120px}
.pv-column-box.th{border-color:#E91E63}
.pv-column-box.h{border-color:#FF9800}
.pv-column-box.t{border-color:#2196F3}
.pv-column-box.o{border-color:#4CAF50}
.pv-label{font-size:17pt;font-weight:bold;margin-bottom:12px}
.pv-value{font-size:36pt;font-weight:bold}
.mixed-grid-y4{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;margin:20px 0;padding:20px;background:#F1F8E9;border-radius:8px}
.calculation-box{padding:18px;background:#FFF;border:4px solid #333;border-radius:8px;text-align:center}
.missing-number-container-y4{margin:20px 0;padding:20px;background:#FCE4EC;border-radius:8px}
.missing-equation{font-size:36pt;font-weight:bold;text-align:center;margin:25px 0;font-family:'Courier New',monospace}
.missing-blank{display:inline-block;min-width:120px;height:70px;border-bottom:5px solid #E91E63;background:#FFF;vertical-align:baseline;margin:0 12px;text-align:center;line-height:70px}
.checking-container{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.check-title{font-size:18pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.check-pair{display:flex;justify-content:center;align-items:center;gap:30px;margin:25px 0;flex-wrap:wrap}
.check-calculation{padding:18px 28px;background:#FFF;border:4px solid #4CAF50;border-radius:8px;font-size:26pt;font-weight:bold;font-family:'Courier New',monospace;color:#2E7D32}
.check-arrow{font-size:42pt;color:#FF9800;font-weight:bold}
.word-problem-container-y4{margin:20px 0;padding:20px;background:#FFF3E0;border:3px dashed #FF9800;border-radius:8px}
.problem-scenario{font-size:18pt;line-height:1.8;margin:18px 0;padding:18px;background:#FFF;border-radius:6px}
.estimation-first{margin:20px 0;padding:18px;background:#E1F5FE;border:3px dashed #03A9F4;border-radius:8px}
.estimation-title{font-size:17pt;font-weight:bold;color:#01579B;margin-bottom:15px}
.estimation-step{padding:12px;margin:10px 0;background:#FFF;border-left:5px solid #03A9F4;border-radius:4px;font-size:17pt}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:55px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:55px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:140px;margin:0 10px;background:transparent}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:90px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
.answer-key .carry-note{color:#FF5722;font-weight:bold;background:#FFE0DD;padding:3px 10px;border-radius:4px}
.answer-key .borrow-note{color:#E91E63;font-weight:bold;background:#FFE0F0;padding:3px 10px;border-radius:4px}
</style>
```

## WORKED EXAMPLES

### Example 1: Addition (5678 + 2345 = 8023)
```
    ¹ ¹ ¹
  5 6 7 8
+ 2 3 4 5
---------
  8 0 2 3
```
- Ones: 8 + 5 = 13 (carry 1)
- Tens: 7 + 4 + 1 = 12 (carry 1)
- Hundreds: 6 + 3 + 1 = 10 (carry 1)
- Thousands: 5 + 2 + 1 = 8

### Example 2: Subtraction (7654 - 3287 = 4367)
```
  ⁶ ⁵ ¹⁴
  7̶ 6̶ 5̶ 4
- 3 2 8 7
---------
  4 3 6 7
```
- Ones: 14 - 7 = 7 (borrowed from tens)
- Tens: 14 - 8 = 6 (borrowed from hundreds, after being reduced to 4)
- Hundreds: 5 - 2 = 3 (after being reduced by borrowing)
- Thousands: 6 - 3 = 4 (after being reduced by borrowing)

### Example 3: Checking with Inverse
**Original**: 5678 + 2345 = 8023
**Check**: 8023 - 2345 = 5678 ✓

### Example 4: Estimation First
**Problem**: 5678 + 2345
**Estimate**: 6000 + 2000 = 8000
**Actual**: 8023 ✓ (close to estimate!)

### Example 5: Word Problem
**Problem**: A school raised £3456 in a summer fair and £2789 in an autumn fair. How much in total?

**Solution**:
```
    ¹ ¹ ¹
  3 4 5 6
+ 2 7 8 9
---------
  6 2 4 5
```
**Answer**: £6245

## RULES

1. All numbers 1000-9999 (four-digit range)
2. Use formal column method
3. Show all carrying and borrowing clearly
4. Monospace font for perfect alignment
5. Include checking with inverse operations
6. Estimation encouraged before calculating
7. Real-world UK money contexts
8. Answer key must show ALL working
9. Colored backgrounds Q1-Q5
10. Year 4 appropriate (ages 8-9)
11. Multiple regrouping expected

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: 4-digit addition with regrouping?
- [ ] Q2: 4-digit subtraction with borrowing?
- [ ] Q3: Mixed addition and subtraction?
- [ ] Q4: Missing number problems?
- [ ] Q5: Real-world word problem?
- [ ] All numbers 1000-9999?
- [ ] Column layouts perfectly aligned (monospace)?
- [ ] Carry/borrow notation shown clearly?
- [ ] Checking methods included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full working?
- [ ] Year 4 appropriate complexity?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
