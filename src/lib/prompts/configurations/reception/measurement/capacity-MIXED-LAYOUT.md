# Capacity - Mixed Layout Prompt

## Overview
Reception-level worksheet for comparing capacity and amounts in containers.

## Difficulty Levels
- **Foundation**: Full/Empty identification (2 items)
- **Varied**: Holds more/less comparisons (2-3 items)
- **Challenge**: Ordering by amount (3-4 items)

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual capacity identification
- **Section B (Application)**: Q3-Q4 - Contextual comparisons
- **Section C (Reasoning)**: Q5 - True/False with verification

## CSS for Glass Containers
```css
.glass{width:50px;height:70px;border:4px solid #90CAF9;border-top:none;border-radius:0 0 10px 10px;position:relative;margin:0 auto}
.glass-full{background:linear-gradient(to top,#2196F3 0%,#2196F3 90%,transparent 90%)}
.glass-most{background:linear-gradient(to top,#2196F3 0%,#2196F3 75%,transparent 75%)}
.glass-half{background:linear-gradient(to top,#2196F3 0%,#2196F3 50%,transparent 50%)}
.glass-little{background:linear-gradient(to top,#2196F3 0%,#2196F3 25%,transparent 25%)}
.glass-empty{background:transparent}
```

## HTML Patterns

### Container Row
```html
<div class="container-row">
  <div class="container-item">
    <div class="glass glass-full"></div>
    <p class="container-label">A</p>
  </div>
  <div class="container-item">
    <div class="glass glass-empty"></div>
    <p class="container-label">B</p>
  </div>
</div>
```

### Q1-Q2: Capacity Identification (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Which is FULL? Write A or B.</p>
  <div class="comparison-box">
    <div class="container-row">
      <div class="container-item">
        <div class="glass glass-full"></div>
        <p class="container-label">A</p>
      </div>
      <div class="container-item">
        <div class="glass glass-empty"></div>
        <p class="container-label">B</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) The FULL glass is <span class="answer-box-small"></span></p>
</div>
```

### Q3-Q4: Story Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Help answer the question.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has two jugs. Which has more juice?</span>
    <div class="container-row">...</div>
  </div>
  <p class="sub-question">a) Jug <span class="answer-box-small"></span> has MORE juice.</p>
</div>
```

### Different Liquids (Color Variations)
- Water: #2196F3 (blue)
- Juice: #FF9800 (orange)
- Milk: white with #DDD border
- Sand: #FFD54F (yellow)

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> A, B</p>
  <p><strong>2.</strong> B, A</p>
  <p><strong>3.</strong> B, B</p>
  <p><strong>4.</strong> A, B</p>
  <p><strong>5.</strong> No, full</p>
</div>
```

## Key Vocabulary by Level
- **Foundation**: full, empty
- **Varied**: more, less, holds more, holds less
- **Challenge**: most, least, middle, order

## Fill Levels
- Full: 90%
- Most: 75%
- Half: 50%
- Little: 25%
- Empty: 0%

## Visual Design Notes
- Consistent glass sizes for fair comparison
- Clear fill level differences (25% increments)
- Labels A, B, C below containers
- Different colors for different liquids
- Gradient creates realistic liquid appearance

## Input Count
- 10 input boxes per worksheet (varies by question type)

## Container Emojis (Alternative)
- 🥛🍼🧴🫙🍯🪣🛁🥤🍵☕
