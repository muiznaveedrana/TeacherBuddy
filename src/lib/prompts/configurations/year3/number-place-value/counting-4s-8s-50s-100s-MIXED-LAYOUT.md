# Ages 7-8: Counting in 4s, 8s, 50s and 100s (MIXED LAYOUT)

Generate EXACTLY 5 Year 3 number and place value questions using the **Mixed Layout** structure.

## MIXED LAYOUT STRUCTURE (MANDATORY)

**Section A: Fluency (Q1-Q2)** - Quick recall, basic skills
**Section B: Application (Q3-Q4)** - Real-world context, word problems
**Section C: Reasoning (Q5)** - True/False, explain thinking, find mistakes

## Background Colors
Q1=#E3F2FD (Fluency), Q2=#E3F2FD (Fluency), Q3=#F3E5F5 (Application), Q4=#F3E5F5 (Application), Q5=#FFF3E0 (Reasoning)

## CURRICULUM (Year 3)
- **Range:** Counting in steps of 4, 8, 50, and 100
- **Key skills:**
  - Count forwards and backwards in multiples
  - Continue number sequences
  - Find missing numbers in sequences
  - Identify the step/rule in a sequence
- **Key vocabulary:** count in, multiples, sequence, pattern, step, forwards, backwards, next, previous
- **Key concepts:**
  - Counting in 4s: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40... (links to 4× table)
  - Counting in 8s: 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80... (links to 8× table)
  - Counting in 50s: 0, 50, 100, 150, 200, 250, 300, 350, 400... (links to place value)
  - Counting in 100s: 0, 100, 200, 300, 400, 500, 600... (links to place value)
  - Sequences can start from any number, not just 0
- **Key misconceptions:**
  - Confusing counting in 4s with counting in 8s
  - Difficulty counting backwards (e.g., 24, 20, 16, 12...)
  - Errors when crossing hundred boundaries (e.g., 96, 100, 104)
  - Confusing counting in 50s with counting in 5s
  - Not recognising that 8 is double 4 (so every other multiple of 4 is a multiple of 8)

