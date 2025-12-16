# Ages 5-6: 3D Shapes Basic (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 3D shapes questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Odd one out, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1 - 1G1b)
- **Shapes:** Cube, Cuboid, Sphere, Cylinder, Cone, Pyramid
- **Properties:** Faces (flat), Vertices (corners), Edges, Curved surfaces
- **Key misconception:** Sphere has a face (NO - it has a curved surface)
- **Real-world:** dice=cube, ball=sphere, can=cylinder, party hat=cone

## CSS (Compact - Mixed Layout)
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
.shape-row{display:flex;justify-content:space-around;align-items:center;margin:12px 0;flex-wrap:wrap;gap:10px}
.shape-item{display:flex;flex-direction:column;align-items:center;gap:5px}
.shape-item .emoji{font-size:48pt}
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:13pt}
.fluency-item .emoji{font-size:28pt}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.scene-objects{font-size:36pt;letter-spacing:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.riddle-box{background:#FFFDE7;border:2px dashed #FBC02D;border-radius:8px;padding:10px;margin:8px 0}
.shape-options{display:flex;justify-content:space-around;margin:10px 0}
.shape-option{text-align:center;padding:8px}
.shape-option .emoji{font-size:36pt}
.shape-option .label{font-size:11pt;color:#666}
.shape-table{width:100%;border-collapse:collapse;margin:12px 0;font-size:12pt}
.shape-table th,.shape-table td{border:2px solid #ddd;padding:8px;text-align:center}
.shape-table th{background:#E3F2FD}
.shape-table .emoji{font-size:24pt}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Name shapes**: Show 4 shapes with emojis, write names (🧊=cube, ⚽=sphere, 🥫=cylinder, 🔺=cone)
- **Shape riddles**: 3 riddles describing shape properties
- **Table completion**: Fill in faces/edges/vertices for 2 shapes

### Q2 OPTIONS (Fluency - Pick ONE):
- **Count faces**: Grid of 6 shapes, count flat faces for each
- **Count vertices**: Grid of 6 shapes, count corners for each
- **Count edges**: Grid of 6 shapes, count edges for each
- **Compare shapes**: "more/fewer/same" comparisons

### Q3 OPTIONS (Application - Pick ONE):
- **Real-world scene**: Kitchen/toys/buildings - identify shape of objects
- **Sort by property**: Sort shapes by "can roll" vs "cannot roll"

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (faces)**: Character collects shapes, count total faces
- **Word problem (vertices)**: Character collects shapes, count total vertices
- **Stacking problem**: Shapes stacked, count visible faces

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Character makes claim about shape property (test misconception)
- **Odd one out**: 4 shapes, identify which doesn't belong and why
- **Explain thinking**: Character makes wrong claim, explain why wrong

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name 4 shapes | 🧊⚽🔺🥫 → cube, sphere, cone, cylinder |
| Q2 | Count vertices | 6 shapes: Cube(8), Cuboid(8), Pyramid(5), Sphere(0), Cone(1), Cylinder(0) |
| Q3 | Toys scene | 🏀=sphere, 🎲=cube, 📐=pyramid |
| Q4 | Word problem | "Tom has 4 spheres and 2 cubes. How many vertices do cubes have?" 8+8=16 |
| Q5 | True/False | "Zara says: A cube has more faces than a pyramid" → Yes, 6, 5 |

### WS2: Varied (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Shape riddles | "6 equal faces"=cube, "Can roll any direction"=sphere, "2 circular faces"=cylinder |
| Q2 | Count edges | 6 shapes: Cube(12), Pyramid(8), Cuboid(12), Sphere(0), Cone(1), Cylinder(2) |
| Q3 | Buildings scene | 🏛️=cylinders, 🏰=cuboids, ⛺=pyramid |
| Q4 | Stacking problem | "Mia stacks 3 cylinders. How many circular faces show?" 2+2=2 (top/bottom) |
| Q5 | Odd one out | Cube, Cuboid, Sphere, Pyramid → C (sphere has 0 flat faces) |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Table | Complete table: Cube(6,12,8), Pyramid(5,8,5) |
| Q2 | Compare | "Cube has ___ faces than pyramid" (more/fewer/same) |
| Q3 | Sort by rolling | Sphere/Cylinder can roll, Cube/Cuboid/Cone cannot |
| Q4 | Two-step | "Mr. Lee has 2 cubes and 1 pyramid. Total faces?" 6+6+5=17 |
| Q5 | Explain | "Robot says cylinder has 3 faces" → No, 2 (flat faces only) |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Name Shapes Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Look at each shape. Write its name.</p>
  <div class="shape-row">
    <div class="shape-item"><span class="emoji">🧊</span><p>a) <span class="answer-box-word"></span></p></div>
    <div class="shape-item"><span class="emoji">⚽</span><p>b) <span class="answer-box-word"></span></p></div>
    <div class="shape-item"><span class="emoji">🔺</span><p>c) <span class="answer-box-word"></span></p></div>
    <div class="shape-item"><span class="emoji">🥫</span><p>d) <span class="answer-box-word"></span></p></div>
  </div>
</div>
```

### Q2 - Fluency Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>How many flat faces does each shape have?</p>
  <div class="fluency-grid">
    <div class="fluency-item"><span class="emoji">🧊</span><span>Cube: <span class="answer-box-small"></span></span></div>
    <div class="fluency-item"><span class="emoji">📦</span><span>Cuboid: <span class="answer-box-small"></span></span></div>
    <div class="fluency-item"><span class="emoji">🥫</span><span>Cylinder: <span class="answer-box-small"></span></span></div>
    <div class="fluency-item"><span class="emoji">⚽</span><span>Sphere: <span class="answer-box-small"></span></span></div>
    <div class="fluency-item"><span class="emoji">🔺</span><span>Cone: <span class="answer-box-small"></span></span></div>
    <div class="fluency-item"><span class="emoji">🔻</span><span>Pyramid: <span class="answer-box-small"></span></span></div>
  </div>
</div>
```

### Q3 - Real-World Scene Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>What 3D shapes are these toys?</p>
  <div class="scene-box">
    <p class="scene-title">Toy Box</p>
    <div class="scene-objects">🏀 🎲 📐</div>
  </div>
  <p class="sub-question">a) Basketball (🏀) is a <span class="answer-box-word"></span></p>
  <p class="sub-question">b) Dice (🎲) is a <span class="answer-box-word"></span></p>
  <p class="sub-question">c) Set square (📐) is a <span class="answer-box-word"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Tom</strong> has 4 spheres and 2 cubes. How many vertices do the cubes have altogether?</span>
  </div>
  <p class="sub-question">Each cube has <span class="answer-box-small"></span> vertices.</p>
  <p class="sub-question">2 cubes have <span class="answer-box-small"></span> + <span class="answer-box-small"></span> = <span class="answer-box-small"></span> vertices altogether.</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <strong>Zara says:</strong> "A cube has more faces than a pyramid."
    </div>
  </div>
  <p class="sub-question">a) Is Zara correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) A cube has <span class="answer-box-small"></span> faces. A pyramid has <span class="answer-box-small"></span> faces.</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> cube, sphere, cylinder, cone</p>
  <p><strong>2.</strong> 6, 6, 2, 0, 1, 5</p>
  <p><strong>3.</strong> sphere, cube, pyramid</p>
  <p><strong>4.</strong> 8, 8, 8, 16</p>
  <p><strong>5.</strong> Yes, 6, 5</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## SHAPE PROPERTIES REFERENCE
| Shape | Faces | Edges | Vertices |
|-------|-------|-------|----------|
| Cube | 6 | 12 | 8 |
| Cuboid | 6 | 12 | 8 |
| Pyramid (square) | 5 | 8 | 5 |
| Sphere | 0 | 0 | 0 |
| Cone | 1 | 1 | 1 |
| Cylinder | 2 | 2 | 0 |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
