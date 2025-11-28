# Ages 9-10: Checking Strategies

**CRITICAL: EXACTLY {{questionCount}} questions. Use rounding, estimation, and inverse operations to check calculations.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 5 FOCUS (Ages 9-10)
- **Estimation**: Round to nearest 10, 100, 1000, 10000
- **Inverse operations**: Use subtraction to check addition (and vice versa)
- **Reasonableness**: Does the answer make sense?
- **Error spotting**: Identify mistakes in calculations
- **Multiple checks**: Use different strategies to verify

## QUESTION TYPES

**Q1**: Estimate first, then calculate. "Estimate: 45,678 + 32,456. Then calculate exactly. Is your estimate close?"

**Q2**: Use inverse to check. "Calculate 67,890 - 23,456. Check using addition."

**Q3**: Spot the error. "Sam calculated 45,678 + 12,345 = 58,013. Is this correct? If not, what's the error?"

**Q4**: Multiple checking methods. Use two different ways to verify an answer.

**Q5**: Word problem with checking. Calculate and verify using estimation.

## ESTIMATION STRATEGIES

### Rounding to Nearest 1,000

**Example: 45,678 + 32,456**

**Round each number**:
- 45,678 ≈ 46,000 (nearest 1,000)
- 32,456 ≈ 32,000 (nearest 1,000)

**Estimate**:
- 46,000 + 32,000 = 78,000

**Actual**:
- 45,678 + 32,456 = 78,134 ✓ (Very close!)

### Rounding to Nearest 10,000

**Example: 123,456 - 78,234**

**Round each number**:
- 123,456 ≈ 120,000 (nearest 10,000)
- 78,234 ≈ 80,000 (nearest 10,000)

**Estimate**:
- 120,000 - 80,000 = 40,000

**Actual**:
- 123,456 - 78,234 = 45,222 ✓ (Reasonably close)

### Front-End Estimation

Use only the leading digits for a quick estimate.

**Example: 67,890 + 23,456**

**Front-end method**:
- 67,000 + 23,000 = 90,000

**Actual**:
- 67,890 + 23,456 = 91,346 ✓ (Close enough for checking)

## INVERSE OPERATIONS

### Checking Addition with Subtraction

**Calculation**: 45,678 + 32,456 = 78,134

**Check using subtraction**:
- 78,134 - 32,456 = 45,678 ✓ (Correct!)
- OR: 78,134 - 45,678 = 32,456 ✓

### Checking Subtraction with Addition

**Calculation**: 67,890 - 23,456 = 44,434

**Check using addition**:
- 44,434 + 23,456 = 67,890 ✓ (Correct!)

## REASONABLENESS CHECKS

### Does it make sense?

**Question**: "A school has 2,345 pupils. 876 leave. How many left?"

**Calculation**: 2,345 - 876 = 1,469

**Reasonableness checks**:
- Is the answer smaller than 2,345? ✓ (Yes - subtraction reduces)
- Is it bigger than 1,500? ✓ (Roughly - since we took away less than 1,000)
- Makes sense!

**Wrong answer example**: 2,345 - 876 = 3,221 ✗

**Reasonableness**: 3,221 is BIGGER than 2,345. Impossible! Subtraction should make it smaller.

### Order of magnitude

**Question**: 45,678 + 32,456 = ?

**Rough estimate**:
- Both numbers are around 40,000 and 30,000
- 40,000 + 30,000 = 70,000
- Answer should be around 70,000-80,000

**If answer was 7,813**: ✗ Too small! (Missing a zero?)
**If answer was 781,340**: ✗ Too big! (Extra zero?)
**If answer was 78,134**: ✓ Right magnitude!

## ERROR SPOTTING

### Common errors to look for

**1. Place value mistakes**
```
  45678
+ 32456
-------
  58013  ✗ (Should be 78,134)
```
Error: Forgot to carry or misaligned

**2. Subtraction borrowing errors**
```
  67890
- 23456
-------
  44544  ✗ (Should be 44,434)
```
Error: Borrowing mistake

**3. Calculation errors**
```
45,678 + 12,345 = 58,013  ✗
```
Check: 58,013 - 12,345 = 45,668 ✗ (Not 45,678!)

Actual: 45,678 + 12,345 = 58,023 ✓

## MULTIPLE CHECKING METHODS

### Example: Verify 123,456 + 67,890 = 191,346

**Method 1 - Estimation (round to 10,000)**:
- 120,000 + 70,000 = 190,000 ✓ (Close!)

**Method 2 - Inverse operation**:
- 191,346 - 67,890 = 123,456 ✓ (Correct!)

**Method 3 - Add in different order**:
- 67,890 + 123,456 = 191,346 ✓ (Same answer!)

**Method 4 - Partition and check**:
- 120,000 + 60,000 = 180,000
- 3,000 + 7,000 = 10,000
- 400 + 800 = 1,200
- 50 + 90 = 140
- 6 + 0 = 6
- Total: 180,000 + 10,000 + 1,200 + 140 + 6 = 191,346 ✓

## COLOR SCHEME (Year 5 Enhanced)

