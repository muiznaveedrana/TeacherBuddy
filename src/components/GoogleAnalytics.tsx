'use client';

import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-Q38YDPNBZV';

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check consent on mount
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setHasConsent(true);
    }

    // Listen for consent changes
    const handleStorageChange = () => {
      const newConsent = localStorage.getItem('cookieConsent');
      if (newConsent === 'accepted' && !hasConsent) {
        // Reload page to load GA with consent
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cookieConsentAccepted', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentAccepted', handleStorageChange);
    };
  }, [hasConsent]);

  // Only load GA if consent is given
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) - Only loads with consent */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Basic GA config
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });

            // Enhanced measurement for better tracking
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href,
              page_path: window.location.pathname
            });

            // Track downloads
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a');
              if (target && target.href) {
                // Check if it's a download link (PDF, worksheet generation, etc)
                const url = target.href;
                if (url.includes('/api/generate-pdf') ||
                    url.includes('/api/download') ||
                    url.endsWith('.pdf') ||
                    target.hasAttribute('download')) {

                  gtag('event', 'file_download', {
                    file_name: target.getAttribute('download') || url.split('/').pop(),
                    file_extension: 'pdf',
                    link_url: url,
                    link_text: target.textContent
                  });
                }
              }
            });

            // Track worksheet generation
            if (typeof window !== 'undefined') {
              const originalFetch = window.fetch;
              window.fetch = function(...args) {
                const url = args[0];
                if (typeof url === 'string' && url.includes('/api/generate-worksheet')) {
                  gtag('event', 'worksheet_generated', {
                    event_category: 'engagement',
                    event_label: 'worksheet_generation'
                  });
                }
                return originalFetch.apply(this, args);
              };
            }
          `,
        }}
      />
    </>
  );
}