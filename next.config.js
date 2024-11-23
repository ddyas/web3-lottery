/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true,
  },
  basePath: '/web3-lottery', // Matches your repo name
  assetPrefix: '/web3-lottery/', // Matches your repo name
}

module.exports = nextConfig
