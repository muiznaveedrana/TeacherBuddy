/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel serverless deployment
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium',
      'puppeteer',
      'sharp',
      'jsdom',
      'glob'
    ]
  },

  // Image domains for worksheet library thumbnails
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic packages from webpack bundling for serverless
      config.externals = [
        ...(config.externals || []),
        'puppeteer',
        'puppeteer-core',
        '@sparticuz/chromium',
        'sharp',
        'jsdom',
        'glob'
      ]
    }

    return config
  },

  // Output configuration - removed 'standalone' for Vercel compatibility
  // output: 'standalone' // Commented out for Vercel deployment
};

module.exports = nextConfig;