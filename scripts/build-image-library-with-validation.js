#!/usr/bin/env node

/**
 * Enhanced Image Library Builder with Human-in-Loop Validation
 *
 * This script addresses the image-name mismatch problem by:
 * 1. Downloading multiple candidates per search term
 * 2. Displaying images for human review
 * 3. Allowing manual selection of the best match
 * 4. Building a curated, accurate image library
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images', 'educational');
const TEMP_DIR = path.join(__dirname, '..', 'temp-image-candidates');
const METADATA_FILE = path.join(IMAGE_DIR, 'metadata.json');

// Rate limiting
const RATE_LIMIT_DELAY = 1000;

// Enhanced image categories with prioritized items (flower, book, pencil, toy, car, cookie, crayon)
const IMAGE_CATEGORIES = {
  'counting-objects': {
    subcategories: {
      nature: {
        items: [
          { name: 'flower', searches: ['rose love romantic nature', 'rose flower vector', 'romantic rose nature'] }
        ]
      },
      school: {
        items: [
          { name: 'book', searches: ['book vector simple', 'cartoon book illustration', 'school book icon'] },
          { name: 'pencil', searches: ['pencil vector simple', 'cartoon pencil illustration', 'school pencil icon'] },
          { name: 'crayon', searches: ['crayon vector simple', 'cartoon crayon illustration', 'coloring crayon icon'] }
        ]
      },
      toys: {
        items: [
          { name: 'toy', searches: ['toy vector simple', 'cartoon toy illustration', 'kids toy icon'] },
          { name: 'car', searches: ['car vector simple', 'cartoon car illustration', 'toy car vehicle'] }
        ]
      },
      food: {
        items: [
          { name: 'cookie', searches: ['cookie vector simple', 'cartoon cookie illustration', 'chocolate chip cookie'] }
        ]
      }
    }
  }
};

/**
 * Sleep utility for rate limiting
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Download image from URL to local file
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        require('fs').unlink(filepath, () => {}); // Delete partial file
        reject(err);
      });
    }).on('error', reject);
  });
}

/**
 * Search Pixabay for images
 */
async function searchPixabay(query, imageType = 'vector', maxResults = 15) {
  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: query,
    image_type: imageType,
    // Remove category restriction to get better results
    safesearch: 'true',
    per_page: maxResults,
    min_width: 200,        // Lowered to include more vectors
    min_height: 200,       // Lowered to include more vectors
    order: 'popular',
    editors_choice: 'false' // Don't restrict to editor's choice
  });

  const url = `${BASE_URL}?${params}`;

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Score image for educational suitability
 */
function scoreImageForEducation(image, imageType, targetItem) {
  let score = 0;

  // Prefer vectors and illustrations
  if (imageType === 'vector') score += 50;
  else if (imageType === 'illustration') score += 30;
  else score += 10;

  // Size quality
  if (image.imageWidth >= 1920) score += 20;
  else if (image.imageWidth >= 1280) score += 15;
  else if (image.imageWidth >= 640) score += 10;

  // Popularity
  score += Math.min(image.downloads / 1000, 15);

  // Target item relevance - check if tags contain the target item
  const imageTagsLower = image.tags.toLowerCase();
  const targetWords = targetItem.toLowerCase().split('-');
  const relevanceBonus = targetWords.filter(word => imageTagsLower.includes(word)).length * 10;
  score += relevanceBonus;

  // Educational tags bonus
  const educationalTags = ['cute', 'cartoon', 'colorful', 'simple', 'clean', 'children', 'kid', 'educational', 'illustration', 'clipart'];
  const matchingTags = educationalTags.filter(tag => imageTagsLower.includes(tag));
  score += matchingTags.length * 5;

  // Penalty for inappropriate tags
  const penaltyTags = ['adult', 'complex', 'realistic', 'detailed', 'professional', 'business'];
  const penaltyMatches = penaltyTags.filter(tag => imageTagsLower.includes(tag));
  score -= penaltyMatches.length * 10;

  return Math.max(0, score);
}

/**
 * Get candidates for a specific item
 */
