# Y2: Addition/Subtraction Word Problems

**CRITICAL: Generate EXACTLY {{questionCount}} questions.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS (Injected by system):
{{PROBLEM_TYPE_SPEC}}
{{CONTEXT}}
{{VISUAL_SUPPORT}}
{{OPERATIONS}}
{{NUMBER_RANGE}}

<!-- DEBUG: Freshness injection above validates rotation is working -->

## CORE PROBLEM TYPES

### RESULT-UNKNOWN (Addition)
"Emma has 15 stickers. Her friend gives her 8 more. How many stickers does Emma have now?"
- Start amount known + Change known = Result unknown
- Keywords: "more", "gets", "earns", "finds", "altogether"

### PART-UNKNOWN (Subtraction)
"Tom had some marbles. He gave 12 to his sister. Now he has 9 left. How many marbles did Tom have at the start?"
- Start unknown - Change known = Result known
- Keywords: "had some", "started with", "how many at first"

### CHANGE-UNKNOWN (Both operations)
"Sarah has 23 pencils. How many more does she need to have 35 pencils?"
- Start known + Change unknown = Result known
- Keywords: "how many more", "how many less", "what's the difference"

### COMPARISON (Difference)
"Class A has 28 books. Class B has 17 books. How many more books does Class A have?"
- Compare two quantities, find difference
- Keywords: "more than", "fewer than", "how many more", "how many less"

### TWO-STEP (Combined operations)
"A shop had 45 apples. They sold 18 in the morning and 12 in the afternoon. How many apples are left?"
- Two operations needed (18+12=30, then 45-30=15)
- Keywords: "then", "after that", "also", "in total"

## QUESTION SPECS (Use {{PROBLEM_TYPE_SPEC}}):

**Q1 Options:**
- `result-unknown-addition`: Simple addition word problem
- `result-unknown-objects`: Addition with picture context
- `result-unknown-money`: UK pence addition
- `result-unknown-bar-model`: With bar model diagram

**Q2 Options:**
- `part-unknown-subtraction`: Missing start amount
- `change-unknown-addition`: Missing addend
- `comparison-difference`: Find difference between two amounts
- `result-unknown-subtraction`: Simple subtraction

**Q3 Options:**
- `comparison-bar-model`: Comparison with bar model
- `change-unknown-subtraction`: Missing subtrahend
- `part-unknown-addition`: Missing part in addition
- `result-unknown-mixed`: Either operation

**Q4 Options:**
- `two-step-add-subtract`: Add two amounts, then subtract
- `two-step-subtract-add`: Subtract, then add
- `two-step-add-add`: Two additions
- `two-step-comparison`: Compare after operation

**Q5 Options:**
- `challenge-three-step`: Three operations
- `challenge-comparison-complex`: Multi-step comparison
- `challenge-money-change`: Money with change calculation
- `challenge-open-ended`: Multiple valid approaches

## VISUAL SUPPORT (Use {{VISUAL_SUPPORT}}):

**bar-model-full**: Complete Singapore bar model showing all parts
**bar-model-simple**: Basic bar with labeled sections
**bar-model-blank**: Empty bar for student to fill
**pictures-with-bar**: Objects + bar model scaffold
**pictures-only**: Context images, no bar model
**pure-text**: Words only, working space provided

## CONTEXTS (Use {{CONTEXT}}):

**school**: `/images/WORKSHEET_OBJECTS/counting/school_supplies/[pencil|book|eraser|crayon|marker|scissors|ruler|glue].png`
**toys**: `/images/WORKSHEET_OBJECTS/counting/toys/[ball|car|doll|teddy|block|kite].png`
**food-fruits**: `/images/WORKSHEET_OBJECTS/counting/fruits/[apple|banana|orange|strawberry|grape|pear].png`
**food-treats**: `/images/WORKSHEET_OBJECTS/counting/food_treats/[cookie|cupcake].png`
**animals**: `/images/WORKSHEET_OBJECTS/counting/farm_animals/[chicken|cow|sheep|pig|horse|duck].png`

**money-pence**: ⚠️ CRITICAL - Copy these EXACT paths character-by-character:
  - 1p: `/images/WORKSHEET_OBJECTS/money/UK coins/1p tails col - TRF.png`
  - 2p: `/images/WORKSHEET_OBJECTS/money/UK coins/2p tails col - TRF.png`
  - 5p: `/images/WORKSHEET_OBJECTS/money/UK coins/5p tails col - TRF.png`
  - 10p: `/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png`
  - 20p heads: `/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png`
  - 20p tails: `/images/WORKSHEET_OBJECTS/money/UK coins/20p tails col - TRF.png`
  - 50p heads: `/images/WORKSHEET_OBJECTS/money/UK coins/50p heads col - TRF.png`
  - 50p tails: `/images/WORKSHEET_OBJECTS/money/UK coins/50p tails col - TRF.png`

