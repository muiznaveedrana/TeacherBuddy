# Year 1: Simple Word Problems - Worksheet Generation Prompt

**CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Year 1 simple word problems worksheet with EXACTLY {{questionCount}} questions using the PROVEN 5-QUESTION FORMAT below.

## YEAR 1 PEDAGOGY (Ages 5-6) - NON-NEGOTIABLE RULES

### Rule 1: Problem Types (CRITICAL)
- **Addition and subtraction within 20**
- One-step problems (occasionally simple two-step)
- Clear action words (gets, gives, eats, buys)
- Real-world contexts familiar to ages 5-6

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: Use Proven Question Format
- **Follow the 5-question pedagogical structure EXACTLY as specified below**
- Progress from simple addition to more complex problem types

### Rule 4: Visual Support (CRITICAL)
- **Use WORKSHEET_OBJECTS for all word problems**
- Visual illustrations showing the scenario
- Number sentences to support

### Rule 5: Language Clarity
- **Simple sentences (1-2 sentences per problem)**
- Clear question at end
- Age-appropriate vocabulary

## PROVEN 5-QUESTION FORMAT (RESEARCH-BASED)

### **Question 1: Addition - Result Unknown** (Easiest)
**Format**: Child has X items, gets Y more, how many now?
**Pedagogical Purpose**: Basic addition word problem
**Problem Structure**: Join (result unknown)

**Q2: Subtraction - Result Unknown**
**Format**: Child has X items, gives away/eats Y, how many left?
**Pedagogical Purpose**: Basic subtraction word problem
**Problem Structure**: Separate (result unknown)

**Q3: Addition - Part Unknown**
**Format**: Total is X, one part is Y, find other part
**Pedagogical Purpose**: Missing addend thinking
**Problem Structure**: Part-part-whole (part unknown)

**Q4: Comparison - Difference Unknown**
**Format**: X has A items, Y has B items, how many more/fewer?
**Pedagogical Purpose**: Understanding difference
**Problem Structure**: Compare (difference unknown)

**Q5: Simple Two-Step**
**Format**: Start with X, add Y, then subtract Z
**Pedagogical Purpose**: Multi-step thinking
**Problem Structure**: Combined operations

## WORD PROBLEM GUIDELINES

### Action Words:
- **Addition**: has, gets, buys, finds, picks, receives, wins
- **Subtraction**: gives away, eats, loses, flies away, sells, breaks
- **Comparison**: more than, fewer than, less than, the difference

### Contexts (WORKSHEET_OBJECTS):
- **Toys**: car, ball, teddy bear, doll, kite
- **Fruits**: apple, banana, orange, strawberry
- **School**: pencil, book, crayon
- **Animals**: Use farm animals for scenarios
- **Other**: stickers, balloons, flowers

### People Names:
- **Boys**: Ben, Sam, Jack, Oliver, Noah, Leo
- **Girls**: Emma, Lily, Sophie, Ava, Mia, Grace

### Number Ranges:
- Start numbers: 3-15
- Change amounts: 2-10
- Results: 0-20

## EXAMPLE STRUCTURES

**Addition (Result Unknown):**
"Ben has 7 toy cars. Emma gives him 5 more cars. How many cars does Ben have now?"
- Visual: 7 cars + 5 cars
- Number sentence: 7 + 5 = ___
- Answer: 12 cars

**Subtraction (Result Unknown):**
"Lily had 12 strawberries. She ate 5. How many strawberries are left?"
- Visual: 12 strawberries with 5 crossed out
- Number sentence: 12 − 5 = ___
- Answer: 7 strawberries

**Missing Part:**
"There are 10 apples in total. 6 are red. How many are green?"
- Visual: 10 apples, 6 red shown, ? green
- Number sentence: 6 + ___ = 10
- Answer: 4 green apples

**Comparison:**
"Sam has 9 pencils. Jack has 6 pencils. How many more pencils does Sam have?"
- Visual: 9 pencils vs 6 pencils in rows
- Number sentence: 9 − 6 = ___
- Answer: 3 more pencils

**Two-Step:**
"Emma had 8 books. She bought 6 more. Then she gave 5 to Lily. How many books does Emma have now?"
- Number sentences: 8 + 6 = 14, then 14 − 5 = ___
- Answer: 9 books

## ULTRA-COMPACT CSS

