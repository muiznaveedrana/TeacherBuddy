/**
 * Hybrid SVG Service
 *
 * Intelligently selects between static SVG files and AI-generated SVGs
 * Prioritizes our curated static SVGs while falling back to AI for complex scenarios
 */

// File system imports removed - not used in current implementation
import countingObjectsService, { CountingObjectMetadata } from './countingObjectsService';

export interface SVGRequest {
  objectType: string; // 'flower', 'pencil', 'book'
  quantity: number;
  arrangement?: 'linear' | 'grid' | 'cluster' | 'custom';
  gridDimensions?: { rows: number; cols: number };
  context?: string; // Additional context for AI generation
  containerSize?: { width: number; height: number };
}

export interface SVGResult {
  type: 'static' | 'ai-generated';
  content: string; // Either HTML with static SVGs or AI prompt enhancement
  reason: string; // Why this approach was chosen
  fallbackAvailable: boolean;
  metadata: {
    objectType: string;
    quantity: number;
    arrangement: string;
    estimatedQuality: 'high' | 'medium' | 'low';
    generationTime?: number;
  };
}

export interface StaticSVGLayout {
  html: string;
  css: string;
  description: string;
}

class HybridSVGService {
  private initialized = false;
  private staticSVGCache = new Map<string, string>();

  /**
   * Initialize the service
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await countingObjectsService.initialize();
      this.initialized = true;
      console.log('✅ Hybrid SVG service initialized');
    } catch (error) {
      console.warn('⚠️ Hybrid SVG service initialization failed:', error);
      this.initialized = true; // Prevent retry loops
    }
  }

  /**
   * Main method to get SVG content - either static or AI-generated
   * Enhanced with performance monitoring and error handling
   */
  async getSVGContent(request: SVGRequest): Promise<SVGResult> {
    await this.initialize();

    const startTime = Date.now();

    // Validate request parameters
    if (!request.objectType || request.quantity < 1 || request.quantity > 50) {
      return {
        type: 'ai-generated',
        content: `Invalid request parameters: objectType=${request.objectType}, quantity=${request.quantity}`,
        reason: 'Invalid request parameters',
        fallbackAvailable: false,
        metadata: {
          objectType: request.objectType || 'unknown',
          quantity: request.quantity || 0,
          arrangement: request.arrangement || 'linear',
          estimatedQuality: 'low',
          generationTime: Date.now() - startTime
        }
      };
    }

    try {
      // Step 1: Check if we can use static SVGs (preferred)
      const staticResult = await this.tryStaticSVG(request);
      if (staticResult) {
        console.log(`✅ Using static SVG for ${request.objectType} (${request.quantity} items)`);
        return {
          ...staticResult,
          metadata: {
            ...staticResult.metadata,
            generationTime: Date.now() - startTime
          }
        };
      }

      // Step 2: Fall back to AI generation with enhanced prompts
      console.log(`🤖 Falling back to AI generation for ${request.objectType} (${request.quantity} items)`);
      return this.generateAIEnhancedPrompt(request, Date.now() - startTime);
    } catch (error) {
      console.error('Error in getSVGContent:', error);
      return {
        type: 'ai-generated',
        content: `Error generating SVG content: ${error instanceof Error ? error.message : 'Unknown error'}`,
        reason: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        fallbackAvailable: false,
        metadata: {
          objectType: request.objectType,
          quantity: request.quantity,
          arrangement: request.arrangement || 'linear',
          estimatedQuality: 'low',
          generationTime: Date.now() - startTime
        }
      };
    }
  }

  /**
   * Try to create SVG content using our static SVG files
   */
  private async tryStaticSVG(request: SVGRequest): Promise<SVGResult | null> {
    if (!countingObjectsService.isAvailable()) {
      return null;
    }

    // Get object metadata
    const objects = countingObjectsService.getCategoryObjects(request.objectType);
    if (objects.length === 0) {
      return null;
    }

    const object = objects[0]; // Use first object in category
    const hybridSupport = object.hybridSupport;

    if (!hybridSupport || !hybridSupport.canRepeat) {
      return null;
    }

    // Check if quantity is within supported limits
    if (request.quantity > hybridSupport.maxRepeats || request.quantity < 1) {
      return null;
    }

    // Check if arrangement is supported
    const arrangement = request.arrangement || 'linear';
    if (!hybridSupport.arrangement[arrangement as keyof typeof hybridSupport.arrangement]) {
      return null;
    }

    // Generate static SVG layout
    const layout = this.generateStaticSVGLayout(object, request);

    return {
      type: 'static',
      content: layout.html,
      reason: `Using static SVG: ${object.name} (quantity: ${request.quantity}, arrangement: ${arrangement})`,
      fallbackAvailable: true,
      metadata: {
        objectType: request.objectType,
        quantity: request.quantity,
        arrangement,
        estimatedQuality: 'high' // Static SVGs are always high quality
      }
    };
  }

