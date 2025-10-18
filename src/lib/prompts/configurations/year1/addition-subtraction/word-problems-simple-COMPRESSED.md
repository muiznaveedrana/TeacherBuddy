# Year 1: Simple Word Problems (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 simple word problems (addition/subtraction).

## CRITICAL RULES

**Operations:** Addition and subtraction within 20
**Questions:** EXACTLY {{questionCount}} - count before returning
**Language:** Simple, 1-2 sentences, clear action words
**Visual:** WORKSHEET_OBJECTS illustrations, number sentences

## 5-QUESTION FORMAT

**Q1:** Addition word problem - combining (join sets, result unknown)
**Q2:** Subtraction word problem - taking away (remove items, result unknown)
**Q3:** Addition word problem - part unknown (total given, find missing part)
**Q4:** Comparison problem (how many more/fewer)
**Q5:** Two-step simple problem (add then subtract or vice versa)

## ACTION WORDS

**Addition:** has, gets, buys, finds, picks, receives
**Subtraction:** gives away, eats, loses, flies away, sells
**Comparison:** more than, fewer than, less than

## CONTEXTS & OBJECTS

**Toys:** car, ball, teddy bear, doll, kite
**Fruits:** apple, banana, orange, strawberry
**School:** pencil, book, crayon
**Animals:** farm animals, pets
**People names:** Ben, Emma, Sam, Lily, Jack, Sophie

## EXAMPLE OUTPUT

**Q1 (Addition - Combining):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Ben has 7 toy cars. Emma gives him 5 more cars. How many cars does Ben have now?</p>
    <div class="word-problem-visual">
        <div class="problem-scene">
            <div class="object-group">
                <p class="label">Ben's cars</p>
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
            </div>
            <div class="operator-symbol">+</div>
            <div class="object-group">
                <p class="label">Emma gives 5</p>
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/car.png" width="40" height="40" alt="Car" />
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">7</span> <span class="op">+</span> <span class="num">5</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt">Ben has <span class="answer-line">___</span> cars.</p>
</div>
```

**Q2 (Subtraction - Taking Away):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Lily had 12 strawberries. She ate 5. How many strawberries are left?</p>
    <div class="word-problem-visual">
        <div class="problem-scene">
            <div class="object-group">
                <p class="label">Lily's strawberries</p>
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="40" height="40" alt="Strawberry" />
                <p class="action">She ate 5</p>
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">12</span> <span class="op">−</span> <span class="num">5</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt"><span class="answer-line">___</span> strawberries are left.</p>
</div>
```

**Q4 (Comparison - How Many More):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Sam has 9 pencils. Jack has 6 pencils. How many more pencils does Sam have?</p>
    <div class="comparison-visual">
        <div class="comparison-row">
            <p class="person-label">Sam</p>
            <div class="object-line">
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
            </div>
        </div>
        <div class="comparison-row">
            <p class="person-label">Jack</p>
            <div class="object-line">
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
                <img src="/images/WORKSHEET_OBJECTS/counting/school/pencil.png" width="35" height="35" alt="Pencil" />
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">9</span> <span class="op">−</span> <span class="num">6</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt">Sam has <span class="answer-line">___</span> more pencils.</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 12 cars (7 + 5 = 12)</p>
        <p><strong>2.</strong> 7 strawberries (12 − 5 = 7)</p>
        <p><strong>3.</strong> 4 apples (10 − 6 = 4, missing part)</p>
        <p><strong>4.</strong> 3 more pencils (9 − 6 = 3, comparison)</p>
        <p><strong>5.</strong> 9 books (14 − 5 = 9, two-step)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
