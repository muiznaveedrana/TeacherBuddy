# Y3: Three-Digit Addition & Subtraction ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. 3-digit add/sub with regrouping.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS:
{{METHOD_SPEC}}
{{NUMBER_RANGE}}
{{REGROUP_SPEC}}
{{CONTEXT}}
{{VISUAL_MODE}}

## YEAR 3 FOCUS (Ages 7-8)
- **Number range**: 100-999 (three-digit numbers)
- **Operations**: Addition and subtraction with column method
- **Key skill**: Regrouping (carrying/borrowing) across H|T|O
- **Mental strategies**: Add/subtract hundreds, tens mentally
- **Representations**: Column layout, base-10 blocks, bar models
- **Example**: 456 + 267 = 723 (regroup ones to tens)

## QUESTION TYPES

**Q1: Column/Visual Addition**
- `column-add-regroup-ones`: Regroup from ones to tens (e.g., 456 + 237)
- `column-add-regroup-tens`: Regroup from tens to hundreds (e.g., 347 + 280)
- `base10-visual-add`: Show with hundreds flats, tens rods, ones cubes
- `place-value-add`: Add using place value partitioning

**Q2: Column/Visual Subtraction**
- `column-sub-borrow-ones`: Borrow from tens to ones (e.g., 456 - 229)
- `column-sub-borrow-tens`: Borrow from hundreds to tens (e.g., 534 - 267)
- `column-sub-zeros`: Subtraction with zeros (e.g., 500 - 234)
- `base10-visual-sub`: Show with base-10 blocks exchange

**Q3: Mental Calculation**
- `mental-add-hundreds`: Add hundreds mentally (e.g., 456 + 300)
- `mental-sub-hundreds`: Subtract hundreds (e.g., 678 - 200)
- `mental-add-tens`: Add tens mentally (e.g., 456 + 40)
- `number-line-mental`: Use number line for mental calculation

**Q4: Mixed/Reasoning**
- `mixed-operations-4problems`: 4 mixed add/sub problems
- `inverse-operations`: Check with inverse (456 + 267 = 723, so 723 - 267 = 456)
- `missing-numbers`: Find missing addend/subtrahend
- `comparison-problems`: Which is bigger? 456 + 123 or 500 + 50?

**Q5: Word Problem**
- `word-problem-money`: UK money context (coins and pounds)
- `word-problem-shopping`: Shopping scenario with prices
- `word-problem-multi-step`: Two-step problem
- `word-problem-bar-model`: Visual bar model representation

## NUMBER RANGES
- **Easy**: 200-400 (smaller numbers, less regrouping)
- **Average**: 300-600 (moderate regrouping)
- **Hard**: 500-900 (more complex regrouping, larger numbers)
- **Rule**: All sums ≤ 1000, differences ≥ 0

## REGROUPING SPECIFICATIONS
- **No regrouping**: Straightforward column addition/subtraction
- **Regroup once**: One exchange (e.g., ones to tens)
- **Regroup twice**: Two exchanges (e.g., ones to tens AND tens to hundreds)
- **With zeros**: Special attention to borrowing from zero

## CONTEXTS & IMAGES

### Money (EMPHASIZE THIS for Q5)
UK coin images available:
```
/images/WORKSHEET_OBJECTS/money/UK-coins/£2 heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/£2 tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/£1 heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/£1 tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/50p heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/50p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/20p heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/20p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/10p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/5p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/2p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/1p tails col - TRF.png
```

