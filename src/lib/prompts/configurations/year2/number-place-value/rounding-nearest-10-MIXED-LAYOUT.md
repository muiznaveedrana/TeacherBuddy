# Ages 6-7: Rounding to Nearest 10 (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 2 rounding to nearest 10 questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Always/Sometimes/Never, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 2)
- **Range:** Numbers 0-100
- **Key skills:** Round two-digit numbers to the nearest 10, use number line for rounding
- **Key concepts:** Identify closest ten, understand "round up" vs "round down"
- **Key misconception:** Always rounding down, or confusion about what happens with 5 in ones place

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
.number-line-box{background:#fff;border:2px solid #333;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.number-line{display:flex;justify-content:space-between;align-items:center;margin:10px 0;padding:10px 20px;background:linear-gradient(to right, #E3F2FD, #E3F2FD);border-radius:20px}
.number-line span{font-size:16pt;font-weight:bold}
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
- **Round to nearest 10**: Round single numbers (e.g., 23 → 20, 47 → 50)
- **Round multiple numbers**: Grid of 6 numbers to round
- **Number line rounding**: Use number line to identify nearest 10

### Q2 OPTIONS (Fluency - Pick ONE):
- **Round up or down**: Identify if number rounds up or down
- **What rounds to**: Find numbers that round to a given ten (e.g., what rounds to 40?)
- **Before and after tens**: Identify the tens either side of a number

### Q3 OPTIONS (Application - Pick ONE):
- **Estimation context**: Round prices for estimation
- **Counting context**: Round quantities of objects
- **Measurement context**: Round measurements to nearest 10

### Q4 OPTIONS (Application - Pick ONE):
- **Word problem (estimation)**: Estimate total by rounding
- **Word problem (comparison)**: Round then compare
- **Word problem (checking)**: Use rounding to check answers

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: Statements about rounding
- **Always/Sometimes/Never**: Rounding rules
- **Explain error**: Character makes rounding mistake

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Round single | 23→20, 47→50, 81→80 |
| Q2 | Round up/down | 34 rounds down, 56 rounds up, 75 rounds up |
| Q3 | Count context | "About 40 apples" when actually 38 |
| Q4 | Estimate total | "Round 23 and 41 to nearest 10, add: 20+40=60" |
| Q5 | True/False | "23 rounds to 20" (True), "47 rounds to 40" (False) |

### WS2: Practice (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Round grid | Round 6 numbers: 34, 67, 45, 82, 19, 55 |
| Q2 | What rounds to 50 | List numbers: 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 |
| Q3 | Price rounding | Round 37p→40p, 63p→60p for estimation |
| Q4 | Compare estimates | "Estimate: is 48+31 closer to 70 or 80?" |
| Q5 | Explain | "Why does 45 round to 50 not 40?" |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed | Round: 95, 5, 15, 55 (include edge cases) |
| Q2 | Before/after tens | 67 is between 60 and 70, nearer to 70 |
| Q3 | Multi-step | Round 3 prices, estimate total |
| Q4 | Two-step | "Round both numbers, find the difference of estimates" |
| Q5 | Always/Sometimes/Never | "Numbers ending in 5 round up" → Always |

## TEMPLATES

### Section Header Template:
```html
<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>
```

### Q1 - Round to Nearest 10 Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Round each number to the nearest 10.</p>
  <p class="sub-question">a) 23 → <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 47 → <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 81 → <span class="answer-box-small"></span></p>
</div>
```

### Q2 - Round Up or Down Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Does each number round up or down to the nearest 10?</p>
  <p class="sub-question">a) 34 rounds <span class="answer-box-word"></span> to <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 56 rounds <span class="answer-box-word"></span> to <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 75 rounds <span class="answer-box-word"></span> to <span class="answer-box-small"></span></p>
</div>
```

### Q2 - Number Line Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Use the number line. Is 67 closer to 60 or 70?</p>
  <div class="number-line-box">
    <div class="number-line">
      <span>60</span>
      <span>61</span>
      <span>62</span>
      <span>63</span>
      <span>64</span>
      <span>65</span>
      <span>66</span>
      <span>67</span>
      <span>68</span>
      <span>69</span>
      <span>70</span>
    </div>
  </div>
  <p class="sub-question">a) 67 is between <span class="answer-box-small"></span> and <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 67 is closer to <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 67 rounded to nearest 10 = <span class="answer-box-small"></span></p>
</div>
```

### Q3 - Counting Context Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Round to estimate.</p>
  <div class="scene-box">
    <div class="scene-objects">🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎<br>🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎<br>🍎🍎🍎🍎🍎🍎🍎🍎</div>
    <p class="scene-title">38 apples</p>
  </div>
  <p class="sub-question">a) 38 rounded to nearest 10 = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) We can say there are about <span class="answer-box-small"></span> apples.</p>
</div>
```

### Q4 - Word Problem Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has 23 red beads and 41 blue beads. Round each number to estimate how many beads altogether.</span>
  </div>
  <p class="sub-question">a) 23 rounded = <span class="answer-box-small"></span></p>
  <p class="sub-question">b) 41 rounded = <span class="answer-box-small"></span></p>
  <p class="sub-question">c) Estimate: <span class="answer-box-small"></span> + <span class="answer-box-small"></span> = <span class="answer-box-small"></span></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) 23 rounds to 20. <span class="answer-box-word"></span></p>
    <p class="sub-question">b) 47 rounds to 40. <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 55 rounds to 60. <span class="answer-box-word"></span></p>
  </div>
</div>
```

### Q5 - Explain Error Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find and fix the mistake.</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <span class="story-text">"45 rounds to 40 because 4 is less than 5"</span>
    </div>
  </div>
  <p class="sub-question">a) Is Ben correct? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) 45 actually rounds to <span class="answer-box-small"></span></p>
  <p class="sub-question">c) We look at the <span class="answer-box-word"></span> digit to decide.</p>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 20, 50, 80</p>
  <p><strong>2.</strong> down, 30, up, 60, up, 80</p>
  <p><strong>3.</strong> 40, 40</p>
  <p><strong>4.</strong> 20, 40, 20, 40, 60</p>
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
