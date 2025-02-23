"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { bookSchema } from "../api/stream-topic-as-object/schema";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { FeedItem } from "@/components/FeedItem";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Page() {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/stream-topic-as-object",
    schema: bookSchema,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");

  useEffect(() => {
    if (topic) {
      submit(topic);
    } else {
      router.push("/");
    }
  }, [topic]);

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

      {isLoading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Cooking...</span>
        </div>
      )}
    </div>

    // <div className="text-white">
    //   <button onClick={() => submit("meditation")}>Generate</button>

    //   {object?.id && <div>{object.id}</div>}
    //   {object?.topic && <div>{object.topic}</div>}

    //   {object?.pages?.map((page, index) => (
    //     <div key={index}>
    //       <p>PageNumber: {page?.pageNum}</p>
    //       <p>PageTitle: {page?.pageTitle}</p>
    //       <p>PageContent: {page?.pageContent}</p>
    //     </div>
    //   ))}
    // </div>
  );
}
