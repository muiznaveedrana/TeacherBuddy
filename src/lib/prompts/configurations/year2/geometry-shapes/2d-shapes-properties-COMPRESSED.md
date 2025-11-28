# Ages 6-7: 2D Shapes Properties

**CRITICAL: EXACTLY {{questionCount}} questions. Properties: sides, vertices (corners), lines of symmetry.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **2D Shapes**: circle, triangle, square, rectangle, pentagon, hexagon, octagon
- **Properties**: Number of sides, vertices (corners), lines of symmetry
- **Vocabulary**: flat shapes, sides, corners/vertices, straight/curved sides
- **Ages 6-7**: Hands-on exploration, visual identification

## QUESTION TYPES

**Q1**: Identify shape. "What is this shape?" Show CSS-generated shape.

**Q2**: Count sides. "How many sides does a pentagon have?"

**Q3**: Count vertices. "How many corners does a rectangle have?"

**Q4**: Match properties. "Which shapes have 4 sides?" Multiple choice.

**Q5**: Draw and describe. "Draw a hexagon. How many sides? How many corners?"

## 2D SHAPES REFERENCE
- **Circle**: 0 sides, 0 vertices, infinite lines of symmetry, 1 curved side
- **Triangle**: 3 sides, 3 vertices
- **Square**: 4 equal sides, 4 vertices, 4 lines of symmetry
- **Rectangle**: 4 sides (2 pairs equal), 4 vertices, 2 lines of symmetry
- **Pentagon**: 5 sides, 5 vertices
- **Hexagon**: 6 sides, 6 vertices
- **Octagon**: 8 sides, 8 vertices

## CSS (Ultra-Compact with Shapes):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.shape-container{margin:15px 0;padding:20px;background:#F5F5F5;border-radius:8px;text-align:center}
.shape-2d{display:inline-block;margin:15px}
.circle-2d{width:100px;height:100px;border-radius:50%;background:#FF9800;border:3px solid #F57C00}
.square-2d{width:100px;height:100px;background:#4CAF50;border:3px solid #2E7D32}
.rectangle-2d{width:140px;height:80px;background:#2196F3;border:3px solid #1976D2}
.triangle-2d{width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:104px solid #F44336;position:relative}
.pentagon-2d{width:100px;height:95px;background:#9C27B0;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%);border:3px solid #7B1FA2}
.hexagon-2d{width:100px;height:87px;background:#FF5722;clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);border:3px solid #E64A19}
.octagon-2d{width:100px;height:100px;background:#00BCD4;clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);border:3px solid #0097A7}
.shape-label{font-size:15pt;font-weight:bold;color:#1976D2;margin-top:10px}
.properties-box{margin:15px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.property-item{margin:10px 0;padding:10px;background:#FFF;border-radius:5px;font-size:15pt}
.property-label{font-weight:bold;color:#1976D2}
.matching-options{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.matching-option{margin:10px;padding:15px;border:2px solid #ddd;border-radius:8px;background:#FFF;text-align:center;min-width:120px}
.matching-option:hover{background:#E3F2FD;border-color:#2196F3}
.drawing-space{border:3px dashed #999;padding:20px;margin:15px 0;min-height:150px;background:#FFF;border-radius:8px;text-align:center}
.drawing-instruction{font-size:15pt;color:#666;font-style:italic}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use correct shape names (not "oblong" - use "rectangle")
2. "Vertices" or "corners" (both acceptable for Year 2)
3. All shapes CSS-generated (no images needed)
4. Clear visual examples
5. Properties focused on sides and vertices (Year 2 level)
6. Answer key with shape properties listed
7. Colored backgrounds Q1-Q5
8. Child-friendly language

## EXAMPLES

### Q1 Template (Identify Shape):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> What shapes are these?</p>
  <div class="shape-container">
    <div style="display:inline-block;margin:20px">
      <div class="circle-2d shape-2d"></div>
      <p class="shape-label">a) <span class="answer-line"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="square-2d shape-2d"></div>
      <p class="shape-label">b) <span class="answer-line"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="hexagon-2d shape-2d"></div>
      <p class="shape-label">c) <span class="answer-line"></span></p>
    </div>
  </div>
</div>
```

### Q2 Template (Count Sides):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> How many sides do these shapes have?</p>
  <div class="shape-container">
    <div style="display:inline-block;margin:20px">
      <div class="pentagon-2d shape-2d"></div>
      <p class="shape-label">Pentagon</p>
      <p class="question-text">Sides: <span class="answer-box"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="octagon-2d shape-2d"></div>
      <p class="shape-label">Octagon</p>
      <p class="question-text">Sides: <span class="answer-box"></span></p>
    </div>
  </div>
</div>
```

### Q3 Template (Count Vertices):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> How many corners (vertices) does each shape have?</p>
  <div class="instruction-box">
    Corners are where two sides meet.
  </div>
  <div class="shape-container">
    <div style="display:inline-block;margin:20px">
      <div class="rectangle-2d shape-2d"></div>
      <p class="shape-label">Rectangle</p>
      <p class="question-text">Corners: <span class="answer-box"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="triangle-2d shape-2d"></div>
      <p class="shape-label">Triangle</p>
      <p class="question-text">Corners: <span class="answer-box"></span></p>
    </div>
  </div>
</div>
```

### Q4 Template (Match Properties):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Tick (✓) all the shapes that have EXACTLY 4 sides.</p>
  <div class="matching-options">
    <div class="matching-option">
      <div class="square-2d shape-2d" style="width:80px;height:80px"></div>
      <p class="shape-label">Square</p>
      <p>☐</p>
    </div>
    <div class="matching-option">
      <div class="triangle-2d shape-2d" style="border-left:48px solid transparent;border-right:48px solid transparent;border-bottom:83px solid #F44336"></div>
      <p class="shape-label">Triangle</p>
      <p>☐</p>
    </div>
    <div class="matching-option">
      <div class="rectangle-2d shape-2d" style="width:100px;height:60px"></div>
      <p class="shape-label">Rectangle</p>
      <p>☐</p>
    </div>
    <div class="matching-option">
      <div class="hexagon-2d shape-2d" style="width:80px;height:70px"></div>
      <p class="shape-label">Hexagon</p>
      <p>☐</p>
    </div>
  </div>
</div>
```

### Q5 Template (Draw and Describe):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Draw a pentagon in the box below.</p>
  <div class="drawing-space">
    <p class="drawing-instruction">(Draw your pentagon here)</p>
  </div>
  <div class="properties-box">
    <p class="question-text">Now describe your pentagon:</p>
    <p class="property-item">Number of sides: <span class="answer-box"></span></p>
    <p class="property-item">Number of corners: <span class="answer-box"></span></p>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Correct shape names used?
- [ ] Properties appropriate for Year 2?
- [ ] CSS-generated shapes displayed?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with properties?
- [ ] Child-friendly language?

Generate complete HTML. UK Year 2 aligned.
