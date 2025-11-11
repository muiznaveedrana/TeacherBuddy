# Year 2: Pictograms

**CRITICAL: EXACTLY {{questionCount}} questions. Read and interpret pictograms.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Pictograms**: Visual data representation using pictures
- **Scale**: 1 picture = 1 item OR 1 picture = 2 items (Y2 introduces 1:2 scale)
- **Skills**: Read pictograms, answer questions, compare data
- **Ages 6-7**: Real-world data contexts (favorite fruits, pets, colors)

## QUESTION TYPES

**Q1**: Read simple pictogram (1:1 scale). "How many children chose apples?"

**Q2**: Compare categories. "Which fruit was most popular?" or "How many more chose bananas than oranges?"

**Q3**: Total calculation. "How many children were asked altogether?"

**Q4**: Pictogram with 1:2 scale. "Each picture = 2 children. How many children chose red?"

**Q5**: Create pictogram. "Complete the pictogram using the data." Provide table, students draw symbols.

## CONTEXTS
- **Favorite fruits**: apple, banana, orange, grape
- **Favorite pets**: cat, dog, fish, rabbit
- **Favorite colors**: red, blue, green, yellow
- **Transport to school**: walk, car, bus, bike

## SCALES
- **Scale 1:1**: 1 picture = 1 item (easier, use for Q1-Q3)
- **Scale 1:2**: 1 picture = 2 items (harder, introduce in Q4-Q5)

