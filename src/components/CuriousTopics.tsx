"use client";

import { tabContent, storyTopics } from "@/lib/topicsData";
import { ArrowRight, RefreshCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Mode } from "@/lib/types";

const TOPIC_COUNT = 7;

function getRandomTopics(mode: Mode) {
  const pool = mode === Mode.STORY ? storyTopics : Object.values(tabContent).flat();
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
    <div className="max-w-2xl mx-auto px-2 mt-4">
      <div className="flex items-center justify-between px-2 mb-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Explore
        </span>
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"
          aria-label="Refresh topics"
        >
          <RefreshCw className="h-4 w-4" />
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
              className="w-full flex items-center gap-4 px-2 py-3 rounded-lg text-left hover:bg-white/5 transition-colors group"
            >
              <Search className="h-4 w-4 text-gray-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white">{topic.title}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {topic.category}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
