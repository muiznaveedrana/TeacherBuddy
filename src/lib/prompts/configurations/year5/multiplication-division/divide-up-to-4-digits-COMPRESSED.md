# Y5: Divide up to 4-digit by 1-digit ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Divide numbers up to 4 digits by one-digit using formal written methods with remainders.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 5 FOCUS (Ages 9-10)
- **Format**: ThHTO ÷ O (up to 4 digits ÷ 1 digit)
- **Method**: Short division (bus stop method)
- **Remainders**: Express as whole number remainders
- **Examples**: 3,456 ÷ 7 or 8,234 ÷ 9
- **Checking**: Use multiplication to verify

## QUESTION TYPES

**Q1**: 3-digit ÷ 1-digit with remainder. "456 ÷ 8 = ?"

**Q2**: 4-digit ÷ 1-digit with no remainder. "2,436 ÷ 6 = ?"

**Q3**: 4-digit ÷ 1-digit with remainder. "7,896 ÷ 9 = ?"

**Q4**: Word problem. "5,432 pencils shared equally among 7 classes. How many each? How many left over?"

**Q5**: Multi-step problem. "Factory makes 8,456 toys in 8 days. Average per day? If packed in boxes of 9, how many boxes?"

## SHORT DIVISION METHOD (Bus Stop)

### Structure
```
      A n s w e r
    ---------------
  d ) D i v i d e n d
```

### Example: 456 ÷ 8

```
        5 7
      -----
    8 ) 4 5 6
```

