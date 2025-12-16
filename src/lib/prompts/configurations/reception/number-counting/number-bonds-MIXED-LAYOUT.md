# Number Bonds - Mixed Layout Prompt

## Overview
Reception-level worksheet for number bonds (pairs that make a target number) using visual emoji representations.

## Difficulty Levels
- **Foundation**: Bonds to 5 (e.g., 3+2, 4+1)
- **Varied**: Bonds to 10 (e.g., 6+4, 7+3)
- **Challenge**: Mixed bonds with missing first addend

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual number bonds with missing addend
- **Section B (Application)**: Q3-Q4 - Story problems with bonds context
- **Section C (Reasoning)**: Q5 - True/False with bond verification

## HTML Patterns

### Q1-Q2: Visual Bonds (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>What makes 5? Count and write.</p>
  <div class="bond-box">
    <span class="counting-items">🔵🔵🔵</span>
    <span class="plus-sign">+</span>
    <span class="counting-items">🔵🔵</span>
    <span class="equals-sign">=</span>
    <span class="bond-circle">5</span>
  </div>
  <p class="sub-question">a) 3 + <span class="answer-box-small"></span> = 5</p>
</div>
```

### Bond Circle CSS
```css
.bond-circle{width:60px;height:60px;border-radius:50%;background:#FFE082;border:3px solid #FFA000;display:flex;align-items:center;justify-content:center;font-size:24pt;font-weight:bold}
```

### Q3-Q4: Story Problems (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and find the bond to 5.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Amy</strong> has 2 red apples and some green apples.</span>
    <div class="counting-box inline"><p class="counting-items">🍎🍎</p></div>
    <span class="story-text">She has 5 apples altogether.</span>
  </div>
  <p class="sub-question">a) How many green apples? <span class="answer-box-small"></span></p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "2 + 2 = 5"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) 2 + 2 = <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
Comma-separated values for parser compatibility:
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 2, 1</p>
  <p><strong>2.</strong> 3, 4</p>
  <p><strong>3.</strong> 3, 2</p>
  <p><strong>4.</strong> 1, 3</p>
  <p><strong>5.</strong> No, 4</p>
</div>
```

## Key CSS Classes
- `.bond-box` - Flex container for visual equation
- `.bond-circle` - Yellow circular target number display
- `.plus-sign`, `.equals-sign` - Green colored operators (#4CAF50)
- `.counting-items` - Emoji display for counting
- `.word-problem-box` - Yellow bordered story container

## Visual Design Notes
- Use colored circles (🔵🔴🟢) for abstract bond representations
- Yellow bond-circle shows the target total prominently
- Mix of colored shapes and object emojis
- Character icons (👧👦) for story problems
- Clear "makes" or "altogether" language for bonds comprehension

## Input Count
- 10 input boxes per worksheet (2 per question × 5 questions)

## Emojis by Difficulty
- **Foundation**: 🔵🔴⭐🟢🍎🚗🍪🌸
- **Varied**: 🔵🔴⭐🟢🔴✏️🥚🍎
- **Challenge**: 🔵🔴⭐🟢🍇❓

## Question Variations
- Missing second addend: `3 + ___ = 5`
- Missing first addend: `___ + 7 = 10`
- Missing total: `4 + 4 = ___`
- Story context: "How many more needed?"
