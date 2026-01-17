/**
 * Age-appropriate mathematics topics by year group
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
  { value: 'Reception', label: 'Kindergarten / Reception (Ages 4-5)', shortLabel: 'Kindergarten / Reception', usLabel: 'Kindergarten', ukLabel: 'Reception', disabled: false },
  { value: 'Year 1', label: 'Grade 1 / Year 1 (Ages 5-6)', shortLabel: 'Grade 1 / Year 1', usLabel: 'Grade 1', ukLabel: 'Year 1', disabled: false },
  { value: 'Year 2', label: 'Grade 2 / Year 2 (Ages 6-7)', shortLabel: 'Grade 2 / Year 2', usLabel: 'Grade 2', ukLabel: 'Year 2', disabled: false },
  { value: 'Year 3', label: 'Grade 3 / Year 3 (Ages 7-8)', shortLabel: 'Grade 3 / Year 3', usLabel: 'Grade 3', ukLabel: 'Year 3', disabled: false },
  { value: 'Year 4', label: 'Grade 4 / Year 4 (Ages 8-9)', shortLabel: 'Grade 4 / Year 4', usLabel: 'Grade 4', ukLabel: 'Year 4', disabled: false },
  { value: 'Year 5', label: 'Grade 5 / Year 5 (Ages 9-10)', shortLabel: 'Grade 5 / Year 5', usLabel: 'Grade 5', ukLabel: 'Year 5', disabled: false },
  { value: 'Year 6', label: 'Grade 6 / Year 6 (Ages 10-11)', shortLabel: 'Grade 6 / Year 6', usLabel: 'Grade 6', ukLabel: 'Year 6', disabled: false }
]

export const CURRICULUM_MAPPING: YearGroupCurriculum = {
  'Reception': {
    ageRange: '4-5 years',
    description: 'Early mathematical foundations for ages 4-5',
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
    description: 'Foundation number concepts and basic operations for ages 5-6',
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
    description: 'Extending number knowledge and introducing times tables for ages 6-7',
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
    description: 'Developing fluency in fundamental arithmetic for ages 7-8',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'hundreds-tens-ones', label: 'Hundreds, Tens, Ones' },
          { value: 'representing-to-1000', label: 'Representing Numbers to 1000' },
          { value: 'reading-writing-to-1000', label: 'Reading & Writing to 1000' },
          { value: 'counting-4s-8s-50s-100s', label: 'Counting in 4s, 8s, 50s, 100s' },
          { value: '10-100-more-less', label: '10 More/Less, 100 More/Less' },
          { value: 'comparing-to-1000', label: 'Comparing Numbers to 1000' },
          { value: 'ordering-numbers', label: 'Ordering Numbers' },
          { value: 'estimating-rounding', label: 'Estimating & Rounding' }
        ],
        learningObjectives: ['Recognise place value in 3-digit numbers (hundreds, tens, ones)', 'Represent numbers using different representations including base-10', 'Read and write numbers up to 1000 in numerals and words', 'Count from 0 in multiples of 4, 8, 50, 100', 'Find 10 or 100 more or less than a given number', 'Compare and order numbers up to 1000', 'Round to nearest 10 or 100'],
        complexity: 'Multi-step problems, logical reasoning'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'mental-addition-strategies', label: 'Mental Addition Strategies' },
          { value: 'mental-subtraction-strategies', label: 'Mental Subtraction Strategies' },
          { value: 'column-addition-no-exchange', label: 'Column Addition (No Exchange)' },
          { value: 'column-addition-with-exchange', label: 'Column Addition (With Exchange)' },
          { value: 'column-subtraction-no-exchange', label: 'Column Subtraction (No Exchange)' },
          { value: 'column-subtraction-with-exchange', label: 'Column Subtraction (With Exchange)' },
          { value: 'inverse-operations-checking', label: 'Inverse Operations & Checking' },
          { value: 'add-subtract-word-problems', label: 'Word Problems' },
          { value: 'missing-number-problems', label: 'Missing Number Problems' }
        ],
        learningObjectives: ['Add 3-digit numbers mentally (+ 1s, + 10s, + 100s)', 'Subtract 3-digit numbers mentally (- 1s, - 10s, - 100s)', 'Use formal written column addition without exchange', 'Use formal written column addition with regrouping/exchange', 'Use formal written column subtraction without exchange', 'Use formal written column subtraction with regrouping/exchange', 'Use inverse operations to check answers and estimate', 'Solve word problems using addition and subtraction', 'Solve missing number problems using place value and number facts'],
        complexity: 'Varied question types and contexts'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: '3-times-table', label: '3 Times Table' },
          { value: '4-times-table', label: '4 Times Table' },
          { value: '8-times-table', label: '8 Times Table' },
          { value: 'multiplication-division-facts', label: 'Multiplication & Division Facts' },
          { value: 'multiplying-2digit-by-1digit', label: 'Multiplying 2-digit by 1-digit' },
          { value: 'division-with-remainders', label: 'Division with Remainders' },
          { value: 'scaling-problems', label: 'Scaling Problems' },
          { value: 'missing-number-multiplication', label: 'Missing Number Problems' }
        ],
        learningObjectives: ['Recall and use 3 times table facts', 'Recall and use 4 times table facts', 'Recall and use 8 times table facts', 'Connect multiplication and division facts (fact families)', 'Multiply 2-digit by 1-digit using mental and written methods', 'Divide with remainders', 'Solve scaling problems (times as many)', 'Solve missing number problems involving × and ÷'],
        complexity: 'Abstract thinking with concrete support'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'understanding-tenths', label: 'Understanding Tenths' },
          { value: 'unit-fractions', label: 'Unit Fractions' },
          { value: 'non-unit-fractions', label: 'Non-Unit Fractions' },
          { value: 'fractions-of-amounts', label: 'Fractions of Amounts' },
          { value: 'fractions-number-lines', label: 'Fractions on Number Lines' },
          { value: 'equivalent-fractions', label: 'Equivalent Fractions' },
          { value: 'comparing-unit-fractions', label: 'Comparing Unit Fractions' },
          { value: 'adding-subtracting-fractions', label: 'Adding & Subtracting Fractions' }
        ],
        learningObjectives: ['Count up and down in tenths', 'Recognise tenths from dividing by 10', 'Find unit fractions (1/2, 1/3, 1/4, 1/5) of amounts', 'Find non-unit fractions (2/3, 3/4) of amounts', 'Find fractions of discrete sets of objects', 'Place fractions on number lines', 'Show equivalent fractions using diagrams', 'Compare and order unit fractions', 'Add and subtract fractions with same denominator within one whole'],
        complexity: 'Visual representations essential'
      },
      'length-perimeter': {
        label: 'Length and Perimeter',
        subtopics: [
          { value: 'measuring-mm-cm-m', label: 'Measuring in mm, cm, m' },
          { value: 'converting-length', label: 'Converting Length Units' },
          { value: 'comparing-adding-lengths', label: 'Comparing & Adding Lengths' },
          { value: 'perimeter-2d-shapes', label: 'Perimeter of 2D Shapes' }
        ],
        learningObjectives: ['Measure lengths using mm, cm, and m', 'Convert between length units (cm/m, mm/cm)', 'Compare and add/subtract lengths', 'Measure the perimeter of simple 2D shapes'],
        complexity: 'Practical measurement skills'
      },
      'mass-capacity': {
        label: 'Mass and Capacity',
        subtopics: [
          { value: 'measuring-mass-g-kg', label: 'Measuring Mass (g and kg)' },
          { value: 'converting-mass', label: 'Converting Mass Units' },
          { value: 'measuring-capacity-ml-l', label: 'Measuring Capacity (ml and l)' },
          { value: 'converting-capacity', label: 'Converting Capacity Units' }
        ],
        learningObjectives: ['Measure and compare mass in grams and kilograms', 'Convert between kg and g', 'Measure volume/capacity in millilitres and litres', 'Convert between l and ml'],
        complexity: 'Practical measurement with real-world contexts'
      },
      'money': {
        label: 'Money',
        subtopics: [
          { value: 'adding-subtracting-money', label: 'Adding & Subtracting Money' },
          { value: 'giving-change', label: 'Giving Change' }
        ],
        learningObjectives: ['Add and subtract amounts of money using £ and p', 'Calculate change in practical contexts'],
        complexity: 'Real-world money problems'
      },
      'time': {
        label: 'Time',
        subtopics: [
          { value: 'time-nearest-minute', label: 'Time to the Nearest Minute' },
          { value: '12-24-hour-clocks', label: '12-hour and 24-hour Clocks' },
          { value: 'roman-numerals-clocks', label: 'Roman Numerals on Clocks' },
          { value: 'seconds-minutes-hours', label: 'Seconds, Minutes, Hours' },
          { value: 'days-months-years', label: 'Days, Months, Years' },
          { value: 'duration-of-events', label: 'Duration of Events' }
        ],
        learningObjectives: ['Tell and write time to the nearest minute', 'Use 12-hour and 24-hour clocks', 'Read clocks with Roman numerals (I to XII)', 'Know seconds in a minute, minutes in an hour', 'Know days in each month, year and leap year', 'Compare durations and calculate time taken for events'],
        complexity: 'Time concepts with practical applications'
      },
      'geometry-shapes': {
        label: 'Geometry: Properties of Shapes',
        subtopics: [
          { value: 'draw-2d-shapes', label: 'Draw 2D Shapes' },
          { value: '2d-shape-properties', label: '2D Shape Properties' },
          { value: 'make-3d-shapes', label: 'Make 3D Shapes' },
          { value: '3d-shape-properties', label: '3D Shape Properties' },
          { value: 'angles-turns', label: 'Angles and Turns' },
          { value: 'right-angles', label: 'Right Angles' },
          { value: 'comparing-angles', label: 'Comparing Angles' },
          { value: 'lines-types', label: 'Lines: Horizontal, Vertical, Parallel, Perpendicular' }
        ],
        learningObjectives: ['Draw 2D shapes accurately', 'Describe properties of 2D shapes', 'Make 3D shapes using modelling materials', 'Recognise and describe 3D shapes (faces, edges, vertices)', 'Recognise angles as a property of shape or description of a turn', 'Identify right angles and understand half/quarter/three-quarter/full turns', 'Identify angles greater than or less than a right angle', 'Identify horizontal, vertical, perpendicular and parallel lines'],
        complexity: 'Hands-on activities with visual examples'
      },
      'statistics': {
        label: 'Statistics',
        subtopics: [
          { value: 'bar-charts', label: 'Bar Charts' },
          { value: 'pictograms-scaled', label: 'Pictograms (Scaled)' },
          { value: 'tables-two-step-questions', label: 'Tables & Two-Step Questions' }
        ],
        learningObjectives: ['Interpret and present data using bar charts', 'Use scaled pictograms (2, 5, 10 per symbol)', 'Solve one-step and two-step questions using tables and charts'],
        complexity: 'Real-world data with problem-solving'
      }
    }
  },
  'Year 4': {
    ageRange: '8-9 years',
    description: 'Consolidating arithmetic, mastering times tables (MTC), and introducing decimal notation for ages 8-9',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'four-digit-numbers', label: 'Four-digit Numbers (Thousands)', description: 'Recognise place value of each digit in 4-digit numbers' },
          { value: 'find-1000-more-less', label: 'Find 1000 More or Less', description: 'Find 1000 more or less than a given number' },
          { value: 'comparing-ordering-4-digit', label: 'Compare and Order Numbers', description: 'Order and compare numbers beyond 1000' },
          { value: 'counting-multiples-6-7-9-25-1000', label: 'Counting in Multiples (6, 7, 9, 25, 1000)', description: 'Count in multiples of 6, 7, 9, 25 and 1000' },
          { value: 'negative-numbers', label: 'Negative Numbers', description: 'Count backwards through 0 to include negative numbers' },
          { value: 'rounding-10-100-1000', label: 'Rounding to 10, 100 or 1000', description: 'Round any number to the nearest 10, 100 or 1000' },
          { value: 'roman-numerals-to-100', label: 'Roman Numerals to 100 (I to C)', description: 'Read Roman numerals to 100 and know that over time the numeral system changed' }
        ],
        learningObjectives: ['Count in multiples of 6, 7, 9, 25, 1000', 'Find 1000 more or less than a given number', 'Count backwards through 0 to include negative numbers', 'Recognise place value in 4-digit numbers', 'Order and compare numbers beyond 1000', 'Round any number to nearest 10, 100 or 1000', 'Read Roman numerals to 100'],
        complexity: 'Complex word problems, multiple operations'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'column-addition-4-digit', label: 'Column Addition (up to 4 digits)', description: 'Add numbers with up to 4 digits using formal columnar method' },
          { value: 'column-subtraction-4-digit', label: 'Column Subtraction (up to 4 digits)', description: 'Subtract numbers with up to 4 digits using formal columnar method' },
          { value: 'estimate-inverse-check', label: 'Estimate and Check (Inverse)', description: 'Estimate and use inverse operations to check answers' },
          { value: 'two-step-problems', label: 'Two-step Word Problems', description: 'Solve addition and subtraction two-step problems in contexts' }
        ],
        learningObjectives: ['Add numbers with up to 4 digits using formal columnar method', 'Subtract numbers with up to 4 digits using formal columnar method', 'Estimate and use inverse operations to check answers', 'Solve addition and subtraction two-step problems in contexts, deciding which operations to use'],
        complexity: 'Problem-solving strategies required'
      },
      'multiplication-division': {
        label: 'Multiplication and Division (MTC Focus)',
        subtopics: [
          { value: 'times-tables-3-6-9', label: '3, 6, 9 Times Tables', description: 'Recall 3, 6 and 9 times tables (6 is double 3, 9 patterns)' },
          { value: 'times-tables-7', label: '7 Times Table', description: 'Recall 7 times table - the hardest table!' },
          { value: 'times-tables-11-12', label: '11 and 12 Times Tables', description: 'Recall 11 and 12 times tables (patterns and strategies)' },
          { value: 'times-tables-to-12', label: 'All Times Tables to 12×12 (MTC)', description: 'Instant recall of all multiplication facts to 12×12 for MTC' },
          { value: 'division-facts-to-12', label: 'Division Facts to 12×12', description: 'Recall division facts corresponding to times tables' },
          { value: 'factor-pairs-commutativity', label: 'Factor Pairs and Commutativity', description: 'Recognise and use factor pairs and commutativity in mental calculations' },
          { value: 'multiply-by-0-and-1', label: 'Multiply by 0 and 1', description: 'Understand effect of multiplying by 0 and 1' },
          { value: 'multiply-three-numbers', label: 'Multiply Three Numbers', description: 'Multiply three numbers together using associativity' },
          { value: 'multiply-2-3-digit-by-1-digit', label: 'Multiply 2/3-digit by 1-digit', description: 'Multiply 2-digit and 3-digit numbers by 1-digit using formal written layout' },
          { value: 'division-2-digit-by-1-digit', label: 'Divide 2-digit by 1-digit', description: 'Use short division to divide 2-digit by 1-digit numbers' },
          { value: 'division-with-remainders', label: 'Division with Remainders', description: 'Divide with remainders and interpret remainders appropriately' },
          { value: 'mental-multiplication-division', label: 'Mental Methods', description: 'Use place value and known facts to multiply and divide mentally' },
          { value: 'scaling-correspondence', label: 'Scaling and Correspondence Problems', description: 'Solve problems involving scaling (times as many) and correspondence (combinations)' }
        ],
        learningObjectives: ['Recall multiplication and division facts for all tables up to 12×12 (MTC statutory)', 'Use place value, known and derived facts to multiply and divide mentally', 'Recognise and use factor pairs and commutativity in mental calculations', 'Multiply 2-digit and 3-digit numbers by 1-digit using formal written layout', 'Divide 2-digit numbers by 1-digit using short division', 'Solve problems involving multiplying and adding, including integer scaling and correspondence problems'],
        complexity: 'Fluency (instant recall) and problem-solving combined - MTC preparation essential'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'equivalent-fractions', label: 'Equivalent Fractions', description: 'Recognise and show equivalent fractions using diagrams' },
          { value: 'fractions-greater-than-1', label: 'Fractions Greater Than 1', description: 'Count up and down in fractions, including mixed numbers and improper fractions' },
          { value: 'hundredths', label: 'Hundredths', description: 'Recognise that hundredths arise from dividing by 100 and dividing tenths by 10' },
          { value: 'add-subtract-same-denominator', label: 'Add/Subtract Same Denominator', description: 'Add and subtract fractions with the same denominator' },
          { value: 'fractions-of-amounts', label: 'Fractions of Amounts', description: 'Solve problems involving fractions to calculate quantities' }
        ],
        learningObjectives: ['Recognise and show families of common equivalent fractions', 'Count up and down in hundredths', 'Add and subtract fractions with the same denominator', 'Recognise mixed numbers and improper fractions and convert between them', 'Solve problems involving increasingly harder fractions to calculate quantities'],
        complexity: 'Visual representations essential, linking to division'
      },
      'decimals': {
        label: 'Decimals',
        subtopics: [
          { value: 'decimal-tenths', label: 'Tenths as Decimals', description: 'Recognise tenths and write as decimals' },
          { value: 'decimal-hundredths', label: 'Hundredths as Decimals', description: 'Recognise hundredths and write as decimals' },
          { value: 'divide-by-10-100', label: 'Divide by 10 and 100', description: 'Find effect of dividing 1-digit and 2-digit numbers by 10 and 100' },
          { value: 'decimal-equivalents', label: 'Decimal Equivalents (1/4, 1/2, 3/4)', description: 'Recognise decimal equivalents to 1/4, 1/2, 3/4' },
          { value: 'compare-order-decimals', label: 'Compare and Order Decimals', description: 'Compare numbers with the same number of decimal places up to 2dp' },
          { value: 'rounding-decimals', label: 'Rounding Decimals', description: 'Round decimals with 1 decimal place to the nearest whole number' },
          { value: 'decimal-money-measures', label: 'Decimals in Money and Measures', description: 'Solve problems involving decimals in money and measurement contexts' }
        ],
        learningObjectives: ['Recognise and write decimal equivalents of any number of tenths or hundredths', 'Recognise and write decimal equivalents to 1/4, 1/2, 3/4', 'Find effect of dividing 1-digit or 2-digit numbers by 10 and 100', 'Compare numbers with the same number of decimal places up to 2 decimal places', 'Round decimals with 1 decimal place to the nearest whole number', 'Solve problems involving number up to 2 decimal places'],
        complexity: 'Connect fractions and decimals, use in real-world contexts'
      },
      'length-perimeter': {
        label: 'Length and Perimeter',
        subtopics: [
          { value: 'convert-length-units', label: 'Convert Length Units (km, m, cm, mm)', description: 'Convert between kilometres, metres, centimetres and millimetres' },
          { value: 'perimeter-rectangles', label: 'Perimeter of Rectangles', description: 'Measure and calculate the perimeter of rectangles' },
          { value: 'perimeter-rectilinear', label: 'Perimeter of Rectilinear Shapes', description: 'Measure and calculate perimeter of rectilinear figures in cm and m' },
          { value: 'find-missing-lengths', label: 'Find Missing Lengths', description: 'Calculate missing lengths when given the perimeter' }
        ],
        learningObjectives: ['Convert between different units of length (km to m, m to cm, cm to mm)', 'Measure and calculate the perimeter of a rectilinear figure (including squares) in cm and m', 'Find missing lengths when perimeter is known'],
        complexity: 'Practical measurement with calculation'
      },
      'area': {
        label: 'Area',
        subtopics: [
          { value: 'area-counting-squares', label: 'Area by Counting Squares', description: 'Find area of rectilinear shapes by counting squares' },
          { value: 'area-rectangles', label: 'Area of Rectangles', description: 'Calculate area of rectangles and relate to multiplication' },
          { value: 'compare-areas', label: 'Compare Areas', description: 'Compare areas of different rectangles and rectilinear shapes' }
        ],
        learningObjectives: ['Find the area of rectilinear shapes by counting squares', 'Understand that area is measured in square units (cm², m²)', 'Compare areas of rectangles and other rectilinear shapes'],
        complexity: 'Conceptual understanding linking to multiplication'
      },
      'mass-capacity': {
        label: 'Mass and Capacity',
        subtopics: [
          { value: 'convert-mass-units', label: 'Convert Mass Units (kg, g)', description: 'Convert between kilograms and grams' },
          { value: 'convert-capacity-units', label: 'Convert Capacity Units (l, ml)', description: 'Convert between litres and millilitres' },
          { value: 'estimate-mass-capacity', label: 'Estimate Mass and Capacity', description: 'Estimate and compare mass and capacity in real contexts' }
        ],
        learningObjectives: ['Convert between different units of mass (kg and g)', 'Convert between different units of capacity (l and ml)', 'Estimate, compare and calculate different measures'],
        complexity: 'Real-world problem-solving with conversions'
      },
      'money': {
        label: 'Money',
        subtopics: [
          { value: 'money-pounds-pence', label: 'Money in Pounds and Pence', description: 'Write money using decimals (£3.45)' },
          { value: 'convert-money', label: 'Convert Between Pounds and Pence', description: 'Convert between pounds and pence' },
          { value: 'money-calculations', label: 'Money Calculations', description: 'Add, subtract and compare amounts of money' },
          { value: 'money-word-problems', label: 'Money Word Problems', description: 'Solve multi-step money problems in real contexts' }
        ],
        learningObjectives: ['Write money using decimal notation (£ and p)', 'Convert between pounds and pence', 'Estimate, compare and calculate amounts of money to give change', 'Solve simple problems involving money'],
        complexity: 'Real-world contexts with decimal calculations'
      },
      'time': {
        label: 'Time',
        subtopics: [
          { value: 'time-12-hour', label: '12-hour Clock', description: 'Read, write and convert time using 12-hour clock' },
          { value: 'time-24-hour', label: '24-hour Clock', description: 'Read, write and convert time using 24-hour clock' },
          { value: 'time-analogue-digital', label: 'Analogue and Digital', description: 'Convert between analogue and digital times' },
          { value: 'time-conversions', label: 'Time Conversions', description: 'Convert hours to minutes, minutes to seconds, years to months, weeks to days' },
          { value: 'time-duration', label: 'Duration and Time Problems', description: 'Solve problems involving duration and comparing times' }
        ],
        learningObjectives: ['Read, write and convert time between analogue and digital 12-hour and 24-hour clocks', 'Solve problems involving converting hours to minutes, minutes to seconds, years to months, weeks to days'],
        complexity: 'Converting between time formats and units'
      },
      'geometry-shapes': {
        label: 'Geometry: Properties of Shapes',
        subtopics: [
          { value: 'classify-triangles', label: 'Classify Triangles', description: 'Classify triangles as isosceles, equilateral or scalene' },
          { value: 'classify-quadrilaterals', label: 'Classify Quadrilaterals', description: 'Classify quadrilaterals (parallelogram, rhombus, trapezium)' },
          { value: 'acute-obtuse-angles', label: 'Acute and Obtuse Angles', description: 'Identify acute and obtuse angles' },
          { value: 'compare-order-angles', label: 'Compare and Order Angles', description: 'Compare and order angles up to two right angles' },
          { value: 'lines-of-symmetry', label: 'Lines of Symmetry', description: 'Identify lines of symmetry in 2D shapes presented in different orientations' },
          { value: 'complete-symmetric-figures', label: 'Complete Symmetric Figures', description: 'Complete a simple symmetric figure with respect to a specific line of symmetry' }
        ],
        learningObjectives: ['Compare and classify geometric shapes based on properties and sizes', 'Classify triangles (isosceles, equilateral, scalene) and quadrilaterals', 'Identify acute and obtuse angles and compare/order angles up to two right angles', 'Identify lines of symmetry in 2D shapes', 'Complete simple symmetric figures with respect to a specific line of symmetry'],
        complexity: 'Classification and reasoning about shape properties'
      },
      'geometry-position': {
        label: 'Geometry: Position and Direction',
        subtopics: [
          { value: 'coordinates-first-quadrant', label: 'Coordinates (First Quadrant)', description: 'Describe positions on a 2D grid as coordinates in the first quadrant' },
          { value: 'translations', label: 'Translations (Left/Right, Up/Down)', description: 'Describe movements between positions as translations' },
          { value: 'plot-points-polygons', label: 'Plot Points and Draw Polygons', description: 'Plot specified points and draw sides to complete given polygons' }
        ],
        learningObjectives: ['Describe positions on a 2D grid as coordinates in the first quadrant', 'Describe movements between positions as translations (left/right, up/down)', 'Plot specified points and draw sides to complete given polygons'],
        complexity: 'Abstract spatial reasoning with coordinate grids'
      },
      'statistics': {
        label: 'Statistics',
        subtopics: [
          { value: 'bar-charts', label: 'Bar Charts', description: 'Interpret and present discrete data using bar charts' },
          { value: 'time-graphs', label: 'Time Graphs (Line Graphs)', description: 'Interpret and present continuous data using time graphs' },
          { value: 'pictograms-tables', label: 'Pictograms and Tables', description: 'Interpret data in pictograms and tables' },
          { value: 'comparison-sum-difference', label: 'Comparison, Sum and Difference Problems', description: 'Solve comparison, sum and difference problems using information from graphs and tables' }
        ],
        learningObjectives: ['Interpret and present discrete data using appropriate graphical methods including bar charts', 'Interpret and present continuous data using time graphs', 'Solve comparison, sum and difference problems using information presented in bar charts, pictograms, tables and other graphs'],
        complexity: 'Data analysis with multi-step problem-solving'
      }
    }
  },
  'Year 5': {
    ageRange: '9-10 years',
    description: 'Advanced arithmetic, formal written methods, and introduction to percentages for ages 9-10',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-1000000', label: 'Numbers to 1,000,000', description: 'Read, write, order and compare numbers to at least 1,000,000' },
          { value: 'powers-of-10', label: 'Powers of 10', description: 'Count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000' },
          { value: 'rounding-large-numbers', label: 'Rounding Large Numbers', description: 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000' },
          { value: 'negative-numbers-context', label: 'Negative Numbers in Context', description: 'Interpret negative numbers in context, count forwards and backwards through zero' },
          { value: 'roman-numerals-to-1000', label: 'Roman Numerals to 1000 (M)', description: 'Read Roman numerals to 1000 (M) and recognise years written in Roman numerals' }
        ],
        learningObjectives: ['Read, write, order and compare numbers to at least 1,000,000 and determine the value of each digit', 'Count forwards or backwards in steps of powers of 10 for any given number up to 1,000,000', 'Interpret negative numbers in context, count forwards and backwards with positive and negative whole numbers, including through zero', 'Round any number up to 1,000,000 to the nearest 10, 100, 1,000, 10,000 and 100,000', 'Read Roman numerals to 1000 (M) and recognise years written in Roman numerals'],
        complexity: 'Advanced reasoning, multi-step calculations'
      },
      'addition-subtraction': {
        label: 'Addition and Subtraction',
        subtopics: [
          { value: 'column-add-large-numbers', label: 'Column Addition (5+ digits)', description: 'Add whole numbers with more than 4 digits using formal written method of columnar addition' },
          { value: 'column-subtract-large-numbers', label: 'Column Subtraction (5+ digits)', description: 'Subtract whole numbers with more than 4 digits using formal written method of columnar subtraction' },
          { value: 'mental-add-subtract-large', label: 'Mental Methods for Large Numbers', description: 'Add and subtract numbers mentally with increasingly large numbers' },
          { value: 'inverse-operations-checking', label: 'Inverse Operations to Check', description: 'Use rounding to check answers to calculations and determine, in the context of a problem, levels of accuracy' },
          { value: 'multi-step-add-subtract', label: 'Multi-step Word Problems', description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why' }
        ],
        learningObjectives: ['Add and subtract whole numbers with more than 4 digits, including using formal written methods (columnar addition and subtraction)', 'Add and subtract numbers mentally with increasingly large numbers', 'Use rounding to check answers to calculations and determine, in the context of a problem, levels of accuracy', 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why'],
        complexity: 'Real-world contexts and problem-solving'
      },
      'multiplication-division': {
        label: 'Multiplication and Division',
        subtopics: [
          { value: 'multiples-common-multiples', label: 'Multiples and Common Multiples', description: 'Identify multiples and factors, including finding all factor pairs of a number' },
          { value: 'factors-common-factors', label: 'Factors and Common Factors', description: 'Find all factor pairs of a number, and common factors of two numbers' },
          { value: 'prime-numbers', label: 'Prime Numbers', description: 'Know and use the vocabulary of prime numbers, prime factors and composite (non-prime) numbers' },
          { value: 'prime-numbers-to-100', label: 'Prime Numbers to 100', description: 'Establish whether a number up to 100 is prime and recall prime numbers up to 19' },
          { value: 'square-cube-numbers', label: 'Square and Cube Numbers', description: 'Recognise and use square numbers and cube numbers, and the notation for squared (²) and cubed (³)' },
          { value: 'multiply-4digit-by-1digit', label: 'Multiply 4-digit by 1-digit', description: 'Multiply numbers up to 4 digits by a one-digit number using formal written method' },
          { value: 'multiply-4digit-by-2digit', label: 'Multiply 4-digit by 2-digit', description: 'Multiply numbers up to 4 digits by a two-digit whole number using formal written method' },
          { value: 'short-division', label: 'Short Division', description: 'Divide numbers up to 4 digits by a one-digit number using short division method' },
          { value: 'division-with-remainders', label: 'Division with Remainders', description: 'Interpret remainders appropriately for the context' },
          { value: 'multiply-divide-by-10-100-1000', label: 'Multiply/Divide by 10, 100, 1000', description: 'Multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000' },
          { value: 'mental-multiply-divide', label: 'Mental Multiplication and Division', description: 'Multiply and divide numbers mentally drawing upon known facts' },
          { value: 'order-of-operations-intro', label: 'Order of Operations (Intro)', description: 'Solve problems involving multiplication and division including using their knowledge of factors and multiples, squares and cubes' }
        ],
        learningObjectives: ['Identify multiples and factors, including finding all factor pairs of a number, and common factors of two numbers', 'Know and use the vocabulary of prime numbers, prime factors and composite (non-prime) numbers', 'Establish whether a number up to 100 is prime and recall prime numbers up to 19', 'Recognise and use square numbers and cube numbers, and the notation for squared (²) and cubed (³)', 'Multiply numbers up to 4 digits by a one or two-digit number using a formal written method', 'Multiply and divide numbers mentally drawing upon known facts', 'Divide numbers up to 4 digits by a one-digit number using the formal written method of short division and interpret remainders appropriately', 'Multiply and divide whole numbers and those involving decimals by 10, 100 and 1,000', 'Solve problems involving multiplication and division including using their knowledge of factors and multiples, squares and cubes'],
        complexity: 'Efficient calculation methods required'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'compare-order-fractions', label: 'Compare and Order Fractions', description: 'Compare and order fractions whose denominators are all multiples of the same number' },
          { value: 'equivalent-fractions-visual', label: 'Equivalent Fractions', description: 'Identify, name and write equivalent fractions of a given fraction, represented visually, including tenths and hundredths' },
          { value: 'improper-fractions-mixed-numbers', label: 'Improper Fractions and Mixed Numbers', description: 'Recognise mixed numbers and improper fractions and convert from one form to the other' },
          { value: 'add-fractions-same-denominator', label: 'Add Fractions (Same Denominator)', description: 'Add fractions with the same denominator and denominators that are multiples of the same number' },
          { value: 'subtract-fractions-same-denominator', label: 'Subtract Fractions (Same Denominator)', description: 'Subtract fractions with the same denominator and denominators that are multiples of the same number' },
          { value: 'add-subtract-fractions-related', label: 'Add/Subtract Fractions (Related Denominators)', description: 'Add and subtract fractions with denominators that are multiples of the same number' },
          { value: 'multiply-fractions-by-integers', label: 'Multiply Fractions by Whole Numbers', description: 'Multiply proper fractions and mixed numbers by whole numbers, supported by materials and diagrams' },
          { value: 'fractions-of-amounts', label: 'Fractions of Amounts', description: 'Solve problems involving fractions to calculate quantities, and fractions to divide quantities' }
        ],
        learningObjectives: ['Compare and order fractions whose denominators are all multiples of the same number', 'Identify, name and write equivalent fractions of a given fraction, represented visually, including tenths and hundredths', 'Recognise mixed numbers and improper fractions and convert from one form to the other and write mathematical statements > 1 as a mixed number', 'Add and subtract fractions with the same denominator and denominators that are multiples of the same number', 'Multiply proper fractions and mixed numbers by whole numbers, supported by materials and diagrams'],
        complexity: 'Visual representations essential, linking to division'
      },
      'decimals': {
        label: 'Decimals',
        subtopics: [
          { value: 'thousandths', label: 'Thousandths', description: 'Recognise and use thousandths and relate them to tenths, hundredths and decimal equivalents' },
          { value: 'read-write-decimals-3dp', label: 'Read and Write Decimals (3dp)', description: 'Read and write decimal numbers as fractions' },
          { value: 'compare-order-decimals-3dp', label: 'Compare and Order Decimals (3dp)', description: 'Read, write, order and compare numbers with up to three decimal places' },
          { value: 'round-decimals', label: 'Round Decimals', description: 'Round decimals with two decimal places to the nearest whole number and to one decimal place' },
          { value: 'add-subtract-decimals', label: 'Add and Subtract Decimals', description: 'Add and subtract decimals including a mix of whole numbers and decimals, and decimals with different numbers of decimal places' },
          { value: 'multiply-decimals-by-integers', label: 'Multiply Decimals by Whole Numbers', description: 'Multiply and divide decimals by whole numbers' },
          { value: 'decimal-problems-3dp', label: 'Decimal Problems (3dp)', description: 'Solve problems involving numbers up to 3 decimal places' }
        ],
        learningObjectives: ['Recognise and use thousandths and relate them to tenths, hundredths and decimal equivalents', 'Read and write decimal numbers as fractions', 'Read, write, order and compare numbers with up to three decimal places', 'Round decimals with two decimal places to the nearest whole number and to one decimal place', 'Solve problems involving numbers up to 3 decimal places'],
        complexity: 'Connect fractions and decimals, use in real-world contexts'
      },
      'percentages': {
        label: 'Percentages',
        subtopics: [
          { value: 'understand-percentages', label: 'Understand Percentages', description: 'Recognise the per cent symbol (%) and understand that per cent relates to "number of parts per hundred"' },
          { value: 'percentage-fraction-equivalents', label: 'Percentage-Fraction Equivalents', description: 'Write percentages as a fraction with denominator 100, and as a decimal' },
          { value: 'percentage-decimal-equivalents', label: 'Percentage-Decimal Equivalents', description: 'Solve problems which require knowing percentage and decimal equivalents of ½, ¼, ⅕, ⅖, ⅘ and those fractions with a denominator of a multiple of 10 or 25' }
        ],
        learningObjectives: ['Recognise the per cent symbol (%) and understand that per cent relates to "number of parts per hundred", and write percentages as a fraction with denominator 100, and as a decimal', 'Solve problems which require knowing percentage and decimal equivalents of ½, ¼, ⅕, ⅖, ⅘ and those fractions with a denominator of a multiple of 10 or 25'],
        complexity: 'Link fractions, decimals and percentages'
      },
      'measurement': {
        label: 'Measurement',
        subtopics: [
          { value: 'convert-metric-units', label: 'Convert Metric Units', description: 'Convert between different units of metric measure (for example, km and m; cm and m; cm and mm; g and kg; l and ml)' },
          { value: 'metric-imperial-approximations', label: 'Metric and Imperial Approximations', description: 'Understand and use approximate equivalences between metric units and common imperials such as inches, pounds and pints' },
          { value: 'perimeter-composite-shapes', label: 'Perimeter of Composite Shapes', description: 'Measure and calculate the perimeter of composite rectilinear shapes in centimetres and metres' },
          { value: 'area-rectangles', label: 'Area of Rectangles', description: 'Calculate and compare the area of rectangles (including squares), and including using standard units, square centimetres (cm²) and square metres (m²)' },
          { value: 'area-compound-shapes', label: 'Area of Compound Shapes', description: 'Estimate the area of irregular shapes' },
          { value: 'volume-capacity-cubes', label: 'Volume and Capacity', description: 'Estimate volume [for example, using 1 cm³ blocks to build cuboids (including cubes)] and capacity [for example, using water]' },
          { value: 'time-conversions', label: 'Time Conversions', description: 'Solve problems involving converting between units of time' },
          { value: 'problem-solving-measures', label: 'Problem Solving with Measures', description: 'Use all four operations to solve problems involving measure [for example, length, mass, volume, money] using decimal notation, including scaling' }
        ],
        learningObjectives: ['Convert between different units of metric measure (for example, kilometre and metre; centimetre and metre; centimetre and millimetre; gram and kilogram; litre and millilitre)', 'Understand and use approximate equivalences between metric units and common imperials such as inches, pounds and pints', 'Measure and calculate the perimeter of composite rectilinear shapes in centimetres and metres', 'Calculate and compare the area of rectangles (including squares), and including using standard units, square centimetres (cm²) and square metres (m²) and estimate the area of irregular shapes', 'Estimate volume [for example, using 1 cm³ blocks to build cuboids (including cubes)] and capacity [for example, using water]', 'Solve problems involving converting between units of time', 'Use all four operations to solve problems involving measure [for example, length, mass, volume, money] using decimal notation, including scaling'],
        complexity: 'Real-world problem-solving with conversions'
      },
      'geometry-shapes': {
        label: 'Geometry: Properties of Shapes',
        subtopics: [
          { value: '3d-from-2d-representations', label: '3D Shapes from 2D Representations', description: 'Identify 3-D shapes, including cubes and other cuboids, from 2-D representations' },
          { value: 'angles-in-degrees', label: 'Angles in Degrees', description: 'Know angles are measured in degrees: estimate and compare acute, obtuse and reflex angles' },
          { value: 'measure-draw-angles', label: 'Measure and Draw Angles', description: 'Draw given angles, and measure them in degrees (°)' },
          { value: 'angles-at-point-360', label: 'Angles at a Point (360°)', description: 'Identify angles at a point and one whole turn (total 360°)' },
          { value: 'angles-on-line-180', label: 'Angles on a Straight Line (180°)', description: 'Identify angles at a point on a straight line and half a turn (total 180°)' },
          { value: 'angles-multiples-90', label: 'Angles as Multiples of 90°', description: 'Identify other multiples of 90°' },
          { value: 'rectangle-properties', label: 'Rectangle Properties', description: 'Use the properties of rectangles to deduce related facts and find missing lengths and angles' },
          { value: 'regular-irregular-polygons', label: 'Regular and Irregular Polygons', description: 'Distinguish between regular and irregular polygons based on reasoning about equal sides and angles' }
        ],
        learningObjectives: ['Identify 3-D shapes, including cubes and other cuboids, from 2-D representations', 'Know angles are measured in degrees: estimate and compare acute, obtuse and reflex angles', 'Draw given angles, and measure them in degrees (°)', 'Identify angles at a point and one whole turn (total 360°), angles at a point on a straight line and half a turn (total 180°), other multiples of 90°', 'Use the properties of rectangles to deduce related facts and find missing lengths and angles', 'Distinguish between regular and irregular polygons based on reasoning about equal sides and angles'],
        complexity: 'Classification, reasoning and measurement of angles'
      },
      'geometry-position': {
        label: 'Geometry: Position and Direction',
        subtopics: [
          { value: 'reflection', label: 'Reflection', description: 'Identify, describe and represent the position of a shape following a reflection' },
          { value: 'translation', label: 'Translation', description: 'Identify, describe and represent the position of a shape following a translation' },
          { value: 'first-quadrant-coordinates', label: 'First Quadrant Coordinates', description: 'Work with coordinates in the first quadrant' }
        ],
        learningObjectives: ['Identify, describe and represent the position of a shape following a reflection or translation, using the appropriate language, and know that the shape has not changed'],
        complexity: 'Abstract spatial reasoning with transformations'
      },
      'statistics': {
        label: 'Statistics',
        subtopics: [
          { value: 'line-graphs', label: 'Line Graphs', description: 'Solve comparison, sum and difference problems using information presented in a line graph' },
          { value: 'timetables', label: 'Timetables', description: 'Complete, read and interpret information in tables, including timetables' },
          { value: 'two-way-tables', label: 'Two-way Tables', description: 'Read and interpret information in two-way tables' }
        ],
        learningObjectives: ['Solve comparison, sum and difference problems using information presented in a line graph', 'Complete, read and interpret information in tables, including timetables'],
        complexity: 'Data analysis with multi-step problem-solving'
      }
    }
  },
  'Year 6': {
    ageRange: '10-11 years',
    description: 'Mastery of primary mathematics and SATs preparation for ages 10-11',
    topics: {
      'number-place-value': {
        label: 'Number and Place Value',
        subtopics: [
          { value: 'numbers-to-10-million', label: 'Numbers up to 10,000,000', description: 'Read, write, order and compare numbers up to 10,000,000 and determine the value of each digit' },
          { value: 'place-value-digits', label: 'Place Value of Digits', description: 'Determine the value of each digit in numbers up to 10,000,000' },
          { value: 'rounding-any-degree', label: 'Rounding to Any Degree', description: 'Round any whole number to a required degree of accuracy' },
          { value: 'negative-numbers-context', label: 'Negative Numbers in Context', description: 'Use negative numbers in context, and calculate intervals across zero' },
          { value: 'negative-number-calculations', label: 'Negative Number Calculations', description: 'Solve number problems and practical problems involving negative numbers' }
        ],
        learningObjectives: ['Read, write, order and compare numbers up to 10,000,000 and determine the value of each digit', 'Round any whole number to a required degree of accuracy', 'Use negative numbers in context, and calculate intervals across zero', 'Solve number and practical problems that involve all of the above'],
        complexity: 'SATs preparation level, complex reasoning'
      },
      'four-operations': {
        label: 'Four Operations',
        subtopics: [
          { value: 'long-multiplication', label: 'Long Multiplication (4-digit by 2-digit)', description: 'Multiply multi-digit numbers up to 4 digits by a two-digit whole number using the formal written method of long multiplication' },
          { value: 'long-division', label: 'Long Division (4-digit by 2-digit)', description: 'Divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division' },
          { value: 'short-division-2-digit-divisor', label: 'Short Division (2-digit divisor)', description: 'Divide numbers up to 4 digits by a two-digit number using the formal written method of short division where appropriate' },
          { value: 'remainders-interpretation', label: 'Interpret Remainders', description: 'Interpret remainders as whole number remainders, fractions, or by rounding, as appropriate for the context' },
          { value: 'mental-calculations-large', label: 'Mental Calculations (Large Numbers)', description: 'Perform mental calculations, including with mixed operations and large numbers' },
          { value: 'common-factors', label: 'Common Factors', description: 'Identify common factors of two numbers' },
          { value: 'common-multiples', label: 'Common Multiples', description: 'Identify common multiples of two numbers' },
          { value: 'prime-numbers-identification', label: 'Prime Number Identification', description: 'Identify prime numbers' },
          { value: 'order-of-operations', label: 'Order of Operations (BIDMAS)', description: 'Use their knowledge of the order of operations to carry out calculations involving the four operations' },
          { value: 'multi-step-problems', label: 'Multi-step Problems', description: 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why' },
          { value: 'estimation-checking', label: 'Estimation and Checking', description: 'Use estimation to check answers to calculations and determine, in the context of a problem, an appropriate degree of accuracy' }
        ],
        learningObjectives: ['Multiply multi-digit numbers up to 4 digits by a two-digit whole number using the formal written method of long multiplication', 'Divide numbers up to 4 digits by a two-digit whole number using the formal written method of long division, and interpret remainders as whole number remainders, fractions, or by rounding, as appropriate for the context', 'Divide numbers up to 4 digits by a two-digit number using the formal written method of short division where appropriate, interpreting remainders according to the context', 'Perform mental calculations, including with mixed operations and large numbers', 'Identify common factors, common multiples and prime numbers', 'Use their knowledge of the order of operations to carry out calculations involving the four operations', 'Solve addition and subtraction multi-step problems in contexts, deciding which operations and methods to use and why', 'Solve problems involving addition, subtraction, multiplication and division', 'Use estimation to check answers to calculations and determine, in the context of a problem, an appropriate degree of accuracy'],
        complexity: 'Mastery level with efficient methods'
      },
      'fractions': {
        label: 'Fractions',
        subtopics: [
          { value: 'simplify-fractions', label: 'Simplify Fractions', description: 'Use common factors to simplify fractions; use common multiples to express fractions in the same denomination' },
          { value: 'common-denominators', label: 'Common Denominators', description: 'Use common multiples to express fractions in the same denomination' },
          { value: 'compare-order-fractions', label: 'Compare and Order Fractions', description: 'Compare and order fractions, including fractions > 1' },
          { value: 'add-subtract-different-denominators', label: 'Add/Subtract (Different Denominators)', description: 'Add and subtract fractions with different denominators and mixed numbers, using the concept of equivalent fractions' },
          { value: 'multiply-fractions', label: 'Multiply Fractions', description: 'Multiply simple pairs of proper fractions, writing the answer in its simplest form' },
          { value: 'divide-fractions-by-integers', label: 'Divide Fractions by Integers', description: 'Divide proper fractions by whole numbers' },
          { value: 'fractions-as-division', label: 'Fractions as Division', description: 'Associate a fraction with division and calculate decimal fraction equivalents' },
          { value: 'fractions-of-amounts', label: 'Fractions of Amounts', description: 'Solve problems involving the calculation of fractions of amounts' }
        ],
        learningObjectives: ['Use common factors to simplify fractions; use common multiples to express fractions in the same denomination', 'Compare and order fractions, including fractions > 1', 'Add and subtract fractions with different denominators and mixed numbers, using the concept of equivalent fractions', 'Multiply simple pairs of proper fractions, writing the answer in its simplest form', 'Divide proper fractions by whole numbers', 'Associate a fraction with division and calculate decimal fraction equivalents (e.g. 0.375) for a simple fraction (e.g. ⅜)'],
        complexity: 'Advanced fraction operations'
      },
      'decimals': {
        label: 'Decimals',
        subtopics: [
          { value: 'decimal-place-value-3dp', label: 'Decimal Place Value (3dp)', description: 'Identify the value of each digit in numbers given to three decimal places' },
          { value: 'multiply-divide-by-10-100-1000', label: 'Multiply/Divide by 10, 100, 1000', description: 'Multiply and divide numbers by 10, 100 and 1,000 giving answers up to three decimal places' },
          { value: 'multiply-decimals', label: 'Multiply Decimals', description: 'Multiply one-digit numbers with up to two decimal places by whole numbers' },
          { value: 'divide-decimals', label: 'Divide Decimals', description: 'Use written division methods in cases where the answer has up to two decimal places' },
          { value: 'rounding-specified-accuracy', label: 'Rounding to Specified Accuracy', description: 'Solve problems which require answers to be rounded to specified degrees of accuracy' }
        ],
        learningObjectives: ['Identify the value of each digit in numbers given to three decimal places', 'Multiply and divide numbers by 10, 100 and 1,000 giving answers up to three decimal places', 'Multiply one-digit numbers with up to two decimal places by whole numbers', 'Use written division methods in cases where the answer has up to two decimal places', 'Solve problems which require answers to be rounded to specified degrees of accuracy'],
        complexity: 'Decimal operations with precision'
      },
      'percentages': {
        label: 'Percentages',
        subtopics: [
          { value: 'percentage-of-amounts', label: 'Percentage of Amounts', description: 'Solve problems involving the calculation of percentages [for example, of measures, and such as 15% of 360]' },
          { value: 'percentage-comparisons', label: 'Percentage for Comparison', description: 'Use percentages for comparison' },
          { value: 'fraction-decimal-percentage-equivalence', label: 'FDP Equivalence', description: 'Recall and use equivalences between simple fractions, decimals and percentages, including in different contexts' }
        ],
        learningObjectives: ['Solve problems involving the calculation of percentages [for example, of measures, and such as 15% of 360] and the use of percentages for comparison', 'Recall and use equivalences between simple fractions, decimals and percentages, including in different contexts'],
        complexity: 'Percentage applications in context'
      },
      'ratio-proportion': {
        label: 'Ratio and Proportion',
        subtopics: [
          { value: 'ratio-language-notation', label: 'Ratio Language and Notation', description: 'Use the ratio symbol and language to describe ratio' },
          { value: 'ratio-and-fractions', label: 'Ratio and Fractions Connection', description: 'Solve problems involving the relative sizes of two quantities where missing values can be found by using integer multiplication and division facts' },
          { value: 'scale-factors', label: 'Scale Factors', description: 'Solve problems involving similar shapes where the scale factor is known or can be found' },
          { value: 'unequal-sharing', label: 'Unequal Sharing and Grouping', description: 'Solve problems involving unequal sharing and grouping using knowledge of fractions and multiples' },
          { value: 'percentage-change', label: 'Percentage Change Problems', description: 'Solve problems involving the calculation of percentages' },
          { value: 'proportional-reasoning', label: 'Proportional Reasoning', description: 'Solve problems involving proportional reasoning' }
        ],
        learningObjectives: ['Solve problems involving the relative sizes of two quantities where missing values can be found by using integer multiplication and division facts', 'Solve problems involving the calculation of percentages [for example, of measures, and such as 15% of 360] and the use of percentages for comparison', 'Solve problems involving similar shapes where the scale factor is known or can be found', 'Solve problems involving unequal sharing and grouping using knowledge of fractions and multiples'],
        complexity: 'Complex problem-solving contexts'
      },
      'algebra': {
        label: 'Algebra',
        subtopics: [
          { value: 'function-machines', label: 'Function Machines', description: 'Use function machines to find inputs and outputs' },
          { value: 'simple-formulae', label: 'Simple Formulae', description: 'Use simple formulae' },
          { value: 'linear-sequences', label: 'Linear Number Sequences', description: 'Generate and describe linear number sequences' },
          { value: 'missing-number-problems', label: 'Missing Number Problems', description: 'Express missing number problems algebraically' },
          { value: 'two-unknowns-equations', label: 'Equations with Two Unknowns', description: 'Find pairs of numbers that satisfy an equation with two unknowns' },
          { value: 'enumerate-combinations', label: 'Enumerate Combinations', description: 'Enumerate possibilities of combinations of two variables' }
        ],
        learningObjectives: ['Use simple formulae', 'Generate and describe linear number sequences', 'Express missing number problems algebraically', 'Find pairs of numbers that satisfy an equation with two unknowns', 'Enumerate possibilities of combinations of two variables'],
        complexity: 'Introduction to algebraic thinking'
      },
      'measurement': {
        label: 'Measurement',
        subtopics: [
          { value: 'convert-metric-units-3dp', label: 'Convert Metric Units (3dp)', description: 'Solve problems involving the calculation and conversion of units of measure, using decimal notation up to three decimal places where appropriate' },
          { value: 'miles-kilometres', label: 'Miles and Kilometres', description: 'Convert between miles and kilometres' },
          { value: 'perimeter-area-relationship', label: 'Perimeter and Area Relationship', description: 'Recognise that shapes with the same areas can have different perimeters and vice versa' },
          { value: 'area-triangles', label: 'Area of Triangles', description: 'Calculate the area of triangles' },
          { value: 'area-parallelograms', label: 'Area of Parallelograms', description: 'Calculate the area of parallelograms' },
          { value: 'volume-cuboids', label: 'Volume of Cuboids', description: 'Calculate, estimate and compare volume of cubes and cuboids using standard units, including cubic centimetres (cm³) and cubic metres (m³)' },
          { value: 'formulae-area-volume', label: 'Formulae for Area and Volume', description: 'Recognise when it is possible to use formulae for area and volume of shapes' }
        ],
        learningObjectives: ['Solve problems involving the calculation and conversion of units of measure, using decimal notation up to three decimal places where appropriate', 'Use, read, write and convert between standard units, converting measurements of length, mass, volume and time from a smaller unit of measure to a larger unit, and vice versa, using decimal notation to up to three decimal places', 'Convert between miles and kilometres', 'Recognise that shapes with the same areas can have different perimeters and vice versa', 'Recognise when it is possible to use formulae for area and volume of shapes', 'Calculate the area of parallelograms and triangles', 'Calculate, estimate and compare volume of cubes and cuboids using standard units, including cubic centimetres (cm³) and cubic metres (m³), and extending to other units'],
        complexity: 'Real-world problem-solving with conversions and formulae'
      },
      'geometry-shapes': {
        label: 'Geometry: Properties of Shapes',
        subtopics: [
          { value: 'draw-2d-shapes', label: 'Draw 2D Shapes', description: 'Draw 2-D shapes using given dimensions and angles' },
          { value: 'build-3d-shapes', label: 'Build 3D Shapes', description: 'Recognise, describe and build simple 3-D shapes, including making nets' },
          { value: 'classify-shapes', label: 'Classify Shapes', description: 'Compare and classify geometric shapes based on their properties and sizes' },
          { value: 'angles-in-triangles', label: 'Angles in Triangles', description: 'Find unknown angles in any triangles' },
          { value: 'angles-in-quadrilaterals', label: 'Angles in Quadrilaterals', description: 'Find unknown angles in any quadrilaterals' },
          { value: 'angles-in-regular-polygons', label: 'Angles in Regular Polygons', description: 'Find unknown angles in regular polygons' },
          { value: 'circles-radius-diameter', label: 'Circles: Radius and Diameter', description: 'Illustrate and name parts of circles, including radius, diameter and circumference and know that the diameter is twice the radius' },
          { value: 'angles-at-point-line', label: 'Angles at a Point and on a Line', description: 'Recognise angles where they meet at a point, are on a straight line, or are vertically opposite' },
          { value: 'vertically-opposite-angles', label: 'Vertically Opposite Angles', description: 'Find missing angles using vertically opposite angles' }
        ],
        learningObjectives: ['Draw 2-D shapes using given dimensions and angles', 'Recognise, describe and build simple 3-D shapes, including making nets', 'Compare and classify geometric shapes based on their properties and sizes and find unknown angles in any triangles, quadrilaterals, and regular polygons', 'Illustrate and name parts of circles, including radius, diameter and circumference and know that the diameter is twice the radius', 'Recognise angles where they meet at a point, are on a straight line, or are vertically opposite, and find missing angles'],
        complexity: 'Classification, reasoning about angles and shapes'
      },
      'geometry-position': {
        label: 'Geometry: Position and Direction',
        subtopics: [
          { value: 'four-quadrant-coordinates', label: 'Four Quadrant Coordinates', description: 'Describe positions on the full coordinate grid (all four quadrants)' },
          { value: 'translate-shapes', label: 'Translate Shapes', description: 'Draw and translate simple shapes on the coordinate plane, and reflect them in the axes' },
          { value: 'reflect-shapes-axes', label: 'Reflect Shapes in Axes', description: 'Reflect shapes in the axes on the coordinate plane' }
        ],
        learningObjectives: ['Describe positions on the full coordinate grid (all four quadrants)', 'Draw and translate simple shapes on the coordinate plane, and reflect them in the axes'],
        complexity: 'Abstract spatial reasoning with all four quadrants'
      },
      'statistics': {
        label: 'Statistics',
        subtopics: [
          { value: 'pie-charts', label: 'Pie Charts', description: 'Interpret and construct pie charts and line graphs and use these to solve problems' },
          { value: 'line-graphs-interpret', label: 'Line Graphs', description: 'Interpret and construct line graphs' },
          { value: 'mean-average', label: 'Mean Average', description: 'Calculate and interpret the mean as an average' }
        ],
        learningObjectives: ['Interpret and construct pie charts and line graphs and use these to solve problems', 'Calculate and interpret the mean as an average'],
        complexity: 'Data analysis with mean calculations and pie charts'
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