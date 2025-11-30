# Ages 4-5: Number Bonds

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## EYFS Requirement
Reception children should: "Automatically recall number bonds up to 5 (including subtraction facts) and some number bonds to 10, including double facts."
**CRITICAL**: Use STORY-BASED language, NOT abstract equations. Children this age cannot understand "3 + 2 = ?" but CAN understand "I have 3 apples. I get 2 more. How many now?"

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## Objects & Assets
**fruits**: apple,banana,orange,strawberry,grape,pear,lemon,watermelon,peach,pineapple
**farm_animals**: chicken,cow,sheep,horse,duck,goat,goose,turkey
**garden**: flower,butterfly,bee,bird,tree,leaf,mushroom,worm,acorn
**school**: book,pencil,eraser,crayon,marker,scissors,ruler,glue,backpack
**vegetables**: carrot,tomato,broccoli,cucumber,pepper,potato
**shapes**: star,heart,circle,square,diamond,sun,moon
**toys**: ball,car,doll,kite,block
**vehicles**: bus,bike,train,plane
**treats**: cookie,cupcake
**Names**: Ben,Sam,Jack,Oliver,Emma,Lily,Sophie,Ava,Noah,Mia
**Image**: `<img src="/images/{object}.png" width="30" height="30" alt="{Object}" />`

## Number Bonds Focus
- **Primary**: Bonds to 5 (Q1, Q2, Q3)
- **Secondary**: Doubles facts (Q4), Bonds to 10 (Q5)
- Use DIFFERENT objects for each question

## 5 Question Types (EXACT ORDER)
**Q1**: How many more to make 5? (visual part-whole)
**Q2**: How many are hiding? (missing part)
**Q3**: Which two numbers make 5? (multiple choice with PICTURES)
**Q4**: Doubles story (NOT equation format)
**Q5**: How many more to make 10? (ten-frame visual)

## Q1 - How Many More to Make 5?
**RANDOMIZE**: Pick ONE object + starting number (1-4)

**Question Variations** (pick ONE - story language):
- "I have {X} {objects}. How many more do I need to make 5?"
- "There are {X} {objects}. How many more to make 5?"
- "{Name} has {X} {objects}. She wants 5. How many more?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> I have 3 apples. How many more do I need to make 5?</p>
    <div class="visual-scenario">
        <div class="have-section">
            <p class="label">I have:</p>
            <div class="objects-display">
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
                <img src="/images/apple.png" width="30" height="30" alt="Apple" />
            </div>
        </div>
        <div class="need-section">
            <p class="label">I need:</p>
            <div class="mystery-boxes">
                <div class="mystery-box">?</div>
                <div class="mystery-box">?</div>
            </div>
        </div>
        <div class="total-section">
            <p class="label">To make:</p>
            <p class="total-number">5</p>
        </div>
    </div>
    <p class="answer-prompt">How many more? <span class="answer-line"></span></p>
</div>
```

## Q2 - How Many Are Hiding?
**RANDOMIZE**: Pick ONE object + total (5) + visible amount

**Question Variations** (pick ONE - story language):
- "There are 5 {objects} altogether. I can see {X}. How many are hiding?"
- "5 {objects} in total. {X} are here. How many in the box?"
- "{Name} has 5 {objects}. We can see {X}. How many are hidden?"

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> There are 5 stars altogether. I can see 4. How many are hiding?</p>
    <div class="visual-scenario">
        <div class="total-section">
            <p class="label">Total:</p>
            <p class="total-number">5</p>
        </div>
        <div class="visible-section">
            <p class="label">I can see:</p>
            <div class="objects-display">
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
                <img src="/images/star.png" width="30" height="30" alt="Star" />
            </div>
        </div>
        <div class="hidden-section">
            <p class="label">Hiding:</p>
            <div class="mystery-boxes">
                <div class="mystery-box">?</div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">How many are hiding? <span class="answer-line"></span></p>
</div>
```

## Q3 - Fill the Gap to Make 5 (Number Choice)
**RANDOMIZE**: Pick ONE object + ONE starting number (1-4)

**Question format** (story-based):
- "I have {X} {objects}. How many more to make 5?"
- "{Name} has {X} {objects}. How many more does she need to make 5?"

**Show**: Objects visually, then 3 number choices (correct answer + 2 wrong)

**Interactive mode**: Child clicks/circles the correct number

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> I have 2 cookies. How many more to make 5?</p>
    <div class="objects-display" style="justify-content: center; margin: 15px 0;">
        <img src="/images/cookie.png" width="30" height="30" alt="Cookie" />
        <img src="/images/cookie.png" width="30" height="30" alt="Cookie" />
    </div>
    <div class="number-choices">
        <div class="number-choice">
            <span class="choice-label">A</span>
            <span class="choice-number">2</span>
        </div>
        <div class="number-choice">
            <span class="choice-label">B</span>
            <span class="choice-number">3</span>
        </div>
        <div class="number-choice">
            <span class="choice-label">C</span>
            <span class="choice-number">4</span>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Doubles Story
