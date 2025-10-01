#!/usr/bin/env node

/**
 * Enhanced Image Library Builder - Pixabay Integration
 *
 * This script builds a pre-curated image library by downloading
 * child-safe, educational images from Pixabay API for offline use in worksheets.
 * Features: Safe search, vector/illustration priority, educational scoring
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images', 'educational');
const METADATA_FILE = path.join(IMAGE_DIR, 'metadata.json');

// Rate limiting - Pixabay allows 100 requests per 60 seconds
const RATE_LIMIT_DELAY = 1000; // 1 second between requests to be safe

// Enhanced image categories for primary school worksheets
const IMAGE_CATEGORIES = {
  'counting-objects': {
    subcategories: {
      fruits: {
        vector: ['red apple vector simple', 'yellow banana illustration clipart', 'orange fruit cartoon'],
        illustration: ['apple cartoon character', 'banana smile illustration', 'orange cute drawing'],
        fallback: ['apple cartoon', 'banana simple', 'orange clipart']
      },
      toys: {
        vector: ['building blocks vector colorful', 'rubber ball illustration', 'teddy bear cute vector'],
        illustration: ['wooden blocks cartoon', 'bouncing ball clipart', 'stuffed bear illustration'],
        fallback: ['toy blocks cartoon', 'ball children', 'bear toy simple']
      },
      animals: {
        vector: ['orange cat vector simple', 'golden dog illustration', 'farm cow cartoon'],
        illustration: ['kitten cute cartoon', 'puppy friendly clipart', 'farm animals simple'],
        fallback: ['cat orange simple', 'dog golden retriever', 'cow farm animal']
      }
    },
    imagesPerSubcategory: 2
  },
  'math-operations': {
    subcategories: {
      shapes: {
        vector: ['circle shape vector blue', 'triangle red geometric', 'square yellow simple'],
        illustration: ['round circle cartoon', 'triangle math clipart', 'square block illustration'],
        fallback: ['blue circle', 'red triangle', 'yellow square']
      },
      numbers: {
        vector: ['number 1 vector block', 'digit 2 illustration', 'number 3 cartoon'],
        illustration: ['counting numbers clipart', 'math digits colorful', 'number blocks educational'],
        fallback: ['number one', 'digit two', 'number three']
      }
    },
    imagesPerSubcategory: 2
  },
  'reading-writing': {
    subcategories: {
      alphabet: {
        vector: ['letter A block vector', 'alphabet B illustration', 'letter C cartoon'],
        illustration: ['ABC blocks colorful', 'alphabet letters cute', 'learning letters clipart'],
        fallback: ['letter A block', 'letter B simple', 'letter C cartoon']
      },
      books: {
        vector: ['open book vector simple', 'storybook illustration', 'reading book cartoon'],
        illustration: ['picture book clipart', 'children story illustration', 'school book cartoon'],
        fallback: ['book open simple', 'story book kids', 'reading book']
      }
    },
    imagesPerSubcategory: 2
  },
  'science-nature': {
    subcategories: {
      weather: {
        vector: ['bright sun vector yellow', 'white cloud illustration', 'rain drops cartoon'],
        illustration: ['smiling sun clipart', 'fluffy cloud cartoon', 'rain weather illustration'],
        fallback: ['yellow sun', 'white cloud', 'rain drops']
      },
      plants: {
        vector: ['red flower vector simple', 'green tree illustration', 'plant leaf cartoon'],
        illustration: ['daisy flower clipart', 'oak tree cartoon', 'garden plant illustration'],
        fallback: ['flower red simple', 'tree green tall', 'leaf plant']
      }
    },
    imagesPerSubcategory: 2
  },
  'everyday-objects': {
    subcategories: {
      'school-supplies': {
        vector: ['yellow pencil vector', 'red crayon illustration', 'ruler tool cartoon'],
        illustration: ['pencil writing clipart', 'crayon coloring cartoon', 'school tools illustration'],
        fallback: ['pencil yellow', 'crayon red', 'ruler straight']
      },
      'household-items': {
        vector: ['wooden chair vector', 'dining table illustration', 'coffee cup cartoon'],
        illustration: ['school chair clipart', 'kitchen table cartoon', 'drink cup illustration'],
        fallback: ['chair wooden', 'table dining', 'cup coffee']
      }
    },
    imagesPerSubcategory: 2
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
 * Enhanced Pixabay search with educational content optimization
 */
