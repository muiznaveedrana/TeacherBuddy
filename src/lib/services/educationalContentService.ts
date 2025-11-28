/**
 * EDUCATIONAL CONTENT GENERATION SERVICE
 *
 * Generates rich, SEO-optimized educational content for library worksheets
 * using Gemini AI. This includes learning objectives, teacher guidance,
 * benefits description, skills, and FAQs.
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export interface WorksheetMetadata {
  title: string
  year_group: string
  topic: string
  subtopic: string
  difficulty?: string
  question_count?: number
  visual_theme?: string
  activity_type?: string
  seasonal_theme?: string
}

export interface EducationalContent {
  learning_objectives: string[]
  how_to_use: string
  educational_benefits: string
  skills_developed: string[]
  estimated_time_minutes: number
  curriculum_standards: string[]
  faq: Array<{question: string; answer: string}>
}

/**
 * Generate comprehensive educational content for a worksheet
 */
export async function generateEducationalContent(
  metadata: WorksheetMetadata
): Promise<EducationalContent> {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.3, // Low temperature for consistent, factual content
        maxOutputTokens: 2000,
      }
    })

    const prompt = buildEducationalContentPrompt(metadata)
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response')
    }

    const content: EducationalContent = JSON.parse(jsonMatch[0])

    // Parse estimated_time_minutes to handle ranges or invalid values
    let estimatedTime = estimateTime(metadata)
    if (content.estimated_time_minutes) {
      const timeValue = typeof content.estimated_time_minutes === 'number'
        ? content.estimated_time_minutes
        : typeof content.estimated_time_minutes === 'string'
          ? parseInt(content.estimated_time_minutes.split('-')[0]) // Take first value from range
          : estimateTime(metadata)

      if (!isNaN(timeValue) && timeValue > 0) {
        estimatedTime = timeValue
      }
    }

    // Validate and apply defaults
    return {
      learning_objectives: content.learning_objectives || [],
      how_to_use: content.how_to_use || generateDefaultHowToUse(metadata),
      educational_benefits: content.educational_benefits || generateDefaultBenefits(metadata),
      skills_developed: content.skills_developed || [],
      estimated_time_minutes: estimatedTime,
      curriculum_standards: content.curriculum_standards || [],
      faq: content.faq || generateDefaultFAQ(metadata),
    }

  } catch (error) {
    console.error('❌ Educational content generation failed:', error)

    // Fallback: return default content
    return {
      learning_objectives: generateDefaultObjectives(metadata),
      how_to_use: generateDefaultHowToUse(metadata),
      educational_benefits: generateDefaultBenefits(metadata),
      skills_developed: generateDefaultSkills(metadata),
      estimated_time_minutes: estimateTime(metadata),
      curriculum_standards: generateDefaultStandards(metadata),
      faq: generateDefaultFAQ(metadata),
    }
  }
}

/**
 * Build the AI prompt for generating educational content
 */
function buildEducationalContentPrompt(metadata: WorksheetMetadata): string {
  const { year_group, topic, subtopic, difficulty, question_count, visual_theme, seasonal_theme } = metadata

  return `You are an educational content writer specializing in UK primary school mathematics.

Generate comprehensive educational content for a worksheet with these details:

📚 Worksheet Details:
- Year Group: ${year_group}
- Topic: ${topic}
- Subtopic: ${subtopic}
- Difficulty: ${difficulty || 'average'}
- Number of Questions: ${question_count || 5}
${visual_theme ? `- Visual Theme: ${visual_theme}` : ''}
${seasonal_theme ? `- Seasonal Theme: ${seasonal_theme}` : ''}

Generate the following content in valid JSON format:

{
  "learning_objectives": [
    "Specific learning objective 1 (start with action verb: identify, understand, apply, etc.)",
    "Specific learning objective 2",
    "Specific learning objective 3"
  ],
  "how_to_use": "2-3 paragraph teacher guidance on how to effectively use this worksheet. Include: when to use it, differentiation tips, common mistakes to watch for, and extension ideas. Write in a friendly, professional tone.",
  "educational_benefits": "200-300 word rich description of the educational value and benefits of this worksheet. Include: curriculum alignment, skill development, confidence building, real-world applications, and why this worksheet is valuable for ${year_group} students. Write for SEO (naturally include keywords: ${year_group}, ${topic}, ${subtopic}, worksheet, practice, skills).",
  "skills_developed": [
    "Core mathematical skill 1",
    "Core mathematical skill 2",
    "Transferable skill 1 (e.g., problem-solving, logical thinking)",
    "Transferable skill 2"
  ],
  "estimated_time_minutes": 20 (single integer only, no ranges or text - estimate 15-30 based on complexity),
  "curriculum_standards": [
    "Age-appropriate learning objective 1",
    "Age-appropriate learning objective 2"
  ],
  "faq": [
    {
      "question": "What age is this worksheet suitable for?",
      "answer": "Specific answer for ${year_group}"
    },
    {
      "question": "What skills does this worksheet help develop?",
      "answer": "Brief overview of key skills"
    },
    {
      "question": "How long does this worksheet take to complete?",
      "answer": "Estimated time with context"
    },
    {
      "question": "Can I customize this worksheet?",
      "answer": "Yes, you can generate similar worksheets with different themes and difficulty levels using our worksheet generator."
    }
  ]
}

IMPORTANT:
- Be specific and accurate for ${year_group} level
- Use UK educational terminology (Reception, Year 1-6, etc.)
- Educational benefits MUST be 200-300 words for SEO value
- Use professional, teacher-friendly language
- Include relevant curriculum alignment
- Respond ONLY with valid JSON, no markdown code blocks`
}

