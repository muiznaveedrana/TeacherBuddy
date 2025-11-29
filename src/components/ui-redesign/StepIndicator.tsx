'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  id: string
  label: string
  description?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  completedSteps?: number[]
  variant?: 'dots' | 'pills' | 'numbered'
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  onStepClick?: (stepIndex: number) => void
  className?: string
}

export function StepIndicator({
  steps,
  currentStep,
  completedSteps = [],
  variant = 'dots',
  orientation = 'horizontal',
  size = 'md',
  showLabels = true,
  onStepClick,
  className,
}: StepIndicatorProps) {
  const isHorizontal = orientation === 'horizontal'

  const sizeClasses = {
    sm: {
      dot: 'w-6 h-6 text-xs',
      connector: isHorizontal ? 'h-0.5 w-8' : 'w-0.5 h-8',
      label: 'text-xs',
    },
    md: {
      dot: 'w-8 h-8 text-sm',
      connector: isHorizontal ? 'h-0.5 w-12' : 'w-0.5 h-12',
      label: 'text-sm',
    },
    lg: {
      dot: 'w-10 h-10 text-base',
      connector: isHorizontal ? 'h-1 w-16' : 'w-1 h-16',
      label: 'text-base',
    },
  }

  const currentSize = sizeClasses[size]

  const getStepState = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (completedSteps.includes(index) || index < currentStep) {
      return 'completed'
    }
    if (index === currentStep) {
      return 'current'
    }
    return 'upcoming'
  }

  const renderDot = (index: number, state: 'completed' | 'current' | 'upcoming') => {
    const isClickable = onStepClick && (state === 'completed' || state === 'current')

    if (variant === 'dots') {
      return (
        <button
          type="button"
          onClick={() => isClickable && onStepClick?.(index)}
          disabled={!isClickable}
          className={cn(
            'rounded-full flex items-center justify-center transition-all duration-200',
            currentSize.dot,
            state === 'completed' && 'bg-green-500 text-white',
            state === 'current' && 'bg-blue-500 text-white ring-4 ring-blue-100',
            state === 'upcoming' && 'bg-gray-200 text-gray-400',
            isClickable && 'cursor-pointer hover:scale-110',
            !isClickable && state === 'upcoming' && 'cursor-not-allowed'
          )}
        >
          {state === 'completed' ? (
            <Check className="w-4 h-4" strokeWidth={3} />
          ) : (
            <span className="font-semibold">{index + 1}</span>
          )}
        </button>
      )
    }

    if (variant === 'pills') {
      return (
        <button
          type="button"
          onClick={() => isClickable && onStepClick?.(index)}
          disabled={!isClickable}
          className={cn(
            'rounded-full px-4 py-1.5 font-medium transition-all duration-200 flex items-center gap-2',
            state === 'completed' && 'bg-green-100 text-green-700',
            state === 'current' && 'bg-blue-500 text-white shadow-md shadow-blue-200',
            state === 'upcoming' && 'bg-gray-100 text-gray-400',
            isClickable && 'cursor-pointer hover:scale-105',
            !isClickable && state === 'upcoming' && 'cursor-not-allowed'
          )}
        >
          {state === 'completed' && <Check className="w-4 h-4" strokeWidth={3} />}
          <span>{steps[index].label}</span>
        </button>
      )
    }

    // numbered variant
    return (
      <button
        type="button"
        onClick={() => isClickable && onStepClick?.(index)}
        disabled={!isClickable}
        className={cn(
          'rounded-lg flex items-center gap-2 px-3 py-2 transition-all duration-200',
          currentSize.dot,
          state === 'completed' && 'bg-green-50 text-green-700 border-2 border-green-200',
          state === 'current' && 'bg-blue-50 text-blue-700 border-2 border-blue-500 shadow-sm',
          state === 'upcoming' && 'bg-gray-50 text-gray-400 border-2 border-gray-200',
          isClickable && 'cursor-pointer hover:shadow-md',
          !isClickable && state === 'upcoming' && 'cursor-not-allowed'
        )}
      >
        <span className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
          state === 'completed' && 'bg-green-500 text-white',
          state === 'current' && 'bg-blue-500 text-white',
          state === 'upcoming' && 'bg-gray-300 text-gray-500'
        )}>
          {state === 'completed' ? <Check className="w-3 h-3" /> : index + 1}
        </span>
        <span className="font-medium">{steps[index].label}</span>
      </button>
    )
  }

  const renderConnector = (index: number) => {
    const state = getStepState(index)
    const nextState = getStepState(index + 1)
    const isCompleted = state === 'completed' && (nextState === 'completed' || nextState === 'current')

    return (
      <div
        className={cn(
          'transition-colors duration-300',
          currentSize.connector,
          isCompleted ? 'bg-green-500' : 'bg-gray-200'
        )}
      />
    )
  }

  // For pills variant, we don't show connectors
  if (variant === 'pills') {
    return (
      <div className={cn(
        'flex flex-wrap gap-2',
        isHorizontal ? 'flex-row' : 'flex-col',
        className
      )}>
        {steps.map((step, index) => (
          <div key={step.id}>
            {renderDot(index, getStepState(index))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn(
      'flex items-center',
      isHorizontal ? 'flex-row' : 'flex-col',
      className
    )}>
      {steps.map((step, index) => {
        const state = getStepState(index)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={step.id}>
            <div className={cn(
              'flex',
              isHorizontal ? 'flex-col items-center' : 'flex-row items-start gap-3'
            )}>
              {renderDot(index, state)}

              {showLabels && variant !== 'numbered' && (
                <div className={cn(
                  'text-center',
                  isHorizontal ? 'mt-2' : 'mt-0'
                )}>
                  <p className={cn(
                    currentSize.label,
                    'font-medium',
                    state === 'current' && 'text-blue-700',
                    state === 'completed' && 'text-green-700',
                    state === 'upcoming' && 'text-gray-400'
                  )}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-0.5 max-w-[100px]">
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!isLast && (
              <div className={cn(
                'flex items-center',
                isHorizontal ? 'mx-1' : 'my-1 ml-4'
              )}>
                {renderConnector(index)}
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// Preset configurations for common use cases
export const GENERATOR_STEPS: Step[] = [
  { id: 'layout', label: 'Layout', description: 'Choose style' },
  { id: 'grade', label: 'Grade', description: 'Year group' },
  { id: 'topic', label: 'Topic', description: 'Subject area' },
  { id: 'generate', label: 'Generate', description: 'Create worksheet' },
]

export const ONBOARDING_STEPS: Step[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'setup', label: 'Setup' },
  { id: 'preview', label: 'Preview' },
  { id: 'complete', label: 'Complete' },
]

export default StepIndicator
