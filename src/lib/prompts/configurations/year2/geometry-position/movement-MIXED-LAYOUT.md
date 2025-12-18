# Ages 6-7: Movement (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Movement: Which Way?"
- Theme: Basic movement words
- Focus: forwards, backwards, up, down

**IF difficulty = "average":**
- Title: "Movement: Giving Directions!"
- Theme: Direction instructions
- Focus: left, right, forwards, backwards

**IF difficulty = "hard":**
- Title: "Movement: Follow the Route!"
- Theme: Multi-step movement
- Focus: Combined movement instructions

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
.movement-box{margin:12px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.grid-scene{display:grid;grid-template-columns:repeat(5,40px);grid-template-rows:repeat(3,40px);gap:3px;justify-content:center;margin:10px auto}
.grid-cell{width:40px;height:40px;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;font-size:20pt;background:#fff}
.grid-cell.highlight{background:#FFEB3B}
.path-container{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;margin:12px 0}
.path-step{text-align:center;padding:10px;border:2px solid #4CAF50;border-radius:8px;background:#FFF;min-width:70px}
.step-number{display:inline-block;background:#4CAF50;color:white;width:20px;height:20px;line-height:20px;text-align:center;border-radius:50%;font-size:10pt;margin-bottom:5px}
.step-arrow{font-size:24pt}
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

### Section A: Fluency (Q1-Q2) - Movement words
- Q1: Two movement direction questions
- Q2: Count steps in a direction

### Section B: Application (Q3-Q4) - Following directions
- Q3: Complete the movement sequence (3 steps)
- Q4: Where does the person/object end up?

### Section C: Reasoning (Q5) - Movement reasoning + misconception
- Q5: Two parts: movement answer + misconception check

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Which Way?)
**Scene**: Robot moving on simple grid (up/down/forwards/backwards)

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Robot faces up, moves ___ (forwards), then moves ___ (backwards) | forwards, backwards |
| Q2 | How many steps up does the robot take? | 2 |
| Q3 | Complete: up, right, ___ (1st), ___ (2nd), ___ (3rd) | up, right, down |
| Q4 | Robot starts at star, goes up 2, where does it end? | tree |
| Q5 | Direction + "Backwards means turning around" misconception | forwards, No |

**Answer Key**: forwards, backwards, 2, up, right, down, tree, forwards, No

### Worksheet 2 (Average - Giving Directions)
**Scene**: Child navigating a simple map

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Child at home, to go to school walk ___, to go to park walk ___ | right, left |
| Q2 | How many blocks to walk from home to shop? | 3 |
| Q3 | Directions: home to park - ___, ___, ___ | left, up, left |
| Q4 | Starting at home, walking right then up leads to? | school |
| Q5 | Direction + "Left and right swap when you turn" misconception | right, No |

**Answer Key**: right, left, 3, left, up, left, school, right, No

### Worksheet 3 (Hard - Follow the Route)
**Scene**: Treasure map with multi-step directions

| Q | Content | Answers |
|---|---------|---------|
| Q1 | From X, to reach cave go ___, to reach ship go ___ | north, east |
| Q2 | How many steps total from X to treasure? | 4 |
| Q3 | Route from X to palm tree: ___, ___, ___ | east, north, east |
| Q4 | Following the route, where do you end up? | treasure |
| Q5 | Direction + "North is always up on a map" misconception (not in real life!) | west, No |

**Answer Key**: north, east, 4, east, north, east, treasure, west, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> forwards, backwards</p>
  <p><strong>2.</strong> 2</p>
  <p><strong>3.</strong> up, right, down</p>
  <p><strong>4.</strong> tree</p>
  <p><strong>5.</strong> forwards, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (movement words)?
- [ ] Q2: 1 answer (count)?
- [ ] Q3: 3 answers (directions)?
- [ ] Q4: 1 answer (location word)?
- [ ] Q5: 2 answers (direction + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
