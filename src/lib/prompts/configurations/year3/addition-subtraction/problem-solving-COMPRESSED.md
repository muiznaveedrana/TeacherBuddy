# Y3: Problem Solving ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Real-world problem solving with reasoning.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS:
{{PROBLEM_TYPE}}
{{CONTEXT_SPEC}}
{{VISUAL_SUPPORT}}
{{OPERATION_FOCUS}}
{{REASONING_LEVEL}}

## YEAR 3 FOCUS (Ages 7-8)
- **Problem solving**: Multi-step, real-world contexts
- **Key skills**: Identify operations, plan solution, check answers
- **Visual tools**: Bar models, diagrams, number lines
- **Reasoning**: Explain thinking, justify answers
- **Number range**: 100-999 (some totals may exceed 1000)
- **Contexts**: UK money, shopping, school, sports, travel

## QUESTION TYPES

**Q1: Two-Step Problems**
- `two-step-add-sub`: Add then subtract (or reverse)
- `two-step-money`: Money scenarios with two operations
- `two-step-shopping`: Buying items, calculating change
- `two-step-school`: School context (students, books, supplies)
- `two-step-bar-model`: Visual bar model for two-step problem

**Q2: Comparison Problems**
- `comparison-how-many-more`: "How many more does A have than B?"
- `comparison-difference`: "What is the difference between...?"
- `comparison-money`: Compare amounts of money
- `comparison-bar-model`: Visual bars showing comparison
- `comparison-greater-by`: "A is greater than B by how much?"

**Q3: Missing Numbers**
- `missing-addend`: 456 + ? = 693
- `missing-subtrahend`: 534 - ? = 267
- `missing-minuend`: ? - 267 = 267
- `missing-in-context`: Real-world scenario with missing value
- `create-equation`: Students write equation from context

**Q4: Inverse Operations**
- `inverse-check-addition`: Use subtraction to check addition
- `inverse-check-subtraction`: Use addition to check subtraction
- `inverse-fact-family`: Show all related facts (e.g., 3+5=8, 5+3=8, 8-3=5, 8-5=3)
- `inverse-find-error`: Find mistake using inverse check
- `inverse-reasoning`: Explain why inverse works

**Q5: Multi-Step Challenge**
- `multi-step-3operations`: Three-step problem
- `multi-step-money-shopping`: Complex shopping scenario
- `multi-step-school-trip`: School trip planning with costs
- `multi-step-bar-model-complex`: Bar model with 3+ parts
- `multi-step-reasoning-challenge`: Open-ended reasoning problem

## CONTEXTS (Year 3)

### Money (EMPHASIZE THIS)
UK coins and notes: £1-£9.99 typical range
```
/images/WORKSHEET_OBJECTS/money/UK-coins/£2 heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/£1 heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/50p heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/20p heads col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/10p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/5p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/2p tails col - TRF.png
/images/WORKSHEET_OBJECTS/money/UK-coins/1p tails col - TRF.png
```

### Other Contexts
- **School**: Students, books, pencils, chairs, tables
- **Shopping**: Toys, books, clothes, food items
- **Travel**: Miles, journeys, bus/train travel
- **Sports**: Points scored, goals, race times
- **Nature**: Birds counted, trees planted, flowers

## VISUAL SUPPORT OPTIONS
- **bar-model**: Rectangular bars showing parts and whole
- **objects**: Pictures of items being counted
- **number-line**: Jumps on number line
- **diagrams**: Custom problem-specific diagrams
- **none**: Text-only problem

## PROBLEM-SOLVING STRATEGIES

### Strategy 1: UNDERSTAND
- Read carefully
- Identify what you know
- Identify what you need to find

### Strategy 2: PLAN
- Decide which operations to use
- Plan the order of steps
- Draw a diagram if helpful

### Strategy 3: SOLVE
- Carry out calculations
- Show your working
- Check each step

### Strategy 4: CHECK
- Does answer make sense?
- Use inverse to verify
- Check calculations

