'use client'

import { useRouter } from 'next/navigation'
import { InteractiveModeV2 } from '@/components/worksheet/InteractiveModeV2'
import type { LibraryWorksheet } from '@/lib/types/library'

interface InteractiveWorksheetClientProps {
  worksheet: LibraryWorksheet
}

export function InteractiveWorksheetClient({ worksheet }: InteractiveWorksheetClientProps) {
  const router = useRouter()

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
