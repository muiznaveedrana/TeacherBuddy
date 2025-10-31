# Y2: Word Problems ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## SPECS (Injected):
{{PROBLEM_TYPE_SPEC}}
{{CONTEXT}}
{{VISUAL_SUPPORT}}
{{OPERATIONS}}
{{NUMBER_RANGE}}

<!-- DEBUG: Check injection above -->

## PROBLEM TYPES

**RESULT-UNKNOWN**: "Emma has 15 stickers. Gets 8 more. How many now?" (start+change=?)
**PART-UNKNOWN**: "Tom had some marbles. Gave 12 away. Has 9 left. How many at start?" (?-change=result)
**CHANGE-UNKNOWN**: "Sarah has 23 pencils. Needs 35 total. How many more?" (start+?=result)
**COMPARISON**: "Class A: 28 books, Class B: 17 books. How many more?" (difference)
**TWO-STEP**: "Shop had 45 apples. Sold 18 morning, 12 afternoon. How many left?" (18+12, then 45-30)

## Q SPECS (Use {{PROBLEM_TYPE_SPEC}}):

**Q1**: result-unknown-addition|result-unknown-objects|result-unknown-money|result-unknown-bar-model
**Q2**: part-unknown-subtraction|change-unknown-addition|comparison-difference|result-unknown-subtraction
**Q3**: comparison-bar-model|change-unknown-subtraction|part-unknown-addition|result-unknown-mixed
**Q4**: two-step-add-subtract|two-step-subtract-add|two-step-add-add|two-step-comparison
**Q5**: challenge-three-step|challenge-comparison-complex|challenge-money-change|challenge-open-ended

## VISUAL SUPPORT (Use {{VISUAL_SUPPORT}}):
bar-model-full | bar-model-simple | bar-model-blank | pictures-with-bar | pictures-only | pure-text

