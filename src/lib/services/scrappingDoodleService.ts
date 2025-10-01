/**
 * SCRAPPING DOODLE Service
 *
 * Provides intelligent access to the extensive SCRAPPING DOODLE image library
 * for contextually appropriate educational images in worksheet generation
 */

import fs from 'fs/promises';
import path from 'path';

export interface CollectionMetadata {
  name: string;
  path: string;
  topics: string[];
  ageGroups: string[];
  hasColorVariations: boolean;
  imageCount: number;
  priority: number;
  seasonal?: string;
  characters?: string[];
  keywords?: string[]; // NEW: Object-specific keywords for matching
}

export interface ScrappingDoodleResult {
  collection: CollectionMetadata;
  imagePath: string;
  colorVariation: 'color' | 'bw';
  confidence: number;
}

class ScrappingDoodleService {
  private readonly COLLECTIONS: Record<string, CollectionMetadata> = {
    // PRIORITY 1: Math & Counting (Critical for eliminating inappropriate images)
    'farm-animals': {
      name: 'FarmAnimalsAndBabies_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FarmAnimalsAndBabies_byScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'animals', 'math', 'number'],
      ageGroups: ['Reception', 'Year 1', 'Year 2'],
      hasColorVariations: true,
      imageCount: 45,
      priority: 10,
      characters: ['cow', 'pig', 'chicken', 'sheep', 'horse']
    },
    'froggy-math': {
      name: 'FroggyFun_Math_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FroggyFun_Math_by_ScrappinDoodles',
      topics: ['math', 'mathematics', 'calculation', 'numbers'],
      ageGroups: ['Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 12,
      priority: 9,
      characters: ['frog']
    },
    'fractions': {
      name: 'FractionCircles_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FractionCircles_byScrappinDoodles',
      topics: ['fractions', 'division', 'parts', 'circles'],
      ageGroups: ['Year 2', 'Year 3', 'Year 4'],
      hasColorVariations: true,
      imageCount: 20,
      priority: 8
    },
    'frog-numbers': {
      name: 'FrogNumbers_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FrogNumbers_byScrappinDoodles',
      topics: ['numbers', 'counting', 'digits'],
      ageGroups: ['Reception', 'Year 1', 'Year 2'],
      hasColorVariations: true,
      imageCount: 15,
      priority: 8,
      characters: ['frog']
    },

    // PRIORITY 2: Literacy & School (High Priority)
    'school-supplies': {
      name: 'SchoolSupplies_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/SchoolSupplies_byScrappinDoodles',
      topics: ['reading', 'writing', 'literacy', 'school', 'education'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 25,
      priority: 9
    },
    'alphabet-tiles': {
      name: 'Scrabble_Tiles_Alpha_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/Scrabble_Tiles_Alpha_by_ScrappinDoodles',
      topics: ['alphabet', 'letters', 'spelling', 'phonics'],
      ageGroups: ['Reception', 'Year 1', 'Year 2'],
      hasColorVariations: true,
      imageCount: 26,
      priority: 8
    },
    'froggy-reading': {
      name: 'FroggyFun_Reading_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FroggyFun_Reading_by_ScrappinDoodles',
      topics: ['reading', 'books', 'literature'],
      ageGroups: ['Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 15,
      priority: 7,
      characters: ['frog']
    },

    // PRIORITY 3: Seasonal & Contextual
    'christmas': {
      name: 'Christmas_Cookies_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/Christmas_Cookies_by_ScrappinDoodles',
      topics: ['christmas', 'holiday', 'winter', 'december'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
      hasColorVariations: true,
      imageCount: 30,
      priority: 6,
      seasonal: 'christmas'
    },
    'santa-numbers': {
      name: 'Santa_Numbers_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/Santa_Numbers_byScrappinDoodles',
      topics: ['numbers', 'counting', 'christmas'],
      ageGroups: ['Reception', 'Year 1', 'Year 2'],
      hasColorVariations: true,
      imageCount: 10,
      priority: 7,
      seasonal: 'christmas',
      characters: ['santa']
    },

    // PRIORITY 1A: OBJECT-SPECIFIC COLLECTIONS (Critical for matching question content!)
    'flowers': {
      name: 'Spring_Garden_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/Spring_Garden_by_ScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'nature', 'spring', 'garden'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 4, // flower.png, flower2.png, flower3.png + BW variants
      priority: 10, // HIGH PRIORITY for object matching
      keywords: ['flower', 'flowers', 'rose', 'daisy', 'tulip', 'blossom', 'bloom', 'garden', 'plant']
    },
    'fruits': {
      name: 'Fruit_by_ScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/Fruit_by_ScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'food', 'healthy eating'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 15,
      priority: 10,
      keywords: ['fruit', 'fruits', 'apple', 'apples', 'banana', 'bananas', 'orange', 'oranges', 'berry', 'berries', 'grape', 'grapes', 'strawberry', 'strawberries']
    },
    'vegetables': {
      name: 'FoodGroup_Vegetables_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/FoodGroup_Vegetables_byScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'food', 'healthy eating'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 17,
      priority: 10,
      keywords: ['vegetable', 'vegetables', 'carrot', 'carrots', 'tomato', 'tomatoes', 'potato', 'potatoes', 'corn', 'pea', 'peas', 'broccoli', 'lettuce']
    },
    'school-items': {
      name: 'SchoolSupplies_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/SchoolSupplies_byScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'school', 'education'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3'],
      hasColorVariations: true,
      imageCount: 29,
      priority: 10,
      keywords: ['book', 'books', 'pencil', 'pencils', 'pen', 'pens', 'eraser', 'erasers', 'ruler', 'rulers', 'scissors', 'glue', 'calculator', 'folder', 'tack', 'tacks']
    },
    'sports-balls': {
      name: 'SportsBalls_byScrappinDoodles',
      path: '/images/SCRAPPING DOODLE/SportsBalls_byScrappinDoodles',
      topics: ['counting', 'addition', 'subtraction', 'sports', 'games'],
      ageGroups: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
      hasColorVariations: true,
      imageCount: 7,
      priority: 9,
      keywords: ['ball', 'balls', 'football', 'soccer', 'basketball', 'baseball', 'tennis', 'volleyball', 'sport', 'sports']
    }
  };

  private initialized = false;

  /**
   * Initialize the service
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Validate that SCRAPPING DOODLE directory exists
      const scrappingDoodlePath = path.join(process.cwd(), 'public', 'images', 'SCRAPPING DOODLE');
      await fs.access(scrappingDoodlePath);

      this.initialized = true;
      console.log(`✅ SCRAPPING DOODLE service initialized: ${Object.keys(this.COLLECTIONS).length} collections available`);
    } catch (error) {
      console.warn('⚠️ SCRAPPING DOODLE library not found:', error instanceof Error ? error.message : 'Unknown error');
      this.initialized = true; // Mark as initialized to prevent retries
    }
  }

  /**
   * Check if the service is available
   */
  isAvailable(): boolean {
    return this.initialized && Object.keys(this.COLLECTIONS).length > 0;
  }

  /**
   * Get the best collection for a given topic with intelligent matching
   */
  getCollectionForTopic(topic: string, subtopic?: string, yearGroup?: string): CollectionMetadata | null {
    if (!this.isAvailable()) return null;

    const searchText = `${topic} ${subtopic || ''}`.toLowerCase();
    const scoredCollections: Array<{ collection: CollectionMetadata; score: number }> = [];

    // Current month for seasonal preferences
    const currentMonth = new Date().getMonth() + 1;
    const isChristmasTime = currentMonth === 12 || currentMonth === 1;

    for (const collection of Object.values(this.COLLECTIONS)) {
      let score = 0;

      // Topic matching (high weight)
      for (const collectionTopic of collection.topics) {
        if (searchText.includes(collectionTopic)) {
          score += 10;
        }
      }

      // Exact topic matches get bonus
      if (collection.topics.includes(topic.toLowerCase())) {
        score += 15;
      }

      // Age group matching
      if (yearGroup && collection.ageGroups.includes(yearGroup)) {
        score += 5;
      }

      // Priority weighting
      score += collection.priority;

      // Seasonal bonus
      if (collection.seasonal === 'christmas' && isChristmasTime) {
        score += 8;
      }

      // Penalize off-season seasonal content
      if (collection.seasonal && collection.seasonal !== 'christmas' && !isChristmasTime) {
        score -= 3;
      }

      if (score > 0) {
        scoredCollections.push({ collection, score });
      }
    }

    if (scoredCollections.length === 0) return null;

    // Sort by score and return best match
    scoredCollections.sort((a, b) => b.score - a.score);

    const bestMatch = scoredCollections[0];
    console.log(`🎨 SCRAPPING DOODLE match: ${bestMatch.collection.name} (score: ${bestMatch.score}) for topic: ${topic}`);

    return bestMatch.collection;
  }

  /**
   * Get a specific image from a collection with color preference
   */
  async getImageFromCollection(
    collection: CollectionMetadata,
    colorPreference: 'color' | 'bw' = 'color',
    index: number = 0
  ): Promise<string | null> {
    try {
      const collectionPath = path.join(process.cwd(), 'public', 'images', 'SCRAPPING DOODLE', collection.name);
      const files = await fs.readdir(collectionPath);

      // Filter PNG files
      const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

      if (pngFiles.length === 0) return null;

      // Separate by color preference
      const colorFiles = pngFiles.filter(file => !file.startsWith('BW_'));
      const bwFiles = pngFiles.filter(file => file.startsWith('BW_'));

      let selectedFiles = colorPreference === 'bw' ? bwFiles : colorFiles;

      // Fallback to any available files if preference not available
      if (selectedFiles.length === 0) {
        selectedFiles = pngFiles;
      }

      // Select file by index (with wrapping)
      const selectedFile = selectedFiles[index % selectedFiles.length];
      return `${collection.path}/${selectedFile}`;

    } catch (error) {
      console.warn(`Failed to get image from collection ${collection.name}:`, error);
      return null;
    }
  }

  /**
   * Get optimal image for worksheet context
   */
  async getBestImageForContext(
    topic: string,
    subtopic?: string,
    yearGroup?: string,
    questionIndex: number = 0,
    colorPreference: 'color' | 'bw' = 'color'
  ): Promise<ScrappingDoodleResult | null> {
    await this.initialize();

    const collection = this.getCollectionForTopic(topic, subtopic, yearGroup);
    if (!collection) return null;

    const imagePath = await this.getImageFromCollection(collection, colorPreference, questionIndex);
    if (!imagePath) return null;

    return {
      collection,
      imagePath,
      colorVariation: colorPreference,
      confidence: 0.9 // High confidence for curated collections
    };
  }

  /**
   * NEW: Get images for a specific keyword (e.g., "flowers", "apples", "pencils")
   * This matches QUESTION CONTENT to APPROPRIATE IMAGES
   */
  async getImagesForKeyword(
    keyword: string,
    count: number = 1,
    yearGroup?: string
  ): Promise<{
    collection: CollectionMetadata | null;
    imagePaths: string[];
    matched: boolean;
  }> {
    await this.initialize();

    if (!this.isAvailable()) {
      return { collection: null, imagePaths: [], matched: false };
    }

    const searchKeyword = keyword.toLowerCase().trim();
    let bestMatch: CollectionMetadata | null = null;
    let bestScore = 0;

    // Search through all collections for keyword matches
    for (const collection of Object.values(this.COLLECTIONS)) {
      if (!collection.keywords) continue;

      let score = 0;

      // Exact keyword match
      if (collection.keywords.includes(searchKeyword)) {
        score = 100;
      }
      // Partial keyword match
      else {
        for (const kw of collection.keywords) {
          if (kw.includes(searchKeyword) || searchKeyword.includes(kw)) {
            score = Math.max(score, 50);
          }
        }
      }

      // Age group bonus
      if (yearGroup && collection.ageGroups.includes(yearGroup)) {
        score += 10;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = collection;
      }
    }

    if (!bestMatch) {
      console.log(`❌ No Scrapping Doodle collection found for keyword: "${keyword}"`);
      return { collection: null, imagePaths: [], matched: false };
    }

    console.log(`✅ Keyword "${keyword}" matched to collection: ${bestMatch.name} (score: ${bestScore})`);

    // Get multiple images from the collection
    const imagePaths: string[] = [];
    for (let i = 0; i < count; i++) {
      const imagePath = await this.getImageFromCollection(bestMatch, 'color', i);
      if (imagePath) {
        imagePaths.push(imagePath);
      }
    }

    return {
      collection: bestMatch,
      imagePaths,
      matched: true
    };
  }

  /**
   * Get all available collections
   */
  getAvailableCollections(): CollectionMetadata[] {
    return Object.values(this.COLLECTIONS);
  }

  /**
   * Get collections by priority
   */
  getCollectionsByPriority(): CollectionMetadata[] {
    return Object.values(this.COLLECTIONS).sort((a, b) => b.priority - a.priority);
  }

  /**
   * Get service statistics
   */
  getStats(): {
    collectionsAvailable: number;
    totalEstimatedImages: number;
    topicsCovered: string[];
    ageGroupsCovered: string[];
  } {
    const collections = Object.values(this.COLLECTIONS);
    const allTopics = new Set<string>();
    const allAgeGroups = new Set<string>();
    let totalImages = 0;

    collections.forEach(collection => {
      collection.topics.forEach(topic => allTopics.add(topic));
      collection.ageGroups.forEach(age => allAgeGroups.add(age));
      totalImages += collection.imageCount;
    });

    return {
      collectionsAvailable: collections.length,
      totalEstimatedImages: totalImages,
      topicsCovered: Array.from(allTopics).sort(),
      ageGroupsCovered: Array.from(allAgeGroups).sort()
    };
  }
}

// Singleton instance
const scrappingDoodleService = new ScrappingDoodleService();

export default scrappingDoodleService;