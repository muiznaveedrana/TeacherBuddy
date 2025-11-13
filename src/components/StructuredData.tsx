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
    "description": "Free math printables for UK primary schools. Thousands of worksheets for Reception to Year 6, aligned with the UK National Curriculum.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "areaServed": "GB",
    "educationalCredentialAwarded": "Primary Education Resources",
    "knowsAbout": [
      "Mathematics Education",
      "Primary School Teaching",
      "UK National Curriculum",
      "Printable Worksheets",
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
    "alternateName": "Free Math Printables UK",
    "url": "https://freemathprintable.com",
    "description": "Free printable math worksheets for UK primary schools",
    "inLanguage": "en-GB",
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
        "name": "Are the math printables really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All worksheets in our library are completely free to download and print. No credit card required, no hidden fees. Our library will always remain free for teachers and parents."
        }
      },
      {
        "@type": "Question",
        "name": "What year groups do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover Reception through Year 6 (ages 4-11), which includes EYFS, KS1 (Years 1-2), and KS2 (Years 3-6). All worksheets are aligned with the UK National Curriculum."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
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
        "name": "Are the worksheets aligned with the UK curriculum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our worksheets are carefully designed to align with the UK National Curriculum for Mathematics. We cover all key topics for each year group."
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
