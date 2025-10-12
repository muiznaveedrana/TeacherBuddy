/**
 * Patch Script: Add Config-Specific Prompt Loading to promptService.ts
 *
 * This script modifies promptService.ts to:
 * 1. Import the config-specific prompt loader
 * 2. Add logic to load config-specific prompts when available
 * 3. Inject config-specific guidance at the beginning of the prompt
 */

const fs = require('fs');
const path = require('path');

const PROMPT_SERVICE_PATH = path.join(
  __dirname,
  '..',
  'src',
  'lib',
  'services',
  'promptService.ts'
);

const BACKUP_PATH = PROMPT_SERVICE_PATH + '.backup-' + Date.now();

function patchPromptService() {
  console.log('Reading promptService.ts...');
  let content = fs.readFileSync(PROMPT_SERVICE_PATH, 'utf-8');

  // Create backup
  fs.writeFileSync(BACKUP_PATH, content);
  console.log(`Backup created at: ${BACKUP_PATH}`);

  // Step 1: Add import statement for config-specific prompt loader
  const importToAdd = `import { loadConfigSpecificPrompt, generateConfigId } from './configSpecificPromptLoader'`;

  if (!content.includes('configSpecificPromptLoader')) {
    const importSection = content.match(/(import scrappingDoodleService from '\.\/scrappingDoodleService')/);
    if (importSection) {
      content = content.replace(
        importSection[0],
        importSection[0] + '\n' + importToAdd
      );
      console.log('✓ Added config-specific prompt loader import');
    }
  } else {
    console.log('✓ Import already exists');
  }

  // Step 2: Add config-specific prompt loading logic at the start of generateOptimalPrompt
  const generateOptimalPromptStart = `private static async generateOptimalPrompt(
    config: EnhancedPromptConfig,
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): Promise<string> {`;

  const configLoadingLogic = `private static async generateOptimalPrompt(
    config: EnhancedPromptConfig,
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): Promise<string> {
    // STEP 0: Try to load config-specific prompt if available
    const configId = generateConfigId(config.yearGroup, config.topic, config.subtopic);
    const configSpecificPromptData = await loadConfigSpecificPrompt(configId, 'latest');

    let configSpecificGuidance = '';
    if (configSpecificPromptData) {
      configSpecificGuidance = configSpecificPromptData.prompt;
      console.log(\`[PromptService] Using config-specific prompt for: \${configId} (v\${configSpecificPromptData.metadata.version})\`);
      console.log(\`[PromptService] Baseline score: \${configSpecificPromptData.metadata.baselineScore}, Target: \${configSpecificPromptData.metadata.targetScore}\`);
    } else {
      console.log(\`[PromptService] No config-specific prompt found for: \${configId}, using default\`);
    }
`;

  if (!content.includes('loadConfigSpecificPrompt(configId')) {
    content = content.replace(generateOptimalPromptStart, configLoadingLogic);
    console.log('✓ Added config-specific prompt loading logic');
  } else {
    console.log('✓ Config loading logic already exists');
  }

  // Step 3: Inject config-specific guidance into the prompt template
  // Find the return statement in generateOptimalPrompt
  const promptReturnPattern = /return `Create a \$\{config\.yearGroup\} \$\{config\.topic\} worksheet:/;

  if (content.match(promptReturnPattern)) {
    content = content.replace(
      promptReturnPattern,
      'return `${configSpecificGuidance}\n\nCreate a ${config.yearGroup} ${config.topic} worksheet:'
    );
    console.log('✓ Added config-specific guidance injection point');
  } else {
    console.log('⚠ Warning: Could not find prompt return statement pattern');
  }

  // Write the modified content
  fs.writeFileSync(PROMPT_SERVICE_PATH, content);
  console.log('✓ promptService.ts has been patched successfully!');
  console.log(`\nBackup location: ${BACKUP_PATH}`);
  console.log('\nChanges made:');
  console.log('  1. Imported configSpecificPromptLoader');
  console.log('  2. Added config-specific prompt loading at runtime');
  console.log('  3. Injected config-specific guidance into generated prompts');
}

// Run the patch
try {
  patchPromptService();
  console.log('\n✅ Patch completed successfully!');
} catch (error) {
  console.error('\n❌ Patch failed:', error);
  process.exit(1);
}
