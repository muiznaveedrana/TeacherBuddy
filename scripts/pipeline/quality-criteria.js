/**
 * Quality Assessment Criteria — 7 Dimensions
 * Used by Phase 3 (quality assessment via Claude Code vision)
 */

const DIMENSIONS = [
  {
    id: 'curriculumAlignment',
    name: 'Curriculum Alignment',
    weight: 0.50,
    tier: 'Primary',
    description: 'Age-appropriate numbers, language complexity, question count matches year group expectations'
  },
  {
    id: 'answerCorrectness',
    name: 'Answer Correctness',
    weight: 0.20,
    tier: 'High',
    description: 'Questions are mathematically/logically valid. Filled-in answers visible in screenshot are correct.'
  },
  {
    id: 'intuitiveLookAndFeel',
    name: 'Intuitive Look & Feel',
    weight: 0.10,
    tier: 'Medium',
    description: 'Each question is visually self-explanatory. Child immediately knows what to do.'
  },
  {
    id: 'imageIntegrity',
    name: 'Image Integrity',
    weight: 0.05,
    tier: 'Low',
    description: 'All images load, no broken/placeholder, correct sizes, high contrast'
  },
  {
    id: 'visualAnswerability',
    name: 'Visual Answerability',
    weight: 0.05,
    tier: 'Low',
    description: 'Can a child of target age answer by LOOKING at images? Obvious size/count differences?'
  },
  {
    id: 'presentationQuality',
    name: 'Presentation Quality',
    weight: 0.05,
    tier: 'Low',
    description: 'Overall layout — spacing, margins, readability, no cut-off content, balanced text/images'
  },
  {
    id: 'imageQuestionMatch',
    name: 'Image-Question Match',
    weight: 0.05,
    tier: 'Low',
    description: 'Images semantically match their questions'
  }
]

const AUTO_FAIL_CONDITIONS = [
  {
    id: 'brokenImages',
    description: 'Any broken/missing images',
    maxScoreCap: 65,
    rationale: 'Worksheet is visually incomplete'
  },
  {
    id: 'identicalComparisonObjects',
    description: 'Identical objects in comparison questions',
    maxScoreCap: 40,
    rationale: 'Question is unanswerable — fundamentally broken'
  },
  {
    id: 'missingQuestions',
    description: 'Missing questions (content cut off)',
    maxScoreCap: null, // Dynamic: % visible × 100
    rationale: 'Incomplete worksheet'
  },
  {
    id: 'wrongAnswerKey',
    description: 'Wrong answers in answer key',
    maxScoreCap: 70,
    rationale: 'Educationally harmful — teaches incorrect answers'
  }
]

const YEAR_GROUP_EXPECTATIONS = {
  'reception': { age: '4-5', numberRange: [1, 10], label: 'Reception' },
  'year1': { age: '5-6', numberRange: [1, 20], label: 'Year 1' },
  'year2': { age: '6-7', numberRange: [1, 100], label: 'Year 2' },
  'year3': { age: '7-8', numberRange: [1, 1000], label: 'Year 3' },
  'year4': { age: '8-9', numberRange: [1, 10000], label: 'Year 4' },
  'year5': { age: '9-10', numberRange: [1, 100000], label: 'Year 5' },
  'year6': { age: '10-11', numberRange: [1, 1000000], label: 'Year 6' }
}

/**
 * Calculate weighted overall score from dimension scores (each 0-10)
 */
function calculateOverallScore(dimensionScores) {
  let total = 0
  for (const dim of DIMENSIONS) {
    const score = dimensionScores[dim.id] ?? 0
    total += score * dim.weight
  }
  // Convert from 0-10 scale to 0-100
  return Math.round(total * 10)
}

/**
 * Apply auto-fail caps to overall score
 */
function applyAutoFails(overallScore, autoFails) {
  let cappedScore = overallScore
  const appliedCaps = []

  for (const fail of autoFails) {
    const condition = AUTO_FAIL_CONDITIONS.find(c => c.id === fail.id)
    if (!condition) continue

    let cap = condition.maxScoreCap
    if (fail.id === 'missingQuestions' && fail.percentVisible != null) {
      cap = Math.round(fail.percentVisible * 100)
    }
    if (cap != null && cappedScore > cap) {
      cappedScore = cap
      appliedCaps.push({ condition: condition.description, cap })
    }
  }

  return { score: cappedScore, appliedCaps }
}

/**
 * Classify result as GREEN / AMBER / RED
 */
function classify(overallScore, autoFails, testPassed) {
  if (!testPassed) return 'RED'
  if (overallScore >= 95 && autoFails.length === 0) return 'GREEN'
  if (overallScore < 70) return 'RED'
  return 'AMBER'
}

/**
 * Build the vision prompt for Claude Code to assess a screenshot
 */
function buildVisionPrompt(screenshotPath, yearGroup, slug) {
  const yearInfo = YEAR_GROUP_EXPECTATIONS[yearGroup] || { age: 'unknown', numberRange: [1, 100], label: yearGroup }
  const topic = slug.replace(/-v\d+$/, '').replace(/-/g, ' ')

  return `Assess this educational worksheet screenshot for quality.

Year group: ${yearInfo.label} (ages ${yearInfo.age})
Expected number range: ${yearInfo.numberRange[0]} to ${yearInfo.numberRange[1]}
Topic: ${topic}
Worksheet: ${slug}

Score these 7 dimensions (0-10 each):

1. Curriculum Alignment (50%): Age-appropriate numbers/language for ${yearInfo.label}? Question count matches expectations? Topic correctly reflected in every question?
2. Answer Correctness (20%): Are questions mathematically/logically valid? Are the filled-in answers visible in the screenshot correct?
3. Intuitive Look & Feel (10%): Is each question visually self-explanatory? Does the child immediately know what to do — where to look, what to count, where to write?
4. Image Integrity (5%): All images loaded? No broken/placeholder? Correct sizes, high contrast?
5. Visual Answerability (5%): Can a ${yearInfo.age}-year-old answer by LOOKING at images? Obvious differences?
6. Presentation Quality (5%): Clear overall layout, readable, no cut-offs, balanced?
7. Image-Question Match (5%): Images semantically match their questions?

Auto-fail conditions to check:
- Any broken images → max score 65
- Identical objects in comparison questions → max score 40
- Missing questions (content cut off) → score capped at (% visible × 100)
- Wrong answers in answer key → max score 70

Return ONLY valid JSON (no markdown fences):
{
  "dimensions": [
    {"id": "curriculumAlignment", "score": N, "feedback": "..."},
    {"id": "answerCorrectness", "score": N, "feedback": "..."},
    {"id": "intuitiveLookAndFeel", "score": N, "feedback": "..."},
    {"id": "imageIntegrity", "score": N, "feedback": "..."},
    {"id": "visualAnswerability", "score": N, "feedback": "..."},
    {"id": "presentationQuality", "score": N, "feedback": "..."},
    {"id": "imageQuestionMatch", "score": N, "feedback": "..."}
  ],
  "autoFails": [],
  "actionPoints": []
}`
}

module.exports = {
  DIMENSIONS,
  AUTO_FAIL_CONDITIONS,
  YEAR_GROUP_EXPECTATIONS,
  calculateOverallScore,
  applyAutoFails,
  classify,
  buildVisionPrompt
}
