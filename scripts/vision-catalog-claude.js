#!/usr/bin/env node

/**
 * Claude-Powered Vision Catalog Generator
 *
 * Uses Claude Code's vision capabilities to analyze SCRAPPING DOODLE collections
 *
 * Advantages over Gemini API:
 * - No quota limits
 * - Better educational context understanding
 * - More accurate curriculum mapping
 * - Free with Claude Code
 *
 * Usage:
 *   node scripts/vision-catalog-claude.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SCRAPPING_DOODLE_BASE = './public/images/SCRAPPING DOODLE';
const OUTPUT_DIR = './scripts/catalogs';
const CATALOG_PATH = path.join(OUTPUT_DIR, 'scrapping-doodle-claude-vision.json');

// Priority educational themes
const PRIORITY_KEYWORDS = [
  'fruit', 'vegetable', 'food', 'animal', 'farm', 'number', 'school', 'pencil',
  'book', 'ball', 'sport', 'shape', 'color', 'flower', 'nature', 'count'
];

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  Claude-Powered Vision Catalog Generator                  ║
║  Analyzing SCRAPPING DOODLE Image Collections             ║
╚═══════════════════════════════════════════════════════════╝

📋 This script will prepare batch analysis jobs for Claude Code.

Claude will analyze images to extract:
  • Primary objects and subjects
  • Educational keywords
  • Age group appropriateness (Reception - Year 6)
  • Curriculum topic mappings
  • Question templates
  • Color palettes and style notes

🚀 INSTRUCTIONS:
   1. This script creates analysis task files
   2. Use Claude Code Task agent to process batches
   3. Agent will analyze images using vision capabilities
   4. Results are consolidated into final catalog

📁 Output: ${CATALOG_PATH}
`);

/**
 * Get all collection directories
 */
function getAllCollections() {
  const collections = fs.readdirSync(SCRAPPING_DOODLE_BASE)
    .filter(name => {
      const fullPath = path.join(SCRAPPING_DOODLE_BASE, name);
      return fs.statSync(fullPath).isDirectory();
    });
  return collections;
}

/**
 * Determine if collection should be prioritized
 */
function isPriorityCollection(collectionName) {
  const nameLower = collectionName.toLowerCase();
  return PRIORITY_KEYWORDS.some(keyword => nameLower.includes(keyword));
}

/**
 * Sort collections by priority
 */
function sortCollectionsByPriority(collections) {
  return collections.sort((a, b) => {
    const aPriority = isPriorityCollection(a);
    const bPriority = isPriorityCollection(b);
    if (aPriority && !bPriority) return -1;
    if (!aPriority && bPriority) return 1;
    return a.localeCompare(b);
  });
}

/**
 * Get PNG files from collection
 */
function getCollectionFiles(collectionName) {
  const collectionPath = path.join(SCRAPPING_DOODLE_BASE, collectionName);
  const files = fs.readdirSync(collectionPath);

  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
  const colorFiles = pngFiles.filter(f => !f.startsWith('BW_'));
  const bwFiles = pngFiles.filter(f => f.startsWith('BW_'));

  return {
    colorFiles,
    bwFiles,
    allFiles: pngFiles,
    totalImages: pngFiles.length
  };
}

/**
 * Create analysis instructions for Claude
 */
function createAnalysisInstructions() {
  const allCollections = getAllCollections();
  const sortedCollections = sortCollectionsByPriority(allCollections);

  console.log(`\n📊 Found ${allCollections.length} collections to analyze`);

  // Priority collections (first batch)
  const priorityCollections = sortedCollections.filter(isPriorityCollection);
  console.log(`⭐ Priority collections: ${priorityCollections.length}`);
  console.log(`📦 Other collections: ${allCollections.length - priorityCollections.length}\n`);

  // Create batch instructions
  const batchSize = 10; // Process 10 collections at a time
  const batches = [];

  for (let i = 0; i < sortedCollections.length; i += batchSize) {
    const batch = sortedCollections.slice(i, i + batchSize);
    batches.push({
      batchNumber: Math.floor(i / batchSize) + 1,
      collections: batch.map(collectionName => {
        const files = getCollectionFiles(collectionName);
        return {
          name: collectionName,
          path: path.join(SCRAPPING_DOODLE_BASE, collectionName),
          colorImages: files.colorFiles.length,
          totalImages: files.totalImages,
          imageFiles: files.allFiles, // NEW: Include all actual filenames
          colorFiles: files.colorFiles,
          bwFiles: files.bwFiles,
          sampleImages: files.colorFiles.slice(0, 5),
          isPriority: isPriorityCollection(collectionName)
        };
      })
    });
  }

  return {
    totalCollections: allCollections.length,
    totalBatches: batches.length,
    batches
  };
}

