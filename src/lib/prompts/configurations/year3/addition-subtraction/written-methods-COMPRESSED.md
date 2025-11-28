# Ages 7-8: Written Column Methods

**CRITICAL: EXACTLY {{questionCount}} questions. Formal written column addition & subtraction.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## ROTATION SPECS:
{{COLUMN_TYPE}}
{{REGROUP_STAGE}}
{{DIFFICULTY}}
{{VISUAL_SUPPORT}}
{{CHECK_METHOD}}

## YEAR 3 FOCUS (Ages 7-8)
- **Formal written method**: Column addition and subtraction
- **Number range**: 100-999 (three-digit numbers)
- **Key skills**: Regrouping (carrying/borrowing), place value alignment
- **Progression**: No regroup → single regroup → double regroup → triple regroup
- **Understanding**: Why and when we carry/borrow
- **Checking**: Use inverse operations to verify answers

## QUESTION TYPES

**Q1: Column Addition (Various Formats)**
- `standard-add-ones`: Standard column with regrouping ones (e.g., 456 + 237)
- `expanded-add-ones`: Expanded place value addition showing H|T|O
- `standard-add-no-regroup`: Simple addition, no carrying needed
- `compact-add-ones`: Compact format with minimal scaffolding
- `error-spotting-add`: Find the mistake in completed work

**Q2: Column Addition (Advanced)**
- `standard-add-tens`: Regrouping from tens to hundreds (e.g., 347 + 280)
- `expanded-add-tens`: Expanded method showing tens regrouping
- `standard-add-multi`: Multiple regrouping (ones AND tens)
- `missing-digits-add`: Fill in missing digits in column addition
- `checking-add-inverse`: Verify addition using subtraction

**Q3: Column Subtraction (Basic)**
- `standard-sub-ones`: Borrow from tens to ones (e.g., 456 - 229)
- `expanded-sub-ones`: Expanded decomposition method
- `standard-sub-no-borrow`: Subtraction without borrowing
- `compact-sub-ones`: Compact format for subtraction
- `decomposition-sub`: Traditional borrowing method clearly shown

**Q4: Column Subtraction (Advanced)**
- `standard-sub-tens`: Borrow from hundreds to tens (e.g., 534 - 267)
- `standard-sub-zeros`: Subtraction involving zeros (e.g., 500 - 234)
- `standard-sub-multi`: Multiple borrowing steps
- `missing-digits-sub`: Fill in missing digits in subtraction
- `checking-sub-inverse`: Verify subtraction using addition

**Q5: Challenge/Application**
- `mixed-challenge-5problems`: 5 mixed column problems
- `error-correction`: Find and fix mistakes in column work
- `real-world-column-money`: UK money calculations using column method
- `estimation-first`: Estimate before calculating, then check
- `create-your-own`: Students create their own column problems

## DIFFICULTY LEVELS
- **no-regroup**: No carrying or borrowing needed (e.g., 345 + 123)
- **single-regroup**: One carry/borrow (e.g., 456 + 237)
- **double-regroup**: Two carries/borrows (e.g., 478 + 365)
- **triple-regroup**: Three carries/borrows (rare, very advanced)
- **mixed**: Combination of various regrouping needs

## VISUAL SUPPORT OPTIONS
- **Standard column**: Traditional vertical layout
- **Expanded column**: H|T|O place value columns shown
- **Carry notation**: Small carry numbers shown above
- **Borrow notation**: Crossing out and rewriting numbers
- **Place value grid**: Grid showing hundreds, tens, ones
- **Step-by-step**: Numbered steps showing process

## CHECKING METHODS
- **Inverse operation**: Check 456 + 237 = 693 by doing 693 - 237 = 456
- **Estimation**: Round first to check answer makes sense
- **Place value check**: Does each column make sense?
- **Different method**: Use mental calculation to verify

