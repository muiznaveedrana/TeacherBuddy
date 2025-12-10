# Ages 4-5: Weight Comparison (INTERACTIVE-OPTIMISED)

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

**CRITICAL**: All answers use text input (A/B/C format). NO circle/select patterns.

## Research-Based Design (EYFS/KS1 Aligned)
- **Address size-weight misconception**: Larger objects are NOT always heavier
- **Balance scale understanding**: Heavier side goes down, lighter side goes up
- **Obvious weight differences**: Use common sense comparisons (elephant vs feather)
- **Hands-on vocabulary**: heavier, lighter, heaviest, lightest (comparative language)
- **Q5 misconception test**: Tests "bigger does NOT mean heavier" confusion

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Weight Vocabulary (Reception Level)
**Comparative**: heavier, lighter
**Superlative**: heaviest, lightest
**Equal**: same weight, as heavy as

## Objects for Weight Comparison
**Heavy objects**: elephant, car, rock, book, watermelon, cow, pumpkin, horse, goat
**Light objects**: feather, balloon, butterfly, leaf, flower, mouse, bird, chick
**Medium**: ball, doll, cat, dog, sheep, duck, chicken, apple, orange
**AVOID (no image available)**: pig, table, bag, box, cotton
**Image**: `<img src="/images/{object}.png" width="60" height="60" alt="{Object}" />`

## Visual Cues for Weight
**Use balance scales** or tipping imagery to show weight difference
**Obvious comparisons**: elephant vs feather, rock vs balloon, book vs leaf
**NO ambiguous pairs**: Avoid similar-weight objects for Reception
**Balance scale logic**: Heavier side goes DOWN (translateY positive), lighter side goes UP (translateY negative)

## 5 Question Types (EXACT ORDER)
**Q1 - Which is heavier?**: 2 objects (A/B), common sense comparison
**Q2 - Which is lighter?**: 2 objects (A/B), common sense comparison
**Q3 - Heaviest of 3**: Multiple choice (A/B/C), clear weight hierarchy
**Q4 - Lightest of 3**: Multiple choice (A/B/C), clear weight hierarchy
**Q5 - Misconception Test**: "Bigger does NOT mean heavier" - tests size vs weight confusion

## Q1 - Which is Heavier? (2 Objects)
**RANDOMIZE**: Pick 2 objects with OBVIOUS weight difference + ONE question variation

**Question Variations** (pick ONE):
- "Which is heavier?"
- "Which one is heavier?"
- "Point to the heavier one."
- "Find the heavy one."

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which is heavier?</p>
    <div class="weight-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/elephant.png" width="80" height="60" alt="Elephant" />
            <p class="item-name">Elephant</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/feather.png" width="50" height="50" alt="Feather" />
            <p class="item-name">Feather</p>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Which is Lighter? (2 Objects)
**RANDOMIZE**: Pick 2 objects with OBVIOUS weight difference + ONE question variation

**Question Variations** (pick ONE):
- "Which is lighter?"
- "Which one is lighter?"
- "Point to the lighter one."
- "Find the light one."

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which is lighter?</p>
    <div class="weight-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/book.png" width="60" height="60" alt="Book" />
            <p class="item-name">Book</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/balloon.png" width="50" height="60" alt="Balloon" />
            <p class="item-name">Balloon</p>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Heaviest of 3 (Multiple Choice)
**RANDOMIZE**: Pick 3 objects with CLEAR weight hierarchy + ONE question variation

**Question Variations** (pick ONE):
- "Which is the heaviest?"
- "Find the heaviest one."
- "Which one is heaviest?"
- "Point to the heaviest."

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which is the heaviest?</p>
    <div class="three-way-weight">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/apple.png" width="50" height="50" alt="Apple" />
            <p class="item-name">Apple</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/car.png" width="70" height="50" alt="Car" />
            <p class="item-name">Car</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/leaf.png" width="45" height="45" alt="Leaf" />
            <p class="item-name">Leaf</p>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Lightest of 3 (Multiple Choice)
**RANDOMIZE**: Pick 3 objects with CLEAR weight hierarchy + ONE question variation

**Question Variations** (pick ONE):
- "Which is the lightest?"
- "Find the lightest one."
- "Which one is lightest?"
- "Point to the lightest."

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which is the lightest?</p>
    <div class="three-way-weight">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/watermelon.png" width="60" height="60" alt="Watermelon" />
            <p class="item-name">Watermelon</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/butterfly.png" width="50" height="50" alt="Butterfly" />
            <p class="item-name">Butterfly</p>
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/ball.png" width="50" height="50" alt="Ball" />
            <p class="item-name">Ball</p>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Misconception Test: Bigger Does NOT Mean Heavier!

**CRITICAL**: This tests the common misconception that larger = heavier.

**Show balance scale with:**
- **Side A**: SMALLER object but HEAVIER (goes DOWN) - e.g., small rock (40px)
- **Side B**: BIGGER object but LIGHTER (goes UP) - e.g., large balloon (70px)

**Question Variations** (pick ONE):
- "Which side is heavier?"
- "Which object is heavier, A or B?"
- "What is heavier?"