async function getCandidatesForItem(itemName, searches) {
  console.log(`\n🔍 Searching for "${itemName}" candidates...`);

  const allCandidates = [];
  const imageTypes = ['vector', 'illustration', 'photo'];

  for (const imageType of imageTypes) {
    for (const query of searches) {
      try {
        console.log(`   Searching ${imageType}: "${query}"`);
        const results = await searchPixabay(query, imageType, 5);

        if (results.hits && results.hits.length > 0) {
          const scoredImages = results.hits.map(img => ({
            ...img,
            searchType: imageType,
            searchQuery: query,
            eduScore: scoreImageForEducation(img, imageType, itemName),
            itemName: itemName
          }));

          allCandidates.push(...scoredImages);
        }

        await sleep(RATE_LIMIT_DELAY);

      } catch (error) {
        console.warn(`   ⚠️ Search failed for ${imageType} "${query}": ${error.message}`);
      }
    }
  }

  // Remove duplicates and sort by score
  const uniqueCandidates = Array.from(
    new Map(allCandidates.map(img => [img.id, img])).values()
  ).sort((a, b) => b.eduScore - a.eduScore);

  console.log(`   Found ${uniqueCandidates.length} unique candidates`);

  // Return top 5 candidates for human review
  return uniqueCandidates.slice(0, 5);
}

/**
 * Download candidates for human review
 */
async function downloadCandidates(candidates, itemName) {
  const candidateDir = path.join(TEMP_DIR, itemName);
  await fs.mkdir(candidateDir, { recursive: true });

  const candidateFiles = [];

  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    const filename = `candidate_${i + 1}_score_${candidate.eduScore.toFixed(1)}_id_${candidate.id}.png`;
    const filepath = path.join(candidateDir, filename);

    try {
      console.log(`   ⬇️ Downloading candidate ${i + 1}/${candidates.length}: ${filename}`);
      await downloadImage(candidate.webformatURL, filepath);

      candidateFiles.push({
        filepath,
        filename,
        candidate,
        index: i + 1
      });

    } catch (error) {
      console.warn(`   ⚠️ Failed to download candidate ${i + 1}: ${error.message}`);
    }
  }

  return candidateFiles;
}

/**
 * Display candidates and get human selection
 */
async function getHumanSelection(candidateFiles, itemName) {
  console.log(`\n🖼️ Candidates for "${itemName}" downloaded to:`);
  console.log(`📁 ${path.join(TEMP_DIR, itemName)}`);

  console.log(`\nAvailable candidates:`);
  candidateFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file.filename}`);
    console.log(`   Score: ${file.candidate.eduScore.toFixed(1)}`);
    console.log(`   Tags: ${file.candidate.tags}`);
    console.log(`   Search: ${file.candidate.searchQuery} (${file.candidate.searchType})`);
    console.log('');
  });

  // Open the directory for human review
  try {
    const platform = process.platform;
    const candidateDir = path.join(TEMP_DIR, itemName);

    if (platform === 'win32') {
      execSync(`start "" "${candidateDir}"`);
    } else if (platform === 'darwin') {
      execSync(`open "${candidateDir}"`);
    } else {
      execSync(`xdg-open "${candidateDir}"`);
    }

    console.log(`📂 Opened candidate directory for review`);
  } catch (error) {
    console.log(`📂 Please manually review files in: ${path.join(TEMP_DIR, itemName)}`);
  }

  return new Promise((resolve) => {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function askForSelection() {
      rl.question(`\n❓ Which candidate best represents "${itemName}"? (1-${candidateFiles.length}, 0 to skip, 'r' to retry search): `, (answer) => {
        const choice = answer.trim().toLowerCase();

        if (choice === '0') {
          console.log(`⏭️ Skipping "${itemName}"`);
          rl.close();
          resolve(null);
        } else if (choice === 'r') {
          console.log(`🔄 Retry search requested for "${itemName}"`);
          rl.close();
          resolve('retry');
        } else {
          const selectionIndex = parseInt(choice) - 1;
          if (selectionIndex >= 0 && selectionIndex < candidateFiles.length) {
            console.log(`✅ Selected candidate ${choice} for "${itemName}"`);
            rl.close();
            resolve(candidateFiles[selectionIndex]);
          } else {
            console.log(`❌ Invalid selection. Please choose 1-${candidateFiles.length}, 0 to skip, or 'r' to retry.`);
            askForSelection();
          }
        }
      });
    }

    askForSelection();
  });
}

/**
 * Process a single item with human validation
 */
async function processItemWithValidation(itemName, searches, categoryName, subcategoryName) {
  console.log(`\n🎯 Processing: ${itemName}`);

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    console.log(`\n📝 Attempt ${attempts}/${maxAttempts} for "${itemName}"`);

    try {
      // Get candidates
      const candidates = await getCandidatesForItem(itemName, searches);

      if (candidates.length === 0) {
        console.log(`❌ No candidates found for "${itemName}"`);
        return null;
      }

      // Download candidates for review
      const candidateFiles = await downloadCandidates(candidates, itemName);

      if (candidateFiles.length === 0) {
        console.log(`❌ No candidates could be downloaded for "${itemName}"`);
        return null;
      }

      // Get human selection
      const selection = await getHumanSelection(candidateFiles, itemName);

      if (selection === 'retry') {
        console.log(`🔄 Retrying search for "${itemName}"`);
        continue;
      }

      if (selection === null) {
        console.log(`⏭️ Skipping "${itemName}"`);
        return null;
      }

      // Move selected image to final location
      const finalDir = path.join(IMAGE_DIR, categoryName, subcategoryName);
      await fs.mkdir(finalDir, { recursive: true });

      const finalFilename = `${itemName}-validated-${selection.candidate.id}.png`;
      const finalPath = path.join(finalDir, finalFilename);
      const relativePath = `/images/educational/${categoryName}/${subcategoryName}/${finalFilename}`;

      await fs.copyFile(selection.filepath, finalPath);

      console.log(`✅ Successfully processed "${itemName}"`);

      // Clean up candidates
      try {
        await fs.rmdir(path.join(TEMP_DIR, itemName), { recursive: true });
      } catch (error) {
        console.warn(`⚠️ Could not clean up temp files for ${itemName}`);
      }

      // Return metadata
      return {
        filename: finalFilename,
        path: relativePath,
        subcategory: subcategoryName,
        tags: selection.candidate.tags.split(', '),
        query: selection.candidate.searchQuery,
        searchType: selection.candidate.searchType,
        eduScore: selection.candidate.eduScore,
        pixabay_id: selection.candidate.id,
        attribution: `Image by ${selection.candidate.user} from Pixabay`,
        source: 'Pixabay',
        webformatURL: selection.candidate.webformatURL,
        imageSize: {
          width: selection.candidate.imageWidth,
          height: selection.candidate.imageHeight
        },
        downloads: selection.candidate.downloads,
        views: selection.candidate.views,
        downloaded_at: new Date().toISOString(),
        human_validated: true,
        validation_date: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Error processing "${itemName}" (attempt ${attempts}):`, error.message);

      if (attempts === maxAttempts) {
        console.error(`💥 Failed to process "${itemName}" after ${maxAttempts} attempts`);
        return null;
      }
    }
  }

  return null;
}

