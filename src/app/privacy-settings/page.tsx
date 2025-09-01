'use client';

import { PrivacySettings } from '@/components/ads/PrivacySettings';
import { AdProvider } from '@/components/ads';

export default function PrivacySettingsPage() {
  return (
    <AdProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <PrivacySettings />
      </div>
    </AdProvider>
  );
}