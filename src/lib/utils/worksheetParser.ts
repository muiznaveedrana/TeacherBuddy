export interface ParsedQuestion {
  id: number
  questionHTML: string // Original HTML with input field injected
  correctAnswer: string
  questionType: 'numeric' | 'text' | 'equation' | 'mixed'
}

export interface ParsedWorksheet {
  questions: ParsedQuestion[]
  stylesheet: string // CSS styles from the original worksheet
  metadata: {
    totalQuestions: number
    hasAnswerKey: boolean
    yearGroup?: string
  }
}

export function parseWorksheet(html: string): ParsedWorksheet {
  // 1. Extract stylesheet from original HTML
  const stylesheet = extractStylesheet(html)

  // 2. Parse answer key
  const answerKey = extractAnswerKey(html)

  // 3. Find all question divs
  const questionDivs = extractQuestions(html)

  // 4. Match questions with answers
  const questions = questionDivs.map((qDiv, index) => ({
    id: index + 1,
    questionHTML: injectInputField(qDiv, index + 1),
    correctAnswer: answerKey[index + 1] || '',
    questionType: detectQuestionType(qDiv)
  }))

  return {
    questions,
    stylesheet,
    metadata: {
      totalQuestions: questions.length,
      hasAnswerKey: Object.keys(answerKey).length > 0
    }
  }
}

function extractStylesheet(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Extract all <style> tags
  const styleTags = doc.querySelectorAll('style')
  let combinedStyles = ''

  styleTags.forEach(styleTag => {
    combinedStyles += styleTag.textContent || ''
  })

  console.log('📐 Extracted stylesheet:', combinedStyles.length, 'characters')
  return combinedStyles
}

function extractAnswerKey(html: string): Record<number, string> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const answerKeyDiv = doc.querySelector('.answer-key-content')

  if (!answerKeyDiv) return {}

  const answers: Record<number, string> = {}
  const paragraphs = answerKeyDiv.querySelectorAll('p')

  paragraphs.forEach(p => {
    const match = p.textContent?.match(/^(\d+)\.\s*(.+)$/)
    if (match) {
      const [, questionId, answer] = match
      answers[parseInt(questionId)] = answer.trim()
    }
  })

  return answers
}

function extractQuestions(html: string): string[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Find all question divs (they have class="question")
  const questionDivs = doc.querySelectorAll('.question')

  return Array.from(questionDivs).map(div => div.outerHTML)
}

