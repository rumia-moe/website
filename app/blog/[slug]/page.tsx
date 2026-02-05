export async function generateStaticParams() {
  // Get all .mdx files from the /posts directory
  const files = fs.readdirSync(POSTS_PATH);

  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default function Post() {}
