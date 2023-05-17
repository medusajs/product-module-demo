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
      "@mikro-orm/seeder": "@mikro-orm/seeder",
      '@mikro-orm/mongodb': '@mikro-orm/mongodb',
      '@mikro-orm/mysql': '@mikro-orm/mysql',
      '@mikro-orm/better-sqlite': '@mikro-orm/better-sqlite',
      '@mikro-orm/migrations': '@mikro-orm/migrations',
      '@mikro-orm/entity-generator': '@mikro-orm/entity-generator',
      '@mikro-orm/mariadb': '@mikro-orm/mariadb',
      '@mikro-orm/sqlite': '@mikro-orm/sqlite',
      '@vscode/sqlite3': '@vscode/sqlite3',
      'sqlite3': 'sqlite3',
      'better-sqlite3': 'better-sqlite3',
      'mysql': 'mysql',
      'mysql2': 'mysql2',
      'oracledb': 'oracledb',
      'pg-native': 'pg-native',
      'pg-query-stream': 'pg-query-stream',
      'tedious': 'tedious',
      "@medusajs/product": "@medusajs/product",
    })
    return config;
  },
};

module.exports = nextConfig;
