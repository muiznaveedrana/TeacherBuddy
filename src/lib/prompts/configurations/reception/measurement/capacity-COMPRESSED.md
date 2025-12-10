# Ages 4-5: Capacity (INTERACTIVE-OPTIMISED)

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

**CRITICAL: Every answer uses text input via `<span class="answer-line"></span>` pattern.**

## Research-Based Design (EYFS/NCETM Aligned)
- **Visual clarity**: 90% full = full, 50% = half full, 0% = empty (OBVIOUS differences)
- **Container shapes**: Test misconception that tall ≠ always holds more
- **Hands-on vocabulary**: full, empty, half full, nearly full, nearly empty, pour, fill
- **Comparative language**: holds more, holds less, most full, least full
- **Q5 Misconception Test**: Tall narrow vs short wide container (shape ≠ capacity)

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Capacity Vocabulary (Reception Level)
**States**: full, empty, half full, nearly full, nearly empty
**Comparative**: more, less, holds more, holds less, most full, least full
**Actions**: pour, fill, spill
**Liquids**: water (blue), juice (orange), milk (cream/white)

## Containers (Choose from these)
**Common**: cup, mug, glass, bottle, jug, bucket, bowl, jar, vase, pot, watering can
**Visual**: Use HTML/CSS liquid-fill divs to show capacity levels clearly

## Visual Requirements
**CRITICAL**: Show liquid/content levels clearly
- Use filled portions (shaded areas, water level via height %)
- Make full (90%), half full (50%), empty (0%) distinctions OBVIOUS
- Color code liquids: water=#4FC3F7 (blue), juice=#FFA726 (orange), milk=#FFF9C4 (cream)

## 5 Question Types (EXACT ORDER)
**Q1 - Full or Empty?**: Identify which container is full/empty (2 containers)
**Q2 - Half Full**: Which container is half full? (3 containers at different levels)
**Q3 - Which Holds More?**: Compare 2 container SIZES (capacity, not fill level)
**Q4 - Most/Least Full**: 3 containers at different fill levels - find most/least full
**Q5 - Misconception Test**: Tall narrow vs short wide - which REALLY holds more?

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

## Q5 - Misconception Test: Tall ≠ More Capacity!
**CRITICAL**: This tests the common misconception that tall containers always hold more.

**Show**: Container A (tall narrow) vs Container B (short wide) - SAME or LESS capacity despite height
**Ask**: "Which container can hold more water?" or "Which holds more?"
**Correct Answer**: B (the short wide one) - challenges height misconception

**Visual Strategy**:
- Container A: Tall narrow (width: 40px, height: 100px) - looks bigger
- Container B: Short wide (width: 90px, height: 60px) - actually holds more
- Use visual cues: Container B should LOOK wider/bigger in volume

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Look carefully! Which jar can hold more water?</p>
    <div class="misconception-test">
        <div class="container-item">
            <span class="item-label">A</span>
            <div class="tall-narrow-jar" style="width:40px;height:100px;border:3px solid #333;border-radius:5px;background:#E1F5FE;margin:0 auto;">
                <p style="font-size:10pt;margin-top:35px;text-align:center;">Tall jar</p>
            </div>
        </div>
        <div class="container-item">
            <span class="item-label">B</span>
            <div class="short-wide-jar" style="width:90px;height:60px;border:3px solid #333;border-radius:5px;background:#E1F5FE;margin:0 auto;">
                <p style="font-size:10pt;margin-top:18px;text-align:center;">Wide jar</p>
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
.capacity-comparison,.size-comparison,.misconception-test{display:flex;gap:25px;justify-content:center;align-items:flex-end;margin:20px auto;flex-wrap:wrap;}
.container-item{text-align:center;padding:10px;}
.item-label{font-size:18pt;font-weight:bold;display:block;margin-bottom:10px;}
.cup-display,.glass-display,.bottle-display{margin:0 auto;}
.cup-outline,.glass-outline,.bottle-outline{width:60px;height:80px;border:3px solid #333;border-radius:5px 5px 8px 8px;position:relative;overflow:hidden;background:#fff;}
.liquid-fill{position:absolute;bottom:0;left:0;right:0;transition:height 0.3s;}
.counting-container{margin:20px auto;text-align:center;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:120px;height:28px;margin-left:10px;margin-top:8px;}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center;}
.answer-key-content p{font-size:12pt;margin:6px 0;}
</style>
```

## Answer Key Format
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> A</p>
        <p><strong>2.</strong> B</p>
        <p><strong>3.</strong> A</p>
        <p><strong>4.</strong> C</p>
        <p><strong>5.</strong> B</p>
    </div>
</div>
```

