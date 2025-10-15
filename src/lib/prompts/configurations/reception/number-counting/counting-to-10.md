# Reception: Counting to 10 - Worksheet Generation Prompt

⚠️ **CRITICAL CONSTRAINT: Generate EXACTLY {{questionCount}} questions. NOT {{questionCount}}+1, NOT {{questionCount}}-1. EXACTLY {{questionCount}}.**

Create a Reception counting worksheet with EXACTLY {{questionCount}} questions.

## 🎓 RECEPTION PEDAGOGY (Ages 4-5) - NON-NEGOTIABLE RULES

### Rule 1: Number Range (CRITICAL)
- **ONLY use numbers 1-10** (NO exceptions - this is Reception ages 4-5)
- ❌ FORBIDDEN: 0, 11, 12, 15, 20, 100, 666, 333, 000, or ANY number <1 or >10
- ✅ ALLOWED: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ONLY
- ❌ NEVER use: "000", "100", "0" - these are NOT Reception-appropriate

### Rule 2: Question Count (CRITICAL)
- **Generate EXACTLY {{questionCount}} questions - NO MORE, NO LESS**
- ❌ NOT {{questionCount}} + 1 = {{questionCount}} is the MAXIMUM
- ❌ NOT {{questionCount}} - 1 = {{questionCount}} is the MINIMUM
- ✅ PRECISELY {{questionCount}} questions
- Count your questions before returning: 1, 2, 3, 4, 5 = {{questionCount}} questions

### Rule 3: One Object Type Per Question
- **Each question uses ONE object type ONLY**
- ❌ FORBIDDEN: "Count the apples AND oranges" (multiple objects)
- ❌ FORBIDDEN: "Emma has chickens and cows" (multiple animals)
- ✅ CORRECT: "Count the apples" (one object type)
- ✅ CORRECT: "How many flowers?" (one object type)

### Rule 4: Real-World Contexts
- **Use realistic, familiar scenarios**
- ✅ GOOD: "apples in a basket", "flowers in the garden", "books on the shelf"
- ❌ BAD: "666 school cows", "100 mice in flowerpots" (nonsensical)

### Rule 5: Visual Support Required
- **EVERY question MUST have images showing the objects**
- Use `.counting-objects-grid` for multiple objects
- Show the EXACT object mentioned in the question

## 📝 QUESTION GENERATION

### Question Templates:
1. **Simple Counting**: "How many [objects] are there?"
2. **Context Counting**: "Emma has [number] [objects]. How many [objects] does Emma have?"
3. **Visual Counting**: "Count the [objects]."

### Object Variety (Use DIFFERENT objects for each question):

**✅ VERIFIED VOCABULARY - 67 objects with confirmed working images:**

**🍎 Fruits (10 objects):**
- apples, bananas, oranges, strawberries, grapes, pears, lemons, watermelons, peaches, pineapples

**🌸 Garden & Nature (9 objects):**
- flowers, butterflies, bees, birds, trees, leaves, mushrooms, worms, acorns

**📚 School Supplies (9 objects):**
- books, pencils, erasers, crayons, markers, scissors, rulers, glue, backpacks

**🐄 Farm Animals (9 objects):**
- chickens, cows, sheep, pigs, horses, ducks, goats, geese, turkeys

**🧸 Toys (5 objects):**
- balls, cars, dolls, kites, blocks

**🥕 Vegetables (6 objects):**
- carrots, tomatoes, broccoli, cucumbers, peppers, potatoes

**⚽ Sports Equipment (5 objects):**
- footballs, basketballs, tennis balls, bats, medals

**🍪 Food & Treats (2 objects):**
- cookies, cupcakes

**⭐ Shapes & Objects (7 objects):**
- stars, hearts, circles, squares, diamonds, suns, moons

**🚗 Vehicles (5 objects):**
- cars, buses, bikes, trains, planes

**CRITICAL FRESHNESS STRATEGY:**
- **MANDATORY**: Vocabulary rotation system extracts objects from previous worksheets and creates FORBIDDEN list
- **TARGET**: 80%+ new vocabulary (system will provide forbidden list and priority categories)
- **NO OBJECT PRIORITIZATION**: All 68 objects have equal priority - system tracks usage automatically
- **ENFORCEMENT**: NEVER use objects from the FORBIDDEN list (system will inject this at generation time)
- The system automatically tracks which categories are least-used and suggests fresh options
- Your job: Select from the fresh categories provided, avoid forbidden objects completely

