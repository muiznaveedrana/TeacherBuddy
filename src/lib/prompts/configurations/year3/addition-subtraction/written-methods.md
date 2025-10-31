# Y3: Written Column Methods

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS (Injected by system):
{{COLUMN_TYPE}}
{{REGROUP_STAGE}}
{{DIFFICULTY}}
{{VISUAL_SUPPORT}}
{{CHECK_METHOD}}

<!-- DEBUG: Freshness injection validates rotation -->

## FOCUS: FORMAL WRITTEN METHODS

### Column Method Mastery (NC Objective)
Year 3 students must master formal written methods for 3-digit addition and subtraction with regrouping (carrying/borrowing).

### Progression Path:
1. **No regrouping** → Test foundational skills
2. **Single column regrouping** → Practice and assess carrying/borrowing
3. **Multi-column regrouping** → Apply and demonstrate mastery
4. **Checking answers** → Test metacognitive skills

## CORE COLUMN TYPES

### STANDARD (Traditional format)
```
  456
+ 278
-----
  734
```
- Right-aligned, monospace font
- Clear column lines (ones, tens, hundreds)
- Carry numbers shown above (small, red)

### EXPANDED (With place value labels)
```
H  T  O
4  5  6
+ 2  7  8
---------
7  3  4
```
- Column headers: H (Hundreds), T (Tens), O (Ones)
- Tests place value knowledge
- Grid borders around each digit

### COMPACT (Space-efficient)
```
456 + 278 = ____
```
- Horizontal format with working space below
- Student writes column method themselves
- Tests independence

## REGROUPING STAGES