**Step 1**: 4 ÷ 8 = 0 (can't divide, so combine with next digit)

**Step 2**: 45 ÷ 8 = 5 remainder 5
- Write 5 above
- Remainder 5 carries to next column

**Step 3**: 56 ÷ 8 = 7 remainder 0
- Write 7 above

**Answer**: 57

### With Remainders Shown

```
        5 7 r 0
      ---------
    8 ) 4 5 6
```

## MORE EXAMPLES

### Example: 2,436 ÷ 6

```
        4 0 6
      ---------
    6 ) 2 4 3 6
```

**Working**:
- 2 ÷ 6 = 0 (can't divide, carry to next)
- 24 ÷ 6 = 4 remainder 0
- 3 ÷ 6 = 0 remainder 3 (carry the 3)
- 36 ÷ 6 = 6 remainder 0

**Answer**: 406

### Example: 7,896 ÷ 9

```
        8 7 7 r 3
      -----------
    9 ) 7 8 9 6
```

**Working**:
- 7 ÷ 9 = 0 remainder 7 (carry 7)
- 78 ÷ 9 = 8 remainder 6
- 69 ÷ 9 = 7 remainder 6
- 66 ÷ 9 = 7 remainder 3

**Answer**: 877 remainder 3

### Example: 5,432 ÷ 7

```
        7 7 6 r 0
      -----------
    7 ) 5 4 3 2
```

**Working**:
- 5 ÷ 7 = 0 remainder 5
- 54 ÷ 7 = 7 remainder 5
- 53 ÷ 7 = 7 remainder 4
- 42 ÷ 7 = 6 remainder 0

**Answer**: 776

## CHECKING DIVISION WITH MULTIPLICATION

### Method: (Answer × Divisor) + Remainder = Original

**Example**: Check 456 ÷ 8 = 57 r 0

**Check**:
- 57 × 8 = 456
- 456 + 0 = 456 ✓ (Correct!)

**Example**: Check 7,896 ÷ 9 = 877 r 3

**Check**:
- 877 × 9 = 7,893
- 7,893 + 3 = 7,896 ✓ (Correct!)

## UNDERSTANDING REMAINDERS

### What is a remainder?

**Real-world example**: 17 sweets shared among 5 children
- 17 ÷ 5 = 3 remainder 2
- Each child gets 3 sweets
- 2 sweets left over

### Interpreting remainders in context

**Example 1**: "387 pupils, 8 per minibus. How many buses needed?"
- 387 ÷ 8 = 48 remainder 3
- Need 49 buses (must round UP to fit everyone)

**Example 2**: "£457 shared equally among 6 people. How much each?"
- 457 ÷ 6 = 76 remainder 1
- Each person gets £76
- £1 left over (or divide the penny!)

## COMMON MISTAKES TO AVOID

### 1. Forgetting to carry remainders
```
      4 0 6  ✓ CORRECT
    ---------
  6 ) 2 4 3 6

      4 0 0  ✗ WRONG
    ---------
  6 ) 2 4 3 6
```

### 2. Writing remainder in wrong place
```
  8 7 7 r 3  ✓ CORRECT (at the end)
  8 r 3 7 7  ✗ WRONG (in middle)
```

### 3. Not checking answer makes sense
- If dividing by 9, remainder must be 0-8
- Remainder of 9 or more means error!

## ESTIMATION FOR CHECKING

### Example: Check 7,896 ÷ 9 ≈ ?

**Round to nearest 1,000**:
- 7,896 ≈ 8,000
- 8,000 ÷ 9 ≈ 888

**Actual**: 877 r 3 ✓ (Close!)

### Example: Check 5,432 ÷ 7 ≈ ?

**Round to nearest 1,000**:
- 5,432 ≈ 5,600 (or 5,400)
- 5,600 ÷ 7 = 800

**Actual**: 776 ✓ (Reasonably close!)

## COLOR SCHEME (Year 5 Enhanced)

- **Dividend**: #2196F3 (blue)
- **Divisor**: #4CAF50 (green)
- **Quotient (answer)**: #9C27B0 (purple)
- **Remainder**: #FF9800 (orange)
- **Carry numbers**: #FF5722 (red)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:18pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:36px;height:36px;line-height:36px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:17pt}
.question-text{font-size:18pt;margin:8px 0;font-weight:600}
.division-container{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.div-title{font-size:19pt;font-weight:bold;color:#1565C0;margin-bottom:18px;text-align:center}
.bus-stop-y5{display:inline-block;border:4px solid #333;padding:30px 45px;border-radius:8px;background:#F5F5F5;font-family:'Courier New',monospace;font-size:34pt;margin:20px auto;box-shadow:4px 4px 10px rgba(0,0,0,0.15);position:relative}
.div-answer-y5{text-align:center;margin-bottom:20px;letter-spacing:18px;font-weight:bold;color:#7B1FA2}
.div-line-y5{border-top:6px solid #333;margin:15px 0}
.div-dividend-y5{text-align:center;letter-spacing:18px;margin-top:20px;font-weight:600;color:#1976D2}
.div-divisor-y5{position:absolute;left:-55px;top:50%;transform:translateY(-50%);font-size:36pt;font-weight:bold;color:#2E7D32}
.div-bracket{position:absolute;left:-25px;top:30%;height:50%;border-left:6px solid #333;border-top:6px solid #333;border-bottom:6px solid #333;width:20px;border-radius:8px 0 0 8px}
.remainder-display{display:inline-block;padding:8px 18px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px;color:#F57C00;font-weight:bold;margin-left:15px;font-size:28pt}
.step-by-step-div{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.sbs-div-title{font-size:19pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.sbs-div-steps{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.sbs-div-step{padding:18px 25px;background:#FFF;border:3px solid #4CAF50;border-radius:8px}
.sbs-div-label{font-size:17pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.sbs-div-calc{font-size:24pt;font-family:'Courier New',monospace;color:#1B5E20;margin:10px 0;text-align:center}
.sbs-div-explain{font-size:17pt;color:#555;margin-top:10px;line-height:1.6}
.carry-reminder{display:inline-block;padding:6px 12px;background:#FFCDD2;border:2px solid #F44336;border-radius:6px;font-size:16pt;color:#C62828;margin-left:10px}
.check-multiplication{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.check-title{font-size:19pt;font-weight:bold;color:#7B1FA2;margin-bottom:18px;text-align:center}
.check-formula{font-size:20pt;text-align:center;padding:15px;background:#E1BEE7;border:3px dashed #9C27B0;border-radius:8px;color:#4A148C;font-weight:600;margin:20px 0}
.check-working{font-size:24pt;font-family:'Courier New',monospace;text-align:center;padding:18px;background:#FFF;border:3px solid #9C27B0;border-radius:8px;margin:15px 0}
.check-result{font-size:28pt;font-weight:bold;text-align:center;padding:20px;background:#E1BEE7;border:4px solid #7B1FA2;border-radius:8px;color:#4A148C;margin-top:15px}
.check-verdict{font-size:22pt;font-weight:bold;text-align:center;padding:18px;background:#C8E6C9;color:#2E7D32;border:4px solid #4CAF50;border-radius:8px;margin-top:20px}
.remainder-context{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.context-title{font-size:19pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.context-example{padding:18px;background:#FFF;border:3px solid #FF9800;border-radius:8px;margin:18px 0}
.context-question{font-size:19pt;line-height:1.8;color:#F57C00;margin-bottom:15px}
.context-calc{font-size:26pt;font-family:'Courier New',monospace;text-align:center;padding:15px;background:#FFE082;border:3px solid #F57C00;border-radius:8px;margin:12px 0}
.context-interpret{font-size:18pt;color:#555;margin-top:15px;line-height:1.7}
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

### 3-digit ÷ 1-digit: 456 ÷ 8
```
        5 7
      -----
    8 ) 4 5 6
```
- 45 ÷ 8 = 5 r 5
- 56 ÷ 8 = 7 r 0

**Answer**: 57

**Check**: 57 × 8 = 456 ✓

### 4-digit ÷ 1-digit: 2,436 ÷ 6
```
        4 0 6
      ---------
    6 ) 2 4 3 6
```
- 24 ÷ 6 = 4 r 0
- 3 ÷ 6 = 0 r 3
- 36 ÷ 6 = 6 r 0

**Answer**: 406

**Check**: 406 × 6 = 2,436 ✓

### With remainder: 5,432 ÷ 7
```
        7 7 6
      ---------
    7 ) 5 4 3 2
```
- 54 ÷ 7 = 7 r 5
- 53 ÷ 7 = 7 r 4
- 42 ÷ 7 = 6 r 0

**Answer**: 776

**Check**: 776 × 7 = 5,432 ✓

## RULES

1. Set up bus stop correctly (divisor outside)
2. Work left to right through dividend
3. Carry remainders to next column
4. Write quotient above the line
5. Remainder at end (r 3, r 5, etc.)
6. Check: (answer × divisor) + remainder = original
7. Remainder must be less than divisor
8. Use monospace font for alignment
9. Colored backgrounds Q1-Q5
10. Year 5 appropriate (ages 9-10)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: 3-digit ÷ 1-digit with remainder?
- [ ] Q2: 4-digit ÷ 1-digit (no remainder)?
- [ ] Q3: 4-digit ÷ 1-digit with remainder?
- [ ] Q4: Word problem with sharing context?
- [ ] Q5: Multi-step problem?
- [ ] Bus stop method shown clearly?
- [ ] Remainders handled correctly?
- [ ] Checking with multiplication included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with working?
- [ ] Year 5 appropriate?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