- **Estimation**: #FF9800 (orange)
- **Inverse check**: #4CAF50 (green)
- **Correct**: #2196F3 (blue)
- **Incorrect/Error**: #F44336 (red)
- **Reasonableness**: #9C27B0 (purple)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:18pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:36px;height:36px;line-height:36px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:17pt}
.question-text{font-size:18pt;margin:8px 0;font-weight:600}
.estimate-container{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.estimate-title{font-size:19pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.estimate-steps{display:flex;flex-direction:column;gap:18px;margin:25px 0}
.estimate-step{padding:18px 25px;background:#FFF;border:3px solid #FF9800;border-radius:8px}
.step-heading{font-size:18pt;font-weight:bold;color:#F57C00;margin-bottom:12px}
.rounded-number{font-size:26pt;font-weight:bold;font-family:'Courier New',monospace;text-align:center;padding:12px;background:#FFE082;border:2px solid #F57C00;border-radius:6px;margin:10px 0}
.estimate-calc{font-size:30pt;font-weight:bold;text-align:center;color:#E65100;margin:15px 0;font-family:'Courier New',monospace}
.estimate-result{font-size:34pt;font-weight:bold;text-align:center;padding:20px;background:#FFE082;border:4px solid #F57C00;border-radius:8px;color:#E65100;font-family:'Courier New',monospace;margin:15px 0}
.actual-calc{font-size:28pt;font-weight:bold;text-align:center;padding:18px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px;color:#1976D2;font-family:'Courier New',monospace;margin:15px 0}
.comparison{font-size:19pt;text-align:center;padding:15px;background:#C8E6C9;border:3px solid #4CAF50;border-radius:8px;color:#2E7D32;font-weight:600;margin-top:15px}
.inverse-container{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.inverse-title{font-size:19pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.original-calc{padding:20px;background:#FFF;border:4px solid #4CAF50;border-radius:8px;margin:20px 0}
.calc-label{font-size:17pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.calc-display{font-size:32pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace;color:#1B5E20;padding:15px;background:#C8E6C9;border:3px solid #4CAF50;border-radius:6px}
.inverse-arrow{font-size:40pt;text-align:center;color:#4CAF50;margin:20px 0}
.check-calc{padding:20px;background:#FFF;border:4px solid #4CAF50;border-radius:8px}
.check-result{font-size:30pt;font-weight:bold;text-align:center;padding:20px;background:#A5D6A7;border:4px solid#2E7D32;border-radius:8px;color:#1B5E20;font-family:'Courier New',monospace;margin-top:15px}
.check-verdict{font-size:22pt;font-weight:bold;text-align:center;padding:18px;margin-top:20px;border-radius:8px}
.verdict-correct{background:#C8E6C9;color:#2E7D32;border:4px solid #4CAF50}
.verdict-incorrect{background:#FFCDD2;color:#C62828;border:4px solid #F44336}
.error-container{margin:20px 0;padding:20px;background:#FFEBEE;border:3px solid #F44336;border-radius:8px}
.error-title{font-size:19pt;font-weight:bold;color:#C62828;margin-bottom:18px;text-align:center}
.error-calc{padding:20px;background:#FFF;border:4px solid #F44336;border-radius:8px;margin:20px 0}
.error-display{font-size:30pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace;padding:18px;background:#FFCDD2;border:3px solid #F44336;border-radius:6px;color:#C62828;text-decoration:line-through}
.error-reason{font-size:18pt;padding:15px;background:#FFF9C4;border:3px dashed #FF9800;border-radius:6px;color:#F57C00;font-weight:600;margin-top:15px}
.correct-calc{padding:20px;background:#FFF;border:4px solid #4CAF50;border-radius:8px;margin:20px 0}
.correct-display{font-size:30pt;font-weight:bold;text-align:center;font-family:'Courier New',monospace;padding:18px;background:#C8E6C9;border:3px solid #4CAF50;border-radius:6px;color:#2E7D32}
.multiple-checks-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.multiple-title{font-size:19pt;font-weight:bold;color:#7B1FA2;margin-bottom:18px;text-align:center}
.check-method{padding:18px;background:#FFF;border:3px solid #9C27B0;border-radius:8px;margin:18px 0}
.method-name{font-size:18pt;font-weight:bold;color:#7B1FA2;margin-bottom:12px}
.method-calc{font-size:24pt;font-family:'Courier New',monospace;text-align:center;padding:12px;background:#E1BEE7;border:2px solid #9C27B0;border-radius:6px;margin:10px 0}
.method-result{font-size:20pt;text-align:center;color:#4A148C;font-weight:600;margin-top:10px}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:18pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:140px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:26pt;line-height:60px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:120px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:15pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:22pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:16pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Estimate then Calculate: 45,678 + 32,456

**Estimation (nearest 1,000)**:
- 45,678 ≈ 46,000
- 32,456 ≈ 32,000
- Estimate: 46,000 + 32,000 = 78,000

**Actual Calculation**:
- 45,678 + 32,456 = 78,134

**Check**: 78,134 is very close to 78,000 ✓

### Inverse Check: 67,890 - 23,456 = 44,434

**Check using addition**:
- 44,434 + 23,456 = 67,890 ✓ (Correct!)

### Error Spotting: 45,678 + 12,345 = 58,013

**Check by estimation**:
- 46,000 + 12,000 = 58,000
- Answer given: 58,013 (Seems close...)

**Check by inverse**:
- 58,013 - 12,345 = 45,668 ✗ (Not 45,678!)

**Error found**: Should be 58,023, not 58,013

## RULES

1. Always estimate before calculating
2. Use inverse operations to verify
3. Check if answer is reasonable
4. Look for common errors (place value, borrowing)
5. Use multiple checking methods for important calculations
6. Round sensibly (to 10, 100, 1000, 10000)
7. Show all checking working
8. Answer key with multiple checking methods
9. Colored backgrounds Q1-Q5
10. Year 5 appropriate (ages 9-10)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Estimate first, then calculate?
- [ ] Q2: Use inverse operation to check?
- [ ] Q3: Spot the error question?
- [ ] Q4: Multiple checking methods?
- [ ] Q5: Word problem with verification?
- [ ] Estimation strategies explained?
- [ ] Inverse operations demonstrated?
- [ ] Reasonableness checks included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with all checking methods shown?
- [ ] Year 5 appropriate?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
