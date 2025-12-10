# Ages 4-5: Length Comparison (INTERACTIVE-OPTIMISED V2)

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

**CRITICAL: Every answer uses text input with answer-line pattern.**

## Research-Based Design (NCETM/EYFS Aligned)
- **Precise comparative language**: longer, shorter, longest, shortest (NOT generic "big/small")
- **40-50%+ length difference**: OBVIOUS visual differences for 4-5 year olds
- **Direct comparison**: Side-by-side objects aligned at one end for fair comparison
- **Misconception testing (Q5)**: Tests understanding that objects can be same length even if different
- **Key vocabulary**: long, short, tall + comparatives (longer, shorter, taller) + superlatives (longest, shortest, tallest)

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## Rules
- **40-50% length difference minimum** (OBVIOUS differences for ages 4-5)
- **5 DIFFERENT object types** (NO repeats across questions)
- **Real images only** from `/images/{object}.png`
- **ALL questions**: Use answer-line pattern `<span class="answer-line"></span>`
- **Answer format**: A, B, C (for labels) or "A and C" (for Q5 matching)

## Objects for Length Comparison
**Long objects**: pencil, ruler, stick, ribbon, rope, snake, train, scarf
**Tall objects**: tree, giraffe, tower, building
**Short objects**: eraser, crayon, worm, mouse, spoon, fork
**Vegetables**: carrot, cucumber, celery
**Image**: `<img src="/images/{object}.png" alt="{Object}" />`

## 5 Question Types (EXACT ORDER)

**Q1 - Which is longer?**: 2 objects (A/B), direct comparison
**Q2 - Which is shorter?**: 2 objects (A/B), direct comparison
**Q3 - Longest of 3**: 3 objects (A/B/C), find the longest
**Q4 - Shortest of 3**: 3 objects (A/B/C), find the shortest
**Q5 - Same Length**: Show 3-4 objects, identify 2 that are the same length

---

## Q1 - Which is Longer? (2 Objects)

**RANDOMIZE**: Pick 2 objects + ONE question variation

**Question Variations** (pick ONE):
- "Which is longer?"
- "Which one is longer?"
- "Point to the longer one."
- "Find the longer object."

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which is longer?</p>
    <div class="length-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/pencil.png" width="120" height="20" alt="Pencil" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/eraser.png" width="60" height="20" alt="Eraser" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q2 - Which is Shorter? (2 Objects)

**RANDOMIZE**: Pick DIFFERENT objects from Q1 + ONE question variation

**Question Variations** (pick ONE):
- "Which is shorter?"
- "Which one is shorter?"
- "Point to the shorter one."
- "Find the shorter object."

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which is shorter?</p>
    <div class="length-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/ruler.png" width="140" height="20" alt="Ruler" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/crayon.png" width="80" height="20" alt="Crayon" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q3 - Longest of 3 (Multiple Choice)

**RANDOMIZE**: Pick 3 objects DIFFERENT from Q1-Q2 with CLEAR size differences + ONE question variation

**Question Variations** (pick ONE):
- "Which is the longest?"
- "Find the longest one."
- "Which one is longest?"
- "Point to the longest."

**Size differences**: Make it obvious (e.g., 60px, 100px, 140px) and SCRAMBLE the order

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which is the longest?</p>
    <div class="three-way-length">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/stick.png" width="80" height="15" alt="Stick" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/ribbon.png" width="150" height="15" alt="Ribbon" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/rope.png" width="110" height="15" alt="Rope" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q4 - Shortest of 3 (Multiple Choice)

**RANDOMIZE**: Pick 3 objects DIFFERENT from Q1-Q3 with CLEAR size differences + ONE question variation

**Question Variations** (pick ONE):
- "Which is the shortest?"
- "Find the shortest one."
- "Which one is shortest?"
- "Point to the shortest."

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which is the shortest?</p>
    <div class="three-way-length">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/snake.png" width="130" height="20" alt="Snake" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/worm.png" width="60" height="15" alt="Worm" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/pencil.png" width="100" height="18" alt="Pencil" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q5 - Same Length (Matching)

