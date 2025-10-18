# Year 1: Length and Height (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 length and height questions.

## CRITICAL RULES

**Measurement:** Non-standard units (cubes, hands, paper clips)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Language:** longer, shorter, taller, tallest, longest, shortest
**Visual:** Objects to measure, comparison visuals, rulers with units

## 5-QUESTION FORMAT

**Q1:** Direct comparison - which is longer/taller? (visual comparison, 2 objects)
**Q2:** Measure with non-standard units (count cubes/clips to measure object)
**Q3:** Order by length (arrange 3 objects from shortest to longest)
**Q4:** Comparison word problem (real-world context)
**Q5:** Estimate and measure (predict length, then measure)

## NON-STANDARD UNITS

- Cubes/blocks (most common)
- Paper clips
- Hand spans
- Footsteps
- Pencils/crayons

## VOCABULARY

**Comparative:** longer, shorter, taller, wider
**Superlative:** longest, shortest, tallest, widest
**Measurement:** measure, length, height, about, approximately

## EXAMPLE OUTPUT

**Q1 (Direct Comparison):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which pencil is LONGER?</p>
    <div class="comparison-visual">
        <div class="object-to-compare">
            <p class="object-label">Pencil A</p>
            <div class="pencil short-pencil"></div>
        </div>
        <div class="object-to-compare">
            <p class="object-label">Pencil B</p>
            <div class="pencil long-pencil"></div>
        </div>
    </div>
    <p class="answer-prompt">Circle: <span class="choice">Pencil A</span> or <span class="choice">Pencil B</span></p>
</div>
```

**Q2 (Measure with Units):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> How many cubes long is the ribbon?</p>
    <div class="measurement-visual">
        <div class="object-to-measure ribbon"></div>
        <div class="unit-ruler">
            <div class="unit-cube"></div>
            <div class="unit-cube"></div>
            <div class="unit-cube"></div>
            <div class="unit-cube"></div>
            <div class="unit-cube"></div>
            <div class="unit-cube"></div>
        </div>
    </div>
    <p class="answer-prompt">The ribbon is <span class="answer-box"></span> cubes long.</p>
</div>
```

**Q3 (Order by Length):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Write the numbers 1, 2, 3 to order from SHORTEST to LONGEST.</p>
    <div class="ordering-visual">
        <div class="item-box"><div class="line medium-line"></div><p class="order-box">___</p></div>
        <div class="item-box"><div class="line short-line"></div><p class="order-box">___</p></div>
        <div class="item-box"><div class="line long-line"></div><p class="order-box">___</p></div>
    </div>
</div>
```

**Q4 (Word Problem):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Ben's pencil is 8 cubes long. Emma's pencil is 5 cubes long. Whose pencil is longer?</p>
    <div class="comparison-bars">
        <div class="bar-row"><p class="person-label">Ben</p><div class="bar" style="width: 240px;">8 cubes</div></div>
        <div class="bar-row"><p class="person-label">Emma</p><div class="bar" style="width: 150px;">5 cubes</div></div>
    </div>
    <p class="answer-prompt"><span class="answer-line">________</span> has the longer pencil.</p>
</div>
```

**Q5 (Estimate and Measure):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Estimate: About how many paper clips long is the book? Then measure.</p>
    <div class="estimate-measure">
        <div class="book-visual"></div>
        <div class="clip-ruler">
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
            <div class="paper-clip"></div>
        </div>
    </div>
    <p class="answer-prompt">Estimate: <span class="answer-box"></span> clips | Actual: <span class="answer-box"></span> clips</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Pencil B (longer)</p>
        <p><strong>2.</strong> 6 cubes long</p>
        <p><strong>3.</strong> Order: 2 (short), 1 (medium), 3 (long)</p>
        <p><strong>4.</strong> Ben (8 cubes > 5 cubes)</p>
        <p><strong>5.</strong> Actual: 7 clips (estimates vary)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
