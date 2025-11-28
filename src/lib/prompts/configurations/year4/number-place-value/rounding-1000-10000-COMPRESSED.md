# Y4: Rounding to 10, 100 and 1000 ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Round 4-digit numbers to nearest 10, 100, 1000.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## RANDOMIZATION RULES (MANDATORY)

**NUMBERS**: Generate NEW random 4-digit numbers (1000-9999) each time. NEVER reuse examples.
- Mix of round-up cases (decision digit 5-9) and round-down cases (decision digit 0-4)
- Avoid obvious patterns like 1234, 5000, 5555

**QUESTION TYPES**: Pick 5 different types from the pool below. Shuffle order each time.

**CONTEXTS**: Rotate through different real-world scenarios (see list below).

## QUESTION TYPE POOL (Pick 5, shuffle order)

### Type A: Number Line
Show number on a number line with boundaries and midpoint marked. Student identifies which boundary is closer.
- Round to nearest 10, 100, OR 1000 (vary each time)

### Type B: Real-World Context
Simple word problem with real-world data. NO extra facts or explanations - just the question.
**Context options (rotate):**
- River lengths (Thames 346km, Severn 354km, Trent 297km)
- Stadium capacity (Wembley 90000, Old Trafford 74879)
- Mountain heights (Ben Nevis 1345m, Snowdon 1085m)
- City populations (Manchester 547627, Birmingham 1141816)
- Distances (London to Edinburgh 647km, London to Paris 459km)
- School pupils (various 4-digit numbers)

### Type C: True or False
Statement: "[Number] rounded to the nearest [10/100/1000] is [answer]"
- Mix correct and incorrect statements
- Student circles TRUE or FALSE

### Type D: Reverse/Detective
"A number was rounded to the nearest [10/100/1000]. The answer was [X]. What could the original number have been?"
- NO clues or hints
- Accept any valid answer in range

### Type E: Estimation Problem
Two numbers given. "Estimate the total/difference by rounding each to the nearest [1000] first."
- Show calculation boxes: Number → Rounded → Total

### Type F: What Place Value?
"4,567 was rounded to give 4,600. What was it rounded to - nearest 10, 100, or 1000?"

### Type G: Spot the Error
"Sam rounded 3,847 to the nearest 100 and got 3,900. Is Sam correct? Explain."

### Type H: Compare Rounded Values
"Round both numbers to the nearest 1000. Which is larger: 4,567 or 4,489?"

