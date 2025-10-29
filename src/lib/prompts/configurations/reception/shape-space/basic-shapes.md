# Reception: Basic Shapes

Generate EXACTLY {{questionCount}} questions for ages 4-5.

## CSS - Include at Start
```css
<style>
.choice-shape {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid #333;
}
.choice-shape.circle { background: #4A90E2; border-radius: 50%; }
.choice-shape.square { background: #E74C3C; }
.choice-shape.rectangle { background: #F39C12; width: 50px; height: 70px; }
.choice-shape.triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 52px solid #27AE60;
    border-top: none;
    background: transparent;
}
</style>
```

## Question Types

1. Identify giant shape
2. Find matching shapes in grid
3. Count objects (3-7 img tags)
4. Match shapes left to right
5. Real world objects

## Q3 - Count Objects

Use FULL paths: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Count the apples. How many are there?</p>
    <div class="shape-scene">
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
        <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="60" height="60" alt="Apple" />
    </div>
    <p class="answer-prompt">Write your answer here <span class="answer-line">___</span></p>
</div>
```

Objects: fruits (apple, banana, orange), farm_animals (chicken, cow, sheep), school_supplies (book, pencil), toys (ball, car), garden (flower, butterfly)

## Q5 - Real World Objects

🚨 Write ALL 3 choice-boxes with `<div class="choice-shape [name]"></div>` - never skip!

Use ONLY unambiguous questions:
- Ball → Circle | Coin → Circle | Plate → Circle
- Door → Rectangle | Book → Rectangle
- Pizza slice → Triangle | Roof → Triangle
- Cracker → Square

❌ Avoid: "window" or "box" (could be square OR rectangle)
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which shape looks like a ball?</p>
    <div class="shape-choices">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <div class="choice-shape triangle"></div>
            <p class="shape-name">Triangle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <div class="choice-shape rectangle"></div>
            <p class="shape-name">Rectangle</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <div class="choice-shape circle"></div>
            <p class="shape-name">Circle</p>
        </div>
    </div>
</div>
```

Generate worksheet now.