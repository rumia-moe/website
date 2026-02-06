import { execSync } from "child_process";
import createMDX from "@next/mdx";

const commitHash = execSync("git rev-parse --short HEAD").toString().trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  output: "export" as const,
  env: {
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
  },
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
