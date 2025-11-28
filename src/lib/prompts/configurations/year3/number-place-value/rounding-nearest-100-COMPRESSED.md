# Ages 7-8: Rounding to Nearest 100

**CRITICAL: EXACTLY {{questionCount}} questions. Round 0-1000 to nearest 100.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Rounding rule**: Look at tens digit (T)
- **Tens 0-4**: Round DOWN to lower 100
- **Tens 5-9**: Round UP to higher 100
- **Examples**:
  - 234 → 200 (3 tens → down)
  - 267 → 300 (6 tens → up)
  - 450 → 500 (5 tens → up)
  - 350 → 400 (5 tens → up - exactly halfway rounds UP)

## QUESTION TYPES

**Q1**: Number line visual. Show number between two hundreds, mark rounded value.

**Q2**: Round 4-5 numbers to nearest 100. Show working.

**Q3**: Tens digit rule practice. Identify and apply the rule.

**Q4**: Real-world estimation. "A book has 347 pages. About how many pages?"

**Q5**: Challenge problem. Multiple step or reasoning question.

## ROUNDING PROCESS (3 Steps)

**Step 1**: Identify the two nearest hundreds (before and after)
- Example: 267 is between 200 and 300

**Step 2**: Look at the tens digit
- 267 has 6 tens → 6 is between 5-9 → round UP

**Step 3**: Write the rounded answer
- 267 → 300

