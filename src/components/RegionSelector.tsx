'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { locales, regionConfig, type Locale } from '@/i18n/config';

interface RegionSelectorProps {
  className?: string;
  variant?: 'dropdown' | 'inline';
}

export function RegionSelector({ className = '', variant = 'dropdown' }: RegionSelectorProps) {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Set locale in cookie
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      // Reload to apply new locale
      window.location.reload();
    });
  };

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {locales.map((loc) => {
          const config = regionConfig[loc];
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              disabled={isPending || isActive}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
                ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              title={config.name}
            >
              <span className="mr-1">{config.flag}</span>
              <span className="hidden sm:inline">{loc.split('-')[1]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className={`relative ${className}`}>
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        disabled={isPending}
        className={`
          appearance-none bg-white border border-gray-300 rounded-lg
          px-4 py-2 pr-8 text-sm font-medium text-gray-700
          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer transition-all
          ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {locales.map((loc) => {
          const config = regionConfig[loc];
          return (
            <option key={loc} value={loc}>
              {config.flag} {config.name}
            </option>
          );
        })}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

// Compact region indicator showing current region
export function RegionIndicator({ className = '' }: { className?: string }) {
  const locale = useLocale() as Locale;
  const config = regionConfig[locale];

  return (
    <div className={`flex items-center gap-1 text-sm text-gray-600 ${className}`}>
      <span>{config.flag}</span>
      <span className="hidden md:inline">{config.curriculumName}</span>
      <span className="md:hidden">{locale.split('-')[1]}</span>
    </div>
  );
}
