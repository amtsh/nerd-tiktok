"use client";

import React, { useState } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import { Mode } from "@/shared/types";

interface InputFormProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function InputForm({ mode, onModeChange }: InputFormProps) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleOnSubmit = (inputText: string) => {
    router.push(`/feed?query=${inputText}&mode=${mode}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(searchInput);
        setSearchInput("");
      }}
    >
      <Input
        type="text"
        placeholder={
          mode === Mode.LEARN ? "Type a topic ..." : "Read a new story today."
        }
        className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-zinc-600 px-0 py-0 mb-4 h-auto"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />

      <div className="flex items-center justify-between gap-3">
        <Tabs
          value={mode}
          onValueChange={(value: string) => onModeChange(value as Mode)}
        >
          <TabsList className="rounded-full bg-black-900 border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_3px_rgba(0,0,0,0.4)]">
            <TabsTrigger
              value="learn"
              type="button"
              className="rounded-full text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_2px_rgba(0,0,0,0.3)]"
            >
              Learn
            </TabsTrigger>
            <TabsTrigger
              value="story"
              type="button"
              className="rounded-full text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_2px_rgba(0,0,0,0.3)]"
            >
              Story
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="rounded-full shrink-0 bg-zinc-800 border border-white/20 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_4px_rgba(0,0,0,0.5)] text-white/80 hover:bg-zinc-700 hover:text-white transition-all disabled:opacity-25"
          aria-label="Submit search"
          disabled={!searchInput}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
