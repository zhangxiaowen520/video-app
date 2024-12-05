/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    domains: ["*"]
  },
  typescript: {
    // 构建时忽略 TypeScript 类型错误
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
