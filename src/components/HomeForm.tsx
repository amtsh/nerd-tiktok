"use client";

import { useState } from "react";
import { Mode } from "@/lib/types";
import { CuriousTopics } from "@/components/CuriousTopics";
import InputForm from "@/components/InputForm";

export function HomeForm() {
  const [mode, setMode] = useState<Mode>(Mode.LEARN);

  return (
    <div className="w-full">
      <div className="rounded-3xl border-4 border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden">
        <CuriousTopics mode={mode} />
        <div className="border-t border-white/[0.08] px-4 py-4 bg-zinc-900">
          <InputForm mode={mode} onModeChange={setMode} />
        </div>
      </div>
    </div>
  );
}
