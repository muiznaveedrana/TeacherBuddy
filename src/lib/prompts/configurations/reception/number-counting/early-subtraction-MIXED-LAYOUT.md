# Early Subtraction - Mixed Layout Prompt

## Overview
Reception-level worksheet for early subtraction concepts using visual crossed-out emoji representations.

## Difficulty Levels
- **Foundation**: Subtracting within 5 (e.g., 5-2, 4-1)
- **Varied**: Subtracting within 10 (e.g., 7-2, 9-3)
- **Challenge**: Subtracting from 10 (e.g., 10-4, 10-7)

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual subtraction with crossed-out emojis
- **Section B (Application)**: Q3-Q4 - Story problems with taking away context
- **Section C (Reasoning)**: Q5 - True/False with incorrect statement

## HTML Patterns

### Q1-Q2: Visual Subtraction (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Cross out and count. How many left?</p>
  <div class="subtraction-box">
    <span class="counting-items">🐟🐟🐟🐟🐟<span class="crossed-out">🐟🐟</span></span>
    <span class="minus-sign">−</span>
    <span style="font-size:28pt">2</span>
    <span class="equals-sign">=</span>
    <span class="answer-box-small"></span>
  </div>
  <p class="sub-question">a) 7 − 2 = <span class="answer-box-small"></span></p>
</div>
```

### Q3-Q4: Story Problems (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and take away.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has 9 grapes.</span>
    <div class="counting-box inline"><p class="counting-items">🍇🍇🍇🍇🍇🍇🍇🍇🍇</p></div>
    <span class="story-text">She eats 4.</span>
  </div>
  <p class="sub-question">a) How many grapes left? <span class="answer-box-small"></span></p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👧</span>
      <strong>Emma says:</strong> "9 − 5 = 3"
    </div>
  </div>
  <p class="sub-question">a) Is Emma correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) What is 9 − 5 really? <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
Comma-separated values for parser compatibility:
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 5, 6</p>
  <p><strong>2.</strong> 6, 4</p>
  <p><strong>3.</strong> 5, 7</p>
  <p><strong>4.</strong> 5, 5</p>
  <p><strong>5.</strong> No, 4</p>
</div>
```

## Key CSS Classes
- `.subtraction-box` - Flex container for visual equation
- `.minus-sign`, `.equals-sign` - Pink colored operators (#E91E63)
- `.crossed-out` - Line-through decoration for taken away items
- `.counting-items` - Large 36pt emoji display
- `.word-problem-box` - Yellow bordered story container

## Visual Design Notes
- Use crossed-out span for items being subtracted
- Pink minus and equals signs for subtraction theme
- Mix of animal, food, and object emojis
- Character icons (👧👦) for story problems
- Clear "taking away" language for Reception comprehension

## Input Count
- 10 input boxes per worksheet (2 per question × 5 questions)

## Emojis by Difficulty
- **Foundation**: 🍎🐶⭐🚗🍪🎈🦋
- **Varied**: 🐟🦋🎈🐝🍇⭐🐦🍬
- **Challenge**: 🍎⭐🐸🌸🍪🎈🦆🖍️
