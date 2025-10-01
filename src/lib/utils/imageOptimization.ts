/**
 * Image Optimization Utilities
 *
 * Provides utilities for optimizing image loading and processing
 * in the worksheet generation pipeline
 */

export interface ImageOptimizationConfig {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'png' | 'svg';
  enableLazyLoading: boolean;
}

export interface OptimizedImageResult {
  optimizedUrl: string;
  originalUrl: string;
  format: string;
  estimatedSize: number;
  cacheable: boolean;
}

/**
 * Default optimization configuration for educational worksheets
 */
export const DEFAULT_IMAGE_CONFIG: ImageOptimizationConfig = {
  maxWidth: 800,
  maxHeight: 600,
  quality: 85,
  format: 'webp',
  enableLazyLoading: true
};

/**
 * Optimizes image URLs for worksheet display
 */
export function optimizeImageForWorksheet(
  imageUrl: string,
  config: Partial<ImageOptimizationConfig> = {}
): OptimizedImageResult {
  const finalConfig = { ...DEFAULT_IMAGE_CONFIG, ...config };

  // For static SVGs, return as-is
  if (imageUrl.endsWith('.svg')) {
    return {
      optimizedUrl: imageUrl,
      originalUrl: imageUrl,
      format: 'svg',
      estimatedSize: 0, // SVGs are typically small
      cacheable: true
    };
  }

  // For external images (Pixabay), add optimization parameters
  if (imageUrl.includes('pixabay.com') || imageUrl.includes('cdn.pixabay.com')) {
    const url = new URL(imageUrl);
    url.searchParams.set('w', finalConfig.maxWidth.toString());
    url.searchParams.set('h', finalConfig.maxHeight.toString());

    return {
      optimizedUrl: url.toString(),
      originalUrl: imageUrl,
      format: 'webp',
      estimatedSize: estimateImageSize(finalConfig.maxWidth, finalConfig.maxHeight, finalConfig.quality),
      cacheable: true
    };
  }

  // For other images, use image proxy with optimization
  const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`;

  return {
    optimizedUrl: proxyUrl,
    originalUrl: imageUrl,
    format: 'auto',
    estimatedSize: estimateImageSize(finalConfig.maxWidth, finalConfig.maxHeight, finalConfig.quality),
    cacheable: true
  };
}

/**
 * Estimates image file size for performance planning
 */
function estimateImageSize(width: number, height: number, quality: number): number {
  // Rough estimation: WebP is ~25-35% smaller than JPEG
  const pixelCount = width * height;
  const bytesPerPixel = quality > 90 ? 0.5 : quality > 70 ? 0.3 : 0.2;
  return Math.round(pixelCount * bytesPerPixel);
}

/**
 * Generates responsive image HTML with optimization
 */
export function generateResponsiveImageHTML(
  imageUrl: string,
  altText: string,
  className: string = '',
  config: Partial<ImageOptimizationConfig> = {}
): string {
  const optimized = optimizeImageForWorksheet(imageUrl, config);

  const lazyLoading = config.enableLazyLoading !== false ? 'loading="lazy"' : '';
  const additionalClass = className ? ` ${className}` : '';

  return `<img src="${optimized.optimizedUrl}"
               alt="${altText}"
               class="worksheet-image${additionalClass}"
               ${lazyLoading}
               style="max-width: 100%; height: auto;"
               data-original="${optimized.originalUrl}"
               data-format="${optimized.format}" />`;
}

/**
 * Image preloading utility for critical worksheet images
 */
export function preloadCriticalImages(imageUrls: string[]): Promise<void[]> {
  return Promise.all(
    imageUrls.map(url =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to preload: ${url}`));
        img.src = url;
      })
    )
  );
}

/**
 * Performance monitoring for image operations
 */
export class ImagePerformanceMonitor {
  private metrics: Map<string, number> = new Map();

  startTiming(operation: string): void {
    this.metrics.set(operation, Date.now());
  }

  endTiming(operation: string): number {
    const startTime = this.metrics.get(operation);
    if (!startTime) return 0;

    const duration = Date.now() - startTime;
    this.metrics.delete(operation);
    return duration;
  }

  getReport(): Record<string, number> {
    return Object.fromEntries(this.metrics.entries());
  }
}

export const imagePerformanceMonitor = new ImagePerformanceMonitor();