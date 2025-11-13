'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

export function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Check if user has accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    setConsent(cookieConsent === 'accepted');

    // Listen for consent changes
    const handleConsentChange = () => {
      const newConsent = localStorage.getItem('cookieConsent');
      setConsent(newConsent === 'accepted');
    };

    window.addEventListener('storage', handleConsentChange);
    return () => window.removeEventListener('storage', handleConsentChange);
  }, []);

  if (!gaId || !consent) {
    return null;
  }

  return <GA gaId={gaId} />;
}
