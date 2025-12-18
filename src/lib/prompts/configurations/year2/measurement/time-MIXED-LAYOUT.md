# Ages 6-7: Time (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Time: School Day!"
- Theme: Morning activities, school
- Times: o'clock, half past only

**IF difficulty = "average":**
- Title: "Time: Weekend Fun!"
- Theme: Weekend activities
- Times: o'clock, half past, quarter past/to

**IF difficulty = "hard":**
- Title: "Time: Sports Day!"
- Theme: Sports activities
- Times: 5-minute intervals

## CSS (Mixed Layout - Compact):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:10pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
.section-title{font-size:12pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}
.question{margin:10px 0;padding:12px;border-radius:8px}
.q-fluency{background:#E3F2FD}
.q-application{background:#F3E5F5}
.q-reasoning{background:#FFF3E0}
.question-number{display:inline-block;background:#4169E1;color:white;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:12pt}
.question-text{font-size:14pt;margin:5px 0;font-weight:600}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}

/* TIME DISPLAY */
.time-box{display:inline-block;padding:10px 15px;background:#FFF;border:3px solid #1976D2;border-radius:8px;font-size:20pt;font-weight:bold;font-family:monospace;color:#1976D2;margin:5px}
.time-sequence{margin:12px 0;padding:12px;background:#FAFAFA;border-radius:8px;text-align:center}
.time-arrow{font-size:24pt;color:#FF9800;margin:0 10px;vertical-align:middle}

/* TIME ORDERING */
.time-ordering-row{display:flex;justify-content:space-around;flex-wrap:wrap;margin:12px 0;gap:10px}
.time-card{text-align:center;padding:12px;border:2px solid #ddd;border-radius:8px;background:#FFF;min-width:90px}
.time-display{font-size:20pt;font-weight:bold;color:#1976D2;margin-bottom:8px;font-family:monospace}

/* WORD PROBLEM */
.story-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:10px;padding:12px;margin:12px 0;text-align:center}
.story-icon{font-size:32pt;margin-bottom:8px}
.story-text{font-size:14pt;color:#333;margin:8px 0}
.story-detail{font-size:18pt;font-weight:bold;color:#2E7D32}

/* REASONING */
.reasoning-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#FFE082;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #FFA726;border-radius:10px;padding:10px;flex:1}

/* ANSWER ELEMENTS */
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-time{display:inline-block;min-width:70px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}

/* ANSWER KEY */
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Reading and writing times
- Q1: Read digital time and write in words
- Q2: Fill in missing hours/minutes

### Section B: Application (Q3-Q4) - Calculations and ordering
- Q3: Time calculation (now + duration)
- Q4: Order times from earliest to latest

### Section C: Reasoning (Q5) - Word problem + misconception

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - School Day)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 8:30 → What time? | 8, 30 |
| Q2 | 3:00 → hour and minutes | 3, 0 |
| Q3 | 9:00 + 30 minutes = ? | 9:30 |
| Q4 | Order: 11:00, 8:30, 2:30 | 2, 1, 3 |
| Q5 | PE 1:30 + 30 mins, misconception | 2:00, No |

**Answer Key**: 8, 30, 3, 0, 9:30, 2, 1, 3, 2:00, No

### Worksheet 2 (Average - Weekend Fun)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 10:15 → What time? | 10, 15 |
| Q2 | 1:45 → hour and minutes | 1, 45 |
| Q3 | 3:00 + 45 minutes = ? | 3:45 |
| Q4 | Order: 7:30, 10:15, 4:30 | 2, 3, 1 |
| Q5 | Movie 2:30 + 45 mins, misconception | 3:15, No |

**Answer Key**: 10, 15, 1, 45, 3:45, 2, 3, 1, 3:15, No

### Worksheet 3 (Hard - Sports Day)
| Q | Content | Answers |
|---|---------|---------|
| Q1 | 11:45 → What time? | 11, 45 |
| Q2 | 9:15 → hour and minutes | 9, 15 |
| Q3 | 1:15 + 30 minutes = ? | 1:45 |
| Q4 | Order: 3:15, 11:00, 8:45 | 3, 2, 1 |
| Q5 | Race 12:30 + 45 mins, misconception | 1:15, No |

**Answer Key**: 11, 45, 9, 15, 1:45, 3, 2, 1, 1:15, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 8, 30</p>
  <p><strong>2.</strong> 3, 0</p>
  <p><strong>3.</strong> 9:30</p>
  <p><strong>4.</strong> 2, 1, 3</p>
  <p><strong>5.</strong> 2:00, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (hour, minutes)?
- [ ] Q2: 2 answers (hour, minutes)?
- [ ] Q3: 1 answer (time result)?
- [ ] Q4: 3 answers (ordering numbers)?
- [ ] Q5: 2 answers (time + Yes/No)?
- [ ] Answer key uses ONLY comma-separated values?
- [ ] Total inputs: 2+2+1+3+2 = 10 answers?

Generate complete HTML. UK Year 2 aligned.