**Never repeat the same object type across questions!**

**NOTE:** All objects above have verified images in the WORKSHEET_OBJECTS directory. Using objects NOT in this list will result in broken images showing ALT tags instead of pictures.

## 🖼️ IMAGE GUIDANCE (CRITICAL - UPDATED STRUCTURE)

### ✅ WORKSHEET_OBJECTS Directory (Use ONLY these paths):

All images are now in the standardized WORKSHEET_OBJECTS directory with simple, intuitive naming:

```
/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png
```

**Path Examples:**
```
Fruits:     /images/WORKSHEET_OBJECTS/counting/fruits/apple.png
Garden:     /images/WORKSHEET_OBJECTS/counting/garden/flower.png
School:     /images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png
Farm:       /images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png
Toys:       /images/WORKSHEET_OBJECTS/counting/toys/ball.png
Vegetables: /images/WORKSHEET_OBJECTS/counting/vegetables/carrot.png
Sports:     /images/WORKSHEET_OBJECTS/counting/sports/football.png
Food:       /images/WORKSHEET_OBJECTS/counting/food_treats/cookie.png
Shapes:     /images/WORKSHEET_OBJECTS/counting/shapes/star.png
Vehicles:   /images/WORKSHEET_OBJECTS/counting/vehicles/bus.png
```

### Image-Question Matching Rules:
- Question mentions "apples" → Use `/images/WORKSHEET_OBJECTS/counting/fruits/apple.png`
- Question mentions "flowers" → Use `/images/WORKSHEET_OBJECTS/counting/garden/flower.png`
- Question mentions "pencils" → Use `/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png`
- Question mentions "tennis balls" → Use `/images/WORKSHEET_OBJECTS/counting/sports/tennis_ball.png` (underscores for multi-word)
- **NEVER use old SCRAPPING DOODLE paths** - they are deprecated
- **NEVER use random/unrelated images**

### HTML Structure for Images:
```html
<div class="counting-objects-grid">
  <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="80" height="80" alt="[Object]" />
  <!-- Repeat for the number of objects in the question -->
</div>
```

**Example for 5 apples:**
```html
<div class="counting-objects-grid">
  <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
  <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
  <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
  <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
  <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
</div>
```

## ✅ ANSWER KEY REQUIREMENT (CRITICAL - BLOCKER)

**🚨 MANDATORY: Every worksheet MUST include an answer key section at the bottom! 🚨**

Add this section AFTER all questions, BEFORE closing </body>:

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [answer]</p>
        <p><strong>2.</strong> [answer]</p>
        <p><strong>3.</strong> [answer]</p>
        <p><strong>4.</strong> [answer]</p>
        <p><strong>5.</strong> [answer]</p>
    </div>
</div>
```

**Example:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 7 pears</p>
        <p><strong>2.</strong> 5 butterflies</p>
        <p><strong>3.</strong> 9 markers</p>
        <p><strong>4.</strong> 6 corn</p>
        <p><strong>5.</strong> 8 stars</p>
    </div>
</div>
```

**Required CSS (add to <style> section):**
```css
.answer-key {
    margin-top: 40px;
    padding: 20px;
    background: #f0f8ff;
    border: 2px solid #4169E1;
    border-radius: 12px;
    page-break-before: always;
}
.answer-key-title {
    font-size: 16pt;
    font-weight: bold;
    color: #2c3e50;
    margin: 0 0 15px 0;
    text-align: center;
}
.answer-key-content p {
    font-size: 14pt;
    margin: 8px 0;
    line-height: 1.6;
}
```

**⚠️ FAILURE TO INCLUDE ANSWER KEY = AUTOMATIC WORKSHEET REJECTION**

## ✅ SELF-VALIDATION CHECKLIST

Before returning the HTML, verify:

