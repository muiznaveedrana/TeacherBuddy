# Vision Catalog Creation Process for Worksheet Generation

## Overview

This document describes the **Claude-powered vision catalog generation process** used to analyze SCRAPPING DOODLE image collections for educational worksheet generation in the WorksheetGenerator-AI project.

## Why Claude Vision Over Gemini API?

**Advantages of using Claude Code vision capabilities:**
- ✅ **No API quota limits** - unlimited processing
- ✅ **Better educational context understanding** - Claude excels at curriculum mapping
- ✅ **More accurate analysis** - superior vision capabilities for educational content
- ✅ **Free with Claude Code** - no additional API costs
- ✅ **Integrated workflow** - seamless within development environment

## Process Architecture

### Phase 1: Batch Prompt Generation

**Script:** `scripts/vision-catalog-claude.js`

**What it does:**
1. Scans the SCRAPPING DOODLE image directory (`public/images/SCRAPPING DOODLE/`)
2. Identifies all image collections (365 collections total)
3. Prioritizes educational themes (fruits, animals, school, numbers, etc.)
4. Creates 37 batches of 10 collections each
5. Generates structured prompts for Claude analysis

**Command:**
```bash
node scripts/vision-catalog-claude.js
```

**Outputs:**
- `scripts/catalogs/claude-vision-tasks.json` - Master task configuration
- `scripts/catalogs/batch-prompts/batch-001.md` through `batch-037.md` - Individual batch prompts

### Phase 2: Manual Vision Analysis (Current Implementation)

**Process:**
1. Open a batch prompt file (e.g., `batch-prompts/batch-003.md`)
2. Copy the prompt content
3. Submit to Claude Code in a conversation
4. Claude uses vision capabilities to:
   - Read and analyze 3-5 sample images from each collection
   - Extract educational metadata
   - Generate structured JSON output
5. Save the JSON response to `scripts/catalogs/batch-results/batch-XXX-catalog.json`

**Example workflow:**
```bash
# View the prompt
cat scripts/catalogs/batch-prompts/batch-003.md

# Submit to Claude Code manually
# Claude analyzes images and returns JSON

# Save result
# (manual copy-paste to batch-results/batch-003-catalog.json)
```

## Metadata Schema

Each collection is analyzed to produce the following metadata:

```json
{
  "CollectionName": {
    "name": "Fruit_by_ScrappinDoodles",
    "path": "/images/SCRAPPING DOODLE/Fruit_by_ScrappinDoodles",
    "totalImages": 30,
    "colorImages": 15,
    "primaryObjects": ["apples", "bananas", "fruits", "berries"],
    "educationalKeywords": ["apple", "banana", "fruit", "counting"],
    "ageGroups": ["Reception", "Year 1", "Year 2"],
    "curriculumTopics": ["counting-to-10", "addition", "healthy-eating"],
    "thematicCategories": ["food", "nature", "healthy eating"],
    "questionTemplates": [
      "Count the apples. How many red apples are there?",
      "Sarah has 4 bananas. She eats 1. How many bananas left?"
    ],
    "colorPalette": ["red", "yellow", "brown", "green"],
    "styleNotes": "Simple, clear fruit illustrations with bold outlines",
    "visionAnalyzed": true,
    "analyzedBy": "claude",
    "priority": 10
  }
}
```

## Analysis Criteria

### 1. Primary Objects
- Main subjects depicted in images
- Physical objects that can be counted
- Educational relevance

### 2. Educational Keywords
- Terms for math word problems
- Curriculum-aligned vocabulary
- Age-appropriate language

### 3. Age Group Mapping
- **Reception** (4-5 years) - Basic counting, shapes
- **Year 1** (5-6 years) - Numbers to 20, simple addition
- **Year 2** (6-7 years) - Numbers to 100, subtraction
- **Year 3-6** (7-11 years) - Advanced operations

