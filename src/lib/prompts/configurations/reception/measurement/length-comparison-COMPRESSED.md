# Ages 4-5: Length Comparison

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Length Vocabulary (Reception Level)
**Comparative**: longer, shorter, taller, shorter (height)
**Superlative**: longest, shortest, tallest
**Equal**: same length, as long as

## Objects for Length Comparison
**Long objects**: pencil, ruler, stick, ribbon, rope, snake, train, bus
**Tall objects**: giraffe, tree, house, tower, building
**Short objects**: eraser, crayon, worm, mouse
**Everyday**: book, spoon, fork, carrot, cucumber, scarf
**Image**: `<img src="/images/{object}.png" alt="{Object}" />`

## Visual Requirements
**CRITICAL**: Length differences must be OBVIOUS (30-50%+ difference)
- Show objects side-by-side or above-below for direct comparison
- Use different sizes to make longer/shorter immediately visible
- No ambiguous comparisons - must be clear to 4-year-olds

## 5 Question Types (EXACT ORDER)
**Q1 - Which is longer?**: 2 objects (A/B), direct comparison
**Q2 - Which is shorter?**: 2 objects (A/B), direct comparison
**Q3 - Longest of 3**: 3 objects (A/B/C), find the longest
**Q4 - Shortest of 3**: 3 objects (A/B/C), find the shortest
**Q5 - Same Length**: Which 2 objects are the same length?

## Q1 - Which is Longer? (2 Objects)
**RANDOMIZE**: Pick 2 objects + ONE question variation

**Question Variations** (pick ONE):
- "Which is longer?"
- "Which one is longer?"
- "Point to the longer one."
- "Find the longer object."

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which is longer?</p>
    <div class="length-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/pencil.png" width="120" height="20" alt="Pencil" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/eraser.png" width="60" height="20" alt="Eraser" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Which is Shorter? (2 Objects)
**RANDOMIZE**: Pick 2 objects + ONE question variation

**Question Variations** (pick ONE):
- "Which is shorter?"
- "Which one is shorter?"
- "Point to the shorter one."
- "Find the shorter object."

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which is shorter?</p>
    <div class="length-comparison">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/ruler.png" width="140" height="20" alt="Ruler" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/crayon.png" width="80" height="20" alt="Crayon" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Longest of 3 (Multiple Choice)
**RANDOMIZE**: Pick 3 objects with CLEAR size differences + ONE question variation

**Question Variations** (pick ONE):
- "Which is the longest?"
- "Find the longest one."
- "Which one is longest?"
- "Point to the longest."

**Size differences**: Make it obvious (e.g., 60px, 100px, 140px)

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which is the longest?</p>
    <div class="three-way-length">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/stick.png" width="80" height="15" alt="Stick" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/ribbon.png" width="150" height="15" alt="Ribbon" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/rope.png" width="110" height="15" alt="Rope" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Shortest of 3 (Multiple Choice)
**RANDOMIZE**: Pick 3 objects with CLEAR size differences + ONE question variation

**Question Variations** (pick ONE):
- "Which is the shortest?"
- "Find the shortest one."
- "Which one is shortest?"
- "Point to the shortest."

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which is the shortest?</p>
    <div class="three-way-length">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/snake.png" width="130" height="20" alt="Snake" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/worm.png" width="60" height="15" alt="Worm" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/pencil.png" width="100" height="18" alt="Pencil" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - Same Length (Matching)
**RANDOMIZE**: Show 3-4 objects, 2 are the same length + ONE question variation

**Question Variations** (pick ONE):
- "Which two are the same length?"
- "Find two that are the same length."
- "Which are as long as each other?"
- "Circle two that are the same length."

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which two are the same length?</p>
    <div class="same-length-display">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <img src="/images/carrot.png" width="100" height="25" alt="Carrot" />
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <img src="/images/cucumber.png" width="130" height="25" alt="Cucumber" />
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <img src="/images/spoon.png" width="100" height="20" alt="Spoon" />
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.length-comparison,.three-way-length,.same-length-display{display:flex;flex-direction:column;gap:20px;margin:20px auto;max-width:400px;padding:20px;background:#fff;border:2px solid #ddd;border-radius:10px;}
.comparison-item{display:flex;align-items:center;gap:15px;padding:10px;border:1px solid #eee;border-radius:6px;}
.item-label{font-size:18pt;font-weight:bold;min-width:30px;text-align:center;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
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
        <p><strong>1.</strong> [Longer item, e.g., "A (Pencil)"]</p>
        <p><strong>2.</strong> [Shorter item, e.g., "B (Crayon)"]</p>
        <p><strong>3.</strong> [Longest, e.g., "B (Ribbon)"]</p>
        <p><strong>4.</strong> [Shortest, e.g., "B (Worm)"]</p>
        <p><strong>5.</strong> [Same length pair, e.g., "A and C"]</p>
    </div>
</div>
```
