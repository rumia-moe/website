"use client";

import Card from "@/components/home/card";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  SiDiscord,
  SiX,
  SiBluesky,
  SiGithub,
} from "@icons-pack/react-simple-icons";

const socials = [
  {
    name: "Discord",
    icon: SiDiscord,
    href: "https://discord.com/users/445035187370328066",
  },
  {
    name: "X",
    icon: SiX,
    href: "https://x.com/xivgreen",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    href: "https://github.com/rumia-moe",
  },
  {
    name: "Bluesky",
    icon: SiBluesky,
    href: "https://bsky.app/profile/rumia.moe",
  },
];

export default function Socials() {
  return (
    <Card title="socials">
      <div className="flex gap-2">
        {socials.map((social, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Link href={social.href} target="_blank">
                <Button variant="outline" size="icon">
                  <social.icon />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{social.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
}
