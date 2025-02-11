import React from "react";
import Link from "next/link";
import { headers } from "next/headers";

const defaultTopics = [
  "Dark matter",
  "Seretonin",
  "Building habits",
  "Inflammation",
  "Breathing from diaphragm",
  "Photons",
  "Vagus nerve",
  "Gluten",
];

const gradients = [
  "from-orange-700 to-orange-900",
  "from-blue-700 to-blue-900",
  "from-green-700 to-green-900",
  "from-red-700 to-red-900",
  "from-purple-700 to-purple-900",
  "from-yellow-700 to-yellow-900",
  "from-pink-700 to-pink-900",
  "from-teal-700 to-teal-900",
  "from-indigo-700 to-indigo-900",
];

export default async function Home() {
  const hostname = await headers().get("host");
  const apiUrl = `https://${hostname}/api/books`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const topicsFromOpenAi = data || [];

  const topics = [...topicsFromOpenAi, ...defaultTopics];

  return (
    <>
      <div className="min-h-screen ">
        <div className="fixed top-10 left-4 z-50">
          <a
            href="/"
            className="text-2xl font-semibold drop-shadow-lg hover:opacity-80 transition-opacity"
          >
            Nerd Tiktok
          </a>
          {/* <DarkModeToggle /> */}
        </div>

        {/* start: apple books design */}
        <div className="flex justify-center items-center min-h-screen my-32">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topics.map((topic, index) => (
              <Link
                key={topic}
                href={`/feed?topic=${topic.toLowerCase().replace(/\s+/g, "-")}`}
                legacyBehavior
              >
                <div className="flex flex-col items-center cursor-pointer">
                  <div
                    className={`w-40 h-56 bg-gradient-to-b ${
                      gradients[index % gradients.length]
                    } rounded-md shadow shadow-black relative`}
                  >
                    <div className="flex justify-center items-center text-center text-white pt-8">
                      {topic}
                      {/* inner book border effect */}
                      <div className="absolute inset-2 border border-white opacity-20"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-md"></div>
                  </div>
                  {/* <p className="text-sm mt-2">Elbert Hubbard</p> */}
                  {/* <button className="mt-2 px-4 py-1 border rounded-full text-xs">
                  GET
                </button> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* end: apple books design */}
      </div>

      <div className="w-full flex justify-center pb-4">
        <span className="text-sm text-gray-400">Heal from doomscrolling</span>
      </div>

      <div className="w-full flex justify-center pb-4">
        <span className="text-xs text-gray-400">
          <a target="_blank" href="https://x.com/amiitshiinde">
            Send feedback on X/Twitter
          </a>
        </span>
      </div>
    </>
  );
}
