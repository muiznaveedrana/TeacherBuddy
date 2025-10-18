# Reception: Basic Shapes (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception basic shapes questions.

## CRITICAL RULES

**Shapes:** circle, square, triangle, rectangle, star, heart (PRIMARY: first 4)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Language:** Simple, age-appropriate (ages 4-5) - 'sides', 'corners', 'round', 'straight', 'pointy'
**Visual:** Large, clear, colorful shapes - CSS-based shapes

## 5-QUESTION FORMAT

**Q1:** What shape is this? (giant shape display)
**Q2:** Find and circle all the [shapes] (shape collection grid)
**Q3:** Count the [shapes] in the picture (scene with shape objects)
**Q4:** Match shapes (left to right matching)
**Q5:** Properties - which shape has [X sides/corners]? (multiple choice)

## SHAPE COLORS (Keep consistent)

- Circle: Blue (#4A90E2)
- Square: Red (#E74C3C)
- Triangle: Green (#27AE60)
- Rectangle: Orange (#F39C12)
- Star: Yellow (#F1C40F)
- Heart: Pink (#E91E63)

## EXAMPLE OUTPUT

**Q1 (Giant Shape):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What shape is this?</p>
    <div class="shape-display-large">
        <div class="giant-shape circle"></div>
    </div>
    <p class="answer-prompt">This is a <span class="answer-line">__________</span></p>
</div>
```

**Q2 (Find shapes - 8 shapes, 3 are triangles):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Find and circle all the TRIANGLES</p>
    <div class="shape-collection">
        <div class="shape-item circle"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item square"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item rectangle"></div>
        <div class="shape-item triangle"></div>
        <div class="shape-item circle"></div>
        <div class="shape-item square"></div>
    </div>
    <p class="answer-prompt">How many triangles? <span class="answer-line">___</span></p>
</div>
```

**Q5 (Properties):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which shape has 4 EQUAL sides?</p>
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
    <p class="answer-prompt">Circle: A, B, or C</p>
</div>
```

**Q5 Variations:**
- "Which shape has NO corners?" (Circle)
- "Which shape has 3 sides?" (Triangle)
- "Which shape is round?" (Circle)
- "Which shape has 4 corners?" (Square or Rectangle)

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Circle</p>
        <p><strong>2.</strong> 3 triangles</p>
        <p><strong>3.</strong> 5 circles</p>
        <p><strong>4.</strong> Match circle→circle, square→square, triangle→triangle</p>
        <p><strong>5.</strong> B - Square (4 equal sides)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
