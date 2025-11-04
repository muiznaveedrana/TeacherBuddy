# Y2: Finding Fractions ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Find fractions of shapes AND quantities.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Fractions**: 1/2, 1/4, 2/4, 3/4 of shapes and numbers
- **Two contexts**: Shapes (visual) AND Quantities (calculation)
- **Skills**: Find fraction of a group, calculate fractions of numbers
- **Ages 6-7**: Bridge between visual and numerical understanding

## QUESTION TYPES

**Q1**: Find fraction of shapes. "Find 1/2 of 8 circles." Show 8 circles, student circles half.

**Q2**: Find fraction of quantity. "What is 1/4 of 12?" Simple calculation with visual support.

**Q3**: Word problem with objects. "There are 20 apples. Emma takes 1/2 of them. How many apples does Emma take?"

**Q4**: Find fraction then compare. "Find 1/4 of 16. Find 1/2 of 16. Which is more?"

**Q5**: Real-world context. "A chocolate bar has 8 pieces. Tom eats 3/4 of it. How many pieces did Tom eat?"

## NUMBER RANGES
- **Quantities**: 4, 8, 12, 16, 20 (numbers easily divisible by 2 and 4)
- **Avoid**: Odd numbers, numbers not divisible by 4 when using quarters
- **Results**: Whole numbers only (no decimal fractions)

## VISUAL OBJECTS
Use counting objects or shapes:
- **Circles**: CSS-generated colored circles
- **Squares**: CSS-generated colored squares
- **Real objects**: Use `/images/counting/` (fruits, toys, school supplies)
  - fruits: apple, banana, orange
  - toys: ball, car, doll, teddy
  - school_supplies: pencil, book, eraser

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.fraction-finding-container{margin:15px 0;padding:15px;background:#F5F5F5;border-radius:8px}
.object-array{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:15px 0}
.count-circle{width:40px;height:40px;border-radius:50%;border:3px solid #333;background:#4CAF50;display:inline-block}
.count-square{width:40px;height:40px;border:3px solid #333;background:#2196F3;display:inline-block;border-radius:3px}
.count-object{width:35px;height:35px;margin:5px}
.fraction-calculation{margin:15px 0;padding:15px;background:#E3F2FD;border:2px solid #1976D2;border-radius:8px}
.calc-step{margin:10px 0;padding:10px;background:#FFF;border-radius:5px;font-size:16pt}
.fraction-visual{display:flex;align-items:center;gap:20px;margin:15px 0;justify-content:center}
.fraction-label{font-size:18pt;font-weight:bold;color:#1976D2}
.fraction-equation{font-size:20pt;font-weight:bold;color:#FF5722;margin:15px 0;text-align:center}
.word-problem-visual{margin:10px 0;padding:15px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.quantity-display{font-size:22pt;font-weight:bold;color:#2E7D32;text-align:center;margin:10px 0}
.comparison-box{display:flex;justify-content:space-around;margin:15px 0;flex-wrap:wrap}
.comparison-item{text-align:center;padding:15px;margin:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:150px}
.comparison-result{font-size:20pt;font-weight:bold;color:#FF5722;margin:10px 0}
.chocolate-bar{display:flex;border:3px solid #333;border-radius:5px;overflow:hidden;margin:15px auto;max-width:320px}
.chocolate-piece{width:40px;height:60px;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12pt}
.chocolate-piece:last-child{border-right:none}
.chocolate-eaten{background:#8B4513;color:#FFF}
.chocolate-left{background:#D2691E;color:#FFF}
.instruction-box{margin:15px 0;padding:12px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px;font-size:16pt;font-weight:600;text-align:center}
.answer-box{display:inline-block;min-width:70px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:70px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. ONLY use numbers divisible by 2 (for halves) and 4 (for quarters)
2. Visual support for ALL questions (shapes or objects)
3. Answer must be whole numbers (no 0.5, only whole pieces)
4. Show fraction notation clearly (1/2, 1/4, etc.)
5. Include calculation steps in answer key
6. Answer key with working (e.g., "1/2 of 12 = 12 ÷ 2 = 6")
7. Colored backgrounds Q1-Q5
8. Year 2 appropriate complexity

## CALCULATION EXAMPLES
- 1/2 of 8 = 8 ÷ 2 = 4
- 1/4 of 12 = 12 ÷ 4 = 3
- 2/4 of 12 = (12 ÷ 4) × 2 = 3 × 2 = 6
- 3/4 of 16 = (16 ÷ 4) × 3 = 4 × 3 = 12

## EXAMPLES

### Q1 Template (Find Fraction of Shapes):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Find 1/2 of the circles.</p>
  <div class="instruction-box">
    Circle half (1/2) of the circles below.
  </div>
  <div class="fraction-finding-container">
    <div class="object-array">
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
      <div class="count-circle"></div>
    </div>
    <p class="fraction-label">Total: 8 circles</p>
  </div>
  <p class="question-text">1/2 of 8 = <span class="answer-box"></span></p>
</div>
```

### Q2 Template (Calculate Fraction):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> What is 1/4 of 12?</p>
  <div class="fraction-calculation">
    <div class="object-array">
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
      <div class="count-square"></div>
    </div>
    <p class="fraction-equation">1/4 of 12 = 12 ÷ 4 = ?</p>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q3 Template (Word Problem):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> There are 20 apples. Emma takes 1/2 of them. How many apples does Emma take?</p>
  <div class="word-problem-visual">
    <div class="object-array">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
      <img src="/images/apple.png" class="count-object" alt="apple">
    </div>
    <p class="quantity-display">Total: 20 apples</p>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Emma takes <span class="answer-box"></span> apples.</p>
</div>
```

### Q5 Template (Chocolate Bar):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A chocolate bar has 8 pieces. Tom eats 3/4 of it. How many pieces did Tom eat?</p>
  <div class="word-problem-visual">
    <div class="chocolate-bar">
      <div class="chocolate-piece">1</div>
      <div class="chocolate-piece">2</div>
      <div class="chocolate-piece">3</div>
      <div class="chocolate-piece">4</div>
      <div class="chocolate-piece">5</div>
      <div class="chocolate-piece">6</div>
      <div class="chocolate-piece">7</div>
      <div class="chocolate-piece">8</div>
    </div>
    <p class="fraction-label">3/4 of 8 pieces = ?</p>
  </div>
  <div class="working-space"></div>
  <p class="question-text">Tom ate <span class="answer-box"></span> pieces.</p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] All numbers divisible by 2 and 4?
- [ ] Visual support included?
- [ ] Answers are whole numbers?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with working?
- [ ] Calculation steps shown?

Generate complete HTML. UK Year 2 aligned.