## COLOR SCHEME (Year 3 Enhanced)
- **Bar model whole**: #4A148C (dark purple)
- **Bar model parts**: #9C27B0, #7B1FA2, #6A1B9A (purple shades)
- **Unknown bars**: #E1BEE7 (light purple) with dashed border
- **Two-step problems**: #FF9800 (orange)
- **Comparison**: #2196F3 (blue)
- **Missing numbers**: #FF5722 (red-orange)
- **Inverse operations**: #4CAF50 (green)
- **Multi-step**: #E91E63 (pink)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600;line-height:1.7}
.problem-scenario{margin:15px 0;padding:18px;background:#FFF;border:2px solid #ddd;border-radius:8px;font-size:17pt;line-height:1.8}
.bar-model-container{margin:18px 0;padding:18px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.bar-model-title{font-size:16pt;font-weight:bold;color:#6A1B9A;margin-bottom:15px;text-align:center}
.bar-whole{display:flex;margin:15px 0;border:3px solid #333;border-radius:6px;overflow:hidden}
.bar-parts{display:flex;margin:15px 0;gap:10px}
.bar-segment{height:65px;display:flex;align-items:center;justify-content:center;font-size:20pt;font-weight:bold;color:white;border:3px solid #333;border-radius:6px}
.bar-segment.whole{background:#4A148C;width:100%;flex-direction:column;gap:5px}
.bar-segment.part1{background:#9C27B0;flex:1}
.bar-segment.part2{background:#7B1FA2;flex:1}
.bar-segment.part3{background:#6A1B9A;flex:1}
.bar-segment.unknown{background:#E1BEE7;color:#4A148C;border-style:dashed;border-width:4px}
.bar-label{text-align:center;font-size:15pt;font-weight:bold;margin-top:8px;color:#6A1B9A}
.bar-question-mark{font-size:48pt;color:#E91E63}
.two-step-container{margin:18px 0;padding:18px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.two-step-title{font-size:16pt;font-weight:bold;color:#E65100;margin-bottom:15px}
.step-box{margin:15px 0;padding:15px;background:white;border:3px solid #FF9800;border-radius:8px;box-shadow:2px 2px 5px rgba(0,0,0,0.1)}
.step-label{font-size:15pt;font-weight:bold;color:#E65100;margin-bottom:10px}
.step-number-badge{display:inline-block;background:#FF9800;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:10px;font-size:15pt;font-weight:bold}
.step-content{font-size:16pt;margin:10px 0;line-height:1.6}
.step-calculation{margin:12px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:6px;font-size:18pt;text-align:center;font-family:'Courier New',monospace}
.comparison-container{margin:18px 0;padding:18px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.comparison-title{font-size:16pt;font-weight:bold;color:#1565C0;margin-bottom:15px;text-align:center}
.comparison-bars{display:flex;justify-content:center;margin:20px 0;gap:30px;flex-wrap:wrap}
.comparison-bar-group{text-align:center;flex:1;min-width:200px}
.comparison-bar-visual{height:50px;background:#2196F3;border:3px solid #1976D2;border-radius:6px;position:relative;margin:15px 0;display:flex;align-items:center;justify-content:center;color:white;font-size:20pt;font-weight:bold}
.comparison-label{font-size:16pt;font-weight:bold;margin:10px 0;color:#1976D2}
.comparison-question{margin:15px 0;padding:12px;background:#FFF;border:2px dashed #2196F3;border-radius:6px;font-size:16pt;font-weight:600;text-align:center}
.difference-visual{margin:20px 0;padding:15px;background:#FFF;border-radius:6px}
.difference-bracket{border-left:4px solid #FF5722;border-top:4px solid #FF5722;border-bottom:4px solid #FF5722;height:60px;margin-left:auto;position:relative;padding-left:15px}
.difference-label{position:absolute;right:-80px;top:50%;transform:translateY(-50%);background:#FF5722;color:white;padding:8px 15px;border-radius:6px;font-weight:bold;white-space:nowrap}
.missing-number-container{margin:18px 0;padding:18px;background:#FFE0DD;border:3px solid #FF5722;border-radius:8px}
.missing-title{font-size:16pt;font-weight:bold;color:#D32F2F;margin-bottom:15px;text-align:center}
.missing-equation{font-size:32pt;font-weight:bold;text-align:center;margin:20px 0;font-family:'Courier New',monospace}
.missing-blank{display:inline-block;min-width:100px;height:60px;border-bottom:5px solid #FF5722;background:#FFF;vertical-align:baseline;margin:0 10px;text-align:center;line-height:60px}
.missing-context{margin:15px 0;padding:15px;background:#FFF;border:2px solid #FF5722;border-radius:6px;font-size:16pt;line-height:1.7}
.inverse-container{margin:18px 0;padding:18px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.inverse-title{font-size:16pt;font-weight:bold;color:#2E7D32;margin-bottom:15px;text-align:center}
.inverse-pair{display:flex;justify-content:center;align-items:center;gap:25px;margin:20px 0;flex-wrap:wrap}
.inverse-equation{font-size:24pt;margin:10px 0;padding:15px 25px;background:white;border:3px solid #4CAF50;border-radius:8px;text-align:center;font-weight:bold;font-family:'Courier New',monospace;color:#2E7D32}
.inverse-arrow{font-size:40pt;color:#FF9800;font-weight:bold}
.check-icon{display:inline-block;width:40px;height:40px;background:#4CAF50;color:white;border-radius:50%;text-align:center;line-height:40px;font-size:28pt;font-weight:bold;margin:0 10px}
.fact-family-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0}
.fact-box{padding:15px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;text-align:center;font-size:22pt;font-weight:bold;font-family:'Courier New',monospace;color:#2E7D32}
.multi-step-container{margin:18px 0;padding:18px;background:#FCE4EC;border:3px solid #E91E63;border-radius:8px}
.multi-step-title{font-size:16pt;font-weight:bold;color:#C2185B;margin-bottom:15px;text-align:center}
.multi-step-flow{margin:20px 0}
.flow-step{display:flex;align-items:flex-start;margin:15px 0;padding:15px;background:#FFF;border:3px solid #E91E63;border-radius:8px}
.flow-number{min-width:40px;height:40px;background:#E91E63;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18pt;margin-right:15px;flex-shrink:0}
.flow-text{flex:1;font-size:16pt;line-height:1.6}
.flow-calculation{margin:10px 0;padding:10px;background:#FFF9C4;border:2px dashed #E91E63;border-radius:6px;font-size:18pt;font-family:'Courier New',monospace}
.strategy-box{margin:18px 0;padding:18px;background:#E1F5FE;border:2px dashed #0288D1;border-radius:8px}
.strategy-title{font-size:16pt;font-weight:bold;color:#01579B;margin-bottom:12px}
.strategy-steps{margin:12px 0}
.strategy-step{padding:10px;margin:8px 0;background:#FFF;border-left:5px solid #0288D1;border-radius:4px;font-size:15pt}
.money-visual{display:flex;gap:15px;flex-wrap:wrap;justify-content:center;margin:15px 0;padding:15px;background:#FFF;border-radius:8px}
.money-item{text-align:center;padding:12px;background:#FFF9C4;border:2px solid #FFD700;border-radius:8px}
.money-amount{font-size:24pt;font-weight:bold;color:#F57C00;margin:8px 0}
.money-label{font-size:14pt;color:#E65100}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.working-space{border:3px dashed #999;padding:18px;margin:15px 0;min-height:100px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px;font-weight:600}
.answer-box{display:inline-block;min-width:120px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-box-small{min-width:90px;height:45px;font-size:20pt}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:150px;margin:0 8px;background:transparent}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
.answer-key .step{font-weight:bold;color:#FF9800;background:#FFF3E0;padding:2px 8px;border-radius:4px}
</style>
```

## WORKED EXAMPLES

### Two-Step Problem
**Problem**: Tom had £456. He earned £237 more. Then he spent £123. How much money does he have now?

**Solution**:
- **Step 1**: 456 + 237 = 693 (total after earning)
- **Step 2**: 693 - 123 = 570 (total after spending)
- **Answer**: £570

### Comparison Problem
**Problem**: Emma has 456 stickers. Sam has 234 stickers. How many more stickers does Emma have?

**Solution**:
- 456 - 234 = 222
- **Answer**: Emma has 222 more stickers

**Bar Model**:
```
Emma: [-------- 456 --------]
Sam:  [---- 234 ----] [?222?]
```

### Missing Number Problem
**Problem**: A shop had some books. They sold 267 books. Now they have 456 books left. How many books did they have at the start?

**Solution**:
- Let ? = books at start
- ? - 267 = 456
- Use inverse: 456 + 267 = 723
- **Answer**: 723 books at the start

### Inverse Check Example
**Original**: 456 + 237 = 693
**Check**: 693 - 237 = 456 ✓
**Check**: 693 - 456 = 237 ✓

### Multi-Step Challenge
**Problem**: A school bought 3 boxes of pencils with 156 pencils in each box. They gave out 234 pencils. How many pencils are left?

**Solution**:
- **Step 1**: 156 × 3 = 468 (total pencils)
- **Step 2**: 468 - 234 = 234 (pencils left)
- **Answer**: 234 pencils

## RULES

1. Follow {{PROBLEM_TYPE}} rotation exactly
2. Use {{CONTEXT_SPEC}} - EMPHASIZE UK money contexts
3. Apply {{VISUAL_SUPPORT}} where specified
4. Match {{REASONING_LEVEL}} appropriately
5. Use {{OPERATION_FOCUS}} operations
6. Real-world contexts, child-friendly scenarios
7. Provide working space for calculations
8. Answer key must show full step-by-step working
9. Numbers 100-999 (totals may exceed 1000 where appropriate)
10. Colored backgrounds: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0
11. Year 3 appropriate (ages 7-8)
12. Bar models should clearly show parts and whole
13. Include "Show your working" instruction
14. Encourage explanation of reasoning

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Two-step problem with clear steps?
- [ ] Q2: Comparison problem included?
- [ ] Q3: Missing number in context?
- [ ] Q4: Inverse operation checking?
- [ ] Q5: Multi-step challenge problem?
- [ ] PROBLEM_TYPE specifications met?
- [ ] CONTEXT_SPEC followed (money emphasized)?
- [ ] VISUAL_SUPPORT included where specified?
- [ ] Bar models clearly show parts and whole?
- [ ] Working space provided?
- [ ] Real-world, child-friendly contexts?
- [ ] Numbers appropriate (100-999 range)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full step-by-step working?
- [ ] Reasoning encouraged?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8). FOCUS: Problem solving, bar models, reasoning, real-world contexts.
