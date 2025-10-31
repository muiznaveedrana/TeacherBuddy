# Y4: Fraction-Decimal Conversion ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Convert between fractions and decimal tenths.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Converting**: Fractions (tenths) ↔ Decimals
- **Key equivalents**: 1/10 = 0.1, 5/10 = 0.5, 1/2 = 0.5
- **Understanding**: Same value, different notation
- **Counting**: In both forms (1/10, 2/10, 3/10... OR 0.1, 0.2, 0.3...)

## QUESTION TYPES

**Q1**: Fraction to decimal. Convert tenths to decimal form.

**Q2**: Decimal to fraction. Convert decimals to fraction form.

**Q3**: Mixed conversions. Both directions in one question.

**Q4**: Ordering mixed numbers. Order fractions and decimals together.

**Q5**: Word problem. "Tom ran 0.7 km. Emma ran 6/10 km. Who ran further?"

## KEY CONVERSIONS (Year 4)

### Tenths to Decimals
- 1/10 = 0.1
- 2/10 = 0.2
- 3/10 = 0.3
- 4/10 = 0.4
- 5/10 = 0.5
- 6/10 = 0.6
- 7/10 = 0.7
- 8/10 = 0.8
- 9/10 = 0.9
- 10/10 = 1.0

### Special Equivalents
- 1/2 = 5/10 = 0.5
- 1/4 = 0.25 (introduced in Year 4)
- 3/4 = 0.75 (introduced in Year 4)

## CONVERSION METHODS

### Fraction → Decimal (for tenths)
**Method**: The numerator becomes the digit after decimal point
- 7/10 → 0.7 (7 is in tenths place)
- 3/10 → 0.3 (3 is in tenths place)

### Decimal → Fraction (for tenths)
**Method**: Digit after point becomes numerator, 10 is denominator
- 0.4 → 4/10 (4 tenths)
- 0.9 → 9/10 (9 tenths)

