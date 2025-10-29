# Reception Counting Worksheet Generator (1-10)

## Parameters
**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions.**
- Questions: {{questionCount}} (exact count required)
- Year Group: Reception
- Number Range: 1-10 only
- Topic: Counting to 10

## 🚫 FORBIDDEN QUESTION FORMAT (VIOLATION = UNUSABLE WORKSHEET)

**YOU MUST NEVER STATE THE NUMBER IN THE QUESTION TEXT.**

The student must count the images to find the answer. If you include the number in the question, the student can answer without counting, making the worksheet completely useless.

**FORBIDDEN FORMATS - DO NOT USE THESE:**
- ❌ "[Name] has 8 [objects]. How many [objects] does [Name] have?"
- ❌ "[Name] is counting 5 [objects]. How many are there?"
- ❌ "There are 3 [objects]. How many [objects] are there?"
- ❌ ANY format that mentions a specific number before asking the question

**ONLY USE THESE APPROVED FORMATS:**
- ✅ "How many [objects] are there?"
- ✅ "How many [objects] does [Name] have?"
- ✅ "Count the [objects]."
- ✅ "[Name] is counting [objects]. How many are there?"

## Core Requirements

### 1. Image Display Rules
**MANDATORY:** Use `<img>` tags for ALL countable objects
- Pattern: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`
- Format: `<img src="{path}" width="50" height="50" alt="{Object}" />`
- NEVER use text labels or emoji for countable items

### 2. Question Structure
Each question must have:
- Colored background (rotate: #FFF9C4, #F1F8E9, #E3F2FD, #FCE4EC, #FFF3E0)
- Question text with number
- `.counting-objects-grid` container with images
- Answer line

### 3. Approved Question Templates
Use these formats ONLY (vary usage across questions):
1. "How many [objects] are there?"
2. "How many [objects] does [Name] have?"
3. "Count the [objects]."
4. "[Name] is counting [objects]. How many are there?"

## Available Objects (67 total)

### Categories & Folder Mapping
- **fruits** (10): apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple
- **farm_animals** (9): chicken, cow, sheep, pig, horse, duck, goat, goose, turkey
- **garden** (9): flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn
- **school_supplies** (9): book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack
- **vegetables** (6): carrot, tomato, broccoli, cucumber, pepper, potato
- **shapes** (7): star, heart, circle, square, diamond, sun, moon
- **toys** (5): ball, car, doll, kite, block
- **vehicles** (5): car, bus, bike, train, plane
- **sports** (5): football, basketball, tennis_ball, bat, medal
- **food_treats** (2): cookie, cupcake

## Constraints
- Use DIFFERENT object for each question
- Use DIFFERENT number for each question (maximize variety across 1-10 range)
- **RANDOMIZE number order** - DO NOT use sequential numbers (e.g., NOT 1,2,3,4,5 or 6,7,8,9,10)
- Numbers 1-10 only (no 0, 11+)
- ONE object type per question
- Real-world contexts preferred
- Avoid recently used objects (system provides forbidden list)
- Distribute numbers across full range: include some small (1-3), medium (4-7), and large (8-10) quantities
- Example good order: 3, 7, 2, 9, 5 (mixed) ✓
- Example bad order: 1, 2, 3, 4, 5 (sequential) ✗

## Output Format

### Question Example
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> How many apples are there?</p>
    <div class="counting-objects-grid">
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="50" height="50" alt="Apple" />
        <!-- Repeat for actual count (e.g., 7 times) -->
    </div>
    <p class="answer-line">Answer: _________</p>
</div>
```

**Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

