/**
 * Image Integration Service
 *
 * Unified service that orchestrates all image-related functionality
 * for worksheet generation - combines static SVGs, AI generation,
 * and external image sources with smart fallbacks
 */

import imageLibraryService from './imageLibraryService';
import hybridSVGService from './hybridSVGService';
import countingObjectsService from './countingObjectsService';
import { optimizeImageForWorksheet, imagePerformanceMonitor } from '@/lib/utils/imageOptimization';

export interface ImageIntegrationRequest {
  context: {
    topic: string;
    subtopic: string;
    yearGroup: string;
    layout: string;
  };
  requirements: {
    objectType?: string;
    quantity?: number;
    arrangement?: 'linear' | 'grid' | 'cluster' | 'custom';
    preferredStyle?: 'static' | 'ai' | 'mixed';
    maxImages?: number;
  };
  fallbackOptions: {
    allowExternal: boolean;
    allowAI: boolean;
    allowGeneric: boolean;
  };
}

export interface ImageIntegrationResult {
  success: boolean;
  images: Array<{
    type: 'static-svg' | 'ai-generated' | 'external' | 'counting-objects';
    content: string;
    metadata: {
      source: string;
      quality: 'high' | 'medium' | 'low';
      processingTime: number;
      fallbackUsed: boolean;
    };
  }>;
  totalProcessingTime: number;
  errors: string[];
  recommendations: string[];
}

class ImageIntegrationService {
  private initialized = false;