### 4. Curriculum Topics (UK Primary)
- `counting-to-10`, `counting-to-20`
- `addition`, `subtraction`, `multiplication`
- `shapes`, `patterns`, `fractions`
- `measurement`, `data`, `time`

### 5. Thematic Categories
- **Food & Nature:** fruits, vegetables, animals
- **School:** supplies, classroom, learning
- **Seasonal:** autumn, winter, holidays
- **Activities:** sports, play, daily life

### 6. Question Templates
Pre-written question structures using collection imagery:
- Counting questions
- Basic operations (addition/subtraction)
- Word problem scenarios
- Visual discrimination

### 7. Visual Analysis
- **Color Palette:** Dominant colors for theme coordination
- **Style Notes:** Art style, educational suitability, accessibility

### 8. Priority Scoring
- **10:** Core educational (numbers, school, common objects)
- **8-9:** Seasonal/thematic (holidays, seasons)
- **5-7:** Supplementary (decorative, backgrounds)
- **0:** Empty/unusable collections

## Current Progress

### Completed Batches
✅ **Batch 001** - 10 collections (Fall_BookFair, Farm_Babies, Farm_Bowling, etc.)
✅ **Batch 002** - 10 collections
✅ **Batch 003** - 10 collections (FroggyFun, Fruit, School_by_ScrappinDoodles, etc.)

**Results stored in:** `scripts/catalogs/batch-results/`

### Remaining Work
- 34 batches remaining (batch-004 through batch-037)
- ~340 collections to analyze

## Priority Collections (Process First)

**High-priority themes for worksheet generation:**

1. **Numbers & Counting**
   - FrogNumbers_byScrappinDoodles ✅
   - Santa_Numbers_byScrappinDoodles ✅

2. **Food & Fruits**
   - Fruit_by_ScrappinDoodles ✅
   - Farm collections ✅

3. **School & Education**
   - School_by_ScrappinDoodles ✅
   - FroggyFun_SchoolDays ✅
   - Sailor_Kids_School ✅

4. **Animals**
   - Farm animals ✅
   - Wildlife collections (pending)

5. **Shapes & Patterns**
   - (batches 4-10)

## NPM Scripts

```json
{
  "catalog:vision": "node scripts/vision-catalog-generator.js",
  "catalog:vision:update": "node scripts/vision-catalog-generator.js --update"
}
```

**Note:** The Gemini-based scripts are legacy. Current implementation uses Claude Code vision.

## File Organization

```
scripts/
├── vision-catalog-claude.js          # Main batch generator script
└── catalogs/
    ├── claude-vision-tasks.json      # Master configuration (365 collections, 37 batches)
    ├── batch-prompts/                # Generated prompts for Claude
    │   ├── batch-001.md              # Prompt for batch 1 (10 collections)
    │   ├── batch-002.md
    │   ├── batch-003.md
    │   └── ... (through batch-037.md)
    └── batch-results/                # Analysis results
        ├── batch-001-catalog.json    # ✅ Completed
        ├── batch-002-catalog.json    # ✅ Completed
        ├── batch-003-catalog.json    # ✅ Completed
        └── ... (remaining batches)
```

## Git Ignore Configuration

**Added to `.gitignore`:**
```gitignore
# Images in public folder
public/images/**

# Image library folder
IM/
```

Images are excluded from version control due to size and licensing.

## Example: Batch 003 Analysis

**Collections analyzed:**
1. FroggyFun_SchoolDays - School-themed frogs ⭐
2. FrogLifeColoringPages - Brand logo
3. FrogNumbers - Numbers 0-20 with frogs ⭐
4. Fruit_by_ScrappinDoodles - Fruit illustrations ⭐
5. Sailor_Kids_School - Children in uniforms ⭐
6. SammyScarecrow_LovesBooks - Reading theme ⭐
7. Santa_Numbers - Christmas numbers 0-19 ⭐
8. Scarecrow_Sunflower - Autumn theme
9. School_Backgrounds - Empty collection
10. School_by_ScrappinDoodles - 55 school supplies ⭐

