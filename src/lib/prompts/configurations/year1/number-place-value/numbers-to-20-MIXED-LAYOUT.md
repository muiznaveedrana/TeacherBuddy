# Numbers to 20 - Mixed Layout Prompt

## Overview
Year 1-level worksheet for numbers to 20, including counting, comparing, ordering, and place value.

## Difficulty Levels
- **Foundation**: Counting objects and filling in number sequences to 20
- **Varied**: Comparing and ordering numbers within 20, one more/one less
- **Challenge**: Place value (tens and ones), problem solving

## Structure
- **Section A (Fluency)**: Q1-Q2 - Number identification and sequences
- **Section B (Application)**: Q3-Q4 - Contextual counting and comparisons
- **Section C (Reasoning)**: Q5 - True/False with verification

## HTML Patterns

### Number Line
```html
<div class="number-line">
  <div class="number-box">11</div>
  <div class="number-box highlight">?</div>
  <div class="number-box">13</div>
</div>
```

### Place Value Display
```html
<div class="place-value">
  <div class="pv-group">
    <p class="pv-label">Tens</p>
    <div class="pv-box">1</div>
  </div>
  <div class="pv-group">
    <p class="pv-label">Ones</p>
    <div class="pv-box">4</div>
  </div>
</div>
```

### CSS
```css
.number-line{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:10px 0}
.number-box{width:32px;height:32px;border:2px solid #4169E1;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14pt;font-weight:bold}
.number-box.highlight{background:#E3F2FD}
.place-value{display:flex;gap:20px;justify-content:center;align-items:center}
.pv-group{text-align:center}
.pv-label{font-size:11pt;color:#666}
.pv-box{width:50px;height:50px;border:3px solid #4CAF50;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24pt;font-weight:bold;background:#E8F5E9}
```

### Q1-Q2: Counting (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Count the objects. Write the number.</p>
  <div class="counting-box">
    <p class="counting-items">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</p>
  </div>
  <p class="sub-question">a) There are <span class="answer-box-small"></span> stars.</p>
</div>
```

### Q3-Q4: Story Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and answer.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has 16 apples. <strong>Max</strong> has 13 apples. Who has more?</span>
  </div>
  <p class="sub-question">a) <span class="answer-box-word"></span> has more apples.</p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "The number after 19 is 21."
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What number really comes after 19? <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 12, 15</p>
  <p><strong>2.</strong> 12, 15</p>
  <p><strong>3.</strong> 17, 19</p>
  <p><strong>4.</strong> 19, 14</p>
  <p><strong>5.</strong> No, 20</p>
</div>
```

## Key Vocabulary by Level
- **Foundation**: count, number, next, before, after
- **Varied**: greater, smaller, order, more, less, one more, one less
- **Challenge**: tens, ones, place value, altogether

## Visual Design Notes
- Number boxes with blue borders
- Highlighted boxes for missing numbers
- Green boxes for place value
- Large counting items (28pt)
- Clear number sequence layouts

## Input Count
- 10 input boxes per worksheet (varies by question type)

## Counting Objects
Use 12-20 emojis for counting:
- ⭐🐝🌟🔵 (repeating patterns)
