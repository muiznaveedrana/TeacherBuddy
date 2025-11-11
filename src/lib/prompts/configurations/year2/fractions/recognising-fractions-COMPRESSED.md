# Year 2: Recognising Fractions

**CRITICAL: EXACTLY {{questionCount}} questions. Fractions: 1/2, 1/4, 2/4, 3/4.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Fractions covered**: 1/2 (one half), 1/4 (one quarter), 2/4 (two quarters), 3/4 (three quarters)
- **Visual representations**: Circles, rectangles, bars (CSS-generated)
- **Skills**: Recognize fractions, identify shaded parts, name fractions
- **Ages 6-7**: Concrete visual understanding first

## QUESTION TYPES

**Q1**: Identify fraction from shaded shape. Show circle/rectangle with shaded parts. "What fraction is shaded?"

**Q2**: Match fraction to visual. "Which shape shows 1/2?" Show 3-4 options.

**Q3**: Shade the fraction. "Shade 1/4 of the circle." Show empty divided shape.

**Q4**: Multiple representations. "Circle all shapes that show 1/2." Show various shapes (circles, rectangles, bars).

**Q5**: Word problem with visual. "Emma eats 1/4 of a pizza. How many pieces did she eat out of 4?" (Note: Only for Q5, you may use "pizza" (circle) or "chocolate bar" (rectangle) to add context. All other questions must use abstract geometric terms.)

## SHAPE TYPES
- **Circles**: Divided into 2 or 4 equal parts (pie chart style)
- **Rectangles**: Divided horizontally or vertically into 2 or 4 equal parts
- **Bars**: Divided into 2 or 4 equal sections