## PICTURE SYMBOLS
Use images from `/images/counting/`:
- **fruits**: apple.png, banana.png, orange.png, grape.png
- **farm_animals** (pets): cat.png (use chicken/duck as substitute), dog.png (use cow as substitute), rabbit.png (use sheep), fish.png (need to note)
- **toys**: ball.png, car.png, doll.png, teddy.png
- **school_supplies**: pencil.png, book.png, eraser.png, crayon.png

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.pictogram-container{margin:15px 0;padding:15px;background:#F5F5F5;border:3px solid #1976D2;border-radius:8px}
.pictogram-title{font-size:18pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:15px}
.pictogram-scale{font-size:15pt;font-weight:bold;color:#FF5722;text-align:center;margin-bottom:15px;padding:8px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:5px}
.pictogram-table{border-collapse:collapse;margin:0 auto;background:#FFF}
.pictogram-row{border-bottom:2px solid #ddd}
.pictogram-label{padding:10px 15px;font-weight:bold;font-size:15pt;background:#E3F2FD;border-right:3px solid #1976D2;min-width:120px;text-align:left}
.pictogram-data{padding:10px;min-height:60px;vertical-align:middle}
.pictogram-symbol{width:30px;height:30px;margin:3px;display:inline-block}
.data-table{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.data-table table{border-collapse:collapse;margin:0 auto;background:#FFF}
.data-table th{padding:10px 15px;background:#4CAF50;color:#FFF;border:2px solid #2E7D32;font-size:15pt}
.data-table td{padding:10px 15px;border:2px solid #4CAF50;font-size:15pt;text-align:center}
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

1. Clear title for each pictogram
2. Always show scale clearly (1 picture = ? items)
3. Use consistent image size (30px for symbols in pictogram)
4. Maximum 4-5 categories per pictogram
5. Numbers appropriate for Year 2 (1-20 range)
6. Questions progress from simple reading to calculations
7. Answer key explains counting method
8. Colored backgrounds Q1-Q5

## EXAMPLES

### Q1 Template (Read Simple Pictogram):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Look at the pictogram showing favorite fruits.</p>
  <div class="pictogram-container">
    <p class="pictogram-title">Favorite Fruits</p>
    <p class="pictogram-scale">Each picture = 1 child</p>
    <table class="pictogram-table">
      <tr class="pictogram-row">
        <td class="pictogram-label">🍎 Apple</td>
        <td class="pictogram-data">
          <img src="/images/apple.png" class="pictogram-symbol" alt="apple">
          <img src="/images/apple.png" class="pictogram-symbol" alt="apple">
          <img src="/images/apple.png" class="pictogram-symbol" alt="apple">
          <img src="/images/apple.png" class="pictogram-symbol" alt="apple">
          <img src="/images/apple.png" class="pictogram-symbol" alt="apple">
        </td>
      </tr>
      <tr class="pictogram-row">
        <td class="pictogram-label">🍌 Banana</td>
        <td class="pictogram-data">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
          <img src="/images/banana.png" class="pictogram-symbol" alt="banana">
        </td>
      </tr>
      <tr class="pictogram-row">
        <td class="pictogram-label">🍊 Orange</td>
        <td class="pictogram-data">
          <img src="/images/orange.png" class="pictogram-symbol" alt="orange">
          <img src="/images/orange.png" class="pictogram-symbol" alt="orange">
          <img src="/images/orange.png" class="pictogram-symbol" alt="orange">
        </td>
      </tr>
    </table>
  </div>
  <p class="question-text">a) How many children chose apples? <span class="answer-box"></span></p>
  <p class="question-text">b) How many children chose bananas? <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Compare Categories):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Use the pictogram from Question 1.</p>
  <p class="question-text">a) Which fruit was MOST popular? <span class="answer-line"></span></p>
  <p class="question-text">b) Which fruit was LEAST popular? <span class="answer-line"></span></p>
  <p class="question-text">c) How many MORE children chose bananas than oranges?</p>
  <div class="working-space"></div>
  <p class="question-text">Answer: <span class="answer-box"></span> more children</p>
</div>
```

### Q4 Template (Scale 1:2):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> This pictogram shows favorite colors.</p>
  <div class="instruction-box">
    ⚠️ IMPORTANT: Each picture = 2 children
  </div>
  <div class="pictogram-container">
    <p class="pictogram-title">Favorite Colors</p>
    <p class="pictogram-scale">Each picture = 2 children</p>
    <table class="pictogram-table">
      <tr class="pictogram-row">
        <td class="pictogram-label">🔴 Red</td>
        <td class="pictogram-data">
          <img src="/images/ball.png" class="pictogram-symbol" alt="red" style="filter:hue-rotate(0deg)">
          <img src="/images/ball.png" class="pictogram-symbol" alt="red" style="filter:hue-rotate(0deg)">
          <img src="/images/ball.png" class="pictogram-symbol" alt="red" style="filter:hue-rotate(0deg)">
          <img src="/images/ball.png" class="pictogram-symbol" alt="red" style="filter:hue-rotate(0deg)">
        </td>
      </tr>
      <tr class="pictogram-row">
        <td class="pictogram-label">🔵 Blue</td>
        <td class="pictogram-data">
          <img src="/images/ball.png" class="pictogram-symbol" alt="blue" style="filter:hue-rotate(220deg)">
          <img src="/images/ball.png" class="pictogram-symbol" alt="blue" style="filter:hue-rotate(220deg)">
          <img src="/images/ball.png" class="pictogram-symbol" alt="blue" style="filter:hue-rotate(220deg)">
        </td>
      </tr>
    </table>
  </div>
  <p class="question-text">a) How many children chose red? <span class="answer-box"></span></p>
  <p class="question-text">b) How many children chose blue? <span class="answer-box"></span></p>
</div>
```

### Q5 Template (Create Pictogram):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Complete the pictogram using the data in the table.</p>
  <div class="data-table">
    <table>
      <tr>
        <th>Toy</th>
        <th>Number of Children</th>
      </tr>
      <tr>
        <td>🚗 Car</td>
        <td>6</td>
      </tr>
      <tr>
        <td>🧸 Teddy</td>
        <td>4</td>
      </tr>
      <tr>
        <td>⚽ Ball</td>
        <td>8</td>
      </tr>
    </table>
  </div>
  <div class="instruction-box">
    Draw the correct number of pictures for each toy. Each picture = 1 child.
  </div>
  <div class="pictogram-container">
    <p class="pictogram-title">Favorite Toys</p>
    <p class="pictogram-scale">Each picture = 1 child</p>
    <table class="pictogram-table">
      <tr class="pictogram-row">
        <td class="pictogram-label">🚗 Car</td>
        <td class="pictogram-data" style="min-height:50px"></td>
      </tr>
      <tr class="pictogram-row">
        <td class="pictogram-label">🧸 Teddy</td>
        <td class="pictogram-data" style="min-height:50px"></td>
      </tr>
      <tr class="pictogram-row">
        <td class="pictogram-label">⚽ Ball</td>
        <td class="pictogram-data" style="min-height:50px"></td>
      </tr>
    </table>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Scale clearly shown?
- [ ] Real-world contexts?
- [ ] Appropriate numbers (1-20)?
- [ ] Image paths correct?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?
- [ ] Progressive difficulty?

Generate complete HTML. UK Year 2 aligned.
