"use client";

import { Item } from "@/components/item";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useWikiArticles } from "../hooks/useWikiArticles";

export default function Tiktok() {
  const { articles, loading, fetchArticles } = useWikiArticles();
  const observerTarget = useRef(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading) {
        fetchArticles();
      }
    },
    [loading, fetchArticles]
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

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="fixed top-4 left-4 z-50">
        <button className="text-2xl font-bold text-white drop-shadow-lg hover:opacity-80 transition-opacity">
          WikiTok
        </button>
      </div>

      {articles.map((article) => (
        <Item key={article.pageid} article={article} />
      ))}
      <div ref={observerTarget} className="h-10 -mt-1" />
      {loading && (
        <div className="h-screen w-full flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
