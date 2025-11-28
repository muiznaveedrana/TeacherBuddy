# Ages 9-10: Multiply up to 4-digit by 1-digit

**CRITICAL: EXACTLY {{questionCount}} questions. Multiply numbers up to 4 digits by one-digit using formal written methods.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 5 FOCUS (Ages 9-10)
- **Format**: ThHTO × O (up to 4 digits × 1 digit)
- **Method**: Short multiplication with carrying
- **Examples**: 3,456 × 7 or 8,234 × 9
- **Fluency**: Recall all times tables to 12×12
- **Checking**: Estimate to verify answer

## QUESTION TYPES

**Q1**: 3-digit × 1-digit. "456 × 8 = ?"

**Q2**: 4-digit × 1-digit. "2,345 × 6 = ?"

**Q3**: 4-digit × 1-digit with multiple carrying. "7,896 × 9 = ?"

**Q4**: Word problem. "A cinema has 8 screens. Each holds 456 people. Total capacity?"

**Q5**: Multi-step problem. "School has 6 classes of 34 pupils each. Each pupil needs 8 books. How many books total?"

## SHORT MULTIPLICATION METHOD (Year 5)

### Structure
```
    Th  H  T  O
       3  4  5  6
    ×        7
    -------------
    2  4  1  9  2
```

### Example: 3,456 × 7

**Step 1**: Ones (6 × 7 = 42)
- Write 2
- Carry 4

**Step 2**: Tens (5 × 7 = 35, plus carried 4 = 39)
- Write 9
- Carry 3

**Step 3**: Hundreds (4 × 7 = 28, plus carried 3 = 31)
- Write 1
- Carry 3

**Step 4**: Thousands (3 × 7 = 21, plus carried 3 = 24)
- Write 24

**Answer**: 24,192

### Visual with Carrying
```
      ³ ³ ⁴
    3 4 5 6
  ×       7
  ---------
  2 4 1 9 2
```

## MORE EXAMPLES

### Example: 2,789 × 4

```
    ¹ ³ ³
  2 7 8 9
×       4
---------
1 1 1 5 6
```

**Working**:
- 9 × 4 = 36 (write 6, carry 3)
- 8 × 4 = 32, +3 = 35 (write 5, carry 3)
- 7 × 4 = 28, +3 = 31 (write 1, carry 3)
- 2 × 4 = 8, +3 = 11

**Answer**: 11,156

### Example: 5,678 × 9

```
    ⁷ ⁶ ⁶
  5 6 7 8
×       9
---------
5 1 1 0 2
```

**Working**:
- 8 × 9 = 72 (write 2, carry 7)
- 7 × 9 = 63, +7 = 70 (write 0, carry 7)
- 6 × 9 = 54, +6 = 60 (write 0, carry 6... wait, it was +7 not +6!)
- Let me recalculate...

```
    ⁷ ⁷ ⁶
  5 6 7 8
×       9
---------
5 1 1 0 2
```

**Correct Working**:
- 8 × 9 = 72 (write 2, carry 7)
- 7 × 9 = 63, +7 = 70 (write 0, carry 7)
- 6 × 9 = 54, +7 = 61 (write 1, carry 6)
- 5 × 9 = 45, +6 = 51

**Answer**: 51,102

## ESTIMATION FOR CHECKING

### Example: Check 3,456 × 7 = 24,192

**Round to nearest 1,000**:
- 3,456 ≈ 3,000
- 3,000 × 7 = 21,000

**Actual**: 24,192 ✓ (Reasonably close!)

### Example: Check 5,678 × 9 = 51,102

**Round to nearest 1,000**:
- 5,678 ≈ 6,000
- 6,000 × 9 = 54,000

**Actual**: 51,102 ✓ (Close enough!)

## GRID METHOD (Alternative for Understanding)

### Example: 456 × 7

Split 456 into 400 + 50 + 6

| × | 400 | 50 | 6 |
|---|-----|-----|-----|
| 7 | 2,800 | 350 | 42 |

**Add**: 2,800 + 350 + 42 = 3,192

**Answer**: 3,192

## COMMON MISTAKES TO AVOID

### 1. Forgetting to carry
```
  3 4 5 6
×       7
---------
  2 1 3 5 2  ✗ WRONG
```
Error: Didn't add carried numbers

### 2. Misaligning place values
```
3 4 5 6
    × 7
-------
 2 4 1 9 2  ✗ WRONG (misaligned)
```

### 3. Carry number in wrong place
Always write small carry number above the NEXT column to the left

## COLOR SCHEME (Year 5 Enhanced)

