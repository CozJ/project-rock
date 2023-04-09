/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ]
  }
}

module.exports = nextConfig
