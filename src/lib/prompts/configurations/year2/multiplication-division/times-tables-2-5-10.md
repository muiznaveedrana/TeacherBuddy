# Year 2: Times Tables 2, 5, 10 - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 2 times tables (2, 5, 10) worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 2 PEDAGOGY (Ages 6-7) - NON-NEGOTIABLE RULES

### Rule 1: Times Tables Focus (CRITICAL)
- **2, 5, and 10 times tables** (up to ×12)
- Understand multiplication as repeated addition
- Recognize patterns (2s: even, 5s: end in 0/5, 10s: end in 0)
- Use arrays and groups for visualization

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY**
- Progress from visual to abstract recall

### Rule 4: Visual Support (CRITICAL)
- **Arrays** (rows and columns)
- **Equal groups** using WORKSHEET_OBJECTS
- **Number lines** for skip counting
- Pattern recognition visuals

### Rule 5: Age-Appropriate Language
- **Multiplication vocabulary**: times, multiply, groups of, lots of
- "3 groups of 5", "5 times 2"
- Link to repeated addition (3 × 5 = 5 + 5 + 5)

## PROVEN 5-QUESTION FORMAT

**Q1: Visual Arrays** - Count using array (e.g., 4 rows of 5)
**Q2: Repeated Addition** - Convert to multiplication (e.g., 10+10+10 = 3×10)
**Q3: Times Tables Practice** - Mixed 2s, 5s, 10s (6 facts)
**Q4: Pattern Recognition** - Complete sequences
**Q5: Word Problem** - Multiplication in context

## TIMES TABLES FACTS

**2 times table:** 1×2=2, 2×2=4, 3×2=6, 4×2=8, 5×2=10, 6×2=12, 7×2=14, 8×2=16, 9×2=18, 10×2=20, 11×2=22, 12×2=24

**5 times table:** 1×5=5, 2×5=10, 3×5=15, 4×5=20, 5×5=25, 6×5=30, 7×5=35, 8×5=40, 9×5=45, 10×5=50, 11×5=55, 12×5=60

**10 times table:** 1×10=10, 2×10=20, 3×10=30, 4×10=40, 5×10=50, 6×10=60, 7×10=70, 8×10=80, 9×10=90, 10×10=100, 11×10=110, 12×10=120

## PATTERNS TO HIGHLIGHT

- **2s**: All even numbers
- **5s**: End in 0 or 5
- **10s**: End in 0 (just add 0 to the multiplier)

## SELF-VALIDATION CHECKLIST

1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Q1 = Visual array?**
3. ✓ **Q2 = Repeated addition to multiplication?**
4. ✓ **Q3 = Mixed times tables (6 facts)?**
5. ✓ **Q4 = Pattern recognition?**
6. ✓ **Q5 = Word problem?**
7. ✓ **Answer key present?**
8. ✓ **Only 2, 5, 10 times tables?**
9. ✓ **Facts up to ×12?**
10. ✓ **Year 2 curriculum aligned?**

**If ANY fails, STOP and regenerate.**

## OUTPUT FORMAT

Return complete HTML document with CSS, 5 questions, answer key, and placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}.

**Generate NOW following ALL specifications above.**
