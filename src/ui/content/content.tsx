import React from "react";
import { cn } from "@/shared/utils";

interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export function Content({ children, className }: ContentProps) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl px-4 sm:px-6 font-sans", className)}>
      {children}
    </div>
  );
}
