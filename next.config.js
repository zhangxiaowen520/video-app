/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos"
      }
    ]
  },
  typescript: {
    // 构建时忽略 TypeScript 类型错误
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
