# Ages 7-8: Unit Fractions

**CRITICAL: EXACTLY {{questionCount}} questions. Unit fractions: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Unit fractions**: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10
- **Visual representations**: Circles, rectangles, bars, number lines
- **Skills**: Recognize unit fractions, find fractions of amounts, compare unit fractions
- **Real-world contexts**: Pizza slices, chocolate bars, sharing equally

## QUESTION TYPES

**Q1**: Shade unit fraction of shapes. "Shade 1/3 of the rectangle." Show divided shapes.

**Q2**: Find unit fractions of amounts. "Find 1/4 of 20." Show visual + calculation.

**Q3**: Fraction of a set (objects). "1/5 of the apples are green. How many?" Show object images.

**Q4**: Compare unit fractions. "Which is larger: 1/3 or 1/5?" Visual comparison.

**Q5**: Word problem. "Tom eats 1/8 of a chocolate bar. How many pieces did he eat?"

## FRACTION VISUALS

### Circles (Pizza/Pie style):
- **1/2**: Circle divided in half (vertical or horizontal)
- **1/3**: Circle divided into 3 equal parts
- **1/4**: Circle divided into 4 quarters
- **1/5**: Circle divided into 5 equal parts
- **1/8**: Circle divided into 8 slices
- **1/10**: Circle divided into 10 slices

### Rectangles/Bars:
- Divided horizontally or vertically
- Clear borders between sections
- One section shaded

### Number Lines:
- 0 to 1 marked
- Unit fractions marked: 0, 1/4, 1/2, 3/4, 1

## COLOR SCHEME (Year 3 Enhanced)
- **Shaded parts**: #9C27B0 (purple - fractions theme), #4CAF50 (green), #FF9800 (orange)
- **Unshaded parts**: #FFF (white) with #999 borders
- **Borders**: 3px solid #333
- **Fraction labels**: #7B1FA2 (deep purple)

## OBJECTS FOR SETS
Use images from `/images/counting/`:
- **fruits**: apple.png, orange.png, banana.png, strawberry.png (35px size)
- **toys**: ball.png, car.png, doll.png (35px size)
- **school**: pencil.png, book.png, eraser.png (35px size)

