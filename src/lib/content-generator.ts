/**
 * WORKSHEET CONTENT GENERATOR
 *
 * Generates unique, SEO-friendly educational content for worksheets
 * displayed on freemathprintable.com. This is a deterministic generator
 * that creates consistent, high-quality content based on worksheet metadata.
 *
 * Use this for:
 * - Fallback when AI content generation fails
 * - Quick preview content before AI generation completes
 * - Offline/testing scenarios
 *
 * For production, prefer educationalContentService.ts which uses AI.
 */

export interface WorksheetInput {
  title: string
  topic: string
  subtopic: string
  year_group: string
  skills?: string[]
  // Optional fields that enhance content quality
  difficulty?: 'easy' | 'average' | 'hard'
  question_count?: number
  visual_theme?: string
  activity_type?: string
  seasonal_theme?: string
}

export interface WorksheetContent {
  // Maps to LibraryWorksheet fields (snake_case for DB compatibility)
  description: string                    // Short description (2-3 sentences)
  educational_benefits: string           // Long-form SEO content (200-300 words)
  learning_objectives: string[]          // 3-4 specific objectives
  how_to_use: string                     // Teacher guidance paragraph
  skills_developed: string[]             // Skills tags
  estimated_time_minutes: number         // Completion time estimate
  curriculum_standards: string[]         // UK National Curriculum alignment
  faq: Array<{ question: string; answer: string }>  // Common questions
  suggested_for: {                       // Audience info (for display, not DB)
    age_range: string
    settings: string[]
  }
}

/**
 * Generate comprehensive content for a worksheet
 * Creates unique descriptions, learning objectives, usage guidance, and audience info
 */