**RANDOMIZE**: Pick ONE object + ONE number (1-5) + ONE name

**Doubles**: 1 and 1 = 2, 2 and 2 = 4, 3 and 3 = 6, 4 and 4 = 8, 5 and 5 = 10

**Question format** (story-based, NOT equation):
- "{Name} has {X} {objects}. {Name2} has {X} {objects} too. How many altogether?"
- "I have {X} {objects}. I get {X} more. How many now?"
- "There are {X} {objects} on the left. There are {X} on the right. How many in total?"

**CRITICAL**: Do NOT write "4. 2 + 2 = ?" - this is abstract and confusing for 4-5 year olds.

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Emma has 3 balls. Noah has 3 balls too. How many balls altogether?</p>
    <div class="doubles-display">
        <div class="double-group">
            <p class="group-label">Emma:</p>
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
        <div class="double-group">
            <p class="group-label">Noah:</p>
            <div class="objects-display">
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
                <img src="/images/ball.png" width="30" height="30" alt="Ball" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">How many altogether? <span class="answer-line"></span></p>
</div>
```

## Q5 - How Many More to Make 10?
**RANDOMIZE**: Pick ONE object + starting number (5-9)

**Question format** (story-based, NOT equation):
- "I have {X} {objects}. How many more do I need to make 10?"
- "There are {X} {objects}. How many more to fill the ten-frame?"
- "{Name} wants 10 {objects}. She has {X}. How many more?"

**CRITICAL**: Do NOT write "5. 6 + ? = 10" - use story language instead.

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> I have 7 hearts. How many more do I need to make 10?</p>
    <div class="bonds-to-10">
        <div class="ten-frame">
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
            </div>
            <div class="frame-row">
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell filled"><img src="/images/heart.png" width="20" height="20" alt="Heart" /></div>
                <div class="frame-cell empty">?</div>
                <div class="frame-cell empty">?</div>
                <div class="frame-cell empty">?</div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">How many more? <span class="answer-line"></span></p>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.visual-scenario{display:flex;gap:20px;justify-content:center;align-items:flex-start;margin:20px 0;flex-wrap:wrap;}
.have-section,.need-section,.total-section,.visible-section,.hidden-section{text-align:center;padding:15px;background:#fff;border:2px solid #ddd;border-radius:10px;min-width:100px;}
.label,.group-label{font-size:13pt;font-weight:600;margin:0 0 10px 0;color:#555;}
.objects-display{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:120px;margin:0 auto;}
.mystery-boxes{display:flex;gap:6px;justify-content:center;}
.mystery-box{width:50px;height:50px;border:3px dashed #FF6347;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28pt;color:#FF6347;font-weight:bold;}
.total-number{font-size:32pt;font-weight:bold;color:#4CAF50;margin:0;}
.doubles-display{display:flex;gap:30px;justify-content:center;align-items:flex-start;margin:15px 0;flex-wrap:wrap;}
.double-group{text-align:center;padding:10px;background:#fff;border:2px solid #ddd;border-radius:10px;min-width:100px;}
.fill-gap-display{display:flex;gap:15px;justify-content:center;align-items:center;margin:15px 0;}
.plus-text,.equals-text{font-size:24pt;font-weight:bold;color:#333;}
.number-choices{display:flex;gap:20px;justify-content:center;margin-top:15px;}
.number-choice{padding:15px 25px;border:3px solid #ddd;border-radius:12px;text-align:center;background:#fff;}
.number-choice .choice-label{font-size:14pt;font-weight:bold;display:block;margin-bottom:5px;color:#666;}
.number-choice .choice-number{font-size:28pt;font-weight:bold;color:#333;}
.double-group{text-align:center;padding:10px;background:#fff;border:2px solid #ddd;border-radius:10px;min-width:100px;}
.bonds-to-10{margin:15px 0;text-align:center;}
.ten-frame{display:inline-block;padding:8px;background:#fff;border:3px solid #333;border-radius:8px;}
.frame-row{display:flex;gap:4px;margin-bottom:4px;}
.frame-row:last-child{margin-bottom:0;}
.frame-cell{width:45px;height:45px;border:2px solid #333;border-radius:4px;display:flex;align-items:center;justify-content:center;}
.frame-cell.filled{background:#FFE4B5;}
.frame-cell.empty{background:#fff;font-size:20pt;color:#FF6347;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [Number, e.g., "2"]</p>
        <p><strong>2.</strong> [Number, e.g., "1"]</p>
        <p><strong>3.</strong> [Letter, e.g., "B"]</p>
        <p><strong>4.</strong> [Number, e.g., "6"]</p>
        <p><strong>5.</strong> [Number, e.g., "3"]</p>
    </div>
</div>
```
