// Environment variable configuration with validation

function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function getOptionalEnvVar(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue
}

export const config = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Optional for client-side
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY, // Server-side only
  },
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY, // Can be optional for now
    secretKey: process.env.STRIPE_SECRET_KEY, // Server-side only
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET, // Server-side only
  },
  adsense: {
    clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID, // Can be optional for now
  },
  app: {
    url: getOptionalEnvVar('NEXTAUTH_URL', 'http://localhost:3000'),
    secret: process.env.NEXTAUTH_SECRET, // Server-side only
    nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
    isDevelopment: getOptionalEnvVar('NODE_ENV', 'development') === 'development',
    isProduction: getOptionalEnvVar('NODE_ENV', 'development') === 'production',
  },
} as const

// Validation function to check required environment variables at runtime
export function validateConfig() {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXTAUTH_SECRET',
  ]

  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  // Validate URLs
  try {
    new URL(config.supabase.url)
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
  }

  try {
    new URL(config.app.url)
  } catch {
    throw new Error('NEXTAUTH_URL must be a valid URL')
  }
}

// Auto-validate in development
if (config.app.isDevelopment) {
  try {
    validateConfig()
  } catch (error) {
    console.warn('⚠️ Configuration validation warning:', error)
  }
}