async function searchPixabay(query, imageType = 'vector', category = 'education', maxResults = 10) {
  const params = new URLSearchParams({
    key: PIXABAY_API_KEY,
    q: query,
    image_type: imageType, // vector, illustration, or photo
    category: category,
    safesearch: 'true',    // CRITICAL: Child-safe content only
    per_page: maxResults,
    min_width: 640,
    min_height: 480,
    order: 'popular',
    editors_choice: 'true'
  });

  // Add transparent background preference for vectors
  if (imageType === 'vector') {
    params.append('colors', 'transparent');
  }

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
function scoreImageForEducation(image, imageType) {
  let score = 0;

  // Prefer vectors and illustrations for educational content
  if (imageType === 'vector') score += 50;
  else if (imageType === 'illustration') score += 30;
  else score += 10; // photos get lower priority

  // Size quality (higher resolution is better)
  if (image.imageWidth >= 1920) score += 20;
  else if (image.imageWidth >= 1280) score += 15;
  else if (image.imageWidth >= 640) score += 10;

  // Popularity (downloads indicate quality)
  score += Math.min(image.downloads / 1000, 15);

  // Child-friendly and educational tags
  const educationalTags = ['cute', 'cartoon', 'colorful', 'simple', 'clean', 'children', 'kid', 'educational', 'illustration', 'clipart'];
  const imageTagsLower = image.tags.toLowerCase();
  const matchingTags = educationalTags.filter(tag => imageTagsLower.includes(tag));
  score += matchingTags.length * 5;

  // Penalize inappropriate or complex tags
  const penaltyTags = ['adult', 'complex', 'realistic', 'detailed', 'professional', 'business'];
  const penaltyMatches = penaltyTags.filter(tag => imageTagsLower.includes(tag));
  score -= penaltyMatches.length * 10;

  // Bonus for high view count
  score += Math.min(image.views / 10000, 10);

  return Math.max(0, score); // Ensure non-negative score
}

// Global set to track used image IDs to prevent duplicates
const usedImageIds = new Set();

/**
 * Select best educational image from multiple search types with deduplication
 */
async function selectBestEducationalImage(searchQueries, category) {
  const allImages = [];
  const imageTypes = ['vector', 'illustration', 'photo'];

  // Search across different image types and queries
  for (const imageType of imageTypes) {
    for (const query of searchQueries) {
      try {
        console.log(`      🔍 Searching ${imageType}: "${query}"`);
        const results = await searchPixabay(query, imageType, category, 10); // Get more options

        if (results.hits && results.hits.length > 0) {
          // Filter out already used images and add type and score
          const scoredImages = results.hits
            .filter(img => !usedImageIds.has(img.id)) // Prevent duplicates
            .map(img => ({
              ...img,
              searchType: imageType,
              searchQuery: query,
              eduScore: scoreImageForEducation(img, imageType)
            }));

          allImages.push(...scoredImages);
        }

        // Rate limiting
        await sleep(RATE_LIMIT_DELAY);

      } catch (error) {
        console.warn(`      ⚠️  Search failed for ${imageType} "${query}": ${error.message}`);
      }
    }
  }

  if (allImages.length === 0) {
    console.warn(`      ⚠️  No unique images found for queries: ${searchQueries.join(', ')}`);
    return null;
  }

  // Remove duplicates by ID and sort by educational score
  const uniqueImages = Array.from(
    new Map(allImages.map(img => [img.id, img])).values()
  ).sort((a, b) => b.eduScore - a.eduScore);

  const bestImage = uniqueImages[0];

  // Mark this image as used
  usedImageIds.add(bestImage.id);

  console.log(`      ✨ Selected ${bestImage.searchType} image ID:${bestImage.id} (score: ${bestImage.eduScore.toFixed(1)})`);
  return bestImage;
}

/**
 * Generate safe filename from search query and image data
 */
function generateFilename(query, imageData, index) {
  const baseQuery = query.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 20);

  const id = imageData.id;

  // Determine file extension based on image type
  let ext = 'jpg'; // default
  if (imageData.searchType === 'vector') {
    // For vectors, try to get SVG if available, otherwise use webformat
    ext = imageData.vectorURL ? 'svg' : 'png';
  } else if (imageData.searchType === 'illustration') {
    ext = 'png'; // PNG is better for illustrations with transparency
  }

  return `${baseQuery}-${id}-${String(index).padStart(3, '0')}.${ext}`;
}

/**
 * Get the best download URL for educational use
 */
function getBestDownloadURL(imageData) {
  // Priority: vector SVG > high-res PNG > web format
  if (imageData.searchType === 'vector' && imageData.vectorURL) {
    return imageData.vectorURL; // SVG format
  }

  // For illustrations and photos, prefer larger sizes
  if (imageData.fullHDURL) {
    return imageData.fullHDURL;
  } else if (imageData.largeImageURL) {
    return imageData.largeImageURL;
  } else {
    return imageData.webformatURL;
  }
}

/**
 * Process a single category and download images
 */
