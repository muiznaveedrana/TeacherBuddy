# Ages 4-5: Number Recognition

**{{questionCount}} questions (1-10 range). 5 types, 1 each, EXACT ORDER below.**

## Objects & Assets
**Core:** apple,banana,orange,strawberry,grape,cookie,cupcake,star,heart,circle,square,ball,car,doll,flower,butterfly,book,pencil
**Ten-Frame Only:** apple,orange,strawberry,grape,cookie,cupcake,circle,square,heart,star,diamond,sun,moon,ball,football,basketball,tennis_ball,block,eraser
**Names:** Emma,Ben,Sam,Lily,Oliver,Sophie,Jack,Mia
**Image:** `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## 5 Question Types (EXACT ORDER)
**Q1 - Number Display:** Show number (22px, green), child writes it
**Q2 - Multiple Choice:** "Which group has X {objects}?" 3 groups (A/B/C), DIFFERENT counts (±2 min). 2-column grid
**Q3 - Ten Frame:** "Count the {objects}" Show 1-10 objects in 2×5 grid. Use ONLY Ten-Frame objects above
**Q4 - Story:** "{Name} has some {objects}. How many?" Use "some" NOT number. Show images 2-column grid
**Q5 - Matching:** Show 2 numbers (horizontal), then 4 groups (vertical stack). Match numbers to correct groups. HTML: `.numbers-row` then `.groups-grid`

## Style
Backgrounds (Q1-5): #FFF9C4,#F1F8E9,#E3F2FD,#FCE4EC,#FFF3E0
Q1 number: 22px green (#4CAF50)
All text: BLACK, 16pt base

## CSS
```css
<style>body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}.question{margin:8px 0;padding:10px;border-radius:8px}.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}.display-number{font-size:22pt;font-weight:bold;text-align:center;margin:5px 0;color:#4CAF50}.choice-groups,.story-images{display:grid;grid-template-columns:1fr 1fr;gap:15px;max-width:400px;margin:0 auto}.choice-group{padding:10px;border:2px solid #ddd;border-radius:8px;text-align:center}.choice-label{font-size:14pt;font-weight:bold;margin-bottom:8px}.objects-display{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:75px;margin:0 auto}.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px}.frame-row{display:flex;gap:4px;margin-bottom:4px}.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:#fff;display:flex;align-items:center;justify-content:center}.frame-cell img{width:18px;height:18px}.matching-activity{max-width:450px;margin:20px auto}.numbers-row{display:flex;gap:20px;justify-content:center;margin-bottom:15px}.match-number{font-size:24pt;font-weight:bold;padding:8px 15px;background:#FFF9C4;border:2px solid #333;border-radius:8px;min-width:60px}.groups-grid{display:grid;grid-template-columns:1fr;gap:12px;max-width:300px;margin:0 auto}.match-group{display:flex;flex-wrap:wrap;gap:3px;padding:6px;border:2px solid #ddd;border-radius:6px;justify-content:center;min-height:50px}.answer-line{border-bottom:2px solid #333;display:inline-block;min-width:150px;margin-left:10px}.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px;text-align:center}.answer-key-content p{font-size:12pt;margin:6px 0}</style>
```

## Answer Key
```html
<div class="answer-key"><h2 class="answer-key-title">Answer Key</h2><div class="answer-key-content"><p><strong>1.</strong> [Number]</p><p><strong>2.</strong> [Letter]</p><p><strong>3.</strong> [Count]</p><p><strong>4.</strong> [Count]</p><p><strong>5.</strong> [Pairs: 3→B, 7→D]</p></div></div>
```
