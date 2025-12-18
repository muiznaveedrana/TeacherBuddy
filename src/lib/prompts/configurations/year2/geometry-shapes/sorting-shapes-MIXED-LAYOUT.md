# Ages 6-7: Sorting & Classifying Shapes (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Sorting Shapes: 2D or 3D?"
- Theme: Basic sorting
- Focus: 2D vs 3D classification

**IF difficulty = "average":**
- Title: "Sorting Shapes: Count the Sides!"
- Theme: Sorting by sides
- Focus: 3, 4, 5, 6 sided shapes

**IF difficulty = "hard":**
- Title: "Sorting Shapes: Shape Detectives!"
- Theme: Properties sorting
- Focus: Curved vs straight, equal sides

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
.shape-item{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:80px}
.circle-2d{width:50px;height:50px;border-radius:50%;background:#FF9800;border:3px solid #F57C00;margin:0 auto}
.square-2d{width:50px;height:50px;background:#4CAF50;border:3px solid #2E7D32;margin:0 auto}
.rectangle-2d{width:70px;height:45px;background:#2196F3;border:3px solid #1976D2;margin:0 auto}
.triangle-2d{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:52px solid #F44336;margin:0 auto}
.pentagon-2d{width:60px;height:57px;background:#9C27B0;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%);margin:0 auto}
.hexagon-2d{width:60px;height:52px;background:#FF5722;clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);margin:0 auto}
.cube-3d{width:50px;height:50px;background:#FF9800;border:3px solid #F57C00;margin:0 auto;transform:perspective(200px) rotateX(-10deg) rotateY(15deg)}
.sphere-3d{width:50px;height:50px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#4CAF50,#2E7D32);margin:0 auto}
.shape-label{font-size:11pt;font-weight:bold;color:#1976D2;margin-top:5px}
.sorting-box{display:inline-block;min-width:120px;padding:10px;border:3px solid #1976D2;border-radius:8px;background:#E3F2FD;margin:5px;text-align:center}
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

### Section A: Fluency (Q1-Q2) - Basic sorting
- Q1: Identify which group two shapes belong to
- Q2: Count how many shapes have a property

### Section B: Application (Q3-Q4) - Order and classify
- Q3: Order shapes by number of sides (3 shapes, write 1,2,3)
- Q4: Identify which shape is the odd one out

### Section C: Reasoning (Q5) - Sorting reasoning + misconception
- Q5: Two parts: sorting reasoning + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - 2D or 3D)
**Shapes**: Square, Circle, Cube, Sphere

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Where does Square go? Where does Cube go? | 2D, 3D |
| Q2 | How many 2D shapes are shown? (Square, Circle, Cube, Sphere) | 2 |
| Q3 | Order by sides (Triangle 3, Square 4, Pentagon 5): least to most | 1, 2, 3 |
| Q4 | Odd one out: Square, Rectangle, Triangle, Hexagon (all have 4+ sides except triangle) | triangle |
| Q5 | Which box for circle? + "A sphere is 2D because it's round" misconception | 2D, No |

**Answer Key**: 2D, 3D, 2, 1, 2, 3, triangle, 2D, No

### Worksheet 2 (Average - Count the Sides)
**Shapes**: Triangle, Square, Pentagon, Hexagon

| Q | Content | Answers |
|---|---------|---------|
| Q1 | How many sides does Triangle have? Pentagon? | 3, 5 |
| Q2 | How many shapes have more than 4 sides? (Triangle 3, Square 4, Pentagon 5, Hexagon 6) | 2 |
| Q3 | Order by sides (Square 4, Pentagon 5, Hexagon 6): least to most | 1, 2, 3 |
| Q4 | Odd one out: Triangle, Pentagon, Hexagon, Octagon (all odd number of sides except octagon) | octagon |
| Q5 | Which has most sides? + "A square has 5 sides" misconception | hexagon, No |

**Answer Key**: 3, 5, 2, 1, 2, 3, octagon, hexagon, No

### Worksheet 3 (Hard - Shape Detectives)
**Shapes**: Circle, Square, Triangle, Rectangle

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Does Circle have curved sides? Does Square have curved sides? | Yes, No |
| Q2 | How many shapes have all straight sides? (Circle, Square, Triangle, Rectangle) | 3 |
| Q3 | Order by sides (Triangle 3, Rectangle 4, Pentagon 5): least to most | 1, 2, 3 |
| Q4 | Odd one out: Square, Rectangle, Circle, Hexagon (all have straight sides except circle) | circle |
| Q5 | Which shape has curved sides? + "A triangle has 4 sides" misconception | circle, No |

**Answer Key**: Yes, No, 3, 1, 2, 3, circle, circle, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 2D, 3D</p>
  <p><strong>2.</strong> 2</p>
  <p><strong>3.</strong> 1, 2, 3</p>
  <p><strong>4.</strong> triangle</p>
  <p><strong>5.</strong> 2D, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers?
- [ ] Q2: 1 answer?
- [ ] Q3: 3 answers (ordering)?
- [ ] Q4: 1 answer (odd one out)?
- [ ] Q5: 2 answers (answer + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
