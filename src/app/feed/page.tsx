"use client";

import { FeedItem } from "@/components/FeedItem";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useFetchBook } from "../hooks/useFetchBook";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Feed() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const { pages, loading, error, fetchPages } = useFetchBook(topic || "");
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!topic) {
      router.push("/");
      return;
    }
    // Initial fetch when component mounts
    fetchPages();
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading) {
        fetchPages();
      }
    },
    [loading, fetchPages]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "100px",
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="text-red-500">Error: {error}</span>
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

      {pages.map((page) => (
        <FeedItem key={page.pageid} page={page} />
      ))}
      <div ref={observerTarget} className="h-10 -mt-1" />
      {loading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      )}
    </div>
  );
}
