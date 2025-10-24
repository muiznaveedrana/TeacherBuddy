# Year 2: Numbers to 100 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 2 numbers to 100 questions.

## CRITICAL RULES

**Number Range:** 0-100 (focus on tens and ones)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Place Value:** Understand tens and ones digits
**Visual:** Base-10 blocks, hundred square, place value charts

## 5-QUESTION FORMAT

**Q1:** Represent number with base-10 blocks (show tens rods and ones cubes)
**Q2:** Place value chart - identify tens and ones
**Q3:** Number line to 100 - find position
**Q4:** Number words - match numeral to word
**Q5:** Word problem - place value context

## BASE-10 BLOCKS

- **Tens rod**: Rectangle = 10 units
- **Ones cube**: Small square = 1 unit
- Example: 47 = 4 tens rods + 7 ones cubes

## NUMBER WORDS

**Tens:** twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety
**Teens:** eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen
**Compound:** twenty-one, thirty-five, forty-two, etc.

## EXAMPLE OUTPUT

**Q1 (Base-10 Blocks):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> What number is shown?</p>
    <div class="base10-visual">
        <div class="tens-group">
            <div class="tens-rod"></div>
            <div class="tens-rod"></div>
            <div class="tens-rod"></div>
        </div>
        <div class="ones-group">
            <div class="ones-cube"></div>
            <div class="ones-cube"></div>
            <div class="ones-cube"></div>
            <div class="ones-cube"></div>
            <div class="ones-cube"></div>
        </div>
    </div>
    <p class="answer-prompt">The number shown is <span class="answer-line">__________</span></p>
</div>
```

**Q2 (Place Value Chart):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Complete the place value chart for the number 68.</p>
    <div class="place-value-chart">
        <div class="pv-header">
            <div class="pv-column">Tens</div>
            <div class="pv-column">Ones</div>
        </div>
        <div class="pv-values">
            <div class="pv-cell answer-box"></div>
            <div class="pv-cell answer-box"></div>
        </div>
    </div>
</div>
```

**Q3 (Number Line):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Where is 45 on the number line?</p>
    <div class="number-line">
        <div class="nl-marker" data-value="30">30</div>
        <div class="nl-marker" data-value="40">40</div>
        <div class="nl-marker missing" data-value="45">?</div>
        <div class="nl-marker" data-value="50">50</div>
        <div class="nl-marker" data-value="60">60</div>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 35 (3 tens and 5 ones)</p>
        <p><strong>2.</strong> Tens: 6, Ones: 8</p>
        <p><strong>3.</strong> 45 (between 40 and 50)</p>
        <p><strong>4.</strong> Seventy-two = 72</p>
        <p><strong>5.</strong> 54 books (5 tens and 4 ones)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
