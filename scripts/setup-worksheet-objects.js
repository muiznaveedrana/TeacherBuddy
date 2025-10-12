const fs = require('fs');
const path = require('path');

// Load the image availability map
const mapPath = path.join(__dirname, 'image-availability-map.json');
const imageMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const sourceRoot = 'M:/ClaudeCodeProjects/worksheetgenerator-ai/public/images/SCRAPPING DOODLE';
const targetRoot = 'M:/ClaudeCodeProjects/worksheetgenerator-ai/public/images/WORKSHEET_OBJECTS';

// Category mappings
const categoryMapping = {
  fruits: 'counting/fruits',
  garden: 'counting/garden',
  school: 'counting/school_supplies',
  farm: 'counting/farm_animals',
  toys: 'counting/toys',
  vegetables: 'counting/vegetables',
  sports: 'counting/sports',
  food: 'counting/food_treats',
  shapes: 'counting/shapes',
  vehicles: 'counting/vehicles'
};

// Catalog data structure
const catalog = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString().split('T')[0],
  totalObjects: 0,
  objects: {}
};

console.log('🚀 SETTING UP WORKSHEET_OBJECTS DIRECTORY\n');
console.log('='.repeat(80));

// Create directory structure
console.log('\n📁 Creating directory structure...');
Object.values(categoryMapping).forEach(categoryPath => {
  const fullPath = path.join(targetRoot, categoryPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`   ✓ Created: ${categoryPath}`);
  }
});

// Create shared directories for future use
const sharedDirs = [
  'addition/number_blocks',
  'addition/ten_frames',
  'subtraction/number_lines',
  'shapes_geometry/2d_shapes',
  'shapes_geometry/3d_shapes',
  'measurement/length_tools',
  'shared/characters',
  'shared/backgrounds'
];

sharedDirs.forEach(dir => {
  const fullPath = path.join(targetRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`   ✓ Created: ${dir} (placeholder for future)`);
  }
});

console.log('\n📋 Processing 67 verified objects...\n');

let successCount = 0;
let errorCount = 0;

// Process each found object
Object.keys(imageMap.found).forEach(objectName => {
  const images = imageMap.found[objectName];
  if (images.length === 0) return;

  // Use the first (best) image for each object
  const bestImage = images[0];
  const category = bestImage.category;
  const targetCategory = categoryMapping[category];

  if (!targetCategory) {
    console.log(`   ⚠️  Skipping ${objectName}: No category mapping for ${category}`);
    return;
  }

  // Determine target filename (handle multi-word objects)
  const targetFileName = objectName.toLowerCase().replace(/\s+/g, '_') + '.png';
  const sourcePath = path.join(sourceRoot, bestImage.collection, bestImage.fileName);
  const targetPath = path.join(targetRoot, targetCategory, targetFileName);

  // Copy file
  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`   ✓ Copied: ${objectName} → ${targetCategory}/${targetFileName}`);

      // Add to catalog
      const catalogKey = `${targetCategory}/${targetFileName}`;
      catalog.objects[catalogKey] = {
        name: objectName,
        pluralName: objectName + 's', // Simple pluralization (can improve later)
        category: category,
        subcategory: targetCategory.split('/')[1],
        topic: 'counting',
        yearGroups: ['Reception', 'Year 1'], // Default, can be updated
        sourceCollection: bestImage.collection,
        sourceFile: bestImage.fileName,
        alternativeImages: images.length - 1, // Number of other available images
        verified: true,
        addedDate: new Date().toISOString().split('T')[0]
      };

      successCount++;
      catalog.totalObjects++;
    } else {
      console.log(`   ❌ ERROR: Source not found: ${sourcePath}`);
      errorCount++;
    }
  } catch (error) {
    console.log(`   ❌ ERROR copying ${objectName}: ${error.message}`);
    errorCount++;
  }
});

// Save catalog
const catalogPath = path.join(targetRoot, '_CATALOG.json');
fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`\n💾 Catalog saved: _CATALOG.json`);

