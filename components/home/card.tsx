import * as React from "react";
import {
  Card as ShadCNCard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Card({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <ShadCNCard>
      {title ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : (
        <></>
      )}

      <CardContent>{children}</CardContent>
    </ShadCNCard>
  );
}
