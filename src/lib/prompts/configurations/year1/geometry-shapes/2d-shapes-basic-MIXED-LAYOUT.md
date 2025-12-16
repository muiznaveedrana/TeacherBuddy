# Ages 5-6: 2D Shapes Basic (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 2D shapes questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Odd one out, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1 - 1G1a)
- **Shapes:** Circle, Triangle, Square, Rectangle ONLY
- **Properties:** Sides, Corners (vertices)
- **Key facts:** Circle=0 sides/corners, Triangle=3, Square=4 equal, Rectangle=4 (2 pairs)
- **Key misconception:** Square is not a rectangle (it IS a special rectangle)

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
.shape-display{margin:10px}
.shape-display.circle{width:80px;height:80px;border-radius:50%;background:#4A90E2}
.shape-display.triangle{width:0;height:0;border-left:45px solid transparent;border-right:45px solid transparent;border-bottom:78px solid #E74C3C}
.shape-display.square{width:70px;height:70px;background:#27AE60}
.shape-display.rectangle{width:100px;height:60px;background:#9B59B6}
.fluency-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:10px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:13pt}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.shape-options{display:flex;justify-content:space-around;margin:10px 0}
.shape-option{text-align:center;padding:8px}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Name shapes**: Show 4 shapes (CSS), write names
- **Multiple choice**: Show 1 shape, choose correct name from options

### Q2 OPTIONS (Fluency - Pick ONE):
- **Count sides**: Grid of 4 shapes, count sides for each
- **Count corners**: Grid of 4 shapes, count corners for each
- **Sides AND corners**: 2 shapes, count both properties

### Q3 OPTIONS (Application - Pick ONE):
- **Real-world objects**: Pictures of objects, identify shape
- **Find in scene**: Classroom/kitchen scene, identify shapes of objects

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (sides)**: Character draws shapes, count total sides
- **Word problem (corners)**: Character collects shapes, count total corners
- **Sort problem**: Sort shapes by property

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Character makes claim about shape property
- **Odd one out**: 4 shapes, identify which doesn't belong
- **Explain thinking**: Why a shape has certain property

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name 4 shapes | Circle, Triangle, Square, Rectangle |
| Q2 | Count sides | Circle(0), Triangle(3), Square(4), Rectangle(4) |
| Q3 | Objects | Clock=circle, Sandwich=triangle, Window=square |
| Q4 | Word problem | "Draw 2 triangles. How many sides?" 3+3=6 |
| Q5 | True/False | "A circle has 0 sides" → Yes, 0 |

### WS2: Varied (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name 4 shapes | Square, Circle, Rectangle, Triangle |
| Q2 | Count corners | Triangle(3), Square(4), Rectangle(4), Circle(0) |
| Q3 | Classroom scene | Door=rectangle, Clock=circle, Ruler=rectangle |
| Q4 | Total corners | "3 squares. How many corners?" 4+4+4=12 |
| Q5 | Odd one out | Circle among triangles → A (no corners) |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name 4 shapes | Rectangle, Triangle, Circle, Square |
| Q2 | Sides AND corners | Triangle(3 sides, 3 corners), Rectangle(4 sides, 4 corners) |
| Q3 | Sort by sides | 0 sides=circle, 3 sides=triangle, 4 sides=square/rectangle |
| Q4 | Compare | "Which has more corners: 2 triangles or 1 square?" |
| Q5 | Explain | "Tom says square has more sides than rectangle" → No, both 4 |

## TEMPLATES

### Q1 - Name Shapes Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Name each shape.</p>
  <div class="shape-row">
    <div class="shape-item">
      <div class="shape-display circle"></div>
      <p>a) <span class="answer-box-word"></span></p>
    </div>
    <div class="shape-item">
      <div class="shape-display triangle"></div>
      <p>b) <span class="answer-box-word"></span></p>
    </div>
    <div class="shape-item">
      <div class="shape-display square"></div>
      <p>c) <span class="answer-box-word"></span></p>
    </div>
    <div class="shape-item">
      <div class="shape-display rectangle"></div>
      <p>d) <span class="answer-box-word"></span></p>
    </div>
  </div>
</div>
```

### Q2 - Count Properties Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>How many sides does each shape have?</p>
  <div class="fluency-grid">
    <div class="fluency-item"><div class="shape-display circle" style="width:40px;height:40px"></div> Circle: <span class="answer-box-small"></span></div>
    <div class="fluency-item"><div class="shape-display triangle" style="transform:scale(0.5)"></div> Triangle: <span class="answer-box-small"></span></div>
    <div class="fluency-item"><div class="shape-display square" style="width:40px;height:40px"></div> Square: <span class="answer-box-small"></span></div>
    <div class="fluency-item"><div class="shape-display rectangle" style="width:50px;height:30px"></div> Rectangle: <span class="answer-box-small"></span></div>
  </div>
</div>
```

### Q3 - Real-World Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>What shape is each object?</p>
  <div class="scene-box">
    <p class="scene-title">Look at these objects</p>
    <p style="font-size:36pt">🕐 🥪 🪟</p>
  </div>
  <p class="sub-question">a) Clock (🕐) is a <span class="answer-box-word"></span></p>
  <p class="sub-question">b) Sandwich (🥪) is a <span class="answer-box-word"></span></p>
  <p class="sub-question">c) Window (🪟) is a <span class="answer-box-word"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> draws 2 triangles. How many sides are there altogether?</span>
  </div>
  <p class="sub-question">Each triangle has <span class="answer-box-small"></span> sides.</p>
  <p class="sub-question">2 triangles have <span class="answer-box-small"></span> + <span class="answer-box-small"></span> = <span class="answer-box-small"></span> sides.</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">🤔</span>
      <strong>Max says:</strong> "A circle has 0 sides because it's round."
    </div>
  </div>
  <p class="sub-question">a) Is Max correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) How many sides does a circle have? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> circle, triangle, square, rectangle</p>
  <p><strong>2.</strong> 0, 3, 4, 4</p>
  <p><strong>3.</strong> circle, triangle, square</p>
  <p><strong>4.</strong> 3, 3, 3, 6</p>
  <p><strong>5.</strong> Yes, 0</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## SHAPE PROPERTIES REFERENCE
| Shape | Sides | Corners |
|-------|-------|---------|
| Circle | 0 | 0 |
| Triangle | 3 | 3 |
| Square | 4 | 4 |
| Rectangle | 4 | 4 |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Only Circle, Triangle, Square, Rectangle used?
- [ ] Answer key comma-separated (no explanations)?
