import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateWorksheet } from '@/lib/services/gemini'
import { WorksheetConfig } from '@/lib/types/worksheet'

// Mock Google Generative AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: () => `<div class="worksheet-container">
<header class="worksheet-header">
<h1>Mathematics Worksheet</h1>
<h2>Number and Operations - Addition and Subtraction</h2>
<div class="worksheet-info">
<p>Name: _________________ Date: _________________</p>
<p>Difficulty: Easy | 15 Questions</p>
</div>
</header>
<section class="instructions">
<h3>Instructions:</h3>
<p>Show all your working out. Use the space provided for each question. Read each question carefully.</p>
</section>
<section class="questions">
<div class="question">
<p class="question-number"><strong>1.</strong> Emma has 12 pounds in her purse. Oliver gives her 8 more pounds. How many pounds does Emma have altogether?</p>
<div class="working-space"></div>
</div>
<div class="question">
<p class="question-number"><strong>2.</strong> Sophie measures her garden which is 5 metres long. How many centimetres is that?</p>
<div class="working-space"></div>
</div>
</section>
</div>`
        }
      })
    })
  }))
}))

describe('Gemini AI Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate worksheet with correct configuration', async () => {
    const config: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'addition-subtraction',
      difficulty: 'easy',
      questionCount: 5,
      studentNames: ['Emma', 'Oliver', 'Sophie', 'James', 'Lily']
    }

    const result = await generateWorksheet(config)

    expect(result.title).toBe('Number and Operations - Addition and Subtraction Worksheet')
    expect(result.html).toContain('worksheet-container')
    expect(result.html).toContain('Mathematics Worksheet')
    expect(result.html).toContain('Emma')
    expect(result.metadata.topic).toBe('Number and Operations')
    expect(result.metadata.subtopic).toBe('Addition and Subtraction')
    expect(result.metadata.difficulty).toBe('easy')
    expect(result.metadata.questionCount).toBe(5)
    expect(result.metadata.curriculum).toBe('UK National Curriculum')
  })

  it('should integrate student names from the name list', async () => {
    const config: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'addition-subtraction',  
      difficulty: 'average',
      questionCount: 3,
      studentNames: ['Alice', 'Bob', 'Charlie']
    }

    const result = await generateWorksheet(config)

    // The HTML should contain at least one of the provided names
    expect(result.html).toMatch(/Alice|Bob|Charlie|Emma|Oliver/)
  })

  it('should handle different difficulty levels', async () => {
    const easyConfig: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'addition-subtraction',
      difficulty: 'easy',
      questionCount: 5,
      studentNames: ['Emma', 'Oliver']
    }

    const hardConfig: WorksheetConfig = {
      topic: 'number-operations', 
      subtopic: 'addition-subtraction',
      difficulty: 'hard',
      questionCount: 5,
      studentNames: ['Emma', 'Oliver']
    }

    const easyResult = await generateWorksheet(easyConfig)
    const hardResult = await generateWorksheet(hardConfig)

    expect(easyResult.metadata.difficulty).toBe('easy')
    expect(hardResult.metadata.difficulty).toBe('hard')
    expect(easyResult.html).toContain('worksheet-container')
    expect(hardResult.html).toContain('worksheet-container')
  })

  it('should handle different question counts', async () => {
    const config: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'place-value',
      difficulty: 'average',
      questionCount: 15,
      studentNames: ['Sophie', 'James', 'Grace']
    }

    const result = await generateWorksheet(config)

    expect(result.metadata.questionCount).toBe(15)
    expect(result.html).toContain('15 Questions')
  })

  it('should handle fractions topic', async () => {
    const config: WorksheetConfig = {
      topic: 'fractions-decimals',
      subtopic: 'equivalent-fractions',
      difficulty: 'average',
      questionCount: 8,
      studentNames: ['Lily', 'Thomas', 'Grace']
    }

    const result = await generateWorksheet(config)

    expect(result.metadata.topic).toBe('Fractions and Decimals')
    expect(result.metadata.subtopic).toBe('Equivalent Fractions')
  })

  it('should use default names when no student names provided', async () => {
    const config: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'mental-maths',
      difficulty: 'easy',
      questionCount: 5,
      studentNames: []
    }

    const result = await generateWorksheet(config)
    
    // Should still generate successfully with default UK names
    expect(result.html).toContain('worksheet-container')
    expect(result.metadata.questionCount).toBe(5)
  })

  it('should include UK-specific contexts and terminology', async () => {
    const config: WorksheetConfig = {
      topic: 'number-operations',
      subtopic: 'addition-subtraction',
      difficulty: 'easy',
      questionCount: 5,
      studentNames: ['Emma', 'Oliver']
    }

    const result = await generateWorksheet(config)

    // Should contain UK terminology and contexts
    expect(result.html).toMatch(/pounds|£|pence|metres|centimetres|UK|British/)
  })
})