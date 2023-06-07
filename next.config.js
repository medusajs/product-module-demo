/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@medusajs/product",
    ],
  },
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "loremflickr.com",
      "medusa-server-testing.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
