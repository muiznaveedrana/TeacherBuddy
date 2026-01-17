# Ages 7-8: Understanding Tenths (MIXED-LAYOUT)

Generate a UK Year 3 worksheet on understanding tenths.

**CRITICAL: EXACTLY {{questionCount}} questions. Each answer box MUST have a corresponding answer in the Answer Key.**

## Layout Structure (MANDATORY)

```
SECTION A: FLUENCY (Q1-Q2)
├── Q1: Count in tenths (1/10, 2/10, 3/10...)
└── Q2: Identify tenths from division by 10

SECTION B: APPLICATION (Q3-Q4)
├── Q3: Word problems with tenths
└── Q4: Represent tenths on diagrams

SECTION C: REASONING (Q5)
└── Q5: Explain or compare tenths
```

## Understanding Tenths Focus

**Key Concepts:**
- Tenths come from dividing into 10 equal parts
- 1/10 = one tenth = 0.1
- Counting: 1/10, 2/10, 3/10... 10/10 = 1 whole
- Division connection: 1 ÷ 10 = 1/10

**Number Ranges:**
- Foundation: Count in tenths up to 1 whole, simple ÷10
- Practice: Count beyond 1 whole, connect to decimals

## CSS Styles (Include in every worksheet)

```css
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:14pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
.worksheet-header{text-align:center;margin-bottom:15px;padding-bottom:10px;border-bottom:3px solid #4169E1}
.worksheet-title{font-size:20pt;color:#2c3e50;margin:0}
.worksheet-details{font-size:10pt;color:#666;margin-top:5px}
.layout-badge{display:inline-block;background:#9C27B0;color:white;padding:2px 8px;border-radius:10px;font-size:9pt;margin-left:10px}
.section-header{display:flex;align-items:center;gap:10px;margin:15px 0 8px 0;padding:6px 10px;border-radius:6px;font-weight:bold}
.section-letter{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:white;font-size:12pt}
.section-title{font-size:12pt}
.section-fluency{background:#E3F2FD;border-left:4px solid #2196F3}
.section-fluency .section-letter{background:#2196F3}
.section-application{background:#F3E5F5;border-left:4px solid #9C27B0}
.section-application .section-letter{background:#9C27B0}
.section-reasoning{background:#FFF3E0;border-left:4px solid #FF9800}
.section-reasoning .section-letter{background:#FF9800}
.question{margin:10px 0;padding:12px;border-radius:8px}
.q-fluency{background:#E3F2FD}
.q-application{background:#F3E5F5}
.q-reasoning{background:#FFF3E0}
.question-number{display:inline-block;background:#4169E1;color:white;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:12pt}
.question-text{font-size:14pt;margin:5px 0;font-weight:600}
.sub-question{font-size:13pt;margin:8px 0 8px 10px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.fraction-bar{display:flex;gap:2px;margin:10px 0}
.tenth-box{width:30px;height:30px;border:2px solid #333;display:inline-block}
.tenth-shaded{background:#4169E1}
.answer-box-small{display:inline-block;min-width:40px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px;text-align:center;font-family:monospace;font-size:14pt}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
```

## Theme Variations

### Foundation 1 - Pizza Theme
- Characters: Pizza Pete, Customer Cara
- Context: Pizza slices, toppings
- Focus on visual tenths, counting

### Foundation 2 - Chocolate Theme
- Characters: Chocolatier Charlie, Taster Tara
- Context: Chocolate bars divided into tenths
- Focus on simple ÷10

### Practice 1 - Ribbon Theme
- Characters: Crafter Carly, Helper Harry
- Context: Ribbons, lengths in tenths
- Full counting sequences

### Practice 2 - Race Theme
- Characters: Runner Rosie, Coach Carlos
- Context: Race track in tenths
- Connecting to context

### Practice 3 - Garden Theme
- Characters: Gardener Grace, Helper Hugo
- Context: Garden plots in tenths
- More complex problems

### Practice 4 - Music Theme
- Characters: Musician Mia, Band Leader Ben
- Context: Music bars, rhythm in tenths
- Challenging reasoning

## Answer Key Format

```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> a) 3/10 &nbsp; b) 7/10 &nbsp; c) 10/10 or 1</p>
  <p><strong>2.</strong> a) 1/10 &nbsp; b) 3/10</p>
  <p><strong>3.</strong> 4/10</p>
  <p><strong>4.</strong> 6 shaded</p>
  <p><strong>5.</strong> 5/10 (explanation varies)</p>
</div>
```

## Quality Checks

- [ ] Exactly 5 questions (Q1-Q5)
- [ ] Section A has Q1-Q2 (Fluency - blue)
- [ ] Section B has Q3-Q4 (Application - purple)
- [ ] Section C has Q5 (Reasoning - orange)
- [ ] Tenths written correctly (1/10, 2/10, etc.)
- [ ] Division by 10 connects to tenths
- [ ] Visual representations are clear
- [ ] Answer key matches all input boxes
