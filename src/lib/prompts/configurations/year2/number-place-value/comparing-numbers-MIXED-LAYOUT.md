# Ages 6-7: Comparing Numbers (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 comparing numbers questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Always/Sometimes/Never, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Range:** Numbers 0-100
- **Key skills:** Compare using <, >, =; Order numbers smallest to largest/largest to smallest
- **Key concepts:** Greater than, less than, equal to, ordering, place value for comparison
- **Key misconception:** Thinking the number with more digits is always bigger (e.g., 9 > 12)

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
.fluency-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}
.fluency-item{display:flex;align-items:center;justify-content:center;gap:6px;padding:12px;border:2px solid #ddd;border-radius:6px;background:#fff;font-size:15pt}
.comparison-box{display:flex;align-items:center;justify-content:center;gap:15px;padding:15px;background:#fff;border:2px solid #ddd;border-radius:8px;margin:8px 0;font-size:18pt}
.comparison-symbol{width:40px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;text-align:center;line-height:36px}
.scene-box{background:#FAFAFA;border-radius:8px;padding:10px;margin:10px 0;text-align:center}
.scene-title{font-size:12pt;color:#666;margin-bottom:8px}
.scene-objects{font-size:36pt;letter-spacing:8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Compare with symbols**: Write <, >, or = between pairs of numbers
- **Greater than**: Find numbers greater than a given value
- **Less than**: Find numbers less than a given value

### Q2 OPTIONS (Fluency - Pick ONE):
- **Order smallest to largest**: Arrange 4-5 numbers in order
- **Order largest to smallest**: Arrange 4-5 numbers in order
- **Find largest/smallest**: Identify the largest or smallest from a set

### Q3 OPTIONS (Application - Pick ONE):
- **Comparison context**: Compare quantities of objects in pictures
- **Price comparison**: Compare prices and find cheapest/most expensive
- **Score comparison**: Compare game scores, points, or marks

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (comparison)**: "Who has more?" type problems
- **Word problem (ordering)**: Order items by quantity or measurement
- **Word problem (finding)**: Find the largest/smallest in context

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Statements about comparing numbers
- **Always/Sometimes/Never**: Comparison statements
- **Explain reasoning**: Why is one number greater/less than another?

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Compare symbols | 23○35 (<), 45○45 (=), 67○52 (>) |
| Q2 | Smallest to largest | Order: 28, 15, 42, 31 → 15, 28, 31, 42 |
| Q3 | Object comparison | 36 apples vs 29 oranges, which is more? |
| Q4 | Who has more? | "Sam has 45 stickers, Emma has 38. Who has more?" |
| Q5 | True/False | "56 > 65" (False), "23 < 32" (True), "40 = 40" (True) |

### WS2: Practice (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Compare 6 pairs | Including equal pairs and close numbers |
| Q2 | Largest to smallest | Order: 73, 58, 91, 64 → 91, 73, 64, 58 |
| Q3 | Price comparison | Toys: 67p, 89p, 54p, 72p - cheapest to most expensive |
| Q4 | Ordering problem | "Put these heights in order: 78cm, 62cm, 85cm, 71cm" |
| Q5 | Explain | "Why is 47 less than 74? Use tens and ones to explain" |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Missing numbers | 45 < __ < 48, find all possible answers; __ > 67, name 3 numbers |
| Q2 | Mixed ordering | Order set with multiples of 10: 40, 37, 100, 52, 48 |
| Q3 | Multi-comparison | Compare 4 items, rank from least to most |
| Q4 | Two-step | "Ali has 45 cards, gets 20 more. Ben has 70. Who has more now?" |
| Q5 | Always/Sometimes/Never | "A number with 5 tens is greater than a number with 4 tens" |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Compare with Symbols Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Write &lt;, &gt;, or = in each box.</p>
  <div class="comparison-box">23 <span class="comparison-symbol"></span> 35</div>
  <div class="comparison-box">45 <span class="comparison-symbol"></span> 45</div>
  <div class="comparison-box">67 <span class="comparison-symbol"></span> 52</div>
</div>
```

### Q2 - Ordering Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Put these numbers in order from smallest to largest.</p>
  <div class="fluency-grid" style="grid-template-columns: repeat(4, 1fr);">
    <div class="fluency-item">28</div>
    <div class="fluency-item">15</div>
    <div class="fluency-item">42</div>
    <div class="fluency-item">31</div>
  </div>
  <p class="sub-question">Order: <span class="answer-box-small"></span>, <span class="answer-box-small"></span>, <span class="answer-box-small"></span>, <span class="answer-box-small"></span></p>
</div>
```

### Q3 - Object Comparison Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Compare the amounts.</p>
  <div class="scene-box">
    <p class="scene-title">🍎 Apples: 36</p>
    <p class="scene-title">🍊 Oranges: 29</p>
  </div>
  <p class="sub-question">a) Which fruit has more? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) Write a comparison: 36 <span class="answer-box-small"></span> 29</p>
  <p class="sub-question">c) How many more apples than oranges? <span class="answer-box-small"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Sam</strong> has 45 stickers. <strong>Emma</strong> has 38 stickers. Who has more stickers?</span>
  </div>
  <p class="sub-question">a) <span class="answer-box-word"></span> has more stickers.</p>
  <p class="sub-question">b) Write a comparison: 45 <span class="answer-box-small"></span> 38</p>
  <p class="sub-question">c) How many more? <span class="answer-box-small"></span></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 56 is greater than 65. <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 23 is less than 32. <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 40 is equal to 40. <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Explain Reasoning Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Explain your thinking.</p>
  <div class="reasoning-box">
    <p class="story-text">Why is 47 less than 74?</p>
  </div>
  <p class="sub-question">a) 47 has <span class="answer-box-small"></span> tens.</p>
  <p class="sub-question">b) 74 has <span class="answer-box-small"></span> tens.</p>
  <p class="sub-question">c) So 47 <span class="answer-box-small"></span> 74 because it has fewer tens.</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> <, =, ></p>
  <p><strong>2.</strong> 15, 28, 31, 42</p>
  <p><strong>3.</strong> Apples, >, 7</p>
  <p><strong>4.</strong> Sam, >, 7</p>
  <p><strong>5.</strong> False, True, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] All answer boxes use `.answer-box-small` or `.answer-box-word`?
- [ ] Numbers within Year 2 range (0-100)?
