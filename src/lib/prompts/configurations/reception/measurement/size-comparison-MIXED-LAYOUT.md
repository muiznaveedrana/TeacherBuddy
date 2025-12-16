# Size Comparison - Mixed Layout Prompt

## Overview
Reception-level worksheet for comparing sizes using visual differences in emoji/font sizes.

## Difficulty Levels
- **Foundation**: Big/Small identification (2 items)
- **Varied**: Bigger/Smaller comparisons (2-3 items)
- **Challenge**: Ordering by size (3-4 items)

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual size identification
- **Section B (Application)**: Q3-Q4 - Contextual comparisons
- **Section C (Reasoning)**: Q5 - True/False with verification

## CSS Size Classes
```css
.xlarge{font-size:64pt}
.large{font-size:50pt}
.medium{font-size:38pt}
.small{font-size:26pt}
.big{font-size:60pt}  /* Foundation only */
```

## HTML Patterns

### Size Container
```html
<div class="size-container">
  <div class="size-item">
    <span class="big">🐘</span>
    <p class="size-label">A</p>
  </div>
  <div class="size-item">
    <span class="small">🐘</span>
    <p class="size-label">B</p>
  </div>
</div>
```

### Q1-Q2: Size Identification (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Circle the BIG one. Write A or B.</p>
  <div class="comparison-box">
    <div class="size-container">
      <div class="size-item">
        <span class="big">🐘</span>
        <p class="size-label">A</p>
      </div>
      <div class="size-item">
        <span class="small">🐘</span>
        <p class="size-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) The BIG elephant is <span class="answer-box-small"></span></p>
</div>
```

### Q3-Q4: Story Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Look at the picture. Answer the question.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> sees two flowers. Which is big?</span>
    <div class="size-container">...</div>
  </div>
  <p class="sub-question">a) The BIG flower is <span class="answer-box-small"></span></p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "<span class="small">🐱</span> is bigger than <span class="big">🐱</span>"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) Which is BIGGER - A or B? <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> A, B</p>
  <p><strong>2.</strong> A, B</p>
  <p><strong>3.</strong> A, A</p>
  <p><strong>4.</strong> BIG, SMALL</p>
  <p><strong>5.</strong> No, B</p>
</div>
```

For ordering questions (Challenge):
```html
<p><strong>1.</strong> B A C, A</p>
```

## Key Vocabulary by Level
- **Foundation**: big, small
- **Varied**: bigger, smaller, biggest, smallest
- **Challenge**: biggest, smallest, middle, order

## Visual Design Notes
- Use same emoji at different font sizes
- Minimum 30% size difference between items
- Labels A, B, C below items
- Consistent sizing across questions
- Clear visual hierarchy

## Input Count
- 10 input boxes per worksheet (varies by question type)

## Emojis
- Animals: 🐘🐶🐻🐱🐟🦋🐸
- Objects: 🎈⭐🌻🚗🏠🧸🎁🎂🌲
- Shapes: 🔵