⚠️ NEVER invent coin paths. NEVER change "UK coins" to "uk_coins". NEVER omit "heads" or "tails".

**party**: Use shapes or toys for balloons/presents context
**sports**: Use balls, toys for sports context

## NUMBER RANGES (Use {{NUMBER_RANGE}}):

**Easy (10-30):** Smaller numbers, single-step operations, friendly numbers
**Average (20-50):** Mixed difficulty, some two-step problems
**Hard (30-99):** Larger numbers, complex two-step problems, multiple operations

## CSS (Compact - Bar Models, Word Problems, Visual Support):

```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:20px;line-height:1.8}
.question{margin:25px 0;padding:25px;border-radius:10px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:12px;font-weight:bold;font-size:16pt}
.question-text{font-size:18pt;margin:10px 0;font-weight:600;line-height:1.6}

/* Bar Model - Singapore Math Style */
.bar-model-container{margin:25px 0;padding:20px;background:#F5F5F5;border-radius:10px;border:2px solid #ddd}
.bar-model-title{font-size:15pt;font-weight:bold;margin-bottom:15px;color:#1976D2;text-align:center}
.bar-full{display:flex;border:3px solid #333;border-radius:6px;overflow:hidden;margin:15px auto;max-width:500px}
.bar-section{padding:20px 15px;font-size:18pt;font-weight:bold;text-align:center;border-right:3px solid #333;min-width:80px;display:flex;align-items:center;justify-content:center}
.bar-section:last-child{border-right:none}
.bar-section.known{background:#4CAF50;color:white}
.bar-section.unknown{background:white;color:#333;border:3px dashed #FF5722}
.bar-label{text-align:center;margin-top:10px;font-size:14pt;color:#555}

/* Comparison Bar Model */
.comparison-bars{margin:20px 0}
.comparison-bar{margin:15px 0}
.comparison-label{font-size:15pt;font-weight:bold;margin-bottom:8px;color:#1976D2}
.comparison-bar-visual{display:inline-block;height:40px;background:#FF9800;border:3px solid #F57C00;border-radius:6px;vertical-align:middle;margin-right:10px}
.comparison-amount{display:inline-block;vertical-align:middle;font-size:16pt;font-weight:bold}

/* Two-Step Problem Visual */
.two-step-container{margin:20px 0;padding:15px;background:#E3F2FD;border-radius:8px;border:2px dashed #1976D2}
.step-box{margin:15px 0;padding:12px;background:white;border:2px solid #666;border-radius:6px}
.step-number{display:inline-block;width:30px;height:30px;background:#FF9800;color:white;border-radius:50%;text-align:center;line-height:30px;font-weight:bold;margin-right:10px}
.step-text{font-size:15pt;font-weight:600}

/* Context Images */
.context-visual{margin:20px 0;padding:15px;background:#FFF9C4;border:3px dashed #FF9800;border-radius:10px;text-align:center}
.object-group{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:15px 0}
.object-group img{width:45px;height:45px}
.object-label{font-size:14pt;font-weight:bold;margin-top:10px;color:#333}

/* Money Problems */
.money-visual{margin:20px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;text-align:center}
.coin-group{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:15px 0}
.coin-group img{width:50px;height:50px}
.money-label{font-size:15pt;font-weight:bold;margin:10px 0;color:#2E7D32}

/* Working Space */
.working-space{border:2px dashed #999;padding:25px;margin:15px 0;min-height:100px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;font-style:italic;color:#666;margin-bottom:10px}

/* Answer Box */
.answer-box{display:inline-block;min-width:90px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}

/* Part-Whole Diagram */
.part-whole-container{text-align:center;margin:25px 0}
.whole-box{width:120px;height:60px;background:#FF9800;border:4px solid #F57C00;border-radius:8px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 3px 8px rgba(0,0,0,0.15)}
.whole-number{font-size:28pt;font-weight:bold;color:white}
.whole-question{font-size:32pt;font-weight:bold;color:white}
.parts-row{display:flex;justify-content:center;gap:30px;margin-top:20px}
.part-box{width:100px;height:55px;border:3px solid #333;border-radius:8px;display:flex;align-items:center;justify-content:center}
.part-box.filled{background:#4CAF50;border-color:#2E7D32}
.part-box.empty{background:white;border-style:dashed;border-color:#FF5722}
.part-number{font-size:24pt;font-weight:bold;color:white}
.part-box.empty .part-number{color:#FF5722}

/* Answer Key */
.answer-key{margin-top:50px;padding:25px;background:#E8F4F8;border:3px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:18px;text-align:center}
.answer-key p{font-size:15pt;line-height:2;margin:12px 0}
.answer-key .working{font-style:italic;color:#555;margin-left:15px;font-size:14pt}
</style>
```

## TEMPLATES (Match {{PROBLEM_TYPE_SPEC}}):

