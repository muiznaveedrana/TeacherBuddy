# Ages 5-6: Length and Height

Gen {{questionCount}} Y1 measurement Qs. BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

**RULES**: NO cm/m! Non-standard units only (cubes/clips/hands/blocks). Check AVOID list (top of prompt). Each Q uses DIFFERENT object. Vocab: longer/shorter/taller/longest/shortest/tallest.

**IMAGES**: `/images/{object}.png` - pencil,crayon,ribbon,ruler,saw,paintbrush,wrench,caterpillar,snail,snake,banana,lemon,watermelon,scarf,book,train

**POOLS**: Names: Ben/Emma|Lily/Max|Sam/Zara|Ali/Maya|Leo/Mia|Jack/Ella. Numbers: Small 3-5|Med 6-8|Large 9-12 (MIX, no sequential!). Bars: Blue(#4A90E2,#357ABD)|Green(#50C878,#3DA75F)|Orange(#FF9500,#CC7700). Emoji: 📎 ONLY for Q5.

**Q-FORMAT**:
Q1(#FFF9C4): Visual compare. 1 obj, 2 sizes with class="compare-img". CRITICAL: Heights MUST be 70px vs 115px (45px difference minimum!). Size difference MUST be OBVIOUS to 4-year-olds! "Which [obj] LONGER/SHORTER?" Circle answer. Display side-by-side.
Q2(#E3F2FD): Measure cubes. 1 obj ≠Q1. Counts: small(caterpillar/snail/lemon)=5-6, med(banana/paintbrush)=7-8, large(saw/snake/wrench)=9-10. Img 80px + numbered cubes. "How many cubes long?"
Q3(#F1F8E9): Order 3 imgs same obj. Each img needs style="width:Xpx" where X is 120/200/280 scrambled. Or bars A/B/C. "Put 1,2,3. 1=shortest 3=longest" + boxes below.
Q4(#FCE4EC): Compare bars. Name pair. Obj: book/scarf/train. Unit: hands/blocks (NOT cubes). MIN 4 units, 3+ apart. 35px/unit. 👤 icons. Gradient bars. 25px margin-bottom between rows! "Whose [obj] LONGER/TALLER?"
Q5(#FFF3E0): Estimate+measure 📎. 1 obj ≠Q1/Q2. Counts: small=5-6, med=7-8, large=9-12 clips. Img 70px + 📎 ruler. "Estimate... Then count. My estimate:__ I measured:__"

**ALL 5 Qs = DIFFERENT objects!**

**EXAMPLES** (expand structure, vary objects):
Q2: `<div class="question" style="background:#E3F2FD"><p class="question-text"><span class="question-number">2.</span> How many cubes long is the saw?</p><div style="margin:15px 0"><img src="/images/saw.png" alt="saw" style="height:80px;display:block;margin-bottom:10px"><div class="unit-ruler"><div class="unit-cube">1</div>...<div class="unit-cube">9</div></div></div><p>The saw is <span class="answer-box"></span> cubes long.</p></div>`

Q4: `<div class="question" style="background:#FCE4EC"><p class="question-text"><span class="question-number">4.</span> 👤 Lily's scarf is 5 hands. 👤 Max's scarf is 9 hands. Whose LONGER?</p><div class="bar-row"><p>👤 Lily:</p><div class="measurement-bar" style="width:175px;background:linear-gradient(90deg,#4A90E2,#357ABD);border:3px solid #2C5F8D">5 hands</div></div><div class="bar-row"><p>👤 Max:</p><div class="measurement-bar" style="width:315px;background:linear-gradient(90deg,#50C878,#3DA75F);border:3px solid #2E7D4E">9 hands</div></div><p><span class="answer-line"></span> has longer scarf.</p></div>`

**CSS**: `<style>body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}.question{margin:10px 0;padding:12px;border-radius:8px}.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}.compare-img{max-height:120px;max-width:300px;object-fit:contain;margin:10px}.unit-ruler{display:flex;gap:4px;margin:10px 0;align-items:flex-end}.unit-cube{width:40px;height:40px;border:2px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;background:#FFE082}.measurement-bar{height:35px;border:3px solid;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold}.bar-row{margin-bottom:25px}.answer-box{border-bottom:3px solid #333;min-width:55px;height:30px}.answer-key{margin-top:40px;padding:20px;background:#f0f8ff;border:3px solid #4169E1;border-radius:10px}</style>`

5Qs (Q1-Q5 formats above) + counts (Q2:small 5-6|med 7-8|large 9-10; Q4:min4,3+gap; Q5:small 5-6|med 7-8|large 9-12) + answer key + CSS. NO cm/m. Gen NOW.
