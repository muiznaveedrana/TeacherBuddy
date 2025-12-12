# Ages 6-7: Recognising Fractions (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Fractions:** 1/2, 1/4, 2/4, 3/4 only (halves and quarters)
- **Concept:** Recognising fractions as parts of a whole
- **Visual:** Circles, rectangles, bars (CSS-generated equal parts)
- **Key Understanding:** Equal parts, naming fractions, matching visual to fraction
- **Interactive Priority:** All answers must be typed - fractions (1/2), letters (A), or numbers (1)
- **Key Misconception:** Thinking 1/4 is larger than 1/2 because "4 is bigger than 2"

## QUESTION TYPES (CPA Progression)

**Q1**: Concrete - Show shaded shape, type the fraction (ONE answer box)
**Q2**: Pictorial - "Which shows 1/2?" - show 3 shapes A, B, C, type letter (ONE answer box)
**Q3**: Abstract - Fill in blanks: "Rectangle has [4] parts, [1] is shaded" (TWO answer boxes)
**Q4**: Multiple representations - Show 4 different shapes with fractions, type each fraction (FOUR answer boxes)
**Q5**: Reasoning - Word problem testing misconception (ONE answer box)

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

/* FRACTION VISUALS */
.fraction-container{margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px;text-align:center}
.fraction-circle{width:150px;height:150px;border-radius:50%;border:3px solid #333;position:relative;overflow:hidden;margin:15px auto;display:inline-block}
.fraction-half-circle{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-quarter-circle{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.fraction-rect{width:180px;height:120px;border:3px solid #333;border-radius:5px;position:relative;display:inline-block;margin:15px;overflow:hidden}
.fraction-rect-half{width:100%;height:50%;position:absolute}
.fraction-rect-half.top{top:0;left:0}
.fraction-rect-half.bottom{bottom:0;left:0}
.fraction-rect-quarter{width:100%;height:25%;position:absolute}
.fraction-bar{width:200px;height:60px;border:3px solid #333;border-radius:5px;display:flex;margin:15px auto}
.bar-section{flex:1;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:15pt}
.bar-section:last-child{border-right:none}
.shaded{background:#4CAF50;color:#FFF}
.unshaded{background:#FFF;color:#999}
.shaded-blue{background:#2196F3;color:#FFF}
.shaded-orange{background:#FF9800;color:#FFF}

/* FRACTION OPTIONS */
.fraction-options{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.fraction-option{margin:10px;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;text-align:center}
.option-label{font-size:18pt;font-weight:bold;color:#1976D2;margin-top:8px}

/* FRACTION GRID */
.fraction-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:15px 0}
.fraction-item{padding:15px;border:2px solid #ddd;border-radius:8px;background:#FFF;text-align:center}
.fraction-item-label{font-size:14pt;margin-top:10px;font-weight:600}

/* WORD PROBLEM */
.word-problem-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.word-problem-visual{margin:10px 0}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:15px 0}
.reasoning-text{font-size:14pt;color:#333;margin:10px 0}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:90px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:60px;height:35px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## TEMPLATES

### Q1: Concrete (Show Shaded Shape)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> What fraction of the circle is shaded?</p>
  <div class="fraction-container">
    <div class="fraction-circle">
      <div class="fraction-quarter-circle quarter-1 shaded"></div>
      <div class="fraction-quarter-circle quarter-2 unshaded"></div>
      <div class="fraction-quarter-circle quarter-3 unshaded"></div>
      <div class="fraction-quarter-circle quarter-4 unshaded"></div>
    </div>
  </div>
  <p class="sub-question">Answer: <span class="answer-box"></span></p>
</div>
```

### Q2: Pictorial (Match Fraction to Visual)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Which shape shows 1/2 (one half)?</p>
  <div class="fraction-options">
    <div class="fraction-option">
      <div class="fraction-circle" style="width:100px;height:100px">
        <div class="fraction-half-circle shaded-blue"></div>
      </div>
      <p class="option-label">A</p>
    </div>
    <div class="fraction-option">
      <div class="fraction-rect" style="width:100px;height:80px">
        <div class="fraction-rect-quarter shaded-blue" style="top:0"></div>
        <div class="fraction-rect-quarter unshaded" style="top:25%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
      </div>
      <p class="option-label">B</p>
    </div>
    <div class="fraction-option">
      <div class="fraction-bar" style="width:120px;height:50px">
        <div class="bar-section shaded-blue"></div>
        <div class="bar-section unshaded"></div>
        <div class="bar-section unshaded"></div>
      </div>
      <p class="option-label">C</p>
    </div>
  </div>
  <p class="sub-question">Answer: <span class="answer-box"></span></p>
</div>
```

### Q3: Abstract (Fill in Blanks)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Look at this rectangle.</p>
  <div class="fraction-container">
    <div class="fraction-rect" style="width:200px;height:120px">
      <div class="fraction-rect-quarter shaded" style="top:0;border-bottom:2px solid #333"></div>
      <div class="fraction-rect-quarter unshaded" style="top:25%;border-bottom:2px solid #333"></div>
      <div class="fraction-rect-quarter unshaded" style="top:50%;border-bottom:2px solid #333"></div>
      <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
    </div>
  </div>
  <p class="sub-question">The rectangle has <span class="answer-box-small"></span> equal parts.</p>
  <p class="sub-question"><span class="answer-box-small"></span> part is shaded.</p>
</div>
```

### Q4: Multiple Representations (Type Each Fraction)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Write the fraction that is shaded in each shape.</p>
  <div class="fraction-grid">
    <div class="fraction-item">
      <div class="fraction-circle" style="width:90px;height:90px;margin:0 auto">
        <div class="fraction-half-circle shaded-orange"></div>
      </div>
      <p class="fraction-item-label">Fraction: <span class="answer-box-small"></span></p>
    </div>
    <div class="fraction-item">
      <div class="fraction-bar" style="width:120px;height:50px;margin:0 auto">
        <div class="bar-section shaded-orange"></div>
        <div class="bar-section unshaded"></div>
      </div>
      <p class="fraction-item-label">Fraction: <span class="answer-box-small"></span></p>
    </div>
    <div class="fraction-item">
      <div class="fraction-rect" style="width:100px;height:80px;margin:0 auto">
        <div class="fraction-rect-quarter shaded-orange" style="top:0"></div>
        <div class="fraction-rect-quarter unshaded" style="top:25%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:50%"></div>
        <div class="fraction-rect-quarter unshaded" style="top:75%"></div>
      </div>
      <p class="fraction-item-label">Fraction: <span class="answer-box-small"></span></p>
    </div>
    <div class="fraction-item">
      <div class="fraction-circle" style="width:90px;height:90px;margin:0 auto">
        <div class="fraction-quarter-circle quarter-1 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-2 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-3 shaded-orange"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
      </div>
      <p class="fraction-item-label">Fraction: <span class="answer-box-small"></span></p>
    </div>
  </div>
</div>
```

### Q5: Reasoning Challenge (Tests Misconception)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Read the problem.</p>
  <div class="word-problem-box">
    <p class="reasoning-text">Tom says: "1/4 is bigger than 1/2 because 4 is a bigger number than 2."</p>
    <div class="word-problem-visual">
      <div class="fraction-circle" style="width:120px;height:120px;margin:0 auto 15px auto">
        <div class="fraction-half-circle shaded-blue"></div>
      </div>
      <p style="margin:5px 0"><strong>1/2</strong></p>
    </div>
    <div class="word-problem-visual">
      <div class="fraction-circle" style="width:120px;height:120px;margin:0 auto 15px auto">
        <div class="fraction-quarter-circle quarter-1 shaded"></div>
        <div class="fraction-quarter-circle quarter-2 unshaded"></div>
        <div class="fraction-quarter-circle quarter-3 unshaded"></div>
        <div class="fraction-quarter-circle quarter-4 unshaded"></div>
      </div>
      <p style="margin:5px 0"><strong>1/4</strong></p>
    </div>
  </div>
  <p class="sub-question">Is Tom correct? Type your answer: <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Simple fractions: 1/2 and 1/4 only)
**Difficulty**: Lower

| Q | Details |
|---|---------|
| Q1 | Circle divided in 2, 1 shaded → 1/2 |
| Q2 | Which shows 1/2? A=circle half, B=rect quarter, C=bar third → A |
| Q3 | Rectangle has [2] parts, [1] shaded |
| Q4 | Four shapes: 1/2 circle, 1/2 bar, 1/4 rect, 1/4 circle |
| Q5 | Pizza cut into 4 slices. Emma eats 1/4. How many slices? → 1 |

**Answer Key**:
- Q1: 1/2
- Q2: A (1/2)
- Q3: a) 2  b) 1
- Q4: a) 1/2  b) 1/2  c) 1/4  d) 1/4
- Q5: 1 (One quarter of 4 slices is 1 slice)

### Worksheet 2 (Average - Include 2/4 and equivalence)
**Difficulty**: Medium

| Q | Details |
|---|---------|
| Q1 | Rectangle divided in 4, 2 shaded → 2/4 |
| Q2 | Which shows 1/4? A=circle half, B=circle quarter, C=rect half → B |
| Q3 | Circle has [4] parts, [3] shaded |
| Q4 | Four shapes: 1/2 circle, 2/4 rect, 1/4 bar, 3/4 circle |
| Q5 | Tom says "1/4 is bigger than 1/2 because 4 > 2". Is Tom correct? → No |

**Answer Key**:
- Q1: 2/4
- Q2: B (1/4)
- Q3: a) 4  b) 3
- Q4: a) 1/2  b) 2/4  c) 1/4  d) 3/4
- Q5: No (1/2 is bigger than 1/4 - more pieces means smaller parts)

