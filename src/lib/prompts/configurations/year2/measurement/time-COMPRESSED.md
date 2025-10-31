# Y2: Time ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Time to 5 minutes.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS
- **Time skills**: o'clock, half past, quarter to, quarter past, 5-minute intervals
- **Clock types**: Analogue clocks (focus), digital clocks (support)
- **Skills**: Tell time, compare times, calculate durations
- **Ages 6-7**: Building on Y1 (o'clock, half past) to include quarters and 5-min intervals

## QUESTION TYPES

**Q1**: Read analogue clock. Show clock face. "What time does the clock show?" (o'clock, half past, quarter to/past)

**Q2**: Match times. "Draw lines to match analogue clocks to digital times."

**Q3**: Time before/after. "It is 3:00. What time will it be in 30 minutes?"

**Q4**: Compare/order times. "Put these times in order from earliest to latest."

**Q5**: Word problem. Real-world context. "The film starts at 2:30. It lasts 45 minutes. What time does it end?"

## TIME RANGES
- **Hours**: 1-12 (12-hour clock)
- **Minutes**: :00, :15, :30, :45 (quarters), then :05, :10, :20, :25, :35, :40, :50, :55 (5-min intervals)
- **Durations**: 15, 30, 45, 60 minutes (simple calculations)

## CLOCK VISUAL COMPONENTS
- **Hour hand**: Shorter, thicker (red/orange)
- **Minute hand**: Longer, thinner (blue/teal)
- **Numbers**: 1-12 around face
- **Minute marks**: 60 marks (emphasize 5-minute marks)

## CSS (Ultra-Compact):
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:15pt;padding:10px;line-height:1.4}
.question{margin:8px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.clock-container{margin:15px 0;padding:15px;background:#F5F5F5;border-radius:8px;text-align:center}
.clock-face{width:180px;height:180px;border:5px solid #333;border-radius:50%;position:relative;margin:15px auto;background:#FFF}
.clock-center{width:12px;height:12px;background:#333;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10}
.clock-number{position:absolute;font-size:16pt;font-weight:bold}
.hour-hand{width:6px;height:60px;background:#FF5722;position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:3px;margin-left:-3px}
.minute-hand{width:4px;height:80px;background:#2196F3;position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:2px;margin-left:-2px}
.minute-marks{position:absolute;width:100%;height:100%;top:0;left:0}
.minute-mark{width:2px;height:8px;background:#999;position:absolute;top:5px;left:50%;transform-origin:center 85px}
.minute-mark.major{height:12px;width:3px;background:#333}
.digital-time{font-size:28pt;font-weight:bold;color:#1976D2;background:#FFF;padding:10px 20px;border:3px solid #1976D2;border-radius:8px;display:inline-block;font-family:monospace}
.time-matching{margin:15px 0;padding:15px;background:#E3F2FD;border-radius:8px}
.time-pair{display:flex;justify-content:space-around;align-items:center;margin:15px 0;flex-wrap:wrap}
.time-sequence{margin:15px 0;padding:15px;background:#FFF9C4;border:2px dashed #FF9800;border-radius:8px}
.time-arrow{font-size:32pt;color:#FF9800;margin:0 15px}
.time-box{display:inline-block;padding:10px 15px;background:#FFF;border:2px solid #333;border-radius:8px;font-size:18pt;font-weight:bold;margin:5px}
.time-ordering{display:flex;justify-content:space-around;flex-wrap:wrap;margin:15px 0}
.time-item{text-align:center;padding:10px;margin:10px;border:2px solid #ddd;border-radius:8px;background:#FFF}
.ordering-box{width:40px;height:40px;border:2px solid #333;border-radius:5px;background:#FFF;display:inline-block;margin-top:10px}
.word-problem-visual{margin:10px 0;padding:12px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.time-calculation{margin:15px 0;padding:15px;background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px}
.calculation-step{margin:10px 0;padding:10px;background:#FFF;border-radius:5px;font-size:16pt}
.answer-box{display:inline-block;min-width:80px;height:35px;border:2px solid #333;border-radius:5px;background:#FFF;vertical-align:middle;margin:0 5px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:80px;margin:0 5px;background:transparent}
.working-space{border:2px dashed #999;padding:10px;margin:10px 0;min-height:60px;background:#FAFAFA;border-radius:6px}
.answer-key{margin-top:30px;padding:15px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:17pt;color:#2c3e50;margin-bottom:10px;text-align:center}
.answer-key p{font-size:13pt;line-height:1.6;margin:6px 0}
</style>
```

## RULES

1. Year 2 focus: o'clock, half past, quarter to/past, 5-minute intervals
2. Clear analogue clock visuals with hour/minute hands
3. Digital time format: 12-hour (e.g., 3:30, 11:45)
4. Hour hand shorter/thicker, minute hand longer/thinner
5. Real-world time contexts (school, activities, meals)
6. Answer key with explanations
7. Colored backgrounds Q1-Q5
8. Year 2 appropriate time calculations (15, 30, 45, 60 min)

## CLOCK HAND ROTATION REFERENCE
- **Hour hand**: 30° per hour (360° ÷ 12)
  - 1:00 = 30°, 2:00 = 60°, 3:00 = 90°, etc.
  - Plus 0.5° per minute
- **Minute hand**: 6° per minute (360° ÷ 60)
  - :00 = 0°, :15 = 90°, :30 = 180°, :45 = 270°
  - :05 = 30°, :10 = 60°, :20 = 120°, etc.

## EXAMPLES

### Q1 Template (Read Clock):
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1.</span> What time does the clock show?</p>
  <div class="clock-container">
    <div class="clock-face">
      <!-- 12 numbers around clock -->
      <span class="clock-number" style="top:8px;left:50%;transform:translateX(-50%)">12</span>
      <span class="clock-number" style="right:20px;top:50%;transform:translateY(-50%)">3</span>
      <span class="clock-number" style="bottom:8px;left:50%;transform:translateX(-50%)">6</span>
      <span class="clock-number" style="left:20px;top:50%;transform:translateY(-50%)">9</span>

      <!-- Minute marks (example: show major marks at 5-min intervals) -->
      <div class="minute-marks">
        <div class="minute-mark major" style="transform:rotate(0deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(30deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(60deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(90deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(120deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(150deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(180deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(210deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(240deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(270deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(300deg) translateX(-1px)"></div>
        <div class="minute-mark major" style="transform:rotate(330deg) translateX(-1px)"></div>
      </div>

      <!-- Hands: Example showing 3:30 -->
      <!-- Hour hand: 3:30 = 90° + 15° = 105° -->
      <div class="hour-hand" style="transform:rotate(105deg)"></div>
      <!-- Minute hand: :30 = 180° -->
      <div class="minute-hand" style="transform:rotate(180deg)"></div>

      <div class="clock-center"></div>
    </div>
    <p class="question-text">Time: <span class="answer-box"></span></p>
  </div>
</div>
```

### Q2 Template (Match Times):
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2.</span> Match the clock to the correct digital time.</p>
  <div class="time-matching">
    <div class="time-pair">
      <div class="clock-container" style="display:inline-block">
        <div class="clock-face" style="width:120px;height:120px">
          <!-- Simplified clock showing 2:00 -->
          <span class="clock-number" style="top:5px;left:50%;transform:translateX(-50%);font-size:12pt">12</span>
          <span class="clock-number" style="right:15px;top:50%;transform:translateY(-50%);font-size:12pt">3</span>
          <div class="hour-hand" style="height:40px;transform:rotate(60deg)"></div>
          <div class="minute-hand" style="height:55px;transform:rotate(0deg)"></div>
          <div class="clock-center" style="width:8px;height:8px"></div>
        </div>
      </div>
      <p style="font-size:18pt;margin:0 20px">Draw a line to:</p>
      <div>
        <div class="digital-time" style="font-size:20pt;margin:5px">2:00</div>
        <div class="digital-time" style="font-size:20pt;margin:5px">5:30</div>
      </div>
    </div>
  </div>
</div>
```

### Q3 Template (Time Before/After):
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3.</span> It is 3:00 now. What time will it be in 30 minutes?</p>
  <div class="time-sequence">
    <div style="text-align:center">
      <div class="time-box">3:00</div>
      <span class="time-arrow">→</span>
      <div class="time-box">+ 30 minutes</div>
      <span class="time-arrow">→</span>
      <span class="answer-box" style="min-width:100px"></span>
    </div>
  </div>
  <div class="working-space"></div>
</div>
```

### Q5 Template (Word Problem):
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5.</span> The film starts at 2:30. It lasts 45 minutes. What time does the film end?</p>
  <div class="word-problem-visual">
    <div class="time-calculation">
      <div class="calculation-step">
        <strong>Start time:</strong> 2:30
      </div>
      <div class="calculation-step">
        <strong>Duration:</strong> 45 minutes
      </div>
    </div>
  </div>
  <div class="working-space"></div>
  <p class="question-text">End time: <span class="answer-box"></span></p>
</div>
```

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Clock hands correct (hour=short, minute=long)?
- [ ] Times use Y2 range (quarters, 5-min intervals)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Realistic time contexts?
- [ ] Answer key included?
- [ ] Working space provided?

Generate complete HTML. UK Year 2 aligned.
