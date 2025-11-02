# Reception: More/Less Comparison - COMPRESSED

**Generate EXACTLY {{questionCount}} questions. Range: 1-10.**

## Image Rules
`<img src="/images/{object}.png" width="50" height="50" alt="{Object}" />`

## Objects (67) - Use DIFFERENT per question
**fruits**: apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple | **farm_animals**: chicken, cow, sheep, pig, horse, duck, goat, goose, turkey | **garden**: flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn | **school_supplies**: book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack | **vegetables**: carrot, tomato, broccoli, cucumber, pepper, potato | **shapes**: star, heart, circle, square, diamond, sun, moon | **toys**: ball, car, doll, kite, block | **vehicles**: car, bus, bike, train, plane | **sports**: football, basketball, tennis_ball, bat, medal | **food_treats**: cookie, cupcake

**Child Names** - Boys: Ben, Sam, Jack, Oliver, Noah, Harry, Leo, Ethan | Girls: Emma, Lily, Sophie, Ava, Mia, Isla, Grace, Ella

## Question Progression (5-question format)
1. Which has MORE? (2 groups, 2-3 object difference)
2. Which has FEWER? (2 groups, 2-3 object difference)
3. Who has the MOST? (3 groups with child names)
4. Count and compare - which has MORE?
5. Real-world scenario - who has FEWER?

## Output Templates
**Backgrounds (rotate)**: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0
**2-Group:** Use `.comparison-container` with two `.comparison-group` divs (labeled A/B)
**3-Group:** Use `.three-way-comparison` with three `.comparison-group` divs (child names)

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;margin:6px 0;font-weight:600;}
.comparison-container,.three-way-comparison{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;margin:20px 0;}
.comparison-group{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:150px;}
.group-label{font-size:14pt;font-weight:bold;margin-bottom:10px;display:block;}
.objects-display{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0;}
.answer-prompt{font-size:14pt;margin:15px 0;text-align:center;font-weight:600;}
.answer-choice{padding:8px 15px;border:2px solid #333;border-radius:8px;background:#FFF9C4;display:inline-block;margin:0 10px;}
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
        <p><strong>1.</strong> [Group/Name with more, e.g., "Group B"]</p>
        <p><strong>2.</strong> [Group/Name with fewer, e.g., "Group A"]</p>
        <p><strong>3.</strong> [Name with most, e.g., "Emma"]</p>
        <p><strong>4.</strong> [Group/Name with more, e.g., "Group B"]</p>
        <p><strong>5.</strong> [Name with fewer, e.g., "Jack"]</p>
    </div>
</div>
```
