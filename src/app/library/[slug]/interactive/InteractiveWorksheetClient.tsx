'use client'

import { useRouter } from 'next/navigation'
import { InteractiveModeV2 } from '@/components/worksheet/InteractiveModeV2'
import type { LibraryWorksheet } from '@/lib/types/library'

interface InteractiveWorksheetClientProps {
  worksheet: LibraryWorksheet
}

export function InteractiveWorksheetClient({ worksheet }: InteractiveWorksheetClientProps) {
  const router = useRouter()

  // DEBUG: Check if HTML is encoded during RSC serialization
  console.log('🔍 CLIENT DEBUG: HTML contains &lt;:', worksheet.html_content.includes('&lt;'))
  console.log('🔍 CLIENT DEBUG: HTML contains &gt;:', worksheet.html_content.includes('&gt;'))
  const dataAnswerMatch = worksheet.html_content.match(/data-answer="([^"]*)"/);
  console.log('🔍 CLIENT DEBUG: First data-answer value:', dataAnswerMatch?.[1])

  const handleExit = () => {
    router.push(`/library/${worksheet.slug}`)
  }

  return (
    <div className="min-h-screen">
      <InteractiveModeV2
        htmlContent={worksheet.html_content}
        worksheet={worksheet}
        onExit={handleExit}
      />
    </div>
  )
}
