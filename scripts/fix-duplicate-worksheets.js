/**
 * Fix Duplicate Worksheets - Manual Content Generation
 *
 * This script creates unique worksheet content by manually specifying
 * different numbers while maintaining the same HTML structure.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ===========================================
// WORKSHEET CONTENT DEFINITIONS
// ===========================================

const WORKSHEET_CONTENT = {
  'y5-short-div-p2': {
    title: 'Short Division: 4-Digit ÷ 1-Digit',
    details: 'Year 5 | Ages 9-10 | average Practice 2',
    questions: {
      q1a: { dividend: '3,528', divisor: 7, answer: 504, display: '3 5 2 8' },
      q1b: { dividend: '4,572', divisor: 6, answer: 762, display: '4 5 7 2' },
      q2: { dividend: '5,184', divisor: 8, answer: 648, check: 5184 },
      q3: { context: 'train', distance: '7,245', days: 9, answer: 805 },
      q4: { passengers: '7,392', vehicles: 6, perVehicle: 1232, extra: 450, total: 1682, vehicleType: 'coaches' },
      q5: { dividend: '4,725', divisor: 9, answer: 525, check: 4725 }
    }
  },

  'y5-short-div-p4': {
    title: 'Short Division: 4-Digit ÷ 1-Digit',
    details: 'Year 5 | Ages 9-10 | average Practice 4',
    questions: {
      q1a: { dividend: '2,835', divisor: 5, answer: 567, display: '2 8 3 5' },
      q1b: { dividend: '4,368', divisor: 8, answer: 546, display: '4 3 6 8' },
      q2: { dividend: '3,726', divisor: 6, answer: 621, check: 3726 },
      q3: { context: 'bus', distance: '6,552', days: 7, answer: 936 },
      q4: { passengers: '6,848', vehicles: 4, perVehicle: 1712, extra: 350, total: 2062, vehicleType: 'trains' },
      q5: { dividend: '5,481', divisor: 9, answer: 609, check: 5481 }
    }
  },

  'y5-thousandths-p1': {
    title: 'Understanding Thousandths',
    details: 'Year 5 | Ages 9-10 | average Practice 1',
    questions: {
      q1a: { whole: 4, decimal: '0.006', answer: 6 },
      q1b: { whole: 7, decimal: '0.003', answer: 3 },
      q2a: { fraction: '8/1000', decimal: '0.008', answer: 8 },
      q2b: { fraction: '2/1000', decimal: '0.002', answer: 2 },
      q3: { number: '5.739', ones: 5, tenths: 7, hundredths: 3, thousandths: 9 },
      q4: { num1: '2.456', num2: '2.465', answer: '<' },
      q5: { sequence: ['1.234', '1.235', '1.236', '?', '1.238'], answer: '1.237' }
    }
  },

  'y5-thousandths-p3': {
    title: 'Understanding Thousandths',
    details: 'Year 5 | Ages 9-10 | average Practice 3',
    questions: {
      q1a: { whole: 3, decimal: '0.009', answer: 9 },
      q1b: { whole: 8, decimal: '0.004', answer: 4 },
      q2a: { fraction: '6/1000', decimal: '0.006', answer: 6 },
      q2b: { fraction: '1/1000', decimal: '0.001', answer: 1 },
      q3: { number: '7.285', ones: 7, tenths: 2, hundredths: 8, thousandths: 5 },
      q4: { num1: '4.891', num2: '4.819', answer: '>' },
      q5: { sequence: ['3.456', '3.457', '3.458', '?', '3.460'], answer: '3.459' }
    }
  },

  'y5-thousandths-p4': {
    title: 'Understanding Thousandths',
    details: 'Year 5 | Ages 9-10 | average Practice 4',
    questions: {
      q1a: { whole: 6, decimal: '0.002', answer: 2 },
      q1b: { whole: 9, decimal: '0.007', answer: 7 },
      q2a: { fraction: '4/1000', decimal: '0.004', answer: 4 },
      q2b: { fraction: '9/1000', decimal: '0.009', answer: 9 },
      q3: { number: '8.163', ones: 8, tenths: 1, hundredths: 6, thousandths: 3 },
      q4: { num1: '6.347', num2: '6.374', answer: '<' },
      q5: { sequence: ['2.891', '2.892', '2.893', '?', '2.895'], answer: '2.894' }
    }
  },

  'y5-add-fractions-p4': {
    title: 'Adding Fractions with Same Denominator',
    details: 'Year 5 | Ages 9-10 | average Practice 4',
    questions: {
      q1: [
        { num1: 3, num2: 4, denom: 9, answer: 7 },
        { num1: 2, num2: 5, denom: 8, answer: 7 },
        { num1: 1, num2: 6, denom: 10, answer: 7 },
        { num1: 4, num2: 2, denom: 7, answer: 6 }
      ],
      q2: { pizza: '3/8 + 2/8', num1: 3, num2: 2, denom: 8, answer: 5 },
      q3: { paint1: '2/6', paint2: '3/6', num1: 2, num2: 3, denom: 6, answer: 5 },
      q4: {
        claims: [
          { name: 'Ben', sum: '2/5 + 2/5 = 4/5', correct: true },
          { name: 'Mia', sum: '3/7 + 2/7 = 5/14', correct: false }
        ],
        wrongPerson: 'Mia',
        reason: 'added denominators'
      },
      q5: { target: 1, denom: 6, num1: 4, answer: 2 }
    }
  }
};

// ===========================================
// HTML GENERATORS
// ===========================================

function generateShortDivisionHtml(slug, content) {
  const q = content.questions;

  const contextEmojis = {
    'train': '🚂',
    'bus': '🚌',
    'plane': '✈️'
  };

  const vehicleEmojis = {
    'coaches': '🚍',
    'trains': '🚃',
    'ferries': '⛴️'
  };

  return `<!DOCTYPE html>
<html>
<head>
<title>${content.title} (Mixed Layout)</title>
<style>
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
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
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px}
.calculation-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:12px 0}
.calculation-item{padding:15px;border:2px solid #2196F3;border-radius:8px;background:#fff;text-align:center}
.calculation-label{font-size:11pt;color:#666;margin-bottom:8px}
.bus-stop{display:inline-block;position:relative;font-family:'Courier New',monospace;font-size:22pt;font-weight:bold;margin:15px auto;padding:15px 25px 15px 45px;background:#FAFAFA;border-radius:8px}
.bus-stop-bracket{position:absolute;left:30px;top:35%;height:30%;border-left:4px solid #333;border-top:4px solid #333;border-bottom:4px solid #333;width:12px;border-radius:6px 0 0 6px}
.bus-stop-divisor{position:absolute;left:8px;top:50%;transform:translateY(-50%);font-size:22pt;color:#2E7D32}
.bus-stop-line{border-top:4px solid #333;margin:8px 0}
.bus-stop-quotient{letter-spacing:12px;color:#7B1FA2;text-align:right}
.bus-stop-dividend{letter-spacing:12px;color:#1976D2;text-align:right}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.check-box{background:#F3E5F5;border:2px solid #9C27B0;border-radius:8px;padding:12px;margin:10px 0}
.check-formula{font-size:14pt;text-align:center;padding:10px;background:#E1BEE7;border-radius:6px;margin:8px 0}
.answer-box{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:120px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
</head>
<body>
<div style="position: absolute; top: 10px; right: 10px; font-size: 10pt; color: #666; font-family: Arial, sans-serif; z-index: 1000; background: rgba(255, 255, 255, 0.9); padding: 2px 6px; border-radius: 3px;">
  © freemathprintable.com
</div>

<div class="worksheet-header">
  <h1 class="worksheet-title">${content.title} <span class="layout-badge">Mixed Layout</span></h1>
  <p class="worksheet-details">${content.details}</p>
</div>

<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Calculate using short division.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) ${q.q1a.dividend} ÷ ${q.q1a.divisor}</p>
      <div class="bus-stop">
        <span class="bus-stop-divisor">${q.q1a.divisor}</span>
        <span class="bus-stop-bracket"></span>
        <div class="bus-stop-quotient">? ? ?</div>
        <div class="bus-stop-line"></div>
        <div class="bus-stop-dividend">${q.q1a.display}</div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="${q.q1a.answer}"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) ${q.q1b.dividend} ÷ ${q.q1b.divisor}</p>
      <div class="bus-stop">
        <span class="bus-stop-divisor">${q.q1b.divisor}</span>
        <span class="bus-stop-bracket"></span>
        <div class="bus-stop-quotient">? ? ?</div>
        <div class="bus-stop-line"></div>
        <div class="bus-stop-dividend">${q.q1b.display}</div>
      </div>
      <p>Answer: <input type="text" class="answer-box" data-answer="${q.q1b.answer}"></p>
    </div>
  </div>
</div>

<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Calculate, then check using multiplication.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p class="calculation-label">a) Calculate:</p>
      <p style="font-size:16pt;font-weight:bold;">${q.q2.dividend} ÷ ${q.q2.divisor} = <input type="text" class="answer-box" data-answer="${q.q2.answer}"></p>
    </div>
    <div class="calculation-item">
      <p class="calculation-label">b) Check:</p>
      <div class="check-box">
        <p class="check-formula">Answer × Divisor = Dividend</p>
        <p style="font-size:16pt;font-weight:bold;text-align:center;"><input type="text" class="answer-box-small" data-answer="${q.q2.answer}"> × ${q.q2.divisor} = <input type="text" class="answer-box" data-answer="${q.q2.check}"></p>
      </div>
    </div>
  </div>
</div>

<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">${contextEmojis[q.q3.context]}</span>
    <span class="story-text">A ${q.q3.context} travels <strong>${q.q3.distance} kilometres</strong> in <strong>${q.q3.days} days</strong>. How many kilometres does it travel each day?</span>
  </div>
  <p class="sub-question">Distance per day: ${q.q3.distance} ÷ ${q.q3.days} = <input type="text" class="answer-box" data-answer="${q.q3.answer}"> km</p>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Solve this two-step problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">${vehicleEmojis[q.q4.vehicleType]}</span>
    <span class="story-text"><strong>${q.q4.passengers} passengers</strong> need to travel on <strong>${q.q4.vehicles} ${q.q4.vehicleType}</strong>. How many on each? If <strong>${q.q4.extra} extra passengers</strong> join one, how many on that one?</span>
  </div>
  <p class="sub-question">Step 1: ${q.q4.passengers} ÷ ${q.q4.vehicles} = <input type="text" class="answer-box" data-answer="${q.q4.perVehicle}"> passengers per ${q.q4.vehicleType.slice(0, -1)}</p>
  <p class="sub-question">Step 2: <input type="text" class="answer-box-small" data-answer="${q.q4.perVehicle}"> + ${q.q4.extra} = <input type="text" class="answer-box" data-answer="${q.q4.total}"> passengers</p>
</div>

<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>

<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Show how to calculate and then check this division.</p>
  <div class="reasoning-box">
    <p style="font-size:16pt;font-weight:bold;text-align:center;">Calculate: ${q.q5.dividend} ÷ ${q.q5.divisor}</p>
  </div>
  <p class="sub-question">a) Calculation: ${q.q5.dividend} ÷ ${q.q5.divisor} = <input type="text" class="answer-box" data-answer="${q.q5.answer}"></p>
  <p class="sub-question">b) Check using multiplication: <input type="text" class="answer-box-small" data-answer="${q.q5.answer}"> × ${q.q5.divisor} = <input type="text" class="answer-box" data-answer="${q.q5.check}"></p>
  <p class="sub-question">c) Does your check match the original dividend? <input type="text" class="answer-box-word" data-answer="Yes"></p>
</div>

<div class="answer-key">
<p><strong>Answer Key</strong></p>
<p>1. a) ${q.q1a.answer} b) ${q.q1b.answer}</p>
<p>2. a) ${q.q2.answer} b) ${q.q2.check}</p>
<p>3. ${q.q3.answer}</p>
<p>4. a) ${q.q4.perVehicle} b) ${q.q4.total}</p>
<p>5. a) ${q.q5.answer} b) ${q.q5.check} c) Yes</p>
</div>

</body>
</html>`;
}

function generateThousandthsHtml(slug, content) {
  const q = content.questions;

  return `<!DOCTYPE html>
<html>
<head>
<title>${content.title} (Mixed Layout)</title>
<style>
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
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
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px}
.calculation-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:12px 0}
.calculation-item{padding:15px;border:2px solid #2196F3;border-radius:8px;background:#fff;text-align:center}
.place-value-table{width:100%;border-collapse:collapse;margin:10px 0}
.place-value-table th,.place-value-table td{border:2px solid #333;padding:10px;text-align:center;font-size:14pt}
.place-value-table th{background:#E3F2FD;color:#1976D2}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.sequence-box{display:flex;gap:10px;align-items:center;justify-content:center;margin:15px 0}
.sequence-item{padding:12px 18px;border:2px solid #2196F3;border-radius:8px;background:#fff;font-size:16pt;font-weight:bold}
.answer-box{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:60px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
</head>
<body>
<div style="position: absolute; top: 10px; right: 10px; font-size: 10pt; color: #666; font-family: Arial, sans-serif; z-index: 1000; background: rgba(255, 255, 255, 0.9); padding: 2px 6px; border-radius: 3px;">
  © freemathprintable.com
</div>

<div class="worksheet-header">
  <h1 class="worksheet-title">${content.title} <span class="layout-badge">Mixed Layout</span></h1>
  <p class="worksheet-details">${content.details}</p>
</div>

<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>How many thousandths are shown?</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p style="font-size:18pt;font-weight:bold;">${q.q1a.whole} + ${q.q1a.decimal}</p>
      <p>Thousandths: <input type="text" class="answer-box-small" data-answer="${q.q1a.answer}"></p>
    </div>
    <div class="calculation-item">
      <p style="font-size:18pt;font-weight:bold;">${q.q1b.whole} + ${q.q1b.decimal}</p>
      <p>Thousandths: <input type="text" class="answer-box-small" data-answer="${q.q1b.answer}"></p>
    </div>
  </div>
</div>

<div class="question q-fluency">
  <p class="question-text"><span class="question-number">2</span>Convert between fractions and decimals.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p style="font-size:16pt;">a) ${q.q2a.fraction} = ${q.q2a.decimal}</p>
      <p>Thousandths digit: <input type="text" class="answer-box-small" data-answer="${q.q2a.answer}"></p>
    </div>
    <div class="calculation-item">
      <p style="font-size:16pt;">b) ${q.q2b.fraction} = ${q.q2b.decimal}</p>
      <p>Thousandths digit: <input type="text" class="answer-box-small" data-answer="${q.q2b.answer}"></p>
    </div>
  </div>
</div>

<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Complete the place value table.</p>
  <table class="place-value-table">
    <tr>
      <th>Number</th>
      <th>Ones</th>
      <th>Tenths</th>
      <th>Hundredths</th>
      <th>Thousandths</th>
    </tr>
    <tr>
      <td>${q.q3.number}</td>
      <td><input type="text" class="answer-box-small" data-answer="${q.q3.ones}"></td>
      <td><input type="text" class="answer-box-small" data-answer="${q.q3.tenths}"></td>
      <td><input type="text" class="answer-box-small" data-answer="${q.q3.hundredths}"></td>
      <td><input type="text" class="answer-box-small" data-answer="${q.q3.thousandths}"></td>
    </tr>
  </table>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">4</span>Compare the decimals using &lt; or &gt;</p>
  <div class="word-problem-box">
    <p style="font-size:20pt;font-weight:bold;text-align:center;">
      ${q.q4.num1} <input type="text" class="answer-box-word" data-answer="${q.q4.answer}"> ${q.q4.num2}
    </p>
  </div>
</div>

<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>

<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the missing number in the sequence.</p>
  <div class="sequence-box">
    <span class="sequence-item">${q.q5.sequence[0]}</span>
    <span class="sequence-item">${q.q5.sequence[1]}</span>
    <span class="sequence-item">${q.q5.sequence[2]}</span>
    <span class="sequence-item"><input type="text" class="answer-box" data-answer="${q.q5.answer}"></span>
    <span class="sequence-item">${q.q5.sequence[4]}</span>
  </div>
  <p class="sub-question">The pattern increases by: 0.001 (one thousandth)</p>
</div>

<div class="answer-key">
<p><strong>Answer Key</strong></p>
<p>1. a) ${q.q1a.answer} b) ${q.q1b.answer}</p>
<p>2. a) ${q.q2a.answer} b) ${q.q2b.answer}</p>
<p>3. Ones: ${q.q3.ones}, Tenths: ${q.q3.tenths}, Hundredths: ${q.q3.hundredths}, Thousandths: ${q.q3.thousandths}</p>
<p>4. ${q.q4.answer}</p>
<p>5. ${q.q5.answer}</p>
</div>

</body>
</html>`;
}

function generateAddFractionsHtml(slug, content) {
  const q = content.questions;

  return `<!DOCTYPE html>
<html>
<head>
<title>${content.title} (Mixed Layout)</title>
<style>
body{font-family:'Comic Sans MS',cursive,sans-serif;font-size:15pt;padding:15px 20px;line-height:1.4;margin:0;background:#fff}
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
.question-number{display:inline-block;background:#4169E1;color:white;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;margin-right:8px;font-weight:bold;font-size:13pt}
.question-text{font-size:15pt;margin:5px 0;font-weight:600}
.sub-question{font-size:14pt;margin:8px 0 8px 10px}
.calculation-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin:12px 0}
.calculation-item{padding:15px;border:2px solid #2196F3;border-radius:8px;background:#fff;text-align:center}
.fraction{display:inline-block;vertical-align:middle;text-align:center;margin:0 5px}
.fraction-num{display:block;border-bottom:2px solid #333;padding:2px 8px}
.fraction-den{display:block;padding:2px 8px}
.word-problem-box{background:#FFF8E1;border:2px solid #FFB300;border-radius:8px;padding:12px;margin:10px 0}
.character-icon{font-size:28pt;margin-right:8px}
.story-text{font-size:14pt;color:#333;line-height:1.5}
.reasoning-box{background:#E8F5E9;border:2px solid #66BB6A;border-radius:8px;padding:12px;margin:10px 0}
.speech-bubble{background:white;border:2px solid #81C784;border-radius:10px;padding:12px;margin:8px 0}
.answer-box{display:inline-block;min-width:80px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-box-small{display:inline-block;min-width:50px;height:30px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 3px}
.answer-box-word{display:inline-block;min-width:120px;height:34px;border:2px solid #333;border-radius:5px;background:#FFF9C4;vertical-align:middle;margin:0 5px}
.answer-key{margin-top:25px;padding:12px;background:#f0f8ff;border:2px solid #4169E1;border-radius:8px;page-break-before:always}
.answer-key p{font-size:11pt;margin:4px 0;line-height:1.5}
</style>
</head>
<body>
<div style="position: absolute; top: 10px; right: 10px; font-size: 10pt; color: #666; font-family: Arial, sans-serif; z-index: 1000; background: rgba(255, 255, 255, 0.9); padding: 2px 6px; border-radius: 3px;">
  © freemathprintable.com
</div>

<div class="worksheet-header">
  <h1 class="worksheet-title">${content.title} <span class="layout-badge">Mixed Layout</span></h1>
  <p class="worksheet-details">${content.details}</p>
</div>

<div class="section-header section-fluency">
  <span class="section-letter">A</span>
  <span class="section-title">Fluency</span>
</div>

<div class="question q-fluency">
  <p class="question-text"><span class="question-number">1</span>Add these fractions.</p>
  <div class="calculation-grid">
    <div class="calculation-item">
      <p style="font-size:16pt;">a) <span class="fraction"><span class="fraction-num">${q.q1[0].num1}</span><span class="fraction-den">${q.q1[0].denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q1[0].num2}</span><span class="fraction-den">${q.q1[0].denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q1[0].answer}"></span><span class="fraction-den">${q.q1[0].denom}</span></span></p>
    </div>
    <div class="calculation-item">
      <p style="font-size:16pt;">b) <span class="fraction"><span class="fraction-num">${q.q1[1].num1}</span><span class="fraction-den">${q.q1[1].denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q1[1].num2}</span><span class="fraction-den">${q.q1[1].denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q1[1].answer}"></span><span class="fraction-den">${q.q1[1].denom}</span></span></p>
    </div>
    <div class="calculation-item">
      <p style="font-size:16pt;">c) <span class="fraction"><span class="fraction-num">${q.q1[2].num1}</span><span class="fraction-den">${q.q1[2].denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q1[2].num2}</span><span class="fraction-den">${q.q1[2].denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q1[2].answer}"></span><span class="fraction-den">${q.q1[2].denom}</span></span></p>
    </div>
    <div class="calculation-item">
      <p style="font-size:16pt;">d) <span class="fraction"><span class="fraction-num">${q.q1[3].num1}</span><span class="fraction-den">${q.q1[3].denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q1[3].num2}</span><span class="fraction-den">${q.q1[3].denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q1[3].answer}"></span><span class="fraction-den">${q.q1[3].denom}</span></span></p>
    </div>
  </div>
</div>

<div class="section-header section-application">
  <span class="section-letter">B</span>
  <span class="section-title">Application</span>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">2</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🍕</span>
    <span class="story-text">Tom eats <strong>${q.q2.num1}/${q.q2.denom}</strong> of a pizza. His sister eats <strong>${q.q2.num2}/${q.q2.denom}</strong> of the same pizza. How much pizza did they eat altogether?</span>
  </div>
  <p class="sub-question"><span class="fraction"><span class="fraction-num">${q.q2.num1}</span><span class="fraction-den">${q.q2.denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q2.num2}</span><span class="fraction-den">${q.q2.denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q2.answer}"></span><span class="fraction-den">${q.q2.denom}</span></span> of the pizza</p>
</div>

<div class="question q-application">
  <p class="question-text"><span class="question-number">3</span>Solve the problem.</p>
  <div class="word-problem-box">
    <span class="character-icon">🎨</span>
    <span class="story-text">Emma uses <strong>${q.q3.paint1}</strong> of a tin of red paint and <strong>${q.q3.paint2}</strong> of a tin of blue paint. How much paint did she use in total?</span>
  </div>
  <p class="sub-question"><span class="fraction"><span class="fraction-num">${q.q3.num1}</span><span class="fraction-den">${q.q3.denom}</span></span> + <span class="fraction"><span class="fraction-num">${q.q3.num2}</span><span class="fraction-den">${q.q3.denom}</span></span> = <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q3.answer}"></span><span class="fraction-den">${q.q3.denom}</span></span> of a tin</p>
</div>

<div class="section-header section-reasoning">
  <span class="section-letter">C</span>
  <span class="section-title">Reasoning</span>
</div>

<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">4</span>Who made a mistake?</p>
  <div class="reasoning-box">
    <div class="speech-bubble">
      <p><strong>${q.q4.claims[0].name}:</strong> "${q.q4.claims[0].sum}"</p>
    </div>
    <div class="speech-bubble">
      <p><strong>${q.q4.claims[1].name}:</strong> "${q.q4.claims[1].sum}"</p>
    </div>
  </div>
  <p class="sub-question">a) Who is wrong? <input type="text" class="answer-box-word" data-answer="${q.q4.wrongPerson}"></p>
  <p class="sub-question">b) What mistake did they make? <input type="text" class="answer-box-word" data-answer="${q.q4.reason}"></p>
</div>

<div class="question q-reasoning">
  <p class="question-text"><span class="question-number">5</span>Find the missing numerator.</p>
  <p class="sub-question">To make ${q.q5.target} whole:</p>
  <p class="sub-question" style="font-size:18pt;"><span class="fraction"><span class="fraction-num">${q.q5.num1}</span><span class="fraction-den">${q.q5.denom}</span></span> + <span class="fraction"><span class="fraction-num"><input type="text" class="answer-box-small" data-answer="${q.q5.answer}"></span><span class="fraction-den">${q.q5.denom}</span></span> = <span class="fraction"><span class="fraction-num">${q.q5.denom}</span><span class="fraction-den">${q.q5.denom}</span></span> = 1</p>
</div>

<div class="answer-key">
<p><strong>Answer Key</strong></p>
<p>1. a) ${q.q1[0].answer} b) ${q.q1[1].answer} c) ${q.q1[2].answer} d) ${q.q1[3].answer}</p>
<p>2. ${q.q2.answer}</p>
<p>3. ${q.q3.answer}</p>
<p>4. a) ${q.q4.wrongPerson} b) ${q.q4.reason}</p>
<p>5. ${q.q5.answer}</p>
</div>

</body>
</html>`;
}

// ===========================================
// MAIN EXECUTION
// ===========================================

async function updateWorksheet(slug, html) {
  console.log(`Updating ${slug}...`);

  const { data, error } = await supabase
    .from('library_worksheets')
    .update({ html_content: html })
    .eq('slug', slug)
    .select('id')
    .single();

  if (error) {
    console.error(`  Error: ${error.message}`);
    return false;
  }

  console.log(`  Updated successfully (ID: ${data.id})`);
  return true;
}

function extractAnswers(html) {
  const matches = html.match(/data-answer="([^"]+)"/g) || [];
  return matches.map(m => m.match(/data-answer="([^"]+)"/)[1]);
}

function updateSpecFile(slug, answers) {
  const specPath = path.join(__dirname, '..', 'tests', 'e2e', 'interactive', 'year5', `${slug}.spec.ts`);

  if (!fs.existsSync(specPath)) {
    console.log(`  Spec file not found: ${specPath}`);
    return false;
  }

  let content = fs.readFileSync(specPath, 'utf8');

  const answersString = `const WORKSHEET_ANSWERS = [${answers.map(a => `"${a}"`).join(',')}]`;
  const answersRegex = /const WORKSHEET_ANSWERS = \[.*?\]/;

  if (!answersRegex.test(content)) {
    console.log(`  Could not find WORKSHEET_ANSWERS in spec file`);
    return false;
  }

  content = content.replace(answersRegex, answersString);
  fs.writeFileSync(specPath, content);

  console.log(`  Updated spec file with ${answers.length} answers`);
  return true;
}

async function main() {
  console.log('='.repeat(60));
  console.log('Fixing Duplicate Worksheets');
  console.log('='.repeat(60));
  console.log('');

  const worksheetsToFix = [
    'y5-short-div-p2',
    'y5-short-div-p4',
    'y5-thousandths-p1',
    'y5-thousandths-p3',
    'y5-thousandths-p4',
    'y5-add-fractions-p4'
  ];

  for (const slug of worksheetsToFix) {
    console.log(`\nProcessing: ${slug}`);

    const content = WORKSHEET_CONTENT[slug];
    if (!content) {
      console.log(`  No content defined for ${slug}, skipping`);
      continue;
    }

    // Generate HTML based on worksheet type
    let html;
    if (slug.includes('short-div')) {
      html = generateShortDivisionHtml(slug, content);
    } else if (slug.includes('thousandths')) {
      html = generateThousandthsHtml(slug, content);
    } else if (slug.includes('add-fractions')) {
      html = generateAddFractionsHtml(slug, content);
    }

    if (!html) {
      console.log(`  Could not generate HTML`);
      continue;
    }

    // Update database
    const updated = await updateWorksheet(slug, html);
    if (!updated) continue;

    // Extract answers and update spec file
    const answers = extractAnswers(html);
    updateSpecFile(slug, answers);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Done! Run tests to verify:');
  console.log('npx playwright test tests/e2e/interactive/year5/ --project=chromium-desktop');
  console.log('='.repeat(60));
}

main().catch(console.error);
