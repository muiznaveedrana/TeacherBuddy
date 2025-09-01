'use client'

import { AlertTriangle, BookOpen, RefreshCw, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface GenerationErrorProps {
  errorType?: 'timeout' | 'content' | 'quota' | 'generic'
  onRetry?: () => void
  onModifySettings?: () => void
  worksheetConfig?: {
    topic?: string
    difficulty?: string
    questionCount?: number
  }
}

export function GenerationError({
  errorType = 'generic',
  onRetry,
  onModifySettings,
  worksheetConfig
}: GenerationErrorProps) {
  const getErrorContent = () => {
    switch (errorType) {
      case 'timeout':
        return {
          title: "Generation Timed Out",
          message: "Worksheet generation is taking longer than expected. This sometimes happens with complex topics.",
          suggestions: [
            "Try reducing the number of questions",
            "Select a different difficulty level", 
            "Check if the topic has enough content available"
          ]
        }
      case 'content':
        return {
          title: "Content Generation Failed",
          message: `We couldn't generate appropriate content for "${worksheetConfig?.topic}" at ${worksheetConfig?.difficulty} difficulty.`,
          suggestions: [
            "Try a different difficulty level",
            "Select a more general topic",
            "Reduce the number of questions requested"
          ]
        }
      case 'quota':
        return {
          title: "Generation Limit Reached",
          message: "You've reached your worksheet generation limit for this month.",
          suggestions: [
            "Upgrade to Pro for more worksheets",
            "Wait until next month for limit reset",
            "Contact support if you believe this is an error"
          ]
        }
      default:
        return {
          title: "Generation Failed",
          message: "Something went wrong while creating your worksheet. Please try again.",
          suggestions: [
            "Try again with the same settings",
            "Modify your worksheet settings",
            "Contact support if the problem persists"
          ]
        }
    }
  }

  const { title, message, suggestions } = getErrorContent()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-amber-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {message}
          </AlertDescription>
        </Alert>
        
        {worksheetConfig && (
          <div className="bg-gray-50 p-3 rounded-lg text-sm">
            <p className="font-medium mb-2">Current Settings:</p>
            <div className="space-y-1 text-xs text-gray-600">
              {worksheetConfig.topic && <p>• Topic: {worksheetConfig.topic}</p>}
              {worksheetConfig.difficulty && <p>• Difficulty: {worksheetConfig.difficulty}</p>}
              {worksheetConfig.questionCount && <p>• Questions: {worksheetConfig.questionCount}</p>}
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          <p className="font-medium">What you can try:</p>
          <ul className="space-y-1 ml-4 text-xs">
            {suggestions.map((suggestion, index) => (
              <li key={index}>• {suggestion}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          {onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {onModifySettings && (
            <Button 
              onClick={onModifySettings}
              variant="outline" 
              className="w-full"
            >
              <Settings className="w-4 h-4 mr-2" />
              Modify Settings
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}