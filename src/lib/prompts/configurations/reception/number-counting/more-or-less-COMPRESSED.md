# Reception: More or Less (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception comparing quantities questions.

## 🚨 ABSOLUTE RULE - IMG TAGS ONLY (NO EXCEPTIONS)

**YOU MUST USE `<img>` TAGS FOR ALL OBJECTS - NEVER TEXT LABELS**

### CRITICAL: Object Substitution Examples

When you see examples with one object, use the EXACT SAME pattern for ANY object you choose:

**Example 1: Fruits** (showing 3 apples):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
```

**Example 2: Farm Animals** (showing 4 cows):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="60" height="60" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="60" height="60" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="60" height="60" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="60" height="60" alt="Cow" />
```

**Example 3: School Supplies** (showing 6 books):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="60" height="60" alt="Book" />
```

**Example 4: Toys** (showing 2 balls):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="60" height="60" alt="Ball" />
```

**Example 5: Garden** (showing 7 flowers):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="60" height="60" alt="Flower" />
```

**Example 6: Food** (showing 5 cupcakes):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png" width="60" height="60" alt="Cupcake" />
<img src="/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png" width="60" height="60" alt="Cupcake" />
<img src="/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png" width="60" height="60" alt="Cupcake" />
<img src="/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png" width="60" height="60" alt="Cupcake" />
<img src="/images/WORKSHEET_OBJECTS/counting/food_treats/cupcake.png" width="60" height="60" alt="Cupcake" />
```

❌ **FORBIDDEN** - Text labels:
```html
Cow Cow Cow Cow
Book Book Book Book Book Book
Pencil Pencil Pencil
```

❌ **FORBIDDEN** - Mixing img tags with text:
```html
<img src="...cow.png" /> Cow <img src="...cow.png" /> Cow
```

**PATTERN**: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**FOLDER NAME MAPPING** (USE THESE EXACT NAMES):
- Fruits → `/counting/fruits/`
- Farm Animals → `/counting/farm_animals/` (NOT `/counting/farm/`)
- School Supplies → `/counting/school_supplies/` (NOT `/counting/school/`)
- Food Treats → `/counting/food_treats/` (NOT `/counting/food/`)
- Toys → `/counting/toys/`
- Garden → `/counting/garden/`
- Vegetables → `/counting/vegetables/`
- Sports → `/counting/sports/`
- Shapes → `/counting/shapes/`
- Vehicles → `/counting/vehicles/`

**THIS RULE APPLIES TO EVERY SINGLE OBJECT** - whether it's apples, cows, books, pencils, pigs, chickens, cupcakes, or ANY other object in VERIFIED OBJECTS. ALWAYS use explicit img tags with correct folder names. NEVER use text labels.

🚨 **CRITICAL - NO CSS OBJECTS**: NEVER use CSS-generated pencils, crayons, or rulers - they render disproportionately large! If you need pencils, use `/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png` at width="60" height="60" (same size as other objects). PREFERRED: Avoid pencils entirely - use sunflowers, chickens, balls, cupcakes instead.

## CRITICAL RULES

**Numbers:** 1-10 ONLY (NO 0,11,12,15,20,100,666)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Comparison:** Use "more", "fewer/less", "most", "fewest" - age-appropriate language
**Visual Differences:** Minimum 2-3 objects difference for clear comparison
**Images:** EVERY comparison needs visual groups (ALL at consistent size ~60x60px)
**Object Sizing:** ALL objects should be width="60" height="60" for consistent visual scale

## 5-QUESTION FORMAT

**Q1:** Which group has MORE? (2 groups, simple)
**Q2:** Which group has FEWER? (2 groups, opposite concept)
**Q3:** Who has the MOST? (3 groups, names)
**Q4:** Count and compare - which has MORE? (2 groups, with counting)
**Q5:** Real-world scenario - who has FEWER? (contextual)

## VERIFIED OBJECTS (67 total)

**Fruits (10):** apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple
**Garden (9):** flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn
**School Supplies (9):** book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack
**Farm Animals (9):** chicken, cow, sheep, pig, horse, duck, goat, goose, turkey
**Toys (5):** ball, car, doll, kite, block
**Vegetables (6):** carrot, tomato, broccoli, cucumber, pepper, potato
**Sports (5):** football, basketball, tennis ball, bat, medal
**Food Treats (2):** cookie, cupcake
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
