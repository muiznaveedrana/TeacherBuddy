# Ages 6-7: Times Tables 2, 5, 10 (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Tables:** 2, 5, 10 only (up to ×12)
- **Concept:** Multiplication as repeated addition and equal groups
- **Visual:** Arrays, equal groups, skip counting patterns
- **Patterns to know:** 2s=always even, 5s=end in 0 or 5, 10s=end in 0
- **Interactive Priority:** All answers must be typed numbers
- **Key Misconception:** Confusing multiplication with addition (e.g., 3×5=8 instead of 15)

## QUESTION TYPES (CPA Progression)

**Q1**: Concrete - Visual array with emoji objects, count total
**Q2**: Pictorial - Repeated addition converted to multiplication (TWO sub-questions)
**Q3**: Abstract - Times tables grid with 6 calculations (2s, 5s, 10s mix)
**Q4**: Real-world context with themed character and story
**Q5**: Reasoning challenge - character makes a WRONG claim about multiplication

## CSS (Compact - Interactive Optimised):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* ARRAY VISUAL */
.array-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.array-row{font-size:28pt;margin:5px 0;letter-spacing:8px}
.array-label{font-size:14pt;color:#666;margin-top:10px}

/* REPEATED ADDITION */
.repeated-addition-box{background:#F5F5F5;border-radius:8px;padding:15px;margin:15px 0;text-align:center}
.addition-equation{font-size:20pt;margin:10px 0;color:#1976D2}
.multiply-equation{font-size:18pt;margin:10px 0;color:#E65100}

/* TIMES TABLES GRID */
.times-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:15px 0}
.tt-item{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF;font-size:18pt}
.tt-number{font-weight:bold;color:#1976D2}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.context-icon{font-size:36pt;margin-bottom:10px}
.context-number{font-size:24pt;font-weight:bold;color:#E65100}
.context-story{font-size:14pt;color:#333;margin:10px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:12px;flex:1;position:relative}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #66BB6A transparent transparent}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:55px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## TEMPLATES

### Q1: Concrete (Array Visual)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> How many stars in total? Count the rows and columns.</p>
  <div class="array-container">
    <div class="array-row">⭐⭐⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐⭐⭐</div>
    <div class="array-row">⭐⭐⭐⭐⭐</div>
    <p class="array-label">4 rows of 5</p>
  </div>
  <p class="sub-question">Total: <span class="answer-box"></span> stars</p>
</div>
```

### Q2: Pictorial (Repeated Addition to Multiplication)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Complete the multiplication.</p>
  <div class="repeated-addition-box">
    <p class="addition-equation">10 + 10 + 10 + 10 + 10 = <span class="answer-box"></span></p>
    <p class="multiply-equation">This is the same as: 5 × 10 = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q3: Abstract (Times Tables Grid)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Solve these multiplications.</p>
  <div class="times-grid">
    <div class="tt-item"><span class="tt-number">3 × 2</span> = <span class="answer-box"></span></div>
    <div class="tt-item"><span class="tt-number">7 × 5</span> = <span class="answer-box"></span></div>
    <div class="tt-item"><span class="tt-number">6 × 10</span> = <span class="answer-box"></span></div>
    <div class="tt-item"><span class="tt-number">9 × 2</span> = <span class="answer-box"></span></div>
    <div class="tt-item"><span class="tt-number">4 × 5</span> = <span class="answer-box"></span></div>
    <div class="tt-item"><span class="tt-number">8 × 10</span> = <span class="answer-box"></span></div>
  </div>
</div>
```

### Q4: Real-World Context (THEMED)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">🍪</div>
    <p class="context-story"><span class="character-name">Lily</span> has <strong>6 plates</strong> with <strong>5 cookies</strong> on each plate.</p>
    <div class="context-number">6 plates × 5 cookies</div>
  </div>
  <p class="sub-question">How many cookies in total? <span class="answer-box"></span> cookies</p>
</div>
```

### Q5: Reasoning Challenge (Tests Misconception)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Look at what Max says.</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👦</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Max says:</strong> "4 × 5 = 9 because 4 + 5 = 9"</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Is Max correct? <span class="answer-box-small"></span> (Yes / No)</p>
  <p class="sub-question">b) 4 × 5 = <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Lower multipliers, Food Theme)
**Characters**: Chef Charlie, Baker Bella

| Q | Details |
|---|---------|
| Q1 | Array: 3 rows of 2 apples 🍎 (3×2=6) |
| Q2 | 5+5+5 = ? and 3×5 = ? (both 15) |
| Q3 | 2×2, 4×5, 3×10, 5×2, 2×5, 4×10 |
| Q4 | Chef Charlie has 4 trays with 10 muffins 🧁 each (4×10=40) |
| Q5 | "3×5=8 because 3+5=8" - NO! (3×5=15) |

**Answer Key**:
- Q1: 6 (3 rows × 2 = 6 apples)
- Q2: a) 15  b) 15
- Q3: a) 4  b) 20  c) 30  d) 10  e) 10  f) 40
- Q4: 40 muffins (4×10=40)
- Q5: a) No  b) 15 (4×5 means 5+5+5, not 3+5)

### Worksheet 2 (Average - Medium multipliers, Animal Theme)
**Characters**: Farmer Fred, Zara the Zookeeper

| Q | Details |
|---|---------|
| Q1 | Array: 5 rows of 5 butterflies 🦋 (5×5=25) |
| Q2 | 2+2+2+2+2+2 = ? and 6×2 = ? (both 12) |
| Q3 | 6×2, 8×5, 5×10, 7×2, 6×5, 7×10 |
| Q4 | Farmer Fred has 8 pens with 5 chickens 🐔 each (8×5=40) |
| Q5 | "7×2=9 because 7+2=9" - NO! (7×2=14) |

**Answer Key**:
- Q1: 25 (5 rows × 5 = 25 butterflies)
- Q2: a) 12  b) 12
- Q3: a) 12  b) 40  c) 50  d) 14  e) 30  f) 70
- Q4: 40 chickens (8×5=40)
- Q5: a) No  b) 14 (7×2 means 2+2+2+2+2+2+2, not 7+2)

### Worksheet 3 (Hard - Higher multipliers, Space Theme)
**Characters**: Astronaut Amy, Robot Rex

| Q | Details |
|---|---------|
| Q1 | Array: 6 rows of 10 rockets 🚀 (6×10=60) |
| Q2 | 10+10+10+10+10+10+10 = ? and 7×10 = ? (both 70) |
| Q3 | 9×2, 11×5, 9×10, 12×2, 8×5, 11×10 |
| Q4 | Astronaut Amy found 12 craters with 2 moon rocks 🌙 each (12×2=24) |
| Q5 | "9×10=19 because 9+10=19" - NO! (9×10=90) |

**Answer Key**:
- Q1: 60 (6 rows × 10 = 60 rockets)
- Q2: a) 70  b) 70
- Q3: a) 18  b) 55  c) 90  d) 24  e) 40  f) 110
- Q4: 24 moon rocks (12×2=24)
- Q5: a) No  b) 90 (9×10 means ten 9s or 10+10+10+10+10+10+10+10+10, not 9+10)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 25 (5 rows × 5 = 25 butterflies)</p>
  <p><strong>2.</strong> a) 12  b) 12 (6×2 = 12)</p>
  <p><strong>3.</strong> a) 12  b) 40  c) 50  d) 14  e) 30  f) 70</p>
  <p><strong>4.</strong> 40 chickens (8 × 5 = 40)</p>
  <p><strong>5.</strong> a) No  b) 14 (7×2 means repeated addition, NOT 7+2)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b) - each gets its own answer in key
4. **Q3 grid answers labelled** a) b) c) d) e) f) in Answer Key for parser compatibility
5. **Q2 has TWO sub-questions**: repeated addition result AND multiplication result
6. **Q5 MUST test the multiplication vs addition misconception**
7. **Themed characters** - use names from theme variation
8. **Use emojis** for array items matching the theme
9. **Answer key explains calculation** - show the multiplication

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Visual array with emoji objects and ONE answer box?
- [ ] Q2: Repeated addition with TWO sub-questions (a + b)?
- [ ] Q3: Grid of 6 multiplications (mix of 2s, 5s, 10s)?
- [ ] Q4: Themed context with character name?
- [ ] Q5: Reasoning with misconception about × vs + ?
- [ ] ALL answer boxes use `.answer-box` or `.answer-box-small` class?
- [ ] Answer key uses a) b) format for multi-part questions?
- [ ] Character makes WRONG claim in Q5 (says × = +)?
- [ ] Total answer count: 1 + 2 + 6 + 1 + 2 = 12 answers?

Generate complete HTML. UK Year 2 aligned. Use themed characters throughout.
