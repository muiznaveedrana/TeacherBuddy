const GA_MEASUREMENT_ID = 'G-Q38YDPNBZV';

export function GoogleAnalytics() {
  return (
    <>
      {/* Google tag (gtag.js) */}
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