## COLOR SCHEME (Year 3 Enhanced)
- **Hundreds values**: #FF9800 (orange) - target values
- **Number to round**: #2196F3 (blue)
- **Tens digit**: #E91E63 (pink) - decision digit
- **Round up arrow**: #4CAF50 (green)
- **Round down arrow**: #FF5722 (red-orange)
- **Midpoint (50)**: #9C27B0 (purple) - decision line

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.rounding-line-container{margin:20px 0;padding:20px;background:#FFF9C4;border-radius:8px}
.number-line-rounding{position:relative;height:140px;margin:40px 20px;background:#FFF;border-radius:8px;padding:30px 15px}
.rounding-track{position:absolute;top:70px;left:10%;right:10%;height:8px;background:linear-gradient(to right,#FF5722 0%,#FF5722 49%,#9C27B0 49%,#9C27B0 51%,#4CAF50 51%,#4CAF50 100%);border-radius:4px}
.hundred-mark{position:absolute;top:50px;width:6px;height:50px;background:#FF9800;border-radius:3px}
.hundred-mark.start{left:10%}
.hundred-mark.end{right:10%}
.hundred-label{position:absolute;top:110px;font-size:18pt;font-weight:bold;color:#FF9800;transform:translateX(-50%)}
.hundred-label.start{left:10%}
.hundred-label.end{right:10%}
.midpoint-mark{position:absolute;top:55px;left:50%;transform:translateX(-50%);width:4px;height:40px;background:#9C27B0;border-radius:2px}
.midpoint-label{position:absolute;top:105px;left:50%;transform:translateX(-50%);font-size:15pt;font-weight:bold;color:#9C27B0;white-space:nowrap}
.number-to-round{position:absolute;top:15px;transform:translateX(-50%);padding:12px 20px;background:#2196F3;color:#FFF;font-size:24pt;font-weight:bold;border-radius:8px;border:3px solid #1565C0;box-shadow:0 4px 6px rgba(0,0,0,0.2)}
.rounding-arrow{position:absolute;top:48px;font-size:32pt;font-weight:bold;transform:translateX(-50%)}
.arrow-up{color:#4CAF50}
.arrow-down{color:#FF5722}
.rounding-practice-container{margin:18px 0;padding:18px;background:#E3F2FD;border-radius:8px}
.rounding-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin:20px 0}
.rounding-item{padding:18px;background:#FFF;border:3px solid #2196F3;border-radius:8px}
.number-display{font-size:36pt;font-weight:bold;color:#2196F3;text-align:center;margin:15px 0}
.tens-digit-container{margin:18px 0;padding:18px;background:#F1F8E9;border-radius:8px}
.digit-breakdown{display:flex;justify-content:center;gap:8px;margin:25px 0}
.digit-card{padding:20px 25px;border:4px solid #ddd;border-radius:8px;background:#FFF;font-size:48pt;font-weight:bold;text-align:center}
.digit-card.hundreds{border-color:#FF9800;color:#FF9800}
.digit-card.tens{border-color:#E91E63;background:#FCE4EC;color:#E91E63;box-shadow:0 0 15px rgba(233,30,99,0.3)}
.digit-card.ones{border-color:#4CAF50;color:#4CAF50}
.digit-label{text-align:center;margin-top:10px;font-size:14pt;font-weight:bold}
.digit-label.h{color:#FF9800}
.digit-label.t{color:#E91E63}
.digit-label.o{color:#4CAF50}
.rounding-rule-box{margin:20px 0;padding:18px;background:#FFE0F0;border:3px solid #E91E63;border-radius:8px}
.rule-text{font-size:18pt;font-weight:bold;text-align:center;color:#C2185B;line-height:1.6}
.rule-highlight{background:#E91E63;color:#FFF;padding:4px 12px;border-radius:6px;margin:0 5px}
.decision-visual{display:flex;justify-content:space-around;margin:25px 0;flex-wrap:wrap}
.decision-option{text-align:center;padding:18px;background:#FFF;border:3px solid;border-radius:8px;margin:10px;min-width:180px}
.decision-option.down{border-color:#FF5722}
.decision-option.up{border-color:#4CAF50}
.option-label{font-size:16pt;font-weight:bold;margin-bottom:12px}
.option-label.down{color:#FF5722}
.option-label.up{color:#4CAF50}
.option-value{font-size:40pt;font-weight:bold}
.option-value.down{color:#FF5722}
.option-value.up{color:#4CAF50}
.arrow-symbol{font-size:48pt;margin:10px 0}
.estimation-container{margin:18px 0;padding:18px;background:#FCE4EC;border-radius:8px}
.real-world-scenario{padding:18px;background:#FFF;border:2px dashed #E91E63;border-radius:8px;margin:15px 0}
.scenario-text{font-size:17pt;line-height:1.7;margin:12px 0}
.exact-value{display:inline-block;padding:8px 18px;background:#E3F2FD;border:2px solid #2196F3;border-radius:6px;font-weight:bold;color:#2196F3;margin:0 5px}
.rounded-value{display:inline-block;padding:8px 18px;background:#FFF3E0;border:2px solid #FF9800;border-radius:6px;font-weight:bold;color:#FF9800;margin:0 5px}
.challenge-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.step-by-step{margin:20px 0;padding:15px;background:#F5F5F5;border-radius:8px}
.step-item{margin:12px 0;padding:12px;background:#FFF;border-left:5px solid #FF9800;border-radius:4px}
.step-number{display:inline-block;background:#FF9800;color:#FFF;width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;margin-right:12px;font-size:15pt;font-weight:bold}
.step-text{font-size:17pt;display:inline}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.rounding-examples{margin:20px 0;padding:18px;background:#E8F5E9;border-radius:8px;border:2px solid #4CAF50}
.example-row{display:flex;justify-content:center;align-items:center;gap:15px;margin:15px 0;flex-wrap:wrap}
.example-number{padding:12px 20px;background:#E3F2FD;border:2px solid #2196F3;border-radius:6px;font-size:24pt;font-weight:bold;color:#2196F3}
.arrow-right{font-size:32pt;color:#666}
.example-result{padding:12px 20px;background:#FFF3E0;border:2px solid #FF9800;border-radius:6px;font-size:24pt;font-weight:bold;color:#FF9800}
.answer-box{display:inline-block;min-width:100px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:150px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:80px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## ROUNDING RULE EXPLAINED

**The Tens Digit Rule**:
1. Look at the **tens digit** (middle digit in 3-digit numbers)
2. If tens digit is **0, 1, 2, 3, or 4** → Round DOWN
3. If tens digit is **5, 6, 7, 8, or 9** → Round UP

**Visual Rule**:
```
0-4 tens → ↓ Round DOWN
5-9 tens → ↑ Round UP
```

## WORKED EXAMPLES

**Example 1: 234 → ?**
- Identify hundreds: between 200 and 300
- Look at tens: **3** tens
- 3 is between 0-4 → Round DOWN
- **Answer: 200**

**Example 2: 267 → ?**
- Identify hundreds: between 200 and 300
- Look at tens: **6** tens
- 6 is between 5-9 → Round UP
- **Answer: 300**

**Example 3: 450 → ?**
- Identify hundreds: between 400 and 500
- Look at tens: **5** tens
- 5 is exactly halfway → Round UP (rule: 5 rounds up!)
- **Answer: 500**

**Example 4: 678 → ?**
- Identify hundreds: between 600 and 700
- Look at tens: **7** tens
- 7 is between 5-9 → Round UP
- **Answer: 700**

**Example 5: 320 → ?**
- Identify hundreds: between 300 and 400
- Look at tens: **2** tens
- 2 is between 0-4 → Round DOWN
- **Answer: 300**

## NUMBER LINE VISUALIZATION

```
200--------[234]--------250--------[267]--------300
    ↓ DOWN              ↑ UP
   (3 tens)           (6 tens)
```

**Midpoint (50)** is the decision line:
- Numbers with 0-4 tens are BEFORE midpoint → Round DOWN
- Numbers with 5-9 tens are AT/AFTER midpoint → Round UP

## REAL-WORLD CONTEXTS

- **Pages in a book**: "The book has 347 pages. About 300 pages."
- **People at a concert**: "There were 623 people. About 600 people."
- **Money raised**: "We raised £456. About £500."
- **Distance traveled**: "We drove 278 miles. About 300 miles."
- **Students in school**: "There are 842 students. About 800 students."

## RULES

1. All numbers 0-1000 range
2. Round to nearest 100 only
3. Show tens digit clearly highlighted
4. Use number line visuals for Q1
5. Include step-by-step working
6. Real-world estimation contexts
7. Answer key with full explanations
8. Colored backgrounds Q1-Q5
9. Year 3 appropriate (ages 7-8)
10. Midpoint (50) always rounds UP

## COMMON MISTAKES TO AVOID

❌ **Wrong**: Looking at ones digit instead of tens
❌ **Wrong**: Rounding 450 to 400 (should be 500)
❌ **Wrong**: Forgetting that 5 rounds UP
✅ **Right**: Always check tens digit (middle number)
✅ **Right**: 5 is the cutoff point and rounds UP
✅ **Right**: Show your working step-by-step

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Number line visual with position and arrow?
- [ ] Q2: 4-5 numbers to round with working space?
- [ ] Q3: Tens digit rule practice with highlighting?
- [ ] Q4: Real-world estimation context?
- [ ] Q5: Challenge/reasoning problem?
- [ ] All numbers 0-1000 range?
- [ ] Tens digit clearly highlighted/identified?
- [ ] Number lines show midpoint (50)?
- [ ] Rounding rule explained clearly?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with step-by-step working?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
