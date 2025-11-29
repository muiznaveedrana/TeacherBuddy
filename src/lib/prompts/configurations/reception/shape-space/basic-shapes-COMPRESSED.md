# Ages 4-5: Basic Shapes

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Shape Images Available (Reception Level ONLY)
**CRITICAL**: Use ONLY these 5 shapes suitable for ages 4-5:
- circle
- square
- triangle
- heart (fun, recognizable)
- star (fun, recognizable)

**Image path**: `/images/2d-{shape}.png`

**DO NOT USE**: pentagon, hexagon, octagon, diamond, oval, rhombus, parallelogram (too advanced for Reception)

## 5-Question Structure (VARY each worksheet!)
1. **Identify Shape** - Show giant shape image, write name (RANDOMIZE: use different shape each time)
2. **Find Matching** - Circle all shapes of same type (6-8 shapes grid) (RANDOMIZE: use different target shape & mix)
3. **Count Shapes** - Count shapes (3-7 shapes, NOT real-world objects) (RANDOMIZE: different shape & quantity)
4. **Match Shapes** - Draw lines connecting shape names to shapes (RANDOMIZE: shuffle right-side order)
5. **Shape Properties** - Corners, sides, or roundness (RANDOMIZE: pick from question pool)

## Q1 - Identify Giant Shape (Multiple Choice)
**RANDOMIZE**: Pick ONE target shape + 3 answer choices + ONE question variation

**Target Shapes Pool**: circle, square, triangle, heart, star
**Answer Choices**: Show target + 2 other shapes (randomize order)

**Question Variations** (pick ONE):
- "What shape is this?"
- "Can you name this shape?"
- "What is the name of this shape?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What shape is this?</p>
    <div style="text-align: center; margin: 20px 0;">
        <img src="/images/2d-star.png" width="120" height="120" alt="Shape" />
    </div>
    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="shape-name">Circle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="shape-name">Star</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="shape-name">Triangle</p>
        </div>
    </div>
</div>
```

## Q2 - Count Matching Shapes (Input Box)
**RANDOMIZE**: Pick ONE target shape + 2 different filler shapes + ONE question variation

**Target Shapes Pool** (pick ONE): circle, square, triangle, heart, star
**Filler Shapes**: Use 2 other different shapes from the pool
**Grid**: 6-9 shapes total (3-5 target shapes mixed with fillers)

**Question Variations** (pick ONE):
- "How many [shapes] can you see?"
- "Count the [shapes]."
- "How many [shapes] are there?"
- "Find and count the [shapes]."

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> How many hearts can you see?</p>
    <div class="shape-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 400px; margin: 20px auto;">
        <img src="/images/2d-heart.png" width="60" height="60" alt="Heart" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-heart.png" width="60" height="60" alt="Heart" />
        <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" />
        <img src="/images/2d-heart.png" width="60" height="60" alt="Heart" />
        <img src="/images/2d-heart.png" width="60" height="60" alt="Heart" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-box"></span></p>
</div>
```

## Q3 - Count Shapes (Input Box)
**RANDOMIZE**: Pick ONE shape + ONE quantity (3-7) + ONE question variation

**Shape Pool (Reception only)**: circle, square, triangle, heart, star
**Quantity**: 3, 4, 5, 6, or 7 shapes

**Question Variations** (pick ONE):
- "Count the [shapes]. How many are there?"
- "How many [shapes] can you see?"
- "How many [shapes] are there?"
- "Count the [shapes]."

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> How many squares can you see?</p>
    <div class="shape-scene" style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
        <img src="/images/2d-square.png" width="60" height="60" alt="Square" />
    </div>
    <p class="answer-prompt">Answer: <span class="answer-box"></span></p>
</div>
```

## Q4 - Match Shapes (Multiple Choice Series)
**RANDOMIZE**: Pick 3 shapes + ONE question format

**Shape Combinations** (pick ONE set - Reception appropriate only):
- Basic: Circle, Square, Triangle
- Fun 1: Circle, Star, Heart
- Fun 2: Triangle, Star, Heart
- Mixed: Square, Heart, Triangle

**Format**: Ask "Which is the [shape name]?" showing 3 images with A/B/C labels

**Question Variations** (pick ONE):
- "Which is the [shape]?"
- "Find the [shape]."
- "Which one is the [shape]?"
- "Point to the [shape]."

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which is the heart?</p>
    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="choice-shape" />
            <p class="shape-name">Circle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/2d-star.png" width="60" height="60" alt="Star" class="choice-shape" />
            <p class="shape-name">Star</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/2d-heart.png" width="60" height="60" alt="Heart" class="choice-shape" />
            <p class="shape-name">Heart</p>
        </div>
    </div>
</div>
```

## Q5 - Shape Properties
**RANDOMIZE**: Pick ONE question from the pool below (Reception-appropriate shapes ONLY)

**Question Pool** (pick ONE - each with 3 answer choices A/B/C):

**Corners (Vertices)**:
1. "Which shape has 3 corners?" → Triangle (vs Square, Circle)
2. "Which shape has 4 corners?" → Square (vs Triangle, Circle)
3. "Which shape has NO corners?" → Circle (vs Triangle, Square)
4. "Find the shape with 3 corners." → Triangle (vs Heart, Circle)
5. "Which shape is round?" → Circle (vs Triangle, Square)

**Sides**:
6. "Which shape has 3 sides?" → Triangle (vs Square, Circle)
7. "Which shape has 4 sides?" → Square (vs Triangle, Circle)
8. "Find the shape with no straight sides." → Circle (vs Triangle, Square)
9. "Which shape has straight sides only?" → Square (vs Circle, Heart)

**Roundness**:
10. "Which shape is round all around?" → Circle (vs Triangle, Square)
11. "Which shape has NO straight sides?" → Circle (vs Square, Triangle)
12. "Find the completely round shape." → Circle (vs Heart, Square)
13. "Which shape is NOT round?" → Triangle (vs Circle, Heart)

**Fun Shapes**:
14. "Which shape looks like it twinkles in the sky?" → Star (vs Circle, Square)
15. "Find the heart shape." → Heart (vs Circle, Star)
16. "Which shape has points all around?" → Star (vs Circle, Square)

**Template** (adapt based on selected question):
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which shape has 4 corners?</p>
    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/2d-triangle.png" width="60" height="60" alt="Triangle" class="choice-shape" />
            <p class="shape-name">Triangle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/2d-square.png" width="60" height="60" alt="Square" class="choice-shape" />
            <p class="shape-name">Square</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/2d-circle.png" width="60" height="60" alt="Circle" class="choice-shape" />
            <p class="shape-name">Circle</p>
        </div>
    </div>
</div>
```

?? **ALWAYS** show ALL 3 shapes (Triangle, Square, Circle) - never skip!

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.choice-shape{margin:0 auto;display:block;}
.shape-choices{display:flex;gap:20px;justify-content:center;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;}
.choice-label{font-size:16pt;font-weight:bold;display:block;margin-bottom:10px;}
.shape-name{margin-top:8px;font-size:14pt;}
.shape-scene{display:flex;gap:15px;flex-wrap:wrap;justify-content:center;margin:20px 0;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:150px;height:28px;margin-left:10px;margin-top:8px;}
.answer-box{display:inline-block;min-width:60px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin-left:10px;}
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
        <p><strong>1.</strong> [Letter of correct shape name, e.g., "B (Star)"]</p>
        <p><strong>2.</strong> [Count of target shapes, e.g., "4 hearts"]</p>
        <p><strong>3.</strong> [Count of shapes shown, e.g., "6 squares"]</p>
        <p><strong>4.</strong> [Letter of correct shape, e.g., "C (Heart)"]</p>
        <p><strong>5.</strong> [Letter of correct shape, e.g., "B (Square)" for "Which has 4 corners?"]</p>
    </div>
</div>
```
