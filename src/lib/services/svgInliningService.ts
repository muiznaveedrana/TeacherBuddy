/**
 * SVG Inlining Service
 *
 * Converts static SVG img tags to inline SVG content for PDF generation
 * Maintains img tags for HTML preview while enabling PDF compatibility
 */

import { promises as fs } from 'fs';
import * as path from 'path';

export interface SVGInliningResult {
  success: boolean;
  inlinedHtml: string;
  processedImages: number;
  errors: string[];
}

class SVGInliningService {
  private svgCache = new Map<string, string>();

  /**
   * Process HTML and inline ALL images (PNG/SVG) for PDF generation
   * Handles all image directory structures
   */
  async inlineCountingObjectSVGs(html: string): Promise<SVGInliningResult> {
    const errors: string[] = [];
    let processedImages = 0;
    let processedHtml = html;

    // Universal pattern to match ANY image in /images/ directory
    const universalPattern = /<img\s+src="(\/images\/[^"]+\.(?:png|svg|jpg|jpeg))([^"]*)"([^>]*)>/gi;

    const replacements = new Map<string, string>();

    // Process ALL images
    let match;
    while ((match = universalPattern.exec(html)) !== null) {
      const [fullMatch, imagePath] = match;

      try {
        // Extract relative path from full path (e.g., /images/apple.png -> apple.png)
        const relativePath = imagePath.replace('/images/', '');

        // Load image content
        const imageContent = await this.loadAnyImage(relativePath);

        if (imageContent) {
          // Convert to base64 data URL for PDF embedding
          const ext = path.extname(relativePath).toLowerCase();
          const mimeType = ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
          const base64 = Buffer.isBuffer(imageContent)
            ? imageContent.toString('base64')
            : Buffer.from(imageContent).toString('base64');

          const dataUrl = `data:${mimeType};base64,${base64}`;
          const replacement = fullMatch.replace(imagePath, dataUrl);

          replacements.set(fullMatch, replacement);
          processedImages++;
        } else {
          errors.push(`Failed to load image: ${imagePath}`);
        }
      } catch (error) {
        errors.push(`Error processing ${imagePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Apply all replacements
    replacements.forEach((replacement, original) => {
      processedHtml = processedHtml.replace(new RegExp(this.escapeRegex(original), 'g'), replacement);
    });

    return {
      success: errors.length === 0,
      inlinedHtml: processedHtml,
      processedImages,
      errors
    };
  }

  /**
   * Load ANY image (PNG/SVG/JPG) from /images/ directory with caching
   * Handles all subdirectory structures dynamically
   */
  private async loadAnyImage(relativePath: string): Promise<Buffer | string | null> {
    const cacheKey = `ANY_IMAGE:${relativePath}`;

    if (this.svgCache.has(cacheKey)) {
      return this.svgCache.get(cacheKey)!;
    }

    try {
      // Build full path from public/images/ + relative path
      const fullPath = path.join(process.cwd(), 'public', 'images', relativePath);

      // Check if file is SVG or binary image
      if (relativePath.toLowerCase().endsWith('.svg')) {
        const svgContent = await fs.readFile(fullPath, 'utf-8');
        this.svgCache.set(cacheKey, svgContent);
        return svgContent;
      } else {
        // Read as binary for PNG/JPG images
        const imageBuffer = await fs.readFile(fullPath);
        this.svgCache.set(cacheKey, imageBuffer);
        return imageBuffer;
      }
    } catch (error) {
      console.warn(`Failed to load image: ${relativePath}`, error);
      return null;
    }
  }

  /**
   * Escape string for regex replacement
   */
  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Clear SVG cache (useful for development)
   */
  clearCache(): void {
    this.svgCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.svgCache.size,
      entries: Array.from(this.svgCache.keys())
    };
  }
}

// Singleton instance
const svgInliningService = new SVGInliningService();

export default svgInliningService;