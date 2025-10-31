# Y3: Comparing Fractions ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Compare fractions with same/different denominators.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Fractions**: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10, 2/4, 3/4, 2/3, etc.
- **Compare**: Use <, >, = symbols
- **Same denominator**: Compare numerators (2/5 vs 3/5)
- **Different denominators**: Visual comparison, unit fractions
- **Skills**: Order fractions, identify larger/smaller, justify reasoning

## QUESTION TYPES

**Q1**: Visual comparison with shapes. "Which is larger?" Show two fraction diagrams.

**Q2**: Use <, >, = (same denominator). "Compare: 2/5 ⬜ 4/5"

**Q3**: Order fractions (3-4 fractions). "Put these in order from smallest to largest."

**Q4**: Compare unit fractions. "Which is smaller: 1/4 or 1/8?" Visual support.

**Q5**: Word problem. "Tom ate 2/3 of a pizza. Emma ate 1/2. Who ate more?"

## COMPARISON RULES FOR YEAR 3

### Same Denominator (easier):
- **2/5 vs 4/5**: More pieces of same size → 4/5 is larger
- Compare numerators only

### Unit Fractions (different denominators):
- **1/4 vs 1/8**: Smaller denominator = bigger piece → 1/4 is larger
- "Cutting into fewer pieces makes each piece bigger"

### Visual Strategy:
- Use fraction circles/bars to compare visually
- Shade parts to show which is more

## COLOR SCHEME (Year 3 Enhanced)
- **Fraction A**: #9C27B0 (purple)
- **Fraction B**: #FF9800 (orange)
- **Equal fractions**: #4CAF50 (green)
- **Borders**: 3px solid #333
- **Comparison symbols**: #E91E63 (pink/red)

