# Reception: Counting to 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception counting questions.

## CRITICAL RULES

**Numbers:** 1-10 ONLY (NO 0,11,12,15,20,100,666)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Objects:** ONE type per question, ALL different, real-world contexts
**Images:** EVERY question needs images via `.counting-objects-grid`

## QUESTION TEMPLATES

1. "How many [objects] are there?"
2. "[Name] has [n] [objects]. How many [objects] does [Name] have?"
3. "Count the [objects]."

## VERIFIED OBJECTS (67 total - all have working images)

**Fruits (10):** apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple

**Garden (9):** flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn

**School (9):** book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack

**Farm (9):** chicken, cow, sheep, pig, horse, duck, goat, goose, turkey

**Toys (5):** ball, car, doll, kite, block

**Vegetables (6):** carrot, tomato, broccoli, cucumber, pepper, potato

**Sports (5):** football, basketball, tennis ball, bat, medal

**Food (2):** cookie, cupcake

**Shapes (7):** star, heart, circle, square, diamond, sun, moon

**Vehicles (5):** car, bus, bike, train, plane

**FRESHNESS:** System provides forbidden list. Use fresh categories, avoid forbidden objects, target 80%+ novelty.

## EXAMPLE OUTPUT

**Question 1:**
```html
<div class="question">
    <p class="question-text"><span class="question-number">1.</span> How many strawberries are there?</p>
    <div class="counting-objects-grid">
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="80" height="80" alt="Strawberry" />
        <!-- Repeat 7 times total -->
    </div>
    <p class="answer-line">Answer: _________</p>
</div>
```

**Answer Key (add at end):**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 7 strawberries</p>
        <p><strong>2.</strong> 5 bees</p>
        <p><strong>3.</strong> 9 pencils</p>
        <p><strong>4.</strong> 6 carrots</p>
        <p><strong>5.</strong> 8 footballs</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
