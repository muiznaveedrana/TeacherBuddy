# Y3: Times Tables 3, 4, 8 ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Times tables: 3, 4, 8 up to ×12.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Times tables**: 3×, 4×, 8× (up to ×12)
- **Visual models**: Arrays, groups, repeated addition
- **Skills**: Recall facts, recognize patterns, apply to word problems
- **Build on**: 2×, 5×, 10× from Year 2

## QUESTION TYPES

**Q1**: Arrays (visual multiplication). Show 3×4 as array of dots/objects. "How many in total?"

**Q2**: Pattern completion. "3, 6, 9, __, __, __" or "4× table: 4, 8, 12, __, __"

**Q3**: Mixed practice grid (8-10 facts). Mix of 3×, 4×, 8× questions.

**Q4**: Related facts. "If 3×4=12, what is 4×3?" or "Use 4×5=20 to find 4×6"

**Q5**: Word problem with visual. "There are 4 plates. Each has 6 cookies. How many cookies?"

## ARRAYS & VISUALS

### Arrays (rows × columns):
- **3×4**: 3 rows of 4 dots
- **4×5**: 4 rows of 5 circles
- **8×3**: 8 rows of 3 objects

### Use object images:
- `/images/counting/toys/ball.png` (25px)
- `/images/counting/fruits/apple.png` (25px)
- `/images/counting/school_supplies/pencil.png` (25px)

## COLOR SCHEME (Year 3 Enhanced)
- **3× table**: #9C27B0 (purple)
- **4× table**: #2196F3 (blue)
- **8× table**: #FF9800 (orange)
- **Mixed/general**: #4CAF50 (green)
- **Borders**: 3px solid #333