- **Original number**: #2196F3 (blue)
- **Multiplier**: #4CAF50 (green)
- **Carry numbers**: #FF5722 (red)
- **Final answer**: #9C27B0 (purple)
- **Working area**: #F5F5F5 (light grey)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:18pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:36px;height:36px;line-height:36px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:17pt}
.question-text{font-size:18pt;margin:8px 0;font-weight:600}
.multiplication-container{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.mult-title{font-size:19pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.mult-column-y5{display:inline-block;border:4px solid #333;padding:25px 40px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:'Courier New',monospace;font-size:34pt;line-height:2;margin:20px auto;box-shadow:4px 4px 10px rgba(0,0,0,0.15)}
.mult-number-y5{margin:10px 0;letter-spacing:18px;font-weight:600;color:#1976D2}
.mult-operator{margin:10px 0;text-align:left;font-weight:bold;font-size:32pt}
.times-symbol{color:#4CAF50;margin-right:15px}
.multiplier-digit{color:#2E7D32;letter-spacing:18px}
.mult-line-y5{border-top:6px solid #333;margin:15px 0}
.mult-answer-y5{margin:10px 0;font-weight:bold;color:#7B1FA2;letter-spacing:18px}
.carry-number-mult{font-size:18pt;color:#FF5722;position:relative;top:-22px;margin-right:8px;font-weight:bold;background:#FFF;padding:4px 8px;border-radius:4px;border:2px solid #FF5722}
.step-by-step-mult{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.sbs-title{font-size:19pt;font-weight:bold;color:#1565C0;margin-bottom:18px;text-align:center}
.sbs-steps{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.sbs-step{padding:18px 25px;background:#FFF;border:3px solid #2196F3;border-radius:8px}
.sbs-label{font-size:17pt;font-weight:bold;color:#1976D2;margin-bottom:10px}
.sbs-calc{font-size:24pt;font-family:'Courier New',monospace;color:#0D47A1;margin:10px 0;text-align:center}
.sbs-explain{font-size:17pt;color:#555;margin-top:10px;line-height:1.6}
.grid-method-container{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.grid-title{font-size:19pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.grid-table{width:100%;max-width:500px;margin:25px auto;border-collapse:collapse;border:4px solid #F57C00}
.grid-cell{padding:18px;text-align:center;font-size:24pt;font-weight:bold;border:3px solid #F57C00}
.grid-header{background:#FFE082;color:#E65100}
.grid-multiplier{background:#FFE082;color:#E65100}
.grid-product{background:#FFF;color:#F57C00;font-family:'Courier New',monospace}
.grid-sum{font-size:26pt;text-align:center;margin:20px 0;font-weight:bold;color:#E65100}
.grid-total{font-size:32pt;font-weight:bold;text-align:center;padding:20px;background:#FFE082;border:4px solid #F57C00;border-radius:8px;color:#E65100;font-family:'Courier New',monospace;margin-top:15px}
.word-problem-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.wp-title{font-size:19pt;font-weight:bold;color:#7B1FA2;margin-bottom:18px;text-align:center}
.wp-text{font-size:19pt;line-height:1.9;color:#4A148C;background:#FFF;padding:20px;border:3px dashed #9C27B0;border-radius:8px;margin-bottom:20px}
.wp-setup{font-size:24pt;text-align:center;font-weight:bold;color:#7B1FA2;margin:20px 0}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:18pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:140px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:26pt;line-height:60px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:140px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:15pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:22pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:16pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### 3-digit × 1-digit: 456 × 8
```
    ⁴ ⁴
  4 5 6
×     8
-------
3 6 4 8
```
- 6 × 8 = 48 (write 8, carry 4)
- 5 × 8 = 40, +4 = 44 (write 4, carry 4)
- 4 × 8 = 32, +4 = 36

**Answer**: 3,648

### 4-digit × 1-digit: 2,345 × 6
```
    ² ³ ²
  2 3 4 5
×       6
---------
1 4 0 7 0
```
- 5 × 6 = 30 (write 0, carry 3)
- 4 × 6 = 24, +3 = 27 (write 7, carry 2)
- 3 × 6 = 18, +2 = 20 (write 0, carry 2)
- 2 × 6 = 12, +2 = 14

**Answer**: 14,070

### With checking: 7,896 × 9
**Estimate**: 8,000 × 9 = 72,000

```
    ⁸ ⁸ ⁸
  7 8 9 6
×       9
---------
7 1 0 6 4
```

**Actual**: 71,064 ✓ (Close to estimate!)

## RULES

1. Line up place values correctly
2. Start from ones column (right)
3. Multiply each digit by the multiplier
4. Remember to add carried numbers
5. Write carry numbers small above next column
6. Check with estimation
7. Use monospace font for alignment
8. Answer key with full working
9. Colored backgrounds Q1-Q5
10. Year 5 appropriate (ages 9-10)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: 3-digit × 1-digit multiplication?
- [ ] Q2: 4-digit × 1-digit multiplication?
- [ ] Q3: 4-digit with multiple carrying?
- [ ] Q4: Real-world word problem?
- [ ] Q5: Multi-step problem?
- [ ] Column method shown clearly?
- [ ] Carry numbers displayed?
- [ ] Estimation for checking included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with working?
- [ ] Year 5 appropriate?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
