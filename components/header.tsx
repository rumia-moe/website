"use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
import { Pixelify_Sans } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const pages = [
  { name: "home", href: "/" },
  { name: "blog", href: "/blog" },
  { name: "projects", href: "/projects" },
  { name: "gallery", href: "/gallery" },
  { name: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  // const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    // <Collapsible open={isNavOpen} onOpenChange={setIsNavOpen} asChild>
    <header className="w-screen flex flex-col bg-(--color-background-light) shadow-xl">
      <div className="w-full max-w-(--view-width) mx-auto px-12 py-10 flex">
        <div className="flex flex-col">
          <Link href="/" className="no-underline">
            <h2 className={pixelifySans.className}>rumia.moe</h2>
          </Link>
          {/*<Link
            href="https://github.com/rumia-moe/website"
            className="not-prose"
          >*/}
          <pre className="not-prose">
            {process.env.NEXT_PUBLIC_COMMIT_HASH || "dev"}
          </pre>
          {/*</Link>*/}
        </div>
        {/*<CollapsibleTrigger asChild>*/}
        {/*<Button variant="ghost" size="icon" className="size-8">*/}
        {/*<ChevronsUpDown />*/}
        {/*<span className="sr-only">Toggle navigation bar</span>*/}
        {/*</Button>*/}
        {/*</CollapsibleTrigger>*/}
      </div>
      {/*<CollapsibleContent asChild>*/}
      <nav className="bg-(--color-background-medium)">
        <div className="w-full max-w-(--view-width) mx-auto px-12 py-2 flex justify-center gap-8">
          {pages.map((page, i) => {
            if (
              pathname === page.href ||
              (page.href !== "/" && pathname.startsWith(page.href))
            )
              return <strong key={i}>{page.name}</strong>;

            return (
              <Link className="not-prose" href={page.href} key={i}>
                {page.name}
              </Link>
            );
          })}
        </div>
      </nav>
      {/*</CollapsibleContent>*/}
    </header>
    // </Collapsible>
  );
}
