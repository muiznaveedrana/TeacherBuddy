# Worksheet Detail Page Enhancement - Implementation Guide

## ✅ COMPLETED

### 1. Database Schema ✓
**File:** `supabase/migrations/20250107_add_rich_content_fields.sql`
- Added 7 new fields for educational content
- Ready to apply with Supabase migration

### 2. TypeScript Types ✓
**File:** `src/lib/types/library.ts` (updated)
- Added all new fields to LibraryWorksheet interface

### 3. AI Content Generator ✓
**File:** `src/lib/services/educationalContentService.ts`
- `generateEducationalContent()` - Main function
- Generates: learning objectives, how to use, benefits, skills, FAQ, standards
- Fallback defaults if AI fails

---

## 📋 REMAINING TASKS

### TASK 3: Breadcrumb Component

**File to create:** `src/components/ui/breadcrumb.tsx` (may already exist - check first)

```tsx
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
```

---

### TASK 4: Related Worksheets Algorithm

**File to create:** `src/lib/services/relatedWorksheetService.ts`

```typescript
import { createClient } from '@/lib/supabase/server'
import type { LibraryWorksheet } from '@/lib/types/library'

export async function getRelatedWorksheets(
  worksheet: LibraryWorksheet,
  limit: number = 8
): Promise<LibraryWorksheet[]> {
  const supabase = await createClient()

  // Strategy 1: Same topic, different difficulty (3 worksheets)
  const { data: sameTopic } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('status', 'published')
    .eq('year_group', worksheet.year_group)
    .eq('topic', worksheet.topic)
    .neq('id', worksheet.id)
    .neq('difficulty', worksheet.difficulty)
    .limit(3)

  // Strategy 2: Same year group, related topics (3 worksheets)
  const { data: relatedTopics } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('status', 'published')
    .eq('year_group', worksheet.year_group)
    .neq('id', worksheet.id)
    .neq('topic', worksheet.topic)
    .limit(3)

  // Strategy 3: Most downloaded in category (2 worksheets)
  const { data: popular } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('status', 'published')
    .eq('topic', worksheet.topic)
    .neq('id', worksheet.id)
    .order('download_count', { ascending: false })
    .limit(2)

  // Combine and deduplicate
  const combined = [...(sameTopic || []), ...(relatedTopics || []), ...(popular || [])]
  const unique = Array.from(new Map(combined.map(w => [w.id, w])).values())

  return unique.slice(0, limit)
}
```

---

### TASK 5: Related Worksheets API Endpoint

**File to create:** `src/app/api/library/[id]/related/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getWorksheetById } from '@/lib/services/libraryService'
import { getRelatedWorksheets } from '@/lib/services/relatedWorksheetService'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worksheet = await getWorksheetById(params.id)

    if (!worksheet) {
      return NextResponse.json({ error: 'Worksheet not found' }, { status: 404 })
    }

    const related = await getRelatedWorksheets(worksheet, 8)

    return NextResponse.json({
      worksheets: related,
      total: related.length
    })

  } catch (error) {
    console.error('Failed to fetch related worksheets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch related worksheets' },
      { status: 500 }
    )
  }
}
```

---

### TASK 6: RelatedWorksheets Component

**File to create:** `src/components/RelatedWorksheets.tsx`

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { LibraryWorksheet } from '@/lib/types/library'

export function RelatedWorksheets({ worksheetId }: { worksheetId: string }) {
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/library/${worksheetId}/related`)
      .then(res => res.json())
      .then(data => {
        setWorksheets(data.worksheets || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [worksheetId])

  if (loading) return <div>Loading related worksheets...</div>
  if (worksheets.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {worksheets.map(worksheet => (
          <Link
            key={worksheet.id}
            href={`/library/${worksheet.slug}`}
            className="group bg-white rounded-lg border hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[4/5] relative">
              <Image
                src={worksheet.thumbnail_url}
                alt={worksheet.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2">{worksheet.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{worksheet.year_group}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

---

### TASK 7: Enhanced WorksheetDetailView

**File to update:** `src/components/WorksheetDetailView.tsx`

Add these sections AFTER the existing stats section (around line 250):

```tsx
{/* Breadcrumb Navigation */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  <Breadcrumb items={[
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: worksheet.year_group, href: `/library?year_group=${worksheet.year_group}` },
    { label: worksheet.topic, href: `/library?topic=${worksheet.topic}` },
    { label: worksheet.title }
  ]} />
</div>

{/* Educational Content Sections */}
{worksheet.educational_benefits && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">About This Worksheet</h2>
      <p className="text-gray-700 whitespace-pre-line">{worksheet.educational_benefits}</p>
    </div>
  </div>
)}

