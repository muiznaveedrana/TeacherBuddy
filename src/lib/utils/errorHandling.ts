/**
 * Standardized error handling utilities
 * Provides consistent error types, formatting, and handling across the application
 */

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION = 'AUTHENTICATION',
  RATE_LIMIT = 'RATE_LIMIT',
  GENERATION_FAILED = 'GENERATION_FAILED',
  UNKNOWN = 'UNKNOWN'
}

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface StandardizedError {
  type: ErrorType
  severity: ErrorSeverity
  message: string
  userMessage: string
  isRetryable: boolean
  metadata?: Record<string, unknown>
  originalError?: Error
  timestamp: string
}

/**
 * Base error class with standardized properties
 */
export class AppError extends Error {
  public readonly type: ErrorType
  public readonly severity: ErrorSeverity
  public readonly userMessage: string
  public readonly isRetryable: boolean
  public readonly metadata?: Record<string, unknown>
  public readonly timestamp: string

  constructor(
    type: ErrorType,
    message: string,
    userMessage: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    isRetryable: boolean = false,
    metadata?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
    this.type = type
    this.severity = severity
    this.userMessage = userMessage
    this.isRetryable = isRetryable
    this.metadata = metadata
    this.timestamp = new Date().toISOString()
  }

  /**
   * Convert to standardized error format
   */
  toStandardized(): StandardizedError {
    return {
      type: this.type,
      severity: this.severity,
      message: this.message,
      userMessage: this.userMessage,
      isRetryable: this.isRetryable,
      metadata: this.metadata,
      originalError: this,
      timestamp: this.timestamp
    }
  }
}

/**
 * Validation error for input validation failures
 */
export class ValidationError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(
      ErrorType.VALIDATION,
      message,
      'Please check your input and try again.',
      ErrorSeverity.LOW,
      false,
      metadata
    )
    this.name = 'ValidationError'
  }
}

/**
 * API error for external service failures
 */
export class APIError extends AppError {
  constructor(message: string, isRetryable: boolean = true, metadata?: Record<string, unknown>) {
    super(
      ErrorType.API_ERROR,
      message,
      isRetryable 
        ? 'Service temporarily unavailable. Please try again.' 
        : 'Unable to process your request. Please contact support.',
      isRetryable ? ErrorSeverity.MEDIUM : ErrorSeverity.HIGH,
      isRetryable,
      metadata
    )
    this.name = 'APIError'
  }
}

/**
 * Network error for connection issues
 */
export class NetworkError extends AppError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(
      ErrorType.NETWORK_ERROR,
      message,
      'Connection problem. Please check your internet and try again.',
      ErrorSeverity.MEDIUM,
      true,
      metadata
    )
    this.name = 'NetworkError'
  }
}

/**
 * Generation error for worksheet generation failures
 */
export class GenerationError extends AppError {
  constructor(message: string, isRetryable: boolean = true, metadata?: Record<string, unknown>) {
    super(
      ErrorType.GENERATION_FAILED,
      message,
      'Failed to generate worksheet. Please try again.',
      ErrorSeverity.HIGH,
      isRetryable,
      metadata
    )
    this.name = 'GenerationError'
  }
}

/**
 * Convert any error to standardized format
 */
export function standardizeError(error: unknown, fallbackMessage: string = 'An unexpected error occurred'): StandardizedError {
  if (error instanceof AppError) {
    return error.toStandardized()
  }

  if (error instanceof Error) {
    // Classify error based on message patterns
    let type = ErrorType.UNKNOWN
    let severity = ErrorSeverity.MEDIUM
    let userMessage = fallbackMessage
    let isRetryable = false

    if (error.message.includes('validation') || error.message.includes('Invalid')) {
      type = ErrorType.VALIDATION
      severity = ErrorSeverity.LOW
      userMessage = 'Please check your input and try again.'
      isRetryable = false
    } else if (error.message.includes('API key') || error.message.includes('authentication')) {
      type = ErrorType.AUTHENTICATION
      severity = ErrorSeverity.HIGH
      userMessage = 'Authentication failed. Please contact support.'
      isRetryable = false
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      type = ErrorType.RATE_LIMIT
      severity = ErrorSeverity.MEDIUM
      userMessage = 'Service temporarily unavailable. Please try again later.'
      isRetryable = true
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      type = ErrorType.NETWORK_ERROR
      severity = ErrorSeverity.MEDIUM
      userMessage = 'Connection problem. Please try again.'
      isRetryable = true
    }

    return {
      type,
      severity,
      message: error.message,
      userMessage,
      isRetryable,
      originalError: error,
      timestamp: new Date().toISOString()
    }
  }

  // Unknown error type
  return {
    type: ErrorType.UNKNOWN,
    severity: ErrorSeverity.HIGH,
    message: String(error),
    userMessage: fallbackMessage,
    isRetryable: false,
    timestamp: new Date().toISOString()
  }
}

/**
 * Log error with appropriate level based on severity
 */
export function logError(error: StandardizedError, context?: Record<string, unknown>): void {
  const logData = {
    ...error,
    context,
    // Remove sensitive data from logs
    metadata: error.metadata ? sanitizeForLogging(error.metadata) : undefined
  }

  switch (error.severity) {
    case ErrorSeverity.CRITICAL:
    case ErrorSeverity.HIGH:
      console.error('Error:', logData)
      break
    case ErrorSeverity.MEDIUM:
      console.warn('Warning:', logData)
      break
    case ErrorSeverity.LOW:
      console.info('Info:', logData)
      break
  }
}

/**
 * Remove sensitive data from objects before logging
 */
function sanitizeForLogging(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...obj }
  
  // Remove common sensitive fields
  const sensitiveFields = ['password', 'token', 'key', 'secret', 'studentNames']
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      if (Array.isArray(sanitized[field])) {
        sanitized[field] = `[${(sanitized[field] as unknown[]).length} items]`
      } else {
        sanitized[field] = '[REDACTED]'
      }
    }
  }
  
  return sanitized
}

/**
 * Create standardized API response for errors
 */
export function createErrorResponse(error: StandardizedError, requestId?: string) {
  return {
    success: false,
    error: error.type,
    message: error.userMessage,
    ...(requestId && { requestId }),
    timestamp: error.timestamp,
    // Include retry information for retryable errors
    ...(error.isRetryable && { 
      retryable: true,
      retryAfter: getRetryDelay(error.type)
    })
  }
}

/**
 * Get appropriate retry delay based on error type
 */
function getRetryDelay(errorType: ErrorType): number {
  switch (errorType) {
    case ErrorType.RATE_LIMIT:
      return 60000 // 1 minute
    case ErrorType.API_ERROR:
    case ErrorType.NETWORK_ERROR:
      return 5000 // 5 seconds
    default:
      return 1000 // 1 second
  }
}