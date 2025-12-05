# Ages 6-7: Sharing and Grouping (INTERACTIVE-OPTIMISED V2)

**CRITICAL: EXACTLY {{questionCount}} questions. Every answer box MUST have a corresponding answer in the Answer Key.**

## MANDATORY THEME SELECTION (CRITICAL - READ FIRST)

**CHECK THE DIFFICULTY PARAMETER AND USE ONLY THAT THEME:**

**IF difficulty = "easy":**
- Title: "Sharing and Grouping: Party Time!"
- Q1: Share 🎈 balloons between children (12 ÷ 3 = 4)
- Q2: Group 🍬 sweets into bags (15 ÷ 5 = 3)
- Q4: Party Penny shares 🎁 presents
- Q5: Danny's party sharing puzzle

**IF difficulty = "average":**
- Title: "Sharing and Grouping: Garden Adventure!"
- Q1: Share 🌸 flowers into vases (20 ÷ 4 = 5)
- Q2: Group 🐝 bees into hives (18 ÷ 6 = 3)
- Q4: Gardener Grace shares 🌻 sunflowers
- Q5: Maya's garden grouping puzzle

**IF difficulty = "hard":**
- Title: "Sharing and Grouping: Sports Day!"
- Q1: Share ⚽ balls into bags (30 ÷ 5 = 6)
- Q2: Group 📖 books onto shelves (24 ÷ 4 = 6)
- Q4: Coach Carlos shares 🏅 medals
- Q5: Sam's team grouping puzzle

**FAILURE TO FOLLOW THE CORRECT THEME = INVALID WORKSHEET**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 2 FOCUS

- **Concept:** Division as sharing (partitive) and grouping (quotitive)
- **Partitive:** "Share X between Y" → find how many each
- **Quotitive:** "Put X into groups of Y" → find how many groups
- **Link:** Division is inverse of multiplication (2, 5, 10 times tables)
- **Interactive Priority:** All answers must be typed numbers
- **Key Misconception:** Confusing "share between 3" vs "groups of 3"

## QUESTION TYPES (CPA Progression)

**Q1**: Sharing visual - items shared between containers (1 answer)
**Q2**: Grouping visual - identify total, group size, number of groups (3 sub-questions)
**Q3**: Division calculations linked to multiplication (3 calculations)
**Q4**: Real-world word problem with themed character (1 answer)
**Q5**: Reasoning challenge - sharing vs grouping confusion (3 sub-questions)

## CSS (Compact - Interactive Optimised):
```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:12px;line-height:1.4;max-width:800px;margin:0 auto}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:2px solid #4169E1}
.worksheet-title{font-size:22pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:11pt;color:#666;margin-top:5px}
.question{margin:10px 0;padding:12px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:28px;height:28px;line-height:28px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:14pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px;font-weight:normal}

/* SHARING VISUAL */
.sharing-container{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.items-to-share{text-align:center;font-size:28pt;letter-spacing:3px;margin-bottom:10px}
.share-targets{display:flex;gap:15px;justify-content:center}
.share-box{border:3px dashed #9C27B0;border-radius:12px;padding:15px 25px;min-width:70px;text-align:center;background:#F3E5F5}
.share-label{font-size:12pt;color:#7B1FA2;font-weight:bold}

/* GROUPING VISUAL */
.grouping-container{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;margin:15px 0;padding:15px;background:#FAFAFA;border-radius:8px}
.group-circle{border:3px solid #1976D2;border-radius:50%;padding:15px;display:flex;gap:5px;flex-wrap:wrap;justify-content:center;align-items:center;min-width:80px;min-height:80px;background:#E3F2FD}
.group-emoji{font-size:22pt}

/* CALCULATION BOX */
.calc-container{background:#F5F5F5;border-radius:8px;padding:15px;margin:15px 0;text-align:center}
.calc-line{font-size:18pt;margin:10px 0}

/* CONTEXT BOX */
.context-box{background:#FFF3E0;border:2px solid #FF9800;border-radius:10px;padding:15px;margin:15px 0;text-align:center}
.context-icon{font-size:36pt;margin-bottom:10px}
.context-number{font-size:24pt;font-weight:bold;color:#E65100}
.context-story{font-size:14pt;color:#333;margin:10px 0}
.character-name{font-weight:bold;color:#1976D2}

/* REASONING BOX */
.reasoning-box{background:#E8F5E9;border:2px solid #4CAF50;border-radius:8px;padding:15px;margin:15px 0}
.character-speech{display:flex;gap:15px;align-items:flex-start}
.character-icon{width:50px;height:50px;background:#C8E6C9;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24pt;flex-shrink:0}
.speech-bubble{background:#FFF;border:2px solid #66BB6A;border-radius:10px;padding:12px;flex:1;position:relative}
.speech-bubble::before{content:'';position:absolute;left:-12px;top:15px;border-width:8px;border-style:solid;border-color:transparent #66BB6A transparent transparent}

/* ANSWER ELEMENTS */
.answer-box{display:inline-block;min-width:55px;height:40px;border:3px solid #333;border-radius:8px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:3px solid #333;border-radius:6px;background:#FFF9C4;vertical-align:middle;margin:0 3px}

/* ANSWER KEY */
.answer-key{margin-top:30px;padding:15px;background:#f0f8ff;border:2px solid #4169E1;border-radius:10px;page-break-before:always}
.answer-key h2{font-size:14pt;font-weight:bold;color:#2c3e50;margin:0 0 10px 0;text-align:center}
.answer-key p{font-size:12pt;margin:5px 0;line-height:1.6}
```

