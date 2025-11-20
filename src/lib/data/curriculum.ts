/**
 * UK National Curriculum Year Group to Topic to Subtopic mapping
 * This data structure drives the curriculum-aligned UI flow
 */

export interface CurriculumTopic {
  label: string
  subtopics: CurriculumSubtopic[]
  learningObjectives: string[]
  complexity: string
}

export interface CurriculumSubtopic {
  value: string
  label: string
  description?: string
}

export interface YearGroupCurriculum {
  [yearGroup: string]: {
    ageRange: string
    description: string
    topics: {
      [topicId: string]: CurriculumTopic
    }
  }
}

export const YEAR_GROUPS = [
  { value: 'Reception', label: 'Reception (Ages 4-5)', disabled: false },
  { value: 'Year 1', label: 'Year 1 (Ages 5-6)', disabled: false },
  { value: 'Year 2', label: 'Year 2 (Ages 6-7)', disabled: false },
  { value: 'Year 3', label: 'Year 3 (Ages 7-8)', disabled: true },
  { value: 'Year 4', label: 'Year 4 (Ages 8-9)', disabled: true },
  { value: 'Year 5', label: 'Year 5 (Ages 9-10)', disabled: true },
  { value: 'Year 6', label: 'Year 6 (Ages 10-11)', disabled: true }
]

