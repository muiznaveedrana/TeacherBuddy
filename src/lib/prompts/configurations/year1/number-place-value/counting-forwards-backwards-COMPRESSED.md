# Year 1: Counting Forwards & Backwards Worksheet

**Generate EXACTLY {{questionCount}} questions. Choose from the question types below.**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES - NO ANSWER CLUES!

1. **ALL numbers MUST be between 0-20** (NO exceptions - houses, stairs, number lines)
2. **ABSOLUTELY NO VISUAL ANSWER CLUES**:
   - ❌ NO colored/green/highlighted text in question text (e.g., "Use the <span style="color:green">book</span>" is WRONG)
   - ❌ NO direction arrows or text (e.g., "← Count Backwards" is WRONG - gives away answer)
   - ❌ NO different colors on answer boxes/houses/stairs/branches
   - ❌ NO highlights, borders, or background changes on answer positions
   - ❌ NO special styling that reveals the answer
   - ❌ NO inline styles on answer positions
   - ❌ NO additional classes on answer positions (except `.start` on start position only)
3. **Question text must be plain black** - NO colored words, NO hints in the question wording
4. **Only start positions can be marked** with `.start` class - nothing else

**❌ WRONG:**
- `Use the <span style="color:green">book</span>` (colored text clue)
- `<div class="direction-arrow">← Count Backwards</div>` (direction clue)
- `<div class="number-point" style="background: yellow;">13</div>` (colored answer)

**✓ CORRECT:**
- `Fill in the missing numbers.` (no clues)
- `<div class="number-point">13</div>` (answer looks identical to others)

---

## CORE QUESTION TYPES (Choose 5)

### Q1: Forward Sequence - Missing Numbers (BG: #FFF9C4)
Range 0-20, 2-3 gaps. **NO direction hints** (e.g., "Count FORWARDS" or "Use the X" are WRONG). **NO colored text** in question.

```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Fill in the missing numbers.</p>
    <div class="number-sequence">
        <div class="sequence-box filled">5</div>
        <div class="sequence-box filled">6</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">8</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
    </div>
    <p class="answer-prompt">Write the missing numbers</p>
</div>
```

---

### Q2: Backward Sequence - Missing Numbers (BG: #E3F2FD)
Range 10-20, 2-3 gaps. Add `.backwards` class for visual styling only. **NO direction arrows or text hints**.

```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">2.</span>
    <p class="question-text">Fill in the missing numbers.</p>
    <div class="number-sequence backwards">
        <div class="sequence-box filled">15</div>
        <div class="sequence-box filled">14</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">12</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">10</div>
    </div>
    <p class="answer-prompt">Write the missing numbers</p>
</div>
```

---

### Q3: Number Line Forward (BG: #F1F8E9)
**Start 5-12, jump 3-6 steps, MUST land on 20 or below.**
Only mark `.start` - ALL other number points use ONLY `class="number-point"` with NO other attributes.

```html
<p class="question-text">Start at 7. Count forwards 4 steps. Where do you land?</p>
<div class="number-line-jumps">
    <div class="number-line-extended">
        <div class="number-point">5</div>
        <div class="number-point">6</div>
        <div class="number-point start">7</div>
        <div class="number-point">8</div>
        <div class="number-point">9</div>
        <div class="number-point">10</div>
        <div class="number-point">11</div>
        <div class="number-point">12</div>
        <div class="number-point">13</div>
    </div>
    <div class="jump-instruction"><p>Make 4 jumps forward →</p></div>
</div>
<p class="answer-prompt">You land on <span class="answer-box"></span></p>
```

**CRITICAL:** 
- Answer is 11 (7+4=11)
- Position 11 uses ONLY `class="number-point"` - NO color, NO style attribute, NO additional class
- It looks EXACTLY like positions 5, 6, 8, 9, 10, 12, 13
- Only position 7 has `.start` class

---

### Q4: Real-World Context (BG: #FCE4EC)
**Houses 1-20, stairs 1-20, branches 1-20. Calculate answer BEFORE building visual.**
Only mark `.start-step` or `.start-house` - ALL other items use base class only (NO answer styling).

```html
<p class="question-text">Leo is at house 8. He walks 5 houses forward. What house is he at?</p>
<div class="houses-visual">
    <div class="house start-house">8</div>
    <div class="house">9</div>
    <div class="house">10</div>
    <div class="house">11</div>
    <div class="house">12</div>
    <div class="house">13</div>
</div>
<p class="answer-prompt">Leo is at house <span class="answer-box"></span></p>
```

**CRITICAL: Answer position (house 13) uses plain `.house` class - looks identical to houses 9, 10, 11, 12.**

**Contexts:** Stairs, houses on street, books on shelf, tree branches

---

### Q5: Backward Challenge (BG: #FFF3E0)
**Start 15-20, jump 5-10 steps, MUST land on 0 or above.**
Same structure as Q3, reverse direction. Only mark start.

