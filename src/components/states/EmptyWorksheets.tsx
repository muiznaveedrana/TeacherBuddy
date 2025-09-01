'use client'

import { FileText, Sparkles, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyWorksheetsProps {
  onCreateFirst?: () => void
  onViewExamples?: () => void
  className?: string
}

export function EmptyWorksheets({
  onCreateFirst,
  onViewExamples,
  className = ""
}: EmptyWorksheetsProps) {
  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="text-center py-12">
        <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-green-600" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Ready to Create Your First Worksheet?
        </h3>
        
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Generate curriculum-aligned worksheets in seconds. Choose your topic, difficulty, and let AI do the rest.
        </p>

        <div className="space-y-3">
          <Button 
            onClick={onCreateFirst}
            className="w-full"
            size="lg"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate My First Worksheet
          </Button>
          
          {onViewExamples && (
            <Button 
              onClick={onViewExamples}
              variant="outline"
              className="w-full"
            >
              View Example Worksheets
            </Button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-800">
              Save Hours
            </p>
            <p className="text-xs text-gray-600">
              From hours to seconds
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <Sparkles className="w-6 h-6 text-gray-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-800">
              AI-Generated
            </p>
            <p className="text-xs text-gray-600">
              Curriculum aligned
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Free plan includes 30 worksheets per month
        </p>
      </CardContent>
    </Card>
  )
}