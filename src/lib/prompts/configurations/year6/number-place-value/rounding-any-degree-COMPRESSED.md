# Y6: Rounding to Any Degree of Accuracy ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Round any whole number to a required degree of accuracy.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 6 FOCUS (Ages 10-11, SATs Level)
- **Flexibility**: Round to nearest 10, 100, 1000, 10000, 100000, 1000000
- **Any number**: Up to 10,000,000
- **Decision making**: Choose appropriate degree of rounding
- **SATs reasoning**: Explain rounding choices
- **Applications**: Estimating, approximating, real-world contexts

## QUESTION TYPES

**Q1**: Round to specified place. "Round 4,567,892 to the nearest 100,000."

**Q2**: Multiple roundings. Round same number to nearest 10, 100, 1000.

**Q3**: Choose appropriate rounding. "Population 3,456,789. Round appropriately for a newspaper headline."

**Q4**: Reverse rounding (SATs). "Number rounds to 5,000 (nearest 1000). What could it be?"

**Q5**: Word problem. "Budget £4,567,890. Round to nearest £100,000 for presentation."

## ROUNDING RULES (Year 6 Mastery)

### The Rule
Look at the digit to the RIGHT of the rounding place:
- If **< 5**: round DOWN (keep digit same)
- If **≥ 5**: round UP (increase digit by 1)

### All digits to the right become zeros!

## ROUNDING TO DIFFERENT PLACES

### Nearest 10
**Example: 3,456,789**

Look at **ones** digit: 9
- 9 ≥ 5, so round UP

**Answer**: 3,456,790

### Nearest 100
**Example: 3,456,789**

Look at **tens** digit: 8
- 8 ≥ 5, so round UP

**Answer**: 3,456,800

### Nearest 1,000
**Example: 3,456,789**

Look at **hundreds** digit: 7
- 7 ≥ 5, so round UP

**Answer**: 3,457,000

### Nearest 10,000
**Example: 3,456,789**

Look at **thousands** digit: 6
- 6 ≥ 5, so round UP

**Answer**: 3,460,000

### Nearest 100,000
**Example: 3,456,789**

Look at **ten thousands** digit: 5
- 5 ≥ 5, so round UP

**Answer**: 3,500,000

### Nearest 1,000,000
**Example: 3,456,789**

Look at **hundred thousands** digit: 4
- 4 < 5, so round DOWN

**Answer**: 3,000,000

## CHOOSING APPROPRIATE ROUNDING (SATs Focus)

### When to round to nearest 10
- Precise estimates needed
- Small numbers
- Example: "Class size: 28 pupils" → 30

### When to round to nearest 100
- Medium-sized numbers
- Rough estimates
- Example: "School size: 487 pupils" → 500

### When to round to nearest 1,000
- Large numbers
- General approximations
- Example: "Town population: 12,456" → 12,000

### When to round to nearest 100,000
- Very large numbers
- Newspaper headlines
- Example: "Country population: 5,678,900" → 5,700,000

## REVERSE ROUNDING (SATs Reasoning)

### Example: "Number rounds to 3,000 (nearest 1,000). What could it be?"

**Range**: 2,500 to 3,499

**Explanation**:
- 2,499 would round to 2,000
- 2,500 rounds to 3,000 (exactly halfway, round up)
- 3,499 rounds to 3,000
- 3,500 would round to 4,000

**Possible answers**: 2,500, 2,501, 2,502... 3,498, 3,499

### Example: "Number rounds to 50,000 (nearest 10,000)"

**Range**: 45,000 to 54,999

## ROUNDING ON NUMBER LINES

### Visualizing 3,456 rounded to nearest 1,000

```
3,000      3,456      4,000
  |----------|----------|
        ↑
    Closer to 3,000
    (456 < 500)

Answer: 3,000
```

### Visualizing 3,678 rounded to nearest 1,000

```
3,000      3,678      4,000
  |----------|----------|
              ↑
         Closer to 4,000
         (678 > 500)

Answer: 4,000
```

## ROUNDING CHAINS (Year 6 Advanced)

### Example: 4,567,892

| Rounding to | Look at | Decision | Result |
|-------------|---------|----------|--------|
| Nearest 10 | 2 | Down | 4,567,890 |
| Nearest 100 | 9 | Up | 4,567,900 |
| Nearest 1,000 | 8 | Up | 4,568,000 |
| Nearest 10,000 | 7 | Up | 4,570,000 |
| Nearest 100,000 | 6 | Up | 4,600,000 |
| Nearest 1,000,000 | 5 | Up | 5,000,000 |

## COLOR SCHEME (Year 6 Enhanced)

