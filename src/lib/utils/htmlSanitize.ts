/**
 * HTML sanitization utilities for PDF generation
 * Handles answer key removal with proper nested div support
 */

/**
 * Remove the answer-key section from worksheet HTML.
 * Uses div nesting depth counting to correctly handle nested elements,
 * avoiding issues with regex-based approaches that break when other
 * elements (like branding/copyright) sit between the answer key and </body>.
 *
 * Also removes standalone answer key headers that may exist outside the div.
 */
export function removeAnswerKey(html: string): string {
  // Step 1: Remove the answer-key div using depth-counting
  const openTagMatch = html.match(/<div\s+class="answer-key"[^>]*>/i)

  if (openTagMatch && openTagMatch.index !== undefined) {
    const startIndex = openTagMatch.index
    let depth = 0
    let i = startIndex
    let endIndex = -1

    while (i < html.length) {
      // Check for opening div tag (e.g. <div, <div class="...">)
      const openMatch = html.slice(i).match(/^<div[\s>]/i)
      if (openMatch) {
        depth++
        const closeAngle = html.indexOf('>', i)
        if (closeAngle === -1) break
        i = closeAngle + 1
        continue
      }

      // Check for closing div tag
      if (html.slice(i, i + 6).toLowerCase() === '</div>') {
        depth--
        if (depth === 0) {
          endIndex = i + 6
          break
        }
        i += 6
        continue
      }

      i++
    }

    if (endIndex > startIndex) {
      html = html.substring(0, startIndex) + html.substring(endIndex)
    }
  }

  // Step 2: Remove standalone answer key headers
  html = html.replace(/<h[1-6][^>]*>\s*(?:Answer Key|ANSWER KEY):?\s*<\/h[1-6]>/gi, '')
  html = html.replace(/<p[^>]*>\s*\*\*Answer Key:\*\*\s*<\/p>/gi, '')

  return html
}
