/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable telemetry using environment variable
  env: {
    NEXT_TELEMETRY_DISABLED: '1'
  },
  
  // Current supported experimental features
  experimental: {
    // Add only supported experimental features here
    serverComponentsExternalPackages: [],
  },

  // Other common Next.js configurations
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig