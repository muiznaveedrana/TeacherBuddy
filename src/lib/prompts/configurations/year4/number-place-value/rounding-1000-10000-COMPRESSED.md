# Y4: Rounding to 1000 and 10,000 ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Round 4-digit numbers to nearest 10, 100, 1000.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Rounding to nearest 10**: Look at ones digit
- **Rounding to nearest 100**: Look at tens digit
- **Rounding to nearest 1000**: Look at hundreds digit
- **Number range**: 1000-9999
- **Rule**: 0-4 rounds DOWN, 5-9 rounds UP
- **Application**: Estimation, real-world approximations

## QUESTION TYPES

**Q1**: Round to nearest 10. Show on number line between multiples of 10.

**Q2**: Round to nearest 100. Identify the two nearest hundreds.

**Q3**: Round to nearest 1000. Show understanding of thousand boundaries.

**Q4**: Mixed rounding practice. Round same number to 10, 100, and 1000.

**Q5**: Word problem. "A stadium has 4567 seats. About how many to the nearest thousand?"

## ROUNDING RULES (Year 4)

### Rounding to nearest 10
**Look at ONES digit**:
- 0, 1, 2, 3, 4 → Round DOWN
- 5, 6, 7, 8, 9 → Round UP
- Example: 5678 → 5680 (8 ones rounds up)

### Rounding to nearest 100
**Look at TENS digit**:
- 0, 1, 2, 3, 4 tens → Round DOWN
- 5, 6, 7, 8, 9 tens → Round UP
- Example: 5678 → 5700 (7 tens rounds up)

### Rounding to nearest 1000
**Look at HUNDREDS digit**:
- 0, 1, 2, 3, 4 hundreds → Round DOWN
- 5, 6, 7, 8, 9 hundreds → Round UP
- Example: 5678 → 6000 (6 hundreds rounds up)

