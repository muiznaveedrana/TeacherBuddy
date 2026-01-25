/**
 * Analytics utility for tracking user interactions
 * Uses Google Analytics 4 (gtag)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    trackEvent?: (eventName: string, params: Record<string, unknown>) => void
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// ============================================
// Library Events
// ============================================

/**
 * Track when user opens worksheet preview panel
 */
export function trackPreviewOpen(worksheet: {
  id: string
  title: string
  yearGroup: string
  topic: string
}) {
  trackEvent('preview_open', {
    worksheet_id: worksheet.id,
    worksheet_title: worksheet.title,
    year_group: worksheet.yearGroup,
    topic: worksheet.topic
  })
}

/**
 * Track when user navigates between worksheets in preview
 */
export function trackPreviewNavigate(direction: 'prev' | 'next', worksheetId: string) {
  trackEvent('preview_navigate', {
    direction,
    worksheet_id: worksheetId
  })
}

/**
 * Track when user downloads from preview panel
 */
export function trackPreviewDownload(worksheet: {
  id: string
  title: string
  downloadType: 'pdf' | 'answer_key'
}) {
  trackEvent('preview_download', {
    worksheet_id: worksheet.id,
    worksheet_title: worksheet.title,
    download_type: worksheet.downloadType
  })
}

/**
 * Track library filter changes
 */
export function trackFilterChange(filterType: string, value: string) {
  trackEvent('filter_change', {
    filter_type: filterType,
    filter_value: value
  })
}

/**
 * Track library search
 */
export function trackSearch(query: string, resultCount: number) {
  trackEvent('search', {
    search_term: query,
    result_count: resultCount
  })
}

// ============================================
// Interactive Mode Events
// ============================================

/**
 * Helper to calculate score band for easier GA4 reporting
 */
function getScoreBand(percentage: number): string {
  if (percentage >= 80) return 'excellent'
  if (percentage >= 60) return 'good'
  if (percentage >= 40) return 'needs_practice'
  return 'struggling'
}

/**
 * Track when user starts interactive mode
 * Enhanced with topic/subtopic/difficulty for better content analysis
 */
export function trackInteractiveStart(worksheet: {
  id: string
  title: string
  yearGroup: string
  questionCount: number
  // New optional fields for enhanced tracking
  topic?: string
  subtopic?: string
  difficulty?: string
}) {
  trackEvent('interactive_start', {
    worksheet_id: worksheet.id,
    worksheet_title: worksheet.title,
    year_group: worksheet.yearGroup,
    question_count: worksheet.questionCount,
    // Enhanced fields (GA4 custom dimensions)
    topic: worksheet.topic || 'unknown',
    subtopic: worksheet.subtopic || 'unknown',
    difficulty: worksheet.difficulty || 'unknown'
  })
}

/**
 * Track when user submits answers in interactive mode
 * Enhanced with topic/subtopic/score_band for better analysis
 */
export function trackInteractiveSubmit(result: {
  worksheetId: string
  score: number
  total: number
  percentage: number
  timeSpentSeconds?: number
  // New optional fields for enhanced tracking
  worksheetTitle?: string
  yearGroup?: string
  topic?: string
  subtopic?: string
  difficulty?: string
}) {
  trackEvent('interactive_submit', {
    worksheet_id: result.worksheetId,
    score: result.score,
    total: result.total,
    percentage: result.percentage,
    time_spent_seconds: result.timeSpentSeconds,
    passed: result.percentage >= 80,
    // Enhanced fields for better GA4 analysis
    score_band: getScoreBand(result.percentage),
    worksheet_title: result.worksheetTitle || 'unknown',
    year_group: result.yearGroup || 'unknown',
    topic: result.topic || 'unknown',
    subtopic: result.subtopic || 'unknown',
    difficulty: result.difficulty || 'unknown'
  })
}

/**
 * Track when user exits interactive mode
 * Enhanced with topic/subtopic for drop-off analysis by content
 */
export function trackInteractiveExit(worksheet: {
  id: string
  completed: boolean
  questionsAnswered: number
  totalQuestions: number
  // New optional fields for enhanced tracking
  title?: string
  yearGroup?: string
  topic?: string
  subtopic?: string
}) {
  trackEvent('interactive_exit', {
    worksheet_id: worksheet.id,
    completed: worksheet.completed,
    questions_answered: worksheet.questionsAnswered,
    total_questions: worksheet.totalQuestions,
    completion_rate: Math.round((worksheet.questionsAnswered / worksheet.totalQuestions) * 100),
    // Enhanced fields for drop-off analysis
    worksheet_title: worksheet.title || 'unknown',
    year_group: worksheet.yearGroup || 'unknown',
    topic: worksheet.topic || 'unknown',
    subtopic: worksheet.subtopic || 'unknown'
  })
}

// ============================================
// Homepage/Navigation Events
// ============================================

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaName: string, ctaLocation: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  })
}

/**
 * Track navigation between pages
 */
export function trackNavigation(from: string, to: string) {
  trackEvent('navigation', {
    from_page: from,
    to_page: to
  })
}

// ============================================
// Mobile/Tablet Events
// ============================================

/**
 * Track mobile filter sheet open/close
 */
export function trackMobileFilterSheet(action: 'open' | 'close' | 'apply') {
  trackEvent('mobile_filter_sheet', {
    action
  })
}

/**
 * Track quick filter pill clicks
 */
export function trackQuickFilter(filterLabel: string) {
  trackEvent('quick_filter_click', {
    filter_label: filterLabel
  })
}
