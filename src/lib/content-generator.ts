/**
 * WORKSHEET CONTENT GENERATOR
 *
 * Generates unique, SEO-friendly educational content for worksheets
 * displayed on freemathprintable.com. This is a deterministic generator
 * that creates consistent, high-quality content based on worksheet metadata.
 */

export interface WorksheetInput {
  title: string
  topic: string
  subtopic: string
  year_group: string
  skills?: string[]
}

export interface WorksheetContent {
  description: string
  learningObjectives: string[]
  howToUse: string
  suggestedFor: {
    ageRange: string
    settings: string[]
  }
}

/**
 * Generate comprehensive content for a worksheet
 * Creates unique descriptions, learning objectives, usage guidance, and audience info
 */
export function generateWorksheetContent(worksheet: WorksheetInput): WorksheetContent {
  const { title, topic, subtopic, year_group, skills = [] } = worksheet

  return {
    description: generateDescription(title, topic, subtopic, year_group, skills),
    learningObjectives: generateLearningObjectives(topic, subtopic, year_group, skills),
    howToUse: generateHowToUse(title, topic, subtopic, year_group),
    suggestedFor: generateSuggestedFor(year_group),
  }
}

/**
 * Generate a unique 2-3 sentence description for the worksheet
 */
function generateDescription(
  title: string,
  topic: string,
  subtopic: string,
  yearGroup: string,
  skills: string[]
): string {
  const ageRange = getAgeRange(yearGroup)
  const skillsText = skills.length > 0
    ? ` focusing on ${skills.slice(0, 2).join(' and ')}`
    : ''

  const descriptions: Record<string, (t: string, s: string, y: string, sk: string) => string> = {
    'Number': (t, s, y, sk) =>
      `This ${y} ${s} worksheet helps children develop essential number sense and mathematical fluency${sk}. ` +
      `Through carefully designed questions, students will build confidence in working with numbers while strengthening their foundational maths skills. ` +
      `Perfect for classroom practice or homework reinforcement.`,

    'Addition': (t, s, y, sk) =>
      `Practice addition skills with this engaging ${y} worksheet${sk}. ` +
      `Students will work through a variety of addition problems designed to build mental maths fluency and calculation confidence. ` +
      `Ideal for consolidating learning and developing speed and accuracy.`,

    'Subtraction': (t, s, y, sk) =>
      `Build subtraction confidence with this ${y} maths worksheet${sk}. ` +
      `Carefully structured problems help students understand the concept of taking away while developing reliable calculation strategies. ` +
      `Great for independent practice or guided group work.`,

    'Multiplication': (t, s, y, sk) =>
      `Strengthen multiplication skills with this ${y} practice worksheet${sk}. ` +
      `Students will develop times table fluency and understand the relationship between multiplication and repeated addition. ` +
      `Excellent for building the foundation needed for more advanced mathematical concepts.`,

    'Division': (t, s, y, sk) =>
      `Master division concepts with this ${y} worksheet${sk}. ` +
      `Through progressive questions, students learn to share equally and understand the inverse relationship with multiplication. ` +
      `Perfect for developing both procedural fluency and conceptual understanding.`,

    'Fractions': (t, s, y, sk) =>
      `Explore fractions with this carefully designed ${y} worksheet${sk}. ` +
      `Students will develop visual understanding of parts of a whole while building the skills needed for more complex fraction work. ` +
      `Suitable for introducing new concepts or consolidating prior learning.`,

    'Geometry': (t, s, y, sk) =>
      `Discover shapes and spatial reasoning with this ${y} geometry worksheet${sk}. ` +
      `Children will explore properties of shapes, develop spatial awareness, and build vocabulary for describing geometric features. ` +
      `Ideal for visual learners and hands-on exploration.`,

    'Measurement': (t, s, y, sk) =>
      `Practise measurement skills with this practical ${y} worksheet${sk}. ` +
      `Students will develop understanding of length, weight, capacity, or time through real-world contexts and meaningful activities. ` +
      `Excellent for connecting maths to everyday life.`,

    'default': (t, s, y, sk) =>
      `This ${y} ${s} worksheet provides essential practice in ${t.toLowerCase()}${sk}. ` +
      `Designed to build confidence and competence, the carefully structured questions help students progress at their own pace. ` +
      `Suitable for classroom use, homework, or additional practice.`,
  }

  const generator = descriptions[topic] || descriptions['default']
  return generator(topic, subtopic, yearGroup, skillsText)
}

/**
 * Generate 3-4 specific learning objectives
 */
function generateLearningObjectives(
  topic: string,
  subtopic: string,
  yearGroup: string,
  skills: string[]
): string[] {
  const baseObjectives = getTopicObjectives(topic, subtopic, yearGroup)
  const skillObjectives = skills.slice(0, 2).map(skill =>
    `Develop proficiency in ${skill.toLowerCase()}`
  )

  // Combine base objectives with skill-specific ones, limit to 4
  const allObjectives = [...baseObjectives, ...skillObjectives]
  return allObjectives.slice(0, 4)
}

/**
 * Get topic-specific learning objectives
 */
