# Reception: Basic Shapes

Generate EXACTLY {{questionCount}} questions for ages 4-5.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Question Types

1. Identify giant shape
2. Find matching shapes in grid
3. Count shapes (3-7 CSS shapes, NOT real-world objects)
4. Match shapes left to right
5. Shape properties (corners, sides, roundness) - MUST vary each worksheet!

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

## Q2 - Find Matching Shapes
**CRITICAL - Reception Clarity**: Always say "Circle all the [shape name]" - NOT "shapes that look like"
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

## Q3 - Count Shapes

**CRITICAL RULES**:
- Use CSS shapes (circle, square, triangle, rectangle) - NOT real-world objects
- ? NEVER use images (apples/flowers belong in Number Recognition worksheets)
- ? "Count the triangles. How many are there?"
- Pick ONE shape type and show 3-7 of them
- **PURPOSE**: Reinforce shape recognition while practicing counting

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

## Q4 - Match Shapes
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

## Q5 - Shape Properties

?? **EDUCATIONAL APPROACH**: Teach geometric properties (corners, sides, roundness)
?? **CRITICAL**: MUST use DIFFERENT question each worksheet! Pick ONE from the list below.

**AVAILABLE QUESTIONS (rotate through these):**
1. "Which shape has 3 corners?" (Answer: Triangle)
2. "Which shape has 4 corners?" (Answer: Square)
3. "Which shape has NO corners?" (Answer: Circle)
4. "Which shape has 3 sides?" (Answer: Triangle)
5. "Which shape has 4 sides that are all the same length?" (Answer: Square)
6. "Which shape is round all around?" (Answer: Circle)
7. "Which shape has a point at the top?" (Answer: Triangle)
8. "Which shape has NO straight sides?" (Answer: Circle)

**Template Example** (use ONE question from above list):
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which shape has 3 sides?</p>
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

?? Write ALL 3 choice-boxes with `<div class="choice-shape [name]"></div>` - never skip!

## CSS - Include at Start
```css
<style>
.choice-shape {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid #333;
}
.choice-shape.circle { background: #4A90E2; border-radius: 50%; }
.choice-shape.square { background: #E74C3C; }
.choice-shape.rectangle { background: #F39C12; width: 50px; height: 70px; }
.choice-shape.triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid #27AE60;
    border-top: none;
    background: transparent;
}
</style>
```

Generate worksheet now.
