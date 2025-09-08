/**
 * Text Extraction - Extracts and parses text content from PDFs and HTML
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import * as fs from 'fs'
import * as pdfParse from 'pdf-parse'

export interface ExtractedContent {
  pdfText?: string
  htmlText: string
  structuredContent: {
    questions: string[]
    instructions: string[]
    answers?: string[]
    titles: string[]
    metadata: {
      wordCount: number
      questionCount: number
      hasAnswers: boolean
    }
  }
  extractionTime: number
}

export class TextExtractor {
  async extractFromPdf(pdfPath: string): Promise<string> {
    try {
      if (!fs.existsSync(pdfPath)) {
        throw new Error(`PDF file not found: ${pdfPath}`)
      }

      const dataBuffer = fs.readFileSync(pdfPath)
      const data = await pdfParse(dataBuffer)
      
      return data.text || ''
    } catch (error) {
      console.warn('PDF text extraction failed:', error)
      return ''
    }
  }

  extractFromHtml(htmlContent: string): string {
    try {
      // Remove script and style tags
      let cleanHtml = htmlContent.replace(/<script[^>]*>.*?<\/script>/gis, '')
      cleanHtml = cleanHtml.replace(/<style[^>]*>.*?<\/style>/gis, '')
      
      // Remove HTML tags but preserve spaces
      cleanHtml = cleanHtml.replace(/<[^>]*>/g, ' ')
      
      // Clean up whitespace
      cleanHtml = cleanHtml.replace(/\s+/g, ' ').trim()
      
      // Decode HTML entities
      cleanHtml = cleanHtml.replace(/&nbsp;/g, ' ')
      cleanHtml = cleanHtml.replace(/&amp;/g, '&')
      cleanHtml = cleanHtml.replace(/&lt;/g, '<')
      cleanHtml = cleanHtml.replace(/&gt;/g, '>')
      cleanHtml = cleanHtml.replace(/&quot;/g, '"')
      cleanHtml = cleanHtml.replace(/&#39;/g, "'")
      
      return cleanHtml
    } catch (error) {
      console.warn('HTML text extraction failed:', error)
      return ''
    }
  }

  async extractContent(pdfPath?: string, htmlContent?: string): Promise<ExtractedContent> {
    const startTime = Date.now()
    
    try {
      let pdfText: string | undefined
      let htmlText = ''

      // Extract from PDF if provided
      if (pdfPath) {
        pdfText = await this.extractFromPdf(pdfPath)
      }

      // Extract from HTML if provided
      if (htmlContent) {
        htmlText = this.extractFromHtml(htmlContent)
      }

      // Use the available text content for analysis
      const analysisText = pdfText || htmlText || ''

      const structuredContent = this.parseStructuredContent(analysisText, htmlContent)
      
      const extractionTime = Date.now() - startTime

      return {
        pdfText,
        htmlText,
        structuredContent,
        extractionTime
      }
    } catch (error) {
      console.error('Content extraction failed:', error)
      
      return {
        htmlText: '',
        structuredContent: {
          questions: [],
          instructions: [],
          titles: [],
          metadata: {
            wordCount: 0,
            questionCount: 0,
            hasAnswers: false
          }
        },
        extractionTime: Date.now() - startTime
      }
    }
  }

  private parseStructuredContent(text: string, htmlContent?: string): ExtractedContent['structuredContent'] {
    const questions: string[] = []
    const instructions: string[] = []
    const answers: string[] = []
    const titles: string[] = []

    try {
      // Extract questions (look for patterns that indicate questions)
      const questionPatterns = [
        // Numbered questions: "1.", "2)", "Q1:", etc.
        /(?:^|\n)\s*(?:\d+[\.\):]|Q\d+[:.]|Question\s+\d+[:.])\s*(.+?)(?=\n|$)/gim,
        // Questions ending with ?
        /([^.!?]*\?)/g,
        // "What is...", "How many...", etc.
        /\b(?:What|How|Where|When|Why|Which|Who)\s+[^.!?]*\?/gi
      ]

      questionPatterns.forEach(pattern => {
        const matches = text.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const cleanQuestion = match.trim().replace(/^\d+[\.\):]?\s*/, '')
            if (cleanQuestion.length > 5) {
              questions.push(cleanQuestion)
            }
          })
        }
      })

      // Extract instructions (imperative sentences or "instructions" sections)
      const instructionPatterns = [
        // Common instruction words
        /(?:^|\n)\s*(?:Calculate|Find|Solve|Complete|Fill|Choose|Select|Circle|Match|Draw|Write|Add|Subtract|Multiply|Divide)\s+[^.!?]*[.!]?/gim,
        // Instructions section
        /Instructions?:\s*(.+?)(?=\n\n|\n[A-Z]|$)/gis
      ]

      instructionPatterns.forEach(pattern => {
        const matches = text.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const cleanInstruction = match.trim()
            if (cleanInstruction.length > 10) {
              instructions.push(cleanInstruction)
            }
          })
        }
      })

      // Extract potential answers (numbers, single words after "=", etc.)
      const answerPatterns = [
        // Mathematical answers: "= 5", "= 12.5", etc.
        /=\s*([0-9]+(?:\.[0-9]+)?)/g,
        // Answer key patterns: "Answer: something", "Ans: something"
        /(?:Answer|Ans):\s*([^.\n]+)/gi
      ]

      answerPatterns.forEach(pattern => {
        const matches = text.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const answer = match.replace(/(?:Answer|Ans|=):\s*/i, '').trim()
            if (answer.length > 0) {
              answers.push(answer)
            }
          })
        }
      })

      // Extract titles from HTML if available
      if (htmlContent) {
        const titleMatches = htmlContent.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi)
        if (titleMatches) {
          titleMatches.forEach(match => {
            const title = match.replace(/<[^>]*>/g, '').trim()
            if (title.length > 0) {
              titles.push(title)
            }
          })
        }
      }

      // Fallback: look for lines that might be titles (ALL CAPS, centered, etc.)
      const titlePattern = /(?:^|\n)\s*([A-Z][A-Z\s]{5,30})\s*(?:\n|$)/g
      const titleMatches = text.match(titlePattern)
      if (titleMatches) {
        titleMatches.forEach(match => {
          const title = match.trim()
          if (title.length > 5 && title.length < 50) {
            titles.push(title)
          }
        })
      }

      // Calculate metadata
      const words = text.split(/\s+/).filter(word => word.length > 0)
      
      return {
        questions: [...new Set(questions)], // Remove duplicates
        instructions: [...new Set(instructions)],
        answers: [...new Set(answers)],
        titles: [...new Set(titles)],
        metadata: {
          wordCount: words.length,
          questionCount: questions.length,
          hasAnswers: answers.length > 0
        }
      }
    } catch (error) {
      console.warn('Structured content parsing failed:', error)
      
      return {
        questions: [],
        instructions: [],
        titles: [],
        metadata: {
          wordCount: text.split(/\s+/).length,
          questionCount: 0,
          hasAnswers: false
        }
      }
    }
  }

  // Helper method to validate extraction quality
  validateExtraction(content: ExtractedContent): {
    isValid: boolean
    issues: string[]
  } {
    const issues: string[] = []
    let isValid = true

    if (content.structuredContent.metadata.wordCount === 0) {
      issues.push('No text content extracted')
      isValid = false
    }

    if (content.structuredContent.metadata.wordCount < 20) {
      issues.push('Very little text content extracted')
    }

    if (content.structuredContent.questions.length === 0) {
      issues.push('No questions detected in content')
    }

    if (content.structuredContent.questions.length < 3) {
      issues.push('Very few questions detected - may need manual review')
    }

    return { isValid, issues }
  }
}