/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com","loremflickr.com"],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.externals.push({
      "knex": "knex",
      "@medusajs/product": "@medusajs/product",
    })
    return config;
  },
};

module.exports = nextConfig;