---

## ADDITIONAL VERSATILE QUESTION TYPES

### Q6: Number Before/After/Between (BG: #E8F5E9)
Simple number ordering within 0-20.

```html
<div class="question" style="background: #E8F5E9;">
    <span class="question-number">6.</span>
    <p class="question-text">What number comes AFTER 14?</p>
    <p class="answer-prompt">Answer: <span class="answer-box"></span></p>
</div>
```

**Variations:**
- What comes BEFORE 12?
- What number is BETWEEN 8 and 10?
- Write the next 3 numbers after 15

---

### Q7: Compare Numbers (BG: #FFF9C4)
Which is bigger/smaller, using comparison vocabulary.

```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">7.</span>
    <p class="question-text">Which number is BIGGER?</p>
    <div class="comparison-boxes">
        <div class="compare-box">13</div>
        <div class="compare-box">8</div>
    </div>
    <p class="answer-prompt">Circle the bigger number</p>
</div>
```

**Variations:**
- Which is smaller?
- Put these numbers in order: 15, 7, 12, 3

---

### Q8: Count Objects (BG: #E3F2FD)
Count dots/circles and write the number (10-20 objects).

```html
<div class="question" style="background: #E3F2FD;">
    <span class="question-number">8.</span>
    <p class="question-text">Count the dots. How many are there?</p>
    <div class="counting-dots">
        <span class="dot">●</span>
        <span class="dot">●</span>
        <!-- 12-18 dots total -->
    </div>
    <p class="answer-prompt">There are <span class="answer-box"></span> dots</p>
</div>
```

---

### Q9: Hundred Square Section (BG: #FFF3E0)
Missing numbers in a 3x3 or 4x4 section of hundred square (1-20 range).

```html
<div class="hundred-square-section">
    <div class="hundred-row">
        <div class="hundred-cell">11</div>
        <div class="hundred-cell empty"></div>
        <div class="hundred-cell">13</div>
    </div>
    <div class="hundred-row">
        <div class="hundred-cell empty"></div>
        <div class="hundred-cell">15</div>
        <div class="hundred-cell">16</div>
    </div>
</div>
```

---

### Q10: Number Bonds to 10/20 (BG: #F1F8E9)
Simple addition within 20, counting context.

```html
<div class="question" style="background: #F1F8E9;">
    <span class="question-number">10.</span>
    <p class="question-text">Sara has 7 apples. She picks 5 more. How many does she have now?</p>
    <p class="answer-prompt">Sara has <span class="answer-box"></span> apples</p>
</div>
```

---

### Q11: Skip Counting (Stretch) (BG: #E8F5E9)
Count in 2s, 5s, or 10s within 0-20.

```html
<div class="question" style="background: #E8F5E9;">
    <span class="question-number">11.</span>
    <p class="question-text">Count in 2s. Fill in the missing numbers.</p>
    <div class="number-sequence">
        <div class="sequence-box filled">2</div>
        <div class="sequence-box filled">4</div>
        <div class="sequence-box empty"></div>
        <div class="sequence-box filled">8</div>
        <div class="sequence-box empty"></div>
    </div>
</div>
```

**Options:** 2s (2,4,6..20), 5s (5,10,15,20), 10s (10,20)

---

## ⚠️ CRITICAL STYLING REQUIREMENTS

**For Number Lines (Q3, Q5):**
- Start position: `<div class="number-point start">7</div>`
- ALL other positions: `<div class="number-point">8</div>` (NOTHING ELSE)
- Answer position: `<div class="number-point">11</div>` (NO special styling)

**For Real-World Contexts (Q4):**
- Start position: `<div class="house start-house">8</div>`
- ALL other positions: `<div class="house">9</div>` (NOTHING ELSE)
- Answer position: `<div class="house">13</div>` (NO special styling)

**NEVER use:**
- ❌ `class="number-point end"`
- ❌ `class="number-point answer"`
- ❌ `style="background: yellow"`
- ❌ `style="color: orange"`
- ❌ Any inline styles on non-start positions

---

## CSS (UPDATED)