**Key findings:**
- **8/10 collections** are priority educational content
- **1 empty collection** identified (School_Backgrounds)
- **Strong themes:** counting, school, numbers, literacy
- **Age range:** Reception through Year 4
- **Rich question templates** generated for each collection

## Phase 3: Catalog Consolidation (After All Batches Complete)

### Consolidation Script (Future)

**Purpose:** Merge all 37 batch results into one master catalog

**Script:** `scripts/consolidate-vision-catalog.js` (to be created)

```javascript
const fs = require('fs');
const path = require('path');

// Read all batch result files
const batchDir = './scripts/catalogs/batch-results';
const batchFiles = fs.readdirSync(batchDir)
  .filter(f => f.startsWith('batch-') && f.endsWith('-catalog.json'))
  .sort();

// Merge into master catalog
const masterCatalog = {};
batchFiles.forEach(file => {
  const batchData = JSON.parse(fs.readFileSync(path.join(batchDir, file)));
  Object.assign(masterCatalog, batchData);
});

// Save master catalog
fs.writeFileSync(
  './scripts/catalogs/master-vision-catalog.json',
  JSON.stringify(masterCatalog, null, 2)
);

console.log(`✅ Consolidated ${Object.keys(masterCatalog).length} collections`);
```

**Output:** `scripts/catalogs/master-vision-catalog.json` (365 collections)

## How Catalog Powers Worksheet Generation

### Use Case 1: Generate Year 1 Addition Worksheet

**Step 1: Worksheet Request**
```javascript
const worksheetRequest = {
  yearGroup: "Year 1",
  topic: "addition",
  questionCount: 5,
  difficulty: "standard"
};
```

**Step 2: Query Catalog for Suitable Collections**
```javascript
const catalog = require('./scripts/catalogs/master-vision-catalog.json');

// Filter collections by age group and topic
const suitableCollections = Object.values(catalog).filter(collection =>
  collection.ageGroups.includes("Year 1") &&
  collection.curriculumTopics.includes("addition") &&
  collection.colorImages > 0 &&
  collection.priority >= 8
);

// Example results:
// - Fruit_by_ScrappinDoodles (15 color images, priority 10)
// - School_by_ScrappinDoodles (30 color images, priority 10)
// - Farm_Babies_by_ScrappinDoodles (11 color images, priority 10)
```

**Step 3: Generate Questions Using Catalog Templates**
```javascript
// Select a collection
const selectedCollection = suitableCollections[0]; // Fruit_by_ScrappinDoodles

// Use pre-written question templates from catalog
const questionTemplate = selectedCollection.questionTemplates[1];
// "Sarah has 4 bananas. She gets 3 more. How many bananas now?"

// Generate question with actual images
const question = {
  text: "Sarah has 4 bananas. She gets 3 more. How many bananas now?",
  images: [
    `${selectedCollection.path}/banana.png`,  // 4 bananas
    `${selectedCollection.path}/banana.png`   // 3 more bananas
  ],
  answer: 7,
  ageGroup: "Year 1",
  topic: "addition",
  keywords: selectedCollection.educationalKeywords // ["banana", "fruit", "counting"]
};
```

**Step 4: Visual Theme Coordination**
```javascript
// Use color palette for consistent worksheet styling
const worksheetTheme = {
  primaryColor: selectedCollection.colorPalette[0],    // "red"
  accentColors: selectedCollection.colorPalette.slice(1), // ["yellow", "brown", "green"]
  styleNote: selectedCollection.styleNotes
  // "Simple, clear fruit illustrations with bold outlines"
};

// Apply theme to worksheet header, borders, backgrounds
```

### Use Case 2: Generate Reception Counting Worksheet

**Step 1: Request**
```javascript
const worksheetRequest = {
  yearGroup: "Reception",
  topic: "counting-to-10",
  questionCount: 8,
  thematicCategory: "animals"
};
```

