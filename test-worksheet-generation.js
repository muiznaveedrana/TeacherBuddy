/**
 * Test script to generate a USP.1 Reception Addition worksheet
 * Demonstrates the advanced prompt engineering system
 */

const fs = require('fs')
const path = require('path')

// Mock the advanced USP.1 prompt engineering output for demonstration
const generateUSP1ReceptionWorksheet = () => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reception Addition - Counting Objects Worksheet</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        
        body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background-color: #FEFDF8;
            color: #2D3748;
            font-size: 16pt;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        
        .worksheet-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #4299E1;
            padding-bottom: 15px;
        }
        
        .worksheet-title {
            font-size: 24pt;
            color: #2B6CB0;
            margin: 0;
            font-weight: bold;
        }
        
        .worksheet-subtitle {
            font-size: 14pt;
            color: #4A5568;
            margin: 5px 0;
        }
        
        .instructions {
            background-color: #E6FFFA;
            border: 2px solid #38B2AC;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 25px;
            font-size: 14pt;
        }
        
        .question {
            background-color: white;
            border: 2px solid #CBD5E0;
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .question-number {
            background-color: #4299E1;
            color: white;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16pt;
            margin-right: 15px;
        }
        
        .question-content {
            display: inline-block;
            vertical-align: top;
            width: calc(100% - 60px);
        }
        
        .counting-objects {
            display: flex;
            gap: 15px;
            margin: 15px 0;
            align-items: center;
        }
        
        .object-group {
            background-color: #F7FAFC;
            border: 2px dashed #A0AEC0;
            border-radius: 10px;
            padding: 15px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
        }
        
        .apple, .teddy, .star, .heart {
            width: 25px;
            height: 25px;
            border-radius: 3px;
        }
        
        .apple {
            background-color: #F56565;
            position: relative;
        }
        
        .apple::after {
            content: '🍎';
            position: absolute;
            top: -2px;
            left: 2px;
            font-size: 20px;
        }
        
        .teddy::after {
            content: '🧸';
            font-size: 20px;
        }
        
        .star::after {
            content: '⭐';
            font-size: 20px;
        }
        
        .heart::after {
            content: '💙';
            font-size: 20px;
        }
        
        .plus-sign {
            font-size: 24pt;
            font-weight: bold;
            color: #2B6CB0;
        }
        
        .equation {
            background-color: #EDF2F7;
            border: 2px solid #CBD5E0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            font-size: 20pt;
            text-align: center;
            font-weight: bold;
        }
        
        .answer-box {
            display: inline-block;
            width: 50px;
            height: 40px;
            border: 3px solid #4299E1;
            border-radius: 8px;
            background-color: white;
            margin: 0 5px;
        }
        
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12pt;
            color: #718096;
            border-top: 2px solid #E2E8F0;
            padding-top: 15px;
        }
        
        @media print {
            body { background-color: white; }
        }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1 class="worksheet-title">Addition with Counting Objects</h1>
        <p class="worksheet-subtitle">Reception Mathematics - UK National Curriculum</p>
        <p class="worksheet-subtitle">Name: _________________ Date: _________________</p>
    </div>
    
    <div class="instructions">
        <strong>Instructions:</strong> Count the objects in each group. Write how many altogether in the answer box.
    </div>
    
    <div class="question">
        <span class="question-number">1</span>
        <div class="question-content">
            <p><strong>Emma has some apples. Oliver gives her more apples. How many apples does Emma have altogether?</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="apple"></div>
                    <div class="apple"></div>
                    <div class="apple"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="apple"></div>
                    <div class="apple"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">3 + 2 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="question">
        <span class="question-number">2</span>
        <div class="question-content">
            <p><strong>Sophie counts her teddy bears. James brings more teddy bears. How many teddy bears are there in total?</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="teddy"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">4 + 1 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="question">
        <span class="question-number">3</span>
        <div class="question-content">
            <p><strong>Lily has stars. Thomas gives her more stars. How many stars does Lily have now?</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="star"></div>
                    <div class="star"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="star"></div>
                    <div class="star"></div>
                    <div class="star"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">2 + 3 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="question">
        <span class="question-number">4</span>
        <div class="question-content">
            <p><strong>Grace has blue hearts. Harry gives her one more blue heart. How many blue hearts does Grace have altogether?</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="heart"></div>
                    <div class="heart"></div>
                    <div class="heart"></div>
                    <div class="heart"></div>
                    <div class="heart"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="heart"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">5 + 1 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="question">
        <span class="question-number">5</span>
        <div class="question-content">
            <p><strong>Charlotte has apples. William brings more apples. Count all the apples.</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="apple"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="apple"></div>
                    <div class="apple"></div>
                    <div class="apple"></div>
                    <div class="apple"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">1 + 4 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="question">
        <span class="question-number">6</span>
        <div class="question-content">
            <p><strong>Amelia has teddy bears. Jack gives her more teddy bears. How many teddy bears are there now?</strong></p>
            <div class="counting-objects">
                <div class="object-group">
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                </div>
                <span class="plus-sign">+</span>
                <div class="object-group">
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                    <div class="teddy"></div>
                </div>
                <span class="plus-sign">=</span>
                <div class="answer-box"></div>
            </div>
            <div class="equation">3 + 3 = <span class="answer-box"></span></div>
        </div>
    </div>
    
    <div class="footer">
        <p><strong>USP.1 LLM Prompt Engineering Foundation</strong></p>
        <p>Reception Addition Worksheet - Counting Objects & Visual Supports</p>
        <p>UK National Curriculum Aligned | Age-Appropriate Design | Accessibility Optimized</p>
    </div>
</body>
</html>`
}

// Generate the worksheet
const worksheetHTML = generateUSP1ReceptionWorksheet()

// Save the HTML file
const outputPath = path.join(__dirname, 'reception-addition-worksheet.html')
fs.writeFileSync(outputPath, worksheetHTML)

console.log('✅ USP.1 Reception Addition Worksheet Generated!')
console.log('📁 File saved:', outputPath)
console.log('🎨 Features demonstrated:')
console.log('   - Research-backed prompt engineering')
console.log('   - Phase 1 target: Reception/Year 1 addition')  
console.log('   - Visual counting objects with emojis')
console.log('   - UK National Curriculum alignment')
console.log('   - Accessibility-optimized design (SEND-friendly)')
console.log('   - Student name personalization')
console.log('   - Professional A4 layout')
console.log('   - Age-appropriate typography and colors')
console.log('')
console.log('🔗 Open the HTML file in a browser to view the worksheet')
console.log('🖨️ Use browser Print → Save as PDF to generate PDF version')