---

## Theme Variations (Generate 3 different worksheets)

### Worksheet 1 - Kitchen Theme (Easy)
**Story**: Mum is making drinks for the family!
- Q1: Which cup is full? - Cup A=90% blue water, Cup B=0% → **A**
- Q2: Which glass is half full? - Glass A=85% orange juice, B=50% orange juice, C=20% orange juice → **B**
- Q3: Which holds more? - Jug A (80px×70px) vs Cup B (40px×50px) → **A**
- Q4: Which is the most full? - Bottle A=60% green, B=30% green, C=85% green → **C**
- Q5: Which jar can hold more water? - Tall narrow jar A (40px×100px) vs Short wide jar B (90px×60px) → **B**

### Worksheet 2 - Garden Theme (Average)
**Story**: We are watering the plants!
- Q1: Find the empty watering can! - Can A=0%, Can B=90% blue → **A**
- Q2: Which bucket is half full? - Bucket A=25% water, B=50% water, C=75% water → **B**
- Q3: Which holds more? - Bucket A (85px×75px) vs Mug B (45px×55px) → **A**
- Q4: Which is the least full? - Jar A=70% blue, B=35% blue, C=80% blue → **B**
- Q5: Which pot can hold more soil? - Tall thin pot A (35px×95px) vs Short wide pot B (85px×55px) → **B**

### Worksheet 3 - Party Theme (Hard)
**Story**: Get ready for the party!
- Q1: Which bottle is full? - Bottle A=85%, Bottle B=0% → **A**
- Q2: Find the half full jug! - Jug A=75% orange, B=35% orange, C=50% orange → **C**
- Q3: Which holds more? - Bowl A (90px×65px) vs Glass B (50px×60px) → **A**
- Q4: Which has the most juice? - Cup A=55% orange, B=90% orange, C=40% orange → **B**
- Q5: Which bowl can hold more popcorn? - Tall narrow bowl A (38px×105px) vs Short wide bowl B (95px×58px) → **B**

---

## Validation Checklist
- [ ] Exactly 5 questions with colored backgrounds
- [ ] Q1: Full/empty identification (2 containers)
- [ ] Q2: Half full identification (3 containers at 85%, 50%, 20%)
- [ ] Q3: Size comparison (which holds more - capacity)
- [ ] Q4: Fill level comparison (most/least full)
- [ ] Q5: Misconception test (tall narrow vs short wide - answer is SHORT WIDE)
- [ ] All answers use `<span class="answer-line"></span>` pattern
- [ ] Answer key format matches exactly (simple letters: A, B, C)
- [ ] Visual fills use proper height % (90%=full, 50%=half, 0%=empty)

---

## Research Sources
- [NCETM - Sense of Measure: Capacity, Volume, Mass](https://www.ncetm.org.uk/classroom-resources/cp-year-2-unit-14-sense-of-measure-capacity-volume-mass/)
- [Oak National Academy - EYFS Measures Lessons](https://www.thenational.academy/teachers/programmes/maths-foundation-early-years-foundation-stage-l/units/measures-1948/lessons)
- [Maths Matters Resources - Volume & Capacity Misconceptions](https://mathsmattersresources.com/thinking-about-volume-capacity-in-the-primary-school/)
- [TeachWire - Volume and Capacity Worksheets KS1](https://www.teachwire.net/news/volume-and-capacity-worksheets-and-resources-for-ks1-and-ks2-maths/)
- [Kindergarten Kindergarten - Capacity Exploration](https://www.kindergartenkindergarten.com/2012/07/math-problem-solving-measurement-capacity.html)
