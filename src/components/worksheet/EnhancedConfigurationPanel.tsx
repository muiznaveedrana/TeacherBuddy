'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, Sparkles } from 'lucide-react'
import {
  VISUAL_THEME_OPTIONS,
  getContextualSuggestions,
  type VisualThemeOption
} from '@/lib/config/enhanced-options'
import type { 
  VisualTheme, 
  LayoutType 
} from '@/lib/types/worksheet'

interface EnhancedConfigurationPanelProps {
  yearGroup: string
  topic: string
  layout: LayoutType
  visualTheme: VisualTheme | undefined
  onVisualThemeChange: (theme: VisualTheme) => void
}

export function EnhancedConfigurationPanel({
  yearGroup,
  topic,
  layout,
  visualTheme,
  onVisualThemeChange
}: EnhancedConfigurationPanelProps) {
  const [suggestions, setSuggestions] = useState<ReturnType<typeof getContextualSuggestions> | null>(null)

  // Update suggestions when dependencies change
  useEffect(() => {
    if (yearGroup) {
      const newSuggestions = getContextualSuggestions(yearGroup)
      setSuggestions(newSuggestions)
    }
  }, [yearGroup])
  
  // Get visual theme options (direct access for simplicity)
  const visualThemeOptions = suggestions?.visualTheme || VISUAL_THEME_OPTIONS

  if (!yearGroup) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Enhanced Options
          </CardTitle>
          <CardDescription>
            Select a year group to access enhanced options
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Enhanced Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Theme Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-semibold">Visual Theme</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose a theme that matches your students&apos; interests and age group</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select 
            value={visualTheme} 
            onValueChange={onVisualThemeChange}
          >
            <SelectTrigger className="h-12 border-2 border-purple-200 bg-purple-50">
              <SelectValue placeholder="Choose visual theme">
                {visualTheme && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {VISUAL_THEME_OPTIONS.find(opt => opt.value === visualTheme)?.icon}
                    </span>
                    <span>
                      {VISUAL_THEME_OPTIONS.find(opt => opt.value === visualTheme)?.label}
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {visualThemeOptions.map((option: VisualThemeOption) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{option.icon}</span>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-slate-500">{option.description}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

      </CardContent>
    </Card>
  )
}