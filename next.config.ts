import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app. The parent folder still holds the old
  // Gatsby site (yarn.lock), which Turbopack would otherwise pick as root and
  // break local-font/asset resolution.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
