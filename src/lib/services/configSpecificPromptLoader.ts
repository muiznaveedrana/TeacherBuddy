/**
 * Config-Specific Prompt Loader
 *
 * Loads and manages config-specific prompts for targeted quality improvements.
 * Used by promptService.ts to inject specialized prompts based on configuration ID.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface ConfigPromptMetadata {
  configId: string;
  version: string;
  yearGroup: string;
  topic: string;
  subtopic: string;
  baselineScore: number;
  targetScore: number;
  criticalIssues: string[];
  createdDate: string;
  status: 'active' | 'inactive' | 'deprecated';
}

export interface ConfigSpecificPromptData {
  prompt: string;
  metadata: ConfigPromptMetadata;
}

/**
 * Generates a config ID from worksheet configuration
 */
export function generateConfigId(
  yearGroup: string,
  topic: string,
  subtopic: string
): string {
  const normalize = (str: string) =>
    str.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return `${normalize(yearGroup)}-${normalize(topic)}-${normalize(subtopic)}`;
}

/**
 * Loads a config-specific prompt if available
 *
 * @param configId - The configuration identifier (e.g., "reception-number-counting-counting-to-10")
 * @param version - Version to load (e.g., "v1.0", "v1.1") or "latest" for most recent
 * @returns ConfigSpecificPromptData if found, null otherwise
 */
export async function loadConfigSpecificPrompt(
  configId: string,
  version: string = 'latest'
): Promise<ConfigSpecificPromptData | null> {
  try {
    // Determine the prompts directory path
    const promptsDir = path.join(process.cwd(), 'prompts', 'config-specific');

    // Check if directory exists
    if (!fs.existsSync(promptsDir)) {
      console.log(`[ConfigPromptLoader] No config-specific prompts directory found at: ${promptsDir}`);
      return null;
    }

    // Find matching prompt file
    let promptFilePath: string | null = null;

    if (version === 'latest') {
      // Find the latest version for this config
      const files = fs.readdirSync(promptsDir);
      const matchingFiles = files.filter(f =>
        f.startsWith(configId) &&
        f.endsWith('.ts') &&
        f.includes('-v')
      );

      if (matchingFiles.length === 0) {
        console.log(`[ConfigPromptLoader] No config-specific prompt found for: ${configId}`);
        return null;
      }

      // Sort by version (simple string sort works for vX.Y format)
      matchingFiles.sort().reverse();
      promptFilePath = path.join(promptsDir, matchingFiles[0]);
    } else {
      // Load specific version
      const fileName = `${configId}-${version}.ts`;
      promptFilePath = path.join(promptsDir, fileName);

      if (!fs.existsSync(promptFilePath)) {
        console.log(`[ConfigPromptLoader] Specific version not found: ${fileName}`);
        return null;
      }
    }

    console.log(`[ConfigPromptLoader] Loading config-specific prompt from: ${promptFilePath}`);

    // Load the prompt file dynamically
    const promptModule = await import(promptFilePath);

    if (!promptModule.configSpecificPrompt || !promptModule.configMetadata) {
      console.error(`[ConfigPromptLoader] Invalid prompt file format: ${promptFilePath}`);
      return null;
    }

    return {
      prompt: promptModule.configSpecificPrompt,
      metadata: promptModule.configMetadata
    };

  } catch (error) {
    console.error(`[ConfigPromptLoader] Error loading config-specific prompt:`, error);
    return null;
  }
}

/**
 * Checks if a config-specific prompt exists for the given configuration
 */
export function hasConfigSpecificPrompt(
  configId: string,
  version: string = 'latest'
): boolean {
  try {
    const promptsDir = path.join(process.cwd(), 'prompts', 'config-specific');

    if (!fs.existsSync(promptsDir)) {
      return false;
    }

    const files = fs.readdirSync(promptsDir);

    if (version === 'latest') {
      return files.some(f =>
        f.startsWith(configId) &&
        f.endsWith('.ts') &&
        f.includes('-v')
      );
    } else {
      const fileName = `${configId}-${version}.ts`;
      return fs.existsSync(path.join(promptsDir, fileName));
    }
  } catch (error) {
    return false;
  }
}

/**
 * Lists all available config-specific prompts
 */
export function listConfigSpecificPrompts(): Array<{
  configId: string;
  version: string;
  filePath: string;
}> {
  try {
    const promptsDir = path.join(process.cwd(), 'prompts', 'config-specific');

    if (!fs.existsSync(promptsDir)) {
      return [];
    }

    const files = fs.readdirSync(promptsDir);
    const prompts: Array<{ configId: string; version: string; filePath: string }> = [];

    for (const file of files) {
      if (file.endsWith('.ts') && file.includes('-v')) {
        const match = file.match(/^(.+)-(v[\d.]+)\.ts$/);
        if (match) {
          prompts.push({
            configId: match[1],
            version: match[2],
            filePath: path.join(promptsDir, file)
          });
        }
      }
    }

    return prompts;
  } catch (error) {
    console.error('[ConfigPromptLoader] Error listing prompts:', error);
    return [];
  }
}
