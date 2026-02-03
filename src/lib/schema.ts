/**
 * JSON-LD Schema Generators for freemathprintable.com
 * Provides structured data for SEO optimization
 */

// UK Year Group to US Grade mapping
const UK_TO_US_GRADE: Record<string, string> = {
  'reception': 'Kindergarten',
  'year-1': 'Grade 1',
  'year-2': 'Grade 2',
  'year-3': 'Grade 3',
  'year-4': 'Grade 4',
  'year-5': 'Grade 5',
  'year-6': 'Grade 6',
};

// Age ranges for each year group
const YEAR_GROUP_AGES: Record<string, { min: number; max: number }> = {
  'reception': { min: 4, max: 5 },
  'year-1': { min: 5, max: 6 },
  'year-2': { min: 6, max: 7 },
  'year-3': { min: 7, max: 8 },
  'year-4': { min: 8, max: 9 },
  'year-5': { min: 9, max: 10 },
  'year-6': { min: 10, max: 11 },
};

/**
 * Convert UK year group to US grade label
 */
export function yearGroupToUSGrade(yearGroup: string): string {
  const normalized = yearGroup.toLowerCase().replace(/\s+/g, '-');
  return UK_TO_US_GRADE[normalized] || yearGroup;
}

/**
 * Get age range for a year group
 */
export function getAgeRange(yearGroup: string): { min: number; max: number } {
  const normalized = yearGroup.toLowerCase().replace(/\s+/g, '-');
  return YEAR_GROUP_AGES[normalized] || { min: 5, max: 11 };
}

/**
 * Website Schema for the homepage
 * @see https://schema.org/WebSite
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Free Math Printable',
    alternateName: 'FreeMathPrintable',
    url: 'https://freemathprintable.com',
    description: 'Free printable math worksheets for Kindergarten through Grade 6. Curriculum-aligned, teacher-created resources.',
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Free Math Printable',
      url: 'https://freemathprintable.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://freemathprintable.com/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://freemathprintable.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    genre: 'Educational',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
  };
}

/**
 * Breadcrumb Schema for navigation
 * @see https://schema.org/BreadcrumbList
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http')
        ? item.href
        : `https://freemathprintable.com${item.href}`,
    })),
  };
}

/**
 * Learning Resource Schema for individual worksheet pages
 * @see https://schema.org/LearningResource
 */
export interface WorksheetSchemaInput {
  title: string;
  description: string;
  slug: string;
  yearGroup: string;
  topic: string;
  subtopic?: string;
  difficulty?: 'easy' | 'average' | 'hard';
  thumbnailUrl?: string;
  learningObjectives?: string[];
  skills?: string[];
  estimatedTime?: number;
  datePublished?: string;
  dateModified?: string;
}

export function generateLearningResourceSchema(worksheet: WorksheetSchemaInput) {
  const usGrade = yearGroupToUSGrade(worksheet.yearGroup);
  const ageRange = getAgeRange(worksheet.yearGroup);
  const worksheetUrl = `https://freemathprintable.com/worksheets/${worksheet.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: worksheet.title,
    description: worksheet.description,
    url: worksheetUrl,
    learningResourceType: 'Worksheet',
    educationalLevel: usGrade,
    typicalAgeRange: `${ageRange.min}-${ageRange.max}`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    interactivityType: 'active',
    educationalUse: ['practice', 'assessment', 'homework'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Free Math Printable',
      url: 'https://freemathprintable.com',
    },
    about: {
      '@type': 'Thing',
      name: worksheet.topic,
    },
    teaches: worksheet.subtopic || worksheet.topic,
  };

  // Add optional fields
  if (worksheet.thumbnailUrl) {
    schema.thumbnailUrl = worksheet.thumbnailUrl;
    schema.image = worksheet.thumbnailUrl;
  }

  if (worksheet.learningObjectives && worksheet.learningObjectives.length > 0) {
    schema.teaches = worksheet.learningObjectives;
  }

  if (worksheet.skills && worksheet.skills.length > 0) {
    schema.assesses = worksheet.skills;
  }

  if (worksheet.estimatedTime) {
    schema.timeRequired = `PT${worksheet.estimatedTime}M`;
  }

  if (worksheet.datePublished) {
    schema.datePublished = worksheet.datePublished;
  }

  if (worksheet.dateModified) {
    schema.dateModified = worksheet.dateModified;
  }

  if (worksheet.difficulty) {
    const difficultyMap: Record<string, string> = {
      easy: 'beginner',
      average: 'intermediate',
      hard: 'advanced',
    };
    schema.proficiencyLevel = difficultyMap[worksheet.difficulty];
  }

  return schema;
}

/**
 * Collection Schema for listing pages (year groups, topics, etc.)
 * @see https://schema.org/CollectionPage
 * @see https://schema.org/ItemList
 */
export interface CollectionItem {
  name: string;
  url: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface CollectionSchemaInput {
  name: string;
  description: string;
  url: string;
  items: CollectionItem[];
  yearGroup?: string;
  topic?: string;
}

export function generateCollectionSchema(collection: CollectionSchemaInput) {
  const collectionUrl = collection.url.startsWith('http')
    ? collection.url
    : `https://freemathprintable.com${collection.url}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collectionUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Free Math Printable',
      url: 'https://freemathprintable.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Free Math Printable',
      url: 'https://freemathprintable.com',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http')
          ? item.url
          : `https://freemathprintable.com${item.url}`,
        ...(item.description && { description: item.description }),
        ...(item.thumbnailUrl && { image: item.thumbnailUrl }),
      })),
    },
  };

  // Add educational context if year group is provided
  if (collection.yearGroup) {
    const usGrade = yearGroupToUSGrade(collection.yearGroup);
    const ageRange = getAgeRange(collection.yearGroup);
    schema.audience = {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    };
    schema.educationalLevel = usGrade;
    schema.typicalAgeRange = `${ageRange.min}-${ageRange.max}`;
  }

  // Add topic context
  if (collection.topic) {
    schema.about = {
      '@type': 'Thing',
      name: collection.topic,
    };
  }

  return schema;
}

/**
 * FAQ Schema for pages with FAQ sections
 * @see https://schema.org/FAQPage
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Organization Schema for about/contact pages
 * @see https://schema.org/EducationalOrganization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Free Math Printable',
    url: 'https://freemathprintable.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://freemathprintable.com/logo.png',
    },
    description: 'Free printable math worksheets for Kindergarten through Grade 6. Curriculum-aligned, teacher-created educational resources.',
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: 'https://freemathprintable.com/contact',
    },
  };
}