### Other Contexts
- **School**: `/images/WORKSHEET_OBJECTS/counting/school_supplies/[item].png`
- **Toys**: `/images/WORKSHEET_OBJECTS/counting/toys/[item].png`
- **Animals**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/[item].png`

## COLOR SCHEME (Year 3 Enhanced)
- **Hundreds**: #FF9800 (orange)
- **Tens**: #2196F3 (blue)
- **Ones**: #4CAF50 (green)
- **Addition**: #4CAF50 (green)
- **Subtraction**: #FF5722 (red-orange)
- **Money**: #FFD700 (gold)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.column-container{display:inline-block;border:3px solid #333;padding:18px 25px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:monospace;font-size:24pt;line-height:1.6;margin:15px auto;box-shadow:2px 2px 5px rgba(0,0,0,0.1)}
.column-number{margin:5px 0;letter-spacing:8px}
.column-operator{margin:5px 0;text-align:left;color:#2196F3;font-weight:bold}
.column-line{border-top:4px solid #333;margin:8px 0}
.column-answer{margin:5px 0;font-weight:bold;color:#1976D2}
.place-value-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.pv-breakdown{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}
.pv-box{padding:15px 20px;border:3px solid;border-radius:8px;background:#FFF;text-align:center;min-width:100px}
.pv-box.hundreds{border-color:#FF9800;color:#FF9800}
.pv-box.tens{border-color:#2196F3;color:#2196F3}
.pv-box.ones{border-color:#4CAF50;color:#4CAF50}
.pv-label{font-size:14pt;font-weight:bold;margin-bottom:8px}
.pv-value{font-size:32pt;font-weight:bold}
.base10-container{display:flex;justify-content:center;gap:25px;margin:18px 0;flex-wrap:wrap;padding:18px;background:#FFF3E0;border-radius:8px}
.base10-group{text-align:center;margin:10px}
.base10-label{font-size:16pt;font-weight:bold;margin-bottom:10px}
.base10-label.h{color:#F57C00}
.base10-label.t{color:#1976D2}
.base10-label.o{color:#2E7D32}
.base10-blocks{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:400px;margin:10px 0}
.block-hundred{width:100px;height:100px;background:#FF9800;border:3px solid #F57C00;border-radius:6px;margin:4px;position:relative;display:inline-block}
.block-hundred::after{content:'100';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:24pt;font-weight:bold;color:#FFF}
.block-ten{width:100px;height:20px;background:#2196F3;border:2px solid #1565C0;border-radius:3px;margin:3px;display:inline-block}
.block-one{width:20px;height:20px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;margin:2px;display:inline-block}
.mental-calc-container{margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.mental-calc{text-align:center;margin:15px 0;padding:18px;background:#FFF;border:2px dashed #4CAF50;border-radius:8px}
.calc-step{font-size:18pt;margin:10px 0;font-weight:600;color:#2E7D32}
.step-highlight{background:#E8F5E9;padding:5px 12px;border-radius:6px;color:#2E7D32;font-weight:bold}
.number-line-container{margin:18px 0;padding:18px;background:#E8F5E9;border-radius:8px}
.number-line{position:relative;height:100px;margin:30px 20px;background:#FFF;border-radius:8px;padding:20px 10px}
.number-line-track{position:absolute;bottom:30px;left:5%;right:5%;height:6px;background:#4CAF50;border-radius:3px}
.jump-arrow{position:absolute;bottom:45px;height:40px;border-left:3px dashed #FF9800;border-right:3px dashed #FF9800;border-top:3px solid #FF9800;border-radius:8px 8px 0 0}
.jump-label{position:absolute;top:-25px;left:50%;transform:translateX(-50%);background:#FF9800;color:#FFF;padding:4px 10px;border-radius:6px;font-size:14pt;font-weight:bold;white-space:nowrap}
.bar-model-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px}
.bar-model-label{font-size:16pt;font-weight:bold;margin:10px 0;color:#7B1FA2}
.bar{display:flex;margin:15px 0;border:3px solid #333;border-radius:6px;overflow:hidden}
.bar-segment{height:60px;display:flex;align-items:center;justify-content:center;font-size:18pt;font-weight:bold;color:white;border-right:3px solid #333}
.bar-segment:last-child{border-right:none}
.bar-segment.part1{background:#9C27B0;flex:1}
.bar-segment.part2{background:#7B1FA2;flex:1}
.bar-segment.whole{background:#6A1B9A;width:100%}
.bar-question{font-size:16pt;margin:12px 0;color:#4A148C;font-weight:600}
.word-problem-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.problem-text{font-size:17pt;line-height:1.7;margin:12px 0}
.money-display{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin:15px 0;padding:15px;background:#FFF;border-radius:8px}
.coin-group{display:flex;gap:10px;align-items:center;margin:10px;padding:12px;background:#FFF9C4;border:2px solid #FFD700;border-radius:8px}
.coin-image{width:50px;height:50px;object-fit:contain}
.coin-count{font-size:16pt;font-weight:bold;color:#F57C00}
.mixed-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.mini-problem{padding:15px;background:white;border:3px solid #333;border-radius:8px;text-align:center}
.mini-problem .equation{font-size:20pt;font-weight:bold;margin:12px 0;color:#E91E63}
.mini-problem .answer-space{margin:10px 0}
.inverse-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.inverse-pair{display:flex;justify-content:center;align-items:center;gap:20px;margin:20px 0;flex-wrap:wrap}
.inverse-equation{padding:15px 20px;background:#FFF;border:3px solid #2196F3;border-radius:8px;font-size:22pt;font-weight:bold;color:#1976D2}
.arrow-symbol{font-size:32pt;color:#FF9800}
.missing-number-container{margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.missing-equation{font-size:28pt;font-weight:bold;text-align:center;margin:20px 0}
.missing-box{display:inline-block;min-width:100px;height:60px;border:3px dashed #4CAF50;border-radius:8px;background:#E8F5E9;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:60px;text-align:center}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:100px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:150px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Column Addition with Regrouping (Ones to Tens)
```
  4 5 6