## COLOR SCHEME (Year 3 Enhanced)
- **Addition**: #4CAF50 (green)
- **Subtraction**: #FF5722 (red-orange)
- **Carry numbers**: #FF5722 (red-orange) - small, above
- **Borrow marks**: #E91E63 (pink) - crossing out
- **Hundreds column**: #FF9800 (orange)
- **Tens column**: #2196F3 (blue)
- **Ones column**: #4CAF50 (green)
- **Error highlighting**: #F44336 (red)
- **Correct highlighting**: #4CAF50 (green)

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.column-container{display:inline-block;border:3px solid #333;padding:18px 28px;border-radius:8px;background:#F5F5F5;text-align:right;font-family:'Courier New',monospace;font-size:26pt;line-height:1.7;margin:18px auto;box-shadow:2px 2px 6px rgba(0,0,0,0.15);min-width:200px}
.column-number{margin:6px 0;letter-spacing:12px;font-weight:600}
.column-operator{margin:6px 0;text-align:left;color:#2196F3;font-weight:bold;font-size:24pt}
.column-operator.add{color:#4CAF50}
.column-operator.sub{color:#FF5722}
.column-line{border-top:4px solid #333;margin:10px 0}
.column-answer{margin:6px 0;font-weight:bold;color:#1976D2;min-height:40px}
.carry-number{font-size:14pt;color:#FF5722;position:relative;top:-15px;margin-right:5px;font-weight:bold;background:#FFF;padding:2px 5px;border-radius:3px}
.borrow-mark{font-size:13pt;color:#E91E63;position:relative;top:-12px;text-decoration:line-through;margin-right:4px}
.borrowed-number{font-size:18pt;color:#E91E63;font-weight:bold;background:#FFE0F0;padding:2px 6px;border-radius:3px}
.expanded-column-container{display:inline-block;border:3px solid #333;margin:15px 0;border-radius:8px;background:white;overflow:hidden;box-shadow:2px 2px 6px rgba(0,0,0,0.1)}
.expanded-header{display:flex;background:#1976D2;color:white;font-weight:bold;font-size:17pt}
.expanded-header-cell{padding:12px 24px;text-align:center;border-right:2px solid #fff;min-width:90px;flex:1}
.expanded-header-cell:last-child{border-right:none}
.expanded-header-cell.hundreds{background:#FF9800}
.expanded-header-cell.tens{background:#2196F3}
.expanded-header-cell.ones{background:#4CAF50}
.expanded-row{display:flex;font-size:22pt;font-weight:bold;border-bottom:2px solid #ddd}
.expanded-row:last-child{border-bottom:none}
.expanded-cell{padding:14px 24px;text-align:center;border-right:2px solid #ddd;min-width:90px;font-family:'Courier New',monospace;flex:1}
.expanded-cell:last-child{border-right:none}
.expanded-operator{background:#E3F2FD;color:#1976D2;font-weight:bold;padding:14px 20px;border-right:2px solid #ddd;min-width:60px;text-align:center}
.expanded-line-row{background:#333;height:3px}
.place-value-grid{display:inline-table;border:3px solid #333;border-radius:8px;overflow:hidden;margin:15px auto}
.pv-grid-row{display:table-row}
.pv-grid-cell{display:table-cell;padding:15px 22px;text-align:center;font-size:22pt;font-weight:bold;border:2px solid #666;min-width:85px;font-family:'Courier New',monospace}
.pv-grid-header{background:#1976D2;color:#FFF;font-size:16pt}
.pv-grid-h{background:#FFF3E0;color:#FF9800}
.pv-grid-t{background:#E3F2FD;color:#2196F3}
.pv-grid-o{background:#E8F5E9;color:#4CAF50}
.working-space{border:3px dashed #999;padding:18px;margin:15px 0;min-height:120px;background:#FAFAFA;border-radius:8px;text-align:center}
.working-space-label{font-size:14pt;color:#666;font-style:italic;margin-bottom:10px;text-align:left}
.working-space-grid{display:flex;justify-content:space-around;margin:15px 0}
.error-spotting-container{margin:18px 0;padding:18px;background:#FFEBEE;border:2px solid #F44336;border-radius:8px}
.error-example{margin:15px 0;padding:15px;background:#FFF;border:3px solid #F44336;border-radius:8px;position:relative}
.error-label{font-size:16pt;font-weight:bold;color:#C62828;margin-bottom:12px}
.error-work{display:inline-block;font-family:'Courier New',monospace;font-size:24pt;line-height:1.7;background:white;padding:15px 20px;border-radius:6px;border:2px solid #666}
.error-question{font-size:16pt;margin:12px 0;color:#D32F2F;font-weight:600}
.correct-example{margin:15px 0;padding:15px;background:#E8F5E9;border:3px solid #4CAF50;border-radius:8px}
.correct-label{font-size:16pt;font-weight:bold;color:#2E7D32;margin-bottom:12px}
.estimation-container{margin:18px 0;padding:18px;background:#E1F5FE;border:2px dashed #0288D1;border-radius:8px}
.estimation-label{font-size:16pt;font-weight:bold;color:#01579B;margin-bottom:10px}
.estimation-work{font-size:17pt;margin:10px 0;line-height:1.6}
.estimation-step{padding:10px;background:#FFF;border-left:4px solid #0288D1;border-radius:4px;margin:8px 0}
.missing-digit-container{margin:18px 0;padding:18px;background:#FFF9C4;border-radius:8px}
.missing-digit-blank{display:inline-block;width:35px;height:40px;border-bottom:4px solid #FF5722;background:#FFF;vertical-align:baseline;margin:0 3px;font-size:22pt;text-align:center;font-family:'Courier New',monospace}
.inverse-check-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px}
.inverse-pair{display:flex;justify-content:center;align-items:center;gap:25px;margin:20px 0;flex-wrap:wrap}
.inverse-calculation{padding:15px;background:#FFF;border:3px solid #9C27B0;border-radius:8px}
.check-arrow{font-size:36pt;color:#FF9800;font-weight:bold}
.check-label{font-size:15pt;font-weight:bold;color:#7B1FA2;margin-bottom:10px}
.mixed-problems-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin:18px 0}
.mixed-problem-box{padding:15px;background:#FFF;border:3px solid #333;border-radius:8px;text-align:center}
.mixed-problem-number{display:inline-block;background:#FF9800;color:#FFF;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-bottom:10px;font-size:14pt;font-weight:bold}
.money-calculation-container{margin:18px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.money-scenario{font-size:17pt;line-height:1.7;margin:12px 0}
.money-amount{display:inline-block;padding:6px 15px;background:#FFD700;border:2px solid #F57C00;border-radius:6px;font-weight:bold;color:#E65100;margin:0 5px}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.answer-box{display:inline-block;min-width:120px;height:50px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px;font-size:22pt;line-height:50px;text-align:center}
.answer-box-small{min-width:80px;height:45px;font-size:20pt}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:150px;margin:0 8px;background:transparent}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
.answer-key .carry-note{color:#FF5722;font-weight:bold;background:#FFE0DD;padding:2px 8px;border-radius:4px}
.answer-key .borrow-note{color:#E91E63;font-weight:bold;background:#FFE0F0;padding:2px 8px;border-radius:4px}
</style>
```

## WORKED EXAMPLES

### Standard Column Addition with Carrying (Ones)
```
    ¹
  4 5 6
+ 2 3 7
-------
  6 9 3
```
**Working**:
1. **Ones**: 6 + 7 = 13 → Write 3, carry 1 ten
2. **Tens**: 5 + 3 + 1 (carried) = 9
3. **Hundreds**: 4 + 2 = 6

### Standard Column Subtraction with Borrowing
```
  ⁴¹³
  5̶ 3̶ 4
- 2 6 7
-------
  2 6 7
```
**Working**:
1. **Ones**: Can't do 4 - 7, borrow 1 ten → 14 - 7 = 7
2. **Tens**: Now 2 tens, can't do 2 - 6, borrow 1 hundred → 12 - 6 = 6
3. **Hundreds**: Now 4 hundreds → 4 - 2 = 2

### Expanded Column Method (Addition)
```
    | H  | T  | O  |
    |400 | 50 | 6  |
+   |200 | 30 | 7  |
----|----|----|----|
    |600 | 80 | 13 |
    |600 | 90 | 3  | → Regroup 13 ones as 1 ten + 3 ones

Answer: 693
```

### Checking with Inverse Operation
```
Addition:     456 + 237 = 693
Check:        693 - 237 = 456 ✓ Correct!

Subtraction:  534 - 267 = 267
Check:        267 + 267 = 534 ✓ Correct!
```

## COMMON ERRORS TO AVOID

### Error 1: Not aligning place values
```
❌ Wrong:
  456
+ 23
----
  479
```
Should be:
```
✓ Right:
  456
+  23
-----
  479
```

### Error 2: Forgetting to carry
```
❌ Wrong:
  456
+ 237
-----
  683  (forgot to carry from ones)
```

### Error 3: Borrowing incorrectly
```
❌ Wrong:
  534
- 267
-----
  333  (borrowed incorrectly)
```

## RULES

1. Follow {{COLUMN_TYPE}} rotation exactly
2. Match {{REGROUP_STAGE}} precisely (no regroup/single/double/triple)
3. Apply {{DIFFICULTY}} level appropriately
4. Use {{VISUAL_SUPPORT}} scaffolds as specified
5. Include {{CHECK_METHOD}} in answer key
6. **CRITICAL**: Use monospace font for column alignment
7. Show carry numbers small and above in red (#FF5722)
8. Show borrow marks clearly with strikethrough
9. All numbers 100-999, sums ≤ 1000, differences ≥ 0
10. Colored backgrounds: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0
11. Year 3 appropriate (ages 7-8)
12. Answer key must show ALL working including carries/borrows
13. Check answers with inverse operations where specified
14. Estimation should be included where appropriate

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Column addition format matching COLUMN_TYPE?
- [ ] Q2: Advanced addition matching specifications?
- [ ] Q3: Column subtraction basic level?
- [ ] Q4: Advanced subtraction matching specifications?
- [ ] Q5: Challenge/application problem included?
- [ ] Column alignment perfect (monospace font)?
- [ ] REGROUP_STAGE requirements met?
- [ ] DIFFICULTY level appropriate?
- [ ] VISUAL_SUPPORT scaffolding included?
- [ ] CHECK_METHOD shown in answer key?
- [ ] All numbers 100-999 range?
- [ ] Carry notation shown correctly?
- [ ] Borrow notation shown clearly?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key with full working?
- [ ] All calculations accurate?
- [ ] Year 3 appropriate complexity?

Generate complete HTML. UK Year 3 aligned (ages 7-8). FOCUS: Formal written column method mastery.
