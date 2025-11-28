// ============================================================================
// HUB CONTENT GENERATOR - SEO-optimized educational content for hub pages
// ============================================================================

import type { HubEducationalContent, HubFAQ, HubSEO } from '@/lib/types/hub'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

// ============================================================================
// EDUCATIONAL CONTENT GENERATOR
// ============================================================================

export function generateHubContent(
  yearGroup: string,
  topicLabel: string,
  subtopicLabel: string,
  ageRange: string,
  learningObjectives: string[]
): HubEducationalContent {
  const ageDescription = getAgeDescription(ageRange)
  const skillLevel = getSkillLevel(yearGroup)

  return {
    introduction: generateIntroduction(yearGroup, subtopicLabel, ageRange),
    whyImportant: generateWhyImportant(subtopicLabel, yearGroup, skillLevel),
    howToUse: generateHowToUse(subtopicLabel, ageDescription),
    teachingTips: generateTeachingTips(subtopicLabel, yearGroup, skillLevel),
    skillsDeveloped: generateSkillsDeveloped(subtopicLabel, learningObjectives),
    curriculumAlignment: generateCurriculumAlignment(yearGroup, topicLabel, subtopicLabel),
    ageAppropriate: generateAgeAppropriate(yearGroup, ageRange, subtopicLabel),
  }
}

function generateIntroduction(yearGroup: string, subtopicLabel: string, ageRange: string): string {
  return `Welcome to our collection of free ${subtopicLabel.toLowerCase()} worksheets designed specifically for children ages ${ageRange}. These printable resources are carefully crafted to be age-appropriate and developmentally suitable, making them perfect for classroom use, homework assignments, or home learning activities. Each worksheet is designed to build confidence and develop essential mathematical skills in a fun, engaging way.`
}

function generateWhyImportant(subtopicLabel: string, yearGroup: string, skillLevel: string): string {
  const subtopicLower = subtopicLabel.toLowerCase()

  const importanceMap: Record<string, string> = {
    'counting': `Counting is the foundation of all mathematics. For ${yearGroup} children, mastering counting skills builds number sense and prepares them for more complex operations like addition and subtraction.`,
    'number': `Understanding numbers is essential for mathematical development. These ${subtopicLower} worksheets help children recognize, compare, and work with numbers confidently.`,
    'addition': `Addition is one of the four fundamental operations in mathematics. Building strong addition skills at the ${skillLevel} level creates a solid foundation for future mathematical learning.`,
    'subtraction': `Subtraction skills are crucial for problem-solving and everyday mathematics. These worksheets help ${yearGroup} children understand the concept of "taking away" and finding differences.`,
    'multiplication': `Multiplication is a key skill that extends addition concepts. For ${yearGroup} learners, understanding multiplication opens doors to more advanced mathematical concepts.`,
    'division': `Division skills help children understand sharing, grouping, and the inverse relationship with multiplication. These concepts are essential for everyday problem-solving.`,
    'shape': `Understanding shapes develops spatial awareness and geometric thinking. These skills are important for mathematics and many real-world applications.`,
    'measurement': `Measurement skills connect mathematics to the real world. Children learn to compare, estimate, and use standard units in practical contexts.`,
    'fraction': `Fractions introduce children to parts of a whole, which is fundamental for later work with decimals, percentages, and ratios.`,
    'time': `Understanding time is an essential life skill. These worksheets help children read clocks and understand the passage of time.`,
    'money': `Money skills connect mathematics to everyday life, helping children understand value, making change, and basic financial literacy.`,
    'pattern': `Recognizing and creating patterns develops logical thinking and is foundational for algebra and problem-solving.`,
    'position': `Understanding position and direction develops spatial vocabulary and reasoning skills essential for geometry.`,
    'statistics': `Working with data helps children organize information, draw conclusions, and develop analytical thinking skills.`,
  }

  // Find matching key
  for (const [key, value] of Object.entries(importanceMap)) {
    if (subtopicLower.includes(key)) {
      return value
    }
  }

  // Default
  return `${subtopicLabel} is an important part of the ${yearGroup} mathematics curriculum. These worksheets provide structured practice to help children develop confidence and competence in this area.`
}

