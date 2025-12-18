# Ages 6-7: 2D Shapes Properties (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "2D Shapes: Find the Shapes!"
- Theme: Basic shape identification
- Focus: Circle, square, triangle (3-4 sides)

**IF difficulty = "average":**
- Title: "2D Shapes: Count the Sides!"
- Theme: Shape properties
- Focus: Rectangle, pentagon, hexagon (4-6 sides)

**IF difficulty = "hard":**
- Title: "2D Shapes: Shape Detectives!"
- Theme: Advanced properties
- Focus: Hexagon, octagon, comparing shapes

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
.circle-2d{width:70px;height:70px;border-radius:50%;background:#FF9800;border:3px solid #F57C00;margin:0 auto}
.square-2d{width:70px;height:70px;background:#4CAF50;border:3px solid #2E7D32;margin:0 auto}
.rectangle-2d{width:100px;height:60px;background:#2196F3;border:3px solid #1976D2;margin:0 auto}
.triangle-2d{width:0;height:0;border-left:40px solid transparent;border-right:40px solid transparent;border-bottom:70px solid #F44336;margin:0 auto}
.pentagon-2d{width:80px;height:76px;background:#9C27B0;clip-path:polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%);margin:0 auto}
.hexagon-2d{width:80px;height:70px;background:#FF5722;clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);margin:0 auto}
.octagon-2d{width:80px;height:80px;background:#00BCD4;clip-path:polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%);margin:0 auto}
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

### Section A: Fluency (Q1-Q2) - Identify shapes and count sides
- Q1: Identify two shapes (name the shape)
- Q2: Count sides of one shape

### Section B: Application (Q3-Q4) - Order and count corners
- Q3: Order shapes by number of sides (3 shapes, write 1,2,3)
- Q4: Count corners/vertices of a shape

### Section C: Reasoning (Q5) - Property reasoning + misconception
- Q5: Two parts: sides/corners + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Find the Shapes)
**Shapes**: Circle, Square, Triangle.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Circle, Square | circle, square |
| Q2 | How many sides does a triangle have? | 3 |
| Q3 | Order by sides (Circle 0, Triangle 3, Square 4): least to most | 1, 2, 3 |
| Q4 | How many corners does a square have? | 4 |
| Q5 | Triangle sides + "A circle has 1 side" misconception | 3, No |

**Answer Key**: circle, square, 3, 1, 2, 3, 4, 3, No

### Worksheet 2 (Average - Count the Sides)
**Shapes**: Rectangle, Pentagon, Hexagon.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Rectangle, Pentagon | rectangle, pentagon |
| Q2 | How many sides does a hexagon have? | 6 |
| Q3 | Order by sides (Rectangle 4, Pentagon 5, Hexagon 6): least to most | 1, 2, 3 |
| Q4 | How many corners does a pentagon have? | 5 |
| Q5 | Hexagon corners + "Rectangle has 5 corners" misconception | 6, No |

**Answer Key**: rectangle, pentagon, 6, 1, 2, 3, 5, 6, No

### Worksheet 3 (Hard - Shape Detectives)
**Shapes**: Hexagon, Octagon, Pentagon.

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Name shape: Hexagon, Octagon | hexagon, octagon |
| Q2 | How many sides does an octagon have? | 8 |
| Q3 | Order by sides (Pentagon 5, Hexagon 6, Octagon 8): least to most | 1, 2, 3 |
| Q4 | How many corners does a hexagon have? | 6 |
| Q5 | Octagon corners + "Hexagon has 8 sides" misconception | 8, No |

**Answer Key**: hexagon, octagon, 8, 1, 2, 3, 6, 8, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> circle, square</p>
  <p><strong>2.</strong> 3</p>
  <p><strong>3.</strong> 1, 2, 3</p>
  <p><strong>4.</strong> 4</p>
  <p><strong>5.</strong> 3, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (shape names)?
- [ ] Q2: 1 answer (sides count)?
- [ ] Q3: 3 answers (ordering numbers)?
- [ ] Q4: 1 answer (corners count)?
- [ ] Q5: 2 answers (number + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?
- [ ] CSS-generated shapes (no images)?

Generate complete HTML. UK Year 2 aligned.
