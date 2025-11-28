# Ages 5-6: 2D Shapes - Basic

Generate EXACTLY {{questionCount}} Year 1 2D shapes questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Shapes:** Circle, Triangle, Square, Rectangle ONLY
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Simple language, visual-heavy, clear images
**Skills:** Name shapes, count sides/corners, identify shapes

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Name the shape (show 1 shape) - RANDOMIZE: shape + color
**Q2:** Count sides/corners (show 1 shape) - RANDOMIZE: shape + what to count
**Q3:** Find all shapes (array of mixed shapes) - RANDOMIZE: target shape + arrangement
**Q4:** Match shapes to names (4 shapes) - RANDOMIZE: shapes + shuffle order
**Q5:** Draw/Complete the shape (trace or complete) - RANDOMIZE: shape + style

## SHAPES - Use CSS/SVG

**Circle:** `<div class="shape-display circle"></div>`
**Triangle:** `<div class="shape-display triangle"></div>`
**Square:** `<div class="shape-display square"></div>`
**Rectangle:** `<div class="shape-display rectangle"></div>`

## SHAPE COLORS

**Color Options** (pick ONE per question):
- Red (#E74C3C)
- Blue (#4A90E2)
- Green (#27AE60)
- Yellow (#F4D03F)
- Orange (#FF9800)
- Purple (#9B59B6)

## Q1 - Name the Shape (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + ONE color + ONE question variation

**Shapes**: Circle, Triangle, Square, Rectangle

**Question Variations** (pick ONE):
- "What shape is this?"
- "Name this shape."
- "What is the name of this shape?"
- "Circle the correct name."

**Answer Format**: Multiple choice with 3-4 options (correct + 2-3 distractors)

## Q2 - Count Sides/Corners (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape (NOT circle) + count sides OR corners

**Shapes**: Triangle, Square, Rectangle (circles have no sides/corners!)

**Question Variations** (pick ONE):
- "How many sides does this [shape] have?"
- "Count the sides."
- "How many corners can you see?"
- "Count the corners on this shape."

**Answer Format**: "This shape has ____ [sides/corners]."

## Q3 - Find All Shapes (RANDOMIZE!)
**RANDOMIZE**: Pick ONE target shape + create table of 8-10 mixed shapes

**Target Shapes**: Circle, Triangle, Square, Rectangle

**Table Size**: 8-10 total shapes (rows A-H or A-J)
**Target Count**: 3-5 of the target shape
**Distractors**: Mix of other 3 shapes

**Question Variations** (pick ONE):
- "Find all the [shapes]. Write the letters."
- "Which rows show [shapes]? Write the letters."
- "Circle the letters for all the [shapes]."
- "Mark all the [shapes] with their letters."

**Layout**: Two-column table with letter labels (A, B, C, D...) in column 1, shape in column 2
**Answer Format**: Spacious line for writing letter answers (e.g., "A, C, F")

## Q4 - Match Shapes to Names (RANDOMIZE!)
**RANDOMIZE**: Create 4 shapes + shuffle word order (don't align them!)

**Shapes to Use**: Circle, Triangle, Square, Rectangle (all 4, always)

**Question Variations** (pick ONE):
- "Draw lines to match the shapes to their names."
- "Match each shape with its name."
- "Connect the shapes to the correct words."
- "Join the shapes to their names."

**CRITICAL**: Always shuffle the word column order (don't align them!)

## Q5 - Draw/Complete Shape (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + ONE activity type

**Activity Types**:
- **Trace**: Dotted outline to trace
- **Complete**: Half-drawn shape to complete
- **Draw**: Empty box with instruction to draw

**Shapes**: Circle, Triangle, Square, Rectangle

**Question Variations** (pick ONE):
- "Trace the [shape]."
- "Complete the [shape]."
- "Draw a [shape]."
- "Finish drawing the [shape]."

## EXAMPLE OUTPUT

**Q1 (Name the Shape):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What shape is this?</p>
    <div class="shape-container">
        <div class="shape-display circle" style="background: #4A90E2;"></div>
    </div>
    <div class="multiple-choice">
        <div class="choice-option">
            <input type="radio" name="q1" id="q1a">
            <label for="q1a">Square</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1b">
            <label for="q1b">Circle</label>
        </div>
        <div class="choice-option">
            <input type="radio" name="q1" id="q1c">
            <label for="q1c">Triangle</label>
        </div>
    </div>
</div>
```

**Q2 (Count Sides):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> How many sides does this square have?</p>
    <div class="shape-container">
        <div class="shape-display square" style="background: #27AE60; border: 3px solid #1E8449;"></div>
    </div>
    <p class="answer-prompt">This shape has <span class="answer-box"></span> sides.</p>
</div>
```

**Q3 (Find All Shapes):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Find all the triangles. Write the letters.</p>
    <div class="shape-table-container">
        <table class="shape-table">
            <tr>
                <td class="letter-cell">A</td>
                <td class="shape-cell"><div class="shape-display triangle small" style="background: #E74C3C;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">B</td>
                <td class="shape-cell"><div class="shape-display circle small" style="background: #4A90E2;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">C</td>
                <td class="shape-cell"><div class="shape-display square small" style="background: #F4D03F;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">D</td>
                <td class="shape-cell"><div class="shape-display triangle small" style="background: #E74C3C;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">E</td>
                <td class="shape-cell"><div class="shape-display rectangle small" style="background: #9B59B6;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">F</td>
                <td class="shape-cell"><div class="shape-display circle small" style="background: #4A90E2;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">G</td>
                <td class="shape-cell"><div class="shape-display triangle small" style="background: #E74C3C;"></div></td>
            </tr>
            <tr>
                <td class="letter-cell">H</td>
                <td class="shape-cell"><div class="shape-display square small" style="background: #F4D03F;"></div></td>
            </tr>
        </table>
    </div>
    <p class="answer-prompt">Triangles: <span class="answer-line"></span></p>
</div>
```

**Q4 (Match Shapes):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Draw lines to match the shapes to their names.</p>
    <div class="matching-activity">
        <div class="matching-column">
            <div class="match-item shape-item">
                <div class="shape-display circle small" style="background: #4A90E2;"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-display square small" style="background: #F4D03F;"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-display triangle small" style="background: #E74C3C;"></div>
            </div>
            <div class="match-item shape-item">
                <div class="shape-display rectangle small" style="background: #9B59B6;"></div>
            </div>
        </div>
        <div class="matching-column">
            <div class="match-item word">Triangle</div>
            <div class="match-item word">Circle</div>
            <div class="match-item word">Rectangle</div>
            <div class="match-item word">Square</div>
        </div>
    </div>
</div>
```

**Q5 (Trace Shape):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Trace the rectangle.</p>
    <div class="shape-container">
        <div class="shape-display rectangle dotted" style="border: 3px dotted #333; background: transparent;"></div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Circle</p>
        <p><strong>2.</strong> 4 sides</p>
        <p><strong>3.</strong> A, D, G (triangles)</p>
        <p><strong>4.</strong> Circle-Circle, Square-Square, Triangle-Triangle, Rectangle-Rectangle</p>
        <p><strong>5.</strong> Teacher check - rectangle traced correctly</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.shape-container{display:flex;justify-content:center;margin:15px 0;}
.shape-display{margin:10px;}
.shape-display.circle{width:100px;height:100px;border-radius:50%;}
.shape-display.square{width:100px;height:100px;}
.shape-display.rectangle{width:140px;height:80px;}
.shape-display.triangle{width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:104px solid;background:transparent!important;}
.shape-display.small{transform:scale(0.5);}
.shape-display.dotted{border:3px dotted #333;background:transparent;}
.shape-table-container{margin:20px auto;max-width:400px;}
.shape-table{width:100%;border-collapse:collapse;margin:15px auto;}
.shape-table td{padding:12px;border:2px solid #333;text-align:center;}
.letter-cell{font-size:18pt;font-weight:bold;background:#FFF9C4;width:60px;}
.shape-cell{background:#F8F8F8;min-width:120px;}
.multiple-choice{margin:15px 0;}
.choice-option{margin:8px 0;padding:8px;border:2px solid #ddd;border-radius:5px;}
.choice-option label{margin-left:10px;font-size:14pt;}
.matching-activity{display:grid;grid-template-columns:1fr 1fr;gap:30px;max-width:400px;margin:15px auto;}
.matching-column{display:flex;flex-direction:column;gap:15px;}
.match-item{padding:12px;border:2px solid #333;border-radius:8px;text-align:center;font-weight:bold;font-size:14pt;min-height:60px;display:flex;align-items:center;justify-content:center;}
.match-item.shape-item{background:#F0F0F0;}
.match-item.word{background:#FFF9C4;}
.answer-prompt{font-weight:bold;margin-top:15px;font-size:15pt;}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:80px;height:30px;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:2px solid #333;min-width:200px;height:30px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