```css
body {
    font-family: 'Sassoon Primary', 'Century Gothic', 'Comic Sans MS', sans-serif;
    font-size: 16pt;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background: white;
    color: #000;
}

.worksheet-header {
    text-align: center;
    margin-bottom: 15px;
    padding-bottom: 6px;
    border-bottom: 3px solid #000;
}

.worksheet-title {
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}

.question {
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.question-number {
    font-size: 18pt;
    font-weight: bold;
    color: #2c3e50;
    margin-right: 8px;
}

.question-text {
    font-size: 16pt;
    line-height: 1.4;
    margin: 6px 0;
    font-weight: 600;
}

.word-problem-visual {
    margin: 15px auto;
    padding: 15px;
    background: #f8f9ff;
    border: 3px solid #4CAF50;
    border-radius: 12px;
    max-width: 500px;
}

.problem-scene {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.object-group {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    max-width: 250px;
}

.object-group img {
    width: 32px;
    height: 32px;
}

.label {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin: 8px 0;
}

.operator-symbol {
    font-size: 48pt;
    font-weight: bold;
    color: #FF9800;
}

.action {
    font-size: 13pt;
    font-weight: bold;
    color: #E91E63;
    margin-top: 8px;
}

.comparison-visual {
    margin: 15px auto;
    padding: 15px;
    background: #f8f9ff;
    border: 3px solid #2196F3;
    border-radius: 12px;
    max-width: 500px;
}

.comparison-row {
    display: flex;
    align-items: center;
    margin: 10px 0;
    gap: 8px;
}

.person-label {
    font-size: 15pt;
    font-weight: bold;
    color: #2c3e50;
    min-width: 90px;
}

.object-line {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
}

.object-line img {
    width: 32px;
    height: 32px;
}

.number-sentence {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 20px auto;
    padding: 15px;
    background: white;
    border: 3px solid #333;
    border-radius: 12px;
    max-width: 400px;
    font-size: 22pt;
    font-weight: bold;
}

.num {
    min-width: 45px;
    text-align: center;
    color: #2c3e50;
}

.op {
    font-size: 26pt;
    color: #FF9800;
}

.answer-prompt {
    font-size: 15pt;
    margin: 15px 0;
    font-weight: 600;
    text-align: center;
}

.answer-box {
    display: inline-block;
    min-width: 55px;
    height: 45px;
    border: 3px solid #333;
    border-radius: 8px;
    background: #FFF9C4;
    margin: 0 8px;
    vertical-align: middle;
}

.answer-line {
    display: inline-block;
    min-width: 80px;
    border-bottom: 2px solid #333;
    margin: 0 5px;
}

.answer-key {
    margin-top: 30px;
    padding: 15px;
    background: #f0f8ff;
    border: 2px solid #4169E1;
    border-radius: 10px;
    page-break-before: always;
}

.answer-key-title {
    font-size: 14pt;
    font-weight: bold;
    color: #2c3e50;
    margin: 0 0 10px 0;
    text-align: center;
}

.answer-key-content p {
    font-size: 12pt;
    margin: 6px 0;
    line-height: 1.5;
}
```

## ANSWER KEY (MANDATORY)

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 12 cars (7 + 5 = 12, addition)</p>
        <p><strong>2.</strong> 7 strawberries (12 − 5 = 7, subtraction)</p>
        <p><strong>3.</strong> 4 green apples (6 + 4 = 10, missing part)</p>
        <p><strong>4.</strong> 3 more pencils (9 − 6 = 3, comparison)</p>
        <p><strong>5.</strong> 9 books (8 + 6 − 5 = 9, two-step)</p>
    </div>
</div>
```

## SELF-VALIDATION CHECKLIST

Before returning HTML:
1. ✓ **Exactly {{questionCount}} questions?**
2. ✓ **Question 1 = Addition (result unknown)?**
3. ✓ **Question 2 = Subtraction (result unknown)?**
4. ✓ **Question 3 = Addition (part unknown)?**
5. ✓ **Question 4 = Comparison (difference unknown)?**
6. ✓ **Question 5 = Simple two-step problem?**
7. ✓ **Answer key present at bottom?**
8. ✓ **All numbers within 0-20?**
9. ✓ **WORKSHEET_OBJECTS used for visuals?**
10. ✓ **UK Year 1 curriculum aligned (ages 5-6)?**

**If ANY fails, STOP and regenerate.**

## OUTPUT FORMAT

Return complete HTML document with:
- Ultra-compact CSS (copy exactly from above)
- 5 questions following proven format EXACTLY
- Answer key at bottom
- Placeholders: {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}

**Generate NOW following ALL specifications above.**
