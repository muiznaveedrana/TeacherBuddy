# Ages 6-7: Rounding to Nearest 10 (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 10-99 (two-digit numbers only)
- **Rounding Rule**: Ones digit 0-4 rounds DOWN, ones digit 5-9 rounds UP
- **CPA Progression**: Concrete (base-10) → Pictorial (number line) → Abstract
- **Interactive Priority**: All answers must be typed numbers or simple text (Yes/No)
- **Key Misconception**: Numbers ending in 5 ALWAYS round UP (test this!)

## QUESTION TYPES (Reasoning-focused)

**Q1**: Base-10 blocks - identify "between X and Y" + round to nearest 10
**Q2**: Number line - identify closer decade + round to nearest 10  
**Q3**: Rounding grid - 6 numbers to round individually (NOT "circle all")
**Q4**: Real-world context with themed character and story
**Q5**: Reasoning challenge - character makes a claim about rounding (tests midpoint rule)

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

/* BASE-10 BLOCKS */
.base10-container{display:flex;justify-content:center;gap:20px;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.base10-group{text-align:center}
.base10-label{font-size:24pt;font-weight:bold;color:#1976D2;margin-bottom:10px}
.base10-blocks{display:flex;gap:15px;justify-content:center;align-items:flex-end}
.tens-stack{display:flex;flex-direction:column;gap:3px}
.ones-stack{display:flex;flex-wrap:wrap;gap:2px;max-width:60px;align-content:flex-end}
.ten-rod{width:80px;height:18px;background:linear-gradient(180deg,#FFB74D 0%,#FF9800 100%);border:2px solid #E65100;border-radius:3px;box-shadow:1px 1px 0 #BF360C}
.unit-cube{width:18px;height:18px;background:linear-gradient(135deg,#81C784 0%,#4CAF50 100%);border:2px solid #2E7D32;border-radius:2px;box-shadow:1px 1px 0 #1B5E20}

/* NUMBER LINE */
.number-line-container{margin:15px 0;padding:15px;background:#E8F5E9;border-radius:8px}
.number-line{display:flex;justify-content:space-between;position:relative;padding:25px 10px 35px}
.number-line::before{content:'';position:absolute;bottom:35px;left:5%;right:5%;height:3px;background:#333}
.tick{width:32px;height:32px;background:#E0E0E0;border:2px solid #999;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;position:relative;z-index:1}
.tick.decade{background:#1976D2;color:#FFF;font-size:14pt;border:3px solid #0D47A1;width:38px;height:38px}
.tick.midpoint{background:#FF9800;color:#FFF;border:3px solid #F57C00}
.tick.target{background:#4CAF50;color:#FFF;border:3px solid #2E7D32;width:40px;height:40px;font-size:14pt}
.tick-label{position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:10pt;color:#333;font-weight:bold}

/* ROUNDING GRID */
.rounding-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:15px 0}
.round-item{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.round-number{font-size:22pt;font-weight:bold;color:#1976D2}
.round-arrow{font-size:20pt;color:#FF9800}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.context-icon{font-size:36pt;margin-bottom:10px}
.context-number{font-size:28pt;font-weight:bold;color:#E65100}
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

### Q1: Concrete (Base-10 Blocks)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Round 47 to the nearest 10.</p>
  <div class="base10-container">
    <div class="base10-group">
      <div class="base10-label">47</div>
      <div class="base10-blocks">
        <div class="tens-stack">
          <div class="ten-rod"></div>
          <div class="ten-rod"></div>
          <div class="ten-rod"></div>
          <div class="ten-rod"></div>
        </div>
        <div class="ones-stack">
          <div class="unit-cube"></div><div class="unit-cube"></div>
          <div class="unit-cube"></div><div class="unit-cube"></div>
          <div class="unit-cube"></div><div class="unit-cube"></div>
          <div class="unit-cube"></div>
        </div>
      </div>
    </div>
  </div>
  <p class="sub-question">a) 47 is between <span class="answer-box-small"></span> and <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 47 rounds to: <span class="answer-box"></span></p>
</div>
```

### Q2: Pictorial (Number Line)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Round 63 to the nearest 10.</p>
  <div class="number-line-container">
    <div class="number-line">
      <div class="tick decade"><span class="tick-label">60</span>60</div>
      <div class="tick">61</div>
      <div class="tick">62</div>
      <div class="tick target">63</div>
      <div class="tick">64</div>
      <div class="tick midpoint">65</div>
      <div class="tick">66</div>
      <div class="tick">67</div>
      <div class="tick">68</div>
      <div class="tick">69</div>
      <div class="tick decade"><span class="tick-label">70</span>70</div>
    </div>
  </div>
  <p class="sub-question">a) 63 is closer to: <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 63 rounds to: <span class="answer-box"></span></p>
</div>
```

### Q3: Abstract (Rounding Grid)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Round each number to the nearest 10.</p>
  <div class="rounding-grid">
    <div class="round-item"><span class="round-number">23</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
    <div class="round-item"><span class="round-number">67</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
    <div class="round-item"><span class="round-number">45</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
    <div class="round-item"><span class="round-number">81</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
    <div class="round-item"><span class="round-number">36</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
    <div class="round-item"><span class="round-number">58</span><span class="round-arrow">→</span><span class="answer-box"></span></div>
  </div>
</div>
```

### Q4: Real-World Context (THEMED)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">⚽</div>
    <p class="context-story"><span class="character-name">Jake</span> scored <strong>74 points</strong> in a football game.</p>
    <div class="context-number">74 points</div>
    <p class="context-story">Round to the nearest 10 to estimate his score.</p>
  </div>
  <p class="sub-question">Jake scored about <span class="answer-box"></span> points.</p>
</div>
```

### Q5: Reasoning Challenge (Tests Midpoint Rule)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Look at what Lily says.</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👧</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Lily says:</strong> "55 rounds to 50 because it ends in 5."</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Is Lily correct? <span class="answer-box-small"></span> (Yes / No)</p>
  <p class="sub-question">b) 55 rounds to: <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Numbers 20-50, Sports Theme)
**Characters**: Jake, Mia, Coach Ben

| Q | Number | Context |
|---|--------|---------|
| Q1 | 34 | Base-10 blocks (3 tens, 4 ones) |
| Q2 | 42 | Number line (40-50, target=42) |
| Q3 | 23, 38, 41, 27, 35, 44 | Grid - includes 35 (midpoint) |
| Q4 | Jake scored 47 goals ⚽ | Real-world rounding |
| Q5 | "35 rounds to 30" - NO! | Tests midpoint misconception |

**Answer Key**:
- Q1: a) 30 and 40  b) 30 (34 rounds DOWN, 4 < 5)
- Q2: a) 40  b) 40 (42 rounds DOWN, 2 < 5)
- Q3: a) 20  b) 40  c) 40  d) 30  e) 40  f) 40
- Q4: 50 goals (47 rounds UP, 7 ≥ 5)
- Q5: a) No  b) 40 (35 rounds UP! 5 = 5, we round UP)

### Worksheet 2 (Average - Numbers 40-70, Animal Theme)
**Characters**: Zara the Zookeeper, Leo the Lion

| Q | Number | Context |
|---|--------|---------|
| Q1 | 56 | Base-10 blocks (5 tens, 6 ones) |
| Q2 | 63 | Number line (60-70, target=63) |
| Q3 | 48, 52, 65, 71, 59, 44 | Grid - includes 65 (midpoint) |
| Q4 | Leo ate 68 bananas 🍌 | Real-world rounding |
| Q5 | "65 rounds to 60" - NO! | Tests midpoint misconception |

### Worksheet 3 (Hard - Numbers 60-99, Space Theme)
**Characters**: Astronaut Amy, Robot Rex

| Q | Number | Context |
|---|--------|---------|
| Q1 | 78 | Base-10 blocks (7 tens, 8 ones) |
| Q2 | 84 | Number line (80-90, target=84) |
| Q3 | 73, 86, 95, 61, 82, 97 | Grid - includes 95 (midpoint) |
| Q4 | Amy collected 92 moon rocks 🌙 | Real-world rounding |
| Q5 | "95 rounds to 90" - NO! | Tests midpoint misconception |

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 40 and 50  b) 50 (47 rounds UP because 7 ≥ 5)</p>
  <p><strong>2.</strong> a) 60  b) 60 (63 rounds DOWN because 3 < 5)</p>
  <p><strong>3.</strong> a) 20  b) 70  c) 50  d) 80  e) 40  f) 60</p>
  <p><strong>4.</strong> 70 (74 rounds DOWN because 4 < 5)</p>
  <p><strong>5.</strong> a) No  b) 60 (55 rounds UP! When ones = 5, we ALWAYS round UP)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b, c) - each gets its own answer in key
4. **Q3 grid answers labelled** a) b) c) d) e) f) in Answer Key for parser compatibility
5. **NO "circle all"** - use individual answer boxes
6. **Include ONE midpoint number** (X5) in Q3 or Q5 that rounds UP
7. **Q5 MUST test the midpoint misconception** - character says "X5 rounds down"
8. **Themed characters** - use names from theme variation
9. **Answer key explains WHY** - note if digit was ≥5 or <5

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Base-10 blocks with TWO sub-questions (a + b)?
- [ ] Q2: Number line with TWO sub-questions (a + b)?
- [ ] Q3: Grid of 6 numbers with answer boxes (labelled a-f in key)?
- [ ] Q4: Themed context with character name?
- [ ] Q5: Reasoning with misconception about midpoint number?
- [ ] ALL answer boxes have corresponding answers?
- [ ] Answer key uses a) b) c) format for multi-part questions?
- [ ] At least ONE midpoint number (X5) tested?
- [ ] Character makes WRONG claim in Q5 about rounding 5?

Generate complete HTML. UK Year 2 aligned. Use themed characters throughout.