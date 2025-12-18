# Ages 6-7: Simple Equivalent Fractions (MIXED LAYOUT)

**CRITICAL: EXACTLY {{questionCount}} questions (5). Simple equivalence: 1/2 = 2/4 only.**

## MANDATORY THEME SELECTION

**IF difficulty = "easy":**
- Title: "Equivalent Fractions: Same Amount!"
- Theme: Visual circle comparison
- Focus: Basic 1/2 = 2/4 recognition

**IF difficulty = "average":**
- Title: "Equivalent Fractions: Match Them!"
- Theme: Multiple shape types
- Focus: 1/2 = 2/4 with different shapes

**IF difficulty = "hard":**
- Title: "Equivalent Fractions: Prove It!"
- Theme: Real-world applications
- Focus: 1/2 = 2/4 in word problems

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
.fraction-visual{margin:12px 0;padding:15px;background:#FAFAFA;border:2px solid #ddd;border-radius:8px;text-align:center}
.fraction-pair{display:flex;justify-content:center;gap:30px;align-items:center;flex-wrap:wrap}
.fraction-item{text-align:center;padding:10px}
.fraction-label{font-size:16pt;font-weight:bold;color:#1976D2;margin-top:8px}
.equals-sign{font-size:28pt;font-weight:bold;color:#FF5722}
.fraction-circle{width:80px;height:80px;border-radius:50%;border:2px solid #333;position:relative;overflow:hidden;margin:0 auto}
.half-shaded{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%);background:#4CAF50}
.quarter-shaded{position:absolute;width:100%;height:100%}
.q1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%);background:#2196F3}
.q2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%);background:#2196F3}
.division-lines{position:absolute;width:100%;height:100%;top:0;left:0}
.division-lines::before,.division-lines::after{content:'';position:absolute;background:#333}
.division-lines::before{width:2px;height:100%;left:50%;transform:translateX(-50%)}
.division-lines::after{width:100%;height:2px;top:50%;transform:translateY(-50%)}
.fraction-bar{display:flex;border:2px solid #333;border-radius:4px;overflow:hidden;margin:10px auto;max-width:160px}
.bar-section{flex:1;height:40px;border-right:1px solid #333;display:flex;align-items:center;justify-content:center}
.bar-section:last-child{border-right:none}
.shaded{background:#4CAF50}
.unshaded{background:#fff}
.reasoning-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:8px;padding:12px;margin:12px 0}
.character-speech{display:flex;gap:12px;align-items:flex-start}
.character-icon{width:45px;height:45px;background:#FFE082;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #FFA726;border-radius:10px;padding:10px;flex:1}
.answer-box-small{display:inline-block;min-width:50px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:90px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## SECTION STRUCTURE (MIXED LAYOUT)

### Section A: Fluency (Q1-Q2) - Basic equivalence recognition
- Q1: Look at shapes - are they the same amount? (2 answers: Yes/No + fraction)
- Q2: Complete the equation 1/2 = __/4

### Section B: Application (Q3-Q4) - Apply equivalence
- Q3: Match fractions (3 answers)
- Q4: Word problem with pizza/chocolate

### Section C: Reasoning (Q5) - Explain equivalence
- Q5: True/False reasoning + misconception

## THREE WORKSHEET VARIATIONS

### Worksheet 1 (Easy - Same Amount!)
**Focus**: Simple visual comparison of circles

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Two circles: 1/2 shaded vs 2/4 shaded. Same amount? | Yes, 2/4 |
| Q2 | Complete: 1/2 = __/4 (with visual) | 2 |
| Q3 | Match: 1/2 to 1/4, 2/4, or 3/4 | a) No b) Yes c) No |
| Q4 | Pizza has 4 slices, eat 1/2. How many slices? | 2 |
| Q5 | "2/4 is bigger than 1/2" - correct? | same, No |

**Answer Key**: Yes, 2/4, 2, a) No b) Yes c) No, 2, same, No

### Worksheet 2 (Average - Match Them!)
**Focus**: Different shape representations

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Rectangle vs circle both showing 1/2. Same? | Yes, 1/2 |
| Q2 | Complete: 1/2 = __/4 (rectangle) | 2 |
| Q3 | Which shapes show 1/2? (circle, bar, rectangle) | a) Yes b) Yes c) Yes |
| Q4 | Chocolate bar has 4 pieces, eat half. How many? | 2 |
| Q5 | "1/2 of a circle is different from 1/2 of a square" | same, No |

**Answer Key**: Yes, 1/2, 2, a) Yes b) Yes c) Yes, 2, same, No

### Worksheet 3 (Hard - Prove It!)
**Focus**: Multiple representations and proof

| Q | Content | Answers |
|---|---------|---------|
| Q1 | Bar showing 2/4 vs circle showing 1/2. Equal? | Yes, equal |
| Q2 | 1/2 = 2/4. How many quarters in half? | 2 |
| Q3 | True/False for each: 1/2=2/4? 1/4=2/4? 2/4=1/2? | a) True b) False c) True |
| Q4 | Ribbon cut into 4 parts, use half. How many parts? | 2 |
| Q5 | "You can't compare halves and quarters" | can, No |

**Answer Key**: Yes, equal, 2, a) True b) False c) True, 2, can, No

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> Yes, 2/4</p>
  <p><strong>2.</strong> 2</p>
  <p><strong>3.</strong> a) No b) Yes c) No</p>
  <p><strong>4.</strong> 2</p>
  <p><strong>5.</strong> same, No</p>
</div>
```

## VALIDATION CHECKLIST

- [ ] EXACTLY 5 questions?
- [ ] Section A (Fluency): Q1-Q2?
- [ ] Section B (Application): Q3-Q4?
- [ ] Section C (Reasoning): Q5?
- [ ] Q1: 2 answers (Yes/No + fraction)?
- [ ] Q2: 1 answer (number)?
- [ ] Q3: 3 answers with a) b) c)?
- [ ] Q4: 1 answer (number)?
- [ ] Q5: 2 answers (word + Yes/No)?
- [ ] Only 1/2 = 2/4 equivalence?
- [ ] Total inputs: 2+1+3+1+2 = 9 answers?

Generate complete HTML. UK Year 2 aligned.