### Q1-result-unknown-addition:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Emma has 15 stickers. Her friend gives her 8 more stickers. How many stickers does Emma have now?</p>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> stickers</p>
</div>
```

### Q1-result-unknown-bar-model:
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> Tom has 24 marbles. He gets 17 more marbles. How many marbles does Tom have now?</p>
  <div class="bar-model-container">
    <p class="bar-model-title">Bar Model:</p>
    <div class="bar-full">
      <div class="bar-section known">24</div>
      <div class="bar-section known">17</div>
    </div>
    <p class="bar-label">Total = ?</p>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> marbles</p>
</div>
```

### Q2-part-unknown-subtraction:
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Lucy had some pencils. She gave 12 pencils to her friend. Now she has 15 pencils left. How many pencils did Lucy have at the start?</p>
  <div class="part-whole-container">
    <div class="whole-box">
      <span class="whole-question">?</span>
    </div>
    <div class="parts-row">
      <div class="part-box filled">
        <span class="part-number">12</span>
      </div>
      <div class="part-box filled">
        <span class="part-number">15</span>
      </div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> pencils</p>
</div>
```

### Q3-comparison-bar-model:
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> Year 2A has 32 books. Year 2B has 19 books. How many more books does Year 2A have than Year 2B?</p>
  <div class="bar-model-container">
    <div class="comparison-bars">
      <div class="comparison-bar">
        <p class="comparison-label">Year 2A:</p>
        <div class="comparison-bar-visual" style="width:320px;"></div>
        <span class="comparison-amount">32 books</span>
      </div>
      <div class="comparison-bar">
        <p class="comparison-label">Year 2B:</p>
        <div class="comparison-bar-visual" style="width:190px;"></div>
        <span class="comparison-amount">19 books</span>
      </div>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> more books</p>
</div>
```

### Q4-two-step-add-subtract:
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4.</span> A shop had 50 apples. They sold 18 apples in the morning and 15 apples in the afternoon. How many apples are left?</p>
  <div class="two-step-container">
    <div class="step-box">
      <span class="step-number">1</span>
      <span class="step-text">Find total sold: <span class="answer-line"></span></span>
    </div>
    <div class="step-box">
      <span class="step-number">2</span>
      <span class="step-text">Find apples left: <span class="answer-line"></span></span>
    </div>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span> apples</p>
</div>
```

### Q5-challenge-money-change:
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> Sam has 85p. He buys a toy car for 47p. How much money does Sam have left?</p>
  <div class="money-visual">
    <p class="money-label">Sam's money:</p>
    <div class="coin-group">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/50p tails col - TRF.png" width="50" height="50" alt="50p">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/20p heads col - TRF.png" width="48" height="48" alt="20p">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/10p tails col - TRF.png" width="46" height="46" alt="10p">
      <img src="/images/WORKSHEET_OBJECTS/money/UK coins/5p heads col - TRF.png" width="44" height="44" alt="5p">
    </div>
  </div>
  <div class="working-space">
    <p class="working-space-label">Show your working:</p>
  </div>
  <p class="question-text">Answer: <span class="answer-box"></span>p</p>
</div>
```

## GENERATION RULES

1. Follow {{PROBLEM_TYPE_SPEC}} exactly for each question
2. Use {{NUMBER_RANGE}} appropriate for difficulty
3. Apply {{VISUAL_SUPPORT}} mode per question
4. Use {{CONTEXT}} for real-world scenarios
5. ALL image paths must be complete and correct
6. **NO HINTS IN QUESTIONS**: Do not reveal problem type or strategy
   - ❌ "Use addition to solve..."
   - ❌ "This is a two-step problem..."
   - ❌ "Word Problem: Money Subtraction"
   - ❌ "result-unknown-addition"
   - ✅ Clear word problem only
7. **NO TECHNICAL LABELS**: Never include spec names like "bar-model-full", "two-step-add-subtract" in student questions
8. **CLEAR LANGUAGE**: Use Year 2 appropriate vocabulary (ages 6-7)
9. **UK CONTEXT**: Use UK pence (p), UK spelling, UK contexts
10. Answer key must show full working for all steps
11. Bar models should be clear and accurately proportioned where possible
12. Working space provided for all questions
12. Use colored backgrounds consistently (Q1-Q5 rotation)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Each Q follows {{PROBLEM_TYPE_SPEC}}?
- [ ] Numbers within {{NUMBER_RANGE}}?
- [ ] Visual support matches {{VISUAL_SUPPORT}}?
- [ ] Context used appropriately from {{CONTEXT}}?
- [ ] Correct colored backgrounds?
- [ ] Answer key with full working included?
- [ ] No hints revealing problem type?
- [ ] All image paths complete and correct?
- [ ] UK pence format (47p not 47 pence)?
- [ ] Working space provided where needed?

<!-- DEBUG-END: Check console for freshness rotation confirmation -->

Generate complete HTML. UK Year 2 curriculum aligned.
