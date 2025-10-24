# Reception Size Comparison - {{questionCount}} Questions

## VERIFIED OBJECTS (WORKSHEET_OBJECTS ONLY)

**Fruits:** strawberry, apple, watermelon, pineapple, banana, orange
**Toys:** ball, bear, car, block, doll
**Farm Animals:** chicken, cow, sheep, pig, horse, duck
**Vegetables:** carrot, tomato, cucumber, pepper, potato
**Sports:** football, basketball, tennis ball
**Food Treats:** cookie, cupcake, icecream
**Shapes:** star, heart, circle, square, diamond
**Garden:** flower, tree, mushroom, leaf, butterfly
**School Supplies:** book, pencil, eraser, crayon, backpack

**FRESHNESS:** System provides forbidden list. Use fresh categories, avoid forbidden objects, target 80%+ novelty.

**FOLDER NAME MAPPING** (USE THESE EXACT NAMES):
- Fruits → `/counting/fruits/`
- Farm Animals → `/counting/farm_animals/` (NOT `/counting/farm/`)
- School Supplies → `/counting/school_supplies/` (NOT `/counting/school/`)
- Food Treats → `/counting/food_treats/` (NOT `/counting/food/`)
- Toys → `/counting/toys/`
- Garden → `/counting/garden/`
- Vegetables → `/counting/vegetables/` (NOT `/counting/veg/`)
- Sports → `/counting/sports/`
- Shapes → `/counting/shapes/`
- Vehicles → `/counting/vehicles/`

**Paths:** `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png` | **FORBIDDEN FOR SIZE COMPARISON:** crayons (CSS unreliable), rulers (CSS unreliable), lollipops, giraffes | **USE INSTEAD:** trees, flowers, mushrooms (actual images)

## CRITICAL RULES
1. **EXACTLY {{questionCount}} questions**
2. **MINIMUM 50% size difference** (NOT 30%!) - Reception ages 4-5 need OBVIOUS differences
3. **Follow 5-question FORMAT STRUCTURE with FRESHNESS** - Use FRESHNESS to select varied objects
4. **USE FRESHNESS for ALL object selection** - DO NOT repeat the same objects shown in examples below
5. **Examples show FORMAT only** - Select DIFFERENT objects using FRESHNESS guidance from system

## QUESTION STRUCTURE (🚨 MANDATORY RANDOMIZATION - NO DEFAULTS ALLOWED)

🚨 **CRITICAL RANDOMIZATION REQUIREMENT**:
- You MUST NOT use any default objects (NO balls, trees, carrots, ice creams, or farm animals)
- System provides FRESHNESS guidance (forbidden list + priority categories)
- **FORCE yourself to pick from DIFFERENT categories each question**
- Target: 100% UNIQUE objects across all 5 questions
- If FRESHNESS provides priority categories, use them. Otherwise pick randomly from: Fruits, Toys, Garden, Vegetables, Shapes, School Supplies, Sports, Food Treats

**RANDOMIZATION STRATEGY**: For each question below, select the FIRST category that comes to mind that you HAVEN'T used yet in this worksheet. Then pick the FIRST object from that category.

**Q1: Which is Bigger?** (2 objects: small 50px vs large 120px)
- Pick ANY category you haven't used yet, select first available object
- Background: #FFF9C4
- Text: "Which [object] is bigger?" (lowercase)

**Q2: Which is Shorter?** (2 objects: short 80px vs tall 140px)
- Pick DIFFERENT category from Q1, select object with vertical/height property
- Background: #E3F2FD
- Use actual WORKSHEET_OBJECTS images - NO CSS
- Text: "Which [object] is shorter?" (lowercase)

**Q3: Which is Longest?** (3 objects with clear size gradation)
- Pick DIFFERENT category from Q1-Q2, select elongated/horizontal object
- Use actual images at widths 40px, 70px, 100px
- Background: #F1F8E9
- Text: "Which [object] is the longest?" (lowercase)

