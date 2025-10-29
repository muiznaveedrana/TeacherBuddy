# Reception: Number Recognition Worksheet

## Parameters
- Questions: {{questionCount}} (exactly)
- Year: Reception  
- Number Range: 1-10 only
- Format: 5 distinct question types

## Core Rules

### Visual Display
- **Mandatory:** Use `<img>` tags for ALL objects
- Pattern: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`
- Standard size: width="50" height="50"
- Never use text labels for objects

### Question Logical Validity
- **CRITICAL:** ALL questions must be logically sound and answerable. NEVER ask students to identify objects by characteristics they don't have.
- **PROHIBITED:** Asking to find "erasers that look like circles" (erasers are rectangular), "pencils that are round" (pencils are elongated), or any similar semantic mismatches.
- **RULE:** Question text must accurately match the physical properties and characteristics of the objects being used. Do not confuse object names with shape names (e.g., "circle" the shape vs "eraser" the object).
- **VERIFICATION:** Before using any question, verify that the characteristic being asked about actually applies to the object in question.

### 5-Question Structure (Required Order)
1. **Number** - Small number display, write answer
2. **Multiple Choice** - Number with 3 object groups (A/B/C)
   - **CRITICAL:** Groups A, B, and C MUST have three DIFFERENT counts. Only ONE group should match the target number. Ensure count differences of at least 1-2 objects between all groups.
   - **LAYOUT:** Arrange groups HORIZONTALLY (side-by-side) or in a compact 2+1 grid layout. NEVER stack all three groups vertically - this wastes space and makes worksheets unnecessarily long.
3. **Ten Frame** - Count objects in frame
   - **CRITICAL - Object Selection:** Use ONLY compact, contained objects that fit cleanly within frame cells. PROHIBITED objects that extend beyond frames: pencil, ruler, carrot, cucumber, bat, scissors, flower, leaf, worm. APPROVED compact objects: apple, orange, strawberry, grape, cookie, cupcake, circle, square, heart, star, diamond, sun, moon, ball, football, basketball, tennis_ball, block, eraser.
4. **Context** - Story with child name and objects
5. **Matching** - Connect 2 numbers to 4 picture groups

## Available Objects (67 total)

### Categories & Paths
- **fruits**: apple, banana, orange, strawberry, grape, pear, lemon, watermelon, peach, pineapple
- **farm_animals**: chicken, cow, sheep, pig, horse, duck, goat, goose, turkey
- **garden**: flower, butterfly, bee, bird, tree, leaf, mushroom, worm, acorn
- **school_supplies**: book, pencil, eraser, crayon, marker, scissors, ruler, glue, backpack
- **toys**: ball, doll, kite, block
- **vegetables**: carrot, tomato, broccoli, cucumber, pepper, potato
- **sports**: football, basketball, tennis_ball, bat, medal
- **food_treats**: cookie, cupcake
- **shapes**: star, heart, circle, square, diamond, sun, moon
- **vehicles**: car, bus, bike, train, plane

### Child Names
Emma, Ben, Sam, Lily, Oliver, Sophie, Jack, Mia

## Background Colors - MANDATORY
**CRITICAL: ALL questions MUST have colored backgrounds. NEVER use plain white backgrounds.**

Rotate through these 5 colors in order:
1. Q1: #FFF9C4 (yellow)
2. Q2: #F1F8E9 (green)
3. Q3: #E3F2FD (blue)
4. Q4: #FCE4EC (pink)
5. Q5: #FFF3E0 (orange)

## Question Templates & Examples

**STYLING CONSISTENCY:**
- Question text: BLACK (default, no color styling on `<p class="question-text">`)
- Large display numbers (Q1 only): Can use color for the giant number
- **Background colors: MANDATORY on EVERY question** - Use style="background: #COLORCODE;" on EVERY `<div class="question">`

### Q1: Display Number (Write the number)
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Write the number:</p>
    <div style="font-size: 48px; text-align: center; font-weight: bold; color: #4CAF50; margin: 10px 0;">7</div>
    <p class="answer-line">Answer: _________</p>
</div>
```
**Note:** Number size is 48px (readable but compact). Only the display number gets color, NOT the question text.

### Q2: Multiple Choice (Which group has X?)
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which group has 5 apples?</p>
    <div style="display: flex; gap: 20px; justify-content: space-around;">
        <div><strong>Group A:</strong><br>[3 apple images]</div>
        <div><strong>Group B:</strong><br>[5 apple images]</div>
        <div><strong>Group C:</strong><br>[7 apple images]</div>
    </div>
    <p class="answer-line">Circle the correct group: A / B / C</p>
</div>
```

### Q3: Ten Frame (Count objects in frame)
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> How many stars are in the ten frame?</p>
    <div class="ten-frame">[Show ten-frame grid with star images]</div>
    <p class="answer-line">Answer: _________</p>
</div>
```

### Q4: Context Story (CRITICAL - Use PROVIDED images, NOT drawing)
**MANDATORY FORMAT - Student counts provided images:**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Emma saw some pigs in the field. How many pigs did Emma see?</p>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png" width="50" height="50" alt="Pig" />
        <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png" width="50" height="50" alt="Pig" />
        <img src="/images/WORKSHEET_OBJECTS/counting/farm_animals/pig.png" width="50" height="50" alt="Pig" />
    </div>
    <p class="answer-line">Answer: _________</p>
</div>
```
**CRITICAL RULES:**
- ❌ NEVER state the number in the question text (e.g., "Emma saw 3 pigs")
- ✅ ALWAYS use "some" or similar vague term (e.g., "Emma saw some pigs")
- ❌ PROHIBITED: "Draw the pigs" or any drawing tasks
- ✅ Student must COUNT the provided images to find the answer

### Q5: Matching (Draw lines to connect)
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Draw a line from each number to the correct picture group.</p>
    <div style="display: grid; grid-template-columns: 1fr 1fr;">
        <div><strong>4</strong></div><div>[2 car images]</div>
        <div><strong>2</strong></div><div>[6 car images]</div>
        <div></div><div>[4 car images]</div>
        <div></div><div>[8 car images]</div>
    </div>
</div>
```
**CRITICAL Q5 RULES:**
- ❌ NEVER repeat the same picture group twice (e.g., "3 bananas" appearing twice)
- ✅ All 4 picture groups MUST have DIFFERENT counts (e.g., 2, 4, 6, 8 - all different)
- ✅ Use same object type for all 4 groups (e.g., all cars OR all apples)
- ✅ Only 2 groups match the 2 numbers, other 2 are distractors
- ❌ If numbers are 3 and 9, picture groups should be like: 2, 3, 7, 9 (NOT 3, 9, 3, 9)

**Generate EXACTLY {{questionCount}} questions following the 5-question structure with these templates.**
