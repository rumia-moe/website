import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const POSTS_PATH = path.join(process.cwd(), "posts");

// Types for Next.js 15 params
type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_PATH);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost(props: { params: Params }) {
  // 1. Unwrapping the params Promise
  const { slug } = await props.params;

  const filePath = path.join(POSTS_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  // 2. Metadata Extraction Logic
  const metadataRegex = /^\[(\w+)\]:-\s*"([^"]*)"/gm;
  let metadata: Record<string, string> = {};
  let cleanContent = fileContents;

  let match;
  while ((match = metadataRegex.exec(fileContents)) !== null) {
    metadata[match[1]] = match[2];
    cleanContent = cleanContent.replace(match[0], "");
  }

  // 3. Title Injection
  const finalContent = `# ${metadata.title || "Untitled Post"}\n\n${cleanContent.trim()}`;

  const { content } = await compileMDX({
    source: finalContent,
    options: { parseFrontmatter: false },
  });

  return content;
}