**Visual cues**:
- Heavier (smaller) side: `translateY(20px)` goes DOWN
- Lighter (bigger) side: `translateY(-20px)` goes UP

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which side is heavier?</p>
    <div class="balance-scale">
        <div class="scale-display">
            <div class="scale-left" style="transform:translateY(20px);">
                <div class="scale-pan">
                    <img src="/images/rock.png" width="40" height="40" alt="Small rock" />
                    <p class="scale-label">A</p>
                </div>
            </div>
            <div class="scale-center">
                <div class="scale-beam"></div>
                <div class="scale-pivot">⚖️</div>
            </div>
            <div class="scale-right" style="transform:translateY(-20px);">
                <div class="scale-pan">
                    <img src="/images/balloon.png" width="70" height="70" alt="Big balloon" />
                    <p class="scale-label">B</p>
                </div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

**Good misconception pairs**:
- Small rock (40px) vs Big balloon (70px) → rock heavier
- Small book (45px) vs Big feather (65px) → book heavier
- Small watermelon (50px) vs Big butterfly (75px) → watermelon heavier

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.weight-comparison,.three-way-weight{display:flex;gap:30px;justify-content:center;align-items:center;margin:20px auto;padding:20px;background:#fff;border:2px solid #ddd;border-radius:10px;flex-wrap:wrap;}
.comparison-item{text-align:center;padding:15px;border:2px solid #eee;border-radius:8px;min-width:120px;}
.item-label{font-size:18pt;font-weight:bold;display:block;margin-bottom:10px;}
.item-name{font-size:14pt;margin-top:8px;font-weight:600;}
.balance-scale{margin:20px auto;text-align:center;}
.scale-display{display:flex;justify-content:center;align-items:flex-end;gap:20px;position:relative;height:150px;}
.scale-left,.scale-right{transition:transform 0.3s;}
.scale-pan{padding:15px;border:3px solid #333;border-radius:10px;background:#FFE4B5;text-align:center;}
.scale-label{font-size:16pt;font-weight:bold;margin-top:5px;}
.scale-center{display:flex;flex-direction:column;align-items:center;justify-content:center;}
.scale-pivot{font-size:32pt;}
.scale-beam{width:200px;height:4px;background:#333;margin-bottom:5px;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key Format

**CRITICAL**: Answer format must be CLEAN letter only (A, B, or C) - NO parenthetical descriptions

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> A</p>
        <p><strong>2.</strong> B</p>
        <p><strong>3.</strong> B</p>
        <p><strong>4.</strong> B</p>
        <p><strong>5.</strong> A</p>
    </div>
</div>
```

---

## Theme Variations (Generate 3 different worksheets)

### Worksheet 1 - Everyday Objects (EASY)
- Q1: elephant (A, 80px) vs feather (B, 50px) → **A** (elephant heavier)
- Q2: book (A, 60px) vs balloon (B, 60px) → **B** (balloon lighter)
- Q3: apple (A, 50px), car (B, 70px), leaf (C, 45px) → **B** (car heaviest)
- Q4: watermelon (A, 60px), butterfly (B, 50px), ball (C, 50px) → **B** (butterfly lightest)
- Q5: MISCONCEPTION - Small rock (A, 40px) vs Big balloon (B, 70px) → **A** (rock heavier despite being smaller)

### Worksheet 2 - Farm Animals (AVERAGE)
- Q1: horse (A, 90px) vs chick (B, 55px) → **A** (horse heavier)
- Q2: goat (A, 70px) vs feather (B, 50px) → **B** (feather lighter)
- Q3: cow (A, 85px), duck (B, 65px), butterfly (C, 45px) → **A** (cow heaviest)
- Q4: sheep (A, 75px), chicken (B, 60px), leaf (C, 45px) → **C** (leaf lightest)
- Q5: MISCONCEPTION - Small rock (A, 45px) vs Big balloon (B, 75px) → **A** (rock heavier despite being smaller)

### Worksheet 3 - Food & Nature (HARD)
- Q1: pumpkin (A, 70px) vs cotton (B, 50px) → **A** (pumpkin heavier)
- Q2: rock (A, 55px) vs leaf (B, 45px) → **B** (leaf lighter)
- Q3: watermelon (A, 65px), orange (B, 50px), butterfly (C, 45px) → **A** (watermelon heaviest)
- Q4: cow (A, 75px), apple (B, 50px), doll (C, 60px) → **B** (apple lightest)
- Q5: MISCONCEPTION - Small watermelon (A, 50px) vs Big butterfly (B, 75px) → **A** (watermelon heavier despite being smaller)

---

## Validation Checklist
- [ ] Exactly 5 questions with colored backgrounds
- [ ] All questions use `<span class="answer-line"></span>` for text input
- [ ] Q1-Q4 use obvious weight differences (common sense comparisons)
- [ ] Q5 tests "bigger ≠ heavier" misconception (smaller object is heavier)
- [ ] Answer key uses CLEAN format (A/B/C only, no parenthetical descriptions)
- [ ] Balance scale shows correct tipping (heavier = translateY positive, lighter = negative)
- [ ] No objects overlap with size-comparison/length-comparison subtopics
