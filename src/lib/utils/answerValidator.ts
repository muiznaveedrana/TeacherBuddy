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
    usedCustomValidation?: boolean
    validationType?: string
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

  let isCorrect = normalized.student === normalized.correct

  // Also accept just the letter for multiple choice (e.g., "B" matches "B (6)")
  if (!isCorrect) {
    const mcMatch = correctAnswer.trim().match(/^([a-d])\s*\((\d+)\)$/i)
    if (mcMatch) {
      const letter = mcMatch[1].toLowerCase()
      const studentLower = studentAnswer.trim().toLowerCase()
      // Accept if student entered just the letter
      if (studentLower === letter) {
        isCorrect = true
      }
    }
  }

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

  // Handle multiple choice answers like "B (6)" or "A (5)" - extract just the number
  // This allows both "B" and "6" to match "B (6)"
  const multipleChoiceMatch = normalized.match(/^([a-d])\s*\((\d+)\)$/i)
  if (multipleChoiceMatch) {
    // Return just the number for comparison (e.g., "B (6)" → "6")
    normalized = multipleChoiceMatch[2]
  }

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
 * Also supports custom validation for special question types (comparing numbers, etc.)
 */
export function calculateScoreStructured(
  answers: Record<string, string>, // Key can be "1", "4-0", "4-1", etc.
  questions: Array<{
    id: number
    correctAnswer: string | string[]
    inputs: Array<{ subId: string }>
    questionHTML?: string
  }>
): ScoreResult {
  console.log('📊 calculateScoreStructured called with', questions.length, 'questions')
  console.log('📊 First question has HTML?', questions[0]?.questionHTML ? `Yes (${questions[0].questionHTML.length} chars)` : 'No')

  const total = questions.length
  let correct = 0
  const details: ScoreResult['details'] = []

  questions.forEach((question) => {
    console.log(`📊 Processing Q${question.id}: HTML length = ${question.questionHTML?.length || 0}`)
    let isCorrect = false
    let studentAnswer = ''
    let calculatedCorrectAnswer = ''

    const html = question.questionHTML || ''

    // Try custom validation first based on question type detection
    const customResult = validateWithCustomLogic(question, answers, html)

    if (customResult !== null) {
      // Custom validation handled this question
      isCorrect = customResult.isCorrect
      studentAnswer = customResult.studentAnswer
      calculatedCorrectAnswer = customResult.correctAnswer
    } else {
      // Fall back to standard validation
      const correctAnswer = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.join(', ')
        : question.correctAnswer
      calculatedCorrectAnswer = correctAnswer

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
    }

    if (isCorrect) correct++

    // Log scoring result for each question
    console.log(`📊 Q${question.id} SCORE: ${isCorrect ? '✅ CORRECT' : '❌ WRONG'}`, {
      studentAnswer,
      correctAnswer: calculatedCorrectAnswer,
      usedCustomValidation: customResult !== null
    })

    details.push({
      questionId: question.id,
      isCorrect,
      studentAnswer,
      correctAnswer: calculatedCorrectAnswer,
      feedback: isCorrect ? "✓ Correct!" : `✗ Incorrect. Answer: ${calculatedCorrectAnswer}`,
      usedCustomValidation: customResult !== null,
      validationType: customResult?.validationType || 'standard'
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
 * Custom validation logic for special question types
 * Returns null if no custom validation applies
 */
function validateWithCustomLogic(
  question: { id: number; correctAnswer: string | string[]; inputs: Array<{ subId: string }>; questionHTML?: string },
  answers: Record<string, string>,
  html: string
): { isCorrect: boolean; studentAnswer: string; correctAnswer: string; validationType: string } | null {
  console.log(`🔍 Q${question.id} custom validation check:`, {
    hasNumberLabel: html.includes('number-label'),
    hasGreater: html.toLowerCase().includes('greater'),
    hasOpenEnded: html.includes('open-ended-box') || html.includes('mystery-box'),
    hasSymbolRow: html.includes('symbol-row'),
    hasReasoningBox: html.includes('reasoning-box'),
    // Q4 ordering patterns
    hasOrderRow: html.includes('order-row'),
    hasOrderAnswer: html.includes('order-answer'),
    hasNumberCards: html.includes('number-cards') || html.includes('number-card'),
    hasSmallestLargest: html.toLowerCase().includes('smallest') || html.toLowerCase().includes('largest'),
    // Q5 word problem patterns
    hasWordProblemBox: html.includes('word-problem-box'),
    hasComparisonVisual: html.includes('comparison-visual'),
    hasPersonGroup: html.includes('person-group'),
    hasReadProblem: html.toLowerCase().includes('read the problem'),
    htmlLength: html.length
  })

  // Q1: Block Comparison (58 vs 43 - which is greater)
  if (html.includes('number-label') && html.toLowerCase().includes('greater')) {
    const numberLabels: string[] = []
    const labelRegex = /<div[^>]*class="[^"]*number-label[^"]*"[^>]*>(\d+)<\/div>/gi
    let match
    while ((match = labelRegex.exec(html)) !== null) {
      numberLabels.push(match[1])
    }

    if (numberLabels.length >= 2) {
      const num1 = parseInt(numberLabels[0])
      const num2 = parseInt(numberLabels[1])
      const greaterNum = Math.max(num1, num2)
      const tensCount = Math.floor(greaterNum / 10)

      const inputA = question.inputs[0]
      const inputB = question.inputs[1]

      const userA = (answers[inputA?.subId] || '').trim()
      const userB = (answers[inputB?.subId] || '').trim()

      const isCorrect = userA === String(greaterNum) && userB === String(tensCount)

      return {
        isCorrect,
        studentAnswer: `${userA}, ${userB}`,
        correctAnswer: `${greaterNum}, ${tensCount}`,
        validationType: 'Q1-BlockComparison'
      }
    }
  }

  // Q2: Open-Ended (? < 45 - find numbers that work) - match StructuredQuestion.tsx patterns
  const hasOpenEndedBox = html.includes('open-ended-box')
  const hasMysteryBox = html.includes('mystery-box')
  const hasMultipleAnswers = html.includes('multiple-answers')
  const hasFindNumbers = html.toLowerCase().includes('find') && html.toLowerCase().includes('numbers')
  const hasWhatNumber = html.toLowerCase().includes('what number could')
  const hasEquationDisplay = html.includes('equation-display')

  const isOpenEnded = hasOpenEndedBox || hasMysteryBox || hasMultipleAnswers ||
                      ((hasFindNumbers || hasWhatNumber) && hasEquationDisplay)

  console.log(`🔵 Q${question.id} Open-Ended scoring check:`, { hasOpenEndedBox, hasMysteryBox, hasMultipleAnswers, hasFindNumbers, hasWhatNumber, hasEquationDisplay, isOpenEnded })

  if (isOpenEnded) {
    // Extract the comparison number and symbol
    const eqMatch = html.match(/>(\d+)<\/span>\s*<\/div>|>(\d+)</i)
    const hasLessThan = html.includes('&lt;') || html.includes('<')
    const hasMysteryFirst = html.indexOf('mystery-box') < (html.indexOf('symbol') || html.length)

    // Find the comparison number from equation-display
    let compareNum = 0
    const numMatch = html.match(/equation-display[\s\S]*?>(\d+)</i)
    if (numMatch) {
      compareNum = parseInt(numMatch[1])
    }

    if (compareNum > 0) {
      const slotCount = question.inputs.length
      const userAnswers = question.inputs.map(f => parseInt(answers[f.subId] || ''))

      // Check each answer satisfies the comparison
      const allValid = userAnswers.every(ans => {
        if (isNaN(ans)) return false
        // For "? < 45", answers must be < 45
        // For "52 < ?", answers must be > 52
        if (hasMysteryFirst) {
          return ans < compareNum
        } else {
          return ans > compareNum
        }
      })

      const hasAllAnswers = userAnswers.filter(a => !isNaN(a)).length >= slotCount
      const isCorrect = allValid && hasAllAnswers

      return {
        isCorrect,
        studentAnswer: question.inputs.map(f => answers[f.subId] || '').join(', '),
        correctAnswer: `Any ${slotCount} numbers ${hasMysteryFirst ? '<' : '>'} ${compareNum}`,
        validationType: 'Q2-OpenEnded'
      }
    }
  }

  // Q3: Symbol Comparison (with Tom says reasoning)
  if (html.includes('symbol-row') && html.includes('reasoning-box')) {
    const symbolRows: Array<{ left: string; right: string }> = []
    const rowRegex = /<div[^>]*class="[^"]*symbol-row[^"]*"[^>]*>[\s\S]*?<span[^>]*class="[^"]*compare-number[^"]*"[^>]*>(\d+)<\/span>[\s\S]*?<span[^>]*class="[^"]*compare-number[^"]*"[^>]*>(\d+)<\/span>[\s\S]*?<\/div>/gi
    let rowMatch
    while ((rowMatch = rowRegex.exec(html)) !== null) {
      symbolRows.push({ left: rowMatch[1], right: rowMatch[2] })
    }

    // Get Tom's claim
    const tomMatch = html.match(/(\d+)\s+is\s+(greater|less)\s+than\s+(\d+)/i)

    // Get the final symbol question numbers - look for numbers in span tags after "Write the correct symbol"
    // Use more specific pattern that matches: >NUMBER< ... >NUMBER<
    let symbolQMatch = html.match(/Write the correct symbol:[\s\S]*?>(\d+)<\/span>[\s\S]*?data-input-placeholder[\s\S]*?>(\d+)</i)

    // Fallback: try simpler pattern if the first one doesn't match
    if (!symbolQMatch) {
      // Match numbers that appear right after "correct symbol" text, looking for pattern like: symbol: 29 [] 35
      symbolQMatch = html.match(/correct symbol:[\s\S]*?>(\d+)<[\s\S]*?>(\d+)</i)
    }

    const getSymbol = (l: number, r: number) => l < r ? '<' : (l > r ? '>' : '=')

    // Build expected answers
    const expected: string[] = []
    symbolRows.forEach(row => expected.push(getSymbol(parseInt(row.left), parseInt(row.right))))

    if (tomMatch) {
      const tomNum1 = parseInt(tomMatch[1])
      const tomClaim = tomMatch[2].toLowerCase()
      const tomNum2 = parseInt(tomMatch[3])
      const tomIsCorrect = tomClaim === 'greater' ? tomNum1 > tomNum2 : tomNum1 < tomNum2
      expected.push(tomIsCorrect ? 'Yes' : 'No')
    }

    if (symbolQMatch) {
      expected.push(getSymbol(parseInt(symbolQMatch[1]), parseInt(symbolQMatch[2])))
    }

    // Get user answers in order
    const userAnswers = question.inputs.map(f => (answers[f.subId] || '').trim())

    // Validate each
    const isCorrect = userAnswers.every((ans, i) => {
      if (!expected[i]) return true
      return ans.toLowerCase() === expected[i].toLowerCase()
    })

    return {
      isCorrect,
      studentAnswer: userAnswers.join(', '),
      correctAnswer: expected.join(', '),
      validationType: 'Q3-SymbolComparison'
    }
  }

  // Q4: Ordering (smallest to largest) - match StructuredQuestion.tsx patterns
  const hasOrderRow = html.includes('order-row')
  const hasOrderAnswer = html.includes('order-answer')
  const hasNumberCards = html.includes('number-cards') || html.includes('number-card')
  const isOrdering = (hasOrderRow || hasOrderAnswer || hasNumberCards) &&
                     (html.toLowerCase().includes('smallest') || html.toLowerCase().includes('largest'))

  if (isOrdering) {
    const numberCards: string[] = []
    // Try multiple patterns for number extraction
    const cardRegex = /<div[^>]*class="[^"]*number-card[^"]*"[^>]*>(\d+)<\/div>/gi
    let cardMatch
    while ((cardMatch = cardRegex.exec(html)) !== null) {
      numberCards.push(cardMatch[1])
    }
    // Also try extracting from span elements
    if (numberCards.length === 0) {
      const spanRegex = />(\d{2,})</g
      while ((cardMatch = spanRegex.exec(html)) !== null) {
        if (!numberCards.includes(cardMatch[1])) {
          numberCards.push(cardMatch[1])
        }
      }
    }

    if (numberCards.length > 0) {
      const isLargestFirst = html.toLowerCase().indexOf('largest') < html.toLowerCase().indexOf('smallest')
      const expectedOrder = [...numberCards]
        .map(n => parseInt(n))
        .sort((a, b) => isLargestFirst ? b - a : a - b)
        .map(n => String(n))

      const userAnswers = question.inputs.map(f => (answers[f.subId] || '').trim())
      const isCorrect = userAnswers.every((ans, idx) => ans === expectedOrder[idx])

      return {
        isCorrect,
        studentAnswer: userAnswers.join(', '),
        correctAnswer: expectedOrder.join(', '),
        validationType: 'Q4-Ordering'
      }
    }
  }

  // Q5: Word Problem (Class A vs Class B) - match StructuredQuestion.tsx patterns
  const hasWordProblemBox = html.includes('word-problem-box')
  const hasComparisonVisual = html.includes('comparison-visual')
  const hasPersonGroup = html.includes('person-group')
  const hasPersonName = html.includes('person-name')
  const hasPersonAmount = html.includes('person-amount')
  const hasReadProblem = html.toLowerCase().includes('read the problem')

  const isWordProblem = hasWordProblemBox || hasComparisonVisual || hasPersonGroup || (hasPersonName && hasPersonAmount) || hasReadProblem

  if (isWordProblem) {
    const groups: Array<{ name: string; amount: string }> = []

    // Try multiple patterns for group extraction
    const groupRegex = /<div[^>]*class="[^"]*person-name[^"]*"[^>]*>([^<]+)<\/div>[\s\S]*?<div[^>]*class="[^"]*person-amount[^"]*"[^>]*>(\d+)<\/div>/gi
    let groupMatch
    while ((groupMatch = groupRegex.exec(html)) !== null) {
      groups.push({ name: groupMatch[1], amount: groupMatch[2] })
    }

    // If no groups found, try alternative patterns
    if (groups.length === 0) {
      // Look for name: amount patterns
      const altRegex = /([A-Z][a-z]+(?:\s+[A-Z])?)[:\s]+(\d+)/g
      while ((groupMatch = altRegex.exec(html)) !== null) {
        if (!groups.some(g => g.name === groupMatch[1])) {
          groups.push({ name: groupMatch[1], amount: groupMatch[2] })
        }
      }
    }

    if (groups.length >= 2) {
      const amt1 = parseInt(groups[0].amount)
      const amt2 = parseInt(groups[1].amount)
      const expectedName = amt1 > amt2 ? groups[0].name : groups[1].name
      const expectedSymbol = amt1 > amt2 ? '>' : (amt1 < amt2 ? '<' : '=')
      const expectedDiff = String(Math.abs(amt1 - amt2))

      const inputA = question.inputs[0]
      const inputB = question.inputs[1]
      const inputC = question.inputs[2]

      const userA = (answers[inputA?.subId] || '').trim().toLowerCase()
      const userB = (answers[inputB?.subId] || '').trim()
      const userC = (answers[inputC?.subId] || '').trim()

      const nameCorrect = userA === expectedName.toLowerCase() || userA.includes(expectedName.toLowerCase())
      const symbolCorrect = userB === expectedSymbol
      const diffCorrect = userC === expectedDiff

      const isCorrect = nameCorrect && symbolCorrect && diffCorrect

      return {
        isCorrect,
        studentAnswer: `${userA}, ${userB}, ${userC}`,
        correctAnswer: `${expectedName}, ${expectedSymbol}, ${expectedDiff}`,
        validationType: 'Q5-WordProblem'
      }
    }
  }

  // No custom validation applies
  return null
}
