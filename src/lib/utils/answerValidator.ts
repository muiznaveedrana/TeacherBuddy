export interface ValidationResult {
  isCorrect: boolean
  feedback: string
  normalizedStudent: string
  normalizedCorrect: string
}

export interface ScoreResult {
  score: number
  percentage: number
  correct: number
  total: number
  details: Array<{
    questionId: number
    isCorrect: boolean
    studentAnswer: string
    correctAnswer: string
    feedback: string
  }>
}

export function validateAnswer(
  studentAnswer: string,
  correctAnswer: string,
  questionType: 'numeric' | 'text' | 'equation' | 'mixed'
): ValidationResult {
  const normalized = {
    student: normalizeAnswer(studentAnswer, questionType),
    correct: normalizeAnswer(correctAnswer, questionType)
  }

  const isCorrect = normalized.student === normalized.correct

  return {
    isCorrect,
    feedback: isCorrect ? "✓ Correct!" : `✗ Incorrect. Answer: ${correctAnswer}`,
    normalizedStudent: normalized.student,
    normalizedCorrect: normalized.correct
  }
}

function normalizeAnswer(answer: string, type: string): string {
  if (!answer) return ''

  let normalized = answer.trim().toLowerCase()

  // Remove currency symbols
  normalized = normalized.replace(/[£$€¥]/g, '')

  // Remove common object/counting words (strawberries, apples, dots, altogether, etc.)
  normalized = normalized.replace(/\s*(strawberries?|apples?|oranges?|bananas?|dots?|circles?|squares?|triangles?|altogether|in total|total)\s*$/gi, '')

  // Remove units (cm, m, kg, etc.)
  normalized = normalized.replace(/\s*(cm|mm|m|km|g|kg|ml|l|hours?|mins?|minutes?)\s*$/gi, '')

  // Normalize matching answer separators: convert arrows (→) to hyphens (-)
  normalized = normalized.replace(/→/g, '-')

  // Collapse whitespace
  normalized = normalized.replace(/\s+/g, ' ')

  // Handle fractions
  normalized = normalized.replace(/½/g, '1/2')
    .replace(/¼/g, '1/4')
    .replace(/¾/g, '3/4')
    .replace(/⅓/g, '1/3')
    .replace(/⅔/g, '2/3')

  // Extract final answer from equations: "456 + 237 = 693" → "693"
  const equationMatch = normalized.match(/=\s*([0-9.\/]+)\s*$/)
  if (equationMatch) {
    normalized = equationMatch[1]
  }

  // Remove trailing punctuation
  normalized = normalized.replace(/[.,!?;:]$/g, '')

  return normalized.trim()
}

export function calculateScore(
  answers: Record<number, string>,
  correctAnswers: Record<number, string>
): ScoreResult {
  const total = Object.keys(correctAnswers).length
  let correct = 0
  const details: ScoreResult['details'] = []

  Object.keys(correctAnswers).forEach(qIdStr => {
    const questionId = parseInt(qIdStr)
    const studentAns = answers[questionId] || ''
    const correctAns = correctAnswers[questionId]

    const validation = validateAnswer(studentAns, correctAns, 'mixed')

    if (validation.isCorrect) correct++

    details.push({
      questionId,
      isCorrect: validation.isCorrect,
      studentAnswer: studentAns,
      correctAnswer: correctAns,
      feedback: validation.feedback
    })
  })

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  return {
    score: correct,
    percentage,
    correct,
    total,
    details
  }
}

/**
 * Calculate score for structured questions with sub-IDs and array answers
 * This handles questions with multiple inputs (e.g., "4-0", "4-1")
 */
export function calculateScoreStructured(
  answers: Record<string, string>, // Key can be "1", "4-0", "4-1", etc.
  questions: Array<{
    id: number
    correctAnswer: string | string[]
    inputs: Array<{ subId: string }>
  }>
): ScoreResult {
  const total = questions.length
  let correct = 0
  const details: ScoreResult['details'] = []

  questions.forEach((question) => {
    let isCorrect = false
    let studentAnswer = ''
    const correctAnswer = Array.isArray(question.correctAnswer)
      ? question.correctAnswer.join(', ')
      : question.correctAnswer

    if (question.inputs.length === 1) {
      // Single input question
      const subId = question.inputs[0].subId
      studentAnswer = answers[subId] || ''
      const validation = validateAnswer(studentAnswer, correctAnswer, 'mixed')
      isCorrect = validation.isCorrect
    } else {
      // Multi-input question - all must be correct
      const studentAnswers = question.inputs.map(input => answers[input.subId] || '')
      studentAnswer = studentAnswers.join(', ')

      const correctAnswers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [question.correctAnswer]

      // Check each sub-answer
      isCorrect = question.inputs.every((input, idx) => {
        const stuAns = answers[input.subId] || ''
        const corrAns = correctAnswers[idx] || ''
        const validation = validateAnswer(stuAns, corrAns, 'mixed')
        return validation.isCorrect
      })
    }

    if (isCorrect) correct++

    details.push({
      questionId: question.id,
      isCorrect,
      studentAnswer,
      correctAnswer,
      feedback: isCorrect ? "✓ Correct!" : `✗ Incorrect. Answer: ${correctAnswer}`
    })
  })

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  return {
    score: correct,
    percentage,
    correct,
    total,
    details
  }
}