## CSS (Compact - Mixed Layout)
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
.sequence-box{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:15px 0}
.sequence-number{display:inline-block;background:#fff;border:3px solid #4169E1;border-radius:10px;padding:10px 15px;font-size:18pt;font-weight:bold;min-width:50px;text-align:center}
.sequence-blank{display:inline-block;background:#FFF9C4;border:3px solid #333;border-radius:10px;padding:10px 15px;font-size:18pt;font-weight:bold;min-width:50px;text-align:center}
.number-track{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin:15px 0}
.track-cell{display:inline-block;border:2px solid #666;padding:8px 12px;font-size:14pt;font-weight:bold;text-align:center;min-width:40px}
.track-highlight{background:#FFF176}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:13pt;color:#333;line-height:1.5}
.scene-box{background:#FAFAFA;border-radius:8px;padding:12px;margin:10px 0;text-align:center}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:12px;padding:10px;margin:8px 0;position:relative}
.answer-box-small{display:inline-block;min-width:45px;height:28px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:80px;height:32px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:13pt;font-weight:bold;color:#2c3e50;margin:0 0 8px 0;text-align:center}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
.step-label{display:inline-block;background:#9C27B0;color:white;padding:3px 10px;border-radius:15px;font-size:11pt;margin:5px}
.arrow{font-size:18pt;color:#666;margin:0 5px}
```

## QUESTION TYPE OPTIONS

### Q1 OPTIONS (Fluency - Pick ONE):
- **Continue sequence forwards**: Given start, continue in 4s/8s/50s/100s
- **Continue sequence backwards**: Count backwards in steps
- **Fill missing numbers**: Complete a sequence with gaps

### Q2 OPTIONS (Fluency - Pick ONE):
- **Mixed sequences**: Different step sizes in sub-questions
- **Identify the rule**: "What are we counting in?"
- **Number track highlight**: Shade multiples on a number track

### Q3 OPTIONS (Application - Pick ONE):
- **Real-world counting**: Count items in groups (e.g., legs on spiders = 8s)
- **Money context**: Counting in 50p or £1 coins
- **Time context**: Minutes in 4s, hours in 100s of a day

### Q4 OPTIONS (Application - Pick ONE):
- **Story problem**: Character counting in steps
- **Pattern spotting**: Find the pattern in real contexts
- **Reach target**: "How many steps of 8 to reach 64?"

### Q5 OPTIONS (Reasoning - Pick ONE):
- **True or False**: Statements about sequences
- **Spot the mistake**: Incorrect sequence given
- **Explain thinking**: "Why is 25 NOT in the sequence counting in 4s?"

## 6 WORKSHEET VARIATIONS

### WS1: Zoo Safari (Easy - focus on 4s)
| Q | Type | Details |
|---|------|---------|
| Q1 | Continue forwards | Count in 4s: 4, 8, 12, ___, ___, ___ |
| Q2 | Fill missing numbers | Sequence in 4s with gaps |
| Q3 | Animal legs | Count legs on animals (4 legs each) |
| Q4 | Story context | Zookeeper counts in 4s |
| Q5 | True or False | "20 is in the 4s sequence" |

### WS2: Spider Web (Easy-Medium - focus on 8s)
| Q | Type | Details |
|---|------|---------|
| Q1 | Continue forwards | Count in 8s: 8, 16, 24, ___, ___, ___ |
| Q2 | Identify the rule | "What step are we counting in?" |
| Q3 | Spider legs | Count legs on spiders (8 legs each) |
| Q4 | Reach target | "How many jumps of 8 to reach 40?" |
| Q5 | Spot the mistake | Find error in 8s sequence |

### WS3: Piggy Bank (Medium - focus on 50s)
| Q | Type | Details |
|---|------|---------|
| Q1 | Continue forwards | Count in 50s: 50, 100, 150, ___, ___, ___ |
| Q2 | Backwards counting | Count back in 50s from 400 |
| Q3 | Money context | Counting 50p coins |
| Q4 | Story problem | Saving money, adding 50p each week |
| Q5 | True or False | "250 is in the 50s sequence" |

### WS4: Number Explorers (Medium - focus on 100s)
| Q | Type | Details |
|---|------|---------|
| Q1 | Continue forwards | Count in 100s: 100, 200, 300, ___, ___, ___ |
| Q2 | Mixed: forwards and backwards | Both directions in 100s |
| Q3 | Distance context | Kilometres on a journey (100km steps) |
| Q4 | Pattern spotting | "What do all these numbers have in common?" |
| Q5 | Explain thinking | "Why is 450 NOT in the 100s sequence from 0?" |

### WS5: Sports Day (Medium-Hard - mixed steps)
| Q | Type | Details |
|---|------|---------|
| Q1 | Mixed sequences | a) 4s, b) 8s, c) 50s |
| Q2 | Identify the step | Multiple sequences - name the step |
| Q3 | Real-world context | Points scored (4s or 8s), distances (50s/100s) |
| Q4 | Multi-step problem | Combining counting patterns |
| Q5 | Always/Sometimes/Never | Statements about multiple sequences |

### WS6: Robot Factory (Hard - all patterns combined)
| Q | Type | Details |
|---|------|---------|
| Q1 | Continue from non-zero | Sequences starting from different numbers |
| Q2 | Backwards from larger numbers | Count back in 4s/8s/50s/100s |
| Q3 | Complex application | Factory produces items in batches |
| Q4 | Multi-step problem | Compare different counting patterns |
| Q5 | Explain reasoning | "Both sequences include 200. Explain why." |

## TEMPLATES

**CRITICAL: All answer boxes MUST use `<input type="text">` elements with `data-answer` attributes for interactive functionality.**

### Sequence Template (Forwards):
```html
<div class="sequence-box">
  <span class="sequence-number">4</span>
  <span class="arrow">→</span>
  <span class="sequence-number">8</span>
  <span class="arrow">→</span>
  <span class="sequence-number">12</span>
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="16" style="width:60px">
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="20" style="width:60px">
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="24" style="width:60px">
</div>
```

### Sequence with Step Label:
```html
<p class="sub-question">Count in <span class="step-label">4s</span> from 20:</p>
<div class="sequence-box">
  <span class="sequence-number">20</span>
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="24" style="width:60px">
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="28" style="width:60px">
  <span class="arrow">→</span>
  <input type="text" class="answer-box-small" data-answer="32" style="width:60px">
</div>
```

### Number Track Template:
```html
<div class="number-track">
  <span class="track-cell">0</span>
  <span class="track-cell">4</span>
  <span class="track-cell track-highlight">8</span>
  <span class="track-cell">12</span>
  <span class="track-cell track-highlight">16</span>
  <!-- etc. -->
</div>
```

### Backwards Sequence:
```html
<div class="sequence-box">
  <span class="sequence-number">40</span>
  <span class="arrow">←</span>
  <span class="sequence-number">32</span>
  <span class="arrow">←</span>
  <input type="text" class="answer-box-small" data-answer="24" style="width:60px">
  <span class="arrow">←</span>
  <input type="text" class="answer-box-small" data-answer="16" style="width:60px">
</div>
```

### Sub-question with Input:
```html
<p class="sub-question">a) What step are we counting in? <input type="text" class="answer-box-small" data-answer="4" style="width:50px"></p>
```

### True/False Input:
```html
<p class="sub-question">a) 20 is in the 4s sequence: <input type="text" class="answer-box-small" data-answer="True" style="width:60px"></p>
```

## ANSWER KEY FORMAT (Parser-Compatible)
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> 16, 20, 24</p>
  <p><strong>2.</strong> 4, 8, 50</p>
  <p><strong>3.</strong> 32, 56, 400</p>
  <p><strong>4.</strong> 5, 350</p>
  <p><strong>5.</strong> True, False, True</p>
</div>
```

**CRITICAL:** Answer key MUST be comma-separated values only. NO explanations in parentheses.

## VALIDATION CHECKLIST
- [ ] Mixed Layout structure (Sections A, B, C)?
- [ ] Correct section headers and colors?
- [ ] Q1-Q2 in Section A (Fluency)?
- [ ] Q3-Q4 in Section B (Application)?
- [ ] Q5 in Section C (Reasoning)?
- [ ] Answer key comma-separated (no explanations)?
- [ ] Sequences mathematically correct?
- [ ] Clear visual representation of sequences?
- [ ] Mix of forwards and backwards counting?
- [ ] Real-world contexts engaging for Year 3?
- [ ] Theme consistent throughout worksheet?
