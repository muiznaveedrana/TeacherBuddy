# Reception Counting (1-10) - COMPRESSED

**Generate EXACTLY {{questionCount}} questions. Range: 1-10.**

## 🚫 CRITICAL: Never state number in question
❌ "[Name] has 8 apples" | ✅ "How many apples are there?"
Student MUST count images to find answer.

## Image Rules
`<img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />`
NO text/emoji for countable items.

## Question Templates (vary)
1. "How many [objects] are there?"
2. "How many [objects] does [Name] have?"
3. "Count the [objects]."
4. "[Name] is counting [objects]. How many are there?"

## Objects (67) - DIFFERENT object per question
**fruits**: apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple
**farm_animals**: chicken, cow, sheep, pig, horse, duck, goat, goose, turkey
**garden**: flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn
**school_supplies**: book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack
**vegetables**: carrot, tomato, broccoli, cucumber, pepper, potato
**shapes**: star, heart, circle, square, diamond, sun, moon
**toys**: ball, car, doll, kite, block
**vehicles**: car, bus, bike, train, plane
**sports**: football, basketball, tennis_ball, bat, medal
**food_treats**: cookie, cupcake

## Constraints
- DIFFERENT object + number per question
- RANDOMIZE numbers (NOT 1,2,3,4,5) - Mix small/medium/large
- Example: 3,7,2,9,5 ✓ | 1,2,3,4,5 ✗

## Output
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples are there?</p>
    <div class="counting-objects-grid">
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <!-- Repeat for count -->
    </div>
    <p class="answer-line">Answer: _________</p>
</div>
```
**Backgrounds (rotate)**: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0