  /**
   * Initialize all image services
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      imagePerformanceMonitor.startTiming('image-services-init');

      await Promise.all([
        imageLibraryService.initialize(),
        hybridSVGService.initialize(),
        countingObjectsService.initialize()
      ]);

      const initTime = imagePerformanceMonitor.endTiming('image-services-init');
      console.log(`✅ Image integration service initialized (${initTime}ms)`);
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize image integration service:', error);
      this.initialized = true; // Prevent retry loops
    }
  }

  /**
   * Main integration method - intelligently selects best image approach
   */
  async integrateImages(request: ImageIntegrationRequest): Promise<ImageIntegrationResult> {
    await this.initialize();

    const startTime = Date.now();
    const result: ImageIntegrationResult = {
      success: false,
      images: [],
      totalProcessingTime: 0,
      errors: [],
      recommendations: []
    };

    try {
      // Strategy 1: Try SCRAPPING DOODLE image library first (highest priority)
      const libraryResults = await this.tryImageLibrary(request);
      result.images.push(...libraryResults);
      if (libraryResults.length > 0) {
        result.recommendations.push('Integrated curated educational images from SCRAPPING DOODLE library');
      }

      // Strategy 2: Fallback to counting objects for math topics if no SCRAPPING DOODLE match
      if (result.images.length === 0 && this.shouldUseCountingObjects(request)) {
        const countingResult = await this.tryCountingObjects(request);
        if (countingResult) {
          result.images.push(countingResult);
          result.recommendations.push('Used basic counting objects as fallback for mathematical learning');
        }
      }

      // Strategy 3: External/AI fallback if enabled
      if (result.images.length === 0 && request.fallbackOptions.allowAI) {
        const aiResult = await this.tryAIGeneration(request);
        if (aiResult) {
          result.images.push(aiResult);
          result.recommendations.push('Used AI generation as fallback for visual content');
        }
      }

      result.success = result.images.length > 0;
      result.totalProcessingTime = Date.now() - startTime;

      // Add performance recommendations
      if (result.totalProcessingTime > 2000) {
        result.recommendations.push('Consider using more static content to improve performance');
      }

      console.log(`🎨 Image integration completed: ${result.images.length} images, ${result.totalProcessingTime}ms`);

    } catch (error) {
      result.errors.push(`Image integration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      result.totalProcessingTime = Date.now() - startTime;
    }

    return result;
  }

  /**
   * Check if counting objects should be used for this request
   */
  private shouldUseCountingObjects(request: ImageIntegrationRequest): boolean {
    const { topic, subtopic } = request.context;

    const countingRelevantTerms = [
      'counting', 'addition', 'subtraction', 'three-digit', 'number', 'mathematics'
    ];

    const text = `${topic} ${subtopic}`.toLowerCase();
    return countingRelevantTerms.some(term => text.includes(term)) &&
           request.requirements.objectType &&
           request.requirements.quantity &&
           request.requirements.quantity > 0;
  }

  /**
   * Try to generate counting objects SVG content
   */
  private async tryCountingObjects(request: ImageIntegrationRequest): Promise<{
    type: string;
    content: string;
    metadata: {
      source: string;
      quality: 'high' | 'medium' | 'low';
      processingTime: number;
      fallbackUsed: boolean;
    };
  } | null> {
    if (!request.requirements.objectType || !request.requirements.quantity) return null;

    try {
      imagePerformanceMonitor.startTiming('counting-objects');

      const svgRequest = {
        objectType: request.requirements.objectType,
        quantity: request.requirements.quantity,
        arrangement: request.requirements.arrangement || 'linear',
        context: `${request.context.topic} ${request.context.subtopic}`,
        containerSize: { width: 400, height: 300 }
      };

      const svgResult = await hybridSVGService.getSVGContent(svgRequest);
      const processingTime = imagePerformanceMonitor.endTiming('counting-objects');

      if (svgResult.type === 'static') {
        return {
          type: 'counting-objects',
          content: svgResult.content,
          metadata: {
            source: 'static-svg-library',
            quality: 'high' as const,
            processingTime,
            fallbackUsed: false
          }
        };
      } else {
        return {
          type: 'ai-generated',
          content: svgResult.content,
          metadata: {
            source: 'ai-enhanced-prompts',
            quality: svgResult.metadata.estimatedQuality,
            processingTime,
            fallbackUsed: true
          }
        };
      }
    } catch (error) {
      console.warn('Counting objects generation failed:', error);
      return null;
    }
  }

  /**
   * Try to get images from the static library
   */
  private async tryImageLibrary(request: ImageIntegrationRequest): Promise<Array<{
    type: string;
    content: string;
    metadata: {
      source: string;
      quality: 'high' | 'medium' | 'low';
      processingTime: number;
      fallbackUsed: boolean;
    };
  }>> {
    if (!imageLibraryService.isAvailable()) return [];

    try {
      imagePerformanceMonitor.startTiming('image-library');

      const { topic, subtopic } = request.context;
      const contextualImage = await imageLibraryService.getContextualImage(`${topic} ${subtopic}`);

      const processingTime = imagePerformanceMonitor.endTiming('image-library');

      if (contextualImage) {
        const optimized = optimizeImageForWorksheet(contextualImage.path);

        return [{
          type: 'external',
          content: `<img src="${optimized.optimizedUrl}" alt="${contextualImage.attribution}" class="worksheet-contextual-image" />`,
          metadata: {
            source: 'curated-image-library',
            quality: 'high' as const,
            processingTime,
            fallbackUsed: false
          }
        }];
      }

      return [];
    } catch (error) {
      console.warn('Image library access failed:', error);
      return [];
    }
  }

  /**
   * Try AI generation as fallback
   */
  private async tryAIGeneration(request: ImageIntegrationRequest): Promise<{
    type: string;
    content: string;
    metadata: {
      source: string;
      quality: 'high' | 'medium' | 'low';
      processingTime: number;
      fallbackUsed: boolean;
    };
  } | null> {
    try {
      imagePerformanceMonitor.startTiming('ai-generation');

      // Get enhanced prompts from counting objects service
      const { topic, subtopic, yearGroup } = request.context;
      const enhancements = countingObjectsService.getPromptEnhancements(topic, subtopic, yearGroup);

      const processingTime = imagePerformanceMonitor.endTiming('ai-generation');

      if (enhancements.length > 0) {
        return {
          type: 'ai-generated',
          content: `<!-- AI Generation Context -->\n${enhancements.join('\n')}`,
          metadata: {
            source: 'ai-prompt-enhancement',
            quality: 'medium' as const,
            processingTime,
            fallbackUsed: true
          }
        };
      }

      return null;
    } catch (error) {
      console.warn('AI generation failed:', error);
      return null;
    }
  }

  /**
   * Get integration statistics for monitoring
   */
  getStats(): {
    serviceAvailability: Record<string, boolean>;
    performanceMetrics: Record<string, number>;
    cacheStats: Record<string, unknown>;
  } {
    return {
      serviceAvailability: {
        imageLibrary: imageLibraryService.isAvailable(),
        countingObjects: countingObjectsService.isAvailable(),
        hybridSVG: true // Always available
      },
      performanceMetrics: imagePerformanceMonitor.getReport(),
      cacheStats: {
        imageLibrary: imageLibraryService.getStats(),
        countingObjects: countingObjectsService.getStats(),
        hybridSVG: hybridSVGService.getStats()
      }
    };
  }
}

// Singleton instance
const imageIntegrationService = new ImageIntegrationService();

export default imageIntegrationService;