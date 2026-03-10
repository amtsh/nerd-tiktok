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
          mode === Mode.LEARN
            ? "Learn something new today."
            : "Read a new story today."
        }
        className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-zinc-600 px-0 py-0 mb-4 h-auto"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        autoFocus
      />

      <div className="flex items-center justify-between gap-3">
        <Tabs
          value={mode}
          onValueChange={(value: string) => onModeChange(value as Mode)}
        >
          <TabsList className="rounded-full bg-zinc-800">
            <TabsTrigger value="learn" type="button" className="rounded-full">
              Learn
            </TabsTrigger>
            <TabsTrigger value="story" type="button" className="rounded-full">
              Story
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          type="submit"
          size="icon"
          className="rounded-full shrink-0 shadow-lg shadow-black/40 transition-[transform,opacity,background-color] disabled:opacity-30"
          aria-label="Submit search"
          disabled={!searchInput}
        >
          <ArrowUp className="!h-5 !w-5" />
        </Button>
      </div>
    </form>
  );
}
