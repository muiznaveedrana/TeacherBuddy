# Worksheet Generation Base Template

## IMAGE SYSTEM: WORKSHEET_OBJECTS

All images use path: `/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png`

**Categories:**
- fruits/ vegetables/ garden/ school_supplies/ farm_animals/ toys/ sports/ food_treats/ shapes/ vehicles/

**Image HTML:**
```html
<div class="counting-objects-grid">
  <img src="/images/WORKSHEET_OBJECTS/counting/{category}/{object}.png" width="80" height="80" alt="{Object}" />
  <!-- Repeat {count} times -->
</div>
```

## ANSWER KEY (MANDATORY)

```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> {answer}</p>
        <!-- Repeat for {{questionCount}} questions -->
    </div>
</div>
```

## HTML STRUCTURE

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
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1 class="worksheet-title">{{topic}} - {{subtopic}}</h1>
        <p class="subtitle">{{yearGroup}} | {{difficulty}}</p>
    </div>

    <div class="worksheet-content">
        <!-- Generate {{questionCount}} questions here -->
    </div>

    <!-- Add answer key section before </body> -->
</body>
</html>
```

## VALIDATION CHECKLIST

Before returning HTML, verify:
1. Question count = {{questionCount}} exactly
2. Answer key section present at bottom
3. All image paths start with `/images/WORKSHEET_OBJECTS/counting/`
4. Images match question objects
5. Each question has one object type only

If any check fails, regenerate worksheet.
