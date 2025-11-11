# Year 2: Simple Equivalent Fractions

**CRITICAL: EXACTLY {{questionCount}} questions. Simple equivalence: 1/2 = 2/4 only.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Key equivalence**: 1/2 = 2/4 (most important for Year 2)
- **Visual proof**: Side-by-side shape comparisons
- **Skills**: Recognize that different fractions can show same amount
- **Ages 6-7**: Foundation for equivalent fraction understanding

## MANDATORY QUESTION VARIATIONS (CRITICAL)

**Q1 WORDING** - Use EXACTLY the variation specified in Q1-VARIATION:
```
IF Q1-VARIATION = A: "Look at these two shapes. Do they show the same amount shaded?"
IF Q1-VARIATION = B: "Are these fractions equal? Circle YES or NO."
IF Q1-VARIATION = C: "Which shows more: the half or the quarters? Or are they the same?"
```

**Q2 OPTIONS ORDER** - Use EXACTLY the order specified in Q2-ORDER:
```
Example: If Q2-ORDER = "2/4,3/4,1/4" then show options in that exact sequence.
```
**Q2 WORDING** - Rotate these 3 wordings:
```
Version 1: "Which fraction is the same as 1/2?"
Version 2: "Circle the fraction equal to one half."
Version 3: "Find the equivalent fraction for 1/2."
```

**Q3 SHAPE** - Use EXACTLY the shape specified in Q3-SHAPE:
```
IF Q3-SHAPE = circle: Show CIRCLE divided showing 1/2 = __/4
IF Q3-SHAPE = rectangle-horizontal: Show HORIZONTAL RECTANGLE showing 1/2 = __/4
IF Q3-SHAPE = rectangle-vertical: Show VERTICAL RECTANGLE showing 1/2 = __/4
IF Q3-SHAPE = bar: Show NUMBER LINE BAR showing 1/2 = __/4
```
**Q3 WORDING** - Rotate these:
```
Version 1: "Complete the equation: 1/2 = __/4"
Version 2: "Fill in the missing number: 1/2 = __/4"
Version 3: "1/2 equals how many quarters? 1/2 = __/4"
```

**Q4 TYPE** - Use EXACTLY the variation specified in Q4-VARIATION:
```
IF Q4-VARIATION = A: Show circle, rectangle, bar (all 1/2). Ask: "Do these all show the same fraction?"
IF Q4-VARIATION = B: Show 3 circles with 1/2, 2/4, 3/4. Ask: "Which TWO are equal?"
IF Q4-VARIATION = C: Show pizza, chocolate bar, ribbon (all 1/2). Ask: "Circle the ones showing one half."
IF Q4-VARIATION = D: Show same shape in different orientations (all 1/2). Ask: "Are these all showing 1/2?"
```

**Q5 WORD PROBLEM** - Use EXACTLY Q5-CONTEXT and Q5-PIECES:
```
IF context=pizza, pieces=4: "Lily eats 1/2 of a pizza cut into 4 slices. How many slices?"
IF context=pizza, pieces=8: "Sam eats 1/2 of a pizza cut into 8 slices. How many slices?"
IF context=chocolate bar, pieces=4: "Emma breaks a chocolate bar into 4 pieces. She eats half. How many pieces?"
IF context=cake, pieces=4: "A cake is cut into 4 slices. Tom eats half. How many slices?"
IF context=sandwich, pieces=4: "A sandwich is cut into 4 triangles. You eat half. How many triangles?"
IF context=ribbon, pieces=4: "A ribbon is cut into 4 equal parts. We use half. How many parts?"
IF context=apple, pieces=4: "An apple is cut into 4 pieces. Maya eats half. How many pieces?"
(Scale to 8 pieces: double the numbers)
```

## KEY CONCEPT
**1/2 = 2/4** is the ONLY equivalence for Year 2.
- Visual: Half a circle = 2 out of 4 quarters
- Practical: 1/2 pizza = 2/4 pizza (2 slices out of 4)

