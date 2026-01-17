# Ages 8-9: Fractions Greater Than 1 (MIXED LAYOUT)

**CRITICAL: EXACTLY 5 questions across 3 sections. Improper fractions and mixed numbers.**

## MIXED LAYOUT STRUCTURE (MANDATORY)
- **Section A - Fluency (Q1-Q2)**: Basic improper/mixed conversion
- **Section B - Application (Q3-Q4)**: Multi-step or context problems
- **Section C - Reasoning (Q5)**: Explain, compare, or prove

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9) - NCETM Unit 9
- **Improper fractions**: Numerator ≥ denominator (5/4, 7/3, 9/5)
- **Mixed numbers**: Whole number + fraction (1 1/4, 2 1/3, 1 4/5)
- **Converting**: Improper ↔ mixed numbers
- **Adding fractions**: Results greater than 1
- **Number line**: Represent fractions > 1

## VISUAL REPRESENTATIONS (CRITICAL)

### Improper Fraction Visual
```
5/4 = [■■■■] [■□□□] = 1 whole + 1/4 = 1 1/4
       full    1/4
```

### Number Line
```
0----1/4----2/4----3/4----1----5/4----6/4----7/4----2
                          ↑
                         5/4 = 1 1/4
```

### Fraction Bar Visual
```
7/4 = ▓▓▓▓ + ▓▓▓□ = 1 + 3/4 = 1 3/4
      full   3/4
```

## CONVERSION METHODS

### Improper → Mixed Number
**Method**: Divide numerator by denominator
- 7/4: 7 ÷ 4 = 1 remainder 3 → 1 3/4
- 9/5: 9 ÷ 5 = 1 remainder 4 → 1 4/5
- 11/3: 11 ÷ 3 = 3 remainder 2 → 3 2/3

### Mixed Number → Improper
**Method**: (Whole × denominator) + numerator / denominator
- 1 3/4: (1 × 4) + 3 = 7 → 7/4
- 2 1/5: (2 × 5) + 1 = 11 → 11/5
- 3 2/3: (3 × 3) + 2 = 11 → 11/3

## QUESTION TYPES (MIXED LAYOUT)

### Section A - Fluency (Q1-Q2)

**Q1**: Visual recognition with bars/circles.
"How much pizza is shown? Write as an improper fraction AND a mixed number."
Show: 1 full circle + 3/4 of another
Answer: 7/4 = 1 3/4

**Q2**: Direct conversion practice.
"Convert these improper fractions to mixed numbers:"
a) 5/4 = ____    b) 7/3 = ____    c) 9/2 = ____

### Section B - Application (Q3-Q4)

**Q3**: Multi-step calculation.
"Add these fractions. Write your answer as a mixed number."
3/4 + 3/4 = ____
(Working: 3/4 + 3/4 = 6/4 = 1 2/4 = 1 1/2)

**Q4**: Context problem with visual.
"Maya ate 5/6 of one cake and 4/6 of another. How much cake did she eat altogether?"
Show cake visuals.
Answer: 5/6 + 4/6 = 9/6 = 1 3/6 = 1 1/2

### Section C - Reasoning (Q5)

**Q5**: Comparison and explanation.
"Ella says 11/4 is greater than 3. Tom says it's less than 3. Who is correct? Explain how you know."
OR
"Place these fractions on the number line: 5/4, 7/4, 10/4, 2"
OR
"Is 2 1/4 larger or smaller than 10/4? Prove it."

## YEAR 4 APPROPRIATE FRACTIONS

### Common Improper Fractions
- **Halves**: 3/2, 5/2, 7/2
- **Quarters**: 5/4, 7/4, 9/4, 11/4
- **Thirds**: 4/3, 5/3, 7/3, 8/3
- **Fifths**: 6/5, 7/5, 8/5, 9/5
- **Sixths**: 7/6, 8/6, 10/6, 11/6

### Avoid (Too Complex for Y4)
- Denominators > 12
- Improper fractions requiring 4+ wholes
- Complex simplifying

