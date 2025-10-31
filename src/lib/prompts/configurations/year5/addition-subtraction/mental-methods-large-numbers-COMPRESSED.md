# Y5: Mental Methods for Large Numbers ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Use mental strategies to add/subtract numbers with more than 4 digits.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 5 FOCUS (Ages 9-10)
- **Number range**: Beyond 10,000 (up to 1,000,000)
- **Mental strategies**: Partitioning, compensation, using near multiples, counting on/back
- **Efficiency**: Choose appropriate method for the calculation
- **Estimation**: Use rounding to check reasonableness
- **Flexibility**: Adapt strategies to different number types

## QUESTION TYPES

**Q1**: Partitioning. "45,678 + 32,000 = ?" (Add thousands separately)

**Q2**: Compensation. "3,456 + 1,999 = ?" (Add 2,000, subtract 1)

**Q3**: Near multiples of 10/100/1000. "45,600 - 2,998 = ?"

**Q4**: Counting on for subtraction. "73,456 - 68,789 = ?" (Count from 68,789 to 73,456)

**Q5**: Word problem. "A stadium holds 56,789 people. 48,999 tickets sold. How many left?"

## MENTAL STRATEGIES (Year 5)

### 1. PARTITIONING

Break numbers into place value parts, calculate separately, recombine.

**Example: 45,678 + 23,456**

**Method**:
- Split: 45,678 = 40,000 + 5,000 + 600 + 70 + 8
- Split: 23,456 = 20,000 + 3,000 + 400 + 50 + 6
- Add thousands: 40,000 + 20,000 = 60,000
- Add thousands: 5,000 + 3,000 = 8,000
- Add hundreds: 600 + 400 = 1,000
- Add tens: 70 + 50 = 120
- Add ones: 8 + 6 = 14
- Combine: 60,000 + 8,000 + 1,000 + 120 + 14 = 69,134

**Answer**: 69,134

### 2. COMPENSATION

Add/subtract a near number, then adjust.

**Example: 45,678 + 9,999**

**Method**:
- Add 10,000 (easier): 45,678 + 10,000 = 55,678
- Adjust (subtract 1): 55,678 - 1 = 55,677

**Answer**: 55,677

**Example: 67,543 - 4,998**

**Method**:
- Subtract 5,000 (easier): 67,543 - 5,000 = 62,543
- Adjust (add 2): 62,543 + 2 = 62,545

**Answer**: 62,545

### 3. USING MULTIPLES OF 1000

Work with round thousands, then adjust.

**Example: 34,567 + 18,000**

**Method**:
- Add thousands directly: 34,567 + 18,000 = 52,567

**Answer**: 52,567

**Example: 125,000 - 45,678**

**Method**:
- From 125,000 take 45,000 = 80,000
- From 80,000 take 678 = 79,322

**Answer**: 79,322

### 4. COUNTING ON (for subtraction)

Count from smaller to larger number.

**Example: 73,456 - 68,789**

**Method**: Count from 68,789 to 73,456
- 68,789 to 69,000 = 211
- 69,000 to 73,000 = 4,000
- 73,000 to 73,456 = 456
- Total: 211 + 4,000 + 456 = 4,667

**Answer**: 4,667

### 5. ADDING THE NEAREST MULTIPLE

Round to nearest 10/100/1000, calculate, adjust.

**Example: 23,456 + 2,998**

**Method**:
- Round 2,998 to 3,000
- Add: 23,456 + 3,000 = 26,456
- Adjust: 26,456 - 2 = 26,454

**Answer**: 26,454

## CHOOSING THE RIGHT STRATEGY

### When to use PARTITIONING
- Numbers don't have obvious patterns
- Both numbers are "messy"
- Example: 34,567 + 28,493

### When to use COMPENSATION
- One number is close to a multiple of 10/100/1000
- Numbers ending in 99, 98, 101, 102, etc.
- Example: 45,678 + 9,999 or 67,890 - 4,998

### When to use COUNTING ON
- Numbers are close together
- Subtraction where difference is small
- Example: 50,123 - 47,889

### When to use MULTIPLES
- One number is a round thousand/ten-thousand
- Example: 45,678 + 30,000

## COLOR SCHEME (Year 5 Enhanced)

