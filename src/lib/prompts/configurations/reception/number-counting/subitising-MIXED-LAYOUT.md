# Subitising - Mixed Layout Prompt

## Overview
Reception-level worksheet for subitising (recognizing quantities without counting) using visual patterns.

## Difficulty Levels
- **Foundation**: Recognise 1-3 instantly
- **Varied**: Recognise 1-5 with dice and domino patterns
- **Challenge**: Recognise 5-10 using ten frames

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual pattern recognition
- **Section B (Application)**: Q3-Q4 - Contextual quick counting
- **Section C (Reasoning)**: Q5 - True/False with verification

## HTML Patterns

### Flash Box (Quick Look Display)
```html
<div class="flash-box">
  <p class="flash-label">Look quickly!</p>
  <p class="counting-items">🍎🍎</p>
</div>
```

### Dice Pattern CSS
```css
.dice-box{width:80px;height:80px;background:white;border:3px solid #333;border-radius:10px;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;justify-items:center;padding:8px}
.dice-dot{width:14px;height:14px;background:#333;border-radius:50%}
```

### Ten Frame CSS
```css
.ten-frame{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;background:#333;padding:5px;border-radius:8px;width:fit-content;margin:10px auto}
.ten-frame-cell{width:35px;height:35px;background:white;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:24pt}
```

### Domino Box CSS
```css
.domino-box{display:inline-flex;background:white;border:3px solid #333;border-radius:8px;overflow:hidden}
.domino-half{width:50px;height:60px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;padding:5px;gap:3px}
.domino-half:first-child{border-right:2px solid #333}
.domino-dot{width:10px;height:10px;background:#333;border-radius:50%}
```

### Q1-Q2: Visual Recognition (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>How many can you see? Write the number.</p>
  <div class="subitise-box">
    <div class="flash-box">
      <p class="flash-label">Look quickly!</p>
      <p class="counting-items">🍎🍎</p>
    </div>
  </div>
  <p class="sub-question">a) I see <span class="answer-box-small"></span> apples.</p>
</div>
```

### Q3-Q4: Story Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Look quickly and write.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Amy</strong> sees some birds. How many?</span>
    <div class="flash-box" style="background:#FFF8E1;border-color:#FFB300">
      <p class="counting-items">🐦🐦🐦</p>
    </div>
  </div>
  <p class="sub-question">a) Amy sees <span class="answer-box-small"></span> birds.</p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "🍎🍎🍎 is 2 apples"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) How many apples really? <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 2, 3</p>
  <p><strong>2.</strong> 1, 2</p>
  <p><strong>3.</strong> 3, 2</p>
  <p><strong>4.</strong> 3, 1</p>
  <p><strong>5.</strong> No, 3</p>
</div>
```

## Key Visual Elements
- **Flash boxes**: Dashed border signals "quick look"
- **Dice patterns**: Standard arrangements (1-6)
- **Domino patterns**: Split display for addition preview
- **Ten frames**: 5×2 grid for numbers 5-10

## Visual Design Notes
- Use consistent emoji sizes for quick recognition
- Blue dashed border for "flash" prompts
- Yellow background for story context variations
- Standard dice dot arrangements are critical
- Ten frames support structured recognition

## Input Count
- 10 input boxes per worksheet (2 per question × 5 questions)

## Emojis by Difficulty
- **Foundation**: 🍎⭐🐦🎈●
- **Varied**: 🍓🌸🍎🐚🐝
- **Challenge**: 🥚🍬🍎🍪🌟🔵

## Dice Patterns Reference
- 1: Center dot
- 2: Diagonal corners
- 3: Diagonal with center
- 4: Four corners
- 5: Four corners + center
- 6: Two columns of three