+ 2 3 7
-------
  6 9 3
```
**Working**:
1. Ones: 6 + 7 = 13 (write 3, carry 1 ten)
2. Tens: 5 + 3 + 1 = 9
3. Hundreds: 4 + 2 = 6

### Column Subtraction with Borrowing
```
  5 3 4
- 2 6 7
-------
  2 6 7
```
**Working**:
1. Ones: Can't do 4 - 7, borrow 1 ten (14 - 7 = 7)
2. Tens: Now 2 tens, can't do 2 - 6, borrow 1 hundred (12 - 6 = 6)
3. Hundreds: Now 4 hundreds (4 - 2 = 2)

### Mental Addition (Hundreds)
```
456 + 300 = ?

Step 1: Keep 456
Step 2: Add 3 hundreds → 756
Answer: 756
```

### Bar Model (Word Problem)
```
Emma had £456. She earned £267 more. How much now?

[  456  ] [  267  ]
[       ?        ]

456 + 267 = 723
Answer: £723
```

## RULES

1. Follow {{METHOD_SPEC}} rotation exactly
2. Use {{NUMBER_RANGE}} specified (100-999, sums ≤1000)
3. Apply {{REGROUP_SPEC}} requirements
4. Use {{CONTEXT}} for Q5 word problems
5. Match {{VISUAL_MODE}} for representations
6. NO hints/labels in student questions
7. Show full working in answer key
8. EMPHASIZE UK money problems in Q5
9. Colored backgrounds: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0
10. Year 3 appropriate (ages 7-8)
11. Column method should be clearly formatted
12. Base-10 blocks color-coded (H=orange, T=blue, O=green)
13. All calculations must be accurate
14. Answer key must show step-by-step working

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Column/visual addition matching METHOD_SPEC?
- [ ] Q2: Column/visual subtraction matching METHOD_SPEC?
- [ ] Q3: Mental calculation strategy shown?
- [ ] Q4: Mixed/reasoning problems included?
- [ ] Q5: Word problem with appropriate CONTEXT?
- [ ] All numbers within NUMBER_RANGE (100-999)?
- [ ] REGROUP_SPEC requirements met?
- [ ] Column layouts properly formatted?
- [ ] Base-10 blocks shown where specified?
- [ ] Bar models included for word problems?
- [ ] UK money context emphasized in Q5?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full working?
- [ ] All calculations correct?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
