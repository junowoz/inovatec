/** @type {import('next').NextConfig} */
const  nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/imagens/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
    ],
  },
}

module.exports = nextConfig