import React from "react";
import Link from "next/link";
import InputForm from "@/components/InputForm";
// import { headers } from "next/headers";
import Image from "next/image";
import xIcon from "../../public/x.svg";
import { Header } from "@/components/Header";

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
  // const hostname = await headers().get("host");
  // const apiUrl = `https://${hostname}/api/books`;
  // const res = await fetch(apiUrl);
  // const data = await res.json();
  // const topicsFromOpenAi = data.error ? [] : data;

  // const topics = [...topicsFromOpenAi, ...defaultTopics];

  const topics = [...defaultTopics];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header />
        <div className="flex flex-col items-center justify-center h-[95dvh]">
          <h1 className="text-4xl font-bold mb-4 md:text-6xl text-center bg-gradient-to-r from-orange-400 via-pink-300 to-purple-400 bg-clip-text box-decoration-clone text-transparent">
            Heal from doomscrolling
          </h1>
          <p className="mt-2 md:mt-4 text-xl md:text-2xl font-semibold text-gray-300">
            ... with microlearning
          </p>
        </div>

        {/* start: apple books design */}
        <div className="flex justify-center items-center min-h-screen mb-16">
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

        <div className="w-full flex justify-center my-24 md:my-8">
          <span className="text-xs text-gray-400">
            <a target="_blank" href="https://x.com/amiitshiinde">
              DM feedback via{" "}
              <Image
                src={xIcon}
                alt="X Logo"
                className="inline-block w-4 h-4 ml-1 invert"
              />
            </a>
          </span>
        </div>
      </div>

      <div className="fixed bottom-5 md:bottom-20 left-0 right-0">
        <InputForm />
      </div>
    </div>
  );
}
