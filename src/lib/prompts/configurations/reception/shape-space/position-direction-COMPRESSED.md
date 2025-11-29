# Ages 4-5: Position and Direction

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Positional Words (Reception Level)
**Basic positions**: on, under, above, below, next to, beside, between, in, inside, outside, in front of, behind
**Directional**: left, right, up, down, top, bottom, middle

## Objects & Scenes
**furniture**: table, chair, bed, box, basket, shelf
**animals**: cat, dog, bird, rabbit, mouse, duck, chicken, pig, cow, sheep
**toys**: ball, doll, car, block, kite, teddy
**outdoor**: tree, flower, house, fence, gate, bush
**everyday**: book, apple, cup, hat, bag
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava,Noah,Mia
**Image**: `<img src="/images/{object}.png" width="40" height="40" alt="{Object}" />`

## 5 Question Types (EXACT ORDER)
**Q1 - Where is it?**: "Where is the {object}?" Multiple choice (A/B/C) with position words
**Q2 - What's on/under?**: "What is {position} the {object}?" Identify the object
**Q3 - Between**: "What is between X and Y?" Show 3+ objects in a row
**Q4 - Left or Right**: "What is on the {left/right}?" Simple scene with 2 sides
**Q5 - Follow Directions**: "Put X on the {position}." Draw or circle instruction

## Q1 - Where Is It? (Multiple Choice)
**RANDOMIZE**: Pick ONE scene setup + ONE position + ONE question variation

**Position choices for Q1** (pick ONE): on, under, next to, inside, behind

**Question Variations** (pick ONE):
- "Where is the {object}?"
- "Find the {object}. Where is it?"
- "Where can you see the {object}?"
- "Look at the {object}. Where is it?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Where is the cat?</p>
    <div class="position-scene">
        <div class="scene-container">
            <img src="/images/table.png" width="80" height="60" alt="Table" style="position:relative;" />
            <img src="/images/cat.png" width="40" height="40" alt="Cat" style="position:absolute;top:-30px;left:40px;" />
        </div>
    </div>
    <div class="choice-boxes">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-text">On the table</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-text">Under the table</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="choice-text">Next to the table</p>
        </div>
    </div>
</div>
```

## Q2 - What's At This Position?
**RANDOMIZE**: Pick ONE main object + items at different positions + ONE question variation

**Position used** (pick ONE): on, under, above, below, next to, behind

**Question Variations** (pick ONE):
- "What is {position} the {object}?"
- "What can you see {position} the {object}?"
- "Find what is {position} the {object}."
- "Look {position} the {object}. What is there?"

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> What is under the chair?</p>
    <div class="position-scene-vertical">
        <div class="above-item">
            <img src="/images/hat.png" width="40" height="40" alt="Hat" />
        </div>
        <div class="main-item">
            <img src="/images/chair.png" width="60" height="60" alt="Chair" />
        </div>
        <div class="below-item">
            <img src="/images/ball.png" width="40" height="40" alt="Ball" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Between Objects
**RANDOMIZE**: Pick 3-5 objects in a row + ONE question variation

**Question Variations** (pick ONE):
- "What is between the {object1} and the {object2}?"
- "Which {object} is in the middle?"
- "Find what is between {object1} and {object2}."
- "What sits between {object1} and {object2}?"

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> What is between the apple and the book?</p>
    <div class="between-scene">
        <img src="/images/apple.png" width="40" height="40" alt="Apple" />
        <img src="/images/ball.png" width="40" height="40" alt="Ball" />
        <img src="/images/book.png" width="40" height="40" alt="Book" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Left or Right
**RANDOMIZE**: Pick 2-4 objects on each side + ONE question variation

**Question Variations** (pick ONE):
- "What is on the left?"
- "What is on the right?"
- "Find the object on the left side."
- "What can you see on the right?"

**CRITICAL**: Draw a clear vertical line in the middle to separate left and right

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> What is on the right?</p>
    <div class="left-right-scene">
        <div class="left-side">
            <img src="/images/dog.png" width="40" height="40" alt="Dog" />
            <img src="/images/cat.png" width="40" height="40" alt="Cat" />
        </div>
        <div class="center-line"></div>
        <div class="right-side">
            <img src="/images/bird.png" width="40" height="40" alt="Bird" />
            <img src="/images/duck.png" width="40" height="40" alt="Duck" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Follow Directions (Drawing Task)
**RANDOMIZE**: Pick ONE scene + ONE instruction + ONE question variation

**Instructions** (pick ONE type):
- "Draw a {object} {position} the {main_object}."
- "Circle the {object} that is {position} the {main_object}."
- "Put a tick (✓) on the {object} {position} the {main_object}."
- "Draw a line under the {object} on the {left/right}."

**Positions used**: on, under, next to, above, left, right

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Draw a star above the house.</p>
    <div class="direction-scene">
        <div class="scene-space" style="height:80px;border:2px dashed #ccc;border-radius:8px;position:relative;">
            <img src="/images/house.png" width="60" height="50" alt="House" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);" />
        </div>
    </div>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.position-scene,.direction-scene{margin:20px auto;text-align:center;max-width:400px;}
.scene-container{position:relative;display:inline-block;margin:20px;}
.position-scene-vertical{display:flex;flex-direction:column;align-items:center;gap:15px;margin:20px auto;}
.above-item,.main-item,.below-item{text-align:center;}
.between-scene{display:flex;gap:30px;justify-content:center;align-items:center;margin:20px auto;}
.left-right-scene{display:flex;justify-content:center;align-items:center;gap:30px;margin:20px auto;}
.left-side,.right-side{display:flex;flex-direction:column;gap:15px;padding:15px;min-width:100px;align-items:center;}
.center-line{width:3px;height:120px;background:#333;border-radius:2px;}
.scene-space{width:300px;margin:0 auto;}
.choice-boxes{display:flex;gap:15px;justify-content:center;margin-top:15px;flex-wrap:wrap;}
.choice-box{padding:12px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:120px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.choice-text{font-size:14pt;margin:0;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:150px;height:28px;margin-left:10px;margin-top:8px;}
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
        <p><strong>1.</strong> [Letter and position, e.g., "A (On the table)"]</p>
        <p><strong>2.</strong> [Object name, e.g., "Ball"]</p>
        <p><strong>3.</strong> [Object between, e.g., "Ball"]</p>
        <p><strong>4.</strong> [Objects on that side, e.g., "Bird and duck"]</p>
        <p><strong>5.</strong> [Check drawing placement, e.g., "Star drawn above house"]</p>
    </div>
</div>
```
