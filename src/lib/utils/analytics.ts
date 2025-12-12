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
 * Track when user starts interactive mode
 */
export function trackInteractiveStart(worksheet: {
  id: string
  title: string
  yearGroup: string
  questionCount: number
}) {
  trackEvent('interactive_start', {
    worksheet_id: worksheet.id,
    worksheet_title: worksheet.title,
    year_group: worksheet.yearGroup,
    question_count: worksheet.questionCount
  })
}

/**
 * Track when user submits answers in interactive mode
 */
export function trackInteractiveSubmit(result: {
  worksheetId: string
  score: number
  total: number
  percentage: number
  timeSpentSeconds?: number
}) {
  trackEvent('interactive_submit', {
    worksheet_id: result.worksheetId,
    score: result.score,
    total: result.total,
    percentage: result.percentage,
    time_spent_seconds: result.timeSpentSeconds,
    passed: result.percentage >= 80
  })
}

/**
 * Track when user exits interactive mode
 */
export function trackInteractiveExit(worksheet: {
  id: string
  completed: boolean
  questionsAnswered: number
  totalQuestions: number
}) {
  trackEvent('interactive_exit', {
    worksheet_id: worksheet.id,
    completed: worksheet.completed,
    questions_answered: worksheet.questionsAnswered,
    total_questions: worksheet.totalQuestions,
    completion_rate: Math.round((worksheet.questionsAnswered / worksheet.totalQuestions) * 100)
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
