/**
 * Google Analytics Event Tracking Utility
 * Sends custom events to Google Analytics 4
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Track worksheet generation event
 */
export const trackWorksheetGeneration = (params: {
  yearGroup: string;
  topic: string;
  subtopic?: string;
  questionCount?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_worksheet', {
      event_category: 'Worksheet',
      event_label: `${params.yearGroup} - ${params.topic}`,
      year_group: params.yearGroup,
      topic: params.topic,
      subtopic: params.subtopic || 'none',
      question_count: params.questionCount || 0,
    });
  }
};

/**
 * Track PDF download event
 */
export const trackPdfDownload = (params: {
  worksheetType: string;
  yearGroup?: string;
  topic?: string;
  source?: 'generated' | 'library';
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download_pdf', {
      event_category: 'PDF',
      event_label: params.worksheetType,
      worksheet_type: params.worksheetType,
      year_group: params.yearGroup || 'unknown',
      topic: params.topic || 'unknown',
      source: params.source || 'generated',
    });
  }
};

/**
 * Track library search event
 */
export const trackLibrarySearch = (params: {
  searchQuery?: string;
  searchType: 'text' | 'filter' | 'ai';
  yearGroup?: string;
  topic?: string;
  resultsCount?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      event_category: 'Library',
      event_label: params.searchQuery || 'filter_search',
      search_term: params.searchQuery || '',
      search_type: params.searchType,
      year_group: params.yearGroup || 'all',
      topic: params.topic || 'all',
      results_count: params.resultsCount || 0,
    });
  }
};

/**
 * Track user registration
 */
export const trackUserRegistration = (params: {
  method?: 'email' | 'google' | 'other';
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      event_category: 'User',
      event_label: params.method || 'email',
      method: params.method || 'email',
    });
  }
};

/**
 * Track worksheet save to library
 */
export const trackWorksheetSave = (params: {
  yearGroup: string;
  topic: string;
  subtopic?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'save_to_library', {
      event_category: 'Library',
      event_label: `${params.yearGroup} - ${params.topic}`,
      year_group: params.yearGroup,
      topic: params.topic,
      subtopic: params.subtopic || 'none',
    });
  }
};
