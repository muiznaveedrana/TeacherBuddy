# Year 2: Two-Digit Add/Sub

**CRITICAL: EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## SPECS (Injected):
{{METHOD_SPEC}}
{{NUMBER_RANGE}}
{{REGROUP_SPEC}}
{{CONTEXT}}
{{OPERATION_MIX}}

<!-- DEBUG: Check injection above -->

## METHODS

**PART**: Split tens/ones → (40+5)+(30+2)=(40+30)+(5+2)=77
**COL**: Column method, add ones then tens, carry if needed
**B10**: Base-10 blocks (CSS rectangles=10, squares=1)
**NL**: Number line jumps

## Q SPECS (Use {{METHOD_SPEC}}):

**Q1**: partition-horizontal|partition-vertical|partition-with-objects|base10-visual
**Q2**: column-addition-no-regroup|column-addition-regroup|horizontal-addition|number-line-addition
**Q3**: partition-subtraction|base10-subtraction|number-line-subtraction|place-value-chart
**Q4**: column-subtraction-no-regroup|column-subtraction-regroup|horizontal-subtraction|comparison-subtraction
**Q5**: word-problem-addition|word-problem-subtraction|word-problem-money|word-problem-mixed

## RANGES (Use {{NUMBER_RANGE}}):
**Easy:20-50** | **Average:30-70** | **Hard:50-99**

## REGROUP (Use {{REGROUP_SPEC}}):
Q2:yes/no (addition regroup), Q4:yes/no (subtraction borrow)

## CONTEXTS (Use {{CONTEXT}}):
**school**: `/images/[pencil|book|eraser|crayon].png`
**toys**: `/images/[ball|car|doll|teddy].png`
**food**: `/images/[apple|banana|orange].png`
**animals**: `/images/[chicken|cow|sheep|pig].png`
**money**: Use EXACT paths - 1p/2p/5p/10p are TAILS only:
  - 1p: `/images/coin-1p-tails.png`
  - 2p: `/images/coin-2p-tails.png`
  - 5p: `/images/coin-5p-tails.png`
  - 10p: `/images/coin-10p-tails.png`
  - 20p: `/images/coin-20p-[heads|tails].png`
  - 50p: `/images/coin-50p-[heads|tails].png`

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.partition-container{display:flex;justify-content:center;align-items:center;gap:8px;margin:8px 0;flex-wrap:wrap}
.partition-box{border:2px solid #333;padding:4px 8px;border-radius:6px;font-size:15pt;font-weight:bold;background:white;min-width:40px;text-align:center}
.partition-tens{background:#FFEB3B;color:#000}
.partition-ones{background:#4CAF50;color:#fff}
.operator{font-size:20pt;font-weight:bold;color:#FF9800}
.column-container{display:inline-block;border:2px solid #333;padding:10px 15px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:monospace;font-size:18pt;line-height:1.3;margin:8px auto}
.column-line{border-top:2px solid #000;margin:3px 0}
.base10-container{display:flex;justify-content:center;gap:15px;margin:10px 0;flex-wrap:wrap}
.base10-group{text-align:center}
.base10-label{font-size:13pt;font-weight:bold;margin-bottom:5px;color:#1976D2}
.base10-blocks{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:280px}
.block-ten{width:70px;height:22px;background:#FF9800;border:2px solid #F57C00;border-radius:3px;margin:2px}
.block-one{width:18px;height:18px;background:#4CAF50;border:2px solid #2E7D32;border-radius:2px;margin:2px}
.number-line-container{margin:10px 0;padding:10px;background:#E3F2FD;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:20px 8px 8px}
.number-line::before{content:'';position:absolute;bottom:8px;left:5%;right:5%;height:2px;background:#333}
.tick{width:28px;height:28px;background:#E0E0E0;border:2px solid #999;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10pt;font-weight:bold;z-index:1}
.tick.highlight{background:#FF9800;color:white;border-width:2px}
.pv-chart{display:inline-block;border:2px solid #333;margin:8px 0}
.pv-row{display:flex}
.pv-cell{border:2px solid #666;padding:8px 15px;font-size:15pt;font-weight:bold;text-align:center;min-width:50px}
.pv-header{background:#1976D2;color:white}
.word-problem-visual{margin:8px 0;padding:10px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.object-group{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.object-group img{width:35px;height:35px}
.answer-box{display:inline-block;min-width:80px;height:40px;border:2px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.working-space{border:2px dashed #999;padding:8px;margin:8px 0;min-height:50px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Follow {{METHOD_SPEC}} exactly per Q
2. Use {{NUMBER_RANGE}} for difficulty
3. Apply {{REGROUP_SPEC}} for Q2/Q4
4. Use {{CONTEXT}} objects for Q5
5. NO hints or intermediate steps
6. NO method labels in student questions (e.g., NO "word-problem-money", NO "partition-horizontal")
7. Child-friendly question text only
8. Answer key with working
9. Complete image paths
10. Colored backgrounds

## VALIDATION

- [ ] {{questionCount}} questions?
- [ ] {{METHOD_SPEC}} followed?
- [ ] {{NUMBER_RANGE}} correct?
- [ ] {{REGROUP_SPEC}} applied?
- [ ] {{CONTEXT}} used?
- [ ] Backgrounds correct?
- [ ] Answer key included?

<!-- DEBUG-END: Check console -->

Generate complete HTML. UK Year 2 aligned.
