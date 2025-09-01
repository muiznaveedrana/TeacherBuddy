'use client'

import { BarChart3, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyUsageHistoryProps {
  onStartUsing?: () => void
  onLearnMore?: () => void
  className?: string
}

export function EmptyUsageHistory({
  onStartUsing,
  onLearnMore,
  className = ""
}: EmptyUsageHistoryProps) {
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="text-center py-12">
        <div className="mx-auto mb-6 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-purple-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No Usage Data Yet
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Start generating worksheets to see your usage patterns, popular topics, and productivity insights.
        </p>

        <div className="space-y-3 mb-8">
          <Button 
            onClick={onStartUsing}
            className="w-full"
            size="lg"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Generate Your First Worksheet
          </Button>
          
          {onLearnMore && (
            <Button 
              onClick={onLearnMore}
              variant="outline"
              className="w-full"
            >
              Learn About Analytics
            </Button>
          )}
        </div>

        <div className="space-y-3 text-left">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Once you start, you&apos;ll see:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Monthly worksheet generation trends
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Most popular topics and difficulties
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Time saved compared to manual creation
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              Usage patterns and peak times
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}