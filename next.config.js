const path = require("path");

// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["source.unsplash.com"],
  },
};

module.exports = nextConfig;
