import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Add 'as const' here to satisfy the type checker
  output: "export" as const,
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // Use the standard options for the MDX plugin
});

export default withMDX(nextConfig);
