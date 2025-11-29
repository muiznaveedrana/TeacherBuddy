'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Download, Eye, Sparkles, TrendingUp, Clock } from 'lucide-react'
import { GradeBadge } from './GradeBadge'

interface WorksheetCardProps {
  id: string
  title: string
  thumbnail: string
  grade: string
  topic: string
  subtopic?: string
  difficulty: 'easy' | 'average' | 'hard'
  questionCount: number
  downloadCount: number
  isNew?: boolean
  isPopular?: boolean
  createdAt?: Date
  onPreview?: () => void
  onDownload?: () => void
  className?: string
}

const difficultyConfig = {
  easy: {
    label: 'Easy',
    color: 'text-green-700 bg-green-100',
    icon: '🌱',
  },
  average: {
    label: 'Average',
    color: 'text-yellow-700 bg-yellow-100',
    icon: '⭐',
  },
  hard: {
    label: 'Challenge',
    color: 'text-orange-700 bg-orange-100',
    icon: '🔥',
  },
}

export function WorksheetCard({
  id,
  title,
  thumbnail,
  grade,
  topic,
  subtopic,
  difficulty,
  questionCount,
  downloadCount,
  isNew = false,
  isPopular = false,
  createdAt,
  onPreview,
  onDownload,
  className,
}: WorksheetCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const diffConfig = difficultyConfig[difficulty]

  // Format download count for display
  const formatDownloads = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  // Calculate "freshness" - how recently created
  const isRecent = createdAt && (Date.now() - createdAt.getTime()) < 7 * 24 * 60 * 60 * 1000

  return (
    <div
      className={cn(
        'group relative rounded-xl bg-white border border-gray-200',
        'transition-all duration-200 ease-out',
        'hover:shadow-lg hover:border-gray-300 hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-gray-100">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        )}

        {/* Thumbnail Image */}
        <img
          src={thumbnail}
          alt={`Preview of ${title}`}
          className={cn(
            'w-full h-full object-cover transition-all duration-300',
            isHovered && 'scale-105',
            !imageLoaded && 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Hover Overlay with Actions */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent',
            'flex items-end justify-center gap-2 p-3',
            'transition-opacity duration-200',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <button
            onClick={onPreview}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg',
              'bg-white/90 hover:bg-white text-gray-900',
              'text-sm font-medium shadow-lg',
              'transform transition-all duration-200',
              'hover:scale-105 active:scale-95'
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={onDownload}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg',
              'bg-green-500 hover:bg-green-600 text-white',
              'text-sm font-medium shadow-lg',
              'transform transition-all duration-200',
              'hover:scale-105 active:scale-95'
            )}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        {/* Status Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isNew && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-bold shadow-md">
              <Sparkles className="w-3 h-3" />
              NEW
            </span>
          )}
          {isPopular && !isNew && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow-md">
              <TrendingUp className="w-3 h-3" />
              POPULAR
            </span>
          )}
          {isRecent && !isNew && !isPopular && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-bold shadow-md">
              <Clock className="w-3 h-3" />
              RECENT
            </span>
          )}
        </div>

        {/* Download Count Badge */}
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
            <Download className="w-3 h-3" />
            {formatDownloads(downloadCount)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-2">
          <GradeBadge grade={grade} size="sm" showIcon={false} />
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{topic}</span>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2">
          {/* Difficulty Badge */}
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
            diffConfig.color
          )}>
            <span>{diffConfig.icon}</span>
            {diffConfig.label}
          </span>

          {/* Question Count */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {questionCount} Qs
          </span>
        </div>
      </div>

      {/* Quick Action Bar (visible on mobile, hidden on desktop where hover works) */}
      <div className="md:hidden border-t border-gray-100 p-3 flex gap-2">
        <button
          onClick={onPreview}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
}

export default WorksheetCard
