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
   * Process HTML and inline all counting object SVGs for PDF generation
   */
  async inlineCountingObjectSVGs(html: string): Promise<SVGInliningResult> {
    const errors: string[] = [];
    let processedImages = 0;
    let processedHtml = html;

    // Pattern to match our counting object img tags
    const imgPattern = /<img\s+src="\/images\/educational\/counting-objects\/([^"]+)"\s+class="counting-object"\s+alt="([^"]+)"\s*\/>/g;

    let match;
    const replacements = new Map<string, string>();

    // Find all counting object images
    while ((match = imgPattern.exec(html)) !== null) {
      const [fullMatch, relativePath, altText] = match;
      const fullPath = `/images/educational/counting-objects/${relativePath}`;

      try {
        // Get or load SVG content
        const svgContent = await this.loadSVGContent(relativePath);

        if (svgContent) {
          // Create inline SVG with proper sizing
          const inlineSvg = this.createInlineSVG(svgContent, altText);
          replacements.set(fullMatch, inlineSvg);
          processedImages++;
        } else {
          errors.push(`Failed to load SVG: ${fullPath}`);
        }
      } catch (error) {
        errors.push(`Error processing ${fullPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
   * Load SVG content from file system with caching
   */
  private async loadSVGContent(relativePath: string): Promise<string | null> {
    if (this.svgCache.has(relativePath)) {
      return this.svgCache.get(relativePath)!;
    }

    try {
      const fullPath = path.join(process.cwd(), 'public', 'images', 'educational', 'counting-objects', relativePath);
      const svgContent = await fs.readFile(fullPath, 'utf-8');

      // Cache the content
      this.svgCache.set(relativePath, svgContent);
      return svgContent;
    } catch (error) {
      console.warn(`Failed to load SVG file: ${relativePath}`, error);
      return null;
    }
  }

  /**
   * Create optimized inline SVG with proper styling for PDF generation
   * Enhanced with responsive sizing and accessibility
   */
  private createInlineSVG(svgContent: string, altText: string): string {
    // Remove XML declaration and DOCTYPE if present
    let cleanSvg = svgContent
      .replace(/<\?xml[^>]*\?>/g, '')
      .replace(/<!DOCTYPE[^>]*>/g, '')
      .trim();

    // Extract original viewBox if present for proper scaling
    const viewBoxMatch = cleanSvg.match(/viewBox="([^"]+)"/i);
    const originalViewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100';

    // Enhanced SVG styling for PDF compatibility and responsive design
    const svgStyle = [
      'width: 45px',
      'height: 45px',
      'border-radius: 4px',
      'display: inline-block',
      'vertical-align: middle',
      'max-width: 100%',
      'max-height: 100%',
      'fill: currentColor' // Inherit text color for better integration
    ].join('; ');

    // Replace or add SVG opening tag with enhanced attributes
    if (cleanSvg.includes('<svg')) {
      cleanSvg = cleanSvg.replace(
        /<svg([^>]*)>/i,
        `<svg$1 style="${svgStyle}" role="img" aria-label="${altText}" preserveAspectRatio="xMidYMid meet">`
      );
    } else {
      // Wrap content if not already an SVG
      cleanSvg = `<svg viewBox="${originalViewBox}" style="${svgStyle}" role="img" aria-label="${altText}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${cleanSvg}</svg>`;
    }

    // Ensure proper closing tag
    if (!cleanSvg.includes('</svg>')) {
      cleanSvg += '</svg>';
    }

    return cleanSvg;
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