### Worksheet 3 (Hard - All fractions including equivalence)
**Difficulty**: Higher

| Q | Details |
|---|---------|
| Q1 | Circle divided in 4, 3 shaded → 3/4 |
| Q2 | Which shows 3/4? A=rect 2/4, B=circle 3/4, C=bar 1/2 → B |
| Q3 | Bar has [4] parts, [2] shaded |
| Q4 | Four shapes: 2/4 circle, 1/4 rect, 3/4 bar, 1/2 rect |
| Q5 | Chocolate bar has 4 pieces. Lily eats 2 pieces. What fraction did she eat? → 2/4 |

**Answer Key**:
- Q1: 3/4
- Q2: B (3/4)
- Q3: a) 4  b) 2
- Q4: a) 2/4  b) 1/4  c) 3/4  d) 1/2
- Q5: 2/4 (2 out of 4 pieces = 2/4, which equals 1/2)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 2/4 (2 quarters shaded)</p>
  <p><strong>2.</strong> B (1/4)</p>
  <p><strong>3.</strong> a) 4  b) 3 (Circle has 4 equal parts, 3 are shaded)</p>
  <p><strong>4.</strong> a) 1/2  b) 2/4  c) 1/4  d) 3/4</p>
  <p><strong>5.</strong> No (1/2 is bigger than 1/4)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b) - each gets its own answer in key
