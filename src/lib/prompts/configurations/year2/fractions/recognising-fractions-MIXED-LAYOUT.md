# Ages 6-7: Recognising Fractions (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 fractions questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Pattern spotting, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Fractions:** ½, ⅓, ¼, 2/4, ¾ (unit and non-unit fractions)
- **Concept:** Fraction as equal parts of a whole; fraction of a quantity
- **Key skill:** Recognising fractions from shaded shapes; finding fractions of amounts
- **Equivalent fractions:** ½ = 2/4 (introductory concept)
- **Key misconception:** Larger denominator = larger fraction (⅓ > ½ is WRONG)

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
.fraction-row{display:flex;justify-content:space-around;align-items:flex-start;margin:12px 0;flex-wrap:wrap;gap:15px}
.fraction-item{display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px}
.circle-shape{width:80px;height:80px;border:3px solid #333;border-radius:50%;overflow:hidden;position:relative}
.circle-half-left{position:absolute;width:50%;height:100%;left:0;top:0}
.circle-half-right{position:absolute;width:50%;height:100%;right:0;top:0}
.circle-quarter-tl{position:absolute;width:50%;height:50%;left:0;top:0}
.circle-quarter-tr{position:absolute;width:50%;height:50%;right:0;top:0}
.circle-quarter-bl{position:absolute;width:50%;height:50%;left:0;bottom:0}
.circle-quarter-br{position:absolute;width:50%;height:50%;right:0;bottom:0}
.rect-shape{width:80px;height:60px;border:3px solid #333;display:grid;overflow:hidden}
.rect-halves{grid-template-columns:1fr 1fr}
.rect-quarters{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
.rect-thirds{grid-template-columns:1fr 1fr 1fr}
.rect-part{border:1px solid #333}
.shaded{background:#4CAF50}
.unshaded{background:#fff}
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0}
.fluency-item{display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px;border:2px solid #ddd;border-radius:6px;background:#fff}
.objects-row{display:flex;justify-content:center;gap:5px;flex-wrap:wrap;margin:10px 0}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.equal-parts-demo{display:flex;justify-content:center;gap:20px;margin:15px 0}
.demo-shape{width:100px;height:60px;border:3px solid #333;display:flex;overflow:hidden}
.demo-part{flex:1;border-right:2px solid #333}
.demo-part:last-child{border-right:none}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Name shaded fraction (simple)**: Show 2-3 shapes with single shaded part (½, ⅓, ¼)
- **Name shaded fraction (mixed)**: Show shapes with various fractions (½, ¼, ¾, ⅓, ⅔)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Fraction grid**: 4-6 shapes, identify fraction shaded (mix of unit and non-unit)
- **Match fractions**: Match shapes to written fractions

### Q3 OPTIONS (Application - Pick ONE):
- **Fraction of quantity**: Find ½, ⅓, or ¼ of groups of objects
- **Equal sharing**: Share objects into equal groups

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (fraction of whole)**: "Pizza cut into 4 slices, ate 1 slice"
- **Word problem (fraction of quantity)**: "6 cupcakes, gave ⅓ away, how many?"
- **Two-step problem**: "Gave ¼ to sister and ¼ to brother"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Character makes claim about fractions
- **Compare fractions**: Which is bigger: ½ or ¼?
- **Equivalent fractions**: Show ½ = 2/4 with visual comparison
- **Misconception**: "⅓ is bigger than ½ because 3 > 2" (Wrong!)

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy - Halves Focus)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name halves | 2 shapes showing ½ → 1/2, 1/2 |
| Q2 | Simple grid | 4 shapes (1/4, 2/2, 2/4, 4/4) |
| Q3 | Half of quantity | ½ of 6 = 3, ½ of 4 = 2 |
| Q4 | Word problem | "Pizza into 2 slices, ate 1" → 1/2, "Chocolate 4 pieces, ate 1" → 1/4 |
| Q5 | True/False | "½ means 1 of 2 parts" → True, True |

### WS2: Varied (Average - Mixed Fractions)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name fractions | 3 shapes (1/4, 1/3, 1/2) |
| Q2 | Grid (non-unit) | 6 shapes (2/3, 3/4, 2/4, 1/2, 3/3, 2/4) |
| Q3 | Mixed quantities | ½ of 10 = 5, ¼ of 8 = 2 |
| Q4 | Word problems | "Cake 4 slices, gave 2" → 2/4, "9 cupcakes, ⅓ away" → 3 |
| Q5 | Compare fractions | "¼ smaller than ½?" → Yes, 1/2 |

### WS3: Challenge (Hard - All Fractions)
| Q | Type | Details |
|---|------|---------|
| Q1 | Name fractions | 3 shapes (3/4, 2/3, 1/4) |
| Q2 | Grid (all types) | 6 shapes (3/4, 1/3, 1/4, 2/2, 3/3, 1/2) |
| Q3 | Harder quantities | ¼ of 16 = 4, ⅓ of 12 = 4 |
| Q4 | Two-step | "3/4 eaten" → 3/4, "¼ + ¼ given away of 12" → 6 |
| Q5 | Equivalence | "2/4 ≠ ½?" → No (they ARE equal), ½ = 2/4 |

## TEMPLATES

### Q1 - Name Fractions Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>What fraction is shaded?</p>
  <div class="fraction-row">
    <div class="fraction-item">
      <div class="circle-shape">
        <div class="circle-half-left shaded"></div>
        <div class="circle-half-right unshaded"></div>
      </div>
      <p>a) <span class="answer-box-small"></span></p>
    </div>
    <div class="fraction-item">
      <div class="rect-shape rect-quarters">
        <div class="rect-part shaded"></div>
        <div class="rect-part unshaded"></div>
        <div class="rect-part unshaded"></div>
        <div class="rect-part unshaded"></div>
      </div>
      <p>b) <span class="answer-box-small"></span></p>
    </div>
  </div>
</div>
```

### Q2 - Fraction Grid Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Write the fraction that is shaded.</p>
  <div class="fluency-grid">
    <div class="fluency-item">
      <div class="rect-shape rect-quarters" style="width:60px;height:45px">
        <div class="rect-part shaded"></div>
        <div class="rect-part shaded"></div>
        <div class="rect-part unshaded"></div>
        <div class="rect-part unshaded"></div>
      </div>
      <span class="answer-box-small"></span>
    </div>
    <!-- Add more items -->
  </div>
</div>
```

### Q3 - Fraction of Quantity Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Find the fraction of each group.</p>
  <div style="margin:15px 0">
    <p class="sub-question">a) Find <strong>½</strong> of these apples:</p>
    <div class="objects-row">
      <span style="font-size:28pt">🍎🍎🍎🍎🍎🍎🍎🍎</span>
    </div>
    <p class="sub-question">½ of 8 = <span class="answer-box-small"></span></p>
  </div>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">🍕</span>
    <span class="story-text"><strong>Mia</strong> has a pizza cut into 4 equal slices. She eats 1 slice. What fraction of the pizza did she eat?</span>
  </div>
  <p class="sub-question">a) Mia ate <span class="answer-box-small"></span> of the pizza.</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Jake says:</strong> "½ is the same as 2/4 because they are both half of the shape."
    </div>
  </div>
  <p class="sub-question">a) Is Jake correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) ½ = <span class="answer-box-small"></span>/4</p>
</div>
```

## SHAPE CSS REFERENCE

### Circle Halves:
```html
<div class="circle-shape">
  <div class="circle-half-left shaded"></div>
  <div class="circle-half-right unshaded"></div>
</div>
```

### Circle Quarters:
```html
<div class="circle-shape">
  <div class="circle-quarter-tl shaded"></div>
  <div class="circle-quarter-tr unshaded"></div>
  <div class="circle-quarter-bl unshaded"></div>
  <div class="circle-quarter-br unshaded"></div>
</div>
```

### Rectangle Halves:
```html
<div class="rect-shape rect-halves">
  <div class="rect-part shaded"></div>
  <div class="rect-part unshaded"></div>
</div>
```

### Rectangle Thirds:
```html
<div class="rect-shape rect-thirds">
  <div class="rect-part shaded"></div>
  <div class="rect-part unshaded"></div>
  <div class="rect-part unshaded"></div>
</div>
```

### Rectangle Quarters:
```html
<div class="rect-shape rect-quarters">
  <div class="rect-part shaded"></div>
  <div class="rect-part unshaded"></div>
  <div class="rect-part unshaded"></div>
  <div class="rect-part unshaded"></div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 1/2, 1/4, 1/3</p>
  <p><strong>2.</strong> 2/4, 2/3, 3/4, 2/2, 4/4, 3/3</p>
  <p><strong>3.</strong> 4, 3</p>
  <p><strong>4.</strong> 1/4, 2</p>
  <p><strong>5.</strong> Yes, 2</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## FRACTION VALUES REFERENCE
| Fraction | Meaning | Example |
|----------|---------|---------|
| ½ | 1 of 2 equal parts | Half of 8 = 4 |
| ⅓ | 1 of 3 equal parts | Third of 9 = 3 |
| ¼ | 1 of 4 equal parts | Quarter of 12 = 3 |
| 2/4 | 2 of 4 equal parts | Same as ½ |
| ¾ | 3 of 4 equal parts | Three quarters |
| 2/3 | 2 of 3 equal parts | Two thirds |
| 3/3 | 3 of 3 equal parts | Whole |

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Only Year 2 fractions used (½, ⅓, ¼, 2/4, ¾)?
- [ ] Shapes use CSS classes (not images)?
- [ ] Answer key comma-separated (no explanations)?