**Q4: Size Ordering** (3 objects)
- Pick DIFFERENT category from Q1-Q3, select 3 objects with obvious size differences
- Labels: Smallest, Medium, Biggest
- Background: #FCE4EC
- Path: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`
- Text: "Can you put these [objects] in order from smallest to biggest?" (lowercase)

**Q5: Comparison with 3 Sizes** (3 objects with heights: 80px, 110px, 140px)
- Pick DIFFERENT category from Q1-Q4, select any object
- Different heights for OBVIOUS comparison
- Background: #FFF3E0
- Text: "Look at the [objects]. Who has the tallest [object]?" (lowercase)

🚨 **VALIDATION BEFORE GENERATING**: Have you used 5 DIFFERENT categories? If not, STOP and revise your selections.

🚨 **CRITICAL RULES**:
1. NEVER use ** markdown in question text HTML - renders as literal symbols
2. NEVER use ALL CAPITALS (BIGGER, SHORTEST) - Reception kids (4-5) need lowercase/title case
3. Use "bigger" or "Bigger" NOT "BIGGER" - age-appropriate for early readers

## SIZE REQUIREMENTS (MANDATORY)
- Small: 50-60px
- Medium: 100-120px
- Large: 130-150px
- **MINIMUM 50% difference** between sizes
- Example: 60px vs 120px = 100% difference ✓
- WRONG: 80px vs 90px = 12% difference ✗

## CSS (COPY EXACTLY)

```css
body{font-family:'Sassoon Primary','Century Gothic',sans-serif;font-size:16pt;line-height:1.6;margin:0;padding:20px;background:#fff;color:#000}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:6px;border-bottom:3px solid #000}
.worksheet-title{font-size:16pt;font-weight:bold;margin:0}
.question{margin:10px 0;padding:12px;border-radius:8px;box-shadow:0 2px 6px rgba(0,0,0,0.1)}
.question-number{font-size:18pt;font-weight:bold;color:#2c3e50;margin-right:8px}
.question-text{font-size:16pt;line-height:1.4;margin:6px 0;font-weight:600}
.size-comparison-two,.size-comparison-three{display:flex;justify-content:space-around;align-items:flex-end;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #4CAF50;border-radius:12px;max-width:600px;gap:30px}
.comparison-item{text-align:center}
.item-label{display:block;font-size:15pt;font-weight:bold;margin-bottom:15px;color:#2c3e50}
.small-size{width:50px;height:50px}
.medium-size{width:100px;height:100px}
.large-size{width:130px;height:130px}
.circle-object{border-radius:50%;margin:0 auto}
.crayon-object{width:20px;background:linear-gradient(to bottom,#E74C3C 0%,#E74C3C 90%,#34495E 90%);margin:0 auto;border-radius:3px 3px 0 0;position:relative}
.short-crayon{height:50px}
.tall-crayon{height:130px}
.crayon-object::before{content:'';position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid #E74C3C}
.tree-object{width:60px;background:#27AE60;margin:0 auto;border-radius:5px 5px 0 0;position:relative}
.tree-object.short-size{height:60px}
.tree-object.tall-size{height:140px}
.tree-object::after{content:'';width:20px;height:30px;background:#8B4513;position:absolute;bottom:-30px;left:50%;transform:translateX(-50%)}
.pencil-object{width:15px;background:linear-gradient(to bottom,#F39C12 0%,#F39C12 85%,#FFD700 85%);margin:0 auto;border-radius:2px}
.short-pencil{height:60px}
.medium-pencil{height:90px}
.long-pencil{height:130px}
.ordering-activity{display:flex;justify-content:space-around;margin:20px auto;max-width:600px;gap:30px}
.animals-unsorted,.size-labels{display:flex;flex-direction:column;gap:20px}
.animal-box,.size-box{padding:15px;background:#fff;border:3px solid #ddd;border-radius:10px;text-align:center;min-width:120px}
.animal-box img{object-fit:contain}
.size-box{font-weight:bold;font-size:14pt;color:#2c3e50;background:#E3F2FD}
.ice-cream-comparison{display:flex;justify-content:space-around;align-items:flex-end;margin:20px auto;padding:20px;background:linear-gradient(to top,#FFF3E0 0%,#fff 100%);border:3px solid #FF9800;border-radius:12px;max-width:500px;min-height:200px}
.ice-cream-item{text-align:center}
.ice-cream-item img{object-fit:contain}
.child-name{font-size:14pt;font-weight:bold;color:#2c3e50}
.answer-prompt{font-size:15pt;margin:10px 0;font-weight:600;text-align:center}
.answer-choice{display:inline-block;padding:5px 12px;margin:0 5px;border:2px solid #333;border-radius:20px;background:#fff}
.answer-line{display:inline-block;min-width:100px;border-bottom:2px solid #333;margin:0 6px}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key-title{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key-content p{font-size:12pt;margin:6px 0;line-height:1.5}
```

## EXAMPLE ANSWER KEY (showing 5 DIFFERENT categories)

**Your answer key MUST show 5 different object categories like this:**

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1. Which strawberry is bigger?</strong> The strawberry on the right (120px)</p>
        <p><strong>2. Which mushroom is shorter?</strong> The mushroom on the left (80px)</p>
        <p><strong>3. Which cucumber is the longest?</strong> The cucumber on the right (100px)</p>
        <p><strong>4. Can you put these blocks in order from smallest to biggest?</strong> Smallest: 50px bear, Medium: 100px bear, Biggest: 130px bear</p>
        <p><strong>5. Look at the hearts. Who has the tallest heart?</strong> Max has the tallest heart (140px)</p>
    </div>
</div>
```

**Notice: strawberry (Fruits), mushroom (Garden), cucumber (Vegetables), blocks (Toys), hearts (Shapes) - ALL DIFFERENT!**

## VALIDATION BEFORE RETURNING
✓ Exactly {{questionCount}} questions?
✓ Used 5 DIFFERENT object categories? (Check your answer key!)
✓ Q2 uses actual image (NOT CSS crayons) at 80px vs 140px?
✓ Q3 uses actual images OR avoids CSS pencils entirely?
✓ ALL comparisons have 50%+ size difference?
✓ NO CSS pencils, crayons, or rulers used (they render unreliably)?
✓ ALL question text uses lowercase/title case (NO CAPITALS like BIGGER, SHORTEST)?
✓ Answer key present?
✓ Can 4-year-old see differences from across room?
✓ Text appropriate for early readers (ages 4-5)?

**Generate NOW with 5 DIFFERENT categories and EXAGGERATED size differences!**
