import fs from "fs";
import path from "path";
import { GetPosts, GetPost } from "@/lib/blog";
import { notFound } from "next/navigation";

const POSTS_PATH = path.join(process.cwd(), "posts");

// Types for Next.js 15 params
type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return GetPosts().map((file) => ({
    slug: file,
  }));
}

export default async function BlogPost(props: { params: Params }) {
  // 1. Unwrapping the params Promise
  const { slug } = await props.params;

  const post = await GetPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <h1>{post.metadata.title}</h1>
        <pre className="not-prose">{post.metadata.date}</pre>
      </div>
      <div>{post.body}</div>
    </div>
  );
}
