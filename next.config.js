/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  images: {
    dangerouslyAllowSVG: true,
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {



    return config
  }
}

module.exports = nextConfig
