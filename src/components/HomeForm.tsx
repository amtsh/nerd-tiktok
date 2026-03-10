"use client";

import { useState } from "react";
import { Mode } from "@/lib/types";
import { CuriousTopics } from "@/components/CuriousTopics";
import InputForm from "@/components/InputForm";

export function HomeForm() {
  const [mode, setMode] = useState<Mode>(Mode.LEARN);

  return (
    <>
      <div className="mb-4">
        <CuriousTopics mode={mode} />
      </div>

      <div className="mb-8">
        <InputForm mode={mode} onModeChange={setMode} />
      </div>
    </>
  );
}
