# Ages 6-7: Turns (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Turns: Spin Around!"
- Theme: Basic turn types
- Focus: whole turn, half turn

**IF difficulty = "average":**
- Title: "Turns: Quarter Turns!"
- Theme: Quarter turns and directions
- Focus: quarter turn, clockwise, anticlockwise

**IF difficulty = "hard":**
- Title: "Turns: Robot Directions!"
- Theme: Multiple turns and final positions
- Focus: combined turns, facing direction

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
.turn-visual{margin:12px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.turn-circle{width:80px;height:80px;border:3px solid #333;border-radius:50%;margin:10px auto;position:relative}
.turn-arrow{position:absolute;top:5px;left:50%;transform:translateX(-50%);font-size:24pt}
.direction-box{display:inline-block;padding:8px 15px;border:2px solid #4CAF50;border-radius:8px;background:#fff;margin:5px}
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

### Section A: Fluency (Q1-Q2) - Turn types
- Q1: Identify two types of turns (whole/half/quarter)
- Q2: Count how many quarter turns in a half turn

### Section B: Application (Q3-Q4) - Applying turns
- Q3: Complete the turn sequence (3 steps)
- Q4: After specific turn, which direction are they facing?

### Section C: Reasoning (Q5) - Turn reasoning + misconception
- Q5: Two parts: turn answer + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Spin Around!)
**Scene**: Child spinning around

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Child faces north, makes a whole turn, now faces ___ (same). Makes a half turn from north, faces ___ | north, south |
| Q2 | How many half turns make a whole turn? | 2 |
| Q3 | Starting north: whole turn = ___, half turn = ___, whole turn = ___ | north, south, south |
| Q4 | Child faces east, makes half turn, now faces? | west |
| Q5 | Turn type + "Half turn means facing right" misconception | whole, No |

**Answer Key**: north, south, 2, a) north b) south c) south, west, whole, No

### Worksheet 2 (Average - Quarter Turns!)
**Scene**: Robot making quarter turns

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Robot faces up, quarter turn clockwise = ___, quarter turn anticlockwise = ___ | right, left |
| Q2 | How many quarter turns make a half turn? | 2 |
| Q3 | Facing north, 3 quarter turns clockwise: ___, ___, ___ | east, south, west |
| Q4 | Starts facing north, 2 quarter turns clockwise, now faces? | south |
| Q5 | Direction + "Anticlockwise is the same as clockwise" misconception | east, No |

**Answer Key**: right, left, 2, a) east b) south c) west, south, east, No

### Worksheet 3 (Hard - Robot Directions!)
**Scene**: Robot with multiple combined turns

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Robot faces N, half turn = ___, quarter turn clockwise from N = ___ | S, E |
| Q2 | How many quarter turns make a whole turn? | 4 |
| Q3 | From N: half turn = ___, quarter clockwise = ___, quarter anticlockwise = ___ | S, W, N |
| Q4 | Facing E, makes 3 quarter turns anticlockwise, ends facing? | N |
| Q5 | Direction + "3 quarter turns = three-quarter turn" misconception | W, Yes |

**Answer Key**: S, E, 4, a) S b) W c) N, N, W, Yes

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> north, south</p>
  <p><strong>2.</strong> 2</p>
  <p><strong>3.</strong> a) north b) south c) south</p>
  <p><strong>4.</strong> west</p>
  <p><strong>5.</strong> whole, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (turn directions)?
- [ ] Q2: 1 answer (count)?
- [ ] Q3: 3 answers with a) b) c) format?
- [ ] Q4: 1 answer (direction word)?
- [ ] Q5: 2 answers (turn word + Yes/No)?
- [ ] Answer key uses comma-separated and a) b) c) format for Q3?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
