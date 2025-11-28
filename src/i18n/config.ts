// Supported locales/regions for the curriculum app
export const locales = ['en-GB', 'en-US', 'en-AU'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-GB';

// Region metadata for display
export const regionConfig: Record<Locale, {
  name: string;
  flag: string;
  curriculumName: string;
  yearGroupPrefix: string;
}> = {
  'en-GB': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    curriculumName: 'UK National Curriculum',
    yearGroupPrefix: 'Year',
  },
  'en-US': {
    name: 'United States',
    flag: '🇺🇸',
    curriculumName: 'Common Core Standards',
    yearGroupPrefix: 'Grade',
  },
  'en-AU': {
    name: 'Australia',
    flag: '🇦🇺',
    curriculumName: 'Australian Curriculum',
    yearGroupPrefix: 'Year',
  },
};

// Map locale to database region code
export const localeToRegion: Record<Locale, string> = {
  'en-GB': 'UK',
  'en-US': 'US',
  'en-AU': 'AU',
};
