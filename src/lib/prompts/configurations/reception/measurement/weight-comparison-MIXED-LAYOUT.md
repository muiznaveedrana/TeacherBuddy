# Weight Comparison - Mixed Layout Prompt

## Overview
Reception-level worksheet for comparing weights using common objects and animals.

## Difficulty Levels
- **Foundation**: Heavy/Light identification (2 items)
- **Varied**: Heavier/Lighter comparisons with balance scales (2-3 items)
- **Challenge**: Ordering by weight (3-4 items)

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual weight identification
- **Section B (Application)**: Q3-Q4 - Contextual comparisons with balance
- **Section C (Reasoning)**: Q5 - True/False with verification

## HTML Patterns

### Scale Container
```html
<div class="scale-container">
  <div class="scale-item">
    <span style="font-size:48pt">🐘</span>
    <p class="scale-label">A</p>
  </div>
  <div class="scale-item">
    <span style="font-size:48pt">🐁</span>
    <p class="scale-label">B</p>
  </div>
</div>
```

### Balance Scale CSS
```css
.balance{display:flex;flex-direction:column;align-items:center}
.balance-beam{width:200px;height:8px;background:linear-gradient(90deg,#795548,#8D6E63);border-radius:4px}
.beam-tilt-left{transform:rotate(-10deg)}
.beam-tilt-right{transform:rotate(10deg)}
.balance-pans{display:flex;justify-content:space-between;width:200px;margin-top:-5px}
.pan{width:60px;height:25px;background:#FFD54F;border:2px solid #FFA000;border-radius:0 0 30px 30px;display:flex;align-items:center;justify-content:center;font-size:24pt}
.pan-low{margin-top:20px}
.pan-high{margin-top:-10px}
```

### Q1-Q2: Weight Identification (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Which is HEAVY? Write A or B.</p>
  <div class="comparison-box">
    <div class="scale-container">
      <div class="scale-item">
        <span>🐘</span>
        <p class="scale-label">A</p>
      </div>
      <div class="scale-item">
        <span>🐁</span>
        <p class="scale-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) The HEAVY animal is <span class="answer-box-small"></span></p>
</div>
```

### Q3: Balance Scale (Application)
```html
<div class="word-problem-box">
  <span class="story-text">The heavy side goes down.</span>
  <div class="comparison-box" style="background:#FFF8E1">
    <div class="balance">
      <div class="balance-beam beam-tilt-left"></div>
      <div class="balance-pans">
        <div class="pan pan-low">🪨</div>
        <div class="pan pan-high">🪶</div>
      </div>
    </div>
  </div>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "🪶 is heavier than 🐘"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) Which is HEAVIER? <span class="answer-box-word"></span></p>
</div>
```

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> A, B</p>
  <p><strong>2.</strong> A, B</p>
  <p><strong>3.</strong> A, B</p>
  <p><strong>4.</strong> HEAVY, LIGHT</p>
  <p><strong>5.</strong> No, elephant</p>
</div>
```

## Key Vocabulary by Level
- **Foundation**: heavy, light
- **Varied**: heavier, lighter, heaviest, lightest
- **Challenge**: heaviest, lightest, middle, order

## Object Pairs (Clear Weight Differences)
- Heavy: 🐘🪨🧱🍉🎃🏀📚🚗
- Light: 🐁🪶🎈🍃🫧🦋✏️🍇

## Visual Design Notes
- Use objects children understand intuitively
- Balance scale tilts toward heavy side
- Same font size for fair comparison
- Clear labels A, B, C below items
- Word answers for some questions (HEAVY/LIGHT)

## Input Count
- 10 input boxes per worksheet (varies by question type)
