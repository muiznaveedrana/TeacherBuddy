/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel serverless deployment
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium',
      'puppeteer'
    ]
  },

  // Environment variables configuration
  env: {
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true'
  },

  // Disable ESLint during build for production deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript checking during build for production deployment
  typescript: {
    ignoreBuildErrors: true,
  },

  // Webpack configuration for serverless compatibility
  webpack: (config) => {
    // Exclude problematic packages from webpack bundling for serverless
    config.externals = [...(config.externals || []), 'puppeteer', 'puppeteer-core']

    return config
  },

  // Output configuration - removed 'standalone' for Vercel compatibility
  // output: 'standalone' // Commented out for Vercel deployment
};

module.exports = nextConfig;