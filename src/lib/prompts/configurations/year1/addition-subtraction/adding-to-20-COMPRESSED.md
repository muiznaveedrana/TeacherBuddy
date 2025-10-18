# Year 1: Adding to 20 (COMPRESSED)

Generate EXACTLY {{questionCount}} Year 1 adding to 20 questions.

## CRITICAL RULES

**Sums:** 0-20 only (addends 0-12)
**Questions:** EXACTLY {{questionCount}} - count before returning
**Strategies:** Count all, count on, make 10, doubles, near doubles
**Visual:** Object arrays, number lines, ten-frames

## 5-QUESTION FORMAT

**Q1:** Picture addition - count all (two groups of objects, find sum)
**Q2:** Number line addition (start point, jump forward, find end)
**Q3:** Ten-frame addition - bridging 10 (use double ten-frames)
**Q4:** Missing addend (given sum and one addend, find other)
**Q5:** Word problem with WORKSHEET_OBJECTS (real-world context)

## KEY STRATEGIES

- **Doubles:** 5+5, 6+6, 7+7, 8+8, 9+9
- **Near doubles:** 6+7 is 6+6+1
- **Make 10:** 8+5 = 8+2+3 = 10+3 = 13
- **Count on:** Start from larger number

## OBJECTS (WORKSHEET_OBJECTS)

Fruits: apple, banana, orange, strawberry
Toys: car, ball, teddy bear, doll, kite
School: pencil, book, crayon
Animals: farm animals for word problems

## EXAMPLE OUTPUT

**Q1 (Picture Addition):**
```html
<div class="question" style="background: #FFF9C4;">
    <p class="question-text"><span class="question-number">1.</span> Add the apples. How many in total?</p>
    <div class="picture-addition">
        <div class="group-container">
            <div class="addend-group">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <p class="group-label">5 apples</p>
            </div>
            <div class="plus-symbol">+</div>
            <div class="addend-group">
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="45" height="45" alt="Apple" />
                <p class="group-label">3 apples</p>
            </div>
        </div>
    </div>
    <div class="addition-equation">
        <span class="number">5</span>
        <span class="operator">+</span>
        <span class="number">3</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>
</div>
```

**Q3 (Ten-Frame Bridging):**
```html
<div class="question" style="background: #F1F8E9;">
    <p class="question-text"><span class="question-number">3.</span> Use the ten-frames to add.</p>
    <div class="ten-frame-addition">
        <div class="double-ten-frame">
            <div class="frame-section">
                <p class="frame-label">8</p>
                <div class="ten-frame">
                    <div class="frame-row">
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                    </div>
                    <div class="frame-row">
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                </div>
            </div>
            <div class="frame-section">
                <p class="frame-label">6</p>
                <div class="ten-frame">
                    <div class="frame-row">
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell filled"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                    <div class="frame-row">
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                        <div class="frame-cell empty"></div>
                    </div>
                </div>
            </div>
        </div>
        <p class="strategy-hint">8 + 2 = 10, then 10 + 4 = ?</p>
    </div>
    <div class="addition-equation">
        <span class="number">8</span>
        <span class="operator">+</span>
        <span class="number">6</span>
        <span class="operator">=</span>
        <span class="answer-box"></span>
    </div>
</div>
```

**Answer Key:**
```html
<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> 8 (5 + 3)</p>
        <p><strong>2.</strong> 12 (7 + 5, number line)</p>
        <p><strong>3.</strong> 14 (8 + 6, bridging 10)</p>
        <p><strong>4.</strong> 6 (7 + ? = 13)</p>
        <p><strong>5.</strong> 14 cars (9 + 5 word problem)</p>
    </div>
</div>
```

Replace {{topic}}, {{subtopic}}, {{yearGroup}}, {{difficulty}}, {{questionCount}} with actual values.

Generate worksheet NOW.
