# Y2: Capacity/Volume ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Standard units (ml, l).**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Standard units**: ml (millilitres), l (litres)
- **Measurement tools**: Jugs, measuring cups, containers
- **Skills**: Read scales, estimate, compare, full/empty/half-full
- **Ages 6-7**: Practical liquid measurement contexts

## QUESTION TYPES

**Q1**: Read measuring jug. Show jug with liquid level marked. "How much liquid is in the jug?" Answer: __ ml or __ l

**Q2**: Compare capacities. Two containers with given capacities. "Which holds more?" or "Which holds less?"

**Q3**: Ordering. 3-4 containers with capacities. "Put in order from smallest to largest capacity."

**Q4**: Simple calculation. "A cup holds 250 ml. A bottle holds 500 ml. How much more does the bottle hold?"

**Q5**: Word problem. Real-world context. "Emma pours 300 ml of juice. Lily pours 450 ml. How much more juice did Lily pour?"

## NUMBER RANGES
- **ml**: 100-999 ml (common container sizes)
- **litres**: 1-5 l (whole litres or simple like 2 l)
- **Differences**: 50-400 ml (subtraction within Y2 range)

## REALISTIC CAPACITIES (Important!)
- **Small (100-250ml)**: cup, mug, glass
- **Medium (250-500ml)**: bowl, bottle
- **Large (500-999ml)**: jug, kettle, milk-carton
- **Litres (1-5l)**: bucket, watering-can, fish-tank

## IMAGES (CRITICAL - EXACT PATHS REQUIRED)
**MANDATORY**: ALL image paths MUST start with `/images/measurement/`

Available containers:
- `/images/[cup|glass|mug|bowl|bottle|jug|kettle|milk-carton|bucket|watering-can|fish-tank].png`
- `/images/[cup|jug].png`

**WRONG**: `/images/containers/cup.png` ❌
**CORRECT**: `/images/cup.png` ✅

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.jug-container{margin:10px 0;padding:15px;background:#F5F5F5;border-radius:8px;text-align:center}
.measuring-jug{width:120px;height:200px;border:3px solid #333;border-radius:0 0 15px 15px;position:relative;margin:15px auto;background:linear-gradient(to top,#2196F3 0%,#2196F3 60%,transparent 60%)}
.jug-scale{position:absolute;right:-40px;top:0;height:100%}
.jug-marking{position:relative;height:50px;border-left:2px solid #333}
.jug-label{position:absolute;left:5px;font-size:12pt;font-weight:bold}
.container-visual{margin:10px 0;text-align:center}
.container-visual img{height:80px}
.comparison-container{display:flex;justify-content:space-around;margin:15px 0;flex-wrap:wrap}
.comparison-item{text-align:center;padding:10px;margin:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:140px}
.comparison-item img{height:70px;margin-bottom:8px}
.capacity-value{font-size:18pt;font-weight:bold;color:#1976D2;margin:8px 0}
.ordering-container{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.ordering-item{text-align:center;margin:10px;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.ordering-item img{height:65px;margin-bottom:5px}
.ordering-box{width:40px;height:40px;border:2px solid #333;border-radius:5px;background:#FFF;display:inline-block;margin:5px}
.calculation-box{margin:10px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.calculation-item{display:flex;align-items:center;gap:15px;margin:10px 0;padding:10px;background:#FFF;border-radius:5px}
.calculation-item img{height:65px}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.capacity-comparison{display:flex;justify-content:space-around;margin:15px 0}
.capacity-item{text-align:center;padding:10px}
.capacity-item img{height:70px;margin-bottom:5px}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Use ONLY ml and l (standard units)
2. Realistic capacities for containers (cup: 250ml NOT 5l!)
3. Include measuring jug visuals for Q1
4. More/less comparisons clear
5. Answer key with explanations
6. Colored backgrounds Q1-Q5
7. Complete image paths
8. Year 2 appropriate numbers

## EXAMPLES

### Q1 Template (Reading Measuring Jug):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> How much water is in the measuring jug?</p>
  <div class="jug-container">
    <div class="container-visual">
      <img src="/images/jug.png" alt="measuring jug" style="height:100px">
    </div>
    <div class="measuring-jug">
      <div class="jug-scale">
        <div class="jug-marking"><span class="jug-label">200ml</span></div>
        <div class="jug-marking"><span class="jug-label">150ml</span></div>
        <div class="jug-marking"><span class="jug-label">100ml</span></div>
        <div class="jug-marking"><span class="jug-label">50ml</span></div>
      </div>
    </div>
    <p class="capacity-value">The jug contains: <span class="answer-box"></span> ml</p>
  </div>
</div>
```

### Q2 Template (Comparison):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Which container holds more liquid?</p>
  <div class="comparison-container">
    <div class="comparison-item">
      <img src="/images/cup.png" alt="cup">
      <p class="capacity-value">200 ml</p>
      <p><strong>Cup</strong></p>
    </div>
    <div class="comparison-item">
      <img src="/images/bottle.png" alt="bottle">
      <p class="capacity-value">500 ml</p>
      <p><strong>Bottle</strong></p>
    </div>
  </div>
  <p class="question-text">The <span class="answer-line"></span> holds more.</p>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Emma pours 300 ml of juice into a jug. Lily pours 450 ml. How much more juice did Lily pour?</p>
  <div class="word-problem-visual">
    <div class="capacity-comparison">
      <div class="capacity-item">
        <img src="/images/jug.png" alt="jug">
        <p><strong>Emma</strong></p>
        <p class="capacity-value">300 ml</p>
      </div>
      <div class="capacity-item">
        <img src="/images/jug.png" alt="jug">
        <p><strong>Lily</strong></p>
        <p class="capacity-value">450 ml</p>
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Lily poured <span class="answer-box"></span> ml more juice.</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All use standard units (ml/l)?
- [ ] Realistic capacities for containers?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Complete image paths?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. UK Year 2 aligned.
