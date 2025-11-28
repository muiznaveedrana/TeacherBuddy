# Ages 6-7: Position, Direction & Movement

**CRITICAL: EXACTLY {{questionCount}} questions. Position, direction, movement, turns.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Position**: left, right, top, bottom, above, below, next to, between
- **Direction**: forwards, backwards, left, right, up, down
- **Movement**: straight line, patterns
- **Turns**: whole turn (360°), half turn (180°), quarter turn (90°), clockwise/anticlockwise
- **Ages 6-7**: Practical, visual contexts

## QUESTION TYPES

**Q1**: Describe position. "The cat is ___ the box." (above/below/next to)

**Q2**: Follow directions. "Start at A. Go right 3, up 2. Where are you?"

**Q3**: Draw movement path. "Draw a line from start to finish."

**Q4**: Identify turns. "What turn does the arrow make?" (quarter/half/whole turn)

**Q5**: Clockwise/anticlockwise. "Which way does the clock hand turn?"

## VOCABULARY
- **Position**: left, right, top, bottom, above, below, over, under, next to, between, in front, behind
- **Direction**: forwards, backwards, left, right, up, down, north, south, east, west
- **Turns**: whole turn (360°), half turn (180°), quarter turn (90°), clockwise (⟳), anticlockwise (⟲)

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.position-scene{margin:15px 0;padding:20px;background:#FFF9C4;border:3px solid #FF9800;border-radius:8px;text-align:center;position:relative;min-height:200px}
.position-object{display:inline-block;margin:15px;font-size:40pt}
.grid-container{margin:15px 0;padding:15px;background:#F5F5F5;border-radius:8px}
.movement-grid{display:grid;grid-template-columns:repeat(5,60px);grid-template-rows:repeat(5,60px);gap:2px;margin:15px auto;width:fit-content}
.grid-cell{width:60px;height:60px;border:2px solid #1976D2;background:#FFF;display:flex;align-items:center;justify-content:center;font-size:18pt;font-weight:bold}
.grid-cell.start{background:#4CAF50;color:#FFF}
.grid-cell.end{background:#F44336;color:#FFF}
.grid-cell.path{background:#E3F2FD}
.direction-arrows{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.arrow-large{font-size:60pt;margin:10px;display:inline-block}
.turn-diagram{margin:15px auto;width:150px;height:150px;border:4px solid #333;border-radius:50%;position:relative;background:#FFF}
.turn-arrow{position:absolute;top:50%;left:50%;width:60px;height:4px;background:#F44336;transform-origin:left center}
.turn-arrow::after{content:'';position:absolute;right:-10px;top:-8px;width:0;height:0;border-left:20px solid #F44336;border-top:10px solid transparent;border-bottom:10px solid transparent}
.turn-label{text-align:center;font-size:15pt;font-weight:bold;color:#1976D2;margin-top:10px}
.compass-rose{margin:15px auto;width:180px;height:180px;position:relative;background:#FFF;border:3px solid #333;border-radius:50%}
.compass-point{position:absolute;font-size:18pt;font-weight:bold}
.compass-n{top:5px;left:50%;transform:translateX(-50%);color:#F44336}
.compass-s{bottom:5px;left:50%;transform:translateX(-50%);color:#2196F3}
.compass-e{right:5px;top:50%;transform:translateY(-50%);color:#FF9800}
.compass-w{left:5px;top:50%;transform:translateY(-50%);color:#4CAF50}
.path-drawing{border:3px dashed #999;padding:20px;margin:15px 0;min-height:180px;background:#FFF;border-radius:8px;position:relative}
.path-start{position:absolute;top:20px;left:20px;width:40px;height:40px;background:#4CAF50;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#FFF;font-weight:bold}
.path-end{position:absolute;bottom:20px;right:20px;width:40px;height:40px;background:#F44336;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#FFF;font-weight:bold}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 5px;background:transparent}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use simple, clear positional language
2. Visual diagrams for all questions
3. Grid coordinates simple (letters/numbers)
4. Turn angles: quarter (90°), half (180°), whole (360°)
5. Clockwise = ⟳ (right), Anticlockwise = ⟲ (left)
6. Answer key with explanations
7. Colored backgrounds Q1-Q5

## EXAMPLES

### Q1 Template (Position):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Fill in the missing words to describe where things are.</p>
  <div class="position-scene">
    <div style="position:relative;display:inline-block">
      <div class="position-object" style="position:absolute;top:-60px;left:50%;transform:translateX(-50%)">🐱</div>
      <div class="position-object">📦</div>
      <div class="position-object" style="position:absolute;bottom:-60px;left:50%;transform:translateX(-50%)">🐶</div>
    </div>
  </div>
  <p class="question-text">a) The cat is <span class="answer-line"></span> the box.</p>
  <p class="question-text">b) The dog is <span class="answer-line"></span> the box.</p>
</div>
```

### Q2 Template (Follow Directions - Grid):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Follow the directions on the grid.</p>
  <div class="instruction-box">
    Start at the green square. Go right 3 squares, then up 2 squares.
  </div>
  <div class="grid-container">
    <div class="movement-grid">
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell start">START</div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
      <div class="grid-cell"></div>
    </div>
  </div>
  <p class="question-text">Mark your finishing position with a cross (X).</p>
</div>
```

### Q3 Template (Draw Path):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Draw a path from START to FINISH.</p>
  <div class="instruction-box">
    Your path must not go through the obstacles (🚫).
  </div>
  <div class="path-drawing">
    <div class="path-start">S</div>
    <div class="path-end">F</div>
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:30pt">🚫</div>
    <div style="position:absolute;top:30%;left:60%;font-size:30pt">🚫</div>
  </div>
</div>
```

### Q4 Template (Turns):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> What turn has the arrow made?</p>
  <div style="display:flex;justify-content:space-around;flex-wrap:wrap;margin:20px 0">
    <div style="text-align:center;margin:15px">
      <div class="turn-diagram">
        <div class="turn-arrow" style="transform:rotate(0deg) translateX(-50%)"></div>
        <div class="turn-arrow" style="transform:rotate(90deg) translateX(-50%);background:#4CAF50"></div>
      </div>
      <p class="turn-label">From red to green arrow</p>
      <p>Answer: <span class="answer-line"></span> turn</p>
    </div>
  </div>
  <div class="instruction-box">
    Hint: Quarter turn = 90°, Half turn = 180°, Whole turn = 360°
  </div>
</div>
```

### Q5 Template (Clockwise/Anticlockwise):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Which direction do these turn?</p>
  <div style="display:flex;justify-content:space-around;flex-wrap:wrap;margin:20px 0">
    <div style="text-align:center;margin:15px">
      <div style="font-size:80pt">⟳</div>
      <p class="turn-label">This arrow</p>
      <p><span class="answer-line"></span></p>
      <p style="font-size:12pt;color:#666">(clockwise or anticlockwise?)</p>
    </div>
    <div style="text-align:center;margin:15px">
      <div style="font-size:80pt">🕐</div>
      <p class="turn-label">Clock hands</p>
      <p><span class="answer-line"></span></p>
    </div>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Clear positional language?
- [ ] Visual diagrams included?
- [ ] Turn angles correct?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with explanations?

Generate complete HTML. UK Year 2 aligned.
