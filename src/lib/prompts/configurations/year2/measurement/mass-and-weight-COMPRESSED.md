# Ages 6-7: Mass/Weight

**CRITICAL: EXACTLY {{questionCount}} questions. Standard units (g, kg).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Standard units**: g (grams), kg (kilograms)
- **Measurement tools**: Scales, balance scales
- **Skills**: Read scales, estimate, compare, lighter/heavier
- **Ages 6-7**: Practical contexts with familiar objects

## QUESTION TYPES

**Q1**: Read scale. Show scale with pointer/dial. "What does the scale show?" Answer: __ g or __ kg

**Q2**: Compare weights. Two objects with given weights. "Which is heavier?" or "Which is lighter?"

**Q3**: Ordering. 3-4 objects with weights. "Put in order from lightest to heaviest."

**Q4**: Simple calculation. "A bag weighs 250 g. Another weighs 400 g. What is the total weight?"

**Q5**: Word problem. Real-world context. "Tom's apple weighs 120 g. Sam's apple weighs 95 g. How much heavier is Tom's apple?"

## NUMBER RANGES
- **grams**: 50-999 g (common object weights)
- **kilograms**: 1-10 kg (whole kg or simple like 2 kg)
- **Differences**: 10-200 g (subtraction within Y2 range)

## REALISTIC WEIGHTS (Important!)
- **Light objects (50-200g)**: feather, coin, key, apple, banana, lemon
- **Medium objects (200-500g)**: book, shoe, toy-car, building-block
- **Heavier objects (500-999g)**: watermelon, teddy-bear, backpack
- **kg objects (1-5kg)**: farm animals (chicken, duck, goose), large household items

## IMAGES (CRITICAL - EXACT PATHS REQUIRED)
**MANDATORY**: ALL image paths MUST start with `/images/measurement/`

Available folders and objects:
- **contrast**: `/images/[feather|stone|coin|key|sponge|balloon].png`
- **fruit**: `/images/[apple|banana|lemon|watermelon].png`
- **vegetables**: `/images/[pea|carrot|tomato|onion|potato|cucumber|broccoli|pepper|pumpkin].png`
- **household**: `/images/[book|shoe|teddy-bear|toy-car|building-block|backpack].png`
- **farm**: `/images/[chicken|duck|goose|turkey|pig|sheep].png` (for kg weights)
- **tools**: `/images/scale.png` (for showing weighing)

**WRONG**: `/images/vegetables/pea.png` ❌
**CORRECT**: `/images/pea.png` ✅

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.scale-container{margin:10px 0;padding:15px;background:#F5F5F5;border-radius:8px;text-align:center}
.scale-visual{width:200px;height:200px;border:4px solid #333;border-radius:50%;position:relative;margin:15px auto;background:radial-gradient(circle,#FFF,#E0E0E0)}
.scale-pointer{width:4px;height:80px;background:#FF0000;position:absolute;left:50%;bottom:50%;transform-origin:bottom;border-radius:2px}
.scale-marking{position:absolute;font-size:12pt;font-weight:bold}
.scale-label{font-size:15pt;font-weight:bold;color:#1976D2;margin-top:10px}
.scale-image{margin:10px 0}
.scale-image img{height:80px}
.comparison-container{display:flex;justify-content:space-around;margin:15px 0;flex-wrap:wrap}
.comparison-item{text-align:center;padding:10px;margin:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:150px}
.comparison-item img{height:70px;margin-bottom:8px}
.weight-value{font-size:18pt;font-weight:bold;color:#1976D2;margin:8px 0}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.ordering-item{text-align:center;margin:10px;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.ordering-item img{height:65px;margin-bottom:5px}
.ordering-box{width:40px;height:40px;border:2px solid #333;border-radius:5px;background:#FFF;display:inline-block;margin:5px}
.calculation-box{margin:10px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.calculation-item{display:flex;align-items:center;gap:15px;margin:10px 0;padding:10px;background:#FFF;border-radius:5px}
.calculation-item img{height:60px}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.weight-comparison{display:flex;justify-content:space-around;margin:15px 0}
.weight-item{text-align:center;padding:10px}
.weight-item img{height:70px;margin-bottom:5px}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use ONLY g and kg (standard units)
2. Realistic weights for objects (apple: 120g NOT 5kg!)
3. Include scale visuals for Q1
4. Light vs heavy comparisons clear
5. Answer key with explanations
6. Colored backgrounds Q1-Q5
7. Complete image paths
8. Year 2 appropriate numbers

## EXAMPLES

### Q1 Template (Reading Scale):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> What weight does the scale show?</p>
  <div class="scale-container">
    <div class="scale-image">
      <img src="/images/scale.png" alt="scale" style="height:100px">
    </div>
    <div class="scale-visual">
      <div class="scale-pointer" style="transform:rotate(-45deg)"></div>
      <span class="scale-marking" style="left:30%;top:15%">0</span>
      <span class="scale-marking" style="left:50%;top:5%">100g</span>
      <span class="scale-marking" style="right:30%;top:15%">200g</span>
    </div>
    <p class="scale-label">The scale shows: <span class="answer-box"></span> g</p>
  </div>
</div>
```

### Q2 Template (Comparison):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Which object is heavier?</p>
  <div class="comparison-container">
    <div class="comparison-item">
      <img src="/images/feather.png" alt="feather">
      <p class="weight-value">85 g</p>
      <p><strong>Feather</strong></p>
    </div>
    <div class="comparison-item">
      <img src="/images/stone.png" alt="stone">
      <p class="weight-value">320 g</p>
      <p><strong>Stone</strong></p>
    </div>
  </div>
  <p class="question-text">The <span class="answer-line"></span> is heavier.</p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Tom's apple weighs 120 g. Sam's apple weighs 95 g. How much heavier is Tom's apple?</p>
  <div class="word-problem-visual">
    <div class="weight-comparison">
      <div class="weight-item">
        <img src="/images/apple.png" alt="apple">
        <p><strong>Tom</strong></p>
        <p class="weight-value">120 g</p>
      </div>
      <div class="weight-item">
        <img src="/images/apple.png" alt="apple">
        <p><strong>Sam</strong></p>
        <p class="weight-value">95 g</p>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Tom's apple is <span class="answer-box"></span> g heavier.</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All use standard units (g/kg)?
- [ ] Realistic weights for objects?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Complete image paths?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. UK Year 2 aligned.