async function processCategory(categoryName, categoryConfig) {
  console.log(`\n📁 Processing category: ${categoryName}`);

  const categoryPath = path.join(IMAGE_DIR, categoryName);
  await fs.mkdir(categoryPath, { recursive: true });

  const categoryMetadata = {
    subcategories: Object.keys(categoryConfig.subcategories),
    total_images: 0,
    images: []
  };

  for (const [subcategoryName, subcategoryQueries] of Object.entries(categoryConfig.subcategories)) {
    console.log(`  📂 Processing subcategory: ${subcategoryName}`);

    const subcategoryPath = path.join(categoryPath, subcategoryName);
    await fs.mkdir(subcategoryPath, { recursive: true });

    let imageCount = 0;

    // Process each search type (vector, illustration, fallback)
    const searchTypes = ['vector', 'illustration', 'fallback'];

    for (const searchType of searchTypes) {
      if (imageCount >= categoryConfig.imagesPerSubcategory) break;

      const queries = subcategoryQueries[searchType] || [];
      if (queries.length === 0) continue;

      try {
        console.log(`    📝 Processing ${searchType} queries for ${subcategoryName}`);

        const bestImage = await selectBestEducationalImage(queries, 'education');

        if (bestImage) {
          const filename = generateFilename(bestImage.searchQuery, bestImage, imageCount + 1);
          const filepath = path.join(subcategoryPath, filename);
          const relativePath = `/images/educational/${categoryName}/${subcategoryName}/${filename}`;

          console.log(`    ⬇️  Downloading: ${filename} (${bestImage.searchType})`);

          const downloadURL = getBestDownloadURL(bestImage);
          await downloadImage(downloadURL, filepath);

          // Add to metadata with enhanced information
          categoryMetadata.images.push({
            filename,
            path: relativePath,
            subcategory: subcategoryName,
            tags: bestImage.tags.split(', '),
            query: bestImage.searchQuery,
            searchType: bestImage.searchType,
            eduScore: bestImage.eduScore,
            pixabay_id: bestImage.id,
            attribution: `Image by ${bestImage.user} from Pixabay`,
            source: 'Pixabay',
            webformatURL: bestImage.webformatURL,
            imageSize: {
              width: bestImage.imageWidth,
              height: bestImage.imageHeight
            },
            downloads: bestImage.downloads,
            views: bestImage.views,
            downloaded_at: new Date().toISOString()
          });

          imageCount++;
          categoryMetadata.total_images++;

          console.log(`    ✅ Downloaded: ${filename} (score: ${bestImage.eduScore.toFixed(1)})`);

          // If we got a high-quality image, we can be more selective about additional images
          if (bestImage.eduScore > 70) {
            break; // Very good image found, move to next subcategory
          }
        } else {
          console.log(`    ⚠️  No suitable ${searchType} images found for ${subcategoryName}`);
        }

      } catch (error) {
        console.error(`    ❌ Error processing ${searchType} for ${subcategoryName}:`, error.message);
      }
    }
  }

  return categoryMetadata;
}

/**
 * Main execution function
 */
async function buildImageLibrary() {
  console.log('🚀 Starting Enhanced Image Library Builder');
  console.log(`📊 Target: ${Object.keys(IMAGE_CATEGORIES).length} categories`);
  console.log('🔒 Safe search enabled, child-appropriate content only');
  console.log('🎨 Prioritizing vectors and illustrations for educational use');

  if (!PIXABAY_API_KEY) {
    console.error('❌ PIXABAY_API_KEY not found in .env.local');
    process.exit(1);
  }

  // Clear the used images set for a fresh start
  usedImageIds.clear();
  console.log('🔄 Image deduplication enabled');

  // Ensure base directory exists
  await fs.mkdir(IMAGE_DIR, { recursive: true });

  const metadata = {
    created_at: new Date().toISOString(),
    total_categories: Object.keys(IMAGE_CATEGORIES).length,
    total_images: 0,
    categories: {},
    build_config: {
      safe_search: true,
      preferred_types: ['vector', 'illustration', 'photo'],
      educational_scoring: true,
      transparent_backgrounds: true
    }
  };

  // Process each category
  for (const [categoryName, categoryConfig] of Object.entries(IMAGE_CATEGORIES)) {
    try {
      const categoryMetadata = await processCategory(categoryName, categoryConfig);
      metadata.categories[categoryName] = categoryMetadata;
      metadata.total_images += categoryMetadata.total_images;

      console.log(`✅ Completed ${categoryName}: ${categoryMetadata.total_images} images`);

    } catch (error) {
      console.error(`❌ Error processing category ${categoryName}:`, error);
    }
  }

  // Save metadata
  await fs.writeFile(METADATA_FILE, JSON.stringify(metadata, null, 2));

  console.log('\n🎉 Enhanced Image Library Build Complete!');
  console.log(`📈 Total images downloaded: ${metadata.total_images}`);
  console.log(`📄 Metadata saved to: ${METADATA_FILE}`);
  console.log(`📁 Images stored in: ${IMAGE_DIR}`);
  console.log('🎯 All images are child-safe and optimized for primary school worksheets');

  // Calculate estimated storage size
  try {
    const { execSync } = require('child_process');
    const dirSize = execSync(`du -sh "${IMAGE_DIR}"`, { encoding: 'utf8' }).split('\t')[0];
    console.log(`💾 Estimated storage used: ${dirSize}`);
  } catch (error) {
    console.log('💾 Storage calculation not available on this platform');
  }
}

// Run the script
if (require.main === module) {
  buildImageLibrary().catch(error => {
    console.error('💥 Build failed:', error);
    process.exit(1);
  });
}

module.exports = { buildImageLibrary, searchPixabay };