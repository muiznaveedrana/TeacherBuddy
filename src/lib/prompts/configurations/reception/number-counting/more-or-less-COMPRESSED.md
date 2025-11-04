# Reception: More/Less Comparison

**{{questionCount}} questions (1-10 range). Use DIFFERENT object per question.**

## Objects & Assets
**fruits**: apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple
**farm_animals**: chicken,cow,sheep,pig,horse,duck,goat,goose,turkey
**garden**: flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn
**school**: book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack
**vegetables**: carrot,tomato,broccoli,cucumber,pepper,potato
**shapes**: star,heart,circle,square,diamond,sun,moon
**toys**: ball,car,doll,kite,block
**vehicles**: bus,bike,train,plane
**sports**: football,basketball,tennis_ball,bat,medal
**treats**: cookie,cupcake
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## 5 Question Types (EXACT ORDER)
**Q1 - Which has more?** 2 groups (A/B), 2-3 object difference
**Q2 - Which has fewer?** 2 groups (A/B), 2-3 object difference
**Q3 - Who has the most?** 3 groups with child names
**Q4 - Count & compare (more)** 2 groups (A/B)
**Q5 - Real scenario (fewer)** 3 groups with child names

## Style
Backgrounds (Q1-5): #FFF9C4,#F1F8E9,#E3F2FD,#FCE4EC,#FFF3E0
All text: BLACK, 16pt base
2-Group: `.comparison-container` + `.comparison-group` (A/B labels)
3-Group: `.three-way-comparison` + `.comparison-group` (names)

## CSS
```css
<style>body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}.question{margin:8px 0;padding:10px;border-radius:8px}.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}.comparison-container,.three-way-comparison{display:flex;gap:15px;justify-content:center;flex-wrap:wrap;margin:12px 0}.comparison-group{padding:12px;border:2px solid #ddd;border-radius:8px;text-align:center;min-width:120px}.group-label{font-size:14pt;font-weight:bold;margin-bottom:8px;display:block}.objects-display{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:8px 0;max-width:150px}.answer-prompt{font-size:14pt;margin:10px 0;text-align:center;font-weight:600}.answer-choice{padding:6px 12px;border:2px solid #333;border-radius:6px;background:#FFF9C4;display:inline-block;margin:0 8px}.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px;text-align:center}.answer-key-content p{font-size:12pt;margin:6px 0}</style>
```

## Answer Key
```html
<div class="answer-key"><h2 class="answer-key-title">Answer Key</h2><div class="answer-key-content"><p><strong>1.</strong> [Group with more, e.g., "B"]</p><p><strong>2.</strong> [Group with fewer, e.g., "A"]</p><p><strong>3.</strong> [Name with most, e.g., "Emma"]</p><p><strong>4.</strong> [Group with more, e.g., "B"]</p><p><strong>5.</strong> [Name with fewer, e.g., "Jack"]</p></div></div>
```