/**
 * Main execution function
 */
async function buildValidatedImageLibrary() {
  console.log('🚀 Starting Human-Validated Image Library Builder');
  console.log('👁️ This process requires human review of image candidates');
  console.log('🔍 Each item will show multiple candidates for selection');

  if (!PIXABAY_API_KEY) {
    console.error('❌ PIXABAY_API_KEY not found in .env.local');
    process.exit(1);
  }

  // Ensure directories exist
  await fs.mkdir(IMAGE_DIR, { recursive: true });
  await fs.mkdir(TEMP_DIR, { recursive: true });

  const metadata = {
    created_at: new Date().toISOString(),
    total_categories: Object.keys(IMAGE_CATEGORIES).length,
    total_images: 0,
    categories: {},
    build_config: {
      human_validated: true,
      safe_search: true,
      preferred_types: ['vector', 'illustration', 'photo'],
      educational_scoring: true
    }
  };

  // Process each category
  for (const [categoryName, categoryConfig] of Object.entries(IMAGE_CATEGORIES)) {
    console.log(`\n📁 Processing category: ${categoryName}`);

    const categoryMetadata = {
      subcategories: Object.keys(categoryConfig.subcategories),
      total_images: 0,
      images: []
    };

    for (const [subcategoryName, subcategoryConfig] of Object.entries(categoryConfig.subcategories)) {
      console.log(`\n📂 Processing subcategory: ${subcategoryName}`);

      for (const item of subcategoryConfig.items) {
        const imageMetadata = await processItemWithValidation(
          item.name,
          item.searches,
          categoryName,
          subcategoryName
        );

        if (imageMetadata) {
          categoryMetadata.images.push(imageMetadata);
          categoryMetadata.total_images++;
          metadata.total_images++;
        }
      }
    }

    metadata.categories[categoryName] = categoryMetadata;
    console.log(`✅ Completed ${categoryName}: ${categoryMetadata.total_images} images`);
  }

  // Save metadata
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));

  // Clean up temp directory
  try {
    await fs.rmdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.warn('⚠️ Could not clean up temp directory');
  }

  console.log('\n🎉 Human-Validated Image Library Build Complete!');
  console.log(`📈 Total images: ${metadata.total_images}`);
  console.log(`📄 Metadata saved to: ${METADATA_FILE}`);
  console.log(`📁 Images stored in: ${IMAGE_DIR}`);
  console.log('✅ All images have been human-validated for accuracy');
}

// Export for use as module
module.exports = { buildValidatedImageLibrary };

// Run the script if called directly
if (require.main === module) {
  buildValidatedImageLibrary().catch(error => {
    console.error('💥 Build failed:', error);
    process.exit(1);
  });
}