### ONES-ONLY (Easiest)
- Regrouping only in ones column
- Example: 456 + 278 (6+8=14, carry 1)
- Subtraction: 734 - 278 (can't do 4-8, borrow from tens)

### TENS-ONLY (Intermediate)
- Regrouping only in tens column
- Example: 437 + 285 (3+8+1=12 in tens, carry 1 to hundreds)
- Subtraction: 634 - 278 (can't do 2-7 in tens, borrow from hundreds)

### HUNDREDS-ONLY (Advanced)
- Regrouping in hundreds column
- Example: 567 + 489 (5+4+1=10 in hundreds, creates 4-digit answer)
- Subtraction: Borrow from thousands place (if present)

### MULTI-COLUMN (Challenging)
- Regrouping across multiple columns
- Example: 456 + 789 (regroup in both ones and tens)
- Multiple borrows in subtraction

### ALL-TYPES (Mixed practice)
- Vary regrouping requirements across questions
- Mix no-regroup, single-regroup, multi-regroup

## QUESTION SPECS (Use {{COLUMN_TYPE}}):

**Q1 Options:**
- `standard-add-ones`: Standard column, regroup in ones (456 + 278)
- `expanded-add-ones`: Expanded notation with H|T|O headers
- `standard-add-no-regroup`: Column addition, no carrying (321 + 456)
- `place-value-add-ones`: Place value chart format
- `compact-add-ones`: Horizontal format, students create column
- `error-spotting-add`: Find the mistake in worked example

**Q2 Options:**
- `standard-add-tens`: Standard column, regroup in tens (437 + 285)
- `expanded-add-tens`: Expanded with place value labels
- `standard-add-multi`: Multi-column regrouping (456 + 789)
- `grid-method-add`: Using grid/box method
- `checking-add-inverse`: Calculate then check with subtraction
- `missing-digits-add`: Fill in missing digits (4_6 + 27_ = 734)

**Q3 Options:**
- `standard-sub-ones`: Standard column, borrow from tens (734 - 278)
- `expanded-sub-ones`: Expanded notation subtraction
- `standard-sub-no-borrow`: Subtraction, no borrowing (987 - 432)
- `place-value-sub-ones`: Place value chart for subtraction
- `compact-sub-ones`: Horizontal format
- `decomposition-sub`: Show decomposition method

**Q4 Options:**
- `standard-sub-tens`: Standard column, borrow from hundreds (634 - 278)
- `expanded-sub-tens`: Expanded notation
- `standard-sub-zeros`: Subtraction with zeros (800 - 234, 700 - 456)
- `standard-sub-multi`: Multi-column borrowing (834 - 567)
- `checking-sub-inverse`: Calculate then check with addition
- `missing-digits-sub`: Fill missing digits (7_4 - 2_8 = 456)

**Q5 Options:**
- `mixed-challenge-5problems`: 5 mixed add/sub problems
- `two-step-column`: Two-step calculation using column method
- `real-world-column-money`: Word problem requiring column method with money
- `error-correction`: Identify and correct errors in 2 worked examples
- `create-your-own`: Given answer, create question (e.g., Create addition that gives 734)
- `estimation-first`: Estimate, then calculate with column method

## DIFFICULTY LEVELS (Use {{DIFFICULTY}}):

**no-regroup**: All questions without regrouping/borrowing
- Tests foundational skills, assesses column format mastery
- E.g., 321 + 456 = 777, 987 - 432 = 555

**single-regroup**: One column regrouping only
- Either ones OR tens, not both
- E.g., 456 + 278 (ones only), 437 + 285 (tens only)

**double-regroup**: Two columns regrouping
- Both ones and tens require regrouping
- E.g., 456 + 789 = 1245

**triple-regroup**: All three columns (advanced)
- Regrouping in ones, tens, and hundreds
- E.g., 999 + 999 = 1998

**mixed**: Vary difficulty across questions
- No-regroup, single, double mixed together
- Realistic practice

## VISUAL SUPPORT (Use {{VISUAL_SUPPORT}}):

**plain**: Standard column method only, no extra scaffolds
**with-arrows**: Show regrouping arrows and carry numbers
**with-place-value-chart**: Include H|T|O chart alongside
**with-base10**: Show base-10 blocks representation
**with-grid**: Grid lines around each digit cell
**with-hints**: Include strategy hints (e.g., "Start with ones column")

## CHECK METHODS (Use {{CHECK_METHOD}}):

**inverse**: Use inverse operation to check (add checks sub, vice versa)
**estimation**: Estimate first (e.g., 456 + 278 ≈ 500 + 300 = 800)
**rounding**: Round to nearest 100, check if close
**number-sense**: Does answer make sense? (e.g., 456 + 278 should be > 456)
**alternative-method**: Calculate same problem two ways

## CSS (Ultra-Compact):

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}

/* Column Method - Standard */
.column-container{display:inline-block;border:2px solid #333;padding:12px 20px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:monospace;font-size:22pt;line-height:1.5;margin:10px auto}
.column-line{border-top:3px solid #000;margin:5px 0}
.carry-number{font-size:12pt;color:#FF5722;position:relative;top:-10px;margin-right:3px}
.borrow-notation{font-size:11pt;color:#2196F3;text-decoration:line-through;position:relative;top:-8px}

/* Expanded Notation with Headers */
.expanded-column{display:inline-block;border:3px solid #333;margin:10px 0;border-radius:6px;background:white}
.expanded-header{display:flex;background:#1976D2;color:white;font-weight:bold;font-size:16pt}
.expanded-header-cell{padding:10px 20px;text-align:center;border:2px solid #fff;min-width:70px}
.expanded-row{display:flex;font-size:20pt;font-weight:bold}
.expanded-cell{padding:12px 20px;text-align:center;border:2px solid #666;min-width:70px;font-family:monospace}
.expanded-operator{background:#E3F2FD;color:#1976D2;font-weight:bold;padding:12px 20px;border:2px solid #666;min-width:70px;text-align:center}
.expanded-line{height:4px;background:#000}

/* Place Value Chart */
.pv-chart{display:inline-block;border:3px solid #333;margin:10px 0;border-radius:6px}
.pv-row{display:flex}
.pv-cell{border:2px solid #666;padding:12px 20px;font-size:20pt;font-weight:bold;text-align:center;min-width:65px;font-family:monospace}
.pv-header{background:#1976D2;color:white;font-size:16pt}

/* Grid Method */
.grid-container{display:inline-block;margin:10px 0}
.grid-row{display:flex}
.grid-cell{width:60px;height:60px;border:2px solid #333;display:flex;align-items:center;justify-content:center;font-size:18pt;font-weight:bold;background:white}
.grid-cell.header{background:#FF9800;color:white}
.grid-cell.total{background:#4CAF50;color:white}

/* Compact Format */
.compact-problem{margin:15px 0;padding:15px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.compact-equation{font-size:20pt;font-weight:bold;margin-bottom:10px}
.working-space{border:2px dashed #999;padding:15px;margin:10px 0;min-height:100px;background:#FAFAFA;border-radius:6px;text-align:center}
.working-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:5px}

/* Error Spotting */
.error-example{margin:10px 0;padding:12px;background:#FFEBEE;border:2px solid #F44336;border-radius:8px}
.error-label{font-size:14pt;font-weight:bold;color:#C62828;margin-bottom:8px}
.error-work{display:inline-block;font-family:monospace;font-size:19pt;line-height:1.5;background:white;padding:10px 15px;border-radius:4px}

/* Estimation Box */
.estimation-box{margin:10px 0;padding:12px;background:#E1F5FE;border:2px dashed #0288D1;border-radius:8px}
.estimation-label{font-size:14pt;font-weight:bold;color:#01579B;margin-bottom:6px}
.estimation-work{font-size:16pt;margin:6px 0}

/* Challenge Problem */
.challenge-box{margin:10px 0;padding:15px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:10px}
.challenge-label{font-size:16pt;font-weight:bold;color:#6A1B9A;margin-bottom:10px;text-align:center}
.challenge-emoji{font-size:28pt;margin-right:8px}

/* Missing Digits */
.missing-digit-blank{display:inline-block;width:30px;height:35px;border-bottom:3px solid #FF5722;background:#FFF9C4;vertical-align:baseline;margin:0 2px}

/* Answer Boxes */
.answer-box{display:inline-block;min-width:100px;height:45px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-box-small{min-width:70px;height:40px}

/* Answer Key */
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
.answer-key .working{font-style:italic;color:#555;margin-left:15px;font-size:12pt}
.answer-key .carry-note{color:#FF5722;font-weight:bold}
</style>
```

## TEMPLATES (Match {{COLUMN_TYPE}}):

### Q1-standard-add-ones:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Use column method to add:</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  456</div>
      <div>+ 278</div>
      <div class="column-line"></div>
      <div>_____</div>
    </div>
  </div>
</div>
```

### Q1-expanded-add-ones:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Add using the expanded column method:</p>
  <div style="text-align:center">
    <div class="expanded-column">
      <div class="expanded-header">
        <div class="expanded-header-cell">H</div>
        <div class="expanded-header-cell">T</div>
        <div class="expanded-header-cell">O</div>
      </div>
      <div class="expanded-row">
        <div class="expanded-cell">4</div>
        <div class="expanded-cell">5</div>
        <div class="expanded-cell">6</div>
      </div>
      <div class="expanded-row">
        <div class="expanded-operator">+</div>
        <div class="expanded-operator">+</div>
        <div class="expanded-operator">+</div>
      </div>
      <div class="expanded-row">
        <div class="expanded-cell">2</div>
        <div class="expanded-cell">7</div>
        <div class="expanded-cell">8</div>
      </div>
      <div class="expanded-line"></div>
      <div class="expanded-row">
        <div class="expanded-cell" style="background:#FFF9C4"></div>
        <div class="expanded-cell" style="background:#FFF9C4"></div>
        <div class="expanded-cell" style="background:#FFF9C4"></div>
      </div>
    </div>
  </div>
</div>
```

### Q2-missing-digits-add:
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Fill in the missing digits:</p>
  <div style="text-align:center;margin:15px 0">
    <div class="column-container">
      <div style="display:flex;justify-content:flex-end;gap:5px">
        <span>4</span>
        <span class="missing-digit-blank"></span>
        <span>6</span>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:5px">
        <span>+</span>
        <span>2</span>
        <span>7</span>
        <span class="missing-digit-blank"></span>
      </div>
      <div class="column-line"></div>
      <div style="display:flex;justify-content:flex-end;gap:5px">
        <span>7</span>
        <span>3</span>
        <span>4</span>
      </div>
    </div>
  </div>
  <p style="text-align:center;font-size:13pt;color:#666;margin-top:10px">
    What digits are missing?
  </p>
</div>
```

### Q3-standard-sub-ones:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Use column method to subtract:</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  734</div>
      <div>- 278</div>
      <div class="column-line"></div>
      <div>_____</div>
    </div>
  </div>
  <p style="text-align:center;font-size:13pt;color:#666;margin-top:8px">
    Remember: You may need to borrow!
  </p>
</div>
```

### Q4-standard-sub-zeros:
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> Subtract (watch out for zeros!):</p>
  <div style="text-align:center">
    <div class="column-container">
      <div>  800</div>
      <div>- 234</div>
      <div class="column-line"></div>
      <div>_____</div>
    </div>
  </div>
  <p style="text-align:center;font-size:13pt;font-style:italic;color:#C2185B;margin-top:8px">
    Tip: Borrow from hundreds through tens to ones
  </p>
</div>
```

### Q5-error-correction:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Find and correct the mistakes:</p>

  <div class="error-example">
    <p class="error-label">❌ Example A:</p>
    <div style="text-align:center">
      <div class="error-work">
  456<br>
+ 278<br>
-----<br>
  624  ← WRONG!
      </div>
    </div>
    <p style="margin-top:10px;font-size:14pt">What's the mistake? <span class="answer-box"></span></p>
    <p style="margin-top:8px;font-size:14pt">Correct answer: <span class="answer-box-small"></span></p>
  </div>

  <div class="error-example" style="margin-top:15px">
    <p class="error-label">❌ Example B:</p>
    <div style="text-align:center">
      <div class="error-work">
  734<br>
- 278<br>
-----<br>
  564  ← WRONG!
      </div>
    </div>
    <p style="margin-top:10px;font-size:14pt">What's the mistake? <span class="answer-box"></span></p>
    <p style="margin-top:8px;font-size:14pt">Correct answer: <span class="answer-box-small"></span></p>
  </div>
</div>
```

### Q5-estimation-first:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Estimate first, then calculate:</p>

  <div class="estimation-box">
    <p class="estimation-label">Problem: 456 + 789 = ?</p>
    <p class="estimation-work"><strong>Step 1 - Estimate:</strong> Round to nearest 100</p>
    <p class="estimation-work">456 ≈ <span class="answer-box-small"></span></p>
    <p class="estimation-work">789 ≈ <span class="answer-box-small"></span></p>
    <p class="estimation-work">Estimated answer: <span class="answer-box"></span></p>
  </div>

  <div style="margin-top:15px;text-align:center">
    <p style="font-size:15pt;font-weight:bold;margin-bottom:10px">Step 2 - Calculate using column method:</p>
    <div class="working-space">
      <p class="working-label">Write your column method here</p>
    </div>
    <p style="font-size:15pt;font-weight:bold;margin-top:10px">Actual answer: <span class="answer-box"></span></p>
  </div>

  <p style="margin-top:10px;font-size:14pt;font-style:italic;color:#7B1FA2">
    ✓ Is your actual answer close to your estimate?
  </p>
</div>
```

### Q5-real-world-column-money:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> A school raised £4.56 at a cake sale on Monday and £2.78 at a book sale on Tuesday. How much money did they raise in total?</p>

  <div style="margin:15px 0;text-align:center">
    <p style="font-size:14pt;font-weight:bold;margin-bottom:10px">Use column method to calculate:</p>
    <div class="working-space">
      <p class="working-label">Show your column method working</p>
    </div>
  </div>

  <p class="question-text">Total raised: £<span class="answer-box"></span></p>
</div>
```

## GENERATION RULES

1. **Follow SPEC exactly**: Use {{COLUMN_TYPE}} for layout format
2. **Apply REGROUP_STAGE**: Match regrouping requirements precisely
3. **Match DIFFICULTY**: Ensure problems match difficulty level
4. **Integrate VISUAL_SUPPORT**: Add scaffolds as specified
5. **Include CHECK_METHOD** where specified (Q5 often includes checking)
6. **NO calculation hints** in student questions (unless {{VISUAL_SUPPORT}} = with-hints)
7. **NO method labels** visible to students (e.g., NO "standard-add-ones" text)
8. **Show ALL working in answer key** including:
   - Carry numbers notation (small red numbers)
   - Borrowing notation (crossed-out numbers, new numbers)
   - Step-by-step explanation for teachers
9. **Monospace font** for all column work (maintains alignment)
10. **3-DIGIT NUMBERS ONLY** (100-999 range, sums within 1000)
11. **Colored backgrounds** for each question (as specified)
12. **Right-aligned** column layouts

## VALIDATION CHECKLIST

Before returning worksheet:
- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q matches {{COLUMN_TYPE}}?
- [ ] Regrouping matches {{REGROUP_STAGE}}?
- [ ] Difficulty matches {{DIFFICULTY}}?
- [ ] Visual support matches {{VISUAL_SUPPORT}}?
- [ ] Column method shown correctly (right-aligned, monospace)?
- [ ] Carry/borrow notation explained in answer key?
- [ ] Answer key includes full working?
- [ ] No calculation hints for students (unless specified)?
- [ ] All 3-digit numbers (not 2-digit or 4-digit)?
- [ ] Backgrounds: Q1=#FFF9C4, Q2=#E3F2FD, Q3=#F1F8E9, Q4=#FCE4EC, Q5=#FFF3E0?

<!-- DEBUG-END: Check console for rotation confirmation -->

Generate complete HTML. UK Year 3 (ages 7-8). Focus: FORMAL WRITTEN COLUMN METHOD mastery.
