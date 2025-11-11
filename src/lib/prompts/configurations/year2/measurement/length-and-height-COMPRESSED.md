# Year 2: Length/Height

**CRITICAL: EXACTLY {{questionCount}} questions. Standard units (cm, m).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Standard units**: cm (centimetres), m (metres)
- **Measurement tools**: Rulers, meter sticks, measuring tapes
- **Skills**: Read scales, estimate, compare, calculate
- **Ages 6-7**: More abstract thinking than Year 1

## QUESTION TYPES

**Q1**: Read ruler/scale. Show object with ruler (numbered every cm/5cm). "How long is the [object]?" Answer: __ cm

**Q2**: Compare measurements. Two objects with given lengths. "Which is longer?" or "How much longer is A than B?" Simple subtraction.

**Q3**: Ordering. 3-4 objects with measurements. "Put in order from shortest to longest."

**Q4**: Unit conversion/comparison. Mix cm and m. "Which is longer: 150 cm or 1 m?" or "How many cm in 2 m?"

**Q5**: Word problem. Real-world context. "Emma's ribbon is 45 cm. Lily's ribbon is 68 cm. How much longer is Lily's ribbon?"

## NUMBER RANGES
- **cm**: 10-99 cm (manageable for Year 2)
- **m**: 1-5 m (whole meters or simple like 1m 50cm)
- **Differences**: 5-30 cm (subtraction within Y2 range)

## IMAGES (CRITICAL - EXACT PATHS REQUIRED)
**MANDATORY**: ALL image paths MUST start with `/images/measurement/`

Available folders and objects:
- **school**: `/images/[pencil|crayon|ribbon|ruler].png`
- **tools**: `/images/[paintbrush|wrench|hammer|saw].png`
- **garden**: `/images/[caterpillar|snail|snake|leaf].png`
- **fruit**: `/images/[banana|lemon|watermelon].png`
- **household**: `/images/[book|shoe|teddy-bear|toy-car|building-block].png`

**WRONG**: `/images/school/pencil.png` ❌
**CORRECT**: `/images/pencil.png` ✅

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.ruler-container{margin:10px 0;padding:10px;background:#F5F5F5;border-radius:8px;text-align:center}
.ruler-container img{height:60px;margin-bottom:5px}
.ruler{display:flex;border-bottom:3px solid #333;position:relative;height:40px;max-width:400px;margin:10px auto}
.ruler-mark{width:20px;border-left:2px solid #333;height:20px;position:relative;display:flex;align-items:flex-end;justify-content:center}
.ruler-mark.major{height:30px;border-left:3px solid #333}
.ruler-label{font-size:11pt;font-weight:bold;position:absolute;bottom:-20px}
.comparison-box{margin:10px 0;padding:10px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.measurement-item{margin:8px 0;display:flex;align-items:center;gap:10px}
.measurement-item img{height:50px}
.measurement-bar{display:inline-block;height:30px;border:2px solid #333;border-radius:5px;margin:0 10px;background:linear-gradient(90deg,#4CAF50,#2E7D32)}
.measurement-value{font-size:15pt;font-weight:bold;color:#1976D2}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.ordering-item{text-align:center;margin:10px;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.ordering-item img{height:60px;margin-bottom:5px}
.ordering-box{width:40px;height:40px;border:2px solid #333;border-radius:5px;background:#FFF;display:inline-block;vertical-align:middle;margin:5px}
.conversion-box{margin:10px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.conversion-item{font-size:15pt;font-weight:bold;margin:8px 0;padding:8px;background:#FFF;border-radius:5px}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use ONLY cm and m (standard units)
2. All measurements must be realistic (pencil: 15cm, not 150cm)
3. Include working space for calculations
4. Answer key with full explanations
5. Colored backgrounds per question
6. Complete image paths
7. Year 2 appropriate numbers (10-99 for cm)
8. Mix of visual and text-based questions

## EXAMPLES

### Q1 Template (Reading Ruler):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> How long is the pencil?</p>
  <div class="ruler-container">
    <img src="/images/pencil.png" alt="pencil" style="height:60px">
    <div class="ruler">
      <div class="ruler-mark major"><span class="ruler-label">0</span></div>
      <div class="ruler-mark"></div>
      <div class="ruler-mark major"><span class="ruler-label">5</span></div>
      <div class="ruler-mark"></div>
      <div class="ruler-mark major"><span class="ruler-label">10</span></div>
      <div class="ruler-mark"></div>
      <div class="ruler-mark major"><span class="ruler-label">15</span></div>
    </div>
  </div>
  <p class="question-text">The pencil is <span class="answer-box"></span> cm long.</p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Emma's ribbon is 45 cm long. Lily's ribbon is 68 cm long. How much longer is Lily's ribbon?</p>
  <div class="word-problem-visual">
    <div class="measurement-item">
      <strong>Emma:</strong>
      <img src="/images/ribbon.png" alt="ribbon" style="height:40px">
      <span class="measurement-value">45 cm</span>
    </div>
    <div class="measurement-item">
      <strong>Lily:</strong>
      <img src="/images/ribbon.png" alt="ribbon" style="height:40px">
      <span class="measurement-value">68 cm</span>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Lily's ribbon is <span class="answer-box"></span> cm longer.</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All use standard units (cm/m)?
- [ ] Realistic measurements?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Complete image paths?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. UK Year 2 aligned.
