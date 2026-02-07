/**
 * JSON-LD Schema Generators for freemathprintable.com
 * Provides structured data for SEO optimization
 *
 * @see https://schema.org/LearningResource
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import type { LibraryWorksheet } from '@/lib/types/library';
import type { HubBreadcrumb, HubFAQ, SubtopicHub, YearGroupHub, TopicHub } from '@/lib/types/hub';

// ============================================================================
// CONSTANTS
// ============================================================================

const SITE_URL = 'https://freemathprintable.com';
const SITE_NAME = 'FreeMathPrintable.com';
const LOGO_URL = `${SITE_URL}/logo.png`;

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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

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
 * Normalize URL to include full domain
 */
function toFullUrl(url: string): string {
  return url.startsWith('http') ? url : `${SITE_URL}${url}`;
}

/**
 * Website Schema for the homepage
 * @see https://schema.org/WebSite
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['Free Math Printable', 'Free Math Worksheets'],
    url: SITE_URL,
    description: 'Free printable math worksheets for Kindergarten through Grade 6. Common Core and UK Curriculum aligned, teacher-created resources.',
    publisher: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/library?search={search_term_string}`,
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
 * Compatible with HubBreadcrumb from hub.ts
 * @see https://schema.org/BreadcrumbList
 */
export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[] | HubBreadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: toFullUrl(item.href),
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
  curriculumStandards?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

/**
 * Convert a LibraryWorksheet database record to WorksheetSchemaInput
 * This is the primary adapter for generating schemas from database records
 */
export function fromLibraryWorksheet(worksheet: LibraryWorksheet): WorksheetSchemaInput {
  return {
    title: worksheet.seo_title || worksheet.title,
    description: worksheet.seo_description || `${worksheet.title} - Free printable math worksheet`,
    slug: worksheet.slug,
    yearGroup: worksheet.year_group,
    topic: worksheet.topic,
    subtopic: worksheet.subtopic,
    difficulty: worksheet.difficulty,
    thumbnailUrl: worksheet.thumbnail_url,
    learningObjectives: worksheet.learning_objectives || undefined,
    skills: worksheet.skills_developed || undefined,
    estimatedTime: worksheet.estimated_time_minutes || undefined,
    datePublished: worksheet.published_at || worksheet.created_at,
    dateModified: worksheet.updated_at,
    curriculumStandards: worksheet.curriculum_standards || undefined,
    faq: worksheet.faq || undefined,
  };
}

export function generateLearningResourceSchema(worksheet: WorksheetSchemaInput | LibraryWorksheet) {
  // Handle both WorksheetSchemaInput and LibraryWorksheet types
  const input = 'html_content' in worksheet ? fromLibraryWorksheet(worksheet) : worksheet;

  const usGrade = yearGroupToUSGrade(input.yearGroup);
  const ageRange = getAgeRange(input.yearGroup);
  const worksheetUrl = `${SITE_URL}/worksheets/${input.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: input.title,
    description: input.description,
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
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      '@type': 'Thing',
      name: input.topic,
    },
    teaches: input.subtopic || input.topic,
  };

  // Add optional fields
  if (input.thumbnailUrl) {
    schema.thumbnailUrl = input.thumbnailUrl;
    schema.image = input.thumbnailUrl;
  }

  if (input.learningObjectives && input.learningObjectives.length > 0) {
    schema.teaches = input.learningObjectives;
  }

  if (input.skills && input.skills.length > 0) {
    schema.assesses = input.skills;
  }

  if (input.estimatedTime) {
    schema.timeRequired = `PT${input.estimatedTime}M`;
  }

  if (input.datePublished) {
    schema.datePublished = input.datePublished;
  }

  if (input.dateModified) {
    schema.dateModified = input.dateModified;
  }

  if (input.difficulty) {
    const difficultyMap: Record<string, string> = {
      easy: 'beginner',
      average: 'intermediate',
      hard: 'advanced',
    };
    schema.proficiencyLevel = difficultyMap[input.difficulty];
  }

  // Add curriculum alignment if standards are provided
  if (input.curriculumStandards && input.curriculumStandards.length > 0) {
    schema.educationalAlignment = input.curriculumStandards.map((standard) => ({
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: standard,
    }));
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
  const collectionUrl = toFullUrl(collection.url);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collectionUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: toFullUrl(item.url),
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
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
    description: 'Free printable math worksheets for Kindergarten through Grade 6. Common Core and UK Curriculum aligned, teacher-created educational resources.',
    areaServed: ['US', 'GB', 'CA', 'AU'],
    knowsAbout: [
      'Mathematics Education',
      'Elementary School Teaching',
      'Kindergarten Math',
      'Printable Worksheets',
      'Common Core Math',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/contact`,
    },
  };
}

