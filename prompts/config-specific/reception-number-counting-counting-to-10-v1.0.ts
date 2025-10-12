/**
 * Config-Specific Prompt: reception-number-counting-counting-to-10
 * Version: 1.0
 * Created: 2025-10-11
 *
 * Baseline Issues Addressed:
 * 1. Question count mismatch (expected 5, got 12) - CRITICAL BLOCKER
 * 2. Numbers beyond 1-10 (666, 333, 100, 12) - CRITICAL BLOCKER
 * 3. Multiple object types in single question - CRITICAL BLOCKER
 * 4. Reception-Specific Quality: 3.60/10 - NEEDS IMPROVEMENT
 * 5. Content-Config Match: 6/10 - BELOW THRESHOLD (target: 9/10)
 *
 * Target Improvements:
 * - Overall Score: 82.40 → ≥85/100
 * - Reception-Specific Quality: 3.60 → ≥8/10
 * - Content-Config Match: 6.00 → ≥9/10
 * - Quality Gate Pass Rate: 0% → ≥80%
 */

export const configSpecificPrompt = `
**🚨🚨🚨 RECEPTION COUNTING TO 10 - CRITICAL CONSTRAINTS 🚨🚨🚨**

**ABSOLUTE REQUIREMENT #1: EXACTLY 5 QUESTIONS**
- YOU MUST GENERATE EXACTLY 5 QUESTIONS
- NOT 6 QUESTIONS, NOT 7 QUESTIONS, NOT 12 QUESTIONS
- COUNT YOUR QUESTIONS: 1, 2, 3, 4, 5 - THEN STOP!
- FAILURE TO GENERATE EXACTLY 5 QUESTIONS = AUTOMATIC FAIL

**ABSOLUTE REQUIREMENT #2: NUMBERS 1-10 ONLY**
- RECEPTION children are learning to count from 1 to 10
- FORBIDDEN NUMBERS: Any number greater than 10 (11, 12, 20, 100, 333, 666, etc.)
- ALLOWED NUMBERS: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ONLY
- Every question MUST use numbers within 1-10 range
- If you see "100 apples" or "666 items" - YOU ARE DOING IT WRONG!

**ABSOLUTE REQUIREMENT #3: ONE OBJECT TYPE PER QUESTION**
- Each question uses ONE single object type only
- CORRECT: "Emma has 5 apples. Count the apples."
- WRONG: "Emma has 5 apples and 3 oranges. How many fruits?" (TWO OBJECT TYPES!)
- FORBIDDEN: Multiple object types in word problems (apples AND oranges, books AND pencils, etc.)
- Keep it simple: ONE object, ONE counting task

**RECEPTION-SPECIFIC REQUIREMENTS:**

**Age Group**: Reception (ages 4-5)
- First year of formal schooling
- Just learning to count and recognize numbers
- Need VERY simple, concrete, visual tasks
- Short attention span - keep questions brief

**Language Level**:
- Use VERY simple vocabulary (3-5 words per sentence maximum)
- Avoid complex sentences or multiple clauses
- Use familiar, everyday objects (apples, toys, flowers, cars)
- Short, clear instructions: "Count the apples." NOT "How many apples are there in total?"

**Visual Requirements**:
- EVERY question MUST have images
- Images MUST match the exact count (if question says 7 apples, show EXACTLY 7 apple images)
- Use Scrapping Doodle images (bright, colorful, child-friendly)
- Large, clear images suitable for 4-5 year olds
- Images BELOW the question text (not beside it)

**Question Types for "Counting to 10"**:
1. **Simple Counting**: "Count the [objects]." (with images showing 1-10 objects)
2. **Number Recognition**: "Circle the number [5]." (with numbers displayed)
3. **One-to-One Correspondence**: "How many [objects]?" (with exact count of images)
4. **Comparison (Simple)**: "Which has more?" (show 2 vs 5 objects)
5. **Missing Numbers**: "What comes after [3]?" (number sequence 1-10)

**Forbidden Question Types** (Too Advanced for Reception):
- Addition or subtraction (even simple like 2+1)
- Word problems with multiple steps
- Abstract reasoning
- Questions requiring writing full sentences
- Counting by 2s, 5s, or 10s (just straight counting 1-10)

**Image Selection for Counting Questions**:
- Use ONE object type per question (apples, pencils, flowers, cars, etc.)
- Rotate through different categories:
  * Q1: Fruit (apples, bananas, strawberries)
  * Q2: School items (pencils, books, crayons)
  * Q3: Animals (chickens, cows, butterflies)
  * Q4: Toys (balls, teddy bears, blocks)
  * Q5: Nature (flowers, trees, stars)

**Example of PERFECT Reception Counting Question**:
\`\`\`html
<div class="question">
  <h3 class="question-number">1</h3>
  <p class="question-text">Count the apples.</p>
  <div class="counting-objects-grid">
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
    <img src="/images/SCRAPPING DOODLE/Fruits/Apple_Red.png" width="80" height="80" alt="Red Apple" />
  </div>
  <div class="answer-line">Answer: ___</div>
</div>
\`\`\`

**Example of WRONG Question** (DO NOT DO THIS):
\`\`\`
❌ "Emma has 100 apples and picks 666 more. How many in total?"
   → WRONG: Numbers beyond 10, addition (too advanced), unrealistic scenario

❌ "Count the apples and oranges together."
   → WRONG: Multiple object types in one question

❌ "There are 12 pencils on the desk."
   → WRONG: Number 12 is beyond Reception range (1-10)
\`\`\`

**QUALITY CHECKLIST - VERIFY BEFORE GENERATING:**
☐ Exactly 5 questions (not 6, not 12, exactly 5!)
☐ All numbers are between 1-10 (no 11, 12, 20, 100, etc.)
☐ Each question uses ONE object type only
☐ Language is Reception-appropriate (simple, short sentences)
☐ Every question has visual support (images)
☐ Images match the exact count in the question
☐ Different object types across all 5 questions
☐ Scrapping Doodle image paths used (not old deleted paths)
☐ Images positioned BELOW question text (counting-objects-grid)
☐ Question types appropriate for "Counting to 10" subtopic

**FINAL REMINDER:**
This is RECEPTION - the youngest learners (ages 4-5).
They are just learning what numbers ARE.
Keep it simple, visual, concrete, and FUN!
Count: 1, 2, 3, 4, 5 questions - DONE!
`;

export const configMetadata = {
  configId: 'reception-number-counting-counting-to-10',
  version: '1.0',
  yearGroup: 'Reception',
  topic: 'Number and Counting',
  subtopic: 'Counting to 10',
  baselineScore: 82.40,
  targetScore: 85.00,
  criticalIssues: [
    'Question count mismatch (12 instead of 5)',
    'Numbers beyond 1-10 range',
    'Multiple object types per question',
    'Reception-inappropriate language complexity'
  ],
  createdDate: '2025-10-11',
  status: 'active'
};
