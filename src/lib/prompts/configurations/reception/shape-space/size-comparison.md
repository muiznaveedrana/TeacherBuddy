# Reception: Size Comparison

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Rules
- **50% size difference minimum** (Reception needs OBVIOUS differences)
- **5 DIFFERENT categories** (NO repeats)
- **Lowercase/title case** (NOT "BIGGER" but "bigger")
- **Real images only** (NO CSS shapes)
- **NO answer key**
- **MANDATORY**: ALL questions MUST have answer input areas:
  - Q1-Q3, Q5: Answer choice circles (see Q1 template)
  - Q4: Drawing space for lines to match (see Q4 template)
- **Q3, Q4, Q5 CRITICAL**: Items MUST be SCRAMBLED (NOT in small→medium→large order). Example orders: Medium/Small/Large, Large/Medium/Small, Large/Small/Medium
- **ALL QUESTIONS**: Use SAME object type at different sizes (e.g., 3 apples NOT apple/banana/orange, 3 cars NOT car/bus/bike)

## Objects (67)
**fruits**: strawberry, apple, watermelon, pineapple, banana, orange | **toys**: ball, bear, block, doll | **farm_animals**: chicken, cow, sheep, pig, horse, duck | **vegetables**: carrot, tomato, cucumber, pepper, potato | **sports**: football, basketball, tennis_ball | **food_treats**: cookie, cupcake, icecream | **shapes**: star, heart, circle, square, diamond | **garden**: flower, tree, mushroom, leaf, butterfly | **school_supplies**: book, pencil, eraser, crayon, backpack | **vehicles**: car, bus, bike

**Path**: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

## 5 Questions (Pick 5 DIFFERENT categories)
1. **Which is Bigger?** (2 objects, 50px vs 100px - OBVIOUS difference) + Answer choice circles
2. **Which is Shorter?** (2 objects, 55px vs 105px - OBVIOUS difference) + Answer choice circles
3. **Which is Longest?** (3 objects SCRAMBLED: e.g. 70px/45px/95px or 95px/70px/45px, labeled Left/Middle/Right) + Answer choice circles
4. **Size Ordering** (3 objects SCRAMBLED: 50px/75px/100px, labels: Smallest/Medium/Biggest) + Drawing space for lines
5. **Tallest/Biggest** (3 SAME objects SCRAMBLED: e.g. 80px/55px/105px or 105px/80px/55px, labeled Left/Middle/Right) + Answer choice circles

## Q1 Template (50px vs 100px) - WITH ANSWER BOXES
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which strawberry is bigger?</p>
    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Small" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="100" height="100" alt="Big" />
        </div>
    </div>
    <div class="answer-choices">
        <div class="choice-circle">Left</div>
        <div class="choice-circle">Right</div>
    </div>
</div>
```

## Q4 Template (Ordering) - WITH LINES TO DRAW
**CRITICAL**: Items MUST be in SCRAMBLED order (e.g., Medium/Smallest/Biggest OR Biggest/Medium/Smallest)
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Can you put these blocks in order from smallest to biggest? Draw lines to match.</p>
    <div class="ordering-activity">
        <div class="animals-unsorted">
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="75" height="75" alt="Medium" />
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="50" height="50" alt="Small" />
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="100" height="100" alt="Large" />
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
**CRITICAL**: Must use SAME object 3 times at different sizes + SCRAMBLED ORDER (NOT small/medium/large)
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which apple is the biggest?</p>
    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Medium" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Middle</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="55" height="55" alt="Small" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="105" height="105" alt="Large" />
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
.question{margin:5px 0;padding:6px;border-radius:5px;}
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
.answer-prompt{font-size:11pt;margin:5px 0;font-weight:600;text-align:center;}
.answer-choices{display:flex;justify-content:center;gap:12px;margin-top:8px;}
.choice-circle{width:45px;height:45px;border:2px solid #333;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:bold;background:#fff;}
</style>
```
