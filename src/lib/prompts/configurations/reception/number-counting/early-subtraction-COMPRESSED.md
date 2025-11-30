# Ages 4-5: Early Subtraction

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

## Subtraction Range
- Start: 3-10 objects
- Take away: 1-5 objects (never more than starting number)
- Result: minimum 1 (never subtract ALL)
- Use DIFFERENT objects for each question
- Use cross-out (❌) or strikethrough to show removed objects

## 5 Question Types (EXACT ORDER)
**Q1 - Cross Out Subtraction**: "Cross out X. How many left?" Visual with objects to cross
**Q2 - Story Subtraction**: "{Name} had X, gave Y away. How many left?"
**Q3 - 1 Less**: "What is 1 less than X?" Show X objects
**Q4 - Taking Away**: "Take away X from this group." Show objects, some crossed out
**Q5 - Multiple Choice Subtraction**: Visual subtraction with 3 answer choices (A/B/C)

## Q1 - Cross Out Subtraction
**RANDOMIZE**: Pick ONE object + starting quantity (5-8) + quantity to cross out (2-3) + ONE question variation

**Question Variations** (pick ONE):
- "Cross out {X} {objects}. How many are left?"
- "Cross out {X}. Count what's left."
- "Take away {X} {objects}. How many now?"
- "Cross out {X} {objects}. How many remain?"

**Visual**: Show ALL objects, indicate which to cross out (use ❌ or red strikethrough in answer key)

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Cross out 3 apples. How many are left?</p>
    <div class="crossout-display">
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
        <img src="/images/apple.png" width="30" height="30" alt="Apple" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Story Subtraction
**RANDOMIZE**: Pick ONE name + ONE object + quantities + ONE story variation

**Story Variations** (pick ONE):
- "{Name} had {X} {objects}. {Name} gave away {Y}. How many left?"
- "{Name} has {X} {objects}. {Y} fly away. How many now?"
- "{Name} picked {X} {objects}. {Name} ate {Y}. How many are left?"
- "{Name} found {X} {objects}. {Name} lost {Y}. How many does {Name} have now?"

**Visual**: Show starting objects, then crossed-out objects (or show remaining objects)

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Emma had 8 flowers. Emma gave away 3. How many flowers does Emma have left?</p>
    <div class="story-subtraction">
        <div class="objects-display">
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            <img src="/images/flower.png" width="30" height="30" alt="Flower" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - 1 Less
**RANDOMIZE**: Pick ONE object + starting number (3-10) + ONE question variation

**Question Variations** (pick ONE):
- "What is 1 less than {X}?"
- "Take away 1. What number do you get?"
- "What number is 1 before {X}?"
- "Count back 1 from {X}. What number?"

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> What is 1 less than 7?</p>
    <div class="one-less-display">
        <div class="objects-display">
            <img src="/images/star.png" width="30" height="30" alt="Star" />
            <img src="/images/star.png" width="30" height="30" alt="Star" />
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

## Q4 - Taking Away (With Crossed Objects)
**RANDOMIZE**: Pick ONE object + quantities + ONE question variation

**Question Variations** (pick ONE):
- "Count the {objects} that are NOT crossed out."
- "How many {objects} are left?"
- "Some {objects} are crossed out. How many remain?"
- "How many {objects} do you see without an X?"

**Visual**: Show objects with some already crossed out using wrapper div with X mark

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Count the cars that are NOT crossed out.</p>
    <div class="takeaway-display">
        <img src="/images/car.png" width="30" height="30" alt="Car" />
        <div class="crossed-item"><img src="/images/car.png" width="30" height="30" alt="Car" /><span class="cross-mark">✕</span></div>
        <img src="/images/car.png" width="30" height="30" alt="Car" />
        <div class="crossed-item"><img src="/images/car.png" width="30" height="30" alt="Car" /><span class="cross-mark">✕</span></div>
        <img src="/images/car.png" width="30" height="30" alt="Car" />
        <img src="/images/car.png" width="30" height="30" alt="Car" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Multiple Choice Subtraction
**RANDOMIZE**: Pick ONE object + subtraction problem + answer choices (correct + 2 wrong)

**Question format**: "{X} - {Y} = ?"

**Wrong answer strategy**:
- One answer: correct - 1 (if possible)
- One answer: correct + 1
- Randomize A/B/C positions

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> 6 - 2 = ?</p>
    <div class="subtraction-visual">
        <div class="objects-display">
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        </div>
    </div>
    <div class="choice-boxes">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-number">3</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-number">4</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="choice-number">5</p>
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
.crossout-display,.takeaway-display{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:15px 0;max-width:300px;margin-left:auto;margin-right:auto;}
.story-subtraction{display:flex;gap:15px;justify-content:center;align-items:center;margin:12px 0;}
.objects-display{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:140px;}
.minus-sign{font-size:35pt;font-weight:bold;color:#E53935;}
.one-less-display{display:flex;gap:10px;justify-content:center;align-items:center;margin:12px 0;}
.subtraction-visual{display:flex;gap:15px;justify-content:center;align-items:center;margin:12px 0;}
.crossed-item{position:relative;display:inline-block;}
.crossed-item img{opacity:0.4;}
.cross-mark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:24px;color:#E53935;font-weight:bold;}
.choice-boxes{display:flex;gap:20px;justify-content:center;margin-top:15px;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:60px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.choice-number{font-size:20pt;font-weight:bold;margin:0;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
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
        <p><strong>1.</strong> [Remaining count, e.g., "4"]</p>
        <p><strong>2.</strong> [Answer, e.g., "5"]</p>
        <p><strong>3.</strong> [1 less, e.g., "6"]</p>
        <p><strong>4.</strong> [Count not crossed, e.g., "4"]</p>
        <p><strong>5.</strong> [Letter and answer, e.g., "B (4)"]</p>
    </div>
</div>
```
