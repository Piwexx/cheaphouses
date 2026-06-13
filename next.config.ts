import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverActions: {
      // Listing image uploads: 5MB max file + form fields
      bodySizeLimit: '6mb',
    },
  },
}

export default nextConfig
