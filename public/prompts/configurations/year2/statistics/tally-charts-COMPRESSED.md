# Y2: Tally Charts ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Read, interpret, and create tally charts.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Tally marks**: Groups of 5 (|||| with diagonal line through = 5)
- **Skills**: Count tallies, read tally charts, create tallies, find totals
- **Ages 6-7**: Practical data collection contexts
- **Key concept**: Grouping in 5s makes counting easier

## QUESTION TYPES

**Q1**: Read tally chart. "How many children chose pizza?" Count tally marks.

**Q2**: Compare categories. "Which was most/least popular?" or "How many more?"

**Q3**: Calculate total. "How many children were asked altogether?" Sum all tallies.

**Q4**: Create tally marks. "Show 13 using tally marks."

**Q5**: Complete tally chart from data. Provide numbers, students draw tallies.

## TALLY MARK RULES
- Groups of 5: |||| (5th mark diagonal through first 4)
- Examples:
  - 3 = |||
  - 5 = ||||
  - 7 = |||| ||
  - 12 = |||| |||| ||
  - 18 = |||| |||| |||| |||

## CONTEXTS
- **Favorite food**: pizza, pasta, burger, salad
- **Favorite sport**: football, swimming, tennis, cricket
- **Eye color**: brown, blue, green, hazel
- **Weather**: sunny, rainy, cloudy, windy
- **Transport**: walk, car, bus, bike

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.tally-chart-container{margin:15px 0;padding:15px;background:#F5F5F5;border:3px solid #1976D2;border-radius:8px}
.tally-chart-title{font-size:18pt;font-weight:bold;color:#1976D2;text-align:center;margin-bottom:15px}
.tally-table{border-collapse:collapse;margin:0 auto;background:#FFF;width:90%;max-width:500px}
.tally-table th{padding:12px;background:#1976D2;color:#FFF;border:2px solid #0D47A1;font-size:16pt;font-weight:bold}
.tally-table td{padding:12px;border:2px solid #1976D2;font-size:16pt;min-height:50px}
.tally-label{font-weight:bold;background:#E3F2FD}
.tally-marks{font-family:monospace;font-size:20pt;letter-spacing:3px;min-width:150px}
.tally-count{text-align:center;font-weight:bold;font-size:18pt;background:#FFF9C4}
.tally-group{display:inline-block;margin:0 5px;position:relative}
.tally-five{display:inline-block;position:relative}
.tally-instruction{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:15pt;font-weight:600}
.tally-practice{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.practice-box{display:inline-block;min-width:200px;min-height:50px;border:2px solid #333;border-radius:5px;background:#FFF;padding:10px;margin:10px;vertical-align:top}
.data-table{margin:15px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.data-table table{border-collapse:collapse;margin:0 auto;background:#FFF}
.data-table th{padding:10px 15px;background:#2196F3;color:#FFF;border:2px solid #1976D2;font-size:15pt}
.data-table td{padding:10px 15px;border:2px solid #2196F3;font-size:16pt;text-align:center}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. ALWAYS group tally marks in 5s (|||| pattern)
2. 5th mark is diagonal through first 4
3. Clear column headers (Category | Tally | Total)
4. Numbers appropriate for Year 2 (1-20 range)
5. Real-world data contexts
6. Answer key shows counting method (e.g., "|||| |||| ||| = 5 + 5 + 3 = 13")
7. Colored backgrounds Q1-Q5
8. Progressive difficulty

## EXAMPLES

### Q1 Template (Read Tally Chart):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> This tally chart shows children's favorite foods.</p>
  <div class="tally-chart-container">
    <p class="tally-chart-title">Favorite Foods</p>
    <table class="tally-table">
      <tr>
        <th>Food</th>
        <th>Tally</th>
        <th>Total</th>
      </tr>
      <tr>
        <td class="tally-label">🍕 Pizza</td>
        <td class="tally-marks"><span class="tally-five">||||</span> <span class="tally-five">||||</span> ||</td>
        <td class="tally-count"></td>
      </tr>
      <tr>
        <td class="tally-label">🍝 Pasta</td>
        <td class="tally-marks"><span class="tally-five">||||</span> |||</td>
        <td class="tally-count"></td>
      </tr>
      <tr>
        <td class="tally-label">🍔 Burger</td>
        <td class="tally-marks"><span class="tally-five">||||</span></td>
        <td class="tally-count"></td>
      </tr>
      <tr>
        <td class="tally-label">🥗 Salad</td>
        <td class="tally-marks">|||</td>
        <td class="tally-count"></td>
      </tr>
    </table>
  </div>
  <p class="question-text">a) How many children chose pizza? <span class="answer-box"></span></p>
  <p class="question-text">b) How many children chose pasta? <span class="answer-box"></span></p>
  <p class="question-text">c) Complete the Total column in the chart above.</p>
</div>
```

### Q2 Template (Compare):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Use the tally chart from Question 1.</p>
  <p class="question-text">a) Which food was MOST popular? <span class="answer-line"></span></p>
  <p class="question-text">b) Which food was LEAST popular? <span class="answer-line"></span></p>
  <p class="question-text">c) How many MORE children chose pizza than salad?</p>
  <div class="working-space"></div>
  <p class="question-text">Answer: <span class="answer-box"></span> more children</p>
</div>
```

### Q3 Template (Calculate Total):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> How many children were asked about their favorite food altogether?</p>
  <div class="tally-instruction">
    Add up ALL the totals from the tally chart.
  </div>
  <div class="working-space"></div>
  <p class="question-text">Total: <span class="answer-box"></span> children</p>
</div>
```

### Q4 Template (Create Tally Marks):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Write these numbers using tally marks.</p>
  <div class="tally-instruction">
    Remember: Group in 5s with |||| pattern
  </div>
  <div class="tally-practice">
    <p><strong>a) 7</strong></p>
    <div class="practice-box"></div>

    <p><strong>b) 13</strong></p>
    <div class="practice-box"></div>

    <p><strong>c) 18</strong></p>
    <div class="practice-box"></div>
  </div>
</div>
```

### Q5 Template (Complete Tally Chart):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Complete the tally chart using the data in the table.</p>
  <div class="data-table">
    <table>
      <tr>
        <th>Sport</th>
        <th>Number of Children</th>
      </tr>
      <tr>
        <td>⚽ Football</td>
        <td>9</td>
      </tr>
      <tr>
        <td>🏊 Swimming</td>
        <td>6</td>
      </tr>
      <tr>
        <td>🎾 Tennis</td>
        <td>4</td>
      </tr>
      <tr>
        <td>🏏 Cricket</td>
        <td>11</td>
      </tr>
    </table>
  </div>
  <div class="tally-instruction">
    Draw the tally marks for each sport in the chart below.
  </div>
  <div class="tally-chart-container">
    <p class="tally-chart-title">Favorite Sports</p>
    <table class="tally-table">
      <tr>
        <th>Sport</th>
        <th>Tally</th>
        <th>Total</th>
      </tr>
      <tr>
        <td class="tally-label">⚽ Football</td>
        <td class="tally-marks" style="min-height:40px"></td>
        <td class="tally-count">9</td>
      </tr>
      <tr>
        <td class="tally-label">🏊 Swimming</td>
        <td class="tally-marks" style="min-height:40px"></td>
        <td class="tally-count">6</td>
      </tr>
      <tr>
        <td class="tally-label">🎾 Tennis</td>
        <td class="tally-marks" style="min-height:40px"></td>
        <td class="tally-count">4</td>
      </tr>
      <tr>
        <td class="tally-label">🏏 Cricket</td>
        <td class="tally-marks" style="min-height:40px"></td>
        <td class="tally-count">11</td>
      </tr>
    </table>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Tally marks grouped in 5s?
- [ ] 5th mark diagonal through 4?
- [ ] Real-world contexts?
- [ ] Appropriate numbers (1-20)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with counting steps?
- [ ] Progressive difficulty?

Generate complete HTML. UK Year 2 aligned.