## TEMPLATES

### Q1: Sharing Visual (Partitive Division)
```html
<div class="question" style="background:#FFF9C4">
  <p class="question-text"><span class="question-number">1</span> Share the balloons equally between the children.</p>
  <div class="sharing-container">
    <div class="items-to-share">🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈</div>
    <div class="share-targets">
      <div class="share-box"><span class="share-label">Child 1</span></div>
      <div class="share-box"><span class="share-label">Child 2</span></div>
      <div class="share-box"><span class="share-label">Child 3</span></div>
    </div>
  </div>
  <p class="sub-question">How many balloons does each child get? <span class="answer-box"></span> balloons</p>
</div>
```

### Q2: Grouping Visual (Quotitive Division - THREE sub-questions)
```html
<div class="question" style="background:#E3F2FD">
  <p class="question-text"><span class="question-number">2</span> Look at the sweets in bags. Fill in the blanks.</p>
  <div class="grouping-container">
    <div class="group-circle"><span class="group-emoji">🍬🍬🍬🍬🍬</span></div>
    <div class="group-circle"><span class="group-emoji">🍬🍬🍬🍬🍬</span></div>
    <div class="group-circle"><span class="group-emoji">🍬🍬🍬🍬🍬</span></div>
  </div>
  <p class="sub-question">a) How many sweets altogether? <span class="answer-box-small"></span></p>
  <p class="sub-question">b) How many in each bag? <span class="answer-box-small"></span></p>
  <p class="sub-question">c) 15 ÷ 5 = <span class="answer-box"></span> bags</p>
</div>
```

### Q3: Division Calculations (Link to Multiplication)
```html
<div class="question" style="background:#F1F8E9">
  <p class="question-text"><span class="question-number">3</span> Work out these divisions.</p>
  <div class="calc-container">
    <p class="calc-line">a) 10 ÷ 2 = <span class="answer-box"></span></p>
    <p class="calc-line">b) 20 ÷ 5 = <span class="answer-box"></span></p>
    <p class="calc-line">c) 30 ÷ 10 = <span class="answer-box"></span></p>
  </div>
</div>
```

### Q4: Word Problem (THEMED)
```html
<div class="question" style="background:#FCE4EC">
  <p class="question-text"><span class="question-number">4</span> Read and solve.</p>
  <div class="context-box">
    <div class="context-icon">🎁</div>
    <p class="context-story"><span class="character-name">Party Penny</span> has <strong>20 presents</strong>.</p>
    <p class="context-story">She shares them equally between <strong>4 children</strong>.</p>
    <div class="context-number">20 presents ÷ 4 children</div>
  </div>
  <p class="sub-question">How many presents does each child get? <span class="answer-box"></span> presents</p>
</div>
```

### Q5: Reasoning Challenge (Tests Misconception)
```html
<div class="question" style="background:#FFF3E0">
  <p class="question-text"><span class="question-number">5</span> Look at what Danny says.</p>
  <div class="reasoning-box">
    <div class="character-speech">
      <div class="character-icon">👦</div>
      <div class="speech-bubble">
        <p style="margin:0"><strong>Danny says:</strong> "12 shared between 4 gives the same answer as 12 in groups of 3"</p>
      </div>
    </div>
  </div>
  <p class="sub-question">a) Is Danny correct? <span class="answer-box-small"></span> (Yes / No)</p>
  <p class="sub-question">b) 12 ÷ 4 = <span class="answer-box"></span></p>
  <p class="sub-question">c) 12 ÷ 3 = <span class="answer-box"></span></p>
</div>
```

## THEME VARIATIONS FOR 3 WORKSHEETS

### Worksheet 1 (Easy - Party Theme)
**Characters**: Party Penny, Danny

