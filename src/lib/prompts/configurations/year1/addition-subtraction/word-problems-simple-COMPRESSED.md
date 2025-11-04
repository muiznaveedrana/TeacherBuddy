# Year 1: Simple Word Problems (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 simple word problems (addition/subtraction).

## Background Colors - MANDATORY
Q1=#FFF9C4, Q2=#F1F8E9, Q3=#E3F2FD, Q4=#FCE4EC, Q5=#FFF3E0

## CRITICAL RULES

**Operations:** Addition and subtraction within 20
**Questions:** EXACTLY {{questionCount}} - count before returning
**Language:** Simple, 1-2 sentences, clear action words
**Visual:** Image illustrations, number sentences

**IMPORTANT - NO COLOR DESCRIPTORS:**
- ❌ NEVER use color adjectives for objects (NO "red cars", "blue apples", "green pencils")
- ✓ Use quantity-only descriptions ("6 cars", "6 more cars")
- ✓ OR use DIFFERENT object types when showing two groups ("6 cars and 5 balls")
- **Reason:** We only have generic object images (car.png, not red-car.png)

## 5-QUESTION FORMAT

**Q1:** Addition word problem - combining (join sets, result unknown)
**Q2:** Subtraction word problem - taking away (remove items, result unknown)
**Q3:** Addition word problem - part unknown (total given, find missing part)
**Q4:** Comparison problem (how many more/fewer)
**Q5:** Two-step simple problem (add then subtract or vice versa)

## ACTION WORDS

**Addition:** has, gets, buys, finds, picks, receives
**Subtraction:** gives away, eats, loses, flies away, sells
**Comparison:** more than, fewer than, less than

## OBJECTS - `/images/{object}.png`

**Toys**: car,ball,doll
**Fruits**: apple,banana,orange,strawberry
**School**: pencil,book,crayon
**Farm Animals**: chicken,cow,sheep,pig,horse,goat,duck,goose,turkey
**Names**: Ben,Emma,Sam,Lily,Jack,Sophie

## EXAMPLE OUTPUT

**Q1 (Addition - Combining):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Ben has 7 toy cars. Emma gives him 5 more cars. How many cars does Ben have now?</p>
    <div class="word-problem-visual">
        <div class="problem-scene">
            <div class="object-group">
                <p class="label">Ben's cars (7)</p>
                <!-- Repeat car.png 7 times -->
            </div>
            <div class="operator-symbol">+</div>
            <div class="object-group">
                <p class="label">Emma gives (5)</p>
                <!-- Repeat car.png 5 times -->
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">7</span> <span class="op">+</span> <span class="num">5</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt">Ben has <span class="answer-line"></span> cars.</p>
</div>
```

**Q2 (Subtraction - Taking Away):**
```html
<div class="question" style="background: #E3F2FD;">
    <p class="question-text"><span class="question-number">2.</span> Lily had 12 strawberries. She ate 5. How many strawberries are left?</p>
    <div class="word-problem-visual">
        <div class="problem-scene">
            <div class="object-group">
                <p class="label">Lily's strawberries (12)</p>
                <!-- Repeat strawberry.png 12 times -->
                <p class="action">She ate 5</p>
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">12</span> <span class="op">−</span> <span class="num">5</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt"><span class="answer-line"></span> strawberries are left.</p>
</div>
```

**Q4 (Comparison - How Many More):**
```html
<div class="question" style="background: #FCE4EC;">
    <p class="question-text"><span class="question-number">4.</span> Sam has 9 pencils. Jack has 6 pencils. How many more pencils does Sam have?</p>
    <div class="comparison-visual">
        <div class="comparison-row">
            <p class="person-label">Sam (9)</p>
            <div class="object-line">
                <!-- Repeat pencil.png 9 times -->
            </div>
        </div>
        <div class="comparison-row">
            <p class="person-label">Jack (6)</p>
            <div class="object-line">
                <!-- Repeat pencil.png 6 times -->
            </div>
        </div>
    </div>
    <div class="number-sentence">
        <span class="num">9</span> <span class="op">−</span> <span class="num">6</span> <span class="op">=</span> <span class="answer-box"></span>
    </div>
    <p class="answer-prompt">Sam has <span class="answer-line"></span> more pencils.</p>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 12 cars (7 + 5 = 12)</p>
        <p><strong>2.</strong> 7 strawberries (12 − 5 = 7)</p>
        <p><strong>3.</strong> 4 apples (10 − 6 = 4, missing part)</p>
        <p><strong>4.</strong> 3 more pencils (9 − 6 = 3, comparison)</p>
        <p><strong>5.</strong> 9 books (14 − 5 = 9, two-step)</p>
    </div>
</div>
```

## CSS
```css
<style>
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:20px}
.question{margin:10px 0;padding:12px;border-radius:8px}
.question-number,.question-text{font-size:16pt;font-weight:600;display:inline}
.word-problem-visual{margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #9C27B0;border-radius:12px;max-width:500px}
.problem-scene{display:flex;align-items:flex-start;justify-content:center;gap:15px;flex-wrap:wrap}
.object-group{text-align:center;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;max-width:250px}
.object-group img{width:32px;height:32px}
.label{font-size:14pt;font-weight:bold;margin-bottom:10px}
.operator-symbol{font-size:48pt;font-weight:bold;color:#FF9800}
.action{font-size:13pt;font-weight:bold;color:#F44336;margin-top:10px}
.comparison-visual{margin:15px auto;padding:15px;background:#f8f9ff;border:3px solid #E91E63;border-radius:12px;max-width:500px}
.comparison-row{display:flex;align-items:center;margin:10px 0;gap:8px}
.person-label{font-size:14pt;font-weight:bold;min-width:90px}
.object-line{display:flex;gap:4px;flex-wrap:wrap}
.object-line img{width:32px;height:32px}
.number-sentence{display:flex;align-items:center;justify-content:center;gap:15px;margin:20px auto;padding:15px;background:white;border:3px solid #333;border-radius:12px;max-width:400px;font-size:24pt;font-weight:bold}
.num{min-width:50px;text-align:center}
.op{font-size:28pt;color:#FF9800}
.answer-box{display:inline-block;min-width:60px;height:50px;border:3px solid #333;border-radius:8px;background:#FFF9C4}
.answer-prompt{font-size:15pt;margin:15px 0;font-weight:600;text-align:center}
.answer-line{display:inline-block;min-width:50px;border-bottom:2px solid #333;margin:0 5px}
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px}
.answer-key-title{font-size:14pt;font-weight:bold;margin:0 0 10px 0;text-align:center}
.answer-key-content p{font-size:12pt;margin:6px 0}
</style>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
