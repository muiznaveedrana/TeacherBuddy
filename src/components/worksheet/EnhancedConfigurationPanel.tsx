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
  nameList: string
  onVisualThemeChange: (theme: VisualTheme) => void
  onNameListChange: (nameList: string) => void
}

export function EnhancedConfigurationPanel({
  yearGroup,
  topic,
  layout,
  visualTheme,
  nameList,
  onVisualThemeChange,
  onNameListChange
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


        {/* Student Name List Selection - Hidden from UI */}
        <div className="space-y-3" style={{ display: 'none' }}>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-semibold">Student Name List (Optional)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Student names will be used in word problems to personalize the worksheet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-2">
            <Select value={nameList} onValueChange={onNameListChange}>
              <SelectTrigger className="flex-1 h-12 md:h-10 text-base md:text-sm">
                <SelectValue placeholder="Select a name list (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No particular name list</SelectItem>
                <SelectItem value="year3-class-a">Year 3 Class A (25 students)</SelectItem>
                <SelectItem value="year4-maths-group">Year 4 Maths Group (18 students)</SelectItem>
                <SelectItem value="reception-class">Reception Class (20 students)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="default" className="md:flex-shrink-0">
              Create New
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}