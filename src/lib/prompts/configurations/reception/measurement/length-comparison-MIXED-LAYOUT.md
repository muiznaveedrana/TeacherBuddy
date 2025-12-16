# Length Comparison - Mixed Layout Prompt

## Overview
Reception-level worksheet for comparing lengths using visual representations.

## Difficulty Levels
- **Foundation**: Long/Short identification (2 items)
- **Varied**: Longer/Shorter comparisons (2-3 items)
- **Challenge**: Ordering by length (3-4 items)

## Structure
- **Section A (Fluency)**: Q1-Q2 - Visual length identification
- **Section B (Application)**: Q3-Q4 - Contextual comparisons
- **Section C (Reasoning)**: Q5 - True/False with verification

## HTML Patterns

### Length Container
```html
<div class="length-container">
  <div class="length-item">
    <span class="length-label">A</span>
    <span>🐍🐍🐍🐍🐍🐍🐍</span>
  </div>
  <div class="length-item">
    <span class="length-label">B</span>
    <span>🐍🐍</span>
  </div>
</div>
```

### CSS
```css
.length-container{display:flex;flex-direction:column;align-items:flex-start;gap:12px;padding:15px}
.length-item{display:flex;align-items:center;gap:10px}
.length-label{font-size:12pt;color:#666;min-width:20px}
```

### Q1-Q2: Length Identification (Fluency)
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Which is LONG? Write A or B.</p>
  <div class="comparison-box">
    <div class="length-container">
      <div class="length-item">
        <span class="length-label">A</span>
        <span>🐍🐍🐍🐍🐍🐍🐍</span>
      </div>
      <div class="length-item">
        <span class="length-label">B</span>
        <span>🐍🐍</span>
      </div>
    </div>
  </div>
  <p class="sub-question">a) The LONG snake is <span class="answer-box-small"></span></p>
</div>
```

### Q3-Q4: Story Context (Application)
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Look and answer.</p>
  <div class="word-problem-box">
    <span class="character-icon">👧</span>
    <span class="story-text"><strong>Lily</strong> has two ribbons. Which is long?</span>
    <div class="length-container" style="background:#FFF8E1;border-radius:8px;padding:10px">
      ...
    </div>
  </div>
  <p class="sub-question">a) The LONG ribbon is <span class="answer-box-small"></span></p>
</div>
```

### Q5: True/False (Reasoning)
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <span class="character-icon">👦</span>
      <strong>Tom says:</strong> "━━ is longer than ━━━━━━━━"
    </div>
  </div>
  <p class="sub-question">a) Is Tom correct? <span class="answer-box-word"></span> (Yes / No)</p>
  <p class="sub-question">b) Which is LONGER - A or B? <span class="answer-box-small"></span></p>
</div>
```

## Answer Key Format
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> A, B</p>
  <p><strong>2.</strong> B, A</p>
  <p><strong>3.</strong> A, A</p>
  <p><strong>4.</strong> LONG, SHORT</p>
  <p><strong>5.</strong> No, B</p>
</div>
```

For ordering questions (Challenge):
```html
<p><strong>1.</strong> B A C, A</p>
```

## Key Vocabulary by Level
- **Foundation**: long, short
- **Varied**: longer, shorter, longest, shortest
- **Challenge**: longest, shortest, middle, order

## Visual Techniques
- Repeat emojis horizontally to show length
- Use same emoji type at different repetitions
- Minimum 50% length difference between items
- Labels A, B, C to left of items
- Aligned left edges for fair comparison

## Input Count
- 10 input boxes per worksheet (varies by question type)

## Emojis
- Animals: 🐍🐊🦎🪱🐛
- Objects: ✏️📏🖍️🧣
- Transport: 🚂🚃🚌
- Lines: ━━━ (for ribbons/bars)
