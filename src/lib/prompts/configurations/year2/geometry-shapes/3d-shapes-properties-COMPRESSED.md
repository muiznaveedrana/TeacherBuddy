# Year 2: 3D Shapes Properties

**CRITICAL: EXACTLY {{questionCount}} questions. Properties: faces, edges, vertices.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **3D Shapes**: cube, cuboid, sphere, cylinder, cone, pyramid
- **Properties**: Faces (flat surfaces), edges (where faces meet), vertices (corners)
- **Vocabulary**: solid shapes, 3D, faces, edges, vertices/corners
- **Ages 6-7**: Hands-on exploration with real objects

## QUESTION TYPES

**Q1**: Identify 3D shape. "What is this shape?" Show CSS-generated 3D representation.

**Q2**: Count faces. "How many faces does a cube have?"

**Q3**: Count edges. "How many edges does a cuboid have?"

**Q4**: Count vertices. "How many corners (vertices) does a square-based pyramid have?"

**Q5**: Match properties. "Which shape has 6 faces, 12 edges, and 8 vertices?"

## 3D SHAPES REFERENCE
- **Cube**: 6 faces (all squares), 12 edges, 8 vertices
- **Cuboid**: 6 faces (rectangles), 12 edges, 8 vertices
- **Sphere**: 1 curved surface, 0 edges, 0 vertices
- **Cylinder**: 3 faces (2 circular, 1 curved), 2 edges, 0 vertices
- **Cone**: 2 faces (1 circular, 1 curved), 1 edge, 1 vertex
- **Square-based Pyramid**: 5 faces (1 square, 4 triangles), 8 edges, 5 vertices

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.shape-3d-container{margin:15px 0;padding:20px;background:#F5F5F5;border-radius:8px;text-align:center}
.shape-3d{display:inline-block;margin:20px;position:relative}
.cube-3d{width:100px;height:100px;background:#FF9800;border:3px solid #F57C00;position:relative;transform:perspective(500px) rotateX(-15deg) rotateY(20deg);box-shadow:10px 10px 20px rgba(0,0,0,0.3)}
.cube-3d::before{content:'';position:absolute;width:100%;height:100%;background:#F57C00;top:-20px;left:0;transform:skewY(30deg);transform-origin:left}
.cube-3d::after{content:'';position:absolute;width:100%;height:100%;background:#E65100;right:-20px;top:0;transform:skewX(30deg);transform-origin:top}
.cuboid-3d{width:120px;height:80px;background:#2196F3;border:3px solid #1976D2;position:relative;transform:perspective(500px) rotateX(-15deg) rotateY(20deg);box-shadow:10px 10px 20px rgba(0,0,0,0.3)}
.sphere-3d{width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#4CAF50,#2E7D32);border:3px solid #1B5E20;box-shadow:10px 10px 20px rgba(0,0,0,0.3)}
.cylinder-3d{width:80px;height:100px;background:linear-gradient(90deg,#9C27B0,#7B1FA2,#9C27B0);border:3px solid #7B1FA2;border-radius:40px/10px;position:relative;box-shadow:10px 10px 20px rgba(0,0,0,0.3)}
.cone-3d{width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:120px solid #F44336;position:relative;filter:drop-shadow(5px 5px 10px rgba(0,0,0,0.3))}
.pyramid-3d{width:0;height:0;border-left:70px solid transparent;border-right:70px solid transparent;border-bottom:100px solid #FF5722;position:relative;filter:drop-shadow(5px 5px 10px rgba(0,0,0,0.3))}
.shape-label{font-size:15pt;font-weight:bold;color:#1976D2;margin-top:15px}
.properties-table{margin:15px auto;border-collapse:collapse;background:#FFF;max-width:400px}
.properties-table th{padding:10px;background:#1976D2;color:#FFF;border:2px solid #0D47A1;font-size:15pt}
.properties-table td{padding:10px;border:2px solid #1976D2;text-align:center;font-size:15pt}
.property-label{font-weight:bold;background:#E3F2FD;text-align:left}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.matching-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:15px;margin:15px 0}
.matching-card{padding:15px;border:2px solid #ddd;border-radius:8px;background:#FFF;text-align:center}
.matching-card:hover{background:#E3F2FD;border-color:#2196F3}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 5px;background:transparent}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use correct 3D shape names
2. "Faces" = flat or curved surfaces
3. "Edges" = where two faces meet
4. "Vertices" or "corners" (both acceptable)
5. CSS 3D representations with shadows
6. Answer key lists all properties
7. Colored backgrounds Q1-Q5
8. Real-world examples (dice=cube, can=cylinder)

## EXAMPLES

### Q1 Template (Identify):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Name these 3D shapes:</p>
  <div class="shape-3d-container">
    <div style="display:inline-block;margin:20px">
      <div class="cube-3d shape-3d"></div>
      <p class="shape-label">a) <span class="answer-line"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="sphere-3d shape-3d"></div>
      <p class="shape-label">b) <span class="answer-line"></span></p>
    </div>
  </div>
</div>
```

### Q2 Template (Count Faces):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> How many faces does each shape have?</p>
  <div class="instruction-box">
    A face is a flat or curved surface.
  </div>
  <div class="shape-3d-container">
    <div style="display:inline-block;margin:20px">
      <div class="cube-3d shape-3d"></div>
      <p class="shape-label">Cube</p>
      <p>Faces: <span class="answer-box"></span></p>
    </div>
    <div style="display:inline-block;margin:20px">
      <div class="cylinder-3d shape-3d"></div>
      <p class="shape-label">Cylinder</p>
      <p>Faces: <span class="answer-box"></span></p>
    </div>
  </div>
</div>
```

### Q5 Template (Match Properties):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Which shape has 6 faces, 12 edges, and 8 vertices?</p>
  <div class="matching-grid">
    <div class="matching-card">
      <div class="cube-3d shape-3d" style="width:80px;height:80px"></div>
      <p class="shape-label">Cube</p>
      <p>☐</p>
    </div>
    <div class="matching-card">
      <div class="sphere-3d shape-3d" style="width:80px;height:80px"></div>
      <p class="shape-label">Sphere</p>
      <p>☐</p>
    </div>
    <div class="matching-card">
      <div class="cone-3d shape-3d"></div>
      <p class="shape-label">Cone</p>
      <p>☐</p>
    </div>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Correct 3D shape names?
- [ ] Properties clearly defined?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full properties?

Generate complete HTML. UK Year 2 aligned.
