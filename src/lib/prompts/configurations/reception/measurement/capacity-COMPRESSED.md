# Ages 4-5: Capacity

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Capacity Vocabulary (Reception Level)
**States**: full, empty, half full
**Comparative**: more, less, holds more, holds less
**Actions**: pour, fill, spill

## Containers
**Common**: cup, mug, glass, bottle, jug, bucket, bowl, jar, vase, pot, basket
**Image**: Use visual fills to show capacity levels

## Visual Requirements
**CRITICAL**: Show liquid/content levels clearly
- Use filled portions (shaded areas, water level, objects inside)
- Make full/empty/half distinctions OBVIOUS
- Color code: water=blue, juice=orange, milk=white/cream

## 5 Question Types (EXACT ORDER)
**Q1 - Full or Empty?**: Identify which container is full/empty
**Q2 - Half Full**: Which container is half full?
**Q3 - Which Holds More?**: Compare 2 container sizes
**Q4 - Most/Least Full**: 3 containers at different levels
**Q5 - How Many Fit?**: Count small objects inside container

## Q1 - Full or Empty? (Identify)
**RANDOMIZE**: Pick ONE container + ONE state (full/empty) + ONE question variation

**Question Variations** (pick ONE):
- "Which container is full?"
- "Which container is empty?"
- "Find the full cup."
- "Find the empty glass."

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Which cup is full?</p>
    <div class="capacity-comparison">
        <div class="container-item">
            <span class="item-label">A</span>
            <div class="cup-display">
                <div class="cup-outline">
                    <div class="liquid-fill" style="height:90%;background:#4FC3F7;"></div>
                </div>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">B</span>
            <div class="cup-display">
                <div class="cup-outline">
                    <div class="liquid-fill" style="height:0%;"></div>
                </div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q2 - Half Full
**RANDOMIZE**: Pick ONE container type + ONE question variation

**Question Variations** (pick ONE):
- "Which is half full?"
- "Find the container that is half full."
- "Which one is half full?"
- "Point to the half full container."

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> Which glass is half full?</p>
    <div class="capacity-comparison">
        <div class="container-item">
            <span class="item-label">A</span>
            <div class="glass-display">
                <div class="glass-outline">
                    <div class="liquid-fill" style="height:50%;background:#FFA726;"></div>
                </div>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">B</span>
            <div class="glass-display">
                <div class="glass-outline">
                    <div class="liquid-fill" style="height:85%;background:#FFA726;"></div>
                </div>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">C</span>
            <div class="glass-display">
                <div class="glass-outline">
                    <div class="liquid-fill" style="height:20%;background:#FFA726;"></div>
                </div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q3 - Which Holds More?
**RANDOMIZE**: Pick 2 containers of DIFFERENT sizes + ONE question variation

**Question Variations** (pick ONE):
- "Which holds more?"
- "Which container can hold more water?"
- "Which is bigger?"
- "Which can fit more inside?"

**Visual**: Show different-sized containers (big vs small)

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> Which holds more?</p>
    <div class="size-comparison">
        <div class="container-item">
            <span class="item-label">A</span>
            <div class="bucket-display" style="width:80px;height:70px;border:3px solid #333;border-radius:5px;background:#E1F5FE;">
                <p style="text-align:center;margin-top:20px;font-size:12pt;">Bucket</p>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">B</span>
            <div class="cup-display-small" style="width:40px;height:50px;border:3px solid #333;border-radius:5px;background:#E1F5FE;">
                <p style="text-align:center;margin-top:10px;font-size:10pt;">Cup</p>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q4 - Most/Least Full (3 Containers)
**RANDOMIZE**: Pick ONE question type (most/least) + show 3 containers at different levels

**Question Variations** (pick ONE):
- "Which is the most full?"
- "Which is the least full?"
- "Which has the most water?"
- "Which has the least water?"

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Which is the most full?</p>
    <div class="capacity-comparison">
        <div class="container-item">
            <span class="item-label">A</span>
            <div class="bottle-display">
                <div class="bottle-outline">
                    <div class="liquid-fill" style="height:60%;background:#81C784;"></div>
                </div>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">B</span>
            <div class="bottle-display">
                <div class="bottle-outline">
                    <div class="liquid-fill" style="height:30%;background:#81C784;"></div>
                </div>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">C</span>
            <div class="bottle-display">
                <div class="bottle-outline">
                    <div class="liquid-fill" style="height:85%;background:#81C784;"></div>
                </div>
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## Q5 - How Many Fit? (Counting)
**RANDOMIZE**: Pick ONE small object + container + quantity (3-8)

**Question Variations** (pick ONE):
- "How many {objects} are in the {container}?"
- "Count the {objects} in the {container}."
- "How many {objects} fit inside?"
- "How many can you see in the {container}?"

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> How many apples are in the basket?</p>
    <div class="counting-container">
        <div class="basket-display" style="position:relative;width:150px;height:100px;border:3px solid #8B4513;border-radius:10px;background:#DEB887;margin:0 auto;">
            <div style="display:flex;flex-wrap:wrap;gap:5px;padding:10px;justify-content:center;">
                <img src="/images/apple.png" width="25" height="25" alt="Apple" />
                <img src="/images/apple.png" width="25" height="25" alt="Apple" />
                <img src="/images/apple.png" width="25" height="25" alt="Apple" />
                <img src="/images/apple.png" width="25" height="25" alt="Apple" />
                <img src="/images/apple.png" width="25" height="25" alt="Apple" />
            </div>
        </div>
    </div>
    <p class="answer-prompt">Answer: <span class="answer-line"></span></p>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.capacity-comparison,.size-comparison{display:flex;gap:25px;justify-content:center;align-items:flex-end;margin:20px auto;flex-wrap:wrap;}
.container-item{text-align:center;padding:10px;}
.item-label{font-size:18pt;font-weight:bold;display:block;margin-bottom:10px;}
.cup-display,.glass-display,.bottle-display{margin:0 auto;}
.cup-outline,.glass-outline,.bottle-outline{width:60px;height:80px;border:3px solid #333;border-radius:5px 5px 8px 8px;position:relative;overflow:hidden;background:#fff;}
.liquid-fill{position:absolute;bottom:0;left:0;right:0;transition:height 0.3s;}
.counting-container{margin:20px auto;text-align:center;}
.answer-prompt{font-size:15pt;margin:10px 0;text-align:center;}
.answer-line{border-bottom:2px solid #333;display:inline-block;min-width:100px;margin-left:10px;}
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
        <p><strong>1.</strong> [Full/empty container, e.g., "A (Full cup)"]</p>
        <p><strong>2.</strong> [Half full, e.g., "A"]</p>
        <p><strong>3.</strong> [Holds more, e.g., "A (Bucket)"]</p>
        <p><strong>4.</strong> [Most/least full, e.g., "C (Most full)"]</p>
        <p><strong>5.</strong> [Count, e.g., "5 apples"]</p>
    </div>
</div>
```
