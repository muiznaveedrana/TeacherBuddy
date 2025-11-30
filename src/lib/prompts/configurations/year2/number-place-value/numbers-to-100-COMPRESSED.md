# Ages 6-7: Numbers to 100

**CRITICAL: EXACTLY {{questionCount}} questions. Numbers to 100, place value focus.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Number Range**: 0-100 (emphasis on two-digit numbers 10-99)
- **Place Value**: Tens and ones understanding
- **Key Skills**: Base-10 blocks, place value charts, 10 more/10 less, expanded form
- **Ages 6-7**: Build on Year 1 (0-20) knowledge

## QUESTION TYPES

**Q1**: Base-10 blocks representation (segmented rods showing 10 units each)
**Q2**: Place value decomposition with table
**Q3**: 10 More / 10 Less (KEY YEAR 2 SKILL) with mini hundred square
**Q4**: Expanded form
**Q5**: Word problem with CSS object visualization (boxes of 10)

## NUMBER WORDS (UK English)
- **Tens**: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety
- **Compound**: twenty-one, thirty-five, forty-eight (use hyphens)

## CSS
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4;max-width:800px;margin:0 auto}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}

/* BASE-10 BLOCKS */
.base10-container{display:flex;justify-content:center;align-items:flex-end;gap:25px;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.tens-group{display:flex;flex-direction:column;gap:4px;align-items:center}
.tens-label{font-size:11pt;color:#E65100;font-weight:bold;margin-top:8px}
.ones-group{display:flex;flex-direction:column;align-items:center}
.ones-wrapper{display:flex;flex-wrap:wrap;gap:3px;max-width:85px;justify-content:center}
.ones-label{font-size:11pt;color:#2E7D32;font-weight:bold;margin-top:8px}
.ten-rod{display:flex;width:120px;height:22px;border:2px solid #E65100;border-radius:3px;overflow:hidden;background:#FF9800;box-shadow:2px 2px 0 #BF360C}
.ten-rod-segment{flex:1;border-right:1px solid #E65100;background:linear-gradient(180deg,#FFB74D 0%,#FF9800 100%)}
.ten-rod-segment:last-child{border-right:none}
.unit-cube{width:22px;height:22px;background:linear-gradient(135deg,#81C784 0%,#4CAF50 100%);border:2px solid #2E7D32;border-radius:3px;box-shadow:2px 2px 0 #1B5E20}

/* PLACE VALUE TABLE */
.pv-table{border-collapse:collapse;margin:15px auto}
.pv-table th{background:linear-gradient(180deg,#1976D2,#1565C0);color:white;padding:12px 35px;font-size:14pt;border:2px solid #0D47A1}
.pv-table td{background:#FFF;padding:15px 35px;font-size:20pt;font-weight:bold;border:2px solid #666;text-align:center;min-width:80px}
.pv-table td.answer-cell{background:#FFF9C4;border:3px dashed #FF9800}

/* HUNDRED SQUARE */
.hundred-square-container{background:#E8F5E9;border-radius:8px;padding:15px;margin:15px 0}
.hundred-square-mini{display:grid;grid-template-columns:repeat(10,32px);gap:2px;background:#333;border:3px solid #333;border-radius:6px;width:fit-content;margin:10px auto;padding:2px}
.hs-cell{width:32px;height:26px;background:#FFF;display:flex;align-items:center;justify-content:center;font-size:11pt;font-weight:bold;color:#333}
.hs-cell.start{background:#2196F3;color:white;border:2px solid #0D47A1}
.hs-cell.target{background:#4CAF50;color:white;border:2px solid #1B5E20;font-size:13pt}
.hs-cell.path{background:#BBDEFB}
.hs-hint{display:flex;align-items:center;justify-content:center;gap:15px;margin:10px 0;font-size:14pt}
.hs-hint-box{padding:8px 15px;border-radius:8px;font-weight:bold}
.hs-hint-start{background:#2196F3;color:white}
.hs-hint-arrow{font-size:24pt;color:#333}
.hs-hint-target{background:#4CAF50;color:white}

/* EXPANDED FORM */
.expanded-form{display:flex;align-items:center;justify-content:center;gap:10px;font-size:22pt;font-weight:bold;padding:15px;background:#E8F5E9;border-radius:8px;margin:10px 0;flex-wrap:wrap}
.expanded-number{background:#4CAF50;color:white;padding:10px 18px;border-radius:8px}
.expanded-plus{font-size:24pt;color:#333}
.expanded-equals{font-size:24pt;color:#333}

/* WORD PROBLEM CONTAINER */
.word-problem-container{margin:10px 0;padding:15px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.image-groups{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin:10px 0}
.image-group{background:#FFF;border:2px solid #FFB74D;border-radius:8px;padding:10px;text-align:center;min-width:100px}
.image-group-title{font-size:11pt;font-weight:bold;color:#E65100;margin-bottom:8px}
.box-of-ten{border:3px solid #8D6E63;background:#EFEBE9;border-radius:6px;padding:8px;margin:5px auto;display:inline-block}
.obj-row{display:flex;gap:3px;justify-content:center;margin:3px 0}
.boxes-display{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.mini-box{width:45px;height:35px;background:#EFEBE9;border:2px solid #8D6E63;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10pt;font-weight:bold;color:#5D4037}
.single-items{display:flex;gap:3px;justify-content:center;flex-wrap:wrap;max-width:120px;margin:5px auto}
.group-count{font-size:11pt;color:#666;margin-top:8px;font-weight:bold}

/* CSS PENCIL */
.css-pencil{display:inline-flex;align-items:center;width:28px;height:8px;margin:2px}
.pencil-tip{width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;border-right:6px solid #FFD54F}
.pencil-body{flex:1;height:8px;background:linear-gradient(180deg,#FFF176 0%,#FFEB3B 50%,#FBC02D 100%);border-top:1px solid #F9A825;border-bottom:1px solid #F9A825}
.pencil-eraser{width:5px;height:8px;background:linear-gradient(180deg,#F48FB1 0%,#EC407A 100%);border-radius:0 2px 2px 0}

/* CSS COOKIE */
.css-cookie{display:inline-block;width:22px;height:22px;background:radial-gradient(circle,#DEB887 0%,#D2691E 100%);border-radius:50%;border:2px solid #8B4513;position:relative;margin:2px}
.css-cookie::before{content:'';position:absolute;width:4px;height:4px;background:#5D4037;border-radius:50%;top:4px;left:5px;box-shadow:8px 2px 0 #5D4037,3px 10px 0 #5D4037,10px 9px 0 #5D4037}

/* CSS STAR */
.css-star{display:inline-block;width:24px;height:24px;background:#FFD700;clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);margin:2px}

/* CSS APPLE */
.css-apple{display:inline-block;width:20px;height:22px;background:radial-gradient(ellipse at 30% 20%,#FF6B6B 0%,#E53935 100%);border-radius:50% 50% 50% 50%;position:relative;margin:2px}
.css-apple::before{content:'';position:absolute;width:3px;height:6px;background:#5D4037;top:-4px;left:50%;transform:translateX(-50%);border-radius:2px}
.css-apple::after{content:'';position:absolute;width:6px;height:4px;background:#4CAF50;top:-2px;left:55%;border-radius:50%;transform:rotate(45deg)}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:65px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:15pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
```

## CSS OBJECTS FOR Q5 (Use instead of PNG images)

**Pencil:**
```html
<div class="css-pencil"><div class="pencil-tip"></div><div class="pencil-body"></div><div class="pencil-eraser"></div></div>
```

**Cookie:**
```html
<div class="css-cookie"></div>
```

**Star:**
```html
<div class="css-star"></div>
```

**Apple:**
```html
<div class="css-apple"></div>
```

## TEMPLATES

### Q1: Base-10 Blocks
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> What number is shown by these blocks?</p>
  <div class="base10-container">
    <div class="tens-group">
      <div class="ten-rod"><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div><div class="ten-rod-segment"></div></div>
      <!-- Repeat ten-rod for each ten needed -->
      <div class="tens-label">X tens = XX</div>
    </div>
    <div class="ones-group">
      <div class="ones-wrapper">
        <div class="unit-cube"></div>
        <!-- Repeat unit-cube for each one -->
      </div>
      <div class="ones-label">X ones</div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span></p>
</div>
```

### Q2: Place Value Table
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> How many tens and ones are in <strong>XX</strong>?</p>
  <table class="pv-table">
    <tr><th>Tens</th><th>Ones</th></tr>
    <tr><td class="answer-cell"></td><td class="answer-cell"></td></tr>
  </table>
</div>
```

### Q3: 10 More/10 Less with Hundred Square
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> What is <strong>10 more</strong> than XX?</p>
  <div class="hundred-square-container">
    <p style="font-size:12pt;color:#555;margin:0 0 10px 0;text-align:center">Find XX on the hundred square. Move <strong>down one row</strong> to find 10 more.</p>
    <div class="hundred-square-mini">
      <!-- Row with start number: use class="hs-cell start" -->
      <!-- Row with target: use class="hs-cell target" for ? and class="hs-cell path" for others -->
    </div>
    <div class="hs-hint">
      <span class="hs-hint-box hs-hint-start">XX</span>
      <span class="hs-hint-arrow">→ +10 →</span>
      <span class="hs-hint-box hs-hint-target">?</span>
    </div>
  </div>
  <p class="question-text">10 more than XX = <span class="answer-box"></span></p>
</div>
```

### Q4: Expanded Form
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Complete the expanded form.</p>
  <div class="expanded-form">
    <span class="expanded-number">XX</span>
    <span class="expanded-equals">=</span>
    <span class="expanded-number">X0</span>
    <span class="expanded-plus">+</span>
    <span class="answer-box"></span>
  </div>
  <p class="question-text" style="margin-top:15px">b) Write <strong>XX</strong> in expanded form: <span class="answer-box" style="min-width:50px"></span> + <span class="answer-box" style="min-width:50px"></span></p>
</div>
```

### Q5: Word Problem with CSS Objects
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> The teacher has boxes of pencils. Each box holds <strong>10 pencils</strong>.</p>
  <div class="word-problem-container">
    <div class="image-groups">
      <div class="image-group">
        <div class="image-group-title">1 box = 10 pencils</div>
        <div class="box-of-ten">
          <div class="obj-row">
            <div class="css-pencil"><div class="pencil-tip"></div><div class="pencil-body"></div><div class="pencil-eraser"></div></div>
            <!-- 5 pencils per row, 2 rows = 10 -->
          </div>
        </div>
      </div>
      <div class="image-group">
        <div class="image-group-title">X boxes</div>
        <div class="boxes-display">
          <div class="mini-box">10</div>
          <!-- Repeat mini-box for each box -->
        </div>
        <div class="group-count">X × 10 = XX</div>
      </div>
      <div class="image-group">
        <div class="image-group-title">Single pencils</div>
        <div class="single-items">
          <!-- Individual CSS objects -->
        </div>
        <div class="group-count">= X pencils</div>
      </div>
    </div>
  </div>
  <p class="question-text">How many pencils altogether? <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS

**WS1 (20-50):** Pencils - use `.css-pencil` (35 = 3 boxes + 5)
**WS2 (50-75):** Cookies - use `.css-cookie` (67 = 6 boxes + 7)
**WS3 (70-99):** Stars - use `.css-star` (78 = 7 boxes + 8)

## RULES

1. Use CSS objects for Q5 (NOT png images)
2. Each ten-rod MUST have exactly 10 `.ten-rod-segment` divs
3. Hundred square shows 2 rows with `.start`, `.target`, `.path` classes
4. Include labels like "3 tens = 30"
5. UK English spelling

## ANSWER KEY TEMPLATE (REQUIRED)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <div class="answer-key-content">
    <p>1. [answer for Q1 - the number shown by base-10 blocks]</p>
    <p>2. [answer for Q2 - tens: X, ones: X]</p>
    <p>3. [answer for Q3 - 10 more/less result]</p>
    <p>4. [answer for Q4 - expanded form answers, comma-separated if multiple parts]</p>
    <p>5. [answer for Q5 - total count from word problem]</p>
  </div>
</div>
```

**CRITICAL**: The answer key MUST:
1. Use `.answer-key-content` wrapper div
2. Each answer on separate `<p>` line with format `N. answer`
3. For multi-part questions (Q4), use commas: `4. 7, 30, 7`

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Ten rods have 10 segments each?
- [ ] Q3: Hundred square with start/target/path classes?
- [ ] Q5: Uses CSS objects (not images)?
- [ ] Answer key with `.answer-key-content` div included?