## CONTEXTS (Use {{CONTEXT}}):
**school**: `/images/WORKSHEET_OBJECTS/counting/school_supplies/[pencil|book|eraser|crayon].png`
**toys**: `/images/WORKSHEET_OBJECTS/counting/toys/[ball|car|doll|teddy].png`
**food-fruits**: `/images/WORKSHEET_OBJECTS/counting/fruits/[apple|banana|orange].png`
**food-treats**: `/images/WORKSHEET_OBJECTS/counting/food_treats/[cookie|cupcake].png`
**animals**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/[chicken|cow|sheep|pig].png`

**money-pence**: ⚠️ CRITICAL - Copy paths EXACTLY as shown:
  - 1p: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png`
  - 2p: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png`
  - 5p: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png`
  - 10p: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png`
  - 20p heads: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png`
  - 20p tails: `/images/WORKSHEET_OBJECTS/money/UK coins/20p tails col - TRF.png`
  - 50p heads: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png`
  - 50p tails: `/images/WORKSHEET_OBJECTS/money/UK coins/50p tails col - TRF.png`

⚠️ DO NOT invent paths. DO NOT change capitalization. DO NOT remove "heads/tails".

## RANGES (Use {{NUMBER_RANGE}}):
**Easy:10-30** | **Average:20-50** | **Hard:30-99**

## CSS (Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:20px;line-height:1.8}
.question{margin:25px 0;padding:25px;border-radius:10px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:12px;font-weight:bold;font-size:16pt}
.question-text{font-size:18pt;margin:10px 0;font-weight:600;line-height:1.6}
.bar-model-container{margin:25px 0;padding:20px;background:#F5F5F5;border-radius:10px;border:2px solid #ddd}
.bar-model-title{font-size:15pt;font-weight:bold;margin-bottom:15px;color:#1976D2;text-align:center}
.bar-full{display:flex;border:3px solid #333;border-radius:6px;overflow:hidden;margin:15px auto;max-width:500px}
.bar-section{padding:20px 15px;font-size:18pt;font-weight:bold;text-align:center;border-right:3px solid #333;min-width:80px;display:flex;align-items:center;justify-content:center}
.bar-section:last-child{border-right:none}
.bar-section.known{background:#4CAF50;color:white}
.bar-section.unknown{background:white;color:#333;border:3px dashed #FF5722}
.bar-label{text-align:center;margin-top:10px;font-size:14pt;color:#555}
.comparison-bars{margin:20px 0}
.comparison-bar{margin:15px 0}
.comparison-label{font-size:15pt;font-weight:bold;margin-bottom:8px;color:#1976D2}
.comparison-bar-visual{display:inline-block;height:40px;background:#FF9800;border:3px solid #F57C00;border-radius:6px;vertical-align:middle;margin-right:10px}
.comparison-amount{display:inline-block;vertical-align:middle;font-size:16pt;font-weight:bold}
.two-step-container{margin:20px 0;padding:15px;background:#E3F2FD;border-radius:8px;border:2px dashed #1976D2}
.step-box{margin:15px 0;padding:12px;background:white;border:2px solid #666;border-radius:6px}
.step-number{display:inline-block;width:30px;height:30px;background:#FF9800;color:white;border-radius:50%;text-align:center;line-height:30px;font-weight:bold;margin-right:10px}
.step-text{font-size:15pt;font-weight:600}
.context-visual{margin:20px 0;padding:15px;background:#FFF9C4;border:3px dashed #FF9800;border-radius:10px;text-align:center}
.object-group{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:15px 0}
.object-group img{width:45px;height:45px}
.money-visual{margin:20px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.coin-group{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:15px 0}
.coin-group img{width:50px;height:50px}
.money-label{font-size:15pt;font-weight:bold;margin:10px 0;color:#2E7D32}
.working-space{border:2px dashed #999;padding:25px;margin:15px 0;min-height:100px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;font-style:italic;color:#666;margin-bottom:10px}
.answer-box{display:inline-block;min-width:90px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.part-whole-container{text-align:center;margin:25px 0}
.whole-box{width:120px;height:60px;background:#FF9800;border:4px solid #F57C00;border-radius:8px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 3px 8px rgba(0,0,0,0.15)}
.whole-number{font-size:28pt;font-weight:bold;color:white}
.whole-question{font-size:32pt;font-weight:bold;color:white}
.parts-row{display:flex;justify-content:center;gap:30px;margin-top:20px}
.part-box{width:100px;height:55px;border:3px solid #333;border-radius:8px;display:flex;align-items:center;justify-content:center}
.part-box.filled{background:#4CAF50;border-color:#2E7D32}
.part-box.empty{background:white;border-style:dashed;border-color:#FF5722}
.part-number{font-size:24pt;font-weight:bold;color:white}
.part-box.empty .part-number{color:#FF5722}
.answer-key{margin-top:50px;padding:25px;background:#E8F4F8;border:3px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:18px;text-align:center}
.answer-key p{font-size:15pt;line-height:2;margin:12px 0}
.answer-key .working{font-style:italic;color:#555;margin-left:15px;font-size:14pt}
</style>
```

## RULES

1. Follow {{PROBLEM_TYPE_SPEC}} exactly per Q
2. Use {{NUMBER_RANGE}} for difficulty
3. Apply {{VISUAL_SUPPORT}} mode
4. Use {{CONTEXT}} for scenarios
5. NO hints revealing problem type
6. NO technical labels in questions (e.g., NO "Word Problem: Money", NO "result-unknown-addition")
7. Natural story problems only
8. Clear Year 2 language (ages 6-7)
9. UK pence format (47p)
10. Answer key with full working
11. Complete image paths
12. Colored backgrounds

## VALIDATION

- [ ] {{questionCount}} questions?
- [ ] {{PROBLEM_TYPE_SPEC}} followed?
- [ ] {{NUMBER_RANGE}} correct?
- [ ] {{VISUAL_SUPPORT}} applied?
- [ ] {{CONTEXT}} used?
- [ ] Backgrounds correct?
- [ ] Answer key included?
- [ ] No problem type hints?

<!-- DEBUG-END: Check console -->

Generate complete HTML. UK Year 2 aligned.
