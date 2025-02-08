import React from "react";
import Link from "next/link";

const topics = [
  "Dark matter",
  "Serotonin",
  "Building habits",
  "Inflammation",
  "Breathing from diaphragm",
  "Photons",
  "Vagus nerve",
  "Gluten",
  "Black holes",
];

export default function Home() {
  return (
    <div className="px-4 py-16">
      <div className="grid grid-cols-3 gap-1 max-w-md mx-auto">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/feed?topic=${topic.toLowerCase().replace(/\s+/g, "-")}`}
            legacyBehavior
          >
            <div className="border border-gray-700 p-4 flex items-center justify-center h-48 cursor-pointer hover:bg-zinc-900 rounded-lg">
              <span className="text-gray-300 text-center">{topic}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
        <span className="text-xs text-zinc-400">
          <s>Doomscrolling</s> -&gt; Curiosity scrolling
        </span>
      </div>
    </div>
  );
}