export function generateWorksheetContent(worksheet: WorksheetInput): WorksheetContent {
  const {
    title,
    topic,
    subtopic,
    year_group,
    skills = [],
    difficulty = 'average',
    question_count = 5,
    visual_theme,
    activity_type,
    seasonal_theme,
  } = worksheet

  const learningObjectives = generateLearningObjectives(topic, subtopic, year_group, skills)

  return {
    description: generateDescription(title, topic, subtopic, year_group, skills),
    educational_benefits: generateEducationalBenefits(title, topic, subtopic, year_group, visual_theme, activity_type),
    learning_objectives: learningObjectives,
    how_to_use: generateHowToUse(title, topic, subtopic, year_group),
    skills_developed: generateSkillsDeveloped(topic, subtopic, skills),
    estimated_time_minutes: estimateCompletionTime(question_count, difficulty, year_group),
    curriculum_standards: generateCurriculumStandards(topic, subtopic, year_group),
    faq: generateFAQ(title, topic, subtopic, year_group, question_count),
    suggested_for: generateSuggestedFor(year_group),
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
function generateSuggestedFor(yearGroup: string): { age_range: string; settings: string[] } {
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
    age_range: ageRanges[yearGroup] || '5-11 years',
    settings: [...baseSettings, ...specificSettings.slice(0, 2)],
  }
}

/**
 * Generate SEO-optimized educational benefits (200-300 words)
 */
function generateEducationalBenefits(
  title: string,
  topic: string,
  subtopic: string,
  yearGroup: string,
  visualTheme?: string,
  activityType?: string
): string {
  const ageRange = getAgeRange(yearGroup)
  const themeText = visualTheme ? ` featuring engaging ${visualTheme} visuals` : ''
  const activityText = activityType
    ? ` The ${activityType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').toLowerCase()} format`
    : ' The carefully structured format'

  return `This ${yearGroup} ${subtopic.split('-').join(' ')} worksheet provides essential practice aligned with the UK National Curriculum${themeText}. ` +
    `Designed specifically for ${ageRange}, the worksheet builds strong mathematical foundations through age-appropriate questions that develop both procedural fluency and conceptual understanding.\n\n` +
    `${activityText} helps children develop confidence in ${topic.toLowerCase()} while building transferable skills including problem-solving, logical reasoning, and mathematical communication. ` +
    `Regular practice with worksheets like this supports the development of number sense and mathematical fluency that students need for success in later years.\n\n` +
    `Teachers value this resource for its clear layout, appropriate challenge level, and direct alignment with curriculum objectives. ` +
    `The worksheet works equally well for whole-class teaching, small group intervention, or independent practice. ` +
    `Parents find it useful for supporting learning at home, providing meaningful practice without requiring specialist mathematical knowledge. ` +
    `Whether used in school or at home, this worksheet helps ${yearGroup} students build the skills and confidence they need to succeed in mathematics.`
}

/**
 * Generate skills developed list
 */
function generateSkillsDeveloped(topic: string, subtopic: string, inputSkills: string[]): string[] {
  const coreSkills: Record<string, string[]> = {
    'Number': ['Number recognition', 'Counting skills', 'Number sense'],
    'Addition': ['Mental addition', 'Written calculation', 'Number bonds'],
    'Subtraction': ['Mental subtraction', 'Written calculation', 'Inverse operations'],
    'Multiplication': ['Times table recall', 'Multiplication strategies', 'Pattern recognition'],
    'Division': ['Division facts', 'Sharing equally', 'Remainders understanding'],
    'Fractions': ['Fraction recognition', 'Part-whole relationships', 'Fraction comparison'],
    'Geometry': ['Shape recognition', 'Spatial reasoning', 'Mathematical vocabulary'],
    'Measurement': ['Measuring skills', 'Unit conversion', 'Estimation'],
    'Counting': ['One-to-one correspondence', 'Cardinality', 'Number sequence'],
  }

  const transferableSkills = [
    'Problem-solving',
    'Logical thinking',
    'Concentration',
    'Independent working',
  ]

  const topicSkills = coreSkills[topic] || [`${topic} understanding`]

  // Combine input skills, topic skills, and transferable skills
  const allSkills = [...new Set([...inputSkills, ...topicSkills, ...transferableSkills])]
  return allSkills.slice(0, 6)
}

/**
 * Estimate completion time based on question count, difficulty, and year group
 */
function estimateCompletionTime(
  questionCount: number,
  difficulty: 'easy' | 'average' | 'hard',
  yearGroup: string
): number {
  // Base time per question varies by year group (younger = slower)
  const baseTimePerQuestion: Record<string, number> = {
    'Reception': 3,
    'Year 1': 2.5,
    'Year 2': 2,
    'Year 3': 2,
    'Year 4': 1.5,
    'Year 5': 1.5,
    'Year 6': 1.5,
  }

  const difficultyMultiplier: Record<string, number> = {
    'easy': 0.8,
    'average': 1,
    'hard': 1.3,
  }

  const baseTime = baseTimePerQuestion[yearGroup] || 2
  const multiplier = difficultyMultiplier[difficulty] || 1

  // Calculate and round to nearest 5 minutes
  const rawTime = questionCount * baseTime * multiplier
  return Math.max(5, Math.round(rawTime / 5) * 5)
}

/**
 * Generate UK National Curriculum standards alignment
 */
function generateCurriculumStandards(topic: string, subtopic: string, yearGroup: string): string[] {
  const standards: Record<string, Record<string, string[]>> = {
    'Reception': {
      'default': [
        'ELG Number: Children count reliably with numbers from 1 to 20',
        'ELG Number: Children say which number is one more or one less than a given number',
      ],
      'counting': [
        'ELG Number: Children count reliably with numbers from 1 to 20',
        'ELG Number: Children place numbers in order and say which is more or less',
      ],
      'number-bonds': [
        'ELG Number: Children use quantities and objects to add and subtract two single-digit numbers',
        'Development Matters: Explore the composition of numbers to 10',
      ],
    },
    'Year 1': {
      'default': [
        'NC Year 1: Count to and across 100 forwards and backwards',
        'NC Year 1: Read and write numbers from 1 to 20 in numerals and words',
      ],
      'addition': [
        'NC Year 1: Add one-digit and two-digit numbers to 20, including zero',
        'NC Year 1: Represent and use number bonds within 20',
      ],
      'subtraction': [
        'NC Year 1: Subtract one-digit and two-digit numbers to 20, including zero',
        'NC Year 1: Solve one-step problems involving addition and subtraction',
      ],
    },
    'Year 2': {
      'default': [
        'NC Year 2: Count in steps of 2, 3, and 5 from 0, and in tens from any number',
        'NC Year 2: Recognise the place value of each digit in a two-digit number',
      ],
      'addition': [
        'NC Year 2: Add numbers using concrete objects, pictorial representations, and mentally',
        'NC Year 2: Recall and use addition facts to 20 fluently',
      ],
    },
    'Year 3': {
      'default': [
        'NC Year 3: Count from 0 in multiples of 4, 8, 50 and 100',
        'NC Year 3: Recognise the place value of each digit in a three-digit number',
      ],
    },
    'Year 4': {
      'default': [
        'NC Year 4: Count in multiples of 6, 7, 9, 25 and 1000',
        'NC Year 4: Recognise the place value of each digit in a four-digit number',
      ],
    },
    'Year 5': {
      'default': [
        'NC Year 5: Read, write, order and compare numbers to at least 1,000,000',
        'NC Year 5: Determine the value of each digit in numbers up to 1,000,000',
      ],
    },
    'Year 6': {
      'default': [
        'NC Year 6: Read, write, order and compare numbers up to 10,000,000',
        'NC Year 6: Use negative numbers in context and calculate intervals across zero',
      ],
    },
  }

  const yearStandards = standards[yearGroup] || {}
  const subtopicKey = subtopic.toLowerCase().replace(/\s+/g, '-')

  return yearStandards[subtopicKey] || yearStandards['default'] || [
    `${yearGroup} Mathematics: ${topic} - ${subtopic}`,
  ]
}

/**
 * Generate FAQ section
 */
function generateFAQ(
  title: string,
  topic: string,
  subtopic: string,
  yearGroup: string,
  questionCount: number
): Array<{ question: string; answer: string }> {
  const ageRange = getAgeRange(yearGroup)
  const estimatedTime = estimateCompletionTime(questionCount, 'average', yearGroup)

  return [
    {
      question: `What age is this ${subtopic.split('-').join(' ')} worksheet suitable for?`,
      answer: `This worksheet is designed for ${yearGroup} students, typically ${ageRange} in UK primary schools. The content and difficulty level are carefully matched to the National Curriculum expectations for this age group.`,
    },
    {
      question: `How long does this worksheet take to complete?`,
      answer: `Most ${yearGroup} students complete this ${questionCount}-question worksheet in approximately ${estimatedTime} minutes. However, this varies based on individual ability and whether students are working independently or with support.`,
    },
    {
      question: `What skills does this worksheet help develop?`,
      answer: `This worksheet develops ${topic.toLowerCase()} skills, particularly ${subtopic.split('-').join(' ')}. It also builds transferable skills including problem-solving, concentration, and mathematical reasoning.`,
    },
    {
      question: `Can I use this worksheet for homework?`,
      answer: `Yes, this worksheet is ideal for homework as it provides focused practice that reinforces classroom learning. The clear layout means children can work independently, though younger students may benefit from adult support.`,
    },
    {
      question: `Is there an answer sheet included?`,
      answer: `Yes, answers are provided to help parents and teachers quickly check work. The interactive online version also provides immediate feedback for self-marking.`,
    },
  ]
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
