import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const POSTS_PATH = path.join(process.cwd(), "posts");

export function GetPosts() {
  return fs
    .readdirSync(POSTS_PATH)
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

function GetPostFilePath(path_: string) {
  let filePath = path.join(POSTS_PATH, `${path_}.md`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(POSTS_PATH, `${path_}.mdx`);
    if (!fs.existsSync(filePath)) return;
  }

  return filePath;
}

export function GetPostMetadata(path_: string) {
  const filePath = GetPostFilePath(path_);
  if (!filePath) return;

  const fileContents = fs.readFileSync(filePath, "utf8");

  const metadataRegex = /^\[(\w+)\]:-\s*"([^"]*)"/gm;
  const metadata: Map<string, string> = new Map();
  let source = fileContents;

  let match;
  while ((match = metadataRegex.exec(fileContents)) !== null) {
    metadata.set(match[1], match[2]);
    source = source.replace(match[0], "");
  }

  return { metadata: Object.fromEntries(metadata), source };
}

export async function GetPost(path_: string) {
  const parsedFile = GetPostMetadata(path_);
  if (!parsedFile) return;

  const { content } = await compileMDX({
    source: parsedFile.source.trim(),
    options: { parseFrontmatter: false },
  });

  return { metadata: parsedFile.metadata, body: content };
}
