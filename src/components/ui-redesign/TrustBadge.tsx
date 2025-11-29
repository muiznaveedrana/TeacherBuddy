'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check, Shield, Zap, Clock, Download, Users, Lock, Award, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type BadgeVariant = 'success' | 'info' | 'warning' | 'neutral' | 'premium'
type BadgeSize = 'sm' | 'md' | 'lg'

interface TrustBadgeProps {
  text: string
  icon?: LucideIcon | string
  variant?: BadgeVariant
  size?: BadgeSize
  animated?: boolean
  className?: string
}

// Preset badges for common use cases
export type PresetBadge = 'free' | 'no-signup' | 'instant' | 'curriculum' | 'secure' | 'popular' | 'trusted'

const presetBadges: Record<PresetBadge, Omit<TrustBadgeProps, 'className'>> = {
  free: {
    text: '100% Free',
    icon: Check,
    variant: 'success',
  },
  'no-signup': {
    text: 'No Sign-up Required',
    icon: Zap,
    variant: 'info',
  },
  instant: {
    text: 'Instant Download',
    icon: Download,
    variant: 'success',
  },
  curriculum: {
    text: 'Curriculum Aligned',
    icon: Award,
    variant: 'info',
  },
  secure: {
    text: 'Safe & Secure',
    icon: Shield,
    variant: 'neutral',
  },
  popular: {
    text: 'Trusted by Teachers',
    icon: Users,
    variant: 'warning',
  },
  trusted: {
    text: '10,000+ Downloads',
    icon: Star,
    variant: 'premium',
  },
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 border-green-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  warning: 'bg-orange-50 text-orange-700 border-orange-200',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200',
  premium: 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200',
}

const iconColors: Record<BadgeVariant, string> = {
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-orange-500',
  neutral: 'text-gray-500',
  premium: 'text-purple-500',
}

const sizeClasses: Record<BadgeSize, { container: string; icon: string; text: string }> = {
  sm: {
    container: 'px-2 py-1 gap-1',
    icon: 'w-3 h-3',
    text: 'text-xs',
  },
  md: {
    container: 'px-3 py-1.5 gap-1.5',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  lg: {
    container: 'px-4 py-2 gap-2',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
}

export function TrustBadge({
  text,
  icon,
  variant = 'success',
  size = 'md',
  animated = false,
  className,
}: TrustBadgeProps) {
  const sizes = sizeClasses[size]
  const IconComponent = typeof icon === 'string' ? null : icon

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium shadow-sm',
        variantClasses[variant],
        sizes.container,
        animated && 'animate-pulse-subtle',
        className
      )}
    >
      {/* Icon */}
      {typeof icon === 'string' ? (
        <span className={sizes.icon}>{icon}</span>
      ) : IconComponent ? (
        <IconComponent className={cn(sizes.icon, iconColors[variant])} />
      ) : (
        <Check className={cn(sizes.icon, iconColors[variant])} />
      )}

      {/* Text */}
      <span className={cn(sizes.text, 'font-medium')}>{text}</span>
    </div>
  )
}

// Factory function for preset badges
export function createPresetBadge(preset: PresetBadge, props?: Partial<TrustBadgeProps>) {
  const presetConfig = presetBadges[preset]
  return <TrustBadge {...presetConfig} {...props} />
}

// Component for rendering a row of trust badges
interface TrustBadgeRowProps {
  badges: PresetBadge[]
  size?: BadgeSize
  className?: string
}

export function TrustBadgeRow({ badges, size = 'md', className }: TrustBadgeRowProps) {
  return (
    <div className={cn('flex flex-wrap justify-center gap-2 md:gap-3', className)}>
      {badges.map((badge) => {
        const config = presetBadges[badge]
        return (
          <TrustBadge
            key={badge}
            {...config}
            size={size}
          />
        )
      })}
    </div>
  )
}

// Hero-style trust badges with larger styling
interface HeroTrustBadgesProps {
  className?: string
}

export function HeroTrustBadges({ className }: HeroTrustBadgesProps) {
  const primaryBadges: PresetBadge[] = ['free', 'no-signup']
  const secondaryBadges: PresetBadge[] = ['instant', 'curriculum']

  return (
    <div className={cn('space-y-3', className)}>
      {/* Primary row */}
      <div className="flex justify-center gap-3">
        {primaryBadges.map((badge) => {
          const config = presetBadges[badge]
          return (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
            >
              {typeof config.icon === 'string' ? (
                <span className="w-5 h-5">{config.icon}</span>
              ) : config.icon ? (
                <config.icon className={cn('w-5 h-5', iconColors[config.variant || 'success'])} />
              ) : null}
              <span className="text-gray-700 font-medium">{config.text}</span>
            </div>
          )
        })}
      </div>

      {/* Secondary row */}
      <div className="flex justify-center gap-3 flex-wrap">
        {secondaryBadges.map((badge) => {
          const config = presetBadges[badge]
          return (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100"
            >
              {typeof config.icon === 'string' ? (
                <span className="w-5 h-5">{config.icon}</span>
              ) : config.icon ? (
                <config.icon className={cn('w-5 h-5', iconColors[config.variant || 'info'])} />
              ) : null}
              <span className="text-gray-700 font-medium">{config.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrustBadge
