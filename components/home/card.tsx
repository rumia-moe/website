import * as React from "react";
import {
  Card as ShadCNCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Card({
  title,
  description,
  children,
}: Readonly<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <ShadCNCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </ShadCNCard>
  );
}
