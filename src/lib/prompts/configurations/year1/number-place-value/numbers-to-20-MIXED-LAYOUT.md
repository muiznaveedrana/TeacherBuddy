# Ages 5-6: Numbers to 20 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 numbers to 20 questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Odd one out, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1)
- **Number range:** 0-20 (focus on 11-20)
- **Key skills:** Count objects, read/write numbers, number line, one more/less
- **Visual representations:** Ten-frames, number lines, object arrays
- **Key misconception:** Confusing teens (e.g., 13 vs 31) or skipping numbers when counting

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
.counting-grid{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:12px auto;max-width:400px}
.counting-grid img{width:35px;height:35px}
.number-line-box{display:flex;justify-content:space-around;margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #2196F3;border-radius:10px;max-width:500px}
.number-marker{width:45px;height:45px;border:2px solid #333;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt;background:#fff}
.number-marker.missing{background:#FFF9C4;border-style:dashed;border-color:#FF5722}
.ten-frame-container{display:flex;gap:15px;justify-content:center;margin:15px auto}
.ten-frame{display:inline-grid;grid-template-columns:repeat(5,1fr);gap:3px;padding:6px;background:#fff;border:3px solid #333;border-radius:8px}
.frame-cell{width:32px;height:32px;border:2px solid #333;border-radius:4px;background:#fff}
.frame-cell.filled{background:#4A90E2;border-radius:50%}
.one-more-less{display:flex;justify-content:center;gap:15px;margin:15px auto}
.oml-box{text-align:center;padding:12px;border:3px solid #ddd;border-radius:10px;min-width:80px;background:#fff}
.oml-center{background:#FFF3E0;border-color:#FF9800}
.oml-number{font-size:24pt;font-weight:bold}
.oml-label{font-size:10pt;color:#666;margin-top:5px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.answer-box{display:inline-block;min-width:55px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Count objects**: Show 8-15 objects (images), write the number
- **Ten-frame count**: Show 11-20 using two ten-frames, write total
- **Number sequence**: Fill in 2 missing numbers in sequence (e.g., 12, __, 14, __, 16)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Number line**: Show 6 consecutive numbers with 2 missing
- **One more/less grid**: Given number (8-18), find one more AND one less
- **Quick count**: 4 small counting tasks (a, b, c, d format)

### Q3 OPTIONS (Application - Pick ONE):
- **Object story**: "[Name] has X [objects]. [Name] gets Y more. How many now?"
- **Real context**: "There are X birds. Y more fly in. How many birds?"
- **Counting scene**: Visual scene with objects to count

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem**: "[Name] counted X [things]. What number comes next?"
- **Comparison**: "Who has more? [Name] has X, [Name] has Y"
- **Ordering**: "Put these numbers in order: [3 numbers]"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: 3 statements about numbers (e.g., "14 comes after 13")
- **Spot the mistake**: Character makes wrong sequence, identify error
- **Explain thinking**: "Which is greater: 17 or 12? How do you know?"

## OBJECTS - `/images/{object}.png`

Fruits: apple, banana, orange, strawberry
School: pencil, book, crayon
Toys: ball, car, doll, bear
Shapes: star, heart

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Count objects | 9 apples → 9 |
| Q2 | One more/less | Center: 12 → 11, 13 |
| Q3 | Object story | "Emma has 5 balls. She gets 3 more." → 8 |
| Q4 | What comes next | "Sam counted: 14, 15, 16. What comes next?" → 17 |
| Q5 | True/False | "13 comes before 14" True, "18 is bigger than 20" False, "15 is between 14 and 16" True |

### WS2: Varied (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Ten-frame | 14 filled dots (one full + 4) → 14 |
| Q2 | Number sequence | 11, __, 13, __, 15, 16 → 12, 14 |
| Q3 | Counting scene | Birds on branches: 7 + 5 → 12 |
| Q4 | Comparison | "Ben has 16 stars. Lily has 13 stars. Who has more?" → Ben |
| Q5 | Spot mistake | "Leo says: 17, 18, 20, 21. What's wrong?" → missed 19 |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Count objects | 17 stars → 17 |
| Q2 | Number line | 14, __, 16, __, 18, 19 → 15, 17 |
| Q3 | Two-part story | "Jack had 10 pencils. Found 6 more. How many?" → 16 |
| Q4 | Order numbers | "Order smallest to biggest: 19, 14, 17" → 14, 17, 19 |
| Q5 | Explain | "Maya says 15 is greater than 18. Is she right? Why?" → No, 18 > 15 |

## TEMPLATES

### Q1 - Count Objects Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Count the apples. How many are there?</p>
  <div class="counting-grid">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
    <img src="/images/apple.png" alt="apple">
  </div>
  <p class="sub-question">There are <span class="answer-box-small"></span> apples.</p>
</div>
```

### Q2 - One More/Less Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Fill in the missing numbers.</p>
  <div class="one-more-less">
    <div class="oml-box">
      <p class="oml-label">One Less</p>
      <div class="answer-box-small"></div>
    </div>
    <div class="oml-box oml-center">
      <p class="oml-number">12</p>
    </div>
    <div class="oml-box">
      <p class="oml-label">One More</p>
      <div class="answer-box-small"></div>
    </div>
  </div>
</div>
```

### Q3 - Object Story Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Emma</strong> has 5 balls. She gets 3 more balls. How many balls does Emma have now?</span>
  </div>
  <p class="sub-question">Emma has <span class="answer-box-small"></span> balls.</p>
</div>
```

### Q4 - What Comes Next Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>What number comes next?</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Sam</strong> is counting: 14, 15, 16, ...</span>
  </div>
  <p class="sub-question">The next number is <span class="answer-box-small"></span></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 13 comes before 14 <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 18 is bigger than 20 <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 15 is between 14 and 16 <span class="answer-box-word"></span></p>
  </div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 9</p>
  <p><strong>2.</strong> 11, 13</p>
  <p><strong>3.</strong> 8</p>
  <p><strong>4.</strong> 17</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## NAMES FOR STORIES
Emma, Ben, Sam, Lily, Max, Zara, Jack, Mia

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] All numbers within 0-20 range?
- [ ] Answer key comma-separated (no explanations)?
