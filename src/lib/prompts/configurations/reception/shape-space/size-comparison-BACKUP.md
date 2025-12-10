# Ages 4-5: Size Comparison

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Rules
- **50% size difference minimum** (OBVIOUS differences for ages 4-5)
- **5 DIFFERENT categories** (NO repeats)
- **Real images only** (NO CSS shapes)
- **ALL questions**: Use SAME object type at different sizes (e.g., 3 apples NOT apple/banana/orange)
- **Q3-Q5**: Items MUST be SCRAMBLED (NOT small→medium→large order)
- **Answer areas**: Q1-Q3, Q5 use choice circles; Q4 uses drawing space for lines
- **TEXT CASE**: Use normal sentence case (only capitalize first word). Do NOT capitalize size comparison words (bigger, smaller, tallest, shortest, longest, most) - they should be lowercase

## Objects (67)
**fruits**: strawberry, apple, watermelon, pineapple, banana, orange | **toys**: ball, bear, block, doll | **farm_animals**: chicken, cow, sheep, pig, horse, duck | **vegetables**: carrot, tomato, cucumber, pepper, potato | **sports**: football, basketball, tennis_ball | **food_treats**: cookie, cupcake, icecream | **shapes**: star, heart, circle, square, diamond | **garden**: flower, tree, mushroom, leaf, butterfly | **school_supplies**: book, pencil, eraser, crayon, backpack | **vehicles**: car, bus, bike

**Path**: `/images/{object}.png`

## 5 Questions (Pick 5 DIFFERENT categories - VARY EACH WORKSHEET!)
1. **Which is bigger?** - RANDOMIZE: object + question wording
2. **Which is shorter?** - RANDOMIZE: object + question wording
3. **Which is longest?** - RANDOMIZE: object + question wording
4. **Size ordering** - RANDOMIZE: object + question wording
5. **Which is tallest/biggest?** - RANDOMIZE: object + question wording

## Q1 - Which is Bigger? (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object + ONE question variation

**Object Pool** (pick ONE from different category each time):
- **Fruits**: strawberry, apple, watermelon, banana, orange
- **Toys**: ball, bear, block, doll
- **Farm Animals**: chicken, cow, sheep, pig
- **Vegetables**: carrot, tomato, cucumber
- **Food Treats**: cookie, cupcake
- **School**: book, pencil, crayon
- **Garden**: flower, butterfly, leaf

**Question Variations** (pick ONE):
- "Which [object] is bigger?"
- "Which is the bigger [object]?"
- "Find the bigger [object]."
- "Point to the bigger [object]."

**Sizes**: 50px vs 100px (OBVIOUS 50% difference)

## Q2 - Which is Shorter? (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object (DIFFERENT from Q1) + ONE question variation

**Object Pool** (pick ONE from different category than Q1):
- **Vegetables**: carrot, cucumber
- **School**: pencil, crayon, book
- **Garden**: flower, tree, leaf
- **Toys**: doll, block, bear
- **Farm Animals**: duck, chicken, sheep

**Question Variations** (pick ONE):
- "Which [object] is shorter?"
- "Which is the shorter [object]?"
- "Find the shorter [object]."
- "Point to the shorter [object]."

**Sizes**: 55px vs 105px (OBVIOUS difference)

## Q3 - Which is Longest? (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object (DIFFERENT from Q1-Q2) + ONE question variation

**Object Pool** (pick ONE from different category):
- **Vegetables**: carrot, cucumber
- **School**: pencil, crayon, ruler
- **Farm Animals**: pig, cow, horse
- **Vehicles**: car, bus, bike
- **Food**: banana, carrot

**Question Variations** (pick ONE):
- "Which [object] is the longest?"
- "Which is the longest [object]?"
- "Find the longest [object]."
- "Which [object] is longest?"

**Sizes**: 3 objects SCRAMBLED (e.g., 70px/45px/95px) labeled Left/Middle/Right

## Q4 - Size Ordering (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object (DIFFERENT from Q1-Q3) + ONE question variation

**Object Pool** (pick ONE):
- **Toys**: block, ball, bear, doll
- **Fruits**: apple, strawberry, orange
- **Farm Animals**: chicken, duck, sheep
- **School**: book, pencil, eraser
- **Food Treats**: cookie, cupcake

**Question Variations** (pick ONE):
- "Can you put these [objects] in order from smallest to biggest? Draw lines to match."
- "Put these [objects] in order. Draw lines from smallest to biggest."
- "Match these [objects] to put them in size order."
- "Draw lines to show the [objects] from smallest to biggest."

