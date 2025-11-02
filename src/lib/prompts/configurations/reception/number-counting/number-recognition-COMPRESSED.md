# Reception: Number Recognition - COMPRESSED

**Generate EXACTLY {{questionCount}} questions. Range: 1-10. Format: 5 distinct types.**

## Image Rules
`<img src="/images/{object}.png" width="50" height="50" alt="{Object}" />`

## Objects (67)
**fruits**: apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple | **farm_animals**: chicken, cow, sheep, pig, horse, duck, goat, goose, turkey | **garden**: flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn | **school_supplies**: book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack | **toys**: ball, doll, kite, block | **vegetables**: carrot, tomato, broccoli, cucumber, pepper, potato | **sports**: football, basketball, tennis_ball, bat, medal | **food_treats**: cookie, cupcake | **shapes**: star, heart, circle, square, diamond, sun, moon | **vehicles**: car, bus, bike, train, plane

**Child Names**: Emma, Ben, Sam, Lily, Oliver, Sophie, Jack, Mia

## 5-Question Structure (REQUIRED ORDER)
1. **Number Display** - Show number (48px), student writes it
2. **Multiple Choice** - "Which group has X?" with 3 groups (A/B/C) with DIFFERENT counts
3. **Ten Frame** - Count objects in frame (ONLY compact objects: apple, orange, strawberry, grape, cookie, cupcake, circle, square, heart, star, diamond, sun, moon, ball, football, basketball, tennis_ball, block, eraser)
4. **Context Story** - Use "some" (NOT specific number) + show images
5. **Matching** - Connect 2 numbers to 4 picture groups (all DIFFERENT counts)

## Styling - MANDATORY
**Backgrounds:** Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**Question text:** BLACK
**Q1 number:** 48px font

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;margin:6px 0;font-weight:600;}
.display-number{font-size:48pt;font-weight:bold;text-align:center;margin:20px 0;color:#4CAF50;}
.choice-groups{display:flex;gap:20px;justify-content:center;flex-wrap:wrap;}
.choice-group{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:10px;}
.objects-display{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:150px;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:#fff;display:flex;align-items:center;justify-content:center;}
.frame-cell img{width:35px;height:35px;}
.matching-activity{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:500px;margin:20px auto;}
.numbers-column,.groups-column{display:flex;flex-direction:column;gap:20px;}
.match-number{font-size:32pt;font-weight:bold;padding:15px;background:#FFF9C4;border:3px solid #333;border-radius:12px;text-align:center;}
.match-group{display:flex;flex-wrap:wrap;gap:5px;padding:10px;border:3px solid #ddd;border-radius:12px;justify-content:center;max-width:120px;}
.answer-line{border-bottom:2px solid #333;display:inline-block;min-width:150px;margin-left:10px;}
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
        <p><strong>1.</strong> [Number shown, e.g., 7]</p>
        <p><strong>2.</strong> [Letter of correct group, e.g., B]</p>
        <p><strong>3.</strong> [Count in ten frame, e.g., 8]</p>
        <p><strong>4.</strong> [Number of objects in story, e.g., 5]</p>
        <p><strong>5.</strong> [Matching pairs, e.g., 3→3 apples, 9→9 stars]</p>
    </div>
</div>
```
