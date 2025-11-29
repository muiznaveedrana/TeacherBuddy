# Ages 4-5: Number Recognition

**{{questionCount}} questions (1-10 range). 5 types, 1 each, EXACT ORDER below.**

## Objects & Assets
**Core:** apple,banana,orange,strawberry,grape,cookie,cupcake,star,heart,circle,square,ball,car,doll,flower,butterfly,book
**Ten-Frame Only:** apple,orange,strawberry,grape,cookie,cupcake,circle,square,heart,star,sun,moon,ball
**Image:** `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## 5 Question Types (EXACT ORDER)

**Q1 - Number Tracing & Writing:** "Trace the number, then write it on the line."
- Show number large (48px, gray dashed border): `.trace-number`
- Below: "Write it here:" + `<span class="answer-line"></span>`
- Answer: the number shown

**Q2 - Subitizing (Dice Dots):** "How many dots?"
- Use `.dice-box` (3x3 grid) with `.dot` circles in standard dice patterns
- Patterns: 1=center, 2=diagonal, 3=diagonal, 4=corners, 5=corners+center, 6=two columns
- Below: "There are ___ dots."
- Answer: the count

**Q3 - Ten Frame:** "Count the {objects} in the ten frame."
- Use `.ten-frame` with `.frame-row` and `.frame-cell`
- Show 1-10 objects in 2×5 grid. Use ONLY Ten-Frame objects.
- Below: "There are ___ {objects}."
- Answer: the count

**Q4 - Number Word Match:** "Match each number to its word."
- Show 3 rows, each with: number → answer blank
- FIRST ROW is example (pre-filled with green background + checkmark)
- Remaining 2 rows: child writes the word
- NO "example done for you" text. NO word bank.
- Example row: `<div class="match-word" style="background:#d4edda;border-color:#28a745">four ✓</div>`
- Answer rows: `<div class="match-answer"></div>` (blank line)
- Answer key: only the 2 answers child writes (e.g., "7-seven, 2-two")

**Q5 - Count & Circle:** "Which group has X {objects}? Write the letter."
- Use `.count-groups` grid (2x2), each group in `.count-group` box
- Label groups A,B,C,D with different quantities (spread by ±2-3)
- Below: "Answer: ___"
- Answer: the letter (A/B/C/D)

## Style
Backgrounds (Q1-5): #FFF9C4,#F1F8E9,#E3F2FD,#FCE4EC,#FFF3E0
All text: BLACK, 16pt base

## CSS
```css
<style>body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}.worksheet-header{text-align:center;margin-bottom:20px}.worksheet-title{font-size:24pt;font-weight:bold;margin:0}.worksheet-details{font-size:12pt;color:#666;margin-top:5px}.question{margin:8px 0;padding:10px;border-radius:8px}.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}.trace-number{font-size:48pt;color:#ccc;letter-spacing:8px;text-align:center;margin:10px 0;font-family:'Comic Sans MS',cursive;border:3px dashed #ccc;padding:10px 20px;border-radius:10px;display:inline-block}.dice-box{width:80px;height:80px;background:#fff;border:3px solid #333;border-radius:12px;display:inline-grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);padding:8px;margin:10px auto;gap:2px}.dot{width:14px;height:14px;background:#333;border-radius:50%;margin:auto}.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px}.frame-row{display:flex;gap:4px;margin-bottom:4px}.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;background:#fff;display:flex;align-items:center;justify-content:center}.frame-cell img{width:22px;height:22px}.matching-row{display:flex;align-items:center;justify-content:center;gap:15px;margin:8px 0}.match-num{font-size:20pt;font-weight:bold;padding:6px 12px;background:#fff;border:2px solid #333;border-radius:8px;min-width:40px;text-align:center}.match-word{font-size:14pt;padding:6px 12px;background:#fff;border:2px solid #333;border-radius:8px;min-width:70px;text-align:center}.match-arrow{font-size:18pt}.match-answer{border-bottom:3px solid #333;min-width:100px;display:inline-block;text-align:center;height:30px}.count-groups{display:grid;grid-template-columns:1fr 1fr;gap:15px;max-width:420px;margin:10px auto}.count-group{padding:12px;border:2px solid #ddd;border-radius:8px;text-align:center;background:#fff}.group-label{font-size:16pt;font-weight:bold;margin-bottom:8px}.objects-row{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:90px;margin:0 auto}.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:32px;margin-top:8px}.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-inside:avoid}.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px;text-align:center}.answer-key-content p{font-size:12pt;margin:6px 0}</style>
```

## Interactive Mode Compatibility
- All answers use `<span class="answer-line"></span>` (no text inside)
- Q4 uses `<div class="match-answer"></div>` for blank lines
- Parser detects these patterns for input fields

## Answer Key
```html
<div class="answer-key"><h2 class="answer-key-title">Answer Key</h2><div class="answer-key-content"><p><strong>1.</strong> [Number]</p><p><strong>2.</strong> [Count]</p><p><strong>3.</strong> [Count]</p><p><strong>4.</strong> [Only child's answers: 7-seven, 2-two]</p><p><strong>5.</strong> [Letter]</p></div></div>
```