| Q | Details |
|---|---------|
| Q1 | Share 12 balloons 🎈 between 3 children (4 each) |
| Q2 | 15 sweets 🍬 in bags of 5 → a)15 b)5 c)3 bags |
| Q3 | a)10÷2=5 b)20÷5=4 c)30÷10=3 |
| Q4 | Party Penny: 20 presents 🎁 ÷ 4 children = 5 each |
| Q5 | "12÷4 same as 12÷3?" - NO! (3 vs 4) |

**Answer Key**:
- Q1: 4 (12 ÷ 3 = 4 balloons each)
- Q2: a) 15  b) 5  c) 3
- Q3: a) 5  b) 4  c) 3
- Q4: 5 presents (20 ÷ 4 = 5)
- Q5: a) No  b) 3  c) 4 (different answers - sharing between 4 vs groups of 3)

### Worksheet 2 (Average - Garden Theme)
**Characters**: Gardener Grace, Maya

| Q | Details |
|---|---------|
| Q1 | Share 20 flowers 🌸 between 4 vases (5 each) |
| Q2 | 18 bees 🐝 in groups of 6 → a)18 b)6 c)3 hives |
| Q3 | a)20÷2=10 b)25÷5=5 c)40÷10=4 |
| Q4 | Gardener Grace: 30 sunflowers 🌻 ÷ 5 pots = 6 each |
| Q5 | "18÷6 same as 18÷3?" - NO! (3 vs 6) |

**Answer Key**:
- Q1: 5 (20 ÷ 4 = 5 flowers each)
- Q2: a) 18  b) 6  c) 3
- Q3: a) 10  b) 5  c) 4
- Q4: 6 sunflowers (30 ÷ 5 = 6)
- Q5: a) No  b) 3  c) 6 (different answers - sharing between 6 vs groups of 3)

### Worksheet 3 (Hard - Sports Theme)
**Characters**: Coach Carlos, Sam

| Q | Details |
|---|---------|
| Q1 | Share 30 balls ⚽ between 5 bags (6 each) |
| Q2 | 24 books 📖 on shelves of 4 → a)24 b)4 c)6 shelves |
| Q3 | a)30÷2=15 b)35÷5=7 c)60÷10=6 |
| Q4 | Coach Carlos: 40 medals 🏅 ÷ 8 winners = 5 each |
| Q5 | "24÷8 same as 24÷3?" - NO! (3 vs 8) |

**Answer Key**:
- Q1: 6 (30 ÷ 5 = 6 balls each)
- Q2: a) 24  b) 4  c) 6
- Q3: a) 15  b) 7  c) 6
- Q4: 5 medals (40 ÷ 8 = 5)
- Q5: a) No  b) 3  c) 8 (different answers - sharing between 8 vs groups of 3)

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 5 (20 ÷ 4 = 5 flowers each)</p>
  <p><strong>2.</strong> a) 18 &nbsp; b) 6 &nbsp; c) 3</p>
  <p><strong>3.</strong> a) 10 &nbsp; b) 5 &nbsp; c) 4</p>
  <p><strong>4.</strong> 6 sunflowers (30 ÷ 5 = 6)</p>
  <p><strong>5.</strong> a) No &nbsp; b) 3 &nbsp; c) 6 (different answers - not equal!)</p>
</div>
```

## RULES

1. **EXACTLY {{questionCount}} questions** - no more, no less
2. **Every answer box needs an answer** in the Answer Key
3. **Sub-questions use letters** (a, b, c) - each gets its own answer in key
4. **Q2 has THREE sub-questions**: total, group size, division result
5. **Q3 has THREE division calculations**: using 2, 5, 10 times tables
6. **Q5 tests sharing vs grouping misconception** - answer is always NO
7. **Themed characters** - use names from theme variation
8. **Use emojis** for items matching the theme
9. **NO drawing activities** - all answers typed in boxes
10. **NO "circle" or "draw lines" instructions** - use answer boxes only

## VALIDATION CHECKLIST

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Q1: Sharing visual with ONE answer box (items each)?
- [ ] Q2: Grouping visual with THREE sub-questions (a, b, c)?
- [ ] Q3: THREE division calculations (a, b, c)?
- [ ] Q4: Themed word problem with character name?
- [ ] Q5: Reasoning with THREE answers (Yes/No + two calculations)?
- [ ] ALL answer boxes use `.answer-box` or `.answer-box-small` class?
- [ ] Answer key uses a) b) c) format for multi-part questions?
- [ ] NO drawing activities?
- [ ] Total answer count: 1 + 3 + 3 + 1 + 3 = 11 answers?

Generate complete HTML. UK Year 2 aligned. Use themed characters throughout.
