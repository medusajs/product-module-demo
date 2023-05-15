/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com","loremflickr.com"],
  },
};

module.exports = nextConfig;