- **Rounding place**: #E91E63 (pink) - highlighted
- **Decision digit**: #FF5722 (red) - critical
- **Rounded UP**: #4CAF50 (green)
- **Rounded DOWN**: #2196F3 (blue)
- **Number lines**: #9C27B0 (purple)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:19pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:18pt}
.question-text{font-size:19pt;margin:8px 0;font-weight:600}
.rounding-container{margin:20px 0;padding:20px;background:#FCE4EC;border:3px solid #E91E63;border-radius:8px}
.rounding-title{font-size:20pt;font-weight:bold;color:#C2185B;margin-bottom:18px;text-align:center}
.number-to-round{font-size:56pt;font-weight:bold;text-align:center;margin:25px 0;font-family:'Courier New',monospace}
.digit-highlight{display:inline-flex;gap:6px;justify-content:center;margin:20px 0}
.digit{padding:12px 18px;border:3px solid #333;border-radius:6px;background:#FFF;font-size:48pt;font-weight:bold;font-family:'Courier New',monospace}
.digit.rounding-place{background:#FCE4EC;border-color:#E91E63;transform:scale(1.15)}
.digit.decision{background:#FFCDD2;border-color:#F44336;transform:scale(1.2);animation:pulse 2s infinite}
.rounding-instruction{font-size:20pt;text-align:center;padding:18px;background:#FFF9C4;border:3px dashed #FF9800;border-radius:8px;margin:20px 0;font-weight:600;color:#F57C00}
.rounding-result{font-size:60pt;font-weight:bold;text-align:center;padding:25px;margin:25px 0;border-radius:10px}
.result-up{background:#C8E6C9;color:#2E7D32;border:5px solid #4CAF50}
.result-down{background:#BBDEFB;color:#1976D2;border:5px solid #2196F3}
.rounding-table{width:100%;max-width:800px;margin:25px auto;border-collapse:separate;border-spacing:0;border:4px solid #333;border-radius:8px;overflow:hidden}
.table-header-round{background:#E91E63;color:#FFF;font-size:19pt;font-weight:bold;padding:15px;text-align:center}
.table-row-round{border-bottom:3px solid #E0E0E0}
.table-cell-round{padding:18px 20px;text-align:center;font-size:22pt;font-weight:bold;border-right:3px solid #E0E0E0}
.table-cell-round:last-child{border-right:none}
.number-line-round{position:relative;height:150px;margin:35px 20px;background:#FFF;border-radius:8px;padding:40px 20px}
.line-track-round{position:absolute;bottom:60px;left:5%;right:5%;height:10px;background:#9C27B0;border-radius:5px}
.line-marker-round{position:absolute;bottom:45px;width:4px;height:40px;background:#333}
.marker-value-round{position:absolute;top:50px;font-size:18pt;font-weight:bold;white-space:nowrap}
.number-position{position:absolute;bottom:0;width:20px;height:20px;background:#E91E63;border-radius:50%;border:4px solid #C2185B}
.reverse-round-container{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.reverse-title{font-size:20pt;font-weight:bold;color:#1565C0;margin-bottom:18px;text-align:center}
.reverse-question{font-size:20pt;padding:20px;background:#FFF;border:3px dashed #2196F3;border-radius:8px;color:#0D47A1;margin:20px 0;text-align:center}
.range-display{font-size:32pt;font-weight:bold;text-align:center;padding:25px;background:#BBDEFB;border:4px solid #1976D2;border-radius:8px;margin:20px 0;font-family:'Courier New',monospace}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:19pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:150px;height:65px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:28pt;line-height:65px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:120px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:16pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:24pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:17pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
@keyframes pulse{0%,100%{transform:scale(1.2)}50%{transform:scale(1.3)}}
</style>
```

## WORKED EXAMPLES

### Round 4,567,892 to nearest 100,000
**Look at**: Ten thousands digit = 6
**Decision**: 6 ≥ 5, so round UP
**Answer**: 4,600,000

### Round 3,234,567 to multiple places
- Nearest 10: 3,234,570 (look at 7, round up)
- Nearest 100: 3,234,600 (look at 6, round up)
- Nearest 1,000: 3,235,000 (look at 5, round up)

### Reverse: Rounds to 5,000 (nearest 1,000)
**Range**: 4,500 to 5,499
**Examples**: 4,500, 4,789, 5,123, 5,499

## RULES

1. Look at digit to the RIGHT of rounding place
2. < 5 = round down, ≥ 5 = round up
3. Replace all digits to right with zeros
4. Can round to any place value
5. Choose appropriate degree for context
6. Reverse rounding: find range of possibilities
7. SATs: explain rounding choices
8. Answer key with full working
9. Colored backgrounds Q1-Q5
10. Year 6 SATs appropriate

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Round to specified large place value?
- [ ] Q2: Multiple roundings of same number?
- [ ] Q3: Choose appropriate degree of rounding?
- [ ] Q4: Reverse rounding (SATs reasoning)?
- [ ] Q5: Real-world application?
- [ ] All place values covered (10 to 1,000,000)?
- [ ] Rounding chains shown?
- [ ] Number lines included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with explanations?
- [ ] Year 6 SATs appropriate?

Generate complete HTML. UK Year 6 aligned (ages 10-11, SATs level).