## CSS (Minimal - No hints, no decision highlighting)
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.number-line-box{margin:20px 0;padding:25px;background:rgba(255,255,255,0.5);border-radius:8px;border:2px solid #ddd}
.number-line-visual{position:relative;height:80px;margin:20px 40px}
.number-line-track{position:absolute;top:40px;left:0;right:0;height:6px;background:#333;border-radius:3px}
.boundary{position:absolute;top:25px;width:4px;height:36px;background:#333;border-radius:2px}
.boundary.left{left:0}
.boundary.right{right:0}
.boundary-number{position:absolute;top:65px;font-size:16pt;font-weight:bold;color:#333}
.boundary-number.left{left:0;transform:translateX(-50%)}
.boundary-number.right{right:0;transform:translateX(50%)}
.midpoint{position:absolute;left:50%;transform:translateX(-50%);top:30px;width:3px;height:26px;background:#FF9800;border-radius:2px}
.midpoint-label{position:absolute;left:50%;transform:translateX(-50%);top:65px;font-size:14pt;color:#FF9800;font-weight:bold}
.target-number{position:absolute;top:0;transform:translateX(-50%);padding:6px 14px;background:#2196F3;color:#FFF;font-size:18pt;font-weight:bold;border-radius:6px}
.target-arrow{position:absolute;top:28px;transform:translateX(-50%);font-size:20pt;color:#2196F3}
.inner-box{margin:15px 0;padding:18px;background:rgba(255,255,255,0.5);border-radius:8px;border:2px solid #ddd}
.true-false-box{margin:15px 0;padding:18px;background:rgba(255,255,255,0.5);border:3px solid #9C27B0;border-radius:8px}
.statement{font-size:18pt;font-weight:bold;color:#333;margin:10px 0;padding:15px;background:rgba(255,255,255,0.7);border-radius:6px;text-align:center}
.tf-options{display:flex;justify-content:center;gap:40px;margin:15px 0}
.tf-option{padding:12px 30px;border:3px solid #ddd;border-radius:8px;font-size:18pt;font-weight:bold;background:#FFF}
.tf-option.true{border-color:#4CAF50;color:#4CAF50}
.tf-option.false{border-color:#F44336;color:#F44336}
.detective-box{margin:15px 0;padding:18px;background:rgba(255,255,255,0.5);border:2px dashed #FF9800;border-radius:8px;text-align:center}
.mystery-number{display:inline-block;padding:10px 25px;background:#FF9800;color:#FFF;font-size:28pt;font-weight:bold;border-radius:8px;margin:10px}
.estimation-box{margin:15px 0;padding:18px;background:rgba(255,255,255,0.5);border:2px solid #2196F3;border-radius:8px}
.calculation-row{display:flex;align-items:center;justify-content:center;gap:15px;margin:15px 0;flex-wrap:wrap}
.calc-number{padding:12px 20px;background:#FFF;border:3px solid #2196F3;border-radius:8px;font-size:24pt;font-weight:bold;color:#1976D2}
.calc-symbol{font-size:28pt;font-weight:bold;color:#333}
.calc-arrow{font-size:24pt;color:#FF9800}
.rounded-box{padding:12px 20px;background:#FFF9C4;border:3px solid #FF9800;border-radius:8px;font-size:24pt;font-weight:bold;color:#F57C00;min-width:80px;text-align:center}
.answer-line{font-size:14pt;margin:8px 0;padding-bottom:2px;border-bottom:2px solid #333;display:inline-block;min-width:120px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key-content p{font-size:14pt;line-height:1.7;margin:8px 0}
```

## CRITICAL RULES

1. **NO HINTS OR CLUES** - Never show which digit to look at, never explain the rule
2. **NO DECISION HIGHLIGHTING** - Don't highlight or color-code the decision digit
3. **SINGLE ANSWER PER QUESTION** - Each question must have exactly one answer field
4. **RANDOMIZE EVERYTHING** - Different numbers, contexts, and question order each generation
5. **KEEP IT SIMPLE** - Question + visual (if needed) + answer line only
6. Use `<p class="answer-line">Answer:</p>` for interactive mode compatibility
7. Answer key: numbers only (e.g., "3800" not "3,800 because...")

## EXAMPLE OUTPUT STRUCTURE

```html
<!-- Type A: Number Line -->
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Use the number line to round 2,847 to the nearest 100.</p>
  <div class="number-line-box">
    <div class="number-line-visual">
      <div class="number-line-track"></div>
      <div class="boundary left"></div>
      <div class="boundary right"></div>
      <div class="boundary-number left">2,800</div>
      <div class="boundary-number right">2,900</div>
      <div class="midpoint"></div>
      <div class="midpoint-label">2,850</div>
      <div class="target-number" style="left:47%">2,847</div>
      <div class="target-arrow" style="left:47%">↓</div>
    </div>
  </div>
  <p class="answer-line">Answer:</p>
</div>

<!-- Type B: Real-World (simple) -->
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> The River Severn is 354 km long. Round this to the nearest 100 km.</p>
  <p class="answer-line">Answer:</p>
</div>

<!-- Type C: True/False -->
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> True or False? Circle the correct answer.</p>
  <div class="true-false-box">
    <p class="statement">6,482 rounded to the nearest 1000 is 6,000</p>
    <div class="tf-options">
      <div class="tf-option true">TRUE</div>
      <div class="tf-option false">FALSE</div>
    </div>
  </div>
  <p class="answer-line">Answer:</p>
</div>

<!-- Type D: Detective (NO clues) -->
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> A number was rounded to the nearest 10. The answer was 3,280. What could the original number have been?</p>
  <div class="detective-box">
    <p><span class="mystery-number">3,280</span></p>
  </div>
  <p>Write one possible original number: <span class="answer-line"></span></p>
</div>

<!-- Type E: Estimation -->
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> A cinema sold 2,847 tickets on Saturday and 3,156 on Sunday. Estimate the total by rounding each to the nearest 1000.</p>
  <div class="estimation-box">
    <div class="calculation-row">
      <span class="calc-number">2,847</span>
      <span class="calc-arrow">→</span>
      <span class="rounded-box">?</span>
      <span class="calc-symbol">+</span>
      <span class="calc-number">3,156</span>
      <span class="calc-arrow">→</span>
      <span class="rounded-box">?</span>
      <span class="calc-symbol">=</span>
      <span class="rounded-box">?</span>
    </div>
  </div>
  <p>Estimated total: <span class="answer-line"></span></p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] 5 DIFFERENT question types used?
- [ ] All numbers RANDOMIZED (not from examples)?
- [ ] NO hints, clues, or explanations in questions?
- [ ] NO decision digit highlighting?
- [ ] Single answer per question?
- [ ] Real-world context varied?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with numbers only?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
