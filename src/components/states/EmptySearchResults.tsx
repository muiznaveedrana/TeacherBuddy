'use client'

import { Search, RefreshCw, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptySearchResultsProps {
  searchTerm?: string
  onClearSearch?: () => void
  onModifyFilters?: () => void
  onTryDifferentSearch?: () => void
  className?: string
}

export function EmptySearchResults({
  searchTerm,
  onClearSearch,
  onModifyFilters,
  onTryDifferentSearch,
  className = ""
}: EmptySearchResultsProps) {
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="text-center py-12">
        <div className="mx-auto mb-6 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-500" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No Results Found
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          {searchTerm 
            ? `We couldn't find anything matching "${searchTerm}". Try adjusting your search or filters.`
            : "No items match your current search criteria."
          }
        </p>

        <div className="space-y-3">
          {onTryDifferentSearch && (
            <Button 
              onClick={onTryDifferentSearch}
              className="w-full"
              variant="default"
            >
              <Search className="w-4 h-4 mr-2" />
              Try Different Search
            </Button>
          )}
          
          {onModifyFilters && (
            <Button 
              onClick={onModifyFilters}
              variant="outline"
              className="w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Modify Filters
            </Button>
          )}

          {onClearSearch && (
            <Button 
              onClick={onClearSearch}
              variant="ghost"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear Search
            </Button>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-800 font-medium mb-2">
            Search Tips:
          </p>
          <ul className="text-xs text-gray-600 space-y-1 text-left">
            <li>• Try shorter, more general terms</li>
            <li>• Check spelling and try alternate spellings</li>
            <li>• Use different keywords or synonyms</li>
            <li>• Remove filters to broaden your search</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}