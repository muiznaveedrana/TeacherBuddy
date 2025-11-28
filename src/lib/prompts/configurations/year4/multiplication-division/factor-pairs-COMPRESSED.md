# Ages 8-9: Factor Pairs

**CRITICAL: EXACTLY {{questionCount}} questions. Find all factor pairs for numbers up to 100.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 4 FOCUS (Ages 8-9)
- **Factors**: Numbers that divide exactly into another number
- **Factor pairs**: Two numbers that multiply to give a target number
- **Example**: Factor pairs of 12 are (1,12), (2,6), (3,4)
- **Understanding**: Connection to multiplication and division
- **Prime numbers**: Numbers with only two factors (1 and itself)

## QUESTION TYPES

**Q1**: Find all factor pairs for a number (e.g., 24).

**Q2**: Array representation. Show factor pairs as arrays.

**Q3**: Missing factor. "__ × 6 = 48"

**Q4**: Identify prime numbers. Which numbers have only 2 factors?

**Q5**: Word problem. "A garden has 24 plants. What rectangular arrangements are possible?"

## UNDERSTANDING FACTORS (Year 4)

### What are factors?
**Factors of 12**: 1, 2, 3, 4, 6, 12
- 1 × 12 = 12
- 2 × 6 = 12
- 3 × 4 = 12

### Factor pairs
- (1, 12)
- (2, 6)
- (3, 4)

## HOW TO FIND ALL FACTOR PAIRS

**Example: Find factor pairs of 24**

**Step 1**: Start with 1
- 1 × 24 = 24 ✓ (1, 24)

**Step 2**: Try 2
- 2 × 12 = 24 ✓ (2, 12)

**Step 3**: Try 3
- 3 × 8 = 24 ✓ (3, 8)

**Step 4**: Try 4
- 4 × 6 = 24 ✓ (4, 6)

**Step 5**: Try 5
- 5 doesn't divide 24 evenly ✗

**Stop when pairs start repeating**

**All factor pairs of 24**: (1,24), (2,12), (3,8), (4,6)

## PRIME NUMBERS (Introduction for Year 4)

**Prime number**: Has EXACTLY two factors (1 and itself)

**Primes up to 20**: 2, 3, 5, 7, 11, 13, 17, 19

**Examples**:
- 7 is prime: factors are 1, 7 only
- 8 is NOT prime: factors are 1, 2, 4, 8

