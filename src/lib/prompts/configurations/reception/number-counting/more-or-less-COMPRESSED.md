# Reception: More or Less (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception comparing quantities questions.

## CRITICAL RULES

**Numbers:** 1-10 ONLY (NO 0,11,12,15,20,100,666)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Comparison:** Use "more", "fewer/less", "most", "fewest" - age-appropriate language
**Visual Differences:** Minimum 2-3 objects difference for clear comparison
**Images:** EVERY comparison needs visual groups

## 5-QUESTION FORMAT

**Q1:** Which group has MORE? (2 groups, simple)
**Q2:** Which group has FEWER? (2 groups, opposite concept)
**Q3:** Who has the MOST? (3 groups, names)
**Q4:** Count and compare - which has MORE? (2 groups, with counting)
**Q5:** Real-world scenario - who has FEWER? (contextual)

## VERIFIED OBJECTS (67 total)

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

**FRESHNESS:** Use fresh categories, avoid forbidden objects, 80%+ novelty.

## CHILD NAMES

**Boys:** Ben, Sam, Jack, Oliver, Noah, Harry, Leo, Ethan
**Girls:** Emma, Lily, Sophie, Ava, Mia, Isla, Grace, Ella

## EXAMPLE OUTPUT

**Q1 (More - 2 groups):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which group has MORE apples?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">Group A</span>
            <div class="objects-display">
                <!-- 3 apples -->
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
                <!-- Repeat 3x total -->
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Group B</span>
            <div class="objects-display">
                <!-- 7 apples -->
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
                <!-- Repeat 7x total -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">Circle: <span class="answer-choice">Group A</span> or <span class="answer-choice">Group B</span></p>
</div>
```

**Q3 (Most - 3 groups with names):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Who has the MOST cars?</p>
    <div class="three-way-comparison">
        <div class="comparison-group">
            <span class="group-label">Emma</span>
            <div class="objects-display">
                <!-- 5 cars -->
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Ben</span>
            <div class="objects-display">
                <!-- 8 cars (MOST) -->
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Lily</span>
            <div class="objects-display">
                <!-- 3 cars -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">Who has the MOST? Emma, Ben, or Lily</p>
</div>
```

**Answer Key (add at end):**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Group B (more apples)</p>
        <p><strong>2.</strong> Group A (fewer flowers)</p>
        <p><strong>3.</strong> Ben (most cars)</p>
        <p><strong>4.</strong> Box 1: 6, Box 2: 4. Box 1 has more.</p>
        <p><strong>5.</strong> Emma (fewer cookies)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
