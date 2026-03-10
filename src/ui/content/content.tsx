import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 font-sans">
      {children}
    </div>
  );
}
