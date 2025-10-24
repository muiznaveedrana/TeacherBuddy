# Reception: Counting to 10 (COMPRESSED)

Generate EXACTLY {{questionCount}} Reception counting questions.

## 🚨 ABSOLUTE RULE - IMG TAGS ONLY (NO EXCEPTIONS)

**YOU MUST USE `<img>` TAGS FOR ALL OBJECTS - NEVER TEXT LABELS**

### CRITICAL: Object Substitution Examples

When you see examples with one object, use the EXACT SAME pattern for ANY object you choose:

**Example 1: Fruits** (showing 3 apples):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
```

**Example 2: Farm Animals** (showing 4 cows):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="80" height="80" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="80" height="80" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="80" height="80" alt="Cow" />
<img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png" width="80" height="80" alt="Cow" />
```

**Example 3: School Supplies** (showing 6 books):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
<img src="/images/WORKSHEET_OBJECTS/counting/school_supplies/book.png" width="80" height="80" alt="Book" />
```

**Example 4: Toys** (showing 5 balls):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="80" height="80" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="80" height="80" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="80" height="80" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="80" height="80" alt="Ball" />
<img src="/images/WORKSHEET_OBJECTS/counting/toys/ball.png" width="80" height="80" alt="Ball" />
```

**Example 5: Garden** (showing 7 flowers):
```html
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
<img src="/images/WORKSHEET_OBJECTS/counting/garden/flower.png" width="80" height="80" alt="Flower" />
```

❌ **FORBIDDEN** - Text labels:
```html
Cow Cow Cow Cow
Book Book Book Book Book Book
Ball Ball Ball Ball Ball
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

**THIS RULE APPLIES TO EVERY SINGLE OBJECT** - whether it's apples, cows, books, pencils, pigs, chickens, or ANY other object in VERIFIED OBJECTS. ALWAYS use explicit img tags with correct folder names. NEVER use text labels.

## CRITICAL RULES

**Numbers:** 1-10 ONLY (NO 0,11,12,15,20,100,666)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Objects:** ONE type per question, ALL different, real-world contexts
**Images:** EVERY question needs images via `.counting-objects-grid`
**Colors:** MUST use colored backgrounds - rotate: Yellow (#FFF9C4), Green (#F1F8E9), Blue (#E3F2FD), Pink (#FCE4EC), Orange (#FFF3E0)

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

**Question 1 (Yellow background):**
```html
<div class="question" style="background: #FFF9C4;">
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
