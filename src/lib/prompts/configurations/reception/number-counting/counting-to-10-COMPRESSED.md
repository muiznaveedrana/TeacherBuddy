# Reception Counting (1-10)

**Generate {{questionCount}} questions. Range: 1-10. RANDOMIZE numbers (3,7,2,9 NOT 1,2,3,4).**

## Rules
- ❌ NEVER state number in question (e.g., "has 8 apples")
- ✅ Student counts images to find answer
- Use DIFFERENT object per question

## Templates
1. "How many [objects] are there?"
2. "How many [objects] does [Name] have?"
3. "Count the [objects]."
4. "[Name] is counting [objects]. How many are there?"

## Objects (use ANY from /images/)
apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple, chicken, cow, sheep, pig, horse, duck, goat, goose, turkey, flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn, book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack, carrot, tomato, broccoli, cucumber, pepper, potato, star, heart, ball, car, doll, kite, bus, bike, train, plane, football, basketball, tennis_ball, bat, medal, cookie, cupcake

## HTML Template
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples are there?</p>
    <div class="counting-objects-grid">
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <!-- Repeat for count -->
    </div>
    <p class="answer-line">Answer:</p>
</div>
```
**Backgrounds**: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;margin:6px 0;font-weight:600;}
.counting-objects-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:20px 0;}
.answer-line{font-size:14pt;margin:15px 0;padding-bottom:2px;border-bottom:2px solid #333;display:inline-block;min-width:150px;}
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
        <p><strong>1.</strong> 7</p>
        <p><strong>2.</strong> 3</p>
    </div>
</div>
```
