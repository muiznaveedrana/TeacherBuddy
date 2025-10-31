# Y3: Equivalent Fractions ({{questionCount}}Q)

**CRITICAL: EXACTLY {{questionCount}} questions. Simple equivalent fractions: 1/2=2/4, 1/3=2/6, etc.**

BGs: Q1=#FFF9C4 Q2=#E3F2FD Q3=#F1F8E9 Q4=#FCE4EC Q5=#FFF3E0

## YEAR 3 FOCUS (Ages 7-8)
- **Equivalent fractions**: Different ways to write the same amount
- **Examples**: 1/2 = 2/4 = 3/6, 1/3 = 2/6, 2/4 = 1/2
- **Visual understanding**: Same shaded area, different divisions
- **Skills**: Recognize, find, and create equivalent fractions

## QUESTION TYPES

**Q1**: Visual recognition. "Are these fractions the same?" Show two shapes.

**Q2**: Find equivalent. "Complete: 1/2 = ?/4" with visual support.

**Q3**: Match equivalent fractions from a list. Connect matching pairs.

**Q4**: True/false equivalences. "Is 1/2 = 2/4? TRUE or FALSE"

**Q5**: Word problem. "Tom ate 1/2 a pizza. Emma ate 2/4. Did they eat the same amount?"

## EQUIVALENT PAIRS (Year 3 Level)
- 1/2 = 2/4 = 3/6 = 4/8
- 1/3 = 2/6
- 2/4 = 1/2
- 3/6 = 1/2
- 2/3 = 4/6

## COLOR SCHEME
- **First fraction**: #9C27B0 (purple)
- **Equivalent fraction**: #4CAF50 (green - showing they're equal)
- **Different fractions**: #FF5722 (red)
- **Borders**: 3px solid #333

## CSS:
```css
body{font-family:'Comic Sans MS',sans-serif;font-size:16pt;padding:10px;line-height:1.5}
.question{margin:10px 0;padding:14px;border-radius:8px;border:2px solid #ddd}
.question-number{display:inline-block;background:#4169E1;color:white;width:32px;height:32px;line-height:32px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:15pt}
.question-text{font-size:16pt;margin:6px 0;font-weight:600}
.equivalent-container{margin:18px 0;padding:18px;background:#E8F5E9;border-radius:8px;border:2px solid #4CAF50}
.fraction-pair{display:flex;justify-content:space-around;align-items:center;margin:20px 0;flex-wrap:wrap}
.fraction-display{text-align:center;margin:15px;padding:18px;border:3px solid #ddd;border-radius:8px;background:#FFF;min-width:180px}
.equals-sign{font-size:48pt;font-weight:bold;color:#4CAF50;margin:0 20px}
.question-mark{font-size:48pt;font-weight:bold;color:#FF9800;margin:0 20px}
.fraction-circle{width:160px;height:160px;border-radius:50%;border:3px solid #333;position:relative;overflow:hidden;margin:15px auto;display:inline-block}
.fraction-half{position:absolute;width:100%;height:100%;clip-path:polygon(50% 50%,50% 0,100% 0,100% 100%,50% 100%)}
.fraction-third{position:absolute;width:100%;height:100%}
.third-1{clip-path:polygon(50% 50%,50% 0,100% 43.3%)}
.third-2{clip-path:polygon(50% 50%,100% 43.3%,50% 100%)}
.third-3{clip-path:polygon(50% 50%,50% 100%,0 43.3%)}
.fraction-quarter{position:absolute;width:100%;height:100%}
.quarter-1{clip-path:polygon(50% 50%,50% 0,100% 0,100% 50%)}
.quarter-2{clip-path:polygon(50% 50%,100% 50%,100% 100%,50% 100%)}
.quarter-3{clip-path:polygon(50% 50%,50% 100%,0 100%,0 50%)}
.quarter-4{clip-path:polygon(50% 50%,0 50%,0 0,50% 0)}
.fraction-bar{width:260px;height:70px;border:3px solid #333;border-radius:6px;display:flex;margin:18px auto}
.bar-section{flex:1;border-right:3px solid #333;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:15pt}
.bar-section:last-child{border-right:none}
.shaded-purple{background:#9C27B0;color:#FFF}
.shaded-green{background:#4CAF50;color:#FFF}
.shaded-red{background:#FF5722;color:#FFF}
.unshaded{background:#FFF;color:#999}
.fraction-label{font-size:28pt;font-weight:bold;color:#7B1FA2;margin:12px 0}
.matching-container{margin:18px 0;padding:18px;background:#F3E5F5;border-radius:8px}
.matching-columns{display:flex;justify-content:space-around;margin:20px 0;flex-wrap:wrap}
.matching-column{min-width:200px;margin:10px}
.matching-item{padding:12px;margin:8px 0;background:#FFF;border:3px solid #9C27B0;border-radius:8px;font-size:20pt;font-weight:bold;text-align:center}
.instruction-box{margin:15px 0;padding:14px;background:#E8F4F8;border:2px dashed #2196F3;border-radius:8px;font-size:16pt;font-weight:600;color:#1565C0}
.completion-exercise{margin:18px 0;padding:18px;background:#FFF9C4;border-radius:8px}
.fraction-equation{font-size:32pt;font-weight:bold;text-align:center;margin:20px 0}
.answer-box-large{display:inline-block;min-width:100px;height:60px;border:3px solid #333;border-radius:8px;background:#FFF;vertical-align:middle;margin:0 12px;font-size:28pt;line-height:60px;text-align:center}
.word-problem-visual{margin:15px 0;padding:18px;background:#FFF3E0;border:2px dashed #FF9800;border-radius:8px}
.answer-box{display:inline-block;min-width:80px;height:40px;border:3px solid #333;border-radius:6px;background:#FFF;vertical-align:middle;margin:0 8px}
.answer-line{border:none;border-bottom:3px solid #333;display:inline-block;min-width:100px;margin:0 8px;background:transparent}
.working-space{border:2px dashed #999;padding:12px;margin:12px 0;min-height:70px;background:#FAFAFA;border-radius:6px}
.working-space-label{font-size:13pt;color:#666;font-style:italic;margin-bottom:8px}
.answer-key{margin-top:35px;padding:18px;background:#E8F4F8;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key h2{font-size:18pt;color:#2c3e50;margin-bottom:12px;text-align:center;font-weight:bold}
.answer-key p{font-size:14pt;line-height:1.7;margin:8px 0}
.answer-key strong{color:#1976D2}
</style>
```

## RULES

1. Use simple equivalent fractions only: 1/2=2/4, 1/3=2/6, 2/4=1/2
2. Always provide visual support
3. Show both fractions with same shaded area
4. Use = symbol prominently
5. Include "fill in the blank" exercises
6. Real-world contexts for word problems
7. Answer key with visual explanations
8. Colored backgrounds Q1-Q5
9. Year 3 appropriate complexity

## VALIDATION

- [ ] EXACTLY {{questionCount}} questions?
- [ ] Visual recognition with shapes?
- [ ] Completion exercises with visuals?
- [ ] Matching activities?
- [ ] True/false statements?
- [ ] Real-world word problem?
- [ ] All visuals show same shaded amounts?
- [ ] Colored backgrounds Q1-Q5?
- [ ] Answer key included?
- [ ] Year 3 appropriate?

Generate complete HTML. UK Year 3 aligned (ages 7-8).
