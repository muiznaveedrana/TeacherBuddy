'use client'

import { Region, REGION_CONFIG } from '@/lib/types/library'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

interface RegionToggleProps {
  value: Region
  onChange: (region: Region) => void
  disabled?: boolean
}

export function RegionToggle({ value, onChange, disabled = false }: RegionToggleProps) {
  // Only show US and UK for now (AU and CA can be added later)
  const regions: Region[] = ['US', 'UK']

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-base md:text-sm">Region</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Select your region for currency and measurement preferences</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex gap-2">
        {regions.map((region) => {
          const config = REGION_CONFIG[region]
          const isSelected = value === region

          return (
            <button
              key={region}
              type="button"
              onClick={() => !disabled && onChange(region)}
              disabled={disabled}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              data-testid={`region-${region.toLowerCase()}`}
            >
              <span className="text-xl">{config.flag}</span>
              <span className="text-sm md:text-xs">{region}</span>
              <span className="text-xs text-slate-400">({config.currency})</span>
            </button>
          )
        })}
      </div>

      {value === 'US' && (
        <p className="text-xs text-slate-500 mt-1">
          Uses US dollars ($) and cents
        </p>
      )}
      {value === 'UK' && (
        <p className="text-xs text-slate-500 mt-1">
          Uses British pounds (£) and pence
        </p>
      )}
    </div>
  )
}