## CSS (Ultra-Compact Year 3 Enhanced):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.array-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px;text-align:center}
.array-grid{display:inline-grid;gap:8px;margin:15px auto;padding:15px;background:#FFF;border:3px solid #9C27B0;border-radius:8px}
.array-dot{width:25px;height:25px;background:#9C27B0;border-radius:50%;display:inline-block}
.array-object{width:25px;height:25px;display:inline-block}
.array-label{font-size:20pt;font-weight:bold;color:#7B1FA2;margin:12px 0}
.multiplication-equation{font-size:28pt;font-weight:bold;margin:15px 0;text-align:center}
.times-symbol{color:#FF9800;font-size:32pt;margin:0 12px}
.equals-symbol{color:#4CAF50;font-size:32pt;margin:0 12px}
.pattern-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.pattern-sequence{display:flex;justify-content:center;align-items:center;gap:15px;flex-wrap:wrap;margin:20px 0}
.pattern-number{font-size:32pt;font-weight:bold;color:#1976D2;min-width:60px;text-align:center;padding:12px;background:#FFF;border:3px solid #2196F3;border-radius:8px}
.pattern-blank{font-size:32pt;font-weight:bold;min-width:80px;height:70px;border:3px solid #333;border-radius:8px;background:#FFF;display:inline-block;vertical-align:middle}
.pattern-label{font-size:18pt;font-weight:bold;color:#1565C0;margin:15px 0}
.practice-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:15px;margin:18px 0;padding:18px;background:#E8F5E9;border-radius:8px}
.practice-item{padding:15px;background:#FFF;border:3px solid #4CAF50;border-radius:8px;text-align:center}
.practice-fact{font-size:24pt;font-weight:bold;margin:10px 0}
.practice-answer{min-width:70px;height:45px;border:3px solid #333;border-radius:6px;background:#FFF;display:inline-block;margin:8px 0}
.related-facts-container{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.fact-pair{display:flex;justify-content:space-around;align-items:center;margin:20px 0;flex-wrap:wrap}
.fact-card{text-align:center;padding:18px;background:#FFF;border:3px solid #E91E63;border-radius:8px;min-width:200px;margin:10px}
.fact-display{font-size:28pt;font-weight:bold;color:#C2185B}
.relationship-arrow{font-size:40pt;color:#FF9800;margin:0 15px}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.problem-illustration{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin:20px 0}
.group-visual{text-align:center;margin:15px;padding:15px;background:#FFF;border:2px solid #FF9800;border-radius:8px}
.group-label{font-size:16pt;font-weight:bold;color:#F57C00;margin-bottom:10px}
.object-array{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:200px}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:70px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.times-table-chart{margin:18px 0;padding:15px;background:#FFF;border:3px solid #9C27B0;border-radius:8px;display:inline-block}
.chart-row{display:flex;gap:10px;margin:5px 0}
.chart-cell{min-width:50px;padding:8px;text-align:center;font-size:15pt;font-weight:bold;border:2px solid #ddd;border-radius:4px;background:#F5F5F5}
.chart-cell.header{background:#9C27B0;color:#FFF}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. Focus on 3×, 4×, 8× tables (up to ×12)
2. Always show visual representations for Q1
3. Include pattern work for understanding
4. Mix of recall and reasoning questions
5. Word problems with real-world contexts
6. Use object images for arrays where appropriate
7. Show commutativity (3×4 = 4×3)
8. Answer key with strategies/patterns
9. Colored backgrounds Q1-Q5
10. Year 3 appropriate (ages 7-8)

## EXAMPLES

### Q1 Template (Array Visual):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Count the dots in each array. Write the multiplication fact.</p>
  <div class="array-container">
    <p style="font-weight:bold;margin-bottom:15px">a) 4 rows of 3 dots</p>
    <div class="array-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
      <div class="array-dot"></div>
    </div>
    <div class="multiplication-equation">
      4 <span class="times-symbol">×</span> 3 <span class="equals-symbol">=</span> <span class="answer-box"></span>
    </div>
  </div>
  <div class="array-container" style="margin-top:30px">
    <p style="font-weight:bold;margin-bottom:15px">b) 3 groups of 8 apples</p>
    <div class="problem-illustration">
      <div class="group-visual">
        <div class="object-array">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
        <p class="group-label">Group 1</p>
      </div>
      <div class="group-visual">
        <div class="object-array">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
        <p class="group-label">Group 2</p>
      </div>
      <div class="group-visual">
        <div class="object-array">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
          <img src="/images/counting/fruits/apple.png" width="25" height="25" alt="apple">
        </div>
        <p class="group-label">Group 3</p>
      </div>
    </div>
    <div class="multiplication-equation">
      3 <span class="times-symbol">×</span> 8 <span class="equals-symbol">=</span> <span class="answer-box"></span>
    </div>
  </div>
</div>
```

### Q2 Template (Patterns):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Complete the patterns in each times table.</p>
  <div class="pattern-container">
    <p class="pattern-label">a) 4 times table</p>
    <div class="pattern-sequence">
      <div class="pattern-number">4</div>
      <div class="pattern-number">8</div>
      <div class="pattern-number">12</div>
      <span class="pattern-blank"></span>
      <span class="pattern-blank"></span>
      <span class="pattern-blank"></span>
    </div>
  </div>
  <div class="pattern-container">
    <p class="pattern-label">b) 8 times table</p>
    <div class="pattern-sequence">
      <div class="pattern-number">8</div>
      <div class="pattern-number">16</div>
      <span class="pattern-blank"></span>
      <div class="pattern-number">32</div>
      <span class="pattern-blank"></span>
    </div>
  </div>
</div>
```

### Q3 Template (Mixed Practice):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Answer these multiplication facts as quickly as you can!</p>
  <div class="practice-grid">
    <div class="practice-item">
      <div class="practice-fact">3 × 4 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">4 × 5 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">8 × 3 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">3 × 7 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">4 × 8 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">8 × 6 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">3 × 9 =</div>
      <span class="practice-answer"></span>
    </div>
    <div class="practice-item">
      <div class="practice-fact">4 × 7 =</div>
      <span class="practice-answer"></span>
    </div>
  </div>
</div>
```

### Q4 Template (Related Facts):
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Use the first fact to help you find the answer to the second fact.</p>
  <div class="instruction-box">
    Remember: Multiplication can be done in any order! 3 × 4 = 4 × 3
  </div>
  <div class="related-facts-container">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">a) If 4 × 5 = 20, what is 5 × 4?</p>
    <div class="fact-pair">
      <div class="fact-card">
        <p style="margin-bottom:10px">We know:</p>
        <div class="fact-display">4 × 5 = 20</div>
      </div>
      <div class="relationship-arrow">→</div>
      <div class="fact-card">
        <p style="margin-bottom:10px">So:</p>
        <div class="fact-display">5 × 4 = <span class="answer-box" style="min-width:70px"></span></div>
      </div>
    </div>
  </div>
  <div class="related-facts-container" style="margin-top:25px">
    <p style="font-weight:bold;font-size:17pt;margin-bottom:15px">b) If 8 × 4 = 32, what is 8 × 5?</p>
    <div class="working-space">
      <p class="working-space-label">Show your thinking:</p>
    </div>
    <p class="question-text">Answer: 8 × 5 = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> There are 4 tables in the classroom. Each table has 6 pencils on it. How many pencils are there altogether?</p>
  <div class="word-problem-visual">
    <div class="problem-illustration">
      <div class="group-visual">
        <p style="font-weight:bold;margin-bottom:10px">Table 1</p>
        <div class="object-array" style="max-width:120px">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
        </div>
      </div>
      <div class="group-visual">
        <p style="font-weight:bold;margin-bottom:10px">Table 2</p>
        <div class="object-array" style="max-width:120px">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
        </div>
      </div>
      <div class="group-visual">
        <p style="font-weight:bold;margin-bottom:10px">Table 3</p>
        <div class="object-array" style="max-width:120px">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
        </div>
      </div>
      <div class="group-visual">
        <p style="font-weight:bold;margin-bottom:10px">Table 4</p>
        <div class="object-array" style="max-width:120px">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
          <img src="/images/counting/school_supplies/pencil.png" width="20" height="20" alt="pencil">
        </div>
      </div>
    </div>
  </div>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
  <p class="question-text">Multiplication: <span class="answer-box" style="min-width:60px"></span> × <span class="answer-box" style="min-width:60px"></span> = <span class="answer-box"></span></p>
  <p class="question-text">Answer: There are <span class="answer-box"></span> pencils altogether.</p>
</div>
```

## ANSWER KEY TEMPLATE
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <div class="answer-key-content">
    <p><strong>1a.</strong> 12 (4 × 3 = 12)</p>
    <p><strong>1b.</strong> 24 (3 × 8 = 24)</p>
    <p><strong>2a.</strong> 16, 20, 24 (counting up by 4s)</p>
    <p><strong>2b.</strong> 24, 40 (8, 16, 24, 32, 40 - counting up by 8s)</p>
    <p><strong>3.</strong> 3×4=12, 4×5=20, 8×3=24, 3×7=21, 4×8=32, 8×6=48, 3×9=27, 4×7=28</p>
    <p><strong>4a.</strong> 20 (multiplication is commutative: 4×5 = 5×4)</p>
    <p><strong>4b.</strong> 40 (8×5 is one more group of 8 than 8×4, so 32+8=40)</p>
    <p><strong>5.</strong> 4 × 6 = 24. There are 24 pencils altogether.</p>
  </div>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Array visuals with objects/dots?
- [ ] Q2: Pattern completion for each table?
- [ ] Q3: Mixed practice grid (8+ facts)?
- [ ] Q4: Related facts showing strategies?
- [ ] Q5: Real-world word problem with visuals?
- [ ] Focus on 3×, 4×, 8× tables?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with strategies?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
