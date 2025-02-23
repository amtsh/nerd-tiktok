"use client";

import { useCompletion } from "@ai-sdk/react";

export default function Page() {
  const { completion, complete } = useCompletion({
    api: "/api/stream-topic-as-text",
  });

  return (
    <div>
      <div
        onClick={async () => {
          await complete("sleep");
        }}
      >
        Generate
      </div>

      {completion}
    </div>
  );
}
