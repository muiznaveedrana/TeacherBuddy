# Ages 6-7: Time (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Time skills**: o'clock, half past, quarter to, quarter past, 5-minute intervals
- **Clock types**: Analogue clocks (focus), digital equivalents
- **Key Skills**: Tell time, sequence times, calculate simple durations
- **Interactive Priority**: All answers must be typed (times, numbers for ordering)
- **Key Misconception**: Confusing hour and minute hands, reading minute numbers as hours

## QUESTION TYPES (CPA Progression)

**Q1**: Concrete - Read ONE analogue clock, type the time
**Q2**: Pictorial - Read 3 clocks, type hours and minutes for each (6 inputs)
**Q3**: Abstract - Time calculation (now + duration = ?)
**Q4**: Application - Order 3 times from earliest to latest (type 1, 2, 3)
**Q5**: Reasoning - Word problem + tests hand confusion misconception

## CSS (Compact - Interactive Optimised):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* CLOCK VISUAL */
.clock-container{margin:15px auto;padding:15px;background:#F5F5F5;border-radius:8px;text-align:center;max-width:250px}
.clock-face{width:180px;height:180px;border:5px solid #333;border-radius:50%;position:relative;margin:15px auto;background:#FFF}
.clock-center{width:12px;height:12px;background:#333;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10}
.clock-number{position:absolute;font-size:15pt;font-weight:bold;color:#333}
.hour-hand{width:6px;height:55px;background:#FF5722;position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:3px;margin-left:-3px;z-index:5}
.minute-hand{width:4px;height:75px;background:#2196F3;position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:2px;margin-left:-2px;z-index:6}
.minute-marks{position:absolute;width:100%;height:100%;top:0;left:0}
.minute-mark{width:2px;height:8px;background:#999;position:absolute;top:5px;left:50%;transform-origin:center 85px}
.minute-mark.major{height:12px;width:3px;background:#333}

/* MULTI-CLOCK ROW */
.clock-row{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0;gap:15px}
.mini-clock-box{text-align:center;padding:10px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:140px}
.mini-clock{width:100px;height:100px;border:4px solid #333;border-radius:50%;position:relative;margin:10px auto;background:#FFF}
.mini-clock .clock-center{width:8px;height:8px}
.mini-clock .hour-hand{height:35px;width:5px;margin-left:-2.5px}
.mini-clock .minute-hand{height:45px;width:3px;margin-left:-1.5px}
.mini-clock .clock-number{font-size:11pt}
.time-input-row{margin:8px 0;font-size:14pt}

/* TIME SEQUENCE */
.time-sequence{margin:15px 0;padding:15px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px;text-align:center}
.time-box{display:inline-block;padding:10px 15px;background:#FFF;border:2px solid #333;border-radius:8px;font-size:18pt;font-weight:bold;margin:5px;min-width:80px;text-align:center}
.time-arrow{font-size:28pt;color:#FF9800;margin:0 10px;vertical-align:middle}

/* TIME ORDERING */
.time-ordering-row{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0;gap:15px}
.time-card{text-align:center;padding:15px;border:2px solid #333;border-radius:8px;background:#FFF;min-width:100px}
.time-display{font-size:24pt;font-weight:bold;color:#1976D2;margin-bottom:10px;font-family:monospace}
.order-label{font-size:13pt;color:#666;margin-bottom:5px}

/* WORD PROBLEM */
.story-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.story-icon{font-size:36pt;margin-bottom:10px}
.story-text{font-size:15pt;color:#333;margin:10px 0;line-height:1.6}
.story-detail{font-size:18pt;font-weight:bold;color:#2E7D32;margin:5px 0}

/* REASONING BOX */
.reasoning-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#FFE082;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #FFA726;border-radius:10px;padding:12px;flex:1;position:relative}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #FFA726 transparent transparent}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:90px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:32px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## CLOCK HAND ROTATION REFERENCE
**CRITICAL FOR ACCURACY:**
- **Hour hand**: 30° per hour + 0.5° per minute
  - 3:00 = 90°, 3:30 = 105°, 3:45 = 112.5°
  - 9:00 = 270°, 9:15 = 277.5°, 9:30 = 285°
- **Minute hand**: 6° per minute
  - :00 = 0°, :15 = 90°, :30 = 180°, :45 = 270°
  - :05 = 30°, :10 = 60°, :20 = 120°, :25 = 150°

## TEMPLATES

### Q1: Read One Clock (1 answer box)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> What time does the clock show?</p>
  <div class="clock-container">
    <div class="clock-face">
      <!-- 12 numbers positioned around clock -->
      <span class="clock-number" style="top:8px;left:50%;transform:translateX(-50%)">12</span>
      <span class="clock-number" style="right:35px;top:22px">1</span>
      <span class="clock-number" style="right:20px;top:50%;transform:translateY(-50%)">3</span>
      <span class="clock-number" style="right:35px;bottom:22px">5</span>
      <span class="clock-number" style="bottom:8px;left:50%;transform:translateX(-50%)">6</span>
      <span class="clock-number" style="left:35px;bottom:22px">7</span>
      <span class="clock-number" style="left:20px;top:50%;transform:translateY(-50%)">9</span>
      <span class="clock-number" style="left:35px;top:22px">11</span>

      <!-- Minute marks (12 major marks at 5-min intervals) -->
      <div class="minute-marks">
        <div class="minute-mark major" style="transform:rotate(0deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(30deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(60deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(90deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(120deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(150deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(180deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(210deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(240deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(270deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(300deg) translateX(-1.5px)"></div>
        <div class="minute-mark major" style="transform:rotate(330deg) translateX(-1.5px)"></div>
      </div>

      <!-- Example: 3:30 - Hour hand: 105°, Minute hand: 180° -->
      <div class="hour-hand" style="transform:rotate(105deg)"></div>
      <div class="minute-hand" style="transform:rotate(180deg)"></div>
      <div class="clock-center"></div>
    </div>
  </div>
  <p class="sub-question">Time: <span class="answer-box"></span></p>
</div>
```

### Q2: Read 3 Clocks (6 answer boxes - hours and minutes for each)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Write the time for each clock.</p>
  <div class="clock-row">
    <!-- Clock A: 9:15 -->
    <div class="mini-clock-box">
      <p style="font-weight:bold;margin:0 0 5px 0">Clock A</p>
      <div class="mini-clock">
        <span class="clock-number" style="top:5px;left:50%;transform:translateX(-50%)">12</span>
        <span class="clock-number" style="right:12px;top:50%;transform:translateY(-50%)">3</span>
        <span class="clock-number" style="bottom:5px;left:50%;transform:translateX(-50%)">6</span>
        <span class="clock-number" style="left:12px;top:50%;transform:translateY(-50%)">9</span>
        <!-- 9:15 - Hour: 277.5°, Minute: 90° -->
        <div class="hour-hand" style="transform:rotate(277.5deg)"></div>
        <div class="minute-hand" style="transform:rotate(90deg)"></div>
        <div class="clock-center"></div>
      </div>
      <div class="time-input-row">
        Hours: <span class="answer-box-small"></span><br>
        Minutes: <span class="answer-box-small"></span>
      </div>
    </div>

    <!-- Clock B: 2:30 -->
    <div class="mini-clock-box">
      <p style="font-weight:bold;margin:0 0 5px 0">Clock B</p>
      <div class="mini-clock">
        <span class="clock-number" style="top:5px;left:50%;transform:translateX(-50%)">12</span>
        <span class="clock-number" style="right:12px;top:50%;transform:translateY(-50%)">3</span>
        <span class="clock-number" style="bottom:5px;left:50%;transform:translateX(-50%)">6</span>
        <span class="clock-number" style="left:12px;top:50%;transform:translateY(-50%)">9</span>
        <!-- 2:30 - Hour: 75°, Minute: 180° -->
        <div class="hour-hand" style="transform:rotate(75deg)"></div>
        <div class="minute-hand" style="transform:rotate(180deg)"></div>
        <div class="clock-center"></div>
      </div>
      <div class="time-input-row">
        Hours: <span class="answer-box-small"></span><br>
        Minutes: <span class="answer-box-small"></span>
      </div>
    </div>

    <!-- Clock C: 7:00 -->
    <div class="mini-clock-box">
      <p style="font-weight:bold;margin:0 0 5px 0">Clock C</p>
      <div class="mini-clock">
        <span class="clock-number" style="top:5px;left:50%;transform:translateX(-50%)">12</span>
        <span class="clock-number" style="right:12px;top:50%;transform:translateY(-50%)">3</span>
        <span class="clock-number" style="bottom:5px;left:50%;transform:translateX(-50%)">6</span>
        <span class="clock-number" style="left:12px;top:50%;transform:translateY(-50%)">9</span>
        <!-- 7:00 - Hour: 210°, Minute: 0° -->
        <div class="hour-hand" style="transform:rotate(210deg)"></div>
        <div class="minute-hand" style="transform:rotate(0deg)"></div>
        <div class="clock-center"></div>
      </div>
      <div class="time-input-row">
        Hours: <span class="answer-box-small"></span><br>
        Minutes: <span class="answer-box-small"></span>
      </div>
    </div>
  </div>
</div>
```

### Q3: Time Calculation (1 answer box)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> It is 2:00 now. What time will it be in 30 minutes?</p>
  <div class="time-sequence">
    <span class="time-box">2:00</span>
    <span class="time-arrow">+</span>
    <span class="time-box">30 minutes</span>
    <span class="time-arrow">=</span>
    <span class="answer-box" style="min-width:100px"></span>
  </div>
</div>
```

### Q4: Order Times (3 answer boxes)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Write 1, 2, 3 to show these times from <strong>earliest to latest</strong>.</p>
  <div class="time-ordering-row">
    <div class="time-card">
      <div class="time-display">4:30</div>
      <div class="order-label">Order:</div>
      <span class="answer-box-small"></span>
    </div>
    <div class="time-card">
      <div class="time-display">9:15</div>
      <div class="order-label">Order:</div>
      <span class="answer-box-small"></span>
    </div>
    <div class="time-card">
      <div class="time-display">2:45</div>
      <div class="order-label">Order:</div>
      <span class="answer-box-small"></span>
    </div>
  </div>
</div>
```

### Q5: Word Problem + Misconception Test (2 answer boxes)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Read and solve.</p>
  <div class="story-box">
    <div class="story-icon">🎬</div>
    <p class="story-text">The film starts at <strong class="story-detail">2:30</strong>.</p>
    <p class="story-text">It lasts <strong class="story-detail">45 minutes</strong>.</p>
  </div>
  <p class="sub-question">a) What time does the film end? <span class="answer-box"></span></p>

  <div class="reasoning-box" style="margin-top:15px">
    <div class="character-speech">
      <div class="character-icon">👦</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Tom says:</strong> "When the long hand points to 6, it means 6 o'clock."</p>
      </div>
    </div>
  </div>
  <p class="sub-question">b) Is Tom correct? <span class="answer-box-small"></span> (Yes / No)</p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1: School Day Theme (Easier times)
**Context**: Wake up, lessons, lunch, home time

| Q | Details |
|---|---------|
| Q1 | ONE clock showing: **8:30** (wake up time) |
| Q2 | THREE clocks: **9:00** (school starts), **12:00** (lunch), **3:30** (home time) |
| Q3 | Calculation: "Lesson starts at 9:00. It lasts 30 minutes. End time?" → **9:30** |
| Q4 | Order these: **11:45, 8:15, 2:30** → Order: **2, 1, 3** (8:15=1st, 11:45=2nd, 2:30=3rd) |
| Q5 | Story: "PE starts at 1:30, lasts 45 minutes" → **2:15** + Tom's misconception (minute hand at 6 ≠ 6 o'clock) → **No** |

**Answer Key**:
- 1. 8:30 (half past 8 / eight thirty)
- 2. a) 9 b) 00 c) 12 d) 00 e) 3 f) 30
- 3. 9:30 (9:00 + 30 minutes = 9:30)
- 4. a) 2 b) 3 c) 1 (earliest: 8:15, then 11:45, latest: 2:30)
- 5. a) 2:15 (1:30 + 45 minutes = 2:15) b) No (long hand at 6 = 30 minutes, not 6 o'clock)

### Worksheet 2: Weekend Fun Theme (Medium times)
**Context**: Breakfast, park, movie, bedtime

| Q | Details |
|---|---------|
| Q1 | ONE clock showing: **10:15** (park time) |
| Q2 | THREE clocks: **8:30** (breakfast), **1:45** (lunch at park), **5:00** (dinner) |
| Q3 | Calculation: "Movie starts at 3:00. It lasts 45 minutes. End time?" → **3:45** |
| Q4 | Order these: **7:30, 10:15, 4:45** → Order: **2, 3, 1** (4:45=1st, 7:30=2nd, 10:15=3rd) |
| Q5 | Story: "Swimming starts at 11:00, lasts 30 minutes" → **11:30** + Misconception about short hand → **No** |

**Answer Key**:
- 1. 10:15 (quarter past 10 / ten fifteen)
- 2. a) 8 b) 30 c) 1 d) 45 e) 5 f) 00
- 3. 3:45 (3:00 + 45 minutes = 3:45 / quarter to 4)
- 4. a) 2 b) 3 c) 1 (earliest: 4:45, then 7:30, latest: 10:15)
- 5. a) 11:30 (11:00 + 30 minutes = 11:30) b) No (short hand = hour hand, long hand = minute hand)

