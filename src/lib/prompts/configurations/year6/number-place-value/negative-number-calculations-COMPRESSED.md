# Y6: Negative Number Calculations ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Calculate intervals across zero and perform operations with negative numbers.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 6 FOCUS (Ages 10-11, SATs Level)
- **Range**: -1000 to +1000
- **Operations**: Addition, subtraction crossing zero
- **Intervals**: Calculate differences including negative numbers
- **Contexts**: Temperature, altitude, time zones, money (overdraft)
- **SATs reasoning**: Explain methods and answers

## QUESTION TYPES

**Q1**: Addition crossing zero. "-45 + 78 = ?"

**Q2**: Subtraction crossing zero. "12 - 35 = ?"

**Q3**: Calculate intervals. "Temperature changes from -8°C to 15°C. What's the increase?"

**Q4**: Number line jumps. "Start at -23, add 56, then subtract 40. Where do you end?"

**Q5**: SATs word problem. "Account: -£450 (overdrawn). Deposit £1,200. Withdraw £300. Final balance?"

## CALCULATING WITH NEGATIVES (Year 6)

### Adding a positive (moving right on number line)

**Example: -45 + 78**

Method: Start at -45, move 78 steps right
- -45 to 0 = 45 steps
- 0 to +33 = 33 more steps
- Total moved: 45 + 33 = 78 ✓

**Answer**: +33

### Subtracting (moving left on number line)

**Example: 12 - 35**

Method: Start at 12, move 35 steps left
- 12 to 0 = 12 steps
- 0 to -23 = 23 more steps
- Total moved: 12 + 23 = 35 ✓

**Answer**: -23

### Adding a negative (same as subtracting positive)

**Example: 25 + (-18)**

Same as: 25 - 18 = 7

**Answer**: 7

### Subtracting a negative (same as adding positive)

**Example: 15 - (-8)**

Same as: 15 + 8 = 23

**Answer**: 23

## CALCULATING INTERVALS (SATs Focus)

### Temperature change

**From -8°C to +15°C**

Method 1: Count through zero
- -8 to 0 = 8°C
- 0 to +15 = 15°C
- Total increase = 8 + 15 = 23°C

Method 2: Subtraction (final - initial)
- 15 - (-8) = 15 + 8 = 23°C

**Answer**: 23°C increase

### Altitude difference

**Submarine at -450m, plane at +8,500m**

Method: Find distance between
- -450 to 0 = 450m
- 0 to +8,500 = 8,500m
- Total = 450 + 8,500 = 8,950m

**Answer**: 8,950m difference

## NUMBER LINE METHODS

### Multiple operations

**Start -23, add 56, subtract 40**

Step 1: -23 + 56 = +33
- Move 56 right from -23
- Land on +33

Step 2: +33 - 40 = -7
- Move 40 left from +33
- Land on -7

**Answer**: -7

### Visualization
```
-50  -40  -30  -20  -10   0   10   20   30   40   50
 |----|----|----|----|----|----|----|----|----|----|
           -23 ----+56---> +33
                           +33 <--40--- -7
```

## REAL-WORLD CONTEXTS (SATs)

### Bank accounts (overdraft)

**Start: -£450 (overdrawn)**
**Deposit: +£1,200**
**Withdraw: -£300**

Step 1: -450 + 1,200 = +750
Step 2: 750 - 300 = +450

**Final balance**: £450 (in credit)

### Time zones

**London 0, New York -5hrs, Tokyo +9hrs**

Question: "12:00 London. What time New York?"

12:00 + (-5) = 12:00 - 5 = 07:00

**Answer**: 07:00 in New York

### Sea level / altitude

**Dead Sea: -430m (below sea level)**
**Mount Everest: +8,849m**

Difference: 8,849 - (-430) = 8,849 + 430 = 9,279m

**Answer**: 9,279m difference

## RULES FOR NEGATIVES (Year 6)

### Addition rules
- Positive + Positive = Positive (5 + 3 = 8)
- Positive + Negative = Subtract (5 + (-3) = 2)
- Negative + Positive = Add, might be positive or negative (-5 + 8 = 3, -5 + 2 = -3)
- Negative + Negative = More negative (-5 + (-3) = -8)

### Subtraction rules
- Subtracting negative = Adding positive (5 - (-3) = 5 + 3 = 8)
- Subtracting positive from negative = More negative (-5 - 3 = -8)

## COLOR SCHEME (Year 6 Enhanced)

