# Reception: Size Comparison

Generate EXACTLY {{questionCount}} questions for ages 4-5.

## Critical Rules

1. **EXACTLY {{questionCount}} questions** - NO answer key
2. **Minimum 50% size difference** (Reception needs OBVIOUS differences)
3. **5 DIFFERENT object categories** - NO repeats
4. **Use lowercase/title case** - NOT "BIGGER" but "bigger" (age 4-5)
5. **Real images only** - NO CSS objects (unreliable rendering)

## Available Objects

**Fruits**: strawberry, apple, watermelon, pineapple, banana, orange
**Toys**: ball, bear, car, block, doll
**Farm Animals**: chicken, cow, sheep, pig, horse, duck
**Vegetables**: carrot, tomato, cucumber, pepper, potato
**Sports**: football, basketball, tennis ball
**Food Treats**: cookie, cupcake, icecream
**Shapes**: star, heart, circle, square, diamond
**Garden**: flower, tree, mushroom, leaf, butterfly
**School Supplies**: book, pencil, eraser, crayon, backpack

**Path**: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**Folder names**: fruits, farm_animals, school_supplies, food_treats, toys, garden, vegetables, sports, shapes, vehicles

## 5-Question Structure

🚨 **Pick 5 DIFFERENT categories** - one for each question

**Q1: Which is Bigger?** (2 objects)
- Sizes: 50px vs 120px
- Background: #FFF9C4
- Text: "Which [object] is bigger?"

**Q2: Which is Shorter?** (2 objects)
- Sizes: 80px vs 140px
- Background: #E3F2FD
- Text: "Which [object] is shorter?"

**Q3: Which is Longest?** (3 objects)
- Sizes: 40px, 70px, 100px
- Background: #F1F8E9
- Text: "Which [object] is the longest?"

**Q4: Size Ordering** (3 objects)
- Sizes: 50px, 100px, 130px
- Labels: Smallest, Medium, Biggest
- Background: #FCE4EC
- Text: "Can you put these [objects] in order from smallest to biggest?"

**Q5: Tallest Comparison** (3 children with objects)
- Heights: 80px, 110px, 140px
- Background: #FFF3E0
- Text: "Look at the [objects]. Who has the tallest [object]?"

## Size Standards

- Small: 50-60px
- Medium: 100-120px
- Large: 130-150px
- **Minimum 50% difference** (e.g., 60px vs 120px = 100% ✓)

## CSS
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;background:#fff}
.question{margin:10px 0;padding:12px;border-radius:8px}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.size-comparison-two,.size-comparison-three{display:flex;justify-content:space-around;align-items:flex-end;margin:20px auto;padding:20px;background:#f8f9ff;border:3px solid #4CAF50;border-radius:12px;max-width:600px;gap:30px}
.comparison-item{text-align:center}
.item-label{font-size:15pt;font-weight:bold;margin-bottom:15px}
.ordering-activity{display:flex;justify-content:space-around;margin:20px auto;max-width:600px;gap:30px}
.animals-unsorted,.size-labels{display:flex;flex-direction:column;gap:20px}
.animal-box,.size-box{padding:15px;background:#fff;border:3px solid #ddd;border-radius:10px;text-align:center;min-width:120px}
.size-box{font-weight:bold;background:#E3F2FD}
.ice-cream-comparison{display:flex;justify-content:space-around;align-items:flex-end;margin:20px auto;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:12px;max-width:500px;min-height:200px}
.child-name{font-size:14pt;font-weight:bold}
.answer-prompt{font-size:15pt;margin:10px 0;font-weight:600;text-align:center}
</style>
```

## Example HTML

**Q1 Structure:**
```html
<div class="question" style="background: #FFF9C4;">
    <span class="question-number">1.</span>
    <p class="question-text">Which strawberry is bigger?</p>
    <div class="size-comparison-two">
        <div class="comparison-item">
            <span class="item-label">Left</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="50" height="50" alt="Small strawberry" />
        </div>
        <div class="comparison-item">
            <span class="item-label">Right</span>
            <img src="/images/WORKSHEET_OBJECTS/counting/fruits/strawberry.png" width="120" height="120" alt="Big strawberry" />
        </div>
    </div>
</div>
```

**Q4 Structure:**
```html
<div class="question" style="background: #FCE4EC;">
    <span class="question-number">4.</span>
    <p class="question-text">Can you put these blocks in order from smallest to biggest?</p>
    <div class="ordering-activity">
        <div class="animals-unsorted">
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="50" height="50" alt="Small block" />
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="100" height="100" alt="Medium block" />
            </div>
            <div class="animal-box">
                <img src="/images/WORKSHEET_OBJECTS/counting/toys/block.png" width="130" height="130" alt="Large block" />
            </div>
        </div>
        <div class="size-labels">
            <div class="size-box">Smallest</div>
            <div class="size-box">Medium</div>
            <div class="size-box">Biggest</div>
        </div>
    </div>
</div>
```



## Final Checks

- [ ] Exactly {{questionCount}} questions
- [ ] 5 different categories used
- [ ] All sizes have 50%+ difference
- [ ] Text uses lowercase/title case (NO CAPITALS)
- [ ] All paths use full format with correct folder names
- [ ] NO answer key (students fill in answers)

Generate now.