function getTopicObjectives(topic: string, subtopic: string, yearGroup: string): string[] {
  const objectives: Record<string, string[]> = {
    'Number': [
      'Recognise and understand number values',
      'Count forwards and backwards with confidence',
      'Compare and order numbers accurately',
      'Develop number sense and mathematical reasoning',
    ],
    'Addition': [
      'Add numbers accurately using efficient strategies',
      'Understand the concept of combining quantities',
      'Develop mental calculation fluency',
      'Apply addition to solve problems',
    ],
    'Subtraction': [
      'Subtract numbers using appropriate methods',
      'Understand subtraction as taking away or finding the difference',
      'Develop inverse operation understanding',
      'Apply subtraction in problem-solving contexts',
    ],
    'Multiplication': [
      'Understand multiplication as repeated addition',
      'Recall times table facts with increasing fluency',
      'Recognise patterns in multiplication',
      'Apply multiplication to solve problems',
    ],
    'Division': [
      'Understand division as sharing equally',
      'Recognise the inverse relationship with multiplication',
      'Develop efficient division strategies',
      'Apply division in real-world contexts',
    ],
    'Fractions': [
      'Recognise and name common fractions',
      'Understand fractions as parts of a whole',
      'Compare and order simple fractions',
      'Find fractions of quantities and shapes',
    ],
    'Geometry': [
      'Identify and name common 2D and 3D shapes',
      'Describe properties of shapes using mathematical vocabulary',
      'Recognise shapes in different orientations',
      'Develop spatial reasoning skills',
    ],
    'Measurement': [
      'Measure accurately using appropriate units',
      'Compare and order measurements',
      'Estimate measurements with increasing accuracy',
      'Solve measurement problems in context',
    ],
    'Counting': [
      'Count objects accurately using one-to-one correspondence',
      'Recognise and write numerals',
      'Count forwards and backwards from any number',
      'Understand that the last number counted represents the total',
    ],
    'default': [
      `Understand key concepts in ${subtopic.toLowerCase()}`,
      `Apply ${topic.toLowerCase()} skills confidently`,
      'Develop mathematical reasoning and problem-solving',
      'Build fluency through regular practice',
    ],
  }

  return objectives[topic] || objectives['default']
}

/**
 * Generate a paragraph explaining how to use the worksheet
 */
function generateHowToUse(
  title: string,
  topic: string,
  subtopic: string,
  yearGroup: string
): string {
  const ageAppropriateGuidance = getAgeAppropriateGuidance(yearGroup)

  return `This worksheet can be used in multiple ways to support ${yearGroup} learners. ` +
    `${ageAppropriateGuidance} ` +
    `For best results, introduce the concept through discussion or demonstration before independent practice, ` +
    `then use this worksheet to consolidate understanding. ` +
    `Consider pairing students for peer support, or use the worksheet for formative assessment to identify areas needing additional attention. ` +
    `Extension activities might include creating similar problems, explaining strategies to a partner, or applying the skills to real-world scenarios.`
}

/**
 * Get age-appropriate guidance based on year group
 */
function getAgeAppropriateGuidance(yearGroup: string): string {
  const guidance: Record<string, string> = {
    'Reception': 'For young learners, work through the first few questions together, using concrete objects like counters or cubes to make abstract concepts tangible.',
    'Year 1': 'Encourage the use of number lines, counters, or drawings to support calculation. Read questions aloud if needed and celebrate each success.',
    'Year 2': 'Students can work more independently but may benefit from working in pairs. Encourage them to explain their thinking and check their answers.',
    'Year 3': 'Allow students to choose their preferred calculation method while ensuring they can explain their reasoning. Challenge faster finishers with extension questions.',
    'Year 4': 'Expect more efficient methods and encourage students to check their work using inverse operations. Discuss different approaches as a class.',
    'Year 5': 'Students should work systematically and show clear working out. Use the worksheet to identify misconceptions and address them promptly.',
    'Year 6': 'Encourage efficient strategies and accurate working. Challenge students to explain the mathematical reasoning behind their answers.',
  }

  return guidance[yearGroup] || 'Support students appropriately based on their individual needs and encourage them to explain their mathematical thinking.'
}

/**
 * Generate suggested audience information
 */
function generateSuggestedFor(yearGroup: string): { ageRange: string; settings: string[] } {
  const ageRanges: Record<string, string> = {
    'Reception': '4-5 years',
    'Year 1': '5-6 years',
    'Year 2': '6-7 years',
    'Year 3': '7-8 years',
    'Year 4': '8-9 years',
    'Year 5': '9-10 years',
    'Year 6': '10-11 years',
  }

  const baseSettings = [
    'Classroom practice',
    'Homework assignments',
    'Independent study',
  ]

  const yearSpecificSettings: Record<string, string[]> = {
    'Reception': ['Parent-guided activities', 'Small group work', 'Morning maths activities'],
    'Year 1': ['Parent-guided activities', 'Morning maths starters', 'Assessment for learning'],
    'Year 2': ['Early finisher activities', 'Revision and consolidation', 'SATs preparation'],
    'Year 3': ['Morning work', 'Intervention groups', 'Holiday practice'],
    'Year 4': ['Times table consolidation', 'Homework clubs', 'Booster sessions'],
    'Year 5': ['SATs preparation', 'Revision sessions', 'Tutoring support'],
    'Year 6': ['SATs preparation', 'Secondary school transition', 'Exam practice'],
  }

  const specificSettings = yearSpecificSettings[yearGroup] || ['Additional practice', 'Extension activities']

  return {
    ageRange: ageRanges[yearGroup] || '5-11 years',
    settings: [...baseSettings, ...specificSettings.slice(0, 2)],
  }
}

/**
 * Helper function to get age range from year group
 */
function getAgeRange(yearGroup: string): string {
  const ranges: Record<string, string> = {
    'Reception': '4-5 year olds',
    'Year 1': '5-6 year olds',
    'Year 2': '6-7 year olds',
    'Year 3': '7-8 year olds',
    'Year 4': '8-9 year olds',
    'Year 5': '9-10 year olds',
    'Year 6': '10-11 year olds',
  }
  return ranges[yearGroup] || 'primary school children'
}
