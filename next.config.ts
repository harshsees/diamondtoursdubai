import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; otherwise Next walks up to the home directory.
  turbopack: { root: __dirname },
  images: {
    // Photography is currently sourced from Unsplash. Replace these entries
    // (or drop the block entirely) once artwork is served from /public.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 82],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
  },
};

export default nextConfig;