// ============================================================================
// HUB PAGE SCHEMAS
// ============================================================================

/**
 * Generate schema for Year Group hub pages
 * Can represent the year group as a Course for better Google visibility
 * @see https://schema.org/Course
 */
export function generateYearGroupHubSchema(hub: YearGroupHub) {
  const usGrade = yearGroupToUSGrade(hub.yearGroup);
  const ageRange = getAgeRange(hub.yearGroup);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${usGrade} Math Worksheets`,
    description: hub.description || `Free printable math worksheets for ${usGrade} (${hub.ageRange}). Curriculum-aligned resources for teachers and parents.`,
    url: toFullUrl(hub.seo.canonicalUrl),
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: usGrade,
    typicalAgeRange: `${ageRange.min}-${ageRange.max}`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    numberOfCredits: hub.worksheetCount,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${hub.worksheetCount} worksheets`,
    },
    about: {
      '@type': 'Thing',
      name: 'Mathematics',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
  };
}

/**
 * Generate schema for Topic hub pages
 */
export function generateTopicHubSchema(hub: TopicHub) {
  const usGrade = yearGroupToUSGrade(hub.yearGroup);
  const ageRange = getAgeRange(hub.yearGroup);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${hub.label} - ${usGrade} Math Worksheets`,
    description: hub.description,
    url: toFullUrl(hub.seo.canonicalUrl),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: usGrade,
    typicalAgeRange: `${ageRange.min}-${ageRange.max}`,
    about: {
      '@type': 'Thing',
      name: hub.label,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: hub.subtopics.length,
      itemListElement: hub.subtopics.map((subtopic, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: subtopic.label,
        url: toFullUrl(subtopic.href),
      })),
    },
    ...(hub.learningObjectives.length > 0 && {
      teaches: hub.learningObjectives,
    }),
  };
}

/**
 * Generate schema for Subtopic hub pages (main worksheet listing pages)
 * These are the primary SEO landing pages
 */
export function generateSubtopicHubSchema(hub: SubtopicHub) {
  const usGrade = yearGroupToUSGrade(hub.yearGroup);
  const ageRange = getAgeRange(hub.yearGroup);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.seo.title,
    description: hub.seo.description,
    url: toFullUrl(hub.seo.canonicalUrl),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: usGrade,
    typicalAgeRange: `${ageRange.min}-${ageRange.max}`,
    about: {
      '@type': 'Thing',
      name: hub.label,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: hub.worksheetCount,
      itemListElement: hub.worksheets.slice(0, 10).map((worksheet, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: worksheet.title,
        url: toFullUrl(`/worksheets/${worksheet.slug}`),
        image: worksheet.thumbnail_url,
      })),
    },
  };

  // Add learning objectives if available
  if (hub.learningObjectives && hub.learningObjectives.length > 0) {
    schema.teaches = hub.learningObjectives;
  }

  // Add educational content as additional description
  if (hub.educationalContent) {
    schema.abstract = hub.educationalContent.introduction;
  }

  return schema;
}

/**
 * Generate FAQ schema from HubFAQ array
 * Compatible with both HubFAQ and simple {question, answer} objects
 */
export function generateFAQSchemaFromHub(items: HubFAQ[] | Array<{ question: string; answer: string }>) {
  return generateFAQSchema(items);
}

/**
 * Generate combined schemas for a subtopic hub page
 * Returns array of schemas for breadcrumb, collection, and FAQ
 */
export function generateSubtopicHubSchemas(hub: SubtopicHub): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [
    generateBreadcrumbSchema(hub.breadcrumbs),
    generateSubtopicHubSchema(hub),
  ];

  if (hub.faq && hub.faq.length > 0) {
    schemas.push(generateFAQSchema(hub.faq));
  }

  return schemas;
}
