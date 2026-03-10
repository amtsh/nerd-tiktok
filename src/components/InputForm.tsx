"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mode } from "@/lib/types";

interface InputFormProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

const InputForm = ({ mode, onModeChange }: InputFormProps) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleOnSubmit = (inputText: string) => {
    router.push(`/feed?query=${inputText}&mode=${mode}`);
  };

  return (
    <form
      className="max-w-2xl mx-auto shadow-lg shadow-black/40 backdrop-blur-xl px-2 transition-[box-shadow]"
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(searchInput);

        setSearchInput("");
      }}
    >
      <>
        <Tabs
          value={mode}
          onValueChange={(value: string) => onModeChange(value as Mode)}
          className="mb-4"
        >
          <TabsList className="rounded-full">
            <TabsTrigger value="learn" className="text-xs rounded-full">
              Learn
            </TabsTrigger>
            <TabsTrigger value="story" className="text-xs rounded-full">
              Story
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </>
      <div className="relative">
        <Input
          type="text"
          placeholder={`${
            mode === Mode.LEARN
              ? "Learn something new today."
              : "Read a new story today."
          }`}
          className="pl-6 py-6 rounded-full ring-1 ring-gray-100 border-shadow text-base"
          onChange={(e) => {
            const value = e.target.value;
            setSearchInput(value);
          }}
          value={searchInput}
        />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 pl-2.5 pr-2 hover:bg-gray-100 rounded-full transition-[transform,opacity,background-color]"
          aria-label="Submit search"
          disabled={!searchInput}
        >
          <ArrowUp className="ml-0.5" />
        </Button>
      </div>
    </form>
  );
};

export default InputForm;
