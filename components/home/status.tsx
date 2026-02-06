"use client";

import { useLanyard } from "react-use-lanyard";
import Card from "@/components/home/card";

export default function Status() {
  const { loading, status } = useLanyard({
    userId: "445035187370328066",
    socket: true,
  });

  let message = "loading...";

  if (!loading) {
    message = "online";

    if (status.discord_status === "offline") message = "offline";
  }

  return <Card>{message}</Card>;
}
