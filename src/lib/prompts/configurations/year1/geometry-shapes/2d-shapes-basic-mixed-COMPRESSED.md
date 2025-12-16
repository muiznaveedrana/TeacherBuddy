# Ages 5-6: 2D Shapes Basic (MIXED LAYOUT V1)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

**LAYOUT TYPE:** Mixed (Fluency → Application → Reasoning)

## YEAR 1 FOCUS
- **Curriculum Objective (1G1a):** Recognise and name common 2-D shapes
- **Core Shapes:** Circle, Triangle, Square, Rectangle
- **Extended Shapes:** Pentagon, Hexagon (exposure only)
- **Key Vocabulary:** sides, corners, flat, curved, straight
- **Number Range:** Count sides 0-6, count shapes 1-10
- **Interactive Priority:** Shape names and numbers as typed answers
- **Key Misconception:** "A square is NOT a rectangle" (FALSE - squares ARE rectangles)

## SECTION STRUCTURE
- **Section A (Fluency):** Q1 + Q2 - Shape naming and counting properties
- **Section B (Application):** Q3 + Q4 - Find shapes and word problem
- **Section C (Reasoning):** Q5 - Test square/rectangle misconception

BGs: Q1=#E3F2FD Q2=#E3F2FD Q3=#F3E5F5 Q4=#F3E5F5 Q5=#FFF3E0

## SHAPE IMAGES
Available at `/images/`:
- `2d-circle.png` - Circle (0 sides, 0 corners)
- `2d-triangle.png` - Triangle (3 sides, 3 corners)
- `2d-square.png` - Square (4 sides, 4 corners)
- `2d-rectangle.png` - Rectangle (4 sides, 4 corners)
- `2d-pentagon.png` - Pentagon (5 sides, 5 corners)
- `2d-hexagon.png` - Hexagon (6 sides, 6 corners)

## CSS (Mixed Layout - Year 1 Shapes)
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px;line-height:1.4}

/* WORKSHEET HEADER */
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}

/* SECTION HEADERS */
.section-header{display:flex;align-items:center;gap:10px;margin:20px 0 10px 0;padding:8px 12px;border-radius:8px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;color:white;font-size:14pt}
.section-title{font-size:14pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}

