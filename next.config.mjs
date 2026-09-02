import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This project lives under a directory that has a lockfile above it; pin the
  // trace root so Next doesn't infer the home directory as the workspace.
  outputFileTracingRoot: root,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
