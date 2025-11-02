# Y2: Mental Add/Sub Strategies ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## SPECS (Injected):
{{STRATEGY_SPEC}}
{{NUMBER_RANGE}}
{{COIN_SPEC}}
{{VISUAL_MODE}}

## STRATEGIES

**ND** (Near Doubles): 6+7→"6+6=12, +1=13" | 8+9, 7+8, 5+6
**BR10** (Bridge 10): 8+5→"8+2=10, +3=13" | Show jump steps
**NB** (Number Bonds): Part-whole, fact families | If 8+?=13, then ?=5
**COMP** (Compensation): 29+15→"30+15-1=44" | 18+7→"20+7-2=25"
**MIX** (Mixed): Multiple problems, choose strategy

## VISUAL MODES (Use {{VISUAL_MODE}}):

**pure**: Numbers only, minimal scaffold
**visual**: Object groups showing thinking
**css**: Circles, diagrams (part-whole)
**numberline**: Tick marks, jump arrows
**coins**: UK money images
**objects**: Counting library items

## RANGES (Use {{NUMBER_RANGE}}):

**within20**: Sums ≤20 (ND:6+7,7+8 | BR10:8+5,9+4 | NB:bonds to 10,15,20)
**within50**: Sums ≤50 (ND:15+16,20+21 | BR10:28+5,29+3 | NB:bonds to 30,40,50)

## CONTEXTS (CRITICAL - USE EXACT PATHS):

**school**: `/images/[pencil|book|eraser|crayon|marker|scissors|ruler|glue|backpack].png`
**fruits**: `/images/[apple|banana|orange|strawberry|grape|pear|lemon|watermelon].png`
**toys**: `/images/[ball|car|doll|teddy|block|kite].png`
**farm**: `/images/[chicken|cow|sheep|pig|horse|duck|goat].png`
**shapes**: `/images/[star|heart|circle|square|diamond].png`
**food**: `/images/[cookie|cupcake].png`

## COINS (when {{COIN_SPEC}}):
1p,2p,5p,10p,20p,50p at `/images/[X]p tails col - TRF.png`

