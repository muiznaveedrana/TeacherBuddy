'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X, Sparkles, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { trackLibrarySearch } from '@/lib/analytics'

export function LibrarySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync query state with URL params (run on client after mount)
  useEffect(() => {
    setQuery(searchParams?.get('q') || '')
  }, [searchParams])

  // Quick search suggestions based on common queries
  const suggestions = [
    'numbers',
    'counting reception',
    'addition year 1',
    'subtraction',
    'shapes',
    'christmas counting',
    'animals',
  ]

  const handleAISearch = async (searchQuery: string) => {
    setIsSearching(true)

    try {
      // Call AI search API
      const response = await fetch('/api/library/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      })

      if (!response.ok) {
        throw new Error('AI search failed')
      }

      const { parsed } = await response.json()
      console.log('🤖 AI parsed query:', parsed)

      // Build URL params from AI-parsed filters
      const params = new URLSearchParams()

      if (parsed.year_group) params.set('year_group', parsed.year_group)
      if (parsed.topic) params.set('topic', parsed.topic)
      if (parsed.subtopic) params.set('subtopic', parsed.subtopic)
      if (parsed.visual_theme) params.set('visual_theme', parsed.visual_theme)
      if (parsed.activity_type) params.set('activity_type', parsed.activity_type)
      if (parsed.seasonal_theme) params.set('seasonal_theme', parsed.seasonal_theme)
      if (parsed.difficulty) params.set('difficulty', parsed.difficulty)

      // Only use text search if AI didn't parse any structured filters
      const hasStructuredFilters = parsed.year_group || parsed.topic || parsed.subtopic ||
                                    parsed.visual_theme || parsed.activity_type ||
                                    parsed.seasonal_theme || parsed.difficulty

      if (!hasStructuredFilters) {
        // Fallback to text search if AI couldn't extract filters
        params.set('q', searchQuery.trim())
      }

      router.push(`/library?${params.toString()}`)
      setShowSuggestions(false)

      // Track successful AI search
      trackLibrarySearch({
        searchQuery: searchQuery,
        searchType: 'ai',
        yearGroup: parsed.year_group,
        topic: parsed.topic
      })

    } catch (error) {
      console.error('AI search error:', error)
      // Fallback to basic search
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set('q', searchQuery.trim())
      router.push(`/library?${params.toString()}`)

      // Track fallback text search
      trackLibrarySearch({
        searchQuery: searchQuery,
        searchType: 'text'
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleAISearch(query)
    }
  }

  const handleClear = () => {
    setQuery('')
    const params = new URLSearchParams()
    router.push(`/library?${params.toString()}`)
    inputRef.current?.focus()
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleAISearch(suggestion)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Try: 'easy christmas counting for reception' or 'year 1 addition'..."
          className="pl-10 pr-10 h-11 text-base"
          disabled={isSearching}
        />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          </div>
        )}
        {query && !isSearching && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && !query && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
          <div className="p-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 px-3 py-2">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Try these AI-powered searches
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded text-sm text-gray-700 transition-colors"
              >
                <Search className="w-3 h-3 inline mr-2 text-gray-400" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
