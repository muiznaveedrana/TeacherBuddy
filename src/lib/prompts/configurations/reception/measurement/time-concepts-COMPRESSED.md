# Ages 4-5: Time Concepts

**Generate EXACTLY {{questionCount}} questions (ages 4-5)**

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0
**CRITICAL**: ALL questions MUST have colored background.

## Time Vocabulary (Reception Level)
**Basic sequences**: before, after, next, first, last
**Parts of day**: morning, afternoon, evening, night, daytime, bedtime
**Days**: today, yesterday, tomorrow, weekend
**Seasons**: spring, summer, autumn, winter
**Time words**: now, later, soon, early, late, fast, slow

## Activity Images
**Morning**: sunrise, breakfast, brushing teeth, getting dressed
**Afternoon**: lunch, playing outside, school
**Evening**: dinner, sunset, bath
**Night**: moon, stars, bedtime, sleeping, pajamas
**Seasons**: Use seasonal images (flowers for spring, sun for summer, leaves for autumn, snow for winter)

## 5 Question Types (EXACT ORDER)
**Q1 - Day or Night?**: Identify activity as day/night
**Q2 - What Comes Next?**: Sequence of 3 activities (first, next, last)
**Q3 - Before or After?**: "What do you do before/after X?"
**Q4 - Morning or Evening?**: Identify time of day for activity
**Q5 - Seasons**: Match activity/image to correct season

## Q1 - Day or Night?
**RANDOMIZE**: Pick ONE activity + ONE question variation

**Day activities**: playing outside, going to school, eating lunch, seeing the sun, playground
**Night activities**: sleeping, seeing stars, wearing pajamas, bedtime story, moon

**Question Variations** (pick ONE):
- "Do we do this in the day or at night?"
- "When do we do this? Day or night?"
- "Is this a daytime or nighttime activity?"
- "Day or night?"

**Example**:
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Do we do this in the day or at night?</p>
    <div class="activity-display">
        <img src="/images/sleeping.png" width="80" height="80" alt="Sleeping" />
        <p class="activity-label">Sleeping</p>
    </div>
    <div class="choice-boxes">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-text">Day</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-text">Night</p>
        </div>
    </div>
</div>
```

## Q2 - What Comes Next? (Sequence)
**RANDOMIZE**: Pick ONE daily routine sequence + ONE question variation

**Common sequences**:
- Wake up → Get dressed → Eat breakfast
- Wash hands → Eat lunch → Play
- Eat dinner → Take bath → Go to bed
- Put on shoes → Go outside → Play
- Brush teeth → Put on pajamas → Sleep

**Question Variations** (pick ONE):
- "What comes next?"
- "What do you do next?"
- "What happens after this?"
- "Then what?"

**Example**:
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">2.</span> What comes next?</p>
    <div class="sequence-display">
        <div class="sequence-item">
            <img src="/images/breakfast.png" width="60" height="60" alt="Breakfast" />
        </div>
        <div class="arrow">→</div>
        <div class="sequence-item">
            <img src="/images/backpack.png" width="60" height="60" alt="Backpack" />
        </div>
        <div class="arrow">→</div>
        <div class="sequence-item">
            <div class="mystery-box">?</div>
        </div>
    </div>
    <p class="answer-prompt">Write what comes next: <span class="answer-line"></span></p>
</div>
```

## Q3 - Before or After?
**RANDOMIZE**: Pick ONE activity pair + ONE question type (before/after)

**Question Variations** (pick ONE):
- "What do you do before {activity}?"
- "What do you do after {activity}?"
- "What comes before {activity}?"
- "What comes after {activity}?"

**Example pairs**:
- Before bed → Take bath
- After breakfast → Brush teeth
- Before playing → Put on shoes
- After lunch → Wash hands

**Example**:
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">3.</span> What do you do before going to bed?</p>
    <div class="choice-boxes-vertical">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <img src="/images/breakfast.png" width="50" height="50" alt="Breakfast" />
            <p class="choice-text">Eat breakfast</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <img src="/images/bath.png" width="50" height="50" alt="Bath" />
            <p class="choice-text">Take a bath</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <img src="/images/lunch.png" width="50" height="50" alt="Lunch" />
            <p class="choice-text">Eat lunch</p>
        </div>
    </div>
