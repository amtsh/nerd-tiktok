"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const InputForm = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleOnSubmit = (inputText: string) => {
    console.log(inputText);
  };

  return (
    <form
      className="max-w-2xl mx-auto relative"
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit(searchInput);

        setSearchInput("");
      }}
    >
      <Input
        type="text"
        placeholder="What do you want to learn today?"
        className="w-full pr-12 py-6 rounded-full focus-visible:ring-1"
        onChange={(e) => {
          const value = e.target.value;
          setSearchInput(value);
        }}
        value={searchInput}
      />
      <Button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Submit search"
        disabled={!searchInput}
      >
        <ArrowUp />
      </Button>
    </form>
  );
};

export default InputForm;