1. ☑️ **Question Count (BLOCKER)**: Counted EXACTLY {{questionCount}} questions? Count them: Q1, Q2, Q3, Q4, Q5 = {{questionCount}}? (Not {{questionCount}}+1 or {{questionCount}}-1?)
2. ☑️ **Number Range (BLOCKER)**: All numbers between 1-10? (No 0, 11, 12, 15, 20, 100, 000, 666, etc.?)
3. ☑️ **Answer Key Present (BLOCKER)**: Does the worksheet have an answer key section at the bottom? (See requirements above!)
4. ☑️ **Single Object Rule**: Each question has ONE object type only? (No "apples and oranges"?)
5. ☑️ **Object Diversity**: Every question uses a DIFFERENT object? (No repeated apples/flowers/etc.?)
6. ☑️ **Real-World Scenarios**: All contexts are realistic? (No "666 school cows" or "100 apples"?)
7. ☑️ **Images Match Questions**: Images show the exact objects mentioned? (flowers for "flowers", not random frogs?)
8. ☑️ **WORKSHEET_OBJECTS Paths**: All image paths start with `/images/WORKSHEET_OBJECTS/counting/`?

If ANY checkbox fails, STOP and regenerate the worksheet.

## 🔥 FINAL VERIFICATION BEFORE SUBMITTING 🔥

Before you return your worksheet, STOP and perform these checks:

### 1. **Question Count Verification**
Count your `<div class="question">` elements:
- ✅ **Do you see exactly {{questionCount}} questions?** → PROCEED
- ❌ **Do you see MORE than {{questionCount}}?** → DELETE the extra ones
- ❌ **Do you see LESS than {{questionCount}}?** → ADD more questions

### 2. **Number Range Verification**
Scan ALL numbers in your questions:
- ✅ **Are ALL numbers between 1-10?** → PROCEED
- ❌ **Do you see 11, 12, 20, 100, or higher?** → REPLACE with numbers 1-10

### 3. **Object Type Verification**
Check each question:
- ✅ **Does each question mention only ONE type of object?** → PROCEED
- ❌ **Do you see "apples and oranges" or similar?** → REMOVE one object type

### 4. **Answer Key Verification**
Check the bottom of your worksheet:
- ✅ **Is there an `<div class="answer-key">` section?** → PROCEED
- ❌ **No answer key section?** → ADD IT NOW (see requirements above)

### 5. **Object Diversity Verification**
List the objects used in all {{questionCount}} questions:
- ✅ **Are they ALL DIFFERENT?** (e.g., pears, butterflies, markers, corn, stars) → PROCEED
- ❌ **Do you see the SAME object twice?** (e.g., apples in Q1 AND Q3) → CHANGE one

**CRITICAL REMINDER:**
This is RECEPTION - the youngest learners (ages 4-5).
They are just learning what numbers ARE.
Keep it simple, visual, concrete, and FUN!

**Final count: 1, 2, 3, 4, 5 questions = {{questionCount}} questions ✓**
**Plus 1 answer key section ✓**

## 📄 OUTPUT FORMAT

Return a complete HTML document:

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{topic}} - {{subtopic}}</title>
    <style>
        body {
            font-family: 'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif;
            font-size: 18pt;
            line-height: 1.8;
            margin: 0;
            padding: 30px;
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
        .student-info {
            display: flex;
            justify-content: space-between;
            margin: 8px 0 15px 0;
            font-size: 11pt;
            font-weight: bold;
        }
        .question {
            margin: 15px 0;
            padding: 15px;
            border-radius: 8px;
            background: #fafafa;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .question-number {
            font-size: 18pt;
            font-weight: bold;
            color: #2c3e50;
            margin-right: 10px;
        }
        .question-text {
            font-size: 18pt;
            line-height: 1.8;
            margin: 0;
        }
        .counting-objects-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin: 20px auto;
            padding: 16px;
            background: #f8f9ff;
            border-radius: 12px;
            max-width: 100%;
        }
        .counting-objects-grid img {
            width: 80px;
            height: 80px;
            object-fit: contain;
        }
        .answer-line {
            margin-top: 15px;
            font-size: 16pt;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1 class="worksheet-title">{{topic}} - {{subtopic}}</h1>
        <p class="subtitle">{{yearGroup}} | {{difficulty}}</p>
    </div>

    <div class="student-info">
        <span>Name: _______________</span>
        <span>Date: _______________</span>
    </div>

    <div class="worksheet-content">
        <!-- Generate {{questionCount}} questions here -->
    </div>
</body>
</html>
```

**Replace placeholders:**
- `{{topic}}` = "Number and Counting"
- `{{subtopic}}` = "Counting to 10"
- `{{yearGroup}}` = "Reception"
- `{{difficulty}}` = "{{difficulty}}"
- `{{questionCount}}` = {{questionCount}}

Generate the worksheet NOW following ALL rules above.
