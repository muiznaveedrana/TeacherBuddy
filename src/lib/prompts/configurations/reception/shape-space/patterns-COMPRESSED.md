# Reception: Simple Patterns

Generate EXACTLY {{questionCount}} questions for ages 4-5.

## Rules

- Q1-Q3, Q5: CSS shapes only (NO text/images)
- Q4: IMG tags with full paths
- No answer key
- Pattern length: 2-3 cycles max

## 5 Questions

1. AB pattern (shapes, multiple choice)
2. ABB pattern (fill blanks)
3. Copy pattern
4. AB objects (img tags, multiple choice)
5. ABC pattern (shapes, multiple choice) - Most complex

## Q1, Q4, Q5 Validation

Before HTML, check:
```
Pattern: [A-B-A-B-?]
Next: [Must be A or B]
Options: [List choices]
✓ Correct answer IN options? YES/NO
```

## Q5 Critical Rule

**Match shape AND color exactly**

❌ Wrong: Pattern has "Green Diamond" → Option shows "Green Square"
✅ Right: Pattern has "Green Diamond" → Option shows "Green Diamond"

Template:
```
A = Red Circle
B = Blue Square
C = Green Triangle
Sequence: A-B-C-A-B-?
Next: C = Green Triangle
Options: A, B, C (all 3 must be in options)
```

## CSS
```css
<style>
body { font-family: 'Comic Sans MS', sans-serif; font-size: 16pt; padding: 20px; }
.question { margin: 10px 0; padding: 12px; border-radius: 8px; }
.pattern-sequence, .pattern-sequence-objects { display: flex; gap: 15px; justify-content: center; padding: 20px; flex-wrap: wrap; }
.pattern-item { width: 60px; height: 60px; border: 2px solid #333; }
.pattern-item.circle { border-radius: 50%; }
.pattern-item.square { /* Square shape uses background color from .red, .blue, etc */ }
.pattern-item.triangle { width: 0; height: 0; border-left: 30px solid transparent;
  border-right: 30px solid transparent; border-bottom: 52px solid #333; border-top: none; background: transparent; }
.pattern-item.star { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
.red { background: #E74C3C; }
.blue { background: #4A90E2; }
.green { background: #27AE60; }
.yellow { background: #F1C40F; }
.pink { background: #E91E63; }
.pattern-item.triangle.red { border-bottom-color: #E74C3C; background: transparent; }
.pattern-item.triangle.blue { border-bottom-color: #4A90E2; background: transparent; }
.pattern-item.triangle.green { border-bottom-color: #27AE60; background: transparent; }
.choice-shape.triangle.red { border-bottom-color: #E74C3C; background: transparent; }
.choice-shape.triangle.blue { border-bottom-color: #4A90E2; background: transparent; }
.choice-shape.triangle.green { border-bottom-color: #27AE60; background: transparent; }
.pattern-next { width: 60px; height: 60px; border: 3px dashed #FF6347;
  display: flex; align-items: center; justify-content: center; font-size: 32pt; color: #FF6347; }
.pattern-choices-abc, .object-choices { display: flex; gap: 20px; justify-content: center; }
.choice-box { padding: 15px; border: 3px solid #ddd; border-radius: 12px; text-align: center; }
.choice-label { font-size: 16pt; font-weight: bold; margin-bottom: 8px; }
.choice-shape { width: 60px; height: 60px; margin: 0 auto; border: 2px solid #333; }
.choice-shape.circle { border-radius: 50%; }
.choice-shape.square { /* Square shape */ }
.choice-shape.triangle { width: 0; height: 0; border-left: 30px solid transparent;
  border-right: 30px solid transparent; border-bottom: 52px solid #333; border-top: none; background: transparent; }
</style>
```

## Examples

**Q4 (Objects):**

🚨 **CRITICAL**: Use FULL paths: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

Examples:
- `/images/WORKSHEET_OBJECTS/counting/toys/ball.png`
- `/images/WORKSHEET_OBJECTS/counting/farm_animals/chicken.png`
- `/images/WORKSHEET_OBJECTS/counting/fruits/apple.png`

```html
<div class="pattern-sequence-objects">
    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
    <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="60" height="60" alt="Car" />
    <img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
    <div class="pattern-next">?</div>
</div>
```

**Q5 (Shapes):**
```html
<div class="pattern-sequence">
    <div class="pattern-item circle red"></div>
    <div class="pattern-item square blue"></div>
    <div class="pattern-item triangle green"></div>
    <div class="pattern-item circle red"></div>
    <div class="pattern-item square blue"></div>
    <div class="pattern-next">?</div>
</div>

<div class="pattern-choices-abc">
    <div class="choice-box">
        <span class="choice-label">A</span>
        <div class="choice-shape triangle green"></div>
    </div>
    <div class="choice-box">
        <span class="choice-label">B</span>
        <div class="choice-shape circle red"></div>
    </div>
</div>
```

Objects: fruits (apple, banana), farm_animals (cow, chicken), toys (ball, car)

Generate now.
