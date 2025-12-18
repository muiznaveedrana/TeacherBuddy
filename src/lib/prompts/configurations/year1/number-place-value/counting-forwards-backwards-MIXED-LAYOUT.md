# Ages 5-6: Counting Forwards & Backwards (MIXED LAYOUT)

Generate EXACTLY {{questionCount}} Year 1 counting forwards/backwards questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, Odd one out, Explain thinking

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 1)
- **Number range:** 0-20 ONLY
- **Key skills:** Count forwards, count backwards, identify missing numbers
- **Visual representations:** Number sequences, number lines, stepping stones
- **Key misconception:** Confusing direction (forwards vs backwards)

## CRITICAL RULES - NO ANSWER CLUES!
1. **ALL numbers MUST be between 0-20**
2. **NO colored/highlighted text in questions**
3. **NO direction arrows or text hints**
4. **Answer positions must look identical to other positions**

## CSS (Compact - Mixed Layout)
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
.number-sequence{display:flex;gap:8px;justify-content:center;margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #4CAF50;border-radius:10px;max-width:500px}
.seq-box{width:50px;height:50px;border:3px solid #333;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18pt;font-weight:bold;background:#fff}
.seq-box.filled{background:#4CAF50;color:white}
.seq-box.empty{background:#FFF9C4;border-style:dashed;border-color:#FF5722}
.number-line-box{display:flex;justify-content:space-around;align-items:center;margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #2196F3;border-radius:10px;max-width:550px;position:relative}
.number-line-box::before{content:'';position:absolute;top:50%;left:5%;right:5%;height:3px;background:#333;z-index:0}
.number-marker{width:45px;height:45px;border:2px solid #333;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16pt;background:#E0E0E0;position:relative;z-index:1}
.number-marker.start{background:#4CAF50;color:white;border:3px solid #2E7D32}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:10px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:10px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:15px;padding:10px 15px;margin:10px 0;position:relative}
.caterpillar-container{display:flex;justify-content:center;margin:15px auto;padding:15px;background:#f0fff0;border:3px solid #8BC34A;border-radius:10px}
.caterpillar{display:flex;align-items:center;gap:4px}
.caterpillar-head{width:50px;height:50px;background:#8BC34A;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #689F38;font-size:24pt}
.caterpillar-segment{width:45px;height:45px;background:#AED581;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;border:3px solid #8BC34A;color:#2E7D32}
.caterpillar-segment.empty{background:#fff;border-style:dashed;border-color:#FF5722}
.answer-box{display:inline-block;min-width:55px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Forward sequence**: Fill in 2 missing numbers counting forward (e.g., 5, 6, __, 8, __, 10)
- **Backward sequence**: Fill in 2 missing numbers counting backward (e.g., 15, 14, __, 12, __, 10)
- **Caterpillar sequence**: Fun caterpillar with numbered segments, 2 missing

### Q2 OPTIONS (Fluency - Pick ONE):
- **Number line jumps**: Start at X, count forward Y steps, where do you land?
- **What comes next**: Complete the sequence (3 numbers given, write next 2)
- **Number before/after**: What number comes before X? What comes after Y?

### Q3 OPTIONS (Application - Pick ONE):
- **Houses context**: "[Name] is at house X. Walks forward Y houses. What house?"
- **Stairs context**: "[Name] on step X. Climbs up Y steps. What step?"
- **Counting story**: Real-world counting scenario

### Q4 OPTIONS (Application - Pick ONE):
- **Backward context**: "[Name] at floor X. Goes down Y floors. What floor?"
- **Countdown**: "Rocket countdown from 10. What comes after 5, 4, 3...?"
- **Comparison**: "Sam counts forward. Lily counts backward. Who says 12 first?"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True/False**: 3 statements about counting (e.g., "After 17 comes 18")
- **Spot the mistake**: Character makes wrong sequence, identify error
- **Complete pattern**: Given pattern rule, extend it

## NAMES FOR STORIES
Emma, Ben, Sam, Lily, Max, Zara, Jack, Mia, Leo

## 3 WORKSHEET VARIATIONS

### WS1: Foundation (Easy)
| Q | Type | Details |
|---|------|---------|
| Q1 | Forward caterpillar | 5, 6, __, 8, __, 10 → 7, 9 |
| Q2 | What comes next | 11, 12, 13, __, __ → 14, 15 |
| Q3 | Houses forward | "Ben at house 3. Walks 4 houses forward." → 7 |
| Q4 | Countdown | "Rocket: 10, 9, 8, 7, __, __" → 6, 5 |
| Q5 | True/False | "After 14 comes 15" True, "Before 10 comes 9" True, "19 comes after 20" False |

### WS2: Varied (Average)
| Q | Type | Details |
|---|------|---------|
| Q1 | Backward sequence | 18, 17, __, 15, __, 13 → 16, 14 |
| Q2 | Number line jumps | "Start at 8. Count forward 5 steps." → 13 |
| Q3 | Stairs up | "Emma on step 6. Climbs up 7 steps." → 13 |
| Q4 | Floors down | "Max at floor 15. Goes down 4 floors." → 11 |
| Q5 | Spot mistake | "Leo says: 11, 12, 14, 15. What's wrong?" → missed 13 |

### WS3: Challenge (Hard)
| Q | Type | Details |
|---|------|---------|
| Q1 | Backward caterpillar | 20, 19, __, 17, __, 15 → 18, 16 |
| Q2 | Number before/after | "Before 17: __ After 17: __" → 16, 18 |
| Q3 | Complex story | "Start at 5. Count forward 8. Then back 3." → 10 |
| Q4 | Who reaches first | "Sam starts at 10 counting forward. Lily starts at 20 counting backward. Who says 15 first?" → Same |
| Q5 | Explain | "Is 12 between 10 and 15? Yes/No and why" → Yes |

## TEMPLATES

### Q1 - Caterpillar Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Help the caterpillar! Fill in the missing numbers.</p>
  <div class="caterpillar-container">
    <div class="caterpillar">
      <div class="caterpillar-head">😊</div>
      <div class="caterpillar-segment">5</div>
      <div class="caterpillar-segment">6</div>
      <div class="caterpillar-segment empty"><span class="answer-box-small"></span></div>
      <div class="caterpillar-segment">8</div>
      <div class="caterpillar-segment empty"><span class="answer-box-small"></span></div>
      <div class="caterpillar-segment">10</div>
    </div>
  </div>
</div>
```

### Q2 - Number Line Template:
```html
<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Start at 8. Count forward 5 steps. Where do you land?</p>
  <div class="number-line-box">
    <div class="number-marker">6</div>
    <div class="number-marker">7</div>
    <div class="number-marker start">8</div>
    <div class="number-marker">9</div>
    <div class="number-marker">10</div>
    <div class="number-marker">11</div>
    <div class="number-marker">12</div>
    <div class="number-marker">13</div>
    <div class="number-marker">14</div>
  </div>
  <p class="sub-question">You land on <span class="answer-box-small"></span></p>
</div>
```

### Q3 - Houses Template:
```html
<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Read and solve.</p>
  <div class="word-problem-box">
    <span class="character-icon">👦</span>
    <span class="story-text"><strong>Ben</strong> is at house 3. He walks forward 4 houses. What house is Ben at now?</span>
  </div>
  <p class="sub-question">Ben is at house <span class="answer-box-small"></span></p>
</div>
```

### Q5 - True/False Template:
```html
<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>True or False?</p>
  <div class="reasoning-box">
    <p class="sub-question">a) After 14 comes 15 <span class="answer-box-word"></span></p>
    <p class="sub-question">b) Before 10 comes 9 <span class="answer-box-word"></span></p>
    <p class="sub-question">c) 19 comes after 20 <span class="answer-box-word"></span></p>
  </div>
</div>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 7, 9</p>
  <p><strong>2.</strong> 14, 15</p>
  <p><strong>3.</strong> 7</p>
  <p><strong>4.</strong> 6, 5</p>
  <p><strong>5.</strong> True, True, False</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] All numbers within 0-20 range?
- [ ] NO answer clues in visuals?
- [ ] Answer key comma-separated (no explanations)?