</div>
```

## Q4 - Morning or Evening?
**RANDOMIZE**: Pick ONE activity + ONE question variation

**Morning activities**: wake up, breakfast, sunrise, getting dressed, going to school
**Evening activities**: dinner, sunset, bath time, bedtime, stars coming out

**Question Variations** (pick ONE):
- "Is this in the morning or evening?"
- "When do we do this? Morning or evening?"
- "Morning or evening?"
- "What time of day is this?"

**Example**:
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> When do we see the sunrise?</p>
    <div class="activity-display">
        <img src="/images/sunrise.png" width="80" height="80" alt="Sunrise" />
        <p class="activity-label">Sunrise</p>
    </div>
    <div class="choice-boxes">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-text">Morning</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-text">Evening</p>
        </div>
    </div>
</div>
```

## Q5 - Seasons
**RANDOMIZE**: Pick ONE season indicator + ONE question variation

**Season clues**:
- **Spring**: flowers blooming, baby animals, rain, butterflies, birds nesting
- **Summer**: hot sun, beach, swimming, ice cream, shorts
- **Autumn**: falling leaves, orange/brown colors, pumpkins, apples
- **Winter**: snow, snowman, cold, warm clothes, Christmas trees

**Question Variations** (pick ONE):
- "Which season is this?"
- "When do we see this?"
- "What season shows {activity/image}?"
- "In which season do we see {thing}?"

**Example**:
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Which season is this?</p>
    <div class="season-display">
        <img src="/images/snowman.png" width="80" height="80" alt="Snowman" />
        <p class="season-clue">We build snowmen</p>
    </div>
    <div class="choice-boxes-grid">
        <div class="choice-box">
            <span class="choice-label">A</span>
            <p class="choice-text">Spring</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">B</span>
            <p class="choice-text">Summer</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">C</span>
            <p class="choice-text">Autumn</p>
        </div>
        <div class="choice-box">
            <span class="choice-label">D</span>
            <p class="choice-text">Winter</p>
        </div>
    </div>
</div>
```

## CSS (Include at worksheet start)
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px;}
.question{margin:10px 0;padding:12px;border-radius:8px;}
.question-number{font-size:18pt;font-weight:bold;margin-right:8px;}
.question-text{font-size:16pt;font-weight:600;}
.activity-display,.season-display{text-align:center;margin:20px auto;padding:20px;background:#fff;border:2px solid #ddd;border-radius:10px;max-width:300px;}
.activity-label,.season-clue{font-size:15pt;font-weight:600;margin-top:10px;}
.sequence-display{display:flex;gap:15px;justify-content:center;align-items:center;margin:20px auto;flex-wrap:wrap;}
.sequence-item{text-align:center;min-width:100px;}
.arrow{font-size:28pt;font-weight:bold;color:#FF6347;}
.mystery-box{width:60px;height:60px;border:3px dashed #FF6347;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:32pt;color:#FF6347;margin:0 auto;}
.choice-boxes,.choice-boxes-grid{display:flex;gap:15px;justify-content:center;margin-top:15px;flex-wrap:wrap;}
.choice-boxes-vertical{display:flex;flex-direction:column;gap:15px;max-width:300px;margin:20px auto;}
.choice-box{padding:15px;border:3px solid #ddd;border-radius:12px;text-align:center;min-width:100px;}
.choice-label{font-size:16pt;font-weight:bold;margin-bottom:8px;display:block;}
.choice-text{font-size:14pt;margin:5px 0;font-weight:600;}
.answer-prompt{margin-top:25px;font-size:15pt;font-weight:600;text-align:center}
.answer-line{border-bottom:3px solid #333;display:inline-block;min-width:150px;height:28px;margin-left:10px;margin-top:8px;}
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
        <p><strong>1.</strong> [Day/Night, e.g., "B (Night)"]</p>
        <p><strong>2.</strong> [Next activity, e.g., "Go to school"]</p>
        <p><strong>3.</strong> [Before/after activity, e.g., "B (Take a bath)"]</p>
        <p><strong>4.</strong> [Time of day, e.g., "A (Morning)"]</p>
        <p><strong>5.</strong> [Season, e.g., "D (Winter)"]</p>
    </div>
</div>
```
