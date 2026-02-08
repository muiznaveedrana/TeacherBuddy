---
name: Worksheet Quality Criteria
description: 7-dimension quality assessment for educational worksheets
---

# Worksheet Quality Assessment — 7 Dimensions

Strict quality criteria used by the pipeline quality assessment (Phase 3).

## Zero-Tolerance Policy

ANY of these = AUTOMATIC FAIL:
- Broken images (placeholder/empty boxes) → max score 65
- Identical objects in comparison questions → max score 40
- Missing questions (cut-off content) → score capped at (% visible x 100)
- Wrong answers in answer key → max score 70

## 7 Scoring Dimensions

Each scored 0-10. Weighted overall = sum of (score x weight) x 10.

### 1. Curriculum Alignment — 50% (Primary)
Age-appropriate numbers, language, question count for the year group.
- Reception (4-5): Numbers 1-10, simple words
- Year 1 (5-6): Numbers 1-20
- Year 2 (6-7): Numbers 1-100
- Year 3 (7-8): Numbers 1-1000

### 2. Answer Correctness — 20% (High)
Questions mathematically/logically valid. Filled-in answers (visible in screenshot) are correct. Answer key matches.

### 3. Intuitive Look & Feel — 10% (Medium)
Each question is visually self-explanatory. Child immediately knows what to do — where to look, what to count, where to write.

### 4. Image Integrity — 5% (Low)
All images load, no broken/placeholder, correct sizes, high contrast.

### 5. Visual Answerability — 5% (Low)
Can a child of target age answer by LOOKING at images? Obvious size/count differences (30%+ for Reception).

### 6. Presentation Quality — 5% (Low)
Overall layout — spacing, margins, readability, no cut-off content, balanced.

### 7. Image-Question Match — 5% (Low)
Images semantically match their questions (no footballs in a fruit counting worksheet).

## Classification

| Status | Criteria | Action |
|--------|----------|--------|
| **GREEN** | Score >= 95 AND zero auto-fails | Production ready |
| **AMBER** | Score 70-94 OR has auto-fails (score > 40) | Needs fixes |
| **RED** | Score < 70 OR test failed | Requires rework |

## Production Ready
- Score >= 95
- AND zero auto-fail conditions

## Child Simulation Test

For each question, simulate a child of the target age:
- Reception: 4-5 years old
- Year 1: 5-6 years old
- Year 2: 6-7 years old
- Year 3: 7-8 years old

Ask: "Can this child complete this question independently by looking?"

## Quality Mantra

> "When in doubt, FAIL it. Quality > Quantity."
