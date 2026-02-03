import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration for FreeMathPrintable.com
 *
 * Controls search engine crawling behavior.
 * Next.js automatically generates /robots.txt from this file.
 *
 * SEO Strategy:
 * - Allow public pages (/, /library, /privacy, /terms)
 * - Block protected pages (/admin, etc.)
 * - Block API routes
 * - Point to sitemap for better indexing
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',                  // Homepage
          '/library',           // Public worksheet library
          '/library/*',         // Individual worksheets
          '/free-printables',   // Free printables hub
          '/free-printables/*', // Year/topic/subtopic pages
          '/privacy',           // Privacy Policy
          '/terms',             // Terms of Service
        ],
        disallow: [
          '/api/*',              // All API routes
          '/admin/*',            // Admin panel
          '/profile/*',          // User profiles
          '/create/*',           // Worksheet creation (requires auth)
          '/privacy-settings/*', // Privacy settings
          // Development/test pages (if any remain)
          '/test/*',
          '/dev/*',
          '/components',
          '/design-system',
          '/mock-data',
          '/style-guide',
          '/ad-demo',
          '/brand',
          '/accessibility',
          '/development',
        ],
        crawlDelay: 1, // Be nice to servers - wait 1 second between requests
      },
      // Block aggressive/spam bots
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

/**
 * Generated robots.txt example:
 *
 * User-agent: *
 * Allow: /
 * Allow: /library
 * Allow: /library/*
 * Allow: /privacy
 * Allow: /terms
 * Disallow: /api/*
 * Disallow: /admin/*
 * ...
 * Crawl-delay: 1
 *
 * User-agent: AhrefsBot
 * User-agent: SemrushBot
 * User-agent: MJ12bot
 * User-agent: DotBot
 * Disallow: /
 *
 * Sitemap: https://freemathprintable.com/sitemap.xml
 */
