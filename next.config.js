/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
  },
  // Add experimental features for better Node 22 support
  experimental: {
    // Enable if you want app directory support
    // appDir: true,
  },
};

module.exports = nextConfig;
