import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath: "/book",
  assetPrefix: "/book/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
