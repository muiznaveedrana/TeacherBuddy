/**
 * Image Library Service
 *
 * Provides access to the pre-curated educational image library
 * Built from Pixabay images for offline worksheet generation
 */

import fs from 'fs/promises';
import path from 'path';
import scrappingDoodleService from './scrappingDoodleService';

export interface ImageMetadata {
  filename: string;
  path: string;
  subcategory: string;
  tags: string[];
  query: string;
  pixabay_id: number;
  attribution: string;
  webformatURL: string;
  downloaded_at: string;
}

export interface CategoryMetadata {
  subcategories: string[];
  total_images: number;
  images: ImageMetadata[];
}

export interface LibraryMetadata {
  created_at: string;
  total_categories: number;
  total_images: number;
  categories: Record<string, CategoryMetadata>;
}

export interface SelectedImage {
  path: string;
  filename: string;
  attribution: string;
  tags: string[];
  category: string;
  subcategory: string;
}

class ImageLibraryService {
  private metadata: LibraryMetadata | null = null;
  private initialized = false;

  /**
   * Initialize the service by loading metadata
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const metadataPath = path.join(process.cwd(), 'public', 'images', 'educational', 'metadata.json');
      const metadataContent = await fs.readFile(metadataPath, 'utf-8');
      this.metadata = JSON.parse(metadataContent);
      this.initialized = true;
      console.log(`✅ Image library initialized: ${this.metadata?.total_images} images available`);
    } catch (error) {
      console.warn('⚠️ Image library not available:', error instanceof Error ? error.message : 'Unknown error');
      console.warn('💡 Run "npm run build-image-library" to create the image library');
      this.metadata = null;
      this.initialized = true; // Mark as initialized even if failed to prevent retries
    }
  }

  /**
   * Check if the image library is available
   */
  isAvailable(): boolean {
    return this.metadata !== null;
  }

  /**
   * Get all available categories
   */
  getCategories(): string[] {
    if (!this.metadata) return [];
    return Object.keys(this.metadata.categories);
  }

  /**
   * Get images for a specific category
   */
  getCategoryImages(category: string): ImageMetadata[] {
    if (!this.metadata || !this.metadata.categories[category]) {
      return [];
    }
    return this.metadata.categories[category].images;
  }

  /**
   * Get images for a specific subcategory
   */
  getSubcategoryImages(category: string, subcategory: string): ImageMetadata[] {
    const categoryImages = this.getCategoryImages(category);
    return categoryImages.filter(img => img.subcategory === subcategory);
  }

  /**
   * Search for images by tags
   */
  searchByTags(searchTags: string[]): ImageMetadata[] {
    if (!this.metadata) return [];

    const results: ImageMetadata[] = [];
    const normalizedSearchTags = searchTags.map(tag => tag.toLowerCase().trim());

    for (const category of Object.values(this.metadata.categories)) {
      for (const image of category.images) {
        const imageTagsLower = image.tags.map(tag => tag.toLowerCase());

        // Check if any search tag matches any image tag
        const hasMatch = normalizedSearchTags.some(searchTag =>
          imageTagsLower.some(imageTag =>
            imageTag.includes(searchTag) || searchTag.includes(imageTag)
          )
        );

        if (hasMatch) {
          results.push(image);
        }
      }
    }

    return results;
  }

  /**
   * Get a random image from a category
   */
  getRandomImageFromCategory(category: string): SelectedImage | null {
    const images = this.getCategoryImages(category);
    if (images.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * images.length);
    const image = images[randomIndex];

    return {
      path: image.path,
      filename: image.filename,
      attribution: image.attribution,
      tags: image.tags,
      category: category,
      subcategory: image.subcategory
    };
  }

  /**
   * Get the best matching image for a context
   * Uses weighted scoring: exact matches > partial matches > category matches
   */
  getBestImageForContext(context: string, preferredCategories: string[] = []): SelectedImage | null {
    if (!this.metadata) return null;

    // Extract and normalize keywords from context
    const contextLower = context.toLowerCase();
    const keywords = contextLower
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);

    // Weighted scoring for image matching
    const scoredImages: Array<{ image: ImageMetadata; score: number; category: string }> = [];

    for (const [categoryName, category] of Object.entries(this.metadata.categories)) {
      for (const image of category.images) {
        let score = 0;
        const imageTags = image.tags.map(tag => tag.toLowerCase());
        const imageWords = [image.filename.toLowerCase(), ...imageTags];

        // Exact keyword matches (high score)
        for (const keyword of keywords) {
          if (imageWords.some(word => word === keyword)) {
            score += 10;
          } else if (imageWords.some(word => word.includes(keyword) || keyword.includes(word))) {
            score += 5; // Partial matches
          }
        }

        // Category preference bonus
        if (preferredCategories.includes(categoryName)) {
          score += 3;
        }

        // Diversity bonus for multiple tags
        if (image.tags.length > 3) {
          score += 1;
        }

        if (score > 0) {
          scoredImages.push({ image, score, category: categoryName });
        }
      }
    }

    // Return highest scoring image, or fallback
    if (scoredImages.length > 0) {
      // Sort by score and add some randomness among top matches
      scoredImages.sort((a, b) => b.score - a.score);
      const topScore = scoredImages[0].score;
      const topMatches = scoredImages.filter(item => item.score >= topScore * 0.8);
      const selected = topMatches[Math.floor(Math.random() * topMatches.length)];

      return {
        path: selected.image.path,
        filename: selected.image.filename,
        attribution: selected.image.attribution,
        tags: selected.image.tags,
        category: selected.category,
        subcategory: selected.image.subcategory
      };
    }

    // Fallback to preferred categories
    for (const category of preferredCategories) {
      const image = this.getRandomImageFromCategory(category);
      if (image) return image;
    }

    // Last resort: random image from any category
    const allCategories = this.getCategories();
    if (allCategories.length > 0) {
      const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
      return this.getRandomImageFromCategory(randomCategory);
    }

    return null;
  }

  /**
   * Find which category an image belongs to
   */
  private findCategoryForImage(image: ImageMetadata): string | null {
    if (!this.metadata) return null;

    for (const [categoryName, category] of Object.entries(this.metadata.categories)) {
      if (category.images.some(img => img.filename === image.filename)) {
        return categoryName;
      }
    }
    return null;
  }

  /**
   * Get contextual image suggestions for common worksheet topics
   * Enhanced with curriculum-aligned mappings
   * NEW: Prioritizes SCRAPPING DOODLE collections for best educational context
   */
  async getContextualImage(topic: string): Promise<SelectedImage | null> {
    // PRIORITY 1: Try SCRAPPING DOODLE collections first
    await scrappingDoodleService.initialize();

    if (scrappingDoodleService.isAvailable()) {
      const scrappingCollection = scrappingDoodleService.getCollectionForTopic(topic);
      if (scrappingCollection) {
        console.log(`🎨 Using SCRAPPING DOODLE collection for topic "${topic}": ${scrappingCollection.name}`);

        // Get a sample image from the collection
        const sampleImage = await scrappingDoodleService.getImageFromCollection(scrappingCollection);

        return {
          path: sampleImage || scrappingCollection.path,
          filename: 'dynamic-selection',
          attribution: 'SCRAPPING DOODLE Educational Collection',
          tags: scrappingCollection.topics,
          category: 'scrapping-doodle',
          subcategory: scrappingCollection.name
        };
      }
    }

    // FALLBACK: Use existing Pixabay logic
    console.log(`📚 Using Pixabay fallback for topic "${topic}"`);
    const topicLower = topic.toLowerCase();

    // Enhanced topic to category mappings with curriculum alignment
    const topicMappings: Record<string, { categories: string[]; priority: number }> = {
      // Math topics (high priority for counting objects)
      'addition': { categories: ['counting-objects', 'shapes', 'toys'], priority: 10 },
      'subtraction': { categories: ['counting-objects', 'toys', 'food'], priority: 10 },
      'multiplication': { categories: ['toys', 'shapes', 'counting-objects'], priority: 8 },
      'division': { categories: ['food', 'shapes', 'toys'], priority: 8 },
      'counting': { categories: ['counting-objects', 'toys', 'animals'], priority: 10 },
      'numbers': { categories: ['shapes', 'counting-objects', 'school-supplies'], priority: 9 },
      'three-digit': { categories: ['counting-objects'], priority: 10 },

      // Reading topics
      'reading': { categories: ['books', 'school-supplies'], priority: 7 },
      'writing': { categories: ['school-supplies', 'books'], priority: 7 },
      'alphabet': { categories: ['school-supplies', 'books'], priority: 8 },
      'letters': { categories: ['school-supplies', 'books'], priority: 8 },

      // Science topics
      'animals': { categories: ['animals'], priority: 9 },
      'nature': { categories: ['nature', 'flowers'], priority: 8 },
      'plants': { categories: ['flowers', 'nature'], priority: 8 },
      'weather': { categories: ['nature'], priority: 7 },

      // General topics
      'school': { categories: ['school-supplies', 'books'], priority: 8 },
      'playground': { categories: ['sports', 'toys'], priority: 6 },
      'exercise': { categories: ['sports'], priority: 6 },
      'healthy': { categories: ['food'], priority: 7 },
      'colors': { categories: ['toys', 'flowers', 'shapes'], priority: 7 }
    };

    // Find best matching topic with priority consideration
    let bestMatch: { categories: string[]; priority: number } | null = null;
    let bestMatchKey = '';

    for (const [key, mapping] of Object.entries(topicMappings)) {
      if (topicLower.includes(key)) {
        if (!bestMatch || mapping.priority > bestMatch.priority) {
          bestMatch = mapping;
          bestMatchKey = key;
        }
      }
    }

    const preferredCategories = bestMatch ? bestMatch.categories : [];

    // If no specific mapping found, use the topic as context for keyword search
    return this.getBestImageForContext(topic, preferredCategories);
  }

  /**
   * Get library statistics
   */
  getStats(): { total_images: number; total_categories: number; categories: Record<string, number> } | null {
    if (!this.metadata) return null;

    const categoryStats: Record<string, number> = {};
    for (const [name, category] of Object.entries(this.metadata.categories)) {
      categoryStats[name] = category.total_images;
    }

    return {
      total_images: this.metadata.total_images,
      total_categories: this.metadata.total_categories,
      categories: categoryStats
    };
  }
}

// Singleton instance
const imageLibraryService = new ImageLibraryService();

export default imageLibraryService;