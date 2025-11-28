# Ages 8-9: Negative Numbers

**CRITICAL: EXACTLY {{questionCount}} questions. Introduction to negative numbers and counting below zero.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Concept**: Numbers below zero (negative numbers)
- **Range**: Typically -10 to +10 for Year 4
- **Understanding**: Temperature, floors below ground, number lines
- **Skills**: Count backwards through zero, compare negative numbers, order integers
- **Real contexts**: Temperature (°C), building floors, sea level

## QUESTION TYPES

**Q1**: Number line with negatives. Fill in missing numbers from -10 to +10.

**Q2**: Temperature context. "The temperature was 3°C. It dropped 5 degrees. What is it now?"

**Q3**: Ordering integers. "Put these numbers in order from smallest to largest: 5, -2, 0, -7, 3"

**Q4**: Comparing negatives. Use <, >, = to compare negative numbers.

**Q5**: Word problem. "A diver is 8 metres below sea level (-8m). They swim up 3 metres. What depth are they now?"

## UNDERSTANDING NEGATIVE NUMBERS

### Zero is the middle
- **Positive numbers**: Above zero (+1, +2, +3...)
- **Zero**: Neither positive nor negative
- **Negative numbers**: Below zero (-1, -2, -3...)

### Number line concept
```
-10 -9 -8 -7 -6 -5 -4 -3 -2 -1  0  +1 +2 +3 +4 +5 +6 +7 +8 +9 +10
 ←  colder/lower/less        zero        warmer/higher/more  →
```

## REAL-WORLD CONTEXTS (Year 4)

### Temperature
- **Freezing point**: 0°C
- **Above freezing**: Positive (e.g., +15°C)
- **Below freezing**: Negative (e.g., -5°C)

### Building Floors
- **Ground floor**: 0
- **Floors above**: +1, +2, +3 (or 1st floor, 2nd floor)
- **Floors below** (basement): -1, -2, -3

### Sea Level
- **At sea level**: 0 metres
- **Above sea level**: Positive (e.g., mountain +100m)
- **Below sea level**: Negative (e.g., submarine -50m)