// Create README
const readmePath = path.join(targetRoot, 'README.md');
const readmeContent = `# Worksheet Objects Image Library

**Version**: ${catalog.version}
**Last Updated**: ${catalog.lastUpdated}
**Total Objects**: ${catalog.totalObjects}

## Purpose

This directory contains curated, standardized images for use in AI-generated educational worksheets. All images are organized by curriculum topic and object category for easy access and scalability.

## Directory Structure

\`\`\`
WORKSHEET_OBJECTS/
├── counting/              # Objects for counting activities (Reception - Year 2)
│   ├── fruits/           # ${Object.keys(catalog.objects).filter(k => k.includes('fruits')).length} fruit images
│   ├── farm_animals/     # ${Object.keys(catalog.objects).filter(k => k.includes('farm_animals')).length} farm animal images
│   ├── garden/           # ${Object.keys(catalog.objects).filter(k => k.includes('garden')).length} garden/nature images
│   ├── school_supplies/  # ${Object.keys(catalog.objects).filter(k => k.includes('school_supplies')).length} school supply images
│   ├── toys/             # ${Object.keys(catalog.objects).filter(k => k.includes('toys')).length} toy images
│   ├── vegetables/       # ${Object.keys(catalog.objects).filter(k => k.includes('vegetables')).length} vegetable images
│   ├── food_treats/      # ${Object.keys(catalog.objects).filter(k => k.includes('food_treats')).length} food/treat images
│   ├── shapes/           # ${Object.keys(catalog.objects).filter(k => k.includes('shapes')).length} shape images
│   ├── sports/           # ${Object.keys(catalog.objects).filter(k => k.includes('sports')).length} sports equipment images
│   └── vehicles/         # ${Object.keys(catalog.objects).filter(k => k.includes('vehicles')).length} vehicle images
├── addition/             # (Future) Addition-specific objects
├── subtraction/          # (Future) Subtraction-specific objects
├── shapes_geometry/      # (Future) Geometry topic objects
├── measurement/          # (Future) Measurement topic objects
└── shared/               # Cross-topic reusable resources

\`\`\`

## Naming Conventions

### File Naming Rules:
- **Format**: \`{object_name}.png\`
- **Case**: Lowercase only
- **Spaces**: Use underscores for multi-word objects
- **Examples**:
  - ✅ \`apple.png\`
  - ✅ \`teddy_bear.png\`
  - ✅ \`tennis_ball.png\`
  - ❌ \`Apple.png\` (uppercase)
  - ❌ \`teddy bear.png\` (space)

### Path Examples:
\`\`\`
/images/WORKSHEET_OBJECTS/counting/fruits/apple.png
/images/WORKSHEET_OBJECTS/counting/farm_animals/cow.png
/images/WORKSHEET_OBJECTS/counting/school_supplies/pencil.png
\`\`\`

## Using Images in Prompts

### For LLM Prompts:
\`\`\`html
<!-- Simple, predictable paths -->
<img src="/images/WORKSHEET_OBJECTS/counting/fruits/apple.png" width="80" height="80" alt="Apple" />
\`\`\`

### Available Objects:
See \`_CATALOG.json\` for complete list with metadata.

## Quality Standards

All images in this directory must:
1. ✅ Be verified to load correctly in worksheets
2. ✅ Be age-appropriate for target year groups
3. ✅ Be clearly recognizable by children
4. ✅ Have transparent or white backgrounds (preferred)
5. ✅ Be properly licensed (currently using Scrapping Doodles)

## Adding New Objects

### Process:
1. Source or create image following quality standards
2. Name file according to naming conventions
3. Place in appropriate topic/category directory
4. Update \`_CATALOG.json\` with metadata
5. Test in worksheet generation
6. Mark as verified after successful test

### Required Metadata:
\`\`\`json
{
  "counting/fruits/new_fruit.png": {
    "name": "new fruit",
    "pluralName": "new fruits",
    "category": "fruits",
    "subcategory": "fruits",
    "topic": "counting",
    "yearGroups": ["Reception", "Year 1"],
    "sourceCollection": "Custom",
    "sourceFile": "new_fruit.png",
    "verified": false,
    "addedDate": "YYYY-MM-DD"
  }
}
\`\`\`

## Maintenance

- **Verification**: All new objects must pass worksheet quality assessment
- **Updates**: Increment version in \`_CATALOG.json\` when adding/removing objects
- **Deprecation**: Move deprecated images to \`_deprecated/\` directory (don't delete)
- **Backup**: Original source images remain in \`SCRAPPING DOODLE/\` directories

## Source Attribution

Current images sourced from **Scrapping Doodles** collections.
Original collections preserved in \`/images/SCRAPPING DOODLE/\` directory.

## Questions?

Contact: Development team
Last Review: ${catalog.lastUpdated}
`;

fs.writeFileSync(readmePath, readmeContent);
console.log(`📄 README created: README.md`);

// Summary
console.log('\n' + '='.repeat(80));
console.log('✅ SETUP COMPLETE!\n');
console.log(`📊 Summary:`);
console.log(`   Successfully copied: ${successCount} objects`);
console.log(`   Errors: ${errorCount}`);
console.log(`   Total categories: ${Object.keys(categoryMapping).length}`);
console.log(`   Catalog entries: ${catalog.totalObjects}`);
console.log(`\n📁 Location: ${targetRoot}`);
console.log(`\n🎯 Next Steps:`);
console.log(`   1. Review copied images in WORKSHEET_OBJECTS directory`);
console.log(`   2. Update prompts to use new paths`);
console.log(`   3. Test with worksheet generation`);
console.log(`   4. Add missing objects (21 from audit)\n`);