## CSS (Ultra-Compact Year 3 Enhanced):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.comparison-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px;border:2px solid #9C27B0}
.comparison-row{display:flex;justify-content:space-around;align-items:center;margin:20px 0;flex-wrap:wrap}
.fraction-item{text-align:center;margin:15px;padding:18px;border:3px solid #ddd;border-radius:8px;background:#FFF;min-width:200px}
.fraction-item.purple{border-color:#9C27B0;background:#F3E5F5}
.fraction-item.orange{border-color:#FF9800;background:#FFF3E0}
.fraction-circle{width:160px;height:160px;border-radius:50%;border:3px solid #333;position:relative;overflow:hidden;margin:15px auto;display:inline-block}
.fraction-half{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-third{position:absolute;width:100%;height:100%}
.third-1{clip-path:polygon(50% 50%,50% 0,100% 43.3%)}
.third-2{clip-path:polygon(50% 50%,100% 43.3%,50% 100%)}
.third-3{clip-path:polygon(50% 50%,50% 100%,0 43.3%)}
.fraction-quarter{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.fraction-fifth{position:absolute;width:100%;height:100%}
.fifth-1{clip-path:polygon(50% 50%,50% 0,100% 20%)}
.fifth-2{clip-path:polygon(50% 50%,100% 20%,90% 65%)}
.fifth-3{clip-path:polygon(50% 50%,90% 65%,50% 100%)}
.fifth-4{clip-path:polygon(50% 50%,50% 100%,10% 65%)}
.fifth-5{clip-path:polygon(50% 50%,10% 65%,0 20%)}
.fraction-eighth{position:absolute;width:100%;height:100%}
.eighth-1{clip-path:polygon(50% 50%,50% 0,71% 0,71% 29%)}
.eighth-2{clip-path:polygon(50% 50%,71% 29%,100% 50%)}
.eighth-3{clip-path:polygon(50% 50%,100% 50%,71% 71%)}
.eighth-4{clip-path:polygon(50% 50%,71% 71%,50% 100%)}
.eighth-5{clip-path:polygon(50% 50%,50% 100%,29% 71%)}
.eighth-6{clip-path:polygon(50% 50%,29% 71%,0 50%)}
.eighth-7{clip-path:polygon(50% 50%,0 50%,29% 29%)}
.eighth-8{clip-path:polygon(50% 50%,29% 29%,50% 0)}
.fraction-bar{width:260px;height:70px;border:3px solid #333;border-radius:6px;display:flex;margin:18px auto}
.bar-section{flex:1;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:15pt}
.bar-section:last-child{border-right:none}
.shaded-purple{background:#9C27B0;color:#FFF}
.shaded-orange{background:#FF9800;color:#FFF}
.shaded-green{background:#4CAF50;color:#FFF}
.unshaded{background:#FFF;color:#999}
.fraction-label{font-size:28pt;font-weight:bold;color:#7B1FA2;margin:12px 0}
.comparison-symbol{font-size:48pt;font-weight:bold;color:#E91E63;margin:0 20px;min-width:60px;text-align:center}
.symbol-box{display:inline-block;min-width:60px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 12px;font-size:32pt;line-height:60px;text-align:center}
.ordering-container{margin:18px 0;padding:18px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.fraction-set{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin:20px 0}
.fraction-card{text-align:center;padding:15px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;min-width:140px}
.ordering-line{margin:20px 0;padding:15px;background:#FFF;border:2px dashed #4CAF50;border-radius:6px;min-height:60px}
.ordering-label{font-size:15pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.unit-fraction-compare{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.reasoning-box{margin:15px 0;padding:14px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.reasoning-prompt{font-size:15pt;font-weight:600;color:#F57C00;margin-bottom:10px}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.pizza-comparison{display:flex;justify-content:space-around;flex-wrap:wrap;margin:20px 0}
.pizza-item{text-align:center;margin:15px}
.person-name{font-size:18pt;font-weight:bold;color:#1976D2;margin-bottom:10px}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:70px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. Use fractions appropriate for Year 3: 1/2, 1/3, 1/4, 1/5, 1/8, 1/10, 2/3, 2/4, 3/4, etc.
2. Same denominator comparisons are EASIER (Q2)
3. Unit fraction comparisons with visuals (Q4)
4. Always provide visual support for difficult comparisons
5. Use <, >, = symbols correctly
6. Include reasoning/explanation prompts
7. Real-world contexts for word problems
8. Answer key with explanations WHY
9. Colored backgrounds Q1-Q5
10. Year 3 appropriate complexity (ages 7-8)

## EXAMPLES

### Q1 Template (Visual Comparison):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Look at these two fractions. Which is larger?</p>
  <div class="comparison-container">
    <div class="comparison-row">
      <div class="fraction-item purple">
        <div class="fraction-circle" style="width:140px;height:140px">
          <div class="fraction-third third-1 shaded-purple"></div>
          <div class="fraction-third third-2 shaded-purple"></div>
          <div class="fraction-third third-3 unshaded"></div>
        </div>
        <p class="fraction-label">2/3</p>
      </div>
      <div class="comparison-symbol">?</div>
      <div class="fraction-item orange">
        <div class="fraction-circle" style="width:140px;height:140px">
          <div class="fraction-half shaded-orange"></div>
        </div>
        <p class="fraction-label">1/2</p>
      </div>
    </div>
  </div>
  <p class="question-text">The larger fraction is: <span class="answer-line"></span></p>
  <div class="reasoning-box">
    <p class="reasoning-prompt">Explain your reasoning:</p>
    <div class="working-space"></div>
  </div>
</div>
```

### Q2 Template (Same Denominator with Symbols):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Compare these fractions. Write <, >, or = in each box.</p>
  <div class="instruction-box">
    Remember: When denominators are the same, compare the numerators!
  </div>
  <div style="margin:20px 0;text-align:center">
    <p style="font-size:28pt;font-weight:bold;margin:20px 0">
      <span style="color:#9C27B0">2/5</span>
      <span class="symbol-box"></span>
      <span style="color:#FF9800">4/5</span>
    </p>
    <div class="fraction-bar" style="width:280px">
      <div class="bar-section shaded-purple"></div>
      <div class="bar-section shaded-purple"></div>
      <div class="bar-section unshaded"></div>
      <div class="bar-section unshaded"></div>
      <div class="bar-section unshaded"></div>
    </div>
    <p style="margin-top:10px;font-size:14pt;color:#666">2/5</p>
  </div>
  <div style="margin:20px 0;text-align:center">
    <div class="fraction-bar" style="width:280px">
      <div class="bar-section shaded-orange"></div>
      <div class="bar-section shaded-orange"></div>
      <div class="bar-section shaded-orange"></div>
      <div class="bar-section shaded-orange"></div>
      <div class="bar-section unshaded"></div>
    </div>
    <p style="margin-top:10px;font-size:14pt;color:#666">4/5</p>
  </div>
  <div style="margin:30px 0;text-align:center">
    <p style="font-size:28pt;font-weight:bold;margin:20px 0">
      <span style="color:#9C27B0">3/4</span>
      <span class="symbol-box"></span>
      <span style="color:#FF9800">1/4</span>
    </p>
  </div>
</div>
```

### Q3 Template (Ordering Fractions):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Put these fractions in order from smallest to largest.</p>
  <div class="ordering-container">
    <div class="fraction-set">
      <div class="fraction-card">
        <div class="fraction-bar" style="width:160px;height:50px">
          <div class="bar-section shaded-purple"></div>
          <div class="bar-section shaded-purple"></div>
          <div class="bar-section shaded-purple"></div>
          <div class="bar-section unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:24pt">3/4</p>
      </div>
      <div class="fraction-card">
        <div class="fraction-bar" style="width:160px;height:50px">
          <div class="bar-section shaded-orange"></div>
          <div class="bar-section unshaded"></div>
          <div class="bar-section unshaded"></div>
          <div class="bar-section unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:24pt">1/4</p>
      </div>
      <div class="fraction-card">
        <div class="fraction-bar" style="width:160px;height:50px">
          <div class="bar-section shaded-green"></div>
          <div class="bar-section shaded-green"></div>
          <div class="bar-section unshaded"></div>
          <div class="bar-section unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:24pt">2/4</p>
      </div>
    </div>
    <div class="ordering-line">
      <p class="ordering-label">Smallest → Largest:</p>
      <p style="font-size:20pt;text-align:center;margin-top:15px">
        <span class="answer-box"></span>
        <span style="margin:0 15px">,</span>
        <span class="answer-box"></span>
        <span style="margin:0 15px">,</span>
        <span class="answer-box"></span>
      </p>
    </div>
  </div>
</div>
```

### Q4 Template (Unit Fractions Comparison):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Compare these unit fractions.</p>
  <div class="instruction-box">
    Remember: The SMALLER the denominator, the LARGER the fraction piece!
  </div>
  <div class="unit-fraction-compare">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">a) Which is smaller: 1/4 or 1/8?</p>
    <div class="comparison-row">
      <div class="fraction-item purple">
        <div class="fraction-circle" style="width:120px;height:120px">
          <div class="fraction-quarter quarter-1 shaded-purple"></div>
          <div class="fraction-quarter quarter-2 unshaded"></div>
          <div class="fraction-quarter quarter-3 unshaded"></div>
          <div class="fraction-quarter quarter-4 unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:24pt">1/4</p>
      </div>
      <div class="fraction-item orange">
        <div class="fraction-circle" style="width:120px;height:120px">
          <div class="fraction-eighth eighth-1 shaded-orange"></div>
          <div class="fraction-eighth eighth-2 unshaded"></div>
          <div class="fraction-eighth eighth-3 unshaded"></div>
          <div class="fraction-eighth eighth-4 unshaded"></div>
          <div class="fraction-eighth eighth-5 unshaded"></div>
          <div class="fraction-eighth eighth-6 unshaded"></div>
          <div class="fraction-eighth eighth-7 unshaded"></div>
          <div class="fraction-eighth eighth-8 unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:24pt">1/8</p>
      </div>
    </div>
    <p class="question-text">Answer: <span class="answer-line"></span> is smaller</p>
  </div>
  <div class="unit-fraction-compare" style="margin-top:25px">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">b) Which is larger: 1/3 or 1/5?</p>
    <p class="question-text">Answer: <span class="answer-line"></span> is larger</p>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Tom ate 2/3 of a pizza. Emma ate 1/2 of the same size pizza. Who ate more?</p>
  <div class="word-problem-visual">
    <div class="pizza-comparison">
      <div class="pizza-item">
        <p class="person-name">Tom</p>
        <div class="fraction-circle" style="width:140px;height:140px">
          <div class="fraction-third third-1 shaded-purple"></div>
          <div class="fraction-third third-2 shaded-purple"></div>
          <div class="fraction-third third-3 unshaded"></div>
        </div>
        <p class="fraction-label" style="font-size:22pt">2/3</p>
      </div>
      <div class="pizza-item">
        <p class="person-name">Emma</p>
        <div class="fraction-circle" style="width:140px;height:140px">
          <div class="fraction-half shaded-orange"></div>
        </div>
        <p class="fraction-label" style="font-size:22pt">1/2</p>
      </div>
    </div>
  </div>
  <p class="question-text">a) Who ate more pizza? <span class="answer-line"></span></p>
  <p class="question-text">b) Explain how you know:</p>
  <div class="working-space">
    <p class="working-space-label">Write your explanation:</p>
  </div>
</div>
```

## ANSWER KEY TEMPLATE
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <div class="answer-key-content">
    <p><strong>1.</strong> 2/3 is larger (2/3 = 4/6, and 1/2 = 3/6, so 2/3 > 1/2)</p>
    <p><strong>2.</strong> 2/5 < 4/5 (same denominator, 2 < 4)</p>
    <p><strong>2b.</strong> 3/4 > 1/4 (same denominator, 3 > 1)</p>
    <p><strong>3.</strong> Order: 1/4, 2/4, 3/4 (same denominator, compare numerators)</p>
    <p><strong>4a.</strong> 1/8 is smaller (more pieces = smaller size)</p>
    <p><strong>4b.</strong> 1/3 is larger (fewer pieces = bigger size)</p>
    <p><strong>5a.</strong> Tom ate more (2/3 > 1/2)</p>
    <p><strong>5b.</strong> 2/3 means 2 out of 3 pieces, which is more than 1/2 (half). Looking at the circles, Tom's shaded area is bigger.</p>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Visual comparison with shapes?
- [ ] Q2: Symbol comparison (< > =) with same denominators?
- [ ] Q3: Ordering activity with 3-4 fractions?
- [ ] Q4: Unit fraction comparison with visuals?
- [ ] Q5: Real-world word problem?
- [ ] All visuals clear and accurate?
- [ ] Reasoning/explanation prompts included?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with explanations WHY?
- [ ] Year 3 appropriate language and complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