## CSS:
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.section{margin:20px 0;padding:15px;border:3px solid #333;border-radius:12px}
.section-title{font-size:20pt;font-weight:bold;margin-bottom:15px;padding:8px;border-radius:8px}
.section-a .section-title{background:#E3F2FD;color:#1565C0}
.section-b .section-title{background:#E8F5E9;color:#2E7D32}
.section-c .section-title{background:#FFF3E0;color:#E65100}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.fraction-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.fraction-visual{display:flex;align-items:center;justify-content:center;gap:20px;margin:20px 0;flex-wrap:wrap}
.whole-circle{width:100px;height:100px;border:4px solid #9C27B0;border-radius:50%;background:#9C27B0;display:flex;align-items:center;justify-content:center;color:#FFF;font-weight:bold;font-size:16pt}
.partial-circle{width:100px;height:100px;border:4px solid #9C27B0;border-radius:50%;background:conic-gradient(#9C27B0 0deg, #9C27B0 var(--fill), #FFF var(--fill), #FFF 360deg);display:flex;align-items:center;justify-content:center}
.fraction-bar-container{display:flex;gap:10px;align-items:center;justify-content:center;margin:20px 0}
.fraction-bar{width:120px;height:50px;border:3px solid #333;border-radius:8px;display:flex;overflow:hidden}
.bar-section{flex:1;border-right:2px solid #333;display:flex;align-items:center;justify-content:center}
.bar-section:last-child{border-right:none}
.shaded{background:#9C27B0;color:#FFF}
.unshaded{background:#FFF}
.equals-label{font-size:24pt;font-weight:bold;color:#333;margin:0 15px}
.conversion-box{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.conversion-title{font-size:18pt;font-weight:bold;color:#2E7D32;text-align:center;margin-bottom:15px}
.conversion-row{display:flex;align-items:center;justify-content:center;gap:15px;margin:15px 0;font-size:28pt;font-weight:bold}
.fraction-display{text-align:center}
.fraction-numerator{display:block;border-bottom:4px solid #333;padding-bottom:5px}
.fraction-denominator{display:block;padding-top:5px}
.mixed-number{display:flex;align-items:center;gap:8px}
.whole-part{font-size:36pt;color:#2E7D32}
.arrow-convert{font-size:32pt;color:#FF9800;margin:0 20px}
.number-line-container{margin:25px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.number-line{position:relative;height:80px;margin:30px 20px}
.number-line-bar{position:absolute;top:35px;left:0;right:0;height:6px;background:#333;border-radius:3px}
.number-line-tick{position:absolute;top:25px;width:4px;height:26px;background:#333;border-radius:2px}
.number-line-label{position:absolute;top:55px;transform:translateX(-50%);font-weight:bold;font-size:16pt}
.number-line-marker{position:absolute;top:5px;transform:translateX(-50%);font-size:20pt;color:#E91E63}
.addition-visual{margin:20px 0;padding:20px;background:#FCE4EC;border:3px solid #E91E63;border-radius:8px}
.addition-row{display:flex;align-items:center;justify-content:center;gap:15px;margin:15px 0;font-size:28pt;flex-wrap:wrap}
.plus-sign{font-size:36pt;color:#E91E63;font-weight:bold}
.story-problem-box{margin:20px 0;padding:20px;background:#FFF8E1;border:3px solid #FFC107;border-radius:8px}
.story-text{font-size:18pt;line-height:1.8;margin-bottom:20px}
.story-character{font-weight:bold;color:#F57C00}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:80px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:50px;text-align:center}
.answer-box-small{display:inline-block;min-width:60px;height:45px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:20pt;line-height:45px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:80px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic}
.reasoning-box{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.reasoning-prompt{font-size:18pt;font-weight:bold;color:#E65100;margin-bottom:15px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Converting 7/4 to Mixed Number
**Method**: 7 ÷ 4 = 1 remainder 3
**Answer**: 1 3/4 (1 whole and 3 quarters)

### Converting 2 1/3 to Improper Fraction
**Method**: (2 × 3) + 1 = 7
**Answer**: 7/3

### Adding 3/4 + 2/4
**Working**: 3/4 + 2/4 = 5/4 = 1 1/4
**Answer**: 1 1/4 (or 5/4)

## RULES (MANDATORY)

1. Visual representations for EVERY improper fraction
2. Show conversion method step-by-step
3. Number lines for comparing fractions > 1
4. Real-world contexts (pizza, cake, chocolate bars)
5. Always show both forms (improper AND mixed)
6. Year 4 appropriate denominators (2, 3, 4, 5, 6, 8, 10, 12)
7. Maximum 3 wholes for mixed numbers
8. Answer key with full working
9. Colored backgrounds for each section

## HTML STRUCTURE

```html
<div class="section section-a">
  <div class="section-title">Section A: Fluency</div>
  <!-- Q1 and Q2 -->
</div>

<div class="section section-b">
  <div class="section-title">Section B: Application</div>
  <!-- Q3 and Q4 -->
</div>

<div class="section section-c">
  <div class="section-title">Section C: Reasoning</div>
  <!-- Q5 -->
</div>
```

## VALIDATION

- [ ] EXACTLY 5 questions total?
- [ ] Section A has Q1-Q2 (Fluency)?
- [ ] Section B has Q3-Q4 (Application)?
- [ ] Section C has Q5 (Reasoning)?
- [ ] Visual representations for improper fractions?
- [ ] Conversion methods shown clearly?
- [ ] Number line included?
- [ ] Real-world word problem?
- [ ] Both improper and mixed forms required?
- [ ] Colored backgrounds for sections?
- [ ] Answer key with working?
- [ ] Year 4 appropriate (ages 8-9)?
- [ ] Denominators ≤ 12?

Generate complete HTML. UK Year 4 aligned (ages 8-9). NCETM Unit 9 focus.