## COLOR SCHEME (Year 4 Enhanced)
- **Decision digit**: #E91E63 (pink) - highlighted
- **Round down**: #FF5722 (red-orange)
- **Round up**: #4CAF50 (green)
- **Nearest 10**: #03A9F4 (light blue)
- **Nearest 100**: #FF9800 (orange)
- **Nearest 1000**: #9C27B0 (purple)
- **Midpoint**: #FFC107 (amber) - decision line

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.rounding-line-container{margin:25px 0;padding:25px;background:#FFF9C4;border-radius:8px}
.number-line-rounding{position:relative;height:150px;margin:40px 25px;background:#FFF;border-radius:8px;padding:35px 20px}
.rounding-track{position:absolute;top:75px;left:10%;right:10%;height:8px;background:linear-gradient(to right,#FF5722 0%,#FF5722 48%,#FFC107 48%,#FFC107 52%,#4CAF50 52%,#4CAF50 100%);border-radius:4px}
.boundary-mark{position:absolute;top:55px;width:6px;height:50px;background:#333;border-radius:3px}
.boundary-mark.start{left:10%}
.boundary-mark.end{right:10%}
.boundary-label{position:absolute;top:115px;font-size:20pt;font-weight:bold;color:#333;transform:translateX(-50%)}
.boundary-label.start{left:10%}
.boundary-label.end{right:10%}
.midpoint-mark{position:absolute;top:60px;left:50%;transform:translateX(-50%);width:5px;height:40px;background:#FFC107;border-radius:2px}
.midpoint-label{position:absolute;top:110px;left:50%;transform:translateX(-50%);font-size:17pt;font-weight:bold;color:#F57C00;white-space:nowrap}
.number-to-round-marker{position:absolute;top:20px;transform:translateX(-50%);padding:12px 22px;background:#2196F3;color:#FFF;font-size:26pt;font-weight:bold;border-radius:8px;border:3px solid #1565C0;box-shadow:0 4px 8px rgba(0,0,0,0.2)}
.rounding-arrow{position:absolute;top:52px;font-size:36pt;font-weight:bold;transform:translateX(-50%)}
.arrow-up{color:#4CAF50}
.arrow-down{color:#FF5722}
.rounding-practice-container{margin:20px 0;padding:20px;background:#E3F2FD;border-radius:8px}
.rounding-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin:25px 0}
.rounding-item{padding:20px;background:#FFF;border:3px solid #2196F3;border-radius:8px}
.number-display-large{font-size:40pt;font-weight:bold;color:#2196F3;text-align:center;margin:18px 0}
.digit-breakdown-rounding{display:flex;justify-content:center;gap:10px;margin:25px 0}
.digit-card-round{padding:22px 28px;border:4px solid #ddd;border-radius:8px;background:#FFF;font-size:52pt;font-weight:bold;text-align:center}
.digit-card-round.decision{border-color:#E91E63;background:#FCE4EC;color:#E91E63;box-shadow:0 0 20px rgba(233,30,99,0.4);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(233,30,99,0.4)}50%{box-shadow:0 0 30px rgba(233,30,99,0.7)}}
.rounding-rule-box{margin:25px 0;padding:20px;background:#FFE0F0;border:3px solid #E91E63;border-radius:8px}
.rule-text-large{font-size:20pt;font-weight:bold;text-align:center;color:#C2185B;line-height:1.7}
.rule-highlight{background:#E91E63;color:#FFF;padding:5px 15px;border-radius:6px;margin:0 6px}
.decision-visual{display:flex;justify-content:space-around;margin:25px 0;flex-wrap:wrap}
.decision-option{text-align:center;padding:20px;background:#FFF;border:4px solid;border-radius:8px;margin:15px;min-width:200px}
.decision-option.down{border-color:#FF5722;box-shadow:0 4px 8px rgba(255,87,34,0.3)}
.decision-option.up{border-color:#4CAF50;box-shadow:0 4px 8px rgba(76,175,80,0.3)}
.option-label{font-size:18pt;font-weight:bold;margin-bottom:15px}
.option-label.down{color:#FF5722}
.option-label.up{color:#4CAF50}
.option-value{font-size:48pt;font-weight:bold}
.option-value.down{color:#FF5722}
.option-value.up{color:#4CAF50}
.mixed-rounding-container{margin:20px 0;padding:20px;background:#F1F8E9;border-radius:8px}
.mixed-rounding-table{width:100%;max-width:700px;margin:25px auto;border-collapse:separate;border-spacing:0;border:3px solid #4CAF50;border-radius:8px;overflow:hidden}
.mixed-table-header{background:#4CAF50;color:#FFF;font-size:18pt;font-weight:bold;padding:15px;text-align:center;border:2px solid #FFF}
.mixed-table-row{display:table-row}
.mixed-table-cell{display:table-cell;padding:18px 25px;text-align:center;font-size:22pt;font-weight:bold;border:2px solid #4CAF50}
.mixed-table-cell.original{background:#E8F5E9;color:#2E7D32}
.mixed-table-cell.answer{background:#FFF;min-width:150px}
.estimation-container{margin:20px 0;padding:20px;background:#FCE4EC;border-radius:8px}
.real-world-scenario{padding:20px;background:#FFF;border:3px dashed #E91E63;border-radius:8px;margin:18px 0}
.scenario-text{font-size:18pt;line-height:1.8;margin:15px 0}
.exact-value-display{display:inline-block;padding:10px 22px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px;font-weight:bold;color:#2196F3;margin:0 6px;font-size:22pt}
.rounded-value-display{display:inline-block;padding:10px 22px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px;font-weight:bold;color:#FF9800;margin:0 6px;font-size:22pt}
.step-by-step-rounding{margin:25px 0;padding:18px;background:#F5F5F5;border-radius:8px}
.step-item-round{margin:15px 0;padding:15px;background:#FFF;border-left:6px solid #FF9800;border-radius:4px}
.step-number-badge{display:inline-block;background:#FF9800;color:#FFF;width:35px;height:35px;line-height:35px;text-align:center;border-radius:50%;margin-right:15px;font-size:17pt;font-weight:bold}
.step-text{font-size:18pt;display:inline}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:55px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:55px;text-align:center}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:140px;margin:0 10px;background:transparent}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:90px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Example 1: Round 5678 to nearest 10
**Identify boundaries**: 5670 and 5680
**Decision digit**: 8 ones
**Rule**: 8 is ≥ 5 → Round UP
**Answer**: 5680

### Example 2: Round 5678 to nearest 100
**Identify boundaries**: 5600 and 5700
**Decision digit**: 7 tens
**Rule**: 7 is ≥ 5 → Round UP
**Answer**: 5700

### Example 3: Round 5678 to nearest 1000
**Identify boundaries**: 5000 and 6000
**Decision digit**: 6 hundreds
**Rule**: 6 is ≥ 5 → Round UP
**Answer**: 6000

### Example 4: Round 3425 (all three ways)
- **To nearest 10**: 3425 → 3430 (5 ones rounds up)
- **To nearest 100**: 3425 → 3400 (2 tens rounds down)
- **To nearest 1000**: 3425 → 3000 (4 hundreds rounds down)

### Example 5: Stadium Seats
**Problem**: A stadium has 4567 seats. About how many to the nearest thousand?
**Solution**:
- Boundaries: 4000 and 5000
- Decision digit: 5 hundreds
- 5 is the midpoint → rounds UP
- **Answer**: 5000 seats (to nearest thousand)

## KEY UNDERSTANDING

### Which digit to look at?
- **Rounding to 10**: Look at ONES (last digit)
- **Rounding to 100**: Look at TENS (second-last digit)
- **Rounding to 1000**: Look at HUNDREDS (third-last digit)

### Midpoint Rule
- **0, 1, 2, 3, 4**: Always round DOWN
- **5, 6, 7, 8, 9**: Always round UP
- **5 is the cutoff**: Rounds UP (convention)

## RULES

1. All numbers 1000-9999 (four-digit range)
2. Round to nearest 10, 100, AND 1000
3. Show decision digit clearly highlighted
4. Use number lines with boundaries marked
5. Include step-by-step working
6. Real-world estimation contexts
7. Answer key with full explanations
8. Colored backgrounds Q1-Q5
9. Year 4 appropriate (ages 8-9)
10. Color-code by rounding type (10=blue, 100=orange, 1000=purple)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Round to nearest 10 with number line?
- [ ] Q2: Round to nearest 100 with boundaries shown?
- [ ] Q3: Round to nearest 1000 with understanding?
- [ ] Q4: Mixed rounding (same number all three ways)?
- [ ] Q5: Real-world word problem with estimation?
- [ ] All numbers 1000-9999 range?
- [ ] Decision digits highlighted?
- [ ] Number lines show midpoints?
- [ ] Step-by-step working shown?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full working?
- [ ] Year 4 appropriate complexity?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
