"use client";

import { useState } from "react";
import { cn } from "@/shared/utils";
import { Mode } from "@/shared/types";
import { CuriousTopics } from "@/features/curious-topics";
import { InputForm } from "@/features/input-form";

interface HomeFormProps {
  className?: string;
}

export function HomeForm({ className }: HomeFormProps) {
  const [mode, setMode] = useState<Mode>(Mode.LEARN);

  return (
    <div className={cn("w-full flex-1 flex flex-col min-h-0", className)}>
      <div className="flex-1 min-h-0 flex flex-col rounded-3xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden bg-[#101010] backdrop-blur-sm">
        <div className="flex-1 min-h-0 overflow-auto">
          <CuriousTopics mode={mode} />
        </div>
        <div className="flex-shrink-0 border-t border-white/[0.08] px-4 py-4 bg-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <InputForm mode={mode} onModeChange={setMode} />
        </div>
      </div>
    </div>
  );
}
