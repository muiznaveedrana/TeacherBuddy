# Y2: Mental Addition/Subtraction Strategies

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

## ROTATION SPECS (Injected by system):
{{STRATEGY_SPEC}}
{{NUMBER_RANGE}}
{{COIN_SPEC}}
{{VISUAL_MODE}}

## CORE STRATEGIES

### ND (Near Doubles)
- Use doubles to solve: 6+7 → "6+6=12, so 6+7=13"
- Also: 8+9, 7+8, 5+6, 9+10, 4+5

### BR10 (Bridge Through 10)
- Split to make 10: 8+5 → "8+2=10, 10+3=13"
- Show jump steps: first to 10, then add rest

### NB (Number Bonds/Fact Families)
- Part-whole: Total at top, parts below
- If 8+?=13, then ?=5 (13-8=5)
- Show relationship between addition/subtraction

### COMP (Compensation)
- Adjust to friendly number: 29+15 → "30+15=45, 45-1=44"
- 18+7 → "20+7=27, 27-2=25"

### MIX (Mixed Strategy Selection)
- Present multiple problems
- Student chooses best strategy
- Real-world word problems

## VISUAL MODES (Use spec above)

### pure
Numbers only, NO hints or clues. Pure mental calculation.
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Solve: 7 + 8 = ___</p>
  <div class="answer-box-container">
    <span class="answer-box"></span>
  </div>
</div>
```

### visual
Show only the actual problem with objects. NO intermediate steps or hints.
```html
<div class="context-addition">
  <p class="question-text">Solve: 6 + 7 = ___</p>
  <div class="object-groups">
    <div class="initial-group">
      <img src="/images/WORKSHEET_OBJECTS/counting/{{category}}/{{object}}.png" width="40" height="40" alt="Object" />
      <!-- Repeat 6 times -->
    </div>
    <div class="plus-sign">+</div>
    <div class="added-group">
      <img src="/images/WORKSHEET_OBJECTS/counting/{{category}}/{{object}}.png" width="40" height="40" alt="Object" />
      <!-- Repeat 7 times -->
    </div>
  </div>
  <p class="answer-prompt">Answer: <span class="answer-box"></span></p>
</div>
```

### css
CSS-generated diagrams with CLEAR instructions.
```html
<div class="part-whole-diagram">
  <p class="question-text">What number goes with 8 to make 13?</p>
  <div class="whole-circle">
    <span class="whole-number">13</span>
  </div>
  <div class="parts-container">
    <div class="part-circle filled">
      <span class="part-number">8</span>
    </div>
    <div class="part-circle empty">
      <span class="answer-box"></span>
    </div>
  </div>
  <p class="equation">8 + ___ = 13</p>
</div>
```

### numberline
Number line WITHOUT labels or hints. Just visual structure.
```html
<div class="number-line-container">
  <div class="number-line">
    <div class="tick">8</div>
    <div class="tick">9</div>
    <div class="tick">10</div>
    <div class="tick">11</div>
    <div class="tick">12</div>
    <div class="tick">13</div>
    <div class="tick">14</div>
    <div class="tick">15</div>
  </div>
  <!-- NO jump arrows or +N labels -->
</div>
```

### coins
UK money context using coin images. NO calculation hints.
```html
<div class="coin-addition">
  <p class="question-text">Emma has these coins:</p>
  <div class="coin-group">
    <img src="/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png" width="50" height="50" alt="5p" />
    <img src="/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png" width="55" height="55" alt="10p" />
    <img src="/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png" width="55" height="55" alt="10p" />
  </div>
  <p class="question-text">How much money does Emma have? ___p</p>
</div>
```

### objects
Counting objects from library (context-based). NO hints.
```html
<div class="context-addition">
  <p class="question-text">Ben has some apples. His friend gives him more. How many apples does Ben have now?</p>
  <div class="object-groups">
    <div class="initial-group">
      <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
      <!-- Repeat actual count times -->
    </div>
    <div class="plus-sign">+</div>
    <div class="added-group">
      <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="40" height="40" alt="Apple" />
      <!-- Repeat actual count times -->
    </div>
  </div>
  <p class="answer-prompt">Total: <span class="answer-box"></span></p>
</div>
```

## QUESTION TEMPLATES (Based on spec)

### Q1: Near Doubles (ND)
Follow {{VISUAL_MODE}} for Q1. Use {{NUMBER_RANGE}} for Q1.

**If ND-visual or ND-objects**: Show objects for the actual problem only (e.g., 7+8), NO double fact shown
**If ND-css**: Show empty frame structure only, NO pre-filled doubles
**If ND-pure**: "Solve: 7+8 = ___" (no hints)

### Q2: Bridge Through 10 (BR10)
Follow {{VISUAL_MODE}} for Q2. Use {{NUMBER_RANGE}} for Q2.

**If BR10-numberline**: Show number line only, NO labels, NO arrows, NO hints. Just "Solve: 9+4 = ___"
**If BR10-diagram**: Show empty boxes for working, NO pre-filled splits
**If BR10-pure**: "Solve: 9+4 = ___" (no hints)

### Q3: Number Bonds (NB)
Follow {{VISUAL_MODE}} for Q3. Use {{NUMBER_RANGE}} for Q3.

**Format Options (choose ONE per worksheet):**

**Option A - Missing Number (Clearest):**
```
9 + ___ = 15
15 - 9 = ___
```

**Option B - Fact Family with Clear Instructions:**
```
Complete the fact family for these numbers: 9, 6, 15