{/* Learning Objectives */}
{worksheet.learning_objectives && worksheet.learning_objectives.length > 0 && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
      <h3 className="text-xl font-bold mb-3">Learning Objectives</h3>
      <ul className="space-y-2">
        {worksheet.learning_objectives.map((obj, i) => (
          <li key={i} className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

{/* How to Use */}
{worksheet.how_to_use && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-xl font-bold mb-3">How to Use This Worksheet</h3>
      <p className="text-gray-700 whitespace-pre-line">{worksheet.how_to_use}</p>
    </div>
  </div>
)}

{/* Skills Developed */}
{worksheet.skills_developed && worksheet.skills_developed.length > 0 && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex flex-wrap gap-2">
      <span className="font-semibold">Skills Developed:</span>
      {worksheet.skills_developed.map((skill, i) => (
        <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
          {skill}
        </span>
      ))}
    </div>
  </div>
)}

{/* FAQ Section */}
{worksheet.faq && worksheet.faq.length > 0 && (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      <div className="space-y-6">
        {worksheet.faq.map((item, i) => (
          <div key={i}>
            <h4 className="font-semibold text-lg mb-2">{item.question}</h4>
            <p className="text-gray-700">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{/* Related Worksheets */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <RelatedWorksheets worksheetId={worksheet.id} />
</div>
```

---

### TASK 8: Update SEO Schema (in page.tsx)

**File:** `src/app/library/[slug]/page.tsx`

Add FAQ schema to the existing jsonLd object (around line 90):

```typescript
// Add this after the existing aggregateRating field
FAQPage: worksheet.faq && worksheet.faq.length > 0 ? {
  '@type': 'FAQPage',
  mainEntity: worksheet.faq.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
} : undefined
```

---

## 🔧 INTEGRATION WITH SAVE-TO-LIBRARY

When saving worksheets to library, generate educational content automatically:

**File to update:** `src/app/api/library/save/route.ts`

Add this BEFORE saving to database:

```typescript
import { generateEducationalContent } from '@/lib/services/educationalContentService'

// ... existing code ...

// Generate rich educational content
const educationalContent = await generateEducationalContent({
  title: metadata.title,
  year_group: metadata.year_group,
  topic: metadata.topic,
  subtopic: metadata.subtopic,
  difficulty: metadata.difficulty,
  question_count: metadata.question_count,
  visual_theme: metadata.visual_theme,
  activity_type: metadata.activity_type,
  seasonal_theme: metadata.seasonal_theme
})

// Merge into worksheet data before insert
const worksheetData = {
  // ... existing fields ...
  ...educationalContent  // Adds all educational fields
}
```

---

## 📝 TESTING CHECKLIST

1. [ ] Apply database migration
2. [ ] Test educational content generation
3. [ ] Verify breadcrumb navigation
4. [ ] Check related worksheets display
5. [ ] Validate FAQ schema in Google Rich Results Test
6. [ ] Test mobile responsiveness
7. [ ] Verify SEO improvements (meta descriptions, structured data)

---

## 🚀 DEPLOYMENT NOTES

1. Apply migration: Use Supabase dashboard or CLI
2. Environment variables: Ensure `GEMINI_API_KEY` is set
3. Test on staging first
4. Monitor AI generation costs (Gemini Flash is very cheap)

---

## 💡 FUTURE ENHANCEMENTS

- Add reviews/ratings system
- Track "Recently Viewed" worksheets
- Personalized recommendations based on user behavior
- A/B test different educational content styles
- Add social sharing buttons