**CRITICAL: This question tests understanding that different objects can be the same length**

**RANDOMIZE**: Show 3 objects DIFFERENT from Q1-Q4, 2 are the same length + ONE question variation

**Question Variations** (pick ONE):
- "Which two are the same length?"
- "Find two that are the same length."
- "Which are as long as each other?"

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which two are the same length?</p>
    <div class="same-length-display">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/carrot.png" width="100" height="25" alt="Carrot" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/cucumber.png" width="130" height="25" alt="Cucumber" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/spoon.png" width="100" height="20" alt="Spoon" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## CSS (Include at worksheet start)

```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.length-comparison,.three-way-length,.same-length-display{display:flex;flex-direction:column;gap:20px;margin:20px auto;max-width:400px;padding:20px;background:#fff;border:2px solid #ddd;border-radius:10px;}
.comparison-item{display:flex;align-items:center;gap:15px;padding:10px;border:1px solid #eee;border-radius:6px;}
.item-label{font-size:18pt;font-weight:bold;min-width:30px;text-align:center;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

---

## Answer Key Format

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> A</p>
        <p><strong>2.</strong> B</p>
        <p><strong>3.</strong> B</p>
        <p><strong>4.</strong> B</p>
        <p><strong>5.</strong> A and C</p>
    </div>
</div>
```

---

## Theme Variations (Generate 3 different worksheets)

### Worksheet 1 - Stationery & School Theme (EASY)
- Q1: pencil (A=120px) vs eraser (B=60px) → A (longer)
- Q2: ruler (A=140px) vs crayon (B=80px) → B (shorter)
- Q3: stick (A=80px), ribbon (B=150px), rope (C=110px) → B (longest)
- Q4: snake (A=130px), worm (B=60px), fork (C=100px) → B (shortest)
- Q5: carrot (A=100px), cucumber (B=130px), spoon (C=100px) → A and C (same length)

### Worksheet 2 - Garden & Nature Theme (AVERAGE)
- Q1: tree (A=70px) vs mouse (B=120px) → B (longer)
- Q2: scarf (A=150px) vs ribbon (B=90px) → B (shorter)
- Q3: carrot (A=110px), cucumber (B=70px), celery (C=140px) → C (longest)
- Q4: worm (A=95px), mouse (B=55px), snake (C=130px) → B (shortest)
- Q5: pencil (A=110px), ruler (B=110px), stick (C=150px) → A and B (same length)

### Worksheet 3 - Mixed Objects Theme (HARD)
- Q1: rope (A=100px) vs crayon (B=65px) → A (longer)
- Q2: train (A=140px) vs fork (B=85px) → B (shorter)
- Q3: ribbon (A=65px), scarf (B=95px), rope (C=135px) → C (longest)
- Q4: eraser (A=120px), worm (B=70px), spoon (C=105px) → B (shortest)
- Q5: snake (A=115px), train (B=140px), stick (C=115px) → A and C (same length)

---

## Validation Checklist
- [ ] Exactly 5 questions
- [ ] Each question uses different objects
- [ ] All lengths have 40-50%+ difference (OBVIOUS for 4-5 year olds)
- [ ] Q1-Q4 use precise comparative words (longer, shorter, longest, shortest)
- [ ] Q5 tests "same length" understanding with matching task
- [ ] All answer-line elements present (5 total)
- [ ] Answer key matches question answers exactly (A, B, C, or "A and C" format)

---

## Research Sources
- [Oak National Academy - Comparing lengths KS1](https://www.thenational.academy/teachers/programmes/maths-primary-ks1/units/numbers-0-to-20-in-different-contexts/lessons/comparing-lengths)
- [Primary Stars Education - Compare lengths worksheets](https://primarystarseducation.co.uk/resources/compare-lengths-worksheets/)
- [Math Coach's Corner - Measurement Misconceptions](https://www.mathcoachscorner.com/2012/05/measurement-misconceptions/)
