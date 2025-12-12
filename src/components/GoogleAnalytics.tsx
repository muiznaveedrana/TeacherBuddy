'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-Q38YDPNBZV';

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already consented
    const checkConsent = () => {
      // Check localStorage for our consent
      const consent = localStorage.getItem('cookieConsent');
      const cookieConsentBanner = document.cookie.includes('freemathprintable-cookie-consent=true');

      if (consent === 'accepted' || cookieConsentBanner) {
        setHasConsent(true);
      }
    };

    // Check on mount
    checkConsent();

    // Listen for consent changes
    const handleConsentUpdate = () => {
      checkConsent();
    };

    // Listen for both storage changes and custom events
    window.addEventListener('storage', handleConsentUpdate);
    window.addEventListener('cookieConsentAccepted', handleConsentUpdate);

    // Also check periodically for the first few seconds (for react-cookie-consent)
    const intervalId = setInterval(checkConsent, 1000);
    setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      window.removeEventListener('storage', handleConsentUpdate);
      window.removeEventListener('cookieConsentAccepted', handleConsentUpdate);
      clearInterval(intervalId);
    };
  }, []);

  // Only render GA scripts if consent is given
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Configure GA with cookie consent granted
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });

            // Track downloads
            document.addEventListener('click', function(e) {
              const target = e.target.closest('a');
              if (target && target.href) {
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

            // Track scroll depth (25%, 50%, 75%, 100%)
            let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
            window.addEventListener('scroll', function() {
              const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
              [25, 50, 75, 100].forEach(function(mark) {
                if (scrollPercent >= mark && !scrollMarks[mark]) {
                  scrollMarks[mark] = true;
                  gtag('event', 'scroll_depth', {
                    percent_scrolled: mark,
                    page_path: window.location.pathname
                  });
                }
              });
            });

            // Global event tracking helper
            window.trackEvent = function(eventName, params) {
              gtag('event', eventName, params);
            };

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