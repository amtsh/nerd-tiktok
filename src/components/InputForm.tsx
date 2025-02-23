"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

const InputForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleOnSubmit = (inputText: string) => {
    router.push(`/stream-object?topic=${inputText}`);
  };

  return (
    <form
      className="max-w-2xl mx-auto relative shadow-lg shadow-black/40 backdrop-blur-xl px-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(searchInput);

        setSearchInput("");
      }}
    >
      <Input
        type="text"
        placeholder="What do you want to learn today?"
        className="pl-6 py-6 rounded-full ring-1 ring-gray-400 text-base"
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
        }}
        value={searchInput}
      />
      <Button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Submit search"
        disabled={!searchInput}
      >
        <ArrowUp />
      </Button>
    </form>
  );
};

export default InputForm;