4. **Q3 and Q4 use a) b) format** in Answer Key for parser compatibility
5. **NO "circle", "draw", "shade" instructions** - all answers are typed
6. **Accept fraction formats**: "1/2", "1 out of 2", "one half" (validator normalizes)
7. **Accept letter answers**: "A", "B", "C"
8. **Accept number answers**: "1", "2", "3", "4"
9. **Q5 MUST test the size misconception** (1/4 vs 1/2 confusion)
10. **Use ONLY fractions**: 1/2, 1/4, 2/4, 3/4
11. **Equal parts are CRITICAL** - all shapes must have equal divisions
12. **Q1-Q4 geometric terms only** - Q5 can use "pizza" or "chocolate bar"

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: One shaded shape with ONE answer box for fraction?
- [ ] Q2: Three shape options (A, B, C) with ONE answer box for letter?
- [ ] Q3: Visual with TWO answer boxes (parts and shaded)?
- [ ] Q4: Four shapes with FOUR answer boxes (one fraction each)?
- [ ] Q5: Word problem with ONE answer box (number or Yes/No)?
- [ ] ALL answer boxes use `.answer-box` or `.answer-box-small` class?
- [ ] Answer key uses a) b) c) d) format for multi-part questions?
- [ ] Q5 tests the "1/4 bigger than 1/2" misconception?
- [ ] Total answer count: 1 + 1 + 2 + 4 + 1 = 9 answers?
- [ ] NO "circle", "draw", "shade" instructions?
- [ ] Only fractions 1/2, 1/4, 2/4, 3/4 used?

Generate complete HTML. UK Year 2 aligned. Interactive mode optimised.
