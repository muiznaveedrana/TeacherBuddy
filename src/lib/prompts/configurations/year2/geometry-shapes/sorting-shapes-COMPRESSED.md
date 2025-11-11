# Year 2: Sorting & Classifying Shapes

**CRITICAL: EXACTLY {{questionCount}} questions. Sort by properties, Venn diagrams.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Sorting criteria**: Number of sides, type (2D/3D), has curved sides, has right angles
- **Venn diagrams**: Simple 1-2 circle diagrams
- **Skills**: Classify, compare, identify common properties
- **Ages 6-7**: Logical thinking with visual shapes

## QUESTION TYPES

**Q1**: Sort into 2D or 3D. "Put these shapes in the correct box."

**Q2**: Sort by number of sides. "Which shapes have 4 sides?"

**Q3**: Venn diagram (1 circle). "Put all shapes with curved sides in the circle."

**Q4**: Venn diagram (2 circles). "Sort shapes: Has 4 sides | Has all equal sides"

**Q5**: Odd one out. "Which shape doesn't belong? Explain why."

## SORTING CRITERIA
- **2D vs 3D**: Flat vs solid
- **Number of sides**: 3, 4, 5, 6, 8 sides
- **Curved vs straight**: Has any curved sides
- **Equal sides**: All sides same length
- **Right angles**: Has square corners

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sorting-container{margin:15px 0;padding:15px;background:#F5F5F5;border-radius:8px}
.sorting-boxes{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.sorting-box{min-width:200px;min-height:150px;border:3px solid #1976D2;border-radius:8px;background:#FFF;padding:15px;margin:10px}
.box-label{font-size:15pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:10px;padding:8px;background:#E3F2FD;border-radius:5px}
.shapes-to-sort{display:flex;justify-content:center;flex-wrap:wrap;gap:15px;margin:20px 0;padding:15px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.sortable-shape{display:inline-block;margin:10px;text-align:center}
.shape-small{transform:scale(0.7)}
.venn-container{margin:20px 0;padding:20px;background:#F5F5F5;border-radius:8px;text-align:center}
.venn-circle{width:250px;height:250px;border-radius:50%;border:4px solid #2196F3;background:rgba(33,150,243,0.1);display:inline-block;margin:20px;position:relative;vertical-align:middle}
.venn-label{position:absolute;top:-30px;left:50%;transform:translateX(-50%);font-size:15pt;font-weight:bold;color:#1976D2;background:#FFF;padding:5px 15px;border:2px solid #2196F3;border-radius:20px}
.venn-overlap{width:280px;height:250px;position:relative;display:inline-block;margin:20px}
.venn-left{position:absolute;left:0;width:200px;height:200px;border-radius:50%;border:4px solid #4CAF50;background:rgba(76,175,80,0.1)}
.venn-right{position:absolute;right:0;width:200px;height:200px;border-radius:50%;border:4px solid #FF9800;background:rgba(255,152,0,0.1)}
.venn-middle{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:80px;text-align:center;font-weight:bold;color:#F57C00}
.odd-one-out{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.shape-card{padding:15px;border:3px solid #ddd;border-radius:8px;background:#FFF;margin:10px;text-align:center;min-width:120px}
.shape-card:hover{background:#FFF9C4;border-color:#FF9800}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:120px;margin:0 5px;background:transparent}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Clear sorting criteria stated
2. Mix of 2D and 3D shapes
3. Venn diagrams simple (1-2 circles max)
4. Child-friendly explanations
5. Visual shape representations
6. Answer key explains reasoning
7. Colored backgrounds Q1-Q5

## EXAMPLES

### Q1 Template (2D vs 3D):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Sort these shapes into 2D (flat) or 3D (solid).</p>
  <div class="shapes-to-sort">
    <div class="sortable-shape">
      <div class="square-2d shape-small" style="width:70px;height:70px"></div>
      <p>Square</p>
    </div>
    <div class="sortable-shape">
      <div class="cube-3d shape-small" style="width:70px;height:70px"></div>
      <p>Cube</p>
    </div>
    <div class="sortable-shape">
      <div class="circle-2d shape-small" style="width:70px;height:70px"></div>
      <p>Circle</p>
    </div>
    <div class="sortable-shape">
      <div class="sphere-3d shape-small" style="width:70px;height:70px"></div>
      <p>Sphere</p>
    </div>
  </div>
  <div class="sorting-container">
    <div class="sorting-boxes">
      <div class="sorting-box">
        <div class="box-label">2D Shapes (Flat)</div>
      </div>
      <div class="sorting-box">
        <div class="box-label">3D Shapes (Solid)</div>
      </div>
    </div>
  </div>
</div>
```

### Q2 Template (Sort by Sides):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Tick (✓) all the shapes that have EXACTLY 4 sides.</p>
  <div class="odd-one-out">
    <div class="shape-card">
      <div class="square-2d" style="width:70px;height:70px"></div>
      <p>Square</p>
      <p>☐</p>
    </div>
    <div class="shape-card">
      <div class="triangle-2d" style="border-left:40px solid transparent;border-right:40px solid transparent;border-bottom:70px solid #F44336"></div>
      <p>Triangle</p>
      <p>☐</p>
    </div>
    <div class="shape-card">
      <div class="rectangle-2d" style="width:90px;height:60px"></div>
      <p>Rectangle</p>
      <p>☐</p>
    </div>
    <div class="shape-card">
      <div class="pentagon-2d" style="width:70px;height:66px"></div>
      <p>Pentagon</p>
      <p>☐</p>
    </div>
  </div>
</div>
```

### Q3 Template (Venn 1 Circle):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Put all shapes with CURVED sides inside the circle.</p>
  <div class="instruction-box">
    Draw arrows or write shape names.
  </div>
  <div class="shapes-to-sort">
    <div class="sortable-shape">
      <div class="circle-2d shape-small" style="width:60px;height:60px"></div>
      <p>A</p>
    </div>
    <div class="sortable-shape">
      <div class="square-2d shape-small" style="width:60px;height:60px"></div>
      <p>B</p>
    </div>
    <div class="sortable-shape">
      <div class="cylinder-3d shape-small" style="width:50px;height:70px"></div>
      <p>C</p>
    </div>
    <div class="sortable-shape">
      <div class="triangle-2d shape-small"></div>
      <p>D</p>
    </div>
  </div>
  <div class="venn-container">
    <div class="venn-circle">
      <div class="venn-label">Has Curved Sides</div>
    </div>
  </div>
</div>
```

### Q4 Template (Venn 2 Circles):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Sort the shapes using this Venn diagram.</p>
  <div class="venn-container">
    <div class="venn-overlap">
      <div class="venn-left">
        <div class="venn-label" style="background:#E8F5E9;border-color:#4CAF50;color:#2E7D32">Has 4 sides</div>
      </div>
      <div class="venn-right">
        <div class="venn-label" style="background:#FFF3E0;border-color:#FF9800;color:#F57C00;left:auto;right:50%;transform:translateX(50%)">All sides equal</div>
      </div>
      <div class="venn-middle">Both</div>
    </div>
  </div>
  <div class="shapes-to-sort">
    <div class="sortable-shape">
      <div class="square-2d shape-small" style="width:60px;height:60px"></div>
      <p>Square</p>
    </div>
    <div class="sortable-shape">
      <div class="rectangle-2d shape-small" style="width:80px;height:50px"></div>
      <p>Rectangle</p>
    </div>
    <div class="sortable-shape">
      <div class="triangle-2d shape-small"></div>
      <p>Equilateral Triangle</p>
    </div>
  </div>
</div>
```

### Q5 Template (Odd One Out):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Which shape is the odd one out? Circle it and explain why.</p>
  <div class="odd-one-out">
    <div class="shape-card">
      <div class="square-2d" style="width:70px;height:70px"></div>
      <p>A: Square</p>
    </div>
    <div class="shape-card">
      <div class="rectangle-2d" style="width:90px;height:60px"></div>
      <p>B: Rectangle</p>
    </div>
    <div class="shape-card">
      <div class="pentagon-2d" style="width:70px;height:66px"></div>
      <p>C: Pentagon</p>
    </div>
    <div class="shape-card">
      <div class="hexagon-2d" style="width:70px;height:60px"></div>
      <p>D: Hexagon</p>
    </div>
  </div>
  <p class="question-text">Odd one out: <span class="answer-box"></span></p>
  <p class="question-text">Because: <span class="answer-line"></span></p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Sorting criteria clear?
- [ ] Venn diagrams simple?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with reasoning?

Generate complete HTML. UK Year 2 aligned.
