# Ages 6-7: Numbers to 100 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 numbers to 100 questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Always/Sometimes/Never, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Range:** Numbers 0-100
- **Key skills:** Count in 2s, 5s, 10s; read and write numbers; place value (tens and ones)
- **Key concepts:** Partition numbers into tens and ones, number words, number sequences
- **Key misconception:** Writing 'thirty-five' as 305 instead of 35

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
.number-line{display:flex;align-items:center;gap:5px;padding:10px;background:#fff;border:2px solid #ddd;border-radius:8px;margin:10px 0}
.number-line span{font-size:14pt}
.place-value-box{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}
.pv-column{text-align:center;padding:10px;border:2px solid #333;border-radius:8px}
.pv-header{font-weight:bold;font-size:12pt;border-bottom:2px solid #333;padding-bottom:5px;margin-bottom:8px}
.pv-blocks{font-size:24pt;margin:5px 0}
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
- **Count in 2s**: Fill in missing numbers counting in 2s (e.g., 12, 14, __, 18, __)
- **Count in 5s**: Fill in missing numbers counting in 5s (e.g., 25, 30, __, 40, __)
- **Count in 10s**: Fill in missing numbers counting in 10s (e.g., 30, 40, __, 60, __)

### Q2 OPTIONS (Fluency - Pick ONE):
- **Place value partition**: Write how many tens and ones (e.g., 45 = __ tens and __ ones)
- **Number words to digits**: Convert words to numbers (e.g., forty-seven = __)
- **Digits to words**: Write numbers as words (e.g., 63 = __________)

### Q3 OPTIONS (Application - Pick ONE):
- **Counting objects context**: Count items arranged in groups of 10
- **Number line jumps**: Use number line to find values
- **Real-world numbers**: Read numbers from price tags, page numbers, etc.

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (ordering)**: Character needs to order numbers smallest to largest
- **Word problem (counting)**: Character counts items by 2s, 5s, or 10s
- **Comparison context**: Compare quantities in real-world scenario

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Statements about place value (e.g., "56 has 5 tens and 6 ones")
- **Always/Sometimes/Never**: Place value statements
- **Explain mistake**: Character makes place value error, explain what's wrong

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Count in 10s | 10, 20, __, 40, __, 60 → 30, 50 |
| Q2 | Place value | 34=3 tens 4 ones, 52=5 tens 2 ones, 71=7 tens 1 one |
| Q3 | Counting objects | 4 groups of 10 pencils + 3 loose = 43 pencils |
| Q4 | Count by 5s | "Mia counts 5p coins: 5, 10, 15... up to 35p" |
| Q5 | True/False | "42 has 4 tens" (True), "67 has 6 ones" (False), "50 has 5 tens" (True) |

### WS2: Practice (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Count in 2s | 24, 26, __, 30, __, 34 → 28, 32 |
| Q2 | Words to digits | forty-six=46, seventy-two=72, eighty-nine=89 |
| Q3 | Number line | Find values at marked points 35, 55, 75 |
| Q4 | Ordering | "Put 45, 38, 72, 51 in order smallest to largest" |
| Q5 | Explain mistake | "Tom says 'sixty-four is written 604'" - explain error |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed counting | Count back: 95, 90, __, __, 75; Count in 2s: 78, 80, __, 84, __ |
| Q2 | Digits to words | Write 58, 93, 100 as words |
| Q3 | Real-world | Read prices from tags: 67p, 89p; find total tens and ones |
| Q4 | Two-step | "Books numbered 45-52, how many books? Which is in the middle?" |
| Q5 | Always/Sometimes/Never | "A two-digit number has exactly 2 tens" → Sometimes |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Counting Sequence Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Fill in the missing numbers.</p>
  <p class="sub-question">a) Count in 10s: 10, 20, <span class="answer-box-small"></span>, 40, <span class="answer-box-small"></span>, 60</p>
  <p class="sub-question">b) Count in 5s: 25, 30, <span class="answer-box-small"></span>, 40, <span class="answer-box-small"></span></p>
</div>
```

### Q2 - Place Value Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>How many tens and ones?</p>
  <p class="sub-question">a) 34 = <span class="answer-box-small"></span> tens and <span class="answer-box-small"></span> ones</p>
  <p class="sub-question">b) 52 = <span class="answer-box-small"></span> tens and <span class="answer-box-small"></span> ones</p>
  <p class="sub-question">c) 71 = <span class="answer-box-small"></span> tens and <span class="answer-box-small"></span> ones</p>
</div>
```

### Q3 - Counting Objects Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Count the pencils.</p>
  <div class="scene-box">
    <p class="scene-title">Bundles of 10 pencils:</p>
    <div class="scene-objects">📦📦📦📦 ✏️✏️✏️</div>
    <p class="scene-title">4 bundles of 10 and 3 loose pencils</p>
  </div>
  <p class="sub-question">a) How many tens? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many ones? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) How many pencils altogether? <span class="answer-box-small"></span></p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Mia</strong> counts her 5p coins. She counts: 5, 10, 15, 20, 25, 30, 35. How many 5p coins does Mia have?</span>
  </div>
  <p class="sub-question">Mia has <span class="answer-box-small"></span> coins worth <span class="answer-box-small"></span>p altogether.</p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 42 has 4 tens and 2 ones. <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 67 has 6 ones. <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 50 has 5 tens and 0 ones. <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Explain Mistake Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find and fix the mistake.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <span class="story-text">"Sixty-four is written as 604"</span>
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) What should sixty-four be written as? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) How many tens does sixty-four have? <span class="answer-box-small"></span></p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 30, 50, 35, 45</p>
  <p><strong>2.</strong> 3, 4, 5, 2, 7, 1</p>
  <p><strong>3.</strong> 4, 3, 43</p>
  <p><strong>4.</strong> 7, 35</p>
  <p><strong>5.</strong> True, False, True</p>
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
