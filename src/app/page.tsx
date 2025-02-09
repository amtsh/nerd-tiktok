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

export default function Home() {
  return (
    <div className="min-h-screen py-16">
      {/* start: apple books design */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={`/feed?topic=${topic.toLowerCase().replace(/\s+/g, "-")}`}
              legacyBehavior
            >
              <div className="flex flex-col items-center cursor-pointer">
                <div
                  className={`w-40 h-56 bg-gradient-to-b ${
                    gradients[index % gradients.length]
                  } rounded-md shadow-xs shadow-black relative`}
                >
                  <h2 className="flex justify-center items-center text-center text-white text-xl pt-8">
                    {topic}
                  </h2>
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

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4">
        <span className="text-xs text-gray-500">
          <s>Doomscrolling</s> -&gt; Curiosity scrolling
        </span>
      </div>
    </div>
  );
}