## CSS (Ultra-Compact Year 3 Enhanced):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.fraction-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px;text-align:center;border:2px solid #9C27B0}
.fraction-circle{width:180px;height:180px;border-radius:50%;border:3px solid #333;position:relative;overflow:hidden;margin:18px auto;display:inline-block}
.fraction-half{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-third{position:absolute;width:100%;height:100%}
.third-1{clip-path:polygon(50% 50%,50% 0,100% 43.3%)}
.third-2{clip-path:polygon(50% 50%,100% 43.3%,50% 100%)}
.third-3{clip-path:polygon(50% 50%,50% 100%,0 43.3%)}
.fraction-quarter{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.fraction-fifth{position:absolute;width:100%;height:100%}
.fifth-1{clip-path:polygon(50% 50%,50% 0,100% 20%)}
.fifth-2{clip-path:polygon(50% 50%,100% 20%,90% 65%)}
.fifth-3{clip-path:polygon(50% 50%,90% 65%,50% 100%)}
.fifth-4{clip-path:polygon(50% 50%,50% 100%,10% 65%)}
.fifth-5{clip-path:polygon(50% 50%,10% 65%,0 20%)}
.fraction-eighth{position:absolute;width:100%;height:100%}
.eighth-1{clip-path:polygon(50% 50%,50% 0,71% 0,71% 29%)}
.eighth-2{clip-path:polygon(50% 50%,71% 29%,100% 50%)}
.eighth-3{clip-path:polygon(50% 50%,100% 50%,71% 71%)}
.eighth-4{clip-path:polygon(50% 50%,71% 71%,50% 100%)}
.eighth-5{clip-path:polygon(50% 50%,50% 100%,29% 71%)}
.eighth-6{clip-path:polygon(50% 50%,29% 71%,0 50%)}
.eighth-7{clip-path:polygon(50% 50%,0 50%,29% 29%)}
.eighth-8{clip-path:polygon(50% 50%,29% 29%,50% 0)}
.fraction-tenth{position:absolute;width:100%;height:100%}
.tenth-1{clip-path:polygon(50% 50%,50% 0,81% 9%)}
.tenth-2{clip-path:polygon(50% 50%,81% 9%,100% 35%)}
.tenth-3{clip-path:polygon(50% 50%,100% 35%,97% 65%)}
.tenth-4{clip-path:polygon(50% 50%,97% 65%,78% 90%)}
.tenth-5{clip-path:polygon(50% 50%,78% 90%,50% 100%)}
.tenth-6{clip-path:polygon(50% 50%,50% 100%,22% 90%)}
.tenth-7{clip-path:polygon(50% 50%,22% 90%,3% 65%)}
.tenth-8{clip-path:polygon(50% 50%,3% 65%,0 35%)}
.tenth-9{clip-path:polygon(50% 50%,0 35%,19% 9%)}
.tenth-10{clip-path:polygon(50% 50%,19% 9%,50% 0)}
.fraction-rect{width:220px;height:140px;border:3px solid #333;border-radius:6px;position:relative;display:inline-block;margin:18px;overflow:hidden}
.rect-section{position:absolute;border:2px solid #333}
.fraction-bar{width:280px;height:70px;border:3px solid #333;border-radius:6px;display:flex;margin:18px auto}
.bar-section{flex:1;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt}
.bar-section:last-child{border-right:none}
.shaded{background:#9C27B0;color:#FFF}
.shaded-green{background:#4CAF50;color:#FFF}
.shaded-orange{background:#FF9800;color:#FFF}
.unshaded{background:#FFF;color:#999}
.fraction-label{font-size:20pt;font-weight:bold;color:#7B1FA2;margin-top:12px}
.fraction-amount-visual{margin:18px 0;padding:18px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.amount-display{text-align:center;margin:15px 0}
.amount-number{font-size:32pt;font-weight:bold;color:#2E7D32;display:inline-block;min-width:80px;padding:10px 20px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;margin:10px}
.calculation-step{font-size:18pt;font-weight:600;color:#1976D2;margin:12px 0;padding:12px;background:#FFF;border-radius:6px;border:2px dashed #2196F3}
.object-set-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px solid #FF9800;border-radius:8px}
.object-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:15px 0}
.object-grid img{width:35px;height:35px;border:2px solid #999;border-radius:4px;padding:3px}
.object-grid img.highlighted{border-color:#FF5722;border-width:3px;background:#FFEB3B}
.fraction-comparison{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.comparison-row{display:flex;justify-content:space-around;align-items:center;margin:15px 0;flex-wrap:wrap}
.comparison-item{text-align:center;margin:15px;padding:15px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:180px}
.comparison-symbol{font-size:40pt;font-weight:bold;color:#E91E63;margin:0 20px}
.number-line-fraction{margin:20px 0;padding:20px;background:#E3F2FD;border:2px solid #2196F3;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:30px 10px 10px}
.number-line::before{content:'';position:absolute;bottom:10px;left:5%;right:5%;height:3px;background:#333}
.number-mark{width:35px;height:35px;background:#E0E0E0;border:2px solid #999;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;z-index:1;flex-direction:column}
.number-mark.highlight{background:#9C27B0;color:white;border-width:3px}
.mark-label{font-size:9pt;margin-top:2px}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.chocolate-bar{display:inline-block;margin:15px}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:70px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. ONLY unit fractions: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10
2. All shapes divided into EQUAL parts (critical for understanding)
3. Clear visual contrast between shaded/unshaded
4. Mix of circle, rectangle, bar, and number line representations
5. Real-world contexts for word problems (chocolate, pizza, sharing)
6. Show working/calculations for Q2 (finding fractions of amounts)
7. Use object images for Q3 (fraction of sets)
8. Answer key with full working and explanations
9. Colored backgrounds Q1-Q5
10. Year 3 appropriate complexity (ages 7-8)

## EXAMPLES

### Q1 Template (Shade Unit Fraction):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Shade 1/4 (one quarter) of each shape.</p>
  <div class="instruction-box">
    Color in exactly ONE part of each shape to show one quarter.
  </div>
  <div class="fraction-container">
    <div style="display:inline-block;margin:20px">
      <p style="font-weight:bold;margin-bottom:10px">a) Circle</p>
      <div class="fraction-circle" style="width:140px;height:140px">
        <div class="fraction-quarter quarter-1 unshaded"></div>
        <div class="fraction-quarter quarter-2 unshaded"></div>
        <div class="fraction-quarter quarter-3 unshaded"></div>
        <div class="fraction-quarter quarter-4 unshaded"></div>
      </div>
    </div>
    <div style="display:inline-block;margin:20px">
      <p style="font-weight:bold;margin-bottom:10px">b) Rectangle</p>
      <div class="fraction-bar" style="width:200px;height:60px">
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
      </div>
    </div>
  </div>
</div>
```

### Q2 Template (Find Fraction of Amount):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Find the unit fractions of these amounts.</p>
  <div class="fraction-amount-visual">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">a) Find 1/5 of 20</p>
    <div class="amount-display">
      <span class="amount-number">20</span>
      <span style="font-size:24pt;margin:0 15px">÷</span>
      <span class="amount-number">5</span>
      <span style="font-size:24pt;margin:0 15px">=</span>
      <span class="answer-box"></span>
    </div>
    <div class="calculation-step">
      To find 1/5 of 20, divide 20 by 5
    </div>
  </div>
  <div class="fraction-amount-visual">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">b) Find 1/4 of 24</p>
    <div class="amount-display">
      <span class="amount-number">24</span>
      <span style="font-size:24pt;margin:0 15px">÷</span>
      <span class="answer-box" style="min-width:60px"></span>
      <span style="font-size:24pt;margin:0 15px">=</span>
      <span class="answer-box"></span>
    </div>
  </div>
</div>
```

### Q3 Template (Fraction of a Set):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Look at the apples below.</p>
  <div class="object-set-container">
    <div class="object-grid">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
      <img src="/images/counting/fruits/apple.png" width="35" height="35" alt="Apple">
    </div>
  </div>
  <p class="question-text">a) How many apples are there in total? <span class="answer-box" style="min-width:60px"></span></p>
  <p class="question-text">b) What is 1/5 of the apples? (Circle 1/5 of them on the picture above)</p>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
  <p class="question-text">1/5 of 10 apples = <span class="answer-box" style="min-width:60px"></span> apples</p>
</div>
```

### Q4 Template (Compare Unit Fractions):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Compare these unit fractions.</p>
  <div class="instruction-box">
    Remember: The smaller the denominator (bottom number), the LARGER the fraction!
  </div>
  <div class="fraction-comparison">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">a) Which is larger: 1/3 or 1/5?</p>
    <div class="comparison-row">
      <div class="comparison-item">
        <div class="fraction-circle" style="width:120px;height:120px">
          <div class="fraction-third third-1 shaded"></div>
          <div class="fraction-third third-2 unshaded"></div>
          <div class="fraction-third third-3 unshaded"></div>
        </div>
        <p class="fraction-label">1/3</p>
      </div>
      <div class="comparison-item">
        <div class="fraction-circle" style="width:120px;height:120px">
          <div class="fraction-fifth fifth-1 shaded-orange"></div>
          <div class="fraction-fifth fifth-2 unshaded"></div>
          <div class="fraction-fifth fifth-3 unshaded"></div>
          <div class="fraction-fifth fifth-4 unshaded"></div>
          <div class="fraction-fifth fifth-5 unshaded"></div>
        </div>
        <p class="fraction-label">1/5</p>
      </div>
    </div>
    <p class="question-text">Answer: <span class="answer-line"></span> is larger</p>
  </div>
  <div class="fraction-comparison">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px;margin-top:20px">b) Which is smaller: 1/4 or 1/2?</p>
    <p class="question-text">Answer: <span class="answer-line"></span> is smaller</p>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Tom has a chocolate bar divided into 8 equal pieces. He eats 1/8 of the chocolate bar.</p>
  <div class="word-problem-visual">
    <div class="chocolate-bar">
      <div class="fraction-bar" style="width:320px;height:60px">
        <div class="bar-section shaded-green"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
      </div>
      <p class="fraction-label">Chocolate Bar (8 pieces)</p>
    </div>
  </div>
  <p class="question-text">a) How many pieces did Tom eat? <span class="answer-box" style="min-width:60px"></span> piece(s)</p>
  <p class="question-text">b) How many pieces are left? <span class="answer-box" style="min-width:60px"></span> piece(s)</p>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
</div>
```

## ANSWER KEY TEMPLATE
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <div class="answer-key-content">
    <p><strong>1.</strong> Shading - Students should shade 1 out of 4 equal parts in each shape</p>
    <p><strong>2a.</strong> 4 (20 ÷ 5 = 4, so 1/5 of 20 is 4)</p>
    <p><strong>2b.</strong> 6 (24 ÷ 4 = 6, so 1/4 of 24 is 6)</p>
    <p><strong>3a.</strong> 10 apples in total</p>
    <p><strong>3b.</strong> 2 apples (10 ÷ 5 = 2, so 1/5 of 10 is 2)</p>
    <p><strong>4a.</strong> 1/3 is larger (fewer parts means bigger pieces)</p>
    <p><strong>4b.</strong> 1/4 is smaller (more parts means smaller pieces)</p>
    <p><strong>5a.</strong> 1 piece (1/8 of 8 pieces = 1 piece)</p>
    <p><strong>5b.</strong> 7 pieces (8 - 1 = 7 pieces left)</p>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Only unit fractions: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10?
- [ ] Q1: Shading activity with clear visuals?
- [ ] Q2: Finding fractions of amounts with division?
- [ ] Q3: Fraction of object sets with images?
- [ ] Q4: Comparison with visual support?
- [ ] Q5: Real-world word problem?
- [ ] All shapes divided EQUALLY?
- [ ] Clear shaded/unshaded contrast?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with working?
- [ ] Year 3 appropriate language and complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