- **Negative numbers**: #2196F3 (blue - cold)
- **Positive numbers**: #FF5722 (red - warm)
- **Zero**: #9E9E9E (grey - neutral)
- **Intervals**: #4CAF50 (green)
- **Operations**: #FF9800 (orange)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:19pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:38px;height:38px;line-height:38px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:18pt}
.question-text{font-size:19pt;margin:8px 0;font-weight:600}
.calc-negative-container{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.calc-title{font-size:20pt;font-weight:bold;color:#1565C0;margin-bottom:18px;text-align:center}
.calculation-display{font-size:48pt;font-weight:bold;text-align:center;padding:20px;background:#FFF;border:4px solid #2196F3;border-radius:8px;margin:20px 0;font-family:'Courier New',monospace}
.number-negative{color:#2196F3}
.number-positive{color:#FF5722}
.number-zero{color:#9E9E9E}
.number-line-calc{position:relative;height:180px;margin:35px 20px;background:#FFF;border-radius:8px;padding:50px 20px}
.line-track-neg{position:absolute;bottom:70px;left:5%;right:5%;height:12px;background:linear-gradient(to right,#2196F3 0%,#2196F3 45%,#9E9E9E 48%,#9E9E9E 52%,#FF5722 55%,#FF5722 100%);border-radius:6px}
.line-marks-neg{display:flex;justify-content:space-between;position:absolute;bottom:70px;left:5%;right:5%}
.line-mark-neg{position:relative;width:4px;height:35px;background:#333}
.mark-zero-neg{height:50px;width:6px;background:#000}
.mark-label-neg{position:absolute;top:45px;left:50%;transform:translateX(-50%);font-size:18pt;font-weight:bold;white-space:nowrap}
.jump-arrow{position:absolute;bottom:90px;height:30px;border:3px solid #4CAF50;border-left:none;border-radius:0 8px 8px 0}
.jump-label{position:absolute;bottom:125px;font-size:18pt;font-weight:bold;color:#2E7D32;background:#E8F5E9;padding:6px 12px;border-radius:6px}
.interval-container{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.interval-title{font-size:20pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.interval-calc{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.interval-step{padding:18px 25px;background:#FFF;border:3px solid #4CAF50;border-radius:8px}
.step-label-int{font-size:18pt;font-weight:bold;color:#2E7D32;margin-bottom:10px}
.step-calc-int{font-size:28pt;font-family:'Courier New',monospace;text-align:center;padding:15px;background:#C8E6C9;border:3px solid #4CAF50;border-radius:6px;margin:12px 0}
.interval-result{font-size:44pt;font-weight:bold;text-align:center;padding:25px;background:#4CAF50;color:#FFF;border-radius:8px;margin-top:20px}
.context-problem{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.context-title{font-size:20pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.context-text{font-size:19pt;line-height:1.9;color:#F57C00;background:#FFF;padding:20px;border:3px dashed #FF9800;border-radius:8px;margin:20px 0}
.context-working{display:flex;flex-direction:column;gap:12px;margin:20px 0}
.context-step{padding:15px 22px;background:#FFF;border:3px solid #FF9800;border-radius:8px;font-size:22pt;font-family:'Courier New',monospace;text-align:center}
.rules-box{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.rules-title{font-size:20pt;font-weight:bold;color:#7B1FA2;margin-bottom:18px;text-align:center}
.rule-item{padding:15px 20px;background:#FFF;border:3px solid #9C27B0;border-radius:8px;margin:12px 0}
.rule-statement{font-size:19pt;font-weight:600;color:#7B1FA2;margin-bottom:8px}
.rule-example{font-size:22pt;font-family:'Courier New',monospace;color:#4A148C;text-align:center}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:19pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:65px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:28pt;line-height:65px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:120px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:16pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:24pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:17pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Addition: -45 + 78
- -45 to 0 = 45 steps
- 0 to +33 = 33 steps
- Total = 45 + 33 = 78 ✓
**Answer**: +33

### Subtraction: 12 - 35
- 12 to 0 = 12 steps left
- 0 to -23 = 23 more steps left
- Total = 35 ✓
**Answer**: -23

### Interval: -8°C to +15°C
- -8 to 0 = 8°C
- 0 to +15 = 15°C
- Increase = 23°C
**Answer**: 23°C

### Bank: -£450 + £1,200 - £300
Step 1: -450 + 1,200 = 750
Step 2: 750 - 300 = 450
**Answer**: £450

## RULES

1. Use number lines for visualization
2. Count through zero for intervals
3. Adding negative = subtracting positive
4. Subtracting negative = adding positive
5. Context helps understanding (temperature, money)
6. Show working step-by-step
7. SATs: explain reasoning
8. Answer key with number line diagrams
9. Colored backgrounds Q1-Q5
10. Year 6 SATs appropriate

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Addition crossing zero?
- [ ] Q2: Subtraction crossing zero?
- [ ] Q3: Calculate interval?
- [ ] Q4: Multiple operations on number line?
- [ ] Q5: Real-world SATs problem?
- [ ] Range -1000 to +1000?
- [ ] Number lines for working?
- [ ] Multiple contexts (temp, money, altitude)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with diagrams?
- [ ] Year 6 SATs appropriate?

Generate complete HTML. UK Year 6 aligned (ages 10-11, SATs level).