function generateHowToUse(subtopicLabel: string, ageDescription: string): string {
  return `These ${subtopicLabel.toLowerCase()} worksheets are designed for ${ageDescription}. Simply download and print the worksheets you need. Each worksheet can be used independently or as part of a structured learning sequence. We recommend starting with easier worksheets and progressing to more challenging ones as confidence grows. For best results, discuss the concepts with your child before and after completing each worksheet.`
}

function generateTeachingTips(subtopicLabel: string, yearGroup: string, skillLevel: string): string[] {
  const baseTips = [
    `Use concrete objects (counters, blocks, toys) alongside worksheets for hands-on learning`,
    `Praise effort and progress, not just correct answers`,
    `Work in short, focused sessions of 10-15 minutes for ${yearGroup} children`,
    `Connect worksheet activities to real-life situations`,
    `Review completed worksheets together to reinforce learning`,
  ]

  const subtopicLower = subtopicLabel.toLowerCase()

  if (subtopicLower.includes('counting')) {
    baseTips.push(`Count objects around the house or classroom to practice`, `Use songs and rhymes to make counting fun`)
  } else if (subtopicLower.includes('addition') || subtopicLower.includes('subtraction')) {
    baseTips.push(`Use number lines to visualize operations`, `Practice mental math alongside written work`)
  } else if (subtopicLower.includes('shape')) {
    baseTips.push(`Go on a shape hunt to find shapes in the environment`, `Use building blocks to create and explore shapes`)
  } else if (subtopicLower.includes('time')) {
    baseTips.push(`Reference real clocks throughout the day`, `Create a daily schedule to practice time concepts`)
  } else if (subtopicLower.includes('money')) {
    baseTips.push(`Use real or play coins for hands-on practice`, `Set up a pretend shop for practical money skills`)
  }

  return baseTips.slice(0, 6)
}

function generateSkillsDeveloped(subtopicLabel: string, learningObjectives: string[]): string[] {
  const baseSkills = [
    'Mathematical reasoning',
    'Problem-solving',
    'Number sense',
    'Fine motor skills (writing)',
    'Following instructions',
    'Independent learning',
  ]

  // Add first 2 learning objectives as skills
  const relevantObjectives = learningObjectives.slice(0, 2)

  return [...relevantObjectives, ...baseSkills.slice(0, 4)]
}

function generateCurriculumAlignment(yearGroup: string, topicLabel: string, subtopicLabel: string): string {
  const ageRange = yearGroup === 'Reception' ? '4-5' :
                   yearGroup === 'Year 1' ? '5-6' :
                   yearGroup === 'Year 2' ? '6-7' :
                   yearGroup === 'Year 3' ? '7-8' :
                   yearGroup === 'Year 4' ? '8-9' :
                   yearGroup === 'Year 5' ? '9-10' : '10-11'

  return `These ${subtopicLabel.toLowerCase()} worksheets are designed for children ages ${ageRange}. They cover age-appropriate ${topicLabel} concepts, ensuring your child develops the skills expected at this developmental stage. All worksheets are created by experienced educators with deep understanding of primary mathematics education.`
}

function generateAgeAppropriate(yearGroup: string, ageRange: string, subtopicLabel: string): string {
  return `These worksheets are specifically designed for children aged ${ageRange} (${yearGroup}). The difficulty level, visual design, and content complexity are all calibrated for this age group. Clear instructions, appropriate font sizes, and engaging illustrations make these worksheets accessible and enjoyable for young learners.`
}

// ============================================================================
// FAQ GENERATOR
// ============================================================================

export function generateHubFAQ(yearGroup: string, subtopicLabel: string, ageRange: string): HubFAQ[] {
  const subtopicLower = subtopicLabel.toLowerCase()

  return [
    {
      question: `Are these ${subtopicLower} worksheets free to download?`,
      answer: `Yes, all our ${subtopicLower} worksheets are completely free to download and print. There are no hidden charges or subscriptions required. Simply click the download button and print as many copies as you need for personal or classroom use.`,
    },
    {
      question: `What age group are these ${subtopicLower} worksheets suitable for?`,
      answer: `These worksheets are designed for children aged ${ageRange}. They are developmentally appropriate and suitable for children at this age, whether used in school or at home.`,
    },
    {
      question: `How do I use these ${subtopicLower} worksheets?`,
      answer: `Simply download the PDF file, print it out, and your child can complete the worksheet with a pencil. We recommend working alongside younger children to provide support and discuss the concepts. Each worksheet includes clear instructions.`,
    },
    {
      question: `Are these worksheets aligned with learning standards?`,
      answer: `Yes, all our worksheets are carefully designed to match age-appropriate learning objectives. They cover the key developmental milestones for ${subtopicLower} at this level.`,
    },
    {
      question: `Can I use these worksheets in my classroom?`,
      answer: `Absolutely! Teachers are welcome to download and print these worksheets for classroom use. They make excellent resources for whole-class activities, independent work, homework assignments, or intervention sessions.`,
    },
  ]
}