```css
body{font-family:'Sassoon Primary','Century Gothic',sans-serif;font-size:16pt;margin:0;padding:20px}
.worksheet-header{text-align:center;margin-bottom:15px;border-bottom:3px solid #000}
.worksheet-title{font-size:16pt;font-weight:bold;margin:0}
.question{margin:10px 0;padding:12px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1)}
.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}
.number-sequence{display:flex;gap:10px;justify-content:center;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #4CAF50;border-radius:12px;max-width:600px;position:relative}
.number-sequence.backwards::before{content:'← Count Backwards';position:absolute;top:-10px;left:20px;background:#E3F2FD;padding:5px 15px;border-radius:20px;font-size:13pt;font-weight:bold;color:#1976D2}
.sequence-box{width:60px;height:60px;display:flex;align-items:center;justify-content:center;font-size:22pt;font-weight:bold;border:3px solid #333;border-radius:8px}
.sequence-box.filled{background:#4CAF50;color:#fff;border-color:#2E7D32}
.sequence-box.empty{background:#fff;border-style:dashed;border-color:#FF5722}
.direction-arrow{text-align:center;font-size:40pt;color:#1976D2;margin:10px 0}
.number-line-jumps{margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #2196F3;border-radius:12px;max-width:700px}
.number-line-extended{display:flex;justify-content:space-around;align-items:center;position:relative;padding:30px 10px;margin-bottom:15px}
.number-line-extended::before{content:'';position:absolute;top:50%;left:3%;right:3%;height:4px;background:#333}
.number-point{width:50px;height:50px;background:#E0E0E0;border:2px solid #999;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;position:relative;z-index:1}
.number-point.start{background:#4CAF50;color:#fff;border:4px solid #2E7D32}
.number-point.start::after{content:'START';position:absolute;bottom:-25px;font-size:10pt;color:#4CAF50;font-weight:bold}
.jump-instruction{text-align:center;font-size:15pt;font-weight:bold;color:#1976D2}
.stairs-visual,.houses-visual{display:flex;gap:8px;justify-content:center;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #2196F3;border-radius:12px;max-width:600px}
.stair-step,.house{width:70px;height:50px;background:#795548;border:2px solid #5D4037;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;color:#fff}
.house{background:#FF9800;border-color:#F57C00}
.stair-step.start-step,.house.start-house{background:#4CAF50;border:4px solid #2E7D32}
.comparison-boxes{display:flex;gap:30px;justify-content:center;margin:20px 0}
.compare-box{width:80px;height:80px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24pt;font-weight:bold}
.counting-dots{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:20px;padding:20px;background:#f8f9ff;border:3px solid #9C27B0;border-radius:12px;max-width:500px}
.dot{font-size:28pt;color:#9C27B0}
.hundred-square-section{display:inline-grid;grid-template-columns:repeat(3,60px);gap:2px;margin:20px auto;padding:10px;background:#fff;border:3px solid #333;border-radius:8px}
.hundred-cell{width:60px;height:60px;background:#E8F5E9;border:2px solid #4CAF50;display:flex;align-items:center;justify-content:center;font-size:18pt;font-weight:bold}
.hundred-cell.empty{background:#fff;border-style:dashed;border-color:#FF5722}
.answer-prompt{font-size:15pt;margin:15px 0;font-weight:600;text-align:center}
.answer-box{display:inline-block;min-width:60px;height:40px;border:3px solid #333;border-radius:6px;background:#fff;margin:0 8px;vertical-align:middle}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key-title{font-size:14pt;font-weight:bold;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key-content p{font-size:12pt;margin:6px 0}
```

---

## ANSWER KEY

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Answers]</p>
        <p><strong>2.</strong> [Answers]</p>
        <p><strong>3.</strong> [Answers]</p>
        <p><strong>4.</strong> [Answers]</p>
        <p><strong>5.</strong> [Answers]</p>
    </div>
</div>
```

---

## FINAL REMINDER BEFORE GENERATING

When creating number lines (Q3, Q5) or real-world visuals (Q4):
1. Calculate the answer: start + jumps = answer
2. Display ALL positions in the range
3. Mark ONLY the start position with `.start` or `.start-house`
4. ALL other positions (including the answer) use base class ONLY
5. The answer position should be INVISIBLE among other numbers - no highlighting

**Example thought process for Q3:**
- Question: "Start at 7, count forward 4 steps"
- Answer: 7 + 4 = 11
- Show numbers: 5, 6, 7(start), 8, 9, 10, 11, 12, 13
- HTML: Only 7 gets `class="number-point start"`, all others get `class="number-point"`
- Result: Student must count to find 11, it's NOT highlighted

---

## VALIDATION CHECKLIST

Before generating, verify EVERY question:
1. ✓ All numbers are 0-20 (houses, stairs, number lines, branches)
2. ✓ NO colored/styled answer positions (only `.start` marked)
3. ✓ ALL non-start items use identical base styling (same class, no inline styles)
4. ✓ Calculate: start + jumps ≤ 20 (forward), start - jumps ≥ 0 (backward)
5. ✓ Answer key matches all questions
6. ✓ No `.end`, `.answer`, or style attributes on answer positions
7. ✓ Inspect HTML: answer position should look IDENTICAL to adjacent positions

**Quick HTML check:**
- Search generated HTML for: `style=`, `.end`, `.answer` on non-start positions → Should find ZERO
- Compare: Is the answer position HTML identical to neighbor positions? → Must be YES

**Output complete HTML with: header, {{questionCount}} questions (choose from types above), answer key.**
**Use placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}**