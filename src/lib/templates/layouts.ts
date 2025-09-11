import { LayoutType } from '@/lib/types/worksheet'

/**
 * Layout template rendering system for worksheet generation
 * Each layout type has specific HTML structure and styling optimized for pedagogical purposes
 */

export interface LayoutRenderContext {
  title: string
  content: string
  difficulty: string
  yearGroup: string
  topic: string
  subtopic: string
  questionCount: number
  generatedAt: string
}

export interface WorksheetQuestion {
  text: string
}

/**
 * HTML escape utility to prevent XSS attacks
 * Critical security function for user-generated content
 */
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Seeded random number generator for deterministic worksheet generation
 * Ensures worksheets are reproducible for same input
 */
function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return function() {
    hash = ((hash * 1103515245) + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

/**
 * Base layout template with common wrapper structure
 */
const baseLayoutTemplate = (content: string, context: LayoutRenderContext) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(context.title)}</title>
  <style>
    /* Base worksheet styling for all layouts */
    body {
      font-family: 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.4;
      margin: 0;
      padding: 20mm;
      background: white;
      color: #000;
    }
    
    .worksheet-header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #333;
      padding-bottom: 10px;
    }
    
    .worksheet-title {
      font-size: 16pt;
      font-weight: bold;
      margin: 0 0 5px 0;
    }
    
    .worksheet-details {
      font-size: 10pt;
      color: #666;
      margin: 5px 0;
    }
    
    .student-info {
      display: flex;
      justify-content: space-between;
      margin: 15px 0;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      font-size: 11pt;
    }
    
    .student-name {
      border-bottom: 1px solid #333;
      width: 150px;
    }
    
    .date-field {
      border-bottom: 1px solid #333;
      width: 100px;
    }
    
    .worksheet-content {
      margin-top: 20px;
    }
    
    /* Print optimization */
    @media print {
      body { 
        padding: 15mm; 
      }
      .worksheet-header {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="worksheet-header">
    <h1 class="worksheet-title">${escapeHtml(context.title)}</h1>
    <div class="worksheet-details">
      ${escapeHtml(context.yearGroup)} • ${escapeHtml(context.topic)} • ${escapeHtml(context.subtopic)} • ${escapeHtml(context.difficulty.charAt(0).toUpperCase() + context.difficulty.slice(1))}
    </div>
  </div>
  
  <div class="student-info">
    <div>Name: <span class="student-name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
    <div>Date: <span class="date-field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
  </div>
  
  <div class="worksheet-content">
    ${content}
  </div>
  
  <!-- Footer for metadata (hidden in print) -->
  <div style="position: fixed; bottom: 5mm; right: 5mm; font-size: 8pt; color: #ccc; display: none;">
    Generated: ${new Date(context.generatedAt).toLocaleDateString()}
  </div>
</body>
</html>
`

/**
 * Layout-specific content templates
 */
export const LAYOUT_CONTENT_TEMPLATES = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  standard: (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .standard-question {
        margin: 12px 0;
        padding: 5px 0;
        page-break-inside: avoid;
      }
      
      .question-number {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 12pt;
      }
      
      .question-text {
        margin-bottom: 8px;
        line-height: 1.4;
      }
      
      .working-lines {
        background-image: linear-gradient(transparent 14px, #ddd 14px, #ddd 15px, transparent 15px);
        background-size: 100% 15px;
        min-height: 15px;
        padding: 2px 5px;
        margin: 5px 0;
      }
      
      .answer-box {
        border: 1px solid #333;
        width: 80px;
        height: 25px;
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
      }
    </style>
    
    ${questions.map((q, i) => `
      <div class="standard-question">
        <div class="question-number">${i + 1}.</div>
        <div class="question-text">${escapeHtml(q.text)}</div>
        <div class="working-lines"></div>
        <div style="margin-top: 8px;">
          Answer: <span class="answer-box"></span>
        </div>
      </div>
    `).join('')}
  `,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fluency: (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .fluency-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        margin: 10px 0;
      }
      
      .fluency-column {
        border: 1px solid #ddd;
        padding: 15px;
        background: #fafafa;
      }
      
      .fluency-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
        padding: 5px 0;
        border-bottom: 1px solid #eee;
        font-size: 11pt;
      }
      
      .fluency-problem {
        font-weight: bold;
      }
      
      .fluency-answer {
        border: 1px solid #333;
        width: 40px;
        height: 20px;
        background: white;
      }
      
      @media print {
        .fluency-container {
          break-inside: avoid;
        }
      }
    </style>
    
    <div class="fluency-container">
      ${[0, 1, 2].map(col => `
        <div class="fluency-column">
          <h3 style="margin-top: 0; font-size: 12pt; text-align: center;">Column ${col + 1}</h3>
          ${questions.filter((_, i) => i % 3 === col).map(q => `
            <div class="fluency-question">
              <span class="fluency-problem">${escapeHtml(q.text)}</span>
              <span class="fluency-answer"></span>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `,

  grid: (questions: WorksheetQuestion[], context: LayoutRenderContext) => {
    // Create seeded random for deterministic grid generation
    const random = createSeededRandom(context.generatedAt + context.topic);
    
    return `
    <style>
      .grid-container {
        margin: 20px 0;
      }
      
      .multiplication-grid {
        border-collapse: collapse;
        margin: 20px auto;
        font-size: 11pt;
      }
      
      .multiplication-grid th,
      .multiplication-grid td {
        border: 1px solid #333;
        width: 30px;
        height: 30px;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
      }
      
      .multiplication-grid th {
        background: #f0f0f0;
      }
      
      .grid-question {
        margin: 15px 0;
        text-align: center;
      }
      
      .number-line {
        display: flex;
        justify-content: space-between;
        border: 1px solid #333;
        padding: 10px;
        margin: 15px 0;
        background: #fafafa;
      }
      
      .number-box {
        border: 1px solid #666;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
      }
    </style>
    
    <div class="grid-container">
      <div class="grid-question">
        <h3>Complete the multiplication grid:</h3>
        <table class="multiplication-grid">
          <tr>
            <th>×</th>
            ${[1,2,3,4,5,6,7,8,9,10].map(n => `<th>${n}</th>`).join('')}
          </tr>
          ${[1,2,3,4,5,6,7,8,9,10].map(row => `
            <tr>
              <th>${row}</th>
              ${[1,2,3,4,5,6,7,8,9,10].map(col => `
                <td>${random() > 0.7 ? '' : row * col}</td>
              `).join('')}
            </tr>
          `).join('')}
        </table>
      </div>
      
      <div class="grid-question">
        <h3>Fill in the missing numbers:</h3>
        <div class="number-line">
          ${Array.from({length: 10}, (_, i) => `
            <div class="number-box">${random() > 0.5 ? i + 1 : ''}</div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  differentiated: (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .differentiated-container {
        margin: 10px 0;
      }
      
      .difficulty-section {
        margin: 20px 0;
        padding: 15px;
        border: 2px solid;
        border-radius: 8px;
        page-break-inside: avoid;
      }
      
      .mild-section {
        border-color: #4CAF50;
        background: #f8fff8;
      }
      
      .medium-section {
        border-color: #FF9800;
        background: #fffaf0;
      }
      
      .hot-section {
        border-color: #F44336;
        background: #fff8f8;
      }
      
      .section-header {
        font-size: 14pt;
        font-weight: bold;
        margin: 0 0 15px 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .difficulty-icon {
        font-size: 18pt;
      }
      
      .differentiated-question {
        margin: 8px 0;
        padding: 8px;
        background: white;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
      
      .question-prompt {
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .answer-area {
        border: 1px dashed #999;
        min-height: 20px;
        padding: 5px;
        margin-top: 5px;
        background: #fafafa;
      }
    </style>
    
    <div class="differentiated-container">
      <div class="difficulty-section mild-section">
        <div class="section-header">
          <span class="difficulty-icon">🌱</span>
          <span>MILD - Warm up questions</span>
        </div>
        ${questions.slice(0, Math.ceil(questions.length / 3)).map(q => `
          <div class="differentiated-question">
            <div class="question-prompt">${escapeHtml(q.text)}</div>
            <div class="answer-area"></div>
          </div>
        `).join('')}
      </div>
      
      <div class="difficulty-section medium-section">
        <div class="section-header">
          <span class="difficulty-icon">🔥</span>
          <span>MEDIUM - Challenge yourself</span>
        </div>
        ${questions.slice(Math.ceil(questions.length / 3), Math.ceil(questions.length * 2 / 3)).map(q => `
          <div class="differentiated-question">
            <div class="question-prompt">${escapeHtml(q.text)}</div>
            <div class="answer-area"></div>
          </div>
        `).join('')}
      </div>
      
      <div class="difficulty-section hot-section">
        <div class="section-header">
          <span class="difficulty-icon">🌶️</span>
          <span>HOT - Extend your thinking</span>
        </div>
        ${questions.slice(Math.ceil(questions.length * 2 / 3)).map(q => `
          <div class="differentiated-question">
            <div class="question-prompt">${escapeHtml(q.text)}</div>
            <div class="answer-area"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reasoning: (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .reasoning-container {
        margin: 10px 0;
      }
      
      .reasoning-question {
        margin: 15px 0;
        border: 2px solid #2196F3;
        border-radius: 8px;
        padding: 15px;
        background: #f8fbff;
        page-break-inside: avoid;
      }
      
      .question-header {
        background: #2196F3;
        color: white;
        margin: -15px -15px 10px -15px;
        padding: 8px 15px;
        border-radius: 6px 6px 0 0;
        font-weight: bold;
        font-size: 12pt;
      }
      
      .question-content {
        font-size: 11pt;
        line-height: 1.5;
        margin-bottom: 10px;
      }
      
      .thinking-section {
        border: 1px dashed #666;
        background: white;
        padding: 8px;
        margin: 8px 0;
        min-height: 30px;
      }
      
      .thinking-title {
        font-weight: bold;
        color: #666;
        margin-bottom: 5px;
        font-size: 10pt;
      }
      
      .answer-section {
        background: #e3f2fd;
        border: 2px solid #2196F3;
        padding: 8px;
        margin-top: 8px;
        border-radius: 4px;
      }
      
      .answer-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .answer-space {
        border-bottom: 1px solid #333;
        min-height: 15px;
        padding: 3px 0;
      }
    </style>
    
    <div class="reasoning-container">
      ${questions.map((q, i) => `
        <div class="reasoning-question">
          <div class="question-header">Question ${i + 1}</div>
          <div class="question-content">${escapeHtml(q.text)}</div>
          
          <div class="thinking-section">
            <div class="thinking-title">📝 Show your working and explain your thinking:</div>
            <div style="min-height: 25px;"></div>
          </div>
          
          <div class="answer-section">
            <div class="answer-title">✨ Final Answer:</div>
            <div class="answer-space"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'visual-heavy': (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .visual-container {
        margin: 15px 0;
        text-align: center;
      }
      
      .visual-question {
        margin: 20px 0;
        padding: 15px;
        border: 2px solid #4CAF50;
        border-radius: 12px;
        background: #f9fff9;
        page-break-inside: avoid;
      }
      
      .visual-number {
        display: inline-block;
        background: #4CAF50;
        color: white;
        font-weight: bold;
        font-size: 14pt;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        margin-bottom: 10px;
      }
      
      .visual-text {
        font-size: 13pt;
        line-height: 1.6;
        margin: 10px 0;
        text-align: left;
      }
      
      .visual-workspace {
        background: white;
        border: 2px dashed #4CAF50;
        min-height: 60px;
        margin: 15px 0;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11pt;
        color: #666;
      }
      
      .visual-answer-area {
        margin-top: 15px;
        text-align: center;
      }
      
      .visual-answer-box {
        border: 2px solid #4CAF50;
        background: white;
        width: 100px;
        height: 35px;
        display: inline-block;
        margin-left: 10px;
        border-radius: 6px;
        vertical-align: middle;
      }
      
      .answer-label {
        font-weight: bold;
        color: #4CAF50;
        font-size: 12pt;
      }
    </style>
    
    <div class="visual-container">
      ${questions.map((q, i) => `
        <div class="visual-question">
          <div class="visual-number">${i + 1}</div>
          <div class="visual-text">${escapeHtml(q.text)}</div>
          <div class="visual-workspace">Draw or work out your answer here</div>
          <div class="visual-answer-area">
            <span class="answer-label">Answer:</span>
            <span class="visual-answer-box"></span>
          </div>
        </div>
      `).join('')}
    </div>
  `
}

/**
 * Main layout renderer function
 */
export const renderLayout = (
  layoutType: LayoutType, 
  questions: WorksheetQuestion[], 
  context: LayoutRenderContext
): string => {
  const contentRenderer = LAYOUT_CONTENT_TEMPLATES[layoutType]
  if (!contentRenderer) {
    throw new Error(`No template found for layout type: ${layoutType}`)
  }
  
  const content = contentRenderer(questions, context)
  return baseLayoutTemplate(content, context)
}

/**
 * Validate layout compatibility with question count
 */
export const validateLayoutQuestionCount = (layoutType: LayoutType, questionCount: number): boolean => {
  const ranges = {
    standard: { min: 5, max: 25 },
    fluency: { min: 10, max: 50 },
    grid: { min: 8, max: 20 },
    differentiated: { min: 6, max: 18 },
    reasoning: { min: 3, max: 12 },
    'visual-heavy': { min: 2, max: 10 }
  }
  
  const range = ranges[layoutType]
  return questionCount >= range.min && questionCount <= range.max
}