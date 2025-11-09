'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Adds pagination link tags (rel="next" and rel="prev") to document head for SEO.
 * Google and other search engines use these to understand pagination structure.
 */
export function LibraryPaginationMeta() {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '0')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worksheetgenerator-ai.vercel.app'

  useEffect(() => {
    // Remove any existing pagination link tags
    const existingPrev = document.querySelector('link[rel="prev"]')
    const existingNext = document.querySelector('link[rel="next"]')
    existingPrev?.remove()
    existingNext?.remove()

    // Add prev link if not on first page
    if (currentPage > 0) {
      const prevParams = new URLSearchParams(searchParams.toString())
      if (currentPage === 1) {
        prevParams.delete('page') // First page doesn't need page param
      } else {
        prevParams.set('page', (currentPage - 1).toString())
      }

      const prevLink = document.createElement('link')
      prevLink.rel = 'prev'
      prevLink.href = `${baseUrl}/library${prevParams.toString() ? '?' + prevParams.toString() : ''}`
      document.head.appendChild(prevLink)
    }

    // Add next link (always present unless we know it's the last page)
    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set('page', (currentPage + 1).toString())

    const nextLink = document.createElement('link')
    nextLink.rel = 'next'
    nextLink.href = `${baseUrl}/library?${nextParams.toString()}`
    document.head.appendChild(nextLink)

    // Add canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.setAttribute(
        'href',
        `${baseUrl}/library${searchParams.toString() ? '?' + searchParams.toString() : ''}`
      )
    } else {
      const canonical = document.createElement('link')
      canonical.rel = 'canonical'
      canonical.href = `${baseUrl}/library${searchParams.toString() ? '?' + searchParams.toString() : ''}`
      document.head.appendChild(canonical)
    }

    // Cleanup on unmount
    return () => {
      document.querySelector('link[rel="prev"]')?.remove()
      document.querySelector('link[rel="next"]')?.remove()
    }
  }, [searchParams, currentPage, baseUrl])

  return null // This component doesn't render anything
}
