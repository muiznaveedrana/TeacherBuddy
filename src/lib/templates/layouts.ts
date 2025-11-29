import { LayoutType } from '@/lib/types/worksheet'
import { YEAR_GROUPS } from '@/lib/data/curriculum'

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
 * Extract year number from year group string
 */
function extractYearNumber(yearGroup: string): number {
  const match = yearGroup.match(/year\s*(\d+)/i)
  return match ? parseInt(match[1], 10) : 0
}

/**
 * Get international label with ages for year group
 * Converts internal value (e.g., "Reception") to international format (e.g., "Kindergarten / Reception (Ages 4-5)")
 */
function getInternationalYearLabel(yearGroup: string): string {
  const yearGroupData = YEAR_GROUPS.find(yg => yg.value === yearGroup)
  return yearGroupData?.label || yearGroup
}

/**
 * Get age-appropriate font settings based on year group
 */
function getFontSettings(yearGroup: string) {
  const yearNum = extractYearNumber(yearGroup)

  if (yearGroup.toLowerCase().includes('reception')) {
    return {
      fontFamily: 'Comic Sans MS, Arial, sans-serif',
      fontSize: '18pt',
      lineHeight: '1.9',
      questionFontSize: '20pt',
      instructionFontSize: '16pt',
      padding: '6mm 10mm'  // ECO-FRIENDLY: Reduced from 8mm to 6mm (save ~8px top/bottom)
    }
  } else if (yearNum === 1) {
    return {
      fontFamily: 'Comic Sans MS, Arial, sans-serif',
      fontSize: '16pt',
      lineHeight: '1.7',
      questionFontSize: '18pt',
      instructionFontSize: '14pt',
      padding: '9mm 11mm'
    }
  } else if (yearNum === 2) {
    return {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14pt',
      lineHeight: '1.6',
      questionFontSize: '16pt',
      instructionFontSize: '12pt',
      padding: '10mm 12mm'
    }
  } else {
    return {
      fontFamily: 'Arial, Times New Roman, serif',
      fontSize: '12pt',
      lineHeight: '1.5',
      questionFontSize: '14pt',
      instructionFontSize: '11pt',
      padding: '10mm 12mm'
    }
  }
}

/**
 * Base layout template with common wrapper structure
 */
