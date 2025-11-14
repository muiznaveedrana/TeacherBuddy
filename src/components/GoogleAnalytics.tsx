'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    setConsent(cookieConsent === 'accepted');

    // Debug logging
    console.log('GA Debug:', {
      gaId,
      cookieConsent,
      consent: cookieConsent === 'accepted'
    });

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = localStorage.getItem('cookieConsent');
      setConsent(newConsent === 'accepted');
    };

    window.addEventListener('storage', handleConsentChange);
    return () => window.removeEventListener('storage', handleConsentChange);
  }, [gaId]);

  if (!gaId || !consent) {
    console.log('GA not loading:', { gaId: !!gaId, consent });
    return null;
  }

  console.log('GA loading with ID:', gaId);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}
