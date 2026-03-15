"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { bookSchema } from "@/app/api/stream-topic-as-object/schema";
import { Loader2 } from "lucide-react";
import { FeedItem } from "@/ui/feed-item";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/ui/button";
import { useEffect, useRef, useState } from "react";
import { Content } from "@/ui/content";
import { z } from "zod";

const fetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  const response = await fetch(input, {
    ...init,
    method: "POST",
    headers,
  });
  return response;
};

export function FeedView() {
  const [isStreamingDone, setIsStreamingDone] = useState(false);
  const [mockData, setMockData] = useState<z.infer<typeof bookSchema> | null>(
    null,
  );
  const hasRequested = useRef(false);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/stream-topic-as-object",
    fetch: fetcher,
    schema: bookSchema,
    onFinish: () => {
      setIsStreamingDone(true);
    },
  });

  const fetchMockData = async () => {
    const response = await fetch("/api/mock-api");
    const data = await response.json();
    setMockData(data);
    setIsStreamingDone(true);
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    if (query === "mock") {
      fetchMockData();
      return;
    }

    if (query) {
      if (isLoading) return;
      submit({ query, mode });
    } else {
      router.push("/");
    }

    return () => {
      hasRequested.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount; adding deps would cause duplicate submissions
  }, []);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Button
          onClick={() => submit({ query, mode })}
          className="w-48 gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Retrying...
            </>
          ) : (
            "Try again"
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <Content>
        {mockData?.pages?.map((page, index) => (
          <FeedItem key={index} page={page} bookTitle={mockData?.topic} />
        ))}

        {object?.pages?.map((page, index) => (
          <FeedItem key={index} page={page} bookTitle={object?.topic} />
        ))}

        {!object && isStreamingDone && (
          <div className="h-screen w-full flex items-center justify-center flex-col gap-4">
            <span className="text-sm text-balance">Service is down</span>
            <Button
              onClick={() => submit({ query, mode })}
              className="w-48 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Try again
            </Button>
          </div>
        )}

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
