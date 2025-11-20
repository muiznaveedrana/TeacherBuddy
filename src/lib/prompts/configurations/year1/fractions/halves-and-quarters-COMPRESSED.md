# Year 1: Halves and Quarters

Generate EXACTLY {{questionCount}} Year 1 fractions questions.

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Fractions:** Halves (1/2) and Quarters (1/4) ONLY
**Questions:** EXACTLY {{questionCount}} - count before returning
**Age-Appropriate:** Visual-heavy, use shapes and real objects
**Skills:** Recognize halves/quarters, share equally, find fractions of shapes/quantities

## 5-QUESTION FORMAT (VARY EACH WORKSHEET!)

**Q1:** Shade half of a shape - RANDOMIZE: shape type
**Q2:** Find half of a quantity (even numbers 4-12) - RANDOMIZE: objects + quantity
**Q3:** Shade a quarter of a shape - RANDOMIZE: shape type
**Q4:** Circle the shape divided correctly - RANDOMIZE: halves OR quarters
**Q5:** Word problem (sharing equally) - RANDOMIZE: context + numbers

## SHAPES FOR FRACTIONS

**Circles:** Easy to divide into halves/quarters
**Squares/Rectangles:** Clear grid divisions
**Simple Pictures:** Pizza, cake, apple, sandwich

## OBJECTS - `/images/{object}.png`

**Food**: apple, orange, pizza (for halving visuals)
**School**: pencil, book, crayon (for quantity fractions)
**Toys**: ball, car, doll (for sharing problems)

## Q1 - Shade Half of a Shape (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + ONE shading instruction

**Shapes**: Circle, Square, Rectangle, Heart, Star

**Question Variations** (pick ONE):
- "Shade half of this [shape]."
- "Color one half."
- "Shade 1/2 of the shape."
- "Fill in half of this shape."

**Visual**: Show shape divided into 2 equal parts (line drawn)

## Q2 - Find Half of a Quantity (RANDOMIZE!)
**RANDOMIZE**: Pick ONE object type + ONE even quantity (4-12)

**Even Quantities**: 4, 6, 8, 10, 12
**Objects**: apples, pencils, balls, books, cars

**Question Variations** (pick ONE):
- "Circle half of the [objects]."
- "Find half of [number] [objects]."
- "What is half of [number]?"
- "Share [number] [objects] equally between 2 people. How many each?"

**Visual**: Show array of objects, some circled or grouped

## Q3 - Shade a Quarter (RANDOMIZE!)
**RANDOMIZE**: Pick ONE shape + ONE shading instruction

**Shapes**: Circle (like pizza), Square (grid), Rectangle

**Question Variations** (pick ONE):
- "Shade one quarter of this [shape]."
- "Color 1/4 of the shape."
- "Shade a quarter."
- "Fill in one quarter."

**Visual**: Show shape divided into 4 equal parts

## Q4 - Circle Correct Division (RANDOMIZE!)
**RANDOMIZE**: Show 3-4 shapes, only ONE divided correctly into halves OR quarters

**Division Type**: Halves OR Quarters

**Question Variations** (pick ONE):
- "Circle the shape that shows halves."
- "Which shape is divided into quarters?"
- "Find the shape cut into 2 equal parts."
- "Which shows 1/2?"

**Shapes to Show**:
- ONE correct division
- TWO-THREE incorrect (unequal parts, wrong number of parts)

## Q5 - Word Problem Sharing (RANDOMIZE!)
**RANDOMIZE**: Create sharing context + appropriate numbers

**Contexts:**
- "Sam has [number] apples. He gives half to his friend."
- "[Number] children share [number] cookies equally. How many each?" (halves)
- "A pizza is cut into 4 equal slices. Tom eats 1 slice. What fraction did he eat?"
- "Mum cuts a cake into quarters. How many pieces?"

**Numbers**: Use 4, 6, 8 for halving contexts; 4, 8, 12 for quarter contexts

## EXAMPLE OUTPUT

**Q1 (Shade Half):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Shade half of this circle.</p>
    <div class="shape-container">
        <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="55" fill="white" stroke="#333" stroke-width="3"/>
            <line x1="5" y1="60" x2="115" y2="60" stroke="#333" stroke-width="2" stroke-dasharray="4"/>
        </svg>
    </div>
