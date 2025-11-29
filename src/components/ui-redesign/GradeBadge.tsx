'use client'

import React from 'react'
import { cn } from '@/lib/utils'

type GradeLevel = 'reception' | 'year-1' | 'year-2' | 'year-3' | 'year-4' | 'year-5' | 'year-6'

interface GradeBadgeProps {
  grade: GradeLevel | string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'soft'
  showIcon?: boolean
  className?: string
}

const gradeConfig: Record<GradeLevel, {
  label: string
  usLabel: string
  color: string
  bgColor: string
  borderColor: string
  icon: string
}> = {
  'reception': {
    label: 'Reception',
    usLabel: 'Kindergarten',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    borderColor: 'border-pink-300',
    icon: '🧸', // Teddy bear for youngest
  },
  'year-1': {
    label: 'Year 1',
    usLabel: 'Grade 1',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-300',
    icon: '🌟',
  },
  'year-2': {
    label: 'Year 2',
    usLabel: 'Grade 2',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-300',
    icon: '🌈',
  },
  'year-3': {
    label: 'Year 3',
    usLabel: 'Grade 3',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-300',
    icon: '🎯',
  },
  'year-4': {
    label: 'Year 4',
    usLabel: 'Grade 4',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-300',
    icon: '🔬',
  },
  'year-5': {
    label: 'Year 5',
    usLabel: 'Grade 5',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
    icon: '🚀',
  },
  'year-6': {
    label: 'Year 6',
    usLabel: 'Grade 6',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
    icon: '🎓',
  },
}

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

export function GradeBadge({
  grade,
  size = 'md',
  variant = 'soft',
  showIcon = true,
  className,
}: GradeBadgeProps) {
  // Normalize grade to key format
  const normalizedGrade = grade.toLowerCase().replace(/\s+/g, '-') as GradeLevel
  const config = gradeConfig[normalizedGrade]

  if (!config) {
    // Fallback for unknown grades
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full font-medium',
          'bg-gray-100 text-gray-700',
          sizeClasses[size],
          className
        )}
      >
        {grade}
      </span>
    )
  }

  const variantClasses = {
    solid: cn(
      config.bgColor.replace('100', '500'),
      'text-white'
    ),
    outline: cn(
      'bg-transparent border-2',
      config.borderColor,
      config.color
    ),
    soft: cn(
      config.bgColor,
      config.color
    ),
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all',
        'hover:shadow-sm cursor-default',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      title={`${config.label} (${config.usLabel})`}
    >
      {showIcon && <span className="text-[1em]">{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  )
}

// Export grade colors for use in other components
export const GRADE_COLORS = Object.entries(gradeConfig).reduce((acc, [key, value]) => ({
  ...acc,
  [key]: {
    primary: value.color.replace('text-', '').replace('-700', '-500'),
    light: value.bgColor.replace('bg-', '').replace('-100', '-50'),
    dark: value.color.replace('text-', '').replace('-700', '-900'),
  }
}), {} as Record<string, { primary: string; light: string; dark: string }>)

export default GradeBadge
