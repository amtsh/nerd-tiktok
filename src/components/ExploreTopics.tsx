"use client";

import { Button } from "@/components/ui/button";
import { tabContent } from "@/lib/topicsData";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExploreTopics() {
  const tabs = Object.keys(tabContent);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="min-h-screen text-white">
      <div className="text-3xl font-bold p-4 mb-4 opacity-50">
        Explore topics
      </div>
      <nav className="border-b border-zinc-800 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-8 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-red-500 text-white"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
      <div className="divide-y divide-zinc-800">
        {tabContent[activeTab].map((topic, index) => (
          <Link key={index} href={`/feed?topic=${topic.title}`}>
            <div key={index} className="flex items-start justify-between p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span>{topic.category}</span>
                </div>
                <h2 className="font-semibold">{topic.title}</h2>
                {topic.posts && (
                  <div className="text-sm text-zinc-500">
                    {topic.posts} views
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-500 hover:bg-zinc-900 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