## COLOR SCHEME
- **Shaded parts**: #4CAF50 (green), #2196F3 (blue), #FF9800 (orange)
- **Unshaded parts**: #FFF (white) with #999 borders
- **Borders**: 3px solid #333

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.fraction-container{margin:15px 0;padding:15px;background:#F5F5F5;border-radius:8px;text-align:center}
.fraction-circle{width:150px;height:150px;border-radius:50%;border:3px solid #333;position:relative;overflow:hidden;margin:15px auto;display:inline-block}
.fraction-half-circle{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-quarter-circle{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.fraction-rect{width:180px;height:120px;border:3px solid #333;border-radius:5px;position:relative;display:inline-block;margin:15px;overflow:hidden}
.fraction-rect-half{width:100%;height:50%;position:absolute}
.fraction-rect-half.top{top:0;left:0}
.fraction-rect-half.bottom{bottom:0;left:0}
.fraction-rect-quarter{width:100%;height:25%;position:absolute}
.fraction-bar{width:200px;height:60px;border:3px solid #333;border-radius:5px;display:flex;margin:15px auto}
.bar-section{flex:1;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:15pt}
.bar-section:last-child{border-right:none}
.shaded{background:#4CAF50;color:#FFF}
.unshaded{background:#FFF;color:#999}
.shaded-blue{background:#2196F3;color:#FFF}
.shaded-orange{background:#FF9800;color:#FFF}
.fraction-options{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.fraction-option{margin:10px;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;cursor:pointer}
.fraction-option:hover{background:#E3F2FD;border-color:#2196F3}
.fraction-label{font-size:18pt;font-weight:bold;color:#1976D2;margin-top:10px}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.pizza-visual{display:inline-block;margin:15px}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. ONLY use fractions: 1/2, 1/4, 2/4, 3/4
2. All shapes divided into EQUAL parts (critical for understanding)
3. Clear visual contrast between shaded/unshaded
4. Mix of circle, rectangle, and bar representations
5. Use child-friendly language (halves, quarters)
6. Answer key with explanations
7. Colored backgrounds Q1-Q5
8. Year 2 appropriate complexity
9. **CRITICAL - LANGUAGE CONSTRAINT**: Use ONLY abstract geometric language (circle, rectangle, bar, shape) for Q1-Q4. DO NOT reference real-world objects like fruits, vegetables, food items, sports items, animals, etc. For Q5 word problems ONLY, you may use "pizza" (rendered as circle) or "chocolate bar" (rendered as rectangle) to add real-world context. Questions must match what can be visually rendered with CSS geometric shapes.

## EXAMPLES

### Q1 Template (Identify Fraction):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> What fraction of the circle is shaded?</p>
  <div class="fraction-container">
    <!-- Circle divided into 4 quarters, with 1 shaded -->
    <div class="fraction-circle">
      <div class="fraction-quarter-circle quarter-1 shaded"></div>
      <div class="fraction-quarter-circle quarter-2 unshaded"></div>
      <div class="fraction-quarter-circle quarter-3 unshaded"></div>
      <div class="fraction-quarter-circle quarter-4 unshaded"></div>
    </div>
  </div>
  <p class="question-text">Shaded fraction: <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Match Fraction):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Which shape shows 1/2 (one half)?</p>
  <div class="fraction-options">
    <div class="fraction-option">
      <div class="fraction-circle" style="width:100px;height:100px">
        <div class="fraction-half-circle shaded-blue"></div>
      </div>
      <p style="text-align:center;margin-top:5px"><strong>A</strong></p>
    </div>
    <div class="fraction-option">
      <div class="fraction-rect" style="width:100px;height:80px">
        <div class="fraction-rect-quarter shaded-blue" style="top:0"></div>
        <div class="fraction-rect-quarter unshaded" style="top:25%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
      </div>
      <p style="text-align:center;margin-top:5px"><strong>B</strong></p>
    </div>
    <div class="fraction-option">
      <div class="fraction-bar" style="width:120px;height:50px">
        <div class="bar-section shaded-blue"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
      </div>
      <p style="text-align:center;margin-top:5px"><strong>C</strong></p>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q3 Template (Shade the Fraction):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Shade 1/4 (one quarter) of the rectangle.</p>
  <div class="instruction-box">
    Color in ONE of the four equal parts below.
  </div>
  <div class="fraction-container">
    <div class="fraction-rect" style="width:200px;height:120px">
      <div class="fraction-rect-quarter unshaded" style="top:0"></div>
      <div class="fraction-rect-quarter unshaded" style="top:25%"></div>
      <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
      <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
    </div>
  </div>
</div>
```

### Q4 Template (Multiple Representations):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Circle all the shapes that show 1/2 (one half).</p>
  <div class="fraction-options">
    <div class="fraction-option">
      <div class="fraction-circle" style="width:90px;height:90px">
        <div class="fraction-half-circle shaded-orange"></div>
      </div>
    </div>
    <div class="fraction-option">
      <div class="fraction-bar" style="width:120px;height:50px">
        <div class="bar-section shaded-orange"></div>
        <div class="bar-section unshaded"></div>
      </div>
    </div>
    <div class="fraction-option">
      <div class="fraction-rect" style="width:100px;height:80px">
        <div class="fraction-rect-quarter shaded-orange" style="top:0"></div>
        <div class="fraction-rect-quarter unshaded" style="top:25%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
      </div>
    </div>
    <div class="fraction-option">
      <div class="fraction-rect" style="width:120px;height:70px">
        <div class="fraction-rect-half top shaded-orange"></div>
        <div class="fraction-rect-half bottom unshaded"></div>
      </div>
    </div>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Emma eats 1/4 of a pizza. The pizza is cut into 4 equal slices. How many slices did Emma eat?</p>
  <div class="word-problem-visual">
    <div class="pizza-visual">
      <div class="fraction-circle" style="width:140px;height:140px">
        <div class="fraction-quarter-circle quarter-1 shaded"></div>
        <div class="fraction-quarter-circle quarter-2 unshaded"></div>
        <div class="fraction-quarter-circle quarter-3 unshaded"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
      </div>
      <p class="fraction-label">Pizza cut into 4 slices</p>
    </div>
  </div>
  <p class="question-text">Emma ate <span class="answer-box"></span> slice(s).</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Only fractions: 1/2, 1/4, 2/4, 3/4?
- [ ] All shapes divided EQUALLY?
- [ ] Clear shaded/unshaded contrast?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?
- [ ] Child-friendly language?
- [ ] Q1-Q4 use ONLY geometric terms (circle, rectangle, bar, shape)?
- [ ] Q5 (if word problem) uses only "pizza" or "chocolate bar" for context?
- [ ] NO references to fruits, vegetables, sports items, or other objects?

Generate complete HTML. UK Year 2 aligned.