**Sizes**: 3 objects SCRAMBLED (50px/75px/100px) - labels: Smallest/Medium/Biggest

## Q5 - Which is Tallest/Biggest? (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object (DIFFERENT from Q1-Q4) + ONE question variation

**Object Pool** (pick ONE):
- **Garden**: flower, tree, butterfly
- **Farm Animals**: cow, horse, pig, sheep
- **School**: book, backpack, pencil
- **Toys**: bear, doll, block
- **Fruits**: apple, banana, watermelon

**Question Variations** (pick ONE):
- "Which [object] is the tallest?"
- "Which [object] is the biggest?"
- "Find the tallest [object]."
- "Find the biggest [object]."
- "Which is the tallest [object]?"

**Sizes**: 3 objects SCRAMBLED (e.g., 80px/55px/105px) labeled Left/Middle/Right

## Templates

### Q1 Template (50px vs 100px) - WITH ANSWER BOXES
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which strawberry is bigger?</p>
    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/strawberry.png" width="50" height="50" alt="Small" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/strawberry.png" width="100" height="100" alt="Big" />
        </div>
    </div>
    <div class="answer-choices">
        <div class="choice-circle">Left</div>
        <div class="choice-circle">Right</div>
    </div>
</div>
```

## Q4 Template (Ordering) - WITH LINES TO DRAW
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Can you put these blocks in order from smallest to biggest? Draw lines to match.</p>
    <div class="ordering-activity">
        <div class="animals-unsorted">
            <div class="animal-box">
                <img src="/images/block.png" width="75" height="75" alt="Medium" />
            </div>
            <div class="animal-box">
                <img src="/images/block.png" width="50" height="50" alt="Small" />
            </div>
            <div class="animal-box">
                <img src="/images/block.png" width="100" height="100" alt="Large" />
            </div>
        </div>
        <div class="drawing-space"></div>
        <div class="size-labels">
            <div class="size-box">Smallest</div>
            <div class="size-box">Medium</div>
            <div class="size-box">Biggest</div>
        </div>
    </div>
</div>
```

## Q5 Template (3-way comparison) - WITH ANSWER BOXES
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which apple is the biggest?</p>
    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/apple.png" width="80" height="80" alt="Medium" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Middle</span>
            <img src="/images/apple.png" width="55" height="55" alt="Small" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/apple.png" width="105" height="105" alt="Large" />
        </div>
    </div>
    <div class="answer-choices">
        <div class="choice-circle">Left</div>
        <div class="choice-circle">Middle</div>
        <div class="choice-circle">Right</div>
    </div>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:12pt;padding:10px;}
.question{margin:5px 0;padding:6px;border-radius:5px;display:flex;flex-direction:column;}
.size-comparison-two,.size-comparison-three{display:flex;justify-content:center;align-items:flex-end;margin:8px auto;padding:10px;background:#f8f9ff;border:2px solid #4CAF50;border-radius:6px;max-width:300px;gap:20px;}
.comparison-item{text-align:center;}
.item-label{font-size:10pt;font-weight:bold;margin-bottom:4px;display:block;}
.ordering-activity{display:flex;justify-content:center;align-items:center;margin:8px auto;max-width:380px;gap:10px;}
.animals-unsorted,.size-labels{display:flex;flex-direction:column;gap:6px;}
.animal-box,.size-box{padding:6px;background:#fff;border:2px solid #ddd;border-radius:5px;text-align:center;min-width:60px;}
.size-box{font-weight:bold;background:#E3F2FD;padding:8px;font-size:9pt;}
.drawing-space{min-width:70px;height:130px;background:#fff;border:2px dashed #999;border-radius:5px;}
.ice-cream-comparison{display:flex;justify-content:center;align-items:flex-end;margin:8px auto;padding:10px;background:#FFF3E0;border:2px solid #FF9800;border-radius:6px;max-width:280px;}
.child-name{font-size:9pt;font-weight:bold;margin-bottom:3px;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-choices{display:flex;justify-content:center;gap:12px;margin-top:8px;}
.choice-circle{width:45px;height:45px;border:2px solid #333;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:bold;background:#fff;}
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
        <p><strong>1.</strong> [Position, e.g., "Right" (bigger object)]</p>
        <p><strong>2.</strong> [Position, e.g., "Left" (shorter object)]</p>
        <p><strong>3.</strong> [Position, e.g., "Middle" (longest object)]</p>
        <p><strong>4.</strong> [Ordering, e.g., "Medium block → Smallest, Small block → Medium, Large block → Biggest"]</p>
        <p><strong>5.</strong> [Position, e.g., "Right" (biggest/tallest object)]</p>
    </div>
</div>
```
