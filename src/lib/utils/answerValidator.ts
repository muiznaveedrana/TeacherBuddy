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
  // Multi-step pattern detection (must be checked early for priority)
  // Look for CSS classes used in multi-step worksheets, OR multiple equations with blanks
  const hasStepBox = html.includes('step-box') || html.includes('two-step-container')
  const hasStepPattern = hasStepBox || html.toLowerCase().includes('step 1') || html.toLowerCase().includes('step 2')
  const hasMultipleInputs = question.inputs.length >= 3

  // Also detect multi-step by looking for multiple equation patterns
  const equationMatches = (html.match(/\d+\s*[+\-−]\s*\d+\s*=/g) || []).length
  const hasMultipleEquations = equationMatches >= 2

  // Detect sub-question pattern early for logging
  // This includes: sub-question class, grid patterns (doubles-grid, missing-grid), and a)/b)/c) format
  const hasSubQuestionPattern = html.includes('sub-question') ||
                                html.includes('doubles-grid') ||
                                html.includes('doubles-item') ||
                                html.includes('missing-grid') ||
                                html.includes('missing-item') ||
                                /[a-f]\)\s*\d+\s*[+\-−]\s*\d+\s*=/.test(html)

  console.log(`🔍 Q${question.id} custom validation check:`, {
    // Multi-step word problem patterns (check first!)
    hasStepBox,
    hasStepPattern,
    hasMultipleInputs,
    hasMultipleEquations,
    equationCount: equationMatches,
    inputCount: question.inputs.length,
    hasSubQuestions: hasSubQuestionPattern, // Independent sub-questions (a), b), etc.)
    // Other patterns
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

  // Skip multi-step validation for True/False questions (they have equations but expect True/False answers)
  const isTrueFalseQuestion = html.toLowerCase().includes('true or false') ||
                               html.toLowerCase().includes('(true/false)') ||
                               html.toLowerCase().includes('true, false')

  // PRIORITY: Multi-step word problem validation (Step 1, Step 2 patterns)
  // Must be checked FIRST before other word problem patterns can match
  // Trigger on: step-box CSS class, OR "step 1" text, OR multiple equations with 3+ inputs
  // But NOT for True/False questions which contain equations but expect True/False answers
  // But NOT for sub-question grids where each equation is independent (a), b), c) format)
  if ((hasStepPattern || hasMultipleEquations) && hasMultipleInputs && !isTrueFalseQuestion && !hasSubQuestionPattern) {
    console.log(`🔧 Q${question.id} Multi-step word problem detected (${question.inputs.length} inputs)`)

    // Parse all equations - both complete (X op Y =) and partial ([?] op Y =)
    const fullExpected: string[] = []

    // First pass: find equations with both numbers to get initial values
    // Handle money questions with 'p' suffix like "60p - 18p ="
    const completeEquations: { num1: number; op: string; num2: number; result: number }[] = []
    const completeRegex = /(\d+)p?\s*([+\-−])\s*(\d+)p?\s*=/g
    let match

    while ((match = completeRegex.exec(html)) !== null) {
      const num1 = parseInt(match[1])
      const op = match[2]
      const num2 = parseInt(match[3])
      const result = op === '+' ? num1 + num2 : num1 - num2
      completeEquations.push({ num1, op, num2, result })
      console.log(`  📐 Complete equation: ${num1} ${op} ${num2} = ${result}`)
    }

    // Second pass: find partial equations ([?] op Y =) where [?] is previous result
    // Handle money questions with 'p' suffix like "[?]p - 25p ="
    const partialRegex = /\[?\?\]?p?\s*([+\-−])\s*(\d+)p?\s*=/g
    const partialEquations: { op: string; num2: number }[] = []

    while ((match = partialRegex.exec(html)) !== null) {
      const op = match[1]
      const num2 = parseInt(match[2])
      partialEquations.push({ op, num2 })
      console.log(`  📐 Partial equation: [?] ${op} ${num2} = ?`)
    }

    // Build expected values based on input count and equation structure
    // Common patterns:
    // - 4 inputs (Q4-style): Step1 result, Step1 result repeated in Step2, Step2 result, Final answer
    //   Example: 30-8=[22], [22]-5=[17], Final=[17] → [22, 22, 17, 17]
    // - 3 inputs (Q5-style): Step1 result, Step2 result, Final answer
    //   Example: 32-15=[17], 32+7=[39], Final=[39] → [17, 39, 39]

    // Look for secondary operation in HTML (like "- 5 =" or "- 25p =" after an input box)
    const secondOpMatch = html.match(/\s*([+\-−])\s*(\d+)p?\s*=\s*$/m) || html.match(/>\s*([+\-−])\s*(\d+)p?\s*=/)

    if (question.inputs.length === 4 && completeEquations.length >= 1) {
      const step1Result = completeEquations[0].result
      let step2Result: number

      // Detect pattern type:
      // - Independent pattern (2 complete equations): [step1, step2, step1, step2]
      //   Example: 19-14=5 AND 14+6=20 → [5, 20, 5, 20]
      // - Sequential pattern (1 complete + 1 partial): [step1, step1, step2, step2]
      //   Example: 30-8=22, [22]-5=17 → [22, 22, 17, 17]
      const isIndependentPattern = completeEquations.length >= 2 && partialEquations.length === 0

      if (isIndependentPattern) {
        // Two independent equations with different results
        step2Result = completeEquations[1].result

        fullExpected.push(String(step1Result))  // Input 1: first equation result
        fullExpected.push(String(step2Result))  // Input 2: second equation result
        fullExpected.push(String(step1Result))  // Input 3: repeat first answer
        fullExpected.push(String(step2Result))  // Input 4: repeat second answer

        console.log(`  📋 4-input INDEPENDENT pattern: Step1=${step1Result}, Step2=${step2Result} → [${step1Result}, ${step2Result}, ${step1Result}, ${step2Result}]`)
      } else {
        // Sequential pattern: step 2 uses result from step 1
        if (partialEquations.length >= 1) {
          step2Result = step1Result + (partialEquations[0].op === '+' ? partialEquations[0].num2 : -partialEquations[0].num2)
        } else if (secondOpMatch) {
          // Parse from HTML like "- 5 ="
          const op = secondOpMatch[1]
          const num2 = parseInt(secondOpMatch[2])
          step2Result = op === '+' ? step1Result + num2 : step1Result - num2
          console.log(`  📐 Found secondary operation from HTML: ${step1Result} ${op} ${num2} = ${step2Result}`)
        } else if (completeEquations.length >= 2) {
          // Fallback to second complete equation
          step2Result = completeEquations[1].result
        } else {
          // Last resort: use answer key to figure out step2
          const ansArr = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]
          step2Result = parseInt(ansArr[0]) || step1Result
        }

        fullExpected.push(String(step1Result))  // Input 1: result of complete equation
        fullExpected.push(String(step1Result))  // Input 2: step 1 result carried to step 2
        fullExpected.push(String(step2Result))  // Input 3: result of partial equation
        fullExpected.push(String(step2Result))  // Input 4: final answer (same as step 2 result)

        console.log(`  📋 4-input SEQUENTIAL pattern: Step1=${step1Result}, Step2=${step2Result} → [${step1Result}, ${step1Result}, ${step2Result}, ${step2Result}]`)
      }
    } else if (question.inputs.length === 6 && completeEquations.length >= 2) {
      // 6-input pattern: 3-step problem with final answers
      // Example: 27-18=[9], 18+14=[32], [32]+27=[59], final1=[9], final2=[59]
      // Pattern: [step1, step2, step2 (as input), step3, step1 (final), step3 (final)]
      const step1Result = completeEquations[0].result
      const step2Result = completeEquations[1].result

      // Calculate step 3 - find the LAST "op num =" pattern after all complete equations
      // Step 3 always comes AFTER step 2, so we need to find the addend that appears after step 2's equation
      let step3Result: number

      // Find all "op num =" patterns to get the last one (step 3's addend)
      // Handle money questions with 'p' suffix like "+ 27p ="
      const allOpNumMatches = [...html.matchAll(/([+\-−])\s*(\d+)p?\s*=/g)]
      // The step 3 pattern should be AFTER the step 2 equation (18 + 14 =)
      // So we need to find ops where the num is NOT part of a complete equation
      const step3Addends = allOpNumMatches.filter(m => {
        const num = parseInt(m[2])
        // Exclude numbers that are part of complete equations
        return !completeEquations.some(eq => eq.num2 === num)
      })

      if (step3Addends.length > 0) {
        // Use the last matching addend (step 3)
        const lastMatch = step3Addends[step3Addends.length - 1]
        const op = lastMatch[1]
        const addend = parseInt(lastMatch[2])
        step3Result = op === '+' || op === '' ? step2Result + addend : step2Result - addend
        console.log(`  📐 Step 3 equation found: ${step2Result} ${op} ${addend} = ${step3Result}`)
      } else if (partialEquations.length >= 1) {
        step3Result = step2Result + (partialEquations[0].op === '+' ? partialEquations[0].num2 : -partialEquations[0].num2)
      } else if (completeEquations.length >= 3) {
        step3Result = completeEquations[2].result
      } else {
        // Final fallback: look for any number near the end that could be step 3 addend
        // Pattern like ">[num]=" which excludes numbers from complete equations
        const fallbackMatch = html.match(/>(\d+)\s*=\s*</)
        if (fallbackMatch) {
          const addend = parseInt(fallbackMatch[1])
          if (!completeEquations.some(eq => eq.num2 === addend)) {
            step3Result = step2Result + addend
          } else {
            step3Result = step2Result
          }
        } else {
          step3Result = step2Result
        }
      }

      fullExpected.push(String(step1Result))  // Input 1: step 1 result (e.g., 9)
      fullExpected.push(String(step2Result))  // Input 2: step 2 result (e.g., 32)
      fullExpected.push(String(step2Result))  // Input 3: step 2 as input to step 3 (e.g., 32)
      fullExpected.push(String(step3Result))  // Input 4: step 3 result (e.g., 59)
      fullExpected.push(String(step1Result))  // Input 5: final answer 1 (difference) (e.g., 9)
      fullExpected.push(String(step3Result))  // Input 6: final answer 2 (total) (e.g., 59)

      console.log(`  📋 6-input pattern: Step1=${step1Result}, Step2=${step2Result}, Step3=${step3Result} → [${fullExpected.join(', ')}]`)
    } else if (question.inputs.length === 3 && completeEquations.length >= 2) {
      // Pattern: [step1Result, step2Result, finalAnswer]
      const step1Result = completeEquations[0].result
      const step2Result = completeEquations[1].result

      fullExpected.push(String(step1Result))  // Input 1: first equation result
      fullExpected.push(String(step2Result))  // Input 2: second equation result
      fullExpected.push(String(step2Result))  // Input 3: final answer (same as step 2 result)

      console.log(`  📋 3-input pattern: Step1=${step1Result}, Step2=${step2Result}`)
    } else {
      // Fallback: distribute equation results across inputs
      for (const eq of completeEquations) {
        fullExpected.push(String(eq.result))
      }

      // Fill remaining with last result or final answer from answer key
      const finalAnswerMatch = (Array.isArray(question.correctAnswer)
        ? question.correctAnswer[0]
        : question.correctAnswer)?.match(/^(\d+)/)
      const lastValue = fullExpected.length > 0
        ? fullExpected[fullExpected.length - 1]
        : (finalAnswerMatch ? finalAnswerMatch[1] : '')

      while (fullExpected.length < question.inputs.length) {
        fullExpected.push(lastValue)
      }

      console.log(`  📋 Fallback pattern: ${fullExpected.join(', ')}`)
    }

    if (fullExpected.length > 0) {
      console.log(`  📋 Expected values for ${question.inputs.length} inputs:`, fullExpected)

      // Validate each input
      const userAnswers = question.inputs.map(f => (answers[f.subId] || '').trim())

      const allCorrect = fullExpected.every((exp, idx) => {
        const userVal = userAnswers[idx]
        const isMatch = userVal === exp
        console.log(`    Input ${idx}: user="${userVal}" expected="${exp}" -> ${isMatch ? '✅' : '❌'}`)
        return isMatch
      })

      return {
        isCorrect: allCorrect,
        studentAnswer: userAnswers.join(', '),
        correctAnswer: fullExpected.join(', '),
        validationType: 'MultiStepWordProblem'
      }
    }
  }

  // Q1: Block Comparison (76 vs 79 - which is greater)
  // Q1a: expects the greater number
  // Q1b: expects "tens" or "ones" (which place value determined the answer)
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

      // Determine which place value differs - tens or ones
      const tens1 = Math.floor(num1 / 10)
      const tens2 = Math.floor(num2 / 10)
      const placeValueAnswer = tens1 !== tens2 ? 'tens' : 'ones'

      console.log(`🔧 Q1 Block Comparison: Expected answers: ${greaterNum} ${placeValueAnswer}`)

      const inputA = question.inputs[0]
      const inputB = question.inputs[1]

      const userA = (answers[inputA?.subId] || '').trim()
      const userB = (answers[inputB?.subId] || '').trim().toLowerCase()

      // Q1a: must match the greater number exactly
      // Q1b: must be "tens" or "ones" (the place value that determined the answer)
      const isCorrect = userA === String(greaterNum) && userB === placeValueAnswer

      return {
        isCorrect,
        studentAnswer: `${userA}, ${userB}`,
        correctAnswer: `${greaterNum}, ${placeValueAnswer}`,
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

    // Check for explicit "greater than" or "less than" text to determine direction
    const hasGreaterThanText = html.toLowerCase().includes('greater than')
    const hasLessThanText = html.toLowerCase().includes('less than')
    const answersNeedToBeGreater = hasGreaterThanText || (!hasLessThanText && !hasMysteryFirst)

    // Find the comparison number from equation-display
    let compareNum = 0
    const numMatch = html.match(/equation-display[\s\S]*?>(\d+)</i)
    if (numMatch) {
      compareNum = parseInt(numMatch[1])
    }

    // Also try to extract number from "greater than X" or "less than X" text
    if (compareNum === 0) {
      const textNumMatch = html.match(/(greater|less)\s+than\s+(\d+)/i)
      if (textNumMatch) {
        compareNum = parseInt(textNumMatch[2])
      }
    }

    if (compareNum > 0) {
      const slotCount = question.inputs.length
      const userAnswers = question.inputs.map(f => parseInt(answers[f.subId] || ''))

      // Check each answer satisfies the comparison
      const allValid = userAnswers.every(ans => {
        if (isNaN(ans)) return false
        // For "? < 45", answers must be < 45
        // For "52 < ?", answers must be > 52
        if (answersNeedToBeGreater) {
          return ans > compareNum
        } else {
          return ans < compareNum
        }
      })

      const hasAllAnswers = userAnswers.filter(a => !isNaN(a)).length >= slotCount
      const isCorrect = allValid && hasAllAnswers

      return {
        isCorrect,
        studentAnswer: question.inputs.map(f => answers[f.subId] || '').join(', '),
        correctAnswer: `Any ${slotCount} numbers ${answersNeedToBeGreater ? '>' : '<'} ${compareNum}`,
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

    // Get user answers in correct order
    // Note: question.inputs contains only text inputs, but Yes/No is a button
    // We need to build userAnswers to match the expected order: [symbol1, symbol2, yesNo, symbol3]
    const userAnswers: string[] = []

    // Get symbol answers from text inputs
    const symbolInputs = question.inputs.filter(f => !f.subId.includes('yesno'))
    symbolRows.forEach((_, idx) => {
      const input = symbolInputs[idx]
      userAnswers.push(input ? (answers[input.subId] || '').trim() : '')
    })

    // Get Yes/No answer - match StructuredQuestion.tsx logic
    // The Yes button stores answer at question.inputs[symbolRows.length].subId
    if (tomMatch) {
      const yesNoInputIdx = symbolRows.length
      let yesNoAnswer = ''

      // Try input at the expected index first (matches StructuredQuestion.tsx)
      const yesNoInput = question.inputs[yesNoInputIdx]
      if (yesNoInput && answers[yesNoInput.subId]) {
        yesNoAnswer = answers[yesNoInput.subId]
      }

      // Fallback: try to find input with 'yesno' in subId
      if (!yesNoAnswer) {
        const yesNoByName = question.inputs.find(f => f.subId.includes('yesno'))
        if (yesNoByName && answers[yesNoByName.subId]) {
          yesNoAnswer = answers[yesNoByName.subId]
        }
      }

      // Fallback: try standard patterns
      if (!yesNoAnswer) {
        yesNoAnswer = answers[`${question.id}-yesno`] || answers[`${question.id}-${yesNoInputIdx}`] || ''
      }

      userAnswers.push(yesNoAnswer.trim())
    }

    // Get final symbol answer
    if (symbolQMatch) {
      const finalIdx = symbolRows.length // After symbol rows, excluding yesNo
      const finalInput = symbolInputs[finalIdx] || question.inputs[question.inputs.length - 1]
      userAnswers.push(finalInput ? (answers[finalInput.subId] || '').trim() : '')
    }

    console.log(`🔍 Q${question.id} SymbolComparison validation:`, {
      expected,
      userAnswers,
      inputCount: question.inputs.length,
      symbolRowCount: symbolRows.length
    })

    // Validate each
    const isCorrect = expected.length === userAnswers.length &&
      expected.every((exp, i) => {
        const ans = userAnswers[i] || ''
        return ans.toLowerCase() === exp.toLowerCase()
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