function injectInputField(questionHTML: string, questionId: number): string {
  let html = questionHTML

  console.log(`🔍 Question ${questionId} HTML before injection:`, html.substring(0, 500))

  // Pattern 1: Answer line (e.g., <p class="answer-line">Answer:</p>)
  const answerLineCount = (html.match(/<p class="answer-line">/gi) || []).length
  html = html.replace(
    /<p class="answer-line">.*?<\/p>/gi,
    `<input type="text" class="interactive-answer-input" data-question-id="${questionId}" placeholder="Type your answer" style="width: 300px; padding: 12px; font-size: 18pt; border: 3px solid #2196F3; border-radius: 8px; margin: 10px 0; display: block;" />`
  )
  if (answerLineCount > 0) console.log(`✅ Replaced ${answerLineCount} answer-line patterns`)

  // Pattern 2: Answer box (e.g., <div class="answer-box"></div> OR <span class="answer-box"></span>)
  const answerBoxPattern = /<(div|span) class="answer-box"><\/(div|span)>/gi
  const answerBoxCount = (html.match(answerBoxPattern) || []).length
  let boxCounter = 0
  html = html.replace(
    answerBoxPattern,
    () => {
      const uniqueId = answerBoxCount > 1 ? `${questionId}-${boxCounter++}` : `${questionId}`
      return `<input type="text" class="interactive-answer-input" data-question-id="${uniqueId}" placeholder="Answer" style="width: 150px; padding: 10px; font-size: 20pt; border: 3px solid #333; border-radius: 6px; text-align: center; display: inline-block;" />`
    }
  )
  if (answerBoxCount > 0) console.log(`✅ Replaced ${answerBoxCount} answer-box patterns (div or span)`)

  // Pattern 3: Underscores (3 or more) - e.g., _________
  // IMPORTANT: Replace each underscore pattern individually
  const underscoreMatches = html.match(/_{3,}/g) || []
  const underscoreCount = underscoreMatches.length

  if (underscoreCount > 0) {
    html = html.replace(
      /_{3,}/g,
      (match) => `<input type="text" class="interactive-answer-input" data-question-id="${questionId}" placeholder="..." style="width: ${Math.max(match.length * 12, 100)}px; border-bottom: 3px solid #333; border-top: none; border-left: none; border-right: none; font-size: 18pt; padding: 4px; background: transparent; display: inline-block;" />`
    )
    console.log(`✅ Replaced ${underscoreCount} underscore patterns (multiple blanks in same question)`)
  }

  // Pattern 4: Text content with answer template (e.g., "I can see _____ strawberries")
  // DISABLED for now - causes duplicate inputs when combined with answer-box
  // Only enable if NO other patterns were found
  const textAnswerPattern = /(<p[^>]*>.*?)(___+|is missing\.|altogether\.|There are ___+\.)(.*?<\/p>)/gi
  const textAnswerCount = 0 // Disabled
  /* COMMENTED OUT - causes duplicate inputs
  if (answerLineCount === 0 && answerBoxCount === 0 && underscoreCount === 0) {
    const textAnswerCount = (html.match(textAnswerPattern) || []).length
    html = html.replace(textAnswerPattern, (match, before, placeholder, after) => {
      console.log(`🔍 Found text answer pattern: "${placeholder}"`)
      return `${before}<input type="text" class="interactive-answer-input" data-question-id="${questionId}" placeholder="?" style="width: 120px; padding: 8px; font-size: 16pt; border: 2px solid #2196F3; border-radius: 4px; display: inline-block; margin: 0 4px;" />${after}`
    })
    if (textAnswerCount > 0) console.log(`✅ Replaced ${textAnswerCount} text answer patterns`)
  }
  */

  // Pattern 5: FALLBACK - If no patterns found, add input at end of question
  // This handles old worksheets or different formats
  if (answerLineCount === 0 && answerBoxCount === 0 && underscoreCount === 0 && textAnswerCount === 0) {
    console.warn(`⚠️ No answer patterns found in question ${questionId}! Adding fallback input field`)

    // Check if this is a matching question (has multiple rows/pairs)
    const isMatchingQuestion = html.includes('Match') || html.includes('match') ||
                               (html.match(/<(?:div|p)[^>]*>\s*\d+\s*<\/(?:div|p)>/gi) || []).length >= 3

    if (isMatchingQuestion) {
      // For matching questions, add ONE input box with instruction
      const lastContentMatch = html.match(/(<\/div>|<\/p>)(?![\s\S]*<\/div>)(?![\s\S]*<\/p>)/i)
      if (lastContentMatch) {
        const insertIndex = html.lastIndexOf(lastContentMatch[0])
        html = html.slice(0, insertIndex + lastContentMatch[0].length) +
          `<div style="margin-top: 15px; padding: 10px; background: #E3F2FD; border-radius: 6px;">
            <label style="font-weight: bold; font-size: 14pt; margin-right: 8px; display: block; margin-bottom: 8px;">Your Answer (enter pairs like: 11-sixteen, 14-eleven):</label>
            <textarea class="interactive-answer-input" data-question-id="${questionId}" placeholder="Example: 11-sixteen, 14-eleven, 16-twenty, 20-fourteen" style="width: 100%; padding: 10px; font-size: 14pt; border: 3px solid #2196F3; border-radius: 6px; min-height: 80px; resize: vertical;"></textarea>
          </div>` +
          html.slice(insertIndex + lastContentMatch[0].length)
      }
    } else {
      // Regular fallback: single input
      const lastContentMatch = html.match(/(<\/div>|<\/p>)(?![\s\S]*<\/div>)(?![\s\S]*<\/p>)/i)
      if (lastContentMatch) {
        const insertIndex = html.lastIndexOf(lastContentMatch[0])
        html = html.slice(0, insertIndex + lastContentMatch[0].length) +
          `<div style="margin-top: 15px;"><label style="font-weight: bold; font-size: 14pt; margin-right: 8px;">Your Answer:</label><input type="text" class="interactive-answer-input" data-question-id="${questionId}" placeholder="Type your answer here" style="width: 250px; padding: 10px; font-size: 16pt; border: 3px solid #2196F3; border-radius: 6px; display: inline-block;" /></div>` +
          html.slice(insertIndex + lastContentMatch[0].length)
      }
    }
  }

  return html
}

function detectQuestionType(questionHTML: string): 'numeric' | 'text' | 'equation' | 'mixed' {
  // Simple heuristic based on content
  if (questionHTML.includes('column-container') || questionHTML.includes('equation')) {
    return 'equation'
  }
  if (questionHTML.includes('word-problem')) {
    return 'mixed'
  }
  if (questionHTML.match(/\d+/)) {
    return 'numeric'
  }
  return 'text'
}
