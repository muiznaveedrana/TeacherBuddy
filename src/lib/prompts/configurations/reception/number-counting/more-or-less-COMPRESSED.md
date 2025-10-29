# Reception: More/Less Comparison - COMPRESSED

**Generate EXACTLY {{questionCount}} questions. Range: 1-10.**

## Image Rules
`<img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="50" height="50" alt="{Object}" />`
NO text labels - images ONLY.

## Comparison Requirements
- Min 2-3 object difference between groups (clear visual)
- Terms: "more", "fewer", "most", "fewest"
- Groups labeled (A/B or child names)

## Question Progression (5-question format)
1. Which has MORE? (2 groups)
2. Which has FEWER? (2 groups)
3. Who has the MOST? (3 groups with names)
4. Count and compare - which has MORE?
5. Real-world scenario - who has FEWER?

## Objects (67) - DIFFERENT per question
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

## Child Names
**Boys**: Ben, Sam, Jack, Oliver, Noah, Harry, Leo, Ethan
**Girls**: Emma, Lily, Sophie, Ava, Mia, Isla, Grace, Ella

## Output - 2-Group
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which group has MORE apples?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">Group A</span>
            <div class="objects-display">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
                <!-- Repeat 3x -->
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Group B</span>
            <div class="objects-display">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
                <!-- Repeat 7x -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">Circle: <span class="answer-choice">Group A</span> or <span class="answer-choice">Group B</span></p>
</div>
```

## Output - 3-Group
Use `.three-way-comparison` with three `.comparison-group` divs (child names).

**Backgrounds (rotate)**: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0