export const CURRICULUM_MAPPING: YearGroupCurriculum = {
  'Reception': {
    ageRange: '4-5 years',
    description: 'Early Years Foundation Stage mathematics',
    topics: {
      'number-counting': {
        label: 'Number and Counting',
        subtopics: [
          { value: 'counting-to-10', label: 'Counting to 10' },
          { value: 'number-recognition', label: 'Number Recognition' },
          { value: 'more-or-less', label: 'More or Less' },
          { value: 'early-addition', label: 'Early Addition' },
          { value: 'early-subtraction', label: 'Early Subtraction' },
          { value: 'number-bonds', label: 'Number Bonds' },
          { value: 'subitising', label: 'Subitising' }
        ],
        learningObjectives: ['Count reliably to 10', 'Recognize numerals 1-10', 'Compare quantities', 'Combine and separate quantities', 'Recognize bonds to 5 and 10', 'Instantly recognize quantities without counting'],
        complexity: 'Very simple, visual-heavy, hands-on activities'
      },
      'shape-space': {
        label: 'Shape and Space',
        subtopics: [
          { value: 'basic-shapes', label: 'Basic Shapes' },
          { value: 'patterns', label: 'Simple Patterns' },
          { value: 'size-comparison', label: 'Size Comparison' },
          { value: 'position-direction', label: 'Position and Direction' }
        ],
        learningObjectives: ['Name basic 2D shapes', 'Create and continue patterns', 'Compare sizes', 'Use positional language'],
        complexity: 'Concrete examples with visual aids'
      },
      'measurement': {
        label: 'Measurement',
        subtopics: [
          { value: 'length-comparison', label: 'Length Comparison' },
          { value: 'weight-comparison', label: 'Weight Comparison' },
          { value: 'capacity', label: 'Capacity' },
          { value: 'time-concepts', label: 'Time Concepts' }
        ],
        learningObjectives: ['Compare lengths and heights', 'Understand heavy and light', 'Explore capacity (full, empty, half)', 'Sequence daily events'],
        complexity: 'Practical experiences with everyday objects'
      }
    }
  },
  'Year 1': {
    ageRange: '5-6 years',
    description: 'Foundation number concepts and basic operations',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-20', label: 'Numbers to 20' },
          { value: 'counting-forwards-backwards', label: 'Counting Forwards and Backwards' },
          { value: 'number-bonds-10', label: 'Number Bonds to 10' }
        ],
        learningObjectives: ['Count to and across 100', 'Read and write numbers to 20', 'Use number bonds to 10'],
        complexity: 'Simple language, concrete examples, minimal text'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'adding-to-20', label: 'Adding within 20' },
          { value: 'subtracting-within-20', label: 'Subtracting within 20' },
          { value: 'word-problems-simple', label: 'Simple Word Problems' }
        ],
        learningObjectives: ['Add and subtract one-digit numbers', 'Solve simple word problems', 'Use concrete objects'],
        complexity: 'Visual aids and manipulatives encouraged'
      },
      'measurement': {
        label: 'Measurement',
        subtopics: [
          { value: 'length-height', label: 'Length and Height' },
          { value: 'weight-capacity', label: 'Weight and Capacity' },
          { value: 'time-days-months', label: 'Time - Days and Months' },
          { value: 'coins-recognition', label: 'Money - Coins Recognition' }
        ],
        learningObjectives: ['Compare and measure length', 'Recognize coins and notes', 'Tell time to the hour'],
        complexity: 'Real-world contexts and practical activities'
      },
      'geometry-shapes': {
        label: 'Geometry: Shapes',
        subtopics: [
          { value: '2d-shapes-basic', label: '2D Shapes (Basic)' },
          { value: '3d-shapes-basic', label: '3D Shapes (Basic)' }
        ],
        learningObjectives: ['Name and identify 2D and 3D shapes', 'Count sides and corners', 'Recognize shapes in the environment'],
        complexity: 'Visual-heavy, hands-on activities with real objects'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'halves-and-quarters', label: 'Halves and Quarters' }
        ],
        learningObjectives: ['Recognize and find halves and quarters', 'Share objects equally', 'Understand fractions of shapes and quantities'],
        complexity: 'Concrete examples with visual representations'
      }
    }
  },
  'Year 2': {
    ageRange: '6-7 years',
    description: 'Extending number knowledge and introducing times tables',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-100', label: 'Numbers to 100' },
          { value: 'comparing-numbers', label: 'Comparing Numbers' },
          { value: 'rounding-nearest-10', label: 'Rounding to Nearest 10' }
        ],
        learningObjectives: ['Count in steps of 2, 3, 5 and 10', 'Compare and order numbers', 'Use place value'],
        complexity: 'Basic word problems, simple reasoning'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'two-digit-numbers', label: 'Two-digit Number Operations' },
          { value: 'mental-strategies', label: 'Mental Calculation Strategies' },
          { value: 'word-problems', label: 'Word Problems' }
        ],
        learningObjectives: ['Add and subtract two-digit numbers', 'Use mental methods', 'Solve word problems'],
        complexity: 'Multi-step problems with guidance'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'times-tables-2-5-10', label: 'Times Tables 2, 5, 10' },
          { value: 'equal-groups', label: 'Equal Groups' },
          { value: 'sharing-grouping', label: 'Sharing and Grouping' }
        ],
        learningObjectives: ['Recall times tables for 2, 5, 10', 'Understand multiplication as repeated addition', 'Share objects equally'],
        complexity: 'Practical contexts and visual representations'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'recognising-fractions', label: 'Recognising Fractions' },
          { value: 'finding-fractions', label: 'Finding Fractions' },
          { value: 'equivalent-fractions-simple', label: 'Simple Equivalent Fractions' }
        ],
        learningObjectives: ['Recognise and find 1/2, 1/4, 2/4, 3/4', 'Find fractions of shapes and quantities', 'Understand simple equivalence'],
        complexity: 'Visual representations with shapes and objects'
      },
      'measurement': {
        label: 'Measurement',
        subtopics: [
          { value: 'length-and-height', label: 'Length and Height (cm, m)' },
          { value: 'mass-and-weight', label: 'Mass and Weight (g, kg)' },
          { value: 'capacity-and-volume', label: 'Capacity and Volume (ml, l)' },
          { value: 'money', label: 'Money (pence and pounds)' },
          { value: 'time', label: 'Time (o\'clock, half past, quarter to/past)' }
        ],
        learningObjectives: ['Choose and use appropriate standard units', 'Compare and order measurements', 'Read scales to nearest division', 'Tell time to 5 minutes'],
        complexity: 'Standard units introduced with practical applications'
      },
      'statistics': {
        label: 'Statistics',
        subtopics: [
          { value: 'pictograms', label: 'Pictograms' },
          { value: 'tally-charts', label: 'Tally Charts' },
          { value: 'block-diagrams-tables', label: 'Block Diagrams and Tables' }
        ],
        learningObjectives: ['Interpret and construct pictograms', 'Use tally charts', 'Interpret simple tables', 'Ask and answer questions about data'],
        complexity: 'Real-world data with simple questions'
      },
      'geometry-shapes': {
        label: 'Geometry: Properties of Shapes',
        subtopics: [
          { value: '2d-shapes-properties', label: '2D Shapes and Properties' },
          { value: '3d-shapes-properties', label: '3D Shapes and Properties' },
          { value: 'sorting-shapes', label: 'Sorting and Classifying Shapes' }
        ],
        learningObjectives: ['Identify and describe 2D and 3D shapes', 'Count sides, edges, vertices, faces', 'Compare and sort shapes'],
        complexity: 'Hands-on activities with shape manipulation'
      },
      'geometry-position': {
        label: 'Geometry: Position and Direction',
        subtopics: [
          { value: 'position-direction', label: 'Position and Direction' },
          { value: 'movement', label: 'Movement and Patterns' },
          { value: 'turns', label: 'Turns (Whole, Half, Quarter)' }
        ],
        learningObjectives: ['Use mathematical language for position', 'Describe movement and patterns', 'Recognize and make turns'],
        complexity: 'Practical activities with clear visual examples'
      }
    }
  },
  'Year 3': {
    ageRange: '7-8 years',
    description: 'Developing fluency in fundamental arithmetic',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-1000', label: 'Numbers to 1000' },
          { value: 'comparing-ordering', label: 'Comparing and Ordering' },
          { value: 'rounding-nearest-100', label: 'Rounding to Nearest 100' }
        ],
        learningObjectives: ['Count from 0 in multiples of 4, 8, 50, 100', 'Compare and order numbers up to 1000', 'Round numbers to nearest 10 or 100'],
        complexity: 'Multi-step problems, logical reasoning'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'three-digit-numbers', label: 'Three-digit Calculations' },
          { value: 'written-methods', label: 'Written Methods' },
          { value: 'problem-solving', label: 'Problem Solving' }
        ],
        learningObjectives: ['Add and subtract numbers up to three digits', 'Use formal written methods', 'Solve problems including missing numbers'],
        complexity: 'Varied question types and contexts'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'times-tables-3-4-8', label: 'Times Tables 3, 4, 8' },
          { value: 'written-methods-multiply', label: 'Written Methods for Multiplication' },
          { value: 'division-remainders', label: 'Division with Remainders' }
        ],
        learningObjectives: ['Recall multiplication and division facts for 3, 4, 8 times tables', 'Write and calculate mathematical statements', 'Solve problems with remainders'],
        complexity: 'Abstract thinking with concrete support'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'unit-fractions', label: 'Unit Fractions' },
          { value: 'equivalent-fractions-simple', label: 'Simple Equivalent Fractions' },
          { value: 'comparing-fractions', label: 'Comparing Fractions' }
        ],
        learningObjectives: ['Understand unit fractions', 'Find equivalent fractions', 'Compare and order unit fractions'],
        complexity: 'Visual representations essential'
      }
    }
  },
  'Year 4': {
    ageRange: '8-9 years',
    description: 'Consolidating arithmetic and introducing decimal notation',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'four-digit-numbers', label: 'Four-digit Numbers' },
          { value: 'negative-numbers', label: 'Negative Numbers' },
          { value: 'rounding-1000-10000', label: 'Rounding to 1000 and 10,000' }
        ],
        learningObjectives: ['Count in multiples of 6, 7, 9, 25, 1000', 'Order positive and negative integers', 'Round any number to the nearest 10, 100 or 1000'],
        complexity: 'Complex word problems, multiple operations'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'four-digit-calculations', label: 'Four-digit Calculations' },
          { value: 'efficient-methods', label: 'Efficient Calculation Methods' },
          { value: 'multi-step-problems', label: 'Multi-step Problems' }
        ],
        learningObjectives: ['Add and subtract numbers with up to 4 digits', 'Use efficient written methods', 'Solve two-step problems'],
        complexity: 'Problem-solving strategies required'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'times-tables-to-12', label: 'All Times Tables to 12' },
          { value: 'formal-written-methods', label: 'Formal Written Methods' },
          { value: 'factor-pairs', label: 'Factor Pairs' }
        ],
        learningObjectives: ['Recall multiplication and division facts up to 12 × 12', 'Use formal written methods', 'Recognize factor pairs'],
        complexity: 'Fluency and problem-solving combined'
      },
      'fractions-decimals': {
        label: 'Fractions and Decimals',
        subtopics: [
          { value: 'equivalent-fractions', label: 'Equivalent Fractions' },
          { value: 'decimal-tenths', label: 'Decimals (tenths)' },
          { value: 'fraction-decimal-conversion', label: 'Converting Fractions to Decimals' }
        ],
        learningObjectives: ['Find equivalent fractions', 'Recognize decimal equivalents', 'Count up and down in hundredths'],
        complexity: 'Abstract concepts with visual support'
      }
    }
  },
  'Year 5': {
    ageRange: '9-10 years',
    description: 'Advanced arithmetic and introduction to algebra concepts',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-million', label: 'Numbers to 1,000,000' },
          { value: 'powers-of-10', label: 'Powers of 10' },
          { value: 'negative-number-contexts', label: 'Negative Numbers in Context' }
        ],
        learningObjectives: ['Read, write, order and compare numbers to at least 1,000,000', 'Count forwards or backwards in steps of powers of 10', 'Interpret negative numbers in context'],
        complexity: 'Advanced reasoning, multi-step calculations'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'mental-methods-large-numbers', label: 'Mental Methods for Large Numbers' },
          { value: 'multi-step-word-problems', label: 'Multi-step Word Problems' },
          { value: 'checking-strategies', label: 'Checking Strategies' }
        ],
        learningObjectives: ['Add and subtract whole numbers with more than 4 digits', 'Use rounding to check answers', 'Solve multi-step problems'],
        complexity: 'Real-world contexts and problem-solving'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'multiply-up-to-4-digits', label: 'Multiply up to 4-digit by 1-digit' },
          { value: 'divide-up-to-4-digits', label: 'Divide up to 4-digit by 1-digit' },
          { value: 'factors-multiples-primes', label: 'Factors, Multiples and Primes' }
        ],
        learningObjectives: ['Multiply numbers up to 4 digits by one-digit number', 'Divide numbers up to 4 digits by one-digit number', 'Know prime numbers up to 19'],
        complexity: 'Efficient calculation methods required'
      },
      'fractions-decimals-percentages': {
        label: 'Fractions, Decimals and Percentages',
        subtopics: [
          { value: 'improper-fractions-mixed', label: 'Improper Fractions and Mixed Numbers' },
          { value: 'decimal-up-to-3-places', label: 'Decimals up to 3 Decimal Places' },
          { value: 'percentage-equivalents', label: 'Percentage Equivalents' }
        ],
        learningObjectives: ['Compare and order fractions', 'Read and write decimal numbers', 'Recognize percentage equivalents'],
        complexity: 'Abstract reasoning with real-world applications'
      }
    }
  },
  'Year 6': {
    ageRange: '10-11 years',
    description: 'Mastery of primary mathematics and SATs preparation',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-10-million', label: 'Numbers up to 10,000,000' },
          { value: 'rounding-any-degree', label: 'Rounding to Any Degree of Accuracy' },
          { value: 'negative-number-calculations', label: 'Negative Number Calculations' }
        ],
        learningObjectives: ['Read, write, order and compare numbers up to 10,000,000', 'Round any whole number to a required degree of accuracy', 'Use negative numbers in context and calculate intervals'],
        complexity: 'SATs preparation level, complex reasoning'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'mental-calculations-complex', label: 'Complex Mental Calculations' },
          { value: 'solve-multi-step-problems', label: 'Solve Multi-step Problems' },
          { value: 'use-estimation', label: 'Use Estimation to Check Answers' }
        ],
        learningObjectives: ['Perform mental calculations with large numbers', 'Solve problems involving addition and subtraction', 'Use estimation to check answers to calculations'],
        complexity: 'Independent problem-solving expected'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'multiply-4-digits-by-2-digits', label: 'Multiply 4-digit by 2-digit' },
          { value: 'divide-4-digits-by-2-digits', label: 'Divide 4-digit by 2-digit' },
          { value: 'common-factors-multiples', label: 'Common Factors and Multiples' }
        ],
        learningObjectives: ['Multiply multi-digit numbers using long multiplication', 'Divide numbers using long division', 'Identify common factors, common multiples and prime numbers'],
        complexity: 'Mastery level with efficient methods'
      },
      'fractions-decimals-percentages': {
        label: 'Fractions, Decimals and Percentages',
        subtopics: [
          { value: 'four-operations-fractions', label: 'Four Operations with Fractions' },
          { value: 'decimal-calculations', label: 'Decimal Calculations' },
          { value: 'percentage-calculations', label: 'Percentage Calculations' }
        ],
        learningObjectives: ['Use all four operations with fractions', 'Identify the value of each digit in numbers with up to 3 decimal places', 'Solve problems involving percentages'],
        complexity: 'Advanced mathematical reasoning'
      },
      'algebra': {
        label: 'Algebra',
        subtopics: [
          { value: 'simple-formulae', label: 'Simple Formulae' },
          { value: 'linear-sequences', label: 'Linear Number Sequences' },
          { value: 'missing-numbers', label: 'Find Missing Numbers' }
        ],
        learningObjectives: ['Use simple formulae', 'Generate and describe linear number sequences', 'Express missing number problems algebraically'],
        complexity: 'Introduction to algebraic thinking'
      },
      'ratio-proportion': {
        label: 'Ratio and Proportion',
        subtopics: [
          { value: 'ratio-problems', label: 'Solve Problems Involving Ratio' },
          { value: 'scale-factors', label: 'Scale Factors' },
          { value: 'unequal-sharing', label: 'Unequal Sharing and Grouping' }
        ],
        learningObjectives: ['Solve problems involving the relative sizes of two quantities', 'Solve problems involving similar shapes', 'Solve problems involving unequal sharing'],
        complexity: 'Complex problem-solving contexts'
      }
    }
  }
}

// Helper functions for curriculum data access
export function getAvailableTopics(yearGroup: string): Array<{value: string, label: string}> {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData) return []
  
  return Object.entries(yearData.topics).map(([key, topic]) => ({
    value: key,
    label: topic.label
  }))
}

export function getAvailableSubtopics(yearGroup: string, topicId: string): Array<{value: string, label: string}> {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData || !yearData.topics[topicId]) return []
  
  return yearData.topics[topicId].subtopics
}

export function getTopicDetails(yearGroup: string, topicId: string): CurriculumTopic | null {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData || !yearData.topics[topicId]) return null
  
  return yearData.topics[topicId]
}