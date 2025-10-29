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
- Standard size: width="45" height="45"
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
- **toys**: ball, car, doll, kite, block
- **vegetables**: carrot, tomato, broccoli, cucumber, pepper, potato
- **sports**: football, basketball, tennis_ball, bat, medal
- **food_treats**: cookie, cupcake
- **shapes**: star, heart, circle, square, diamond, sun, moon
- **vehicles**: car, bus, bike, train, plane

### Child Names
Emma, Ben, Sam, Lily, Oliver, Sophie, Jack, Mia

## Question Templates

### Q1: Giant Number
```html