/**
 * UI Redesign Components
 * ======================
 * New component library following the UI-DESIGN-SPECIFICATION.md
 *
 * Usage:
 * import { GradeBadge, WorksheetCard, VisualLayoutSelector } from '@/components/ui-redesign'
 */

// Badge Components
export { GradeBadge, GRADE_COLORS } from './GradeBadge'
export {
  TrustBadge,
  TrustBadgeRow,
  HeroTrustBadges,
  createPresetBadge,
  type PresetBadge,
} from './TrustBadge'

// Card Components
export { WorksheetCard } from './WorksheetCard'

// Form Components
export { VisualLayoutSelector } from './VisualLayoutSelector'

// Navigation Components
export {
  StepIndicator,
  GENERATOR_STEPS,
  ONBOARDING_STEPS,
} from './StepIndicator'

// Re-export types
export type { default as GradeBadgeProps } from './GradeBadge'
export type { default as WorksheetCardProps } from './WorksheetCard'
export type { default as VisualLayoutSelectorProps } from './VisualLayoutSelector'
export type { default as StepIndicatorProps } from './StepIndicator'
