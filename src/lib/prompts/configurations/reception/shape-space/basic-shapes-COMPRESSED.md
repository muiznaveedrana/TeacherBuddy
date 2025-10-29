# Reception: Basic Shapes - COMPRESSED

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## 5-Question Structure
1. **Identify Shape** - Show giant CSS shape, write name
2. **Find Matching** - Circle all shapes of same type (6-8 shapes grid)
3. **Count Shapes** - Count CSS shapes (3-7 shapes, NOT real-world objects)
4. **Match Shapes** - Draw lines connecting shape names to shapes
5. **Shape Properties** - Corners, sides, or roundness (builds geometry understanding)

## Q1 - Identify Giant Shape
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What shape is this?</p>
    <div style="text-align: center; margin: 20px 0;">
        <div class="choice-shape square" style="width: 120px; height: 120px; display: inline-block;"></div>
    </div>
    <p class="answer-prompt">Write your answer here <span class="answer-line">___</span></p>
</div>
```

## Q2 - Find Matching Shapes (CRITICAL - Reception Clarity)
**WORDING RULE**: Always say "Circle all the [shape name]" - NOT "shapes that look like"
**AGE-APPROPRIATE**: 4-5 year olds need direct, simple instructions

```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Circle all the circles.</p>
    <div class="shape-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 400px; margin: 20px auto;">
        <div class="choice-shape circle"></div>
        <div class="choice-shape square"></div>
        <div class="choice-shape circle"></div>
        <div class="choice-shape square"></div>
        <div class="choice-shape circle"></div>
        <div class="choice-shape circle"></div>
    </div>
</div>
```

## Q3 - Count Shapes (CRITICAL - Stay On Topic!)
**MUST use CSS shapes** - NOT real-world objects (apples/flowers belong in Number Recognition)
**PURPOSE**: Reinforce shape recognition while practicing counting

Pick ONE shape type (circle, square, triangle, rectangle) and show 3-7 of them.

```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Count the triangles. How many are there?</p>
    <div class="shape-scene" style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center; margin: 20px 0;">
        <div class="choice-shape triangle"></div>
        <div class="choice-shape triangle"></div>
        <div class="choice-shape triangle"></div>
        <div class="choice-shape triangle"></div>
        <div class="choice-shape triangle"></div>
    </div>
    <p class="answer-prompt">Write your answer here <span class="answer-line">___</span></p>
</div>
```

## Q4 - Match Shapes (Draw Lines)
**Simple matching**: 3 shape names on left, 3 shapes on right

```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Draw a line from each word to the matching shape.</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 500px; margin: 20px auto;">
        <div style="text-align: right; display: flex; flex-direction: column; gap: 30px; justify-content: center;">
            <p style="font-size: 16pt; font-weight: bold;">Circle</p>
            <p style="font-size: 16pt; font-weight: bold;">Square</p>
            <p style="font-size: 16pt; font-weight: bold;">Triangle</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 30px; align-items: flex-start;">
            <div class="choice-shape triangle"></div>
            <div class="choice-shape circle"></div>
            <div class="choice-shape square"></div>
        </div>
    </div>
</div>
```

## Q5 - Shape Properties (RANDOMIZE EVERY TIME!)
**CRITICAL**: Use DIFFERENT question each worksheet! Pick ONE from list below.
**PURPOSE**: Teach geometric properties (corners, sides, roundness)

**AVAILABLE QUESTIONS (rotate through these):**
1. "Which shape has 3 corners?" (Answer: Triangle)
2. "Which shape has 4 corners?" (Answer: Square)
3. "Which shape has NO corners?" (Answer: Circle)
4. "Which shape has 3 sides?" (Answer: Triangle)
5. "Which shape has 4 sides that are all the same length?" (Answer: Square)
6. "Which shape is round all around?" (Answer: Circle)
7. "Which shape has a point at the top?" (Answer: Triangle)
8. "Which shape has NO straight sides?" (Answer: Circle)

**Template** (use question from above list):
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which shape has 4 corners?</p>
    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape triangle"></div>
            <p class="shape-name">Triangle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape square"></div>
            <p class="shape-name">Square</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape circle"></div>
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
.choice-shape{width:60px;height:60px;margin:0 auto;border:2px solid #333;}
.choice-shape.circle{background:#4A90E2;border-radius:50%;}
.choice-shape.square{background:#E74C3C;}
.choice-shape.rectangle{background:#F39C12;width:50px;height:70px;}
.choice-shape.triangle{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:52px solid #27AE60;border-top:none;background:transparent;}
.shape-choices{display:flex;gap:20px;justify-content:center;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;}
.choice-label{font-size:16pt;font-weight:bold;display:block;margin-bottom:10px;}
.shape-name{margin-top:8px;font-size:14pt;}
.shape-scene{display:flex;gap:15px;flex-wrap:wrap;justify-content:center;margin:20px 0;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
.answer-line{border-bottom:2px solid #333;display:inline-block;min-width:150px;margin-left:10px;}
</style>
```
