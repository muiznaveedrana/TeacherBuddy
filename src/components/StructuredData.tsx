'use client'

/**
 * Structured Data / Schema Markup Components
 *
 * These schemas help Google understand your website better and enable rich snippets.
 *
 * Benefits:
 * - Rich snippets in search results
 * - Sitelinks searchbox
 * - Better search visibility
 * - Higher click-through rates
 */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "FreeMathPrintable.com",
    "url": "https://freemathprintable.com",
    "logo": "https://freemathprintable.com/logo.png",
    "description": "Free printable math worksheets for elementary schools. Thousands of worksheets for Kindergarten through Grade 6 (ages 4-11). Common Core and UK Curriculum aligned.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "areaServed": ["US", "GB", "CA", "AU"],
    "educationalCredentialAwarded": "Elementary Education Resources",
    "knowsAbout": [
      "Mathematics Education",
      "Elementary School Teaching",
      "Kindergarten Math",
      "Printable Worksheets",
      "Common Core Math",
      "Educational Resources"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FreeMathPrintable.com",
    "alternateName": ["Free Math Worksheets", "Free Math Printables"],
    "url": "https://freemathprintable.com",
    "description": "Free printable math worksheets for Kindergarten through Grade 6. Common Core aligned.",
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://freemathprintable.com/library?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the math worksheets really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All worksheets in our library are completely free to download and print. No credit card required, no hidden fees. Our library will always remain free for teachers and parents."
        }
      },
      {
        "@type": "Question",
        "name": "What grade levels do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover Kindergarten through Grade 6 (ages 4-11). All worksheets are age-appropriate and aligned with Common Core standards. UK teachers can use them for Reception through Year 6."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account to download?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No account is required to browse and download worksheets from our free library. You can create an optional account if you want to use our AI-powered custom worksheet generator."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use these worksheets in my classroom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our worksheets are designed for classroom use. You can print and distribute them to your students. They're perfect for homework, classwork, or assessment."
        }
      },
      {
        "@type": "Question",
        "name": "Are the worksheets aligned with Common Core?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our worksheets are carefully designed to align with Common Core State Standards (US) and UK National Curriculum. We cover all key math topics for each grade level."
        }
      },
      {
        "@type": "Question",
        "name": "How often are new worksheets added?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We add new worksheets regularly. Our library is constantly growing with fresh content covering different topics, difficulty levels, and teaching approaches."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * All Schemas Combined (for homepage)
 */
export function HomepageStructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQSchema />
    </>
  )
}