## COLOR SCHEME (Year 4 Enhanced)
- **Fractions**: #9C27B0 (purple)
- **Decimals**: #2196F3 (blue)
- **Conversion arrows**: #FF9800 (orange)
- **Equivalent**: #4CAF50 (green) - showing they're equal
- **Visual models**: Multi-colored tenths

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.conversion-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.conversion-title{font-size:18pt;font-weight:bold;color:#6A1B9A;margin-bottom:18px;text-align:center}
.conversion-pair{display:flex;justify-content:center;align-items:center;gap:30px;margin:30px 0;flex-wrap:wrap}
.fraction-box{padding:25px 35px;background:#E1BEE7;border:4px solid #9C27B0;border-radius:8px;min-width:150px}
.fraction-large{font-size:52pt;font-weight:bold;color:#6A1B9A;text-align:center}
.frac-num{display:block;padding-bottom:10px;border-bottom:6px solid #9C27B0}
.frac-den{display:block;padding-top:10px}
.decimal-box{padding:25px 35px;background:#BBDEFB;border:4px solid #2196F3;border-radius:8px;font-size:52pt;font-weight:bold;color:#1565C0;text-align:center;font-family:'Courier New',monospace;min-width:150px}
.conversion-arrow{font-size:48pt;font-weight:bold}
.arrow-right{color:#FF9800}
.arrow-left{color:#4CAF50}
.arrow-both{color:#E91E63}
.visual-model{margin:25px 0;padding:20px;background:#E8F5E9;border-radius:8px}
.model-title{font-size:17pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.tenths-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;max-width:600px;margin:20px auto}
.tenth-square{height:60px;border:3px solid #333;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14pt}
.sq-shaded{background:#4CAF50;color:#FFF}
.sq-unshaded{background:#FFF;color:#999}
.labels-row{display:flex;justify-content:space-between;max-width:600px;margin:15px auto;padding:0 10px}
.label-fraction{font-size:19pt;font-weight:bold;color:#9C27B0}
.label-decimal{font-size:19pt;font-weight:bold;color:#2196F3}
.ordering-exercise{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.ordering-title{font-size:18pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.numbers-to-order{display:flex;justify-content:center;gap:18px;margin:25px 0;flex-wrap:wrap}
.order-item{padding:20px 28px;background:#FFF;border:4px solid #FF9800;border-radius:8px;font-size:32pt;font-weight:bold;text-align:center}
.order-item.fraction{color:#9C27B0}
.order-item.decimal{color:#2196F3;font-family:'Courier New',monospace}
.ordering-boxes{display:flex;justify-content:center;gap:15px;margin:25px 0;flex-wrap:wrap}
.order-box{padding:18px 25px;border:3px dashed #FF9800;border-radius:8px;background:#FFF;min-width:120px;height:75px;text-align:center;font-size:28pt;font-weight:bold}
.conversion-table{width:100%;max-width:700px;margin:25px auto;border-collapse:separate;border-spacing:0;border:3px solid #2196F3;border-radius:8px;overflow:hidden}
.table-header{background:#2196F3;color:#FFF;font-size:19pt;font-weight:bold;padding:15px;text-align:center}
.table-row{border-bottom:2px solid #E3F2FD}
.table-cell{padding:18px 25px;text-align:center;font-size:24pt;font-weight:bold;border-right:2px solid #E3F2FD}
.table-cell:last-child{border-right:none}
.cell-fraction{color:#9C27B0}
.cell-decimal{color:#2196F3;font-family:'Courier New',monospace}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:55px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:55px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:90px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Fraction → Decimal: 7/10
**Method**: Numerator goes after decimal point
**Answer**: 0.7

### Decimal → Fraction: 0.4
**Method**: 4 in tenths place = 4/10
**Answer**: 4/10

### Ordering: 0.3, 1/2, 0.6, 3/10
**Convert all to decimals**:
- 0.3 = 0.3
- 1/2 = 0.5
- 0.6 = 0.6
- 3/10 = 0.3

**Order**: 0.3 = 3/10 < 1/2 < 0.6
**Answer**: 3/10, 0.3, 1/2, 0.6

### Word Problem: 0.7 km vs 6/10 km
**Convert to same form**:
- 0.7 = 7/10
- 6/10 = 6/10

**Compare**: 7/10 > 6/10
**Answer**: Tom ran further (0.7 km > 6/10 km)

## CONVERSION TABLE (Year 4 Reference)

| Fraction | Decimal | Visual |
|----------|---------|--------|
| 1/10 | 0.1 | [▓]░░░░░░░░░ |
| 2/10 | 0.2 | [▓▓]░░░░░░░░ |
| 3/10 | 0.3 | [▓▓▓]░░░░░░░ |
| 4/10 | 0.4 | [▓▓▓▓]░░░░░░ |
| 5/10 = 1/2 | 0.5 | [▓▓▓▓▓]░░░░░ |
| 6/10 | 0.6 | [▓▓▓▓▓▓]░░░░ |
| 7/10 | 0.7 | [▓▓▓▓▓▓▓]░░░ |
| 8/10 | 0.8 | [▓▓▓▓▓▓▓▓]░░ |
| 9/10 | 0.9 | [▓▓▓▓▓▓▓▓▓]░ |
| 10/10 = 1 | 1.0 | [▓▓▓▓▓▓▓▓▓▓] |

## RULES

1. Focus on tenths conversions
2. Show both directions (fraction ↔ decimal)
3. Use visual tenths models
4. Include ordering exercises mixing both forms
5. Connect to 1/2 = 0.5 (key equivalent)
6. Real-world comparisons
7. Answer key with full conversions
8. Colored backgrounds Q1-Q5
9. Year 4 appropriate (ages 8-9)
10. Color-code fractions (purple) vs decimals (blue)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Fraction to decimal conversions?
- [ ] Q2: Decimal to fraction conversions?
- [ ] Q3: Mixed conversions (both directions)?
- [ ] Q4: Ordering mixed fractions and decimals?
- [ ] Q5: Real-world comparison word problem?
- [ ] Visual tenths models shown?
- [ ] Both conversion directions included?
- [ ] Key equivalents (1/2 = 0.5) highlighted?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with conversions?
- [ ] Year 4 appropriate?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
