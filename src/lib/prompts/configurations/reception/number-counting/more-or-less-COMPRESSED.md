# Ages 4-5: More/Less Comparison

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Objects & Assets
**fruits**: apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple,blackberry,blueberry,cherries,raspberry
**farm_animals**: chicken,cow,sheep,pig,horse,duck,goat,goose,turkey,hen,rooster,cat,dog,puppy,kitten,bull,calf,lamb,piglet,duckling,chick
**wild_animals**: lion,tiger,zebra,giraffe,elephant,monkey,bear,fox,hippo,raccoon,squirrel,moose,skunk
**garden**: flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn,ant,ladybug,snail,sunflower
**school**: book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack,calculator,globe
**vegetables**: carrot,tomato,broccoli,cucumber,pepper,potato,asparagus,bean,celery,corn,lettuce,mushroom,onion,pea,radish,zucchini
**shapes**: star,heart,circle,square,diamond,triangle
**toys**: ball,car,doll,kite,block,teddy,teddy-bear,building-block,toy-car
**vehicles**: bus,bike,train,plane,boat,car,school-bus
**sports**: football,basketball,tennis-ball,baseball,soccer-ball,volleyball,bat,medal,racket
**treats**: cookie,cupcake,burger,pizza,donut,icecream
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava,Noah,Mia
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Comparison Range
- Numbers: 1-10 only (Reception appropriate)
- Clear difference: 2-3 objects minimum between groups
- Use DIFFERENT objects for each question

## 5 Question Types (EXACT ORDER)

**Q1 - Which has more?**: 2 groups (A/B), student types A or B
**Q2 - Which has fewer?**: 2 groups (A/B), student types A or B
**Q3 - Who has the most?**: 3 groups with child names, student types name
**Q4 - Count & compare (more)**: 2 groups (A/B), student types A or B
**Q5 - Real scenario (fewer)**: 3 groups with child names, student types name

## Q1 - Which has more?

**RANDOMIZE**: Pick ONE object + quantities (Group A: 3-5, Group B: 6-8) + ONE question variation

**Question Variations** (pick ONE):
- "Which group has more {objects}?"
- "Which has more {objects}, A or B?"
- "Look at the {objects}. Which group has more?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which group has more apples?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">A</span>
            <div class="objects-display">
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">B</span>
            <div class="objects-display">
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Which has fewer?

**RANDOMIZE**: Pick ONE object (different from Q1) + quantities + ONE question variation

**Question Variations** (pick ONE):
- "Which group has fewer {objects}?"
- "Which has fewer {objects}, A or B?"
- "Look at the {objects}. Which group has fewer?"

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which group has fewer flowers?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">A</span>
            <div class="objects-display">
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">B</span>
            <div class="objects-display">
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
                <img src="/images/flower.png" width="30" height="30" alt="Flower" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Who has the most?

**RANDOMIZE**: Pick 3 names + ONE object (different from Q1/Q2) + quantities (4, 7, 5 or similar) + ONE question variation

**Question Variations** (pick ONE):
- "Who has the most {objects}?"
- "Which child has the most {objects}?"
- "Look at the {objects}. Who has the most?"

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Who has the most stars?</p>
    <div class="three-way-comparison">
        <div class="comparison-group">
            <span class="group-label">Emma</span>
            <div class="objects-display">
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Jack</span>
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
        <div class="comparison-group">
            <span class="group-label">Ben</span>
            <div class="objects-display">
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Count & compare (more)

**RANDOMIZE**: Pick ONE object (different from Q1/Q2/Q3) + quantities + ONE question variation

**Question Variations** (pick ONE):
- "Count the {objects}. Which group has more?"
- "Which group has more {objects}?"
- "Count and compare. Which has more?"

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Count the cars. Which group has more?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">A</span>
            <div class="objects-display">
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">B</span>
            <div class="objects-display">
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
                <img src="/images/car.png" width="30" height="30" alt="Car" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Real scenario (fewer)

**RANDOMIZE**: Pick 3 names (different from Q3) + ONE object (different from all above) + real scenario + ONE question variation

**Question Variations** (pick ONE):
- "Who has the fewest {objects}?"
- "Which child has the fewest {objects}?"
- "Look at the {objects}. Who has the fewest?"

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Who has the fewest balls?</p>
    <div class="three-way-comparison">
        <div class="comparison-group">
            <span class="group-label">Lily</span>
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Oliver</span>
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Sophie</span>
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
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
.comparison-container,.three-way-comparison{display:flex;gap:15px;justify-content:center;flex-wrap:wrap;margin:12px 0;}
.comparison-group{padding:12px;border:2px solid #ddd;border-radius:8px;text-align:center;min-width:120px;}
.group-label{font-size:14pt;font-weight:bold;margin-bottom:8px;display:block;}
.objects-display{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0;max-width:150px;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center;}
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
        <p><strong>1.</strong> B</p>
        <p><strong>2.</strong> A</p>
        <p><strong>3.</strong> Jack</p>
        <p><strong>4.</strong> A</p>
        <p><strong>5.</strong> Oliver</p>
    </div>
</div>
```
