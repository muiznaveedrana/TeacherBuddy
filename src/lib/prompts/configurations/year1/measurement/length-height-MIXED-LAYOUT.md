# Year 1 Length and Height - Mixed Layout (3-Section Format)

Generate EXACTLY 5 Year 1 measurement questions using the 3-section mixed layout format.

## CRITICAL STRUCTURE - 3 SECTIONS

**Section A: FLUENCY (Q1-Q2)** - Visual comparison, measuring with cubes
**Section B: APPLICATION (Q3-Q4)** - Ordering by length, comparing bars with names
**Section C: REASONING (Q5)** - True/False about length comparison

## CRITICAL RULES

- **NO cm or m units!** Non-standard units ONLY (cubes, clips, hands, blocks)
- Each question uses DIFFERENT objects
- Vocabulary: longer, shorter, taller, longest, shortest, tallest
- Visual differences must be OBVIOUS (45px+ height difference for comparisons)

## DIFFICULTY LEVELS

**Foundation (Easy):** Simple comparisons, counts 3-7
**Varied (Average):** Multiple items, counts 5-9
**Challenge (Hard):** Complex ordering, counts 8-12

## MANDATORY HTML PATTERNS

### Answer Key Format (CRITICAL)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> A, B</p>
  <p><strong>2.</strong> 5, 7</p>
  <p><strong>3.</strong> Ben, 2</p>
  <p><strong>4.</strong> B, C, A</p>
  <p><strong>5.</strong> No, ribbon</p>
</div>
```

## AVAILABLE IMAGES

`/images/{object}.png` - pencil, crayon, ribbon, ruler, saw, paintbrush, wrench, caterpillar, snail, snake, banana, lemon, watermelon, scarf, book, train

## NAME POOLS

- Ben/Emma
- Lily/Max
- Sam/Zara
- Ali/Maya
- Leo/Mia
- Jack/Ella

## QUESTION TEMPLATES

### Q1: Visual Comparison (2 items)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Look at the pictures. Circle the answer.</p>
  <div class="compare-row">
    <div class="compare-item">
      <p style="font-weight:bold;margin-bottom:5px">A</p>
      <img src="/images/pencil.png" alt="pencil A" class="compare-img" style="height:70px">
    </div>
    <div class="compare-item">
      <p style="font-weight:bold;margin-bottom:5px">B</p>
      <img src="/images/pencil.png" alt="pencil B" class="compare-img" style="height:115px">
    </div>
  </div>
  <p class="sub-question">a) Which pencil is LONGER? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) Which pencil is SHORTER? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** B, A (CRITICAL: Heights MUST be 70px vs 115px - 45px+ difference!)

### Q2: Measure with Cubes (1 object)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>How many cubes long?</p>
  <div class="measure-box">
    <img src="/images/caterpillar.png" alt="caterpillar" style="height:80px;display:block;margin-bottom:10px">
    <div class="unit-ruler">
      <div class="unit-cube">1</div>
      <div class="unit-cube">2</div>
      <div class="unit-cube">3</div>
      <div class="unit-cube">4</div>
      <div class="unit-cube">5</div>
    </div>
  </div>
  <p class="sub-question">a) The caterpillar is <span class="answer-box-small"></span> cubes long.</p>
  <div class="measure-box" style="margin-top:15px">
    <img src="/images/saw.png" alt="saw" style="height:80px;display:block;margin-bottom:10px">
    <div class="unit-ruler">
      <div class="unit-cube">1</div>
      <div class="unit-cube">2</div>
      <div class="unit-cube">3</div>
      <div class="unit-cube">4</div>
      <div class="unit-cube">5</div>
      <div class="unit-cube">6</div>
      <div class="unit-cube">7</div>
    </div>
  </div>
  <p class="sub-question">b) The saw is <span class="answer-box-small"></span> cubes long.</p>
</div>
```
**Answer:** 5, 7 (counts: small items 5-6, medium 7-8, large 9-10)

### Q3: Word Problem with Comparison
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and answer.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Ben's</strong> ribbon is 5 hands long. <strong>Emma's</strong> ribbon is 3 hands long.</span>
  </div>
  <p class="sub-question">a) Whose ribbon is longer? <span class="answer-box-word"></span></p>
  <p class="sub-question">b) How many hands longer? <span class="answer-box-small"></span></p>
</div>
```
**Answer:** Ben, 2

### Q4: Order by Length (3 items)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Put in order. 1 = shortest, 3 = longest.</p>
  <div class="order-grid">
    <div class="order-item">
      <p style="font-weight:bold;text-align:center">A</p>
      <div class="measurement-bar" style="width:200px;background:linear-gradient(90deg,#4A90E2,#357ABD)"></div>
    </div>
    <div class="order-item">
      <p style="font-weight:bold;text-align:center">B</p>
      <div class="measurement-bar" style="width:120px;background:linear-gradient(90deg,#50C878,#3DA75F)"></div>
    </div>
    <div class="order-item">
      <p style="font-weight:bold;text-align:center">C</p>
      <div class="measurement-bar" style="width:280px;background:linear-gradient(90deg,#FF9500,#CC7700)"></div>
    </div>
  </div>
  <p class="sub-question">Shortest (1): <span class="answer-box-small"></span></p>
  <p class="sub-question">Middle (2): <span class="answer-box-small"></span></p>
  <p class="sub-question">Longest (3): <span class="answer-box-small"></span></p>
</div>
```
**Answer:** B, A, C (bar widths: 120, 200, 280 scrambled order)

### Q5: Reasoning (True/False)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <strong>Lily says:</strong> "A crayon is always longer than a ribbon."
    </div>
  </div>
  <p class="sub-question">a) Is Lily correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) Which can be longer OR shorter? <span class="answer-box-word"></span></p>
</div>
```
**Answer:** No, ribbon

## CSS (REQUIRED)
```css
<style>
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:10pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
.section-title{font-size:12pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}
.question{margin:10px 0;padding:12px;border-radius:8px}
.q-fluency{background:#E3F2FD}
.q-application{background:#F3E5F5}
.q-reasoning{background:#FFF3E0}
.question-number{display:inline-block;background:#4169E1;color:white;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:12pt}
.question-text{font-size:14pt;margin:5px 0;font-weight:600}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}
.compare-row{display:flex;justify-content:center;gap:50px;margin:15px 0;align-items:flex-end}
.compare-item{text-align:center}
.compare-img{max-width:150px;object-fit:contain}
.measure-box{background:#FAFAFA;border-radius:8px;padding:15px;margin:10px 0;text-align:center}
.unit-ruler{display:flex;gap:4px;margin:10px auto;align-items:flex-end;justify-content:center}
.unit-cube{width:40px;height:40px;border:2px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;background:#FFE082}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.order-grid{display:flex;flex-direction:column;gap:15px;margin:15px 0}
.order-item{display:flex;align-items:center;gap:15px}
.measurement-bar{height:35px;border:3px solid #333;border-radius:6px}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:10px;margin:8px 0}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
```

## MEASUREMENT GUIDELINES

- **Small items** (caterpillar, snail, lemon): 5-6 cubes/clips
- **Medium items** (banana, paintbrush): 7-8 cubes/clips
- **Large items** (saw, snake, wrench): 9-10 cubes/clips
- **Bar widths:** Min 4 units difference for comparisons
- **Visual comparison:** 45px+ height difference (70px vs 115px)

Generate worksheet NOW with correct answers.
