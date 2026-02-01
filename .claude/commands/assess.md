# Worksheet Quality Assessment

Trigger worksheet quality assessment with strict criteria.

## Quick Commands

### Assess by Year Group
- `auto assessment reception` - Scan all Reception worksheets
- `auto assessment year1` - Scan all Year 1 worksheets
- `auto assessment year2` - Scan all Year 2 worksheets

### After Assessment
- `approve fixes` - Proceed to Stage 2 (fix identified issues)
- `export learnings` - Export learnings to documentation

## Assessment Criteria (Zero-Tolerance)

### AUTO-FAIL Conditions
- Any broken/placeholder/empty images
- Identical objects in comparison questions
- Missing questions (cut-off content)
- Empty answer keys

### Scoring Caps
| Issue | Max Score |
|-------|-----------|
| Broken images | 65 |
| Unanswerable comparisons | 40 |
| Missing questions | (% visible x 100) |

### Production Ready
- Score >= 95 AND zero critical issues

## Key Question
"Can a 4-year-old answer this by LOOKING at the images?"

## Run Agent
Use the worksheet-quality-assessor agent:
```
run agent
```
Default: 3 worksheets per cycle, 2 cycles
