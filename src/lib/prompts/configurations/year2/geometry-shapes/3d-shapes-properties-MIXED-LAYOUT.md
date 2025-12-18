# Ages 6-7: 3D Shapes Properties (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "3D Shapes: Find the Solids!"
- Theme: Basic 3D identification
- Focus: Cube, sphere, cone

**IF difficulty = "average":**
- Title: "3D Shapes: Count the Faces!"
- Theme: Properties counting
- Focus: Cuboid, cylinder, pyramid

**IF difficulty = "hard":**
- Title: "3D Shapes: Shape Experts!"
- Theme: Advanced properties
- Focus: All shapes, edges and vertices

## CSS (Mixed Layout - Compact):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:10pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
.section-title{font-size:12pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}
.question{margin:10px 0;padding:12px;border-radius:8px}
.q-fluency{background:#E3F2FD}
.q-application{background:#F3E5F5}
.q-reasoning{background:#FFF3E0}
.question-number{display:inline-block;background:#4169E1;color:white;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:12pt}
.question-text{font-size:14pt;margin:5px 0;font-weight:600}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}
.shape-box{margin:12px 0;padding:12px;background:#FAFAFA;border:2px solid #1976D2;border-radius:8px;text-align:center}
.shape-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:15px}
.shape-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:100px}
.cube-3d{width:60px;height:60px;background:#FF9800;border:3px solid #F57C00;margin:0 auto;transform:perspective(200px) rotateX(-10deg) rotateY(15deg)}
.sphere-3d{width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#4CAF50,#2E7D32);margin:0 auto}
.cone-3d{width:0;height:0;border-left:35px solid transparent;border-right:35px solid transparent;border-bottom:70px solid #F44336;margin:0 auto}
.cylinder-3d{width:50px;height:60px;background:linear-gradient(90deg,#9C27B0,#7B1FA2,#9C27B0);border-radius:25px/8px;margin:0 auto}
.cuboid-3d{width:80px;height:50px;background:#2196F3;border:3px solid #1976D2;margin:0 auto;transform:perspective(200px) rotateX(-10deg) rotateY(15deg)}
.pyramid-3d{width:0;height:0;border-left:40px solid transparent;border-right:40px solid transparent;border-bottom:60px solid #FF5722;margin:0 auto}
.shape-label{font-size:12pt;font-weight:bold;color:#1976D2;margin-top:8px}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:10px}
.ordering-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:80px}
.reasoning-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#FFE082;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #FFA726;border-radius:10px;padding:10px;flex:1}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Identify and count
- Q1: Identify two 3D shapes (name them)
- Q2: Count faces of one shape

### Section B: Application (Q3-Q4) - Order and count
- Q3: Order shapes by number of faces (3 shapes, write 1,2,3)
- Q4: Count vertices of a shape

### Section C: Reasoning (Q5) - Property reasoning + misconception
- Q5: Two parts: edges count + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Find the Solids)
**Shapes**: Cube, Sphere, Cone.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Cube, Sphere | cube, sphere |
| Q2 | How many faces does a cube have? | 6 |
| Q3 | Order by faces (Sphere 1, Cone 2, Cube 6): least to most | 1, 2, 3 |
| Q4 | How many vertices does a cone have? | 1 |
| Q5 | Cube edges + "A sphere has 0 faces" misconception | 12, No |

**Answer Key**: cube, sphere, 6, 1, 2, 3, 1, 12, No

### Worksheet 2 (Average - Count the Faces)
**Shapes**: Cuboid, Cylinder, Pyramid.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Cylinder, Pyramid | cylinder, pyramid |
| Q2 | How many faces does a cylinder have? | 3 |
| Q3 | Order by faces (Cylinder 3, Pyramid 5, Cuboid 6): least to most | 1, 2, 3 |
| Q4 | How many vertices does a pyramid have? | 5 |
| Q5 | Cuboid edges + "A cylinder has 0 edges" misconception | 12, No |

**Answer Key**: cylinder, pyramid, 3, 1, 2, 3, 5, 12, No

### Worksheet 3 (Hard - Shape Experts)
**Shapes**: Cube, Pyramid, Cone.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Pyramid, Cone | pyramid, cone |
| Q2 | How many faces does a pyramid have? | 5 |
| Q3 | Order by vertices (Cone 1, Pyramid 5, Cube 8): least to most | 1, 2, 3 |
| Q4 | How many edges does a pyramid have? | 8 |
| Q5 | Cone edges + "A cube has 6 edges" misconception | 1, No |

**Answer Key**: pyramid, cone, 5, 1, 2, 3, 8, 1, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> cube, sphere</p>
  <p><strong>2.</strong> 6</p>
  <p><strong>3.</strong> 1, 2, 3</p>
  <p><strong>4.</strong> 1</p>
  <p><strong>5.</strong> 12, No</p>
</div>
```

## 3D SHAPES REFERENCE
- **Cube**: 6 faces, 12 edges, 8 vertices
- **Cuboid**: 6 faces, 12 edges, 8 vertices
- **Sphere**: 1 curved face, 0 edges, 0 vertices
- **Cylinder**: 3 faces, 2 edges, 0 vertices
- **Cone**: 2 faces, 1 edge, 1 vertex
- **Pyramid**: 5 faces, 8 edges, 5 vertices

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (shape names)?
- [ ] Q2: 1 answer (faces count)?
- [ ] Q3: 3 answers (ordering numbers)?
- [ ] Q4: 1 answer (vertices/edges count)?
- [ ] Q5: 2 answers (number + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