const baseLayoutTemplate = (content: string, context: LayoutRenderContext) => {
  const fontSettings = getFontSettings(context.yearGroup)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(context.title)}</title>
  <style>
    /* Base worksheet styling with age-appropriate fonts */
    body {
      font-family: ${fontSettings.fontFamily};
      font-size: ${fontSettings.fontSize};
      line-height: ${fontSettings.lineHeight};
      margin: 0;
      padding: ${fontSettings.padding};
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
      font-size: ${fontSettings.questionFontSize};
      font-weight: bold;
      margin: 0 0 5px 0;
    }

    .worksheet-details {
      font-size: ${fontSettings.instructionFontSize};
      color: #666;
      margin: 5px 0;
    }
    
    .worksheet-content {
      margin-top: 15px;
    }
    
    /* Print optimization */
    @media print {
      body {
        padding: 10mm 12mm;
      }
      .worksheet-header {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="worksheet-header">
    <h1 class="worksheet-title">${escapeHtml(context.subtopic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}</h1>
    <div class="worksheet-details">
      ${escapeHtml(getInternationalYearLabel(context.yearGroup))} • ${escapeHtml(context.topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}
    </div>
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
}

/**
 * Generate contextual SVG icons for word problems
 */
function generateContextualIcon(questionText: string, index: number): string {
  const icons = [
    // Cupcake icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50h40c5 0 10 5 10 10v20c0 5-5 10-10 10H30c-5 0-10-5-10-10V60c0-5 5-10 10-10z" fill="#8B4513"/>
      <ellipse cx="50" cy="45" rx="20" ry="15" fill="#FFB6C1"/>
      <rect x="48" y="20" width="4" height="20" fill="#FF69B4"/>
      <ellipse cx="50" cy="22" rx="3" ry="3" fill="#FF1493"/>
    </svg>`,
    
    // School bus icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="40" width="70" height="35" rx="5" fill="#FFD700"/>
      <rect x="20" y="45" width="12" height="8" fill="#4169E1"/>
      <rect x="35" y="45" width="12" height="8" fill="#4169E1"/>
      <rect x="50" y="45" width="12" height="8" fill="#4169E1"/>
      <rect x="65" y="45" width="12" height="8" fill="#4169E1"/>
      <circle cx="25" cy="78" r="6" fill="#000"/>
      <circle cx="75" cy="78" r="6" fill="#000"/>
      <rect x="10" y="55" width="8" height="15" fill="#FF0000"/>
    </svg>`,
    
    // Cookie icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="35" fill="#D2B48C"/>
      <circle cx="40" cy="40" r="3" fill="#8B4513"/>
      <circle cx="60" cy="35" r="3" fill="#8B4513"/>
      <circle cx="35" cy="60" r="3" fill="#8B4513"/>
      <circle cx="65" cy="60" r="3" fill="#8B4513"/>
      <circle cx="50" cy="65" r="3" fill="#8B4513"/>
    </svg>`,
    
    // Pizza slice icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 L85 80 L15 80 Z" fill="#FFD700"/>
      <path d="M50 20 L80 75 L20 75 Z" fill="#FF6347"/>
      <circle cx="45" cy="50" r="4" fill="#8B0000"/>
      <circle cx="60" cy="60" r="4" fill="#228B22"/>
      <circle cx="35" cy="65" r="4" fill="#8B0000"/>
      <ellipse cx="55" cy="45" rx="3" ry="2" fill="#FFFAF0"/>
    </svg>`,
    
    // Playing cards icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="20" width="30" height="45" rx="3" fill="#FFF" stroke="#000" stroke-width="2"/>
      <rect x="35" y="30" width="30" height="45" rx="3" fill="#FFF" stroke="#000" stroke-width="2"/>
      <rect x="45" y="40" width="30" height="45" rx="3" fill="#FFF" stroke="#000" stroke-width="2"/>
      <text x="60" y="55" font-size="12" fill="#FF0000">A</text>
      <path d="M58 60 L60 65 L62 60 Z" fill="#FF0000"/>
    </svg>`,
    
    // Movie theater icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="60" height="40" rx="5" fill="#8B0000"/>
      <rect x="25" y="35" width="50" height="30" fill="#000"/>
      <rect x="30" y="75" width="40" height="15" fill="#FFD700"/>
      <circle cx="35" cy="82" r="3" fill="#FFF"/>
      <circle cx="65" cy="82" r="3" fill="#FFF"/>
      <rect x="45" y="15" width="10" height="20" fill="#FF6347"/>
    </svg>`,
    
    // School supplies icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="60" height="40" rx="3" fill="#4169E1"/>
      <rect x="25" y="35" width="50" height="30" fill="#FFF"/>
      <rect x="30" y="40" width="40" height="2" fill="#000"/>
      <rect x="30" y="45" width="40" height="2" fill="#000"/>
      <rect x="30" y="50" width="40" height="2" fill="#000"/>
      <circle cx="80" cy="25" r="8" fill="#FFD700"/>
    </svg>`,
    
    // Money icon
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" fill="#228B22"/>
      <circle cx="50" cy="50" r="25" fill="#32CD32"/>
      <text x="50" y="58" text-anchor="middle" font-size="24" font-weight="bold" fill="#FFF">$</text>
      <circle cx="50" cy="50" r="20" fill="none" stroke="#FFF" stroke-width="2"/>
    </svg>`
  ];
  
  return icons[index % icons.length];
}

/**
 * Layout-specific content templates
 */
export const LAYOUT_CONTENT_TEMPLATES = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  standard: (questions: WorksheetQuestion[], context: LayoutRenderContext) => {
    const fontSettings = getFontSettings(context.yearGroup)
    const isYoungLearner = context.yearGroup.toLowerCase().includes('reception') || extractYearNumber(context.yearGroup) <= 2

    return `
    <style>
      .standard-question {
        margin: ${isYoungLearner ? '8px' : '8px'} 0 0 0;  /* ECO-FRIENDLY: Reduced from 12px to 8px for young learners (save ~20px total) */
        padding: ${isYoungLearner ? '10px' : '10px'};  /* ECO-FRIENDLY: Reduced from 12px to 10px for young learners (save ~10px total) */
        page-break-inside: avoid;
        border-radius: 6px;
        background: ${isYoungLearner ? '#fafafa' : 'white'};
      }

      .standard-question:first-child {
        margin-top: 0;
      }

      .question-number {
        font-weight: bold;
        margin-bottom: 6px;
        font-size: ${fontSettings.questionFontSize};
        display: inline;
        margin-right: 10px;
        color: #2c3e50;
      }

      .question-text {
        display: inline;
        line-height: ${fontSettings.lineHeight};
        font-size: ${fontSettings.fontSize};
      }

      /* Optimized answer space for 5 questions per page */
      .answer-space {
        margin: ${isYoungLearner ? '12px' : '10px'} 0 0 0;  /* ECO-FRIENDLY: Reduced from 15px to 12px for young learners (save ~15px total) */
        min-height: ${isYoungLearner ? '50px' : '40px'};  /* ECO-FRIENDLY: Reduced from 55px to 50px for young learners (save ~25px total) */
        background: white;
        border-bottom: 2px solid #ddd;
        position: relative;
        border-radius: 3px;
      }

      .answer-space::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: #999;
      }
    </style>

    ${questions.map((q, i) => `
      <div class="standard-question">
        <span class="question-number">${i + 1}.</span>
        <span class="question-text">${escapeHtml(q.text)}</span>
        <div class="answer-space"></div>
      </div>
    `).join('')}
  `
  },

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
    
    // Check if this is for three-digit calculations - render as calculation grid
    if (context.subtopic === 'three-digit-numbers' && context.topic === 'addition-subtraction') {
      // Generate three-digit addition problems in grid format like the reference
      const generateAdditionProblem = (index: number) => {
        const problems = [
          [396, 704], [207, 107], [614, 165], [208, 358],
          [294, 587], [150, 423], [609, 352], [248, 481],
          [426, 474], [435, 263], [250, 419], [440, 270], [633, 268],
          [554, 100], [239, 117], [246, 373], [279, 582], [671, 187],
          [797, 207], [500, 462], [196, 441], [279, 406],
          [470, 264], [470, 389], [471, 458], [542, 365], [392, 399]
        ];
        const problem = problems[index % problems.length] || [123, 456];
        return { first: problem[0], second: problem[1] };
      };
      
      return `
      <style>
        .grid-container {
          margin: 20px 0;
        }
        
        .grid-header {
          text-align: center;
          margin-bottom: 15px;
          font-size: 12pt;
          font-weight: bold;
        }
        
        .grid-subtitle {
          text-align: left;
          margin-bottom: 15px;
          font-size: 11pt;
          font-weight: bold;
        }
        
        .problems-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin: 25px 0;
          max-width: 100%;
        }
        
        .problem {
          text-align: right;
          font-family: 'Courier New', monospace;
          font-size: 14pt;
          line-height: 1.5;
          border: 1.5px solid #999;
          padding: 12px 10px;
          background-color: #f8f8f8;
          border-radius: 4px;
          min-height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .problem .line {
          margin: 3px 0;
          padding-right: 8px;
          font-weight: 500;
        }
        
        .problem .answer-line {
          border-top: 2px solid #333;
          margin-top: 8px;
          padding-top: 8px;
          min-height: 25px;
          flex-grow: 1;
        }
        
        .operator {
          font-weight: bold;
        }
      </style>
      
      <div class="grid-container">
        <div class="grid-subtitle">
          <strong>3-Digit Addition with Regrouping</strong><br>
          Find the sum.
        </div>
        
        <div class="problems-grid">
          ${questions.map((_, i) => {
            const prob = generateAdditionProblem(i);
            return `
            <div class="problem">
              <div class="line">${prob.first}</div>
              <div class="line"><span class="operator">+</span> ${prob.second}</div>
              <div class="answer-line"></div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
      `;
    }
    
    // Default grid layout for multiplication/other topics
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
  `,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'word-problem-enhanced': (questions: WorksheetQuestion[], _context: LayoutRenderContext) => `
    <style>
      .word-problem-container {
        margin: 20px 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .word-problem-header {
        text-align: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 3px solid #333;
      }
      
      .word-problem-title {
        font-size: 18pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #333;
        margin-bottom: 10px;
      }
      
      .word-problem-instructions {
        font-size: 11pt;
        color: #666;
        font-style: italic;
        margin-bottom: 15px;
      }
      
      .word-problem-question {
        display: flex;
        align-items: flex-start;
        margin: 25px 0;
        padding: 20px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
        page-break-inside: avoid;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      .question-number {
        font-size: 14pt;
        font-weight: bold;
        color: #2c3e50;
        margin-right: 15px;
        min-width: 25px;
      }
      
      .question-content {
        flex: 1;
        margin-right: 20px;
      }
      
      .question-text {
        font-size: 12pt;
        line-height: 1.6;
        color: #333;
        margin-bottom: 15px;
      }
      
      .working-space {
        background: white;
        border: 2px dashed #ccc;
        border-radius: 8px;
        min-height: 60px;
        padding: 10px;
        margin: 10px 0;
        position: relative;
      }
      
      .working-space::before {
        content: "Show your work:";
        position: absolute;
        top: -8px;
        left: 10px;
        background: white;
        padding: 0 5px;
        font-size: 9pt;
        color: #666;
      }
      
      .answer-section {
        margin-top: 15px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .answer-label {
        font-weight: bold;
        color: #27ae60;
        font-size: 12pt;
      }
      
      .answer-box {
        border: 2px solid #27ae60;
        background: white;
        width: 100px;
        height: 30px;
        border-radius: 6px;
        display: inline-block;
      }
      
      .question-icon {
        width: 140px;
        height: 140px;
        margin-left: 20px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 12px;
        box-shadow: 0 3px 12px rgba(0,0,0,0.2);
      }

      .question-icon svg {
        width: 120px;
        height: 120px;
      }
      
      /* Icon color themes */
      .icon-cupcake { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }
      .icon-bus { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); }
      .icon-cookie { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
      .icon-pizza { background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%); }
      .icon-cards { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .icon-theater { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
      .icon-school { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
      .icon-money { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
    </style>
    
    <div class="word-problem-container">
      <div class="word-problem-header">
        <h1 class="word-problem-title">Word Problems: ${_context.subtopic.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</h1>
        <div class="word-problem-instructions">
          Carefully read each question. Identify the key information, show all of your work, and circle your final answer!
        </div>
      </div>
      
      ${questions.map((q, i) => {
        // Generate contextual icons based on question content
        const iconClass = ['icon-cupcake', 'icon-bus', 'icon-cookie', 'icon-pizza', 'icon-cards', 'icon-theater', 'icon-school', 'icon-money'][i % 8];
        const iconSvg = generateContextualIcon(q.text, i);
        
        return `
        <div class="word-problem-question">
          <div class="question-number">${i + 1}.)</div>
          <div class="question-content">
            <div class="question-text">${escapeHtml(q.text)}</div>
            <div class="working-space"></div>
            <div class="answer-section">
              <span class="answer-label">Final Answer:</span>
              <span class="answer-box"></span>
            </div>
          </div>
          <div class="question-icon ${iconClass}">
            ${iconSvg}
          </div>
        </div>
        `;
      }).join('')}
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
export const validateLayoutQuestionCount = (
  layoutType: LayoutType, 
  questionCount: number, 
  context?: { topic?: string, subtopic?: string }
): boolean => {
  const ranges = {
    standard: { min: 5, max: 25 },
    fluency: { min: 10, max: 50 },
    grid: { min: 8, max: 20 },
    differentiated: { min: 6, max: 18 },
    reasoning: { min: 3, max: 12 },
    'visual-heavy': { min: 2, max: 10 },
    'word-problem-enhanced': { min: 3, max: 8 }
  }
  
  let range = ranges[layoutType]
  
  // Special case: Grid layout with three-digit calculations allows optimal range
  if (layoutType === 'grid' && 
      context?.topic === 'addition-subtraction' && 
      context?.subtopic === 'three-digit-numbers') {
    range = { min: 5, max: 32 }  // Allow 5-32 questions for three-digit calc grids (optimal: 28)
  }
  
  return questionCount >= range.min && questionCount <= range.max
}