## CSS (Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:20px;line-height:1.8}
.question{margin:25px 0;padding:25px;border-radius:10px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:12px;font-weight:bold;font-size:16pt}
.question-text{font-size:18pt;margin:10px 0;font-weight:600}
.strategy-hint{font-size:15pt;font-style:italic;color:#7B1FA2;margin:15px 0;padding:10px;background:#F3E5F5;border-radius:6px}
.answer-box-container{margin:20px 0;text-align:center}
.answer-box{display:inline-block;width:80px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4}
.near-doubles-visual{display:flex;gap:30px;justify-content:center;margin:20px 0}
.double-group,.near-double-group{text-align:center}
.group-label{font-size:16pt;font-weight:bold;margin-bottom:12px;color:#1976D2}
.object-group{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:200px;margin:10px auto}
.part-whole-diagram{text-align:center;margin:25px 0}
.whole-circle{width:90px;height:90px;background:#FF9800;border:4px solid #F57C00;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 25px;box-shadow:0 3px 8px rgba(0,0,0,0.15)}
.whole-number{font-size:32pt;font-weight:bold;color:white}
.parts-container{display:flex;justify-content:center;gap:30px}
.part-circle{width:70px;height:70px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:3px solid #333}
.part-circle.filled{background:#4CAF50;border-color:#2E7D32}
.part-circle.empty{background:white;border-style:dashed;border-color:#FF5722}
.part-number{font-size:26pt;font-weight:bold;color:white}
.part-circle.empty .part-number{color:#FF5722}
.number-line-container{margin:25px 0;padding:20px;background:#E3F2FD;border-radius:10px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:25px 10px 10px;margin-bottom:15px}
.number-line::before{content:'';position:absolute;bottom:10px;left:5%;right:5%;height:3px;background:#333}
.tick{width:38px;height:38px;background:#E0E0E0;border:2px solid #999;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14pt;font-weight:bold;position:relative;z-index:1}
.tick.start{background:#4CAF50;color:white;border-width:3px}
.tick.end{background:#FF9800;color:white;border-width:3px}
.jump-arrows{text-align:center;margin-top:10px}
.jump{display:inline-block;margin:0 15px;padding:8px 16px;background:#1976D2;color:white;font-weight:bold;border-radius:6px;font-size:15pt}
.coin-addition{text-align:center;margin:20px 0}
.coin-group{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}
.context-addition{margin:20px 0}
.object-groups{display:flex;justify-content:center;align-items:center;gap:20px;margin:20px 0;flex-wrap:wrap}
.initial-group,.added-group{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:180px}
.plus-sign{font-size:40pt;font-weight:bold;color:#FF9800}
.strategy-selection{margin:20px 0}
.strategy-options{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin:15px 0}
.strategy-badge{display:inline-block;padding:10px 18px;border:3px solid #333;border-radius:20px;font-size:14pt;font-weight:bold;background:white}
.answer-key{margin-top:50px;padding:25px;background:#E8F4F8;border:3px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:18px;text-align:center}
.answer-key p{font-size:15pt;line-height:2;margin:12px 0}
.answer-key .strategy-note{font-style:italic;color:#555;margin-left:15px}
</style>
```

## TEMPLATES (Match {{STRATEGY_SPEC}}):

**Q1-ND-visual**: Show actual problem objects only (e.g., 7+8), NO double fact shown
**Q1-ND-pure**: "Solve: 7+8 = ___" (no hints)
**Q1-ND-css**: Empty frame structure only, NO pre-filled
**Q1-ND-objects**: Objects for actual problem, NO scaffolding

**Q2-BR10-numberline**: Clean number line 0-20 with NO arrows, NO labels, NO hints. Just "Complete the calculation: 9 + 4 = ___"
**Q2-BR10-pure**: "Complete the calculation: 9 + 4 = ___" (NO visuals, NO scaffolds, NO hints)
**Q2-BR10-visual**: Simple visual context (e.g., 9 apples + 4 apples images for counting) - NO part-whole circles, NO empty boxes, NO splitting diagrams
**FORBIDDEN for Q2**: Part-whole diagrams, circles showing how to split numbers, "Show your steps" boxes, empty circles, bridging diagrams

**Q3-NB-css**: Part-whole with clear question: "What number goes with 8 to make 13? 8 + ___ = 13"
**Q3-NB-visual**: Complete fact family: "Complete: 9+6=___ | 6+9=___ | 15-9=___ | 15-6=___"
**Q3-NB-objects**: Missing number format: "9 + ___ = 15" and "15 - 9 = ___"
**Q3-NB-pure**: Simple format: "9 + ___ = 15"

**Q4-COMP-pure**: "29+15 = ___ (Think 30+15, adjust)"
**Q4-COMP-visual**: Step boxes with adjustment
**Q4-COMP-money**: Use coins {{COIN_SPEC}}
**Q4-COMP-css**: Adjustment diagram

**Q5-MIX-word**: Real-world problem, choose strategy
**Q5-MIX-selection**: 3-4 problems, circle strategy used
**Q5-MIX-speed**: Quick 5 problems
**Q5-MIX-money**: Money word problem with coins

## RULES

1. Follow {{STRATEGY_SPEC}} exactly for each Q
2. Use {{NUMBER_RANGE}} per Q
3. Apply {{COIN_SPEC}} when specified
4. Use {{VISUAL_MODE}} context objects
5. Avoid AVOID-OBJ and AVOID-NUM lists
6. Answer key with strategy explanations
7. **NO STRATEGY HINTS**: Questions must NOT say "Use doubles", "Bridge 10", "Use the number line to help", "Compensation", "(Near Doubles)", etc.
8. **NO CALCULATION CLUES**: Do not show:
   - "+1", "+3", "8+2" labels
   - Jump arrows with numbers
   - Pre-filled boxes with numbers
   - Orange/highlighted answer boxes
   - "Think..." or "Use..." text
   - Double facts before problem
   - Part-whole diagrams showing HOW to split numbers
   - Empty circles showing WHERE to split
   - "Show your steps below" boxes (these are scaffolds)
9. **CORRECT PATHS**: Use EXACT image paths from CONTEXTS section (full folder structure required)
10. **CLEAN FORMAT**: "Solve: [problem]" or "[problem] = ___" with visuals ONLY (no scaffolds)
11. **TESTING NOT TEACHING**: Questions must TEST if students know the strategy, NOT teach them how to use it
12. **LOGICAL VISUALS**: If showing objects/visuals, they must be for COUNTING purposes only, not strategy scaffolding

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q follows {{STRATEGY_SPEC}}?
- [ ] Ranges match {{NUMBER_RANGE}}?
- [ ] Coins used if {{COIN_SPEC}}?
- [ ] Avoided lists respected?
- [ ] Correct backgrounds?
- [ ] Answer key included?

Generate complete HTML. UK curriculum aligned.
