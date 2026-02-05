"use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // const [isNavOpen, setIsNavOpen] = React.useState(false);

  const pages = [
    { name: "home", href: "/" },
    { name: "blog", href: "/blog" },
    { name: "projects", href: "/projects" },
    { name: "gallery", href: "/gallery" },
    { name: "contact", href: "/contact" },
  ];

  return (
    // <Collapsible open={isNavOpen} onOpenChange={setIsNavOpen} asChild>
    <header className="w-screen flex flex-col bg-(--color-background-light) shadow-xl">
      <div className="w-full max-w-(--view-width) mx-auto px-12 py-4 flex">
        <div className="flex flex-col">
          <h3>rumia.moe</h3>
          {/*<small>v1.0.0</small>*/}
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
            if (pathname === page.href)
              return <strong key={i}>{page.name}</strong>;

            return (
              <Link href={page.href} key={i}>
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