  /**
   * Generate optimized HTML layout using our static SVG files
   * Enhanced with responsive design and accessibility
   */
  private generateStaticSVGLayout(object: CountingObjectMetadata, request: SVGRequest): StaticSVGLayout {
    const arrangement = request.arrangement || 'linear';
    const spacing = object.hybridSupport.spacing;
    const containerSize = request.containerSize || { width: 400, height: 300 };

    // Generate individual SVG elements with enhanced accessibility
    const svgElements: string[] = [];
    for (let i = 0; i < request.quantity; i++) {
      svgElements.push(`
        <img src="${object.path}"
             class="counting-object counting-object-${object.id}"
             alt="${object.name} ${i + 1}"
             data-count="${i + 1}"
             role="img"
             aria-label="${object.name} number ${i + 1} of ${request.quantity}" />`);
    }

    // Apply responsive arrangement logic
    let html = '';
    let css = '';
    const baseSize = Math.min(45, Math.max(30, containerSize.width / Math.max(request.quantity, 8)));

    switch (arrangement) {
      case 'linear':
        html = `<div class="counting-container counting-linear" role="group" aria-label="${request.quantity} ${object.name} in a line">${svgElements.join('')}</div>`;
        css = `
          .counting-linear {
            display: flex;
            flex-wrap: wrap;
            gap: ${spacing.horizontal};
            align-items: center;
            justify-content: center;
            max-width: ${containerSize.width}px;
            margin: 0 auto;
          }
          .counting-object {
            width: ${baseSize}px;
            height: ${baseSize}px;
            flex-shrink: 0;
          }`;
        break;

      case 'grid':
        const cols = Math.min(Math.ceil(Math.sqrt(request.quantity)), Math.floor(containerSize.width / (baseSize + 10)));
        // Calculate grid layout efficiently
        const gridSize = Math.min(baseSize, (containerSize.width - (cols * 10)) / cols);

        html = `<div class="counting-container counting-grid" style="grid-template-columns: repeat(${cols}, 1fr);" role="grid" aria-label="${request.quantity} ${object.name} in a grid">${svgElements.join('')}</div>`;
        css = `
          .counting-grid {
            display: grid;
            gap: ${spacing.vertical} ${spacing.horizontal};
            justify-items: center;
            align-items: center;
            max-width: ${Math.min(containerSize.width, cols * (gridSize + 15))}px;
            margin: 0 auto;
          }
          .counting-object {
            width: ${gridSize}px;
            height: ${gridSize}px;
          }`;
        break;

      case 'cluster':
        html = `<div class="counting-container counting-cluster" role="group" aria-label="${request.quantity} ${object.name} clustered together">${svgElements.join('')}</div>`;
        css = `
          .counting-cluster {
            display: flex;
            flex-wrap: wrap;
            gap: ${spacing.horizontal};
            justify-content: center;
            max-width: ${Math.min(containerSize.width, 350)}px;
            margin: 0 auto;
          }
          .counting-cluster .counting-object:nth-child(odd) {
            margin-top: 5px;
          }
          .counting-object {
            width: ${Math.max(30, baseSize - 5)}px;
            height: ${Math.max(30, baseSize - 5)}px;
          }`;
        break;

      case 'custom':
        if (request.gridDimensions) {
          const { rows, cols } = request.gridDimensions;
          const customSize = Math.min(baseSize, (containerSize.width - (cols * 10)) / cols);
          html = `<div class="counting-container counting-custom" style="grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);" role="grid">${svgElements.join('')}</div>`;
          css = `
            .counting-custom {
              display: grid;
              gap: 8px;
              justify-items: center;
              align-items: center;
              max-width: ${containerSize.width}px;
              margin: 0 auto;
            }
            .counting-object {
              width: ${customSize}px;
              height: ${customSize}px;
            }`;
        } else {
          // Fallback to linear for invalid custom configuration
          html = `<div class="counting-container counting-linear">${svgElements.join('')}</div>`;
          css = `
            .counting-linear {
              display: flex;
              flex-wrap: wrap;
              gap: ${spacing.horizontal};
              align-items: center;
              justify-content: center;
            }
            .counting-object {
              width: ${baseSize}px;
              height: ${baseSize}px;
            }`;
        }
        break;

      default:
        html = `<div class="counting-container counting-default">${svgElements.join('')}</div>`;
        css = `
          .counting-default {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .counting-object {
            width: ${baseSize}px;
            height: ${baseSize}px;
          }`;
    }

    return {
      html,
      css: css + `
        .counting-object {
          border-radius: 4px;
          transition: transform 0.2s ease, filter 0.2s ease;
          cursor: pointer;
        }
        .counting-object:hover {
          transform: scale(1.1);
          filter: brightness(1.1);
        }
        .counting-object:focus {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }
        @media (max-width: 768px) {
          .counting-object {
            width: ${Math.max(25, baseSize * 0.8)}px;
            height: ${Math.max(25, baseSize * 0.8)}px;
          }
        }`,
      description: `${request.quantity} ${object.name} arranged in ${arrangement} layout (responsive)`
    };
  }

