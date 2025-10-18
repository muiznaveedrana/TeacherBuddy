# Year 1: Weight and Capacity (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 weight and capacity questions.

## CRITICAL RULES

**Measurement:** Non-standard units, direct comparison
**Questions:** EXACTLY {{questionCount}} - count before returning
**Vocabulary:** heavier, lighter, full, empty, holds more, holds less
**Visual:** Balance scales, containers, comparison visuals

## 5-QUESTION FORMAT

**Q1:** Direct comparison - which is heavier? (balance scale visual)
**Q2:** Order by weight (3 objects, lightest to heaviest)
**Q3:** Capacity - which holds more? (container comparison)
**Q4:** Word problem - weight/capacity context
**Q5:** Estimate weight/capacity (predict then check)

## VOCABULARY

**Weight:** heavier, lighter, weighs more, weighs less, heaviest, lightest
**Capacity:** full, empty, holds more, holds less, most, least

## EXAMPLE OUTPUT

**Q1 (Weight Comparison):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which is HEAVIER?</p>
    <div class="balance-scale">
        <div class="scale-left"><img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" /><p>Apple</p></div>
        <div class="scale-center">⚖️</div>
        <div class="scale-right"><img src="/images/WORKSHEET_OBJECTS/counting/fruits/watermelon.png" width="70" height="70" /><p>Watermelon</p></div>
    </div>
    <p class="answer-prompt">Circle: <span class="choice">Apple</span> or <span class="choice">Watermelon</span></p>
</div>
```

**Q3 (Capacity):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Which cup holds MORE water?</p>
    <div class="capacity-visual">
        <div class="container small-cup"><p>Cup A</p></div>
        <div class="container large-cup"><p>Cup B</p></div>
    </div>
    <p class="answer-prompt">Circle: <span class="choice">Cup A</span> or <span class="choice">Cup B</span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Watermelon (heavier)</p>
        <p><strong>2.</strong> Order: Feather, Apple, Book (lightest to heaviest)</p>
        <p><strong>3.</strong> Cup B (holds more)</p>
        <p><strong>4.</strong> Box B (heavier - word problem)</p>
        <p><strong>5.</strong> Estimates vary (check reasoning)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
