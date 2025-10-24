# Year 2: Word Problems - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 2 word problems worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 2 PEDAGOGY (Ages 6-7) - NON-NEGOTIABLE RULES

### Rule 1: Problem Types (CRITICAL)
- **One-step and two-step problems** within 100
- All four operations contexts (mainly addition/subtraction)
- Real-world scenarios familiar to ages 6-7
- Clear, age-appropriate language

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY**
- Progress from one-step to two-step problems

### Rule 4: Visual Support (CRITICAL)
- **Bar models** for comparison and part-whole
- **Picture representations** using WORKSHEET_OBJECTS
- **Number sentences** to model the problem
- Clear visual scaffolding

### Rule 5: Age-Appropriate Language
- **Problem vocabulary**: altogether, how many more, how many left, in total
- Contexts: toys, school, birthday parties, money (pence), fruit
- Keep sentences short and clear

## PROVEN 5-QUESTION FORMAT

**Q1: Addition (Result Unknown)** - Combining two groups
**Q2: Subtraction (Result Unknown)** - Taking away from total
**Q3: Comparison Problem** - How many more/fewer?
**Q4: Part Unknown** - Missing addend problem
**Q5: Two-Step Problem** - Combine two operations

## PROBLEM TYPE STRUCTURES

**Addition - Result Unknown:**
"Ben has 24 marbles. Emma gives him 15 more. How many does Ben have now?"

**Subtraction - Result Unknown:**
"Lily had 45 stickers. She used 18 stickers. How many stickers does she have left?"

**Comparison:**
"Sam collected 36 shells. Jack collected 22 shells. How many more shells did Sam collect?"

**Part Unknown:**
"There are 50 children in total. 32 are girls. How many are boys?"

**Two-Step:**
"Maya had 30 pencils. She bought 15 more, then gave 12 to her friend. How many pencils does she have now?"

## SELF-VALIDATION CHECKLIST

1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Q1 = Addition (result unknown)?**
3. ✓ **Q2 = Subtraction (result unknown)?**
4. ✓ **Q3 = Comparison problem?**
5. ✓ **Q4 = Part unknown problem?**
6. ✓ **Q5 = Two-step problem?**
7. ✓ **Answer key present with working shown?**
8. ✓ **All numbers within 100?**
9. ✓ **Age-appropriate contexts?**
10. ✓ **Year 2 curriculum aligned?**

**If ANY fails, STOP and regenerate.**

## OUTPUT FORMAT

Return complete HTML document with CSS, 5 questions, answer key, and placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}.

**Generate NOW following ALL specifications above.**