### Worksheet 3: Sports Day Theme (Harder times)
**Context**: Races, events, prize ceremony

| Q | Details |
|---|---------|
| Q1 | ONE clock showing: **11:45** (race starts) |
| Q2 | THREE clocks: **9:15** (warm-up), **10:30** (relay race), **2:00** (prizes) |
| Q3 | Calculation: "Long jump starts at 1:15. It lasts 30 minutes. End time?" → **1:45** |
| Q4 | Order these: **3:15, 11:00, 8:45** → Order: **3, 1, 2** (8:45=1st, 11:00=2nd, 3:15=3rd) |
| Q5 | Story: "Hurdles start at 12:30, last 45 minutes" → **1:15** + Misconception (minute hand at 3 = 3 o'clock) → **No** |

**Answer Key**:
- 1. 11:45 (quarter to 12 / eleven forty-five)
- 2. a) 9 b) 15 c) 10 d) 30 e) 2 f) 00
- 3. 1:45 (1:15 + 30 minutes = 1:45 / quarter to 2)
- 4. a) 3 b) 1 c) 2 (earliest: 8:45, then 11:00, latest: 3:15)
- 5. a) 1:15 (12:30 + 45 minutes = 1:15) b) No (minute hand at 3 = 15 minutes, not 3 o'clock)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 8:30 (half past 8 / eight thirty - wake up time)</p>
  <p><strong>2.</strong> a) 9 b) 00 c) 12 d) 00 e) 3 f) 30 (Clock A=9:00, B=12:00, C=3:30)</p>
  <p><strong>3.</strong> 9:30 (9:00 + 30 minutes = 9:30 / half past 9)</p>
  <p><strong>4.</strong> a) 2 b) 3 c) 1 (Earliest first: 8:15, then 11:45, then 2:30)</p>
  <p><strong>5.</strong> a) 2:15 (1:30 + 45 minutes = 2:15) b) No (Long hand at 6 means 30 minutes past, NOT 6 o'clock. Minute hand shows minutes, not hours.)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b, c, d, e, f) - each gets its own answer
4. **Q2 has 6 inputs**: Hours and Minutes for each of 3 clocks
5. **Q4 ordering**: Students type 1, 2, 3 next to each time (not re-write times)
6. **Q5 MUST test hand confusion misconception** (confusing minute hand position with hour)
7. **Clock hand accuracy is CRITICAL** - double-check all rotations
8. **Accept multiple formats**: "3:30", "half past 3", "three thirty"
9. **Total answer boxes**: 1 + 6 + 1 + 3 + 2 = **13 answers**

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: ONE clock with ONE answer box?
- [ ] Q2: THREE mini-clocks with 6 answer boxes (hours + minutes × 3)?
- [ ] Q3: Time calculation with ONE answer box?
- [ ] Q4: THREE time cards with 3 ordering boxes (1, 2, 3)?
- [ ] Q5: Word problem (TWO sub-questions: a) time result, b) Yes/No for misconception)?
- [ ] ALL answer boxes use `.answer-box` or `.answer-box-small` class?
- [ ] Clock hands positioned correctly (check rotation calculations)?
- [ ] Answer key uses a) b) c) d) e) f) format for multi-part questions?
- [ ] Q5b tests HAND CONFUSION misconception (minute hand ≠ hour)?
- [ ] Total answer count = 13?

Generate complete HTML. UK Year 2 aligned. Use themed context throughout.
