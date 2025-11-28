# Ages 4-5: Simple Patterns

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Rules
- Q1-Q3, Q5: 2D shape images from /images/2d-*.png (NO CSS shapes)
- Q4: Object images with FULL paths, **30x30px**
- Pattern length: 2-3 cycles max
- **VARY shapes each worksheet**

## 5 Questions (VARY EACH WORKSHEET!)
1. AB pattern (shapes, multiple choice) - RANDOMIZE: shapes + question wording
2. ABB pattern (fill blanks) - RANDOMIZE: shapes + pattern type
3. Copy pattern - RANDOMIZE: pattern type (AB, ABB, ABC)
4. AB objects (**30x30 img tags**, multiple choice) - RANDOMIZE: objects + question wording
5. ABC pattern (shapes, multiple choice) - RANDOMIZE: shapes + question wording

## Shape Variations - RANDOMIZE! (Reception Level ONLY)
**CRITICAL**: Use ONLY these 5 shapes suitable for ages 4-5:
- circle, square, triangle, heart, star

**DO NOT USE**: pentagon, hexagon, octagon, diamond, oval (too advanced for Reception)

**Q1-Q2**: Pick 2 DIFFERENT shapes (e.g., circle/square, triangle/heart, star/circle)
**Q3**: Pick 2-3 shapes depending on pattern complexity
**Q5**: Pick 3 DIFFERENT shapes (e.g., circle/square/triangle, heart/star/circle, triangle/heart/square)

## Object Variations (Q4) - RANDOMIZE!
**Object Sets** (pick ONE set for Q4):
- **Fruits**: apple, banana, orange, strawberry
- **Farm Animals**: cow, chicken, sheep, pig, duck
- **Toys**: ball, doll, car, block
- **School**: book, pencil, crayon, backpack

## Q1 - AB Pattern
**RANDOMIZE**: Pick ONE shape pair + ONE question variation

**Shape Pairs** (pick ONE):
- circle, square
- triangle, circle
- heart, star
- square, triangle
- star, circle
- heart, triangle

**Question Variations** (pick ONE):
- "What comes next in this pattern?"
- "What shape comes next?"
- "Complete the pattern."
- "What should come next?"
- "Which shape is missing?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What comes next in this pattern?</p>
    <div class="pattern-sequence">
        <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="pattern-item" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="pattern-item" />
        <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="pattern-item" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="pattern-item" />
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="choice-shape" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="choice-shape" />
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/2d-triangle.png" width="60" height="60" alt="Triangle" class="choice-shape" />
        </div>
    </div>
</div>
```

## Q2 - ABB Pattern
**RANDOMIZE**: Pick ONE shape pair + ONE pattern type + ONE question variation

**Shape Pairs** (pick ONE):
- circle, star
- triangle, square
- heart, circle
- square, star
- triangle, heart
- star, square

**Pattern Types** (pick ONE):
- ABB pattern: A-B-B-A-B-B
- AAB pattern: A-A-B-A-A-B

**Question Variations** (pick ONE):
- "What comes next?"
- "Complete this pattern."
- "What shapes are missing?"
- "Fill in the missing shapes."
- "What shape should go in the box?"

## Q3 - Copy Pattern
**RANDOMIZE**: Pick ONE pattern type + matching shapes + ONE question variation

**Pattern Types with Shape Examples** (pick ONE):
- AB: circle-square (2 shapes)
- AB: triangle-heart (2 shapes)
- AB: star-circle (2 shapes)
- ABB: triangle-heart-heart (2 shapes)
- ABB: circle-star-star (2 shapes)
- AAB: square-square-triangle (2 shapes)
- AAB: heart-heart-circle (2 shapes)
- ABC: circle-square-triangle (3 shapes, easiest ABC)
- ABC: triangle-heart-star (3 shapes)

**Question Variations** (pick ONE):
- "Copy this pattern:"
- "Can you copy this pattern below?"
- "Draw the pattern again:"
- "Make the same pattern:"

## Q4 - Objects Pattern
**RANDOMIZE**: Pick ONE object pair + ONE question variation

FULL paths: `/images/{object}.png` (30x30px)

**Object Pairs** (pick ONE):
- **Fruits**: apple/banana, orange/strawberry, apple/orange
- **Farm Animals**: cow/chicken, sheep/pig, duck/chicken
- **Toys**: ball/doll, car/block, ball/car
- **School**: book/pencil, crayon/backpack, book/crayon

**Question Variations** (pick ONE):
- "What comes next in this pattern?"
- "What picture comes next?"
- "Complete the pattern."
- "Which picture should come next?"
- "What should go in the box?"

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> What comes next in this pattern?</p>
    <div class="pattern-sequence-objects">
        <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        <img src="/images/doll.png" width="30" height="30" alt="Doll" />
        <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        <div class="pattern-next">?</div>
    </div>
    <div class="object-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/doll.png" width="30" height="30" alt="Doll" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/ball.png" width="30" height="30" alt="Ball" />
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/cow.png" width="30" height="30" alt="Cow" />
        </div>
    </div>
</div>
```

## Q5 - ABC Pattern
**RANDOMIZE**: Pick 3 different shapes + ONE question variation

**Shape Combinations** (pick ONE set of 3 - Reception appropriate only):
- Classic: circle, square, triangle
- Fun 1: heart, star, circle
- Fun 2: triangle, heart, square
- Stars: star, circle, square
- Hearts: heart, triangle, circle

**Question Variations** (pick ONE):
- "What comes next?"
- "What shape comes next in the pattern?"
- "Complete this pattern."
- "Which shape is missing?"
- "What should come next?"

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> What comes next?</p>
    <div class="pattern-sequence">
        <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="pattern-item" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="pattern-item" />
        <img src="/images/2d-triangle.png" width="60" height="60" alt="Triangle" class="pattern-item" />
        <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="pattern-item" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="pattern-item" />
        <div class="pattern-next">?</div>
    </div>
    <div class="pattern-choices-abc">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/2d-triangle.png" width="60" height="60" alt="Triangle" class="choice-shape" />
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="choice-shape" />
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="choice-shape" />
        </div>
    </div>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.pattern-sequence,.pattern-sequence-objects{display:flex;gap:15px;justify-content:center;align-items:center;padding:20px;flex-wrap:wrap;}
.pattern-item{display:block;}
.pattern-next{width:60px;height:60px;border:3px dashed #FF6347;display:flex;align-items:center;justify-content:center;font-size:32pt;color:#FF6347;}
.pattern-choices-abc,.object-choices{display:flex;gap:20px;justify-content:center;margin-top:15px;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:80px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.choice-shape{margin:0 auto;display:block;}
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
        <p><strong>1.</strong> [Next shape, e.g., "A (Circle)"]</p>
        <p><strong>2.</strong> [Missing shapes, e.g., "Two squares"]</p>
        <p><strong>3.</strong> [Pattern to copy, e.g., "Triangle, square, triangle"]</p>
        <p><strong>4.</strong> [Next object, e.g., "A (Doll)"]</p>
        <p><strong>5.</strong> [Next shape, e.g., "A (Triangle)"]</p>
    </div>
</div>
```