**Step 2: Smart Collection Selection**
```javascript
// Query catalog with multiple filters
const animalCollections = Object.values(catalog).filter(c =>
  c.ageGroups.includes("Reception") &&
  c.curriculumTopics.includes("counting-to-10") &&
  c.thematicCategories.includes("animals") &&
  c.primaryObjects.some(obj =>
    ["frog", "farm", "animal", "pet"].some(keyword => obj.includes(keyword))
  )
);

// Results: FrogNumbers, Farm_Babies, etc.
```

**Step 3: Auto-Generate Questions from Metadata**
```javascript
const collection = animalCollections[0]; // FrogNumbers_byScrappinDoodles

// Use primaryObjects + questionTemplates
collection.primaryObjects // ["frogs", "numbers", "digits"]
collection.questionTemplates[0] // "What number is the frog holding?"

// Generate counting questions automatically
const questions = [1, 2, 3, 4, 5].map(num => ({
  text: `Count the frogs. How many frogs can you see?`,
  image: `${collection.path}/frog${num}.png`,
  answer: num,
  visualHint: collection.colorPalette[0] // "green" frogs
}));
```

### Use Case 3: Seasonal/Thematic Worksheet Generation

**Step 1: Christmas-Themed Math Worksheet**
```javascript
const christmasRequest = {
  yearGroup: "Year 2",
  topic: "number-recognition",
  theme: "Christmas",
  month: "December"
};
```

**Step 2: Thematic Catalog Query**
```javascript
// Find seasonal collections
const christmasCollections = Object.values(catalog).filter(c =>
  c.thematicCategories.includes("Christmas") ||
  c.thematicCategories.includes("winter") ||
  c.name.toLowerCase().includes("santa")
);

// Found: Santa_Numbers_byScrappinDoodles
const santaNumbers = christmasCollections[0];

// Metadata shows:
// - 20 color images (numbers 0-19)
// - Question templates ready
// - Color palette: ["red", "white", "green"]
```

**Step 3: Festive Worksheet Creation**
```javascript
const worksheet = {
  title: "Santa's Number Practice - Christmas Math",
  theme: {
    colors: santaNumbers.colorPalette, // Christmas colors
    images: santaNumbers.path,
    style: santaNumbers.styleNotes
  },
  questions: santaNumbers.questionTemplates.map((template, idx) => ({
    text: template,
    image: `${santaNumbers.path}/SantaNumbers${idx}.png`,
    seasonalContext: "Christmas"
  }))
};
```

### Use Case 4: Multi-Collection Worksheets

**Step 1: Mixed Topic Worksheet**
```javascript
const mixedRequest = {
  yearGroup: "Year 3",
  topics: ["addition", "subtraction", "counting"],
  variety: true // Use multiple collections
};
```

**Step 2: Select Diverse Collections**
```javascript
// Get 3 different themed collections for variety
const collections = [
  catalog["Fruit_by_ScrappinDoodles"],           // Food theme
  catalog["School_by_ScrappinDoodles"],          // School theme
  catalog["Farm_Babies_by_ScrappinDoodles"]      // Animal theme
];

// Generate mixed questions
const questions = [
  {
    text: collections[0].questionTemplates[0],
    image: `${collections[0].path}/apple.png`,
    theme: "food"
  },
  {
    text: collections[1].questionTemplates[1],
    image: `${collections[1].path}/pencil.png`,
    theme: "school"
  },
  {
    text: collections[2].questionTemplates[0],
    image: `${collections[2].path}/cow.png`,
    theme: "animals"
  }
];
```

## Catalog Benefits Summary

### 1. **Intelligent Image Selection**
- Automatically finds age-appropriate images
- Filters by curriculum topic and theme
- Ensures visual consistency

### 2. **Pre-Written Question Templates**
- 2-4 templates per collection (730+ total across 365 collections)
- Curriculum-aligned language
- Ready-to-use with minimal modification