</div>
```

**Q2 (Half of Quantity):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Circle half of the apples.</p>
    <div class="object-array">
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
        <img src="/images/apple.png" width="50" height="50" alt="Apple" />
    </div>
    <p class="answer-prompt">Half of 8 is <span class="answer-box"></span></p>
</div>
```

**Q3 (Shade Quarter):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Shade one quarter of this square.</p>
    <div class="shape-container">
        <svg width="120" height="120" viewBox="0 0 120 120">
            <rect x="5" y="5" width="110" height="110" fill="white" stroke="#333" stroke-width="3"/>
            <line x1="60" y1="5" x2="60" y2="115" stroke="#333" stroke-width="2" stroke-dasharray="4"/>
            <line x1="5" y1="60" x2="115" y2="60" stroke="#333" stroke-width="2" stroke-dasharray="4"/>
        </svg>
    </div>
</div>
```

**Q4 (Circle Correct Division):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Circle the shape that shows halves.</p>
    <div class="shape-options">
        <div class="shape-choice">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <rect x="5" y="5" width="70" height="70" fill="#E3F2FD" stroke="#333" stroke-width="2"/>
                <line x1="40" y1="5" x2="40" y2="75" stroke="#333" stroke-width="2"/>
            </svg>
            <p>A</p>
        </div>
        <div class="shape-choice">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <rect x="5" y="5" width="70" height="70" fill="#FFF9C4" stroke="#333" stroke-width="2"/>
                <line x1="25" y1="5" x2="25" y2="75" stroke="#333" stroke-width="2"/>
            </svg>
            <p>B</p>
        </div>
        <div class="shape-choice">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <rect x="5" y="5" width="70" height="70" fill="#F1F8E9" stroke="#333" stroke-width="2"/>
                <line x1="27" y1="5" x2="27" y2="75" stroke="#333" stroke-width="2"/>
                <line x1="53" y1="5" x2="53" y2="75" stroke="#333" stroke-width="2"/>
            </svg>
            <p>C</p>
        </div>
    </div>
    <p class="answer-prompt">Shape <span class="answer-box"></span> shows halves.</p>
</div>
```

**Q5 (Word Problem):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Sam has 6 cookies. He gives half to his friend. How many cookies does his friend get?</p>
    <div class="visual-problem">
        <div class="cookie-group">
            <p class="group-label">Sam's cookies:</p>
            <div class="object-array">
                <div class="cookie-icon">🍪</div>
                <div class="cookie-icon">🍪</div>
                <div class="cookie-icon">🍪</div>
                <div class="cookie-icon">🍪</div>
                <div class="cookie-icon">🍪</div>
                <div class="cookie-icon">🍪</div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">His friend gets <span class="answer-box"></span> cookies.</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Half of circle shaded (teacher check)</p>
        <p><strong>2.</strong> 4 apples (half of 8)</p>
        <p><strong>3.</strong> One quarter of square shaded (teacher check)</p>
        <p><strong>4.</strong> A (equal halves)</p>
        <p><strong>5.</strong> 3 cookies</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:10px;border-radius:8px;}
.shape-container{display:flex;justify-content:center;margin:15px 0;}
.object-array{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:15px 0;}
.shape-options{display:flex;justify-content:space-around;gap:20px;margin:15px auto;max-width:500px;}
.shape-choice{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;}
.visual-problem{margin:15px auto;max-width:400px;}
.cookie-group{text-align:center;padding:15px;background:#FFF8DC;border:2px solid #DEB887;border-radius:8px;}
.group-label{font-weight:bold;margin-bottom:10px;}
.cookie-icon{display:inline-block;font-size:32pt;margin:5px;}
.fraction-visual{display:inline-block;vertical-align:middle;margin:0 10px;}
.answer-prompt{font-weight:bold;margin-top:15px;text-align:center;font-size:15pt;}
.answer-box{display:inline-block;border-bottom:2px solid #333;min-width:80px;height:30px;vertical-align:middle;}
.answer-line{display:inline-block;border-bottom:2px solid #333;min-width:200px;height:30px;vertical-align:middle;}
.answer-key{margin-top:40px;padding:20px;background:#f5f5f5;border:2px solid #333;border-radius:8px;}
.answer-key-title{font-size:18pt;margin-bottom:10px;}
.answer-key-content p{margin:5px 0;}
svg{display:block;margin:0 auto;}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.