## COLOR SCHEME (Year 4 Enhanced)
- **Positive numbers**: #4CAF50 (green) - above zero
- **Zero**: #9E9E9E (grey) - neutral point
- **Negative numbers**: #2196F3 (blue) - below zero
- **Temperature hot**: #FF5722 (red-orange)
- **Temperature cold**: #03A9F4 (light blue)
- **Number line**: Gradient from blue (negative) to green (positive)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.number-line-negative{position:relative;height:120px;margin:30px 20px;background:linear-gradient(to right,#E3F2FD 0%,#E3F2FD 45%,#F5F5F5 50%,#E8F5E9 55%,#E8F5E9 100%);border-radius:8px;padding:25px 15px;border:3px solid #666}
.number-line-track{position:absolute;bottom:35px;left:5%;right:5%;height:6px;background:linear-gradient(to right,#2196F3 0%,#2196F3 45%,#9E9E9E 48%,#9E9E9E 52%,#4CAF50 55%,#4CAF50 100%);border-radius:3px}
.number-marks-container{position:relative;height:80px;display:flex;justify-content:space-between;padding:0 5%}
.number-mark-neg{position:relative;width:3px;height:25px;background:#2196F3}
.number-mark-zero{position:relative;width:5px;height:35px;background:#9E9E9E}
.number-mark-pos{position:relative;width:3px;height:25px;background:#4CAF50}
.number-mark.major{height:35px;width:4px}
.mark-label{position:absolute;top:45px;left:50%;transform:translateX(-50%);font-size:16pt;font-weight:bold;white-space:nowrap}
.mark-label.negative{color:#1976D2}
.mark-label.zero{color:#666;font-size:18pt}
.mark-label.positive{color:#2E7D32}
.temperature-container{margin:20px 0;padding:20px;background:#E1F5FE;border-radius:8px;border:3px solid #03A9F4}
.thermometer{width:80px;height:300px;background:#FFF;border:4px solid #333;border-radius:40px;margin:20px auto;position:relative;overflow:hidden}
.thermometer-scale{position:absolute;right:10px;top:10px;bottom:10px;width:30px}
.thermometer-tick{height:20px;border-right:2px solid #666;margin:9px 0;position:relative}
.thermometer-label{position:absolute;right:35px;top:0;font-size:14pt;font-weight:bold}
.thermometer-label.negative{color:#2196F3}
.thermometer-label.positive{color:#FF5722}
.thermometer-mercury{position:absolute;bottom:0;left:15px;width:30px;background:linear-gradient(to top,#2196F3,#03A9F4);border-radius:15px 15px 0 0}
.temperature-display{font-size:42pt;font-weight:bold;text-align:center;margin:20px 0;padding:15px;background:#FFF;border:3px solid #03A9F4;border-radius:8px}
.temp-positive{color:#FF5722}
.temp-negative{color:#2196F3}
.temp-zero{color:#666}
.ordering-container{margin:20px 0;padding:20px;background:#F1F8E9;border-radius:8px}
.number-cards{display:flex;justify-content:center;gap:15px;margin:25px 0;flex-wrap:wrap}
.number-card{padding:20px 30px;border:4px solid;border-radius:8px;font-size:38pt;font-weight:bold;background:#FFF;box-shadow:3px 3px 6px rgba(0,0,0,0.2)}
.number-card.negative{border-color:#2196F3;color:#1976D2}
.number-card.zero{border-color:#9E9E9E;color:#666}
.number-card.positive{border-color:#4CAF50;color:#2E7D32}
.ordering-boxes{display:flex;justify-content:center;gap:12px;margin:25px 0;flex-wrap:wrap}
.order-box{padding:18px 25px;border:3px dashed #4CAF50;border-radius:8px;background:#FFF;min-width:110px;height:75px;text-align:center;font-size:32pt;font-weight:bold}
.order-label{text-align:center;font-size:15pt;color:#2E7D32;margin-top:10px;font-weight:bold}
.comparison-container{margin:20px 0;padding:20px;background:#FCE4EC;border-radius:8px}
.comparison-pair{display:flex;justify-content:center;align-items:center;gap:25px;margin:25px 0;flex-wrap:wrap}
.comparison-number{padding:20px 35px;border:4px solid;border-radius:8px;font-size:42pt;font-weight:bold;background:#FFF}
.comparison-symbol-box{display:inline-block;min-width:70px;height:70px;border:3px solid #E91E63;border-radius:8px;background:#FFF;font-size:48pt;line-height:70px;text-align:center;margin:0 12px;vertical-align:middle}
.floor-diagram-container{margin:20px 0;padding:20px;background:#FFF3E0;border-radius:8px}
.building-diagram{width:250px;margin:20px auto;border:4px solid #333;border-radius:8px 8px 0 0;overflow:hidden}
.floor-level{height:50px;border-bottom:2px solid #666;display:flex;align-items:center;justify-content:space-between;padding:0 15px;font-weight:bold;font-size:16pt}
.floor-level.positive{background:#C8E6C9}
.floor-level.ground{background:#F5F5F5;border-top:4px solid #333;border-bottom:4px solid #333}
.floor-level.negative{background:#BBDEFB}
.floor-number{font-size:20pt;font-weight:bold}
.floor-number.pos{color:#2E7D32}
.floor-number.neg{color:#1976D2}
.sea-level-container{margin:20px 0;padding:20px;background:#E1F5FE;border-radius:8px}
.sea-level-diagram{width:300px;height:400px;margin:20px auto;position:relative;background:linear-gradient(to bottom,#E3F2FD 0%,#E3F2FD 45%,#03A9F4 50%,#0277BD 100%);border:3px solid #01579B;border-radius:8px}
.sea-level-line{position:absolute;left:0;right:0;top:50%;height:4px;background:#FF9800;z-index:2}
.sea-level-label{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:#FF9800;color:#FFF;padding:5px 12px;border-radius:6px;font-weight:bold;font-size:14pt}
.depth-marker{position:absolute;left:10px;width:30px;height:30px;background:#FFF;border:3px solid #333;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14pt}
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

### Example 1: Number Line
Fill in the missing numbers:
```
-5, ___, -3, -2, ___, 0, +1, ___, +3
```
**Answer**: -4, -1, +2

### Example 2: Temperature
**Problem**: The temperature was +3°C. It dropped 5 degrees. What is it now?
**Solution**:
- Start at +3
- Count back 5: +3 → +2 → +1 → 0 → -1 → -2
- **Answer**: -2°C

### Example 3: Ordering (Smallest to Largest)
**Numbers**: 5, -2, 0, -7, 3
**Order**: -7, -2, 0, 3, 5
**Rule**: More negative = smaller

### Example 4: Comparing
**Compare**: -5 ___ -2
**Answer**: -5 < -2 (because -5 is further left on number line, so smaller)

### Example 5: Sea Level
**Problem**: A submarine is at -50m (50 metres below sea level). It rises 20 metres. What depth is it now?
**Solution**:
- Start at -50
- Rise (add) 20: -50 + 20 = -30
- **Answer**: -30m (still below sea level)

## KEY CONCEPTS

### Counting through zero
**Forwards**: -3, -2, -1, 0, +1, +2, +3
**Backwards**: +3, +2, +1, 0, -1, -2, -3

### Comparing negatives
- **-8 < -3** (even though 8 > 3)
- **More negative = smaller value**
- **Less negative = larger value**

### Zero is special
- Not positive, not negative
- The dividing point
- Freezing point for water (0°C)

## RULES

1. Use negative numbers in real contexts (temperature, floors, sea level)
2. Number lines from -10 to +10 typical range
3. Visual representation with thermometers, building diagrams
4. Colored coding: negative=blue, zero=grey, positive=green
5. Counting backwards through zero
6. Comparing and ordering including negatives
7. Answer key with clear explanations
8. Colored backgrounds Q1-Q5
9. Year 4 appropriate (ages 8-9)
10. Relate to everyday experiences

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Number line with negatives included?
- [ ] Q2: Temperature context problem?
- [ ] Q3: Ordering integers including negatives?
- [ ] Q4: Comparing negative numbers with <, >, =?
- [ ] Q5: Real-world word problem (sea level/floors)?
- [ ] Number lines show negative to positive range?
- [ ] Visual representations (thermometer/building/sea level)?
- [ ] Color-coded (negative=blue, zero=grey, positive=green)?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with clear working?
- [ ] Year 4 appropriate contexts and complexity?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