### 3. **Metadata-Driven Quality**
```javascript
// Catalog ensures quality standards
if (collection.visionAnalyzed === true &&
    collection.priority >= 8 &&
    collection.colorImages > 5) {
  // High-quality, educational content verified by Claude vision
}
```

### 4. **Search & Discovery**
```javascript
// Find collections by any criteria
const searchResults = Object.values(catalog).filter(c =>
  c.educationalKeywords.includes("counting") &&
  c.styleNotes.includes("colorful") &&
  c.totalImages >= 10
);
```

### 5. **Consistency Across Worksheets**
- Same collection can be reused across year groups
- Thematic coherence in worksheet series
- Brand consistency (ScrappinDoodles style)

### 6. **Future-Proof Architecture**
```javascript
// Easy to extend with new metadata fields
collection.accessibility = "High contrast, clear outlines";
collection.culturalContext = "UK primary schools";
collection.printQuality = "300dpi, optimized for A4";
```

## Real-World Impact Example

**Before Catalog (Manual Selection):**
```javascript
// Random image selection - no metadata
const image = "/images/random_apple.png"; // Is this age-appropriate? Unknown
const question = "Count the apples"; // Generic, no context
```

**After Catalog (Intelligent Selection):**
```javascript
// Catalog-driven selection with full metadata
const collection = catalog["Fruit_by_ScrappinDoodles"];
// ✅ Age groups: Reception, Year 1, Year 2
// ✅ Curriculum: counting-to-10, addition, healthy-eating
// ✅ Color palette: red, yellow, brown, green
// ✅ Style: "Simple, clear fruit illustrations with bold outlines"
// ✅ Template: "Sarah has 4 bananas. She eats 1. How many bananas left?"

const question = {
  text: collection.questionTemplates[1],
  image: `${collection.path}/banana.png`,
  metadata: {
    verified: collection.visionAnalyzed,
    quality: collection.priority,
    ageAppropriate: true
  }
};
```

**Result:** Every worksheet generated is educationally sound, age-appropriate, and visually consistent.

## Future Enhancements

### Potential Automation (Phase 4)
- **Task Agent Integration:** Automatically process all batches using Claude Task agent
- **Quality Validation:** Check completeness and accuracy of metadata
- **Image Path Verification:** Ensure all paths resolve correctly
- **Automated Testing:** Verify catalog queries return expected results

## Command Reference

```bash
# Generate batch prompts
node scripts/vision-catalog-claude.js

# View a specific batch prompt
cat scripts/catalogs/batch-prompts/batch-003.md

# Process manually with Claude Code
# (copy prompt → submit to Claude → save JSON result)

# Check progress
ls -la scripts/catalogs/batch-results/

# View completed catalog
cat scripts/catalogs/batch-results/batch-003-catalog.json
```

## Testing the Catalog

```bash
# Verify image paths exist
node -e "const catalog = require('./scripts/catalogs/batch-results/batch-003-catalog.json'); \
  Object.values(catalog).forEach(c => console.log(c.path));"

# Count total images analyzed
node -e "const catalog = require('./scripts/catalogs/batch-results/batch-003-catalog.json'); \
  const total = Object.values(catalog).reduce((sum, c) => sum + c.totalImages, 0); \
  console.log('Total images:', total);"
```

## Success Metrics

**Per Batch:**
- ✅ All collections analyzed with vision
- ✅ Valid JSON metadata generated
- ✅ Question templates created (minimum 1 per collection)
- ✅ Age groups and curriculum topics mapped
- ✅ Priority scores assigned

**Overall Project:**
- 🎯 365 collections to catalog
- ✅ 30 collections completed (8% complete)
- 🎯 Target: 100% coverage for priority educational themes
- 🎯 Estimated: 37 batches total

## Notes

- **Manual Process Advantage:** Quality control and accuracy verification at each step
- **Claude Vision Quality:** Superior to automated API approaches for educational context
- **Iterative Refinement:** Each batch improves understanding of collection characteristics
- **Reusability:** Catalog metadata drives worksheet generation across all grade levels