  /**
   * Generate AI-enhanced prompt when static SVGs can't be used
   */
  private generateAIEnhancedPrompt(request: SVGRequest, processingTime: number): SVGResult {
    // Get enhanced guidance from counting objects service
    const objectSuggestion = countingObjectsService.getBestObjectForContext(
      request.objectType,
      'counting-objects',
      'Year 1', // Default year group
      request.context
    );

    let aiPromptContent = '';
    let reason = '';

    if (objectSuggestion) {
      // Use our metadata to enhance AI generation
      aiPromptContent = `
**STATIC SVG FALLBACK - ENHANCED AI GENERATION:**
${objectSuggestion.promptEnhancement}
${objectSuggestion.visualGuidance}

**SPECIFIC REQUIREMENTS:**
- Generate exactly ${request.quantity} ${request.objectType} objects
- Arrangement: ${request.arrangement || 'linear'}
- Use ${objectSuggestion.object.color} color scheme
- Visual complexity: ${objectSuggestion.object.visualComplexity}
- Theme: ${objectSuggestion.object.theme}

**STATIC SVG QUALITY MATCHING:**
- Match the quality and style of our curated ${objectSuggestion.object.name}
- Use consistent sizing and spacing as defined in our metadata
- Ensure educational appropriateness for counting exercises`;

      reason = `AI generation with metadata enhancement (quantity ${request.quantity} exceeds static limits or complex arrangement required)`;
    } else {
      // Fallback AI generation without our metadata
      aiPromptContent = `
**AI SVG GENERATION FALLBACK:**
- Create ${request.quantity} ${request.objectType} objects
- Arrangement: ${request.arrangement || 'linear'}
- Use child-friendly, educational design
- Ensure objects are clearly countable and separated`;

      reason = `AI generation fallback (no metadata available for ${request.objectType})`;
    }

    return {
      type: 'ai-generated',
      content: aiPromptContent,
      reason,
      fallbackAvailable: false,
      metadata: {
        objectType: request.objectType,
        quantity: request.quantity,
        arrangement: request.arrangement || 'linear',
        estimatedQuality: objectSuggestion ? 'medium' : 'low',
        generationTime: processingTime
      }
    };
  }

  /**
   * Check if static SVG is available for given parameters
   */
  canUseStaticSVG(objectType: string, quantity: number, arrangement?: string): boolean {
    if (!countingObjectsService.isAvailable()) return false;

    const objects = countingObjectsService.getCategoryObjects(objectType);
    if (objects.length === 0) return false;

    const object = objects[0];
    const hybridSupport = object.hybridSupport;

    if (!hybridSupport || !hybridSupport.canRepeat) return false;
    if (quantity > hybridSupport.maxRepeats || quantity < 1) return false;

    const arr = arrangement || 'linear';
    return hybridSupport.arrangement[arr as keyof typeof hybridSupport.arrangement] || false;
  }

  /**
   * Get service statistics
   */
  getStats(): {
    availableObjects: number;
    staticCapabilities: Record<string, any>;
    cacheSize: number;
  } {
    const stats = countingObjectsService.getStats();

    return {
      availableObjects: stats?.totalObjects || 0,
      staticCapabilities: stats?.byCategory || {},
      cacheSize: this.staticSVGCache.size
    };
  }
}

// Singleton instance
const hybridSVGService = new HybridSVGService();

export default hybridSVGService;