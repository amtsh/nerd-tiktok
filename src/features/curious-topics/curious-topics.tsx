"use client";

import { tabContent, storyTopics } from "@/shared/data";
import { ArrowRight, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Mode } from "@/shared/types";

const TOPIC_COUNT = 7;

function getRandomTopics(mode: Mode) {
  const pool =
    mode === Mode.STORY ? storyTopics : Object.values(tabContent).flat();
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOPIC_COUNT);
}

interface CuriousTopicsProps {
  mode: Mode;
}

export function CuriousTopics({ mode }: CuriousTopicsProps) {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const topics = useMemo(() => getRandomTopics(mode), [mode, refreshKey]);

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="px-4 pt-5 pb-3">
      <div className="flex items-center justify-between mb-3 text-balance">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Explore
        </span>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-colors"
          aria-label="Refresh topics"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>
      <ul>
        {topics.map((topic) => (
          <li key={topic.title}>
            <button
              onClick={() =>
                router.push(
                  `/feed?query=${encodeURIComponent(topic.title)}&mode=${mode}`,
                )
              }
              className="w-full flex items-center gap-3 py-2.5 rounded-xl text-left"
            >
              <Search className="h-3 w-3 text-zinc-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-zinc-200 font-medium">
                  {topic.title}
                </span>
                <span className="text-xs text-zinc-500 ml-2">
                  {topic.category}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