## CSS (COMPACT):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:8px;line-height:1.2}
.question{margin:5px 0;padding:8px;border-radius:6px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:6px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:3px 0;font-weight:600}
.equivalence-container{margin:8px 0;padding:8px;background:#F5F5F5;border-radius:6px}
.equivalence-pair{display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;margin:8px 0}
.fraction-item{text-align:center;margin:8px;padding:8px;background:#FFF;border:2px solid #1976D2;border-radius:6px}
.equals-sign{font-size:28pt;font-weight:bold;color:#FF5722;margin:0 10px}
.question-mark{font-size:28pt;font-weight:bold;color:#FF9800}
.fraction-circle{width:110px;height:110px;border-radius:50%;border:2px solid #333;position:relative;overflow:hidden;margin:5px auto;display:inline-block}
.fraction-half-circle{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-quarter-circle{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.division-lines{position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none}
.division-lines::before,.division-lines::after{content:'';position:absolute;background:#333}
.division-lines::before{width:2px;height:100%;left:50%;transform:translateX(-50%)}
.division-lines::after{width:100%;height:2px;top:50%;transform:translateY(-50%)}
.fraction-rect{width:130px;height:80px;border:2px solid #333;border-radius:4px;position:relative;display:inline-block;margin:5px;overflow:hidden}
.fraction-rect-half{width:100%;height:50%;position:absolute}
.fraction-rect-half.top{top:0;left:0}
.fraction-rect-half.bottom{bottom:0;left:0}
.fraction-rect-quarter{width:100%;height:25%;position:absolute}
.fraction-bar{width:140px;height:50px;border:2px solid #333;border-radius:4px;display:flex;margin:5px auto}
.bar-section{flex:1;border-right:2px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:11pt}
.bar-section:last-child{border-right:none}
.shaded{background:#4CAF50;color:#FFF}
.unshaded{background:#FFF;color:#999}
.shaded-blue{background:#2196F3;color:#FFF}
.shaded-orange{background:#FF9800;color:#FFF}
.shaded-green{background:#4CAF50;color:#FFF}
.shaded-purple{background:#9C27B0;color:#FFF}
.fraction-label{font-size:18pt;font-weight:bold;color:#1976D2;margin:5px 0}
.fraction-notation{font-size:22pt;font-weight:bold;color:#FF5722;margin:5px 0}
.equivalence-statement{font-size:20pt;font-weight:bold;color:#2E7D32;text-align:center;margin:10px 0;padding:8px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:6px}
.matching-options{display:flex;justify-content:space-around;flex-wrap:wrap;margin:8px 0}
.matching-option{margin:6px;padding:8px;border:2px solid #ddd;border-radius:6px;background:#FFF;text-align:center;min-width:100px}
.matching-option:hover{background:#E3F2FD;border-color:#2196F3}
.word-problem-visual{margin:5px 0;padding:8px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:6px}
.pizza-visual{text-align:center;margin:8px 0}
.instruction-box{margin:8px 0;padding:8px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:6px;font-size:15pt;font-weight:600;text-align:center}
.answer-box{display:inline-block;min-width:60px;height:30px;border:2px solid #333;border-radius:4px;background:#FFF;vertical-align:middle;margin:0 4px}
.answer-line{border:none;border-bottom:2px solid #333;display:inline-block;min-width:60px;margin:0 4px;background:transparent}
.working-space{border:2px dashed #999;padding:8px;margin:5px 0;min-height:50px;background:#FAFAFA;border-radius:4px}
.answer-key{margin-top:15px;padding:10px;background:#E8F4F8;border:2px solid #4169E1;border-radius:6px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:8px;text-align:center}
.answer-key p{font-size:12pt;line-height:1.4;margin:4px 0}
</style>
```

## RULES

1. ONLY teach 1/2 = 2/4 equivalence (Year 2 focus)
2. Always show visual proof side-by-side
3. Same-sized shapes for comparison (critical!)
4. **CRITICAL: ALL circles showing quarters MUST include `<div class="division-lines"></div>` to show the 4 equal parts**
5. Use multiple representations (circles, rectangles, bars)
6. Emphasize "same amount" language
7. Answer key explains WHY they're equal
8. Colored backgrounds Q1-Q5
9. Year 2 appropriate language
10. **RANDOMIZATION**: Each generation MUST vary:
    - Colors used (shaded-blue, shaded-orange, shaded-green)
    - Shape orientations (horizontal/vertical rectangles)
    - Q2 option positions (shuffle 1/4, 2/4, 3/4 order)
    - Q5 word problem contexts (pizza, chocolate bar, cake, sandwich, ribbon)
    - Number of slices in Q5 (vary between 4, 8 slices showing same 1/2 = 2/4 concept)
    - Question wording variations (e.g., "Are they the same?" vs "Do they show the same amount?")

## EXAMPLES

### Q1 Template (Visual Comparison):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Look at these two shapes. Do they show the same amount shaded?</p>
  <div class="equivalence-container">
    <div class="equivalence-pair">
      <div class="fraction-item">
        <div class="fraction-circle">
          <div class="fraction-half-circle shaded"></div>
        </div>
        <p class="fraction-label">1/2</p>
        <p>(one half)</p>
      </div>
      <span class="question-mark">?</span>
      <div class="fraction-item">
        <div class="fraction-circle">
          <div class="fraction-quarter-circle quarter-1 shaded-blue"></div>
          <div class="fraction-quarter-circle quarter-2 shaded-blue"></div>
          <div class="fraction-quarter-circle quarter-3 unshaded"></div>
          <div class="fraction-quarter-circle quarter-4 unshaded"></div>
          <div class="division-lines"></div>
        </div>
        <p class="fraction-label">2/4</p>
        <p>(two quarters)</p>
      </div>
    </div>
  </div>
  <p class="question-text">Are they the same? <span class="answer-line"></span></p>
</div>
```

### Q2 Template (Match Equivalents):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Which fraction is the same amount as 1/2?</p>
  <div class="instruction-box">
    Look carefully at how much is shaded.
  </div>
  <div class="matching-options">
    <div class="matching-option">
      <div class="fraction-circle" style="width:100px;height:100px">
        <div class="fraction-quarter-circle quarter-1 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-2 unshaded"></div>
        <div class="fraction-quarter-circle quarter-3 unshaded"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
        <div class="division-lines"></div>
      </div>
      <p class="fraction-notation">1/4</p>
    </div>
    <div class="matching-option">
      <div class="fraction-circle" style="width:100px;height:100px">
        <div class="fraction-quarter-circle quarter-1 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-2 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-3 unshaded"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
        <div class="division-lines"></div>
      </div>
      <p class="fraction-notation">2/4</p>
    </div>
    <div class="matching-option">
      <div class="fraction-circle" style="width:100px;height:100px">
        <div class="fraction-quarter-circle quarter-1 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-2 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-3 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
        <div class="division-lines"></div>
      </div>
      <p class="fraction-notation">3/4</p>
    </div>
  </div>
  <p class="question-text">1/2 = <span class="answer-box"></span></p>
</div>
```

### Q3 Template (Complete Equivalence):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Complete: 1/2 = __/4</p>
  <div class="equivalence-container">
    <div class="equivalence-pair">
      <div class="fraction-item">
        <div class="fraction-rect">
          <div class="fraction-rect-half top shaded"></div>
          <div class="fraction-rect-half bottom unshaded"></div>
        </div>
        <p class="fraction-label">1/2</p>
      </div>
      <span class="equals-sign">=</span>
      <div class="fraction-item">
        <div class="fraction-rect">
          <div class="fraction-rect-quarter shaded" style="top:0"></div>
          <div class="fraction-rect-quarter shaded" style="top:25%"></div>
          <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
          <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
        </div>
        <p class="fraction-label">__/4</p>
      </div>
    </div>
  </div>
  <p class="question-text">1/2 = <span class="answer-box"></span>/4</p>
</div>
```

### Q4 Template (Multiple Representations):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Do all these shapes show 1/2 (one half)?</p>
  <div class="equivalence-container">
    <div style="display:flex;justify-content:space-around;flex-wrap:wrap">
      <div style="text-align:center;margin:10px">
        <div class="fraction-circle" style="width:100px;height:100px">
          <div class="fraction-half-circle shaded-blue"></div>
        </div>
        <p>Circle</p>
      </div>
      <div style="text-align:center;margin:10px">
        <div class="fraction-rect" style="width:120px;height:80px">
          <div class="fraction-rect-half top shaded-blue"></div>
          <div class="fraction-rect-half bottom unshaded"></div>
        </div>
        <p>Rectangle</p>
      </div>
      <div style="text-align:center;margin:10px">
        <div class="fraction-bar" style="width:140px;height:50px">
          <div class="bar-section shaded-blue"></div>
          <div class="bar-section unshaded"></div>
        </div>
        <p>Bar</p>
      </div>
    </div>
  </div>
  <p class="question-text">Do they all show 1/2? <span class="answer-line"></span></p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A pizza is cut into 4 equal slices. Emma eats 1/2 of the pizza. How many slices did Emma eat?</p>
  <div class="word-problem-visual">
    <div class="pizza-visual">
      <div class="fraction-circle" style="width:150px;height:150px">
        <div class="fraction-quarter-circle quarter-1 shaded"></div>
        <div class="fraction-quarter-circle quarter-2 shaded"></div>
        <div class="fraction-quarter-circle quarter-3 unshaded"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
        <div class="division-lines"></div>
      </div>
      <p class="fraction-label">Pizza with 4 slices</p>
      <p style="font-size:15pt;color:#666">Emma eats the green part</p>
    </div>
  </div>
  <p class="question-text">Emma ate <span class="answer-box"></span> slices.</p>
  <p class="question-text">This is the same as <span class="answer-box"></span>/4 of the pizza.</p>
  <div class="equivalence-statement">
    1/2 = 2/4
  </div>
</div>
```

## FRESHNESS USAGE (CRITICAL)

**IF freshness specs provided above, USE THEM EXACTLY:**

1. **Q1-COLOR**: Use this color for Q1 circles (e.g., `shaded-orange`)
2. **Q1-VARIATION**: Use this question wording variation (A, B, or C from Q1 variations above)
3. **Q2-ORDER**: Use this exact order for Q2 options (e.g., `2/4,3/4,1/4`)
4. **Q3-SHAPE**: Use this shape type for Q3 (e.g., `rectangle-vertical`)
5. **Q4-VARIATION**: Use this question type variation (A, B, C, or D from Q4 variations above)
6. **Q5-CONTEXT**: Use this context for Q5 word problem (e.g., `pizza`)
7. **Q5-PIECES**: Use this number of pieces for Q5 (e.g., `4` or `8`)

**IF NO freshness specs provided (first worksheet), choose randomly.**

## DEBUG SPEC EMBEDDING (CRITICAL - MUST INCLUDE)

**YOU MUST EMBED A HIDDEN SPAN TAG (NOT AN HTML COMMENT) IN Q1 FOR FRESHNESS TRACKING.**

**CORRECT FORMAT** (use `<span>` tag with `display:none`):
```html
<div class="question" style="background: #FFF9C4;">
    <span style="display:none;">SPEC: Q1-COLOR:shaded-blue|Q1-VAR:A|Q2-ORDER:2/4,3/4,1/4|Q3-SHAPE:circle|Q4-VAR:B|Q5-CTX:pizza|Q5-PIECES:4</span>
    <p class="question-text"><span class="question-number">1.</span> Look at these two shapes...</p>
    ...
</div>
```

**WRONG FORMAT** (DO NOT use HTML comment):
```html
❌ <!-- SPEC: Q1-COLOR:shaded-blue... --> (WRONG - this is a comment!)
```

**CRITICAL RULES**:
1. Use `<span style="display:none;">` (NOT `<!-- ... -->` comment)
2. Place as FIRST child inside Q1's question div
3. Format: EXACTLY `SPEC: KEY:value|KEY:value|...` (no spaces around colons/pipes)
4. Use actual values you chose for this worksheet

**EXAMPLE**: If you chose shaded-green, variation B, order "1/4,3/4,2/4", rectangle-vertical, variation A, cake, 8:
```html
<span style="display:none;">SPEC: Q1-COLOR:shaded-green|Q1-VAR:B|Q2-ORDER:1/4,3/4,2/4|Q3-SHAPE:rectangle-vertical|Q4-VAR:A|Q5-CTX:cake|Q5-PIECES:8</span>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Only 1/2 = 2/4 equivalence used?
- [ ] Visual proof for all questions?
- [ ] Same-sized shapes for comparison?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key explains equivalence?
- [ ] "Same amount" language used?
- [ ] **DEBUG LOG INCLUDED at top of HTML?**
- [ ] **Each generation DIFFERENT from previous?**

Generate complete HTML with DEBUG LOG FIRST, then worksheet. UK Year 2 aligned.