- **Partitioning**: #4CAF50 (green)
- **Compensation**: #FF9800 (orange)
- **Counting on**: #2196F3 (blue)
- **Near multiples**: #9C27B0 (purple)
- **Round numbers**: #E91E63 (pink)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:18pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:36px;height:36px;line-height:36px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:17pt}
.question-text{font-size:18pt;margin:8px 0;font-weight:600}
.partition-container{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.partition-title{font-size:19pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.partition-breakdown{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.partition-step{padding:18px 25px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;font-size:22pt;font-weight:600;font-family:'Courier New',monospace}
.step-label{display:block;font-size:16pt;color:#2E7D32;margin-bottom:10px;font-family:'Comic Sans MS',sans-serif}
.plus-recombine{text-align:center;font-size:36pt;color:#4CAF50;margin:15px 0}
.compensation-container{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.compensation-title{font-size:19pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.comp-steps{display:flex;flex-direction:column;gap:18px;margin:25px 0}
.comp-step{padding:18px 25px;background:#FFF;border:3px solid #FF9800;border-radius:8px}
.comp-main{font-size:28pt;font-weight:bold;color:#F57C00;font-family:'Courier New',monospace;text-align:center;margin:12px 0}
.comp-adjust{font-size:20pt;color:#E65100;text-align:center;margin-top:10px}
.comp-arrow{font-size:32pt;color:#FF9800;text-align:center;margin:12px 0}
.counting-on-container{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.counting-title{font-size:19pt;font-weight:bold;color:#1565C0;margin-bottom:18px;text-align:center}
.count-jumps{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.count-jump{padding:18px 25px;background:#FFF;border:3px solid #2196F3;border-radius:8px;display:flex;justify-content:space-between;align-items:center}
.jump-range{font-size:20pt;font-weight:600;color:#1976D2}
.jump-amount{font-size:28pt;font-weight:bold;color:#0D47A1;font-family:'Courier New',monospace}
.total-jump{padding:20px 30px;background:#BBDEFB;border:4px solid #1976D2;border-radius:8px;text-align:center;margin-top:20px}
.total-label{font-size:18pt;color:#0D47A1;margin-bottom:10px}
.total-value{font-size:36pt;font-weight:bold;color:#0D47A1;font-family:'Courier New',monospace}
.near-multiple-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.near-title{font-size:19pt;font-weight:bold;color:#7B1FA2;margin-bottom:18px;text-align:center}
.near-visual{display:flex;justify-content:center;align-items:center;gap:25px;margin:25px 0;flex-wrap:wrap}
.near-original{padding:20px 30px;background:#FFF;border:4px solid #9C27B0;border-radius:8px;font-size:32pt;font-weight:bold;color:#7B1FA2;font-family:'Courier New',monospace}
.near-arrow{font-size:40pt;color:#E91E63}
.near-rounded{padding:20px 30px;background:#E1BEE7;border:4px solid #7B1FA2;border-radius:8px;font-size:32pt;font-weight:bold;color:#6A1B9A;font-family:'Courier New',monospace}
.near-label{display:block;font-size:15pt;text-align:center;margin-top:10px;color:#7B1FA2}
.strategy-choice-container{margin:20px 0;padding:20px;background:#FCE4EC;border:3px solid #E91E63;border-radius:8px}
.strategy-title{font-size:19pt;font-weight:bold;color:#C2185B;margin-bottom:18px;text-align:center}
.strategy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin:25px 0}
.strategy-card{padding:18px;background:#FFF;border:3px solid #E91E63;border-radius:8px}
.strategy-name{font-size:18pt;font-weight:bold;color:#C2185B;margin-bottom:12px;text-align:center}
.strategy-when{font-size:16pt;color:#880E4F;line-height:1.6}
.strategy-example{font-size:17pt;font-weight:600;color:#E91E63;margin-top:10px;font-family:'Courier New',monospace;text-align:center}
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

### Partitioning: 45,678 + 32,456
**Break down**:
- 40,000 + 30,000 = 70,000
- 5,000 + 2,000 = 7,000
- 600 + 400 = 1,000
- 70 + 50 = 120
- 8 + 6 = 14

**Recombine**: 70,000 + 7,000 + 1,000 + 120 + 14 = 78,134

**Answer**: 78,134

### Compensation: 56,789 + 9,998
**Add 10,000**: 56,789 + 10,000 = 66,789
**Adjust -2**: 66,789 - 2 = 66,787

**Answer**: 66,787

### Counting On: 82,345 - 78,567
**78,567 to 79,000**: 433
**79,000 to 82,000**: 3,000
**82,000 to 82,345**: 345
**Total**: 433 + 3,000 + 345 = 3,778

**Answer**: 3,778

### Near Multiple: 45,678 - 19,997
**Subtract 20,000**: 45,678 - 20,000 = 25,678
**Adjust +3**: 25,678 + 3 = 25,681

**Answer**: 25,681

## ESTIMATION FOR CHECKING

### Rounding to nearest 1,000
**Question**: 45,678 + 32,456 = ?

**Estimate**:
- 45,678 ≈ 46,000
- 32,456 ≈ 32,000
- 46,000 + 32,000 = 78,000

**Actual**: 78,134 ✓ (Close to estimate!)

### Rounding to nearest 10,000
**Question**: 123,456 - 78,234 = ?

**Estimate**:
- 123,456 ≈ 120,000
- 78,234 ≈ 80,000
- 120,000 - 80,000 = 40,000

**Actual**: 45,222 ✓ (Reasonably close!)

## RULES

1. Choose strategy based on the numbers
2. Use compensation for numbers near multiples
3. Partition when no obvious pattern
4. Count on when numbers are close
5. Always estimate to check reasonableness
6. Show working/thinking process
7. Practice multiple strategies for flexibility
8. Answer key with strategy explanation
9. Colored backgrounds Q1-Q5
10. Year 5 appropriate (ages 9-10)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Partitioning with large numbers?
- [ ] Q2: Compensation strategy?
- [ ] Q3: Near multiples of 10/100/1000?
- [ ] Q4: Counting on for subtraction?
- [ ] Q5: Real-world word problem?
- [ ] Multiple strategies demonstrated?
- [ ] Numbers beyond 10,000?
- [ ] Strategy choice guidance included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with strategy explanations?
- [ ] Year 5 appropriate?

Generate complete HTML. UK Year 5 aligned (ages 9-10).
