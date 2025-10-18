# Reception: Number Recognition - COMPRESSED

**CRITICAL: Generate EXACTLY {{questionCount}} questions using PROVEN FORMAT.**

## PROVEN 5-QUESTION STRUCTURE (EXACT FORMAT REQUIRED)

**Q1: Giant Number** (Yellow #FFF9C4)
- Show `.number-display-large` with `.giant-number` (72pt)
- "What number is this? Write the number: ___"

**Q2: Multiple Choice** (Blue #E3F2FD)
- Show `.number-display-medium` with target number
- 3 options (A/B/C) in `.multiple-choice-grid`
- Option B = CORRECT quantity

**Q3: Ten Frame** (Green #F1F8E9)
- `.ten-frame` with 2 rows, 5 cells each
- Filled cells = ★, Empty = blank
- "How many stars? The number is: ___"

**Q4: Context** (Pink #FCE4EC)
- "[Name] has some [objects]. How many?"
- Objects in `.context-scene`
- "[Name] has ___ [objects]. Write: ___"

**Q5: Matching** (Orange #FFF3E0)
- `.matching-container`: 2 numbers left, 4 picture groups right
- "Draw line from number to picture"
- 2 correct matches, 2 distractors

## ULTRA-COMPACT CSS (36PT GIANT NUMBER, HORIZONTAL GRID, AGGRESSIVE SPACING)

```css
body { font-family: 'Sassoon Primary', 'Century Gothic', 'Comic Sans MS', sans-serif; font-size: 16pt; line-height: 1.6; margin: 0; padding: 20px; }
.worksheet-header { text-align: center; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 2px solid #000; }
.worksheet-title { font-size: 14pt; font-weight: bold; margin: 0; }
.student-info { display: flex; justify-content: space-between; margin: 6px 0 10px 0; font-size: 10pt; font-weight: bold; }
.question { margin: 10px 0; padding: 12px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
.question-number { font-size: 18pt; font-weight: bold; color: #2c3e50; margin-right: 8px; }
.question-text { font-size: 16pt; line-height: 1.4; margin: 6px 0; font-weight: 600; }

/* Q1 - Ultra Compact Giant Number (36pt) */
.number-display-large {
    margin: 10px auto; padding: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 3px solid #5a67d8; border-radius: 12px;
    max-width: 100px; text-align: center;
    box-shadow: 0 3px 8px rgba(0,0,0,0.18);
}
.giant-number { font-size: 36pt; font-weight: bold; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }

/* Q2 - Compact + Horizontal 3-Column Grid */
.number-display-medium {
    margin: 10px auto; padding: 15px;
    background: #FFA500; border: 3px solid #FF8C00; border-radius: 10px;
    max-width: 90px; text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.large-number { font-size: 32pt; font-weight: bold; color: white; }
.multiple-choice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px auto; max-width: 600px; }
.choice-option { padding: 10px; background: white; border: 2px solid #ddd; border-radius: 8px; }
.option-label { font-size: 16pt; font-weight: bold; color: #2c3e50; display: block; margin-bottom: 4px; }
.objects-row { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; }
.objects-row img { width: 38px; height: 38px; }

/* Q3 - Compact Ten Frame */
.ten-frame { display: table; margin: 10px auto; border: 2px solid #333; border-collapse: collapse; box-shadow: 0 2px 5px rgba(0,0,0,0.12); }
.frame-row { display: table-row; }
.frame-cell { display: table-cell; width: 38px; height: 38px; border: 2px solid #333; text-align: center; vertical-align: middle; font-size: 24pt; }
.frame-cell.filled { background: #FFD700; }
.frame-cell.empty { background: #FFFFFF; }

/* Q4 - Compact Context Scene */
.context-scene { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 10px auto; padding: 12px; background: #f8f9ff; border-radius: 8px; max-width: 420px; }
.context-scene img { width: 42px; height: 42px; }

/* Q5 - Compact Matching */
.matching-container { display: flex; justify-content: space-around; align-items: center; margin: 10px auto; max-width: 500px; gap: 20px; }
.match-left { display: flex; flex-direction: column; gap: 15px; }
.match-right { display: flex; flex-direction: column; gap: 10px; }
.number-box { width: 50px; height: 50px; background: #FF6347; color: white; border: 3px solid #DC143C; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24pt; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.18); }
.picture-option { display: flex; gap: 5px; padding: 6px; background: white; border: 2px solid #ddd; border-radius: 6px; justify-content: center; flex-wrap: wrap; }
.picture-option img { width: 32px; height: 32px; }

.answer-prompt { font-size: 15pt; margin: 8px 0; font-weight: 600; }
.answer-line { display: inline-block; min-width: 60px; border-bottom: 2px solid #333; margin: 0 6px; }
.answer-key { margin-top: 30px; padding: 15px; background: #f0f8ff; border: 2px solid #4169E1; border-radius: 10px; page-break-before: always; }
.answer-key-title { font-size: 14pt; font-weight: bold; color: #2c3e50; margin: 0 0 10px 0; text-align: center; }
.answer-key-content p { font-size: 12pt; margin: 6px 0; line-height: 1.5; }
```

## RULES
- Numbers 1-10 ONLY
- EXACTLY {{questionCount}} questions
- Different objects per question
- Answer key MANDATORY
- All images: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

## VALIDATION
1. Q1 = Giant number format? ✓
2. Q2 = 3 options (A/B/C)? ✓
3. Q3 = Ten frame? ✓
4. Q4 = Context with name? ✓
5. Q5 = Matching (2 nums, 4 pics)? ✓
6. Answer key present? ✓
7. Exactly {{questionCount}} questions? ✓