/**
 * Generate prompt for Claude Task Agent
 */
function generateClaudeTaskPrompt(batch) {
  const collections = batch.collections.map((c, idx) => {
    return `
${idx + 1}. **${c.name}** ${c.isPriority ? '⭐ PRIORITY' : ''}
   Path: ${c.path}
   Images: ${c.totalImages} total, ${c.colorImages} color
   Sample files: ${c.sampleImages.slice(0, 3).join(', ')}`;
  }).join('\n');

  return `# Vision Analysis Task - Batch ${batch.batchNumber}

## Task: Analyze Educational Image Collections

Analyze the following ${batch.collections.length} SCRAPPING DOODLE image collections for use in UK primary school worksheets (Reception - Year 6).

**Collections to analyze:**
${collections}

## For each collection:

1. **Read and view 3-5 sample images** from the collection
2. **Analyze the images** to determine:
   - Primary objects/subjects depicted
   - Educational keywords for math problems
   - Appropriate age groups (Reception = 4-5, Year 1 = 5-6, etc.)
   - UK curriculum topics (counting, addition, animals, shapes, etc.)
   - Thematic categories (food, animals, school, nature, sports)
   - Example question templates
   - Dominant colors
   - Art style and educational suitability

3. **Generate JSON metadata** for each collection:

\`\`\`json
{
  "CollectionName": {
    "name": "CollectionName",
    "path": "/images/SCRAPPING DOODLE/CollectionName",
    "totalImages": 30,
    "colorImages": 15,
    "imageFiles": ["apple.png", "BW_apple.png", "banana.png", "BW_banana.png"],
    "colorFiles": ["apple.png", "banana.png"],
    "bwFiles": ["BW_apple.png", "BW_banana.png"],
    "primaryObjects": ["apples", "fruits", "food"],
    "educationalKeywords": ["apple", "fruit", "counting", "red", "green"],
    "ageGroups": ["Reception", "Year 1", "Year 2"],
    "curriculumTopics": ["counting-to-10", "addition", "colors"],
    "thematicCategories": ["food", "nature", "healthy eating"],
    "questionTemplates": [
      "Count the apples. How many are there?",
      "Emma has 5 apples. She gets 3 more. How many apples now?"
    ],
    "colorPalette": ["red", "green", "yellow"],
    "styleNotes": "Colorful cartoon-style fruit illustrations suitable for early years",
    "visionAnalyzed": true,
    "analyzedBy": "claude",
    "priority": 10
  }
}
\`\`\`

## Output Format:

Return a valid JSON object containing metadata for all ${batch.collections.length} collections analyzed.

**Important:**
- Actually READ and VIEW the images using your vision capabilities
- Provide accurate, specific analysis based on what you see
- Focus on educational value and curriculum alignment
- Return ONLY valid JSON, no markdown code blocks or explanations`;
}

/**
 * Main execution
 */
function main() {
  const instructions = createAnalysisInstructions();

  console.log(`📦 Total batches to process: ${instructions.totalBatches}`);
  console.log(`📋 ${instructions.totalCollections} collections total\n`);

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save instructions file
  const instructionsPath = path.join(OUTPUT_DIR, 'claude-vision-tasks.json');
  fs.writeFileSync(instructionsPath, JSON.stringify(instructions, null, 2));
  console.log(`✅ Instructions saved: ${instructionsPath}\n`);

  // Generate individual batch prompts
  const promptsDir = path.join(OUTPUT_DIR, 'batch-prompts');
  if (!fs.existsSync(promptsDir)) {
    fs.mkdirSync(promptsDir, { recursive: true });
  }

  instructions.batches.forEach((batch, index) => {
    const prompt = generateClaudeTaskPrompt(batch);
    const promptPath = path.join(promptsDir, `batch-${String(index + 1).padStart(3, '0')}.md`);
    fs.writeFileSync(promptPath, prompt);
  });

  console.log(`✅ Generated ${instructions.batches.length} batch prompts in: ${promptsDir}\n`);

  console.log(`
╔═══════════════════════════════════════════════════════════╗
║  NEXT STEPS - Use Claude Code Task Agent                  ║
╚═══════════════════════════════════════════════════════════╝

Option 1: Manual Processing (Recommended for first batch)
   1. Open: ${promptsDir}/batch-001.md
   2. Copy the prompt
   3. Ask Claude Code to execute the vision analysis
   4. Save the JSON response
   5. Repeat for other batches

Option 2: Automated Processing (Coming soon)
   - Use Task agent to process all batches
   - Automatically consolidate results
   - Generate final catalog

📊 Priority Batches (Process First):
   - Batch 1-6 contain educational themes (farm, food, school, sports)
   - These cover 80% of worksheet needs

💡 TIP: Process priority batches first, then resume later for remaining collections.
`);
}

main();