## COLOR SCHEME (Year 4 Enhanced)
- **Factor pairs**: #9C27B0 (purple)
- **Prime numbers**: #4CAF50 (green)
- **Composite numbers**: #2196F3 (blue)
- **Arrays**: #FF9800 (orange)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:17pt;padding:10px;line-height:1.6}
.question{margin:12px 0;padding:16px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:34px;height:34px;line-height:34px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:16pt}
.question-text{font-size:17pt;margin:8px 0;font-weight:600}
.factor-container{margin:20px 0;padding:20px;background:#F3E5F5;border:3px solid #9C27B0;border-radius:8px}
.target-number{font-size:48pt;font-weight:bold;color:#7B1FA2;text-align:center;margin:20px 0;padding:20px;background:#FFF;border:4px solid #9C27B0;border-radius:8px}
.factor-pairs-display{display:flex;flex-direction:column;gap:15px;margin:25px 0}
.factor-pair{display:flex;justify-content:center;align-items:center;gap:15px}
.factor-number{padding:15px 25px;background:#E1BEE7;border:3px solid #9C27B0;border-radius:8px;font-size:28pt;font-weight:bold;color:#6A1B9A}
.multiply-symbol{font-size:32pt;color:#FF9800;font-weight:bold}
.equals-symbol{font-size:32pt;color:#4CAF50;font-weight:bold}
.factor-result{padding:15px 30px;background:#FFF;border:3px solid #9C27B0;border-radius:8px;font-size:32pt;font-weight:bold;color:#7B1FA2}
.array-container{margin:20px 0;padding:20px;background:#FFF3E0;border:3px solid #FF9800;border-radius:8px}
.array-title{font-size:18pt;font-weight:bold;color:#E65100;margin-bottom:18px;text-align:center}
.array-grid{display:inline-flex;flex-direction:column;gap:6px;margin:20px auto;padding:15px;background:#FFF;border:3px solid #FF9800;border-radius:6px}
.array-row{display:flex;gap:6px}
.array-square{width:25px;height:25px;background:#FF9800;border:2px solid #F57C00;border-radius:3px}
.array-label{font-size:18pt;font-weight:bold;color:#E65100;margin-top:12px;text-align:center}
.prime-checker{margin:20px 0;padding:20px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.prime-title{font-size:18pt;font-weight:bold;color:#2E7D32;margin-bottom:18px;text-align:center}
.number-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:12px;margin:20px 0}
.number-card{padding:15px;background:#FFF;border:3px solid;border-radius:8px;text-align:center;font-size:26pt;font-weight:bold}
.number-card.prime{border-color:#4CAF50;color:#2E7D32;background:#C8E6C9}
.number-card.composite{border-color:#2196F3;color:#1976D2;background:#BBDEFB}
.factor-list-container{margin:20px 0;padding:20px;background:#E3F2FD;border:3px solid #2196F3;border-radius:8px}
.factor-list-title{font-size:18pt;font-weight:bold;color:#1565C0;margin-bottom:18px}
.factors-display{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0;justify-content:center}
.factor-badge{padding:10px 18px;background:#2196F3;color:#FFF;border-radius:20px;font-size:22pt;font-weight:bold}
.instruction-box{margin:18px 0;padding:16px;background:#E8F4F8;border:3px dashed #2196F3;border-radius:8px;font-size:17pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:100px;height:55px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 10px;font-size:24pt;line-height:55px;text-align:center}
.working-space{border:3px dashed #999;padding:15px;margin:15px 0;min-height:100px;background:#FAFAFA;border-radius:8px}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px}
.answer-key{margin-top:40px;padding:20px;background:#E8F4F8;border:3px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:20pt;color:#2c3e50;margin-bottom:15px;text-align:center;font-weight:bold}
.answer-key p{font-size:15pt;line-height:1.8;margin:10px 0}
.answer-key strong{color:#1976D2}
</style>
```

## WORKED EXAMPLES

### Factor Pairs of 18
- 1 × 18 = 18 → (1, 18)
- 2 × 9 = 18 → (2, 9)
- 3 × 6 = 18 → (3, 6)

**All factors of 18**: 1, 2, 3, 6, 9, 18

### Array Representation
**12 = 3 × 4**
```
□ □ □ □
□ □ □ □
□ □ □ □
```
3 rows of 4 = 12

### Prime Number Check
**Is 11 prime?**
- Factors of 11: 1, 11 only
- YES, 11 is prime ✓

**Is 12 prime?**
- Factors of 12: 1, 2, 3, 4, 6, 12
- NO, 12 is NOT prime ✗

## COMMON FACTOR PAIRS TO KNOW (Year 4)

| Number | Factor Pairs |
|--------|-------------|
| 12 | (1,12), (2,6), (3,4) |
| 15 | (1,15), (3,5) |
| 18 | (1,18), (2,9), (3,6) |
| 20 | (1,20), (2,10), (4,5) |
| 24 | (1,24), (2,12), (3,8), (4,6) |
| 30 | (1,30), (2,15), (3,10), (5,6) |
| 36 | (1,36), (2,18), (3,12), (4,9), (6,6) |

## RULES

1. Find ALL factor pairs
2. Present as ordered pairs (smaller, larger)
3. Use arrays to visualize
4. Connect to times tables
5. Introduce prime numbers
6. Real-world rectangular arrangements
7. Answer key with all pairs listed
8. Colored backgrounds Q1-Q5
9. Year 4 appropriate (ages 8-9)

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Find all factor pairs for a number?
- [ ] Q2: Array representation of factors?
- [ ] Q3: Missing factor problems?
- [ ] Q4: Prime number identification?
- [ ] Q5: Real-world rectangular arrangement problem?
- [ ] All factor pairs found systematically?
- [ ] Arrays shown clearly?
- [ ] Prime vs composite explained?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with all pairs?
- [ ] Year 4 appropriate?

Generate complete HTML. UK Year 4 aligned (ages 8-9).
