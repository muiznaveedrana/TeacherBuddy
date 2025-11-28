# Ages 6-7: Block Diagrams & Tables

**CRITICAL: EXACTLY {{questionCount}} questions. Read and interpret block diagrams and simple tables.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Block diagrams**: Vertical bars made of colored blocks (1 block = 1 item)
- **Simple tables**: Rows and columns with data
- **Skills**: Read axes, count blocks, compare, interpret tables
- **Ages 6-7**: Visual representation of data

## QUESTION TYPES

**Q1**: Read block diagram. "How many children chose red?" Count colored blocks.

**Q2**: Compare from block diagram. "Which color was most popular?" or "How many more?"

**Q3**: Read simple table. "How many apples were sold on Monday?"

**Q4**: Calculate from table. "What was the total number of books read this week?"

**Q5**: Create block diagram from data. Provide table, students color blocks.

## BLOCK DIAGRAM FORMAT
- **Vertical bars**: Each category has a column
- **1 block = 1 unit**: Clear labeling
- **Colored blocks**: Different color per category
- **Labeled axes**: Horizontal (categories), Vertical (numbers 0-20)

## CONTEXTS
- **Favorite colors**: red, blue, green, yellow
- **Books read**: Monday-Friday
- **Items sold**: apples, oranges, bananas
- **Weather days**: sunny, rainy, cloudy

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.block-diagram-container{margin:15px 0;padding:20px;background:#F5F5F5;border:3px solid #1976D2;border-radius:8px}
.block-diagram-title{font-size:18pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:15px}
.block-diagram{display:flex;align-items:flex-end;justify-content:space-around;min-height:250px;border-left:3px solid #333;border-bottom:3px solid #333;padding:10px;position:relative;background:#FFF;margin:20px 15px}
.y-axis{position:absolute;left:-40px;top:0;height:100%;display:flex;flex-direction:column-reverse;justify-content:space-between;font-size:12pt;font-weight:bold}
.y-label{height:20px;display:flex;align-items:center}
.x-axis-labels{display:flex;justify-content:space-around;margin-top:10px;font-size:15pt;font-weight:bold}
.bar-column{display:flex;flex-direction:column;align-items:center;margin:0 10px}
.block-stack{display:flex;flex-direction:column-reverse;gap:2px}
.data-block{width:50px;height:20px;border:2px solid #333;border-radius:3px}
.block-red{background:#F44336}
.block-blue{background:#2196F3}
.block-green{background:#4CAF50}
.block-yellow{background:#FFEB3B}
.block-orange{background:#FF9800}
.block-purple{background:#9C27B0}
.category-label{margin-top:8px;font-size:15pt;font-weight:bold;text-align:center}
.simple-table-container{margin:15px 0;padding:15px;background:#F5F5F5;border:3px solid #1976D2;border-radius:8px}
.simple-table{border-collapse:collapse;margin:0 auto;background:#FFF;width:90%;max-width:500px}
.simple-table th{padding:12px;background:#1976D2;color:#FFF;border:2px solid #0D47A1;font-size:15pt;font-weight:bold}
.simple-table td{padding:12px;border:2px solid #1976D2;font-size:15pt;text-align:center}
.simple-table tr:nth-child(even){background:#E3F2FD}
.row-header{background:#E3F2FD!important;font-weight:bold;text-align:left}
.data-table{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Block diagrams: 1 block = 1 unit (clear labeling)
2. Vertical bars only (Year 2 standard)
3. Labeled axes (horizontal=categories, vertical=numbers)
4. Tables: Clear headers, aligned data
5. Numbers appropriate for Year 2 (1-20 range)
6. Real-world contexts
7. Answer key with explanations
8. Colored backgrounds Q1-Q5

## EXAMPLES

### Q1 Template (Read Block Diagram):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> This block diagram shows children's favorite colors.</p>
  <div class="block-diagram-container">
    <p class="block-diagram-title">Favorite Colors</p>
    <div class="block-diagram">
      <div class="y-axis">
        <div class="y-label">10</div>
        <div class="y-label">8</div>
        <div class="y-label">6</div>
        <div class="y-label">4</div>
        <div class="y-label">2</div>
        <div class="y-label">0</div>
      </div>
      <div class="bar-column">
        <div class="block-stack">
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
          <div class="data-block block-red"></div>
        </div>
        <p class="category-label">🔴 Red</p>
      </div>
      <div class="bar-column">
        <div class="block-stack">
          <div class="data-block block-blue"></div>
          <div class="data-block block-blue"></div>
          <div class="data-block block-blue"></div>
          <div class="data-block block-blue"></div>
          <div class="data-block block-blue"></div>
        </div>
        <p class="category-label">🔵 Blue</p>
      </div>
      <div class="bar-column">
        <div class="block-stack">
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
          <div class="data-block block-green"></div>
        </div>
        <p class="category-label">🟢 Green</p>
      </div>
      <div class="bar-column">
        <div class="block-stack">
          <div class="data-block block-yellow"></div>
          <div class="data-block block-yellow"></div>
          <div class="data-block block-yellow"></div>
          <div class="data-block block-yellow"></div>
        </div>
        <p class="category-label">🟡 Yellow</p>
      </div>
    </div>
    <p style="text-align:center;font-size:15pt;color:#666;margin-top:10px">Each block = 1 child</p>
  </div>
  <p class="question-text">a) How many children chose red? <span class="answer-box"></span></p>
  <p class="question-text">b) How many children chose green? <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Compare from Block Diagram):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Use the block diagram from Question 1.</p>
  <p class="question-text">a) Which color was MOST popular? <span class="answer-line"></span></p>
  <p class="question-text">b) Which color was LEAST popular? <span class="answer-line"></span></p>
  <p class="question-text">c) How many MORE children chose green than blue?</p>
  <div class="working-space"></div>
  <p class="question-text">Answer: <span class="answer-box"></span> more children</p>
</div>
```

### Q3 Template (Read Simple Table):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> This table shows books read by Class 2 this week.</p>
  <div class="simple-table-container">
    <table class="simple-table">
      <tr>
        <th>Day</th>
        <th>Number of Books</th>
      </tr>
      <tr>
        <td class="row-header">Monday</td>
        <td>6</td>
      </tr>
      <tr>
        <td class="row-header">Tuesday</td>
        <td>8</td>
      </tr>
      <tr>
        <td class="row-header">Wednesday</td>
        <td>5</td>
      </tr>
      <tr>
        <td class="row-header">Thursday</td>
        <td>9</td>
      </tr>
      <tr>
        <td class="row-header">Friday</td>
        <td>7</td>
      </tr>
    </table>
  </div>
  <p class="question-text">a) How many books were read on Monday? <span class="answer-box"></span></p>
  <p class="question-text">b) How many books were read on Thursday? <span class="answer-box"></span></p>
  <p class="question-text">c) Which day had the most books read? <span class="answer-line"></span></p>
</div>
```

### Q4 Template (Calculate from Table):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Using the table from Question 3, what was the TOTAL number of books read all week?</p>
  <div class="instruction-box">
    Add up all the numbers in the table.
  </div>
  <div class="working-space"></div>
  <p class="question-text">Total: <span class="answer-box"></span> books</p>
</div>
```

### Q5 Template (Create Block Diagram):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Complete the block diagram using the data in the table.</p>
  <div class="data-table">
    <table class="simple-table">
      <tr>
        <th>Fruit</th>
        <th>Number Sold</th>
      </tr>
      <tr>
        <td class="row-header">🍎 Apples</td>
        <td>6</td>
      </tr>
      <tr>
        <td class="row-header">🍊 Oranges</td>
        <td>4</td>
      </tr>
      <tr>
        <td class="row-header">🍌 Bananas</td>
        <td>8</td>
      </tr>
    </table>
  </div>
  <div class="instruction-box">
    Color the correct number of blocks for each fruit. Each block = 1 fruit.
  </div>
  <div class="block-diagram-container">
    <p class="block-diagram-title">Fruits Sold</p>
    <div class="block-diagram" style="min-height:220px">
      <div class="y-axis">
        <div class="y-label">10</div>
        <div class="y-label">8</div>
        <div class="y-label">6</div>
        <div class="y-label">4</div>
        <div class="y-label">2</div>
        <div class="y-label">0</div>
      </div>
      <div class="bar-column">
        <div class="block-stack" style="min-height:120px;border:2px dashed #999;width:54px;border-radius:3px"></div>
        <p class="category-label">🍎 Apples</p>
      </div>
      <div class="bar-column">
        <div class="block-stack" style="min-height:120px;border:2px dashed #999;width:54px;border-radius:3px"></div>
        <p class="category-label">🍊 Oranges</p>
      </div>
      <div class="bar-column">
        <div class="block-stack" style="min-height:120px;border:2px dashed #999;width:54px;border-radius:3px"></div>
        <p class="category-label">🍌 Bananas</p>
      </div>
    </div>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Block diagrams have labeled axes?
- [ ] 1 block = 1 unit clearly shown?
- [ ] Tables have clear headers?
- [ ] Appropriate numbers (1-20)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?
- [ ] Real-world contexts?

Generate complete HTML. UK Year 2 aligned.
