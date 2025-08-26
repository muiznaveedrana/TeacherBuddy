// Shared TypeScript types for the worksheet generation platform

// Database Types (matching Supabase schema)
export interface DbProfile {
  id: string
  email: string
  name?: string
  country: string
  curriculum: string
  year_group?: string
  school?: string
  teaching_subjects: string[]
  subscription_tier: 'free' | 'pro' | 'premium'
  last_configuration?: Record<string, unknown>
  default_name_list?: string
  created_at: string
  updated_at: string
}

export interface DbUsageTracking {
  id: string
  user_id: string
  worksheets_generated_daily: number
  worksheets_generated_monthly: number
  worksheets_generated_total: number
  last_generation_at?: string
  daily_reset_date: string
  monthly_reset_date: string
  created_at: string
  updated_at: string
}

export interface DbWorksheetGeneration {
  id: string
  user_id: string
  title: string
  subject: string
  level: string
  year_group: string
  topic: string
  question_count: number
  difficulty: 'easy' | 'medium' | 'hard'
  config: Record<string, unknown>
  pdf_url?: string
  created_at: string
}

// Legacy types (for compatibility)
export interface User {
  id: string
  email: string
  name?: string
  role: 'teacher' | 'admin'
  createdAt: string
  lastLoginAt?: string
}

export interface UserProfile extends User {
  school?: string
  teachingSubjects: string[]
  yearGroups: string[]
  subscriptionTier: 'free' | 'pro' | 'premium'
}

// Worksheet Generation Types
export interface WorksheetConfig {
  subject: string
  level: string
  yearGroup: string
  topic: string
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  includeAnswers: boolean
  customInstructions?: string
}

export interface WorksheetQuestion {
  id: string
  question: string
  answer: string
  type: 'multiple-choice' | 'short-answer' | 'calculation' | 'essay'
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
}

export interface GeneratedWorksheet {
  id: string
  title: string
  subject: string
  level: string
  questions: WorksheetQuestion[]
  config: WorksheetConfig
  createdAt: string
  userId: string
}

// Subscription & Usage Types
export interface UsageMetrics {
  worksheetsGenerated: number
  questionsGenerated: number
  monthlyLimit: number
  resetDate: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  worksheetLimit: number
  features: string[]
  popular?: boolean
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  success: boolean
  message?: string
}

export interface ApiErrorResponse {
  error: string
  code: string
  details?: Record<string, unknown>
  timestamp: string
}

// Common Component Props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// Form Types
export interface FormFieldError {
  field: string
  message: string
}

export interface FormState {
  isSubmitting: boolean
  errors: FormFieldError[]
  isDirty: boolean
}

// Configuration Types
export type Environment = 'development' | 'staging' | 'production'

export interface AppConfig {
  environment: Environment
  isDevelopment: boolean
  isProduction: boolean
  apiUrl: string
  version: string
}