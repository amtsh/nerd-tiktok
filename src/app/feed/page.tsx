"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { bookSchema } from "../api/stream-topic-as-object/schema";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { FeedItem } from "@/components/FeedItem";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Content } from "@/components/Content";

const fetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  console.log("fetching:", input);
  const response = await fetch(input, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    next: {
      revalidate: 60 * 60 * 24, // 1 day
    },
  });
  return response;
};

export default function Page() {
  const [isStreamingDone, setIsStreamingDone] = useState(false);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/stream-topic-as-object",
    fetch: fetcher,
    schema: bookSchema,
    onFinish: (event) => {
      setIsStreamingDone(true);
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    if (topic) {
      if (isLoading) return;
      submit(topic);
    } else {
      router.push("/");
    }

    return () => {
      // Cleanup function if needed
    };
  }, []);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="text-red-500">Error: {error.message}</span>

        <Button onClick={() => submit(topic)}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <Content>
        <div className="top-4 left-4 fixed z-50">
          <Link href="/">
            <ChevronLeft
              size={28}
              className="absolute cursor-pointer opacity-50"
            />
          </Link>
        </div>

        {object?.pages?.map((page, index) => (
          <FeedItem key={index} page={page} bookTitle={object?.topic} />
        ))}

        {(isLoading || !isStreamingDone) && (
          <div className="h-screen w-full flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Cooking...</span>
          </div>
        )}
      </Content>
    </div>
  );
}
