"use client";

import * as React from "react";
import Card from "@/components/home/card";

export default function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const formattedTime = time.toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  return (
    <Card title="clock">
      <div className="flex flex-col">
        <h1 className="text-center">{formattedTime}</h1>
        <pre className="not-prose text-center">Tokyo, Japan</pre>
      </div>
    </Card>
  );
}