/* QUESTION BASE */
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* SHAPE DISPLAY */
.shape-row{display:flex;justify-content:center;gap:25px;margin:15px 0;flex-wrap:wrap}
.shape-item{display:flex;flex-direction:column;align-items:center;gap:8px}
.shape-item img{width:70px;height:70px}
.shape-label{font-size:12pt;color:#666}

/* PROPERTIES GRID */
.properties-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:15px 0}
.property-item{display:flex;flex-direction:column;align-items:center;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.property-item img{width:55px;height:55px;margin-bottom:8px}
.property-question{font-size:13pt;text-align:center}

/* SCENE BOX */
.scene-box{background:#FAFAFA;border:3px solid #9C27B0;border-radius:12px;padding:15px;margin:15px 0;text-align:center}
.scene-title{font-size:14pt;font-weight:bold;color:#7B1FA2;margin-bottom:10px}
.scene-objects{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin:15px 0}
.scene-objects img{width:50px;height:50px}
.count-row{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-top:15px}
.count-item{display:flex;align-items:center;gap:8px;font-size:14pt}

/* WORD PROBLEM */
.word-problem-box{background:#FCE4EC;border:2px solid #E91E63;border-radius:10px;padding:15px;margin:15px 0}
.character-name{font-weight:bold;color:#C2185B}
.story-text{font-size:14pt;color:#333;line-height:1.5;margin:10px 0}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:10px;padding:15px;margin:15px 0}
.speech-bubble{background:white;border:2px solid #66BB6A;border-radius:12px;padding:12px;margin:10px 0;position:relative}
.character-icon{font-size:32pt;margin-right:10px;vertical-align:middle}
.claim-text{font-size:14pt;font-weight:bold}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:55px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## QUESTION TEMPLATES

### Q1: Fluency - Name the Shapes
Show 4 shapes, child writes the name of each.
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">1</span> Write the name of each shape.</p>
  <div class="shape-row">
    <div class="shape-item">
      <img src="/images/2d-circle.png" alt="circle">
      <span class="answer-box-word"></span>
    </div>
    <div class="shape-item">
      <img src="/images/2d-triangle.png" alt="triangle">
      <span class="answer-box-word"></span>
    </div>
    <div class="shape-item">
      <img src="/images/2d-square.png" alt="square">
      <span class="answer-box-word"></span>
    </div>
    <div class="shape-item">
      <img src="/images/2d-rectangle.png" alt="rectangle">
      <span class="answer-box-word"></span>
    </div>
  </div>
</div>
```

### Q2: Fluency - Count Sides Grid (2×3)
Show 6 shapes, child counts sides for each.
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> How many sides does each shape have?</p>
  <div class="properties-grid">
    <div class="property-item">
      <img src="/images/2d-triangle.png" alt="triangle">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
    <div class="property-item">
      <img src="/images/2d-square.png" alt="square">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
    <div class="property-item">
      <img src="/images/2d-rectangle.png" alt="rectangle">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
    <div class="property-item">
      <img src="/images/2d-pentagon.png" alt="pentagon">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
    <div class="property-item">
      <img src="/images/2d-hexagon.png" alt="hexagon">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
    <div class="property-item">
      <img src="/images/2d-circle.png" alt="circle">
      <p class="property-question"><span class="answer-box-small"></span> sides</p>
    </div>
  </div>
</div>
```

### Q3: Application - Find Shapes in Scene
Show a themed scene with objects, child counts shapes.
```html
<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="question" style="background:#F3E5F5">
  <p class="question-text"><span class="question-number">3</span> Look at the picture. Count the shapes.</p>
  <div class="scene-box">
    <p class="scene-title">At the Playground</p>
    <div class="scene-objects">
      <!-- Mix of themed objects that represent shapes -->
      <img src="/images/ball.png" alt="ball" title="circle">
      <img src="/images/ball.png" alt="ball" title="circle">
      <img src="/images/2d-triangle.png" alt="slide" title="triangle">
      <img src="/images/2d-rectangle.png" alt="door" title="rectangle">
      <img src="/images/2d-square.png" alt="window" title="square">
      <img src="/images/ball.png" alt="ball" title="circle">
    </div>
    <div class="count-row">
      <div class="count-item">Circles: <span class="answer-box-small"></span></div>
      <div class="count-item">Triangles: <span class="answer-box-small"></span></div>
      <div class="count-item">Rectangles: <span class="answer-box-small"></span></div>
    </div>
  </div>
</div>
```

### Q4: Application - Word Problem
Character-based story about shapes.
```html
<div class="question" style="background:#F3E5F5">
  <p class="question-text"><span class="question-number">4</span> Read and answer.</p>
  <div class="word-problem-box">
    <p class="story-text"><span class="character-name">Emma</span> draws <strong>3 circles</strong> and <strong>4 triangles</strong> on her paper.</p>
    <p class="sub-question">a) How many shapes did Emma draw in total? <span class="answer-box"></span> shapes</p>
    <p class="sub-question">b) How many more triangles than circles? <span class="answer-box"></span> more</p>
  </div>
</div>
```

### Q5: Reasoning - Square/Rectangle Misconception
Test the common misconception that squares are not rectangles.
```html
<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>

<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Look at what Max says.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <span class="claim-text">"A square is NOT a rectangle because all its sides are the same."</span>
    </div>
  </div>
  <p class="sub-question">a) Is Max correct? <span class="answer-box-small"></span> (Yes / No)</p>
  <p class="sub-question">b) A square has <span class="answer-box-small"></span> sides and <span class="answer-box-small"></span> corners, just like a rectangle!</p>
</div>
```

## THEME VARIATIONS (3 Worksheets)

### Theme 1: Playground (Easy)
**Characters:** Lily, Max
**Setting:** School playground
**Objects:** balls (circles), slide (triangle), door (rectangle), tiles (squares)

| Q | Details |
|---|---------|
| Q1 | Name shapes: circle, triangle, square, rectangle |
| Q2 | Count sides: triangle(3), square(4), rectangle(4), pentagon(5), hexagon(6), circle(0) |
| Q3 | Playground scene: 3 circles, 1 triangle, 1 rectangle → count each |
| Q4 | Lily draws 2 squares and 3 circles. Total? (5) More circles? (1) |
| Q5 | Max says square is not rectangle → No! 4 sides, 4 corners |

**Answer Key (Comma-separated):**
- Q1: circle, triangle, square, rectangle
- Q2: 3, 4, 4, 5, 6, 0
- Q3: 3, 1, 1
- Q4: 5, 1
- Q5: No, 4, 4

### Theme 2: Kitchen (Average)
**Characters:** Chef Charlie, Baker Ben
**Setting:** Bakery kitchen
**Objects:** pizzas (circles), sandwich slices (triangles), baking trays (rectangles), crackers (squares)

| Q | Details |
|---|---------|
| Q1 | Name shapes: circle, triangle, square, rectangle |
| Q2 | Count sides: triangle(3), square(4), rectangle(4), pentagon(5), hexagon(6), circle(0) |
| Q3 | Kitchen scene: 2 circles (pizza), 2 triangles (sandwich), 3 rectangles (trays) |
| Q4 | Chef Charlie bakes 4 circle cookies and 2 square biscuits. Total? (6) More circles? (2) |
| Q5 | Ben says square is not rectangle → No! 4 sides, 4 corners |

**Answer Key (Comma-separated):**
- Q1: circle, triangle, square, rectangle
- Q2: 3, 4, 4, 5, 6, 0
- Q3: 2, 2, 3
- Q4: 6, 2
- Q5: No, 4, 4

### Theme 3: Robot Factory (Challenge)
**Characters:** Robot Ruby, Engineer Eddie
**Setting:** Robot workshop
**Objects:** Robot parts made of various shapes

| Q | Details |
|---|---------|
| Q1 | Name shapes: circle, triangle, square, rectangle (in different orientations) |
| Q2 | Count sides: triangle(3), square(4), rectangle(4), pentagon(5), hexagon(6), circle(0) |
| Q3 | Robot scene: 4 circles (wheels), 2 triangles (arms), 2 rectangles (body parts) |
| Q4 | Ruby uses 5 squares and 3 pentagons for a robot. Total? (8) More squares? (2) |
| Q5 | Eddie says square is not rectangle → No! 4 sides, 4 corners |

**Answer Key (Comma-separated):**
- Q1: circle, triangle, square, rectangle
- Q2: 3, 4, 4, 5, 6, 0
- Q3: 4, 2, 2
- Q4: 8, 2
- Q5: No, 4, 4

## ANSWER KEY FORMAT (Parser-Compatible)

**CRITICAL:** Use COMMA-SEPARATED answers. NO a), b), c) prefixes for text answers.
The parser splits by commas to extract individual answers.

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> circle, triangle, square, rectangle</p>
  <p><strong>2.</strong> 3, 4, 4, 5, 6, 0 (circle has no straight sides)</p>
  <p><strong>3.</strong> 3, 1, 1</p>
  <p><strong>4.</strong> 5, 1</p>
  <p><strong>5.</strong> No, 4, 4 (A square IS a rectangle - it has 4 sides and 4 corners)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - 5 questions total
2. **Section headers required** - A: Fluency, B: Application, C: Reasoning
3. **Layout badge** - "Mixed Layout" in header
4. **Q1 uses `.answer-box-word`** for shape names (wider input)
5. **Q2 grid** - 2×3 layout with 6 shapes
6. **Q3 themed scene** - Use objects that match theme
7. **Q4 two parts** - Total shapes AND comparison (more/fewer)
8. **Q5 tests misconception** - Square IS a rectangle
9. **All answer boxes** - Must use `.answer-box`, `.answer-box-small`, or `.answer-box-word`
10. **Answer key format** - Use a) b) c) for multi-part questions

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section headers A, B, C present?
- [ ] Layout badge shows "Mixed Layout"?
- [ ] Q1: 4 shape images with word answer boxes?
- [ ] Q2: 6-item grid (2×3) with number answers?
- [ ] Q3: Themed scene with 3 count boxes?
- [ ] Q4: Two-part word problem (a and b)?
- [ ] Q5: Reasoning with misconception about squares?
- [ ] All images use `/images/2d-{shape}.png` paths?
- [ ] Answer key has all answers labeled a) b) c) etc?

**Total answer boxes:** 4 + 6 + 3 + 2 + 3 = 18 answers

Generate complete HTML. UK Year 1 aligned. Use themed characters throughout.