9 + 6 = ___
6 + 9 = ___
15 - 9 = ___
15 - 6 = ___
```

**Option C - Part-Whole Diagram:**
Show circle with 15 at top, two circles below for parts (one shows 9, other is blank)
"What number goes with 9 to make 15? ___"

**If NB-css**: Use Option C (part-whole circles) with clear question
**If NB-visual**: Use Option B (complete fact family with all 4 equations)
**If NB-objects**: Use Option A (simple missing number format)
**If NB-pure**: Use Option A (missing number)

### Q4: Compensation (COMP)
Follow {{VISUAL_MODE}} for Q4. Use {{NUMBER_RANGE}} for Q4.

**If COMP-money**: Use coins to show friendly numbers ({{COIN_SPEC}})
**If COMP-visual**: Show adjustment steps with boxes
**If COMP-pure**: "29+15 = ___ (Hint: Think 30+15, then adjust)"

### Q5: Mixed Strategies (MIX)
Follow {{VISUAL_MODE}} for Q5. Can mix ranges if specified.

**If MIX-word**: Real-world problem, student chooses strategy
**If MIX-selection**: 3-4 problems, circle which strategy used
**If MIX-speed**: Quick fire 5 problems, time challenge
**If MIX-money**: Money word problem using coins

## NUMBER RANGES

### within20
Use numbers where sum ≤ 20:
- ND: 6+7, 7+8, 8+9, 5+6, 9+10
- BR10: 8+5, 9+4, 7+6, 8+7, 9+5
- NB: Bonds to 10, 15, 20
- COMP: 9+?, 19+?, 18+?

### within50
Use numbers where sum ≤ 50:
- ND: 15+16, 20+21, 24+25
- BR10: 28+5, 29+3, 37+6
- NB: Bonds to 30, 40, 50
- COMP: 29+15, 38+7, 19+25

## AVAILABLE CONTEXTS (Use from {{VISUAL_MODE}}):

**CRITICAL IMAGE PATHS - USE THESE EXACT PATHS:**

**school** (use folder: `counting/school_supplies/`):
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/eraser.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/crayon.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/marker.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/scissors.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/ruler.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/glue.png`
- `/images/WORKSHEET_OBJECTS/counting/school_supplies/backpack.png`

**fruits** (use folder: `counting/fruits/`):
- `/images/WORKSHEET_OBJECTS/counting/fruits/apple.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/banana.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/orange.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/grape.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/pear.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/lemon.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/watermelon.png`

**toys** (use folder: `counting/toys/`):
- `/images/WORKSHEET_OBJECTS/counting/toys/ball.png`
- `/images/WORKSHEET_OBJECTS/counting/toys/car.png`
- `/images/WORKSHEET_OBJECTS/counting/toys/doll.png`
- `/images/WORKSHEET_OBJECTS/counting/toys/teddy.png`
- `/images/WORKSHEET_OBJECTS/counting/toys/block.png`
- `/images/WORKSHEET_OBJECTS/counting/toys/kite.png`

