# Reception: More or Less Comparison Worksheet

## Parameters
- Questions: {{questionCount}} (exactly)
- Year: Reception
- Numbers: 1-10 only
- Topic: Comparing quantities (more/fewer/most/fewest)

## Core Rules

### 1. Visual Display
- **Mandatory:** Use `<img>` tags for ALL objects (never text)
- Pattern: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`
- Size: width="60" height="60" (consistent for all)
- Format: `<img src="{path}" width="60" height="60" alt="{Object}" />`

### 2. Comparison Requirements
- Minimum 2-3 object difference between groups (clear visual distinction)
- Use age-appropriate terms: "more", "fewer", "most", "fewest"
- Each question needs different object type
- Groups clearly labeled (A/B or child names)

### 3. Question Progression (5-question format)
1. Which has MORE? (2 groups)
2. Which has FEWER? (2 groups)
3. Who has the MOST? (3 groups with names)
4. Count and compare - which has MORE? (with explicit counting)
5. Real-world scenario - who has FEWER? (contextual story)

## Available Objects (67 total)

### Category Paths
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

### Child Names
Boys: Ben, Sam, Jack, Oliver, Noah, Harry, Leo, Ethan
Girls: Emma, Lily, Sophie, Ava, Mia, Isla, Grace, Ella

## Output Structure

### 2-Group Comparison
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which group has MORE apples?</p>
    <div class="comparison-container">
        <div class="comparison-group">
            <span class="group-label">Group A</span>
            <div class="objects-display">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
                <!-- Repeat 3x total -->
            </div>
        </div>
        <div class="comparison-group">
            <span class="group-label">Group B</span>
            <div class="objects-display">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
                <!-- Repeat 7x total -->
            </div>
        </div>
    </div>
    <p class="answer-prompt">Circle: <span class="answer-choice">Group A</span> or <span class="answer-choice">Group B</span></p>
</div>
```

### 3-Group Comparison (Q3)
Use `.three-way-comparison` container with three `.comparison-group` divs, each with child name label.

## Background Colors
Rotate: #FFF9C4 (yellow), #F1F8E9 (green), #E3F2FD (blue), #FCE4EC (pink), #FFF3E0 (orange)

Generate exactly {{questionCount}} questions following this structure.