/**
 * Fallback generators for when AI fails
 */

function generateDefaultObjectives(metadata: WorksheetMetadata): string[] {
  return [
    `Understand key concepts in ${metadata.subtopic}`,
    `Practice ${metadata.topic} skills at ${metadata.year_group} level`,
    `Build confidence in mathematical problem-solving`
  ]
}

function generateDefaultHowToUse(metadata: WorksheetMetadata): string {
  return `This ${metadata.year_group} worksheet is ideal for ${metadata.topic} practice, focusing on ${metadata.subtopic}. Use it as independent practice after introducing the concept, for homework reinforcement, or as a formative assessment tool.

For differentiation, encourage struggling students to use concrete materials or draw pictures to support their thinking. Challenge higher-attaining students to explain their reasoning or create their own similar questions.

Common mistakes to watch for include misunderstanding the question format or rushing through without checking answers. Encourage students to work carefully and check their work.`
}

function generateDefaultBenefits(metadata: WorksheetMetadata): string {
  return `This ${metadata.year_group} ${metadata.topic} worksheet provides essential practice in ${metadata.subtopic}, designed to be age-appropriate and developmentally suitable. Designed specifically for ${metadata.year_group} students, this worksheet helps build strong foundations in mathematical understanding through carefully structured questions that progress in difficulty.

The worksheet develops core mathematical skills while also building transferable skills such as problem-solving, logical thinking, and attention to detail. Regular practice with worksheets like this helps students build confidence, develop fluency, and prepare for more advanced mathematical concepts.

Teachers value this resource for its clear layout, appropriate challenge level, and alignment with curriculum objectives. Students benefit from the engaging ${metadata.visual_theme ? metadata.visual_theme + ' themed ' : ''}format that makes learning enjoyable and accessible. This worksheet is perfect for classroom use, homework assignments, or additional practice for students who need extra support or challenge in ${metadata.topic}.`
}

function generateDefaultSkills(metadata: WorksheetMetadata): string[] {
  return [
    `${metadata.topic} understanding`,
    'Problem-solving',
    'Logical thinking',
    'Mathematical reasoning',
    'Independent working'
  ]
}

function estimateTime(metadata: WorksheetMetadata): number {
  const baseTime = 3 // minutes per question
  const count = metadata.question_count || 5
  const difficultyMultiplier = metadata.difficulty === 'hard' ? 1.5 : metadata.difficulty === 'easy' ? 0.8 : 1

  return Math.round(count * baseTime * difficultyMultiplier)
}

function generateDefaultStandards(metadata: WorksheetMetadata): string[] {
  // Map year groups to curriculum objectives (simplified)
  const yearMapping: Record<string, string[]> = {
    'Reception': ['Early Years - Numbers', 'Early Years - Shape, Space and Measures'],
    'Year 1': ['NC Year 1 - Number and Place Value', 'NC Year 1 - Addition and Subtraction'],
    'Year 2': ['NC Year 2 - Number and Place Value', 'NC Year 2 - Addition and Subtraction'],
    'Year 3': ['NC Year 3 - Number and Place Value', 'NC Year 3 - Addition, Subtraction, Multiplication and Division'],
    'Year 4': ['NC Year 4 - Number and Place Value', 'NC Year 4 - Addition, Subtraction, Multiplication and Division'],
    'Year 5': ['NC Year 5 - Number and Place Value', 'NC Year 5 - Addition, Subtraction, Multiplication and Division'],
    'Year 6': ['NC Year 6 - Number and Place Value', 'NC Year 6 - Ratio and Proportion']
  }

  return yearMapping[metadata.year_group] || ['Age-appropriate Mathematics']
}

function generateDefaultFAQ(metadata: WorksheetMetadata): Array<{question: string; answer: string}> {
  return [
    {
      question: `What age is this ${metadata.topic} worksheet suitable for?`,
      answer: `This worksheet is designed for ${metadata.year_group} students (typically ages ${getAgeRange(metadata.year_group)}) in UK primary schools.`
    },
    {
      question: 'What skills does this worksheet help develop?',
      answer: `This worksheet helps develop ${metadata.topic} skills, particularly ${metadata.subtopic}, along with problem-solving abilities and mathematical reasoning.`
    },
    {
      question: 'How long does this worksheet take to complete?',
      answer: `Most ${metadata.year_group} students complete this worksheet in approximately ${estimateTime(metadata)} minutes, though this can vary based on individual ability and familiarity with ${metadata.subtopic}.`
    },
    {
      question: 'Can I customize this worksheet?',
      answer: 'Yes! You can generate similar worksheets with different themes, difficulty levels, and question types using our AI worksheet generator.'
    }
  ]
}

function getAgeRange(yearGroup: string): string {
  const ageMap: Record<string, string> = {
    'Reception': '4-5',
    'Year 1': '5-6',
    'Year 2': '6-7',
    'Year 3': '7-8',
    'Year 4': '8-9',
    'Year 5': '9-10',
    'Year 6': '10-11'
  }
  return ageMap[yearGroup] || '5-11'
}
