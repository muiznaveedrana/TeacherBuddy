# Reception: Size Comparison (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception size comparison questions.

## CRITICAL RULES

**Vocabulary:** bigger, smaller, taller, shorter, longer, wider, biggest, smallest, tallest, shortest
**Questions:** EXACTLY {{questionCount}} - count before returning
**Size Differences:** Minimum 30% - OBVIOUS differences for ages 4-5
**Visual:** Same objects in different sizes (not different objects)

## 5-QUESTION FORMAT

**Q1:** Which is BIGGER? (2 objects)
**Q2:** Which is SMALLER/SHORTER? (2 objects, opposite concept)
**Q3:** Which is BIGGEST/LONGEST? (3 objects, superlative)
**Q4:** Size ordering (smallest to biggest, 3 items)
**Q5:** Comparative reasoning (word problem with heights)

## SIZE VARIANTS

Small: 50-60px | Medium: 80-90px | Large: 110-130px

## EXAMPLE OUTPUT

**Q1 (Bigger - 2 objects):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which ball is BIGGER?</p>
    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Ball A</span>
            <div class="circle-object small-size" style="background: #4A90E2;"></div>
        </div>
        <div class="comparison-item">
            <span class="item-label">Ball B</span>
            <div class="circle-object large-size" style="background: #4A90E2;"></div>
        </div>
    </div>
    <p class="answer-prompt">Circle: Ball A or Ball B</p>
</div>
```

**Q3 (Longest - 3 objects):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Which pencil is LONGEST?</p>
    <div class="size-comparison-three">
        <div class="comparison-item">
            <span class="item-label">A</span>
            <div class="pencil-object short-pencil"></div>
        </div>
        <div class="comparison-item">
            <span class="item-label">B</span>
            <div class="pencil-object long-pencil"></div>
        </div>
        <div class="comparison-item">
            <span class="item-label">C</span>
            <div class="pencil-object medium-pencil"></div>
        </div>
    </div>
    <p class="answer-prompt">Circle: A, B, or C</p>
</div>
```

**Q5 (Reasoning):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Ben is TALLER than Emma. Emma is TALLER than Lily. Who is TALLEST?</p>
    <div class="height-comparison-scenario">
        <div class="child-figure">
            <div class="stick-figure short-height"></div>
            <p class="child-name">Lily</p>
        </div>
        <div class="child-figure">
            <div class="stick-figure medium-height"></div>
            <p class="child-name">Emma</p>
        </div>
        <div class="child-figure">
            <div class="stick-figure tall-height"></div>
            <p class="child-name">Ben</p>
        </div>
    </div>
    <p class="answer-prompt">Tallest: <span class="answer-line">_______</span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Ball B (bigger)</p>
        <p><strong>2.</strong> Tree 2 (shorter)</p>
        <p><strong>3.</strong> B - Pencil B (longest)</p>
        <p><strong>4.</strong> Smallest: Chicken, Medium: Sheep, Biggest: Horse</p>
        <p><strong>5.</strong> Ben (tallest)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