// ============================================================================
// SEO GENERATOR
// ============================================================================

export function generateHubSEO(
  yearGroup: string,
  subtopicLabel: string,
  ageRange: string,
  yearGroupSlug: string,
  subtopicSlug: string
): HubSEO {
  const subtopicLower = subtopicLabel.toLowerCase()
  const yearGroupLower = yearGroup.toLowerCase()

  // Get US grade equivalent for dual terminology
  const usGrade = getUSGradeLabel(yearGroup)
  const usGradeLower = usGrade.toLowerCase()

  // Generate primary keyword variations (US-first, then UK)
  const primaryKeywords = [
    `${subtopicLower} printables ${usGradeLower}`,
    `${subtopicLower} printables ${yearGroupLower}`,
    `free ${subtopicLower} printables`,
    `${usGradeLower} ${subtopicLower} printables`,
    `${yearGroupLower} ${subtopicLower} printables`,
    `${subtopicLower} worksheets free printable`,
  ]

  // Generate secondary keywords (both US and UK terms)
  const secondaryKeywords = [
    `${ageRange} math printables`,
    `${ageRange} maths printables`,
    'free math printables',
    'free maths printables',
    `${usGradeLower} math resources`,
    `${yearGroupLower} maths resources`,
    'elementary math printables',
    'primary maths printables',
  ]

  // Dual label for SEO title (US-first)
  const dualLabel = yearGroup === 'Reception'
    ? 'Kindergarten / Reception'
    : `${usGrade} / ${yearGroup}`

  return {
    title: `Free ${subtopicLabel} Printables for ${dualLabel} | Ages ${ageRange}`,
    description: `Download free ${subtopicLower} printables for ${dualLabel} (ages ${ageRange}). Curriculum-aligned math resources perfect for home learning and classroom use. No signup required.`,
    keywords: [...primaryKeywords, ...secondaryKeywords],
    canonicalUrl: `${BASE_URL}/free-printables/${yearGroupSlug}/${subtopicSlug}`,
  }
}

/**
 * Get US grade label for a UK year group
 */
function getUSGradeLabel(yearGroup: string): string {
  const usLabels: Record<string, string> = {
    Reception: 'Kindergarten',
    'Year 1': 'Grade 1',
    'Year 2': 'Grade 2',
    'Year 3': 'Grade 3',
    'Year 4': 'Grade 4',
    'Year 5': 'Grade 5',
    'Year 6': 'Grade 6',
  }
  return usLabels[yearGroup] || yearGroup
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getAgeDescription(ageRange: string): string {
  const ageMap: Record<string, string> = {
    '4-5 years': 'young children aged 4-5 who are beginning their mathematical journey',
    '5-6 years': 'children aged 5-6 who are developing foundational maths skills',
    '6-7 years': 'children aged 6-7 who are building on early maths concepts',
    '7-8 years': 'children aged 7-8 who are developing mathematical fluency',
    '8-9 years': 'children aged 8-9 who are consolidating their maths skills',
    '9-10 years': 'children aged 9-10 who are extending their mathematical knowledge',
    '10-11 years': 'children aged 10-11 preparing for secondary school mathematics',
  }

  return ageMap[ageRange] || `children aged ${ageRange}`
}

function getSkillLevel(yearGroup: string): string {
  const levelMap: Record<string, string> = {
    Reception: 'foundation (ages 4-5)',
    'Year 1': 'early primary (ages 5-6)',
    'Year 2': 'primary (ages 6-7)',
    'Year 3': 'primary (ages 7-8)',
    'Year 4': 'intermediate (ages 8-9)',
    'Year 5': 'upper primary (ages 9-10)',
    'Year 6': 'advanced primary (ages 10-11)',
  }

  return levelMap[yearGroup] || 'primary'
}
