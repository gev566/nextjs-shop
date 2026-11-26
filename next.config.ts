import type { NextConfig } from "next";

// Для GitHub Pages сайт собирается в статику и живёт в подпапке /nextjs-shop
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
