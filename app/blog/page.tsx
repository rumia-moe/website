import { GetPosts, GetPostMetadata } from "@/lib/blog";
import Link from "next/link";

export default function Blog() {
  return (
    <div className="flex flex-col gap-12">
      <h1>blog</h1>
      <div className="flex flex-col gap-2">
        {GetPosts().map((path, i) => {
          const { metadata } = GetPostMetadata(path)!;

          return (
            <Link href={"/blog/" + path} className="not-prose" key={i}>
              <div className="flex flex-col">
                <strong>{metadata.title}</strong>
                <pre className="not-prose">{metadata.date}</pre>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
