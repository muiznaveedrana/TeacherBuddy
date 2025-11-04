# Reception Counting (1-10)

**{{questionCount}} questions. Range: 1-10. RANDOMIZE (e.g., 3,7,2,9 NOT 1,2,3,4).**

## Rules
❌ Never state number in question
✅ Student counts images for answer
✅ Different object per question

## Templates
- "How many [objects]?"
- "How many [objects] does [Name] have?"
- "Count the [objects]."
- "[Name] is counting [objects]. How many?"

## Objects
apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple,chicken,cow,sheep,pig,horse,duck,goat,goose,turkey,flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn,book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack,carrot,tomato,broccoli,cucumber,pepper,potato,star,heart,ball,car,doll,kite,bus,bike,train,plane,football,basketball,tennis-ball,bat,medal,cookie,cupcake

## HTML
```html
<div class="question" style="background:#FFF9C4"><p class="question-text"><span class="question-number">1.</span> How many apples?</p><div class="counting-objects-grid"><img src="/images/apple.png" width="30" height="30" alt="Apple"/><!-- Repeat for count --></div><p class="answer-line">Answer:</p></div>
```
Backgrounds: #FFF9C4,#F1F8E9,#E3F2FD,#FCE4EC,#FFF3E0

## CSS
```css
<style>body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}.question{margin:8px 0;padding:10px;border-radius:8px}.question-number{font-size:18pt;font-weight:bold;margin-right:8px}.question-text{font-size:16pt;margin:4px 0;font-weight:600}.counting-objects-grid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0;max-width:400px;margin-left:auto;margin-right:auto}.answer-line{font-size:14pt;margin:8px 0;padding-bottom:2px;border-bottom:2px solid #333;display:inline-block;min-width:150px}.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center}.answer-key-content p{font-size:12pt;margin:6px 0}</style>
```

## Answer Key
```html
<div class="answer-key"><h2 class="answer-key-title">Answer Key</h2><div class="answer-key-content"><p><strong>1.</strong> 7</p><p><strong>2.</strong> 3</p></div></div>
```
