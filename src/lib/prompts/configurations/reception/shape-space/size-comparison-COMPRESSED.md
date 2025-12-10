# Ages 4-5: Size Comparison (INTERACTIVE-OPTIMISED V2)

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

**CRITICAL: Every answer uses text input. Answers are Left, Right, Middle, or child names.**

## Research-Based Design (NCETM/EYFS Aligned)
- **Precise attribute language**: Use "taller", "shorter", "longer" - NOT generic "big/small"
- **50%+ size difference**: OBVIOUS visual differences for 4-5 year olds
- **Direct comparison**: Side-by-side objects (like Goldilocks' 3 bears)
- **Misconception testing (Q5)**: "Bigger doesn't mean more" - tests size vs quantity confusion
- **Key vocabulary**: tall, short, long, wide, narrow, thick, thin + comparatives (taller, shorter, longer)

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## Rules
- **50% size difference minimum** (OBVIOUS differences for ages 4-5)
- **5 DIFFERENT object categories** (NO repeats across questions)
- **Real images only** from `/images/{object}.png`
- **ALL questions**: Use SAME object type at different sizes within each question
- **Sizes SCRAMBLED**: Items NOT in small→medium→large order (mix them up!)
- **Answer format**: ALL questions use `<span class="answer-line"></span>` for text input
- **TEXT CASE**: Use lowercase for size words (bigger, smaller, tallest, shortest, longest)

## Objects (by category)
**fruits**: strawberry, apple, watermelon, banana, orange, pear
**toys**: ball, bear, block, doll, car
**farm_animals**: chicken, cow, sheep, pig, duck
**vegetables**: carrot, tomato, cucumber, pepper
**food_treats**: cookie, cupcake, icecream
**garden**: flower, tree, butterfly, leaf
**school**: book, pencil, crayon, backpack
**Names**: Emma, Jack, Ben, Lily, Oliver, Sophie, Noah, Ava, Mia, Sam

## 5 Question Types (EXACT ORDER)

**Q1 - Which is taller?**: 2 items (Left/Right), tests height comparison
**Q2 - Which is shorter?**: 2 items (Left/Right), tests height/length comparison
**Q3 - Which is the longest?**: 3 items (Left/Middle/Right), tests length comparison
**Q4 - Who has the biggest?**: 3 children with different sized objects, answer is child name
**Q5 - Reasoning (misconception test)**: Tests "bigger ≠ more" - compares COUNT not size

---

## Q1 - Which is taller? (2-way comparison)

**Pick ONE object from a category. Show 2 sizes: small (50px) vs tall (100px). Randomize positions.**

```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which tree is taller?</p>
    <div class="size-comparison">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/tree.png" width="50" height="50" alt="Short tree" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/tree.png" width="100" height="100" alt="Tall tree" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q2 - Which is shorter? (2-way comparison)

**Pick DIFFERENT object from Q1. Show 2 sizes: short (55px) vs tall (105px). Randomize positions.**

```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which pencil is shorter?</p>
    <div class="size-comparison">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/pencil.png" width="105" height="105" alt="Long pencil" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/pencil.png" width="55" height="55" alt="Short pencil" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q3 - Which is the longest? (3-way comparison)

**Pick DIFFERENT object from Q1-Q2. Show 3 sizes SCRAMBLED (e.g., 70px, 45px, 95px).**

```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which carrot is the longest?</p>
    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/carrot.png" width="70" height="70" alt="Medium carrot" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Middle</span>
            <img src="/images/carrot.png" width="45" height="45" alt="Short carrot" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/carrot.png" width="95" height="95" alt="Long carrot" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q4 - Who has the biggest? (3-way comparison with names)

**Pick DIFFERENT object from Q1-Q3. Show 3 children with different sized objects (like Goldilocks' 3 bears). Ask ONE question: who has the biggest?**

**IMPORTANT**: Use 3 different child names. Sizes MUST be clearly different (50px, 75px, 100px) and SCRAMBLED. Answer is the child name with the biggest object.

```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Look at the flowers. Who has the biggest flower?</p>
    <div class="three-way-comparison">
        <div class="comparison-group">
            <span class="group-label">Emma</span>
            <div class="objects-display">
                <img src="/images/flower.png" width="75" height="75" alt="Medium flower" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Jack</span>
            <div class="objects-display">
                <img src="/images/flower.png" width="50" height="50" alt="Small flower" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Ben</span>
            <div class="objects-display">
                <img src="/images/flower.png" width="100" height="100" alt="Big flower" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

---

## Q5 - Reasoning: Bigger Doesn't Mean More! (Misconception Test)

**CRITICAL: This question tests the common misconception that bigger objects = more objects.**

**Show TWO groups: Group A has FEWER but BIGGER objects. Group B has MORE but SMALLER objects.**
**Ask "Which group has MORE?" - Answer is the group with more COUNT, not bigger size.**

**Example**: Group A has 2 big apples (80px each). Group B has 5 small apples (35px each).
**Correct answer**: B (because 5 > 2, even though A's apples are bigger)

```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Look carefully! Which group has MORE apples? (Count them!)</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">A</span>
            <div class="objects-display" style="gap: 10px;">
                <img src="/images/apple.png" width="80" height="80" alt="Big apple" />
                <img src="/images/apple.png" width="80" height="80" alt="Big apple" />
            </div>
            <p class="count-hint">(Big apples)</p>
        </div>
        <div class="comparison-group">
            <span class="group-label">B</span>
            <div class="objects-display" style="gap: 4px;">
                <img src="/images/apple.png" width="35" height="35" alt="Small apple" />
                <img src="/images/apple.png" width="35" height="35" alt="Small apple" />
                <img src="/images/apple.png" width="35" height="35" alt="Small apple" />
                <img src="/images/apple.png" width="35" height="35" alt="Small apple" />
                <img src="/images/apple.png" width="35" height="35" alt="Small apple" />
            </div>
            <p class="count-hint">(Small apples)</p>
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
.size-comparison,.size-comparison-three{display:flex;gap:30px;justify-content:center;align-items:flex-end;margin:15px 0;padding:15px;background:#f8f9ff;border:2px solid #4CAF50;border-radius:8px;}
.comparison-item{text-align:center;}
.item-label{font-size:12pt;font-weight:bold;margin-bottom:8px;display:block;color:#333;}
.comparison-container,.three-way-comparison{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin:12px 0;}
.comparison-group{padding:12px;border:2px solid #ddd;border-radius:8px;text-align:center;min-width:100px;}
.group-label{font-size:14pt;font-weight:bold;margin-bottom:8px;display:block;}
.objects-display{display:flex;flex-wrap:wrap;justify-content:center;margin:8px 0;gap:6px;}
.count-hint{font-size:10pt;color:#666;margin-top:5px;font-style:italic;}
.sub-questions{margin-top:15px;padding:10px;background:#fff;border-radius:6px;}
.sub-question{font-size:14pt;margin:10px 0;}
.answer-prompt{margin-top:20px;font-size:15pt;font-weight:600;text-align:center;}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:100px;height:28px;margin-left:10px;}
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
        <p><strong>1.</strong> Right</p>
        <p><strong>2.</strong> Right</p>
        <p><strong>3.</strong> Right</p>
        <p><strong>4.</strong> Ben</p>
        <p><strong>5.</strong> B</p>
    </div>
</div>
```

---

## Theme Variations (Generate 3 different worksheets)

### Worksheet 1 - Garden & Fruits Theme
- Q1: tree (taller) - Left=50px, Right=100px → Right
- Q2: flower (shorter) - Left=105px, Right=55px → Right
- Q3: carrot (longest) - Left=70px, Middle=45px, Right=95px → Right
- Q4: strawberry with Emma/Jack/Ben (75px/50px/100px) → Ben (biggest)
- Q5: apple - Group A: 2 big (80px), Group B: 5 small (35px) → B

### Worksheet 2 - Farm Animals Theme
- Q1: chicken (taller) - Left=100px, Right=50px → Left
- Q2: duck (shorter) - Left=55px, Right=105px → Left
- Q3: pig (longest) - Left=45px, Middle=95px, Right=70px → Middle
- Q4: cow with Lily/Oliver/Sophie (50px/100px/75px) → Oliver (biggest)
- Q5: sheep - Group A: 3 big (70px), Group B: 6 small (30px) → B

### Worksheet 3 - School Theme
- Q1: book (taller) - Left=50px, Right=100px → Right
- Q2: pencil (shorter) - Left=105px, Right=55px → Right
- Q3: crayon (longest) - Left=95px, Middle=70px, Right=45px → Left
- Q4: backpack with Noah/Ava/Mia (100px/50px/75px) → Noah (biggest)
- Q5: ball - Group A: 2 big (75px), Group B: 4 small (35px) → B

---

## Validation Checklist
- [ ] Exactly 5 questions
- [ ] Each question uses different object category
- [ ] All sizes have 50%+ difference (OBVIOUS for 4-5 year olds)
- [ ] Q1-Q2 use precise attribute words (taller, shorter) not generic "bigger"
- [ ] Q4 asks "Who has the biggest?" with child name answer
- [ ] Q5 tests "bigger ≠ more" misconception (fewer big vs more small)
- [ ] All answer-line elements present (5 total: Q1, Q2, Q3, Q4, Q5)
- [ ] Answer key matches question answers exactly
- [ ] Sizes are SCRAMBLED (not in order small→big)

---

## Research Sources
- [NCETM - Exploring comparison in Early Years](https://www.ncetm.org.uk/features/exploring-comparison-in-early-years/)
- [NCETM - Measures](https://www.ncetm.org.uk/classroom-resources/ey-measures/)
- [Nursery World - Mathematics in the EYFS: Measure](https://www.nurseryworld.co.uk/features/article/mathematics-in-the-eyfs-measure-in-comparison)
- [Twinkl - Shorter or Taller Worksheets KS1](https://www.twinkl.com/resource/shorter-or-taller-activity-sheets-t-m-34519)
