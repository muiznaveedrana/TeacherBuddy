# Ages 4-5: Early Addition

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Objects & Assets
**fruits**: apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple
**farm_animals**: chicken,cow,sheep,horse,duck,goat,goose,turkey
**garden**: flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn
**school**: book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack
**vegetables**: carrot,tomato,broccoli,cucumber,pepper,potato
**shapes**: star,heart,circle,square,diamond,sun,moon
**toys**: ball,car,doll,kite,block
**vehicles**: bus,bike,train,plane
**sports**: football,basketball,tennis_ball,bat,medal
**treats**: cookie,cupcake
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava,Noah,Mia
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Addition Range
- Numbers: 1-10 only (Reception appropriate)
- Total must NOT exceed 10
- Minimum 2 objects per group to make it visual
- Use DIFFERENT objects for each question

## 5 Question Types (EXACT ORDER)
**Q1 - Picture Addition (A+B)**: "How many altogether?" 2 groups side by side
**Q2 - Story Addition**: "{Name} has X, finds Y more. How many now?"
**Q3 - 1 More**: "What is 1 more than X?" Show X objects
**Q4 - Combining Groups**: "Count all the {objects}." Show 2 groups to combine
**Q5 - Multiple Choice Addition**: Visual addition with 3 answer choices (A/B/C)

## Q1 - Picture Addition
**RANDOMIZE**: Pick ONE object + quantities (2-4 + 2-4, total ≤10) + ONE question variation

**Question Variations** (pick ONE):
- "How many {objects} altogether?"
- "How many {objects} in total?"
- "Count all the {objects}."
- "How many {objects} are there now?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples altogether?</p>
    <div class="addition-groups">
        <div class="objects-display">
            <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        </div>
        <div class="plus-sign">+</div>
        <div class="objects-display">
            <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Story Addition
**RANDOMIZE**: Pick ONE name + ONE object + quantities (total ≤10) + ONE story variation

**Story Variations** (pick ONE):
- "{Name} has {X} {objects}. {Name} finds {Y} more. How many now?"
- "{Name} picked {X} {objects}. Then {Name} picked {Y} more. How many {objects} in total?"
- "{Name} has {X} {objects}. {Name} gets {Y} more. How many altogether?"
- "{Name} found {X} {objects}. Later, {Name} found {Y} more. How many now?"

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Emma has 4 flowers. Emma finds 3 more. How many flowers does Emma have now?</p>
    <div class="story-images">
        <div class="objects-display">
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
        </div>
        <div class="plus-sign">+</div>
        <div class="objects-display">
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - 1 More
**RANDOMIZE**: Pick ONE object + starting number (2-9) + ONE question variation

**CRITICAL**: DO NOT show "+ 1 =" or any calculation hints in the visual!

**Question Variations** (pick ONE):
- "What is 1 more than {X}?"
- "Count 1 more. What number do you get?"
- "If you add 1 more, what number is it?"
- "What number comes after {X}?"

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> What is 1 more than 5?</p>
    <div class="one-more-display">
        <div class="objects-display">
            <img src="/images/star.png" width="30" height="30" alt="Star" />
            <img src="/images/star.png" width="30" height="30" alt="Star" />
            <img src="/images/star.png" width="30" height="30" alt="Star" />
            <img src="/images/star.png" width="30" height="30" alt="Star" />
            <img src="/images/star.png" width="30" height="30" alt="Star" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Combining Groups
**RANDOMIZE**: Pick ONE object + 2 groups (total ≤10) + ONE question variation

**Question Variations** (pick ONE):
- "Count all the {objects}."
- "How many {objects} are there altogether?"
- "How many {objects} in total?"
- "Add the groups. How many {objects}?"

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Count all the cars.</p>
    <div class="combining-display">
        <div class="objects-display">
            <img src="/images/car.png" width="30" height="30" alt="Car" />
            <img src="/images/car.png" width="30" height="30" alt="Car" />
            <img src="/images/car.png" width="30" height="30" alt="Car" />
            <img src="/images/car.png" width="30" height="30" alt="Car" />
        </div>
        <div class="plus-sign">+</div>
        <div class="objects-display">
            <img src="/images/car.png" width="30" height="30" alt="Car" />
            <img src="/images/car.png" width="30" height="30" alt="Car" />
            <img src="/images/car.png" width="30" height="30" alt="Car" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Multiple Choice Addition
**RANDOMIZE**: Pick ONE object + addition problem (total ≤10) + answer choices (correct + 2 wrong)

**Question format**: "{X} + {Y} = ?"

**Wrong answer strategy**:
- One answer: correct - 1
- One answer: correct + 1
- Randomize A/B/C positions

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> 3 + 4 = ?</p>
    <div class="addition-visual">
        <div class="objects-display">
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        </div>
        <div class="plus-sign">+</div>
        <div class="objects-display">
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        </div>
    </div>
    <div class="choice-boxes">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-number">6</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-number">7</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="choice-number">8</p>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.addition-groups,.story-images,.combining-display{display:flex;gap:15px;justify-content:center;align-items:center;margin:12px 0;}
.objects-display{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:140px;}
.plus-sign{font-size:35pt;font-weight:bold;color:#E53935;}
.one-more-display{display:flex;gap:10px;justify-content:center;align-items:center;margin:12px 0;}
.addition-visual{display:flex;gap:15px;justify-content:center;align-items:center;margin:12px 0;}
.choice-boxes{display:flex;gap:20px;justify-content:center;margin-top:15px;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:60px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.choice-number{font-size:20pt;font-weight:bold;margin:0;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Total, e.g., "5"]</p>
        <p><strong>2.</strong> [Total, e.g., "7"]</p>
        <p><strong>3.</strong> [1 more, e.g., "6"]</p>
        <p><strong>4.</strong> [Total count, e.g., "7"]</p>
        <p><strong>5.</strong> [Letter and answer, e.g., "B (7)"]</p>
    </div>
</div>
```
