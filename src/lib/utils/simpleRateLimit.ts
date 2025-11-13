/**
 * SIMPLE IN-MEMORY RATE LIMITER
 *
 * No external dependencies required.
 * Perfect for single-server deployments (Vercel serverless).
 *
 * Limitations:
 * - Resets on server restart
 * - Won't work across multiple serverless instances (but Vercel caches well)
 * - For production multi-server: use Upstash Redis instead
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (will reset on server restart - acceptable for MVP)
const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000) // 5 minutes

export interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  maxRequests: number
  /** Window duration in milliseconds */
  windowMs: number
  /** Optional custom message */
  message?: string
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  message?: string
}

/**
 * Simple rate limiter - IP-based
 *
 * @example
 * ```typescript
 * const result = await rateLimit(request, {
 *   maxRequests: 10,
 *   windowMs: 60 * 1000, // 1 minute
 * })
 *
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: result.message },
 *     { status: 429 }
 *   )
 * }
 * ```
 */
export async function rateLimit(
  request: Request,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { maxRequests, windowMs, message } = config

  // Get client IP (works on Vercel and most platforms)
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

  // Create unique key for this IP
  const key = `ratelimit:${ip}`

  const now = Date.now()
  const entry = rateLimitStore.get(key)

  // No entry or expired entry - create new one
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    })

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: now + windowMs,
    }
  }

  // Increment count
  entry.count++

  // Check if over limit
  if (entry.count > maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000)

    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      reset: entry.resetTime,
      message: message || `Rate limit exceeded. Try again in ${resetInSeconds} seconds.`,
    }
  }

  // Within limit
  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    reset: entry.resetTime,
  }
}

/**
 * Preset configurations for common use cases
 */
export const RATE_LIMIT_PRESETS = {
  /** Strict: 5 requests per minute (for expensive AI operations) */
  STRICT: {
    maxRequests: 5,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many worksheet generations. Please wait before creating another.',
  },

  /** Standard: 10 requests per minute (for normal API usage) */
  STANDARD: {
    maxRequests: 10,
    windowMs: 60 * 1000,
    message: 'Too many requests. Please slow down.',
  },

  /** Generous: 30 requests per minute (for public endpoints) */
  GENEROUS: {
    maxRequests: 30,
    windowMs: 60 * 1000,
    message: 'Too many requests. Please wait a moment.',
  },

  /** Hourly limit: 20 requests per hour (for worksheet generation) */
  HOURLY: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'You have reached the hourly limit of 20 worksheets. Please try again in an hour.',
  },

  /** Daily limit: 30 requests per day (for worksheet generation) */
  DAILY: {
    maxRequests: 30,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    message: 'You have reached the daily limit of 30 worksheets. Please try again tomorrow.',
  },
} as const

/**
 * Check multiple rate limits at once
 * Returns the first limit that fails, or success if all pass
 *
 * @example
 * ```typescript
 * const result = await checkMultipleRateLimits(request, [
 *   { ...RATE_LIMIT_PRESETS.HOURLY, key: 'hourly' },
 *   { ...RATE_LIMIT_PRESETS.DAILY, key: 'daily' },
 * ])
 * ```
 */
export async function checkMultipleRateLimits(
  request: Request,
  configs: (RateLimitConfig & { key: string })[]
): Promise<RateLimitResult> {
  for (const config of configs) {
    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    // Create unique key for this IP and time window
    const key = `ratelimit:${ip}:${config.key}`

    const now = Date.now()
    const entry = rateLimitStore.get(key)

    // No entry or expired entry - create new one
    if (!entry || now > entry.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      continue // Check next limit
    }

    // Increment count
    entry.count++

    // Check if over limit
    if (entry.count > config.maxRequests) {
      const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000)
      const resetInMinutes = Math.ceil(resetInSeconds / 60)
      const resetInHours = Math.ceil(resetInMinutes / 60)

      let timeMessage = `${resetInSeconds} seconds`
      if (resetInMinutes > 60) {
        timeMessage = `${resetInHours} hour${resetInHours > 1 ? 's' : ''}`
      } else if (resetInMinutes > 1) {
        timeMessage = `${resetInMinutes} minutes`
      }

      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        reset: entry.resetTime,
        message: config.message || `Rate limit exceeded. Try again in ${timeMessage}.`,
      }
    }
  }

  // All limits passed
  return {
    success: true,
    limit: configs[0].maxRequests,
    remaining: configs[0].maxRequests - (rateLimitStore.get(`ratelimit:${request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'}:${configs[0].key}`)?.count || 1),
    reset: Date.now() + configs[0].windowMs,
  }
}

/**
 * Helper to get remaining time in human-readable format
 */
export function getResetTimeString(resetTime: number): string {
  const now = Date.now()
  const diffMs = resetTime - now

  if (diffMs <= 0) return 'now'

  const seconds = Math.ceil(diffMs / 1000)

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`
  }

  const minutes = Math.ceil(seconds / 60)
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`
}