**farm** (use folder: `counting/farm_animals/`):
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/sheep.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/horse.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/duck.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/goat.png`

**shapes** (use folder: `counting/shapes/`):
- `/images/WORKSHEET_OBJECTS/counting/shapes/star.png`
- `/images/WORKSHEET_OBJECTS/counting/shapes/heart.png`
- `/images/WORKSHEET_OBJECTS/counting/shapes/circle.png`
- `/images/WORKSHEET_OBJECTS/counting/shapes/square.png`
- `/images/WORKSHEET_OBJECTS/counting/shapes/diamond.png`

**food** (use folder: `counting/food_treats/`):
- `/images/WORKSHEET_OBJECTS/counting/food_treats/cookie.png`
- `/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png`

## UK COINS (When {{COIN_SPEC}} specified):
- 1p: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png`
- 2p: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png`
- 5p: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png`
- 10p: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png`
- 20p: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png`
- 50p: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png`

## CSS (Compressed)

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:20px;line-height:1.8}
.question{margin:25px 0;padding:25px;border-radius:10px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:12px;font-weight:bold;font-size:16pt}
.question-text{font-size:18pt;margin:10px 0;font-weight:600}
.strategy-hint{font-size:15pt;font-style:italic;color:#7B1FA2;margin:15px 0;padding:10px;background:#F3E5F5;border-radius:6px}
.answer-box-container{margin:20px 0;text-align:center}
.answer-box{display:inline-block;width:80px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle}

/* Near Doubles Visual */
.near-doubles-visual{display:flex;gap:30px;justify-content:center;margin:20px 0}
.double-group,.near-double-group{text-align:center}
.group-label{font-size:16pt;font-weight:bold;margin-bottom:12px;color:#1976D2}
.object-group{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:200px;margin:10px auto}

/* Part-Whole Diagram */
.part-whole-diagram{text-align:center;margin:25px 0}
.whole-circle{width:90px;height:90px;background:#FF9800;border:4px solid #F57C00;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 25px;box-shadow:0 3px 8px rgba(0,0,0,0.15)}
.whole-number{font-size:32pt;font-weight:bold;color:white}
.parts-container{display:flex;justify-content:center;gap:30px}
.part-circle{width:70px;height:70px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:3px solid #333}
.part-circle.filled{background:#4CAF50;border-color:#2E7D32}
.part-circle.empty{background:white;border-style:dashed;border-color:#FF5722}
.part-number{font-size:26pt;font-weight:bold;color:white}
.part-circle.empty .part-number{color:#FF5722}

/* Number Line */
.number-line-container{margin:25px 0;padding:20px;background:#E3F2FD;border-radius:10px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:25px 10px 10px;margin-bottom:15px}
.number-line::before{content:'';position:absolute;bottom:10px;left:5%;right:5%;height:3px;background:#333}
.tick{width:38px;height:38px;background:#E0E0E0;border:2px solid #999;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14pt;font-weight:bold;position:relative;z-index:1}
.tick.start{background:#4CAF50;color:white;border-width:3px}
.tick.end{background:#FF9800;color:white;border-width:3px}
.jump-arrows{text-align:center;margin-top:10px}
.jump{display:inline-block;margin:0 15px;padding:8px 16px;background:#1976D2;color:white;font-weight:bold;border-radius:6px;font-size:15pt}

/* Coin Addition */
.coin-addition{text-align:center;margin:20px 0}
.coin-group{display:flex;justify-content:center;gap:15px;margin:20px 0;flex-wrap:wrap}

/* Context Addition */
.context-addition{margin:20px 0}
.object-groups{display:flex;justify-content:center;align-items:center;gap:20px;margin:20px 0;flex-wrap:wrap}
.initial-group,.added-group{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:180px}
.plus-sign{font-size:40pt;font-weight:bold;color:#FF9800}

/* Strategy Selection */
.strategy-selection{margin:20px 0}
.strategy-options{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin:15px 0}
.strategy-badge{display:inline-block;padding:10px 18px;border:3px solid #333;border-radius:20px;font-size:14pt;font-weight:bold;background:white;cursor:pointer}

/* Answer Key */
.answer-key{margin-top:50px;padding:25px;background:#E8F4F8;border:3px solid#4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:18px;text-align:center}
.answer-key p{font-size:15pt;line-height:2;margin:12px 0}
.answer-key .strategy-note{font-style:italic;color:#555;margin-left:15px}
</style>
```

## GENERATION RULES

1. **Follow SPEC exactly**: Use {{STRATEGY_SPEC}} for each question type
2. **Respect RANGE**: Apply {{NUMBER_RANGE}} per question
3. **Integrate COINS**: When {{COIN_SPEC}} specified, use UK coin images
4. **Match VISUAL_MODE**: Apply specified visual approach per question
5. **Avoid repetition**: Check AVOID lists in freshness instructions
6. **Answer key**: Include with strategy explanations for teachers
7. **NO STRATEGY HINTS IN QUESTIONS**: Questions must NOT reveal which strategy to use (no "Use doubles", "Bridge 10", "Use the number line to help", "Compensation", etc. in student-facing text)
8. **NO CALCULATION CLUES**: Do not show:
   - Intermediate steps (no "+1", "+3", "8+2", etc. labels)
   - Jump arrows with numbers
   - Pre-filled working boxes
   - Answers highlighted (no orange boxes showing answer)
   - "Think about..." or "Use..." instructions
   - Double facts before the actual problem
9. **CORRECT IMAGE PATHS**: Use EXACT paths from AVAILABLE CONTEXTS section above (include full folder structure)
10. **CLEAN QUESTIONS**: Format should be: "Solve: [problem]" or just "[problem] = ___" with visual support ONLY (no teaching scaffolds)

## SELF-VALIDATION

Before returning worksheet:
- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each question follows {{STRATEGY_SPEC}}?
- [ ] Number ranges match {{NUMBER_RANGE}}?
- [ ] Coins used correctly if {{COIN_SPEC}} specified?
- [ ] Visual modes match {{VISUAL_MODE}}?
- [ ] All avoided objects/numbers excluded?
- [ ] Answer key with strategy explanations included?
- [ ] All image paths correct and valid?
- [ ] Background colors: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0?

**If ANY fails, STOP and regenerate.**

## OUTPUT

Return complete HTML document with:
- <!DOCTYPE html> declaration
- Complete CSS in <style> tags
- {{questionCount}} questions following all specs
- Answer key with strategy explanations
- Valid image paths
- UK curriculum aligned content

**Generate NOW following ALL specifications above.**
