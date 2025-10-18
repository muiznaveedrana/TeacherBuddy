# Year 1: Time - Days and Months (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 time (days/months) questions.

## CRITICAL RULES

**Concepts:** Days of week, months of year, seasons, sequencing
**Questions:** EXACTLY {{questionCount}} - count before returning
**Vocabulary:** before, after, next, yesterday, today, tomorrow
**Visual:** Calendars, day/month sequences, season images

## 5-QUESTION FORMAT

**Q1:** Days of week sequence (fill in missing day)
**Q2:** Yesterday, today, tomorrow (given a day, identify next/previous)
**Q3:** Months sequence (order months or find missing month)
**Q4:** Seasons matching (match months to seasons)
**Q5:** Word problem (days/months in context)

## DAYS OF WEEK

Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday

## MONTHS OF YEAR

January, February, March, April, May, June, July, August, September, October, November, December

## SEASONS (UK)

- Spring: March, April, May
- Summer: June, July, August
- Autumn: September, October, November
- Winter: December, January, February

## EXAMPLE OUTPUT

**Q1 (Days Sequence):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Fill in the missing day.</p>
    <div class="day-sequence">
        <div class="day-box">Monday</div>
        <div class="day-box">Tuesday</div>
        <div class="day-box missing">?</div>
        <div class="day-box">Thursday</div>
    </div>
    <p class="answer-prompt">The missing day is <span class="answer-line">__________</span></p>
</div>
```

**Q2 (Yesterday/Today/Tomorrow):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Today is Wednesday. What day was yesterday?</p>
    <div class="day-trio">
        <div class="day-card"><p class="label">Yesterday</p><div class="answer-box"></div></div>
        <div class="day-card today"><p class="label">Today</p><div class="day-name">Wednesday</div></div>
        <div class="day-card"><p class="label">Tomorrow</p><div class="answer-box"></div></div>
    </div>
</div>
```

**Q3 (Months):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Which month comes AFTER May?</p>
    <div class="month-sequence">
        <div class="month-box">April</div>
        <div class="month-box">May</div>
        <div class="month-box missing">?</div>
        <div class="month-box">July</div>
    </div>
    <p class="answer-prompt">The month after May is <span class="answer-line">__________</span></p>
</div>
```

**Q5 (Word Problem):**
```html
<div class="question" style="background: #FFF3E0;">
    <p class="question-text"><span class="question-number">5.</span> Emma's birthday is in the month after June. What month is Emma's birthday?</p>
    <div class="calendar-visual">
        <div class="month-card">June</div>
        <div class="arrow">→</div>
        <div class="month-card missing">?</div>
    </div>
    <p class="answer-prompt">Emma's birthday is in <span class="answer-line">__________</span></p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> Wednesday</p>
        <p><strong>2.</strong> Yesterday: Tuesday, Tomorrow: Thursday</p>
        <p><strong>3.</strong> June</p>
        <p><strong>4.</strong> December is in Winter</p>
        <p><strong>5.</strong> July (month after June)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
